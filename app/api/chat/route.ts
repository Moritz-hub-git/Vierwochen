/**
 * Der Projekt-Dialog (PROMPT.md §5): ein Zug pro Aufruf.
 *
 * Kostenbremse (§8): Minuten- und Tageslimit je IP, Obergrenze für Züge je
 * Dialog, Zeichenbegrenzung je Nachricht.
 *
 * Fehler werden mit Ursache geloggt; die Oberfläche bekommt eine ehrliche,
 * aber knappe Meldung — nie pauschal „nicht erreichbar" ohne Log.
 */
import { NextResponse } from "next/server";
import { FieldValue } from "@google-cloud/firestore";
import { LIMITS } from "@/lib/config";
import {
  ChatMessage,
  RESPONSE_SCHEMA,
  countQuestions,
  normalizeTurn,
  systemPrompt,
  toContents,
} from "@/lib/dialog";
import { safe } from "@/lib/firestore";
import { checkDayLimit, checkMinuteLimit, clientIp } from "@/lib/ratelimit";
import { generateStructured } from "@/lib/vertex";

export const dynamic = "force-dynamic";
export const maxDuration = 120;

interface ChatRequest {
  dialogId?: string;
  messages?: ChatMessage[];
}

function bad(status: number, error: string) {
  return NextResponse.json({ ok: false, error }, { status });
}

export async function POST(req: Request) {
  const ip = clientIp(req);

  let body: ChatRequest;
  try {
    body = (await req.json()) as ChatRequest;
  } catch {
    return bad(400, "Ungültige Anfrage.");
  }

  const messages = Array.isArray(body.messages) ? body.messages : [];
  const dialogId =
    typeof body.dialogId === "string" && /^[a-zA-Z0-9-]{8,64}$/.test(body.dialogId)
      ? body.dialogId
      : null;

  // Validierung der Historie (Kostenbremse: Zeichen- und Zuglimits).
  if (messages.length === 0 || messages.length > LIMITS.maxUserTurns * 2 + 2) {
    return bad(400, "Ungültiger Gesprächsverlauf.");
  }
  let userTurns = 0;
  for (const m of messages) {
    if (!m || (m.role !== "user" && m.role !== "assistant") || typeof m.content !== "string") {
      return bad(400, "Ungültiger Gesprächsverlauf.");
    }
    if (m.role === "user") {
      userTurns += 1;
      if (m.content.trim() === "" || m.content.length > LIMITS.maxMessageChars) {
        return bad(400, `Nachrichten sind auf ${LIMITS.maxMessageChars} Zeichen begrenzt.`);
      }
    } else if (m.content.length > 20_000) {
      return bad(400, "Ungültiger Gesprächsverlauf.");
    }
  }
  if (messages[messages.length - 1].role !== "user") {
    return bad(400, "Der letzte Zug muss vom Nutzer stammen.");
  }
  if (userTurns > LIMITS.maxUserTurns) {
    return bad(429, "Dieser Dialog hat sein Limit erreicht. Buchen Sie gern direkt ein Erstgespräch.");
  }

  if (!checkMinuteLimit(ip)) {
    return bad(429, "Zu viele Anfragen. Bitte warten Sie einen Moment.");
  }
  if (!(await checkDayLimit(ip))) {
    return bad(429, "Das Tageslimit ist erreicht. Bitte versuchen Sie es morgen wieder.");
  }

  const questionsAsked = countQuestions(messages);

  try {
    const { json, finishReason, repaired } = await generateStructured({
      contents: toContents(messages),
      systemInstruction: systemPrompt(userTurns, questionsAsked),
      responseSchema: RESPONSE_SCHEMA as unknown as Record<string, unknown>,
    });
    // Nutzertext mitgeben: Mengenangaben im Ergebnis müssen durch das belegt
    // sein, was der Nutzer tatsächlich geschrieben hat (siehe normalizeTurn).
    const userText = messages
      .filter((m) => m.role === "user")
      .map((m) => m.content)
      .join(" ");
    const turn = normalizeTurn(json, userText);

    // Dialog persistieren (nachgelagert; Ausfall bricht den Funnel nicht).
    if (dialogId) {
      void safe(
        (db) =>
          db.collection("dialogs").doc(dialogId).set(
            {
              messages: [...messages, { role: "assistant", content: JSON.stringify(turn) }],
              lastPhase: turn.phase,
              sketchTitle: turn.sketch.title,
              finishReason,
              repaired,
              ip,
              updatedAt: FieldValue.serverTimestamp(),
            },
            { merge: true }
          ),
        "Dialog speichern"
      );
    }

    return NextResponse.json({ ok: true, turn });
  } catch (err) {
    // Ursache vollständig loggen (PROMPT.md §5, Fallstricke).
    console.error("[chat] Modellaufruf fehlgeschlagen:", err);
    return bad(
      502,
      "Die Einschätzung ist gerade nicht möglich. Bitte versuchen Sie es in einer Minute erneut."
    );
  }
}

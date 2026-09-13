/**
 * Der Projekt-Dialog (PROMPT.md §5): ein Zug pro Aufruf.
 *
 * Kostenbremse (§8): Minuten- und Tageslimit je IP, Obergrenze für Züge je
 * Dialog, Zeichenbegrenzung je Nachricht.
 *
 * Fehler werden mit Ursache geloggt; die Oberfläche bekommt eine ehrliche,
 * aber knappe Meldung — nie pauschal „nicht erreichbar" ohne Log.
 */
import { after, NextResponse } from "next/server";
import { FieldValue } from "@google-cloud/firestore";
import { buildBlueprint } from "@/lib/blueprint";
import { LIMITS } from "@/lib/config";
import {
  ChatMessage,
  RESPONSE_SCHEMA,
  countQuestions,
  ensureConverged,
  normalizeTurn,
  sanitizeAssistantMessage,
  systemPrompt,
  toContents,
} from "@/lib/dialog";
import { safe } from "@/lib/firestore";
import { checkDayLimit, checkMinuteLimit, clientIp } from "@/lib/ratelimit";
import { runOpportunisticRetention } from "@/lib/retention";
import { generateStructured } from "@/lib/vertex";

export const dynamic = "force-dynamic";
/** Includes the post-response persistence and daily retention pass. */
export const maxDuration = 300;

interface ChatRequest {
  dialogId?: string;
  messages?: ChatMessage[];
}

const MAX_BODY_CHARS = 96_000;

function bad(status: number, error: string) {
  return NextResponse.json({ ok: false, error }, { status });
}

export async function POST(req: Request) {
  const ip = clientIp(req);

  let body: ChatRequest;
  try {
    const declaredLength = Number(req.headers.get("content-length") ?? 0);
    if (Number.isFinite(declaredLength) && declaredLength > MAX_BODY_CHARS) {
      return bad(413, "Die Anfrage ist zu groß.");
    }
    const rawBody = await req.text();
    if (rawBody.length > MAX_BODY_CHARS) {
      return bad(413, "Die Anfrage ist zu groß.");
    }
    const parsed: unknown = JSON.parse(rawBody);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return bad(400, "Ungültige Anfrage.");
    }
    body = parsed as ChatRequest;
  } catch {
    return bad(400, "Ungültige Anfrage.");
  }

  const messages = Array.isArray(body.messages) ? body.messages : [];
  const dialogId =
    typeof body.dialogId === "string" &&
    /^[a-zA-Z0-9-]{8,64}$/.test(body.dialogId)
      ? body.dialogId
      : null;
  if (body.dialogId !== undefined && dialogId === null) {
    return bad(400, "Ungültige Dialog-ID.");
  }

  // Validierung der Historie (Kostenbremse: Zeichen- und Zuglimits).
  if (messages.length === 0 || messages.length > LIMITS.maxUserTurns * 2 + 2) {
    return bad(400, "Ungültiger Gesprächsverlauf.");
  }
  let userTurns = 0;
  const sanitizedMessages: ChatMessage[] = [];
  for (let index = 0; index < messages.length; index += 1) {
    const m = messages[index];
    if (
      !m ||
      (m.role !== "user" && m.role !== "assistant") ||
      typeof m.content !== "string" ||
      m.role !== (index % 2 === 0 ? "user" : "assistant")
    ) {
      return bad(400, "Ungültiger Gesprächsverlauf.");
    }
    if (m.role === "user") {
      userTurns += 1;
      if (
        m.content.trim() === "" ||
        m.content.length > LIMITS.maxMessageChars
      ) {
        return bad(
          400,
          `Nachrichten sind auf ${LIMITS.maxMessageChars} Zeichen begrenzt.`,
        );
      }
      sanitizedMessages.push({ role: "user", content: m.content.trim() });
    } else {
      if (m.content.length > 20_000) {
        return bad(400, "Ungültiger Gesprächsverlauf.");
      }
      const sanitized = sanitizeAssistantMessage(m.content);
      if (!sanitized) return bad(400, "Ungültiger Gesprächsverlauf.");
      sanitizedMessages.push({ role: "assistant", content: sanitized });
    }
  }
  if (messages[messages.length - 1].role !== "user") {
    return bad(400, "Der letzte Zug muss vom Nutzer stammen.");
  }
  if (userTurns > LIMITS.maxUserTurns) {
    return bad(
      429,
      "Dieser Dialog hat sein Limit erreicht. Buchen Sie gern direkt ein Erstgespräch.",
    );
  }

  if (!checkMinuteLimit(ip)) {
    return bad(429, "Zu viele Anfragen. Bitte warten Sie einen Moment.");
  }
  if (!(await checkDayLimit(ip))) {
    return bad(
      429,
      "Das Tageslimit ist erreicht. Bitte versuchen Sie es morgen wieder.",
    );
  }

  const questionsAsked = countQuestions(sanitizedMessages);

  try {
    const { json, finishReason, repaired } = await generateStructured({
      contents: toContents(sanitizedMessages),
      systemInstruction: systemPrompt(userTurns, questionsAsked),
      responseSchema: RESPONSE_SCHEMA as unknown as Record<string, unknown>,
    });
    // Nutzertext mitgeben: Mengenangaben im Ergebnis müssen durch das belegt
    // sein, was der Nutzer tatsächlich geschrieben hat (siehe normalizeTurn).
    const userText = sanitizedMessages
      .filter((m) => m.role === "user")
      .map((m) => m.content)
      .join("\n");
    const turn = ensureConverged(normalizeTurn(json, userText), {
      questionsAsked,
      userTurns,
    });

    if (turn.phase !== "reject") {
      const raw =
        json && typeof json === "object"
          ? (json as Record<string, unknown>)
          : {};
      turn.blueprint = buildBlueprint(raw.blueprint, turn.sketch, userText);
    }

    const persistence = dialogId
      ? safe(
          (db) =>
            db
              .collection("dialogs")
              .doc(dialogId)
              .set(
                {
                  messages: [
                    ...sanitizedMessages,
                    { role: "assistant", content: JSON.stringify(turn) },
                  ],
                  lastPhase: turn.phase,
                  blueprint: turn.blueprint ?? null,
                  blueprintVersion: turn.blueprint?.version ?? null,
                  sketchTitle: turn.sketch.title,
                  resultTier: turn.result?.tier ?? null,
                  resultPrice: turn.result?.price ?? null,
                  resultPersonDays:
                    turn.result?.savings?.personDaysPerWeek ?? null,
                  resultAnnualEuro: turn.result?.savings?.annualEuro ?? null,
                  finishReason,
                  repaired,
                  ip,
                  updatedAt: FieldValue.serverTimestamp(),
                },
                { merge: true },
              ),
          "Dialog speichern",
        )
      : Promise.resolve(null);
    // Final blueprints must be available before booking or email can read them.
    // Storage failure must not gate the ungated preview; delivery fails honestly separately.
    const blueprintSaved =
      turn.phase === "result" || turn.phase === "followup"
        ? (await persistence) !== null
        : false;
    after(async () => {
      await Promise.all([persistence, runOpportunisticRetention()]);
    });

    return NextResponse.json({ ok: true, turn, blueprintSaved });
  } catch (err) {
    // Ursache vollständig loggen (PROMPT.md §5, Fallstricke).
    console.error("[chat] Modellaufruf fehlgeschlagen:", err);
    return bad(
      502,
      "Die Einschätzung ist gerade nicht möglich. Bitte versuchen Sie es in einer Minute erneut.",
    );
  }
}

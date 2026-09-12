/**
 * E-Mail-Gate (PROMPT.md §5.5): Das Ergebnis gibt es gegen eine geschäftliche
 * E-Mail-Adresse. Freemail wird freundlich abgewiesen. Der Wert (Skizze und
 * Preis) wurde davor bereits geliefert — Reziprozität (§2.1).
 *
 * Seit dem Vollreview (Audit T4/CF-07) wird das Versprechen auch eingelöst:
 * Nach dem Speichern wird der Dialog geladen und die Einschätzung als Mail
 * verschickt. Klappt das nicht (kein MAIL_SENDER, kein Firestore, kein
 * Ergebnis im Dialog), meldet die Route den tatsächlichen Speicher- und
 * Versandstatus. Ohne einen erfolgreichen Kanal gibt es keinen Erfolg zurück.
 */
import { NextResponse } from "next/server";
import { FieldValue } from "@google-cloud/firestore";
import { SITE, contactEmail } from "@/lib/config";
import type { ChatMessage, DialogTurn } from "@/lib/dialog";
import { checkBusinessEmail } from "@/lib/email";
import { recordEvent } from "@/lib/events";
import { safe } from "@/lib/firestore";
import {
  leadSketchHtml,
  leadSketchSubject,
  ownerNoticeHtml,
  sendMail,
} from "@/lib/mail";
import {
  checkPersistentDailyLimit,
  checkWindowLimit,
  clientIp,
} from "@/lib/ratelimit";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

interface LeadRequest {
  email?: string;
  name?: string;
  dialogId?: string;
  sketchTitle?: string;
  website?: string;
}

/** Letzter Modell-Zug mit Ergebnis — followup darf das result aktualisiert haben. */
function lastResultTurn(messages: unknown): DialogTurn | null {
  if (!Array.isArray(messages)) return null;
  for (let i = messages.length - 1; i >= 0; i--) {
    const m = messages[i] as ChatMessage;
    if (m?.role !== "assistant" || typeof m.content !== "string") continue;
    try {
      const turn = JSON.parse(m.content) as DialogTurn;
      if (turn?.result && typeof turn.result.price === "number" && turn.sketch)
        return turn;
    } catch {
      // Alt-Züge ohne JSON: überspringen.
    }
  }
  return null;
}

export async function POST(req: Request) {
  const ip = clientIp(req);
  if (!checkWindowLimit(`lead:${ip}`, 5, 15 * 60_000)) {
    return NextResponse.json(
      {
        ok: false,
        error: "Zu viele Anfragen. Bitte versuchen Sie es später erneut.",
      },
      { status: 429 },
    );
  }
  if (!(await checkPersistentDailyLimit("lead", ip, 20))) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Das Tageslimit ist erreicht. Bitte versuchen Sie es morgen erneut.",
      },
      { status: 429 },
    );
  }
  let body: LeadRequest;
  try {
    body = (await req.json()) as LeadRequest;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Ungültige Anfrage." },
      { status: 400 },
    );
  }
  if (typeof body.website === "string" && body.website.trim()) {
    return NextResponse.json(
      { ok: false, error: "Anfrage abgelehnt." },
      { status: 400 },
    );
  }

  const check = checkBusinessEmail(body.email ?? "");
  if (!check.ok) {
    const message =
      check.reason === "freemail"
        ? `Dafür brauchen wir Ihre geschäftliche Adresse — private Postfächer wie Gmail, Web.de oder GMX lassen sich hier nicht zuordnen. Ohne Firmenadresse: einfach einen Termin buchen oder an ${SITE.email} schreiben.`
        : "Das sieht nicht wie eine gültige E-Mail-Adresse aus.";
    return NextResponse.json(
      { ok: false, reason: check.reason, error: message },
      { status: 422 },
    );
  }

  const name =
    typeof body.name === "string" ? body.name.trim().slice(0, 200) : "";
  const dialogId =
    typeof body.dialogId === "string" &&
    /^[a-zA-Z0-9-]{8,64}$/.test(body.dialogId)
      ? body.dialogId
      : null;
  const sketchTitle =
    typeof body.sketchTitle === "string" ? body.sketchTitle.slice(0, 300) : "";

  const leadRef = await safe(
    (db) =>
      db.collection("leads").add({
        email: check.email,
        domain: check.domain,
        name,
        dialogId,
        sketchTitle: sketchTitle || null,
        ip,
        createdAt: FieldValue.serverTimestamp(),
      }),
    "Lead speichern",
  );

  void recordEvent({
    type: "lead_email",
    sessionId: dialogId ?? `lead-${check.domain}`,
    dialogId,
    path: "/api/lead",
    meta: { domain: check.domain },
  });

  // --- Die versprochene Einschätzung wirklich verschicken ---
  let sent = false;
  const turn = dialogId
    ? await safe(async (db) => {
        const snap = await db.collection("dialogs").doc(dialogId).get();
        return lastResultTurn(snap.data()?.messages);
      }, "Dialog für Lead-Mail laden")
    : null;

  if (turn?.result) {
    const bookingUrl = `${SITE.url}/termin`;
    sent = await sendMail({
      to: check.email,
      subject: leadSketchSubject(turn.sketch.title),
      html: leadSketchHtml({
        to: check.email,
        title: turn.sketch.title,
        steps: turn.sketch.steps,
        value: turn.sketch.value,
        open: turn.sketch.open,
        assumptions: turn.sketch.assumptions,
        price: turn.result.price,
        priceItems: turn.result.priceItems ?? [],
        weeks: turn.result.weeks,
        bookingUrl,
      }),
    });
    if (leadRef) {
      await safe(
        async () =>
          leadRef.update({
            sketchMailSent: sent,
            sketchMailAt: FieldValue.serverTimestamp(),
          }),
        "Lead-Mailstatus",
      );
    }
  } else {
    console.warn(
      `[lead] Kein Ergebnis für Dialog ${dialogId ?? "—"} — Einschätzung wird persönlich nachgereicht.`,
    );
  }

  const ownerNotified = await sendMail({
    to: contactEmail(),
    subject: `Neuer Lead per E-Mail: ${check.email}${sketchTitle ? ` — ${sketchTitle}` : ""}`,
    html: ownerNoticeHtml({
      heading: sent
        ? "Neuer Lead — Einschätzung wurde automatisch versendet"
        : "Neuer Lead — Einschätzung bitte PERSÖNLICH nachreichen",
      rows: [
        ["E-Mail", check.email],
        ["Name", name || "—"],
        ["Skizze", sketchTitle || turn?.sketch.title || "—"],
        [
          "Richtpreis",
          turn?.result ? `${turn.result.price.toLocaleString("de-DE")} €` : "—",
        ],
        ["Dialog-ID", dialogId ?? "—"],
        [
          "Mail an Lead",
          sent
            ? "versendet"
            : "NICHT versendet (kein Ergebnis oder Versand nicht konfiguriert)",
        ],
      ],
    }),
  });

  const persisted = leadRef !== null;
  if (!persisted && !sent && !ownerNotified) {
    return NextResponse.json(
      {
        ok: false,
        error: `Ihre Anfrage konnte nicht gespeichert oder zugestellt werden. Bitte schreiben Sie direkt an ${SITE.email}.`,
        persisted: false,
        sent: false,
      },
      { status: 503 },
    );
  }
  const message = sent
    ? `Die Einschätzung wurde an ${check.email} gesendet.`
    : ownerNotified
      ? "Ihre Anfrage wurde an OpsDone zugestellt. Die Einschätzung konnte nicht automatisch versandt werden."
      : "Ihre Anfrage wurde gespeichert. Die Einschätzung konnte nicht automatisch versandt werden.";
  return NextResponse.json({
    ok: true,
    persisted,
    sent,
    ownerNotified,
    message,
  });
}

import { FieldValue } from "@google-cloud/firestore";
import { after, NextResponse } from "next/server";
import { SITE, contactEmail } from "@/lib/config";
import { checkBusinessEmail } from "@/lib/email";
import { safe } from "@/lib/firestore";
import { ownerNoticeHtml, sendMail } from "@/lib/mail";
import {
  checkPersistentDailyLimit,
  checkWindowLimit,
  clientIp,
} from "@/lib/ratelimit";
import { runOpportunisticRetention } from "@/lib/retention";

export const dynamic = "force-dynamic";
/** Includes the post-response retention pass registered with `after()`. */
export const maxDuration = 300;

interface ProcessCheckRequest {
  name?: unknown;
  email?: unknown;
  company?: unknown;
  process?: unknown;
  volume?: unknown;
  message?: unknown;
  consent?: unknown;
  website?: unknown;
}

function response(status: number, payload: Record<string, unknown>) {
  return NextResponse.json(payload, { status });
}

function text(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(req: Request) {
  const ip = clientIp(req);
  if (!checkWindowLimit(`process-check:${ip}`, 5, 15 * 60_000)) {
    return response(429, {
      ok: false,
      error: "Zu viele Anfragen. Bitte versuchen Sie es später erneut.",
    });
  }
  if (!(await checkPersistentDailyLimit("process-check", ip, 20))) {
    return response(429, {
      ok: false,
      error:
        "Das Tageslimit ist erreicht. Bitte versuchen Sie es morgen erneut.",
    });
  }
  const contentLength = Number(req.headers.get("content-length") ?? 0);
  if (Number.isFinite(contentLength) && contentLength > 16_384) {
    return response(413, { ok: false, error: "Die Anfrage ist zu groß." });
  }

  let body: ProcessCheckRequest;
  try {
    const rawBody = await req.text();
    if (rawBody.length > 16_384) {
      return response(413, { ok: false, error: "Die Anfrage ist zu groß." });
    }
    const parsed: unknown = JSON.parse(rawBody);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return response(400, { ok: false, error: "Ungültige Anfrage." });
    }
    body = parsed as ProcessCheckRequest;
  } catch {
    return response(400, { ok: false, error: "Ungültige Anfrage." });
  }

  // Hidden form field. A real visitor never fills it.
  if (text(body.website, 200)) {
    return response(400, { ok: false, error: "Anfrage abgelehnt." });
  }
  if (body.consent !== true) {
    return response(422, {
      ok: false,
      error: "Bitte stimmen Sie der Verarbeitung Ihrer Angaben zu.",
    });
  }

  const name = text(body.name, 160);
  const company = text(body.company, 200);
  const process = text(body.process, 1200);
  const volume = text(body.volume, 160);
  const message = text(body.message, 3000);
  const email = checkBusinessEmail(text(body.email, 254), {
    allowFreemail: true,
  });
  if (name.length < 2)
    return response(422, {
      ok: false,
      error: "Bitte geben Sie Ihren Namen an.",
    });
  if (!email.ok)
    return response(422, {
      ok: false,
      error: "Bitte geben Sie eine gültige E-Mail-Adresse an.",
    });
  if (company.length < 2)
    return response(422, {
      ok: false,
      error: "Bitte geben Sie Ihr Unternehmen an.",
    });
  if (process.length < 2) {
    return response(422, {
      ok: false,
      error: "Bitte wählen oder beschreiben Sie einen wiederkehrenden Prozess.",
    });
  }
  if (process === "Anderer Prozess" && message.length < 15) {
    return response(422, {
      ok: false,
      error: "Bitte beschreiben Sie den anderen Prozess etwas genauer.",
    });
  }

  const saved = await safe(
    (db) =>
      db.collection("processChecks").add({
        name,
        email: email.email,
        emailDomain: email.domain,
        company,
        process,
        volume: volume || null,
        message: message || null,
        consent: true,
        source: "direct-process-check",
        status: "new",
        deliveryStatus: "pending",
        ip,
        createdAt: FieldValue.serverTimestamp(),
      }),
    "Prozess-Check speichern",
  );

  const delivered = await sendMail({
    to: contactEmail(),
    subject: `Neuer Prozess-Check: ${company}`,
    html: ownerNoticeHtml({
      heading: "Neuer direkter Prozess-Check",
      rows: [
        ["Name", name],
        ["E-Mail", email.email],
        ["Unternehmen", company],
        ["Prozess", process],
        ["Volumen", volume || "nicht angegeben"],
        ["Zusatz", message || "—"],
      ],
    }),
  });

  if (saved) {
    await safe(
      async () =>
        saved.update({
          deliveryStatus: delivered ? "delivered" : "not-delivered",
          deliveryCheckedAt: FieldValue.serverTimestamp(),
        }),
      "Prozess-Check Zustellstatus speichern",
    );
  }

  const persisted = saved !== null;
  if (!persisted && !delivered) {
    return response(503, {
      ok: false,
      error: `Ihre Anfrage konnte nicht gespeichert oder zugestellt werden. Bitte kontaktieren Sie uns direkt unter ${SITE.email}.`,
      persisted: false,
      delivered: false,
    });
  }

  after(async () => {
    await runOpportunisticRetention();
  });

  return response(200, {
    ok: true,
    persisted,
    delivered,
    message: delivered
      ? "Danke. Ihr Prozess-Check wurde zugestellt."
      : "Danke. Ihr Prozess-Check wurde sicher gespeichert.",
  });
}

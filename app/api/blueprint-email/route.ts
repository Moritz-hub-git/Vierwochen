import { createHash } from "node:crypto";
import { NextResponse } from "next/server";
import { FieldValue } from "@google-cloud/firestore";
import {
  blueprintSummary,
  loadStoredBlueprint,
  validBlueprintDialogId,
} from "@/lib/booking";
import { SITE, contactEmail } from "@/lib/config";
import { checkBusinessEmail } from "@/lib/email";
import { safe } from "@/lib/firestore";
import { ownerNoticeHtml, sendMail } from "@/lib/mail";
import {
  checkPersistentDailyLimit,
  checkWindowLimit,
  clientIp,
} from "@/lib/ratelimit";

export const dynamic = "force-dynamic";
export const maxDuration = 60;
const MAX_BODY = 2_048;
const fail = (status: number, error: string) =>
  NextResponse.json({ ok: false, error }, { status });

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    if (Number(req.headers.get("content-length") || 0) > MAX_BODY)
      return fail(413, "Die Anfrage ist zu groß.");
    const raw = await req.text();
    if (raw.length > MAX_BODY) return fail(413, "Die Anfrage ist zu groß.");
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed))
      return fail(400, "Ungültige Anfrage.");
    body = parsed as Record<string, unknown>;
  } catch {
    return fail(400, "Ungültige Anfrage.");
  }
  if (
    Object.keys(body).some(
      (key) => !["dialogId", "email", "website"].includes(key),
    )
  )
    return fail(400, "Ungültige Anfrage.");
  if (
    !validBlueprintDialogId(body.dialogId) ||
    typeof body.email !== "string" ||
    (body.website !== undefined &&
      (typeof body.website !== "string" || body.website.trim()))
  )
    return fail(400, "Ungültige Anfrage.");
  const email = checkBusinessEmail(body.email, { allowFreemail: true });
  if (!email.ok)
    return fail(422, "Bitte geben Sie eine gültige E-Mail-Adresse ein.");
  const ip = clientIp(req);
  if (
    !checkWindowLimit(`blueprint-email:${ip}`, 5, 15 * 60_000) ||
    !(await checkPersistentDailyLimit("blueprint-email", ip, 15))
  )
    return fail(
      429,
      "Zu viele Anfragen. Bitte versuchen Sie es später erneut.",
    );
  const blueprint = await loadStoredBlueprint(body.dialogId);
  if (!blueprint)
    return fail(
      503,
      "Ihr Lösungsentwurf ist noch nicht zur Zustellung verfügbar. Bitte versuchen Sie es gleich erneut. Er bleibt hier auf der Seite sichtbar.",
    );
  const dialogId = body.dialogId;
  const id = `blueprint-${createHash("sha256").update(`${dialogId}:${email.email}`).digest("hex")}`;
  const summary = blueprintSummary(blueprint);
  // Existing lead retention and authenticated operations apply to these requests.
  const reservation = await safe(
    (db) =>
      db.runTransaction(async (tx) => {
        const ref = db.collection("leads").doc(id);
        const snap = await tx.get(ref);
        if (snap.exists)
          return {
            existing: true,
            deliveryStatus: snap.data()?.deliveryStatus,
          };
        tx.create(ref, {
          dialogId,
          email: email.email,
          freemail: email.freemail,
          source: "blueprint-email",
          blueprint,
          marketingConsent: false,
          deliveryStatus: "pending",
          ip,
          createdAt: FieldValue.serverTimestamp(),
        });
        return { existing: false, deliveryStatus: "pending" };
      }),
    "Blueprint-E-Mail-Anfrage speichern",
  );
  if (reservation?.existing) {
    const sent = reservation.deliveryStatus === "sent";
    return NextResponse.json({
      ok: true,
      delivery: sent ? "sent" : "requested",
      message: sent
        ? "Ihr Blueprint wurde bereits an diese Adresse gesendet. Bitte prüfen Sie auch den Spam-Ordner."
        : "Ihre Anfrage ist gespeichert. Der automatische Versand ist noch nicht bestätigt; eine persönliche Zustellung steht aus.",
    });
  }
  const delivered = await sendMail({
    to: email.email,
    subject: `Ihr Opsrid Blueprint`,
    html: ownerNoticeHtml({
      heading: "Ihr Opsrid Blueprint",
      rows: [
        ["Ihr Lösungsentwurf", summary],
        [
          "Einordnung",
          "Vorläufiges Lösungskonzept. Noch keine fertige Anwendung. Schätzungen sind unverbindlich und müssen technisch geprüft werden.",
        ],
        [
          "Nächster Schritt",
          `Antworten Sie auf diese E-Mail, wenn Sie den Entwurf gemeinsam konkretisieren möchten. ${SITE.email}`,
        ],
        [
          "Ihre Anfrage",
          "Diese einmalige Nachricht erhalten Sie auf Ihren Wunsch. Sie werden dadurch nicht für Werbe-E-Mails angemeldet.",
        ],
      ],
    }),
  });
  if (reservation)
    await safe(
      (db) =>
        db
          .collection("leads")
          .doc(id)
          .update({
            deliveryStatus: delivered ? "sent" : "pending-manual",
            deliveryUpdatedAt: FieldValue.serverTimestamp(),
          }),
      "Blueprint-Zustellung dokumentieren",
    );
  if (!reservation && !delivered)
    return fail(
      503,
      `Die E-Mail konnte gerade weder gesendet noch als Anfrage gespeichert werden. Bitte versuchen Sie es erneut oder schreiben Sie an ${SITE.email}.`,
    );
  await sendMail({
    to: contactEmail(),
    subject: "Blueprint per E-Mail angefragt",
    html: ownerNoticeHtml({
      heading: "Angefragte Blueprint-Zustellung",
      rows: [
        ["E-Mail", email.email],
        [
          "Zustellung",
          delivered
            ? "Automatischer Versand bestätigt"
            : "Persönliche Zustellung erforderlich",
        ],
        ["Dialog-ID", dialogId],
        ["Blueprint", summary],
        [
          "Kontaktumfang",
          "Nur angefragte Blueprint-Zustellung. Keine Marketing-Einwilligung.",
        ],
      ],
    }),
  });
  return NextResponse.json({
    ok: true,
    delivery: delivered ? "sent" : "requested",
    message: delivered
      ? "Ihr Blueprint wurde gesendet. Bitte prüfen Sie auch den Spam-Ordner."
      : "Ihre Anfrage ist gespeichert. Der automatische Versand konnte nicht bestätigt werden; eine persönliche Zustellung steht aus.",
  });
}

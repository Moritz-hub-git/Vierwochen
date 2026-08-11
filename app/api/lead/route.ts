/**
 * E-Mail-Gate (PROMPT.md §5.5): Das Ergebnis gibt es gegen eine geschäftliche
 * E-Mail-Adresse. Freemail wird freundlich abgewiesen. Der Wert (Skizze und
 * Preisspanne) wurde davor bereits geliefert — Reziprozität (§2.1).
 */
import { NextResponse } from "next/server";
import { FieldValue } from "@google-cloud/firestore";
import { checkBusinessEmail } from "@/lib/email";
import { safe } from "@/lib/firestore";
import { clientIp } from "@/lib/ratelimit";

export const dynamic = "force-dynamic";

interface LeadRequest {
  email?: string;
  name?: string;
  dialogId?: string;
  sketchTitle?: string;
}

export async function POST(req: Request) {
  let body: LeadRequest;
  try {
    body = (await req.json()) as LeadRequest;
  } catch {
    return NextResponse.json({ ok: false, error: "Ungültige Anfrage." }, { status: 400 });
  }

  const check = checkBusinessEmail(body.email ?? "");
  if (!check.ok) {
    const message =
      check.reason === "freemail"
        ? "Dafür brauche ich Ihre geschäftliche Adresse — private Postfächer wie Gmail, Web.de oder GMX kann ich hier nicht zuordnen."
        : "Das sieht nicht wie eine gültige E-Mail-Adresse aus.";
    return NextResponse.json({ ok: false, reason: check.reason, error: message }, { status: 422 });
  }

  const name = typeof body.name === "string" ? body.name.trim().slice(0, 200) : "";
  const dialogId =
    typeof body.dialogId === "string" && /^[a-zA-Z0-9-]{8,64}$/.test(body.dialogId)
      ? body.dialogId
      : null;

  await safe(
    (db) =>
      db.collection("leads").add({
        email: check.email,
        domain: check.domain,
        name,
        dialogId,
        sketchTitle: typeof body.sketchTitle === "string" ? body.sketchTitle.slice(0, 300) : null,
        ip: clientIp(req),
        createdAt: FieldValue.serverTimestamp(),
      }),
    "Lead speichern"
  );

  return NextResponse.json({ ok: true });
}

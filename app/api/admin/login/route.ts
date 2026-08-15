/**
 * Anmeldung zur Auswertung. Setzt bei richtigem ADMIN_PASSWORD ein Cookie mit
 * dem SHA-256-Hash (kein Klartext im Cookie), analog zum Vorschau-Zugang.
 */
import { NextResponse } from "next/server";
import { ADMIN_COOKIE, adminPassword, sha256Hex } from "@/lib/adminAuth";
import { checkMinuteLimit, clientIp } from "@/lib/ratelimit";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  // Ratenbegrenzung gegen Durchprobieren.
  if (!checkMinuteLimit(`admin:${clientIp(req)}`)) {
    return NextResponse.json({ ok: false, error: "Zu viele Versuche. Bitte kurz warten." }, { status: 429 });
  }

  const password = adminPassword();
  if (!password) {
    return NextResponse.json(
      { ok: false, error: "Die Auswertung ist nicht eingerichtet (ADMIN_PASSWORD fehlt)." },
      { status: 503 }
    );
  }

  let body: { password?: string };
  try {
    body = (await req.json()) as { password?: string };
  } catch {
    return NextResponse.json({ ok: false, error: "Ungültige Anfrage." }, { status: 400 });
  }

  if (typeof body.password !== "string" || body.password !== password) {
    return NextResponse.json({ ok: false, error: "Das Passwort ist nicht richtig." }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, await sha256Hex(password), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}

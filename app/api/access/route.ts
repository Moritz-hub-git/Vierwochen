/**
 * Vorschau-Schutz (PROMPT.md §8): Ist SITE_PASSWORD gesetzt, schützt die
 * Middleware die gesamte Seite. Diese Route prüft das eingegebene Passwort und
 * setzt das Zugangs-Cookie (SHA-256-Hash, kein Klartext im Cookie).
 */
import { NextResponse } from "next/server";
import { env } from "@/lib/config";

export const dynamic = "force-dynamic";

async function sha256Hex(text: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function POST(req: Request) {
  const password = env("SITE_PASSWORD");
  if (!password) {
    return NextResponse.json({ ok: true, note: "Kein Passwortschutz aktiv." });
  }
  let body: { password?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Ungültige Anfrage." }, { status: 400 });
  }
  if (typeof body.password !== "string" || body.password !== password) {
    return NextResponse.json({ ok: false, error: "Das Passwort ist nicht richtig." }, { status: 401 });
  }
  const res = NextResponse.json({ ok: true });
  res.cookies.set("vw_access", await sha256Hex(password), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 14,
  });
  return res;
}

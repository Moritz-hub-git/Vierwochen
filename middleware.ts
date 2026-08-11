/**
 * Passwortschutz für die Vorschau (PROMPT.md §8): Ist SITE_PASSWORD gesetzt,
 * ist die gesamte Seite geschützt. Der Zugang wird über ein Cookie mit dem
 * SHA-256-Hash des Passworts gewährt (gesetzt von /api/access).
 */
import { NextRequest, NextResponse } from "next/server";

async function sha256Hex(text: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function middleware(req: NextRequest) {
  const password = process.env.SITE_PASSWORD;
  if (!password || password.trim() === "") return NextResponse.next();

  const { pathname } = req.nextUrl;
  // Zugangsseite, Zugangsprüfung und Gesundheitscheck bleiben erreichbar.
  if (pathname === "/zugang" || pathname === "/api/access" || pathname === "/api/health") {
    return NextResponse.next();
  }

  const cookie = req.cookies.get("vw_access")?.value;
  if (cookie && cookie === (await sha256Hex(password.trim()))) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/api/")) {
    return NextResponse.json({ ok: false, error: "Zugang erforderlich." }, { status: 401 });
  }
  const url = req.nextUrl.clone();
  url.pathname = "/zugang";
  url.search = "";
  return NextResponse.redirect(url);
}

export const config = {
  // Statische Dateien und Next-Interna nicht anfassen.
  matcher: ["/((?!_next/static|_next/image|favicon.ico|icon.svg|robots.txt).*)"],
};

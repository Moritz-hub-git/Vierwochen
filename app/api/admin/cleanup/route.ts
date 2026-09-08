/**
 * Löschroutinen anstoßen (lib/retention.ts) — zwei Wege hinein:
 *
 *   1. Als Betreiber mit Admin-Cookie (POST aus dem Browser / curl).
 *   2. Als Cloud Scheduler mit `Authorization: Bearer <CLEANUP_TOKEN>`
 *      (Umgebungsvariable; ohne sie ist dieser Weg geschlossen).
 *
 * Idempotent und in Häppchen — mehrfach aufrufen schadet nie.
 */
import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/adminAuth";
import { env } from "@/lib/config";
import { runRetention } from "@/lib/retention";

export const dynamic = "force-dynamic";
export const maxDuration = 300;

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

async function authorized(req: Request): Promise<boolean> {
  if (await isAdmin()) return true;
  const token = env("CLEANUP_TOKEN");
  if (!token) return false;
  const header = req.headers.get("authorization") ?? "";
  const presented = header.startsWith("Bearer ") ? header.slice(7).trim() : "";
  return presented.length > 0 && timingSafeEqual(presented, token);
}

export async function POST(req: Request) {
  if (!(await authorized(req))) {
    return NextResponse.json({ ok: false, error: "Zugang erforderlich." }, { status: 401 });
  }
  const report = await runRetention();
  if (!report) {
    return NextResponse.json({ ok: false, error: "Keine Datenbank konfiguriert." }, { status: 503 });
  }
  return NextResponse.json({ ok: report.errors.length === 0, report });
}

export const GET = POST;

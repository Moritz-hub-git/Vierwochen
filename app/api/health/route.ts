import { NextResponse } from "next/server";
import { VERTEX } from "@/lib/config";
import { checkMinuteLimit, clientIp } from "@/lib/ratelimit";
import { probeModel } from "@/lib/vertex";

export const dynamic = "force-dynamic";

/**
 * Gesundheitscheck. Mit `?probe=1` wird zusätzlich geprüft, ob das konfigurierte
 * Modell in der eingestellten Region bereitsteht (reine Metadatenabfrage, kostet
 * keine Tokens). Die Prüfung hängt an der Minutenbegrenzung je IP, damit sie
 * nicht als Dauerlast missbraucht werden kann.
 */
export async function GET(req: Request) {
  const base = {
    ok: true,
    service: "vierwochen",
    vertexConfigured: Boolean(VERTEX.project),
    model: VERTEX.model,
    location: VERTEX.location,
    time: new Date().toISOString(),
  };

  const wantsProbe = new URL(req.url).searchParams.get("probe") === "1";
  if (!wantsProbe) {
    return NextResponse.json(base);
  }
  if (!checkMinuteLimit(clientIp(req))) {
    return NextResponse.json({ ...base, probe: { skipped: "Zu viele Anfragen." } }, { status: 429 });
  }
  // Optionaler Modellname, um nach einem Wechsel Kandidaten zu prüfen, ohne neu
  // auszurollen. Bewusst eng gefasst: nur Gemini-Kennungen, und der Aufruf
  // hängt an der Minutenbegrenzung je IP.
  const candidate = new URL(req.url).searchParams.get("model") ?? undefined;
  if (candidate && !/^gemini-[a-z0-9.-]{1,40}$/.test(candidate)) {
    return NextResponse.json({ ...base, probe: { ok: false, error: "Ungültiger Modellname." } }, { status: 400 });
  }
  return NextResponse.json({ ...base, probe: await probeModel(candidate) });
}

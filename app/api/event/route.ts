/**
 * Aufnahme der Trichter-Ereignisse.
 *
 * Bewusst schlank: nimmt nur bekannte Ereignistypen, kappt alle Felder und
 * antwortet immer mit 204 — die Messung darf im Browser niemals als Fehler
 * auffallen. Missbrauch begrenzt das bestehende Minutenlimit je IP.
 */
import { NextResponse } from "next/server";
import { cleanAttribution, isEventType, recordEvent } from "@/lib/events";
import { checkMinuteLimit, clientIp } from "@/lib/ratelimit";

export const dynamic = "force-dynamic";

const noContent = () => new NextResponse(null, { status: 204 });

export async function POST(req: Request) {
  if (!checkMinuteLimit(`ev:${clientIp(req)}`)) return noContent();

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return noContent();
  }

  const type = body.type;
  const sessionId = body.sessionId;
  if (!isEventType(type) || typeof sessionId !== "string" || sessionId.trim() === "") {
    return noContent();
  }

  // Nur einfache Werte in meta übernehmen — nichts Verschachteltes speichern.
  const meta: Record<string, string | number | boolean> = {};
  if (body.meta && typeof body.meta === "object") {
    for (const [k, v] of Object.entries(body.meta as Record<string, unknown>)) {
      if (typeof v === "string") meta[k.slice(0, 40)] = v.slice(0, 200);
      else if (typeof v === "number" || typeof v === "boolean") meta[k.slice(0, 40)] = v;
      if (Object.keys(meta).length >= 12) break;
    }
  }

  await recordEvent({
    type,
    sessionId,
    dialogId:
      typeof body.dialogId === "string" && /^[a-zA-Z0-9-]{8,64}$/.test(body.dialogId)
        ? body.dialogId
        : null,
    path: typeof body.path === "string" ? body.path : "",
    attr: cleanAttribution(body.attr),
    meta,
  });

  return noContent();
}

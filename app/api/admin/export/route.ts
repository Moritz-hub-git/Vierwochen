/**
 * CSV-Export der Rohdaten — für die Musteranalyse in Excel.
 *
 * Semikolon als Trennzeichen und BOM voran, damit deutsches Excel die Datei
 * ohne Import-Assistenten korrekt öffnet (Umlaute inklusive).
 */
import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/adminAuth";
import { loadCases, loadEvents } from "@/lib/events";

export const dynamic = "force-dynamic";

/** Escaping nach RFC 4180; führendes = + - @ neutralisieren (Formel-Injektion). */
function cell(value: unknown): string {
  if (value === null || value === undefined) return "";
  let text = String(value).replace(/\r?\n/g, " ").trim();
  if (/^[=+\-@]/.test(text)) text = `'${text}`;
  return `"${text.replace(/"/g, '""')}"`;
}

function csv(rows: unknown[][]): string {
  return "﻿" + rows.map((r) => r.map(cell).join(";")).join("\r\n");
}

const iso = (d: Date | null) => (d ? d.toISOString() : "");

export async function GET(req: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ ok: false, error: "Zugang erforderlich." }, { status: 401 });
  }

  const url = new URL(req.url);
  const days = Math.min(365, Math.max(1, Number(url.searchParams.get("tage")) || 30));
  const what = url.searchParams.get("was") === "ereignisse" ? "ereignisse" : "faelle";

  let rows: unknown[][];
  if (what === "ereignisse") {
    const events = await loadEvents(days);
    rows = [
      ["Zeitpunkt", "Typ", "Sitzung", "Dialog", "Pfad", "gclid", "utm_source", "utm_medium", "utm_campaign", "Verweis", "Landung", "Meta"],
      ...events.map((e) => [
        iso(e.createdAt),
        e.type,
        e.sessionId,
        e.dialogId ?? "",
        e.path,
        e.attr.gclid ?? "",
        e.attr.utm_source ?? "",
        e.attr.utm_medium ?? "",
        e.attr.utm_campaign ?? "",
        e.attr.referrer ?? "",
        e.attr.landing ?? "",
        JSON.stringify(e.meta ?? {}),
      ]),
    ];
  } else {
    const cases = await loadCases(500);
    rows = [
      ["Zeitpunkt", "Dialog", "Beschriebenes Problem", "Vorhaben", "Endphase", "Antworten", "Stufe", "Preis", "Personentage/Woche", "Status quo je Jahr"],
      ...cases.map((c) => [
        iso(c.updatedAt),
        c.dialogId,
        c.firstMessage,
        c.sketchTitle,
        c.lastPhase,
        c.turns,
        c.tier ?? "",
        c.price ?? "",
        c.personDays ?? "",
        c.annualEuro ?? "",
      ]),
    ];
  }

  const stamp = new Date().toISOString().slice(0, 10);
  return new NextResponse(csv(rows), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="vierwochen-${what}-${stamp}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}

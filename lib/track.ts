"use client";

/**
 * Browserseite der Trichter-Messung.
 *
 * Datensparsam mit Absicht: Sitzungs-ID und Attribution bleiben ausschließlich
 * im Arbeitsspeicher dieses Seitenkontexts. Keine Cookies, kein localStorage,
 * kein sessionStorage, kein Drittanbieter-Skript. Es werden nur die für die
 * Kampagnenauswertung nötigen UTM-Parameter und der Ursprung des Referrers
 * übernommen; Klick-IDs werden nicht gespeichert.
 */

let memorySessionId: string | null = null;
let memoryAttribution: Attribution | null = null;

const ATTR_PARAMS = [
  "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content",
] as const;

function newId(): string {
  try {
    if (typeof crypto?.randomUUID === "function") return crypto.randomUUID();
  } catch {
    // Fällt unten auf den Zufallsweg zurück.
  }
  return `s-${Date.now()}-${Math.floor(Math.random() * 1e9)}`;
}

export function sessionId(): string {
  if (typeof window === "undefined") return "";
  if (!memorySessionId) memorySessionId = newId();
  return memorySessionId;
}

export type Attribution = Record<string, string>;

/**
 * Liest die nötigen UTM-Parameter und merkt sie nur im Arbeitsspeicher dieses
 * Seitenkontexts. Beim ersten Aufruf gewinnt die URL, danach bleibt die
 * ursprüngliche Herkunft bestehen — sonst würde ein interner Klick die
 * Kampagne überschreiben.
 */
export function captureAttribution(): Attribution {
  if (typeof window === "undefined") return {};
  if (memoryAttribution) return memoryAttribution;

  const attr: Attribution = {};
  try {
    const params = new URLSearchParams(window.location.search);
    for (const key of ATTR_PARAMS) {
      const value = params.get(key);
      if (value) attr[key] = value.slice(0, 300);
    }
    if (document.referrer) {
      try {
        const referrer = new URL(document.referrer);
        if (referrer.origin !== window.location.origin) attr.referrer = referrer.origin;
      } catch {
        // Ungültige Referrerangabe nicht speichern.
      }
    }
  } catch {
    // Bei fehlendem Browserkontext bleibt die Attribution leer.
  }
  memoryAttribution = attr;
  return attr;
}

/**
 * Meldet ein Trichter-Ereignis. Bewusst „feuern und vergessen": Die Messung
 * darf die Bedienung nie verzögern oder einen Fehler nach oben reichen.
 */
export function track(
  type: string,
  extra?: { dialogId?: string; meta?: Record<string, string | number | boolean> }
): void {
  if (typeof window === "undefined") return;
  const body = JSON.stringify({
    type,
    sessionId: sessionId(),
    dialogId: extra?.dialogId,
    path: window.location.pathname,
    attr: captureAttribution(),
    meta: extra?.meta,
  });
  try {
    // sendBeacon überlebt auch das Verlassen der Seite.
    if (navigator.sendBeacon) {
      navigator.sendBeacon("/api/event", new Blob([body], { type: "application/json" }));
      return;
    }
  } catch {
    // Auf fetch ausweichen.
  }
  void fetch("/api/event", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true,
  }).catch(() => {});
}

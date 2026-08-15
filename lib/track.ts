"use client";

/**
 * Browserseite der Trichter-Messung.
 *
 * Datensparsam mit Absicht: Sitzungs-ID im sessionStorage (verfällt mit dem
 * Tab), keine Cookies, kein Drittanbieter-Skript. Die Werbe-Herkunft (gclid,
 * utm_*) wird beim ersten Aufruf gemerkt, damit sie später der Buchung
 * zugeordnet werden kann — das ist die Grundlage für den Google-Rückkanal.
 */

const SESSION_KEY = "vw_sid";
const ATTR_KEY = "vw_attr";

const ATTR_PARAMS = [
  "gclid", "gbraid", "wbraid",
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
  try {
    let id = sessionStorage.getItem(SESSION_KEY);
    if (!id) {
      id = newId();
      sessionStorage.setItem(SESSION_KEY, id);
    }
    return id;
  } catch {
    // Privater Modus o. Ä.: Messung ohne Sitzungsbezug statt gar nicht.
    return "no-storage";
  }
}

export type Attribution = Record<string, string>;

/**
 * Liest Werbeparameter aus der URL und merkt sie für die Sitzung. Beim ersten
 * Aufruf gewinnt die URL, danach bleibt die ursprüngliche Herkunft bestehen —
 * sonst würde ein interner Klick die Kampagne überschreiben.
 */
export function captureAttribution(): Attribution {
  if (typeof window === "undefined") return {};
  try {
    const stored = sessionStorage.getItem(ATTR_KEY);
    if (stored) return JSON.parse(stored) as Attribution;
  } catch {
    // weiter unten neu aufbauen
  }

  const attr: Attribution = {};
  try {
    const params = new URLSearchParams(window.location.search);
    for (const key of ATTR_PARAMS) {
      const value = params.get(key);
      if (value) attr[key] = value.slice(0, 300);
    }
    if (document.referrer && !document.referrer.startsWith(window.location.origin)) {
      attr.referrer = document.referrer.slice(0, 300);
    }
    attr.landing = window.location.pathname.slice(0, 200);
    sessionStorage.setItem(ATTR_KEY, JSON.stringify(attr));
  } catch {
    // Ohne Speicher bleibt die Herkunft eben nur für diesen Aufruf bekannt.
  }
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

/** Zentrale, umgebungsabhängige Konfiguration. */
export function env(name: string): string | undefined {
  const v = process.env[name];
  return v && v.trim() !== "" ? v.trim() : undefined;
}

const configuredPublicUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
const publicUrl = (() => {
  try {
    const candidate = new URL(configuredPublicUrl || "https://opsdone.de");
    return candidate.protocol === "http:" || candidate.protocol === "https:"
      ? candidate.toString().replace(/\/$/, "")
      : "https://opsdone.de";
  } catch {
    return "https://opsdone.de";
  }
})();
const publicContact = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || "hallo@vierwochen.de";

/** Server-side delivery address; may differ from the public contact address. */
export function contactEmail(): string {
  return env("CONTACT_EMAIL") ?? env("MAIL_SENDER") ?? publicContact;
}

/** The OpsDone domain is confirmed; the legacy mailbox remains a fallback until a new mailbox is verified. */
export const SITE = {
  name: "OpsDone",
  markA: "Ops",
  markB: "Done",
  domain: (() => {
    try {
      return new URL(publicUrl).hostname;
    } catch {
      return "opsdone.de";
    }
  })(),
  url: publicUrl.replace(/\/$/, ""),
  claim: "Work eliminated.",
  category: "AI-native Process Automation",
  owner: "Moritz Schumacher",
  /** Ansprechpartner — sichtbar auf der Landing, nicht erst im Formular. */
  founder: {
    name: "Moritz Schumacher",
    initials: "MS",
    role: "Verantwortlich für Analyse, Umsetzung und Betrieb Ihrer Prozessautomation.",
    facts: [] as string[],
    /** PLATZHALTER — vom Gründer zu setzen. Leer = Link wird nicht gerendert. */
    linkedin: "",
    /** PLATZHALTER — echtes Foto unter /public/moritz.jpg ablegen und hier eintragen. */
    photo: "",
  },
  email: publicContact,
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE?.trim() ?? "",
} as const;

/** Unverbindliche Leitplanken; der konkrete Preis folgt aus dem Prozess-Scope. */
export const PRICE = {
  /** Unverbindlicher Einstieg für einen klar begrenzten Pilotprozess. */
  floor: 5000,
  /** Typischer Implementierungskorridor; der tatsächliche Preis hängt vom Scope ab. */
  ceiling: 30000,
  /** Netto, zzgl. USt. — steht an jeder Preisstelle. */
  vatNote: "netto zzgl. USt.",
} as const;

/** Managed Automation wird monatlich anhand des vereinbarten Betriebsumfangs kalkuliert. */
export const RETAINER = {
  basic: { name: "Managed Automation", monthly: 0, includes: "Überwachung, Fehlerbehandlung und laufende Pflege im vereinbarten Umfang" },
  plus: { name: "Managed Automation + Ausbau", monthly: 0, includes: "Betrieb sowie priorisierte Weiterentwicklung im vereinbarten Umfang" },
  monthlyLabel: "monatlich nach Prozessvolumen, Integrationen und Service-Level kalkuliert",
  notice: "Laufzeit und Kündigung werden im Angebot festgelegt",
} as const;

/** Legacy export retained for pages that still describe contract terms. */
export const WARRANTY_MONTHS = 24;

/** Scope statement retained under the legacy export name. */
export const ACCEPTANCE_PROMISE = "Pilot, Abnahmekriterien und Betriebsumfang werden vor Projektstart schriftlich festgelegt.";


/**
 * Grundlage des Kostenankers (PROMPT.md §2.4). Bewusst im Code und nicht im
 * Modell: Das Sprachmodell nennt nur die Menge, gerechnet wird hier — ein
 * Rechenfehler in dieser Zahl kostet sofort die Glaubwürdigkeit.
 * 300 € je Personentag entspricht 45.000–60.000 € Jahreskosten einer
 * Sachbearbeitungsstelle auf rund 200 Arbeitstage.
 */
export const COST_ANCHOR = {
  euroPerPersonDay: 300,
  workWeeksPerYear: 45,
} as const;

export const PRICE_DISCLAIMER =
  "Unverbindliche Ersteinschätzung, kein Angebot. Umsetzung typischerweise 5.000–30.000 €, abhängig vom Scope; Managed Automation monatlich nach Umfang. Alle Beträge netto zzgl. USt.";

/** Kostenbremse (PROMPT.md §8): Limits für die offene Modellschnittstelle. */
export const LIMITS = {
  /** Höchstlänge einer Nutzernachricht im Dialog (Zeichen). */
  maxMessageChars: 1500,
  /** Höchstzahl Nutzer-Züge je Dialog. */
  maxUserTurns: 8,
  /** Modellaufrufe je IP und Minute (Prozessspeicher, erste Verteidigungslinie). */
  perMinute: 8,
  /** Modellaufrufe je IP und Tag (Firestore, überlebt Instanzwechsel).
   *  400 statt 60: Ein Unternehmen sitzt hinter wenigen Egress-IPs — 60
   *  Aufrufe waren 12 Dialoge für einen ganzen Konzernbereich. Die echte
   *  Kostenbremse ist das Dialog-Limit (maxUserTurns) und der Preis je
   *  Aufruf (~0,003 €). */
  perDay: 400,
  /** Antwortbudget des Modells — großzügig, damit die wachsende Skizze nie abgeschnitten wird (§5). */
  maxOutputTokens: 16384,
} as const;

/**
 * Aufbewahrungsfristen — exakt die Zusagen aus /datenschutz. Wer hier etwas
 * ändert, ändert die Datenschutzerklärung mit (und umgekehrt). Umgesetzt in
 * lib/retention.ts, ausgelöst über /api/admin/cleanup und einmal täglich
 * nebenläufig aus dem Dialog heraus.
 */
export const RETENTION = {
  /** IP-Adressen in Dialogen, Buchungen, Leads und Tageszählern: 30 Tage. */
  ipDays: 30,
  /** Dialoge ohne Kontaktangabe (kein Lead, keine Buchung): 90 Tage. */
  dialogDays: 90,
  /** Ereignisse der Reichweitenmessung: 12 Monate. */
  eventDays: 365,
} as const;

/**
 * Freemail-Domains: Das Ergebnis gibt es gegen eine geschäftliche Adresse (§5.5).
 * Liste bewusst auf verbreitete Privat-Anbieter im DACH-Raum begrenzt.
 *
 * Bewusst NICHT gesperrt sind Adressen klassischer Zugangsprovider
 * (t-online.de, freenet.de, arcor.de, vodafone.de, o2online.de, magenta.de):
 * Viele Handwerks- und Kleinbetriebe führen seit Jahrzehnten eine solche
 * Adresse als einzige Firmenadresse. Der Zweck des Gates ist Lead-Qualität —
 * keine anonymen Wegwerf-Adressen —, nicht das Aussperren echter Betriebe.
 */
export const FREEMAIL_DOMAINS = new Set([
  "gmail.com",
  "googlemail.com",
  "web.de",
  "gmx.de",
  "gmx.net",
  "gmx.at",
  "gmx.ch",
  "yahoo.com",
  "yahoo.de",
  "hotmail.com",
  "hotmail.de",
  "outlook.com",
  "outlook.de",
  "live.com",
  "live.de",
  "icloud.com",
  "me.com",
  "mac.com",
  "aol.com",
  "aol.de",
  "proton.me",
  "protonmail.com",
  "posteo.de",
  "mail.de",
  "email.de",
]);

/** Terminbuchung (PROMPT.md §7). */
export const BOOKING = {
  timeZone: "Europe/Berlin",
  /** Buchbare Stunden in lokaler Zeit — realistisch für jemanden, der
   *  tagsüber angestellt ist (Rücksprache 2026-09-08): früh, mittags, abends.
   *  Slots außerhalb dieser Fenster werden nicht angeboten. */
  dayStartHour: 8,
  dayEndHour: 19,
  hourWindows: [
    [8, 9],
    [12, 13],
    [17, 19],
  ],
  /** Slotlänge in Minuten; Beginn zur vollen und halben Stunde. */
  slotMinutes: 30,
  /** Vorlauf in Stunden. */
  leadHours: 24,
  /** Horizont in Arbeitstagen. */
  horizonBusinessDays: 8,
  /** Dauer des Gesprächs in Minuten (entspricht Slotlänge). */
  durationMinutes: 30,
} as const;

/**
 * EIN Schalter für die Sichtbarkeit: SITE_LIVE=1 hebt noindex auf — in
 * metadata (app/layout.tsx), robots.ts und dem X-Robots-Header
 * (next.config.ts) zugleich. Vorher steckte noindex an vier Stellen.
 */
export const IS_LIVE = process.env.SITE_LIVE === "1";

export const VERTEX = {
  get project() {
    return env("GOOGLE_CLOUD_PROJECT");
  },
  get location() {
    // Bewusste Entscheidung (Rücksprache 2026-08-12): gemini-3.5-flash-lite
    // steht im regionalen Endpunkt europe-west4 nicht bereit und im
    // EU-Multiregion-Endpunkt (eu) nicht zuverlässig erreichbar (geprüft:
    // 404 trotz korrektem .rep.-Hostnamen). Einzig verfügbar: der globale
    // Endpunkt. Damit ist die Verarbeitung nicht mehr auf die EU begrenzt —
    // die Datenschutzerklärung (app/datenschutz/page.tsx, Abschnitt 4) ist
    // entsprechend angepasst. Über VERTEX_LOCATION ohne Code-Änderung
    // rückstellbar auf einen regionalen EU-Endpunkt.
    return env("VERTEX_LOCATION") ?? "global";
  },
  get model() {
    // Über VERTEX_MODEL ohne Code-Änderung umstellbar.
    return env("VERTEX_MODEL") ?? "gemini-3.5-flash-lite";
  },
} as const;

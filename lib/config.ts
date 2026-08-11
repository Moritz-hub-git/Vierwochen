/**
 * Zentrale Konfiguration und Konstanten.
 *
 * Annahmen (PROMPT.md erlaubt keine Rückfragen, §0):
 * - Preislogik (§6 ist im Auftrag leer): drei Stufen, an den auf der Seite
 *   gezeigten Ankern ausgerichtet. Die teuerste Stufe steht zuerst (Preisanker, §2.4).
 * - Limits der Kostenbremse (§8) sind bewusst konservativ gewählt.
 */

export const SITE = {
  name: "vierwochen",
  domain: "vierwochen.de",
  claim: "In vier Wochen zum Ziel.",
  owner: "Moritz Schumacher",
} as const;

/** Preisstufen — unverbindliche Ersteinschätzung, kein Angebot. Netto zzgl. USt. */
export const PRICING_TIERS = [
  {
    id: "system",
    name: "System",
    range: "28.000 – 48.000 €",
    min: 28000,
    max: 48000,
    description:
      "Mehrere verbundene Prozesse, Schnittstellen zu Bestandssystemen, Rollen und Rechte, Betrieb in Ihrer Umgebung.",
  },
  {
    id: "werkzeug",
    name: "Werkzeug",
    range: "14.000 – 24.000 €",
    min: 14000,
    max: 24000,
    description:
      "Ein Kernprozess als vollwertige Anwendung: Datenbank, Oberfläche, Anbindung an ein Bestandssystem.",
  },
  {
    id: "pilot",
    name: "Pilot",
    range: "ab 9.500 €",
    min: 9500,
    max: 13000,
    description:
      "Ein klar umrissener Prozess, produktiv nutzbar. Der schnellste Weg, das Arbeitsmodell zu prüfen.",
  },
] as const;

export const PRICE_DISCLAIMER =
  "Unverbindliche Ersteinschätzung, kein Angebot. Alle Beträge netto zzgl. USt.";

/** Kostenbremse (PROMPT.md §8): Limits für die offene Modellschnittstelle. */
export const LIMITS = {
  /** Höchstlänge einer Nutzernachricht im Dialog (Zeichen). */
  maxMessageChars: 1500,
  /** Höchstzahl Nutzer-Züge je Dialog. */
  maxUserTurns: 8,
  /** Modellaufrufe je IP und Minute (Prozessspeicher, erste Verteidigungslinie). */
  perMinute: 8,
  /** Modellaufrufe je IP und Tag (Firestore, überlebt Instanzwechsel). */
  perDay: 60,
  /** Antwortbudget des Modells — großzügig, damit die wachsende Skizze nie abgeschnitten wird (§5). */
  maxOutputTokens: 16384,
} as const;

/**
 * Freemail-Domains: Das Ergebnis gibt es gegen eine geschäftliche Adresse (§5.5).
 * Liste bewusst auf verbreitete Privat-Anbieter im DACH-Raum begrenzt.
 */
export const FREEMAIL_DOMAINS = new Set([
  "gmail.com",
  "googlemail.com",
  "web.de",
  "gmx.de",
  "gmx.net",
  "gmx.at",
  "gmx.ch",
  "t-online.de",
  "freenet.de",
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
  "arcor.de",
  "vodafone.de",
  "o2online.de",
  "magenta.de",
]);

/** Terminbuchung (PROMPT.md §7). */
export const BOOKING = {
  timeZone: "Europe/Berlin",
  /** Beginn/Ende des Buchungsfensters in lokaler Zeit (Stunden). */
  dayStartHour: 9,
  dayEndHour: 17,
  /** Slotlänge in Minuten; Beginn zur vollen und halben Stunde. */
  slotMinutes: 30,
  /** Vorlauf in Stunden. */
  leadHours: 24,
  /** Horizont in Arbeitstagen. */
  horizonBusinessDays: 8,
  /** Dauer des Gesprächs in Minuten (entspricht Slotlänge). */
  durationMinutes: 30,
} as const;

export function env(name: string): string | undefined {
  const v = process.env[name];
  return v && v.trim() !== "" ? v.trim() : undefined;
}

export const VERTEX = {
  get project() {
    return env("GOOGLE_CLOUD_PROJECT");
  },
  get location() {
    return env("VERTEX_LOCATION") ?? "europe-west4";
  },
  get model() {
    return env("VERTEX_MODEL") ?? "gemini-2.5-flash";
  },
} as const;

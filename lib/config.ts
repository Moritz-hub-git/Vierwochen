/**
 * Zentrale Konfiguration und Konstanten.
 *
 * Annahmen (PROMPT.md erlaubt keine Rückfragen, §0):
 * - Preislogik (§6 ist im Auftrag leer): drei Stufen, an den auf der Seite
 *   gezeigten Ankern ausgerichtet. Die teuerste Stufe steht zuerst (Preisanker, §2.4).
 * - Limits der Kostenbremse (§8) sind bewusst konservativ gewählt.
 */

/**
 * Marke — EINE Konstante, die alles speist (Rücksprache 2026-09-08).
 *
 * Entscheidung: „vierwochen" statt „neoapp.studio". Gründe aus dem
 * Vollreview: (1) „neoapp" ist in der eigenen Kategorie nicht besitzbar —
 * die neoapps GmbH ist seit 20+ Jahren Software-Dienstleister in DACH
 * (Markenrisiko, Klasse 42); (2) „vierwochen" ist der Benefit selbst und
 * damit distinktiv; (3) Domain, Mail und Kalender laufen bereits auf
 * vierwochen.de. Wer die Marke wechseln will, ändert hier — und nur hier.
 */
export const SITE = {
  name: "vierwochen",
  /** Wortmarke in der Navigation: Text vor und nach dem Akzentzeichen. */
  markA: "vier",
  markB: "wochen",
  domain: "vierwochen.de",
  url: "https://vierwochen.de",
  claim: "Ihre Software. In vier Wochen live.",
  owner: "Moritz Schumacher",
  /** Ansprechpartner — sichtbar auf der Landing, nicht erst im Formular. */
  founder: {
    name: "Moritz Schumacher",
    initials: "MS",
    /** Herkunft, belegbar (PROMPT.md §10) — keine Firmennamen, keine Interna. */
    role: "Vorstandsreferent und Programm-Manager in einem börsennotierten Industrieunternehmen, zuletzt verantwortlich dafür, KI-Anwendungsfälle zu finden und produktiv zu stellen.",
    facts: [
      "Reporting-Aufwand in einem SDAX-Unternehmen von über 32 auf rund 6 Stunden pro Zyklus gesenkt",
      "Rund 30 KI-Anwendungsfälle mit Fachbereichen identifiziert, zwei im Produktivbetrieb",
      "Drei eigene iOS-Apps im App Store — inklusive Backend, Datenbank, KI-Anbindung und Betrieb",
    ],
    /** PLATZHALTER — vom Gründer zu setzen. Leer = Link wird nicht gerendert. */
    linkedin: "",
    /** PLATZHALTER — echtes Foto unter /public/moritz.jpg ablegen und hier eintragen. */
    photo: "",
  },
  /** Kontakt — PLATZHALTER, bis das Impressum vollständig ist. Leer = nicht gerendert. */
  email: "hallo@vierwochen.de",
  phone: "",
} as const;

/**
 * Preise (Rücksprache 2026-09-08, Vollreview: fünf unabhängige Gutachten).
 *
 * Boden 12.500 € statt 9.500 €: Mit Kick-off-Workshop, zweiter Rate nur bei
 * Abnahme, 24 Monaten Gewährleistung und Begleitung bis zum Betrieb lag
 * 9.500 € unter den Vollkosten jedes bezahlten zweiten Kopfes — der Preis
 * hätte das erklärte Ziel (nicht allein bleiben) rechnerisch ausgeschlossen.
 * Decke 35.000 €: mehr entsteht nicht in vier Wochen; darüber wird der
 * Umfang kleiner geschnitten, nicht der Preis erhöht.
 */
export const PRICE = {
  floor: 12500,
  ceiling: 35000,
  /** Netto, zzgl. USt. — steht an jeder Preisstelle. */
  vatNote: "netto zzgl. USt.",
} as const;

/**
 * Betrieb als Standard, nicht als Fußnote: die einzige Einnahme im Modell,
 * die ohne neue Verkaufsarbeit wiederkommt. Monatlich kündbar.
 */
export const RETAINER = {
  basic: { name: "Betrieb", monthly: 290, includes: "Hosting, Updates, Monitoring, Sicherheits-Patches" },
  plus: { name: "Betrieb + Weiterentwicklung", monthly: 990, includes: "wie Betrieb, plus ein Änderungstag pro Monat" },
  notice: "monatlich kündbar",
} as const;

/** Gewährleistung: beim Werkvertrag gesetzlich 24 Monate (§ 634a BGB) — das
 *  ist mehr, als die Seite vorher mit „12 Monate Garantie" versprach. */
export const WARRANTY_MONTHS = 24;

/** Die eine Risiko-Umkehr-Zusage — überall wortgleich (Seite, Karte, AGB). */
export const ACCEPTANCE_PROMISE = "Besteht die Abnahme nicht, entfällt die zweite Rate.";


/* Die alten Preisstufen (System/Werkzeug/Pilot ab 9.500 €) sind gestrichen:
   Der Preis entsteht seit dem Vollreview bottom-up aus PRICE.floor plus
   Bausteinen (lib/dialog.ts, Abschnitt „So rechnest du den Preis"). */

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
  "Unverbindliche Ersteinschätzung, kein Angebot. Alle Beträge netto zzgl. USt.";

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

export function env(name: string): string | undefined {
  const v = process.env[name];
  return v && v.trim() !== "" ? v.trim() : undefined;
}

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

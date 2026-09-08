/**
 * Der Vier-Wochen-Plan mit echten Daten — EINE Rechnung für alle Stellen,
 * an denen der Zeitplan gezeigt wird (Landing-Timeline, Chat-Timeline,
 * Ergebniskarte). Vorher rechnete jede Komponente selbst und kam auf
 * verschiedene Kick-off-Termine.
 *
 * Warum nicht „nächster Montag": Zwischen Erstgespräch, Angebot und Start
 * liegen realistisch zehn Tage — ein Kick-off am kommenden Montag wäre ein
 * Versprechen, das der Gründer nicht halten kann (Rücksprache 2026-09-08).
 */

/** Mindestabstand zwischen heute und Kick-off in Kalendertagen. */
export const KICKOFF_LEAD_DAYS = 10;

/** Tage vom Kick-off (Montag) bis zum Launch (Freitag der vierten Woche). */
export const LAUNCH_OFFSET_DAYS = 25;

/**
 * Tage addieren über setDate statt Millisekunden: übersteht den Wechsel
 * von Sommer- auf Winterzeit, ohne dass ein Datum um einen Tag kippt.
 */
function addDays(d: Date, days: number): Date {
  const r = new Date(d);
  r.setDate(r.getDate() + days);
  return r;
}

/**
 * Kick-off = erster Montag, der mindestens KICKOFF_LEAD_DAYS Kalendertage
 * nach `now` liegt. Wochen 1–4 jeweils sieben Tage weiter, Launch ist der
 * Freitag der vierten Woche. Alle Daten auf 00:00 Ortszeit normiert, damit
 * die Formatierung nie von der Uhrzeit des Aufrufs abhängt.
 */
export function planDates(now: Date = new Date()): { kickoff: Date; weeks: Date[]; launch: Date } {
  const earliest = addDays(now, KICKOFF_LEAD_DAYS);
  earliest.setHours(0, 0, 0, 0);
  // getDay(): 0 = Sonntag, 1 = Montag. Fällt `earliest` auf einen Montag,
  // ist er selbst der Kick-off (Abstand 0, nicht 7).
  const toMonday = (8 - earliest.getDay()) % 7;
  const kickoff = addDays(earliest, toMonday);

  const weeks = [0, 1, 2, 3].map((w) => addDays(kickoff, w * 7));
  const launch = addDays(kickoff, LAUNCH_OFFSET_DAYS);

  return { kickoff, weeks, launch };
}

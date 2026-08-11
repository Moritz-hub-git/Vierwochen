/**
 * Slot-Berechnung für die Terminbuchung (PROMPT.md §7).
 *
 * Regeln: Mo–Fr, 9:00–17:00 Uhr Europe/Berlin, 30 Minuten je Slot, Beginn zur
 * vollen und halben Stunde, 24 Stunden Vorlauf, Horizont 8 Arbeitstage.
 *
 * Sommerzeitfest: Intern wird ausschließlich UTC geführt. Lokale Berliner
 * Wanduhrzeiten werden über die Intl-API in UTC umgerechnet — ohne feste
 * Offsets, damit die Umstellung (MEZ/MESZ) korrekt behandelt wird.
 */
import { BOOKING } from "./config";

export interface Slot {
  /** Beginn in UTC, ISO-8601. Dient zugleich als eindeutiger Schlüssel. */
  startUtc: string;
  /** Ende in UTC, ISO-8601. */
  endUtc: string;
}

export interface SlotDay {
  /** Kalendertag in Berlin, Format YYYY-MM-DD. */
  date: string;
  /** Anzeige, z. B. „Mi, 13. Aug." */
  label: string;
  slots: Slot[];
}

/** Zeitzonen-Offset (Minuten) der Zone `tz` zum Zeitpunkt `date`. */
function tzOffsetMinutes(date: Date, tz: string): number {
  const dtf = new Intl.DateTimeFormat("en-US", {
    timeZone: tz,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
  const parts: Record<string, number> = {};
  for (const p of dtf.formatToParts(date)) {
    if (p.type !== "literal") parts[p.type] = Number(p.value);
  }
  const asUtc = Date.UTC(
    parts.year,
    parts.month - 1,
    parts.day,
    parts.hour % 24,
    parts.minute,
    parts.second
  );
  return Math.round((asUtc - date.getTime()) / 60_000);
}

/** Wandelt eine Berliner Wanduhrzeit in einen UTC-Zeitpunkt um (DST-sicher). */
export function berlinToUtc(year: number, month: number, day: number, hour: number, minute: number): Date {
  // Erst mit UTC raten, dann über den tatsächlichen Offset konvergieren
  // (zwei Iterationen genügen, auch über die Umstellung hinweg).
  let guess = Date.UTC(year, month - 1, day, hour, minute);
  for (let i = 0; i < 2; i++) {
    const offset = tzOffsetMinutes(new Date(guess), BOOKING.timeZone);
    guess = Date.UTC(year, month - 1, day, hour, minute) - offset * 60_000;
  }
  return new Date(guess);
}

/** Kalenderdatum (Jahr/Monat/Tag + Wochentag) eines Zeitpunkts in Berlin. */
function berlinDateOf(date: Date): { year: number; month: number; day: number; weekday: number } {
  const dtf = new Intl.DateTimeFormat("en-US", {
    timeZone: BOOKING.timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "short",
  });
  const parts: Record<string, string> = {};
  for (const p of dtf.formatToParts(date)) {
    if (p.type !== "literal") parts[p.type] = p.value;
  }
  const weekdayMap: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  return {
    year: Number(parts.year),
    month: Number(parts.month),
    day: Number(parts.day),
    weekday: weekdayMap[parts.weekday] ?? 0,
  };
}

function formatDayLabel(year: number, month: number, day: number): string {
  const noonUtc = berlinToUtc(year, month, day, 12, 0);
  return new Intl.DateTimeFormat("de-DE", {
    timeZone: BOOKING.timeZone,
    weekday: "short",
    day: "numeric",
    month: "short",
  }).format(noonUtc);
}

/** Anzeige eines UTC-Zeitpunkts als Berliner Uhrzeit, z. B. „14:30". */
export function formatBerlinTime(utcIso: string): string {
  return new Intl.DateTimeFormat("de-DE", {
    timeZone: BOOKING.timeZone,
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(utcIso));
}

/** Anzeige eines UTC-Zeitpunkts als Berliner Datum + Uhrzeit. */
export function formatBerlinDateTime(utcIso: string): string {
  return new Intl.DateTimeFormat("de-DE", {
    timeZone: BOOKING.timeZone,
    weekday: "long",
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(utcIso));
}

/**
 * Alle regulär anbietbaren Slots ab jetzt: 24 h Vorlauf, 8 Arbeitstage Horizont.
 * Belegungen (Kalender, Datenbank) werden vom Aufrufer herausgefiltert.
 */
export function candidateSlots(now: Date = new Date()): SlotDay[] {
  const earliest = new Date(now.getTime() + BOOKING.leadHours * 3_600_000);
  const days: SlotDay[] = [];

  // Vom heutigen Berliner Kalendertag aus vorwärts gehen, bis genügend
  // Arbeitstage mit mindestens einem buchbaren Slot gefunden sind.
  let cursor = berlinDateOf(now);
  let businessDaysFound = 0;
  let safety = 0;

  while (businessDaysFound < BOOKING.horizonBusinessDays && safety < 40) {
    safety += 1;
    if (cursor.weekday >= 1 && cursor.weekday <= 5) {
      const slots: Slot[] = [];
      for (let h = BOOKING.dayStartHour; h < BOOKING.dayEndHour; h++) {
        for (const m of [0, 30]) {
          const start = berlinToUtc(cursor.year, cursor.month, cursor.day, h, m);
          if (start.getTime() < earliest.getTime()) continue;
          const end = new Date(start.getTime() + BOOKING.slotMinutes * 60_000);
          slots.push({ startUtc: start.toISOString(), endUtc: end.toISOString() });
        }
      }
      // Für den Horizont zählen nur Arbeitstage, die wegen des Vorlaufs
      // überhaupt noch buchbar sind — der Kunde sieht immer 8 wählbare Tage.
      if (slots.length > 0) {
        businessDaysFound += 1;
        days.push({
          date: `${cursor.year}-${String(cursor.month).padStart(2, "0")}-${String(cursor.day).padStart(2, "0")}`,
          label: formatDayLabel(cursor.year, cursor.month, cursor.day),
          slots,
        });
      }
    }
    // Einen Kalendertag weiter (12:00 Uhr vermeidet Randfälle der Umstellung).
    const next = new Date(berlinToUtc(cursor.year, cursor.month, cursor.day, 12, 0).getTime() + 24 * 3_600_000);
    cursor = berlinDateOf(next);
  }
  return days;
}

/** Prüft, ob ein Slot-Beginn zu den regulären Regeln passt (Server-Validierung). */
export function isValidSlotStart(startUtcIso: string, now: Date = new Date()): boolean {
  const ts = Date.parse(startUtcIso);
  if (Number.isNaN(ts)) return false;
  for (const day of candidateSlots(now)) {
    if (day.slots.some((s) => Date.parse(s.startUtc) === ts)) return true;
  }
  return false;
}

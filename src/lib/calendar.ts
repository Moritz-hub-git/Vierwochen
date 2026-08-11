import { zugriffstoken } from './gauth';
import { GESPRAECH_MINUTEN } from './slots';

/**
 * Anbindung an den Google Kalender des Betreibers.
 *
 * Konfiguration über BOOKING_CALENDAR_ID (die Kalenderadresse, die für das
 * Dienstkonto mit "Termine ändern" freigegeben wurde). Ist die Variable nicht
 * gesetzt, arbeitet die Buchung im Anfrage-Modus: Der Wunschtermin wird
 * gespeichert und manuell bestätigt — der Funnel bleibt funktionsfähig.
 *
 * Bekannte Grenze: Dienstkonten dürfen ohne domänenweite Delegation keine
 * Teilnehmer einladen. Der Versand der Einladung wird deshalb versucht und
 * bei einer 403 ohne Teilnehmer wiederholt; die Kontaktdaten stehen dann in
 * der Terminbeschreibung.
 */

const BASIS = 'https://www.googleapis.com/calendar/v3';

export function kalenderKonfiguriert(): boolean {
  return Boolean(process.env.BOOKING_CALENDAR_ID);
}

export async function istFrei(slotIso: string): Promise<boolean> {
  const kalender = process.env.BOOKING_CALENDAR_ID;
  if (!kalender) return true;

  const beginn = new Date(slotIso);
  const ende = new Date(beginn.getTime() + GESPRAECH_MINUTEN * 60 * 1000);

  const antwort = await fetch(`${BASIS}/freeBusy`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${await zugriffstoken()}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      timeMin: beginn.toISOString(),
      timeMax: ende.toISOString(),
      items: [{ id: kalender }],
    }),
  });

  if (!antwort.ok) {
    throw new Error(`Kalender freeBusy ${antwort.status}: ${(await antwort.text()).slice(0, 300)}`);
  }
  const daten = (await antwort.json()) as {
    calendars?: Record<string, { busy?: unknown[] }>;
  };
  const belegt = daten.calendars?.[kalender]?.busy ?? [];
  return belegt.length === 0;
}

export interface TerminDaten {
  slotIso: string;
  kanal: 'video' | 'telefon';
  name: string;
  email: string;
  telefon: string | null;
  fall: string;
}

/** Legt den Termin an. Liefert true, wenn der Kalendereintrag steht. */
export async function terminAnlegen(t: TerminDaten): Promise<boolean> {
  const kalender = process.env.BOOKING_CALENDAR_ID;
  if (!kalender) return false;

  const beginn = new Date(t.slotIso);
  const ende = new Date(beginn.getTime() + GESPRAECH_MINUTEN * 60 * 1000);
  const token = await zugriffstoken();

  const beschreibung =
    `Erstgespräch über vierwochen.de\n\n` +
    `Name: ${t.name}\nE-Mail: ${t.email}\n` +
    (t.telefon ? `Telefon: ${t.telefon}\n` : '') +
    `Kanal: ${t.kanal === 'video' ? 'Videocall' : 'Telefon — Interessent wird angerufen'}\n\n` +
    `Fall:\n${t.fall}`;

  const rumpf = {
    summary: `Erstgespräch: ${t.name}`,
    description: beschreibung,
    start: { dateTime: beginn.toISOString(), timeZone: 'Europe/Berlin' },
    end: { dateTime: ende.toISOString(), timeZone: 'Europe/Berlin' },
    reminders: { useDefault: true },
  };

  // Erster Versuch: mit Einladung an den Interessenten.
  let antwort = await fetch(
    `${BASIS}/calendars/${encodeURIComponent(kalender)}/events?sendUpdates=all`,
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...rumpf, attendees: [{ email: t.email }] }),
    },
  );

  // Dienstkonto darf nicht einladen → ohne Teilnehmer erneut.
  if (antwort.status === 403) {
    antwort = await fetch(`${BASIS}/calendars/${encodeURIComponent(kalender)}/events`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(rumpf),
    });
  }

  if (!antwort.ok) {
    throw new Error(`Kalender-Eintrag ${antwort.status}: ${(await antwort.text()).slice(0, 300)}`);
  }
  return true;
}

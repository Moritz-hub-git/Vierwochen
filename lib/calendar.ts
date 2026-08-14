/**
 * Google-Calendar-Anbindung (PROMPT.md §7).
 *
 * - Freie Zeiten über freeBusy prüfen, Termin über die Calendar-API anlegen.
 * - Authentifizierung über die Dienstkonto-Identität (Scope calendar), keine Schlüssel.
 * - Dienstkonten ohne domänenweite Delegation dürfen keine Teilnehmer einladen:
 *   Einladung versuchen, bei 403 ohne Teilnehmer wiederholen und die Kontaktdaten
 *   in die Terminbeschreibung schreiben.
 * - Ist BOOKING_CALENDAR_ID nicht gesetzt, arbeitet die Buchung im Anfrage-Modus —
 *   diese Datei wird dann gar nicht erst aufgerufen.
 */
import { GoogleAuth } from "google-auth-library";
import { BOOKING, env } from "./config";

const auth = new GoogleAuth({
  scopes: [
    "https://www.googleapis.com/auth/cloud-platform",
    "https://www.googleapis.com/auth/calendar",
  ],
});

export function bookingCalendarId(): string | undefined {
  return env("BOOKING_CALENDAR_ID");
}

/** Belegte Zeiträume [startMs, endMs] im Fenster laut freeBusy. */
export async function busyIntervals(timeMinIso: string, timeMaxIso: string): Promise<[number, number][]> {
  const calendarId = bookingCalendarId();
  if (!calendarId) return [];
  const client = await auth.getClient();
  const res = await client.request<{
    calendars?: Record<string, { busy?: { start: string; end: string }[]; errors?: unknown[] }>;
  }>({
    url: "https://www.googleapis.com/calendar/v3/freeBusy",
    method: "POST",
    data: {
      timeMin: timeMinIso,
      timeMax: timeMaxIso,
      timeZone: "UTC",
      items: [{ id: calendarId }],
    },
    timeout: 15_000,
  });
  const entry = res.data.calendars?.[calendarId];
  if (entry?.errors?.length) {
    console.error("[calendar] freeBusy meldet Fehler:", JSON.stringify(entry.errors));
  }
  return (entry?.busy ?? []).map((b) => [Date.parse(b.start), Date.parse(b.end)]);
}

export function overlapsBusy(startUtcIso: string, endUtcIso: string, busy: [number, number][]): boolean {
  const s = Date.parse(startUtcIso);
  const e = Date.parse(endUtcIso);
  return busy.some(([bs, be]) => s < be && e > bs);
}

export interface EventInput {
  startUtc: string;
  endUtc: string;
  name: string;
  email: string;
  company?: string;
  channel: "video" | "telefon";
  phone?: string;
  summaryOfCase?: string;
  agenda?: string;
}

export interface CreatedEvent {
  eventId: string;
  meetLink?: string;
  attendeeInvited: boolean;
}

/** Legt den Termin an; bei 403 (Teilnehmer verboten) ohne Teilnehmer erneut. */
export async function createEvent(input: EventInput): Promise<CreatedEvent> {
  const calendarId = bookingCalendarId();
  if (!calendarId) throw new Error("BOOKING_CALENDAR_ID nicht gesetzt");
  const client = await auth.getClient();

  const contactBlock = [
    `Name: ${input.name}`,
    input.company ? `Firma: ${input.company}` : null,
    `E-Mail: ${input.email}`,
    `Kanal: ${input.channel === "video" ? "Videocall" : "Telefon"}`,
    input.phone ? `Rufnummer: ${input.phone}` : null,
    input.summaryOfCase ? `\nFall:\n${input.summaryOfCase}` : null,
    input.agenda ? `\nAgenda (vom Nutzer): ${input.agenda}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  const baseEvent = {
    summary: `Erstgespräch vierwochen.de — ${input.name}`,
    description: `Erstgespräch (30 Minuten), gebucht über vierwochen.de.\n\n${contactBlock}`,
    start: { dateTime: input.startUtc, timeZone: "UTC" },
    end: { dateTime: input.endUtc, timeZone: "UTC" },
    reminders: { useDefault: true },
  };

  const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events`;

  // Versuch 1: mit Teilnehmer (und bei Videocall mit Meet-Konferenz).
  const withAttendee = {
    ...baseEvent,
    attendees: [{ email: input.email, displayName: input.name }],
    ...(input.channel === "video"
      ? {
          conferenceData: {
            createRequest: {
              requestId: `vw-${input.startUtc.replace(/\D/g, "")}`,
              conferenceSolutionKey: { type: "hangoutsMeet" },
            },
          },
        }
      : {}),
  };

  try {
    const res = await client.request<{ id: string; hangoutLink?: string }>({
      url: `${url}?conferenceDataVersion=1&sendUpdates=all`,
      method: "POST",
      data: withAttendee,
      timeout: 15_000,
    });
    return { eventId: res.data.id, meetLink: res.data.hangoutLink, attendeeInvited: true };
  } catch (err) {
    const status = (err as { response?: { status?: number } })?.response?.status;
    console.warn(
      `[calendar] Termin mit Teilnehmer fehlgeschlagen (Status ${status ?? "unbekannt"}) — versuche ohne Teilnehmer.`,
      err instanceof Error ? err.message : err
    );
    // Versuch 2: ohne Teilnehmer und ohne Konferenz — Kontaktdaten stehen in der
    // Beschreibung, die Einladung wird manuell nachgereicht.
    const res = await client.request<{ id: string; hangoutLink?: string }>({
      url,
      method: "POST",
      data: baseEvent,
      timeout: 15_000,
    });
    return { eventId: res.data.id, meetLink: res.data.hangoutLink, attendeeInvited: false };
  }
}

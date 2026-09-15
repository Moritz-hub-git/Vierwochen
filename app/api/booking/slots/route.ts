/**
 * Freie Termine (PROMPT.md §7): reguläre Slots berechnen, dann Belegungen aus
 * Google Calendar (freeBusy) und aus der eigenen Datenbank herausfiltern.
 *
 * Konfigurierte Kalender müssen erfolgreich geprüft sein. Bei einem Fehler
 * liefern wir keine scheinbar freien, tatsächlich ungeprüften Termine.
 */
import { NextResponse } from "next/server";
import { bookingCalendarId, busyIntervals, overlapsBusy } from "@/lib/calendar";
import { safe } from "@/lib/firestore";
import { candidateSlots } from "@/lib/slots";

export const dynamic = "force-dynamic";

export async function GET() {
  const days = candidateSlots();
  if (days.length === 0) {
    return NextResponse.json({
      ok: true,
      requestMode: !bookingCalendarId(),
      days: [],
    });
  }

  const windowStart = days[0].slots[0].startUtc;
  const lastDay = days[days.length - 1];
  const windowEnd = lastDay.slots[lastDay.slots.length - 1].endUtc;

  // Bereits gebuchte oder angefragte Slots aus der eigenen Datenbank.
  const booked = new Set<string>(
    (await safe(async (db) => {
      const snap = await db
        .collection("bookings")
        .where("slotStart", ">=", windowStart)
        .where("slotStart", "<=", windowEnd)
        .get();
      return snap.docs
        .filter((d) => d.data().status !== "storniert")
        .map((d) => d.data().slotStart as string);
    }, "Buchungen lesen")) ?? [],
  );

  // Belegte Zeiten aus Google Calendar (nur wenn ein Kalender konfiguriert ist).
  let busy: [number, number][] = [];
  if (bookingCalendarId()) {
    try {
      busy = await busyIntervals(windowStart, windowEnd);
    } catch (err) {
      console.error("[slots] freeBusy fehlgeschlagen:", err);
      return NextResponse.json(
        {
          ok: false,
          error:
            "Die Terminverfügbarkeit kann gerade nicht geprüft werden. Bitte versuchen Sie es später erneut.",
        },
        { status: 503 },
      );
    }
  }

  const result = days
    .map((day) => ({
      date: day.date,
      label: day.label,
      slots: day.slots.filter(
        (s) =>
          !booked.has(s.startUtc) && !overlapsBusy(s.startUtc, s.endUtc, busy),
      ),
    }))
    .filter((day) => day.slots.length > 0);

  return NextResponse.json({
    ok: true,
    requestMode: !bookingCalendarId(),
    timeZone: "Europe/Berlin",
    days: result,
  });
}

/**
 * Terminbuchung (PROMPT.md §7): Eigenbau, kein Fremddienst.
 *
 * Doppelbuchungen verhindert eine Firestore-Transaktion (Dokument-ID = Slotbeginn
 * in UTC) PLUS eine erneute Kalenderprüfung unmittelbar vor dem Anlegen.
 * Ist BOOKING_CALENDAR_ID nicht gesetzt: Anfrage-Modus — die Buchung wird
 * gespeichert und manuell bestätigt. Der Funnel darf nie brechen.
 */
import { NextResponse } from "next/server";
import { FieldValue } from "@google-cloud/firestore";
import { bookingCalendarId, busyIntervals, createEvent, overlapsBusy } from "@/lib/calendar";
import { BOOKING } from "@/lib/config";
import { checkBusinessEmail } from "@/lib/email";
import { firestore, safe } from "@/lib/firestore";
import { bookingConfirmationHtml, sendMail } from "@/lib/mail";
import { clientIp } from "@/lib/ratelimit";
import { formatBerlinDateTime, isValidSlotStart } from "@/lib/slots";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

interface BookRequest {
  slotStart?: string;
  channel?: "video" | "telefon";
  name?: string;
  email?: string;
  company?: string;
  phone?: string;
  dialogId?: string;
  caseSummary?: string;
  agenda?: string;
}

function bad(status: number, error: string) {
  return NextResponse.json({ ok: false, error }, { status });
}

export async function POST(req: Request) {
  let body: BookRequest;
  try {
    body = (await req.json()) as BookRequest;
  } catch {
    return bad(400, "Ungültige Anfrage.");
  }

  // --- Validierung ---
  const emailCheck = checkBusinessEmail(body.email ?? "");
  if (!emailCheck.ok) {
    return bad(422, "Bitte geben Sie Ihre geschäftliche E-Mail-Adresse an.");
  }
  const name = (body.name ?? "").trim();
  if (name.length < 2 || name.length > 200) {
    return bad(422, "Bitte geben Sie Ihren Namen an.");
  }
  const channel = body.channel === "telefon" ? "telefon" : body.channel === "video" ? "video" : null;
  if (!channel) {
    return bad(422, "Bitte wählen Sie Videocall oder Telefon.");
  }
  const phone = (body.phone ?? "").trim();
  if (channel === "telefon" && !/^[+0-9][0-9 \-/()]{5,25}$/.test(phone)) {
    return bad(422, "Für ein Telefonat brauche ich Ihre Rufnummer.");
  }
  const slotStart = body.slotStart ?? "";
  if (!isValidSlotStart(slotStart)) {
    return bad(409, "Dieser Termin ist nicht mehr verfügbar. Bitte wählen Sie einen anderen.");
  }
  const startMs = Date.parse(slotStart);
  const slotEnd = new Date(startMs + BOOKING.durationMinutes * 60_000).toISOString();
  const slotStartIso = new Date(startMs).toISOString();
  // Agenda-Frage (optional): erhöht Vorbereitung und Erscheinen, weil der
  // Nutzer sich vor dem Termin schon auf ein Thema festgelegt hat.
  const agenda = typeof body.agenda === "string" ? body.agenda.trim().slice(0, 500) : "";
  const company = typeof body.company === "string" ? body.company.trim().slice(0, 200) : "";
  const caseSummary = typeof body.caseSummary === "string" ? body.caseSummary.slice(0, 2000) : "";

  // Bestätigungsmail nach erfolgreicher Buchung — nachgelagert und ohne die
  // Antwort zu verzögern; ein Fehlschlag bricht den Funnel nie.
  const queueConfirmationMail = (mode: "bestätigt" | "angefragt", meetLink?: string) => {
    void sendMail({
      to: emailCheck.email,
      subject:
        mode === "bestätigt"
          ? `Ihr Beratungsgespräch am ${formatBerlinDateTime(slotStartIso)} Uhr — vierwochen.de`
          : `Ihre Terminanfrage für ${formatBerlinDateTime(slotStartIso)} Uhr — vierwochen.de`,
      html: bookingConfirmationHtml({
        to: emailCheck.email,
        name,
        company: company || undefined,
        slotStartIso,
        channel,
        agenda: agenda || undefined,
        caseTitle: caseSummary ? caseSummary.split(" — ")[0] : undefined,
        mode,
        meetLink,
      }),
    }).catch((err) => console.warn("[booking] Bestätigungsmail fehlgeschlagen:", err));
  };

  const requestMode = !bookingCalendarId();
  const db = firestore();

  // --- Reservierung: Transaktion verhindert Doppelbuchung in der Datenbank ---
  // Dokument-ID = Slotbeginn (UTC, ISO) → zwei gleichzeitige Buchungen desselben
  // Slots können nicht beide anlegen.
  if (db) {
    try {
      const created = await db.runTransaction(async (tx) => {
        const ref = db.collection("bookings").doc(slotStartIso.replace(/[:.]/g, "-"));
        const snap = await tx.get(ref);
        if (snap.exists && snap.data()?.status !== "storniert") return false;
        tx.set(ref, {
          slotStart: slotStartIso,
          slotEnd,
          name,
          email: emailCheck.email,
          company: company || null,
          channel,
          phone: channel === "telefon" ? phone : null,
          dialogId: typeof body.dialogId === "string" ? body.dialogId.slice(0, 64) : null,
          caseSummary: caseSummary || null,
          agenda: agenda || null,
          status: requestMode ? "angefragt" : "reserviert",
          ip: clientIp(req),
          createdAt: FieldValue.serverTimestamp(),
        });
        return true;
      });
      if (!created) {
        return bad(409, "Dieser Termin wurde gerade vergeben. Bitte wählen Sie einen anderen.");
      }
    } catch (err) {
      console.error("[booking] Reservierung fehlgeschlagen:", err);
      return bad(500, "Die Buchung ist gerade nicht möglich. Bitte versuchen Sie es erneut.");
    }
  } else if (!requestMode) {
    // Ohne Datenbank schützt allein die Kalenderprüfung — funktioniert, aber loggen.
    console.warn("[booking] Firestore nicht verfügbar — Doppelbuchungsschutz nur über Kalender.");
  }

  const bookingRef = db ? db.collection("bookings").doc(slotStartIso.replace(/[:.]/g, "-")) : null;

  // --- Anfrage-Modus: kein Kalender konfiguriert, manuelle Bestätigung ---
  if (requestMode) {
    queueConfirmationMail("angefragt");
    return NextResponse.json({
      ok: true,
      mode: "angefragt",
      message: `Ihre Terminanfrage für ${formatBerlinDateTime(slotStartIso)} Uhr ist eingegangen. Sie erhalten kurzfristig eine Bestätigung per E-Mail.`,
    });
  }

  // --- Kalenderprüfung unmittelbar vor dem Anlegen (Slot inzwischen weg?) ---
  try {
    const busy = await busyIntervals(slotStartIso, slotEnd);
    if (overlapsBusy(slotStartIso, slotEnd, busy)) {
      if (bookingRef) {
        await safe(async () => bookingRef.update({ status: "storniert", reason: "Kalender belegt" }), "Reservierung stornieren");
      }
      return bad(409, "Dieser Termin wurde gerade vergeben. Bitte wählen Sie einen anderen.");
    }
  } catch (err) {
    console.error("[booking] Kalenderprüfung vor Buchung fehlgeschlagen — fahre fort:", err);
  }

  // --- Termin anlegen ---
  try {
    const event = await createEvent({
      startUtc: slotStartIso,
      endUtc: slotEnd,
      name,
      email: emailCheck.email,
      company: company || undefined,
      channel,
      phone: channel === "telefon" ? phone : undefined,
      summaryOfCase: caseSummary || undefined,
      agenda: agenda || undefined,
    });
    if (bookingRef) {
      await safe(
        async () =>
          bookingRef.update({
            status: "bestätigt",
            eventId: event.eventId,
            meetLink: event.meetLink ?? null,
            attendeeInvited: event.attendeeInvited,
          }),
        "Buchung bestätigen"
      );
    }
    queueConfirmationMail("bestätigt", event.meetLink);
    return NextResponse.json({
      ok: true,
      mode: "bestätigt",
      meetLink: event.meetLink ?? null,
      attendeeInvited: event.attendeeInvited,
      message: event.attendeeInvited
        ? `Ihr Termin am ${formatBerlinDateTime(slotStartIso)} Uhr steht. Die Kalendereinladung ist unterwegs an ${emailCheck.email}.`
        : `Ihr Termin am ${formatBerlinDateTime(slotStartIso)} Uhr steht. Sie erhalten die Einladung kurzfristig per E-Mail an ${emailCheck.email}.`,
    });
  } catch (err) {
    console.error("[booking] Kalendereintrag fehlgeschlagen — Buchung bleibt als Anfrage bestehen:", err);
    if (bookingRef) {
      await safe(async () => bookingRef.update({ status: "angefragt", reason: "Kalenderfehler" }), "Buchung als Anfrage markieren");
    }
    // Funnel nicht brechen: Anfrage ist gespeichert, Bestätigung folgt manuell.
    queueConfirmationMail("angefragt");
    return NextResponse.json({
      ok: true,
      mode: "angefragt",
      message: `Ihre Terminanfrage für ${formatBerlinDateTime(slotStartIso)} Uhr ist eingegangen. Sie erhalten kurzfristig eine Bestätigung per E-Mail.`,
    });
  }
}

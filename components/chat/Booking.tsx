"use client";

import { useEffect, useState } from "react";

/**
 * Terminbuchung direkt unter dem Ergebnis — kein Seitenwechsel, kein neues
 * Formular (PROMPT.md §2.2, §5.6, §7). Zeiten kommen als UTC vom Server und
 * werden hier nach Europe/Berlin formatiert.
 */

interface Slot {
  startUtc: string;
  endUtc: string;
}

interface SlotDay {
  date: string;
  label: string;
  slots: Slot[];
}

function berlinTime(utcIso: string): string {
  return new Intl.DateTimeFormat("de-DE", {
    timeZone: "Europe/Berlin",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(utcIso));
}

export default function Booking({
  email,
  name,
  dialogId,
  caseSummary,
}: {
  email: string;
  name: string;
  dialogId: string;
  caseSummary: string;
}) {
  const [days, setDays] = useState<SlotDay[] | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [activeDay, setActiveDay] = useState(0);
  const [slot, setSlot] = useState<string | null>(null);
  const [channel, setChannel] = useState<"video" | "telefon">("video");
  const [phone, setPhone] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<{ message: string; mode: string } | null>(null);

  const loadSlots = () => {
    setLoadError(null);
    setDays(null);
    fetch("/api/booking/slots")
      .then((r) => r.json())
      .then((data: { ok: boolean; days?: SlotDay[] }) => {
        if (data.ok && data.days) {
          setDays(data.days);
          setActiveDay(0);
          setSlot(null);
        } else {
          setLoadError("Die Termine lassen sich gerade nicht laden.");
        }
      })
      .catch(() => setLoadError("Die Termine lassen sich gerade nicht laden."));
  };

  useEffect(loadSlots, []);

  const book = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!slot) {
      setError("Bitte wählen Sie einen Termin.");
      return;
    }
    setError(null);
    setBusy(true);
    try {
      const res = await fetch("/api/booking/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slotStart: slot,
          channel,
          name,
          email,
          phone: channel === "telefon" ? phone : undefined,
          dialogId,
          caseSummary,
        }),
      });
      const data = (await res.json()) as { ok: boolean; mode?: string; message?: string; error?: string };
      if (data.ok) {
        setSuccess({ message: data.message ?? "Ihr Termin steht.", mode: data.mode ?? "bestätigt" });
      } else if (res.status === 409) {
        // Slot inzwischen weg: sauber abfangen, Liste neu laden (PROMPT.md §7).
        setError(data.error ?? "Dieser Termin wurde gerade vergeben. Bitte wählen Sie einen anderen.");
        loadSlots();
      } else {
        setError(data.error ?? "Die Buchung hat nicht geklappt. Bitte versuchen Sie es erneut.");
      }
    } catch {
      setError("Keine Verbindung. Bitte versuchen Sie es erneut.");
    } finally {
      setBusy(false);
    }
  };

  if (success) {
    return (
      <div className="booking">
        <div className="booking-success">
          <div className="check" aria-hidden>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </div>
          <h3>{success.mode === "angefragt" ? "Anfrage eingegangen" : "Termin gebucht"}</h3>
          <p style={{ marginBottom: 0 }}>{success.message}</p>
        </div>
      </div>
    );
  }

  return (
    <form className="booking" onSubmit={book}>
      <h3>Erstgespräch wählen</h3>
      <p>30 Minuten, kostenlos. Alle Zeiten in deutscher Zeit (Europe/Berlin).</p>

      {loadError && (
        <div className="form-error" role="alert">
          {loadError}{" "}
          <button type="button" className="btn btn-ghost" onClick={loadSlots} style={{ padding: "0.3rem 0.9rem", fontSize: "0.85rem" }}>
            Erneut laden
          </button>
        </div>
      )}

      {!days && !loadError && <p>Termine werden geladen …</p>}

      {days && days.length === 0 && (
        <p>Aktuell sind keine Termine frei. Schreiben Sie mir: <a href="mailto:kontakt@vierwochen.de">kontakt@vierwochen.de</a></p>
      )}

      {days && days.length > 0 && (
        <>
          <div className="slot-days" role="tablist" aria-label="Tag wählen">
            {days.map((day, i) => (
              <button
                key={day.date}
                type="button"
                role="tab"
                aria-selected={i === activeDay}
                className={`slot-day${i === activeDay ? " active" : ""}`}
                onClick={() => {
                  setActiveDay(i);
                  setSlot(null);
                }}
              >
                {day.label}
              </button>
            ))}
          </div>

          <div className="slot-times">
            {days[activeDay]?.slots.map((s) => (
              <button
                key={s.startUtc}
                type="button"
                className={`slot-time${slot === s.startUtc ? " active" : ""}`}
                onClick={() => setSlot(s.startUtc)}
                aria-pressed={slot === s.startUtc}
              >
                {berlinTime(s.startUtc)}
              </button>
            ))}
          </div>

          <div className="channel-row" role="radiogroup" aria-label="Gesprächskanal">
            <button
              type="button"
              role="radio"
              aria-checked={channel === "video"}
              className={`channel-btn${channel === "video" ? " active" : ""}`}
              onClick={() => setChannel("video")}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="m22 8-6 4 6 4V8Z" /><rect x="2" y="6" width="14" height="12" rx="2" />
              </svg>
              Videocall
            </button>
            <button
              type="button"
              role="radio"
              aria-checked={channel === "telefon"}
              className={`channel-btn${channel === "telefon" ? " active" : ""}`}
              onClick={() => setChannel("telefon")}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z" />
              </svg>
              Telefon
            </button>
          </div>

          {channel === "telefon" && (
            <div className="field">
              <label htmlFor="booking-phone">Ihre Rufnummer</label>
              <input
                id="booking-phone"
                type="tel"
                autoComplete="tel"
                required
                maxLength={26}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+49 …"
              />
            </div>
          )}

          {error && <div className="form-error" role="alert">{error}</div>}

          <button type="submit" className="btn btn-primary" disabled={busy || !slot} style={{ width: "100%" }}>
            {busy ? "Wird gebucht …" : "Termin verbindlich buchen"}
          </button>
        </>
      )}
    </form>
  );
}

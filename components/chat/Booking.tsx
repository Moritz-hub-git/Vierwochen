"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { SITE } from "@/lib/config";
import { captureAttribution, sessionId, track } from "@/lib/track";

interface Slot {
  startUtc: string;
  endUtc: string;
}

interface SlotDay {
  date: string;
  label: string;
  slots: Slot[];
}

interface SlotsResponse {
  ok: boolean;
  requestMode?: boolean;
  days?: SlotDay[];
  error?: string;
}

type BookingResult = {
  message: string;
  mode: "bestätigt" | "angefragt";
  slot?: string;
};

function berlinTime(utcIso: string): string {
  return new Intl.DateTimeFormat("de-DE", {
    timeZone: "Europe/Berlin",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(utcIso));
}

function berlinDay(utcIso: string): string {
  return new Intl.DateTimeFormat("de-DE", {
    timeZone: "Europe/Berlin",
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(new Date(utcIso));
}

function isAbortError(error: unknown): boolean {
  return error instanceof DOMException && error.name === "AbortError";
}

export default function Booking({
  dialogId,
  caseSummary,
  suggestedAgenda,
  onBooked,
}: {
  dialogId: string;
  caseSummary: string;
  suggestedAgenda?: string;
  onBooked?: () => void;
}) {
  const [days, setDays] = useState<SlotDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [requestMode, setRequestMode] = useState<boolean | null>(null);
  const [activeDay, setActiveDay] = useState(0);
  const [slot, setSlot] = useState<string | null>(null);
  const [channel, setChannel] = useState<"video" | "telefon">("video");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<BookingResult | null>(null);
  const loadAbortRef = useRef<AbortController | null>(null);
  const bookingAbortRef = useRef<AbortController | null>(null);
  const daysRef = useRef<HTMLDivElement | null>(null);
  const [daysAtEnd, setDaysAtEnd] = useState(true);

  const loadSlots = useCallback(async () => {
    loadAbortRef.current?.abort();
    const controller = new AbortController();
    loadAbortRef.current = controller;
    const timeout = window.setTimeout(() => controller.abort(), 12_000);

    setLoading(true);
    setLoadError(null);
    setError(null);
    try {
      const response = await fetch("/api/booking/slots", {
        cache: "no-store",
        signal: controller.signal,
      });
      const data = (await response.json()) as SlotsResponse;
      if (!response.ok || !data.ok || !Array.isArray(data.days)) {
        throw new Error(
          data.error || "Die Termine lassen sich gerade nicht laden.",
        );
      }
      if (loadAbortRef.current !== controller) return;
      setDays(data.days);
      setRequestMode(Boolean(data.requestMode));
      setActiveDay(0);
      setSlot(null);
    } catch (loadFailure) {
      if (loadAbortRef.current !== controller) return;
      setDays([]);
      setRequestMode(null);
      setLoadError(
        isAbortError(loadFailure)
          ? "Das Laden dauert länger als erwartet. Bitte versuchen Sie es erneut."
          : loadFailure instanceof Error
            ? loadFailure.message
            : "Die Termine lassen sich gerade nicht laden.",
      );
    } finally {
      window.clearTimeout(timeout);
      if (loadAbortRef.current === controller) {
        loadAbortRef.current = null;
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    void loadSlots();
    return () => {
      const loadController = loadAbortRef.current;
      loadAbortRef.current = null;
      loadController?.abort();
      const bookingController = bookingAbortRef.current;
      bookingAbortRef.current = null;
      bookingController?.abort();
    };
  }, [loadSlots]);

  const checkDaysEnd = (element: HTMLElement) => {
    setDaysAtEnd(
      element.scrollLeft + element.clientWidth >= element.scrollWidth - 4,
    );
  };

  useEffect(() => {
    const element = daysRef.current;
    if (!element) return;
    checkDaysEnd(element);
    const observer = new ResizeObserver(() => checkDaysEnd(element));
    observer.observe(element);
    return () => observer.disconnect();
  }, [days]);

  async function book(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!slot || busy) {
      if (!slot) setError("Bitte wählen Sie zuerst eine Zeit.");
      return;
    }

    bookingAbortRef.current?.abort();
    const controller = new AbortController();
    bookingAbortRef.current = controller;
    const formData = new FormData(event.currentTarget);
    const timeout = window.setTimeout(() => controller.abort(), 30_000);
    setError(null);
    setBusy(true);

    try {
      const response = await fetch("/api/booking/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          slotStart: slot,
          channel,
          name: name.trim(),
          email: email.trim(),
          company: company.trim() || undefined,
          phone: channel === "telefon" ? phone.trim() : undefined,
          dialogId,
          caseSummary,
          agenda: suggestedAgenda?.trim() || undefined,
          sessionId: sessionId(),
          attr: captureAttribution(),
          website: formData.get("website"),
        }),
      });
      const data = (await response.json()) as {
        ok?: boolean;
        mode?: "bestätigt" | "angefragt";
        message?: string;
        error?: string;
      };

      if (response.ok && data.ok) {
        if (data.mode !== "bestätigt" && data.mode !== "angefragt") {
          setError(
            "Die Anfrage wurde vom Server angenommen, ihr Status konnte aber nicht eindeutig bestätigt werden. Bitte prüfen Sie Ihr Postfach oder schreiben Sie uns, bevor Sie erneut buchen.",
          );
          return;
        }
        const mode = data.mode;
        const bookingResult: BookingResult = {
          mode,
          message:
            data.message ||
            (mode === "angefragt"
              ? "Ihre Terminanfrage ist eingegangen und wird persönlich bestätigt."
              : "Ihr Termin ist gebucht."),
          slot,
        };
        setSuccess(bookingResult);
        onBooked?.();
        return;
      }

      if (response.status === 409) {
        await loadSlots();
        setError(
          data.error ||
            "Diese Zeit ist nicht mehr verfügbar. Bitte wählen Sie eine andere.",
        );
        return;
      }
      setError(
        data.error ||
          "Die Buchung konnte nicht abgeschlossen werden. Bitte versuchen Sie es erneut.",
      );
    } catch (bookingFailure) {
      if (bookingAbortRef.current !== controller) return;
      setError(
        isAbortError(bookingFailure)
          ? "Die Bestätigung dauert länger als erwartet. Ihre Anfrage kann trotzdem eingegangen sein. Bitte prüfen Sie Ihr Postfach oder schreiben Sie uns, bevor Sie erneut buchen."
          : "Die Verbindung ist abgebrochen. Bitte versuchen Sie es erneut.",
      );
    } finally {
      window.clearTimeout(timeout);
      if (bookingAbortRef.current === controller) {
        bookingAbortRef.current = null;
        setBusy(false);
      }
    }
  }

  if (success) {
    return (
      <div className="booking booking-complete" role="status">
        <div className="booking-success">
          <span className="booking-success-icon" aria-hidden="true">
            ✓
          </span>
          <p className="booking-kicker">
            {success.mode === "angefragt"
              ? "Terminanfrage"
              : "Terminbestätigung"}
          </p>
          <h3>
            {success.mode === "angefragt"
              ? "Anfrage eingegangen"
              : "Termin gebucht"}
          </h3>
          <p>{success.message}</p>
          {success.slot && (
            <p className="booking-success-time">
              {berlinDay(success.slot)}, {berlinTime(success.slot)} Uhr
            </p>
          )}
          <p className="booking-success-note">
            {success.mode === "angefragt"
              ? "Die gewählte Zeit ist erst nach der persönlichen Bestätigung verbindlich."
              : "Ihr Lösungsentwurf liegt als Ausgangspunkt für das Gespräch vor."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <form className="booking booking-compact" onSubmit={book}>
      <div className="booking-header">
        <p className="booking-kicker">Nächster Schritt</p>
        <h3>Lassen Sie uns daraus Ihre Anwendung machen.</h3>
        <p className="booking-lead">
          30 Minuten · kostenlos · keine Vorbereitung nötig. Wir prüfen Prozess,
          Systeme und Machbarkeit und konkretisieren Ihren Lösungsentwurf.
        </p>
      </div>

      {loading && (
        <p className="booking-loading" role="status">
          Freie Zeiten werden geladen …
        </p>
      )}

      {loadError && (
        <div className="booking-load-error form-error" role="alert">
          <p>{loadError}</p>
          <button
            type="button"
            className="booking-retry btn btn-ghost"
            onClick={() => void loadSlots()}
          >
            Erneut laden
          </button>
          <a href={`mailto:${SITE.email}`}>Oder per E-Mail an {SITE.email}</a>
        </div>
      )}

      {!loading && !loadError && requestMode !== null && (
        <div
          className={`booking-mode-note ${requestMode ? "booking-mode-request" : "booking-mode-direct"}`}
          id="booking-mode-note"
          role="status"
        >
          <strong>{requestMode ? "Terminanfrage" : "Direkte Buchung"}</strong>
          <span>
            {requestMode
              ? "Sie wählen eine Wunschzeit. Der Termin steht erst nach unserer persönlichen Bestätigung."
              : "Die angezeigten Zeiten sind frei. Nach dem Absenden wird der Termin direkt gebucht."}{" "}
            Alle Zeiten gelten für Berlin.
          </span>
        </div>
      )}

      {error && !slot && (
        <div className="booking-error form-error" role="alert">
          <span>{error}</span>
          <a href={`mailto:${SITE.email}`}>Direkt an {SITE.email} schreiben</a>
        </div>
      )}

      {!loading && !loadError && days.length === 0 && (
        <div className="booking-empty">
          <p>Aktuell können wir keine Zeit anbieten.</p>
          <a href={`mailto:${SITE.email}`}>
            Schreiben Sie direkt an {SITE.email}
          </a>
        </div>
      )}

      {!loading && !loadError && days.length > 0 && (
        <>
          <div className="booking-step">
            <span className="booking-step-label">1 · Zeit wählen</span>
            <div className={`slot-days-wrap${daysAtEnd ? " at-end" : ""}`}>
              <div
                className="slot-days"
                role="group"
                aria-label="Tag wählen"
                ref={daysRef}
                onScroll={(event) => checkDaysEnd(event.currentTarget)}
              >
                {days.map((day, index) => (
                  <button
                    key={day.date}
                    type="button"
                    aria-pressed={index === activeDay}
                    className={`slot-day${index === activeDay ? " active" : ""}`}
                    onClick={() => {
                      setActiveDay(index);
                      setSlot(null);
                      setError(null);
                    }}
                  >
                    {day.label}
                  </button>
                ))}
              </div>
            </div>

            <div
              className="slot-times"
              role="group"
              aria-label={`Zeiten für ${days[activeDay]?.label ?? "den gewählten Tag"}`}
            >
              {days[activeDay]?.slots.map((availableSlot) => (
                <button
                  key={availableSlot.startUtc}
                  type="button"
                  className={`slot-time${slot === availableSlot.startUtc ? " active" : ""}`}
                  onClick={() => {
                    if (!slot) track("booking_slot_selected", { dialogId });
                    setSlot(availableSlot.startUtc);
                    setError(null);
                  }}
                  aria-pressed={slot === availableSlot.startUtc}
                >
                  {berlinTime(availableSlot.startUtc)}
                </button>
              ))}
            </div>
          </div>

          {slot && (
            <div
              className="booking-contact"
              aria-describedby="booking-mode-note"
            >
              <div className="booking-chosen">
                <span aria-hidden="true">✓</span>
                <strong>
                  {berlinDay(slot)}, {berlinTime(slot)} Uhr
                </strong>
                <button type="button" onClick={() => setSlot(null)}>
                  Ändern
                </button>
              </div>

              <span className="booking-step-label">2 · Kontaktdaten</span>
              <div className="booking-fields">
                <div className="field booking-field">
                  <label htmlFor="booking-name">Name</label>
                  <input
                    id="booking-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    minLength={2}
                    maxLength={200}
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Vor- und Nachname"
                  />
                </div>
                <div className="field booking-field">
                  <label htmlFor="booking-email">E-Mail</label>
                  <input
                    id="booking-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    required
                    maxLength={254}
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="name@unternehmen.de"
                  />
                </div>
                <div className="field booking-field booking-field-wide">
                  <label htmlFor="booking-company">
                    Unternehmen{" "}
                    <span className="booking-optional">optional</span>
                  </label>
                  <input
                    id="booking-company"
                    name="company"
                    type="text"
                    autoComplete="organization"
                    maxLength={200}
                    value={company}
                    onChange={(event) => setCompany(event.target.value)}
                    placeholder="Unternehmen"
                  />
                </div>
              </div>

              <fieldset className="booking-channel">
                <legend>Gesprächskanal</legend>
                <div className="channel-row">
                  <label
                    className={`channel-btn${channel === "video" ? " active" : ""}`}
                  >
                    <input
                      type="radio"
                      name="channel"
                      value="video"
                      checked={channel === "video"}
                      onChange={() => setChannel("video")}
                    />
                    Online-Call
                  </label>
                  <label
                    className={`channel-btn${channel === "telefon" ? " active" : ""}`}
                  >
                    <input
                      type="radio"
                      name="channel"
                      value="telefon"
                      checked={channel === "telefon"}
                      onChange={() => setChannel("telefon")}
                    />
                    Telefon
                  </label>
                </div>
              </fieldset>

              {channel === "telefon" && (
                <div className="field booking-field booking-phone">
                  <label htmlFor="booking-phone">Rufnummer</label>
                  <input
                    id="booking-phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    required
                    maxLength={26}
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    placeholder="+49 …"
                  />
                </div>
              )}

              <div className="honeypot" aria-hidden="true">
                <label htmlFor="booking-website">Website</label>
                <input
                  id="booking-website"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              {error && (
                <div className="booking-error form-error" role="alert">
                  <span>{error}</span>
                  <a href={`mailto:${SITE.email}`}>
                    Direkt an {SITE.email} schreiben
                  </a>
                </div>
              )}

              <button
                type="submit"
                className="booking-submit btn btn-primary"
                disabled={busy}
              >
                {busy
                  ? requestMode
                    ? "Anfrage wird gesendet …"
                    : "Termin wird gebucht …"
                  : requestMode
                    ? "Terminanfrage senden"
                    : "Termin buchen"}
              </button>
              <p className="booking-consent">
                Mit dem Absenden verarbeiten wir Ihre Angaben zur
                Terminorganisation.{" "}
                <a
                  href="/datenschutz"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Datenschutz
                </a>
              </p>
            </div>
          )}
        </>
      )}
    </form>
  );
}

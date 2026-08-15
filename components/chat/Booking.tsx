"use client";

import { useEffect, useRef, useState } from "react";
import { captureAttribution, sessionId, track } from "@/lib/track";

/**
 * Terminbuchung direkt unter dem Ergebnis (PROMPT.md §2.2, §5.6, §7).
 *
 * Reihenfolge bewusst: erst Termin wählen, dann Kontaktdaten.
 * Die Slotwahl kostet den Besucher nichts und ist ein Mikro-Commitment.
 *
 * Im Kontaktschritt kommt die E-MAIL ZUERST: Aus ihr leiten wir Name und
 * Firma ab und befüllen die Felder animiert vor („die KI liest mit") —
 * ein kleiner Produktbeweis an genau der Stelle, an der sonst Formularmüdigkeit
 * einsetzt. Beide Felder bleiben editierbar; erkannt heißt nicht behauptet.
 *
 * Zeiten kommen als UTC vom Server und werden hier nach Europe/Berlin formatiert.
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

function berlinDay(utcIso: string): string {
  return new Intl.DateTimeFormat("de-DE", {
    timeZone: "Europe/Berlin",
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(new Date(utcIso));
}

/** Häufige Privat-Domains: daraus lässt sich keine Firma ableiten. */
const FREEMAIL_HINTS = new Set([
  "gmail.com", "googlemail.com", "web.de", "gmx.de", "gmx.net", "gmx.at", "gmx.ch",
  "t-online.de", "freenet.de", "yahoo.com", "yahoo.de", "hotmail.com", "hotmail.de",
  "outlook.com", "outlook.de", "live.com", "live.de", "icloud.com", "me.com",
  "proton.me", "protonmail.com", "posteo.de", "mail.de", "magenta.de",
]);

const cap = (w: string) => (w ? w[0].toUpperCase() + w.slice(1) : w);

/**
 * Leitet Name und Firma aus einer geschäftlichen Adresse ab.
 * max.mustermann@musterbau-gmbh.de → „Max Mustermann", „Musterbau Gmbh".
 * Deterministisch und sofort — die kurze Animation macht die Arbeit sichtbar.
 */
function deriveFromEmail(email: string): { name: string; company: string } | null {
  const at = email.indexOf("@");
  if (at < 1 || at === email.length - 1) return null;
  const local = email.slice(0, at).toLowerCase();
  const domain = email.slice(at + 1).toLowerCase();
  if (!/^[a-z0-9.-]+\.[a-z]{2,}$/.test(domain)) return null;

  const nameParts = local
    .split(/[._+-]+/)
    .map((p) => p.replace(/\d+$/, ""))
    .filter((p) => p.length > 1)
    .slice(0, 3);
  const name = nameParts.map(cap).join(" ");

  let company = "";
  if (!FREEMAIL_HINTS.has(domain)) {
    const labels = domain.split(".");
    labels.pop(); // TLD
    if (labels.length > 1 && ["co", "com"].includes(labels[labels.length - 1])) labels.pop();
    const core = labels[labels.length - 1] ?? "";
    const LEGAL: Record<string, string> = { gmbh: "GmbH", ag: "AG", kg: "KG", ug: "UG", ohg: "OHG", se: "SE" };
    company = core
      .split("-")
      .filter(Boolean)
      .map((w) => LEGAL[w] ?? cap(w))
      .join(" ");
  }
  if (!name && !company) return null;
  return { name, company };
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
  const [days, setDays] = useState<SlotDay[] | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [activeDay, setActiveDay] = useState(0);
  const [slot, setSlot] = useState<string | null>(null);
  const [channel, setChannel] = useState<"video" | "telefon">("video");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [agenda, setAgenda] = useState(suggestedAgenda ?? "");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<{ message: string; mode: string } | null>(null);

  // Autofill-Zustand: idle → scanning (Animation) → done (Hinweis).
  const [scan, setScan] = useState<"idle" | "scanning" | "done">("idle");
  const touchedRef = useRef({ name: false, company: false });
  const scanTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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
  useEffect(() => () => {
    if (scanTimerRef.current) clearTimeout(scanTimerRef.current);
  }, []);

  /** Nach gültiger E-Mail: kurz „lesen", dann Name und Firma einsetzen. */
  const autofillFrom = (value: string) => {
    if (touchedRef.current.name && touchedRef.current.company) return;
    if (!/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(value)) return;
    const derived = deriveFromEmail(value);
    if (!derived) return;
    if (scanTimerRef.current) clearTimeout(scanTimerRef.current);
    setScan("scanning");
    scanTimerRef.current = setTimeout(() => {
      if (!touchedRef.current.name && derived.name) setName(derived.name);
      if (!touchedRef.current.company && derived.company) setCompany(derived.company);
      setScan("done");
    }, 900);
  };

  const book = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!slot) {
      setError("Bitte wählen Sie zuerst einen Termin.");
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
          company: company.trim() || undefined,
          phone: channel === "telefon" ? phone : undefined,
          dialogId,
          caseSummary,
          agenda: agenda.trim() || undefined,
          // Werbe-Herkunft mitgeben: Sie muss dauerhaft an der Buchung hängen,
          // damit später die Conversion an Google zurückgemeldet werden kann.
          sessionId: sessionId(),
          attr: captureAttribution(),
        }),
      });
      const data = (await res.json()) as { ok: boolean; mode?: string; message?: string; error?: string };
      if (data.ok) {
        setSuccess({ message: data.message ?? "Ihr Termin steht.", mode: data.mode ?? "bestätigt" });
        onBooked?.();
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
          {success.mode === "angefragt" ? (
            <ul className="booking-next">
              <li>Sie erhalten in Kürze eine persönliche Bestätigung mit Termin und Zugangslink.</li>
              <li>Moritz liest Ihre Skizze vorher durch — das Gespräch startet direkt bei Ihren offenen Punkten.</li>
            </ul>
          ) : (
            <ul className="booking-next">
              <li>Die Kalendereinladung mit Zugangslink ist unterwegs.</li>
              <li>Moritz liest Ihre Skizze vorher persönlich durch.</li>
              <li>Ihr Kalender erinnert Sie automatisch kurz vor dem Termin.</li>
            </ul>
          )}
        </div>
      </div>
    );
  }

  return (
    <form className="booking" onSubmit={book}>
      {/* Gesicht zum Termin: Wer sieht, mit wem er spricht, bucht eher.
          Das Bild ist ein PLATZHALTER — bitte durch ein echtes Foto ersetzen. */}
      <div className="advisor">
        <span className="advisor-photo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/berater-platzhalter.svg" alt="" width={64} height={64} />
        </span>
        <span className="advisor-text">
          <span className="advisor-eyebrow">Ihr Gesprächspartner</span>
          <strong>Moritz Schumacher</strong>
          <span className="advisor-role">
            Gründer — baut Ihre Software selbst. Kein Vertrieb dazwischen.
          </span>
        </span>
      </div>

      <h3>Kostenloses Beratungsgespräch — 30 Minuten, unverbindlich</h3>
      <p>
        <strong>Kein Verkaufsgespräch, keine Präsentation.</strong> Wir schärfen
        Ihre Skizze, klären die offenen Punkte — danach erhalten Sie das
        verbindliche Festangebot. Passt Ihr Fall nicht, sage ich Ihnen das im Termin.
      </p>

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
          {/* Schritt 1: Termin wählen — kostenlos, keine Dateneingabe. */}
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
                onClick={() => {
                  // Trichter: Die Slotwahl ist das Mikro-Commitment vor dem
                  // Formular — hier trennt sich Interesse von Absicht.
                  if (!slot) track("booking_slot_selected", { dialogId });
                  setSlot(s.startUtc);
                }}
                aria-pressed={slot === s.startUtc}
              >
                {berlinTime(s.startUtc)}
              </button>
            ))}
          </div>

          {/* Schritt 2: erscheint erst nach der Slotwahl — das Mikro-Commitment steht. */}
          {slot && (
            <div className="booking-confirm">
              <div className="booking-chosen">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                <span>
                  {berlinDay(slot)}, {berlinTime(slot)} Uhr
                </span>
              </div>

              <div className="field">
                <label htmlFor="booking-email">Geschäftliche E-Mail</label>
                <input
                  id="booking-email"
                  type="email"
                  autoComplete="email"
                  required
                  maxLength={254}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    autofillFrom(e.target.value);
                  }}
                  onBlur={() => autofillFrom(email)}
                  placeholder="name@ihre-firma.de"
                />
              </div>

              {scan === "scanning" && (
                <div className="scan-note" role="status">
                  <span className="scan-spark" aria-hidden>✦</span> KI liest Name und Firma aus der Adresse …
                </div>
              )}
              {scan === "done" && (
                <div className="scan-note scan-note-done" role="status">
                  <span className="scan-spark" aria-hidden>✦</span> Automatisch erkannt — bitte kurz prüfen.
                </div>
              )}

              <div className="field">
                <label htmlFor="booking-name">Ihr Name</label>
                <input
                  id="booking-name"
                  type="text"
                  autoComplete="name"
                  required
                  maxLength={200}
                  className={scan === "scanning" ? "is-scanning" : scan === "done" ? "is-filled" : ""}
                  value={name}
                  onChange={(e) => {
                    touchedRef.current.name = true;
                    setName(e.target.value);
                  }}
                  placeholder="Vor- und Nachname"
                />
              </div>

              <div className="field">
                <label htmlFor="booking-company">Unternehmen</label>
                <input
                  id="booking-company"
                  type="text"
                  autoComplete="organization"
                  maxLength={200}
                  className={scan === "scanning" ? "is-scanning" : scan === "done" ? "is-filled" : ""}
                  value={company}
                  onChange={(e) => {
                    touchedRef.current.company = true;
                    setCompany(e.target.value);
                  }}
                  placeholder="Firma (optional)"
                />
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
                  Online-Call
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

              <div className="field">
                <label htmlFor="booking-agenda">Was soll im Gespräch geklärt werden? (optional)</label>
                <textarea
                  id="booking-agenda"
                  rows={2}
                  maxLength={500}
                  value={agenda}
                  onChange={(e) => setAgenda(e.target.value)}
                  placeholder="z. B. wie die Artikelnummern abgeglichen werden"
                />
              </div>

              {error && <div className="form-error" role="alert">{error}</div>}

              <button type="submit" className="btn btn-primary" disabled={busy} style={{ width: "100%" }}>
                {busy ? "Wird gebucht …" : "Termin verbindlich reservieren"}
              </button>

              {/* Ehrliche Knappheit an der Entscheidung, nicht nur auf der Startseite (§2.5). */}
              <p className="booking-scarcity">
                Moritz baut jedes Projekt selbst — deshalb starten pro Monat höchstens zwei.
              </p>
            </div>
          )}
        </>
      )}
    </form>
  );
}

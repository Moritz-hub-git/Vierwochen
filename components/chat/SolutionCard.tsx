"use client";

import Booking from "./Booking";
import EmailGate from "./EmailGate";
import Timeline from "./Timeline";
import type { DialogResult, Sketch } from "./types";
import { formatEuro } from "./types";

/**
 * Das große Finale des Dialogs — bewusst schlank (Rücksprache 2026-08-15:
 * die vorherige Fassung mit Schritt-für-Schritt-Flow, ROI-Rechner und
 * separater Beweis-Kachel-Wand war „viel zu umfangreich").
 *
 * Aufbau folgt der psychologischen Reihenfolge, nicht der Datenmenge:
 *   1. Titel + EIN Satz Zusammenfassung   → was ist das, warum lohnt es sich
 *   2. Weg zum Launch (knapp) neben dem   → wann habe ich es, was bringt es
 *      wichtigsten Nutzen
 *   3. EINE Karte: Preis mit den drei     → was kostet es, ist das sicher,
 *      wichtigsten Kennzahlen im Pillar-    und der nächste Schritt liegt
 *      Stil der Startseite, direkt daneben  direkt daneben statt eine
 *      die Terminbuchung                    Bildschirmlänge weiter unten
 *
 * Der frühere Aufwand-gegenrechnen-Regler (ROI-Rechner) entfällt ersatzlos
 * (Rücksprache 2026-08-15) — er lenkte vom eigentlichen Angebot ab.
 */

function addDays(d: Date, days: number): Date {
  return new Date(d.getTime() + days * 24 * 3600 * 1000);
}

/** Dieselbe Formel wie in Timeline.tsx — hier nur für das Datum in der Pille. */
function launchLabel(): string {
  const today = new Date();
  const nextMonday = addDays(today, ((8 - today.getDay()) % 7) || 7);
  const kickoff = addDays(nextMonday, 7);
  const launch = addDays(kickoff, 25);
  return new Intl.DateTimeFormat("de-DE", { day: "numeric", month: "long" }).format(launch);
}

function PillIcon({ kind }: { kind: "live" | "pay" | "shield" }) {
  if (kind === "live") return <i className="offer-pill-dot" aria-hidden />;
  if (kind === "pay") {
    return (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M20.6 13.4 12 22 2 12V4a2 2 0 0 1 2-2h8l8.6 8.6a2 2 0 0 1 0 2.8Z" />
        <circle cx="7.5" cy="7.5" r="1.6" fill="currentColor" stroke="none" />
      </svg>
    );
  }
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 2 4 5.5V11c0 5 3.4 9.3 8 11 4.6-1.7 8-6 8-11V5.5L12 2Z" />
      <path d="m8.8 11.8 2.3 2.3 4.2-4.6" />
    </svg>
  );
}

export default function SolutionCard({
  sketch,
  result,
  dialogId,
  caseSummary,
  suggestedAgenda,
  booked,
  onBooked,
}: {
  sketch: Sketch;
  result: DialogResult;
  dialogId: string;
  caseSummary: string;
  suggestedAgenda?: string;
  booked: boolean;
  onBooked: () => void;
}) {
  // Der wichtigste Nutzen zuerst: EIN Satz als Zusammenfassung unter dem
  // Titel — das Modell schreibt value bereits nutzenorientiert und in
  // absteigender Wichtigkeit (PROMPT.md „value: konkreter Nutzen").
  const [summary, ...restValue] = sketch.value;

  return (
    <div className="solution">
      <div className="solution-head">
        <span className="offer-eyebrow">Ihre Ersteinschätzung</span>
        <h3 className="solution-title">{sketch.title}</h3>
        {summary && <p className="solution-summary">{summary}</p>}
      </div>

      {(result.weeks.length > 0 || restValue.length > 0) && (
        <div className="solution-story">
          <div className="story-col">
            <div className="sketch-label">Ihr Weg zum Launch</div>
            <Timeline weeks={result.weeks} />
          </div>
          {restValue.length > 0 && (
            <div className="story-col">
              <div className="sketch-label">Ihr Vorteil</div>
              <div className="sketch-list">
                {restValue.map((v) => (
                  <div className="sketch-item" key={v}>{v}</div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Eine Karte für Preis und Termin (Rücksprache 2026-08-15): Wer die
          Schätzung sieht, soll im selben Blick auch buchen können, statt
          eine Bildschirmlänge weiterzuscrollen. */}
      <div className="offer-card">
        <div className="offer-price">
          <span className="offer-price-label">Unverbindliche Preisschätzung</span>
          <div className="offer-price-value">{formatEuro(result.price)}</div>
          <p className="offer-price-sub">Festpreis nach Beratungsgespräch · netto zzgl. USt.</p>

          {/* Dieselbe Pillen-Sprache wie auf der Startseite — hier mit den
              tatsächlichen Werten dieses Angebots statt der Ankerwerte. */}
          <div className="offer-pills">
            <span className="offer-pill">
              <PillIcon kind="live" /> Live am {launchLabel()}
            </span>
            <span className="offer-pill">
              <PillIcon kind="pay" /> 2. Rate erst nach Abnahme
            </span>
            <span className="offer-pill">
              <PillIcon kind="shield" /> 12 Monate Garantie
            </span>
          </div>

          {result.scope.length > 0 && (
            <p className="offer-scope">Inklusive: {result.scope.slice(0, 3).join(" · ")}</p>
          )}
        </div>

        <div className="offer-book">
          <Booking
            dialogId={dialogId}
            caseSummary={caseSummary}
            suggestedAgenda={suggestedAgenda}
            onBooked={onBooked}
          />
        </div>
      </div>

      {!booked && <EmailGate dialogId={dialogId} sketchTitle={sketch.title} />}

      <p className="result-disclaimer">
        Unverbindliche Ersteinschätzung, kein Angebot. Alle Beträge netto zzgl. USt.
      </p>
    </div>
  );
}

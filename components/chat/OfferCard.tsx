"use client";

import { useState } from "react";
import Timeline from "./Timeline";
import type { DialogResult } from "./types";
import { formatEuro } from "./types";

/**
 * Das individuelle Angebot als Karte im Gespräch.
 *
 * Reihenfolge ist bewusst gewählt — sie folgt den Fragen, die ein Käufer in
 * genau dieser Reihenfolge stellt:
 *   1. Was kostet mich das Nichtstun?   → Kostenanker, live verstellbar
 *   2. Was kostet die Lösung?           → Festpreis daneben
 *   3. Was genau bekomme ich?           → Umfang
 *   4. Wann habe ich es?                → Timeline mit echtem Datum
 *   5. Was, wenn es schiefgeht?         → Garantie
 * Der Preis steht nie vor dem Kostenanker.
 *
 * Der Steller ist der wichtigste Teil: Wer seine eigene Zahl einstellt und die
 * Amortisation mitlaufen sieht, rechnet sein Geschäft selbst — und glaubt dem
 * Ergebnis, weil es seins ist.
 */

const EURO_PER_PERSON_DAY = 300;
const WORK_WEEKS = 45;

export default function OfferCard({ result }: { result: DialogResult }) {
  const [days, setDays] = useState(result.savings?.personDaysPerWeek ?? 0);
  const hasSavings = Boolean(result.savings);

  const annual = Math.round(days * WORK_WEEKS * EURO_PER_PERSON_DAY);
  const payback = annual > 0 ? Math.max(1, Math.round((result.priceMax / annual) * 12)) : null;
  const threeYear = annual * 3 - result.priceMax;
  const dayLabel = Number.isInteger(days) ? String(days) : days.toFixed(1).replace(".", ",");

  return (
    <div className="offer">
      <div className="offer-head">
        <span className="offer-eyebrow">Ihre Ersteinschätzung</span>
        <span className="offer-tier">{result.tier}</span>
      </div>

      {hasSavings && (
        <div className="offer-roi">
          <div className="offer-roi-live">
            <div className="offer-roi-question">
              Wie viel Zeit kostet Sie das heute — Personentage pro Woche?
            </div>
            <div className="offer-roi-stepper">
              <button
                type="button"
                className="stepper-btn"
                onClick={() => setDays((d) => Math.max(0.5, Math.round((d - 0.5) * 2) / 2))}
                disabled={days <= 0.5}
                aria-label="Weniger"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden><path d="M5 12h14" /></svg>
              </button>
              <span className="offer-roi-days">
                <strong>{dayLabel}</strong> {days === 1 ? "Tag" : "Tage"}
              </span>
              <button
                type="button"
                className="stepper-btn"
                onClick={() => setDays((d) => Math.min(20, Math.round((d + 0.5) * 2) / 2))}
                disabled={days >= 20}
                aria-label="Mehr"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden><path d="M12 5v14M5 12h14" /></svg>
              </button>
            </div>
          </div>

          <div className="offer-compare">
            <div className="offer-compare-col">
              <span className="offer-compare-label">Kostet Sie heute</span>
              <span className="offer-compare-value cost" aria-live="polite">{formatEuro(annual)}</span>
              <span className="offer-compare-unit">jedes Jahr, immer wieder</span>
            </div>
            <div className="offer-compare-vs" aria-hidden>gegen</div>
            <div className="offer-compare-col">
              <span className="offer-compare-label">Diese Lösung</span>
              <span className="offer-compare-value">{formatEuro(result.priceMin)}–{formatEuro(result.priceMax)}</span>
              <span className="offer-compare-unit">einmalig, Festpreis</span>
            </div>
          </div>

          {payback !== null && payback <= 18 && (
            <div className="offer-payback">
              <div className="offer-payback-main">
                Bezahlt nach <strong>{payback} {payback === 1 ? "Monat" : "Monaten"}</strong>
              </div>
              {threeYear > 0 && (
                <div className="offer-payback-sub">
                  Auf drei Jahre gerechnet bleiben rund {formatEuro(threeYear)} im Unternehmen.
                </div>
              )}
            </div>
          )}
          {payback !== null && payback > 18 && (
            <div className="offer-payback offer-payback-long">
              <div className="offer-payback-main">Trägt sich erst nach {payback} Monaten</div>
              <div className="offer-payback-sub">
                Über die reine Zeitersparnis lohnt sich das so nicht. Dann müssen
                andere Gründe tragen — Fehlerkosten, Wachstum ohne neue Stelle,
                Abhängigkeit von Einzelnen. Das prüfen wir im Gespräch, bevor Sie
                Geld ausgeben.
              </div>
            </div>
          )}
          <div className="offer-basis">
            Gerechnet mit {EURO_PER_PERSON_DAY} € Vollkosten je Personentag und {WORK_WEEKS} Arbeitswochen.
            Stellen Sie die Tage gern auf Ihren echten Wert.
          </div>
        </div>
      )}

      {!hasSavings && (
        <div className="offer-price-solo">
          <span className="offer-compare-label">Festpreis</span>
          <span className="offer-compare-value">{formatEuro(result.priceMin)}–{formatEuro(result.priceMax)}</span>
          <span className="offer-compare-unit">einmalig</span>
        </div>
      )}

      {result.scope.length > 0 && (
        <div className="offer-block">
          <div className="sketch-label">Dafür bekommen Sie</div>
          <div className="sketch-list">
            {result.scope.map((s) => (
              <div className="sketch-item" key={s}>{s}</div>
            ))}
          </div>
        </div>
      )}

      {result.weeks.length > 0 && <Timeline weeks={result.weeks} />}

      <div className="guarantee">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
        <span>
          <strong>Ihr Risiko: keines.</strong> Besteht die Software die vereinbarte
          Abnahme nicht, zahlen Sie nichts. Darauf 12 Monate Gewährleistung.
        </span>
      </div>

      <div className="result-disclaimer">
        Unverbindliche Ersteinschätzung, kein Angebot. Alle Beträge netto zzgl. USt.
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import Timeline from "./Timeline";
import type { DialogResult, Sketch } from "./types";
import { formatEuro } from "./types";

/**
 * Das große Finale des Dialogs: Lösungsskizze, Zeitplan, Preisschätzung.
 *
 * Aufbau folgt der Kaufentscheidung:
 *   1. Was bekomme ich?        → Lösung links (Soll-Prozess + Nutzen)
 *   2. Wann habe ich es?       → Zeitschiene rechts mit echten Daten,
 *                                 beginnend beim kostenlosen Beratungsgespräch
 *   3. Was kostet es?          → EIN gerundeter Betrag („unverbindliche
 *                                 Preisschätzung"), plus Kostenanker daneben
 *   4. Warum ist das sicher?   → Proof Points (Festpreis, Quellcode, Garantie …)
 *
 * Die Karte soll nicht abschließen, sondern anfüttern: Das Festangebot gibt es
 * erst nach dem Gespräch — der Termin ist der nächste logische Schritt.
 */

const EURO_PER_PERSON_DAY = 300;
const WORK_WEEKS = 45;

const PROOF_POINTS: { icon: React.ReactNode; text: string }[] = [
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
      </svg>
    ),
    text: "Festpreis — keine Überraschungen",
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="m16 18 6-6-6-6M8 6l-6 6 6 6" />
      </svg>
    ),
    text: "Voller Quellcode gehört Ihnen",
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8m-4-4v4" />
      </svg>
    ),
    text: "Läuft in Ihrer Umgebung — Cloud oder eigener Server",
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    text: "Workshops & Lizenzkosten der Erstellung inklusive",
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="m9 12 2 2 4-4" /><circle cx="12" cy="12" r="10" />
      </svg>
    ),
    text: "Ohne bestandene Abnahme keine zweite Rate",
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
      </svg>
    ),
    text: "12 Monate Gewährleistung",
  },
];

export default function SolutionCard({ sketch, result }: { sketch: Sketch; result: DialogResult }) {
  const [days, setDays] = useState(result.savings?.personDaysPerWeek ?? 0);
  const hasSavings = Boolean(result.savings);
  const annual = Math.round(days * WORK_WEEKS * EURO_PER_PERSON_DAY);
  const payback = annual > 0 ? Math.max(1, Math.round((result.price / annual) * 12)) : null;
  const dayLabel = Number.isInteger(days) ? String(days) : days.toFixed(1).replace(".", ",");

  return (
    <div className="solution">
      <div className="solution-head">
        <span className="offer-eyebrow">Ihre Lösungsskizze</span>
        <h3 className="solution-title">{sketch.title}</h3>
      </div>

      <div className="solution-grid">
        {/* Links: die Lösung selbst — motivierend, konkret. */}
        <div className="solution-main">
          {sketch.steps.length > 0 && (
            <div className="solution-block">
              <div className="sketch-label">So läuft es künftig</div>
              <ol className="flow">
                {sketch.steps.map((step, i) => (
                  <li key={step.label} className="flow-step" style={{ animationDelay: `${i * 0.07}s` }}>
                    <span className="flow-dot">{i + 1}</span>
                    <span className="flow-body">
                      <span className="flow-label">{step.label}</span>
                      <span className={`auto-tag ${step.automation}`}>{step.automation}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {sketch.value.length > 0 && (
            <div className="solution-block">
              <div className="sketch-label">Was Ihnen das bringt</div>
              <div className="sketch-list">
                {sketch.value.map((v) => (
                  <div className="sketch-item" key={v}>{v}</div>
                ))}
              </div>
            </div>
          )}

          {result.scope.length > 0 && (
            <div className="solution-block">
              <div className="sketch-label">Im Festpreis enthalten</div>
              <div className="sketch-list">
                {result.scope.map((s) => (
                  <div className="sketch-item" key={s}>{s}</div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Rechts: der Zeitplan mit echten Daten. */}
        <div className="solution-side">
          <Timeline weeks={result.weeks} />
        </div>
      </div>

      {/* Preis: ein Betrag, klar gerahmt als Schätzung vor dem Gespräch. */}
      <div className="solution-price">
        <div className="solution-price-main">
          <span className="solution-price-label">Unverbindliche Preisschätzung</span>
          <span className="solution-price-value">{formatEuro(result.price)}</span>
          <span className="solution-price-sub">Festpreis nach Beratungsgespräch · netto zzgl. USt.</span>
        </div>
        {hasSavings && (
          <div className="solution-roi">
            <div className="solution-roi-row">
              <span className="solution-roi-label">Ihr heutiger Aufwand</span>
              <span className="solution-roi-stepper">
                <button
                  type="button"
                  className="stepper-btn stepper-btn-sm"
                  onClick={() => setDays((d) => Math.max(0.5, Math.round((d - 0.5) * 2) / 2))}
                  disabled={days <= 0.5}
                  aria-label="Weniger"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden><path d="M5 12h14" /></svg>
                </button>
                <strong>{dayLabel}</strong>&nbsp;{days === 1 ? "Personentag" : "Personentage"}/Woche
                <button
                  type="button"
                  className="stepper-btn stepper-btn-sm"
                  onClick={() => setDays((d) => Math.min(20, Math.round((d + 0.5) * 2) / 2))}
                  disabled={days >= 20}
                  aria-label="Mehr"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden><path d="M12 5v14M5 12h14" /></svg>
                </button>
              </span>
            </div>
            <div className="solution-roi-result" aria-live="polite">
              ≈ <strong>{formatEuro(annual)}</strong> pro Jahr, immer wieder
              {payback !== null && payback <= 18 && (
                <> — die Lösung trägt sich nach <strong>{payback} {payback === 1 ? "Monat" : "Monaten"}</strong></>
              )}
            </div>
            <div className="offer-basis">
              Gerechnet mit {EURO_PER_PERSON_DAY} € Vollkosten je Personentag, {WORK_WEEKS} Arbeitswochen. Stellen Sie Ihren echten Wert ein.
            </div>
          </div>
        )}
      </div>

      {/* Proof Points: warum das sicher ist. */}
      <div className="proof-grid">
        {PROOF_POINTS.map((p) => (
          <div className="proof-item" key={p.text}>
            <span className="proof-icon">{p.icon}</span>
            <span>{p.text}</span>
          </div>
        ))}
      </div>

      {/* Die Expertise liegt nicht nur im Bauen — Überleitung zum Gespräch. */}
      <div className="solution-ideation">
        Der wichtigste Schritt ist nicht der Code, sondern die richtige Skizze.
        Genau daran arbeiten wir im Beratungsgespräch — kostenlos, unverbindlich,
        30 Minuten.
      </div>

      <div className="result-disclaimer">
        Unverbindliche Ersteinschätzung, kein Angebot. Alle Beträge netto zzgl. USt.
      </div>
    </div>
  );
}

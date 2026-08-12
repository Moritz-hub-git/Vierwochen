"use client";

import type { DialogResult } from "./types";
import { formatEuro } from "./types";

/**
 * Die Ergebnis-Karte ist der Moment der Wahrheit im Trichter.
 *
 * Verkaufspsychologie (PROMPT.md §2):
 * - Kostenanker (§2.4): Der Preis steht nie allein. Hat der Nutzer Mengen
 *   genannt, steht daneben, was der heutige Zustand pro Jahr kostet, plus die
 *   Amortisationsdauer. Erst dadurch beantwortet der Preis die Frage
 *   „verglichen womit?".
 * - Risiko-Umkehr (§2.3): Die Garantie steht direkt an der Zahl, nicht acht
 *   Bildschirme weiter oben — dort entsteht die Angst.
 * - Ehrlichkeit (§2.6): Die Rechnung wird offengelegt und ist ohne Mengen-
 *   angaben des Nutzers gar nicht erst vorhanden. Keine erfundenen Zahlen.
 */
export default function ResultCard({ result }: { result: DialogResult }) {
  const savings = result.savings;
  // Amortisation gegen den oberen Preis rechnen — konservativ, nicht schöngerechnet.
  const paybackMonths =
    savings && savings.annualEuro > 0
      ? Math.max(1, Math.round((result.priceMax / savings.annualEuro) * 12))
      : null;

  return (
    <div className="result-card">
      <div className="result-tier">Stufe: {result.tier}</div>
      <div className="result-price">
        {formatEuro(result.priceMin)} – {formatEuro(result.priceMax)}
      </div>
      <div className="result-price-note">einmalig, Festpreis</div>

      {savings && (
        <div className="roi">
          <div className="roi-row">
            <span className="roi-label">Ihr heutiger Aufwand</span>
            <span className="roi-value roi-cost">{formatEuro(savings.annualEuro)}<span className="roi-unit"> / Jahr</span></span>
          </div>
          <div className="roi-row">
            <span className="roi-label">Diese Lösung</span>
            <span className="roi-value">{formatEuro(result.priceMax)}<span className="roi-unit"> einmalig</span></span>
          </div>
          {/*
            Ab etwa eineinhalb Jahren trägt die reine Zeitersparnis den Fall
            nicht mehr. Das dann als Erfolgsmeldung zu verkaufen wäre unehrlich
            und durchschaubar — also wird es benannt und zum Gesprächsthema
            gemacht (PROMPT.md §5: Ehrlichkeit, notfalls absagen).
          */}
          {paybackMonths !== null && paybackMonths <= 18 && (
            <div className="roi-payback">
              Bezahlt sich nach rund <strong>{paybackMonths} {paybackMonths === 1 ? "Monat" : "Monaten"}</strong>. Danach bleibt der Betrag im Unternehmen.
            </div>
          )}
          {paybackMonths !== null && paybackMonths > 18 && (
            <div className="roi-payback roi-payback-long">
              Ehrlich gerechnet: Allein über die eingesparte Zeit trägt sich das
              erst nach rund <strong>{paybackMonths} Monaten</strong>. Dann müssen
              andere Gründe den Ausschlag geben — Fehlerkosten, Wachstum ohne neue
              Stelle, oder die Abhängigkeit von einzelnen Personen. Genau das
              sollten wir im Gespräch prüfen, bevor Sie Geld ausgeben.
            </div>
          )}
          <div className="roi-basis">
            Überschlag auf Basis Ihrer Angabe{savings.quote ? ` („${savings.quote}")` : ""}:{" "}
            {savings.basis}. Rechnen Sie gern mit Ihren eigenen Sätzen nach.
          </div>
        </div>
      )}

      {result.scope.length > 0 && (
        <div className="sketch-block" style={{ marginTop: "1.2rem", marginBottom: 0 }}>
          <div className="sketch-label">Im Festpreis enthalten</div>
          <div className="sketch-list">
            {result.scope.map((s) => (
              <div className="sketch-item" key={s}>{s}</div>
            ))}
          </div>
        </div>
      )}

      {result.weeks.length > 0 && (
        <div className="result-weeks">
          <div className="sketch-label">Ihre vier Wochen</div>
          {result.weeks.map((w) => (
            <div className="result-week" key={w.week}>
              <span className="wk">Woche {w.week}</span>
              <span>{w.label}</span>
            </div>
          ))}
        </div>
      )}

      {/* Risiko-Umkehr direkt an der Zahl (PROMPT.md §2.3). */}
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

      {/* Pflichthinweis auf jeder Ausgabe (PROMPT.md §6). */}
      <div className="result-disclaimer">
        Unverbindliche Ersteinschätzung, kein Angebot. Alle Beträge netto zzgl. USt.
      </div>
    </div>
  );
}

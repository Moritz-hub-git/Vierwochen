"use client";

import type { DialogResult } from "./types";
import { formatEuro } from "./types";

export default function ResultCard({ result }: { result: DialogResult }) {
  return (
    <div className="result-card">
      <div className="result-tier">Stufe: {result.tier}</div>
      <div className="result-price">
        {formatEuro(result.priceMin)} – {formatEuro(result.priceMax)}
      </div>

      {result.scope.length > 0 && (
        <div className="sketch-block" style={{ marginTop: "1rem", marginBottom: 0 }}>
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

      {/* Pflichthinweis auf jeder Ausgabe (PROMPT.md §6). */}
      <div className="result-disclaimer">
        Unverbindliche Ersteinschätzung, kein Angebot. Alle Beträge netto zzgl. USt.
      </div>
    </div>
  );
}

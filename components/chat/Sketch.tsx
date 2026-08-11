"use client";

import type { Sketch as SketchData } from "./types";

/**
 * Die Lösungsskizze — sie wächst sichtbar mit jedem Zug (PROMPT.md §5.3).
 * Neue Einträge blenden gestaffelt ein; bestehende bleiben stehen.
 */
export default function Sketch({ sketch }: { sketch: SketchData | null }) {
  if (!sketch || sketch.steps.length === 0) {
    return (
      <div className="sketch-empty">
        <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M12 3v3m0 12v3M3 12h3m12 0h3" />
          <rect x="7.5" y="7.5" width="9" height="9" rx="2.5" />
        </svg>
        <strong>Ihre Lösungsskizze</strong>
        <span>
          Während wir sprechen, entsteht hier Schritt für Schritt das Bild Ihres Falls:
          Prozess, Nutzen, offene Punkte.
        </span>
      </div>
    );
  }

  return (
    <div aria-live="polite">
      <div className="sketch-label">Lösungsskizze</div>
      <h3 className="sketch-title" key={sketch.title}>{sketch.title}</h3>

      <div className="sketch-block">
        <div className="sketch-label">Soll-Prozess</div>
        <div className="sketch-steps">
          {sketch.steps.map((step, i) => (
            <div
              className="sketch-step"
              key={step.label}
              style={{ animationDelay: `${Math.min(i * 0.08, 0.5)}s` }}
            >
              <span className="step-num">{i + 1}</span>
              <span className="step-label">{step.label}</span>
              <span className={`auto-tag ${step.automation}`}>{step.automation}</span>
            </div>
          ))}
        </div>
      </div>

      {sketch.value.length > 0 && (
        <div className="sketch-block">
          <div className="sketch-label">Ihr Nutzen</div>
          <div className="sketch-list">
            {sketch.value.map((v) => (
              <div className="sketch-item" key={v}>{v}</div>
            ))}
          </div>
        </div>
      )}

      {sketch.open.length > 0 && (
        <div className="sketch-block">
          <div className="sketch-label">Klären wir im Gespräch</div>
          <div className="sketch-list">
            {sketch.open.map((v) => (
              <div className="sketch-item open-point" key={v}>{v}</div>
            ))}
          </div>
        </div>
      )}

      {sketch.assumptions.length > 0 && (
        <div className="sketch-block">
          <div className="sketch-label">Annahmen</div>
          <div className="sketch-list">
            {sketch.assumptions.map((v) => (
              <div className="sketch-item open-point" key={v}>{v}</div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

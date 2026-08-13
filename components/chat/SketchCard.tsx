"use client";

import type { Sketch } from "./types";

/**
 * Die Lösungsskizze als Karte IM Gesprächsverlauf (nicht in einer Seitenspalte).
 *
 * Warum im Strom: In der Seitenspalte lag der Wow-Moment auf dem Telefon unter
 * dem Fold — also genau dort unsichtbar, wo die meisten Besucher sind. Als
 * Karte wächst sie mitten im Gespräch und ist unübersehbar.
 *
 * Was neu ist, wird markiert (Zeigarnik): Der Nutzer sieht bei jedem Zug, dass
 * sein Beitrag etwas bewirkt hat, und sieht zugleich, was noch offen ist.
 */
export default function SketchCard({
  sketch,
  previous,
  turnIndex,
}: {
  sketch: Sketch;
  previous: Sketch | null;
  turnIndex: number;
}) {
  const seenSteps = new Set((previous?.steps ?? []).map((s) => s.label));
  const seenValue = new Set(previous?.value ?? []);
  const seenOpen = new Set(previous?.open ?? []);

  const newCount =
    sketch.steps.filter((s) => !seenSteps.has(s.label)).length +
    sketch.value.filter((v) => !seenValue.has(v)).length;

  return (
    <div className="sketch-card">
      <div className="sketch-card-head">
        <span className="sketch-card-eyebrow">Ihre Lösungsskizze</span>
        {turnIndex > 0 && newCount > 0 && (
          <span className="sketch-card-badge">+{newCount} neu</span>
        )}
      </div>
      <h4 className="sketch-card-title">{sketch.title}</h4>

      {sketch.steps.length > 0 && (
        <ol className="flow">
          {sketch.steps.map((step, i) => {
            const isNew = !seenSteps.has(step.label);
            return (
              <li
                key={step.label}
                className={`flow-step${isNew ? " is-new" : ""}`}
                style={{ animationDelay: `${i * 0.07}s` }}
              >
                <span className="flow-dot">{i + 1}</span>
                <span className="flow-body">
                  <span className="flow-label">{step.label}</span>
                  <span className={`auto-tag ${step.automation}`}>{step.automation}</span>
                </span>
              </li>
            );
          })}
        </ol>
      )}

      {sketch.value.length > 0 && (
        <div className="sketch-card-block">
          <div className="sketch-label">Was Ihnen das bringt</div>
          <div className="sketch-list">
            {sketch.value.map((v) => (
              <div className={`sketch-item${!seenValue.has(v) ? " is-new" : ""}`} key={v}>{v}</div>
            ))}
          </div>
        </div>
      )}

      {sketch.open.length > 0 && (
        <div className="sketch-card-block open-block">
          <div className="sketch-label">Noch offen</div>
          <div className="sketch-list">
            {sketch.open.map((v) => (
              <div className={`sketch-item open-point${!seenOpen.has(v) ? " is-new" : ""}`} key={v}>{v}</div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

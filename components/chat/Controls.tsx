"use client";

import { useState } from "react";
import type { DialogInput } from "./types";

/**
 * Bedienelemente im Gesprächsverlauf.
 *
 * Verkaufspsychologie: Jeder Tipp auf einen Vorschlag oder ein Plus ist ein
 * Mikro-Commitment. Wer die Zahlen seines eigenen Falls selbst einstellt,
 * behandelt das Ergebnis als sein Werk und bricht seltener ab (IKEA-Effekt).
 * Deshalb sind das keine Bequemlichkeitsfeatures, sondern Beteiligung.
 */

export function Chips({ options, onPick }: { options: string[]; onPick: (value: string) => void }) {
  return (
    <div className="chips" role="group" aria-label="Antwortvorschläge">
      {options.map((o, i) => (
        <button
          key={o}
          type="button"
          className="chip-btn"
          style={{ animationDelay: `${i * 0.06}s` }}
          onClick={() => onPick(o)}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

/** Mehrfachauswahl: Optionen an- und abwählen, dann gesammelt absenden. */
export function MultiChips({
  options,
  onSubmit,
}: {
  options: string[];
  onSubmit: (value: string) => void;
}) {
  const [picked, setPicked] = useState<Set<string>>(new Set());

  const toggle = (o: string) =>
    setPicked((prev) => {
      const next = new Set(prev);
      if (next.has(o)) next.delete(o);
      else next.add(o);
      return next;
    });

  return (
    <div className="chips chips-multi" role="group" aria-label="Mehrfachauswahl">
      {options.map((o, i) => {
        const active = picked.has(o);
        return (
          <button
            key={o}
            type="button"
            className={`chip-btn${active ? " is-picked" : ""}`}
            style={{ animationDelay: `${i * 0.06}s` }}
            aria-pressed={active}
            onClick={() => toggle(o)}
          >
            {active && (
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M20 6 9 17l-5-5" />
              </svg>
            )}
            {o}
          </button>
        );
      })}
      <button
        type="button"
        className="btn btn-primary chips-submit"
        disabled={picked.size === 0}
        onClick={() => onSubmit([...picked].join(", "))}
      >
        {picked.size > 1 ? `${picked.size} Auswahlen übernehmen` : "Übernehmen"}
      </button>
    </div>
  );
}

export function Stepper({
  input,
  onSubmit,
}: {
  input: DialogInput;
  onSubmit: (value: string) => void;
}) {
  const min = input.min ?? 1;
  const max = input.max ?? 20;
  const step = input.step ?? 1;
  const [value, setValue] = useState(input.preset ?? min);

  const clamp = (v: number) => Math.min(max, Math.max(min, Math.round(v * 2) / 2));
  const label = Number.isInteger(value) ? String(value) : value.toFixed(1).replace(".", ",");
  const unit = input.unit || input.label || "";

  return (
    <div className="stepper-card">
      <div className="stepper-label">{input.label}</div>
      <div className="stepper-row">
        <button
          type="button"
          className="stepper-btn"
          onClick={() => setValue((v) => clamp(v - step))}
          disabled={value <= min}
          aria-label="Weniger"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden>
            <path d="M5 12h14" />
          </svg>
        </button>
        <div className="stepper-value" aria-live="polite">
          <span className="stepper-number">{label}</span>
          {unit && <span className="stepper-unit">{unit}</span>}
        </div>
        <button
          type="button"
          className="stepper-btn"
          onClick={() => setValue((v) => clamp(v + step))}
          disabled={value >= max}
          aria-label="Mehr"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden>
            <path d="M12 5v14M5 12h14" />
          </svg>
        </button>
      </div>
      <input
        type="range"
        className="stepper-range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => setValue(clamp(Number(e.target.value)))}
        aria-label={input.label}
      />
      <button type="button" className="btn btn-primary stepper-submit" onClick={() => onSubmit(`${label} ${unit}`.trim())}>
        Weiter
      </button>
    </div>
  );
}

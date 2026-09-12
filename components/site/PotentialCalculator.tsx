"use client";
import Link from "next/link";
import { useState } from "react";
import { calculatePotential } from "@/lib/potential";
import { Arrow } from "./Icons";
const number = (v: number, digits = 0) =>
  v.toLocaleString("de-DE", { maximumFractionDigits: digits });
export default function PotentialCalculator() {
  const [volume, setVolume] = useState(500),
    [minutes, setMinutes] = useState(5),
    [cost, setCost] = useState(45),
    [automation, setAutomation] = useState(80),
    [exceptionMinutes, setExceptionMinutes] = useState(2);
  const result = calculatePotential({
    volume,
    minutes,
    hourlyCost: cost,
    automation,
    exceptionMinutes,
  });
  return (
    <div className="calculator">
      <div className="calculator-inputs">
        <div className="calculator-label">01 / IHRE AUSGANGSLAGE</div>
        <label className="range-label" htmlFor="volume">
          Vorgänge pro Monat <strong>{number(volume)}</strong>
        </label>
        <input
          id="volume"
          type="range"
          min="50"
          max="5000"
          step="50"
          value={volume}
          onChange={(e) => setVolume(+e.target.value)}
        />
        <div className="range-ends">
          <span>50</span>
          <span>5.000</span>
        </div>
        <div className="field-pair">
          <label className="field" htmlFor="minutes">
            Minuten je Vorgang
            <div className="unit-input">
              <input
                id="minutes"
                type="number"
                min="1"
                max="240"
                value={minutes}
                onChange={(e) =>
                  setMinutes(Math.max(1, Math.min(240, +e.target.value)))
                }
              />
              <span>min</span>
            </div>
          </label>
          <label className="field" htmlFor="hourly-cost">
            Personalkosten je Stunde
            <div className="unit-input">
              <input
                id="hourly-cost"
                type="number"
                min="0"
                max="500"
                value={cost}
                onChange={(e) =>
                  setCost(Math.max(0, Math.min(500, +e.target.value)))
                }
              />
              <span>€</span>
            </div>
          </label>
        </div>
        <div className="calculator-label assumptions-label">
          02 / IHRE ANNAHMEN
        </div>
        <label className="range-label" htmlFor="automation">
          Automatisch erledigte Fälle <strong>{automation} %</strong>
        </label>
        <input
          id="automation"
          type="range"
          min="0"
          max="100"
          step="5"
          value={automation}
          onChange={(e) => setAutomation(+e.target.value)}
        />
        <label className="field inline-field" htmlFor="exception-minutes">
          Minuten je verbleibender Ausnahme
          <div className="unit-input">
            <input
              id="exception-minutes"
              type="number"
              min="0"
              max="240"
              value={exceptionMinutes}
              onChange={(e) =>
                setExceptionMinutes(Math.max(0, Math.min(240, +e.target.value)))
              }
            />
            <span>min</span>
          </div>
        </label>
      </div>
      <div className="calculator-result">
        <span className="calculator-label">DAS KÖNNTE FREI WERDEN</span>
        <span className="sr-only" aria-live="polite">
          {number(result.savedHours, 1)} Stunden freie Kapazität pro Monat,{" "}
          {number(result.annualCapacityValue)} Euro rechnerischer Kapazitätswert
          pro Jahr.
        </span>
        <div className="big-result">
          {number(result.savedHours, 1)}
          <span>Std. / Monat</span>
        </div>
        <p>Kapazität für Arbeit, die Ihr Unternehmen weiterbringt.</p>
        <div className="result-bars">
          <div>
            <span>Heute</span>
            <div>
              <i />
            </div>
            <b>{number(result.beforeHours, 1)} Std.</b>
          </div>
          <div>
            <span>Mit OpsDone*</span>
            <div>
              <i
                style={{
                  width: `${Math.min(100, result.beforeHours ? (result.afterHours / result.beforeHours) * 100 : 0)}%`,
                }}
              />
            </div>
            <b>{number(result.afterHours, 1)} Std.</b>
          </div>
        </div>
        <div className="annual-result">
          <span>Rechnerischer Kapazitätswert / Jahr</span>
          <strong>{number(result.annualCapacityValue)} €</strong>
        </div>
        <Link
          href={`/prozess-check?volumen=${volume}`}
          className="button button-light"
        >
          Dieses Potenzial prüfen <Arrow />
        </Link>
        <small>
          *Modellrechnung aus Ihren Angaben. Keine Ergebniszusage. Vor
          Implementierungs- und Betriebskosten; frei werdende Kapazität ist
          keine garantierte Kosteneinsparung.
        </small>
      </div>
    </div>
  );
}

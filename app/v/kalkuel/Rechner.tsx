"use client";

import { useState } from "react";
import { openDialog } from "@/components/Header";
import s from "./styles.module.css";

/**
 * Der interaktive Kostenrechner — das Herz der kalkül-Variante.
 *
 * Wer den Regler selbst bewegt, rechnet sein eigenes Geschäft (IKEA-Effekt)
 * und sieht live, was der Status quo kostet. Die CTA übergibt die
 * eingestellte Zahl direkt in den Dialog — der Einstieg ist dann keine leere
 * Zeile mehr, sondern die eigene Rechnung.
 *
 * Rechenbasis identisch mit dem Server-Kostenanker: 300 € Vollkosten je
 * Personentag, 45 Arbeitswochen (lib/config.ts COST_ANCHOR).
 */

const EURO_PER_DAY = 300;
const WEEKS = 45;
const HOURS_PER_DAY = 8;
const PILOT_PRICE = 9500;

const euro = (n: number) => n.toLocaleString("de-DE", { maximumFractionDigits: 0 }) + " €";

export default function Rechner() {
  const [hours, setHours] = useState(12);

  const perYear = Math.round((hours / HOURS_PER_DAY) * WEEKS * EURO_PER_DAY);
  const payback = perYear > 0 ? Math.max(1, Math.round((PILOT_PRICE / perYear) * 12)) : null;
  const threeYears = perYear * 3 - PILOT_PRICE;

  return (
    <div className={s.calc}>
      <div className={s.calcHead}>
        <span className={s.calcTitle}>Was kostet Ihr Ablauf heute?</span>
        <span className={s.calcTag}>live</span>
      </div>

      <label className={s.calcLabel} htmlFor="ka-hours">
        <span>Zeitaufwand pro Woche, über alle Beteiligten</span>
        <span className={s.calcValue}>{hours} Std.</span>
      </label>
      <input
        id="ka-hours"
        className={s.range}
        type="range"
        min={2}
        max={60}
        step={1}
        value={hours}
        onChange={(e) => setHours(Number(e.target.value))}
      />

      <div className={s.calcOut} aria-live="polite">
        <div className={s.calcRow}>
          <span className={s.calcRowLabel}>Kostet Sie jährlich etwa</span>
          <span className={s.calcBig}>{euro(perYear)}</span>
        </div>
        {payback !== null && (
          <div className={s.calcRow}>
            <span className={s.calcRowLabel}>Ein Pilot (ab {euro(PILOT_PRICE)}) trägt sich nach</span>
            <span className={`${s.calcBig} ${s.calcGood}`}>
              {payback} {payback === 1 ? "Monat" : "Monaten"}
            </span>
          </div>
        )}
        {threeYears > 0 && (
          <div className={s.calcRow}>
            <span className={s.calcRowLabel}>Auf drei Jahre bleiben im Unternehmen</span>
            <span className={`${s.calcBig} ${s.calcGood}`}>≈ {euro(threeYears)}</span>
          </div>
        )}
        <p className={s.calcNote}>
          Basis: {EURO_PER_DAY} € Vollkosten je Personentag, {WEEKS} Arbeitswochen.
          Grobe Orientierung — die genaue Zahl für Ihren Fall rechnet der Dialog.
        </p>
      </div>

      <button
        type="button"
        className={s.calcBtn}
        onClick={() =>
          openDialog(
            `Ein Ablauf kostet uns etwa ${hours} Stunden pro Woche über alle Beteiligten — was ließe sich da automatisieren und was würde das kosten?`
          )
        }
      >
        Exakte Zahl für meinen Fall rechnen →
      </button>
    </div>
  );
}

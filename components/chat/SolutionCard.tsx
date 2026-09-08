"use client";

import { useEffect, useRef, useState } from "react";
import { ACCEPTANCE_PROMISE, PRICE, RETAINER, WARRANTY_MONTHS } from "@/lib/config";
import Booking from "./Booking";
import EmailGate from "./EmailGate";
import Timeline from "./Timeline";
import type { DialogResult, Sketch } from "./types";
import { formatEuro } from "./types";

/**
 * Das große Finale des Dialogs — bewusst schlank (Rücksprache 2026-08-15),
 * nach dem Vollreview vom 2026-09-08 inhaltlich vervollständigt:
 *
 *   1. Titel + EIN Satz Nutzen            → was ist das, warum lohnt es sich
 *   2. EINE Karte: Preis MIT HERLEITUNG    → „zeig mir die Rechnung, dann
 *      (Grundprodukt + Bausteine, Summe),    glaube ich bottom-up" (Persona
 *      Betrieb als Standard, die eine        Lena, Audit CF-03); daneben die
 *      Zusage — direkt neben der Buchung     Terminwahl, im selben Blick
 *   3. Weg zum Launch neben der Skizze    → Kick-off/Launch als „frühestens"
 *      (Ablauf, Annahmen, Agenda)            (CP-07); die Skizze wurde bisher
 *                                            erzeugt, aber nie gezeigt (CF-02)
 *
 * DOM-Reihenfolge = Mobil-Reihenfolge (Titel → Preis → Termin → Zeitplan →
 * Skizze); auf dem Desktop legen die Grids Preis|Termin und Zeitplan|Skizze
 * nebeneinander. So braucht es kein CSS-order, das Screenreader verwirrt.
 *
 * Ein Nachgespräch (phase=followup) ändert nur die Props — die Karte bleibt
 * gemountet und aktualisiert sich in place; der Preis pulsiert kurz.
 */

function PillIcon({ kind }: { kind: "pay" | "shield" | "code" }) {
  if (kind === "pay") {
    return (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M20.6 13.4 12 22 2 12V4a2 2 0 0 1 2-2h8l8.6 8.6a2 2 0 0 1 0 2.8Z" />
        <circle cx="7.5" cy="7.5" r="1.6" fill="currentColor" stroke="none" />
      </svg>
    );
  }
  if (kind === "code") {
    return (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="m8 7-5 5 5 5" />
        <path d="m16 7 5 5-5 5" />
        <path d="m14 4-4 16" />
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

/**
 * Kurz hervorheben, wenn sich der Preis im Nachgespräch ändert — nur dann,
 * nicht beim ersten Erscheinen (da trägt schon die Karte ihren Einzug).
 */
function usePricePulse(price: number): boolean {
  const [pulse, setPulse] = useState(false);
  const last = useRef(price);
  useEffect(() => {
    if (last.current === price) return;
    last.current = price;
    setPulse(true);
    const t = window.setTimeout(() => setPulse(false), 1400);
    return () => window.clearTimeout(t);
  }, [price]);
  return pulse;
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
  // Titel — das Modell schreibt value nutzenorientiert und in absteigender
  // Wichtigkeit (PROMPT.md „value: konkreter Nutzen").
  const [summary, ...restValue] = sketch.value;
  const pulse = usePricePulse(result.price);
  // Der Server hat die Summe schon gerechnet und in price gesetzt; die
  // Zeilen hier sind die Herleitung — der Summenstrich wiederholt price,
  // damit Rechnung und große Zahl nie auseinanderlaufen können.
  const items = result.priceItems ?? [];
  const assumptions = sketch.assumptions.slice(0, 3);
  const open = sketch.open.slice(0, 3);

  return (
    <div className="solution" id="ergebnis">
      <div className="solution-head">
        <span className="offer-eyebrow">Ihre Ersteinschätzung</span>
        <h3 className="solution-title">{sketch.title}</h3>
        {summary && <p className="solution-summary">{summary}</p>}
      </div>

      {/* Eine Karte für Preis und Termin (Rücksprache 2026-08-15): Wer die
          Schätzung sieht, soll im selben Blick auch buchen können. */}
      <div className="offer-card">
        <div className="offer-price">
          <span className="offer-price-label">Richtpreis — wird im Gespräch zum Festpreis</span>
          <div className={`offer-price-value${pulse ? " is-updated" : ""}`}>{formatEuro(result.price)}</div>

          {items.length > 0 && (
            <dl className="offer-calc" aria-label="Herleitung des Preises">
              {items.map((it, i) => (
                <div className="offer-calc-row" key={`${i}-${it.label}`}>
                  <dt>{it.label}</dt>
                  <dd>{formatEuro(it.euro)}</dd>
                </div>
              ))}
              <div className="offer-calc-row offer-calc-sum">
                <dt>Summe</dt>
                <dd>{formatEuro(result.price)}</dd>
              </div>
            </dl>
          )}

          <p className="offer-price-sub">
            Vom KI-Berater aus Ihren Angaben gerechnet. Moritz prüft die Schätzung vor dem Gespräch. Alle Beträge {PRICE.vatNote}
          </p>

          {/* Betrieb als Standard, nicht als Fußnote (Vollreview: die
              einzige wiederkehrende Einnahme) — Werte aus lib/config.ts. */}
          <p className="offer-retainer">
            <b>Danach:</b> {RETAINER.basic.name} ab {RETAINER.basic.monthly} €/Monat ({RETAINER.basic.includes}) · {RETAINER.notice}
          </p>

          {/* Dieselbe Pillen-Sprache wie auf der Startseite — mit der einen
              Zusage, die überall wortgleich steht (ACCEPTANCE_PROMISE). */}
          <div className="offer-pills">
            <span className="offer-pill offer-pill-promise">
              <PillIcon kind="pay" /> {ACCEPTANCE_PROMISE}
            </span>
            <span className="offer-pill">
              <PillIcon kind="shield" /> {WARRANTY_MONTHS} Monate Gewährleistung
            </span>
            <span className="offer-pill">
              <PillIcon kind="code" /> Code gehört Ihnen
            </span>
          </div>

          {result.scope.length > 0 && (
            <p className="offer-scope">Gebaut wird: {result.scope.slice(0, 4).join(" · ")}</p>
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

      <div className="solution-story">
        <div className="story-col">
          <div className="sketch-label">Ihr Weg zum Launch</div>
          <Timeline weeks={result.weeks} />
          {restValue.length > 0 && (
            <div className="sketch-card-block">
              <div className="sketch-label">Ihr Vorteil</div>
              <div className="sketch-list">
                {restValue.slice(0, 3).map((v) => (
                  <div className="sketch-item" key={v}>{v}</div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Die Skizze war bisher unsichtbar (Audit CF-02): Sie ist das, was
            der Berater aus dem Gespräch gemacht hat — und die Agenda des
            Termins gleich mit. */}
        {(sketch.steps.length > 0 || assumptions.length > 0 || open.length > 0) && (
          <div className="story-col">
            {sketch.steps.length > 0 && (
              <>
                <div className="sketch-label">So würde es laufen</div>
                <ol className="flow flow-compact">
                  {sketch.steps.map((s, i) => (
                    <li className="flow-step" key={`${i}-${s.label}`}>
                      <span className="flow-dot" aria-hidden>{i + 1}</span>
                      <span className="flow-body">
                        <span className="flow-label">{s.label}</span>
                        <span className={`auto-tag ${s.automation}`}>{s.automation}</span>
                      </span>
                    </li>
                  ))}
                </ol>
              </>
            )}
            {assumptions.length > 0 && (
              <div className="sketch-card-block">
                <div className="sketch-label">Annahmen — bitte korrigieren, wenn falsch</div>
                <div className="sketch-list">
                  {assumptions.map((a) => (
                    <div className="sketch-item" key={a}>{a}</div>
                  ))}
                </div>
              </div>
            )}
            {open.length > 0 && (
              <div className="sketch-card-block">
                <div className="sketch-label">Das klären wir im Gespräch</div>
                <div className="sketch-list">
                  {open.map((o) => (
                    <div className="sketch-item open-point" key={o}>{o}</div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {!booked && <EmailGate dialogId={dialogId} sketchTitle={sketch.title} />}

      <p className="result-disclaimer">
        Ersteinschätzung, kein Angebot — das Festpreisangebot folgt nach dem Gespräch. Alle Beträge {PRICE.vatNote}
      </p>
    </div>
  );
}

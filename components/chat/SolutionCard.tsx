"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { PRICE, PRICE_DISCLAIMER, RETAINER, SITE } from "@/lib/config";
import Booking from "./Booking";
import type { DialogResult, Sketch, SketchStep } from "./types";
import { formatEuro } from "./types";

function automationLabel(value: SketchStep["automation"]): string {
  if (value === "automatisch") return "Automatisch";
  if (value === "teilautomatisch") return "Mit Prüfung";
  return "Ihr Team";
}

function automationClass(value: SketchStep["automation"]): string {
  if (value === "automatisch") return "is-automatic";
  if (value === "teilautomatisch") return "is-assisted";
  return "is-human";
}

export default function SolutionCard({
  sketch,
  result,
  dialogId,
  caseSummary,
  suggestedAgenda,
  booked,
  onBooked,
  onChooseBooking,
}: {
  sketch: Sketch;
  result: DialogResult;
  dialogId: string;
  caseSummary: string;
  suggestedAgenda?: string;
  booked: boolean;
  onBooked: () => void;
  onChooseBooking?: () => void;
}) {
  const [bookingOpen, setBookingOpen] = useState(false);
  const bookingRef = useRef<HTMLDivElement | null>(null);
  const [summary, ...additionalValue] = sketch.value;
  const assumptions = sketch.assumptions.slice(0, 4);
  const openQuestions = sketch.open.slice(0, 4);
  const humanSteps = sketch.steps.filter((step) => step.automation !== "automatisch");
  const priceItems = result.priceItems ?? [];
  const today = new Intl.DateTimeFormat("de-DE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());
  const chooseBooking = () => {
    if (onChooseBooking) {
      onChooseBooking();
      return;
    }
    setBookingOpen(true);
  };

  useEffect(() => {
    if (!bookingOpen) return;
    bookingRef.current?.focus({ preventScroll: true });
    bookingRef.current?.scrollIntoView({ block: "nearest" });
  }, [bookingOpen]);

  return (
    <section className="solution process-preview" id="ergebnis" aria-labelledby="process-preview-title">
      <header className="solution-head process-preview-head">
        <span className="offer-eyebrow">Ihre Prozessvorschau</span>
        <h3 className="solution-title" id="process-preview-title">{sketch.title}</h3>
        {summary && <p className="solution-summary">{summary}</p>}
        <p className="process-preview-origin">
          Aus Ihren Angaben im KI-Dialog abgeleitet. Noch nicht persönlich geprüft.
        </p>
        {!booked && !bookingOpen && (
          <button
            type="button"
            className="preview-head-cta btn btn-primary"
            aria-controls={onChooseBooking ? undefined : "inline-booking"}
            onClick={chooseBooking}
          >
            Vorschau besprechen
          </button>
        )}
      </header>

      {!onChooseBooking && (bookingOpen || booked) && (
        <div className="solution-booking-panel" id="inline-booking" ref={bookingRef} tabIndex={-1}>
          <Booking
            dialogId={dialogId}
            caseSummary={caseSummary}
            suggestedAgenda={suggestedAgenda}
            onBooked={onBooked}
          />
        </div>
      )}

      <div className="process-preview-grid">
        <section className="process-preview-block process-preview-flow" aria-labelledby="preview-flow-title">
          <div className="sketch-label" id="preview-flow-title">So könnte der Prozess laufen</div>
          {sketch.steps.length > 0 ? (
            <ol className="preview-steps">
              {sketch.steps.map((step, index) => (
                <li className="preview-step" key={`${index}-${step.label}`}>
                  <span className="preview-step-number" aria-hidden="true">{index + 1}</span>
                  <span className="preview-step-content">
                    <strong>{step.label}</strong>
                    <span className={`preview-step-tag ${automationClass(step.automation)}`}>
                      {automationLabel(step.automation)}
                    </span>
                  </span>
                </li>
              ))}
            </ol>
          ) : (
            <p className="preview-empty">Der genaue Ablauf wird im Prozessgespräch gemeinsam abgegrenzt.</p>
          )}
        </section>

        <section className="process-preview-block process-preview-controls" aria-labelledby="preview-controls-title">
          <div className="sketch-label" id="preview-controls-title">Wo Ihr Team entscheidet</div>
          {humanSteps.length > 0 ? (
            <ul className="preview-human-list">
              {humanSteps.map((step, index) => (
                <li key={`${index}-${step.label}`}>
                  <span aria-hidden="true">↳</span>
                  <span>
                    <strong>{step.label}</strong>
                    <small>{step.automation === "manuell" ? "Bleibt eine menschliche Aufgabe" : "Automation bereitet vor, ein Mensch prüft"}</small>
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="preview-empty">
              Noch keine konkrete Freigabe erkannt. Vor dem Pilot legen wir Grenzen,
              Ausnahmen und notwendige menschliche Entscheidungen ausdrücklich fest.
            </p>
          )}
        </section>
      </div>

      <div className="process-preview-grid process-preview-details">
        <section className="process-preview-block" aria-labelledby="preview-assumptions-title">
          <div className="sketch-label" id="preview-assumptions-title">Annahmen der Vorschau</div>
          {assumptions.length > 0 ? (
            <ul className="preview-check-list">
              {assumptions.map((assumption) => <li key={assumption}>{assumption}</li>)}
            </ul>
          ) : (
            <p className="preview-empty">Es wurden noch keine belastbaren Annahmen festgehalten.</p>
          )}
        </section>

        <section className="process-preview-block" aria-labelledby="preview-open-title">
          <div className="sketch-label" id="preview-open-title">Vor einem Pilot zu klären</div>
          {openQuestions.length > 0 ? (
            <ul className="preview-check-list preview-open-list">
              {openQuestions.map((question) => <li key={question}>{question}</li>)}
            </ul>
          ) : (
            <p className="preview-empty">Datenzugang, Ausnahmefälle und Abnahmekriterien prüfen wir gemeinsam.</p>
          )}
        </section>
      </div>

      {(result.scope.length > 0 || additionalValue.length > 0) && (
        <section className="process-preview-block process-preview-scope" aria-labelledby="preview-scope-title">
          <div className="sketch-label" id="preview-scope-title">Was ein erster Pilot umfassen könnte</div>
          {result.scope.length > 0 && (
            <ul className="preview-scope-list">
              {result.scope.slice(0, 5).map((item) => <li key={item}>{item}</li>)}
            </ul>
          )}
          {additionalValue.length > 0 && (
            <div className="preview-value-list">
              {additionalValue.slice(0, 3).map((item) => <p key={item}>{item}</p>)}
            </div>
          )}
        </section>
      )}

      <section className="offer-card process-preview-commercial" aria-labelledby="preview-estimate-title">
        <div className="offer-price">
          <span className="offer-price-label" id="preview-estimate-title">Unverbindliche Implementierungsschätzung</span>
          <div className="offer-price-value">{formatEuro(result.price)}</div>

          {priceItems.length > 0 && (
            <dl className="offer-calc" aria-label="Herleitung der Schätzung">
              {priceItems.map((item, index) => (
                <div className="offer-calc-row" key={`${index}-${item.label}`}>
                  <dt>{item.label}</dt>
                  <dd>{formatEuro(item.euro)}</dd>
                </div>
              ))}
              <div className="offer-calc-row offer-calc-sum">
                <dt>Geschätzter Gesamtumfang</dt>
                <dd>{formatEuro(result.price)}</dd>
              </div>
            </dl>
          )}

          <p className="offer-price-sub">
            Die Schätzung basiert auf Ihren bisherigen Angaben. Datenqualität,
            Integrationen, Ausnahmewege und Abnahmekriterien werden vor einem Angebot geprüft.
            Alle Beträge {PRICE.vatNote}
          </p>
          <p className="offer-retainer">
            <strong>Managed-Betrieb als Standard:</strong> {RETAINER.basic.name} mit dem
            vereinbarten Umfang für Überwachung, Fehlerbehandlung und Pflege.
          </p>
          <p className="offer-pilot-note">
            Ein klar begrenzter Pilot kann ab {formatEuro(PRICE.floor)} starten.
            Der konkrete Umfang entscheidet über den finalen Preis.
          </p>
        </div>

        <div className="preview-booking-cta">
          <span className="sketch-label">Vorschau gemeinsam prüfen</span>
          <h4>Passt der Ablauf zu Ihrem Alltag?</h4>
          <p>
            Im Gespräch klären wir die Annahmen, menschlichen Freigaben und den
            kleinsten belastbaren Pilot. Für diese Vorschau war keine E-Mail nötig.
          </p>
          {!booked && !bookingOpen && (
            <button
              type="button"
              className="preview-booking-button btn btn-primary"
              aria-controls={onChooseBooking ? undefined : "inline-booking"}
              onClick={chooseBooking}
            >
              Kostenloses Prozessgespräch wählen
            </button>
          )}
          {booked ? (
            <p className="preview-booking-open-note">Ihre Buchung oder Terminanfrage ist eingegangen.</p>
          ) : bookingOpen ? (
            <p className="preview-booking-open-note">
              Wählen Sie zuerst unverbindlich eine Zeit. Kontaktdaten folgen im zweiten Schritt.
            </p>
          ) : null}
        </div>
      </section>

      <div className="result-actions">
        <button type="button" className="result-print" onClick={() => window.print()}>
          Vorschau drucken oder als PDF speichern
        </button>
        <Link href="/sicherheit" className="result-itlink">
          Sicherheit und Datenschutz →
        </Link>
      </div>

      <p className="result-disclaimer">{PRICE_DISCLAIMER}</p>
      <p className="print-only result-sender">
        {SITE.name} · {SITE.founder.name} · {SITE.email} · Prozessvorschau vom {today}.
        Unverbindlich und aus dem KI-Dialog abgeleitet.
      </p>
    </section>
  );
}

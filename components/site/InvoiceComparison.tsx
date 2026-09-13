"use client";

import { useState } from "react";
import type { ShowcaseProcess } from "./LandingProduct";
import Icon from "./ShowcaseIcon";
import { ProcessScene } from "./ShowcaseScenes";
import s from "./InvoiceComparison.module.css";

function Documents() {
  return (
    <div className={s.documents} aria-label="Die gleichen drei Eingangsbelege">
      {(
        [
          { name: "invoice", label: "Rechnung", type: "PDF" },
          { name: "table", label: "Bestellung", type: "ERP" },
          { name: "order", label: "Wareneingang", type: "Beleg" },
        ] as const
      ).map((doc) => (
        <div className={s.document} key={doc.label}>
          <span className={s.documentTop}>
            <Icon name={doc.name} />
            <small>{doc.type}</small>
          </span>
          <b>{doc.label}</b>
          <span className={s.paperLines} aria-hidden="true">
            <i />
            <i />
          </span>
        </div>
      ))}
    </div>
  );
}

function Connector({
  merge = false,
  pair = false,
}: {
  merge?: boolean;
  pair?: boolean;
}) {
  return (
    <div className={s.connector} aria-hidden="true">
      {pair ? (
        <svg viewBox="0 0 400 24" preserveAspectRatio="none">
          <path
            className={s.track}
            d="M85 0v7q0 5 5 5h220q5 0 5-5V0M200 12v12"
          />
          <path
            className={s.traveler}
            d="M85 0v7q0 5 5 5h105q5 0 5 5v7M315 0v7q0 5-5 5H205q-5 0-5 5v7"
          />
        </svg>
      ) : merge ? (
        <svg viewBox="0 0 400 30" preserveAspectRatio="none">
          <path
            className={s.track}
            d="M66 0v10Q66 15 72 15H328Q334 15 334 10V0M200 0v30"
          />
          <path
            className={s.traveler}
            d="M66 0v10Q66 15 72 15H194Q200 15 200 21v9M334 0v10Q334 15 328 15H206Q200 15 200 21v9M200 0v30"
          />
        </svg>
      ) : (
        <svg viewBox="0 0 400 24" preserveAspectRatio="none">
          <path className={s.track} d="M200 0v24" />
          <path className={s.traveler} d="M200 0v24" />
        </svg>
      )}
    </div>
  );
}

export default function InvoiceComparison({
  process,
}: {
  process: ShowcaseProcess;
}) {
  const [expanded, setExpanded] = useState(false);
  const [motion, setMotion] = useState(true);
  return (
    <div className={s.root} data-motion={motion ? "on" : "off"}>
      <div className={s.legend}>
        <span>
          RECHNUNGSPRÜFUNG <i /> ILLUSTRATIVES BEISPIEL
        </span>
        <button
          onClick={() => setMotion(!motion)}
          aria-label={
            motion ? "Ablaufanimation pausieren" : "Ablaufanimation starten"
          }
        >
          <Icon name={motion ? "pause" : "play"} />
          <span>{motion ? "Animation pausieren" : "Animation starten"}</span>
        </button>
      </div>
      <div className={s.comparison}>
        <section className={s.before} aria-label="Rechnungsprüfung heute">
          <header className={s.header}>
            <span className={s.badge}>HEUTE</span>
            <h3>Ihr Team ist die Verbindung.</h3>
            <p>Von Beleg zu Beleg. Von Rückfrage zu Freigabe.</p>
          </header>
          <Documents />
          <Connector merge />
          <div className={s.workCard}>
            <div className={s.cardTitle}>
              <span className={s.person}>
                <Icon name="user" />
              </span>
              <div>
                <small>IHR TEAM</small>
                <h4>Suchen. Übertragen. Vergleichen.</h4>
              </div>
            </div>
            <div className={s.matchTable}>
              <span>Servicepauschale</span>
              <div>
                <span>
                  Bestellt <b>120 €</b>
                </span>
                <Icon name="search" />
                <span>
                  Berechnet <b>145 €</b>
                </span>
              </div>
            </div>
          </div>
          <Connector />
          <div className={s.manualDecision}>
            <div className={s.followup}>
              <Icon name="mail" />
              <div>
                <b>„Sind die 25 € in Ordnung?“</b>
                <span>Rückfrage per E-Mail</span>
              </div>
            </div>
            <div className={s.waiting}>
              <Icon name="clock" />
              <span>Antwort suchen & nachhalten</span>
            </div>
            <svg className={s.loop} viewBox="0 0 38 100" aria-hidden="true">
              <path
                d="M5 90h13q12 0 12-12V22q0-12-12-12H5m6-5-6 5 6 5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeDasharray="4 4"
              />
            </svg>
          </div>
          <Connector />
          <div className={s.manualResult}>
            <span className={s.resultIcon}>
              <Icon name="invoice" />
            </span>
            <div>
              <b>Geprüften Beleg ablegen</b>
              <span>Status von Hand aktualisieren</span>
            </div>
          </div>
        </section>
        <section className={s.after} aria-label="Rechnungsprüfung mit Opsrid">
          <header className={s.header}>
            <span className={s.badge}>
              <Icon name="check" />
              MIT OPSRID
            </span>
            <h3>Ihre Anwendung übernimmt.</h3>
            <p>Derselbe Prozess. Die Vorarbeit ist erledigt.</p>
          </header>
          <Documents />
          <Connector merge />
          <div className={s.softwareCard}>
            <div className={s.cardTitle}>
              <span className={s.softwareMark}>
                <Icon name="check" />
              </span>
              <div>
                <small>IHRE PROZESSSOFTWARE</small>
                <h4>Erfassen. Zuordnen. Prüfen.</h4>
              </div>
              <span className={s.ruleTag}>Ihre Regeln</span>
            </div>
            <div className={s.checks}>
              <span>
                <Icon name="check" />
                Belege zugeordnet
              </span>
              <span>
                <Icon name="check" />
                Positionen abgeglichen
              </span>
              <span>
                <Icon name="check" />
                Abweichung erkannt
              </span>
            </div>
          </div>
          <div className={s.branchLines} aria-hidden="true">
            <svg viewBox="0 0 400 27" preserveAspectRatio="none">
              <path
                className={s.track}
                d="M200 0v8q0 5-5 5H90q-5 0-5 5v9M200 8q0 5 5 5h105q5 0 5 5v9"
              />
              <path
                className={s.traveler}
                d="M200 0v8q0 5-5 5H90q-5 0-5 5v9M200 0v8q0 5 5 5h105q5 0 5 5v9"
              />
            </svg>
          </div>
          <div className={s.branches}>
            <div className={s.standard}>
              <span className={s.pathLabel}>STIMMT ÜBEREIN</span>
              <span className={s.standardCheck}>
                <Icon name="check" />
              </span>
              <b>Läuft durch.</b>
              <small>Nach Ihren Freigaberegeln</small>
            </div>
            <button
              className={s.exception}
              onClick={() => setExpanded(true)}
              aria-expanded={expanded}
              aria-controls="invoice-application"
            >
              <span className={s.pathLabel}>ABWEICHUNG</span>
              <span className={s.exceptionTitle}>
                <Icon name="user" />
                <b>25 € prüfen</b>
              </span>
              <small>Belege & Vergleich liegen vor</small>
              <span className={s.inspect}>
                Ihr Team entscheidet
                <Icon name="arrow" />
              </span>
            </button>
          </div>
          <Connector pair />
          <button
            className={s.productResult}
            onClick={() => setExpanded(!expanded)}
            aria-expanded={expanded}
            aria-controls="invoice-application"
          >
            <span className={s.productMini} aria-hidden="true">
              <i />
              <span>
                <b />
                <b />
                <b />
              </span>
            </span>
            <span>
              <b>Alles in Ihrer Anwendung.</b>
              <small>
                {expanded ? "Anwendung schließen" : "Anwendung ansehen"}
              </small>
            </span>
            <Icon name={expanded ? "close" : "arrow"} />
          </button>
        </section>
      </div>
      {expanded && (
        <section
          className={s.expanded}
          id="invoice-application"
          aria-label="Beispielanwendung zur Rechnungsprüfung"
        >
          <header>
            <div>
              <span>DAS DIGITALE PRODUKT DAHINTER</span>
              <h3>Eine Entscheidung. Alle Informationen.</h3>
            </div>
            <button
              onClick={() => setExpanded(false)}
              aria-label="Beispielanwendung schließen"
            >
              <Icon name="close" />
            </button>
          </header>
          <div className={s.applicationWrap}>
            <ProcessScene process={process} />
          </div>
          <p>
            Beispielansicht. Die echte Anwendung wird für Ihre Daten, Regeln und
            Verantwortlichkeiten gebaut.
          </p>
        </section>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import { Check } from "./Icons";
import s from "@/app/(site)/home.module.css";

const examples = [
  {
    tab: "Einkauf",
    title: "Auftragsbestätigungen",
    eyebrow: "BEISPIELANWENDUNG · EINKAUF",
    prompt: "Wir gleichen Auftragsbestätigungen manuell mit Bestellungen ab.",
    document: "AB-2026-1842.pdf",
    company: "Nordwerk GmbH",
    rows: [
      ["Artikel & Menge", "Geprüft", "ok"],
      ["Preispositionen", "1 Abweichung", "warn"],
      ["Liefertermin", "Geprüft", "ok"],
    ],
    decision: "Preisabweichung zur Freigabe",
  },
  {
    tab: "Reporting",
    title: "Managementbericht",
    eyebrow: "BEISPIELANWENDUNG · REPORTING",
    prompt: "Wir vergleichen jeden Monat mehrere Excel-Dateien für unser Reporting.",
    document: "Monatsdaten_August.xlsx",
    company: "Geschäftsbereich DACH",
    rows: [
      ["Datenquellen", "4 verbunden", "ok"],
      ["Plausibilitätsprüfung", "Geprüft", "ok"],
      ["Kennzahlen", "2 Hinweise", "warn"],
    ],
    decision: "Bericht zur fachlichen Freigabe",
  },
  {
    tab: "Reklamation",
    title: "Fallbearbeitung",
    eyebrow: "BEISPIELANWENDUNG · QUALITÄT",
    prompt: "Wir sammeln Reklamationsdaten und Nachweise noch manuell zusammen.",
    document: "Reklamation_4871.eml",
    company: "Produktlinie Alpha",
    rows: [
      ["Falldaten", "Vollständig", "ok"],
      ["Nachweise", "3 zugeordnet", "ok"],
      ["Bewertung", "Entscheidung offen", "warn"],
    ],
    decision: "Bewertung durch Qualitätsmanagement",
  },
] as const;

function openFunnel(text: string) {
  window.dispatchEvent(
    new CustomEvent("opsrid:chat", { detail: { text, submit: true } }),
  );
}

export default function LandingProduct() {
  const [active, setActive] = useState(0);
  const example = examples[active];

  return (
    <section className={s.productSection} id="beispiel">
      <div className={s.productIntro}>
        <p className={s.kicker}>SO KANN IHRE ANWENDUNG AUSSEHEN</p>
        <h2>Ein Vorgang. Klar geführt.</h2>
        <p>
          Drei illustrative Beispiele. Die echte Anwendung wird nach Ihren
          Daten, Rollen und Regeln gestaltet.
        </p>
      </div>

      <div className={s.productShell}>
        <div className={s.productTabs} role="tablist" aria-label="Beispielanwendungen">
          {examples.map((item, index) => (
            <button
              key={item.tab}
              role="tab"
              aria-selected={active === index}
              onClick={() => setActive(index)}
            >
              <span>0{index + 1}</span>
              {item.tab}
            </button>
          ))}
          <small>ILLUSTRATIVES BEISPIEL</small>
        </div>

        <div className={s.productBody}>
          <aside className={s.productRail} aria-label="Anwendungsnavigation">
            <strong>Opsrid<span>.</span></strong>
            <nav>
              <span className={s.railActive}>Vorgänge</span>
              <span>Ausnahmen <i>1</i></span>
              <span>Freigaben</span>
              <span>Protokoll</span>
            </nav>
            <small>Beispieloberfläche</small>
          </aside>

          <div className={s.productWorkspace}>
            <header>
              <div>
                <span>{example.eyebrow}</span>
                <h3>{example.title}</h3>
              </div>
              <button onClick={() => openFunnel(example.prompt)}>
                Eigenen Prozess prüfen <span aria-hidden="true">↗</span>
              </button>
            </header>

            <div className={s.caseGrid}>
              <article className={s.caseCard}>
                <div className={s.caseHead}>
                  <span className={s.fileIcon} aria-hidden="true">≡</span>
                  <div><b>{example.document}</b><small>{example.company}</small></div>
                  <em>EINGANG</em>
                </div>
                <div className={s.statusLine}><i /> Automatisch erfasst</div>
              </article>

              <article className={s.checkCard}>
                <div className={s.checkHeader}>
                  <span>Prüfung</span><small>gerade eben</small>
                </div>
                {example.rows.map(([label, value, state]) => (
                  <div className={s.checkRow} key={label}>
                    <span><Check /> {label}</span>
                    <b className={state === "warn" ? s.warning : ""}>{value}</b>
                  </div>
                ))}
              </article>

              <article className={s.decisionCard}>
                <span>OFFENE ENTSCHEIDUNG</span>
                <h4>{example.decision}</h4>
                <p>Alle relevanten Informationen liegen nachvollziehbar vor.</p>
                <button>Prüfen und entscheiden <span aria-hidden="true">→</span></button>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

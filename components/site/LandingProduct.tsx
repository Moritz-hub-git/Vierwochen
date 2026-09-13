"use client";

import { useEffect, useRef, useState } from "react";
import s from "./Showcase.module.css";

const examples = [
  {
    id: "invoice",
    label: "Rechnungen prüfen",
    icon: "≡",
    area: "FINANZEN",
    title: "Aus einer Rechnung wird ein geprüfter Vorgang.",
    description:
      "Belege, Bestellungen und Freigaben zusammenführen. Ihr Team entscheidet über die Ausnahme – die Anwendung bereitet alles vor.",
    before: [
      "Rechnung aus dem Postfach öffnen",
      "Bestellung und Wareneingang suchen",
      "Positionen einzeln vergleichen",
      "Freigabe per E-Mail nachhalten",
    ],
    files: ["Rechnung.pdf", "Bestellung", "Wareneingang"],
    steps: ["Beleg erfassen", "Positionen abgleichen", "Freigabe vorbereiten"],
    result: "Rechnung zur Freigabe",
    detail: "Eine Preisabweichung braucht Ihre Entscheidung.",
    decision: "Preisabweichung prüfen",
    evidence: "Position 03 · Servicepauschale",
    values: ["Bestellt", "120,00 €", "Berechnet", "145,00 €"],
    note: "Die übrigen Positionen stimmen mit Bestellung und Wareneingang überein. Die Abweichung von 25,00 € wird zur Freigabe vorgelegt.",
    outcome: "Geprüfte Belege. Klare Freigaben.",
    prompt:
      "Wir prüfen Eingangsrechnungen manuell gegen Bestellungen und Wareneingänge und verfolgen Freigaben per E-Mail.",
  },
  {
    id: "report",
    label: "Reporting erstellen",
    icon: "▥",
    area: "CONTROLLING",
    title: "Aus vielen Dateien wird ein entscheidungsreifer Bericht.",
    description:
      "Daten zusammenführen, Zahlen prüfen und Berichte vorbereiten. Ihr Team bewertet die Entwicklung und gibt das Ergebnis frei.",
    before: [
      "Zahlen aus den Bereichen anfordern",
      "Excel-Dateien zusammenführen",
      "Abweichungen und Formeln prüfen",
      "Diagramme in den Bericht übertragen",
    ],
    files: ["Vertrieb.xlsx", "Finanzen.csv", "Planung.xlsx"],
    steps: [
      "Daten zusammenführen",
      "Zahlen plausibilisieren",
      "Bericht vorbereiten",
    ],
    result: "Managementbericht",
    detail: "Quellen verknüpft. Eine Entwicklung zur Einordnung.",
    decision: "Bericht prüfen",
    evidence: "Monatsbericht · Ergebnisentwicklung",
    values: ["Datenstand", "September", "Status", "Zur Prüfung"],
    note: "Die Darstellung zeigt illustrative Beispieldaten. Vor der Veröffentlichung ergänzt das Controlling die fachliche Einordnung und gibt den Bericht frei.",
    outcome: "Eine Datenbasis. Ein klarer Bericht.",
    prompt:
      "Wir führen monatlich Excel-Dateien aus mehreren Bereichen zusammen, prüfen die Zahlen und erstellen einen Managementbericht.",
  },
  {
    id: "order",
    label: "Aufträge abwickeln",
    icon: "↗",
    area: "VERTRIEB & OPERATIONS",
    title: "Aus einer Anfrage wird ein durchgängig geführter Auftrag.",
    description:
      "Kundenwunsch, Konditionen und Lieferfähigkeit in einem Vorgang verbinden. Ihr Team entscheidet, wenn eine Zusage abgestimmt werden muss.",
    before: [
      "Kundenanfrage aus E-Mails erfassen",
      "Konditionen im System nachschlagen",
      "Liefertermin mit dem Lager klären",
      "Angebot und Auftragsstatus pflegen",
    ],
    files: ["Anfrage.eml", "Konditionen", "Bestandsdaten"],
    steps: [
      "Anfrage strukturieren",
      "Konditionen prüfen",
      "Auftrag vorbereiten",
    ],
    result: "Auftrag in Vorbereitung",
    detail: "Positionen erfasst. Lieferoption zur Entscheidung.",
    decision: "Lieferoption ansehen",
    evidence: "Kundenwunsch · Lieferung in einer Sendung",
    values: ["Verfügbar", "80 Stück", "Angefragt", "100 Stück"],
    note: "Die Anwendung stellt die verfügbaren Mengen und den Kundenwunsch gegenüber. Ihr Team klärt, ob eine Teillieferung angeboten werden darf.",
    outcome: "Vom Kundenwunsch zur klaren Zusage.",
    prompt:
      "Wir erfassen Kundenanfragen manuell, prüfen Konditionen und Bestände und stimmen Liefertermine zwischen Vertrieb und Lager ab.",
  },
  {
    id: "case",
    label: "Reklamationen lösen",
    icon: "◇",
    area: "SERVICE & QUALITÄT",
    title: "Aus verstreuten Nachweisen wird ein lösbarer Fall.",
    description:
      "Kommunikation, Lieferung und Qualitätsnachweise zusammenbringen. Ihr Team erhält einen begründeten Lösungsvorschlag und behält die Entscheidung.",
    before: [
      "Kundenverlauf und Fotos zusammensuchen",
      "Lieferung und Artikel zuordnen",
      "Qualität und Service abstimmen",
      "Lösung kommunizieren und dokumentieren",
    ],
    files: ["Kundennachricht", "Lieferbeleg", "Schadensfotos"],
    steps: ["Fall zuordnen", "Nachweise auswerten", "Lösung vorbereiten"],
    result: "Reklamation · Transportschaden",
    detail: "Nachweise zugeordnet. Ersatzlieferung vorgeschlagen.",
    decision: "Lösungsvorschlag öffnen",
    evidence: "Fallübersicht · Beschädigte Lieferung",
    values: ["Nachweise", "Vollständig", "Vorschlag", "Ersatzlieferung"],
    note: "Kundenmeldung, Lieferbeleg und Schadensbeschreibung sind zugeordnet. Die vorgeschlagene Ersatzlieferung wird durch die zuständige Person geprüft; eine Zusage erfolgt erst nach Freigabe.",
    outcome: "Alle Fakten im Fall. Eine klare Entscheidung.",
    prompt:
      "Wir bearbeiten Reklamationen über mehrere Teams, suchen Nachweise zusammen und stimmen Ersatzlieferungen oder Gutschriften manuell ab.",
  },
] as const;

export type ShowcaseProcess = (typeof examples)[number];

/** A reusable solution scene: source documents → work performed → human decision. */
export function ProcessScene({ process }: { process: ShowcaseProcess }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className={s.scene}>
      <div className={s.sceneHeader}>
        <span className={s.brand}>
          Opsrid<span>.</span>
        </span>
        <span className={s.scenePath}>
          Arbeitsplatz <span>/</span> {process.area}
        </span>
        <span className={s.exampleBadge}>Beispielanwendung</span>
      </div>
      <div className={s.canvas}>
        <div className={s.sourceColumn}>
          <span className={s.caption}>IHRE DATEN</span>
          {process.files.map((file, i) => (
            <div className={s.source} key={file}>
              <span className={s.documentIcon}>
                {i === 0 ? "≡" : i === 1 ? "▦" : "▤"}
              </span>
              <div>
                <b>{file}</b>
                <small>{["Eingang", "Referenz", "Nachweis"][i]}</small>
              </div>
              <span className={s.sourceDot} />
            </div>
          ))}
        </div>
        <div className={s.engine}>
          <span className={s.engineOrb}>✳</span>
          <span className={s.caption}>IHRE PROZESSLOGIK</span>
          <h4>Arbeit übernommen.</h4>
          <div className={s.stepList}>
            {process.steps.map((step) => (
              <div key={step}>
                <span>✓</span>
                {step}
              </div>
            ))}
          </div>
          <div className={s.rule}>
            <span>◇</span> Nach Ihren Regeln
          </div>
        </div>
        <div className={s.result}>
          <div className={s.resultTop}>
            <span className={s.caption}>IHR ERGEBNIS</span>
            <span className={s.ready}>Zur Entscheidung</span>
          </div>
          <h4>{process.result}</h4>
          {process.id === "report" ? (
            <div className={s.reportVisual}>
              <div className={s.chartLabel}>
                Ergebnisentwicklung <small>Beispieldaten</small>
              </div>
              <div className={s.bars}>
                {[42, 62, 53, 76, 68, 90].map((h, i) => (
                  <div key={i}>
                    <i style={{ height: h + "%" }} />
                    <small>
                      {["Apr", "Mai", "Jun", "Jul", "Aug", "Sep"][i]}
                    </small>
                  </div>
                ))}
              </div>
            </div>
          ) : process.id === "order" ? (
            <div className={s.orderVisual}>
              <div>
                <span>01</span>
                <b>Anfrage erfasst</b>
                <i>✓</i>
              </div>
              <div>
                <span>02</span>
                <b>Konditionen geprüft</b>
                <i>✓</i>
              </div>
              <div>
                <span>03</span>
                <b>Lieferoption abstimmen</b>
                <i>↗</i>
              </div>
            </div>
          ) : process.id === "case" ? (
            <div className={s.caseVisual}>
              <div className={s.parcel}>
                ◇<span>Lieferung zugeordnet</span>
              </div>
              <div>
                <b>Nachweise vollständig</b>
                <span>Kundenmeldung ✓</span>
                <span>Lieferbeleg ✓</span>
                <span>Schadensbeschreibung ✓</span>
              </div>
            </div>
          ) : (
            <div className={s.invoiceVisual}>
              <div>
                <span>Position</span>
                <span>Bestellung</span>
                <span>Rechnung</span>
              </div>
              <div>
                <b>01 · Material</b>
                <span>240,00 €</span>
                <span>240,00 € ✓</span>
              </div>
              <div>
                <b>02 · Versand</b>
                <span>18,00 €</span>
                <span>18,00 € ✓</span>
              </div>
              <div className={s.highlight}>
                <b>03 · Service</b>
                <span>120,00 €</span>
                <span>145,00 € ↗</span>
              </div>
            </div>
          )}
          <p>{process.detail}</p>
          <button
            className={s.decisionButton}
            onClick={() => setExpanded(!expanded)}
            aria-expanded={expanded}
          >
            {expanded ? "Details schließen" : process.decision}
            <span>{expanded ? "−" : "↗"}</span>
          </button>
        </div>
      </div>
      {expanded && (
        <div className={s.evidence}>
          <span className={s.evidenceIcon}>◇</span>
          <div>
            <b>{process.evidence}</b>
            <p>{process.note}</p>
          </div>
          <dl>
            <div>
              <dt>{process.values[0]}</dt>
              <dd>{process.values[1]}</dd>
            </div>
            <div>
              <dt>{process.values[2]}</dt>
              <dd>{process.values[3]}</dd>
            </div>
          </dl>
        </div>
      )}
      <div className={s.sceneFooter}>
        <span>
          <i /> Erfassung und Prüfung durch die Anwendung
        </span>
        <span>◇ Freigabe durch Ihr Team</span>
      </div>
    </div>
  );
}

export default function LandingProduct() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hover, setHover] = useState(false);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(true);
  const root = useRef<HTMLElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  useEffect(() => {
    const tab = tabs.current[active];
    const row = tab?.parentElement;
    if (tab && row && row.scrollWidth > row.clientWidth) {
      row.scrollTo({
        left:
          tab.offsetLeft -
          row.offsetLeft -
          (row.clientWidth - tab.offsetWidth) / 2,
        behavior: reduced ? "instant" : "smooth",
      });
    }
  }, [active, reduced]);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.2 },
    );
    if (root.current) observer.observe(root.current);
    return () => {
      media.removeEventListener("change", update);
      observer.disconnect();
    };
  }, []);
  const running = !paused && !hover && !reduced && visible;
  useEffect(() => {
    if (!running) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) setActive((a) => (a + 1) % examples.length);
    }, 10000);
    return () => clearInterval(timer);
  }, [running, active]);
  const process = examples[active];
  const choose = (index: number) => {
    setActive(index);
    setPaused(true);
  };
  return (
    <section
      ref={root}
      id="beispiel"
      className={s.section}
      aria-label="Prozessbeispiele"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocusCapture={() => setPaused(true)}
    >
      <div className={s.picker}>
        <h2>Beispiele:</h2>
        <div className={s.tabs} role="tablist" aria-label="Prozess auswählen">
          {examples.map((item, index) => (
            <button
              ref={(el) => {
                tabs.current[index] = el;
              }}
              key={item.id}
              id={"tab-" + item.id}
              role="tab"
              aria-selected={active === index}
              aria-controls="process-showcase"
              tabIndex={active === index ? 0 : -1}
              className={active === index ? s.activeTab : ""}
              onClick={() => choose(index)}
              onKeyDown={(e) => {
                const next =
                  e.key === "ArrowRight"
                    ? (index + 1) % 4
                    : e.key === "ArrowLeft"
                      ? (index + 3) % 4
                      : e.key === "Home"
                        ? 0
                        : e.key === "End"
                          ? 3
                          : -1;
                if (next >= 0) {
                  e.preventDefault();
                  choose(next);
                  tabs.current[next]?.focus();
                }
              }}
            >
              <span aria-hidden="true">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </div>
        <button
          className={s.pause}
          aria-label={
            paused
              ? "Automatischen Wechsel starten"
              : "Automatischen Wechsel pausieren"
          }
          onClick={() => setPaused(!paused)}
        >
          {paused ? "▷" : "Ⅱ"}
        </button>
      </div>
      <div
        id="process-showcase"
        role="tabpanel"
        aria-labelledby={"tab-" + process.id}
        className={s.stage}
      >
        <div key={process.id} className={s.transition}>
          <div className={s.intro}>
            <div>
              <span className={s.eyebrow}>
                {process.area} <i /> BEISPIEL{" "}
                {String(active + 1).padStart(2, "0")}
              </span>
              <h3>{process.title}</h3>
            </div>
            <p>{process.description}</p>
          </div>
          <div className={s.before}>
            <div className={s.beforeLabel}>
              <span>VORHER</span>
              <b>Ihr Team verbindet die Schritte.</b>
            </div>
            <div className={s.manualSteps}>
              {process.before.map((step, i) => (
                <div key={step}>
                  <small>0{i + 1}</small>
                  <span>{step}</span>
                  {i < 3 && <i>→</i>}
                </div>
              ))}
            </div>
          </div>
          <div className={s.afterLabel}>
            <span>MIT OPSRID</span>
            <b>Ihre Anwendung übernimmt den Ablauf.</b>
            <span className={s.line} />
            <small>So könnte Ihre Lösung aussehen</small>
          </div>
          <ProcessScene key={process.id} process={process} />
          <div className={s.bottom}>
            <div>
              <span className={s.bottomIcon}>↗</span>
              <b>{process.outcome}</b>
            </div>
            <button
              onClick={() =>
                window.dispatchEvent(
                  new CustomEvent("opsrid:chat", {
                    detail: { text: process.prompt, submit: true },
                  }),
                )
              }
            >
              So einen Prozess haben wir auch <span>→</span>
            </button>
          </div>
        </div>
      </div>
      <p className={s.disclaimer}>
        Vier Beispiele für individuelle Anwendungen. Der tatsächliche Umfang
        hängt von Ihren Daten, Systemen und Freigaberegeln ab.
      </p>
    </section>
  );
}

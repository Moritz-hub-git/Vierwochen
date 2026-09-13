"use client";

import { useEffect, useRef, useState } from "react";
import s from "./Showcase.module.css";
import Icon from "./ShowcaseIcon";
import { ManualWork, ProcessScene, visualCopy } from "./ShowcaseScenes";

const examples = [
  {
    id: "invoice",
    label: "Rechnungen prüfen",
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
              <Icon name={item.id} />
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
          <Icon name={paused ? "play" : "pause"} />
        </button>
      </div>
      <div
        id="process-showcase"
        role="tabpanel"
        aria-labelledby={"tab-" + process.id}
        className={s.stage}
      >
        <div key={process.id} className={s.comparison}>
          <div className={s.before}>
            <header className={s.halfHeader}>
              <span className={s.beforeBadge}>VORHER</span>
              <h3>{visualCopy[process.id].before}</h3>
              <p>Ihr Team erledigt die Arbeit dazwischen.</p>
            </header>
            <ManualWork process={process} />
          </div>
          <div className={s.bridge} aria-hidden="true">
            <Icon name="arrow" />
          </div>
          <div className={s.after}>
            <header className={s.halfHeader}>
              <span className={s.afterBadge}>
                <Icon name="check" />
                MIT OPSRID
              </span>
              <h3>{visualCopy[process.id].after}</h3>
              <p>Ihre Software übernimmt. Sie entscheiden.</p>
            </header>
            <ProcessScene key={process.id} process={process} />
          </div>
        </div>
        <div className={s.bottom}>
          <p>{visualCopy[process.id].summary}</p>
          <button
            onClick={() =>
              window.dispatchEvent(
                new CustomEvent("opsrid:chat", {
                  detail: { text: process.prompt, submit: true },
                }),
              )
            }
          >
            Das möchte ich für meinen Prozess
            <Icon name="arrow" />
          </button>
        </div>
      </div>
      <p className={s.disclaimer}>
        Vier Beispiele für individuelle Anwendungen. Der tatsächliche Umfang
        hängt von Ihren Daten, Systemen und Freigaberegeln ab.
      </p>
    </section>
  );
}

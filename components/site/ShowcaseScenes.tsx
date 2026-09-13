"use client";
import { useState } from "react";
import type { ShowcaseProcess } from "./LandingProduct";
import Icon from "./ShowcaseIcon";
import s from "./Showcase.module.css";

export const visualCopy = {
  invoice: {
    before: "Belege suchen. Zahlen abgleichen.",
    after: "Geprüft. Bis auf eine Entscheidung.",
    subject: "Rechnung zur Prüfung",
    message: "Bitte mit der Bestellung abgleichen.",
    sheet: "Bestellübersicht",
    columns: ["Position", "Bestellt", "Berechnet"],
    cells: [
      ["Material", "240,00 €", "240,00 €"],
      ["Versand", "18,00 €", "18,00 €"],
      ["Service", "120,00 €", "145,00 €"],
    ],
    request: "Wer gibt die Abweichung frei?",
    task: "Manuell vergleichen",
    result: "Rechnung geprüft",
    alert: "25,00 € Preisabweichung",
    summary: "Alle Belege zugeordnet. Nur die Abweichung bleibt bei Ihnen.",
  },
  report: {
    before: "Dateien sammeln. Berichte bauen.",
    after: "Ein Bericht. Bereit zur Einordnung.",
    subject: "Zahlen für den Monatsbericht",
    message: "Welche Datei ist der aktuelle Stand?",
    sheet: "Reporting_final_v3.xlsx",
    columns: ["Bereich", "Ist", "Plan"],
    cells: [
      ["Vertrieb", "84", "80"],
      ["Operations", "67", "70"],
      ["Service", "92", "90"],
    ],
    request: "Sind die Zahlen schon abgestimmt?",
    task: "Kopieren & nachprüfen",
    result: "Monatsbericht vorbereitet",
    alert: "Fachliche Einordnung offen",
    summary: "Daten zusammengeführt. Zahlen geprüft. Bericht vorbereitet.",
  },
  order: {
    before: "Anfragen übertragen. Zusagen klären.",
    after: "Ein Auftrag. Alles vorbereitet.",
    subject: "Anfrage: 100 Stück",
    message: "Können Sie alles zusammen liefern?",
    sheet: "Bestand & Konditionen",
    columns: ["Artikel", "Anfrage", "Bestand"],
    cells: [
      ["Bauteil A", "100", "80"],
      ["Kondition", "Standard", "Prüfen"],
      ["Lieferung", "Komplett", "Offen"],
    ],
    request: "Was können wir dem Kunden zusagen?",
    task: "Zwischen Teams klären",
    result: "Auftrag vorbereitet",
    alert: "Lieferoption abstimmen",
    summary: "Anfrage erfasst. Konditionen geprüft. Lieferoptionen liegen vor.",
  },
  case: {
    before: "Nachweise suchen. Teams abstimmen.",
    after: "Ein Fall. Eine begründete Lösung.",
    subject: "Lieferung beschädigt",
    message: "Fotos finden Sie im Anhang.",
    sheet: "Reklamationsübersicht",
    columns: ["Nachweis", "Ablage", "Status"],
    cells: [
      ["Lieferbeleg", "ERP", "Suchen"],
      ["Fotos", "E-Mail", "Prüfen"],
      ["Ersatz", "Service", "Offen"],
    ],
    request: "Haben wir alle Infos für den Ersatz?",
    task: "Suchen & nachhalten",
    result: "Reklamation vorbereitet",
    alert: "Ersatzlieferung prüfen",
    summary: "Nachweise gebündelt. Fall bewertet. Lösung vorgeschlagen.",
  },
} as const;

export function ManualWork({ process }: { process: ShowcaseProcess }) {
  const copy = visualCopy[process.id];
  return (
    <div className={s.manualCanvas}>
      <div className={s.mailCard}>
        <div className={s.documentHeader}>
          <span className={s.mailIcon}>
            <Icon name="mail" />
          </span>
          <span>Posteingang</span>
          <small>E-Mail</small>
        </div>
        <b>{copy.subject}</b>
        <p>{copy.message}</p>
        <div className={s.attachment}>
          <Icon name="invoice" />
          {process.files[0]}
        </div>
      </div>
      <div className={s.sheetCard}>
        <div className={s.documentHeader}>
          <span className={s.sheetIcon}>
            <Icon name="table" />
          </span>
          <b>{copy.sheet}</b>
        </div>
        <div className={s.miniTable}>
          <div>
            {copy.columns.map((c) => (
              <span key={c}>{c}</span>
            ))}
          </div>
          {copy.cells.map((row, i) => (
            <div key={i}>
              {row.map((cell, j) => (
                <span key={j}>{cell}</span>
              ))}
            </div>
          ))}
        </div>
        <span className={s.workTag}>
          <Icon name="search" />
          {copy.task}
        </span>
      </div>
      <div className={s.questionCard}>
        <span className={s.avatar}>
          <Icon name="user" />
        </span>
        <div>
          <b>{copy.request}</b>
          <span>Rückfrage an Ihr Team</span>
        </div>
        <Icon name="clock" />
      </div>
      <svg
        className={s.manualLine}
        viewBox="0 0 400 420"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M335 75C405 130 350 155 300 171M72 250C-10 280 19 355 99 350"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="5 6"
        />
      </svg>
    </div>
  );
}

/** Result-first software view, reusable in a future chat solution preview. */
export function ProcessScene({ process }: { process: ShowcaseProcess }) {
  const [expanded, setExpanded] = useState(false);
  const copy = visualCopy[process.id];
  return (
    <div className={s.application}>
      <div className={s.appHeader}>
        <span className={s.appLogo}>
          <Icon name="check" />
        </span>
        <strong>
          Opsrid<span>.</span>
        </strong>
        <span className={s.appHeaderLabel}>Ihr Prozess-Arbeitsplatz</span>
        <span className={s.appAvatar}>
          <Icon name="user" />
        </span>
      </div>
      <div className={s.appBody}>
        <aside className={s.appRail} aria-hidden="true">
          <span className={s.railSelected}>
            <Icon name={process.id} />
          </span>
          <Icon name="folder" />
          <Icon name="report" />
        </aside>
        <div className={s.workspace}>
          <div className={s.appBreadcrumb}>
            {process.label}
            <span>Beispielansicht</span>
          </div>
          <h4>{copy.result}</h4>
          <div className={s.completed}>
            <span>
              <Icon name="check" />
              Erfasst
            </span>
            <i />
            <span>
              <Icon name="check" />
              Geprüft
            </span>
            <i />
            <span>
              <Icon name="user" />
              Ihre Entscheidung
            </span>
          </div>
          {process.id === "invoice" ? (
            <div className={s.invoice}>
              <div className={s.tableHeading}>
                <span>Positionsabgleich</span>
                <span>Bestellung / Rechnung</span>
              </div>
              {copy.cells.map((row, i) => (
                <div className={i === 2 ? s.flagged : s.invoiceRow} key={i}>
                  <span className={s.positionNumber}>0{i + 1}</span>
                  <b>{row[0]}</b>
                  <span>{row[1]}</span>
                  <strong>{row[2]}</strong>
                  {i === 2 ? (
                    <span className={s.difference}>+25 €</span>
                  ) : (
                    <Icon name="check" />
                  )}
                </div>
              ))}
            </div>
          ) : process.id === "report" ? (
            <div className={s.report}>
              <div className={s.tableHeading}>
                <span>Ergebnisentwicklung</span>
                <span>Illustrative Daten</span>
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
              <div className={s.reportSources}>
                <Icon name="link" />
                Vertrieb · Finanzen · Planung<span>Zusammengeführt</span>
              </div>
            </div>
          ) : process.id === "order" ? (
            <div className={s.order}>
              <div className={s.tableHeading}>
                <span>Lieferplanung</span>
                <span>Bauteil A</span>
              </div>
              <div className={s.stockTitle}>
                <Icon name="order" />
                <div>
                  <strong>
                    80 <small>von 100 Stück</small>
                  </strong>
                  <span>sofort verfügbar</span>
                </div>
              </div>
              <div className={s.stockBar}>
                <span />
                <i />
              </div>
              <div className={s.stockLegend}>
                <span>80 verfügbar</span>
                <span>20 offen</span>
              </div>
            </div>
          ) : (
            <div className={s.caseOverview}>
              <div className={s.tableHeading}>
                <span>Fallakte vollständig</span>
                <span>Transportschaden</span>
              </div>
              <div className={s.caseEvidence}>
                {(["mail", "order", "invoice"] as const).map((icon, i) => (
                  <div key={icon}>
                    <span>
                      <Icon name={icon} />
                    </span>
                    <b>{["Kundenmeldung", "Lieferbeleg", "Nachweise"][i]}</b>
                    <small>
                      <Icon name="check" />
                      Zugeordnet
                    </small>
                  </div>
                ))}
              </div>
            </div>
          )}
          <button
            className={s.decision}
            onClick={() => setExpanded(!expanded)}
            aria-expanded={expanded}
          >
            <span className={s.decisionIcon}>
              <Icon name="user" />
            </span>
            <span>
              <small>IHRE ENTSCHEIDUNG</small>
              <b>{copy.alert}</b>
            </span>
            <Icon name={expanded ? "close" : "arrow"} />
          </button>
          {expanded && (
            <div className={s.evidence}>
              <b>{process.evidence}</b>
              <p>{process.note}</p>
            </div>
          )}
        </div>
      </div>
      <div className={s.appFooter}>
        <span>
          <Icon name="check" />
          Die Vorarbeit übernimmt Ihre Anwendung.
        </span>
        <Icon name="link" />
      </div>
    </div>
  );
}

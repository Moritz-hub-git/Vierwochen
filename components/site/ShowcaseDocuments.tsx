"use client";
import { useEffect, useState } from "react";
import Icon from "./ShowcaseIcon";
import {
  AppFrame,
  DoneBar,
  downloadExample,
  escapeHtml,
} from "./ShowcaseShared";
import s from "./Showcase.module.css";

const types = [
  "Angebot",
  "Vertrag",
  "Projektbericht",
  "Spezifikation",
] as const;
export function DocumentShowcase() {
  const [type, setType] = useState<string>("Angebot"),
    [customer, setCustomer] = useState("Beispielkunde"),
    [project, setProject] = useState("H2-450"),
    [language, setLanguage] = useState("Deutsch"),
    [variant, setVariant] = useState("Premium");
  const [step, setStep] = useState(-1),
    [review, setReview] = useState(false);
  const ready = step === 4,
    english = language === "Englisch";
  useEffect(() => {
    if (step < 0 || step >= 4) return;
    const timer = setTimeout(() => setStep((v) => v + 1), 450);
    return () => clearTimeout(timer);
  }, [step]);
  function reset() {
    setStep(-1);
    setReview(false);
  }
  const titles: Record<string, string> = {
    Angebot: "Proposal",
    Vertrag: "Contract draft",
    Projektbericht: "Project report",
    Spezifikation: "Specification",
  };
  const docTitle = english ? titles[type] : type;
  const sectionTitle =
    type === "Projektbericht"
      ? english
        ? "Project status"
        : "Projektstatus"
      : type === "Spezifikation"
        ? english
          ? "Technical requirements"
          : "Technische Anforderungen"
        : english
          ? "Scope of services"
          : "Leistungsumfang";
  const rows =
    type === "Projektbericht"
      ? [
          ["Konzeption", "Abgeschlossen"],
          ["Integration", "In Prüfung"],
          ["Pilotstart", "Zur Freigabe"],
        ]
      : type === "Spezifikation"
        ? [
            ["Ausführung", variant],
            ["Datenformat", "CSV / JSON"],
            ["Prüfung", "Nach abgestimmten Kriterien"],
          ]
        : [
            ["Konzeption", "8.000 €"],
            ["Umsetzung", variant === "Premium" ? "24.000 €" : "16.000 €"],
            ["Gesamt", variant === "Premium" ? "32.000 €" : "24.000 €"],
          ];
  const englishRows =
    type === "Projektbericht"
      ? [
          ["Concept", "Complete"],
          ["Integration", "Under review"],
          ["Pilot", "Awaiting approval"],
        ]
      : type === "Spezifikation"
        ? [
            ["Version", variant],
            ["Data format", "CSV / JSON"],
            ["Validation", "Agreed acceptance criteria"],
          ]
        : [
            ["Concept", "€8,000"],
            ["Implementation", variant === "Premium" ? "€24,000" : "€16,000"],
            ["Total", variant === "Premium" ? "€32,000" : "€24,000"],
          ];
  const shownRows = english ? englishRows : rows;
  const approval =
    type === "Vertrag"
      ? "Vertragsklausel fachlich prüfen"
      : type === "Projektbericht"
        ? "Projektstatus fachlich bestätigen"
        : type === "Spezifikation"
          ? "Abnahmekriterien freigeben"
          : "Preis und Leistungsumfang freigeben";
  function download() {
    const e = escapeHtml;
    downloadExample(
      "Opsrid-" + type + "-Muster.html",
      '<!doctype html><html lang="' +
        (english ? "en" : "de") +
        '"><meta charset="utf-8"><title>' +
        e(docTitle) +
        "</title><style>body{font:16px system-ui;max-width:800px;margin:60px auto;padding:24px;color:#30243f}table{width:100%;border-collapse:collapse}td{padding:14px;border-bottom:1px solid #ddd}small{color:#756887}</style><small>OPSRID · ILLUSTRATIVES MUSTER · NICHT FREIGEGEBEN</small><h1>" +
        e(docTitle) +
        "</h1><p>" +
        e(customer) +
        " · " +
        e(project) +
        " · " +
        e(variant) +
        "</p><h2>" +
        e(sectionTitle) +
        "</h2><table>" +
        shownRows
          .map(
            (r) => "<tr><td>" + e(r[0]) + "</td><td>" + e(r[1]) + "</td></tr>",
          )
          .join("") +
        "</table><p>" +
        e(approval) +
        "</p><p>Dieses Beispieldokument ist kein verbindliches Angebot oder rechtlich geprüftes Vertragswerk. Alle Angaben, Preise und Beilagen dienen der Demonstration.</p></html>",
    );
  }
  return (
    <AppFrame name="Dokumentenstudio">
      <div className={s.documentLayout}>
        <form
          className={s.configurator}
          onSubmit={(e) => {
            e.preventDefault();
            setReview(false);
            setStep(
              window.matchMedia("(prefers-reduced-motion: reduce)").matches
                ? 4
                : 0,
            );
          }}
        >
          <p className={s.eyebrow}>Fünf Angaben. Ein Ergebnis.</p>
          <h3>Was möchten Sie erstellen?</h3>
          <div className={s.documentTypes}>
            {types.map((t) => (
              <label key={t} className={type === t ? s.typeSelected : ""}>
                <input
                  type="radio"
                  name="document-type"
                  value={t}
                  checked={type === t}
                  onChange={() => {
                    setType(t);
                    reset();
                  }}
                />
                <Icon
                  name={
                    t === "Projektbericht"
                      ? "report"
                      : t === "Spezifikation"
                        ? "table"
                        : "invoice"
                  }
                />
                {t}
              </label>
            ))}
          </div>
          <div className={s.fieldGrid}>
            <label>
              Kunde
              <input
                required
                value={customer}
                maxLength={60}
                onChange={(e) => {
                  setCustomer(e.target.value);
                  reset();
                }}
              />
            </label>
            <label>
              Projekt
              <input
                required
                value={project}
                maxLength={40}
                onChange={(e) => {
                  setProject(e.target.value);
                  reset();
                }}
              />
            </label>
            <label>
              Sprache
              <select
                value={language}
                onChange={(e) => {
                  setLanguage(e.target.value);
                  reset();
                }}
              >
                <option>Deutsch</option>
                <option>Englisch</option>
              </select>
            </label>
            <label>
              Variante
              <select
                value={variant}
                onChange={(e) => {
                  setVariant(e.target.value);
                  reset();
                }}
              >
                <option>Premium</option>
                <option>Standard</option>
              </select>
            </label>
          </div>
          <button className={s.generateButton} disabled={step >= 0 && !ready}>
            {step >= 0 && !ready
              ? "Dokument entsteht…"
              : ready
                ? "Erneut erstellen"
                : "Dokument erstellen"}
            <Icon name={ready ? "check" : "arrow"} />
          </button>
          <small className={s.demoHint}>
            Interaktives Muster mit Beispieldaten.
          </small>
          {step >= 0 && (
            <div className={s.generationLog} aria-live="polite">
              <b>{ready ? type + " vorbereitet." : "Ihr Dokument entsteht."}</b>
              {[
                [18, "Datenpunkte aus dem Beispiel-CRM"],
                [6, "passende Textbausteine"],
                [4, "Berechnungen"],
                [3, "zugeordnete Anhänge"],
              ].map(([count, label], i) => (
                <span
                  key={label}
                  className={step > i ? s.logDone : s.logPending}
                >
                  <Icon name={step > i ? "check" : "clock"} />
                  <b>{count}</b>
                  {label}
                </span>
              ))}
            </div>
          )}
        </form>
        <div className={s.documentStage}>
          <div className={s.documentToolbar}>
            <span>
              <Icon name="invoice" />
              {ready ? "Dokumentenvorschau" : "Vorschau"}
            </span>
            <span>{ready ? "1 Punkt zur Freigabe" : "Aus Ihren Angaben"}</span>
          </div>
          <article className={s.paper} aria-label="Dokumentenvorschau">
            <div className={s.paperBrand}>
              Opsrid<span>.</span>
              <small>ILLUSTRATIVES MUSTER</small>
            </div>
            <div className={s.paperHeader}>
              <p>{english ? "PREPARED FOR" : "ERSTELLT FÜR"}</p>
              <h3>
                {step >= 0
                  ? docTitle
                  : english
                    ? "Your document"
                    : "Ihr Dokument"}
              </h3>
              <span>
                {customer || "Beispielkunde"}
                <br />
                {project || "Projekt"} · {variant}
              </span>
            </div>
            {step < 0 ? (
              <div className={s.paperPlaceholder}>
                <Icon name="invoice" />
                <b>
                  Fünf Angaben links.
                  <br />
                  Ihr Ergebnis entsteht hier.
                </b>
                <span>Starten Sie mit „Dokument erstellen“.</span>
              </div>
            ) : (
              <>
                <section className={s.paperSection}>
                  <small>01 / {english ? "OVERVIEW" : "ÜBERBLICK"}</small>
                  <h4>{sectionTitle}</h4>
                  <p>
                    {english
                      ? "Prepared from the selected project data, template modules and configuration."
                      : "Aus den gewählten Projektdaten, Vorlagenbausteinen und der Konfiguration zusammengestellt."}
                  </p>
                </section>
                {step >= 1 && (
                  <table className={s.paperTable}>
                    <tbody>
                      {shownRows.map((row) => (
                        <tr key={row[0]}>
                          <td>{row[0]}</td>
                          <td>{row[1]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
                {step >= 2 && (
                  <section className={s.paperSection}>
                    <small>
                      02 /{" "}
                      {english ? "TERMS & DETAILS" : "BEDINGUNGEN & DETAILS"}
                    </small>
                    <p>
                      {type === "Vertrag"
                        ? english
                          ? "Draft clause: Scope and acceptance criteria are subject to mutual agreement and review."
                          : "Musterklausel: Leistungsumfang und Abnahmekriterien bedürfen der gemeinsamen Abstimmung und Prüfung."
                        : english
                          ? "The prepared content follows the selected project configuration. Final approval is pending."
                          : "Die vorbereiteten Inhalte folgen der gewählten Projektkonfiguration. Die finale Freigabe steht aus."}
                    </p>
                  </section>
                )}
                {step >= 3 && (
                  <div className={s.paperAttachments}>
                    <Icon name="folder" />
                    {english
                      ? "3 example attachments assigned"
                      : "3 Beispielanhänge zugeordnet"}
                  </div>
                )}
              </>
            )}
            <footer>
              {project || "Projekt"}
              <span>
                {english
                  ? "Draft · not approved"
                  : "Entwurf · nicht freigegeben"}
              </span>
              <b>01</b>
            </footer>
          </article>
          {ready && (
            <div className={s.documentReview}>
              <button onClick={() => setReview(!review)} aria-expanded={review}>
                <Icon name="user" />
                <span>
                  <small>1 PUNKT ZUR FREIGABE</small>
                  <b>{approval}</b>
                </span>
                <Icon name="arrow" />
              </button>
              {review && (
                <p>
                  Die fachliche Prüfung bleibt bei Ihrem Team. Preise, Angaben
                  und Klauseln sind illustrative Muster; dieses Dokument ist
                  noch nicht freigegeben.
                </p>
              )}
              <button className={s.textButton} onClick={download}>
                <Icon name="download" />
                Muster herunterladen (.html)
              </button>
            </div>
          )}
        </div>
      </div>
      <DoneBar
        done={
          ready
            ? "31 Arbeitsschritte erledigt"
            : step >= 0
              ? "Ihr Dokument wird zusammengestellt"
              : "Aus fünf Angaben wird Ihr Dokument"
        }
        decisions={ready ? 1 : 0}
      />
    </AppFrame>
  );
}

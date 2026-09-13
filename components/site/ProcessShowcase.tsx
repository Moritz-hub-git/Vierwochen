"use client";
import { useState } from "react";
import { Arrow, Check } from "./Icons";
const examples = [
  {
    label: "Einkauf",
    title: "Auftragsbestätigung rein.\nAbgleich erledigt.",
    input: "Auftragsbestätigung.pdf",
    sub: "Bestellung #1048 · 12 Positionen",
    steps: [
      "Dokument verstehen",
      "Mit Bestellung abgleichen",
      "Abweichungen kennzeichnen",
    ],
    output: "Bereit für die Freigabe",
    note: "Liefertermin abweichend",
    human: "Einkauf prüft den neuen Liefertermin.",
    prompt:
      "Wir prüfen Auftragsbestätigungen aus PDFs manuell gegen unsere Bestellungen. Preise, Mengen und Liefertermine müssen stimmen.",
  },
  {
    label: "Vertrieb",
    title: "Anfrage rein.\nAngebot vorbereitet.",
    input: "Anfrage: 40 Baugruppen",
    sub: "E-Mail · Zeichnung · Spezifikation",
    steps: [
      "Anforderungen erfassen",
      "Produktdaten zuordnen",
      "Angebotsentwurf vorbereiten",
    ],
    output: "Entwurf zur Prüfung",
    note: "Preisfreigabe erforderlich",
    human: "Der Vertrieb entscheidet über Preis und Konditionen.",
    prompt:
      "Wir bekommen Angebotsanfragen per E-Mail mit PDFs und Zeichnungen. Unser Vertrieb sucht alle Produktdaten manuell zusammen.",
  },
  {
    label: "Reporting",
    title: "Zahlen zusammen.\nBericht vorbereitet.",
    input: "Monatsexporte.xlsx",
    sub: "ERP · Vertrieb · Controlling",
    steps: [
      "Daten zusammenführen",
      "Plausibilität prüfen",
      "Bericht vorbereiten",
    ],
    output: "Report zur Abnahme",
    note: "Eine Zahl braucht Kontext",
    human: "Controlling ergänzt die fachliche Einordnung.",
    prompt:
      "Wir kopieren monatlich Zahlen aus mehreren Excel-Exporten in ein Reporting und prüfen alles von Hand.",
  },
];
export default function ProcessShowcase() {
  const [active, setActive] = useState(0);
  const ex = examples[active];
  return (
    <section className="showcase container" id="beispiel">
      <div className="showcase-heading">
        <div>
          <span className="eyebrow">SO KANN WENIGER ARBEIT AUSSEHEN</span>
          <h2>
            Vom Handgriff
            <br />
            zum fertigen Vorgang.
          </h2>
        </div>
        <p>
          Ein möglicher Ablauf, anschaulich gemacht.
          <br />
          Ihre eigenen Systeme und Regeln geben den Rahmen vor.
        </p>
      </div>
      <div className="showcase-shell">
        <div
          className="showcase-tabs"
          role="group"
          aria-label="Prozessbeispiele"
        >
          {examples.map((e, i) => (
            <button
              key={e.label}
              aria-pressed={active === i}
              onClick={() => setActive(i)}
            >
              <span>0{i + 1}</span>
              {e.label}
              <Arrow />
            </button>
          ))}
          <small>ILLUSTRATIVES BEISPIEL</small>
        </div>
        <div className="showcase-body">
          <div className="showcase-copy">
            <span className="showcase-example">
              BEISPIEL · {ex.label.toUpperCase()}
            </span>
            <h3>
              {ex.title.split("\n").map((t) => (
                <span key={t}>{t}</span>
              ))}
            </h3>
            <p>
              Die Routine läuft automatisch.
              <br />
              Ihr Team bekommt die Fälle, bei denen es wirklich gebraucht wird.
            </p>
            <button
              className="text-link"
              onClick={() =>
                window.dispatchEvent(
                  new CustomEvent("opsrid:chat", {
                    detail: { text: ex.prompt },
                  }),
                )
              }
            >
              Diesen Prozess durchspielen <Arrow />
            </button>
          </div>
          <div
            className="workflow-visual"
            aria-label={"Beispielablauf " + ex.label}
          >
            <div className="workflow-input">
              <span className="document-symbol" aria-hidden="true">
                ≡
              </span>
              <div>
                <strong>{ex.input}</strong>
                <small>{ex.sub}</small>
              </div>
              <span className="file-type">INPUT</span>
            </div>
            <div className="workflow-line" />
            <div className="workflow-engine">
              <div className="engine-head">
                <span className="ai-orb" aria-hidden="true">
                  ✳
                </span>
                <strong>Opsrid</strong>
                <span>PROCESS AUTOMATION</span>
              </div>
              {ex.steps.map((s, i) => (
                <div className="engine-step" key={s}>
                  <span>0{i + 1}</span>
                  {s}
                  <Check />
                </div>
              ))}
            </div>
            <div className="workflow-line" />
            <div className="workflow-output">
              <div>
                <Check />
                <strong>{ex.output}</strong>
              </div>
              <span>{ex.note}</span>
              <p>{ex.human}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

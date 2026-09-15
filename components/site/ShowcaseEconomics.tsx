"use client";
import { useState } from "react";
import {
  projectEconomics,
  type ScenarioInputs,
} from "@/lib/showcase-economics";
import Icon from "./ShowcaseIcon";
import {
  AppFrame,
  DoneBar,
  downloadExample,
  escapeHtml,
} from "./ShowcaseShared";
import s from "./Showcase.module.css";
const num = (value: number, digits = 1) =>
  value.toLocaleString("de-DE", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
const base: ScenarioInputs = { electricity: 62, hours: 7200, capex: 850 };
type Saved = ScenarioInputs & { name: string };
export function EconomicsShowcase() {
  const [input, setInput] = useState<ScenarioInputs>(base);
  const [saved, setSaved] = useState<Saved[]>([
    { ...base, name: "Base Case" },
    { ...base, electricity: 80, name: "High Energy Price" },
    { ...base, capex: 700, name: "Low CAPEX" },
  ]);
  const [name, setName] = useState("Mein Szenario"),
    [status, setStatus] = useState(""),
    [sharing, setSharing] = useState(false);
  const result = projectEconomics(input);
  const sensitivity = [-20, -10, 0, 10, 20].map((change) => ({
    change,
    value: projectEconomics({
      ...input,
      electricity: input.electricity * (1 + change / 100),
    }).npv,
  }));
  const max = Math.max(...sensitivity.map((x) => Math.abs(x.value)), 1);
  function share() {
    const e = escapeHtml;
    const data = [{ ...input, name: "Aktuelle Annahmen" }, ...saved];
    downloadExample(
      "Opsrid-Szenarienvergleich.html",
      '<html lang="de"><meta charset="utf-8"><title>Szenarienvergleich – Beispiel</title><style>body{font:15px system-ui;max-width:1000px;margin:50px auto;padding:20px}table{width:100%;border-collapse:collapse}td,th{text-align:left;padding:12px;border-bottom:1px solid #ddd}</style><h1>Szenarienvergleich</h1><p>Illustratives, vereinfachtes Modell. Keine Investitionsempfehlung.</p><table><tr><th>Szenario</th><th>Strom €/MWh</th><th>Stunden</th><th>CAPEX Mio. €</th><th>NPV Mio. €</th><th>IRR</th></tr>' +
        data
          .map((d) => {
            const r = projectEconomics(d);
            return (
              "<tr><td>" +
              e(d.name) +
              "</td><td>" +
              d.electricity +
              "</td><td>" +
              d.hours +
              "</td><td>" +
              d.capex +
              "</td><td>" +
              num(r.npv) +
              "</td><td>" +
              (r.irr === null ? "Nicht ermittelbar" : num(r.irr * 100) + " %") +
              "</td></tr>"
            );
          })
          .join("") +
        "</table><p>Modell: 1.000 MW Elektrolyse, 50 kWh/kg H₂, 4,90 €/kg Verkaufspreis, 142,8 Mio. € fixe Betriebskosten pro Jahr. Laufzeit 20 Jahre, Diskontierung 10 %. Konstante jährliche Cashflows am Jahresende; CAPEX zu Beginn. Ohne Steuern, Finanzierung, Restwert, Bauphase oder Inflation. Payback ist die einfache, undiskontierte Amortisation innerhalb der Laufzeit. Alle Daten sind Beispiele.</p></html>",
    );
    setStatus(
      "Entscheidungsunterlage heruntergeladen. Es wurde nichts versendet.",
    );
  }
  return (
    <AppFrame name="Investment Studio">
      <div className={s.economicsLayout}>
        <aside className={s.assumptions}>
          <p className={s.eyebrow}>Projekt H2-450 · Modellbeispiel</p>
          <h3>Annahmen ändern.</h3>
          {(
            [
              {
                key: "electricity",
                label: "Strompreis",
                unit: "€/MWh",
                min: 20,
                max: 120,
                step: 1,
              },
              {
                key: "hours",
                label: "Auslastung",
                unit: "h / Jahr",
                min: 4000,
                max: 8500,
                step: 100,
              },
              {
                key: "capex",
                label: "CAPEX",
                unit: "Mio. €",
                min: 400,
                max: 1400,
                step: 10,
              },
            ] as const
          ).map((field) => (
            <label className={s.sliderField} key={field.key}>
              <span>
                {field.label}
                <output>
                  {num(input[field.key], 0)} <small>{field.unit}</small>
                </output>
              </span>
              <input
                aria-label={field.label}
                type="range"
                min={field.min}
                max={field.max}
                step={field.step}
                value={input[field.key]}
                onChange={(e) => {
                  setInput({ ...input, [field.key]: Number(e.target.value) });
                  setStatus("");
                }}
              />
              <span className={s.rangeEnds}>
                <small>{num(field.min, 0)}</small>
                <small>{num(field.max, 0)}</small>
              </span>
            </label>
          ))}
          <details className={s.modelDetails}>
            <summary>Modellannahmen & Rechenweg</summary>
            <p>
              Elektrolyse: 1.000 MW · 50 kWh/kg H₂ · Verkaufspreis 4,90 €/kg ·
              fixe Betriebskosten 142,8 Mio. €/Jahr.
            </p>
            <p>
              Jährlicher Cashflow = H₂-Erlöse − Stromkosten − Betriebskosten.
              Konstante Zahlungen am Jahresende über 20 Jahre; Investition zu
              Beginn. NPV bei 10 % Diskontierung. IRR ist der Zinssatz bei NPV =
              0. Payback = Investition / jährlicher Cashflow.
            </p>
            <p>
              Ohne Steuern, Finanzierung, Inflation, Bauphase oder Restwert.
              Illustration, keine Investitionsempfehlung.
            </p>
          </details>
        </aside>
        <div className={s.economicsResults}>
          <div className={s.workspaceHeading}>
            <div>
              <p className={s.eyebrow}>Auswirkungen verstehen</p>
              <h3>Entscheiden.</h3>
            </div>
            <span className={s.liveBadge}>
              <i />
              Live berechnet
            </span>
          </div>
          <div className={s.financeMetrics}>
            <div>
              <small>IRR</small>
              <b>{result.irr === null ? "—" : num(result.irr * 100) + " %"}</b>
              <span>Interne Verzinsung</span>
            </div>
            <div>
              <small>NPV</small>
              <b className={result.npv < 0 ? s.negative : ""}>
                {num(result.npv)}
                <em> Mio. €</em>
              </b>
              <span>Kapitalwert bei 10 %</span>
            </div>
            <div>
              <small>Payback</small>
              <b>
                {result.payback === null ? "—" : num(result.payback)}
                <em>{result.payback !== null ? " Jahre" : ""}</em>
              </b>
              <span>
                {result.payback === null
                  ? "Keine Amortisation in 20 Jahren"
                  : "Einfache Amortisation"}
              </span>
            </div>
          </div>
          <div className={s.sensitivity}>
            <header>
              <b>Wie viel verändert der Strompreis?</b>
              <span>Sensitivität · NPV in Mio. €</span>
            </header>
            <div className={s.sensitivityLabels}>
              <span>Preis Δ</span>
              <span>Negativer Kapitalwert</span>
              <span>Positiver Kapitalwert</span>
            </div>
            {sensitivity.map((row) => (
              <div className={s.sensitivityRow} key={row.change}>
                <b>
                  {row.change > 0 ? "+" : ""}
                  {row.change} %
                </b>
                <div className={s.sensitivityTrack}>
                  <i />
                  <span
                    className={
                      row.value < 0
                        ? s.sensitivityNegative
                        : s.sensitivityPositive
                    }
                    style={{
                      left:
                        (row.value < 0
                          ? 50 - (Math.abs(row.value) / max) * 47
                          : 50) + "%",
                      width:
                        Math.max((Math.abs(row.value) / max) * 47, 0.3) + "%",
                    }}
                  />
                </div>
                <output>{num(row.value, 0)}</output>
              </div>
            ))}
          </div>
          <div className={s.scenarioHeading}>
            <h4>Szenarien vergleichen</h4>
            <span>Nur in dieser Sitzung</span>
          </div>
          <div className={s.scenarios}>
            {saved.map((scenario, i) => (
              <button
                key={i}
                onClick={() => {
                  setInput({
                    electricity: scenario.electricity,
                    hours: scenario.hours,
                    capex: scenario.capex,
                  });
                  setStatus(scenario.name + " geladen.");
                }}
              >
                <b>{scenario.name}</b>
                <span>{num(projectEconomics(scenario).npv, 0)} Mio. € NPV</span>
              </button>
            ))}
          </div>
          <form
            className={s.saveScenario}
            onSubmit={(e) => {
              e.preventDefault();
              if (!name.trim()) return;
              if (saved.length >= 6) {
                setStatus(
                  "Maximal sechs Demo-Szenarien. Zum Vergleich ein vorhandenes Szenario auswählen.",
                );
                return;
              }
              setSaved([...saved, { ...input, name: name.trim() }]);
              setStatus("Szenario in dieser Sitzung gespeichert.");
              setName("Szenario " + (saved.length + 2));
            }}
          >
            <input
              aria-label="Szenarioname"
              value={name}
              maxLength={35}
              required
              onChange={(e) => setName(e.target.value)}
            />
            <button type="submit">
              <Icon name="folder" />
              Szenario speichern
            </button>
          </form>
          <button
            className={s.shareButton}
            onClick={() => setSharing(!sharing)}
            aria-expanded={sharing}
          >
            Mit Vorstand teilen
            <Icon name="arrow" />
          </button>
          {sharing && (
            <div className={s.inlinePanel}>
              <b>Entscheidungsunterlage zur Weitergabe</b>
              <p>
                Aktuelle Annahmen, Kennzahlen und gespeicherte Szenarien als
                HTML-Datei. Es wird keine E-Mail versendet.
              </p>
              <button className={s.smallPrimary} onClick={share}>
                <Icon name="download" />
                Unterlage herunterladen
              </button>
            </div>
          )}
          <p className={s.statusMessage} role="status">
            {status}
          </p>
        </div>
      </div>
      <DoneBar
        done="Berechnung, Sensitivität und Visualisierung erledigt"
        decisions={1}
      />
    </AppFrame>
  );
}

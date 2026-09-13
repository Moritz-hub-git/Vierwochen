"use client";
import Link from "next/link";
import { useState } from "react";
import BlueprintApp from "@/components/blueprint/BlueprintApp";
import { buildBlueprint } from "@/lib/blueprint";
import { startBlueprint } from "@/components/blueprint/BlueprintFunnel";
import styles from "./live-concept.module.css";
const EXAMPLES = {
  einkauf: {
    label: "Einkauf",
    title: "Lieferantenbestätigungen prüfen",
    source: "E-Mail · PDF · Bestellung",
    rows: [
      ["AB-2048", "Preisabweichung", "+ 2,4 %"],
      ["AB-2047", "Geprüft", "Ohne Befund"],
      ["AB-2046", "Liefertermin", "+ 4 Tage"],
    ],
    decision: "2 Abweichungen brauchen eine Entscheidung",
  },
  reporting: {
    label: "Reporting",
    title: "Managementbericht vorbereiten",
    source: "3 Excel-Dateien · Vormonat",
    rows: [
      ["Umsatz DACH", "Geprüft", "1.248.400 €"],
      ["Marge", "Plausibilisieren", "28,7 %"],
      ["Forecast", "Freigabe offen", "Q4"],
    ],
    decision: "Berichtsvorschau wartet auf Freigabe",
  },
  reklamation: {
    label: "Reklamationen",
    title: "Reklamationen bearbeiten",
    source: "E-Mail · Fotos · Lieferschein",
    rows: [
      ["R-1083", "Nachweise vollständig", "Priorität hoch"],
      ["R-1082", "Antwort vorbereitet", "Prüfung offen"],
      ["R-1081", "Rückfrage", "Beleg fehlt"],
    ],
    decision: "1 Antwort braucht eine fachliche Freigabe",
  },
} as const;


export default function LiveConcept() {
  const [draft, setDraft] = useState("");
  const [example, setExample] = useState<keyof typeof EXAMPLES>("einkauf");
  const active = EXAMPLES[example];
  const initialBlueprint = buildBlueprint(
    {
      processType:
        example === "reporting"
          ? "reporting"
          : example === "reklamation"
            ? "complaints"
            : "purchasing",
      title: active.title,
      inputs: active.source.split(" · "),
      outputs: [
        example === "reporting" ? "Managementbericht" : "Geprüfter Vorgang",
      ],
      actions: ["Daten erfassen", "Abweichungen prüfen"],
      approvals: [active.decision],
    },
    { title: active.title, steps: [], value: [], open: [], assumptions: [] },
    "",
  );
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Link href="/" className={styles.logo}>
          ✦ OpsDone.
        </Link>
        <nav aria-label="Seitennavigation">
          <a href="#so-funktionierts">So funktioniert es</a>
          <a href="#zusammenarbeit">Zusammenarbeit</a>
          <a href="#fragen">Fragen</a>
          <button className={styles.headerCta} onClick={() => startBlueprint()}>
            Blueprint erstellen
          </button>
        </nav>
      </header>
      <main id="main">
        <section className={styles.hero} id="entwurf">
          <div className={styles.heroCopy}>
            <p className={styles.kicker}>
              <span /> Individuelle Anwendungen für Ihre Abläufe
            </p>
            <h1>Work eliminated.</h1>
            <p className={styles.claim}>
              Geben Sie uns Ihren Prozess.
              <br />
              Wir bauen die Software, die ihn erledigt.
            </p>
          </div>
          <div className={styles.workspace}>
            <section className={styles.intake} aria-labelledby="intake-title">
              <div className={styles.panelHead}>
                <span>01</span>
                <div>
                  <small>IHR PROZESS</small>
                  <h2 id="intake-title">
                    Ihr Solution Blueprint beginnt hier.
                  </h2>
                </div>
              </div>
              <div className={styles.start}>
                <label htmlFor="process-description">
                  Welche wiederkehrende Arbeit kostet Ihr Team am meisten Zeit?
                </label>
                <p>
                  Ihre Anwendung, Ihr neuer Ablauf und Ihr Potenzial. In wenigen
                  Schritten – ohne E-Mail-Pflicht.
                </p>
                <form
                  className={styles.firstForm}
                  onSubmit={(e) => {
                    e.preventDefault();
                    startBlueprint(draft, true);
                  }}
                >
                  <textarea
                    id="process-description"
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    rows={5}
                    maxLength={1500}
                    placeholder="Zum Beispiel: Wir vergleichen jeden Monat mehrere Excel-Dateien und bauen daraus unseren Managementbericht."
                  />
                  <div>
                    <span>Ca. 60–90 Sekunden</span>
                    <button disabled={!draft.trim()}>
                      Blueprint erstellen ↗
                    </button>
                  </div>
                </form>
                <div className={styles.starters}>
                  <span>Oder mit einem Beispiel beginnen</span>
                  {[
                    [
                      "Auftragsbestätigungen prüfen",
                      "Wir vergleichen Auftragsbestätigungen aus E-Mail und PDF mit unseren Bestellungen.",
                    ],
                    [
                      "Managementbericht erstellen",
                      "Wir vergleichen jeden Monat mehrere Excel-Dateien und erstellen einen Managementbericht.",
                    ],
                    [
                      "Reklamationen bearbeiten",
                      "Wir bearbeiten Reklamationen aus E-Mails, Fotos und Lieferscheinen manuell.",
                    ],
                  ].map(([label, text]) => (
                    <button
                      key={label}
                      onClick={() => startBlueprint(text, true)}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </section>
            <section className={styles.preview} aria-labelledby="preview-title">
              <div className={styles.panelHead}>
                <span>02</span>
                <div>
                  <small>IHRE SOFTWARE</small>
                  <h2 id="preview-title">So könnte Ihre Anwendung aussehen.</h2>
                </div>
              </div>
              <p className={styles.disclaimer}>
                <strong>Vorläufiges Lösungskonzept.</strong> Noch keine fertige
                Anwendung.
              </p>
              <div
                className={styles.exampleTabs}
                role="tablist"
                aria-label="Beispielanwendungen"
              >
                {(Object.keys(EXAMPLES) as (keyof typeof EXAMPLES)[]).map(
                  (key) => (
                    <button
                      key={key}
                      role="tab"
                      aria-selected={example === key}
                      onClick={() => setExample(key)}
                    >
                      {EXAMPLES[key].label}
                    </button>
                  ),
                )}
              </div>
              <p className={styles.sectionKicker}>BEISPIELANWENDUNG</p>
              <BlueprintApp blueprint={initialBlueprint} key={example} />
              <p className={styles.exampleNote}>
                Ihr Blueprint stellt passende Ansichten und Funktionen aus Ihrem
                Prozess zusammen. Die Daten hier sind Beispiele.
              </p>
            </section>
          </div>
        </section>
        <section className={styles.explainer} id="so-funktionierts">
          <p className={styles.sectionKicker}>VOM PROZESS ZUM BETRIEB</p>
          <h2>Software, die sich an Ihre Arbeit anpasst.</h2>
          <div className={styles.steps}>
            <article>
              <span>01</span>
              <h3>Prozess verstehen</h3>
              <p>
                Wir erfassen Eingänge, Regeln, Sonderfälle und das Ergebnis, das
                Ihr Team wirklich braucht.
              </p>
            </article>
            <article>
              <span>02</span>
              <h3>Pilot bauen</h3>
              <p>
                Ein klar begrenzter Ablauf wird zur nutzbaren Anwendung – mit
                echten Prüfregeln und sichtbaren Entscheidungen.
              </p>
            </article>
            <article>
              <span>03</span>
              <h3>Sicher betreiben</h3>
              <p>
                Standardfälle laufen verlässlich. Unsicherheit bleibt sichtbar
                und wird an die richtigen Menschen gegeben.
              </p>
            </article>
          </div>
        </section>

        <section className={styles.principles} id="zusammenarbeit">
          <div>
            <p className={styles.sectionKicker}>DAS PRODUKTVERSPRECHEN</p>
            <h2>
              Ihre Systeme bleiben.
              <br />
              Die Handarbeit dazwischen geht.
            </h2>
          </div>
          <div className={styles.principleList}>
            <article>
              <b>Individuell gebaut</b>
              <p>
                Ihre Regeln, Verantwortlichen und Daten bestimmen die Anwendung.
              </p>
            </article>
            <article>
              <b>Entscheidungen bleiben menschlich</b>
              <p>
                Die Software bereitet vor, dokumentiert und eskaliert, wo Urteil
                gefragt ist.
              </p>
            </article>
            <article>
              <b>Verantwortlich betrieben</b>
              <p>
                OpsDone entwickelt, überwacht und verbessert den vereinbarten
                Prozess.
              </p>
            </article>
          </div>
        </section>

        <section className={styles.faq} id="fragen">
          <p className={styles.sectionKicker}>HÄUFIGE FRAGEN</p>
          <h2>Was Sie vor dem ersten Gespräch wissen sollten.</h2>
          <details>
            <summary>
              Entsteht hier schon meine fertige Software?<span>+</span>
            </summary>
            <p>
              Nein. Der interaktive Entwurf macht Anforderungen und eine
              mögliche Lösung konkret. Integrationen, Regeln und Machbarkeit
              prüfen wir anschließend gemeinsam.
            </p>
          </details>
          <details>
            <summary>
              Müssen wir bestehende Systeme ersetzen?<span>+</span>
            </summary>
            <p>
              In der Regel nicht. Die Anwendung wird für den vereinbarten
              Prozess entwickelt und arbeitet mit den vorhandenen Systemen,
              soweit geeignete Zugänge verfügbar sind.
            </p>
          </details>
          <details>
            <summary>
              Was passiert mit Sonderfällen?<span>+</span>
            </summary>
            <p>
              Sie werden sichtbar gemacht und mit dem nötigen Kontext an die
              verantwortliche Person gegeben. Entscheidungen werden nicht hinter
              einer grünen Statusanzeige versteckt.
            </p>
          </details>
          <details>
            <summary>
              Wie beginnt die Zusammenarbeit?<span>+</span>
            </summary>
            <p>
              Mit einem begrenzten Pilot für einen klar beschriebenen Prozess.
              Umfang, Datenzugänge, Freigaben und Betrieb werden vor der
              Umsetzung gemeinsam festgelegt.
            </p>
          </details>
        </section>
      </main>

      <footer className={styles.footer}>
        <div>
          <Link href="/" className={styles.logo}>
            <span aria-hidden="true">✦</span> OpsDone<i>.</i>
          </Link>
          <p>Work eliminated.</p>
        </div>
        <div>
          <Link href="/impressum">Impressum</Link>
          <Link href="/datenschutz">Datenschutz</Link>
          <Link href="/agb">Vertragsgrundlagen</Link>
        </div>
        <small>© {new Date().getFullYear()} OpsDone</small>
      </footer>
    </div>
  );
}

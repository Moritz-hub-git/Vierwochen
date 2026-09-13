"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import styles from "./eliminated.module.css";

const steps = [
  ["E-Mail öffnen", "AB_2841.pdf", "Eingang erkannt"],
  ["Positionen übertragen", "18 Zeilen", "18 Positionen erfasst"],
  ["Preise vergleichen", "Bestellung #45821", "Konditionen geprüft"],
  ["Abweichung suchen", "+ 4,8 % bei Pos. 07", "Entscheidung vorbereitet"],
];

function launch(text: string) {
  window.dispatchEvent(
    new CustomEvent("opsdone:chat", { detail: { text, submit: true } }),
  );
}

export default function Eliminated() {
  const [process, setProcess] = useState("");
  const [demoAction, setDemoAction] = useState<"question" | "approval" | null>(
    null,
  );
  const submit = (event: FormEvent) => {
    event.preventDefault();
    launch(
      process.trim() ||
        "Ich möchte herausfinden, welche Arbeit bei uns verschwinden kann.",
    );
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Link className={styles.brand} href="/" aria-label="OpsDone Startseite">
          Ops<span>Done.</span>
        </Link>
        <nav aria-label="Seitennavigation">
          <a href="#wirkung">Was bleibt</a>
          <a href="#vorgehen">Vorgehen</a>
          <a className={styles.navCta} href="/prozess-check">
            Prozess beschreiben <span>↗</span>
          </a>
        </nav>
      </header>

      <main id="main">
        <section className={styles.hero}>
          <p className={styles.kicker}>
            <span /> Individuelle Anwendungen für operative Prozesse
          </p>
          <h1>
            Die Arbeit
            <br />
            <em>verschwindet.</em>
            <br />
            Das Ergebnis bleibt.
          </h1>
          <div
            className={styles.stage}
            aria-label="Aus manuellen Arbeitsschritten wird eine konkrete Anwendung"
          >
            <div className={styles.before}>
              <div className={styles.stageTop}>
                <span>Ihre Arbeit heute</span>
                <small>Beispiel · Einkauf</small>
              </div>
              <div className={styles.manualList}>
                {steps.map((step, i) => (
                  <div className={styles.manual} key={step[0]}>
                    <b>0{i + 1}</b>
                    <div>
                      <strong>{step[0]}</strong>
                      <span>{step[1]}</span>
                    </div>
                    <i>···</i>
                  </div>
                ))}
              </div>
              <p>Vier sorgfältige Schritte. Für jeden Vorgang aufs Neue.</p>
            </div>
            <div className={styles.transform} aria-hidden="true">
              <span>Arbeit wird Funktion</span>
              <i>→</i>
            </div>
            <div className={styles.after}>
              <div className={styles.stageTop}>
                <span>Ihre Software morgen</span>
                <small>Beispielansicht</small>
              </div>
              <div className={styles.appbar}>
                <b>Bestellprüfung</b>
                <span>Vorgang 2841</span>
                <i>1 Entscheidung</i>
              </div>
              <div className={styles.summary}>
                <span>
                  <small>Lieferant</small>
                  <b>Hansa Bauteile GmbH</b>
                </span>
                <span>
                  <small>Bestellwert</small>
                  <b>24.820,00 €</b>
                </span>
                <span>
                  <small>Prüfung</small>
                  <b>17 von 18 korrekt</b>
                </span>
              </div>
              <div className={styles.exception}>
                <div>
                  <span>ABWEICHUNG · POSITION 07</span>
                  <strong>Dichtungssatz MX-4</strong>
                  <small>
                    Die bestätigte Position liegt über der vereinbarten
                    Kondition.
                  </small>
                </div>
                <div className={styles.compare}>
                  <span>
                    <small>Bestellt</small>
                    <b>48,20 €</b>
                  </span>
                  <span>
                    <small>Bestätigt</small>
                    <b>50,51 €</b>
                  </span>
                  <strong>+ 4,8 %</strong>
                </div>
              </div>
              <div className={styles.evidence}>
                <span>✓ Bestellung abgeglichen</span>
                <span>✓ PDF archiviert</span>
                <span>✓ Prüfschritte protokolliert</span>
              </div>
              <div className={styles.actions}>
                <button type="button" onClick={() => setDemoAction("question")}>
                  Rückfrage vorbereiten
                </button>
                <button type="button" onClick={() => setDemoAction("approval")}>
                  Abweichung freigeben
                </button>
              </div>
              {demoAction && (
                <div className={styles.demoResponse} role="status">
                  <b>
                    {demoAction === "question"
                      ? "Rückfrage als Entwurf vorbereitet"
                      : "Freigabeansicht geöffnet"}
                  </b>
                  <span>
                    {demoAction === "question"
                      ? "Position, Kondition und Originalbeleg sind bereits angehängt."
                      : "Die Entscheidung bleibt beim zuständigen Menschen und wird nachvollziehbar protokolliert."}
                  </span>
                  <button type="button" onClick={() => setDemoAction(null)}>
                    Schließen
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className={styles.heroClose}>
            <div>
              <strong>Work eliminated.</strong>
              <p>
                Geben Sie uns Ihren Prozess. Wir bauen die Software, die ihn
                erledigt.
              </p>
            </div>
            <form onSubmit={submit}>
              <label htmlFor="eliminated-process">
                Welche Arbeit soll bei Ihnen verschwinden?
              </label>
              <div>
                <input
                  id="eliminated-process"
                  value={process}
                  onChange={(e) => setProcess(e.target.value)}
                  placeholder="Zum Beispiel: Wir gleichen jede Woche …"
                />
                <button aria-label="Prozess absenden">→</button>
              </div>
              <small>
                Sie erhalten zuerst eine konkrete Prozesseinschätzung. Ohne
                E-Mail-Hürde.
              </small>
            </form>
          </div>
        </section>

        <section className={styles.remains} id="wirkung">
          <div className={styles.sectionNo}>01 / WAS BLEIBT</div>
          <div className={styles.remainIntro}>
            <h2>
              Wir entfernen nicht den Prozess.
              <br />
              Wir entfernen die Routine.
            </h2>
            <p>
              Dokumente, Regeln und Entscheidungen bleiben nachvollziehbar. Die
              wiederkehrende Arbeit dazwischen wird Teil einer für Sie gebauten
              Anwendung.
            </p>
          </div>
          <div className={styles.remainGrid}>
            <article>
              <span>01</span>
              <h3>Eingänge werden Vorgänge.</h3>
              <p>
                E-Mails, Dateien und Daten werden strukturiert erfasst und dem
                richtigen Fall zugeordnet.
              </p>
            </article>
            <article>
              <span>02</span>
              <h3>Regeln werden Prüfungen.</h3>
              <p>
                Ihre Konditionen und Freigabewege werden als nachvollziehbare
                Logik abgebildet.
              </p>
            </article>
            <article>
              <span>03</span>
              <h3>Ausnahmen werden Entscheidungen.</h3>
              <p>
                Ihr Team sieht nur, was menschliches Urteil braucht – mit
                Kontext und Entscheidungsvorlage.
              </p>
            </article>
          </div>
        </section>

        <section className={styles.scope} id="vorgehen">
          <div className={styles.sectionNo}>02 / VOM PROZESS ZUM BETRIEB</div>
          <div className={styles.scopeHead}>
            <h2>
              Eine klare Aufgabe.
              <br />
              Eine verantwortete Lösung.
            </h2>
            <p>
              Wir analysieren, bauen und betreiben. Sie behalten die fachliche
              Kontrolle und entscheiden, was automatisiert werden darf.
            </p>
          </div>
          <ol>
            <li>
              <b>01</b>
              <div>
                <h3>Prozess verstehen</h3>
                <p>
                  Wir klären Eingänge, Regeln, Ausnahmen, gewünschte Ergebnisse
                  und beteiligte Systeme.
                </p>
              </div>
              <span>Gemeinsamer Scope</span>
            </li>
            <li>
              <b>02</b>
              <div>
                <h3>Pilot festlegen</h3>
                <p>
                  Umfang, Abnahmekriterien, Verantwortlichkeiten und Preis
                  werden vor dem Start schriftlich vereinbart.
                </p>
              </div>
              <span>Fester Rahmen</span>
            </li>
            <li>
              <b>03</b>
              <div>
                <h3>Software bauen</h3>
                <p>
                  Sie sehen früh eine funktionierende Anwendung mit echten
                  Abläufen und klar sichtbaren Unsicherheiten.
                </p>
              </div>
              <span>Individuelle Anwendung</span>
            </li>
            <li>
              <b>04</b>
              <div>
                <h3>Sicher betreiben</h3>
                <p>
                  Wir überwachen die Automation, behandeln Fehler und entwickeln
                  sie im vereinbarten Umfang weiter.
                </p>
              </div>
              <span>Managed Operation</span>
            </li>
          </ol>
        </section>

        <section className={styles.proof}>
          <p>Die richtige Frage ist nicht:</p>
          <h2>„Wo setzen wir KI ein?“</h2>
          <p>Sondern:</p>
          <h2>„Welche Arbeit muss morgen niemand mehr von Hand erledigen?“</h2>
        </section>

        <section className={styles.faq}>
          <div>
            <div className={styles.sectionNo}>03 / KLARE ANTWORTEN</div>
            <h2>
              Bevor wir
              <br />
              anfangen.
            </h2>
          </div>
          <div>
            {[
              [
                "Ersetzt OpsDone unsere bestehenden Systeme?",
                "In der Regel nicht. Wir bauen die Anwendung für die Arbeit zwischen Ihren bestehenden Systemen und binden diese passend zum vereinbarten Scope an.",
              ],
              [
                "Was passiert bei unklaren Fällen?",
                "Unsicherheit wird sichtbar. Der Vorgang landet mit dem relevanten Kontext bei der zuständigen Person, statt stillschweigend falsch verarbeitet zu werden.",
              ],
              [
                "Ist das ein Standardprodukt?",
                "Nein. Die Anwendung wird für Ihren Prozess, Ihre Regeln und Ihre Verantwortlichkeiten entwickelt. Gezeigt werden hier ausdrücklich Beispielansichten.",
              ],
              [
                "Wie beginnt ein Projekt?",
                "Mit einer konkreten Prozessbeschreibung. Daraus entstehen eine Ersteinschätzung und anschließend ein klar begrenzter Pilot mit schriftlichem Scope.",
              ],
            ].map(([q, a]) => (
              <details key={q}>
                <summary>
                  {q}
                  <span>+</span>
                </summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className={styles.finalCta}>
          <span>Work eliminated.</span>
          <h2>
            Welche Arbeit soll bei
            <br />
            Ihnen verschwinden?
          </h2>
          <button
            onClick={() =>
              launch(
                "Ich möchte einen Prozess beschreiben, der bei uns noch manuell läuft.",
              )
            }
          >
            Prozess beschreiben <i>→</i>
          </button>
        </section>
      </main>
      <footer className={styles.footer}>
        <Link className={styles.brand} href="/">
          Ops<span>Done.</span>
        </Link>
        <p>Individuelle KI-Anwendungen für operative Prozesse.</p>
        <nav>
          <Link href="/impressum">Impressum</Link>
          <Link href="/datenschutz">Datenschutz</Link>
          <Link href="/agb">Vertragsgrundlagen</Link>
        </nav>
        <small>© {new Date().getFullYear()} OpsDone</small>
      </footer>
    </div>
  );
}

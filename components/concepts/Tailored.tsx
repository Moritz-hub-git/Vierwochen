"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import styles from "./tailored.module.css";

type Example = "einkauf" | "reporting" | "reklamation";
const examples: Record<
  Example,
  { no: string; label: string; brief: string[] }
> = {
  einkauf: {
    no: "A",
    label: "Einkauf",
    brief: [
      "E-Mail und PDF",
      "Bestellung + Konditionen",
      "Abweichungen freigeben",
      "Geprüfter Vorgang",
    ],
  },
  reporting: {
    no: "B",
    label: "Reporting",
    brief: [
      "Excel + ERP-Export",
      "Zahlen und Vorperioden",
      "Kommentar freigeben",
      "Managementbericht",
    ],
  },
  reklamation: {
    no: "C",
    label: "Reklamationen",
    brief: [
      "E-Mail + Nachweise",
      "Fristen und Anspruch",
      "Maßnahme entscheiden",
      "Vollständiger Fall",
    ],
  },
};

function launch(text: string) {
  window.dispatchEvent(
    new CustomEvent("opsdone:chat", { detail: { text, submit: true } }),
  );
}

function Application({ active }: { active: Example }) {
  const [reportEdit, setReportEdit] = useState(false);
  const [reportNote, setReportNote] = useState(
    "Der Umsatz liegt über Plan. Zwei Positionen sind vor der Freigabe noch fachlich zu prüfen.",
  );
  const [buyDecision, setBuyDecision] = useState(false);
  const [claimDetails, setClaimDetails] = useState(false);
  if (active === "reporting")
    return (
      <div className={styles.reportApp}>
        <div className={styles.appTitle}>
          <div>
            <small>BEISPIELANWENDUNG · REPORTING</small>
            <h3>Monatsbericht · August</h3>
          </div>
          <span>Entwurf</span>
        </div>
        <div className={styles.reportStats}>
          <div>
            <small>Umsatz</small>
            <strong>2,48 Mio. €</strong>
            <i>+ 3,2 % ggü. Plan</i>
          </div>
          <div>
            <small>Rohertrag</small>
            <strong>713 Tsd. €</strong>
            <i>28,8 % Marge</i>
          </div>
          <div>
            <small>Offene Prüfung</small>
            <strong>2 Positionen</strong>
            <i className={styles.alert}>Entscheidung nötig</i>
          </div>
        </div>
        <div className={styles.reportBody}>
          <div>
            <div className={styles.chart}>
              <span style={{ height: "45%" }} />
              <span style={{ height: "59%" }} />
              <span style={{ height: "52%" }} />
              <span style={{ height: "72%" }} />
              <span style={{ height: "66%" }} />
              <span style={{ height: "82%" }} />
            </div>
            <div className={styles.axis}>
              <span>Mär</span>
              <span>Apr</span>
              <span>Mai</span>
              <span>Jun</span>
              <span>Jul</span>
              <span>Aug</span>
            </div>
          </div>
          <div className={styles.preview}>
            <small>BERICHTSVORSCHAU</small>
            <b>Entwicklung im August</b>
            {reportEdit ? (
              <textarea
                aria-label="Beispielkommentar"
                value={reportNote}
                onChange={(event) => setReportNote(event.target.value)}
              />
            ) : (
              <p>{reportNote}</p>
            )}
            <button type="button" onClick={() => setReportEdit(!reportEdit)}>
              {reportEdit ? "Kommentar übernehmen" : "Kommentar bearbeiten"}
            </button>
          </div>
        </div>
      </div>
    );
  if (active === "reklamation")
    return (
      <div className={styles.claimApp}>
        <div className={styles.appTitle}>
          <div>
            <small>BEISPIELANWENDUNG · REKLAMATIONEN</small>
            <h3>Fall RK-1048</h3>
          </div>
          <span>Prüfung offen</span>
        </div>
        <div className={styles.claimFlow}>
          <span className={styles.done}>
            1<br />
            <b>Eingang</b>
          </span>
          <i />
          <span className={styles.done}>
            2<br />
            <b>Nachweise</b>
          </span>
          <i />
          <span>
            3<br />
            <b>Entscheidung</b>
          </span>
          <i />
          <span>
            4<br />
            <b>Abschluss</b>
          </span>
        </div>
        <div className={styles.claimBody}>
          <div>
            <small>ZUSAMMENGESTELLTE NACHWEISE</small>
            <ul>
              <li>
                <span>PDF</span>
                <b>Lieferschein_8182.pdf</b>
                <i>geprüft</i>
              </li>
              <li>
                <span>IMG</span>
                <b>Foto_Bauteil_03.jpg</b>
                <i>zugeordnet</i>
              </li>
              <li>
                <span>ERP</span>
                <b>Lieferung 8182 · Pos. 12</b>
                <i>gefunden</i>
              </li>
            </ul>
          </div>
          <div className={styles.decision}>
            <small>OFFENE ENTSCHEIDUNG</small>
            <b>Ist eine Ersatzlieferung freizugeben?</b>
            <p>Frist eingehalten · Nachweise vollständig</p>
            {claimDetails && (
              <div className={styles.interactionPanel}>
                <b>Prüfhinweis</b>
                <span>
                  Schadensfoto und Lieferposition stimmen überein. Die Freigabe
                  bleibt eine menschliche Entscheidung.
                </span>
              </div>
            )}
            <button
              type="button"
              onClick={() => setClaimDetails(!claimDetails)}
            >
              {claimDetails ? "Prüfhinweis schließen" : "Fall prüfen"}
            </button>
          </div>
        </div>
      </div>
    );
  return (
    <div className={styles.buyApp}>
      <div className={styles.appTitle}>
        <div>
          <small>BEISPIELANWENDUNG · EINKAUF</small>
          <h3>Lieferantenbestätigung</h3>
        </div>
        <span>1 Ausnahme</span>
      </div>
      <div className={styles.buyMeta}>
        <span>
          <small>VORGANG</small>
          <b>AB-2841</b>
        </span>
        <span>
          <small>LIEFERANT</small>
          <b>Hansa Bauteile GmbH</b>
        </span>
        <span>
          <small>BESTELLUNG</small>
          <b>PO-45821</b>
        </span>
      </div>
      <table>
        <thead>
          <tr>
            <th>Pos.</th>
            <th>Artikel</th>
            <th>Bestellt</th>
            <th>Bestätigt</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>01</td>
            <td>Trägerprofil 80</td>
            <td>1.440,00 €</td>
            <td>1.440,00 €</td>
            <td>
              <i>Geprüft</i>
            </td>
          </tr>
          <tr className={styles.flag}>
            <td>07</td>
            <td>Dichtungssatz MX-4</td>
            <td>48,20 €</td>
            <td>50,51 €</td>
            <td>
              <b>+ 4,8 %</b>
            </td>
          </tr>
          <tr>
            <td>12</td>
            <td>Flansch B-12</td>
            <td>788,00 €</td>
            <td>788,00 €</td>
            <td>
              <i>Geprüft</i>
            </td>
          </tr>
        </tbody>
      </table>
      {buyDecision && (
        <div className={styles.interactionPanel}>
          <b>Entscheidungsvorlage geöffnet</b>
          <span>
            Preisabweichung: 2,31 € je Einheit. Kondition, Originalbeleg und
            betroffene Position liegen zur fachlichen Freigabe vor.
          </span>
        </div>
      )}
      <div className={styles.buyBottom}>
        <span>PDF und Bestellung zugeordnet · 18 Positionen geprüft</span>
        <button type="button" onClick={() => setBuyDecision(!buyDecision)}>
          {buyDecision ? "Vorlage schließen" : "Abweichung entscheiden"}
        </button>
      </div>
    </div>
  );
}

export default function Tailored() {
  const [active, setActive] = useState<Example>("einkauf");
  const [text, setText] = useState("");
  const submit = (e: FormEvent) => {
    e.preventDefault();
    launch(
      text.trim() ||
        "Ich möchte meinen Prozess beschreiben und eine erste Lösungsskizze erhalten.",
    );
  };
  const info = examples[active];
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Link href="/" className={styles.brand}>
          OpsDone
        </Link>
        <div>
          INDIVIDUELLE PROZESSSOFTWARE
          <br />
          ENTWICKLUNG &amp; BETRIEB
        </div>
        <nav>
          <a href="#beispiele">Anwendungen</a>
          <a href="#zusammenarbeit">Zusammenarbeit</a>
          <a href="/prozess-check">Prozess besprechen ↗</a>
        </nav>
      </header>
      <main id="main">
        <section className={styles.hero}>
          <div className={styles.index}>
            01
            <br />
            <span>PRINZIP</span>
          </div>
          <div className={styles.heroMain}>
            <p className={styles.overline}>
              Individuelle Anwendungen für operative Prozesse
            </p>
            <h1>
              Für Ihren
              <br />
              <em>Prozess</em> gebaut.
            </h1>
            <p className={styles.lead}>
              Nicht Ihr Unternehmen an Software anpassen. Sondern Software an
              Ihr Unternehmen.
            </p>
            <div className={styles.definition}>
              <b>
                Wir entwickeln und betreiben individuelle KI-Anwendungen, die
                Ihre Prozessarbeit übernehmen.
              </b>
              <a href="/prozess-check">
                Ihren Prozess beschreiben <span>↗</span>
              </a>
            </div>
          </div>
          <aside>
            <span>OPS / 001</span>
            <p>
              Ihre Daten.
              <br />
              Ihre Regeln.
              <br />
              Ihre Verantwortlichen.
            </p>
            <small>In einer Anwendung, die dafür entwickelt wurde.</small>
          </aside>
        </section>

        <section className={styles.mapper} id="beispiele">
          <div className={styles.mapperHead}>
            <div>
              <span>02 / ZUORDNUNG</span>
              <h2>
                Links liegt Ihr Prozess.
                <br />
                Rechts entsteht Ihre Anwendung.
              </h2>
            </div>
            <p>
              Wählen Sie ein Beispiel. Prozess, Oberfläche und menschliche
              Entscheidung ändern sich vollständig.
            </p>
          </div>
          <div
            className={styles.tabs}
            role="tablist"
            aria-label="Beispielanwendungen"
          >
            {(Object.keys(examples) as Example[]).map((key) => (
              <button
                role="tab"
                aria-selected={active === key}
                onClick={() => setActive(key)}
                key={key}
              >
                <span>{examples[key].no}</span>
                {examples[key].label}
                <i>Beispiel</i>
              </button>
            ))}
          </div>
          <div className={styles.mapping}>
            <div className={styles.brief}>
              <div className={styles.sheetHead}>
                <span>PROZESSBRIEFING</span>
                <small>FIKTIVES BEISPIEL</small>
              </div>
              <h3>
                {active === "einkauf"
                  ? "Lieferantenbestätigungen prüfen"
                  : active === "reporting"
                    ? "Monatsreport erstellen"
                    : "Reklamation bearbeiten"}
              </h3>
              {[
                ["Eingang", info.brief[0]],
                ["Abgleich", info.brief[1]],
                ["Entscheidung", info.brief[2]],
                ["Ergebnis", info.brief[3]],
              ].map(([a, b], i) => (
                <div className={styles.briefRow} key={a}>
                  <span>0{i + 1}</span>
                  <small>{a}</small>
                  <b>{b}</b>
                  <i>→</i>
                </div>
              ))}
              <div className={styles.rules}>
                <small>FACHLICHE ZUORDNUNG</small>
                <p>
                  <b>Ihre Daten</b> werden zur Vorgangsansicht.
                </p>
                <p>
                  <b>Ihre Regeln</b> werden zu Prüfungen.
                </p>
                <p>
                  <b>Ihre Verantwortlichen</b> werden zu Freigaben.
                </p>
              </div>
            </div>
            <div className={styles.connector} aria-hidden="true">
              <i />
              <span>MAßANFERTIGUNG</span>
              <i />
            </div>
            <div className={styles.application}>
              <Application active={active} />
              <p className={styles.demoNote}>
                Konzeptionelle Beispielansicht. Funktionen und Darstellung
                werden aus dem tatsächlichen Prozess-Scope entwickelt.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.substance}>
          <div className={styles.vertical}>03 / SUBSTANZ</div>
          <div>
            <p className={styles.overline}>
              Was Individualität konkret bedeutet
            </p>
            <h2>
              Kein anderes Logo auf
              <br />
              demselben Dashboard.
            </h2>
            <div className={styles.subGrid}>
              <article>
                <span>01</span>
                <h3>Fachliche Logik</h3>
                <p>
                  Die Anwendung bildet Ihre Begriffe, Regeln, Toleranzen und
                  Sonderfälle ab.
                </p>
              </article>
              <article>
                <span>02</span>
                <h3>Bestehende Systeme</h3>
                <p>
                  Sie ergänzt Ihre Systemlandschaft dort, wo heute Menschen
                  Daten und Entscheidungen verbinden.
                </p>
              </article>
              <article>
                <span>03</span>
                <h3>Menschliche Kontrolle</h3>
                <p>
                  Freigaben und Unsicherheiten erscheinen genau dort, wo
                  Verantwortung gefragt ist.
                </p>
              </article>
              <article>
                <span>04</span>
                <h3>Verantworteter Betrieb</h3>
                <p>
                  Überwachung, Fehlerbehandlung und Pflege gehören zum
                  vereinbarten Betriebsumfang.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className={styles.collab} id="zusammenarbeit">
          <div className={styles.collabIntro}>
            <span>04 / ZUSAMMENARBEIT</span>
            <h2>
              Präzision beginnt
              <br />
              vor der Entwicklung.
            </h2>
            <p>
              Ein begrenzter Pilot macht Ziel, Aufwand und Verantwortung
              überprüfbar. Erst danach wird aus einer Idee ein Softwareprojekt.
            </p>
          </div>
          <div className={styles.timeline}>
            {[
              [
                "I",
                "Prozessbild",
                "Eingänge, Regeln, Ausnahmen, Ergebnis und beteiligte Systeme werden gemeinsam erfasst.",
              ],
              [
                "II",
                "Pilot-Scope",
                "Funktionen, Abnahmekriterien, Zuständigkeiten und Betriebsumfang werden schriftlich festgelegt.",
              ],
              [
                "III",
                "Anwendung",
                "Wir entwickeln entlang realer Fälle. Sie prüfen früh, ob die Software fachlich richtig arbeitet.",
              ],
              [
                "IV",
                "Betrieb",
                "Nach der Abnahme überwachen und pflegen wir die Anwendung im vereinbarten Rahmen.",
              ],
            ].map(([n, t, p]) => (
              <article key={n}>
                <span>{n}</span>
                <div>
                  <h3>{t}</h3>
                  <p>{p}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.ownership}>
          <div>
            <span>DER GEMEINSAME RAHMEN</span>
            <h2>
              Klare Zuständigkeit
              <br />
              auf beiden Seiten.
            </h2>
          </div>
          <div className={styles.ownGrid}>
            <article>
              <small>OPSDONE VERANTWORTET</small>
              <p>Technisches Konzept</p>
              <p>Entwicklung und Qualität</p>
              <p>Betrieb im vereinbarten Umfang</p>
              <p>Sichtbare Fehler und Unsicherheiten</p>
            </article>
            <article>
              <small>SIE VERANTWORTEN</small>
              <p>Fachliche Regeln</p>
              <p>Zugänge und Ansprechpartner</p>
              <p>Freigabe des definierten Prozesses</p>
              <p>Entscheidungen bei Ausnahmen</p>
            </article>
          </div>
        </section>

        <section className={styles.faq}>
          <div>
            <span>05 / FRAGEN</span>
            <h2>
              Was vor dem
              <br />
              Start zählt.
            </h2>
          </div>
          <div>
            {[
              [
                "Wie fest ist der Preis?",
                "Für den klar abgegrenzten Pilot vereinbaren wir Scope und Preis vor dem Start. Erweiterungen werden transparent neu eingeordnet.",
              ],
              [
                "Müssen wir unsere Systeme ersetzen?",
                "Üblicherweise nicht. Die Lösung wird um bestehende Systeme und Dokumente herum konzipiert. Welche Anbindung sinnvoll und möglich ist, klären wir im Prozessbild.",
              ],
              [
                "Was, wenn die KI unsicher ist?",
                "Unsicherheit wird als Ausnahme sichtbar gemacht und an eine zuständige Person geleitet. Der konkrete Freigabeweg ist Teil Ihrer Anwendung.",
              ],
              [
                "Was sehen wir vor einer Beauftragung?",
                "Nach Ihrer Prozessbeschreibung erhalten Sie zunächst eine konkrete Ersteinschätzung. Ein belastbarer Lösungsentwurf folgt aus der gemeinsamen Prozessaufnahme.",
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

        <section className={styles.contact}>
          <span>06 / IHR PROZESS</span>
          <div>
            <h2>
              Wofür soll Ihre
              <br />
              Software gebaut sein?
            </h2>
            <form onSubmit={submit}>
              <label htmlFor="tailored-process">
                Beschreiben Sie die wiederkehrende Arbeit in wenigen Sätzen.
              </label>
              <textarea
                id="tailored-process"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Zum Beispiel: Bestätigungen treffen per E-Mail ein. Wir gleichen sie mit …"
              />
              <div>
                <small>
                  Die erste Prozesseinschätzung ist ohne Kontaktdaten sichtbar.
                </small>
                <button>
                  Prozess einschätzen <i>↗</i>
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
      <footer className={styles.footer}>
        <Link href="/" className={styles.brand}>
          OpsDone
        </Link>
        <p>
          Individuelle KI-Anwendungen.
          <br />
          Entwicklung und Managed Operation.
        </p>
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

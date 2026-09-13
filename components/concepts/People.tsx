"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import styles from "./people.module.css";

const timeline = [
  ["09:12", "PDF öffnen", "Auftragsbestätigung_4711.pdf"],
  ["09:16", "Artikelnummer suchen", "Bestellung 1048 · ERP"],
  ["09:19", "Werte übertragen", "12 Positionen · Statusliste"],
  ["09:24", "Rückfrage senden", "Liefertermin weicht ab"],
  ["09:31", "Statusliste aktualisieren", "Wartet auf Antwort"],
];

const starters = [
  "Wir übertragen ständig …",
  "Wir müssen jedes Mal prüfen …",
  "Unser Reporting beginnt immer mit …",
];

function openChat(text: string) {
  window.dispatchEvent(
    new CustomEvent("opsdone:chat", { detail: { text, submit: true } }),
  );
}

export default function People() {
  const [draft, setDraft] = useState("");
  const [detail, setDetail] = useState(true);
  const [demoAction, setDemoAction] = useState<"accepted" | "question" | null>(
    null,
  );
  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (draft.trim()) openChat(draft);
  };

  return (
    <main id="main" className={styles.page}>
      <header className={styles.header}>
        <Link className={styles.logo} href="/" aria-label="OpsDone Startseite">
          OPSDONE<span>°</span>
        </Link>
        <nav>
          <a href="#vergleich">Der Ablauf</a>
          <a href="#wirkung">Die Wirkung</a>
          <a href="#start">Prozess beschreiben</a>
        </nav>
        <a className={styles.topCta} href="/prozess-check">
          Arbeit loswerden <span>↗</span>
        </a>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroNumber}>01 — 05</div>
        <p className={styles.overline}>MENSCHEN SIND FÜR ENTSCHEIDUNGEN DA.</p>
        <h1>
          Ihre besten Leute
          <br />
          sind keine
          <br />
          <em>Schnittstelle.</em>
        </h1>
        <div className={styles.heroBottom}>
          <p>
            Wir bauen die individuelle Software, die Arbeit zwischen Ihren
            Systemen übernimmt. Ihr Team sieht, was entschieden werden muss –
            und warum.
          </p>
          <a href="#vergleich">
            Einen Arbeitstag ansehen <span>↓</span>
          </a>
        </div>
        <div className={styles.marquee} aria-hidden="true">
          <span>ÜBERTRAGEN</span>
          <i>→</i>
          <span>PRÜFEN</span>
          <i>→</i>
          <span>NACHHALTEN</span>
          <i>→</i>
          <strong>ENTSCHEIDEN</strong>
        </div>
      </section>

      <section className={styles.compare} id="vergleich">
        <div className={styles.sectionLabel}>
          <span>02</span>
          <p>
            DER GLEICHE VORGANG.
            <br />
            EIN ANDERER ARBEITSTAG.
          </p>
        </div>
        <div className={styles.compareGrid}>
          <div className={styles.day}>
            <div className={styles.panelHead}>
              <span>HEUTE · VIELE UNTERBRECHUNGEN</span>
              <small>ILLUSTRATIVES BEISPIEL</small>
            </div>
            <div className={styles.timeList}>
              {timeline.map(([time, title, meta], index) => (
                <article key={time}>
                  <time>{time}</time>
                  <div className={styles.dot}>{index + 1}</div>
                  <div>
                    <h3>{title}</h3>
                    <p>{meta}</p>
                  </div>
                  <span className={styles.mini}>
                    {index === 0
                      ? "PDF"
                      : index === 1
                        ? "ERP"
                        : index === 3
                          ? "MAIL"
                          : "XLS"}
                  </span>
                </article>
              ))}
            </div>
            <div className={styles.dayFoot}>
              <span>19 MINUTEN</span>
              <p>
                bis der Vorgang wartet. Die nächste fachliche Entscheidung ist
                noch nicht vorbereitet.
              </p>
            </div>
          </div>

          <div className={styles.shift}>
            <span>WIRD ZU</span>
            <i>→</i>
          </div>

          <div className={styles.case}>
            <div className={styles.panelHead}>
              <span>MORGEN · EIN VORGANG</span>
              <small>ILLUSTRATIVES BEISPIEL</small>
            </div>
            <div className={styles.caseTitle}>
              <div>
                <small>VORGANG #0184</small>
                <h3>Liefertermin prüfen</h3>
              </div>
              <span>
                {demoAction ? "BEISPIEL BEARBEITET" : "ENTSCHEIDUNG OFFEN"}
              </span>
            </div>
            <div className={styles.doneList}>
              <p>
                <i>✓</i>
                <span>
                  <b>Dokument erfasst</b>
                  <small>12 Positionen erkannt</small>
                </span>
              </p>
              <p>
                <i>✓</i>
                <span>
                  <b>Bestellung zugeordnet</b>
                  <small>Bestellung 1048</small>
                </span>
              </p>
              <p>
                <i>✓</i>
                <span>
                  <b>Werte geprüft</b>
                  <small>11 Übereinstimmungen</small>
                </span>
              </p>
            </div>
            <button
              type="button"
              className={styles.exception}
              onClick={() => setDetail(!detail)}
              aria-expanded={detail}
            >
              <span>
                <i>!</i>
                <b>1 relevante Abweichung</b>
              </span>
              <span>{detail ? "Schließen" : "Details"} ↗</span>
            </button>
            {detail && (
              <div className={styles.evidence}>
                <div>
                  <small>BESTELLT</small>
                  <strong>18. September</strong>
                </div>
                <div>
                  <small>BESTÄTIGT</small>
                  <strong>25. September</strong>
                </div>
                <p>
                  <span>QUELLENNACHWEIS</span> Zeile 8 in AB_4711.pdf ·
                  Bestellung 1048, Pos. 07
                </p>
                <div className={styles.actions}>
                  <button
                    type="button"
                    aria-pressed={demoAction === "accepted"}
                    onClick={() => setDemoAction("accepted")}
                  >
                    Termin annehmen
                  </button>
                  <button
                    type="button"
                    aria-pressed={demoAction === "question"}
                    onClick={() => setDemoAction("question")}
                  >
                    Rückfrage vorbereiten
                  </button>
                </div>
                {demoAction && (
                  <p className={styles.demoFeedback} role="status">
                    Beispielstatus:{" "}
                    {demoAction === "accepted"
                      ? "Liefertermin angenommen."
                      : "Rückfrage mit den Nachweisen vorbereitet."}
                  </p>
                )}
              </div>
            )}
            <div className={styles.human}>
              <span>MENSCHLICHE ROLLE</span>
              <p>
                Der Einkauf entscheidet über den neuen Termin. Die Software hat
                den Fall dafür vollständig vorbereitet.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.statement}>
        <p>
          Die Software entfernt die Übergaben.
          <br />
          <span>Der Mensch behält die Entscheidung.</span>
        </p>
      </section>

      <section className={styles.impact} id="wirkung">
        <div className={styles.sectionLabel}>
          <span>03</span>
          <p>
            WAS SICH IM BETRIEB
            <br />
            VERÄNDERN KANN
          </p>
        </div>
        <div className={styles.impactTitle}>
          <h2>
            Weniger Unterbrechungen.
            <br />
            Mehr fachliche Arbeit.
          </h2>
          <p>
            Welcher Effekt tatsächlich entsteht, hängt von Volumen, Regeln,
            Datenqualität und den nötigen Entscheidungen ab. Das klären wir am
            konkreten Prozess.
          </p>
        </div>
        <div className={styles.impactCards}>
          <article>
            <span>01</span>
            <h3>Kapazität</h3>
            <p>
              Wiederholtes Öffnen, Suchen, Übertragen und Nachhalten bindet
              weniger Zeit.
            </p>
            <i>HANDGRIFFE ↓</i>
          </article>
          <article>
            <span>02</span>
            <h3>Durchlauf</h3>
            <p>
              Vorgänge werden direkt erfasst und geprüft. Ausnahmen warten
              gezielt auf eine Entscheidung.
            </p>
            <i>WARTEZEIT ↓</i>
          </article>
          <article>
            <span>03</span>
            <h3>Übersicht</h3>
            <p>
              Quellen, Prüfschritte und offene Entscheidungen bleiben an einem
              Ort nachvollziehbar.
            </p>
            <i>KLARHEIT ↑</i>
          </article>
        </div>
      </section>

      <section className={styles.how}>
        <div className={styles.sectionLabel}>
          <span>04</span>
          <p>
            SO WIRD AUS ALLTAG
            <br />
            INDIVIDUELLE SOFTWARE
          </p>
        </div>
        <div className={styles.howGrid}>
          <article>
            <b>01</b>
            <h3>Sie zeigen uns die Arbeit.</h3>
            <p>
              Eingänge, Systeme, Regeln, Ausnahmen und das Ergebnis, das am Ende
              vorliegen muss.
            </p>
          </article>
          <article>
            <b>02</b>
            <h3>Wir bauen den klaren Vorgang.</h3>
            <p>
              Eine Anwendung für genau diesen Ablauf – mit sichtbarer
              Unsicherheit und klaren Freigaben.
            </p>
          </article>
          <article>
            <b>03</b>
            <h3>Wir betreiben und verbessern.</h3>
            <p>
              Die Anwendung läuft als betreuter Prozess. Erkenntnisse aus echten
              Fällen fließen zurück.
            </p>
          </article>
        </div>
      </section>

      <section className={styles.start} id="start">
        <div className={styles.startTitle}>
          <span>05</span>
          <h2>
            Welche Arbeit hält
            <br />
            Ihr Team jeden Tag auf?
          </h2>
          <p>
            Ein Satz reicht für den Anfang. Sie sehen die erste Einschätzung,
            bevor wir nach Kontaktdaten fragen.
          </p>
        </div>
        <form onSubmit={submit}>
          <label htmlFor="people-process">IHRE ARBEIT HEUTE</label>
          <textarea
            id="people-process"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Wir …"
            rows={3}
          />
          <div className={styles.chips}>
            {starters.map((starter) => (
              <button
                type="button"
                key={starter}
                onClick={() => setDraft(starter)}
              >
                {starter}
              </button>
            ))}
          </div>
          <button
            className={styles.submit}
            type="submit"
            disabled={!draft.trim()}
          >
            Arbeit beschreiben <span>↗</span>
          </button>
        </form>
      </section>

      <footer className={styles.footer}>
        <Link className={styles.logo} href="/">
          OPSDONE<span>°</span>
        </Link>
        <div>
          <strong>WORK ELIMINATED.</strong>
          <p>Individuelle Anwendungen für Arbeit, die sich wiederholt.</p>
        </div>
        <nav>
          <Link href="/impressum">Impressum</Link>
          <Link href="/datenschutz">Datenschutz</Link>
          <Link href="/agb">AGB</Link>
        </nav>
        <small>© {new Date().getFullYear()}</small>
      </footer>
    </main>
  );
}

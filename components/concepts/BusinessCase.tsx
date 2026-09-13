"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import styles from "./business-case.module.css";

const Arrow = () => <span aria-hidden="true">↗</span>;

function openChat(text: string) {
  window.dispatchEvent(
    new CustomEvent("opsdone:chat", { detail: { text, submit: true } }),
  );
}

export default function BusinessCase() {
  const [volume, setVolume] = useState(600);
  const [minutes, setMinutes] = useState(8);
  const [process, setProcess] = useState("");
  const [expanded, setExpanded] = useState<"price" | "date" | null>("date");
  const [demoDecision, setDemoDecision] = useState<
    "accepted" | "question" | null
  >(null);
  const hours = useMemo(
    () => Math.round((volume * minutes) / 6) / 10,
    [volume, minutes],
  );
  const baseline = `${volume.toLocaleString("de-DE")} Vorgänge im Monat × ${minutes} Minuten = ${hours.toLocaleString("de-DE")} Stunden monatlicher Aufwand.`;

  const start = (event?: FormEvent) => {
    event?.preventDefault();
    openChat(
      `${process.trim() || "Wir möchten einen wiederkehrenden Prozess prüfen."} Aktueller Ausgangswert: ${baseline}`,
    );
  };

  return (
    <main id="main" className={styles.page}>
      <header className={styles.header}>
        <Link className={styles.logo} href="/" aria-label="OpsDone Startseite">
          OPS<span>DONE</span>
          <i>.</i>
        </Link>
        <nav aria-label="Seitennavigation">
          <a href="#rechenbeispiel">Rechenbeispiel</a>
          <a href="#vorgehen">Vorgehen</a>
          <a href="#fragen">Fragen</a>
        </nav>
        <a className={styles.headerCta} href="/prozess-check">
          Prozess prüfen <Arrow />
        </a>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.kicker}>
            <span>01</span> Der Business Case beginnt bei Ihrer Arbeit
          </p>
          <h1>
            Was kostet es Sie, diesen Prozess weiter von Hand zu erledigen?
          </h1>
          <p className={styles.intro}>
            Wir bauen individuelle Software, die wiederkehrende Prozessarbeit
            übernimmt – nach Ihren Regeln, mit Ihren Systemen und mit Menschen
            an den richtigen Entscheidungen.
          </p>
          <a className={styles.primaryCta} href="#rechenbeispiel">
            Aufwand sichtbar machen <span>↓</span>
          </a>
        </div>
        <div className={styles.heroAside} aria-label="Leistungsversprechen">
          <span>WORK ELIMINATED.</span>
          <p>
            Weniger Handgriffe.
            <br />
            Ein klarer Vorgang.
            <br />
            Eine Anwendung für Ihren Prozess.
          </p>
          <small>INDIVIDUELLE SOFTWARE · MANAGED OPERATION</small>
        </div>
      </section>

      <section className={styles.calcSection} id="rechenbeispiel">
        <div className={styles.sectionHead}>
          <p className={styles.kicker}>
            <span>02</span> Rechenbeispiel
          </p>
          <h2>
            Was Ihr Prozess
            <br />
            heute bindet.
          </h2>
          <p>
            Ein Ausgangswert, keine Einsparprognose. Was tatsächlich entfallen
            kann, klären wir anhand Ihrer Arbeitsschritte.
          </p>
        </div>

        <div className={styles.comparison}>
          <div className={styles.calculator}>
            <div className={styles.cardTop}>
              <span>HEUTE · MANUELLER AUFWAND</span>
              <b>LIVE</b>
            </div>
            <label>
              <span>
                Vorgänge pro Monat{" "}
                <output>{volume.toLocaleString("de-DE")}</output>
              </span>
              <input
                type="range"
                aria-label="Vorgänge pro Monat"
                min="100"
                max="2000"
                step="50"
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
              />
              <small>
                <i>100</i>
                <i>2.000</i>
              </small>
            </label>
            <label>
              <span>
                Minuten pro Vorgang <output>{minutes}</output>
              </span>
              <input
                type="range"
                aria-label="Minuten pro Vorgang"
                min="2"
                max="30"
                step="1"
                value={minutes}
                onChange={(e) => setMinutes(Number(e.target.value))}
              />
              <small>
                <i>2 MIN</i>
                <i>30 MIN</i>
              </small>
            </label>
            <div className={styles.equation}>
              <span>
                {volume.toLocaleString("de-DE")} × {minutes} MIN
              </span>
              <strong>
                {hours.toLocaleString("de-DE")}
                <small>STD / MONAT</small>
              </strong>
            </div>
            <p>
              Rechenbeispiel für den aktuellen Aufwand. Es enthält keine Annahme
              darüber, wie viel davon automatisierbar ist.
            </p>
          </div>

          <div className={styles.application}>
            <div className={styles.appBar}>
              <span>
                <i /> OPSDONE / EINKAUF
              </span>
              <small>ILLUSTRATIVES BEISPIEL</small>
            </div>
            <div className={styles.appTitle}>
              <div>
                <small>VORGANG 2026–0184</small>
                <h3>Bestellabgleich</h3>
              </div>
              <span className={styles.status}>
                {demoDecision ? "BEISPIEL BEARBEITET" : "1 ENTSCHEIDUNG OFFEN"}
              </span>
            </div>
            <div className={styles.docRow}>
              <span>AB_4711.pdf</span>
              <span>↔</span>
              <span>Bestellung 1048</span>
              <b>12 POSITIONEN</b>
            </div>
            <div className={styles.tableHead}>
              <span>PRÜFUNG</span>
              <span>BESTELLUNG</span>
              <span>BESTÄTIGUNG</span>
              <span>STATUS</span>
            </div>
            <button
              type="button"
              className={styles.checkRow}
              onClick={() => setExpanded(expanded === "price" ? null : "price")}
              aria-expanded={expanded === "price"}
            >
              <span>Stückpreis</span>
              <span>42,80 €</span>
              <span>42,80 €</span>
              <b className={styles.ok}>GEPRÜFT</b>
            </button>
            <button
              type="button"
              className={styles.checkRow}
              onClick={() => setExpanded(expanded === "date" ? null : "date")}
              aria-expanded={expanded === "date"}
            >
              <span>Liefertermin</span>
              <span>18.09.</span>
              <span>25.09.</span>
              <b className={styles.warn}>ABWEICHUNG</b>
            </button>
            {expanded === "date" && (
              <div className={styles.decision}>
                <span>ENTSCHEIDUNG DURCH EINKAUF</span>
                <p>
                  Lieferung 7 Tage später als bestellt. Alle übrigen Positionen
                  stimmen überein.
                </p>
                <div>
                  <button
                    type="button"
                    aria-pressed={demoDecision === "accepted"}
                    onClick={() => setDemoDecision("accepted")}
                  >
                    Annehmen
                  </button>
                  <button
                    type="button"
                    aria-pressed={demoDecision === "question"}
                    onClick={() => setDemoDecision("question")}
                  >
                    Rückfrage
                  </button>
                </div>
                {demoDecision && (
                  <p className={styles.demoFeedback} role="status">
                    Beispielstatus:{" "}
                    {demoDecision === "accepted"
                      ? "Neuer Liefertermin angenommen."
                      : "Rückfrage als nächster Schritt vorgemerkt."}
                  </p>
                )}
              </div>
            )}
            {expanded === "price" && (
              <div className={styles.decision}>
                <span>PRÜFNACHWEIS</span>
                <p>
                  Stückpreis in Bestellung und Bestätigung identisch. Quelle und
                  Prüfzeitpunkt bleiben nachvollziehbar.
                </p>
              </div>
            )}
            <div className={styles.appFoot}>
              <span>12/12 Positionen erfasst</span>
              <span>Quellen und Prüfschritte dokumentiert</span>
            </div>
          </div>
        </div>
        <div className={styles.calcPrompt}>
          <div>
            <span>WELCHE DIESER SCHRITTE LASSEN SICH ÜBERNEHMEN?</span>
            <p>
              Beschreiben Sie den Ablauf. Sie erhalten eine konkrete erste
              Einschätzung – ohne Kontaktdaten abzugeben.
            </p>
          </div>
          <button type="button" onClick={() => start()}>
            Mit {hours.toLocaleString("de-DE")} Stunden starten <Arrow />
          </button>
        </div>
      </section>

      <section className={styles.scope} id="vorgehen">
        <div className={styles.sectionHead}>
          <p className={styles.kicker}>
            <span>03</span> Vom Aufwand zur Anwendung
          </p>
          <h2>
            Erst verstehen.
            <br />
            Dann übernehmen.
          </h2>
        </div>
        <div className={styles.steps}>
          <article>
            <b>01</b>
            <h3>Arbeit sichtbar machen</h3>
            <p>
              Wir zerlegen Eingänge, Prüfungen, Übergaben und Ausnahmen. So
              entsteht ein belastbares Bild der heutigen Arbeit.
            </p>
          </article>
          <article>
            <b>02</b>
            <h3>Pilot klar abgrenzen</h3>
            <p>
              Wir definieren, was die erste Version übernimmt, welche Daten sie
              braucht und wo ein Mensch entscheidet.
            </p>
          </article>
          <article>
            <b>03</b>
            <h3>Im Betrieb verbessern</h3>
            <p>
              Wir entwickeln und betreiben die Anwendung. Unsichere Fälle
              bleiben sichtbar und fließen in die Verbesserung ein.
            </p>
          </article>
        </div>
        <div className={styles.boundary}>
          <span>DER UNTERSCHIED</span>
          <h3>
            Freigesetzte Kapazität ist nicht automatisch eine Kostenersparnis.
          </h3>
          <p>
            Deshalb trennen wir sauber zwischen weniger Bearbeitungszeit,
            kürzeren Durchlaufzeiten und tatsächlich reduzierten Kosten. Der
            Business Case folgt Ihrem Prozess – nicht einer pauschalen
            Prozentzahl.
          </p>
        </div>
      </section>

      <section className={styles.faq} id="fragen">
        <div>
          <p className={styles.kicker}>
            <span>04</span> Klare Antworten
          </p>
          <h2>Bevor wir rechnen.</h2>
        </div>
        <div>
          <details>
            <summary>
              Was bekommen wir konkret?<span>+</span>
            </summary>
            <p>
              Eine individuelle Geschäftsanwendung, die einen klar abgegrenzten
              Prozessschritt übernimmt – inklusive Betrieb und Weiterentwicklung
              im vereinbarten Umfang.
            </p>
          </details>
          <details>
            <summary>
              Müssen wir unsere bestehenden Systeme ersetzen?<span>+</span>
            </summary>
            <p>
              Nein. Die Anwendung wird um den bestehenden Prozess und die
              vorhandenen Systeme herum konzipiert. Welche Anbindungen sinnvoll
              und möglich sind, klären wir im Pilot.
            </p>
          </details>
          <details>
            <summary>
              Entscheidet die KI eigenständig?<span>+</span>
            </summary>
            <p>
              Nur innerhalb gemeinsam definierter Regeln. Ausnahmen und
              geschäftliche Entscheidungen werden sichtbar an die zuständigen
              Menschen geleitet.
            </p>
          </details>
          <details>
            <summary>
              Ist dieses Rechenbeispiel ein Angebot?<span>+</span>
            </summary>
            <p>
              Nein. Es zeigt ausschließlich Ihren eingegebenen Ausgangsaufwand.
              Eine belastbare Einschätzung entsteht erst nach der
              Prozessprüfung.
            </p>
          </details>
        </div>
      </section>

      <section className={styles.closing}>
        <p>WORK ELIMINATED.</p>
        <h2>
          Beschreiben Sie Ihren Prozess.
          <br />
          Wir prüfen, was tatsächlich entfallen kann.
        </h2>
        <form onSubmit={start}>
          <label htmlFor="business-process">Ihr wiederkehrender Prozess</label>
          <div>
            <input
              id="business-process"
              value={process}
              onChange={(e) => setProcess(e.target.value)}
              placeholder="Zum Beispiel: Wir gleichen jeden Morgen …"
            />
            <button type="submit">
              Prozess prüfen <Arrow />
            </button>
          </div>
          <small>
            Ihr Rechenbeispiel wird als Ausgangswert übernommen. Die erste
            Einschätzung ist ohne E-Mail sichtbar.
          </small>
        </form>
      </section>

      <footer className={styles.footer}>
        <Link className={styles.logo} href="/">
          OPS<span>DONE</span>
          <i>.</i>
        </Link>
        <p>Individuelle Anwendungen für Arbeit, die sich wiederholt.</p>
        <div>
          <Link href="/impressum">Impressum</Link>
          <Link href="/datenschutz">Datenschutz</Link>
          <Link href="/agb">AGB</Link>
        </div>
        <small>© {new Date().getFullYear()} OpsDone</small>
      </footer>
    </main>
  );
}

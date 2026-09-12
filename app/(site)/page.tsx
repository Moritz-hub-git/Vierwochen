import type { Metadata } from "next";
import Link from "next/link";
import ProcessDemo from "@/components/site/ProcessDemo";
import PotentialCalculator from "@/components/site/PotentialCalculator";
import { Arrow, Check, Mark, ProcessIcon } from "@/components/site/Icons";
export const metadata: Metadata = {
  title: { absolute: "OpsDone — Work eliminated." },
  description:
    "Wiederkehrende Geschäftsarbeit automatisch erledigen. OpsDone baut und betreibt Prozessautomation auf Ihren bestehenden Systemen. Prüfen Sie Ihr Potenzial.",
  alternates: { canonical: "/" },
};
const cases = [
  [
    "auftragsbestaetigungen",
    "EINKAUF",
    "Auftragsbestätigungen.\nSchon geprüft.",
    "Preise, Mengen und Liefertermine mit Bestellungen abgleichen. Ihr Einkauf sieht die Abweichungen.",
    "Von PDF zu geprüftem Vorgang",
  ],
  [
    "angebotsbearbeitung",
    "VERTRIEB",
    "Vom Posteingang zum\nAngebotsentwurf.",
    "Anforderungen aus Anfragen erfassen, Informationen zusammenführen und Angebote zur Freigabe vorbereiten.",
    "Von Anfrage zu Angebotsentwurf",
  ],
  [
    "reklamationen",
    "QUALITÄTSMANAGEMENT",
    "Der Fall ist vorbereitet.\nIhr Team entscheidet.",
    "Reklamationen einordnen, Falldaten sammeln und Dokumentation sowie Antwortentwürfe vorbereiten.",
    "Von Reklamation zu Entscheidungsgrundlage",
  ],
  [
    "reporting",
    "FINANCE & OPERATIONS",
    "Monatsreporting.\nOhne Copy-Paste.",
    "Exporte zusammenführen, Zahlen validieren und Berichte mit nachvollziehbaren Quellen erstellen.",
    "Von Daten zu freigabefertigem Report",
  ],
  [
    "lieferanten-onboarding",
    "EINKAUF & STAMMDATEN",
    "Lieferanten anlegen.\nOhne Nachfass-Marathon.",
    "Unterlagen auf Vollständigkeit prüfen, fehlende Angaben erkennen und Stammdaten vorbereiten.",
    "Von Unterlagen zu freigabefertigen Stammdaten",
  ],
];
const faq = [
  [
    "Welche Prozesse eignen sich für OpsDone?",
    "Wiederkehrende, dokumenten- oder datenlastige Abläufe mit klaren Regeln und messbarem Aufwand. Ein guter erster Prozess hat genügend Volumen, wenige angebundene Systeme und einen Verantwortlichen im Fachbereich. Zum Beispiel die Prüfung von Auftragsbestätigungen.",
  ],
  [
    "Müssen wir unser ERP oder CRM ersetzen?",
    "In der Regel nicht. Wir arbeiten auf Ihren bestehenden Systemen. Für einen ersten Pilot reichen oft E-Mails und Datei-Exporte. APIs und weitere Anbindungen ergänzen wir, wenn sie für den Prozess sinnvoll und verfügbar sind. Den konkreten Zugang prüfen wir vor dem Angebot.",
  ],
  [
    "Was passiert, wenn die KI sich nicht sicher ist?",
    "Unklare Fälle, Abweichungen und festgelegte Freigaben gehen mit Kontext an Ihr Team. Welche Entscheidungen automatisch getroffen werden dürfen, legen wir gemeinsam fest. Die Automation erhält nur die dafür benötigten Berechtigungen.",
  ],
  [
    "Wie schnell kann ein erster Prozess laufen?",
    "Das hängt von Datenzugang, Prozessumfang und Freigaben ab. Wir beginnen mit einem abgegrenzten Pilot. Einen belastbaren Zeitplan erhalten Sie nach dem Prozess-Check und der technischen Prüfung, bevor Sie die Umsetzung beauftragen.",
  ],
  [
    "Wie wird die Zusammenarbeit abgerechnet?",
    "Die Einführung wird als klar abgegrenztes Projekt mit festem Preis angeboten. Für Betrieb, Überwachung und vereinbarte Verbesserungen folgt eine monatliche Managed-Automation-Vereinbarung. Volumenabhängige Kosten und Leistungsgrenzen werden im Angebot ausgewiesen.",
  ],
  [
    "Ist der Prozess-Check kostenpflichtig?",
    "Der erste Prozess-Check ist kostenlos und unverbindlich. Wir besprechen Ihren heutigen Ablauf, den manuellen Aufwand und mögliche Integrationswege. Wenn der Prozess nicht wirtschaftlich automatisierbar ist, sagen wir Ihnen das.",
  ],
];
export default function Home() {
  return (
    <main id="main">
      <section className="hero container">
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="status-dot" /> AI-NATIVE PROCESS AUTOMATION
          </div>
          <h1>
            Work
            <br />
            <span className="hero-word">
              eliminated<span className="accent-period">.</span>
            </span>
          </h1>
          <p className="hero-description">
            Die Routine erledigt sich.
            <br />
            Ihr Team macht den Unterschied.
          </p>
          <p className="hero-explanation">
            Wir automatisieren wiederkehrende Geschäftsprozesse auf Ihren
            bestehenden Systemen. Standardfälle laufen von selbst. Menschen
            entscheiden bei Ausnahmen.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" href="/prozess-check">
              Prozess prüfen lassen <Arrow />
            </Link>
            <a className="button button-secondary" href="#prozesse">
              Prozesse entdecken <span aria-hidden="true">↓</span>
            </a>
          </div>
          <div className="hero-reassurance">
            <span>
              <Check /> Kostenloser Prozess-Check
            </span>
            <span>
              <Check /> Ohne Systemwechsel
            </span>
          </div>
        </div>
        <ProcessDemo />
      </section>
      <section className="systems-strip">
        <div className="container">
          <p>
            Ihre Systeme bleiben.
            <br />
            <strong>Die Handarbeit dazwischen geht.</strong>
          </p>
          <div
            className="system-names"
            aria-label="Beispiele bestehender Systeme"
          >
            <span>Microsoft 365</span>
            <span className="system-sap">SAP</span>
            <span>DATEV</span>
            <span>Salesforce</span>
            <span>Ihr ERP</span>
          </div>
        </div>
        <div className="container">
          <small>
            Beispiele für bestehende Systemlandschaften. Die passende Anbindung
            prüfen wir je Prozess.
          </small>
        </div>
      </section>
      <section className="section container manifesto">
        <div className="eyebrow">OPERATIONS. DONE.</div>
        <h2>
          Ihr Team ist zu gut
          <br />
          für <span>Copy. Paste. Repeat.</span>
        </h2>
        <div className="manifesto-bottom">
          <p>
            Dokumente öffnen. Daten abtippen. Zahlen abgleichen. Wieder
            nachfragen. Zwischen Ihren Systemen steckt jeden Tag Arbeit, die
            niemand mehr manuell erledigen sollte.
          </p>
          <p>
            OpsDone übernimmt diese Abläufe vom Eingang bis zum Ergebnis. Wir
            bauen die Automation, betreiben sie und messen, wie viel Arbeit
            tatsächlich entfällt.
          </p>
        </div>
      </section>
      <section className="section processes-section" id="prozesse">
        <div className="container">
          <div className="section-header">
            <div>
              <span className="eyebrow">
                KONKRETE PROZESSE. SPÜRBARE ENTLASTUNG.
              </span>
              <h2>
                Wo Arbeit
                <br />
                verschwinden kann.
              </h2>
            </div>
            <Link href="/prozesse" className="text-link">
              Alle Prozesse <Arrow />
            </Link>
          </div>
          <div className="process-grid">
            {cases.map(([slug, category, title, description, output], i) => (
              <Link
                className={`process-card process-card-${i}`}
                href={`/prozesse/${slug}`}
                key={slug}
              >
                <div className="process-card-top">
                  <span className="process-icon">
                    <ProcessIcon kind={i} />
                  </span>
                  <span className="eyebrow">{category}</span>
                  <Arrow diagonal />
                </div>
                <h3>
                  {title.split("\n").map((line, j) => (
                    <span key={j}>
                      {line}
                      <br />
                    </span>
                  ))}
                </h3>
                <p>{description}</p>
                <div className="process-card-output">
                  <span className="status-dot" />
                  {output}
                </div>
              </Link>
            ))}
            <div className="process-card process-card-custom">
              <div className="eyebrow">IHR PROZESS</div>
              <h3>
                Jeden Tag derselbe
                <br />
                manuelle Umweg?
              </h3>
              <p>
                Zeigen Sie uns den Ablauf, der Ihr Team aufhält. Wir prüfen, was
                davon entfallen kann.
              </p>
              <Link href="/prozess-check" className="text-link">
                Eigenen Prozess prüfen <Arrow />
              </Link>
              <span className="custom-card-mark" aria-hidden="true">
                <Mark />
              </span>
            </div>
          </div>
        </div>
      </section>
      <section className="section container method-section" id="vorgehen">
        <div className="section-header">
          <div>
            <span className="eyebrow">
              VOM ERSTEN PROZESS ZUM LAUFENDEN BETRIEB
            </span>
            <h2>
              Klein anfangen.
              <br />
              Messbar Arbeit eliminieren.
            </h2>
          </div>
          <p>
            Ein klarer Ablauf. Ein verantwortlicher Partner.
            <br />
            Ein Ergebnis, das sich im Alltag beweisen muss.
          </p>
        </div>
        <div className="method-grid">
          {[
            [
              "01",
              "Prozess verstehen",
              "Wir erfassen Volumen, Handgriffe und Ausnahmen. Gemeinsam rechnen wir, ob sich die Automation lohnt.",
              "Ergebnis: belastbarer Business Case",
            ],
            [
              "02",
              "Im Pilot beweisen",
              "Ein abgegrenzter Prozess, echte Beispieldaten und vereinbarte Abnahmekriterien. Erst testen, dann produktiv schalten.",
              "Ergebnis: nachweisbare Entlastung",
            ],
            [
              "03",
              "Betreiben & verbessern",
              "Wir überwachen die Automation, bearbeiten technische Störungen und verbessern den Ablauf. Ihr Team behält die fachlichen Entscheidungen.",
              "Ergebnis: dauerhaft erledigte Routine",
            ],
          ].map(([n, title, text, output]) => (
            <article key={n}>
              <span className="step-number">{n}</span>
              <h3>{title}</h3>
              <p>{text}</p>
              <span className="method-output">{output}</span>
            </article>
          ))}
        </div>
        <div className="commercial-note">
          <span>Unser Modell</span>
          <p>
            <strong>Einmalige Einführung zum vereinbarten Festpreis.</strong>{" "}
            Anschließend monatlicher Betrieb mit transparentem Leistungsumfang.
          </p>
          <Link href="/prozess-check" className="text-link">
            Passenden Einstieg finden <Arrow />
          </Link>
        </div>
      </section>
      <section className="control-section">
        <div className="container control-grid">
          <div className="control-visual" aria-hidden="true">
            <div className="control-small-label">
              SO VERTEILT SICH DIE ARBEIT
            </div>
            <div className="control-flow">
              <div>
                <Mark />
                <b>OpsDone</b>
                <span>Standardfälle erledigen</span>
              </div>
              <div className="control-human">
                <span className="person-symbol">M</span>
                <b>Ihr Team</b>
                <span>Ausnahmen entscheiden</span>
              </div>
            </div>
            <div className="control-caption">
              <span className="status-dot" /> Klare Regeln. Nachvollziehbare
              Übergaben.
            </div>
          </div>
          <div>
            <span className="eyebrow">AUTOMATISCH. MIT VERANTWORTUNG.</span>
            <h2>
              Die Arbeit geht.
              <br />
              Die Kontrolle bleibt.
            </h2>
            <p>
              Ihr Team definiert die Regeln und gibt frei, was freigegeben
              werden muss. OpsDone erledigt die Routine innerhalb dieser
              Grenzen.
            </p>
            <ul className="check-list">
              <li>
                <Check /> Klare Freigaben bei Abweichungen
              </li>
              <li>
                <Check /> Nachvollziehbare Prozessschritte
              </li>
              <li>
                <Check /> Zugriff nur auf benötigte Daten
              </li>
            </ul>
            <Link href="/sicherheit" className="text-link">
              Mehr zu Sicherheit & Kontrolle <Arrow />
            </Link>
          </div>
        </div>
      </section>
      <section className="section container" id="potenzial">
        <div className="section-header">
          <div>
            <span className="eyebrow">WORK ELIMINATED, IN ZAHLEN</span>
            <h2>
              Was kostet Sie
              <br />
              „Das machen wir schnell“?
            </h2>
          </div>
          <p>
            Ein paar Minuten je Vorgang. Hunderte Male im Monat.
            <br />
            Rechnen Sie selbst, wie viel Kapazität darin steckt.
          </p>
        </div>
        <PotentialCalculator />
      </section>
      <section className="section container faq-section">
        <div>
          <span className="eyebrow">GUTE FRAGEN. KLARE ANTWORTEN.</span>
          <h2>
            Bevor wir
            <br />
            Arbeit eliminieren.
          </h2>
          <Link className="text-link" href="/prozess-check">
            Sprechen wir über Ihren Prozess <Arrow />
          </Link>
        </div>
        <div className="faq-list">
          {faq.map(([q, a]) => (
            <details key={q}>
              <summary>
                {q}
                <span aria-hidden="true">+</span>
              </summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </section>
      <section className="final-cta">
        <div className="container">
          <span className="eyebrow">
            DER ERSTE SCHRITT IST EIN KONKRETER PROZESS.
          </span>
          <h2>
            Welche Arbeit soll
            <br />
            morgen nicht mehr anfallen?
          </h2>
          <p>
            Zeigen Sie uns einen Ablauf. Wir prüfen gemeinsam,
            <br />
            welche Handgriffe entfallen können und ob es sich rechnet.
          </p>
          <Link className="button button-primary" href="/prozess-check">
            Jetzt Prozess prüfen lassen <Arrow />
          </Link>
          <span className="cta-note">
            Kostenlos. Unverbindlich. Direkt mit dem Gründer.
          </span>
        </div>
      </section>
    </main>
  );
}

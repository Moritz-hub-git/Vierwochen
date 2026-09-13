import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/config";
import styles from "../prozesse/process.module.css";

export const metadata: Metadata = {
  title: "Sicherheit & Datenschutz",
  description:
    "Wie Opsrid Prozessanwendungen mit Datenminimierung, Rollen, Protokollierung, sicheren Zugängen und kontrollierten Freigaben plant.",
  alternates: { canonical: "/sicherheit" },
};

const controls = [
  [
    "Datenminimierung",
    "Wir klären, welche Daten der Prozess wirklich braucht, wie lange sie benötigt werden und welche Inhalte von Modellaufrufen ausgeschlossen bleiben.",
  ],
  [
    "Identitäten und Rechte",
    "Integrationen arbeiten mit zweckgebundenen Konten und minimal erforderlichen Rechten. Rollen und Freigaben orientieren sich an Ihrer Organisation.",
  ],
  [
    "Secrets Management",
    "Zugangsdaten gehören in die sichere Laufzeitkonfiguration, nicht in Quellcode oder Prozessbeschreibungen. Wechsel und Entzug werden mitgedacht.",
  ],
  [
    "Verschlüsselung",
    "Übertragungen werden verschlüsselt. Die Verschlüsselung gespeicherter Daten und der Schlüsselbetrieb richten sich nach der vereinbarten Zielumgebung.",
  ],
  [
    "Protokollierung",
    "Relevante Systemschritte, Ausnahmen und Freigaben können nachvollziehbar protokolliert werden. Umfang und Aufbewahrung folgen Prozessrisiko und Vorgaben.",
  ],
  [
    "Betrieb und Wiederherstellung",
    "Monitoring, Backups, Wiederanlauf und Sicherheitsupdates werden vor dem Produktivbetrieb konkret vereinbart und getestet.",
  ],
];

export default function SecurityPage() {
  return (
    <main id="main">
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Sicherheit & Datenschutz</p>
          <h1>Automation braucht klare Grenzen.</h1>
          <p className="section-intro">
            Opsrid plant Datenflüsse, Zugriffe, Ausnahmen und Betrieb gemeinsam
            mit Prozess und IT. Diese Seite beschreibt unsere Grundsätze. Die
            verbindliche Ausgestaltung steht im jeweiligen Angebot und
            Sicherheitskonzept.
          </p>
          <div className={styles.pageActions}>
            <Link className="button button-primary" href="/prozess-check">
              Prozess sicher einordnen
            </Link>
            <a
              className="button button-secondary"
              href={`mailto:${SITE.email}`}
            >
              IT-Fragen senden
            </a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <p className="eyebrow">Security by design</p>
          <h2 className="section-heading">
            Kontrollen entlang des gesamten Prozesses
          </h2>
          <div className="feature-grid">
            {controls.map(([title, text]) => (
              <article className="feature-card" key={title}>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container two-column">
          <div>
            <p className="eyebrow">Human in the loop</p>
            <h2 className="section-heading">
              Autonomie endet an der vereinbarten Risikogrenze.
            </h2>
          </div>
          <div>
            <p>
              Für jeden Prozess wird festgelegt, welche Standardfälle
              automatisch ausgeführt werden dürfen. Unsicherheit, sensible
              Änderungen, finanzielle Grenzen und organisatorische Freigaben
              führen zu einer menschlichen Aufgabe.
            </p>
            <p>
              Wird ein Dokument nicht sicher verstanden, ein System ist nicht
              erreichbar oder eine Regel greift nicht eindeutig, hält der
              Vorgang an und wird nachvollziehbar weitergeleitet.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <p className="eyebrow">Deployment</p>
          <h2 className="section-heading">
            Die Zielumgebung folgt Ihren Anforderungen.
          </h2>
          <div className="feature-grid">
            <article className="feature-card">
              <h3>In Ihrer Umgebung</h3>
              <p>
                Eine Bereitstellung in Ihrer Cloud-Organisation kann sinnvoll
                sein, wenn Identitäten, Daten und Betriebsverantwortung intern
                bleiben sollen.
              </p>
            </article>
            <article className="feature-card">
              <h3>Verwalteter Betrieb</h3>
              <p>
                Alternativ kann ein Betrieb durch Opsrid vereinbart werden.
                Region, Unterauftragnehmer, Servicezeiten und Exit werden vorab
                dokumentiert.
              </p>
            </article>
            <article className="feature-card">
              <h3>EU-Verarbeitung bei Bedarf</h3>
              <p>
                Wenn der Prozess eine Verarbeitung in EU-Regionen erfordert,
                wählen wir dafür geeignete Dienste und Modellzugänge oder
                verzichten auf den betreffenden AI-Schritt.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container two-column">
          <div>
            <p className="eyebrow">Vor dem Produktivbetrieb</p>
            <h2 className="section-heading">
              Prüfbar statt pauschal versprochen.
            </h2>
          </div>
          <div>
            <ul>
              <li>Datenfluss und beteiligte Systeme dokumentieren</li>
              <li>Rollen, Rechte, Freigaben und Ausnahmewege festlegen</li>
              <li>Testfälle inklusive Fehler- und Grenzfällen abnehmen</li>
              <li>Aufbewahrung, Löschung und Protokollzugriff definieren</li>
              <li>Betrieb, Monitoring, Backup und Exit vereinbaren</li>
            </ul>
            <p>
              Opsrid behauptet derzeit keine allgemeine Zertifizierung.
              Benötigt Ihr Einkauf Nachweise, einen AV-Vertrag, eine
              Lieferantenselbstauskunft oder Antworten auf einen
              Security-Fragebogen, klären wir das vor dem Angebot.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className={`container callout ${styles.calloutBlock}`}>
          <p className="eyebrow">Transparenz</p>
          <h2>Datenschutz dieser Website</h2>
          <p>
            Die konkrete Verarbeitung auf dieser Website, einschließlich Hosting
            und direktem Prozess-Check, ist in der Datenschutzerklärung
            beschrieben.
          </p>
          <Link className="button button-primary" href="/datenschutz">
            Datenschutzerklärung lesen
          </Link>
        </div>
      </section>
    </main>
  );
}

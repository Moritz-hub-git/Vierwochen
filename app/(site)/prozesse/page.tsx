import type { Metadata } from "next";
import Link from "next/link";
import { processes } from "@/lib/processes";
import styles from "./process.module.css";

export const metadata: Metadata = {
  title: "Prozesse automatisieren",
  description:
    "Konkrete Geschäftsprozesse mit individueller Prozesssoftware übernehmen – auf bestehenden Systemen, mit Menschen für Ausnahmen und Entscheidungen.",
  alternates: { canonical: "/prozesse" },
};

export default function ProcessesPage() {
  return (
    <main id="main">
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Prozessbibliothek</p>
          <h1>Automatisierung beginnt mit einem konkreten Prozess.</h1>
          <p className="section-intro">
            Opsrid übernimmt wiederkehrende operative Arbeit vom Eingang
            bis zum Ergebnis. Ihre bestehenden Systeme bleiben. Menschen greifen
            ein, wenn eine Ausnahme, Freigabe oder echte Entscheidung ansteht.
          </p>
          <div className={styles.pageActions}>
            <Link className="button button-primary" href="/prozess-check">
              Eigenen Prozess prüfen
            </Link>
            <Link className="button button-secondary" href="/#potenzial">
              Potenzial berechnen
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <p className="eyebrow">Fünf Startpunkte</p>
          <h2 className="section-heading">
            Wo heute noch Menschen Systeme verbinden
          </h2>
          <p className="section-intro">
            Besonders geeignet sind wiederkehrende, dokumenten- und datenlastige
            Abläufe mit einem klaren Output. Die Beispiele zeigen, wie aus
            E-Mail, PDF, Excel und Systemdaten ein erledigter Vorgang wird.
          </p>
          <div className="feature-grid">
            {processes.map((process) => (
              <article className="feature-card" key={process.slug}>
                <p className="eyebrow">{process.category}</p>
                <h3>{process.title}</h3>
                <p>{process.shortDescription}</p>
                <Link className="text-link" href={`/prozesse/${process.slug}`}>
                  Prozess ansehen <span aria-hidden>→</span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container two-column">
          <div>
            <p className="eyebrow">Geeignete Arbeit</p>
            <h2 className="section-heading">
              Ein klarer Input. Wiederkehrende Regeln. Ein messbares Ergebnis.
            </h2>
          </div>
          <div>
            <p>
              Gute erste Prozesse kommen täglich, wöchentlich oder monatlich
              vor, binden spürbare Kapazität und folgen in vielen Fällen einem
              wiederkehrenden Muster. Sie beginnen etwa mit einem Dokument oder
              Datensatz und enden mit einer Prüfung, einem Entwurf, einer
              Buchung oder einer Freigabevorlage.
            </p>
            <p>
              Der Prozess-Check klärt Arbeitsvolumen, Risiken, Integrationen und
              Ausnahmen. Daraus entsteht ein sinnvoll begrenzter erster
              Automatisierungsschritt.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className={`container callout ${styles.calloutBlock}`}>
          <p className="eyebrow">No system replacement</p>
          <h2>Ihr ERP, CRM und Microsoft 365 bleiben.</h2>
          <p>
            Opsrid ergänzt eine Prozessanwendung über den Systemen, die
            Ihr Unternehmen bereits nutzt. Zuerst wählen wir den einfachsten
            belastbaren Anschluss: Dateien und E-Mail, dann APIs und
            Connectoren, bei Bedarf eine kontrollierte Bedienautomation.
          </p>
          <Link className="button button-primary" href="/prozess-check">
            Prozess prüfen lassen
          </Link>
        </div>
      </section>
    </main>
  );
}

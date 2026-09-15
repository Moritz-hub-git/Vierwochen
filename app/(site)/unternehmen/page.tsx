import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/config";
import styles from "../prozesse/process.module.css";

export const metadata: Metadata = {
  title: "Unternehmen",
  description:
    "Opsrid baut individuelle Prozesssoftware für wiederkehrende operative Arbeit auf bestehenden Unternehmenssystemen.",
  alternates: { canonical: "/unternehmen" },
};

export default function CompanyPage() {
  return (
    <main id="main">
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Unternehmen</p>
          <h1>Wir bauen Prozesse, die ihre Routinearbeit selbst erledigen.</h1>
          <p className="section-intro">
            Opsrid entwickelt individuelle Prozesssoftware. Wir
            verbinden Dokumente, Regeln und bestehende Systeme zu einem Ablauf,
            in dem Standardfälle automatisch laufen und Menschen die Ausnahmen
            bearbeiten.
          </p>
          <div className={styles.pageActions}>
            <Link className="button button-primary" href="/prozess-check">
              Prozess prüfen lassen
            </Link>
            <Link className="button button-secondary" href="/prozesse">
              Prozesse ansehen
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container two-column">
          <div>
            <p className="eyebrow">Unsere These</p>
            <h2 className="section-heading">Software soll Arbeit entfernen.</h2>
          </div>
          <div>
            <p>
              In vielen Unternehmen übertragen Menschen Informationen zwischen
              E-Mail, PDF, Excel, ERP und Portalen. Klassische Software macht
              einzelne Schritte schneller. Opsrid setzt am gesamten Vorgang an:
              vom Eingang bis zu einem verwertbaren Ergebnis.
            </p>
            <p>
              Der wirtschaftliche Maßstab ist die Arbeit, die danach nicht mehr
              anfällt. Deshalb definieren wir vor der Umsetzung einen klaren
              Output und messen Bearbeitungszeit, menschliche Berührungen und
              Durchlaufzeit.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <p className="eyebrow">Arbeitsweise</p>
          <h2 className="section-heading">
            Geschäftsprozess zuerst, Technologie danach.
          </h2>
          <div className="feature-grid">
            <article className="feature-card">
              <h3>Konkreter Output</h3>
              <p>
                Jeder Prozess braucht ein überprüfbares Ergebnis: etwa eine
                geprüfte Auftragsbestätigung, einen Angebotsentwurf oder einen
                vorbereiteten Report.
              </p>
            </article>
            <article className="feature-card">
              <h3>Bestehende Systeme</h3>
              <p>
                ERP, CRM, Microsoft 365 und etablierte Ablagen bleiben. Wir
                wählen den einfachsten belastbaren Weg, um sie zu verbinden.
              </p>
            </article>
            <article className="feature-card">
              <h3>Klare Ausnahmen</h3>
              <p>
                Unsichere Fälle, Freigaben und fachliche Entscheidungen landen
                mit Kontext bei der zuständigen Person.
              </p>
            </article>
            <article className="feature-card">
              <h3>Produktiver Betrieb</h3>
              <p>
                Tests, Protokollierung, Rollen, Betrieb und Übergabe gehören zur
                Prozessarchitektur und werden passend zum Risiko vereinbart.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container two-column">
          <div>
            <p className="eyebrow">Verantwortung</p>
            <h2 className="section-heading">
              Ein fester Ansprechpartner für den Prozess.
            </h2>
          </div>
          <div>
            <h3>{SITE.founder.name}</h3>
            <p>{SITE.founder.role}</p>
            <p>
              Er führt Prozessanalyse, Lösungsentwurf und Umsetzung zusammen.
              Falls weitere Spezialisten nötig sind, werden Beteiligte und
              Verantwortlichkeiten vor Auftragserteilung offen benannt.
            </p>
            <Link className="text-link" href="/sicherheit">
              Arbeitsweise für IT und Datenschutz <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className={`container callout ${styles.calloutBlock}`}>
          <p className="eyebrow">North Star</p>
          <h2>Does this eliminate work?</h2>
          <p>
            Diese Frage entscheidet, was wir bauen. Eine Funktion ist sinnvoll,
            wenn sie einen realen manuellen Schritt entfernt oder eine
            notwendige Entscheidung besser vorbereitet.
          </p>
          <Link className="button button-primary" href="/prozess-check">
            Ihren Prozess beschreiben
          </Link>
        </div>
      </section>
    </main>
  );
}

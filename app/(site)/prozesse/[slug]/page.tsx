import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProcess, processes } from "@/lib/processes";
import styles from "../process.module.css";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return processes.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const process = getProcess((await params).slug);
  if (!process) return {};
  return {
    title: process.title,
    description: process.metaDescription,
    alternates: { canonical: `/prozesse/${process.slug}` },
  };
}

export default async function ProcessPage({ params }: PageProps) {
  const process = getProcess((await params).slug);
  if (!process) notFound();

  return (
    <main id="main">
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">{process.category} · Prozessautomation</p>
          <h1>{process.headline}</h1>
          <p className="section-intro">{process.description}</p>
          <div className={styles.pageActions}>
            <Link
              className="button button-primary"
              href={`/prozess-check?prozess=${process.slug}`}
            >
              Diesen Prozess prüfen
            </Link>
            <Link className="button button-secondary" href="/#potenzial">
              Potenzial berechnen
            </Link>
          </div>
          <nav className={styles.processNav} aria-label="Weitere Prozesse">
            {processes
              .filter(({ slug }) => slug !== process.slug)
              .map(({ slug, category }) => (
                <Link href={`/prozesse/${slug}`} key={slug}>
                  {category}
                </Link>
              ))}
          </nav>
        </div>
      </section>

      <section className="section">
        <div className="container two-column">
          <div>
            <p className="eyebrow">Ausgangslage</p>
            <h2 className="section-heading">
              Die Arbeit liegt zwischen Ihren Systemen.
            </h2>
          </div>
          <div>
            {process.pains.map((pain) => (
              <p key={pain}>{pain}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <p className="eyebrow">Zielprozess</p>
          <h2 className="section-heading">
            Vom Eingang bis zum prüfbaren Ergebnis
          </h2>
          <p className="section-intro">
            Der konkrete Ablauf wird an Ihre Regeln, Daten und Freigaben
            angepasst. Das Grundmuster bleibt: verstehen, prüfen, handeln und
            unsichere Fälle gezielt vorlegen.
          </p>
          <div className={styles.flow}>
            {process.steps.map((step) => (
              <article key={step.title}>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className={styles.splitList}>
            <div className={styles.listBox}>
              <h3>Typische Eingänge</h3>
              <ul>
                {process.inputs.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className={styles.listBox}>
              <h3>Automatische Prüfungen</h3>
              <ul>
                {process.checks.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className={styles.output}>
            <span className="eyebrow">Der Output</span>
            <p>{process.output}</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container two-column">
          <div>
            <p className="eyebrow">Human in the loop</p>
            <h2 className="section-heading">
              Menschen bearbeiten die Fälle, die Menschen brauchen.
            </h2>
            <p>
              Die Automation arbeitet nur innerhalb der vereinbarten Regeln.
              Unsicherheit, Risiko und vorgeschriebene Freigaben führen zu einer
              klaren Aufgabe für die zuständige Person.
            </p>
          </div>
          <div className={styles.listBox}>
            <h3>Typische Ausnahmen</h3>
            <ul>
              {process.exceptions.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <p className="eyebrow">Business Case</p>
          <h2 className="section-heading">Vorher und nachher messbar machen</h2>
          <p className="section-intro">
            Wir dokumentieren die Ausgangslage und messen den produktiven
            Prozess. Beispielrechnungen sind Orientierung; belastbare Werte
            entstehen erst aus Ihrem tatsächlichen Volumen und Ablauf.
          </p>
          <div className="feature-grid">
            {process.metrics.map((metric) => (
              <article className="feature-card" key={metric}>
                <h3>{metric}</h3>
                <p>
                  Wird im Prozess-Check erhoben und für den Pilot als Messgröße
                  festgelegt.
                </p>
              </article>
            ))}
          </div>
          <Link className="text-link" href="/#potenzial">
            Mit eigenen Annahmen rechnen <span aria-hidden>→</span>
          </Link>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <p className="eyebrow">Häufige Fragen</p>
          <h2 className="section-heading">
            Was vor dem ersten Schritt geklärt wird
          </h2>
          <div className={styles.faq}>
            {process.questions.map(({ question, answer }) => (
              <details key={question}>
                <summary>{question}</summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className={`container callout ${styles.calloutBlock}`}>
          <p className="eyebrow">Prozess-Check</p>
          <h2>Ist dieser Prozess ein guter Startpunkt?</h2>
          <p>
            Beschreiben Sie Volumen, Bearbeitungszeit, Systeme und typische
            Ausnahmen. Sie erhalten eine erste Einordnung, welcher Teil sinnvoll
            automatisierbar ist.
          </p>
          <Link
            className="button button-primary"
            href={`/prozess-check?prozess=${process.slug}`}
          >
            {process.title} prüfen
          </Link>
        </div>
      </section>
    </main>
  );
}

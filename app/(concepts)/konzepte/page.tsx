import type { Metadata } from "next";
import Link from "next/link";
import styles from "./overview.module.css";
export const metadata: Metadata = {
  title: "Fünf Perspektiven auf OpsDone",
  robots: { index: false, follow: false },
};
const variants = [
  {
    slug: "arbeit-verschwindet",
    n: "01",
    name: "Die Arbeit verschwindet.",
    idea: "Das Ergebnis bleibt.",
    direction: "Jung-von-Matt-Richtung",
    detail:
      "Eine visuelle Verwandlung: manuelle Arbeit wird zu konkreten Funktionen Ihrer Anwendung.",
    color: "#f45c35",
  },
  {
    slug: "massarbeit",
    n: "02",
    name: "Für Ihren Prozess",
    idea: "gebaut.",
    direction: "Martin-et-Karczinski-Richtung",
    detail:
      "Präzise Maßarbeit: Ihre Regeln, Ihre Daten und Ihre Verantwortlichen werden zu Software.",
    color: "#8b967b",
  },
  {
    slug: "business-case",
    n: "03",
    name: "Was kostet",
    idea: "die Handarbeit?",
    direction: "Ogilvy-Richtung",
    detail:
      "Ein nachvollziehbarer Business Case, der mit dem tatsächlichen Aufwand beginnt.",
    color: "#ddbd72",
  },
  {
    slug: "menschen",
    n: "04",
    name: "Ihre besten Leute",
    idea: "sind keine Schnittstelle.",
    direction: "thjnk-Richtung",
    detail:
      "Wiedererkennen im Arbeitsalltag. Aus vielen Übergaben wird eine fundierte Entscheidung.",
    color: "#bdaaff",
  },
  {
    slug: "loesungsentwurf",
    n: "05",
    name: "Ihr Prozess wird",
    idea: "zum Lösungsentwurf.",
    direction: "Serviceplan-Richtung",
    detail:
      "Die Seite ist der Einstieg: Anforderungen beschreiben und einen konkreten Entwurf entstehen sehen.",
    color: "#89c8bb",
  },
];
export default function ConceptsOverview() {
  return (
    <main id="main" className={styles.page}>
      <header>
        <Link href="/">OpsDone</Link>
        <span>Konzeptauswahl · September 2026</span>
      </header>
      <section className={styles.intro}>
        <p>WORK ELIMINATED. / FÜNF PERSPEKTIVEN</p>
        <h1>
          Ein Versprechen.
          <br />
          Fünf eigene Erlebnisse.
        </h1>
        <p>
          Wir übernehmen Ihren Prozess und bauen die Anwendung, die ihn
          erledigt. Welche Richtung macht dieses Angebot für Ihre Kunden am
          stärksten?
        </p>
      </section>
      <section className={styles.grid} aria-label="Landingpage-Konzepte">
        {variants.map((v) => (
          <Link
            className={styles.card}
            href={`/konzepte/${v.slug}`}
            key={v.slug}
            style={{ "--swatch": v.color } as React.CSSProperties}
          >
            <div className={styles.art}>
              <span>{v.n} / OPSDONE</span>
              <h2>
                {v.name}
                <br />
                <em>{v.idea}</em>
              </h2>
              <div className={styles.mini}>
                <span>Ihr Prozess</span>
                <b>→</b>
                <span>Ihre Anwendung</span>
              </div>
            </div>
            <div className={styles.caption}>
              <p>{v.direction}</p>
              <h3>{v.detail}</h3>
              <strong>
                Seite erleben <span>↗</span>
              </strong>
            </div>
          </Link>
        ))}
      </section>
      <aside className={styles.note}>
        <strong>Für einen fairen Vergleich</strong>
        <p>
          Öffnen Sie jede Seite auch auf dem Smartphone und spielen Sie
          denselben Prozess durch. Achten Sie auf Verständlichkeit, Vertrauen
          und den Impuls, den nächsten Schritt zu machen. Welche Variante besser
          konvertiert, lässt sich erst mit vergleichbarem Traffic messen.
        </p>
        <p>
          Die Richtungen sind eigenständige Interpretationen Ihrer Briefings.
          Die genannten Agenturen sind weder beteiligt noch Auftragnehmer. Die
          Kundenseiten selbst enthalten keine Vergleichsoberfläche.
        </p>
      </aside>
      <footer>
        <Link href="/">Zur bestehenden Website</Link>
        <span>OpsDone · Work eliminated.</span>
      </footer>
    </main>
  );
}

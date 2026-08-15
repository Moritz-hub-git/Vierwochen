import type { Metadata } from "next";
import Link from "next/link";
import DialogCta from "@/components/v/DialogCta";
import Skin from "@/components/v/Skin";
import s from "./styles.module.css";

/**
 * Variante „substanz." — das stille Studio.
 *
 * Inspiriert von holistischen Markenberatungen (Martin et Karczinski):
 * ruhiges Selbstbewusstsein, große Typografie, viel Weißraum, ein
 * Transformations-Narrativ. Der Unterschied: Statt einer Markenbotschaft
 * steht am Ende etwas Anfassbares — eine Anwendung, die ein Problem löst.
 * Hochwertigkeit kommt aus Understatement, nicht aus Lärm.
 */

export const metadata: Metadata = { title: "substanz. — Haltung, die man anfassen kann" };

const TRANSFORMATIONS = [
  {
    from: "sechs Excel-Listen und drei Wahrheiten",
    to: "eine Auftragsübersicht, die morgens um sieben stimmt.",
  },
  {
    from: "Zuruf, Zettel und Rückfragen",
    to: "eine Schichtplanung, die niemand mehr anrufen muss.",
  },
  {
    from: "einem Postfach voller PDFs",
    to: "ein Portal, in dem Ihre Kunden sich selbst bedienen.",
  },
];

const METHOD = [
  {
    num: "01",
    title: "Verstehen",
    text: "Ihr Ablauf, Ihre Begriffe, Ihr Engpass. Daraus wird ein Plan mit einem Abnahmetermin, der im Angebot steht — nicht in Aussicht.",
  },
  {
    num: "02",
    title: "Bauen",
    text: "Ein Mensch, der Ihr Geschäft versteht, baut — mit künstlicher Intelligenz als Werkzeug, nicht als Ausrede. Sie sprechen mit dem, der baut.",
  },
  {
    num: "03",
    title: "Schärfen",
    text: "Jede Woche sehen Sie den Stand am lebenden System. Was Sie sehen, können Sie ändern — bevor es Abnahme heißt.",
  },
  {
    num: "04",
    title: "Übergeben",
    text: "Abnahme gegen vereinbarte Kriterien. Quellcode, Daten, Zugänge und Dokumentation gehören Ihnen — vom ersten Tag an.",
  },
];

const CONTRACT = [
  "Der Abnahmetermin steht im Angebot.",
  "Der Preis ist fest — die Hälfte bei Auftrag, die Hälfte nach bestandener Abnahme.",
  "Besteht die Abnahme nicht, entfällt die zweite Hälfte. Vollständig.",
];

export default function SubstanzPage() {
  return (
    <div className={s.page}>
      <Skin name="substanz" />

      <nav className={s.nav}>
        <Link href="/v" className={s.mark}>substanz.</Link>
        <div className={s.navLinks}>
          <Link href="/v">Alle Varianten</Link>
          <Link href="/termin">Termin</Link>
        </div>
      </nav>

      <header className={s.hero}>
        <span className={s.kicker}>Studio für Individualsoftware · Mittelstand</span>
        <h1 className={s.h1}>
          Wir bauen keine Versprechen.<br />
          Wir bauen <em>Werkzeuge.</em>
        </h1>
        <p className={s.sub}>
          Eine Markenbotschaft kann man bewundern. Eine Anwendung, die Ihr
          Problem löst, kann man benutzen — jeden Tag, ab in vier Wochen.
          Zum Festpreis. Besteht die Abnahme nicht, zahlen Sie nichts.
        </p>
      </header>

      <div className={s.stats} role="list" aria-label="Eckdaten">
        <div className={s.stat} role="listitem">
          <span className={s.statNum}>4</span>
          <span className={s.statLabel}>Wochen bis zur Abnahme</span>
        </div>
        <div className={s.stat} role="listitem">
          <span className={s.statNum}>1</span>
          <span className={s.statLabel}>Festpreis, keine Nachträge</span>
        </div>
        <div className={s.stat} role="listitem">
          <span className={s.statNum}>0&nbsp;€</span>
          <span className={s.statLabel}>bei nicht bestandener Abnahme</span>
        </div>
        <div className={s.stat} role="listitem">
          <span className={s.statNum}>100&nbsp;%</span>
          <span className={s.statLabel}>Ihr Eigentum, vom ersten Tag</span>
        </div>
      </div>

      <section className={s.manifesto}>
        <span className={s.kicker}>Unsere Haltung</span>
        <p className={s.manifestoText}>
          Das schönste Kompliment ist nicht „schöne Software“. Es ist ein
          Dienstag in Ihrem Betrieb, an dem niemand mehr über das alte
          Problem spricht.
        </p>
      </section>

      <section className={s.transforms} aria-label="Was entsteht">
        <span className={s.kicker}>Was entsteht</span>
        {TRANSFORMATIONS.map((t) => (
          <div key={t.to} className={s.transform}>
            <span className={s.transformFrom}>Aus {t.from}</span>
            <span className={s.transformArrow} aria-hidden>⟶</span>
            <span className={s.transformTo}>wird {t.to}</span>
          </div>
        ))}
        <p className={s.transformsNote}>
          Keine Plattform, kein Baukasten, kein Projekt ohne Ende — ein
          Werkzeug, geschnitten auf einen Ablauf, der Sie heute Zeit kostet.
        </p>
      </section>

      <section className={s.method} aria-label="Die Methode">
        <span className={s.kicker}>Vier Wochen, bewusst gebaut</span>
        <div className={s.methodGrid}>
          {METHOD.map((m) => (
            <div key={m.num} className={s.methodStep}>
              <span className={s.methodNum} aria-hidden>{m.num}</span>
              <h2>{m.title}</h2>
              <p>{m.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={s.contract} aria-label="Das Versprechen">
        <span className={s.kicker}>Drei Sätze, die im Vertrag stehen</span>
        <ol className={s.contractList}>
          {CONTRACT.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ol>
        <p className={s.contractNote}>
          Dazu: zwölf Monate Gewährleistung, kein Abonnement, keine
          Abhängigkeit. Substanz statt Kleingedrucktem.
        </p>
      </section>

      <section className={s.cta}>
        <span className={s.kicker}>Der erste Schritt</span>
        <p className={s.ctaLead}>
          Beschreiben Sie Ihr Problem in einem Satz. Sie erhalten binnen
          Minuten eine Lösungsskizze, einen Zeitplan mit echtem Datum und
          eine Preisschätzung — kostenlos, ohne E-Mail-Adresse.
        </p>
        <DialogCta className={s.ctaBtn}>Erzählen Sie von Ihrem Dienstag</DialogCta>
        <p className={s.ctaHint}>Oder unten in die Zeile schreiben. Ein Satz genügt.</p>
      </section>

      <footer className={s.foot}>
        <Link href="/impressum">Impressum</Link>
        <Link href="/datenschutz">Datenschutz</Link>
        <Link href="/termin">Termin direkt</Link>
        <Link href="/v">Varianten-Übersicht</Link>
      </footer>
    </div>
  );
}

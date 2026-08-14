import type { Metadata } from "next";
import Link from "next/link";
import DialogCta from "@/components/v/DialogCta";
import Skin from "@/components/v/Skin";
import s from "./styles.module.css";

/**
 * Variante „werkbank." — Software als Handwerk.
 *
 * Zielgefühl: Bodenständigkeit. Der Betrieb, der hier landet, soll denken:
 * „Endlich einer, der redet wie wir." Harte Kanten, Typenschild statt
 * Feature-Liste, Werkstattzettel statt Use-Cases. Die CTA spricht die
 * Sprache der Halle: „Sag, was klemmt."
 */

export const metadata: Metadata = { title: "werkbank. — Software ist Handwerk" };

export default function WerkbankPage() {
  return (
    <div className={s.page}>
      <Skin name="werkbank" />

      <nav className={s.nav}>
        <Link href="/v" className={s.mark}>werk<i>bank</i>.</Link>
        <div className={s.navLinks}>
          <Link href="/v">Alle Varianten</Link>
          <Link href="/termin">Termin</Link>
        </div>
      </nav>

      <header className={s.hero}>
        <span className={s.kicker}>Individualsoftware für den Betrieb</span>
        <h1 className={s.h1}>
          Software ist <mark>Handwerk</mark>. Vier Wochen, Festpreis, fertig.
        </h1>
        <p className={s.sub}>
          Ein Meister, keine Projektmannschaft. Die KI übernimmt die Fleißarbeit,
          ich übernehme die Verantwortung. Läuft es nach vier Wochen nicht,
          zahlen Sie nichts.
        </p>
      </header>

      <section className={s.plate} aria-label="Typenschild">
        <div className={s.plateHead}>
          <span>Typenschild</span>
          <span>vierwochen · Baujahr 2026</span>
        </div>
        <div className={s.plateGrid}>
          <div className={s.plateCell}>
            <span className={s.plateLabel}>Lieferzeit</span>
            <span className={s.plateValue}>4 Wochen</span>
          </div>
          <div className={s.plateCell}>
            <span className={s.plateLabel}>Preis</span>
            <span className={s.plateValue}>Fest, ab 9.500 €</span>
          </div>
          <div className={s.plateCell}>
            <span className={s.plateLabel}>Gewährleistung</span>
            <span className={s.plateValue}>12 Monate</span>
          </div>
          <div className={s.plateCell}>
            <span className={s.plateLabel}>Eigentum</span>
            <span className={s.plateValue}>Ihres. Komplett.</span>
          </div>
        </div>
      </section>

      <section className={s.section}>
        <h2 className={s.secTitle}>Was bei anderen klemmt</h2>
        <div className={s.tickets}>
          <article className={s.ticket}>
            <span className={s.ticketNo}>Zettel 041</span>
            <p className={s.ticketQuote}>„Das Lager lebt in einer Excel, die nur eine Kollegin versteht."</p>
            <p className={s.ticketFix}><b>Erledigt:</b> Datenbank, Rechte, Historie. Excel-Export bleibt für alle, die dort weiterarbeiten wollen.</p>
          </article>
          <article className={s.ticket}>
            <span className={s.ticketNo}>Zettel 042</span>
            <p className={s.ticketQuote}>„Bestellungen gehen im Sammelpostfach unter."</p>
            <p className={s.ticketFix}><b>Erledigt:</b> Mails werden gelesen, zugeordnet, als Vorgang angelegt — mit klarer Zuständigkeit.</p>
          </article>
          <article className={s.ticket}>
            <span className={s.ticketNo}>Zettel 043</span>
            <p className={s.ticketQuote}>„Fürs Reporting kopiere ich drei Tage Zahlen zusammen."</p>
            <p className={s.ticketFix}><b>Erledigt:</b> Quellen angebunden, Bericht baut sich selbst. Sie prüfen, statt zu kopieren.</p>
          </article>
        </div>
      </section>

      <section className={s.section}>
        <h2 className={s.secTitle}>So läuft der Auftrag</h2>
        <ol className={s.steps}>
          <li><span><b>Sie sagen, was klemmt.</b> Unten im Dialog, ein Satz reicht — Skizze, Zeitplan und Preisschätzung kommen sofort.</span></li>
          <li><span><b>30 Minuten Gespräch.</b> Kostenlos. Wir schärfen die Skizze, dann kommt das Festangebot mit Abnahmetermin.</span></li>
          <li><span><b>Vier Wochen Bau.</b> Jede Woche sehen Sie den Stand am lebenden System, nicht auf Folien.</span></li>
          <li><span><b>Abnahme gegen Kriterien.</b> Besteht die Software nicht, entfällt die zweite Rate. Steht im Vertrag.</span></li>
        </ol>
      </section>

      <section className={s.cta}>
        <h2 className={s.ctaTitle}>Sag, was klemmt.</h2>
        <DialogCta className={s.ctaBtn}>Einschätzung starten →</DialogCta>
        <p className={s.ctaHint}>
          Oder unten in die Leiste tippen. Kostenlos, unverbindlich, ohne E-Mail-Angabe.
        </p>
        <div className={s.foot}>
          <Link href="/impressum">Impressum</Link>
          <Link href="/datenschutz">Datenschutz</Link>
          <Link href="/v">← Varianten-Übersicht</Link>
        </div>
      </section>
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import DialogCta from "@/components/v/DialogCta";
import Skin from "@/components/v/Skin";
import s from "./styles.module.css";

/**
 * Variante „klara." — die ruhige Kanzlei.
 *
 * Zielgefühl für den konservativen Geschäftsführer: Seriosität und Ruhe.
 * Kein Marketing-Lärm, sondern Buchsatz: Serifen, Weißraum, römische
 * Nummern, das Versprechen als Urkunde. Wer hier bucht, tut es, weil die
 * Seite klingt wie jemand, der Verträge ernst nimmt.
 */

export const metadata: Metadata = { title: "klara. — Software, klar vereinbart" };

export default function KlaraPage() {
  return (
    <div className={s.page}>
      <Skin name="klara" />

      <nav className={s.nav}>
        <Link href="/v" className={s.mark}>klara.</Link>
        <div className={s.navLinks}>
          <Link href="/v">Alle Varianten</Link>
          <Link href="/termin">Termin</Link>
        </div>
      </nav>

      <header className={s.hero}>
        <span className={s.kicker}>Individualsoftware, klar vereinbart</span>
        <h1 className={s.h1}>
          Vier Wochen. Ein Festpreis.<br />
          <em>Ein Versprechen.</em>
        </h1>
        <p className={s.sub}>
          Software für den Mittelstand, entworfen und gebaut von einer Person,
          die Ihr Geschäft versteht — mit künstlicher Intelligenz als Werkzeug,
          nicht als Ausrede. Besteht die Abnahme nicht, zahlen Sie nichts.
        </p>
      </header>

      <hr className={s.rule} />

      <div className={s.clauses}>
        <div className={s.clause}>
          <span className={s.roman}>I.</span>
          <div>
            <h2>Der Termin steht, bevor es losgeht.</h2>
            <p>
              Vier Wochen vom Kick-off bis zur Abnahme — der Abnahmetermin steht
              im Angebot, nicht in Aussicht. Jede Woche sehen Sie den Stand am
              lebenden System.
            </p>
          </div>
        </div>
        <div className={s.clause}>
          <span className={s.roman}>II.</span>
          <div>
            <h2>Der Preis steht, bevor Sie unterschreiben.</h2>
            <p>
              Ein Festpreis, keine Tagessätze, keine Nachträge. Die Hälfte bei
              Auftrag, die Hälfte nach bestandener Abnahme — vorher wird nicht
              vollständig bezahlt.
            </p>
          </div>
        </div>
        <div className={s.clause}>
          <span className={s.roman}>III.</span>
          <div>
            <h2>Das Werk gehört Ihnen, ganz.</h2>
            <p>
              Quellcode, Daten, Zugänge und Dokumentation — vom ersten Tag an
              Ihr Eigentum. Zwölf Monate Gewährleistung. Keine Abhängigkeit,
              kein Abonnement.
            </p>
          </div>
        </div>
      </div>

      <hr className={s.rule} />

      <section className={s.deed} aria-label="Das Versprechen">
        <div className={s.deedKicker}>Schwarz auf Weiß</div>
        <p className={`${s.deedText}`}>
          „Besteht die Software die vereinbarte Abnahme nicht,
          entfällt die zweite Zahlungshälfte. Vollständig."
        </p>
        <div className={s.sig} aria-hidden>
          <svg width="130" height="36" viewBox="0 0 120 34" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
            <path d="M6 26c8-16 14-20 16-14s-4 16 2 14 10-18 16-16-2 18 4 16 12-16 18-14-2 16 4 14c8-3 16-10 28-11" />
          </svg>
          <span>Moritz Schumacher</span>
        </div>
      </section>

      <hr className={s.rule} />

      <section className={s.quote}>
        <blockquote>
          Das klassische Projekt ist eine Telefonkette: Sechs Übergaben zwischen
          Ihrem Problem und dem Code. Hier gibt es eine — Sie sprechen mit dem,
          der baut.
        </blockquote>
        <cite>Warum vier Wochen genügen</cite>
      </section>

      <hr className={s.rule} />

      <section className={s.cta}>
        <p className={s.ctaLead}>
          Beschreiben Sie Ihr Anliegen in einem Satz — Sie erhalten binnen
          Minuten eine Lösungsskizze, einen Zeitplan mit Datum und eine
          unverbindliche Preisschätzung. Diskret, kostenlos, ohne Angabe einer
          E-Mail-Adresse.
        </p>
        <DialogCta className={s.ctaBtn}>Das Gespräch beginnen</DialogCta>
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

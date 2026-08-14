import type { Metadata } from "next";
import Link from "next/link";
import DialogCta from "@/components/v/DialogCta";
import Skin from "@/components/v/Skin";
import s from "./styles.module.css";

/**
 * Variante „fixfertig." — Energie und Leichtigkeit.
 *
 * Zielgefühl für den digital-affinen Entscheider: „Endlich fühlt sich
 * Software-Beschaffung nicht nach Beschaffung an." Bento-Kacheln, kräftige
 * Farben, kurzer Text, große Zahlen. Ernsthaftigkeit kommt aus den Fakten
 * (Festpreis, Garantie), nicht aus grauem Anzugston.
 */

export const metadata: Metadata = { title: "fixfertig. — Software in 4 Wochen" };

export default function FixfertigPage() {
  return (
    <div className={s.page}>
      <Skin name="fixfertig" />

      <nav className={s.nav}>
        <Link href="/v" className={s.mark}>fix<i>fertig</i>.</Link>
        <div className={s.navLinks}>
          <Link href="/v">Alle Varianten</Link>
          <Link href="/termin">Termin</Link>
        </div>
      </nav>

      <div className={s.wrap}>
        <header className={s.hero}>
          <span className={s.badge}>⚡ Individualsoftware für den Mittelstand</span>
          <h1 className={s.h1}>
            Software in 4 Wochen.<br /><em>Fix. Fertig.</em>
          </h1>
          <p className={s.sub}>
            Sie erklären Ihr Problem, die KI tippt, ein Mensch mit
            Businessverständnis baut und haftet. Festpreis — und läuft es
            nicht, zahlen Sie nichts.
          </p>
        </header>

        <div className={s.bento}>
          <div className={`${s.tile} ${s.tileIndigo} ${s.tall}`}>
            <span className={s.tileLabel}>Lieferzeit</span>
            <span className={s.tileBig}>4 Wochen</span>
            <p className={s.tileText}>
              Vom Kick-off bis zur Abnahme — der Termin steht im Angebot.
              Jede Woche sehen Sie den Stand am lebenden System.
            </p>
          </div>
          <div className={s.tile}>
            <span className={s.tileLabel}>Preis</span>
            <span className={s.tileBig}>ab 9.500&nbsp;€</span>
            <p className={s.tileText}>Fest. Keine Tagessätze, keine Nachträge.</p>
          </div>
          <div className={`${s.tile} ${s.tileLime}`}>
            <span className={s.tileLabel}>Garantie</span>
            <span className={s.tileBig}>0 €</span>
            <p className={s.tileText}>… zahlen Sie, wenn die Abnahme nicht besteht. Steht im Vertrag.</p>
          </div>
          <div className={s.tile}>
            <span className={s.tileLabel}>Team</span>
            <span className={s.tileBig}>2 + KI</span>
            <p className={s.tileText}>Sie und der, der baut. Die KI übernimmt Tippen und Tests.</p>
          </div>
          <div className={`${s.tile} ${s.tileInk} ${s.wide}`}>
            <span className={s.tileLabel}>Eigentum</span>
            <span className={s.tileBig}>Alles Ihres</span>
            <p className={s.tileText}>
              Quellcode, Daten, Zugänge, Doku — vom ersten Tag. Kein Lock-in,
              kein Abo, 12 Monate Gewährleistung obendrauf.
            </p>
          </div>
          <DialogCta className={`${s.tile} ${s.tileCoral} ${s.tileCta}`}>
            <span className={s.tileLabel}>Los geht&apos;s</span>
            <span className={s.tileBig}>Ihre Skizze in 60 Sekunden</span>
            <span className={s.arrow} aria-hidden>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 14 0M13 6l6 6-6 6" /></svg>
            </span>
          </DialogCta>
        </div>

        <ol className={s.steps}>
          <li><b>Problem eintippen</b> Unten im Dialog, ein Satz reicht. Ohne E-Mail, ohne Anmeldung.</li>
          <li><b>Skizze ansehen</b> Lösungsschritte, Zeitplan mit echtem Datum, Preisschätzung — sofort.</li>
          <li><b>30 Minuten sprechen</b> Kostenlos. Danach kommt das Festangebot mit Abnahmetermin.</li>
          <li><b>4 Wochen später: live</b> Abnahme gegen vereinbarte Kriterien. Fix. Fertig.</li>
        </ol>

        <div className={s.cta}>
          <DialogCta className={s.ctaBtn}>Jetzt Skizze holen — kostenlos</DialogCta>
          <p className={s.ctaHint}>Oder einfach unten in die Leiste tippen. Dauert 60 Sekunden.</p>
        </div>

        <footer className={s.foot}>
          <Link href="/impressum">Impressum</Link>
          <Link href="/datenschutz">Datenschutz</Link>
          <Link href="/termin">Termin direkt buchen</Link>
          <Link href="/v">← Übersicht</Link>
        </footer>
      </div>
    </div>
  );
}

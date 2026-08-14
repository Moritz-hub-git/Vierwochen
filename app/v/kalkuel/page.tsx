import type { Metadata } from "next";
import Link from "next/link";
import Skin from "@/components/v/Skin";
import Rechner from "./Rechner";
import s from "./styles.module.css";

/**
 * Variante „kalkül." — der nüchterne Kaufmann.
 *
 * Zielgefühl: Kontrolle. Keine Emotion über Bilder, sondern über Zahlen, die
 * man selbst bewegt. Der Rechner im Hero IST die Seite: Wer den Regler
 * anfasst, hat sein Geschäft schon durchgerechnet — und die CTA nimmt die
 * eingestellte Zahl mit in den Dialog.
 */

export const metadata: Metadata = { title: "kalkül. — Erst rechnen, dann bauen" };

export default function KalkuelPage() {
  return (
    <div className={s.page}>
      <Skin name="kalkuel" />

      <nav className={s.nav}>
        <Link href="/v" className={s.mark}>kal<i>kül</i>.</Link>
        <div className={s.navLinks}>
          <Link href="/v">Alle Varianten</Link>
          <Link href="/termin">Termin</Link>
        </div>
      </nav>

      <div className={s.wrap}>
        <header className={s.hero}>
          <div>
            <span className={s.kicker}>Individualsoftware · Festpreis · 4 Wochen</span>
            <h1 className={s.h1}>Rechnen wir.</h1>
            <p className={s.sub}>
              Jeder manuelle Ablauf hat einen Preis — er steht nur auf keiner
              Rechnung. Stellen Sie rechts Ihren Aufwand ein; die Software, die
              ihn ablöst, kostet einmal, zum Festpreis. Besteht die Abnahme
              nicht, zahlen Sie nichts.
            </p>
            <div className={s.facts}>
              <div className={s.fact}>
                <span className={s.factNum}>45–60 T€</span>
                <span className={s.factLabel}>kostet eine Sachbearbeitungsstelle — jedes Jahr</span>
              </div>
              <div className={s.fact}>
                <span className={s.factNum}>4 Wochen</span>
                <span className={s.factLabel}>bis zur Abnahme, Termin steht im Angebot</span>
              </div>
              <div className={s.fact}>
                <span className={s.factNum}>ab 9.500 €</span>
                <span className={s.factLabel}>Festpreis Pilot — 50/50, Rest nach Abnahme</span>
              </div>
              <div className={s.fact}>
                <span className={s.factNum}>12 Monate</span>
                <span className={s.factLabel}>Gewährleistung, Quellcode gehört Ihnen</span>
              </div>
            </div>
          </div>
          <Rechner />
        </header>

        <section className={s.section}>
          <h2 className={s.secTitle}>Zwei Arten, Software zu kaufen</h2>
          <div className={s.tableWrap}>
            <table className={s.table}>
              <thead>
                <tr>
                  <th scope="col">Kriterium</th>
                  <th scope="col">Klassisches Projekt</th>
                  <th scope="col">vierwochen</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Beteiligte</td><td>typisch 8–12</td><td>2 + KI</td></tr>
                <tr><td>Laufzeit</td><td>Monate, offenes Ende</td><td>4 Wochen, Termin im Angebot</td></tr>
                <tr><td>Abrechnung</td><td>Tagessätze, Nachträge</td><td>Festpreis, 50/50</td></tr>
                <tr><td>Risiko bei Misserfolg</td><td>bei Ihnen</td><td>zweite Rate entfällt</td></tr>
                <tr><td>Eigentum am Code</td><td>oft strittig</td><td>Ihres, vom ersten Tag</td></tr>
                <tr><td>Rückfragen</td><td>durch sechs Übergaben</td><td>direkt an den, der baut</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <footer className={s.foot}>
          <Link href="/impressum">Impressum</Link>
          <Link href="/datenschutz">Datenschutz</Link>
          <Link href="/it">Fakten für Ihre IT</Link>
          <Link href="/termin">Termin direkt buchen</Link>
          <Link href="/v">← Übersicht</Link>
        </footer>
      </div>
    </div>
  );
}

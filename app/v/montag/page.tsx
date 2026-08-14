import type { Metadata } from "next";
import Link from "next/link";
import DialogCta from "@/components/v/DialogCta";
import Skin from "@/components/v/Skin";
import s from "./styles.module.css";

/**
 * Variante „montag." — die Seite als Kompetenzbeweis.
 *
 * Zielgefühl für den IT-affinen Entscheider: „Die können bauen." Terminal-
 * Ästhetik, tippender Befehl, Diff statt Vergleichstabelle, Changelog statt
 * Projektplan. Der Name: Am Montag geht's los.
 */

export const metadata: Metadata = { title: "montag. — Am Montag geht's los" };

export default function MontagPage() {
  return (
    <div className={s.page}>
      <Skin name="montag" />

      <nav className={s.nav}>
        <Link href="/v" className={s.mark}>montag.</Link>
        <div className={s.navLinks}>
          <Link href="/v">alle&nbsp;varianten</Link>
          <Link href="/termin">termin</Link>
        </div>
      </nav>

      <div className={s.wrap}>
        <div className={s.term} role="img" aria-label="Terminal: montag neu — Skizze, Zeitplan und Preis in Sekunden">
          <div className={s.termBar}>
            <span className={`${s.dot} ${s.dotR}`} />
            <span className={`${s.dot} ${s.dotY}`} />
            <span className={`${s.dot} ${s.dotG}`} />
            <span className={s.termTitle}>ihr-betrieb — montag</span>
          </div>
          <div className={s.termBody}>
            <div className={s.line}>
              <span className={s.prompt}>$&nbsp;</span>
              <span className={`${s.cmd} ${s.typing}`}>montag neu &quot;Angebote dauern bei uns 3 Stunden&quot;</span>
            </div>
            <div className={s.outputs}>
              <div className={s.line}><span className={s.ok}>✓</span><span className={s.out}> Lösungsskizze erstellt&nbsp;&nbsp;<span className={s.dim}>(5 Schritte, 3 automatisch)</span></span></div>
              <div className={s.line}><span className={s.ok}>✓</span><span className={s.out}> Zeitplan berechnet&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className={s.dim}>(Kick-off Mo., live in 4 Wochen)</span></span></div>
              <div className={s.line}><span className={s.ok}>✓</span><span className={s.out}> Preis geschätzt&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className={s.dim}>(fest, unverbindlich)</span></span></div>
              <div className={s.line}><span className={s.prompt}>$&nbsp;</span><span className={s.caret} /></div>
            </div>
          </div>
        </div>

        <h1 className={s.h1}>
          Individualsoftware, <em>gebaut wie Software</em> — nicht wie ein Projekt.
        </h1>
        <p className={s.sub}>
          Ein Entwickler mit Businessverständnis, KI-Agenten für die Fleißarbeit,
          vier Wochen bis zur Abnahme. Festpreis. Besteht die Abnahme nicht,
          zahlen Sie nichts.
        </p>

        <div className={s.diff}>
          <div className={s.diffHead}>$ diff klassisches-projekt vierwochen</div>
          <div className={s.del}>8–12 Beteiligte, sechs Übergaben, Kontextverlust</div>
          <div className={s.del}>Monate Laufzeit, Tagessätze, offenes Ende</div>
          <div className={s.del}>Rückfragen laufen die ganze Kette zurück</div>
          <div className={s.add}>Sie reden mit dem, der baut — eine Übergabe</div>
          <div className={s.add}>4 Wochen, Festpreis, Abnahme gegen Kriterien</div>
          <div className={s.add}>Code, Daten, Zugänge gehören Ihnen</div>
        </div>

        <ul className={s.log}>
          <li><span className={s.ver}>v0.1</span><span><b>Heute, 3 Minuten:</b> Fall unten im Dialog beschreiben — Skizze, Zeitplan, Preisschätzung kommen sofort.</span></li>
          <li><span className={s.ver}>v0.2</span><span><b>Diese Woche:</b> 30 Minuten Gespräch, kostenlos. Danach das Festangebot mit Abnahmetermin.</span></li>
          <li><span className={s.ver}>v0.9</span><span><b>Woche 1–4:</b> Bau am lebenden System, jede Woche sichtbar. Kurswechsel eingepreist.</span></li>
          <li><span className={s.ver}>v1.0</span><span><b>Ende Woche 4:</b> Abnahme. Besteht sie nicht, entfällt die zweite Rate — steht im Vertrag.</span></li>
        </ul>

        <div className={s.flags}>
          <span className={s.flag}>--festpreis</span>
          <span className={s.flag}>--gewaehrleistung=12m</span>
          <span className={s.flag}>--quellcode=ihrer</span>
          <span className={s.flag}>--lock-in=false</span>
          <span className={s.flag}>--start=montag</span>
        </div>

        <DialogCta className={s.ctaBtn} text="">Dialog starten →</DialogCta>
        <p className={s.ctaHint}>
          Oder unten in den Prompt tippen. Läuft komplett ohne E-Mail-Angabe —
          Sie sehen erst das Ergebnis.
        </p>

        <div className={s.foot}>
          <Link href="/impressum">impressum</Link>
          <Link href="/datenschutz">datenschutz</Link>
          <Link href="/it">fakten für ihre it</Link>
          <Link href="/v">← übersicht</Link>
        </div>
      </div>
    </div>
  );
}

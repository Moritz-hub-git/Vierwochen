import type { Metadata } from "next";
import Link from "next/link";
import DialogCta from "@/components/v/DialogCta";
import Skin from "@/components/v/Skin";
import RotatingWord from "./RotatingWord";
import Showcases from "./Showcases";
import { Cockpit, Schichtplan, Portal, Rechner, Protokoll, Lager } from "./Mockups";
import s from "./styles.module.css";

/**
 * Variante „neoapp.studio" — digitale Produkte, in vier Wochen live.
 *
 * Aufbau (überarbeitet 2026-08-15, Fold-Dramaturgie): Hauptzeile mit
 * wechselndem Adressaten → EIN Versprechen-Satz → EIN Knopf → stille
 * Faktenzeile → Showcases (im Fold angeschnitten, das lädt zum Scrollen
 * ein) → „In vier Wochen live." als große Aussage samt 2+AI-Methode und
 * den vier Schritten → Vertrag → Dialog. Der erste Bildschirm zeigt genau
 * eine Kaskade: was es ist → was es bringt → was zu tun ist.
 */

export const metadata: Metadata = {
  title: "neoapp.studio — Digitale Produkte, in vier Wochen live",
};

const AUDIENCES = [
  "Ihr Unternehmen",
  "Ihre Kunden",
  "Ihre Mitarbeiter",
  "Ihre Partner",
  "Ihre Organisation",
];

const SHOWCASES = [
  {
    visual: <Cockpit />,
    branch: "Maschinenbau · 38 Mitarbeitende",
    title: "Auftragscockpit",
    text: "Sechs Excel-Listen wurden eine Übersicht, die morgens um sieben stimmt — mit Liefertermin-Ampel für den Vertrieb.",
  },
  {
    visual: <Schichtplan />,
    branch: "Logistik · 120 Mitarbeitende",
    title: "Schichtplanung",
    text: "Zuruf und Zettel wurden ein Plan, den jeder auf dem Handy sieht. Wer tauschen will, tauscht — ohne Anruf im Büro.",
  },
  {
    visual: <Portal />,
    branch: "Großhandel · 65 Mitarbeitende",
    title: "Kundenportal",
    text: "Statt Postfach voller PDFs finden Kunden Preise, Bestellungen und Lieferscheine selbst — angebunden an die Warenwirtschaft.",
  },
  {
    visual: <Rechner />,
    branch: "Elektrotechnik · 24 Mitarbeitende",
    title: "Angebotsrechner",
    text: "Aus Erfahrungswerten im Kopf wurde eine Kalkulation, die jeder im Vertrieb bedienen kann — Angebot in Minuten statt Tagen.",
  },
  {
    visual: <Protokoll />,
    branch: "Anlagenbau · 51 Mitarbeitende",
    title: "Prüfprotokolle",
    text: "Die Monteure haken auf dem Telefon ab, das Protokoll ist fertig, bevor der Wagen vom Hof rollt. Kein Abtippen mehr.",
  },
  {
    visual: <Lager />,
    branch: "Handel · 30 Mitarbeitende",
    title: "Lager & Inventur",
    text: "Bestände in Echtzeit statt Stichtagszählung — inklusive Warnung, bevor ein Artikel tatsächlich ausgeht.",
  },
];

const METHOD = [
  {
    num: "01",
    title: "Verstehen",
    text: "Ein Gespräch über Ihren Ablauf, Ihre Begriffe, Ihren Engpass. Am Ende steht ein Angebot mit Festpreis und einem Abnahmetermin — als Datum, nicht als Aussicht.",
  },
  {
    num: "02",
    title: "Bauen",
    text: "Der, der mit Ihnen gesprochen hat, baut auch. AI übernimmt Tippen, Tests und die stumpfe Arbeit — die Entscheidungen trifft ein Mensch, der Ihr Geschäft verstanden hat.",
  },
  {
    num: "03",
    title: "Schärfen",
    text: "Jede Woche sehen Sie den Stand am lebenden System, nicht in einer Präsentation. Was Ihnen nicht passt, ändern wir — solange, bis es passt.",
  },
  {
    num: "04",
    title: "Übergeben",
    text: "Abnahme gegen vorher vereinbarte Kriterien. Quellcode, Daten, Zugänge und Dokumentation gehören Ihnen. Zwölf Monate Gewährleistung, kein Abo, kein Lock-in.",
  },
];

/** Status-Pille — weiß hinterlegt, grüner Punkt. Skaliert über die
 *  vererbte Schriftgröße automatisch mit ihrem Kontext (kleine Subline,
 *  große Versprechen-Zeile), ohne eigene Größenvarianten zu brauchen. */
function LivePill({ children = "live" }: { children?: React.ReactNode }) {
  return (
    <span className={s.livePill}>
      <i className={s.liveDot} aria-hidden />
      {children}
    </span>
  );
}

export default function FixfertigPage() {
  return (
    <div className={s.page}>
      <Skin name="fixfertig" />

      <nav className={s.nav}>
        <Link href="/v" className={s.mark}>
          neoapp<i>.studio</i>
        </Link>
        <div className={s.navLinks}>
          <a href="#showcases">Arbeiten</a>
          <a href="#methode">Methode</a>
          <Link href="/termin">Termin</Link>
        </div>
      </nav>

      <div className={s.wrap}>
        {/* ---------- Hero: EINE Kaskade — was es ist, was es bringt, was zu tun ist ---------- */}
        <header className={s.hero}>
          <h1 className={s.h1}>
            Wir bauen digitale Produkte,
            <br />
            die <RotatingWord words={AUDIENCES} /> begeistern.
          </h1>
          <p className={s.sub}>
            <LivePill>Live in vier Wochen</LivePill> — zum Festpreis.
          </p>
          <div className={s.heroCtas}>
            <DialogCta className={s.ctaBtn}>Preiseinschätzung erhalten</DialogCta>
          </div>
          {/* Reibungskiller direkt unter der Handlung: keine E-Mail, keine
              Verpflichtung — die Angst vor dem Klick ist die eigentliche
              Hürde, nicht das Interesse. */}
          <p className={s.heroFacts}>
            In 10 Sekunden <span aria-hidden>·</span> kostenlos &amp;
            unverbindlich <span aria-hidden>·</span> ohne E-Mail-Adresse
          </p>
          {/* Der Neugier-Haken: Wer „vier Wochen" liest, denkt „wie soll das
              gehen?" — genau diese Frage wird hier aufgegriffen und zur
              Methode geführt, statt sie unbeantwortet stehen zu lassen. */}
          <a href="#methode" className={s.heroHook}>
            Klingt zu schnell, um gut zu sein?{" "}
            <b>So funktioniert die 2+AI-Methode</b> <span aria-hidden>↓</span>
          </a>
        </header>

        {/* ---------- Showcases: folgen direkt auf den Hero und schneiden im
            sichtbaren Bereich an — das signalisiert „hier geht es weiter"
            von selbst, ganz ohne Scroll-Pfeil. ---------- */}
        <section id="showcases" className={s.showcases}>
          <div className={`${s.sectionHead} ${s.sectionHeadTight}`}>
            <span className={s.kicker}>Arbeiten</span>
            <h2 className={s.h2}>Was in vier Wochen entsteht</h2>
            <p className={s.sectionLead}>Zum Durchziehen — Beispiele aus dem Mittelstand.</p>
          </div>

          <Showcases items={SHOWCASES} />
        </section>

        {/* ---------- Versprechen + Methode: die große Aussage, jetzt als
            eigene Station nach den Showcases statt im Fold. ---------- */}
        <section id="methode" className={s.promise} aria-label="Das Versprechen">
          <h2 className={s.promiseLine}>
            In vier Wochen <LivePill />
          </h2>
          <p className={s.promiseSub}>
            Möglich macht das die <b>2+AI-Methode</b> — der Grund, warum hier
            vier Wochen reichen, wo sonst ein halbes Jahr vergeht.
          </p>

          <div className={s.formula}>
            <div className={s.formulaCard}>
              <span className={s.formulaNum}>1</span>
              <b>Sie</b>
              <span>
                Sie kennen den Ablauf und entscheiden. Kein Lastenheft, kein
                Umweg über eine Projektleitung.
              </span>
            </div>
            <span className={s.formulaSign} aria-hidden>
              +
            </span>
            <div className={s.formulaCard}>
              <span className={s.formulaNum}>1</span>
              <b>Der, der baut</b>
              <span>
                Ein Kopf für Gespräch, Entwurf und Code. Nichts geht bei einer
                Übergabe verloren, weil es keine gibt.
              </span>
            </div>
            <span className={s.formulaSign} aria-hidden>
              +
            </span>
            <div className={`${s.formulaCard} ${s.formulaAi}`}>
              <span className={s.formulaNum}>AI</span>
              <b>Die Maschine</b>
              <span>
                Tippen, Testen, Wiederholen — in Stunden statt Wochen. Werkzeug,
                nicht Ausrede.
              </span>
            </div>
          </div>

          <p className={s.formulaResult}>
            <span aria-hidden>=</span> Ein Team, das in vier Wochen liefert, was
            eine Kette aus sechs Übergaben in sechs Monaten nicht schafft.
          </p>
        </section>

        {/* ---------- Methode erklärt ---------- */}
        <section className={s.method}>
          <div className={s.sectionHead}>
            <span className={s.kicker}>Die 2+AI-Methode</span>
            <h2 className={s.h2}>Warum vier Wochen genügen</h2>
            <p className={s.sectionLead}>
              Das klassische Projekt verliert seine Zeit nicht am Code, sondern
              zwischen den Beteiligten: Ihr Problem wandert durch Vertrieb,
              Analyse, Konzept, Projektleitung und Team, bis jemand es tippt.
              Sechs Übergaben, sechs Gelegenheiten, etwas zu verlieren. Hier
              gibt es eine.
            </p>
          </div>

          <ol className={s.steps}>
            {METHOD.map((m) => (
              <li key={m.num}>
                <span className={s.stepNum} aria-hidden>
                  {m.num}
                </span>
                <b>{m.title}</b>
                <p>{m.text}</p>
              </li>
            ))}
          </ol>

          <div className={s.facts}>
            <div className={`${s.fact} ${s.factIndigo}`}>
              <span className={s.factLabel}>Lieferzeit</span>
              <span className={s.factBig}>4 Wochen</span>
              <p>Kick-off bis Abnahme. Der Termin steht im Angebot.</p>
            </div>
            <div className={s.fact}>
              <span className={s.factLabel}>Preis</span>
              <span className={s.factBig}>ab 9.500 €</span>
              <p>Fest. Keine Tagessätze, keine Nachträge.</p>
            </div>
            <div className={`${s.fact} ${s.factLime}`}>
              <span className={s.factLabel}>Wenn es nicht läuft</span>
              <span className={s.factBig}>0 €</span>
              <p>Besteht die Abnahme nicht, entfällt die zweite Hälfte.</p>
            </div>
            <div className={`${s.fact} ${s.factInk}`}>
              <span className={s.factLabel}>Eigentum</span>
              <span className={s.factBig}>100 % Ihres</span>
              <p>Code, Daten, Zugänge, Doku — ab dem ersten Tag.</p>
            </div>
          </div>
        </section>

        {/* ---------- Abschluss ---------- */}
        <section className={s.cta}>
          <h2 className={s.ctaTitle}>Erzählen Sie von Ihrem Dienstag.</h2>
          <p className={s.ctaLead}>
            Ein Satz über das, was heute Zeit kostet. Sie bekommen binnen
            Minuten eine Lösungsskizze, einen Zeitplan mit echtem Datum und eine
            Preisschätzung — kostenlos, ohne E-Mail-Adresse.
          </p>
          <DialogCta className={s.ctaBtn}>Jetzt Skizze holen</DialogCta>
          <p className={s.ctaHint}>
            Oder unten in die Leiste tippen. Dauert 60 Sekunden.
          </p>
        </section>

        <footer className={s.foot}>
          <Link href="/impressum">Impressum</Link>
          <Link href="/datenschutz">Datenschutz</Link>
          <Link href="/termin">Termin direkt buchen</Link>
          <Link href="/termin">Kontakt</Link>
        </footer>
      </div>
    </div>
  );
}

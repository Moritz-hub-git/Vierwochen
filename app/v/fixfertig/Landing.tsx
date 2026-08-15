import Link from "next/link";
import DialogCta from "@/components/v/DialogCta";
import Skin from "@/components/v/Skin";
import RotatingWord from "./RotatingWord";
import Showcases from "./Showcases";
import Timeline from "./Timeline";
import Benefits from "./Benefits";
import { Cockpit, Schichtplan, Portal, Rechner, Protokoll, Lager } from "./Mockups";
import { WegeVisual, FormelVisual, KernVisual, BentoVisual, PlanVisual } from "./MethodVisuals";
import { AfterWege, AfterFormel, AfterKern, AfterBento, AfterPlan } from "./AfterVisuals";
import FAQ from "./FAQ";
import s from "./styles.module.css";

/**
 * Gemeinsame neoapp.studio-Landing — in fünf Varianten, die sich in genau
 * zwei Dingen unterscheiden: dem Neugier-Haken unter dem Hero-Knopf und
 * der grafischen Darstellung der 2+AI-Methode. Alles andere (Hero,
 * Showcases, Zeitplan mit echten Daten, Leistungs-Bento, Abschluss) ist
 * identisch, damit der Vergleich fair bleibt.
 */

export type VariantKey = "wege" | "formel" | "kern" | "bento" | "plan";

const VARIANTS: Record<
  VariantKey,
  { hookQ: string; hookB: string; Visual: React.ComponentType; After: React.ComponentType }
> = {
  wege: {
    hookQ: "Sechs Übergaben oder eine.",
    hookB: "Sehen Sie, wo bei anderen die Monate bleiben",
    Visual: WegeVisual,
    After: AfterWege,
  },
  formel: {
    hookQ: "Wie das gehen soll?",
    hookB: "Die Rechnung: 1 + 1 + AI",
    Visual: FormelVisual,
    After: AfterFormel,
  },
  kern: {
    hookQ: "Kein Zauber —",
    hookB: "Businessverständnis und Code in einem Kopf",
    Visual: KernVisual,
    After: AfterKern,
  },
  bento: {
    hookQ: "Neugierig, wie das funktioniert?",
    hookB: "Die Methode auf einen Blick",
    Visual: BentoVisual,
    After: AfterBento,
  },
  plan: {
    hookQ: "Vier Wochen, Tag für Tag:",
    hookB: "der Bauplan mit echten Daten",
    Visual: PlanVisual,
    After: AfterPlan,
  },
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

/** Status-Pille — skaliert über die geerbte Schriftgröße mit ihrem Kontext. */
function LivePill({ children = "live" }: { children?: React.ReactNode }) {
  return (
    <span className={s.livePill}>
      <i className={s.liveDot} aria-hidden />
      {children}
    </span>
  );
}

export default function Landing({ variant }: { variant: VariantKey }) {
  const v = VARIANTS[variant];
  const Visual = v.Visual;

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
        {/* ---------- Hero ---------- */}
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
          <p className={s.heroFacts}>
            In 10 Sekunden <span aria-hidden>·</span> kostenlos &amp;
            unverbindlich <span aria-hidden>·</span> ohne E-Mail-Adresse
          </p>
          <a href="#methode" className={s.heroHook}>
            {v.hookQ} <b>{v.hookB}</b> <span aria-hidden>↓</span>
          </a>
        </header>

        {/* ---------- Showcases ---------- */}
        <section id="showcases" className={s.showcases}>
          <div className={`${s.sectionHead} ${s.sectionHeadTight}`}>
            <span className={s.kicker}>Arbeiten</span>
            <h2 className={s.h2}>Was in vier Wochen entsteht</h2>
            <p className={s.sectionLead}>Zum Durchziehen — Beispiele aus dem Mittelstand.</p>
          </div>
          <Showcases items={SHOWCASES} />
        </section>

        {/* ---------- Methode: große Aussage + variantenspezifische Grafik ---------- */}
        <section id="methode" className={s.promise} aria-label="Die 2+AI-Methode">
          <span className={s.kicker}>Die 2+AI-Methode</span>
          <h2 className={s.promiseLine}>
            In vier Wochen <LivePill />
          </h2>
          <p className={s.promiseSub}>
            AI macht möglich, was es so noch nicht gab: bauen, iterieren und
            veröffentlichen in Tagen. Und weil hier derselbe Kopf Ihr Geschäft
            versteht <em>und</em> den Code schreibt, geht zwischen Idee und
            Umsetzung nichts verloren — das Ergebnis ist nicht ungefähr
            richtig, sondern passgenau.
          </p>

          <div className={s.methodVisual}>
            <Visual />
          </div>

          {/* ---------- Zeitplan mit echten Daten ---------- */}
          <div className={s.timelineHead}>
            <span className={s.kicker}>Der Zeitplan</span>
            <h3 className={s.h3}>Start: nächster Montag. Kein Witz.</h3>
          </div>
          <Timeline />
        </section>

        {/* ---------- Und danach? Die zwei unterschätzten Argumente ---------- */}
        <section className={s.afterSection} aria-label="Nach den vier Wochen">
          <div className={s.sectionHead}>
            <span className={s.kicker}>Und danach?</span>
            <h2 className={s.h2}>Die vier Wochen sind der Anfang</h2>
            <p className={s.sectionLead}>
              Software ist nie fertig. Entscheidend ist, was eine Änderung
              <em> danach</em> kostet.
            </p>
          </div>
          <v.After />
        </section>

        {/* ---------- Leistungen als Bento ---------- */}
        <Benefits />

        {/* ---------- Einwände, ehrlich beantwortet ---------- */}
        <FAQ />

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
          <Link href="/v">Varianten</Link>
        </footer>
      </div>
    </div>
  );
}

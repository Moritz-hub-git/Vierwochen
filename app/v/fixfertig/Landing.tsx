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
 * Gemeinsame neoapp.studio-Landing — in fünf Varianten, die sich nur in
 * der grafischen Darstellung von Methode und Danach-Argument
 * unterscheiden. Der Hero trägt die drei Versprechen (Tempo, Qualität,
 * Risiko) als klickbare Chips; jede Ziel-Sektion wiederholt ihren Chip
 * als Echo — Versprechen oben, Einlösung unten.
 */

export type VariantKey = "wege" | "formel" | "kern" | "bento" | "plan";

const VARIANTS: Record<
  VariantKey,
  { Visual: React.ComponentType; After: React.ComponentType }
> = {
  wege: { Visual: WegeVisual, After: AfterWege },
  formel: { Visual: FormelVisual, After: AfterFormel },
  kern: { Visual: KernVisual, After: AfterKern },
  bento: { Visual: BentoVisual, After: AfterBento },
  plan: { Visual: PlanVisual, After: AfterPlan },
};

/**
 * Der Dreiklang — Tempo, Qualität, Preis (Entscheidung 2026-08-15).
 * Jeder Chip ist ein Anker: Ein Klick führt zu der Sektion, die ihn
 * einlöst; dort wiederholt ein kleines Echo denselben Chip. Der grüne
 * Live-Punkt gehört nur dem ersten — Maßarbeit trägt ein Lineal, der
 * Festpreis ein Preisschild.
 */
const PILLARS = [
  { icon: "live", text: "Live in 4 Wochen", href: "#zeitplan" },
  { icon: "fit", text: "Digitale Maßarbeit", href: "#methode" },
  { icon: "pay", text: "Festpreis ab 9.500 €", href: "#danach" },
] as const;

function PillarIcon({ kind }: { kind: "live" | "fit" | "pay" }) {
  if (kind === "live") {
    return <i className={`${s.pDot} ${s.pDot_live}`} aria-hidden />;
  }
  if (kind === "fit") {
    // Lineal mit Teilstrichen — Maßarbeit
    return (
      <svg className={`${s.pIcon} ${s.pIcon_fit}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <rect x="2.5" y="8.5" width="19" height="7" rx="1.8" />
        <path d="M7 8.5v3.2M11.5 8.5v3.2M16 8.5v3.2" />
      </svg>
    );
  }
  // Preisschild — Festpreis
  return (
    <svg className={`${s.pIcon} ${s.pIcon_pay}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M20.6 13.4 12 22 2 12V4a2 2 0 0 1 2-2h8l8.6 8.6a2 2 0 0 1 0 2.8Z" />
      <circle cx="7.5" cy="7.5" r="1.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function PillarEcho({ n }: { n: 0 | 1 | 2 }) {
  const p = PILLARS[n];
  return (
    <span className={`${s.pillar} ${s.pillarEcho}`}>
      <PillarIcon kind={p.icon} />
      {p.text}
    </span>
  );
}

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
          {/* Drei Versprechen statt einer Subline: Tempo, Qualität, Risiko.
              Klickbar — jeder Chip springt zu der Sektion, die ihn einlöst. */}
          <nav className={s.pillars} aria-label="Unsere drei Versprechen">
            {PILLARS.map((p) => (
              <a key={p.href} href={p.href} className={s.pillar}>
                <PillarIcon kind={p.icon} />
                {p.text}
              </a>
            ))}
          </nav>
          <a href="#methode" className={s.methodLink}>
            Wie geht das? <b>Die 2+AI-Methode</b> <span aria-hidden>↓</span>
          </a>
          <div className={s.heroCtas}>
            <DialogCta className={s.ctaBtn}>Preiseinschätzung erhalten</DialogCta>
          </div>
          <p className={s.heroFacts}>
            In 10 Sekunden <span aria-hidden>·</span> unverbindlich{" "}
            <span aria-hidden>·</span> ohne E-Mail-Adresse
          </p>
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
          <PillarEcho n={1} />
          <span className={s.kicker}>Die 2+AI-Methode</span>
          <h2 className={s.promiseLine}>
            In vier Wochen <LivePill />
          </h2>
          <p className={s.promiseSub}>
            AI hat das Bauen schnell gemacht. Der Engpass ist heute, zu
            wissen, <em>was</em> man baut — hier entscheidet das einer, der
            Ihr Geschäft versteht, aus vielen Produkten weiß, was wirklich
            benutzt wird, und den Code selbst schreibt. Ohne Verlust,
            passgenau.
          </p>

          <div className={s.methodVisual}>
            <Visual />
          </div>

          {/* ---------- Zeitplan mit echten Daten ---------- */}
          <div id="zeitplan" className={s.timelineHead}>
            <PillarEcho n={0} />
            <span className={s.kicker}>Der Zeitplan</span>
            <h3 className={s.h3}>Start: nächster Montag. Kein Witz.</h3>
          </div>
          <Timeline />
        </section>

        {/* ---------- Und danach? Wirtschaftlichkeit + die Preis-Einlösung ---------- */}
        <section id="danach" className={s.afterSection} aria-label="Nach den vier Wochen">
          <div className={s.sectionHead}>
            <PillarEcho n={2} />
            <span className={s.kicker}>Und danach?</span>
            <h2 className={s.h2}>Die vier Wochen sind der Anfang</h2>
            <p className={s.sectionLead}>
              Software ist nie fertig. Entscheidend ist, was eine Änderung
              <em> danach</em> kostet.
            </p>
            {/* Der Anker-Bruch: die belegbare Marktrechnung (Senior-Tagessätze
                800–1.200 €), durchgestrichen — daneben der Festpreis. */}
            <p className={s.priceBreak}>
              <s>16.000–24.000 € — vier Wochen Senior-Entwicklung am Markt</s>{" "}
              <b>Festpreis ab 9.500&nbsp;€</b>
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

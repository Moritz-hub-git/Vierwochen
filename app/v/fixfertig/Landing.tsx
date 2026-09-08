import Link from "next/link";
import DialogCta from "@/components/v/DialogCta";
import Skin from "@/components/v/Skin";
import { ACCEPTANCE_PROMISE, PRICE, RETAINER, SITE, WARRANTY_MONTHS } from "@/lib/config";
import Showcases from "./Showcases";
import Timeline from "./Timeline";
import Benefits from "./Benefits";
import { Cockpit, Schichtplan, Portal, Rechner, Protokoll, Lager, Buchung } from "./Mockups";
import { WegeVisual, FormelVisual, KernVisual, BentoVisual, PlanVisual } from "./MethodVisuals";
import { AfterWege, AfterFormel, AfterKern, AfterBento, AfterPlan } from "./AfterVisuals";
import FAQ from "./FAQ";
import s from "./styles.module.css";

/**
 * Die Landing von vierwochen — in fünf Varianten, die sich nur in der
 * grafischen Darstellung von Methode und Danach-Argument unterscheiden.
 *
 * Nach dem Vollreview (2026-09-08; 5 Gutachten, 6 Personas, 6 Audits) gilt:
 * Alles, was die Seite behauptet, muss belegbar sein. Deshalb steht der
 * Mensch, der baut, oben mit Namen; die Beispiele heißen Beispiele; der
 * Preis hat keinen Streichanker mehr; und die eine Risiko-Umkehr-Zusage
 * kommt aus lib/config.ts und steht überall wortgleich.
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

const euro = (n: number) => n.toLocaleString("de-DE") + " €";

/**
 * Der Dreiklang unter der Hauptzeile — jetzt drei Zusagen, die die Seite
 * einlösen kann: Preis, Risiko-Umkehr, Eigentum. Jeder Chip ist ein Anker
 * zu der Sektion, die ihn belegt; dort wiederholt ein Echo denselben Chip.
 * „Live in vier Wochen" steht in der Hauptzeile selbst und wird nicht
 * doppelt versprochen.
 */
const PILLARS = [
  { icon: "pay", text: `Festpreis ab ${euro(PRICE.floor)}`, href: "#danach" },
  { icon: "check", text: "Zweite Rate erst nach Abnahme", href: "#garantie" },
  { icon: "head", text: "Ein fester Ansprechpartner", href: "#methode" },
] as const;

type PillarKind = (typeof PILLARS)[number]["icon"];

function PillarIcon({ kind }: { kind: PillarKind }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  if (kind === "pay") {
    // Preisschild
    return (
      <svg className={`${s.pIcon} ${s.pIcon_pay}`} {...common}>
        <path d="M20.6 13.4 12 22 2 12V4a2 2 0 0 1 2-2h8l8.6 8.6a2 2 0 0 1 0 2.8Z" />
        <circle cx="7.5" cy="7.5" r="1.6" fill="currentColor" stroke="none" />
      </svg>
    );
  }
  if (kind === "check") {
    // Schild mit Haken — Abnahme
    return (
      <svg className={`${s.pIcon} ${s.pIcon_check}`} {...common}>
        <path d="M12 2 4 5.5V11c0 5 3.4 9.3 8 11 4.6-1.7 8-6 8-11V5.5L12 2Z" />
        <path d="m8.8 11.8 2.3 2.3 4.2-4.6" />
      </svg>
    );
  }
  // Ein Kopf
  return (
    <svg className={`${s.pIcon} ${s.pIcon_head}`} {...common}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" />
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

/**
 * Beispiele — keine Referenzen. Die Karten zeigen, was in vier Wochen
 * typischerweise entsteht (Präsens, ohne erfundene Firmen oder
 * Mitarbeiterzahlen). Die erste Karte ist das einzige echte Projekt, das
 * heute belegbar ist: diese Website samt KI-Dialog und Buchung. Sobald
 * die ersten Kundenprojekte freigegeben sind, ersetzen sie die Beispiele.
 */
const SHOWCASES = [
  {
    visual: <SiteMock />,
    badge: "Echtes Projekt",
    branch: "Echtes Projekt · diese Website",
    title: "Landing, KI-Dialog, Buchung",
    text: "Mit derselben Methode gebaut, die hier beschrieben wird: Seite, KI-Berater mit Preisherleitung, Terminbuchung mit Kalender — alles Individualsoftware, alles in Betrieb.",
  },
  {
    visual: <Cockpit />,
    branch: "Beispiel · Internes Werkzeug",
    title: "Auftragscockpit",
    text: "Aus sechs Excel-Listen wird eine Übersicht, die morgens um sieben stimmt — mit Liefertermin-Ampel für den Vertrieb.",
  },
  {
    visual: <Schichtplan />,
    branch: "Beispiel · Mobile Web-App",
    title: "Schichtplanung",
    text: "Aus Zuruf und Zettel wird ein Plan, den jeder auf dem Handy sieht. Wer tauschen will, tauscht — ohne Anruf im Büro.",
  },
  {
    visual: <Portal />,
    branch: "Beispiel · Kundenportal",
    title: "Kundenportal",
    text: "Statt Postfach voller PDFs finden Kunden Preise, Bestellungen und Lieferscheine selbst — angebunden an die Warenwirtschaft.",
  },
  {
    visual: <Rechner />,
    branch: "Beispiel · Internes Werkzeug",
    title: "Angebotsrechner",
    text: "Aus Erfahrungswerten im Kopf wird eine Kalkulation, die jeder im Vertrieb bedienen kann — Angebot in Minuten statt Tagen.",
  },
  {
    visual: <Protokoll />,
    branch: "Beispiel · Mobile Web-App, offline",
    title: "Prüfprotokolle",
    text: "Die Monteure haken auf dem Telefon ab, das Protokoll ist fertig, bevor der Wagen vom Hof rollt. Kein Abtippen mehr.",
  },
  {
    visual: <Lager />,
    branch: "Beispiel · Internes Werkzeug",
    title: "Lager & Inventur",
    text: "Bestände in Echtzeit statt Stichtagszählung — inklusive Warnung, bevor ein Artikel tatsächlich ausgeht.",
  },
  {
    visual: <Buchung />,
    branch: "Beispiel · Erste Version eines Produkts",
    title: "Buchungsportal für Praxen",
    text: "Für Gründer: Version 1 mit Anmeldung, getrennten Mandanten und Abo-Abrechnung — verkaufbar an die ersten Kunden, bevor Sie ein Team finanzieren.",
  },
];

/** Mockup für das einzige echte Projekt: diese Seite selbst. */
function SiteMock() {
  return (
    <div className={s.frame}>
      <div className={s.frameBar} aria-hidden>
        <i />
        <i />
        <i />
      </div>
      <svg viewBox="0 0 400 250" className={s.mock} role="img" aria-label="Skizze dieser Website: Kopfzeile, große Überschrift, Dialogleiste">
        <rect x="16" y="16" width="70" height="10" rx="5" fill="#181a33" />
        <rect x="300" y="16" width="84" height="8" rx="4" fill="#6a6d8c" opacity="0.4" />
        <rect x="60" y="56" width="280" height="22" rx="8" fill="#181a33" />
        <rect x="90" y="86" width="220" height="22" rx="8" fill="#181a33" opacity="0.85" />
        <rect x="70" y="124" width="76" height="18" rx="9" fill="#ffffff" stroke="#e4e1fd" />
        <rect x="162" y="124" width="76" height="18" rx="9" fill="#ffffff" stroke="#e4e1fd" />
        <rect x="254" y="124" width="76" height="18" rx="9" fill="#ffffff" stroke="#e4e1fd" />
        <rect x="140" y="160" width="120" height="24" rx="12" fill="#4f46e5" />
        <rect x="40" y="206" width="320" height="26" rx="13" fill="#ffffff" stroke="#c7c4f6" />
        <rect x="54" y="216" width="150" height="6" rx="3" fill="#6a6d8c" opacity="0.35" />
        <circle cx="343" cy="219" r="9" fill="#4f46e5" />
      </svg>
    </div>
  );
}

/** Status-Pille — skaliert über die geerbte Schriftgröße mit ihrem Kontext. */
function LivePill({ children = "live" }: { children?: React.ReactNode }) {
  return (
    <span className={s.livePill}>
      <i className={s.liveDot} aria-hidden />
      {children}
    </span>
  );
}

/** Foto oder Initialen — bis das echte Foto da ist, ehrlich als Initialen. */
function Avatar({ size = "small" }: { size?: "small" | "large" }) {
  const cls = size === "large" ? `${s.avatar} ${s.avatarLarge}` : s.avatar;
  if (SITE.founder.photo) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img className={cls} src={SITE.founder.photo} alt={SITE.founder.name} />;
  }
  return (
    <span className={cls} aria-hidden>
      {SITE.founder.initials}
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
        <Link href="/" className={s.mark} aria-label={`${SITE.name} — Startseite`}>
          {SITE.markA}
          <i>.</i>
          {SITE.markB}
        </Link>
        <div className={s.navLinks}>
          <a href="#beispiele">Beispiele</a>
          <a href="#methode">Methode</a>
          <Link href="/termin">Termin</Link>
        </div>
      </nav>

      <div className={s.wrap}>
        {/* ---------- Hero ---------- */}
        <header className={s.hero} id="start">
          {/* Kundenversprechen statt Anbieter-Satz: Ergebnis, Zeit, Risiko —
              in dieser Reihenfolge, ohne rotierendes Wort (las sich
              schneller, als man lesen kann). */}
          <h1 className={s.h1}>
            Ihre Software.
            <br />
            In vier Wochen live.
          </h1>
          <p className={s.sub}>
            Zum Festpreis, mit Abnahme. {ACCEPTANCE_PROMISE}
          </p>
          <nav className={s.pillars} aria-label="Unsere drei Zusagen">
            {PILLARS.map((p) => (
              <a key={p.href} href={p.href} className={s.pillar}>
                <PillarIcon kind={p.icon} />
                {p.text}
              </a>
            ))}
          </nav>

          {/* Wer baut — sichtbar vor dem ersten Klick, nicht erst im Formular. */}
          <a href="#wer" className={s.founderStrip}>
            <Avatar />
            <span>
              <b>{SITE.founder.name}</b> verantwortet Ihr Projekt persönlich — von der ersten Frage bis zur Abnahme.
              <span className={s.founderMore}>Wer ist das? ↓</span>
            </span>
          </a>

          <div className={s.heroCtas}>
            <DialogCta className={s.ctaBtn}>Preiseinschätzung erhalten</DialogCta>
          </div>
          <p className={s.heroFacts}>
            Meist 3 Fragen <span aria-hidden>·</span> eine Minute{" "}
            <span aria-hidden>·</span> ohne E-Mail-Adresse
          </p>
          <p className={s.heroAlt}>
            Lieber direkt sprechen? <Link href="/termin">Termin wählen</Link>
            {SITE.email && (
              <>
                {" "}
                <span aria-hidden>·</span> <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              </>
            )}
          </p>
        </header>

        {/* ---------- Beispiele ---------- */}
        <section id="beispiele" className={s.showcases}>
          <div className={`${s.sectionHead} ${s.sectionHeadTight}`}>
            <span className={s.kicker}>Beispiele</span>
            <h2 className={s.h2}>Was in vier Wochen entstehen kann</h2>
            <p className={s.sectionLead}>
              Ein echtes Projekt und sieben typische Zuschnitte — keine
              Kundenreferenzen. Die kommen, sobald die ersten Kunden sie
              freigeben.
            </p>
          </div>
          <div className={s.showcasesBleed}>
            <Showcases items={SHOWCASES} />
          </div>
        </section>

        {/* ---------- Methode ---------- */}
        <section id="methode" className={s.promise} aria-label="Verstehen und bauen in einer Hand: die Methode">
          <PillarEcho n={2} />
          <span className={s.kicker}>Verstehen und bauen in einer Hand</span>
          <h2 className={s.promiseLine}>
            In vier Wochen <LivePill />
          </h2>
          <p className={s.promiseSub}>
            AI hat das Bauen schnell gemacht. Der Engpass ist heute, zu
            wissen, <em>was</em> man baut — hier entscheidet das einer, der
            Ihr Geschäft versteht, aus eigenen Produkten weiß, was wirklich
            benutzt wird, und den Code selbst schreibt. Nichts geht auf dem
            Weg von Ihnen zum Code verloren.
          </p>

          <div className={s.methodVisual}>
            <Visual />
          </div>

          {/* ---------- Zeitplan mit echten Daten ---------- */}
          <div id="zeitplan" className={s.timelineHead}>
            <span className={s.kicker}>Der Zeitplan</span>
            <h3 className={s.h3}>Start: frühestens Montag in zwei Wochen.</h3>
            <p className={s.timelineSub}>
              Gespräch diese Woche, Festangebot danach, dann geht es los —
              mit echten Daten:
            </p>
          </div>
          <Timeline />
        </section>

        {/* ---------- Und danach? Preis + Betrieb ---------- */}
        <section id="danach" className={s.afterSection} aria-label="Nach den vier Wochen">
          <div className={s.sectionHead}>
            <PillarEcho n={0} />
            <span className={s.kicker}>Und danach?</span>
            <h2 className={s.h2}>Die vier Wochen sind der Anfang</h2>
            <p className={s.sectionLead}>
              Software ist nie fertig. Entscheidend ist, was eine Änderung
              <em> danach</em> kostet.
            </p>
            {/* Kein Streichpreis mehr: Der Vergleich mit einem Preis, den nie
                jemand verlangt hat, hielt der ersten Preisschätzung nicht
                stand. Stattdessen die zwei Zahlen, die der Kunde braucht. */}
            <p className={s.priceLine}>
              <b>Festpreis ab {euro(PRICE.floor)}</b>
              <span>{PRICE.vatNote} · 50 % bei Auftrag, 50 % nach Abnahme</span>
              <span aria-hidden>·</span>
              <b>
                {RETAINER.basic.name} ab {euro(RETAINER.basic.monthly)}/Monat
              </b>
              <span>{RETAINER.notice}</span>
            </p>
          </div>
          <v.After />
        </section>

        {/* ---------- Leistungen als Bento ---------- */}
        <Benefits echo={<PillarEcho n={1} />} />

        {/* ---------- Wer baut ---------- */}
        <section id="wer" className={s.who} aria-label="Wer baut">
          <div className={s.whoCard}>
            <Avatar size="large" />
            <div className={s.whoText}>
              <span className={s.kicker}>Wer baut</span>
              <h2 className={s.whoName}>{SITE.founder.name}</h2>
              <p className={s.whoRole}>{SITE.founder.role}</p>
              <ul className={s.whoFacts}>
                {SITE.founder.facts.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <p className={s.whoHonest}>
                Ihr Projekt hat einen Verantwortlichen, und das bin ich: Ich
                führe das Gespräch, ich schneide den Umfang zu, ich stehe für das
                Ergebnis gerade — gebaut wird mit AI als Bausystem, bei größeren
                Vorhaben mit Partnern, die ich selbst ausgewählt habe. Was sich
                nie ändert: eine Nummer, eine Verantwortung, keine
                Übergabekette. Damit Sie trotzdem nicht an uns gekettet sind:
                gängige Technik, die jeder Entwickler kennt, alles dokumentiert,
                Code und Zugänge gehören Ihnen ab Tag 1. Die {WARRANTY_MONTHS}{" "}
                Monate Gewährleistung gelten auf den abgenommenen Stand — auch
                wenn später jemand anderes weiterbaut, solange der Fehler nicht
                daher kommt.
              </p>
              <p className={s.whoLimits}>
                <b>Was wir nicht bauen:</b> sicherheitskritische Steuerungen,
                Medizinprodukte mit Zulassung, komplette ERP-Ablösungen. Und wir
                sagen es, wenn fertige Software im Abo für Sie die bessere Wahl
                ist.
              </p>
              {SITE.founder.linkedin && (
                <a className={s.whoLink} href={SITE.founder.linkedin} rel="me noopener" target="_blank">
                  LinkedIn-Profil ↗
                </a>
              )}
            </div>
          </div>
        </section>

        {/* ---------- Einwände, ehrlich beantwortet ---------- */}
        <FAQ />

        {/* ---------- Abschluss ---------- */}
        <section className={s.cta}>
          <h2 className={s.ctaTitle}>Erzählen Sie von Ihrem Dienstag.</h2>
          <p className={s.ctaLead}>
            Ein Satz über das, was heute Zeit kostet. Sie bekommen in einer
            Minute eine Skizze, einen Zeitplan mit echtem Datum und einen
            Richtpreis mit Herleitung — ohne E-Mail-Adresse.
          </p>
          <DialogCta className={s.ctaBtn}>Jetzt Skizze holen</DialogCta>
          <p className={s.ctaHint}>
            Oder unten in die Leiste tippen. Meist 3 Fragen, eine Minute.
          </p>
        </section>

        <footer className={s.foot}>
          <Link href="/impressum">Impressum</Link>
          <Link href="/datenschutz">Datenschutz</Link>
          <Link href="/agb">AGB</Link>
          <Link href="/it">Fakten für Ihre IT</Link>
          <Link href="/termin">Termin direkt buchen</Link>
        </footer>
      </div>
    </div>
  );
}

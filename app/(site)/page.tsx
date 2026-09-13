import type { Metadata } from "next";
import Link from "next/link";
import LandingProduct from "@/components/site/LandingProduct";
import { Arrow, Check } from "@/components/site/Icons";
import { SITE } from "@/lib/config";
import s from "./home.module.css";

export const metadata: Metadata = {
  title: { absolute: `${SITE.name} — ${SITE.claim}` },
  description:
    "Opsrid übernimmt wiederkehrende Prozessarbeit und baut dafür eine individuelle Geschäftsanwendung.",
  alternates: { canonical: "/" },
};

const principles = [
  {
    number: "01",
    title: "Prozess verstehen",
    text: "Ablauf, Daten, Regeln und Ausnahmen werden gemeinsam präzise abgegrenzt.",
  },
  {
    number: "02",
    title: "Anwendung bauen",
    text: "Aus dem Prozess entsteht eine hochwertige Softwareoberfläche für den Arbeitsalltag.",
  },
  {
    number: "03",
    title: "Arbeit übernehmen",
    text: "Standardfälle laufen durch. Entscheidungen bleiben nachvollziehbar bei Ihrem Team.",
  },
] as const;

export default function Home() {
  return (
    <main id="main" className={s.page}>
      <section className={s.hero}>
        <div className={s.glow} aria-hidden="true" />
        <div className={s.heroInner}>
          <p className={s.kicker}>INDIVIDUELLE PROZESSSOFTWARE</p>
          <h1>
            Work <span>eliminated.</span>
          </h1>
          <p className={s.lead}>
            Geben Sie uns Ihren Prozess. Wir bauen die Anwendung, die ihn
            erledigt.
          </p>
          <div className={s.actions}>
            <Link href="/prozess-check" className={s.primaryAction}>
              Prozess beschreiben <Arrow />
            </Link>
            <a href="#beispiel" className={s.secondaryAction}>
              Anwendung ansehen <span aria-hidden="true">↓</span>
            </a>
          </div>
          <p className={s.microcopy}>
            Bis zu drei kurze Fragen · Vorschau ohne E-Mail-Adresse
          </p>
          <div className={s.promiseRow} aria-label="Grundprinzipien">
            <span><Check /> Für Ihren Prozess gebaut</span>
            <span><Check /> Ihre Systeme bleiben</span>
            <span><Check /> Klare menschliche Freigaben</span>
          </div>
        </div>
      </section>

      <LandingProduct />

      <section className={s.method} id="vorgehen">
        <div className={s.sectionHeading}>
          <div>
            <p className={s.kicker}>VOM ABLAUF ZUR ANWENDUNG</p>
            <h2>Für Ihren Prozess gebaut.</h2>
          </div>
          <p>
            Eine klare, bedienbare Software statt weiterer Handarbeit zwischen
            Ihren bestehenden Systemen.
          </p>
        </div>
        <div className={s.principles}>
          {principles.map((item) => (
            <article key={item.number}>
              <span>{item.number}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={s.close}>
        <div>
          <p className={s.kicker}>IHR PROZESS IST DER ANFANG</p>
          <h2>Welche Arbeit soll als Nächstes verschwinden?</h2>
          <p>
            Ein Satz genügt. Im Dialog entsteht daraus ein vorläufiger
            Lösungsentwurf und anschließend ein direkt buchbarer Termin.
          </p>
          <Link href="/prozess-check" className={s.primaryAction}>
            Lösungsentwurf starten <Arrow />
          </Link>
        </div>
      </section>
    </main>
  );
}

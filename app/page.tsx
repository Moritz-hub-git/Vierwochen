import Link from "next/link";
import CompareGrid from "@/components/sections/Compare";
import CtaButton from "@/components/sections/CtaButton";
import Hero from "@/components/sections/Hero";
import { PRICE_DISCLAIMER, PRICING_TIERS } from "@/lib/config";

/**
 * Neukonzeption 2026-08-14: Die Seite ist als Dramaturgie entlang der inneren
 * Fragen eines B2B-Käufers gebaut, nicht als Feature-Liste.
 *
 *   Hero      — das Angebot, mit der Risiko-Umkehr als Kopfzeile. Sie wirft
 *               die Frage auf, die alles Weitere antreibt: Wie geht das?
 *   §1        — „Wie können Sie das versprechen?"  → Mechanismus + Vergleich
 *   §2        — „Ist das etwas für uns?"           → Einsatzfälle
 *   §3        — „Rechnet sich das?"                → Preise + Kostenanker
 *   §4        — „Und was, wenn es schiefgeht?"     → Zweifel + Vertragskarte
 *   §5        — „Wer garantiert mir das?"          → Belege + Person
 *   §6        — „Wie fange ich an?"                → Weg + Abschluss-CTA
 *
 * Jede Überschrift ist die Frage, die der Leser sich an dieser Stelle ohnehin
 * stellt — die Seite führt das Verkaufsgespräch, das er sonst allein führt
 * (Gartner: Käufer verbringen ~5 % der Kaufzeit mit einem Anbieter).
 */

const delay = (s: number) => ({ "--reveal-delay": `${s}s` } as React.CSSProperties);

/* ---------- §1 Mechanismus ---------- */

function Mechanism() {
  const points = [
    {
      title: "Die KI tippt — entschieden wird hier",
      text: "Architektur, Standards und jede Prüfung kommen von einem Menschen, der Ihr Geschäft verstanden hat. Die KI übernimmt das, was Projekte sonst teuer macht: die Fleißarbeit.",
    },
    {
      title: "Der Umfang steht vorher schriftlich",
      text: "Vier Wochen sind kein Sprint ins Ungewisse, sondern ein Plan mit Abnahmekriterien. Was gebaut wird, ist vereinbart, bevor die erste Zeile entsteht.",
    },
    {
      title: "Schlechter Code wäre mein Problem",
      text: "Automatisierte Tests, Dokumentation und Code, den jede Entwicklerin weiterpflegen kann, sind Vertragsbestandteil — dazu 12 Monate Gewährleistung. Pfusch würde mich treffen, nicht Sie.",
    },
  ];
  return (
    <section className="section" id="unterschied">
      <div className="container">
        <div className="section-head" data-reveal>
          <span className="eyebrow">§1 · Der Mechanismus</span>
          <h2 className="section-title">„Wie können Sie das versprechen?"</h2>
          <p className="section-lead">
            Weil hier niemand mehr zwischen Ihnen und dem Code steht. Das
            klassische Projekt ist eine Telefonkette — agentisches Coding
            streicht sie.
          </p>
        </div>

        <CompareGrid />

        <div className="mech-row">
          {points.map((p, i) => (
            <div className="card" key={p.title} data-reveal style={delay(i * 0.07)}>
              <h3 className="mech-title">{p.title}</h3>
              <p className="mech-text">{p.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- §2 Einsatzfälle ---------- */

function UseCases() {
  const cases = [
    {
      quote: "Unser ganzes Lager lebt in einer Excel-Datei, die nur eine Kollegin versteht.",
      solution:
        "Aus der Excel wird eine kleine Anwendung: Datenbank, Zugriffsrechte, Änderungshistorie. Der Export nach Excel bleibt — für alle, die dort weiterarbeiten wollen.",
    },
    {
      quote: "Im Sammelpostfach gehen Bestellungen unter, und keiner weiß, wer dran ist.",
      solution:
        "Eingehende Mails werden automatisch gelesen, zugeordnet und als Vorgang angelegt — mit klarer Zuständigkeit und einem prüfenden Blick, bevor etwas rausgeht.",
    },
    {
      quote: "Fürs Monatsreporting kopiere ich drei Tage lang Zahlen aus fünf Systemen zusammen.",
      solution:
        "Die Quellen werden angebunden, der Bericht baut sich selbst. Sie prüfen und entscheiden, statt zu kopieren.",
    },
  ];
  return (
    <section className="section" id="einsatz">
      <div className="container">
        <div className="section-head" data-reveal>
          <span className="eyebrow">§2 · Einsatzfälle</span>
          <h2 className="section-title">„Ist das etwas für uns?"</h2>
          <p className="section-lead">
            Drei Sätze, die ich ständig höre. Wenn einer davon auch bei Ihnen
            fällt: ja.
          </p>
        </div>
        <div className="grid-3">
          {cases.map((c, i) => (
            <article className="card hoverable" key={i} data-reveal style={delay(i * 0.08)}>
              <p className="usecase-quote">{c.quote}</p>
              <p className="usecase-solution">
                <strong>Die Lösung: </strong>
                {c.solution}
              </p>
            </article>
          ))}
        </div>
        <p className="section-after" data-reveal>
          Ihr Fall klingt anders? Beschreiben Sie ihn unten im Dialog — die
          Einschätzung sagt Ihnen in drei Minuten, ob er trägt.
        </p>
      </div>
    </section>
  );
}

/* ---------- §3 Wirtschaftlichkeit ---------- */

function Pricing() {
  return (
    <section className="section" id="preise" style={{ paddingTop: 0 }}>
      <div className="container">
        <div className="section-head" data-reveal>
          <span className="eyebrow">§3 · Wirtschaftlichkeit</span>
          <h2 className="section-title">„Rechnet sich das?"</h2>
          <p className="section-lead">
            Zur Einordnung: Eine einzige Sachbearbeitungsstelle kostet
            45.000–60.000&nbsp;€ — pro Jahr, jedes Jahr. Software, die diese
            Arbeit übernimmt, kostet einmal. Und keine Sorge vor den großen
            Zahlen: Die meisten Erstprojekte starten als Pilot.
          </p>
        </div>
        {/* Preisanker: die teuerste Stufe steht bewusst zuerst (PROMPT.md §2.4).
            Damit der Anker Kleinbetriebe nicht verscheucht, trägt der Pilot
            eine sichtbare Einstiegsmarke. */}
        <div className="price-cards">
          {PRICING_TIERS.map((tier, i) => (
            <article
              className={`card price-card${tier.id === "pilot" ? " featured" : ""}`}
              key={tier.id}
              data-reveal
              style={delay(i * 0.08)}
            >
              {tier.id === "pilot" && (
                <span className="price-badge">Der häufigste Einstieg</span>
              )}
              <span className="tier">{tier.name}</span>
              <span className="amount">{tier.range}</span>
              <p>{tier.description}</p>
            </article>
          ))}
        </div>
        <p className="anchor-line" data-reveal>
          Welche Stufe Ihr Fall ist — und ein konkreter Schätzpreis — kommt aus
          der Einschätzung unten, in wenigen Minuten.
        </p>
        <div className="price-note" data-reveal>
          <span>{PRICE_DISCLAIMER}</span>
          <span>Zahlung 50 % bei Auftrag, 50 % nach Abnahme.</span>
        </div>
      </div>
    </section>
  );
}

/* ---------- §4 Zweifel + Vertrag ---------- */

function Doubts() {
  const objections: { q: string; risk: string; a: React.ReactNode }[] = [
    {
      q: "„Vier Wochen? Das glaube ich erst, wenn ich es sehe.“",
      risk: "Berechtigt — die meisten IT-Projekte reißen Termine, und niemand haftet dafür.",
      a: "Deshalb liegt das Risiko bei mir: Der Umfang wird vorher schriftlich fixiert, abgenommen wird gegen diese Kriterien, und läuft es nach vier Wochen nicht, zahlen Sie nichts. Das steht im Vertrag, nicht in der Werbung.",
    },
    {
      q: "„Von KI geschriebener Code — kann das gut sein?“",
      risk: "Berechtigt — blind übernommener KI-Code ist der neue technische Schuldenberg.",
      a: "Die KI tippt, aber sie entscheidet nicht: Architektur, Standards und jede Prüfung kommen von mir. Automatisierte Tests, Dokumentation und Code, den jeder Entwickler weiterpflegen kann, sind Vertragsbestandteil. Und weil ich 12 Monate Gewährleistung gebe, wäre schlechter Code zuerst mein Problem — nicht Ihres.",
    },
    {
      q: "„Dann hängen wir an einer einzigen Person.“",
      risk: "Das Risiko ist real — bei jeder kleinen Agentur und jedem Freelancer.",
      a: "Darum gehören Code, Daten und Zugänge vom ersten Tag an Ihnen, dokumentiert und übergabefähig. Der Beleg, dass das funktioniert: Ein von mir gebautes Werkzeug läuft nach dem Wechsel des Erbauers unverändert weiter.",
    },
    {
      q: "„Und wer kümmert sich nach den vier Wochen darum?“",
      risk: "Die richtige Frage — der wahre Preis von Software zeigt sich oft erst im Betrieb.",
      a: "Drei Wege, Sie wählen: Fehler im vereinbarten Umfang behebe ich 12 Monate lang kostenfrei. Auf Wunsch betreibe und pflege ich die Anwendung weiter — monatlich kündbar. Oder Ihre IT übernimmt: Code, Daten, Zugänge und Dokumentation gehören ohnehin Ihnen.",
    },
    {
      q: "„Unsere IT wird das blockieren.“",
      risk: "Verständlich — sie soll etwas betreiben, das sie nicht gebaut hat.",
      a: (
        <>
          Ich baue in Ihre bestehende Umgebung, mit Standardtechnik statt Exoten.
          Ihre IT bekommt Adminrechte, vollständige Dokumentation und ein
          Übergabegespräch — nicht ich behalte die Schlüssel, sondern sie. Die
          Eckdaten zum Weiterreichen: <Link href="/it">Fakten für Ihre IT</Link>.
        </>
      ),
    },
    {
      q: "„Und der Datenschutz, wenn KI im Spiel ist?“",
      risk: "Die Sorge ist begründet — viele KI-Werkzeuge senden Daten in die USA.",
      a: (
        <>
          Für Ihr Projekt gilt: Verarbeitung und Speicherung in EU-Rechenzentren
          (Region Frankfurt), Ihre Daten werden nicht für das Training von
          Modellen verwendet, und wir schließen einen Auftragsverarbeitungsvertrag.
          KI kommt nur dorthin, wo sie nachweislich hilft. Und wie diese Website
          selbst mit Daten umgeht — auch im KI-Dialog —, steht ungeschönt in der{" "}
          <Link href="/datenschutz">Datenschutzerklärung</Link>.
        </>
      ),
    },
    {
      q: "„Lohnt sich das für einen kleinen Betrieb überhaupt?“",
      risk: "Fair gefragt — 9.500 € sind für einen Zehn-Personen-Betrieb echtes Geld.",
      a: "Deshalb rechnen wir vorher, mit Ihren Zahlen statt Prospektzahlen. Zur Größenordnung: Ein Ablauf, der Sie einen halben Tag pro Woche kostet, bindet im Jahr rund 7.000 € an Arbeitszeit — ein Pilot trägt sich dann nach gut einem Jahr, alles danach arbeitet für Sie. Trägt Ihr Fall das nicht, sage ich es Ihnen im Gespräch, bevor Sie Geld ausgeben.",
    },
  ];

  const contract = [
    "Abnahmetermin nach vier Wochen — er steht im Angebot",
    "Festpreis: 50 % bei Auftrag, 50 % nach Abnahme",
    "Besteht die Abnahme nicht, entfällt die zweite Rate",
    "12 Monate Gewährleistung auf den vereinbarten Umfang",
    "Code, Daten und Zugänge gehören Ihnen — vom ersten Tag",
  ];

  return (
    <section className="section" id="einwaende">
      <div className="container">
        <div className="section-head" data-reveal>
          <span className="eyebrow">§4 · Die Zweifel</span>
          <h2 className="section-title">„Und was, wenn es schiefgeht?"</h2>
          <p className="section-lead">
            Jede dieser Sorgen ist begründet. Deshalb bekommt jede eine
            überprüfbare Zusage statt einer Beruhigung — und die wichtigsten
            stehen rechts schwarz auf weiß.
          </p>
        </div>

        <div className="risk-grid">
          <div data-reveal>
            {objections.map((o, i) => (
              <details className="objection" key={i}>
                <summary>
                  {o.q}
                  <svg className="chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </summary>
                <div className="objection-body">
                  <span className="risk">{o.risk}</span>
                  {o.a}
                </div>
              </details>
            ))}
          </div>

          <aside className="contract-card" data-reveal style={delay(0.1)}>
            <span className="contract-eyebrow">Schwarz auf weiß</span>
            <h3>Das steht im Vertrag</h3>
            <ul className="contract-list">
              {contract.map((c) => (
                <li key={c}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
            <div className="contract-sig" aria-hidden>
              <svg width="120" height="34" viewBox="0 0 120 34" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <path d="M6 26c8-16 14-20 16-14s-4 16 2 14 10-18 16-16-2 18 4 16 12-16 18-14-2 16 4 14c8-3 16-10 28-11" />
              </svg>
              <span>gez. M. Schumacher</span>
            </div>
            <p className="contract-note">
              Kein Kleingedrucktes: Den Mustervertrag sehen Sie im Erstgespräch —
              vor dem Angebot.
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}

/* ---------- §5 Belege + Person ---------- */

function WhoAndProof() {
  const facts = [
    {
      figure: "32 h → 6 h",
      label:
        "Reporting-Aufwand pro Zyklus in einem SDAX-Industrieunternehmen — von über 32 auf rund 6 Stunden gesenkt.",
    },
    {
      figure: "≈ 30 Fälle",
      label:
        "KI-Anwendungsfälle mit Fachbereichen identifiziert, zwei im Produktivbetrieb, weitere in Umsetzung.",
    },
    {
      figure: "3 Apps",
      label:
        "Eigene iOS-Apps im App Store veröffentlicht — inklusive Backend, Datenbank, KI-Anbindung und Betrieb.",
    },
    {
      figure: "0 Ausfälle",
      label:
        "Ein gebautes Werkzeug läuft nach dem Wechsel des Erbauers unverändert weiter — ohne dessen Zutun.",
    },
  ];
  return (
    <section className="section method" id="belege">
      <div className="container">
        <div className="section-head" data-reveal>
          <span className="eyebrow">§5 · Belege &amp; Person</span>
          <h2 className="section-title">„Wer garantiert mir das?"</h2>
          <p className="section-lead">
            Zahlen statt Logos — alles anonymisiert, denn Interna meiner Kunden
            bekommen Sie bei mir nie zu sehen. Ihre sieht später auch niemand.
            Und eine Person mit Namen statt einer Agenturfassade.
          </p>
        </div>
        <div className="grid-2">
          {facts.map((f, i) => (
            <div className="card" key={i} data-reveal style={delay(i * 0.07)}>
              <div className="proof-figure">{f.figure}</div>
              <p className="proof-label">{f.label}</p>
            </div>
          ))}
        </div>
        <p className="confidential" data-reveal>
          Statt echter Kundenprojekte zeige ich Ihnen im Gespräch klickbare Nachbauten
          mit Beispieldaten — dieselbe Vertraulichkeit gilt danach für Ihr Projekt.
        </p>

        <div className="about-grid" style={{ marginTop: "3rem" }}>
          <div data-reveal>
            <h3 className="about-name">Moritz Schumacher</h3>
            <p className="about-role">Individualsoftware mit agentischem Coding</p>
            <p style={{ color: "var(--text-soft)", marginBottom: "1rem" }}>
              Vorstandsreferent und Programm-Manager in einem börsennotierten
              Industrieunternehmen — zuletzt verantwortlich dafür, KI-Anwendungsfälle
              zu finden und produktiv zu stellen. Ich kenne beide Seiten: die
              Fachabteilung, die eine Lösung braucht, und die Frage der Geschäftsführung,
              was das kostet und wann es läuft.
            </p>
            <p style={{ color: "var(--text-soft)" }}>
              Nebenher habe ich drei eigene iOS-Apps gebaut und veröffentlicht —
              vom Backend bis zum Betrieb. Nicht als Referenzfolie, sondern weil ich
              Software gern fertig mache.
            </p>
          </div>
          <div className="about-limits" data-reveal style={delay(0.1)}>
            <h3>Was ich nicht baue — aus Überzeugung</h3>
            <ul>
              <li>Sicherheitskritische Steuerungen</li>
              <li>Medizintechnik</li>
              <li>Betrieb hochverfügbarer Rechenzentren</li>
            </ul>
            <p style={{ marginTop: "0.8rem", fontSize: "0.9rem", color: "var(--text-muted)" }}>
              Dafür gibt es Spezialisten mit den richtigen Zulassungen. Wenn Ihr Fall
              dazugehört, sage ich das im Dialog offen — und Ihnen entsteht kein Aufwand.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- §6 Einstieg + Abschluss ---------- */

function Start() {
  const steps = [
    {
      when: "Heute · 3 Minuten",
      title: "Einschätzung",
      text: "Im Dialog unten: Lösungsskizze, Zeitplan mit echtem Datum, unverbindliche Preisschätzung.",
    },
    {
      when: "Diese Woche · 30 Minuten",
      title: "Beratungsgespräch",
      text: "Kostenlos, per Video oder Telefon. Wir schärfen die Skizze — kein Verkaufsgespräch.",
    },
    {
      when: "Danach · schriftlich",
      title: "Festangebot",
      text: "Umfang, Preis, Abnahmekriterien und Abnahmetermin — schwarz auf weiß, vor dem Start.",
    },
    {
      when: "4 Wochen",
      title: "Bau & Abnahme",
      text: "Jede Woche sehen Sie den Stand am lebenden System. Am Ende: Abnahme gegen die Kriterien.",
    },
  ];
  return (
    <section className="section" id="weg">
      <div className="container">
        <div className="section-head" data-reveal>
          <span className="eyebrow">§6 · Der Einstieg</span>
          <h2 className="section-title">„Wie fange ich an?"</h2>
          <p className="section-lead">
            Mit einem Satz. Alles Weitere hat einen festen Platz und ein Datum.
          </p>
        </div>
        <div className="start-steps">
          {steps.map((s, i) => (
            <div className="card start-step" key={s.title} data-reveal style={delay(i * 0.07)}>
              <span className="start-num" aria-hidden>{i + 1}</span>
              <span className="start-when">{s.when}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="final" id="start">
      <div className="container" data-reveal>
        <h2>
          Ihr Fall, ein Satz.
          <br />
          Der Rest ergibt sich im Gespräch.
        </h2>
        <p>
          Beschreiben Sie unten kurz, was Sie loswerden wollen. Sie bekommen eine
          Lösungsskizze, einen Zeitplan mit echtem Datum und eine unverbindliche
          Preisschätzung — auf Wunsch direkt mit Termin.
        </p>
        <CtaButton label="Unverbindliche Einschätzung starten" />
        {/* Leiser Zweitweg für alle, die keinen Chat mögen. */}
        <p className="alt-path">
          Sie mögen keine Chat-Dialoge? <Link href="/termin">Termin direkt wählen</Link>{" "}
          oder schreiben Sie an{" "}
          <a href="mailto:kontakt@vierwochen.de">kontakt@vierwochen.de</a>.
        </p>
        <div className="scarcity">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
          </svg>
          Ich baue jedes Projekt selbst — deshalb starten pro Monat höchstens zwei.
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>
          <span style={{ fontWeight: 700, color: "var(--text)" }}>
            vierwochen<span style={{ color: "var(--accent)" }}>.</span>
          </span>{" "}
          — In vier Wochen zum Ziel.
        </div>
        <nav aria-label="Weitere Seiten">
          <Link href="/termin">Termin buchen</Link>
          <Link href="/it">Fakten für Ihre IT</Link>
          <Link href="/impressum">Impressum</Link>
          <Link href="/datenschutz">Datenschutz</Link>
          <Link href="/agb">AGB</Link>
        </nav>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <main>
      <Hero />
      <Mechanism />
      <UseCases />
      <Pricing />
      <Doubts />
      <WhoAndProof />
      <Start />
      <FinalCta />
      <Footer />
    </main>
  );
}

import Link from "next/link";
import CtaButton from "@/components/sections/CtaButton";
import Hero from "@/components/sections/Hero";
import { PRICE_DISCLAIMER, PRICING_TIERS } from "@/lib/config";

/**
 * Seitenaufbau nach PROMPT.md §4. Ein einziger nächster Schritt pro Bildschirm:
 * der Projekt-Dialog (Fußleiste bzw. die „Einschätzung starten"-Einstiege).
 */

const delay = (s: number) => ({ "--reveal-delay": `${s}s` } as React.CSSProperties);

function Method() {
  return (
    <section className="method section" id="methode">
      <div className="container method-grid">
        <div data-reveal>
          <span className="eyebrow">Warum vier Wochen reichen</span>
          <h2 className="section-title">
            Agentisches Coding ist keine Zauberei. Es ist eine Arbeitsweise.
          </h2>
          <p className="section-lead">
            Deshalb kann ich mich vertraglich auf vier Wochen festlegen — und tue es.
          </p>
        </div>
        <div className="method-points">
          {[
            "Ich entwickle mit agentischen KI-Werkzeugen: Sie übernehmen das Tippen, ich übernehme Verstehen, Architektur und Qualität.",
            "Was früher ein Projektteam über Monate beschäftigt hat, schafft ein erfahrener Entwickler damit in Wochen — ohne Abstriche an Sorgfalt.",
            "Der Umfang wird vorher schriftlich festgelegt. Vier Wochen sind kein Sprint ins Ungewisse, sondern ein Plan mit Abnahme am Ende.",
          ].map((text, i) => (
            <div className="method-point" key={i} data-reveal style={delay(i * 0.08)}>
              <span className="num">{`0${i + 1}`}</span>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

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
          <span className="eyebrow">Wofür Sie mich holen</span>
          <h2 className="section-title">Drei Sätze, die ich ständig höre</h2>
          <p className="section-lead">
            Wenn einer davon auch bei Ihnen fällt, lohnt sich die Einschätzung unten.
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
      </div>
    </section>
  );
}

function Path() {
  const steps = [
    {
      when: "Heute, 3 Minuten",
      title: "Einschätzung",
      text: "Sie beschreiben Ihren Fall im Dialog unten. Sie bekommen sofort eine Lösungsskizze, einen Zeitplan und eine unverbindliche Preisschätzung.",
    },
    {
      when: "Diese Woche, 30 Minuten",
      title: "Erstgespräch",
      text: "Video oder Telefon. Wir klären die offenen Punkte aus der Skizze. Kein Verkaufsgespräch — eine fachliche Prüfung, ob der Fall trägt.",
    },
    {
      when: "Danach, schriftlich",
      title: "Festangebot",
      text: "Umfang, Preis und Abnahmekriterien stehen schwarz auf weiß, bevor es losgeht. Kein Tagessatz, kein Nachtrag.",
    },
    {
      when: "Woche 1–4",
      title: "Bau",
      text: "Jede Woche sehen Sie den Stand am lebenden System, nicht in Folien. Kurswechsel sind in dieser Phase normal und eingepreist.",
    },
    {
      when: "Ende Woche 4",
      title: "Abnahme",
      text: "Gemessen an den vereinbarten Kriterien. Läuft es nicht, zahlen Sie nichts — das ist der Vertrag, nicht ein Versprechen.",
    },
    {
      when: "Ab Woche 5, optional",
      title: "Betrieb",
      text: "Auf Wunsch betreibe ich die Anwendung weiter — monatlich kündbar. Oder Ihre IT übernimmt: Code, Daten und Zugänge gehören ohnehin Ihnen.",
    },
  ];
  return (
    <section className="section" id="weg">
      <div className="container">
        <div className="section-head" data-reveal>
          <span className="eyebrow">Der Weg</span>
          <h2 className="section-title">Von der Idee zur Abnahme — in vier Wochen</h2>
        </div>
        <div className="path-steps">
          {steps.map((s, i) => (
            <div className="path-step" key={i} data-reveal style={delay(i * 0.06)}>
              <div className="path-marker">
                <span className="path-dot">{i + 1}</span>
                {i < steps.length - 1 && <span className="path-line" aria-hidden />}
              </div>
              <div className="path-body">
                <span className="when">{s.when}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section className="section" id="preise" style={{ paddingTop: 0 }}>
      <div className="container">
        <div className="section-head" data-reveal>
          <span className="eyebrow">Preise</span>
          <h2 className="section-title">Drei Stufen, ein Festpreis</h2>
          <p className="section-lead">
            Welche Stufe Ihr Fall ist, sagt Ihnen die Einschätzung unten in wenigen
            Minuten. Und keine Sorge vor den großen Zahlen: Die meisten
            Erstprojekte starten als Pilot.
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
          Zur Einordnung: Eine einzige Sachbearbeitungsstelle kostet 45.000–60.000 € —
          pro Jahr, jedes Jahr. Software, die diese Arbeit übernimmt, kostet einmal.
        </p>
        <div className="price-note" data-reveal>
          <span>{PRICE_DISCLAIMER}</span>
          <span>Zahlung 50 % bei Auftrag, 50 % nach Abnahme.</span>
        </div>
      </div>
    </section>
  );
}

function Proof() {
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
          <span className="eyebrow">Belege</span>
          <h2 className="section-title">Keine Logos, keine Zitate — Zahlen</h2>
          <p className="section-lead">
            Alles anonymisiert, denn Interna meiner Kunden bekommen Sie bei mir nie zu
            sehen. Ihre sieht später auch niemand.
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
      </div>
    </section>
  );
}

function Objections() {
  const objections: { q: string; risk: string; a: React.ReactNode }[] = [
    {
      q: "„Vier Wochen? Das glaube ich erst, wenn ich es sehe.“",
      risk: "Berechtigt — die meisten IT-Projekte reißen Termine, und niemand haftet dafür.",
      a: "Deshalb liegt das Risiko bei mir: Der Umfang wird vorher schriftlich fixiert, abgenommen wird gegen diese Kriterien, und läuft es nach vier Wochen nicht, zahlen Sie nichts. Das steht im Vertrag, nicht in der Werbung.",
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
    {
      q: "„Was, wenn das Ergebnis nicht das ist, was wir brauchen?“",
      risk: "Das klassische Projektrisiko: Am Ende steht Software, die keiner benutzt.",
      a: "Drei Sicherungen: Sie sehen jede Woche den echten Stand und können umsteuern. Die zweite Zahlungshälfte wird erst nach Abnahme fällig. Und auf das Ergebnis gebe ich 12 Monate Gewährleistung.",
    },
  ];
  return (
    <section className="section" id="einwaende">
      <div className="container">
        <div className="section-head" data-reveal>
          <span className="eyebrow">Die berechtigten Zweifel</span>
          <h2 className="section-title">Was Sie jetzt vermutlich denken</h2>
          <p className="section-lead">
            Jede dieser Sorgen ist begründet. Deshalb bekommt jede eine überprüfbare
            Zusage statt einer Beruhigung.
          </p>
        </div>
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
      </div>
    </section>
  );
}

function Manifest() {
  const promises = [
    {
      title: "Vier Wochen bis zur Abnahme",
      text: "Vom Auftrag bis zur abgenommenen Software. Der Termin steht im Angebot.",
    },
    {
      title: "Festpreis, vorab vereinbart",
      text: "Kein Tagessatz, keine Nachträge. Was es kostet, wissen Sie vor dem Start.",
    },
    {
      title: "Läuft es nicht, kostet es nichts",
      text: "Besteht die Software die vereinbarte Abnahme nicht, zahlen Sie nichts.",
    },
    {
      title: "12 Monate Gewährleistung",
      text: "Fehler im vereinbarten Umfang behebe ich ein Jahr lang kostenfrei.",
    },
    {
      title: "Kein Lock-in",
      text: "Code, Daten und Zugänge gehören Ihnen. Der Betrieb ist optional und monatlich kündbar.",
    },
  ];
  return (
    <section className="manifest section" id="arbeitsweise">
      <div className="container">
        <div className="section-head" data-reveal>
          <span className="eyebrow">Wie ich arbeite</span>
          <h2 className="section-title">Fünf Zusagen. Alle stehen im Vertrag.</h2>
        </div>
        <div className="manifest-list">
          {promises.map((p, i) => (
            <div className="manifest-item" key={i} data-reveal style={delay(i * 0.05)}>
              <span className="idx">{`0${i + 1}`}</span>
              <div>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="section" id="wer">
      <div className="container">
        <div className="section-head" data-reveal>
          <span className="eyebrow">Wer baut</span>
          <h2 className="section-title">Aus dem Betrieb, nicht aus der Agenturwelt</h2>
        </div>
        <div className="about-grid">
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
        {/* Leiser Zweitweg für alle, die keinen Chat mögen: Ein Klick zum
            Kalender, ohne Dialog. Bewusst unauffällig — die Dialogleiste
            bleibt der Hauptweg. */}
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
      <Method />
      <UseCases />
      <Path />
      <Pricing />
      <Proof />
      <Objections />
      <Manifest />
      <About />
      <FinalCta />
      <Footer />
    </main>
  );
}

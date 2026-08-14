"use client";

/**
 * Hero (PROMPT.md §4.1): das Vier-Wochen-Versprechen groß.
 *
 * Bewusst OHNE eigenes Eingabefeld und ohne Primärknopf: Die schwebende
 * Dialogleiste unten ist die einzige herausgehobene CTA der ganzen Seite —
 * ein zweites Eingabefeld hier würde den Blick nur teilen. Der Hinweistext
 * zeigt dorthin.
 */
export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-glow" aria-hidden />
      <div className="container hero-inner">
        <div className="hero-badge" data-reveal>
          <span className="pulse" aria-hidden />
          Individualsoftware für den Mittelstand
        </div>
        <h1 data-reveal style={{ "--reveal-delay": "0.05s" } as React.CSSProperties}>
          In <span className="accent">vier Wochen</span> zur Software, die Ihr Betrieb wirklich braucht.
        </h1>
        <p className="hero-sub" data-reveal style={{ "--reveal-delay": "0.1s" } as React.CSSProperties}>
          Zum Festpreis, integriert in Ihre bestehende IT. Läuft es nach vier Wochen
          nicht, kostet es nichts.
        </p>
        {/* Kein Hinweis-Absatz mehr: Das getippte Banner in der Dialogleiste
            erklärt den Einstieg selbst — Text hinter der schwebenden Leiste
            sah zerschnitten aus. Das Kostenlos-Versprechen wird ein Chip. */}
        <div className="hero-chips" data-reveal style={{ "--reveal-delay": "0.2s" } as React.CSSProperties}>
          {[
            "Festpreis, vorab vereinbart",
            "12 Monate Gewährleistung",
            "Code und Daten gehören Ihnen",
          ].map((chip) => (
            <span className="chip" key={chip}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M20 6 9 17l-5-5" />
              </svg>
              {chip}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

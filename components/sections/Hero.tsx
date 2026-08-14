"use client";

/**
 * Hero (Neukonzeption 2026-08-14): Das stärkste Verkaufsargument zuerst —
 * nicht die Geschwindigkeit, sondern die Risiko-Umkehr. „Läuft es nicht,
 * zahlen Sie nichts" ist der Satz, den kein Wettbewerber schreibt; er
 * beantwortet die größte B2B-Angst (Fehlkauf) im ersten Blick und wirft
 * genau die Frage auf, die der Rest der Seite beantwortet: Wie kann er das
 * versprechen?
 *
 * Bewusst OHNE eigenes Eingabefeld und ohne Primärknopf: Die schwebende
 * Dialogleiste unten ist die einzige herausgehobene CTA der ganzen Seite.
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
          Vier Wochen. Festpreis.
          <br />
          <span className="accent">Läuft es nicht, zahlen Sie nichts.</span>
        </h1>
        <p className="hero-sub" data-reveal style={{ "--reveal-delay": "0.1s" } as React.CSSProperties}>
          Entworfen und gebaut von einem, der Ihr Geschäft versteht — mit KI als
          Werkzeug. Das ist der ganze Deal. Diese Seite erklärt, warum ich ihn
          anbieten kann.
        </p>

        <div className="hero-chips" data-reveal style={{ "--reveal-delay": "0.2s" } as React.CSSProperties}>
          {[
            "Voller Quellcode gehört Ihnen",
            "12 Monate Gewährleistung",
            "Kein Lock-in, kein Abo",
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

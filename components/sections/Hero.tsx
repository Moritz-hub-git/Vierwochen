"use client";

import { useState } from "react";
import { openDialog } from "@/components/Header";

/**
 * Hero (PROMPT.md §4.1): das Vier-Wochen-Versprechen groß, direkt darunter der
 * Einstieg in den Dialog — ein einziges Eingabefeld, kein Formular.
 */
export default function Hero() {
  const [text, setText] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    openDialog(text);
    setText("");
  };

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

        <form className="hero-form" onSubmit={submit} data-reveal style={{ "--reveal-delay": "0.15s" } as React.CSSProperties}>
          <input
            type="text"
            value={text}
            maxLength={1500}
            onChange={(e) => setText(e.target.value)}
            placeholder="Was wollen Sie loswerden? Ein Satz genügt …"
            aria-label="Beschreiben Sie Ihren Fall"
          />
          <button type="submit" className="btn btn-primary">
            Einschätzung starten
          </button>
        </form>
        <p className="hero-hint" data-reveal style={{ "--reveal-delay": "0.2s" } as React.CSSProperties}>
          Kostenlos und unverbindlich. Sie erhalten in wenigen Minuten eine Preisspanne
          und eine Lösungsskizze — noch bevor Sie Ihre E-Mail-Adresse hinterlassen.
        </p>

        <div className="hero-chips" data-reveal style={{ "--reveal-delay": "0.25s" } as React.CSSProperties}>
          {["Festpreis, vorab vereinbart", "12 Monate Gewährleistung", "Code und Daten gehören Ihnen"].map((chip) => (
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

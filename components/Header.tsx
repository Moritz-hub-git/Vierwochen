"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

/** Öffnet den Projekt-Dialog (ChatDock hört auf dieses Ereignis). */
/** Weckt nur die Dialogleiste, ohne das Gespräch zu öffnen: Der Cursor
 *  springt hinein, die Vorschläge steigen auf — als hätte man selbst
 *  hineingeklickt. */
export function focusDock() {
  window.dispatchEvent(new CustomEvent("vw:focus-dock"));
}

export function openDialog(text?: string) {
  window.dispatchEvent(new CustomEvent("vw:dialog", { detail: { text: text ?? "" } }));
}

function ThemeToggle() {
  const [theme, setTheme] = useState<string | null>(null);

  useEffect(() => {
    setTheme(document.documentElement.getAttribute("data-theme") ?? "light");
  }, []);

  const toggle = () => {
    const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("vw-theme", next);
    } catch {
      // Privater Modus o. Ä. — Thema gilt dann nur für diese Ansicht.
    }
    setTheme(next);
  };

  return (
    <button
      type="button"
      className="icon-btn"
      onClick={toggle}
      aria-label={theme === "dark" ? "Helles Erscheinungsbild" : "Dunkles Erscheinungsbild"}
      title={theme === "dark" ? "Helles Erscheinungsbild" : "Dunkles Erscheinungsbild"}
    >
      {theme === "dark" ? (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4m11.4-11.4 1.4-1.4" />
        </svg>
      ) : (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
        </svg>
      )}
    </button>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`header${scrolled ? " is-scrolled" : ""}`}>
      <div className="container header-inner">
        <Link href="/" className="wordmark">
          vierwochen<span className="dot">.</span>
        </Link>
        <nav className="nav" aria-label="Hauptnavigation">
          <a className="nav-link" href="/#weg">Der Weg</a>
          <a className="nav-link" href="/#belege">Belege</a>
          <a className="nav-link" href="/#preise">Preise</a>
          <a className="nav-link" href="/#einwaende">Einwände</a>
          <ThemeToggle />
          {/* Bewusst zurückhaltend: Die Dialogleiste unten ist die einzige
              herausgehobene CTA der Seite — hier nur der leise Zweitweg. */}
          <button type="button" className="btn btn-ghost" onClick={() => openDialog()}>
            Einschätzung starten
          </button>
        </nav>
      </div>
    </header>
  );
}

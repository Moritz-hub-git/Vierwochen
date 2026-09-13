"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Arrow } from "./Icons";
import { SITE } from "@/lib/config";
export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const menuButton = useRef<HTMLButtonElement>(null);
  const nav = useRef<HTMLElement>(null);
  useEffect(() => {
    if (open) nav.current?.querySelector<HTMLAnchorElement>("a")?.focus();
  }, [open]);
  useEffect(() => {
    setOpen(false);
  }, [pathname]);
  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);
  return (
    <>
      <a className="skip-link" href="#main">
        Zum Inhalt
      </a>
      <header className="site-header">
        <div className="container nav-inner">
          <Link href="/" className="wordmark" aria-label={`${SITE.name} Startseite`}>
            {SITE.name}<span className="wordmark-dot">.</span>
          </Link>
          <nav
            ref={nav}
            className={`desktop-nav ${open ? "is-open" : ""}`}
            id="main-navigation"
            aria-label="Hauptnavigation"
          >
            <Link href="/#beispiel" onClick={() => setOpen(false)}>
              Anwendung
            </Link>
            <Link href="/#vorgehen" onClick={() => setOpen(false)}>
              Vorgehen
            </Link>
            <Link href="/sicherheit" onClick={() => setOpen(false)}>
              Sicherheit
            </Link>
            <Link className="mobile-nav-cta" href="/prozess-check">
              Prozess beschreiben <Arrow />
            </Link>
          </nav>
          <Link className="button button-primary nav-cta" href="/prozess-check">
            Prozess beschreiben <Arrow />
          </Link>
          <button
            ref={menuButton}
            className="menu-toggle"
            type="button"
            aria-label={open ? "Menü schließen" : "Menü öffnen"}
            aria-expanded={open}
            aria-controls="main-navigation"
            onClick={() => setOpen(!open)}
          >
            <span>{open ? "Schließen" : "Menü"}</span>
            <span aria-hidden="true">{open ? "×" : "☰"}</span>
          </button>
        </div>
      </header>
    </>
  );
}

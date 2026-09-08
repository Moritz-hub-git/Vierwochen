import Link from "next/link";
import Skin from "@/components/v/Skin";
import { SITE } from "@/lib/config";
import s from "./brandnav.module.css";

/**
 * Navigation der Marke für alle Unterseiten (Termin, Rechtsseiten, IT-Fakten).
 * Optisch identisch mit der Navigation der Landing, aber in eigenem Modul:
 * Die Wortmarke kommt aus SITE.markA/markB — wer die Marke wechselt, ändert
 * nur lib/config.ts.
 */
export function Wordmark() {
  return (
    <>
      {SITE.markA}
      <span className={s.dot} aria-hidden>
        .
      </span>
      {SITE.markB}
    </>
  );
}

export default function BrandNav() {
  return (
    <nav className={s.nav} aria-label="Hauptnavigation">
      <Link href="/" className={s.mark} aria-label={`${SITE.name} — Startseite`}>
        <Wordmark />
      </Link>
      <div className={s.navLinks}>
        <a href="/#beispiele">Beispiele</a>
        <a href="/#methode">Methode</a>
        <Link href="/termin">Termin</Link>
      </div>
    </nav>
  );
}

/**
 * Seitenrahmen der Unterseiten: Skin, Hintergrund, Navigation, Lesespalte,
 * Fußzeile. Die Seiten selbst liefern nur noch ihren Inhalt.
 */
export function BrandPage({
  children,
  wide = false,
}: {
  children: React.ReactNode;
  /** Ohne Lesespalte — für Seiten, die ihr eigenes Layout mitbringen. */
  wide?: boolean;
}) {
  return (
    <div className={s.page}>
      <Skin name="fixfertig" />
      <BrandNav />
      {wide ? children : <main className={s.article}>{children}</main>}
      <footer className={s.foot}>
        <Link href="/">Startseite</Link>
        <Link href="/termin">Termin</Link>
        <Link href="/it">Fakten für Ihre IT</Link>
        <Link href="/impressum">Impressum</Link>
        <Link href="/datenschutz">Datenschutz</Link>
        <Link href="/agb">AGB</Link>
      </footer>
    </div>
  );
}

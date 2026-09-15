import Link from "next/link";
import { SITE } from "@/lib/config";
export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <Link href="/" className="wordmark">
            {SITE.name}<span className="wordmark-dot">.</span>
          </Link>
          <p>
            Individuelle Prozesssoftware.
            <br />
            Operations. Done.
          </p>
        </div>
        <div>
          <h2>Beispielprozesse</h2>
          <Link href="/prozesse/auftragsbestaetigungen">
            Auftragsbestätigungen
          </Link>
          <Link href="/prozesse/angebotsbearbeitung">Angebotsbearbeitung</Link>
          <Link href="/prozesse/reklamationen">Reklamationen</Link>
          <Link href="/prozesse/reporting">Management Reporting</Link>
          <Link href="/prozesse/lieferanten-onboarding">
            Lieferanten-Onboarding
          </Link>
        </div>
        <div>
          <h2>{SITE.name}</h2>
          <Link href="/unternehmen">Unternehmen</Link>
          <Link href="/sicherheit">Sicherheit & Kontrolle</Link>
          <Link href="/#vorgehen">Zusammenarbeit</Link>
          <Link href="/prozess-check">Prozess-Check</Link>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} {SITE.name}</span>
        <span>Work eliminated.</span>
        <nav aria-label="Rechtliches">
          <Link href="/impressum">Impressum</Link>
          <Link href="/datenschutz">Datenschutz</Link>
          <Link href="/agb">Vertragsgrundlagen</Link>
        </nav>
      </div>
    </footer>
  );
}

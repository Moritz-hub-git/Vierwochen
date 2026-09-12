import Link from "next/link";
import { Mark } from "./Icons";
export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <Link href="/" className="wordmark">
            <Mark />
            OpsDone<span className="wordmark-dot">.</span>
          </Link>
          <p>
            AI-native Process Automation.
            <br />
            Operations. Done.
          </p>
        </div>
        <div>
          <h2>Arbeit eliminieren</h2>
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
          <h2>OpsDone</h2>
          <Link href="/unternehmen">Unternehmen</Link>
          <Link href="/sicherheit">Sicherheit & Kontrolle</Link>
          <Link href="/#vorgehen">Zusammenarbeit</Link>
          <Link href="/prozess-check">Prozess-Check</Link>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} OpsDone</span>
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

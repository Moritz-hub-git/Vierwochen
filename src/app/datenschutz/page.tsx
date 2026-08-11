export const metadata = { title: 'Datenschutz — vierwochen' };

/**
 * ENTWURF in der Struktur einer DSGVO-Erklärung. Vor dem Livegang:
 * Platzhalter füllen, AV-Verträge schließen und anwaltlich prüfen lassen.
 */
export default function Datenschutz() {
  return (
    <div className="sheet">
      <header className="masthead">
        <a className="masthead__mark" href="/" style={{ textDecoration: 'none' }}>
          vierwochen<span>.</span>
        </a>
        <div className="masthead__meta">Datenschutzerklärung</div>
      </header>

      <section className="close">
        <div className="label">Datenschutz</div>
        <h2>Datenschutzerklärung</h2>

        <div className="prose" style={{ display: 'grid', gap: '1.25rem', marginTop: '1.5rem' }}>
          <div>
            <p><strong>Verantwortlicher</strong></p>
            <p>
              <span className="todo">PLATZHALTER</span> Name und Anschrift wie im Impressum,
              E-Mail-Adresse für Datenschutzanfragen.
            </p>
          </div>

          <div>
            <p><strong>Hosting und Verarbeitung</strong></p>
            <p>
              Diese Website läuft auf Google Cloud (Cloud Run, Firestore) in der Region
              Frankfurt bzw. EU-Multiregion. Mit Google Cloud besteht ein Vertrag zur
              Auftragsverarbeitung nach Art. 28 DSGVO (Google Cloud Data Processing
              Addendum). Beim Aufruf der Seite verarbeitet die Plattform technisch
              notwendige Verbindungsdaten (IP-Adresse, Zeitpunkt, abgerufene Ressource)
              zur Bereitstellung und Absicherung des Dienstes — Rechtsgrundlage ist
              Art. 6 Abs. 1 lit. f DSGVO.
            </p>
          </div>

          <div>
            <p><strong>Projekt-Dialog (KI-gestützt)</strong></p>
            <p>
              Der Dialog auf dieser Website wird durch ein KI-System geführt (Gemini über
              Google Vertex AI, Verarbeitung in der EU). Ihre Eingaben werden zur
              Erstellung der Ersteinschätzung an das Modell übermittelt und zusammen mit
              der erstellten Skizze gespeichert, wenn Sie Ihre E-Mail-Adresse hinterlassen
              — Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche
              Maßnahmen). Geben Sie im Dialog keine Gesundheitsdaten oder sonstige
              besonders sensiblen Informationen ein. Gespeicherte Dialoge werden nach
              <span className="todo"> PLATZHALTER: Frist, z. B. 12 Monaten</span> gelöscht.
            </p>
          </div>

          <div>
            <p><strong>Terminbuchung</strong></p>
            <p>
              Bei einer Terminbuchung verarbeiten wir Name, E-Mail-Adresse, gewünschten
              Zeitpunkt und — bei Telefonterminen — Ihre Rufnummer zur Durchführung des
              Gesprächs (Art. 6 Abs. 1 lit. b DSGVO). Der Termin wird in einem Google
              Kalender gespeichert.
            </p>
          </div>

          <div>
            <p><strong>Ihre Rechte</strong></p>
            <p>
              Sie haben die Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung,
              Datenübertragbarkeit und Widerspruch (Art. 15–21 DSGVO) sowie das Recht auf
              Beschwerde bei einer Aufsichtsbehörde. Zuständig ist die
              Landesbeauftragte für Datenschutz und Informationsfreiheit
              Nordrhein-Westfalen.
            </p>
          </div>

          <p className="note">
            <span className="todo">ENTWURF</span> Diese Erklärung ist eine Arbeitsfassung
            und wird vor Veröffentlichung anwaltlich geprüft.
          </p>
        </div>
      </section>
    </div>
  );
}

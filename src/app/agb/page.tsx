export const metadata = { title: 'AGB — vierwochen' };

/**
 * ENTWURF der Vertragsgrundsätze. Vor dem Livegang anwaltlich ausarbeiten —
 * insbesondere Vier-Wochen-Zusage, Gewährleistung und Haftungsbegrenzung.
 */
export default function Agb() {
  return (
    <div className="sheet">
      <header className="masthead">
        <a className="masthead__mark" href="/" style={{ textDecoration: 'none' }}>
          vierwochen<span>.</span>
        </a>
        <div className="masthead__meta">Vertragsgrundsätze</div>
      </header>

      <section className="close">
        <div className="label">AGB</div>
        <h2>Vertragsgrundsätze</h2>

        <div className="prose" style={{ display: 'grid', gap: '1.25rem', marginTop: '1.5rem' }}>
          <p>
            <strong>1. Geltung.</strong> Diese Bedingungen gelten für Verträge mit
            Unternehmern (§ 14 BGB). Verbrauchergeschäfte werden nicht angeboten.
          </p>
          <p>
            <strong>2. Angebot und Festpreis.</strong> Grundlage jedes Projekts ist ein
            schriftliches Festangebot mit Leistungsumfang, Abnahmekriterien, Preis und
            Termin. Ersteinschätzungen auf dieser Website sind unverbindlich.
          </p>
          <p>
            <strong>3. Vier-Wochen-Zusage.</strong> Erfüllt das Werk die im Angebot
            vereinbarten Abnahmekriterien nicht innerhalb der vereinbarten Frist,
            entfällt die Vergütung für die betroffene Leistungsstufe.
            <span className="todo"> PLATZHALTER: genaue Bedingungen und Mitwirkungspflichten anwaltlich fassen</span>
          </p>
          <p>
            <strong>4. Zahlung.</strong> 50 % bei Auftragserteilung, 50 % nach Abnahme.
            Betriebsleistungen monatlich im Voraus, kündbar zum Monatsende.
          </p>
          <p>
            <strong>5. Eigentum.</strong> Mit vollständiger Zahlung erhält der Kunde die
            ausschließlichen Nutzungsrechte am projektspezifischen Code sowie sämtliche
            Zugänge und Daten. Vorbestehende Werkzeuge und Bibliotheken bleiben davon
            unberührt.
          </p>
          <p>
            <strong>6. Gewährleistung.</strong> 12 Monate auf das abgenommene Werk nach
            Maßgabe des Werkvertragsrechts.
          </p>
          <p>
            <strong>7. Haftung.</strong> Für einfache Fahrlässigkeit wird nur bei
            Verletzung wesentlicher Vertragspflichten gehaftet, begrenzt auf den
            vertragstypisch vorhersehbaren Schaden.
            <span className="todo"> PLATZHALTER: Haftungsklausel anwaltlich ausformulieren</span>
          </p>
          <p>
            <strong>8. Vertraulichkeit.</strong> Interna des Kunden werden nicht an
            Dritte weitergegeben und nicht als Referenz verwendet, sofern nicht
            schriftlich freigegeben.
          </p>
          <p className="note">
            <span className="todo">ENTWURF</span> Arbeitsfassung — vor Veröffentlichung
            anwaltlich prüfen und vervollständigen.
          </p>
        </div>
      </section>
    </div>
  );
}

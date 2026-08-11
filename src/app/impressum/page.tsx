export const metadata = { title: 'Impressum — vierwochen' };

/**
 * ENTWURF. Vor dem Livegang: Platzhalter füllen und anwaltlich prüfen lassen.
 * Pflichtangaben nach § 5 DDG.
 */
export default function Impressum() {
  return (
    <div className="sheet">
      <header className="masthead">
        <a className="masthead__mark" href="/" style={{ textDecoration: 'none' }}>
          vierwochen<span>.</span>
        </a>
        <div className="masthead__meta">Impressum</div>
      </header>

      <section className="close">
        <div className="label">Angaben gemäß § 5 DDG</div>
        <h2>Impressum</h2>
        <div className="prose" style={{ display: 'grid', gap: '1rem', marginTop: '1.5rem' }}>
          <p>
            <span className="todo">PLATZHALTER</span> Vor- und Nachname bzw. Firma
            <br />
            <span className="todo">PLATZHALTER</span> Straße und Hausnummer
            <br />
            <span className="todo">PLATZHALTER</span> PLZ und Ort
          </p>
          <p>
            E-Mail: <span className="todo">PLATZHALTER</span>
            <br />
            Telefon: <span className="todo">PLATZHALTER</span>
          </p>
          <p>
            Umsatzsteuer-Identifikationsnummer: <span className="todo">PLATZHALTER — falls vorhanden</span>
          </p>
          <p>
            Verantwortlich für den Inhalt: <span className="todo">PLATZHALTER</span>
          </p>
          <p className="note">
            Hinweis Streitbeilegung: Zur Teilnahme an einem Streitbeilegungsverfahren vor
            einer Verbraucherschlichtungsstelle sind wir nicht verpflichtet und nicht
            bereit.
          </p>
        </div>
      </section>
    </div>
  );
}

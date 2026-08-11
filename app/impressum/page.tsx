import type { Metadata } from "next";

export const metadata: Metadata = { title: "Impressum — vierwochen" };

/**
 * Vollständig strukturierter Entwurf (PROMPT.md §11). Fehlende Angaben sind
 * klar als PLATZHALTER markiert und vor Livegang zu ersetzen.
 */
export default function Impressum() {
  return (
    <main className="container legal">
      <h1>Impressum</h1>

      <h2>Angaben gemäß § 5 DDG</h2>
      <p>
        Moritz Schumacher
        <br />
        <span className="placeholder">PLATZHALTER: Straße und Hausnummer</span>
        <br />
        <span className="placeholder">PLATZHALTER: PLZ und Ort</span>
        <br />
        Deutschland
      </p>

      <h2>Kontakt</h2>
      <p>
        E-Mail: <span className="placeholder">PLATZHALTER: E-Mail-Adresse</span>
        <br />
        Telefon: <span className="placeholder">PLATZHALTER: Rufnummer</span>
      </p>

      <h2>Umsatzsteuer-Identifikationsnummer</h2>
      <p>
        Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG:{" "}
        <span className="placeholder">PLATZHALTER: USt-IdNr.</span>
      </p>

      <h2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
      <p>
        Moritz Schumacher, Anschrift wie oben.
      </p>

      <h2>Streitbeilegung</h2>
      <p>
        Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung
        (OS) bereit. Ich bin nicht bereit und nicht verpflichtet, an
        Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
        teilzunehmen; das Angebot dieser Website richtet sich ausschließlich an
        Unternehmer.
      </p>

      <div className="legal-note">
        Hinweis: Dieser Entwurf ist vor dem offiziellen Livegang anwaltlich zu prüfen
        und alle mit PLATZHALTER markierten Angaben sind zu ergänzen.
      </div>
    </main>
  );
}

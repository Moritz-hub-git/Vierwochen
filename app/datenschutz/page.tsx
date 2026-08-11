import type { Metadata } from "next";

export const metadata: Metadata = { title: "Datenschutzerklärung — vierwochen" };

/**
 * Vollständig strukturierter Entwurf (PROMPT.md §11). Deckt ab: Hosting auf
 * Google Cloud in der EU, KI-Dialog über Vertex AI in der EU, Speicherung von
 * Dialogen und Leads, Terminbuchung, Betroffenenrechte.
 */
export default function Datenschutz() {
  return (
    <main className="container legal">
      <h1>Datenschutzerklärung</h1>

      <h2>1. Verantwortlicher</h2>
      <p>
        Moritz Schumacher, <span className="placeholder">PLATZHALTER: Anschrift</span>,{" "}
        <span className="placeholder">PLATZHALTER: E-Mail-Adresse</span>.
      </p>

      <h2>2. Überblick</h2>
      <p>
        Diese Website bietet eine Ersteinschätzung für Softwareprojekte über einen
        KI-gestützten Dialog sowie eine Terminbuchung an. Dabei werden
        personenbezogene Daten ausschließlich verarbeitet, soweit dies für die
        Bereitstellung der Website und der genannten Funktionen erforderlich ist.
        Es findet kein Verkauf von Daten und keine Werbe-Weitergabe an Dritte statt.
      </p>

      <h2>3. Hosting (Google Cloud, EU)</h2>
      <p>
        Die Website wird auf Google Cloud (Google Ireland Limited, Gordon House,
        Barrow Street, Dublin 4, Irland) in der Region Frankfurt am Main
        (europe-west3) betrieben. Beim Aufruf der Website verarbeitet der Server
        technisch notwendige Daten (IP-Adresse, Zeitpunkt, aufgerufene Seite,
        User-Agent) in Protokolldateien. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f
        DSGVO (berechtigtes Interesse an einem sicheren, stabilen Betrieb).
        Protokolldaten werden nach spätestens 30 Tagen gelöscht. Mit Google ist ein
        Auftragsverarbeitungsvertrag nach Art. 28 DSGVO geschlossen.
      </p>

      <h2>4. KI-Dialog (Vertex AI, EU)</h2>
      <p>
        Für die Ersteinschätzung werden Ihre Eingaben im Dialog an das KI-Modell
        Gemini über Google Vertex AI übermittelt und dort verarbeitet. Die
        Verarbeitung erfolgt in der EU (Region europe-west4, Niederlande). Ihre
        Eingaben werden von Google nicht zum Training von Modellen verwendet.
        Bitte geben Sie im Dialog keine besonderen Kategorien personenbezogener
        Daten (Art. 9 DSGVO) und keine Betriebsgeheimnisse ein, die für die
        Einschätzung nicht erforderlich sind. Rechtsgrundlage ist Art. 6 Abs. 1
        lit. b DSGVO (vorvertragliche Maßnahme auf Ihre Anfrage).
      </p>

      <h2>5. Speicherung von Dialogen und Kontaktdaten (Leads)</h2>
      <p>
        Der Verlauf Ihres Dialogs und die daraus erzeugte Einschätzung werden in
        einer Datenbank (Google Firestore, Multiregion eur3, EU) gespeichert, um
        das Erstgespräch vorzubereiten und die Qualität des Dialogs zu verbessern.
        Geben Sie Ihre geschäftliche E-Mail-Adresse und Ihren Namen an, werden
        diese zusammen mit dem Dialog gespeichert, um Ihnen die Einschätzung
        zuzusenden und Ihre Anfrage zu bearbeiten. Rechtsgrundlage ist Art. 6
        Abs. 1 lit. b DSGVO. Dialoge ohne Kontaktangabe werden spätestens nach
        90 Tagen gelöscht; Anfragedaten nach Abschluss der Kommunikation,
        spätestens nach 24 Monaten, soweit keine gesetzlichen
        Aufbewahrungspflichten bestehen.
      </p>

      <h2>6. Terminbuchung</h2>
      <p>
        Buchen Sie ein Erstgespräch, werden Name, E-Mail-Adresse, gewählter Kanal
        (Videocall oder Telefon), gegebenenfalls Ihre Rufnummer sowie der gewählte
        Termin gespeichert und ein Kalendereintrag in Google Calendar angelegt.
        Bei Videocalls wird gegebenenfalls ein Konferenzlink (Google Meet) erzeugt.
        Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Durchführung
        vorvertraglicher Maßnahmen).
      </p>

      <h2>7. Zugriffsschutz und Kostenbremse</h2>
      <p>
        Zur Missbrauchsvermeidung werden IP-Adressen für Ratenbegrenzungen
        kurzzeitig verarbeitet (Art. 6 Abs. 1 lit. f DSGVO). Ein Tracking zu
        Werbezwecken, Analyse-Cookies oder Social-Media-Einbindungen gibt es auf
        dieser Website nicht. Ein technisch notwendiges Cookie wird nur gesetzt,
        wenn die Vorschau der Website passwortgeschützt ist.
      </p>

      <h2>8. Empfänger und Drittlandtransfer</h2>
      <p>
        Empfänger der Daten ist Google als Auftragsverarbeiter (Hosting, Datenbank,
        Vertex AI, Calendar). Die Verarbeitung erfolgt in EU-Rechenzentren. Soweit
        in Einzelfällen ein Zugriff aus Drittländern nicht ausgeschlossen werden
        kann, stützt er sich auf den Angemessenheitsbeschluss für das EU-US Data
        Privacy Framework bzw. EU-Standardvertragsklauseln.
      </p>

      <h2>9. Ihre Rechte</h2>
      <ul>
        <li>Auskunft über die verarbeiteten Daten (Art. 15 DSGVO)</li>
        <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO)</li>
        <li>Löschung (Art. 17 DSGVO)</li>
        <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
        <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
        <li>Widerspruch gegen Verarbeitungen auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO (Art. 21 DSGVO)</li>
        <li>Beschwerde bei einer Datenschutz-Aufsichtsbehörde (Art. 77 DSGVO)</li>
      </ul>
      <p>
        Wenden Sie sich dazu an:{" "}
        <span className="placeholder">PLATZHALTER: E-Mail-Adresse</span>.
      </p>

      <h2>10. Stand</h2>
      <p>
        Diese Erklärung hat den Stand{" "}
        <span className="placeholder">PLATZHALTER: Datum Livegang</span> und wird bei
        Änderungen der Website angepasst.
      </p>

      <div className="legal-note">
        Hinweis: Dieser Entwurf ist vor dem offiziellen Livegang anwaltlich zu prüfen
        und alle mit PLATZHALTER markierten Angaben sind zu ergänzen.
      </div>
    </main>
  );
}

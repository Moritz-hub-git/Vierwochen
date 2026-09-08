import type { Metadata } from "next";
import { BrandPage } from "@/components/v/BrandNav";
import { SITE } from "@/lib/config";
import s from "@/components/v/brandnav.module.css";

export const metadata: Metadata = { title: "Datenschutzerklärung" };

/**
 * Strukturierter Entwurf (PROMPT.md §11). Beschreibt, was der Code tatsächlich
 * tut — nicht, was üblich wäre: Hosting Google Cloud EU, KI-Dialog über den
 * globalen Vertex-Endpunkt (siehe lib/config.ts, VERTEX.location), Dialoge
 * und Buchungen in Firestore, First-Party-Reichweitenmessung ohne Cookies
 * (lib/track.ts, lib/events.ts), IP-Speicherung zum Missbrauchsschutz.
 */
export default function Datenschutz() {
  return (
    <BrandPage>
      <h1>Datenschutzerklärung</h1>

      <h2>1. Verantwortlicher</h2>
      <p>
        {SITE.owner} ({SITE.name}, Einzelunternehmen),{" "}
        <span className={s.placeholder}>PLATZHALTER: Anschrift</span>,{" "}
        <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
      </p>

      <h2>2. Überblick</h2>
      <p>
        Diese Website bietet eine Ersteinschätzung für Softwareprojekte über einen
        KI-gestützten Dialog sowie eine Terminbuchung an. Personenbezogene Daten
        werden nur verarbeitet, soweit das für die Bereitstellung der Website und
        dieser Funktionen erforderlich ist. Es findet kein Verkauf von Daten und
        keine Weitergabe zu Werbezwecken an Dritte statt.
      </p>

      <h2>3. Hosting (Google Cloud, EU)</h2>
      <p>
        Die Website wird auf Google Cloud (Google Ireland Limited, Gordon House,
        Barrow Street, Dublin 4, Irland) in der Region Frankfurt am Main
        (europe-west3) betrieben. Beim Aufruf verarbeitet der Server technisch
        notwendige Daten (IP-Adresse, Zeitpunkt, aufgerufene Seite, User-Agent)
        in Protokolldateien. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO
        (berechtigtes Interesse an einem sicheren, stabilen Betrieb).
        Protokolldaten werden nach spätestens 30 Tagen gelöscht. Mit Google ist
        ein Auftragsverarbeitungsvertrag nach Art. 28 DSGVO geschlossen.
      </p>

      <h2>4. KI-Dialog (Vertex AI)</h2>
      <p>
        Der Dialog auf der Startseite wird von einer KI geführt; das ist dort
        auch so gekennzeichnet. Ihre Eingaben werden an das KI-Modell Gemini über
        Google Vertex AI übermittelt und dort verarbeitet. Die Verarbeitung
        erfolgt über den globalen Endpunkt von Vertex AI: Google leitet die
        Anfrage an einen Standort mit freier Kapazität weiter, der auch außerhalb
        der EU/des EWR liegen kann. Für diesen Verarbeitungsschritt ist daher
        eine Übermittlung in Drittländer, einschließlich der USA, nicht
        ausgeschlossen; sie stützt sich auf die EU-Standardvertragsklauseln mit
        Google bzw. den Angemessenheitsbeschluss der EU-Kommission für das EU-US
        Data Privacy Framework. Hosting, Datenbank und Terminbuchung bleiben
        davon unberührt und laufen in der EU (siehe Abschnitte 3, 5 und 6). Ihre
        Eingaben werden von Google nicht zum Training von Modellen verwendet.
        Bitte geben Sie im Dialog keine besonderen Kategorien personenbezogener
        Daten (Art. 9 DSGVO) und keine Betriebsgeheimnisse ein, die für die
        Einschätzung nicht erforderlich sind. Rechtsgrundlage ist Art. 6 Abs. 1
        lit. b DSGVO (vorvertragliche Maßnahme auf Ihre Anfrage) i. V. m.
        Art. 46 DSGVO für die Übermittlung.
      </p>

      <h2>5. Speicherung von Dialogen und Kontaktdaten</h2>
      <p>
        Der Verlauf Ihres Dialogs und die daraus erzeugte Einschätzung werden in
        einer Datenbank (Google Firestore, Multiregion eur3, EU) gespeichert, um
        ein Erstgespräch vorzubereiten und die Qualität des Dialogs zu
        verbessern. Für die Einschätzung selbst ist keine E-Mail-Adresse nötig.
        Ihre E-Mail-Adresse und Ihr Name werden nur gespeichert, wenn Sie einen
        Termin buchen (Abschnitt 6) oder die Adresse freiwillig angeben; sie
        werden dann mit dem Dialog verknüpft, um Ihre Anfrage zu bearbeiten.
        Zusätzlich wird zu jedem Dialog die IP-Adresse gespeichert, um Missbrauch
        der offenen KI-Schnittstelle erkennen und begrenzen zu können; sie wird
        nach 30 Tagen gelöscht. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO,
        für die IP-Speicherung Art. 6 Abs. 1 lit. f DSGVO. Dialoge ohne
        Kontaktangabe werden spätestens nach 90 Tagen gelöscht; Anfragedaten nach
        Abschluss der Kommunikation, spätestens nach 24 Monaten, soweit keine
        gesetzlichen Aufbewahrungspflichten bestehen.
      </p>

      <h2>6. Terminbuchung</h2>
      <p>
        Buchen Sie ein Erstgespräch, werden Name, E-Mail-Adresse, Firma,
        Firmengröße, Branche, gewählter Kanal (Videocall oder Telefon),
        gegebenenfalls Ihre Rufnummer, Ihre Angabe dazu, was im Gespräch geklärt
        werden soll, sowie der gewählte Termin gespeichert und ein Kalendereintrag
        in Google Calendar angelegt. Bei Videocalls wird gegebenenfalls ein
        Konferenzlink (Google Meet) erzeugt, und Sie erhalten eine
        Bestätigungs-E-Mail über Gmail. Kampagnenparameter aus der Adresszeile
        (gclid, utm_*), über die Sie auf die Website gekommen sind, werden mit der
        Buchung gespeichert, um zu wissen, welche Werbung zu Gesprächen führt;
        die IP-Adresse wird zum Missbrauchsschutz für 30 Tage mitgespeichert.
        Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Durchführung
        vorvertraglicher Maßnahmen), für Kampagnenparameter und IP-Adresse
        Art. 6 Abs. 1 lit. f DSGVO.
      </p>

      <h2>7. Reichweitenmessung (ohne Cookies)</h2>
      <p>
        Um zu erkennen, an welcher Stelle Besucher abbrechen, zählt die Website
        wenige Ereignisse selbst: Seitenaufruf, Dialog gestartet, Ergebnis
        erhalten, Termin gebucht. Diese Ereignisse werden ausschließlich an den
        eigenen Server gesendet (First Party) — es gibt kein Analyse-Skript
        eines Drittanbieters, keine Cookies und keine Social-Media-Einbindungen.
        Damit die Ereignisse eines Besuchs zusammengehören, liegt im
        sessionStorage Ihres Browsers eine zufällige Sitzungs-ID; sie verfällt
        mit dem Schließen des Tabs und lässt sich keiner Person zuordnen.
        Kampagnenparameter (gclid, utm_*) und die verweisende Seite werden für
        die Dauer der Sitzung im Browser gemerkt und den Ereignissen beigefügt.
        Die Ereignisdaten werden 12 Monate gespeichert. Rechtsgrundlage ist
        Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse, die Website zu
        verbessern und Werbeausgaben zu bewerten).
      </p>

      <h2>8. Zugriffsschutz und Kostenbremse</h2>
      <p>
        Zur Missbrauchsvermeidung werden IP-Adressen für Ratenbegrenzungen
        kurzzeitig verarbeitet (Art. 6 Abs. 1 lit. f DSGVO). Ein technisch
        notwendiges Cookie wird nur gesetzt, wenn die Vorschau der Website
        passwortgeschützt ist.
      </p>

      <h2>9. Empfänger und Drittlandtransfer</h2>
      <p>
        Empfänger der Daten ist Google als Auftragsverarbeiter (Hosting,
        Datenbank, Vertex AI, Calendar, Gmail). Hosting, Datenbank und
        Terminbuchung laufen in EU-Rechenzentren. Der KI-Dialog (Abschnitt 4)
        läuft über den globalen Vertex-AI-Endpunkt; hier ist eine Verarbeitung
        außerhalb der EU/des EWR, einschließlich der USA, möglich. Diese
        Übermittlung stützt sich auf den Angemessenheitsbeschluss der
        EU-Kommission für das EU-US Data Privacy Framework bzw. auf
        EU-Standardvertragsklauseln mit Google.
      </p>

      <h2>10. Ihre Rechte</h2>
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
        Wenden Sie sich dazu an <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
      </p>

      <h2>11. Stand</h2>
      <p>
        Diese Erklärung hat den Stand{" "}
        <span className={s.placeholder}>PLATZHALTER: Datum Livegang</span> und wird
        bei Änderungen der Website angepasst.
      </p>
    </BrandPage>
  );
}

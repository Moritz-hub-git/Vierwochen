import type { Metadata } from "next";
import { SITE } from "@/lib/config";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  alternates: { canonical: "/datenschutz" },
};

export default function PrivacyPage() {
  return (
    <main id="main" className="legal-page">
      <section className="page-hero">
        <div className="container prose">
          <p className="eyebrow">Rechtliches</p>
          <h1>Datenschutzerklärung</h1>

          <h2>1. Verantwortlicher</h2>
          <p>
            {SITE.owner}, handelnd unter {SITE.name}
            <br />
            <strong>Noch zu ergänzen vor Veröffentlichung:</strong> vollständige
            ladungsfähige Anschrift und geprüfte Betreiberangaben
            <br />
            E-Mail: <a href={`mailto:${SITE.email}`}>{SITE.email}</a> (derzeit
            Übergangsadresse)
          </p>

          <h2>2. Bereitstellung der Website</h2>
          <p>
            Die Website wird als Next.js-Anwendung auf Google Cloud Run
            betrieben. Beim Aufruf können technisch erforderliche
            Verbindungsdaten wie IP-Adresse, Zeitpunkt, aufgerufene Ressource
            und User-Agent in Serverprotokollen verarbeitet werden. Die
            konkrete Aufbewahrung dieser Plattformprotokolle ist vor der
            Veröffentlichung noch zu bestätigen.
          </p>

          <h2>3. AI-first Prozessdialog</h2>
          <p>
            Der primäre Einstieg ist das persistente Chat-Dock. Wenn Sie eine
            Beschreibung absenden, verarbeitet Opsrid den eingegebenen
            Prozess und den bisherigen Gesprächsverlauf, um höchstens drei
            Rückfragen und anschließend eine konkrete, unverbindliche
            Prozessvorschau zu erzeugen. Ein E-Mail-Gate ist für die Vorschau
            nicht erforderlich. Bitte geben Sie nur Informationen ein, die für
            die erste Einordnung erforderlich sind, und lassen Sie Firmen- und
            Kundennamen weg, wenn sie nicht nötig sind.
          </p>
          <p>
            Die Chat-Anfrage wird an die API-Route <code>/api/chat</code>
            übertragen. Das konfigurierte Gemini-Modell von Google Vertex AI
            verarbeitet den Text; bei konfigurierter Firestore-Persistenz
            werden Gesprächsverlauf, Prozessskizze, Ergebnis-Metadaten,
            Zeitstempel und zunächst die IP-Adresse in der Sammlung
            <code>dialogs</code> gespeichert. Die Modellregion wird über die
            Laufzeitkonfiguration bestimmt. Die konkrete Betriebs- und
            Transferkonfiguration ist vor Veröffentlichung abschließend zu
            prüfen.
          </p>

          <h2>4. Inline-Terminbuchung</h2>
          <p>
            Nach der Vorschau können Sie inline einen Termin auswählen. Für
            die Buchungsanfrage verarbeiten wir den gewählten Zeitpunkt, Name,
            E-Mail-Adresse, optional Unternehmen, Unternehmensgröße, Branche,
            Telefonnummer bei Telefonterminen, Agenda, Dialog-ID und die
            übermittelten Attributionseinstellungen. Die Angaben werden in
            Firestore in der Sammlung <code>bookings</code> gespeichert und
            können für eine Termin- und Prozessvorbereitung an den Betreiber
            übermittelt werden.
          </p>
          <p>
            Ist <code>BOOKING_CALENDAR_ID</code> eingerichtet und berechtigt,
            werden freie Zeiten gegen Google Calendar geprüft und ein Termin
            angelegt. Ohne diese Konfiguration wird die Auswahl als
            <strong> Terminanfrage</strong> gespeichert und anschließend
            manuell bestätigt; sie ist dann noch keine Kalenderbestätigung.
            Bestätigungs- und Betreiber-E-Mails werden nur versendet, wenn der
            Mailversand mit <code>MAIL_SENDER</code> eingerichtet ist.
          </p>

          <h2>5. Datensparsame Funnelmessung</h2>
          <p>
            Die eigene Funnelmessung wird nur nach Interaktionen im Chat oder
            bei der Terminbuchung ausgelöst. Es gibt keinen allgemeinen
            Pageview-Mount in dieser Messung, keine Drittanbieter-Analyse und
            keine Werbe-Cookies. Die Sitzungs-ID bleibt ausschließlich im
            Arbeitsspeicher dieses Seitenkontexts; es werden weder Cookies noch
            <code>localStorage</code> oder <code>sessionStorage</code> genutzt.
          </p>
          <p>
            Für die Zuordnung einer Interaktion können Ereignistyp,
            Sitzungs-ID, Dialog-ID, Seitenpfad, höchstens die nötigen UTM-
            Parameter, der Ursprung einer externen Referrer-URL und einfache
            technische Metadaten an <code>/api/event</code> übertragen und in
            Firestore gespeichert werden. Klick-IDs wie gclid, gbraid und
            wbraid werden nicht gespeichert. Die konkrete rechtliche Einordnung
            dieser Messung ist vor Veröffentlichung fachlich zu prüfen.
          </p>

          <h2>6. Direkter Formular-Fallback</h2>
          <p>
            Ein separates Formular kann ausdrücklich über
            <code>?formular=1</code> angefordert werden. Dann verarbeiten wir
            Name, E-Mail-Adresse, Unternehmen, Prozessbeschreibung,
            Volumenangabe, freiwillige Zusatzinformationen und die
            Einwilligungsangabe zur Bearbeitung des Prozess-Checks. Diese
            Daten werden, sofern Firestore verfügbar ist, in
            <code>processChecks</code> gespeichert und dem Betreiber zur
            Bearbeitung zugestellt. Die normale Verlinkung öffnet den
            AI-first-Chat.
          </p>

          <h2>7. Missbrauchsschutz und Speicherdauer</h2>
          <p>
            Zur Begrenzung automatisierter oder missbräuchlicher Anfragen wird
            die IP-Adresse serverseitig verarbeitet. Die Anwendung entfernt
            diese IP-Felder nach derzeit 30 Tagen aus Dialogen, Buchungen,
            Leads und Prozess-Checks. Ereignisse der Funnelmessung werden nach
            derzeit 365 Tagen bereinigt. Dialoge ohne Verweis auf Lead oder
            Buchung werden nach derzeit 90 Tagen gelöscht; referenzierte
            Dialoge bleiben bis zur Bearbeitung der Anfrage erhalten. Die
            technische Routine und ihre Abdeckung werden vor Veröffentlichung
            gegen die tatsächlichen Betriebsanforderungen geprüft.
          </p>

          <h2>8. Empfänger und Dienste</h2>
          <p>
            Je nach genutzter Funktion können Google Cloud Run, Firestore und
            Vertex AI sowie die Gmail- und Calendar-APIs als technische Dienste
            eingesetzt werden. Die zuständigen Google-Gesellschaften,
            Auftragsverarbeitungsverträge, Unterauftragnehmer, Speicherorte und
            mögliche Drittlandübermittlungen sind anhand der produktiven
            Konfiguration abschließend zu dokumentieren. Weitere Empfänger
            erhalten Daten nur, wenn dies für die Bearbeitung erforderlich oder
            gesetzlich vorgeschrieben ist.
          </p>

          <h2>9. Ihre Rechte</h2>
          <p>
            Sie haben nach Maßgabe der DSGVO Rechte auf Auskunft,
            Berichtigung, Löschung, Einschränkung der Verarbeitung,
            Datenübertragbarkeit und Widerspruch. Zudem können Sie sich bei
            einer Datenschutz-Aufsichtsbehörde beschweren. Schreiben Sie zur
            Ausübung Ihrer Rechte an <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
          </p>

          <h2>10. Offene Pflichtangaben</h2>
          <p>
            Stand: 13. September 2026. Vor öffentlicher Veröffentlichung sind
            die vollständige Betreiberanschrift, endgültige Kontaktadresse,
            Rechtsform, Plattform- und Transferangaben, Log-Aufbewahrung,
            Formularfristen sowie der tatsächliche Einbau der Chat- und
            Messkomponenten rechtlich und technisch zu prüfen. Diese Seite ist
            bis dahin ein Entwurf und keine rechtliche Beratung.
          </p>
        </div>
      </section>
    </main>
  );
}

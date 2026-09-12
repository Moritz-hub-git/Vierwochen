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
            {SITE.owner}, handelnd unter {SITE.name} (Einzelunternehmen)
            <br />
            <strong>Noch zu ergänzen vor Veröffentlichung:</strong> vollständige
            Anschrift
            <br />
            E-Mail: <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          </p>

          <h2>2. Bereitstellung der Website</h2>
          <p>
            Die Website wird bei Google Cloud in der Region Frankfurt am Main
            (europe-west3) betrieben. Beim Aufruf können technisch erforderliche
            Verbindungsdaten wie IP-Adresse, Zeitpunkt, aufgerufene Ressource
            und User-Agent in Serverprotokollen verarbeitet werden.
            Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (Interesse an einem
            sicheren und stabilen Betrieb). Anbieter ist Google Ireland Limited,
            Gordon House, Barrow Street, Dublin 4, Irland.
          </p>

          <h2>3. Direkter Prozess-Check</h2>
          <p>
            Wenn Sie den Prozess-Check absenden, verarbeiten wir Ihren Namen,
            Ihre E-Mail-Adresse, Ihr Unternehmen, Ihre Prozessbeschreibung,
            Angaben zum Volumen und freiwillige Zusatzinformationen. Die Angaben
            werden zur Prüfung Ihrer Anfrage in Google Firestore gespeichert und
            per Gmail an den Verantwortlichen zugestellt. Die Datenbank ist für
            die EU-Multiregion eur3 konfiguriert. Rechtsgrundlage ist Art. 6
            Abs. 1 lit. b DSGVO (vorvertragliche Maßnahmen auf Ihre Anfrage).
          </p>
          <p>
            Bitte übermitteln Sie nur Informationen, die für eine erste
            Einordnung erforderlich sind. Geben Sie insbesondere keine
            besonderen Kategorien personenbezogener Daten nach Art. 9 DSGVO und
            keine unnötigen Betriebsgeheimnisse ein.
          </p>

          <h2>4. Missbrauchsschutz</h2>
          <p>
            Beim Absenden wird die IP-Adresse zur Begrenzung automatisierter
            oder missbräuchlicher Anfragen verarbeitet und derzeit zusammen mit
            der Anfrage gespeichert. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f
            DSGVO. Die gespeicherte IP-Adresse wird nach 30 Tagen durch die
            regelmäßige Bereinigungsroutine aus der Anfrage entfernt.
          </p>

          <h2>5. Speicherdauer</h2>
          <p>
            Anfragedaten werden gelöscht, sobald sie für die Bearbeitung und
            eine mögliche Zusammenarbeit nicht mehr erforderlich sind, sofern
            keine gesetzlichen Aufbewahrungspflichten entgegenstehen. Eine
            verbindliche Frist und ihre technische Umsetzung für den neuen
            direkten Prozess-Check sind vor Veröffentlichung noch festzulegen
            und zu prüfen.
          </p>

          <h2>6. Reichweitenmessung, Cookies und KI</h2>
          <p>
            Auf den öffentlichen Seiten ist derzeit keine Reichweitenmessung
            eingebunden. Der öffentliche Prozess-Check verwendet keinen
            KI-Dialog und übermittelt Ihre Beschreibung nicht an ein KI-Modell.
            Für die dargestellten öffentlichen Funktionen werden keine Analyse-
            oder Werbe-Cookies gesetzt.
          </p>

          <h2>7. Empfänger und Auftragsverarbeitung</h2>
          <p>
            Google ist Auftragsverarbeiter für Hosting, Firestore und den
            Versand über Gmail. Die konkreten Vertragsgrundlagen,
            Unterauftragnehmer und anwendbaren Informationen zu möglichen
            Drittlandübermittlungen sind vor Veröffentlichung anhand der
            tatsächlich eingesetzten Google-Cloud- und Workspace-Konfiguration
            abschließend zu prüfen. Weitere Empfänger erhalten Daten nur, wenn
            dies für die Bearbeitung Ihrer Anfrage erforderlich oder gesetzlich
            vorgeschrieben ist.
          </p>

          <h2>8. Ihre Rechte</h2>
          <p>
            Sie haben nach Maßgabe der DSGVO Rechte auf Auskunft, Berichtigung,
            Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und
            Widerspruch. Zudem können Sie sich bei einer
            Datenschutz-Aufsichtsbehörde beschweren. Schreiben Sie zur Ausübung
            Ihrer Rechte an <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
          </p>

          <h2>9. Stand und offene Pflichtangaben</h2>
          <p>
            Stand: 12. September 2026. Vor Veröffentlichung sind die
            vollständige Anschrift, die Löschfristen und -routinen,
            Server-Log-Aufbewahrung sowie die Vertrags- und Transferangaben der
            eingesetzten Dienste rechtlich und technisch zu prüfen.
          </p>
        </div>
      </section>
    </main>
  );
}

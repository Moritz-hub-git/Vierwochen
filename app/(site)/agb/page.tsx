import type { Metadata } from "next";
import { SITE } from "@/lib/config";

export const metadata: Metadata = {
  title: "Allgemeine Geschäftsbedingungen",
  alternates: { canonical: "/agb" },
};

export default function TermsPage() {
  return (
    <main id="main" className="legal-page">
      <section className="page-hero">
        <div className="container prose">
          <p className="eyebrow">Rechtliches · Entwurf</p>
          <h1>Allgemeine Geschäftsbedingungen</h1>
          <p>
            <strong>
              Dieser Entwurf ist noch nicht für den Vertragsschluss freigegeben
              und muss vor Verwendung rechtlich geprüft werden.
            </strong>
          </p>
          <h2>§ 1 Geltungsbereich</h2>
          <p>
            Diese Bedingungen gelten für Verträge zwischen {SITE.owner},
            handelnd unter {SITE.name} (nachfolgend „Auftragnehmer“), und
            Unternehmern im Sinne des § 14 BGB über Analyse, Entwicklung,
            Einführung oder Betrieb individueller Prozessautomationen.
            Abweichende Bedingungen des Auftraggebers gelten nur, wenn sie
            ausdrücklich vereinbart wurden.
          </p>
          <h2>§ 2 Vertragsgegenstand</h2>
          <p>
            Leistungsumfang, Prozessgrenzen, Datenquellen, Integrationen,
            menschliche Freigaben, Abnahmekriterien, Zeitplan und Vergütung
            werden im jeweiligen Angebot beschrieben. Angaben auf dieser Website
            und Ergebnisse des Prozess-Checks sind unverbindliche
            Ersteinschätzungen. Sie sind kein Angebot und keine Zusage eines
            bestimmten Automatisierungsgrads.
          </p>
          <h2>§ 3 Mitwirkung</h2>
          <p>
            Der Auftraggeber stellt die vereinbarten Ansprechpersonen,
            Prozessinformationen, Testfälle, Daten und Zugänge rechtzeitig
            bereit und trifft notwendige fachliche Entscheidungen. Verzögerungen
            oder Mehraufwand infolge fehlender Mitwirkung werden gemeinsam
            bewertet und schriftlich geregelt.
          </p>
          <h2>§ 4 Vergütung und Änderungen</h2>
          <p>
            Vergütung, Fälligkeit und gegebenenfalls laufende Betriebsentgelte
            ergeben sich aus dem Angebot. Änderungen an Prozessumfang,
            Integrationen oder Abnahmekriterien werden vor Umsetzung in Textform
            festgehalten und können Zeitplan und Vergütung ändern.
          </p>
          <h2>§ 5 Abnahme</h2>
          <p>
            Soweit ein Werk geschuldet wird, erfolgt die Abnahme anhand der
            vorab vereinbarten Kriterien und Testfälle. Der Auftraggeber meldet
            wesentliche Abweichungen nachvollziehbar innerhalb der vereinbarten
            Prüffrist. Rechte bei Mängeln und die Folgen einer ausbleibenden
            oder fehlgeschlagenen Abnahme richten sich nach Vertrag und Gesetz.
          </p>
          <h2>§ 6 Betrieb und Automationsgrenzen</h2>
          <p>
            Produktivbetrieb, Servicezeiten, Monitoring, Backup,
            Wiederherstellung und Reaktionswege sind nur geschuldet, soweit sie
            beauftragt wurden. Automatische Entscheidungen und Aktionen sind auf
            die vereinbarten Regeln und Berechtigungen begrenzt. Der
            Auftraggeber bleibt für fachliche Freigaben und die rechtliche
            Zulässigkeit seiner Prozesse und Datenverarbeitung verantwortlich,
            soweit nicht ausdrücklich etwas anderes vereinbart ist.
          </p>
          <h2>§ 7 Rechte, Daten und Drittkomponenten</h2>
          <p>
            Nutzungsrechte am individuell geschaffenen Werk, Herausgabe von Code
            und Dokumentation sowie Zugriff auf Betriebsdaten werden im Angebot
            geregelt. Vorbestehende Komponenten, Open-Source-Software und
            Dienste Dritter bleiben ihren jeweiligen Lizenz- und
            Nutzungsbedingungen unterworfen. Daten des Auftraggebers bleiben
            dessen Daten.
          </p>
          <h2>§ 8 Gewährleistung und Haftung</h2>
          <p>
            Gewährleistung und Haftung richten sich nach den individuellen
            Vertragsregelungen und den zwingenden gesetzlichen Vorschriften.
            Eine Haftungsbegrenzung soll vor Verwendung dieser AGB rechtlich
            geprüft und passend zu Leistungsbild, Versicherungsschutz und
            Betriebsrisiko formuliert werden; dieser Entwurf enthält bewusst
            keine erfundene Deckung oder pauschale Haftungszusage.
          </p>
          <h2>§ 9 Vertraulichkeit und Datenschutz</h2>
          <p>
            Beide Parteien behandeln vertrauliche Informationen der jeweils
            anderen Partei geschützt. Soweit der Auftragnehmer personenbezogene
            Daten im Auftrag verarbeitet, schließen die Parteien vor Beginn der
            Verarbeitung eine Vereinbarung gemäß Art. 28 DSGVO. Weitere
            Sicherheits- und Löschanforderungen werden projektbezogen
            vereinbart.
          </p>
          <h2>§ 10 Schlussbestimmungen</h2>
          <p>
            Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss
            des UN-Kaufrechts. Ein Gerichtsstand wird nur vereinbart, soweit
            dies gesetzlich zulässig und im Vertrag wirksam festgelegt ist. Die
            vollständige Anbieteranschrift und eine finale Gerichtsstandregelung
            sind vor Veröffentlichung dieses Entwurfs zu ergänzen.
          </p>
        </div>
      </section>
    </main>
  );
}

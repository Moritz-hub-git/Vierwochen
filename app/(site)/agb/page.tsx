import type { Metadata } from "next";

export const metadata: Metadata = { title: "AGB — vierwochen" };

/**
 * Vollständig strukturierter Entwurf (PROMPT.md §11): Geltung nur gegenüber
 * Unternehmern, Festpreis, Vier-Wochen-Zusage, 50/50-Zahlung, Eigentumsübergang,
 * 12 Monate Gewährleistung, Haftungsbegrenzung, Vertraulichkeit.
 */
export default function Agb() {
  return (
    <main className="container legal">
      <h1>Allgemeine Geschäftsbedingungen</h1>

      <h2>§ 1 Geltungsbereich</h2>
      <p>
        Diese Bedingungen gelten für alle Verträge über die Entwicklung von
        Individualsoftware zwischen Moritz Schumacher (nachfolgend „Auftragnehmer")
        und dem jeweiligen Auftraggeber. Das Angebot richtet sich ausschließlich an
        Unternehmer im Sinne von § 14 BGB, juristische Personen des öffentlichen
        Rechts und öffentlich-rechtliche Sondervermögen. Verbraucher sind vom
        Angebot ausgeschlossen. Entgegenstehende Einkaufsbedingungen des
        Auftraggebers gelten nur, soweit ihnen schriftlich zugestimmt wurde.
      </p>

      <h2>§ 2 Vertragsgegenstand und Festangebot</h2>
      <p>
        Grundlage jedes Auftrags ist ein schriftliches Festangebot, das Umfang,
        Abnahmekriterien, Festpreis und Liefertermin benennt. Ersteinschätzungen
        auf der Website (Preisspannen, Lösungsskizzen) sind unverbindlich und kein
        Angebot. Änderungen des Umfangs während der Umsetzung werden schriftlich
        vereinbart; geringfügige Kurskorrekturen innerhalb des vereinbarten Umfangs
        sind eingeschlossen.
      </p>

      <h2>§ 3 Vier-Wochen-Zusage</h2>
      <p>
        Der Auftragnehmer stellt das Werk innerhalb von vier Wochen ab
        Auftragserteilung und Bereitstellung der vereinbarten Mitwirkungsleistungen
        zur Abnahme bereit. Besteht das Werk die vereinbarte Abnahme bis zum Ende
        der Nachfrist gemäß § 5 nicht, entfällt der Vergütungsanspruch; bereits
        geleistete Zahlungen werden erstattet. Verzögerungen, die auf fehlende
        Mitwirkung des Auftraggebers zurückgehen, verlängern die Frist entsprechend.
      </p>

      <h2>§ 4 Vergütung und Zahlung</h2>
      <p>
        Es gilt der im Festangebot genannte Festpreis, netto zuzüglich gesetzlicher
        Umsatzsteuer. Die Zahlung erfolgt zu 50 % bei Auftragserteilung und zu 50 %
        nach erfolgreicher Abnahme. Der Betrieb der Software (Hosting, Pflege) ist
        nicht Teil des Festpreises und wird, falls beauftragt, monatlich berechnet
        und ist monatlich kündbar.
      </p>

      <h2>§ 5 Abnahme</h2>
      <p>
        Die Abnahme erfolgt gegen die im Festangebot vereinbarten Kriterien. Der
        Auftraggeber prüft innerhalb von fünf Arbeitstagen nach Bereitstellung.
        Wesentliche Mängel werden dokumentiert; der Auftragnehmer erhält eine
        angemessene Nachfrist zur Behebung. Unwesentliche Mängel berechtigen nicht
        zur Verweigerung der Abnahme, werden jedoch im Rahmen der Gewährleistung
        behoben.
      </p>

      <h2>§ 6 Rechte am Werk, Daten und Zugängen</h2>
      <p>
        Mit vollständiger Zahlung gehen das Eigentum am Quellcode sowie die
        ausschließlichen, zeitlich und räumlich unbeschränkten Nutzungsrechte am
        Werk auf den Auftraggeber über. Sämtliche Daten und Zugänge (Repositories,
        Cloud-Projekte, Datenbanken) werden dem Auftraggeber übertragen oder auf
        dessen Konten geführt. Vorbestehende, allgemein einsetzbare Komponenten und
        Werkzeuge des Auftragnehmers bleiben davon unberührt; an ihnen erhält der
        Auftraggeber ein einfaches, unbeschränktes Nutzungsrecht.
      </p>

      <h2>§ 7 Gewährleistung</h2>
      <p>
        Die Gewährleistungsfrist beträgt 12 Monate ab Abnahme. Der Auftragnehmer
        behebt Mängel, die den vereinbarten Umfang betreffen, in dieser Zeit
        kostenfrei. Nachbesserung setzt voraus, dass die Software seit der Abnahme
        nicht durch Dritte verändert wurde; andernfalls nur, soweit die Änderung
        für den Mangel unerheblich ist.
      </p>

      <h2>§ 8 Haftung</h2>
      <p>
        Der Auftragnehmer haftet unbeschränkt bei Vorsatz und grober Fahrlässigkeit
        sowie bei Verletzung von Leben, Körper und Gesundheit. Bei einfacher
        Fahrlässigkeit haftet er nur für die Verletzung wesentlicher
        Vertragspflichten, begrenzt auf den vertragstypischen, vorhersehbaren
        Schaden, höchstens jedoch auf die Höhe des Auftragswerts. Die Haftung für
        mittelbare Schäden, entgangenen Gewinn und Datenverlust, der bei
        ordnungsgemäßer Datensicherung vermeidbar gewesen wäre, ist ausgeschlossen.
        Die Haftung nach dem Produkthaftungsgesetz bleibt unberührt.
      </p>

      <h2>§ 9 Vertraulichkeit</h2>
      <p>
        Beide Parteien behandeln alle im Rahmen der Zusammenarbeit bekannt
        gewordenen Geschäfts- und Betriebsgeheimnisse dauerhaft vertraulich. Der
        Auftragnehmer nennt den Auftraggeber nicht als Referenz und legt keine
        Projektinhalte offen, es sei denn, der Auftraggeber stimmt schriftlich zu.
      </p>

      <h2>§ 10 Mitwirkung des Auftraggebers</h2>
      <p>
        Der Auftraggeber benennt eine entscheidungsbefugte Ansprechperson, stellt
        benötigte Informationen, Testdaten und Zugänge rechtzeitig bereit und nimmt
        an den wöchentlichen Abstimmungen teil.
      </p>

      <h2>§ 11 Schlussbestimmungen</h2>
      <p>
        Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des
        UN-Kaufrechts. Gerichtsstand ist, soweit zulässig,{" "}
        <span className="placeholder">PLATZHALTER: Gerichtsstand</span>. Sollten
        einzelne Bestimmungen unwirksam sein, bleibt der Vertrag im Übrigen
        wirksam.
      </p>

      <div className="legal-note">
        Hinweis: Dieser Entwurf ist vor dem offiziellen Livegang anwaltlich zu prüfen
        und alle mit PLATZHALTER markierten Angaben sind zu ergänzen.
      </div>
    </main>
  );
}

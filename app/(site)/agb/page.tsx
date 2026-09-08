import type { Metadata } from "next";
import { BrandPage } from "@/components/v/BrandNav";
import { ACCEPTANCE_PROMISE, SITE, WARRANTY_MONTHS } from "@/lib/config";
import s from "@/components/v/brandnav.module.css";

export const metadata: Metadata = { title: "Allgemeine Geschäftsbedingungen" };

/**
 * Strukturierter Entwurf (PROMPT.md §11): Geltung nur gegenüber Unternehmern,
 * Festpreis, Vier-Wochen-Zusage, 50/50-Zahlung, Eigentumsübergang,
 * Gewährleistung (WARRANTY_MONTHS), Haftungsbegrenzung, Vertraulichkeit.
 * Die Abnahme-Zusage ist wortgleich mit der Seite (ACCEPTANCE_PROMISE).
 */
export default function Agb() {
  return (
    <BrandPage>
      {/* Entwurf — vor Verwendung anwaltlich prüfen. */}
      <h1>Allgemeine Geschäftsbedingungen</h1>

      <h2>§ 1 Geltungsbereich</h2>
      <p>
        Diese Bedingungen gelten für alle Verträge über die Entwicklung von
        Individualsoftware zwischen {SITE.owner}, handelnd unter {SITE.name}{" "}
        (nachfolgend „Auftragnehmer"), und dem jeweiligen Auftraggeber. Das
        Angebot richtet sich ausschließlich an Unternehmer im Sinne von § 14 BGB,
        juristische Personen des öffentlichen Rechts und öffentlich-rechtliche
        Sondervermögen. Verbraucher sind vom Angebot ausgeschlossen.
        Entgegenstehende Einkaufsbedingungen des Auftraggebers gelten nur, soweit
        ihnen schriftlich zugestimmt wurde.
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
        zur Abnahme bereit. Verzögerungen, die auf fehlende Mitwirkung des
        Auftraggebers zurückgehen, verlängern die Frist entsprechend. Die Folgen
        einer nicht bestandenen Abnahme regelt § 5.
      </p>

      <h2>§ 4 Vergütung und Zahlung</h2>
      <p>
        Es gilt der im Festangebot genannte Festpreis, netto zuzüglich gesetzlicher
        Umsatzsteuer. Die Zahlung erfolgt zu 50 % bei Auftragserteilung (erste
        Rate) und zu 50 % nach erfolgreicher Abnahme (zweite Rate). Der Betrieb
        der Software (Hosting, Pflege, Weiterentwicklung) ist nicht Teil des
        Festpreises und wird, falls beauftragt, monatlich berechnet und ist
        monatlich kündbar.
      </p>

      <h2>§ 5 Abnahme</h2>
      <p>
        Die Abnahme erfolgt gegen die im Festangebot vereinbarten Kriterien. Der
        Auftraggeber prüft innerhalb von fünf Arbeitstagen nach Bereitstellung.
        Wesentliche Mängel werden dokumentiert; der Auftragnehmer erhält eine
        angemessene Nachfrist zur Behebung. Unwesentliche Mängel berechtigen nicht
        zur Verweigerung der Abnahme, werden jedoch im Rahmen der Gewährleistung
        behoben. {ACCEPTANCE_PROMISE.replace(/\.$/, "")} (50 % des Festpreises);
        die erste Rate wird nicht erstattet.
      </p>

      <h2>§ 6 Rechte am Werk, Daten und Zugängen</h2>
      <p>
        Mit vollständiger Zahlung gehen das Eigentum am Quellcode sowie die
        ausschließlichen, zeitlich und räumlich unbeschränkten Nutzungsrechte am
        Werk auf den Auftraggeber über. Sämtliche Daten und Zugänge (Repositories,
        Cloud-Projekte, Datenbanken) werden dem Auftraggeber übertragen oder auf
        dessen Konten geführt. Vorbestehende, allgemein einsetzbare Komponenten und
        Werkzeuge des Auftragnehmers bleiben davon unberührt; an ihnen erhält der
        Auftraggeber ein einfaches, unbeschränktes Nutzungsrecht. Das Repository
        wird ab Projektbeginn in der Organisation des Auftraggebers geführt oder
        dorthin gespiegelt. Scheitert die Abnahme endgültig (§ 5), verbleibt der
        bis dahin entstandene Quellcode beim Auftraggeber; er erhält daran ein
        einfaches, zeitlich und räumlich unbeschränktes Nutzungsrecht.
      </p>

      <h2>§ 7 Gewährleistung</h2>
      <p>
        Die Gewährleistungsfrist beträgt {WARRANTY_MONTHS} Monate ab Abnahme
        (§ 634a BGB). Der Auftragnehmer behebt Mängel, die den vereinbarten
        Umfang betreffen, in dieser Zeit kostenfrei. Nachbesserung setzt voraus,
        dass die Software seit der Abnahme nicht durch Dritte verändert wurde;
        andernfalls nur, soweit der Mangel nicht auf diese Änderung
        zurückzuführen ist.
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
        <span className={s.placeholder}>PLATZHALTER: Gerichtsstand</span>. Sollten
        einzelne Bestimmungen unwirksam sein, bleibt der Vertrag im Übrigen
        wirksam.
      </p>
    </BrandPage>
  );
}

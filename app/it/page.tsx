import type { Metadata } from "next";
import Link from "next/link";

/**
 * Fakten für IT und Datenschutzbeauftragte (Persona-Review 2026-08-14).
 *
 * Wer war gemeint: der Abgestellte aus dem größeren Unternehmen, der intern
 * IT-Sicherheit, Einkauf und Datenschutz überzeugen muss. Er braucht keinen
 * Verkaufstext, sondern eine Seite, die er kommentarlos weiterleiten kann.
 * Deshalb: nüchterne Aussagen, keine Superlative, ehrlich auch dort, wo es
 * unbequem ist (KI-Dialog dieser Website über den globalen Endpunkt).
 */

export const metadata: Metadata = {
  title: "Fakten für Ihre IT — vierwochen.de",
  description:
    "Technik, Betrieb, Datenhaltung und Datenschutz von vierwochen-Projekten — kompakt zum Weiterleiten an IT und Datenschutzbeauftragte.",
};

function Fact({ title, items }: { title: string; items: React.ReactNode[] }) {
  return (
    <>
      <h2>{title}</h2>
      <ul>
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </>
  );
}

export default function ItFaktenPage() {
  return (
    <main className="container legal">
      <h1>Fakten für Ihre IT</h1>
      <p>
        Diese Seite ist zum Weiterleiten gedacht — an IT-Leitung, Administratoren
        oder Datenschutzbeauftragte. Sie beschreibt, wie Projekte von
        vierwochen.de technisch aufgesetzt werden und was mit Daten passiert.
        Fragen dazu beantworte ich gern direkt im{" "}
        <Link href="/termin">Gespräch</Link> oder per E-Mail an{" "}
        <a href="mailto:kontakt@vierwochen.de">kontakt@vierwochen.de</a>.
      </p>

      <Fact
        title="Technik"
        items={[
          "Standardtechnik statt Exoten: TypeScript/Node oder Python, relationale bzw. dokumentenbasierte Standard-Datenbanken, Auslieferung als Container.",
          "Keine proprietären Frameworks, an denen nur eine Person weiterentwickeln kann — jede Entwicklerin mit gängigem Web-Stack findet sich zurecht.",
          "Diese Website selbst ist mit demselben Stack gebaut (Next.js/TypeScript, Container auf Google Cloud Run) und dient als lebendes Beispiel.",
        ]}
      />

      <Fact
        title="Betrieb"
        items={[
          "Wahlweise in Ihrer Umgebung (eigene Cloud-Organisation oder eigener Server) — Sie halten die Adminrechte, ich bekomme nur, was das Projekt braucht.",
          "Oder von mir betrieben: Google Cloud, Region Frankfurt (europe-west3), monatlich kündbar. Ein Wechsel zu Ihnen ist jederzeit möglich, weil Code und Daten ohnehin Ihnen gehören.",
          "Übergabe ist Teil des Festpreises: vollständige Dokumentation, Adminzugänge, Übergabegespräch mit Ihrer IT.",
        ]}
      />

      <Fact
        title="Daten und Datenschutz"
        items={[
          "Projektdaten werden in EU-Regionen verarbeitet und gespeichert; wir schließen einen Auftragsverarbeitungsvertrag nach Art. 28 DSGVO.",
          "Kundendaten werden nicht zum Training von KI-Modellen verwendet.",
          "Kommt KI im Produkt zum Einsatz, geschieht das nur, wo es vereinbart ist — mit konfigurierbarer Verarbeitungsregion und dokumentierten Datenflüssen.",
          <>
            Transparenz zu dieser Website: Der KI-Dialog auf der Startseite läuft
            derzeit über den globalen Endpunkt von Google Vertex AI, eine
            Verarbeitung außerhalb der EU ist dabei möglich; Hosting und
            Datenbank liegen in EU-Regionen. Details stehen in der{" "}
            <Link href="/datenschutz">Datenschutzerklärung</Link>.
          </>,
        ]}
      />

      <Fact
        title="Zugriffe und Schlüssel"
        items={[
          "Dienstkonten (Service-Accounts) mit minimalen Rechten statt persönlicher Konten; keine API-Schlüssel im Quellcode.",
          "Geheimnisse liegen in der Laufzeitkonfiguration der Zielumgebung, nicht im Repository.",
          "Zugänge werden bei Übergabe auf Ihre Konten umgezogen; meine werden entfernt oder auf das vereinbarte Betriebsmaß reduziert.",
        ]}
      />

      <Fact
        title="Eigentum und Exit"
        items={[
          "Der vollständige Quellcode gehört Ihnen — kein Lizenzmodell, keine Laufzeitgebühren für die Software selbst.",
          "Abnahme gegen vorab schriftlich vereinbarte Kriterien; die zweite Zahlungshälfte wird erst danach fällig.",
          "12 Monate Gewährleistung auf den vereinbarten Umfang.",
          "Exit ohne Drama: Da Code, Daten, Doku und Zugänge bei Ihnen liegen, kann jederzeit ein anderer Dienstleister oder Ihre IT übernehmen.",
        ]}
      />

      <p style={{ marginTop: "2rem", fontSize: "0.9rem" }}>
        Stand: August 2026. Diese Seite beschreibt die Standard-Arbeitsweise;
        Abweichungen (z. B. besondere Compliance-Anforderungen) werden im
        Festangebot ausdrücklich geregelt.
      </p>
    </main>
  );
}

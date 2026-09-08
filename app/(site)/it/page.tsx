import type { Metadata } from "next";
import Link from "next/link";
import { BrandPage } from "@/components/v/BrandNav";
import { ACCEPTANCE_PROMISE, SITE, WARRANTY_MONTHS } from "@/lib/config";
import s from "@/components/v/brandnav.module.css";

/**
 * Fakten für IT und Datenschutzbeauftragte (Persona-Review 2026-08-14,
 * bestätigt im Vollreview 2026-09-08: die Seite, die IT-Leiter vermisst
 * haben).
 *
 * Wer war gemeint: der Abgestellte aus dem größeren Unternehmen, der intern
 * IT-Sicherheit, Einkauf und Datenschutz überzeugen muss. Er braucht keinen
 * Verkaufstext, sondern eine Seite, die er kommentarlos weiterleiten kann.
 * Deshalb: nüchterne Aussagen, keine Superlative, ehrlich auch dort, wo es
 * unbequem ist — ein Kopf plus KI, KI-Dialog dieser Website über den
 * globalen Endpunkt. Der Bus-Faktor wird nicht wegdiskutiert, sondern
 * mechanisch entschärft.
 */

export const metadata: Metadata = {
  title: "Fakten für Ihre IT",
  description: `Technik, Betrieb, Datenhaltung und Datenschutz von ${SITE.name}-Projekten — kompakt zum Weiterleiten an IT und Datenschutzbeauftragte.`,
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
    <BrandPage>
      <h1>Fakten für Ihre IT</h1>
      <p className={s.lead}>
        Diese Seite ist zum Weiterleiten gedacht — an IT-Leitung, Administratoren
        oder Datenschutzbeauftragte. Sie beschreibt, wie Projekte von {SITE.name}{" "}
        technisch aufgesetzt werden und was mit Daten passiert. Fragen dazu
        beantworte ich gern direkt im <Link href="/termin">Gespräch</Link> oder
        per E-Mail an <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
      </p>

      <Fact
        title="Wer baut"
        items={[
          <>
            Ein Kopf plus KI: {SITE.founder.name} entwirft, baut und verantwortet
            das Projekt selbst; KI-Werkzeuge übernehmen Tippen, Tests und
            Routinearbeit — unter Aufsicht, nie allein. Es gibt kein Team im
            Hintergrund, und diese Seite behauptet auch keines.
          </>,
          <>
            Das ergibt einen Bus-Faktor von eins. Er wird nicht mit Worten,
            sondern mechanisch entschärft: Code, Dokumentation und Zugänge liegen
            ab Tag 1 bei Ihnen (siehe „Eigentum und Exit"). Fällt der Erbauer
            aus, fehlt Ihnen eine Person — aber nichts, was Sie brauchen.
          </>,
        ]}
      />

      <Fact
        title="Technik"
        items={[
          "Standardtechnik statt Exoten: Next.js/TypeScript für Oberfläche und Server, PostgreSQL oder Firestore als Datenbank, Auslieferung als Container.",
          "Keine proprietären Frameworks, an denen nur eine Person weiterentwickeln kann — jede Entwicklerin mit gängigem Web-Stack findet sich zurecht.",
          "Automatisierte Tests für die Kernlogik und Dependency-Scanning im Build sind Teil des Lieferumfangs, nicht Zusatzleistung.",
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
          "Das Repository liegt ab Tag 1 in Ihrer Organisation (oder wird dort gespiegelt); Sie sehen jeden Commit, nicht erst das Ergebnis.",
          "Der vollständige Quellcode gehört Ihnen — kein Lizenzmodell, keine Laufzeitgebühren für die Software selbst.",
          `Abnahme gegen vorab schriftlich vereinbarte Kriterien; die zweite Rate wird erst danach fällig. ${ACCEPTANCE_PROMISE}`,
          `${WARRANTY_MONTHS} Monate Gewährleistung auf den vereinbarten Umfang — die gesetzliche Frist beim Werkvertrag, nicht weniger.`,
          "Exit ohne Drama: Da Code, Daten, Doku und Zugänge bei Ihnen liegen, kann jederzeit ein anderer Dienstleister oder Ihre IT übernehmen.",
        ]}
      />

      <p className={s.muted} style={{ marginTop: "2rem" }}>
        Stand: September 2026. Diese Seite beschreibt die Standard-Arbeitsweise;
        Abweichungen (z. B. besondere Compliance-Anforderungen) werden im
        Festangebot ausdrücklich geregelt.
      </p>
    </BrandPage>
  );
}

import Link from "next/link";
import { ACCEPTANCE_PROMISE, PRICE, SITE, WARRANTY_MONTHS } from "@/lib/config";
import s from "./styles.module.css";

/**
 * Die berechtigten Fragen — bewusst die unbequemen zuerst (Ausfallrisiko,
 * „warum nur ein Kopf", „wo sind die Referenzen"). Wer den Einwand selbst
 * ausspricht und ehrlich beantwortet, wirkt souveräner als jede Behauptung.
 *
 * Ehrlichkeitsregel: Firmenstimme („wir") ist richtig — verboten sind nur
 * überprüfbare Behauptungen über Personal, die nicht stimmen („festes Team
 * je Projekt"). Wo es um den Verantwortlichen geht, heißt er Moritz.
 * Zahlen und Zusagen kommen aus lib/config.ts, damit sie überall gleich sind.
 *
 * Natives <details>: kein JavaScript, tastaturbedienbar, indexierbar.
 */

const first = SITE.founder.name.split(" ")[0];
const floor = `${PRICE.floor.toLocaleString("de-DE")} €`;

const FAQS: { q: string; a: React.ReactNode }[] = [
  {
    q: "Was, wenn jemand bei Ihnen ausfällt?",
    a: `Ihr Projekt hat einen Verantwortlichen: ${first}. Bei größeren Vorhaben arbeiten Partner mit, die er selbst ausgewählt hat. Die Absicherung ist deshalb nicht personell, sondern mechanisch: verbreiteter Standard-Stack, alles dokumentiert, Code und Zugänge liegen ab Tag 1 bei Ihnen. Jeder gute Entwickler kann übernehmen — Sie sind an niemanden gekettet. Die ${WARRANTY_MONTHS} Monate Gewährleistung gelten auf den abgenommenen Stand, auch wenn später jemand anderes weiterbaut — solange der Fehler nicht daher kommt.`,
  },
  {
    q: "Warum geht das schneller als bei einer großen Agentur?",
    a: `Weil es keine Übergabekette gibt. Der Mensch, der Ihren Ablauf versteht, ist derselbe, der ihn baut — ${first}, mit AI als hundert Händen. Keine Übersetzung von Ihnen über Projektleitung und Anforderungsdokument bis zur Entwicklung, bei der die Hälfte der Absicht verloren geht. „Besser“ behaupten wir nicht — passgenauer. Und für die Qualität verlassen Sie sich nicht auf unser Wort: Festpreis, Abnahme nach vereinbarten Kriterien, ${WARRANTY_MONTHS} Monate Gewährleistung.`,
  },
  {
    q: "Haben Sie Referenzen?",
    a: (
      <>
        Ehrlich: Mit dieser Methode sind wir neu am Markt — deshalb Festpreis,
        und die zweite Rate erst nach Abnahme. Belegbar ist die Herkunft von{" "}
        {SITE.founder.name}: {SITE.founder.facts.join(". ")}. Und diese Website
        samt KI-Dialog ist selbst mit der Methode gebaut — Sie benutzen gerade
        das Beispiel.
      </>
    ),
  },
  {
    q: "Woher wissen Sie, was wir wirklich brauchen?",
    a: "Sie kennen Ihren Betrieb — wir kennen die Muster aus vielen Produkten: welche Funktionen benutzt werden, welche Darstellungen funktionieren und was nur teuer aussieht. Deshalb raten wir auch ab. Der Festpreis hält uns dabei ehrlich: Unnötiges zu bauen kostet uns, nicht Sie.",
  },
  {
    q: "Was, wenn das Ergebnis nicht passt?",
    a: `${ACCEPTANCE_PROMISE} Die Abnahmekriterien legen wir in Woche 1 gemeinsam fest — Sie messen uns an dem, was vereinbart ist, nicht an dem, was wir hineininterpretiert haben. Scheitert die Abnahme, behalten Sie den bis dahin gebauten Code.`,
  },
  {
    q: "Wann ist fertige Software die bessere Wahl?",
    a: "Bei Standardproblemen: Buchhaltung, Zeiterfassung, ein CRM ohne Besonderheiten. Dafür gibt es gute Produkte für wenige Euro im Monat, und wir raten Ihnen ehrlich dazu. Individuell lohnt sich erst, wenn Ihr Ablauf anders ist als der Standard — und Sie sich sonst dem Werkzeug anpassen müssten statt umgekehrt.",
  },
  {
    q: "Was passiert nach den vier Wochen?",
    a: `Der Teil, den die meisten unterschätzen: Änderungen bleiben schnell. Der Kopf, der Ihr System gebaut hat und Ihr Geschäft kennt, plus AI — eine Anpassung ist ein Anruf und meist innerhalb weniger Tage erledigt, kein Ticket und drei Wochen. Auf Wunsch übernehmen wir Betrieb und Wartung gleich mit, monatlich kündbar.`,
  },
  {
    q: "Ist AI-geschriebener Code sicher und wartbar?",
    a: (
      <>
        AI schreibt schnell, aber sie entscheidet nichts. Architektur, Prüfung
        und Verantwortung liegen bei {first} — Standard-Stack, Tests,
        Dokumentation, gebaut, damit auch andere jederzeit damit arbeiten
        können. Was Ihre IT dazu wissen will (Hosting, Daten, Zugänge), steht
        auf der <Link href="/it">Seite für die IT</Link>.
      </>
    ),
  },
  {
    q: "Ich will ein Produkt bauen, das ich verkaufe — geht das?",
    a: "Ja, wenn die erste Version mit wenigen Kunden startet: Sie bekommen eine verkaufbare Version 1 mit Anmeldung, getrennten Mandanten und Abrechnung — und Sie besitzen den Code, um später ein Team darauf zu setzen. Nicht der richtige Weg, wenn von Anfang an tausende Nutzer, ein App-Store-Launch in drei Ländern oder eine Zulassung als Medizinprodukt nötig sind.",
  },
  {
    q: "Für wen ist das nichts?",
    a: "Für ERP-Ablösungen und Plattformen, an denen später zwanzig Leute gleichzeitig entwickeln. Viele Nutzer sind kein Problem — viele gleichzeitige Entwickler sind es. Wir bauen fokussierte Werkzeuge, die einen Ablauf richtig lösen — das ist die Stärke der Methode, und wir sagen ehrlich, wenn Ihr Vorhaben nicht dazu passt.",
  },
  {
    q: "Was kostet es?",
    a: `Ab ${floor} als Festpreis mit Abnahmetermin im Angebot, ${PRICE.vatNote}. Damit werden auch Probleme wirtschaftlich, die für klassische Projekte immer zu klein waren. Die Preiseinschätzung unten: meist 3 Fragen, eine Minute.`,
  },
];

export default function FAQ() {
  return (
    <section className={s.faqSection} aria-label="Häufige Fragen">
      <div className={s.sectionHead}>
        <span className={s.kicker}>Klartext</span>
        <h2 className={s.h2}>Die Fragen, die Sie zu Recht stellen</h2>
      </div>
      <div className={s.faq}>
        {FAQS.map((f) => (
          <details key={f.q} className={s.faqItem}>
            <summary>
              {f.q}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="m6 9 6 6 6-6" />
              </svg>
            </summary>
            <p>{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

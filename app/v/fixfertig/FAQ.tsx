import s from "./styles.module.css";

/**
 * Die berechtigten Fragen — bewusst die unbequemen zuerst (Bus-Faktor,
 * „warum soll ein Kopf besser sein"). Wer den Einwand selbst ausspricht
 * und ehrlich beantwortet, wirkt souveräner als jede Behauptung.
 * Natives <details>: kein JavaScript, tastaturbedienbar, indexierbar.
 */

const FAQS = [
  {
    q: "Alles hängt an einer Person — was, wenn die ausfällt?",
    a: "Deshalb bauen wir auf einem verbreiteten Standard-Stack, dokumentieren alles, und der Code gehört vom ersten Tag Ihnen. Jeder gute Entwickler kann übernehmen — Sie sind an niemanden gekettet. Die zwölf Monate Garantie gelten unabhängig davon.",
  },
  {
    q: "Warum soll ein Kopf besser sein als ein ganzes Team?",
    a: "„Besser“ behaupten wir nicht — passgenauer. Zwischen Ihrem Problem und dem Code liegt keine einzige Übersetzung, also kommt das an, was Sie gemeint haben. Und für die Qualität verlassen Sie sich nicht auf unser Wort: Festpreis, Abnahme nach vereinbarten Kriterien, Garantie — wir haften dafür.",
  },
  {
    q: "Was, wenn das Ergebnis nicht passt?",
    a: "Dann zahlen Sie die zweite Hälfte nicht. Die Abnahmekriterien legen wir in Woche 1 gemeinsam fest — Sie messen uns an dem, was vereinbart ist, nicht an dem, was wir hineininterpretiert haben.",
  },
  {
    q: "Was passiert nach den vier Wochen?",
    a: "Der Teil, den die meisten unterschätzen: Änderungen bleiben schnell. Der Kopf, der Ihr System gebaut hat und Ihr Geschäft kennt, plus AI — eine Anpassung ist ein Anruf und meist ein Tag, kein Ticket und drei Wochen. Auf Wunsch übernehmen wir Betrieb und Wartung gleich mit.",
  },
  {
    q: "Ist AI-geschriebener Code sicher und wartbar?",
    a: "AI schreibt schnell, aber sie entscheidet nichts. Architektur, Prüfung und Verantwortung liegen bei einem erfahrenen Entwickler — Standard-Stack, Tests, Dokumentation, gebaut, damit auch andere jederzeit damit arbeiten können.",
  },
  {
    q: "Für wen ist das nichts?",
    a: "Für ERP-Ablösungen und Plattformen, an denen später zwanzig Leute gleichzeitig entwickeln. Wir bauen fokussierte Werkzeuge, die einen Ablauf richtig lösen — das ist die Stärke der Methode, und wir sagen ehrlich, wenn Ihr Vorhaben nicht dazu passt.",
  },
  {
    q: "Was kostet es?",
    a: "Ab 9.500 €, als Festpreis mit Abnahmetermin im Angebot. Damit werden auch Probleme wirtschaftlich, die für klassische Projekte immer zu klein waren. Die Preiseinschätzung unten ist kostenlos und dauert zehn Sekunden.",
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

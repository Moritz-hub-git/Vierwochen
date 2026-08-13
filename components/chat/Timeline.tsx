"use client";

/**
 * Die vier Wochen als visuelle Schiene.
 *
 * Warum das verkauft: Die Vier-Wochen-Zusage ist das zentrale Versprechen der
 * Marke. Als Aufzählung bleibt sie eine Behauptung; als Schiene mit Datum am
 * Ende wird sie ein Plan. „Abnahme am 12. September" ist etwas, das man sich
 * im Kalender vorstellen kann — eine Liste mit vier Zeilen nicht.
 */
export default function Timeline({ weeks }: { weeks: { week: number; label: string }[] }) {
  // Start: kommender Montag. Ende: vier Wochen später, Freitag.
  const start = new Date();
  start.setDate(start.getDate() + ((8 - start.getDay()) % 7 || 7));
  const end = new Date(start.getTime() + 25 * 24 * 3600 * 1000);
  const fmt = (d: Date) =>
    new Intl.DateTimeFormat("de-DE", { day: "numeric", month: "long" }).format(d);

  return (
    <div className="tl">
      <div className="tl-head">
        <span className="sketch-label">Ihre vier Wochen</span>
        <span className="tl-dates">
          {fmt(start)} → <strong>{fmt(end)}</strong>
        </span>
      </div>
      <div className="tl-track" aria-hidden />
      <ol className="tl-weeks">
        {weeks.map((w, i) => (
          <li className="tl-week" key={w.week} style={{ animationDelay: `${i * 0.1}s` }}>
            <span className="tl-marker">
              <span className="tl-num">{w.week}</span>
            </span>
            <span className="tl-week-label">Woche {w.week}</span>
            <span className="tl-week-text">{w.label}</span>
          </li>
        ))}
        <li className="tl-week tl-week-final" style={{ animationDelay: `${weeks.length * 0.1}s` }}>
          <span className="tl-marker tl-marker-done">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </span>
          <span className="tl-week-label">Abnahme</span>
          <span className="tl-week-text">
            Sie prüfen gegen die vereinbarten Kriterien. Erst dann wird die zweite
            Hälfte fällig.
          </span>
        </li>
      </ol>
    </div>
  );
}

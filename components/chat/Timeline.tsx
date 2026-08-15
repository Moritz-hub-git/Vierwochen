"use client";

/**
 * Der Weg zum Launch — bewusst knapp (Rücksprache 2026-08-15: die vorherige
 * Fassung mit sechs Einzelschritten wirkte überladen). Drei Stationen genügen,
 * um aus der Vier-Wochen-Zusage einen Plan mit echten Daten zu machen: das
 * Beratungsgespräch (der nächste Klick), der Kick-off, der Launch. Die
 * Bauphase selbst steht kompakt als eine Zeile mit den vier Wochenzielen,
 * statt als vier eigene Stationen.
 */

function addDays(d: Date, days: number): Date {
  return new Date(d.getTime() + days * 24 * 3600 * 1000);
}

const fmtLong = (d: Date) =>
  new Intl.DateTimeFormat("de-DE", { weekday: "short", day: "numeric", month: "long" }).format(d);

export function launchDate(): Date {
  const today = new Date();
  const nextMonday = addDays(today, ((8 - today.getDay()) % 7) || 7);
  const kickoff = addDays(nextMonday, 7);
  return addDays(kickoff, 25); // Freitag der vierten Woche
}

export default function Timeline({ weeks }: { weeks: { week: number; label: string }[] }) {
  const today = new Date();
  const nextMonday = addDays(today, ((8 - today.getDay()) % 7) || 7);
  const kickoff = addDays(nextMonday, 7);
  const launch = addDays(kickoff, 25);

  return (
    <div className="sched">
      <ol className="sched-list">
        <li className="sched-item sched-item-now">
          <span className="sched-dot sched-dot-pulse" aria-hidden />
          <span className="sched-body">
            <span className="sched-date">Diese Woche</span>
            <span className="sched-title">Beratungsgespräch</span>
          </span>
        </li>

        <li className="sched-item">
          <span className="sched-dot" aria-hidden />
          <span className="sched-body">
            <span className="sched-date">{fmtLong(kickoff)}</span>
            <span className="sched-title">Kick-off-Workshop</span>
          </span>
        </li>

        {weeks.length > 0 && (
          <li className="sched-item sched-item-build">
            <span className="sched-dot sched-dot-num" aria-hidden>4</span>
            <span className="sched-body">
              <span className="sched-date">4 Wochen Bauzeit</span>
              <span className="sched-weeks">
                {weeks.map((w) => (
                  <span className="sched-week" key={w.week}>
                    <b>W{w.week}</b> {w.label}
                  </span>
                ))}
              </span>
            </span>
          </li>
        )}

        <li className="sched-item sched-item-final">
          <span className="sched-dot sched-dot-final" aria-hidden>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </span>
          <span className="sched-body">
            <span className="sched-date">{fmtLong(launch)}</span>
            <span className="sched-title">Launch &amp; Abnahme</span>
          </span>
        </li>
      </ol>
    </div>
  );
}

"use client";

/**
 * Der Weg zum Launch als Schiene mit ECHTEN Daten.
 *
 * Warum das verkauft: Die Vier-Wochen-Zusage ist das zentrale Versprechen der
 * Marke. Als Aufzählung bleibt sie eine Behauptung; mit Kalenderdaten wird sie
 * ein Plan, den man sich vorstellen kann. Die Schiene beginnt bewusst beim
 * kostenlosen Beratungsgespräch — der nächste Schritt des Nutzers ist Teil
 * desselben Plans, nicht ein getrennter Formularprozess.
 *
 * Datumslogik: Kick-off am übernächsten Montag (realistisch, weil vor dem
 * Start noch Beratungsgespräch und Festangebot liegen), Launch am Freitag der
 * vierten Woche.
 */

function addDays(d: Date, days: number): Date {
  return new Date(d.getTime() + days * 24 * 3600 * 1000);
}

const fmtLong = (d: Date) =>
  new Intl.DateTimeFormat("de-DE", { weekday: "short", day: "numeric", month: "long" }).format(d);
const fmtShort = (d: Date) =>
  new Intl.DateTimeFormat("de-DE", { day: "numeric", month: "short" }).format(d);

export default function Timeline({ weeks }: { weeks: { week: number; label: string }[] }) {
  const today = new Date();
  // Übernächster Montag: erst der kommende, dann eine Woche drauf.
  const nextMonday = addDays(today, ((8 - today.getDay()) % 7) || 7);
  const kickoff = addDays(nextMonday, 7);
  const launch = addDays(kickoff, 25); // Freitag der vierten Woche

  return (
    <div className="sched">
      <div className="sched-head">
        <span className="sketch-label">Ihr Weg zum Launch</span>
        <span className="sched-launch-date">
          live am <strong>{fmtLong(launch)}</strong>
        </span>
      </div>

      <ol className="sched-list">
        {/* Schritt 0: das Beratungsgespräch — der nächste Klick des Nutzers. */}
        <li className="sched-item sched-item-now">
          <span className="sched-dot sched-dot-pulse" aria-hidden />
          <span className="sched-body">
            <span className="sched-date">Diese Woche — Termin frei wählbar</span>
            <span className="sched-title">Kostenloses Beratungsgespräch</span>
            <span className="sched-text">30 Minuten, unverbindlich. Wir schärfen die Skizze und klären die offenen Punkte.</span>
          </span>
        </li>

        <li className="sched-item">
          <span className="sched-dot" aria-hidden />
          <span className="sched-body">
            <span className="sched-date">{fmtLong(kickoff)}</span>
            <span className="sched-title">Kick-off-Workshop</span>
            <span className="sched-text">Ziele, Daten, Abnahmekriterien — danach erhalten Sie das verbindliche Festangebot.</span>
          </span>
        </li>

        {weeks.map((w, i) => (
          <li className="sched-item" key={w.week} style={{ animationDelay: `${i * 0.08}s` }}>
            <span className="sched-dot sched-dot-num" aria-hidden>{w.week}</span>
            <span className="sched-body">
              <span className="sched-date">ab {fmtShort(addDays(kickoff, (w.week - 1) * 7))}</span>
              <span className="sched-title">Woche {w.week}</span>
              <span className="sched-text">{w.label}</span>
            </span>
          </li>
        ))}

        <li className="sched-item sched-item-final">
          <span className="sched-dot sched-dot-final" aria-hidden>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </span>
          <span className="sched-body">
            <span className="sched-date">{fmtLong(launch)}</span>
            <span className="sched-title">Launch &amp; Abnahme</span>
            <span className="sched-text">
              Ihre Software läuft. Sie prüfen gegen die vereinbarten Kriterien — erst dann wird die zweite Hälfte fällig.
            </span>
          </span>
        </li>
      </ol>
    </div>
  );
}

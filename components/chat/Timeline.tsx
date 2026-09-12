"use client";

/** The legacy `weeks` prop now carries scoped phases without a duration promise. */
export default function Timeline({ weeks }: { weeks: { week: number; label: string }[] }) {
  return (
    <div className="sched">
      <ol className="sched-list">
        <li className="sched-item sched-item-now">
          <span className="sched-dot sched-dot-pulse" aria-hidden />
          <span className="sched-body">
            <span className="sched-date">Erster Schritt</span>
            <span className="sched-title">Prozessgespräch und Zielbild</span>
          </span>
        </li>

        {weeks.map((phase, index) => (
          <li className="sched-item sched-item-build" key={`${phase.week}-${phase.label}`}>
            <span className="sched-dot sched-dot-num" aria-hidden>{index + 1}</span>
            <span className="sched-body">
              <span className="sched-date">Phase {index + 1}</span>
              <span className="sched-title">{phase.label}</span>
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
            <span className="sched-date">Nach erfolgreicher Abnahme</span>
            <span className="sched-title">Managed Automation im Betrieb</span>
          </span>
        </li>
      </ol>
    </div>
  );
}

/**
 * Der Unterschied als Bild (Rücksprache 2026-08-14): klassisches Projekt als
 * Übergabekette mit vielen Rollen — gegen den direkten Draht zwischen dem
 * Fachbereich und einem Menschen, der versteht UND baut, mit KI als Werkzeug.
 *
 * Die Grafik lebt von der Asymmetrie: Links stapeln sich zehn Avatare und
 * eine gestrichelte Kette, rechts stehen zwei Menschen und eine durchgezogene
 * Linie. Wer nur die Silhouetten sieht, hat die Botschaft schon verstanden —
 * weniger Beteiligte, kürzerer Weg, näher am Geschäft.
 */

function PersonIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function SparkIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2c.4 3.9 1.6 6.5 3.5 8.4C17.4 12.3 20 13.5 24 14c-4 .4-6.6 1.6-8.5 3.5-1.9 1.9-3.1 4.5-3.5 8.5-.4-4-1.6-6.6-3.5-8.5C6.6 15.6 4 14.4 0 14c4-.5 6.6-1.7 8.5-3.6C10.4 8.5 11.6 5.9 12 2Z" />
    </svg>
  );
}

interface ChainNode {
  role: string;
  text: string;
  /** Anzahl der Avatare — mehr als einer ergibt den gestapelten „Team"-Look. */
  heads?: number;
  final?: "clock" | "check";
}

function Chain({ nodes, direct }: { nodes: (ChainNode | "direct-label")[]; direct?: boolean }) {
  return (
    <ol className="chain">
      {nodes.map((n, i) =>
        n === "direct-label" ? (
          <li className="chain-item chain-label" key={i}>
            direkt — ohne Zwischenstationen
          </li>
        ) : (
          <li className="chain-item" key={i}>
            <span className="chain-avatars">
              {n.final === "clock" ? (
                <i className="pv pv-goal">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
                  </svg>
                </i>
              ) : n.final === "check" ? (
                <i className="pv pv-goal pv-goal-accent">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </i>
              ) : (
                Array.from({ length: n.heads ?? 1 }, (_, k) => (
                  <i className="pv" key={k} style={{ zIndex: (n.heads ?? 1) - k }}>
                    <PersonIcon />
                  </i>
                ))
              )}
            </span>
            <span className="chain-body">
              <strong>{n.role}</strong>
              <span>{n.text}</span>
              {direct && n.role === "Moritz" && (
                <span className="ki-pill">
                  <SparkIcon />
                  <span>
                    <strong>KI als Werkzeug:</strong> übernimmt Tippen, Tests und
                    Routinearbeit — unter Aufsicht, nie allein.
                  </span>
                </span>
              )}
            </span>
          </li>
        )
      )}
    </ol>
  );
}

const CLASSIC: (ChainNode | "direct-label")[] = [
  { role: "Sie, der Fachbereich", text: "erklären Ihr Problem — dem Ersten in der Kette." },
  { role: "Anforderungsmanagement", text: "schreibt auf, was es verstanden hat." },
  { role: "Projektleitung", text: "plant, priorisiert, verteilt Tickets." },
  { role: "UX-Design", text: "entwirft Masken — nach Dokument, nicht nach Gespräch." },
  { role: "Architektur", text: "entscheidet die Technik, oft weit weg vom Fach." },
  { role: "Entwicklung", text: "baut nach Ticket; jede Rückfrage läuft die Kette zurück.", heads: 3 },
  { role: "Test", text: "prüft gegen das Dokument aus Schritt zwei.", heads: 2 },
  { role: "Ihre Software", text: "nach Monaten, Budgetrunden und Kompromissen.", final: "clock" },
];

const DIRECT: (ChainNode | "direct-label")[] = [
  { role: "Sie", text: "bringen Ihren Fall und entscheiden. Mehr braucht es von Ihrer Seite nicht." },
  "direct-label",
  { role: "Moritz", text: "versteht Ihr Geschäft, entwirft die Lösung und baut sie selbst — eine Person, die zuhört und liefert." },
  { role: "Ihre Software", text: "abgenommen in Woche vier, gegen vorab vereinbarte Kriterien.", final: "check" },
];

export default function Compare() {
  return (
    <section className="section" id="unterschied">
      <div className="container">
        <div className="section-head" data-reveal>
          <span className="eyebrow">Der Unterschied</span>
          <h2 className="section-title">
            Das klassische Projekt ist eine Telefonkette.
            <br />
            Hier reden Sie mit dem, der baut.
          </h2>
          <p className="section-lead">
            Software wird nicht langsam, weil jemand langsam tippt — sondern weil
            zwischen Problem und Code viele Übergaben liegen. Agentisches Coding
            streicht genau diese Kette.
          </p>
        </div>

        <div className="compare-grid">
          <article className="compare-card compare-classic" data-reveal>
            <header className="compare-head">
              <h3>Das klassische Projekt</h3>
              <span className="compare-sub">Viele Rollen, lange Wege</span>
            </header>
            <Chain nodes={CLASSIC} />
            <p className="compare-note">
              Sechs Übergaben zwischen Ihrem Problem und dem Code — bei jeder geht
              Kontext verloren, und jede Rückfrage läuft die ganze Kette zurück.
            </p>
            <dl className="compare-stats">
              <div><dt>Beteiligte</dt><dd>typisch 8–12</dd></div>
              <div><dt>Dauer</dt><dd>Monate</dd></div>
              <div><dt>Abrechnung</dt><dd>Tagessätze</dd></div>
            </dl>
          </article>

          <article className="compare-card compare-new" data-reveal style={{ "--reveal-delay": "0.08s" } as React.CSSProperties}>
            <header className="compare-head">
              <h3>vierwochen</h3>
              <span className="compare-sub">Ein Gespräch, ein Verantwortlicher, KI als Werkzeug</span>
            </header>
            <Chain nodes={DIRECT} direct />
            <p className="compare-note">
              Eine Übergabe: Sie erklären Ihren Fall dem Menschen, der ihn versteht
              und baut. Näher am Geschäft geht nicht.
            </p>
            <dl className="compare-stats">
              <div><dt>Beteiligte</dt><dd>2 + KI</dd></div>
              <div><dt>Dauer</dt><dd>4 Wochen</dd></div>
              <div><dt>Abrechnung</dt><dd>Festpreis</dd></div>
            </dl>
          </article>
        </div>
      </div>
    </section>
  );
}

import s from "./styles.module.css";

/**
 * Platzhalter-Visuals für die Showcases — abstrahierte Oberflächen, kein
 * echtes Projekt. Sobald echte Screenshots freigegeben sind, werden diese
 * drei Komponenten durch <Image> ersetzt; die Rahmen bleiben.
 */

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <div className={s.frame}>
      <div className={s.frameBar} aria-hidden>
        <i />
        <i />
        <i />
      </div>
      {children}
    </div>
  );
}

/** Auftragsübersicht: Kennzahlen, Balken, Terminampel. */
export function Cockpit() {
  return (
    <Frame>
      <svg viewBox="0 0 400 250" className={s.mock} role="img" aria-label="Skizze einer Auftragsübersicht">
        <rect x="16" y="16" width="112" height="52" rx="12" fill="#4f46e5" />
        <rect x="28" y="30" width="46" height="7" rx="3.5" fill="#ffffff" opacity="0.55" />
        <rect x="28" y="44" width="66" height="13" rx="6" fill="#ffffff" opacity="0.9" />

        <rect x="144" y="16" width="112" height="52" rx="12" fill="#e4e1fd" />
        <rect x="156" y="30" width="40" height="7" rx="3.5" fill="#4f46e5" opacity="0.45" />
        <rect x="156" y="44" width="58" height="13" rx="6" fill="#4f46e5" opacity="0.8" />

        <rect x="272" y="16" width="112" height="52" rx="12" fill="#d8f26e" />
        <rect x="284" y="30" width="44" height="7" rx="3.5" fill="#1e2405" opacity="0.4" />
        <rect x="284" y="44" width="52" height="13" rx="6" fill="#1e2405" opacity="0.75" />

        <rect x="16" y="86" width="368" height="148" rx="16" fill="#f4f5ff" />
        {[0, 1, 2, 3].map((row) => (
          <g key={row} transform={`translate(0 ${row * 33})`}>
            <rect x="32" y="104" width="86" height="9" rx="4.5" fill="#181a33" opacity="0.72" />
            <rect x="136" y="104" width="150" height="9" rx="4.5" fill="#6a6d8c" opacity="0.3" />
            <rect
              x="304"
              y="100"
              width="60"
              height="17"
              rx="8.5"
              fill={row === 1 ? "#ff6b5e" : "#4f46e5"}
              opacity={row === 1 ? 0.85 : 0.18}
            />
          </g>
        ))}
      </svg>
    </Frame>
  );
}

/** Schichtplan: Wochenraster mit belegten Feldern. */
export function Schichtplan() {
  return (
    <Frame>
      <svg viewBox="0 0 400 250" className={s.mock} role="img" aria-label="Skizze einer Schichtplanung">
        <rect x="16" y="16" width="120" height="14" rx="7" fill="#181a33" opacity="0.8" />
        <rect x="300" y="14" width="84" height="20" rx="10" fill="#4f46e5" />

        {[0, 1, 2, 3, 4, 5, 6].map((col) => (
          <rect key={col} x={16 + col * 53} y={48} width={45} height={9} rx={4.5} fill="#6a6d8c" opacity="0.35" />
        ))}

        {[0, 1, 2, 3, 4].map((row) =>
          [0, 1, 2, 3, 4, 5, 6].map((col) => {
            const filled = (row + col) % 3 !== 0;
            const accent = (row * 7 + col) % 8 === 0;
            return (
              <rect
                key={`${row}-${col}`}
                x={16 + col * 53}
                y={70 + row * 34}
                width={45}
                height={26}
                rx={9}
                fill={accent ? "#d8f26e" : filled ? "#4f46e5" : "#e6e8f8"}
                opacity={accent ? 1 : filled ? 0.16 + row * 0.14 : 1}
              />
            );
          }),
        )}
      </svg>
    </Frame>
  );
}

/** Kundenportal: Kopfbereich mit Suche, darunter Karten. */
export function Portal() {
  return (
    <Frame>
      <svg viewBox="0 0 400 250" className={s.mock} role="img" aria-label="Skizze eines Kundenportals">
        <rect x="16" y="16" width="368" height="40" rx="14" fill="#181a33" />
        <circle cx="40" cy="36" r="10" fill="#d8f26e" />
        <rect x="60" y="31" width="70" height="10" rx="5" fill="#ffffff" opacity="0.75" />
        <rect x="250" y="26" width="120" height="20" rx="10" fill="#ffffff" opacity="0.15" />

        {[0, 1, 2].map((col) => (
          <g key={col} transform={`translate(${col * 126} 0)`}>
            <rect x="16" y="72" width="112" height="76" rx="14" fill="#f4f5ff" />
            <rect x="30" y="86" width="40" height="40" rx="12" fill={col === 1 ? "#ff6b5e" : "#4f46e5"} opacity={col === 1 ? 0.9 : 0.2} />
            <rect x="30" y="134" width="76" height="8" rx="4" fill="#6a6d8c" opacity="0.35" />
          </g>
        ))}

        {[0, 1, 2].map((row) => (
          <g key={row} transform={`translate(0 ${row * 28})`}>
            <rect x="16" y="166" width="240" height="10" rx="5" fill="#181a33" opacity={0.55 - row * 0.13} />
            <rect x="300" y="163" width="84" height="16" rx="8" fill="#4f46e5" opacity={0.16} />
          </g>
        ))}
      </svg>
    </Frame>
  );
}

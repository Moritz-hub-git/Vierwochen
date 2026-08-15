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

/** Angebotsrechner: Eingabefelder links, Ergebnis rechts. */
export function Rechner() {
  return (
    <Frame>
      <svg viewBox="0 0 400 250" className={s.mock} role="img" aria-label="Skizze eines Angebotsrechners">
        <rect x="16" y="16" width="210" height="218" rx="16" fill="#f4f5ff" />
        {[0, 1, 2, 3].map((row) => (
          <g key={row} transform={`translate(0 ${row * 46})`}>
            <rect x="32" y="36" width="72" height="8" rx="4" fill="#6a6d8c" opacity="0.4" />
            <rect x="32" y="52" width="178" height="24" rx="10" fill="#ffffff" />
            <rect x="42" y="61" width={54 + row * 22} height="7" rx="3.5" fill="#181a33" opacity="0.45" />
          </g>
        ))}

        <rect x="242" y="16" width="142" height="130" rx="16" fill="#4f46e5" />
        <rect x="258" y="36" width="62" height="8" rx="4" fill="#ffffff" opacity="0.5" />
        <rect x="258" y="56" width="104" height="24" rx="8" fill="#ffffff" opacity="0.92" />
        <rect x="258" y="92" width="86" height="7" rx="3.5" fill="#ffffff" opacity="0.35" />
        <rect x="258" y="107" width="70" height="7" rx="3.5" fill="#ffffff" opacity="0.25" />

        <rect x="242" y="158" width="142" height="34" rx="12" fill="#d8f26e" />
        <rect x="262" y="171" width="102" height="8" rx="4" fill="#1e2405" opacity="0.6" />
        <rect x="242" y="202" width="142" height="32" rx="12" fill="#e6e8f8" />
      </svg>
    </Frame>
  );
}

/** Prüfprotokoll auf dem Telefon: Checkliste mit Haken. */
export function Protokoll() {
  return (
    <Frame>
      <svg viewBox="0 0 400 250" className={s.mock} role="img" aria-label="Skizze eines mobilen Prüfprotokolls">
        <rect x="130" y="12" width="140" height="226" rx="22" fill="#181a33" />
        <rect x="140" y="30" width="120" height="198" rx="14" fill="#ffffff" />
        <rect x="176" y="19" width="48" height="5" rx="2.5" fill="#ffffff" opacity="0.3" />

        <rect x="152" y="44" width="64" height="9" rx="4.5" fill="#181a33" opacity="0.75" />

        {[0, 1, 2, 3, 4].map((row) => {
          const done = row < 3;
          return (
            <g key={row} transform={`translate(0 ${row * 34})`}>
              <rect x="152" y="66" width="96" height="26" rx="9" fill={done ? "#eef0fe" : "#f6f7fb"} />
              <circle cx="165" cy="79" r="7" fill={done ? "#4f46e5" : "#dfe1f2"} />
              {done && (
                <path d="M162 79l2.4 2.4 4.4-4.6" stroke="#ffffff" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              )}
              <rect x="179" y="75" width={row === 4 ? 34 : 56} height="7" rx="3.5" fill="#181a33" opacity="0.32" />
            </g>
          );
        })}

        <rect x="46" y="72" width="66" height="66" rx="18" fill="#d8f26e" opacity="0.8" />
        <rect x="288" y="118" width="66" height="66" rx="18" fill="#ff6b5e" opacity="0.55" />
      </svg>
    </Frame>
  );
}

/** Lager und Inventur: Regalraster mit Füllständen. */
export function Lager() {
  return (
    <Frame>
      <svg viewBox="0 0 400 250" className={s.mock} role="img" aria-label="Skizze einer Lagerübersicht">
        <rect x="16" y="16" width="368" height="34" rx="12" fill="#f4f5ff" />
        <rect x="30" y="28" width="88" height="10" rx="5" fill="#181a33" opacity="0.55" />
        <rect x="300" y="24" width="70" height="18" rx="9" fill="#4f46e5" opacity="0.85" />

        {[0, 1, 2].map((row) =>
          [0, 1, 2, 3].map((col) => {
            const fill = [0.9, 0.55, 0.28, 0.7][(row + col) % 4];
            return (
              <g key={`${row}-${col}`} transform={`translate(${col * 94} ${row * 60})`}>
                <rect x="16" y="64" width="82" height="48" rx="12" fill="#f4f5ff" />
                <rect x="26" y="74" width="62" height="7" rx="3.5" fill="#6a6d8c" opacity="0.4" />
                <rect x="26" y="88" width="62" height="14" rx="7" fill="#e6e8f8" />
                <rect
                  x="26"
                  y="88"
                  width={62 * fill}
                  height="14"
                  rx="7"
                  fill={fill < 0.3 ? "#ff6b5e" : fill > 0.8 ? "#d8f26e" : "#4f46e5"}
                  opacity={fill > 0.8 ? 1 : 0.75}
                />
              </g>
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

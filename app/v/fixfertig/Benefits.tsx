import s from "./styles.module.css";

/**
 * „Alles, was dazugehört" — die Leistungen als Bento im Stil der
 * Apple-Feature-Übersichten: farbige Icon-Container, kurze Titel, ein
 * Satz. Die Icons sind eigene Inline-SVGs (Vektor bleibt auf jeder
 * Bildschirmdichte scharf und erbt die Farben des Skins).
 */

const STROKE = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const ICONS: Record<string, React.ReactNode> = {
  tag: (
    <svg width="22" height="22" viewBox="0 0 24 24" {...STROKE} aria-hidden>
      <path d="M20.6 13.4 12 22 2 12V4a2 2 0 0 1 2-2h8l8.6 8.6a2 2 0 0 1 0 2.8Z" />
      <circle cx="7.5" cy="7.5" r="1.6" fill="currentColor" stroke="none" />
    </svg>
  ),
  key: (
    <svg width="22" height="22" viewBox="0 0 24 24" {...STROKE} aria-hidden>
      <circle cx="7.5" cy="15.5" r="4.5" />
      <path d="M10.8 12.2 21 2m-4.5 4.5 3 3M13 6l3 3" />
    </svg>
  ),
  shield: (
    <svg width="22" height="22" viewBox="0 0 24 24" {...STROKE} aria-hidden>
      <path d="M12 2 4 5.5V11c0 5 3.4 9.3 8 11 4.6-1.7 8-6 8-11V5.5L12 2Z" />
      <path d="m8.8 11.8 2.3 2.3 4.2-4.6" />
    </svg>
  ),
  server: (
    <svg width="22" height="22" viewBox="0 0 24 24" {...STROKE} aria-hidden>
      <rect x="3" y="4" width="18" height="7" rx="2" />
      <rect x="3" y="13" width="18" height="7" rx="2" />
      <path d="M7 7.5h.01M7 16.5h.01M11 7.5h2M11 16.5h2" />
    </svg>
  ),
  spark: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2c.4 3.9 1.6 6.5 3.5 8.4C17.4 12.3 20 13.5 24 14c-4 .4-6.6 1.6-8.5 3.5-1.9 1.9-3.1 4.5-3.5 8.5-.4-4-1.6-6.6-3.5-8.5C6.6 15.6 4 14.4 0 14c4-.5 6.6-1.7 8.5-3.6C10.4 8.5 11.6 5.9 12 2Z" />
    </svg>
  ),
  rocket: (
    <svg width="22" height="22" viewBox="0 0 24 24" {...STROKE} aria-hidden>
      <path d="M12 15c-2-4.5-1-9 3.5-11.5C20 1 22 3 21.5 8.5 19 13 14.5 14 12 15Z" />
      <path d="M12 15c-1.5 1.5-2 4-2 4s2.5-.5 4-2M9 12c-2 0-4.5 1-5.5 3.5C6 16 8 16 9 15.5M15.5 8.5h.01" />
    </svg>
  ),
  sliders: (
    <svg width="22" height="22" viewBox="0 0 24 24" {...STROKE} aria-hidden>
      <path d="M4 6h10M18 6h2M4 12h2M10 12h10M4 18h7M15 18h5" />
      <circle cx="16" cy="6" r="2" />
      <circle cx="8" cy="12" r="2" />
      <circle cx="13" cy="18" r="2" />
    </svg>
  ),
  code: (
    <svg width="22" height="22" viewBox="0 0 24 24" {...STROKE} aria-hidden>
      <path d="m8 8-4 4 4 4M16 8l4 4-4 4M13 5l-2 14" />
    </svg>
  ),
};

const ITEMS: {
  icon: keyof typeof ICONS;
  tone: string;
  big?: boolean;
  title: string;
  text: string;
}[] = [
  {
    icon: "tag",
    tone: "indigo",
    big: true,
    title: "Festpreis",
    text: "Steht im Angebot und hält — keine Tagessätze, keine Nachträge. Besteht die Abnahme nicht, entfällt die zweite Hälfte.",
  },
  {
    icon: "key",
    tone: "ink",
    big: true,
    title: "Der Code gehört Ihnen",
    text: "100 % Custom Code, vom ersten Tag an Ihr Eigentum. Kein Baukasten, keine Lizenzfalle, kein Lock-in.",
  },
  {
    icon: "shield",
    tone: "green",
    title: "12 Monate Garantie",
    text: "Auf alles, was wir bauen.",
  },
  {
    icon: "server",
    tone: "sky",
    title: "Betrieb auf Wunsch",
    text: "Hosting, Wartung, Updates — wir übernehmen das gern.",
  },
  {
    icon: "spark",
    tone: "violet",
    title: "AI integriert",
    text: "Direkt in Ihre Anwendung — überall dort, wo sie Ihnen nützt.",
  },
  {
    icon: "rocket",
    tone: "coral",
    title: "Neueste Technologien",
    text: "Der Stack von heute, nicht der von 2015.",
  },
  {
    icon: "sliders",
    tone: "amber",
    title: "100 % individuell",
    text: "Auf Ihren Ablauf geschnitten, nichts von der Stange.",
  },
  {
    icon: "code",
    tone: "lime",
    title: "Senior-Qualität",
    text: "AI schreibt, ein erfahrener Kopf verantwortet jede Zeile.",
  },
];

export default function Benefits({ echo }: { echo?: React.ReactNode }) {
  return (
    <section id="garantie" className={s.benefitsSection} aria-label="Was Sie bekommen">
      <div className={s.sectionHead}>
        {echo}
        <span className={s.kicker}>Was Sie bekommen</span>
        <h2 className={s.h2}>Alles, was dazugehört</h2>
        <p className={s.sectionLead}>
          Bezahlt wird, was läuft: Festpreis, Abnahme nach vereinbarten
          Kriterien, zwölf Monate Garantie. Qualität behaupten kann jeder —
          wir hängen Haftung dran:
        </p>
      </div>
      <div className={s.benefits}>
        {ITEMS.map((b) => (
          <div key={b.title} className={`${s.benefit}${b.big ? ` ${s.benefitBig}` : ""}`}>
            <span className={`${s.bIcon} ${s[`tone_${b.tone}`]}`}>{ICONS[b.icon]}</span>
            <b>{b.title}</b>
            <p>{b.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

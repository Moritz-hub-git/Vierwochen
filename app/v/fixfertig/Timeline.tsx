"use client";

import { useEffect, useState } from "react";
import s from "./styles.module.css";

/**
 * Der Vier-Wochen-Zeitplan mit echten Daten: gerechnet ab dem nächsten
 * Montag, im Browser des Besuchers. So steht da nie ein abstraktes
 * „Woche 1", sondern „Mo., 24. Aug." — ein Termin, den man sich vorstellen
 * kann. Serverseitig (und bis zum Mounten) stehen die Wochen-Labels,
 * damit statisches Rendern kein eingefrorenes Datum ausliefert.
 */

function nextMonday(): Date {
  const d = new Date();
  const add = (8 - d.getDay()) % 7 || 7;
  d.setDate(d.getDate() + add);
  d.setHours(0, 0, 0, 0);
  return d;
}

const fmt = (d: Date) =>
  d.toLocaleDateString("de-DE", { weekday: "short", day: "numeric", month: "short" });

const STATIONS = [
  {
    offset: 0,
    fallback: "Woche 1",
    title: "Kick-off & Workshop",
    text: "Ihr Ablauf, Ihre Begriffe, die Abnahmekriterien — festgehalten, bevor gebaut wird.",
  },
  {
    offset: 7,
    fallback: "Woche 2",
    title: "Bauen",
    text: "Die erste Fassung entsteht — Sie sehen sie am lebenden System, nicht in Folien.",
  },
  {
    offset: 14,
    fallback: "Woche 3",
    title: "Schärfen",
    text: "Ihr Feedback, direkt eingebaut. Was nicht passt, wird geändert — bis es passt.",
  },
  {
    offset: 25,
    fallback: "Woche 4",
    title: "Übergabe",
    text: "Abnahme gegen die Kriterien aus Woche 1. Code, Zugänge, Doku: Ihres.",
    live: true,
  },
];

export default function Timeline() {
  const [start, setStart] = useState<Date | null>(null);
  useEffect(() => setStart(nextMonday()), []);

  return (
    <div className={s.timeline} role="list" aria-label="Zeitplan der vier Wochen, ab nächstem Montag">
      <span className={s.tlRail} aria-hidden />
      {STATIONS.map((st) => (
        <div key={st.title} role="listitem" className={s.tlStop}>
          <span className={`${s.tlDot}${st.live ? ` ${s.tlDotLive}` : ""}`} aria-hidden />
          <span className={s.tlDate}>
            {start ? fmt(new Date(start.getTime() + st.offset * 86400000)) : st.fallback}
          </span>
          <b className={s.tlTitle}>
            {st.title}
            {st.live && (
              <span className={s.tlLive}>
                <i aria-hidden /> live
              </span>
            )}
          </b>
          <p className={s.tlText}>{st.text}</p>
        </div>
      ))}
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { planDates } from "@/lib/timeline";
import s from "./styles.module.css";

/**
 * Der Vier-Wochen-Zeitplan mit echten Daten, gerechnet im Browser des
 * Besuchers über lib/timeline.ts (eine Rechnung für Landing und Chat).
 * So steht da nie ein abstraktes „Woche 1", sondern „Mo., 24. Aug." — ein
 * Termin, den man sich vorstellen kann. Serverseitig (und bis zum Mounten)
 * stehen die Wochen-Labels, damit statisches Rendern kein eingefrorenes
 * Datum ausliefert.
 *
 * Kick-off ist nicht der nächste Montag, sondern der erste Montag ab zehn
 * Tagen: Gespräch → Angebot → Start braucht diese Zeit.
 */

const fmt = (d: Date) =>
  d.toLocaleDateString("de-DE", { weekday: "short", day: "numeric", month: "short" });

const STATIONS = [
  {
    fallback: "Woche 1",
    title: "Kick-off & Workshop",
    text: "Ihr Ablauf, Ihre Begriffe, die Abnahmekriterien — und wir trennen, was gebaut werden muss, von dem, was nur Geld kosten würde.",
  },
  {
    fallback: "Woche 2",
    title: "Bauen",
    text: "Die erste Fassung entsteht — Sie sehen sie am lebenden System, nicht in Folien.",
  },
  {
    fallback: "Woche 3",
    title: "Schärfen",
    text: "Ihr Feedback, direkt eingebaut. Was nicht passt, wird geändert — bis es passt.",
  },
  {
    fallback: "Woche 4",
    title: "Übergabe",
    text: "Abnahme gegen die Kriterien aus Woche 1. Code, Zugänge, Doku: Ihres.",
    live: true,
  },
];

export default function Timeline() {
  const [dates, setDates] = useState<Date[] | null>(null);
  useEffect(() => {
    const { weeks, launch } = planDates();
    // Die letzte Station ist die Übergabe am Freitag, nicht der Montag der vierten Woche.
    setDates([weeks[0], weeks[1], weeks[2], launch]);
  }, []);

  return (
    <div className={s.timeline} role="list" aria-label="Zeitplan der vier Wochen ab Kick-off">
      <span className={s.tlRail} aria-hidden />
      {STATIONS.map((st, i) => (
        <div key={st.title} role="listitem" className={s.tlStop}>
          <span className={`${s.tlDot}${st.live ? ` ${s.tlDotLive}` : ""}`} aria-hidden />
          <span className={s.tlDate}>{dates ? fmt(dates[i]) : st.fallback}</span>
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

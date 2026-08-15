"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import s from "./styles.module.css";

/**
 * Wechselndes Wort in der Hauptzeile: „… die Ihre Kunden begeistern."
 *
 * Das alte Wort wird von links nach rechts weggewischt, das neue wächst in
 * derselben Richtung wieder herein (clip-path). Die Breite des Platzhalters
 * wird gemessen und weich mitgeführt, damit „begeistern." nicht springt.
 * Vor dem Mounten steht das erste Wort ganz normal im Textfluss — so ist
 * die Zeile serverseitig vollständig und bleibt ohne JavaScript lesbar.
 */

export default function RotatingWord({
  words,
  interval = 2600,
}: {
  words: string[];
  interval?: number;
}) {
  const [mounted, setMounted] = useState(false);
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState<number | null>(null);
  const [width, setWidth] = useState<number>();
  const refs = useRef<(HTMLSpanElement | null)[]>([]);
  const current = useRef(0);

  useEffect(() => setMounted(true), []);

  // Bei „Bewegung reduzieren" bleibt das erste Wort einfach stehen.
  useEffect(() => {
    if (!mounted) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      const from = current.current;
      const to = (from + 1) % words.length;
      current.current = to;
      setLeaving(from);
      setIndex(to);
    }, interval);
    return () => window.clearInterval(id);
  }, [mounted, words.length, interval]);

  // Das abgehende Wort wird nach seiner Animation wieder geparkt.
  useEffect(() => {
    if (leaving === null) return;
    const id = window.setTimeout(() => setLeaving(null), 520);
    return () => window.clearTimeout(id);
  }, [leaving]);

  useLayoutEffect(() => {
    if (!mounted) return;
    const el = refs.current[index];
    if (el) setWidth(el.offsetWidth);
  }, [mounted, index]);

  // Erster Durchgang (auch ohne JavaScript): schlicht das erste Wort.
  if (!mounted) {
    return <span className={s.rotStatic}>{words[0]}</span>;
  }

  return (
    <span className={s.rot} style={width ? { width } : undefined}>
      {words.map((word, i) => {
        const state =
          i === index ? s.rotActive : i === leaving ? s.rotLeaving : "";
        return (
          <span
            key={word}
            ref={(el) => {
              refs.current[i] = el;
            }}
            className={`${s.rotWord} ${state}`}
            aria-hidden={i !== index}
          >
            {word}
          </span>
        );
      })}
    </span>
  );
}

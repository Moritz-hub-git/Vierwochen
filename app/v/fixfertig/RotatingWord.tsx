"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import s from "./styles.module.css";

/**
 * Wechselndes Wort in der Hauptzeile: „… die Ihre Kunden begeistern."
 *
 * Die Breite wird gemessen und weich animiert, damit „begeistern." nicht
 * springt, sondern mitgleitet. Vor dem Mounten steht das erste Wort ganz
 * normal im Textfluss — so ist die Zeile serverseitig vollständig und
 * bleibt lesbar, auch wenn kein JavaScript läuft.
 */

export default function RotatingWord({
  words,
  interval = 2400,
}: {
  words: string[];
  interval?: number;
}) {
  const [mounted, setMounted] = useState(false);
  const [index, setIndex] = useState(0);
  const [width, setWidth] = useState<number>();
  const refs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => setMounted(true), []);

  // Bei „Bewegung reduzieren" bleibt das erste Wort einfach stehen.
  useEffect(() => {
    if (!mounted) return;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (calm.matches) return;
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % words.length),
      interval,
    );
    return () => window.clearInterval(id);
  }, [mounted, words.length, interval]);

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
      {words.map((word, i) => (
        <span
          key={word}
          ref={(el) => {
            refs.current[i] = el;
          }}
          className={`${s.rotWord} ${i === index ? s.rotActive : ""}`}
          aria-hidden={i !== index}
        >
          {word}
        </span>
      ))}
    </span>
  );
}

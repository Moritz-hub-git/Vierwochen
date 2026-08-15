"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Schreibt Text heraus, wie ein Modell, das gerade antwortet.
 *
 * Die Antwort kommt vom Server am Stück; das Herausschreiben passiert hier
 * im Browser. Getaktet wird über die Bildfrequenz statt über einen Timer:
 * Pro Bild wächst der Text um einen Bruchteil, wodurch er gleichmäßig
 * fließt, statt in Wortsprüngen zu stocken. Nur der jeweils neueste Zug
 * wird geschrieben — ältere stehen sofort vollständig da.
 */

/** Zeichen pro Sekunde — schnell genug zum Mitlesen, ruhig genug zum Sehen. */
const SPEED = 105;

export default function StreamedText({
  text,
  animate,
  onTick,
}: {
  text: string;
  animate: boolean;
  onTick?: () => void;
}) {
  const [count, setCount] = useState(animate ? 0 : text.length);
  const tickRef = useRef(onTick);
  tickRef.current = onTick;

  useEffect(() => {
    if (!animate) {
      setCount(text.length);
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCount(text.length);
      return;
    }

    let frame = 0;
    let start = 0;
    let lastScroll = 0;

    const step = (now: number) => {
      if (!start) start = now;
      const shown = Math.min(text.length, ((now - start) / 1000) * SPEED);
      setCount(shown);
      // Nicht bei jedem Bild scrollen — das ruckelt mehr, als es hilft.
      if (now - lastScroll > 120) {
        lastScroll = now;
        tickRef.current?.();
      }
      if (shown < text.length) frame = requestAnimationFrame(step);
      else tickRef.current?.();
    };

    setCount(0);
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [text, animate]);

  return <>{text.slice(0, Math.floor(count))}</>;
}

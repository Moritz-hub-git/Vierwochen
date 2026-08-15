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
  onDone,
}: {
  text: string;
  animate: boolean;
  onTick?: () => void;
  /** Feuert genau einmal, sobald der Text vollständig steht — auch dann,
   *  wenn gar nicht animiert wird. Darauf warten Elemente, die erst NACH
   *  der fertigen Antwort erscheinen dürfen (Vorschläge, Regler, Karten). */
  onDone?: () => void;
}) {
  const [count, setCount] = useState(animate ? 0 : text.length);
  const tickRef = useRef(onTick);
  const doneRef = useRef(onDone);
  tickRef.current = onTick;
  doneRef.current = onDone;

  useEffect(() => {
    if (!animate) {
      setCount(text.length);
      doneRef.current?.();
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCount(text.length);
      doneRef.current?.();
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
      if (shown < text.length) {
        frame = requestAnimationFrame(step);
      } else {
        tickRef.current?.();
        doneRef.current?.();
      }
    };

    setCount(0);
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [text, animate]);

  return <>{text.slice(0, Math.floor(count))}</>;
}

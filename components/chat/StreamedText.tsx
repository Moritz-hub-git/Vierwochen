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
 *
 * Barrierefreiheit: Der vollständige Text steht sofort in einem
 * unsichtbaren Span (Screenreader lesen ihn einmal am Stück); der sichtbare
 * Text streamt daneben und ist für Hilfstechnik ausgeblendet — sonst würde
 * jede Buchstabenänderung als neue Meldung angesagt.
 */

/** Zeichen pro Sekunde. 58 wirkte im Vollreview zu langsam — wer die
 *  Antwort schon erfasst hat, wartet sonst auf das Ende des Schreibens.
 *  90 liegt über der Lesegeschwindigkeit, bleibt aber sichtbar „entstehend". */
const SPEED = 90;

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

  const shown = Math.floor(count);
  // Fertig (oder nie animiert): schlicht der Text, ohne Doppelung.
  if (!animate || shown >= text.length) return <>{text}</>;

  return (
    <>
      <span className="chat-sr-only">{text}</span>
      <span aria-hidden="true">{text.slice(0, shown)}</span>
    </>
  );
}

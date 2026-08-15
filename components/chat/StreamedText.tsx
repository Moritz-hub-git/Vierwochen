"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Schreibt Text wortweise heraus, wie ein Modell, das gerade antwortet.
 *
 * Die Antwort kommt vom Server am Stück; das Herausschreiben passiert hier
 * im Browser. Nur der jeweils neueste Zug wird geschrieben — ältere stehen
 * sofort vollständig da, damit ein Rückblick nicht erneut tippt.
 */
export default function StreamedText({
  text,
  animate,
  onTick,
}: {
  text: string;
  animate: boolean;
  onTick?: () => void;
}) {
  const [shown, setShown] = useState(animate ? "" : text);
  const tickRef = useRef(onTick);
  tickRef.current = onTick;

  useEffect(() => {
    if (!animate) {
      setShown(text);
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(text);
      return;
    }

    // Wortweise statt zeichenweise: Das liest sich flüssig mit, statt zu
    // flackern. Die Trennzeichen bleiben als eigene Stücke erhalten, damit
    // Zeilenumbrüche im Text nicht verloren gehen.
    const parts = text.split(/(\s+)/);
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setShown(parts.slice(0, i).join(""));
      tickRef.current?.();
      if (i >= parts.length) window.clearInterval(id);
    }, 34);

    return () => window.clearInterval(id);
  }, [text, animate]);

  const running = animate && shown.length < text.length;

  return (
    <>
      {shown}
      {running && <i className="stream-caret" aria-hidden />}
    </>
  );
}

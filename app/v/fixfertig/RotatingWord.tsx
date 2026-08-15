"use client";

import { useEffect, useRef, useState } from "react";
import s from "./styles.module.css";

/**
 * Wechselnder Adressat als Schreibmaschine: Das Wort steht richtig
 * geschrieben da, wird nach einer Weile Buchstabe für Buchstabe
 * weggenommen und das nächste hingeschrieben — wie von Hand radiert und
 * neu geschrieben. Die Schreibmarke erscheint nur, während tatsächlich
 * geschrieben oder gelöscht wird; im Stand ist die Zeile ruhig.
 *
 * Serverseitig steht das erste Wort vollständig im Textfluss — die Zeile
 * ist ohne JavaScript komplett, die Timer starten erst im Browser.
 */

const TYPE_MS = 52;
const DELETE_MS = 24;
const HOLD_MS = 2300;
const PAUSE_MS = 240;

export default function RotatingWord({ words }: { words: string[] }) {
  const [text, setText] = useState(words[0]);
  const [active, setActive] = useState(false);
  const timer = useRef<number>(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let word = 0;
    let chars = words[0].length;
    let deleting = true;

    const step = () => {
      if (deleting) {
        chars -= 1;
        setText(words[word].slice(0, chars));
        if (chars <= 0) {
          deleting = false;
          word = (word + 1) % words.length;
          timer.current = window.setTimeout(step, PAUSE_MS);
        } else {
          timer.current = window.setTimeout(step, DELETE_MS);
        }
      } else {
        chars += 1;
        setText(words[word].slice(0, chars));
        if (chars >= words[word].length) {
          deleting = true;
          setActive(false);
          timer.current = window.setTimeout(() => {
            setActive(true);
            step();
          }, HOLD_MS);
        } else {
          timer.current = window.setTimeout(step, TYPE_MS);
        }
      }
    };

    timer.current = window.setTimeout(() => {
      setActive(true);
      step();
    }, HOLD_MS);

    return () => window.clearTimeout(timer.current);
  }, [words]);

  return (
    <span className={s.rotType}>
      {text}
      <i
        className={`${s.typeCaret}${active ? "" : ` ${s.typeCaretIdle}`}`}
        aria-hidden
      />
    </span>
  );
}

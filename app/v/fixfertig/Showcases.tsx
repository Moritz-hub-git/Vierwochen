"use client";

import { useEffect, useRef, useState } from "react";
import s from "./styles.module.css";

/**
 * Showcase-Karussell: große Karten, horizontal durchscrollbar.
 *
 * Gescrollt wird nativ (Wischen, Trackpad, Umschalt+Rad) mit Einrasten pro
 * Karte; die Knöpfe sind nur der bequeme Weg für die Maus. Sie blenden sich
 * aus, wenn es in ihre Richtung nichts mehr zu sehen gibt.
 */

export type Showcase = {
  visual: React.ReactNode;
  branch: string;
  title: string;
  text: string;
};

export default function Showcases({ items }: { items: Showcase[] }) {
  const track = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const update = () => {
      setAtStart(el.scrollLeft < 8);
      setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 8);
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const scrollBy = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    // Eine Kartenbreite plus Abstand — das rastet sauber auf die nächste ein.
    const card = el.querySelector("article");
    const step = card ? card.getBoundingClientRect().width + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <div className={s.carousel}>
      <div className={s.carouselNav}>
        <button
          type="button"
          className={s.navBtn}
          onClick={() => scrollBy(-1)}
          disabled={atStart}
          aria-label="Vorherige Arbeiten"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M19 12H5M11 18l-6-6 6-6" />
          </svg>
        </button>
        <button
          type="button"
          className={s.navBtn}
          onClick={() => scrollBy(1)}
          disabled={atEnd}
          aria-label="Weitere Arbeiten"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </button>
      </div>

      <div className={s.track} ref={track}>
        {items.map((c) => (
          <article key={c.title} className={s.card}>
            <div className={s.cardVisual}>
              <span className={s.placeholderTag}>Platzhalter</span>
              {c.visual}
            </div>
            <div className={s.cardBody}>
              <span className={s.cardBranch}>{c.branch}</span>
              <h3 className={s.cardTitle}>{c.title}</h3>
              <p className={s.cardText}>{c.text}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

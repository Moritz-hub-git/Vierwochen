"use client";

import s from "./styles.module.css";

/**
 * Showcase-Karussell: große Karten, horizontal durchscrollbar, randlos bis
 * an den Bildschirmrand (Rücksprache 2026-08-15).
 *
 * Kein Pfeil-Paar mehr über der Reihe — gescrollt wird nativ (Wischen,
 * Trackpad, Umschalt+Rad) mit Einrasten pro Karte. Die Knöpfe standen der
 * Kopfzeile nur im Weg, die jetzt dichter über den Karten hängen soll.
 *
 * Die Karten sind Beispiele, keine Referenzen (Vollreview 2026-09-08):
 * Das Badge sagt „Beispiel", und `branch` ist ein ruhiges Label ohne
 * Versalien — nichts soll wie ein erfundener Kundenname wirken.
 */

export type Showcase = {
  visual: React.ReactNode;
  branch: string;
  title: string;
  text: string;
};

export default function Showcases({ items }: { items: Showcase[] }) {
  return (
    <div className={s.carousel}>
      <div className={s.track}>
        {items.map((c) => (
          <article key={c.title} className={s.card}>
            <div className={s.cardVisual}>
              <span className={s.placeholderTag}>Beispiel</span>
              {c.visual}
            </div>
            <div className={s.cardBody}>
              <span className={s.cardBranch} style={{ textTransform: "none", letterSpacing: "0.02em" }}>
                {c.branch}
              </span>
              <h3 className={s.cardTitle}>{c.title}</h3>
              <p className={s.cardText}>{c.text}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

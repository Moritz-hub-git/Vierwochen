"use client";

import { useEffect } from "react";

/**
 * Hält `<meta name="theme-color">` an der Farbe, die die Seite unten
 * tatsächlich trägt.
 *
 * iOS Safari färbt damit den Streifen um die schwebende Adresszeile und die
 * Statuszeile. Steht dort eine andere Farbe als auf der Seite, sieht man genau
 * das: einen fremdfarbigen Balken an der Unterkante. Die Seitenfarbe steckt in
 * `--bg` — die Variable wechselt mit dem Thema (`data-theme`, umschaltbar und
 * unabhängig vom Systemthema) und mit der Palette der Design-Variante
 * (`data-skin`, z. B. Indigo statt Petrol). Beides beobachten wir und schreiben
 * den Wert nach.
 *
 * Gelesen wird die Variable, nicht die berechnete Hintergrundfarbe: `body`
 * blendet den Hintergrund weich um (0,35 s), die Variable springt sofort —
 * so bekommt der Streifen den Zielwert und nicht eine Zwischenfarbe.
 */
export default function ThemeColor() {
  useEffect(() => {
    const meta = document.getElementById("vw-theme-color");
    if (!meta) return;

    const sync = () => {
      const bg = getComputedStyle(document.body).getPropertyValue("--bg").trim();
      if (bg && meta.getAttribute("content") !== bg) meta.setAttribute("content", bg);
    };

    sync();

    const observer = new MutationObserver(sync);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme", "data-skin"],
    });

    return () => observer.disconnect();
  }, []);

  return null;
}

"use client";

import { useEffect } from "react";

/**
 * Setzt die Design-Variante als Attribut auf <html>, damit auch Elemente
 * außerhalb des Seitenbaums (Dialog-Dock, Panel) die Palette übernehmen.
 * Die Skin-Definitionen stehen am Ende von globals.css.
 */
export default function Skin({ name }: { name: string }) {
  useEffect(() => {
    document.documentElement.setAttribute("data-skin", name);
    return () => {
      document.documentElement.removeAttribute("data-skin");
    };
  }, [name]);
  return null;
}

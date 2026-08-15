"use client";

import { useEffect } from "react";

/**
 * Unterscheidet Maus/Touch von Tastatur, damit der Fokusring nur bei
 * Tastaturnavigation erscheint. `:focus-visible` sollte das eigentlich
 * selbst leisten, aber Safari zeigt ihn nach einem Klick auf `<button>`
 * (bekannter WebKit-Fehler) — der Rahmen bleibt dann sichtbar stehen.
 * `data-input` auf <html> übersteuert das per CSS zuverlässig.
 */
export default function InputModality() {
  useEffect(() => {
    const setMouse = () => {
      document.documentElement.setAttribute("data-input", "mouse");
    };
    const setKeyboard = (e: KeyboardEvent) => {
      if (e.key === "Tab") document.documentElement.setAttribute("data-input", "keyboard");
    };
    window.addEventListener("pointerdown", setMouse);
    window.addEventListener("keydown", setKeyboard);
    return () => {
      window.removeEventListener("pointerdown", setMouse);
      window.removeEventListener("keydown", setKeyboard);
    };
  }, []);
  return null;
}

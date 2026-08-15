"use client";

import { focusDock, openDialog } from "@/components/Header";

/**
 * Knopf zum Dialog — in zwei Stärken:
 *
 * `focus` (Standard für Einstiegsknöpfe) weckt nur die Leiste unten: Der
 * Cursor springt hinein, die Vorschläge steigen auf. Der Nutzer entscheidet
 * selbst, wann er abschickt — das Gespräch beginnt nicht ungefragt.
 *
 * `open` startet das Gespräch sofort, mit optionalem Starttext.
 */
export default function DialogCta({
  className,
  children,
  text,
  mode = "focus",
}: {
  className?: string;
  children: React.ReactNode;
  text?: string;
  mode?: "focus" | "open";
}) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => (mode === "open" ? openDialog(text) : focusDock())}
    >
      {children}
    </button>
  );
}

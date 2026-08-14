"use client";

import { openDialog } from "@/components/Header";

/** Öffnet den geteilten Projekt-Dialog — jede Variante stylt den Knopf selbst. */
export default function DialogCta({
  className,
  children,
  text,
}: {
  className?: string;
  children: React.ReactNode;
  text?: string;
}) {
  return (
    <button type="button" className={className} onClick={() => openDialog(text)}>
      {children}
    </button>
  );
}

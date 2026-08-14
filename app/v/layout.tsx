import type { Metadata } from "next";
import ChatDock from "@/components/chat/ChatDock";

/**
 * Layout der Design-Varianten (/v): KEINE Standard-Kopfzeile — jede Variante
 * baut ihre eigene Welt. Der Dialog-Funnel ist trotzdem überall dabei: Das
 * Dock übernimmt über html[data-skin] automatisch die Palette der Variante,
 * sodass jede Seite in ihren eigenen Farben in denselben, voll
 * funktionsfähigen Chat führt.
 */

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function VariantLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <ChatDock />
    </>
  );
}

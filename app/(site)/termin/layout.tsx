import type { Metadata } from "next";
import { SITE } from "@/lib/config";

/** Die Terminseite ist eine Client-Komponente und kann keine Metadaten
 *  exportieren — deshalb hängt der Titel hier am Layout. */
export const metadata: Metadata = {
  title: "Termin buchen",
  description: `30 Minuten mit ${SITE.founder.name} — kostenlos, unverbindlich, per Online-Call oder Telefon. Ohne Chat-Dialog.`,
};

export default function TerminLayout({ children }: { children: React.ReactNode }) {
  return children;
}

import type { Metadata } from "next";
import Landing from "@/app/v/fixfertig/Landing";
import { PRICE, SITE } from "@/lib/config";

/**
 * Startseite = die neue Landing (Rücksprache 2026-09-08). Die alte Startseite
 * mit eigenem Header ist entfernt — zwei Marken auf einer Domain waren ein
 * Abbruchgrund für jede Persona im Vollreview.
 */
export const metadata: Metadata = {
  // absolute: Das Root-Layout hängt sonst „— vierwochen" ein zweites Mal an.
  title: { absolute: `${SITE.name} — ${SITE.claim}` },
  description: `Individualsoftware zum Festpreis ab ${PRICE.floor.toLocaleString("de-DE")} €, in vier Wochen live. Besteht die Abnahme nicht, entfällt die zweite Rate. Code gehört Ihnen.`,
};

export default function Home() {
  return <Landing variant="wege" />;
}

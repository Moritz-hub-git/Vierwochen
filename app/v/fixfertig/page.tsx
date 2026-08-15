import type { Metadata } from "next";
import Landing from "./Landing";

/**
 * Die bekannte Adresse zeigt die empfohlene Variante („Die zwei Wege" —
 * der klassisch/2+AI-Vergleich trägt beide Kernargumente am direktesten).
 * Alle fünf Fassungen zum Vergleichen: /v
 */

export const metadata: Metadata = {
  title: "neoapp.studio — Digitale Produkte, in vier Wochen live",
};

export default function FixfertigPage() {
  return <Landing variant="wege" />;
}

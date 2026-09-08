import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/config";

/**
 * Interne Vergleichsübersicht: fünf Fassungen derselben Landing —
 * gleicher Hero, gleiche Showcases, gleicher Zeitplan; unterschiedlich
 * sind nur der Neugier-Haken und die grafische Darstellung der
 * Methode. Nicht verlinkt, nicht indexiert (siehe layout.tsx) — zum
 * Durchklicken und Entscheiden, nicht für Kunden.
 */

export const metadata: Metadata = { title: `${SITE.name} — Varianten (intern)` };

const VARIANTS = [
  {
    href: "/v/wege",
    name: "Die zwei Wege",
    idea: "Klassische Kette (Sie → PM → Anforderungsliste → UX → Dev-Team → Tests) neben dem direkten Draht — der Vergleich als Diagramm mit Verlust-Markern an jeder Übergabe.",
  },
  {
    href: "/v/formel",
    name: "Die Gleichung",
    idea: "Die alte Summe (PM + UX + 3 Devs + QA = 6 Monate) durchgestrichen, darunter groß: Sie + Einer, der baut + AI = 4 Wochen live. Mit den drei Karten.",
  },
  {
    href: "/v/kern",
    name: "Ein Kopf",
    idea: "Venn-Diagramm: „Ihr Geschäft“ und „Der Code“ überschneiden sich in einem Kopf, AI als Orbit-Ring darum. Die konzeptionell klarste Darstellung des Schnittstellen-Arguments.",
  },
  {
    href: "/v/bento",
    name: "Das Featureboard",
    idea: "Die Methode als iOS-Bento: große Kennzahlen-Kacheln (0 Übergaben, ×100, Senior, 6× weniger Köpfe) im Apple-Feature-Stil.",
  },
  {
    href: "/v/plan",
    name: "Der Bauplan",
    idea: "Blueprint in Dunkel: der klassische Pfad als lange gestrichelte Umleitung, darunter die kurze direkte Leitung — Engineering-Ästhetik mit Monospace.",
  },
];

export default function VariantsIndex() {
  return (
    <main className="container legal">
      <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "0.5rem" }}>
        Interne Vergleichsseite — nicht verlinkt, nicht indexiert.
      </p>
      <h1>Fünf Fassungen der Methodik</h1>
      <p>
        Gleiche Seite, gleicher Hero, gleicher Zeitplan — unterschiedlich sind
        der Neugier-Haken unter dem Knopf und die grafische Darstellung der
        Methode. Die <Link href="/">Hauptadresse</Link> zeigt die Empfehlung
        („Die zwei Wege").
      </p>

      <div style={{ display: "grid", gap: "1rem", marginTop: "2rem" }}>
        {VARIANTS.map((v, i) => (
          <Link
            key={v.href}
            href={v.href}
            style={{
              display: "block",
              background: "var(--surface)",
              border: "1px solid var(--border-strong)",
              borderRadius: "var(--radius)",
              padding: "1.1rem 1.25rem",
              textDecoration: "none",
              color: "var(--text)",
            }}
          >
            <strong style={{ fontSize: "1.05rem" }}>
              {i + 1} · {v.name}
            </strong>
            <span style={{ display: "block", fontSize: "0.9rem", color: "var(--text-muted)", marginTop: "0.2rem" }}>
              {v.idea}
            </span>
          </Link>
        ))}
      </div>
    </main>
  );
}

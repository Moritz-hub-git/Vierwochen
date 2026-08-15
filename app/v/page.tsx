import type { Metadata } from "next";
import Link from "next/link";

/**
 * Vergleichsübersicht: fünf Fassungen derselben neoapp.studio-Seite —
 * gleicher Hero, gleiche Showcases, gleicher Zeitplan; unterschiedlich
 * sind nur der Neugier-Haken und die grafische Darstellung der
 * 2+AI-Methode. Zum Durchklicken und Entscheiden.
 */

export const metadata: Metadata = { title: "Methodik-Varianten — neoapp.studio" };

const VARIANTS = [
  {
    href: "/v/wege",
    name: "Die zwei Wege",
    hook: "Sechs Übergaben oder eine. Sehen Sie, wo bei anderen die Monate bleiben",
    idea: "Klassische Kette (Sie → PM → Anforderungsliste → UX → Dev-Team → Tests) neben dem direkten Draht — der Vergleich als Diagramm mit Verlust-Markern an jeder Übergabe.",
  },
  {
    href: "/v/formel",
    name: "Die Gleichung",
    hook: "Wie das gehen soll? Die Rechnung: 1 + 1 + AI",
    idea: "Die alte Summe (PM + UX + 3 Devs + QA = 6 Monate) durchgestrichen, darunter groß: Sie + Einer, der baut + AI = 4 Wochen live. Mit den drei Karten.",
  },
  {
    href: "/v/kern",
    name: "Ein Kopf",
    hook: "Kein Zauber — Businessverständnis und Code in einem Kopf",
    idea: "Venn-Diagramm: „Ihr Geschäft“ und „Der Code“ überschneiden sich in einem Kopf, AI als Orbit-Ring darum. Die konzeptionell klarste Darstellung des Schnittstellen-Arguments.",
  },
  {
    href: "/v/bento",
    name: "Das Featureboard",
    hook: "Neugierig, wie das funktioniert? Die Methode auf einen Blick",
    idea: "Die Methode als iOS-Bento: große Kennzahlen-Kacheln (0 Übergaben, ×100, Senior, 6× weniger Köpfe) im Apple-Feature-Stil.",
  },
  {
    href: "/v/plan",
    name: "Der Bauplan",
    hook: "Vier Wochen, Tag für Tag: der Bauplan mit echten Daten",
    idea: "Blueprint in Dunkel: der klassische Pfad als lange gestrichelte Umleitung, darunter die kurze direkte Leitung — Engineering-Ästhetik mit Monospace.",
  },
];

export default function VariantsIndex() {
  return (
    <main className="container legal">
      <h1>Fünf Fassungen der Methodik</h1>
      <p>
        Gleiche Seite, gleicher Hero, gleicher Zeitplan — unterschiedlich sind
        der Neugier-Haken unter dem Knopf und die grafische Darstellung der
        2+AI-Methode. Die Hauptadresse <Link href="/v/fixfertig">/v/fixfertig</Link>{" "}
        zeigt die Empfehlung („Die zwei Wege").
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
            <span style={{ display: "block", fontSize: "0.9rem", color: "var(--accent)", marginTop: "0.2rem" }}>
              „{v.hook}“
            </span>
            <span style={{ display: "block", fontSize: "0.9rem", color: "var(--text-muted)", marginTop: "0.2rem" }}>
              {v.idea}
            </span>
          </Link>
        ))}
      </div>
    </main>
  );
}

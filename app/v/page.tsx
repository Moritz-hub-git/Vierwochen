import type { Metadata } from "next";
import Link from "next/link";

/**
 * Übersicht der sechs Design-Varianten — intern, zum Vergleichen und
 * Auswählen. Jede Variante transportiert dieselbe Botschaft (4 Wochen,
 * Festpreis, Risiko-Umkehr, KI als Werkzeug) mit einer anderen Psychologie.
 */

export const metadata: Metadata = { title: "Design-Varianten — vierwochen" };

const VARIANTS = [
  {
    href: "/v/werkbank",
    name: "werkbank.",
    tone: "Der ehrliche Handwerker",
    idea: "Software als Handwerk: Typenschild, Werkstattzettel, „Sag, was klemmt.“ Harte Kanten, Schwarz auf Rohpapier, Signalgelb.",
    colors: ["#f4f1ea", "#141414", "#f5c400"],
  },
  {
    href: "/v/montag",
    name: "montag.",
    tone: "Der Kompetenzbeweis",
    idea: "Terminal-Ästhetik: tippender Befehl, Diff statt Tabelle, Changelog statt Projektplan. Dunkel, Monospace, Grün.",
    colors: ["#0a0e14", "#101725", "#42e2a0"],
  },
  {
    href: "/v/klara",
    name: "klara.",
    tone: "Die ruhige Kanzlei",
    idea: "Editorial: Serifen, Weißraum, römische Nummern, das Versprechen als Urkunde mit Unterschrift. Creme, Tinte, Bronze.",
    colors: ["#faf6ee", "#211e18", "#8a6437"],
  },
  {
    href: "/v/fixfertig",
    name: "fixfertig.",
    tone: "Die Energie",
    idea: "Bold Pop: Bento-Kacheln, große Zahlen, kurzer Text, verspielte Bewegung. Indigo, Coral, Lime.",
    colors: ["#edeffb", "#4f46e5", "#ff6b5e"],
  },
  {
    href: "/v/kalkuel",
    name: "kalkül.",
    tone: "Der nüchterne Kaufmann",
    idea: "Dashboard: interaktiver Kostenrechner im Hero, Mono-Ziffern, Vergleichstabelle. Der Regler übergibt die eigene Zahl in den Dialog.",
    colors: ["#f5f7f9", "#0d1b26", "#1552d0"],
  },
  {
    href: "/v/substanz",
    name: "substanz.",
    tone: "Das stille Studio",
    idea: "Manifest im Stil einer Premium-Markenberatung, nur greifbar: große Typo, Weißraum, Serifen-Akzente, „Aus A wird B“-Transformationen. Warmes Papier, Tinte, Tannengrün.",
    colors: ["#f6f4ee", "#191712", "#14594a"],
  },
];

export default function VariantsIndex() {
  return (
    <main className="container legal">
      <h1>Sechs Design-Varianten</h1>
      <p>
        Gleiche Botschaft — vier Wochen, Festpreis, „läuft es nicht, zahlen Sie
        nichts", KI als Werkzeug — in sechs grundverschiedenen Welten. Der
        Dialog-Funnel läuft auf jeder Variante voll mit und färbt sich
        automatisch in deren Palette. Zum Vergleichen durchklicken; die
        Hauptseite bleibt unter <Link href="/">vierwochen.de</Link> unverändert.
      </p>

      <div style={{ display: "grid", gap: "1rem", marginTop: "2rem" }}>
        {VARIANTS.map((v) => (
          <Link
            key={v.href}
            href={v.href}
            style={{
              display: "flex",
              gap: "1.1rem",
              alignItems: "center",
              background: "var(--surface)",
              border: "1px solid var(--border-strong)",
              borderRadius: "var(--radius)",
              padding: "1.1rem 1.25rem",
              textDecoration: "none",
              color: "var(--text)",
            }}
          >
            <span style={{ display: "flex", flexShrink: 0 }} aria-hidden>
              {v.colors.map((c) => (
                <i
                  key={c}
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: "50%",
                    background: c,
                    border: "2px solid var(--surface)",
                    marginLeft: c === v.colors[0] ? 0 : -8,
                  }}
                />
              ))}
            </span>
            <span style={{ minWidth: 0 }}>
              <strong style={{ fontSize: "1.05rem" }}>{v.name}</strong>
              <span style={{ color: "var(--accent)", fontWeight: 600 }}> · {v.tone}</span>
              <span style={{ display: "block", fontSize: "0.9rem", color: "var(--text-muted)", marginTop: "0.15rem" }}>
                {v.idea}
              </span>
            </span>
          </Link>
        ))}
      </div>
    </main>
  );
}

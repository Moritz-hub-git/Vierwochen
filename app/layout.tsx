import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import RevealObserver from "@/components/RevealObserver";
import Track from "@/components/Track";
import InputModality from "@/components/InputModality";
import ThemeColor from "@/components/ThemeColor";

// Schriften liegen im Repository — der Build lädt nichts aus dem Netz.
const manrope = localFont({
  src: [
    { path: "./fonts/manrope-latin.woff2", weight: "200 800", style: "normal" },
    { path: "./fonts/manrope-latin-ext.woff2", weight: "200 800", style: "normal" },
  ],
  variable: "--font-body",
  display: "swap",
});

const sora = localFont({
  src: [
    { path: "./fonts/sora-latin.woff2", weight: "100 800", style: "normal" },
    { path: "./fonts/sora-latin-ext.woff2", weight: "100 800", style: "normal" },
  ],
  variable: "--font-display",
  display: "swap",
});

// Zusatzschriften für die Design-Varianten unter /v — ohne Preload, damit die
// Hauptseite sie nicht mitlädt; sie werden erst gezogen, wenn CSS sie nutzt.
const grotesk = localFont({
  src: [{ path: "./fonts/space-grotesk-latin.woff2", weight: "300 700", style: "normal" }],
  variable: "--font-grotesk",
  display: "swap",
  preload: false,
});

const fraunces = localFont({
  src: [{ path: "./fonts/fraunces-latin.woff2", weight: "100 900", style: "normal" }],
  variable: "--font-serif",
  display: "swap",
  preload: false,
});

const mono = localFont({
  src: [
    { path: "./fonts/plex-mono-latin-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/plex-mono-latin-600.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-mono",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: "vierwochen — In vier Wochen zur Software, die Ihr Betrieb wirklich braucht",
  description:
    "Individualsoftware für den Mittelstand: in vier Wochen, zum Festpreis, integriert in Ihre IT. Läuft es nicht, kostet es nichts.",
  // Solange die Seite nicht offiziell live ist: nicht indexieren (PROMPT.md §11).
  robots: { index: false, follow: false },
};

/**
 * `viewportFit: "cover"` ist hier der entscheidende Eintrag: Ohne ihn legt iOS
 * Safari die Seite NUR in den sicheren Bereich — der Streifen unten, in dem die
 * schwebende Adresszeile und der Home-Indikator sitzen, gehört dann nicht mehr
 * zur Seite. Safari füllt ihn selbst, in der Farbe aus `theme-color`; auf dem
 * Handy sah das aus wie ein weißer Balken unter der Seite statt einer
 * Adresszeile, die über der Seite schwebt (Rücksprache 2026-08-16). Mit `cover`
 * reicht die Seite bis an die Gerätekante, und `env(safe-area-inset-*)` liefert
 * überhaupt erst Werte — die Dialogleiste und die Eingabezeile rechnen längst
 * damit.
 *
 * `themeColor` steht bewusst NICHT hier: Next würde daraus ein Meta mit
 * `media="(prefers-color-scheme: …)"` bauen, das am Systemthema hängt. Das
 * Erscheinungsbild der Seite hängt aber am `data-theme` (umschaltbar, aus dem
 * localStorage) und an der Palette der jeweiligen Variante (`data-skin`).
 * Beides kann vom Systemthema abweichen — dann bekäme der Safari-Streifen eine
 * Farbe, die zur Seite nicht passt. Das Meta setzt darum das Skript unten (vor
 * dem ersten Bild) und hält es danach `ThemeColor` an der echten Seitenfarbe.
 */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

// Setzt das Thema vor dem ersten Rendern, damit nichts aufblitzt — und
// gleich die Farbe des Safari-Streifens dazu, damit auch der nicht aufblitzt.
const themeInit = `(function(){var t="light";try{t=localStorage.getItem("vw-theme");if(t!=="light"&&t!=="dark"){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}}catch(e){t="light"}document.documentElement.setAttribute("data-theme",t);var m=document.getElementById("vw-theme-color");if(m){m.setAttribute("content",t==="dark"?"#0c1311":"#f4f7f6")}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" suppressHydrationWarning>
      <head>
        {/* Von Hand statt über `viewport.themeColor` — siehe dort. Der
            Startwert gilt nur bis das Skript direkt darunter greift. */}
        <meta id="vw-theme-color" name="theme-color" content="#f4f7f6" />
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body className={`${manrope.variable} ${sora.variable} ${grotesk.variable} ${fraunces.variable} ${mono.variable}`}>
        <RevealObserver />
        <Track />
        <InputModality />
        <ThemeColor />
        {children}
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import RevealObserver from "@/components/RevealObserver";
import ChatDock from "@/components/chat/ChatDock";

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

export const metadata: Metadata = {
  title: "vierwochen — In vier Wochen zur Software, die Ihr Betrieb wirklich braucht",
  description:
    "Individualsoftware für den Mittelstand: in vier Wochen, zum Festpreis, integriert in Ihre IT. Läuft es nicht, kostet es nichts.",
  // Solange die Seite nicht offiziell live ist: nicht indexieren (PROMPT.md §11).
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f7f6" },
    { media: "(prefers-color-scheme: dark)", color: "#0c1311" },
  ],
  width: "device-width",
  initialScale: 1,
};

// Setzt das Thema vor dem ersten Rendern, damit nichts aufblitzt.
const themeInit = `(function(){try{var t=localStorage.getItem("vw-theme");if(t!=="light"&&t!=="dark"){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.setAttribute("data-theme",t)}catch(e){document.documentElement.setAttribute("data-theme","light")}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body className={`${manrope.variable} ${sora.variable}`}>
        <RevealObserver />
        <Header />
        {children}
        <ChatDock />
      </body>
    </html>
  );
}

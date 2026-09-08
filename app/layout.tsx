import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import RevealObserver from "@/components/RevealObserver";
import Track from "@/components/Track";
import InputModality from "@/components/InputModality";
import { ACCEPTANCE_PROMISE, IS_LIVE, PRICE, SITE } from "@/lib/config";

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
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.claim}`,
    template: `%s — ${SITE.name}`,
  },
  description: `Individualsoftware zum Festpreis ab ${PRICE.floor.toLocaleString("de-DE")} €, in vier Wochen live. ${ACCEPTANCE_PROMISE} Code gehört Ihnen.`,
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.claim}`,
    description: `Festpreis ab ${PRICE.floor.toLocaleString("de-DE")} €. ${ACCEPTANCE_PROMISE}`,
  },
  robots: IS_LIVE ? { index: true, follow: true } : { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#f3f4fd",
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
      <body className={`${manrope.variable} ${sora.variable} ${grotesk.variable} ${fraunces.variable} ${mono.variable}`}>
        <RevealObserver />
        <Track />
        <InputModality />
        {children}
      </body>
    </html>
  );
}

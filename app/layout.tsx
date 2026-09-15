import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { IS_LIVE, SITE } from "@/lib/config";
import "./globals.css";
import "./experience.css";
const body = localFont({
  src: [
    { path: "./fonts/manrope-latin.woff2", weight: "200 800" },
    { path: "./fonts/manrope-latin-ext.woff2", weight: "200 800" },
  ],
  variable: "--font-body",
  display: "swap",
});
const display = localFont({
  src: "./fonts/manrope-latin.woff2",
  variable: "--font-display",
  weight: "200 800",
  display: "swap",
});
export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: "Opsrid — Work eliminated.", template: "%s — Opsrid" },
  description:
    "Opsrid übernimmt wiederkehrende Prozessarbeit und baut dafür eine individuelle Geschäftsanwendung.",
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: "Opsrid",
    title: "Opsrid — Work eliminated.",
    description: "Ihr Prozess wird zu einer Anwendung, die die Arbeit übernimmt.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
  robots: IS_LIVE
    ? { index: true, follow: true }
    : { index: false, follow: false },
};
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#f4f4fd",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body className={`${body.variable} ${display.variable}`}>{children}</body>
    </html>
  );
}

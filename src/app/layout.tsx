import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'vierwochen — Individualsoftware in vier Wochen',
    template: '%s',
  },
  description:
    'Wir bauen die Software, die Ihr Betrieb wirklich braucht: in vier Wochen, zum Festpreis, integriert in Ihre bestehende IT. Mit Garantie: Läuft es nicht, kostet es nichts.',
  openGraph: {
    title: 'vierwochen — In vier Wochen zum Ziel',
    description:
      'Individualsoftware für den Mittelstand: 4 Wochen, Festpreis, 12 Monate Gewährleistung, volles Eigentum.',
    locale: 'de_DE',
    type: 'website',
  },
  robots: { index: false, follow: false }, // bis zum Livegang bewusst gesperrt
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f3f4f1' },
    { media: '(prefers-color-scheme: dark)', color: '#121514' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}

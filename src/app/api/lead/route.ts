import { NextRequest } from 'next/server';
import { anlegen } from '@/lib/firestore';

export const dynamic = 'force-dynamic';

/**
 * Nimmt die geschäftliche E-Mail-Adresse am Ende des Dialogs entgegen und
 * legt den Lead samt Skizze und Verlauf in Firestore ab. Freemail wird
 * freundlich abgewiesen — die Auswertung geht an ein Unternehmen.
 */

const FREEMAIL = new Set([
  'gmail.com', 'googlemail.com', 'web.de', 'gmx.de', 'gmx.net', 'gmx.at',
  'gmx.ch', 'yahoo.com', 'yahoo.de', 'outlook.com', 'outlook.de',
  'hotmail.com', 'hotmail.de', 'live.de', 'live.com', 'icloud.com', 'me.com',
  't-online.de', 'freenet.de', 'posteo.de', 'mailbox.org', 'proton.me',
  'protonmail.com', 'aol.com',
]);

export async function POST(request: NextRequest) {
  let daten: { email?: string; skizze?: unknown; verlauf?: unknown };
  try {
    daten = await request.json();
  } catch {
    return Response.json({ fehler: 'Ungültige Anfrage.' }, { status: 400 });
  }

  const email = String(daten.email ?? '').trim().toLowerCase();
  const gueltig = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
  if (!gueltig) {
    return Response.json(
      { fehler: 'Das sieht nicht nach einer gültigen E-Mail-Adresse aus.' },
      { status: 400 },
    );
  }

  const domain = email.split('@')[1];
  if (FREEMAIL.has(domain)) {
    return Response.json(
      {
        fehler:
          'Bitte nutzen Sie Ihre geschäftliche Adresse — die Auswertung geht an Ihr Unternehmen, nicht an ein Privatpostfach.',
      },
      { status: 400 },
    );
  }

  try {
    await anlegen('leads', {
      email,
      skizze: JSON.stringify(daten.skizze ?? null).slice(0, 20000),
      verlauf: JSON.stringify(daten.verlauf ?? null).slice(0, 40000),
      erstellt: new Date().toISOString(),
    });
  } catch (fehler) {
    // Der Besucher soll sein Ergebnis sehen, auch wenn der Speicher hakt.
    console.error('Lead speichern fehlgeschlagen:', fehler);
    console.log('LEAD-NOTNAGEL', JSON.stringify({ email, zeit: new Date().toISOString() }));
  }

  return Response.json({ ok: true });
}

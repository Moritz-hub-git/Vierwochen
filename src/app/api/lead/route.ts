import { NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';

/**
 * Nimmt die geschäftliche E-Mail-Adresse am Ende des Dialogs entgegen.
 *
 * Ablage in Firestore folgt; bis dahin landet der Lead im Log, damit während
 * der Vorschau nichts verloren geht. Der Endpunkt prüft, dass es sich um eine
 * geschäftliche Adresse handelt — Freemail wird freundlich abgewiesen.
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

  // TODO Firestore: Lead mit Skizze und Verlauf ablegen, Bestätigung senden.
  console.log('LEAD', JSON.stringify({ email, zeit: new Date().toISOString() }));

  return Response.json({ ok: true });
}

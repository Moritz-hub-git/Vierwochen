import { NextRequest } from 'next/server';
import { istGueltigerSlot } from '@/lib/slots';
import { istFrei, kalenderKonfiguriert, terminAnlegen } from '@/lib/calendar';
import { anlegen, existiert } from '@/lib/firestore';

export const dynamic = 'force-dynamic';

interface Anfrage {
  slotIso?: string;
  kanal?: string;
  name?: string;
  email?: string;
  telefon?: string;
  fall?: string;
}

export async function POST(request: NextRequest) {
  let daten: Anfrage;
  try {
    daten = await request.json();
  } catch {
    return Response.json({ fehler: 'Ungültige Anfrage.' }, { status: 400 });
  }

  const slotIso = String(daten.slotIso ?? '');
  const kanal = daten.kanal === 'telefon' ? 'telefon' : 'video';
  const name = String(daten.name ?? '').trim().slice(0, 120);
  const email = String(daten.email ?? '').trim().toLowerCase().slice(0, 200);
  const telefon = String(daten.telefon ?? '').trim().slice(0, 40) || null;
  const fall = String(daten.fall ?? '').trim().slice(0, 2000);

  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return Response.json(
      { fehler: 'Bitte Name und eine gültige E-Mail-Adresse angeben.' },
      { status: 400 },
    );
  }
  if (kanal === 'telefon' && !telefon) {
    return Response.json(
      { fehler: 'Für einen Telefontermin brauche ich Ihre Rufnummer.' },
      { status: 400 },
    );
  }
  if (!istGueltigerSlot(slotIso)) {
    return Response.json(
      { fehler: 'Dieses Zeitfenster ist nicht mehr verfügbar. Bitte wählen Sie ein anderes.' },
      { status: 409 },
    );
  }

  // Doppelbuchung über die Datenbank abfangen …
  try {
    if (await existiert('buchungen', 'slotIso', slotIso)) {
      return Response.json(
        { fehler: 'Dieses Zeitfenster wurde gerade vergeben. Bitte wählen Sie ein anderes.' },
        { status: 409 },
      );
    }
  } catch (fehler) {
    console.error('Firestore-Prüfung fehlgeschlagen:', fehler);
    // Buchung nicht am Speicher scheitern lassen — Kalenderprüfung folgt.
  }

  // … und gegen den echten Kalender.
  try {
    if (!(await istFrei(slotIso))) {
      return Response.json(
        { fehler: 'Dieses Zeitfenster ist inzwischen belegt. Bitte wählen Sie ein anderes.' },
        { status: 409 },
      );
    }
  } catch (fehler) {
    console.error('Kalenderprüfung fehlgeschlagen:', fehler);
  }

  // Kalendereintrag anlegen (best effort — ohne Kalender wird es eine Anfrage).
  let eingetragen = false;
  try {
    eingetragen = await terminAnlegen({ slotIso, kanal, name, email, telefon, fall });
  } catch (fehler) {
    console.error('Kalendereintrag fehlgeschlagen:', fehler);
  }

  const status = eingetragen ? 'bestaetigt' : 'angefragt';

  try {
    await anlegen('buchungen', {
      slotIso,
      kanal,
      name,
      email,
      telefon,
      fall,
      status,
      erstellt: new Date().toISOString(),
    });
  } catch (fehler) {
    console.error('Buchung speichern fehlgeschlagen:', fehler);
    if (!eingetragen) {
      // Weder Kalender noch Datenbank — dann ehrlich scheitern.
      return Response.json(
        {
          fehler:
            'Die Buchung konnte gerade nicht gespeichert werden. Bitte versuchen Sie es in einer Minute erneut.',
        },
        { status: 503 },
      );
    }
  }

  return Response.json({
    modus: status,
    kalender: kalenderKonfiguriert(),
    slotIso,
    kanal,
  });
}

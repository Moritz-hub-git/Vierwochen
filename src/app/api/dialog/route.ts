import { NextRequest } from 'next/server';
import { generieren } from '@/lib/vertex';
import {
  ANTWORT_SCHEMA,
  DialogAntwort,
  SYSTEM_ANWEISUNG,
} from '@/lib/dialog';
import { kategorie, spanneAlsText, UNVERBINDLICHKEIT } from '@/lib/pricing';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

/* ─── Kostenbremse ────────────────────────────────────────────────────────────
   Eine offen erreichbare Modellschnittstelle ohne Begrenzung ist eine offene
   Rechnung. Die Zaehler liegen bewusst im Arbeitsspeicher: einfach, ohne
   Abhaengigkeit, und bei mehreren Instanzen entsprechend grosszuegiger. Sobald
   Firestore angebunden ist, wandern sie dorthin.                              */

const MAX_ZUEGE_JE_DIALOG = 12;
const MAX_ANFRAGEN_JE_IP_STUNDE = 40;
const MAX_ANFRAGEN_JE_TAG = 800;
const MAX_ZEICHEN_JE_NACHRICHT = 1500;

const proIp = new Map<string, { anzahl: number; bis: number }>();
let tagesZaehler = { anzahl: 0, bis: 0 };

function limitUeberschritten(ip: string): string | null {
  const jetzt = Date.now();

  if (jetzt > tagesZaehler.bis) {
    tagesZaehler = { anzahl: 0, bis: jetzt + 24 * 60 * 60 * 1000 };
  }
  if (tagesZaehler.anzahl >= MAX_ANFRAGEN_JE_TAG) {
    return 'Der Dialog ist heute stark gefragt. Bitte versuchen Sie es morgen noch einmal oder schreiben Sie direkt eine Nachricht.';
  }

  const eintrag = proIp.get(ip);
  if (!eintrag || jetzt > eintrag.bis) {
    proIp.set(ip, { anzahl: 1, bis: jetzt + 60 * 60 * 1000 });
  } else if (eintrag.anzahl >= MAX_ANFRAGEN_JE_IP_STUNDE) {
    return 'Zu viele Anfragen in kurzer Zeit. Bitte in einer Stunde erneut versuchen.';
  } else {
    eintrag.anzahl += 1;
  }

  tagesZaehler.anzahl += 1;
  return null;
}

/* ─── Endpunkt ──────────────────────────────────────────────────────────────── */

interface Anfrage {
  verlauf: { rolle: 'user' | 'model'; text: string }[];
}

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unbekannt';

  const gesperrt = limitUeberschritten(ip);
  if (gesperrt) {
    return Response.json({ fehler: gesperrt }, { status: 429 });
  }

  let koerper: Anfrage;
  try {
    koerper = (await request.json()) as Anfrage;
  } catch {
    return Response.json({ fehler: 'Ungültige Anfrage.' }, { status: 400 });
  }

  const verlauf = Array.isArray(koerper.verlauf) ? koerper.verlauf : [];
  if (verlauf.length === 0) {
    return Response.json({ fehler: 'Bitte beschreiben Sie Ihren Fall.' }, { status: 400 });
  }
  if (verlauf.length > MAX_ZUEGE_JE_DIALOG) {
    return Response.json(
      {
        fehler:
          'Für diesen Fall lohnt sich ein Gespräch mehr als weiteres Schreiben. Buchen Sie gern einen Termin.',
      },
      { status: 400 },
    );
  }

  const bereinigt = verlauf.map((n) => ({
    rolle: n.rolle === 'model' ? ('model' as const) : ('user' as const),
    text: String(n.text ?? '').slice(0, MAX_ZEICHEN_JE_NACHRICHT),
  }));

  try {
    const ergebnis = await generieren<
      Omit<DialogAntwort, 'kategorie'> & { kategorie: string }
    >({
      systemAnweisung: SYSTEM_ANWEISUNG,
      verlauf: bereinigt,
      schema: ANTWORT_SCHEMA as unknown as Record<string, unknown>,
    });

    // Die Preisangabe kommt aus der Konfiguration, nicht aus dem Modell.
    let preis: null | {
      name: string;
      spanne: string;
      wochen: number | null;
      beschreibung: string;
      hinweis: string;
    } = null;

    const gewaehlt = ergebnis.kategorie;
    if (
      ergebnis.genugInformation &&
      gewaehlt &&
      gewaehlt !== 'offen'
    ) {
      const k = kategorie(gewaehlt as Parameters<typeof kategorie>[0]);
      preis = {
        name: k.name,
        spanne: spanneAlsText(k),
        wochen: k.wochen,
        beschreibung: k.beschreibung,
        hinweis: UNVERBINDLICHKEIT,
      };
    }

    return Response.json({
      antwort: ergebnis.antwort,
      skizze: ergebnis.skizze,
      fertig: ergebnis.genugInformation && preis !== null,
      preis,
      annahmen: ergebnis.annahmen ?? [],
    });
  } catch (fehler) {
    console.error('Dialogfehler:', fehler);
    return Response.json(
      {
        fehler:
          'Der Dialog ist gerade nicht erreichbar. Beschreiben Sie Ihren Fall gern direkt per Nachricht — ich melde mich am selben Tag.',
      },
      { status: 503 },
    );
  }
}

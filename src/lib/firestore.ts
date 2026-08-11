import { projektId, zugriffstoken } from './gauth';

/**
 * Schlanker Firestore-Zugriff über die REST-Schnittstelle.
 *
 * Bewusst ohne das offizielle SDK: Wir brauchen genau drei Operationen
 * (Dokument anlegen, Gleichheits-Abfrage, Existenzprüfung), und der
 * REST-Weg hält das Container-Image klein und die Abhängigkeiten flach.
 * Werte werden als einfache Typen abgelegt; verschachtelte Strukturen
 * (Skizze, Verlauf) als JSON-Text — robust und jederzeit lesbar.
 */

type Einfach = string | number | boolean | null;

function kodieren(wert: Einfach): Record<string, unknown> {
  if (wert === null) return { nullValue: null };
  if (typeof wert === 'boolean') return { booleanValue: wert };
  if (typeof wert === 'number') {
    return Number.isInteger(wert)
      ? { integerValue: String(wert) }
      : { doubleValue: wert };
  }
  return { stringValue: wert };
}

async function basis(): Promise<{ url: string; token: string }> {
  const projekt = await projektId();
  return {
    url: `https://firestore.googleapis.com/v1/projects/${projekt}/databases/(default)/documents`,
    token: await zugriffstoken(),
  };
}

/** Legt ein Dokument mit generierter ID an. Wirft bei Fehlern. */
export async function anlegen(
  sammlung: string,
  daten: Record<string, Einfach>,
): Promise<string> {
  const { url, token } = await basis();
  const fields = Object.fromEntries(
    Object.entries(daten).map(([k, v]) => [k, kodieren(v)]),
  );

  const antwort = await fetch(`${url}/${sammlung}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ fields }),
  });

  if (!antwort.ok) {
    throw new Error(`Firestore ${antwort.status}: ${(await antwort.text()).slice(0, 300)}`);
  }
  const dokument = (await antwort.json()) as { name: string };
  return dokument.name.split('/').pop() ?? '';
}

/** Zählt Dokumente, bei denen `feld == wert` gilt (max. 5 geprüft). */
export async function existiert(
  sammlung: string,
  feld: string,
  wert: string,
): Promise<boolean> {
  const { url, token } = await basis();

  const antwort = await fetch(`${url}:runQuery`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      structuredQuery: {
        from: [{ collectionId: sammlung }],
        where: {
          fieldFilter: {
            field: { fieldPath: feld },
            op: 'EQUAL',
            value: { stringValue: wert },
          },
        },
        limit: 5,
      },
    }),
  });

  if (!antwort.ok) {
    throw new Error(`Firestore-Abfrage ${antwort.status}: ${(await antwort.text()).slice(0, 300)}`);
  }
  const zeilen = (await antwort.json()) as { document?: unknown }[];
  return zeilen.some((z) => z.document);
}

import { GoogleAuth } from 'google-auth-library';

/**
 * Anbindung an Gemini über Vertex AI.
 *
 * Es wird bewusst kein API-Schlüssel verwendet: Auf Cloud Run authentifiziert
 * sich die Anwendung über die Identität ihres Dienstkontos, lokal über
 * `gcloud auth application-default login`.
 */

const auth = new GoogleAuth({
  scopes: ['https://www.googleapis.com/auth/cloud-platform'],
});

let projektCache: string | null = null;

async function projekt(): Promise<string> {
  if (projektCache) return projektCache;
  projektCache =
    process.env.GOOGLE_CLOUD_PROJECT ?? (await auth.getProjectId());
  return projektCache;
}

export interface GenerierenOptionen {
  systemAnweisung: string;
  verlauf: { rolle: 'user' | 'model'; text: string }[];
  schema: Record<string, unknown>;
  maxTokens?: number;
}

/**
 * Ruft das Modell auf und erzwingt eine Antwort, die dem übergebenen Schema
 * entspricht. Dadurch kann die Oberfläche mit der Antwort rechnen, statt Text
 * zu interpretieren.
 */
export async function generieren<T>(opt: GenerierenOptionen): Promise<T> {
  const region = process.env.VERTEX_LOCATION ?? 'europe-west4';
  const modell = process.env.VERTEX_MODEL ?? 'gemini-2.5-flash';
  const projectId = await projekt();

  const url =
    `https://${region}-aiplatform.googleapis.com/v1/projects/${projectId}` +
    `/locations/${region}/publishers/google/models/${modell}:generateContent`;

  const client = await auth.getClient();
  const token = await client.getAccessToken();
  if (!token.token) throw new Error('Kein Zugriffstoken für Vertex AI erhalten.');

  const antwort = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token.token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: opt.systemAnweisung }] },
      contents: opt.verlauf.map((n) => ({
        role: n.rolle,
        parts: [{ text: n.text }],
      })),
      generationConfig: {
        temperature: 0.4,
        maxOutputTokens: opt.maxTokens ?? 1200,
        responseMimeType: 'application/json',
        responseSchema: opt.schema,
      },
      safetySettings: [],
    }),
  });

  if (!antwort.ok) {
    const text = await antwort.text();
    throw new Error(`Vertex AI antwortete mit ${antwort.status}: ${text.slice(0, 500)}`);
  }

  const daten = (await antwort.json()) as {
    candidates?: { content?: { parts?: { text?: string }[] } }[];
  };

  const roh = daten.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!roh) throw new Error('Vertex AI lieferte keine verwertbare Antwort.');

  return JSON.parse(roh) as T;
}

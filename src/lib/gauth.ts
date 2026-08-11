import { GoogleAuth } from 'google-auth-library';

/**
 * Gemeinsame Authentifizierung für alle Google-Schnittstellen.
 * Läuft über die Identität des Dienstkontos (Cloud Run) bzw. über
 * `gcloud auth application-default login` (lokal). Kein Schlüssel.
 */
const auth = new GoogleAuth({
  scopes: [
    'https://www.googleapis.com/auth/cloud-platform',
    'https://www.googleapis.com/auth/calendar',
  ],
});

let projektCache: string | null = null;

export async function projektId(): Promise<string> {
  if (projektCache) return projektCache;
  projektCache = process.env.GOOGLE_CLOUD_PROJECT ?? (await auth.getProjectId());
  return projektCache;
}

export async function zugriffstoken(): Promise<string> {
  const client = await auth.getClient();
  const token = await client.getAccessToken();
  if (!token.token) throw new Error('Kein Zugriffstoken erhalten.');
  return token.token;
}

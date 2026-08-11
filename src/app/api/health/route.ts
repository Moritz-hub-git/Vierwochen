export const dynamic = 'force-dynamic';

/**
 * Lebenszeichen und Konfigurationsübersicht.
 *
 * Zeigt auf einen Blick, was in der laufenden Umgebung eingerichtet ist —
 * ohne Geheimnisse preiszugeben. Damit lässt sich nach einem Deployment
 * prüfen, ob Modell, Kalender und Passwortschutz greifen.
 */
export async function GET() {
  return Response.json({
    status: 'ok',
    zeit: new Date().toISOString(),
    konfiguration: {
      projekt: process.env.GOOGLE_CLOUD_PROJECT ?? null,
      vertexRegion: process.env.VERTEX_LOCATION ?? null,
      vertexModell: process.env.VERTEX_MODEL ?? 'gemini-2.5-flash (Standard)',
      kalenderGesetzt: Boolean(process.env.BOOKING_CALENDAR_ID),
      vorschauGeschuetzt: Boolean(process.env.SITE_PASSWORD),
    },
    hinweis:
      'kalenderGesetzt=false bedeutet: Terminbuchung läuft im Anfrage-Modus. ' +
      'vorschauGeschuetzt=false bedeutet: Die Seite ist öffentlich erreichbar.',
  });
}

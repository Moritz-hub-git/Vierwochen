export const dynamic = 'force-dynamic';

/** Einfacher Lebenszeichen-Endpunkt fuer Cloud Run und Betriebspruefungen. */
export async function GET() {
  return Response.json({
    status: 'ok',
    projekt: process.env.GOOGLE_CLOUD_PROJECT ?? 'lokal',
    vertexRegion: process.env.VERTEX_LOCATION ?? 'nicht gesetzt',
    zeit: new Date().toISOString(),
  });
}

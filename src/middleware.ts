import { NextRequest, NextResponse } from 'next/server';

/**
 * Passwortschutz fuer die Vorschau.
 *
 * Solange die Umgebungsvariable SITE_PASSWORD gesetzt ist, verlangt die
 * gesamte Seite eine einfache Anmeldung. Ist sie nicht gesetzt, ist die Seite
 * oeffentlich — das ist der Zustand nach dem Livegang.
 *
 * Wichtig: Das ersetzt keine Benutzerverwaltung. Es haelt nur Suchmaschinen
 * und zufaellige Besucher fern, solange Gewerbe, Impressum und
 * Nebentaetigkeitsgenehmigung nicht stehen.
 */
export function middleware(request: NextRequest) {
  const password = process.env.SITE_PASSWORD;
  if (!password) return NextResponse.next();

  const header = request.headers.get('authorization');
  if (header?.startsWith('Basic ')) {
    const decoded = atob(header.slice(6));
    const supplied = decoded.slice(decoded.indexOf(':') + 1);
    if (supplied === password) return NextResponse.next();
  }

  return new NextResponse('Vorschau — bitte anmelden.', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="vierwochen — Vorschau", charset="UTF-8"',
    },
  });
}

export const config = {
  // Statische Dateien und der Health-Endpunkt bleiben frei, damit Cloud Run
  // den Dienst als gesund erkennt.
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api/health).*)'],
};

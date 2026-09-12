# AI-first Releaseprüfung – 13. September 2026

Geprüfter Umbau: Commit 5472128 auf codex/opsdone-rebrand.
Cloud Build: 0bead242-92b4-4ba5-8aa7-e9e8566b804f, erfolgreich.
Preview-Revision: vierwochen-00061-gaz.
Vorschau: https://opsdone-preview---vierwochen-mlik6uuoxa-ey.a.run.app/

## Ergebnis

- npm run typecheck: bestanden.
- npm run build: bestanden.
- TEST_BASE_URL=http://127.0.0.1:3000 TEST_EXPECT_MISSING_INFRA=1 npm test: 28 von 28 bestanden, keine übersprungenen Tests.
- Die vollständige Suite lief gegen den lokalen Produktionsserver ohne GOOGLE_CLOUD_PROJECT und MAIL_SENDER.
- Die Integrationstests am Entwicklungsserver wurden wegen sehr langsamer paralleler Kompilierung abgebrochen und anschließend vollständig am Produktionsserver wiederholt.

## Browserprüfung

- Desktop und 390-Pixel-Mobilansicht: Startseite, Dock, Navigation und Gesprächsoberfläche visuell geprüft.
- Mobiles Menü öffnet, Fokus wechselt in die Navigation; Escape schließt.
- Prozess und Volumen aus /prozess-check?prozess=reporting&volumen=500 werden vorbefüllt.
- Browser-Zurück schließt das Gespräch und erhält den Entwurf.
- Isolierte lokale Simulation: Eingabe → Rückfrage → Vorschau → Wunschzeit → Kontaktdaten → Status „Anfrage eingegangen“.
- Der lokale Fixture-Server in tests/local-funnel-preview.mjs simuliert Chat und Buchungsantwort; Versand, Kalender- und Datenbankschreibzugriffe sind dort nicht erreichbar.
- Vorschau erscheint am Anfang der Ergebniskarte. Der obere Button öffnet die gemeinsame Terminansicht ohne erneute Eingabe des Prozesses.
- Reale Vertex-Prüfung auf der Preview mit ausschließlich synthetischem Prozessbeispiel: ausreichend detaillierter Eingang erzeugt sofort eine Vorschau. Eine Korrektur von E-Mail-Eingang auf freigegebenen Ordner aktualisiert dieselbe Vorschau.
- Keine Live-Buchung, keine Kunden- oder Test-E-Mail versendet.

## Betriebszustand

100 % des Produktionstraffics bleiben auf vierwochen-00059-9z8.
Nur das bestehende Tag opsdone-preview zeigt auf die neue Revision.
SITE_LIVE bleibt deaktiviert. Domain, Betreiberangaben und die verifizierte Kontakt-/Kalenderkonfiguration sind getrennte Launch-Schritte.
Ohne Kalenderanbindung ist die eingebettete Terminwahl eine Anfrage mit anschließender persönlicher Bestätigung.

## Messung

UTM-Herkunft wird beim Einstieg lediglich im flüchtigen Arbeitsspeicher vorgemerkt, damit interne Navigation sie nicht verliert. Ereignisse werden erst bei Chat-/Buchungsinteraktion gesendet. Keine Klick-IDs, kein persistenter Browserspeicher, keine Drittanbieter-Tracking-Skripte. Conversion-Steigerung ist eine zu messende Hypothese, kein bereits belegtes Ergebnis.

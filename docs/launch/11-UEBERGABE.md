# OpsDone — Übergabe zum Start

Stand: 13. September 2026.

## Fertig

- Neue OpsDone-Website mit fünf Prozessseiten, Unternehmens-/Sicherheitsseiten und vorbereitetem AI-first-Chat-Funnel.
- Interaktive Standardfall-/Ausnahme-Demo und nachvollziehbarer Potenzialrechner.
- Primärer Funnel: Ad-/Landing-Einstieg → persistentes Chat-Dock → höchstens drei Rückfragen → KI-Vorschau ohne E-Mail-Gate → Inline-Terminbuchung.
- Validierung, Missbrauchsschutz, Firestore-Anfragen, Zustellstatus, geschützter Admin und CSV-Export.
- Überarbeitete Strategie, Sales-Leitfaden, Angebots-/Abnahmevorlagen, Outbound-Entwürfe, Prozessaufnahme und Pilotpaket.
- `npm run typecheck` erfolgreich; der aktuelle Testlauf meldet 8 bestandene Tests und überspringt lokale HTTP-Tests ohne gestarteten Server. Produktionsbuild und Browser-Smoke-Test vor jeder Veröffentlichung erneut ausführen.
- npm audit: keine bekannten Schwachstellen zum Prüfzeitpunkt.
- Browserprüfung: Desktop und 390px-Mobilansicht, Menüfokus/Escape, FAQ, Rechner, Vorauswahl, Fehlerzustand; keine horizontalen Überläufe im geprüften mobilen Formular.

## Links

- [Review-Vorschau (nicht öffentliche Produktion)](https://opsdone-preview---vierwochen-mlik6uuoxa-ey.a.run.app)
- [Review-Pull-Request](https://github.com/Moritz-hub-git/Vierwochen/pull/1)
- [GitHub-Branch](https://github.com/Moritz-hub-git/Vierwochen/tree/codex/opsdone-rebrand)
- [Erster Pilot](./10-ERSTER-PILOT.md)
- [Prozessaufnahme](./09-PROZESS-AUFNAHME.md)
- [Lead-Pipeline](./LEAD-PIPELINE-TEMPLATE.csv)
- [Funnel-Design](./12-FUNNEL-DESIGN.md)

## Deployment

Cloud-Build `615b4add-2aa0-47d0-845a-e96ef0eebd10` erfolgreich. OpsDone läuft auf Revision `vierwochen-00060-sev` mit Tag `opsdone-preview`. Der bisherige Service behält 100 % seines Produktionstraffics auf `vierwochen-00059-9z8`. Der neue Code liegt im Review-Branch, nicht auf main. Repository-Beschreibung ist auf OpsDone aktualisiert.

Die automatische Freigabeprüfung hat einen direkten Push auf main nicht freigegeben. Der verifizierte Review-Branch und die eigenständige Vorschau sind gespeichert. Die Übernahme des PR in main ist der verbleibende Freigabeschritt.

## Noch offen

1. **Domain:** `opsdone.de` ist bestätigt; die öffentliche DNS-Prüfung liefert derzeit NXDOMAIN. Registrierung/Zugriff beim Registrar, DNS-Zuordnung und HTTPS-Abnahme sind noch erforderlich. NXDOMAIN allein beweist keine kaufbare Domain.
2. **Betreiber:** ladungsfähige Geschäftsanschrift und endgültige Rechtsform/gegebenenfalls Register-/USt-ID-Angaben ergänzen. Rechtstexte bleiben als Entwurf gekennzeichnet.
3. **Mail:** endgültige OpsDone-Adresse einrichten und verifizieren. Aktueller öffentlicher Übergang ist `hallo@vierwochen.de`; die bestehende Laufzeit-Mailkonfiguration wurde bewahrt. Ein echter Ende-zu-Ende-Zustelltest wurde nicht ausgelöst, um keine unverlangte Nachricht zu senden. Vor Werbetraffic eine eigene Testanfrage absenden und Eingang im Admin sowie Postfach prüfen.
4. **Veröffentlichung:** nach Betreiber-/Domain-/Mailabschluss einen neuen Build mit `SITE_LIVE=1` erstellen und die dafür geprüfte Revision gezielt auf Produktion schalten. Ein reines Ändern der Laufzeitvariable genügt für statische Metadaten nicht.

## Morgen zuerst

Mit Auftragsbestätigungen starten. Ads bleiben Entwürfe; persönliche Links und spätere Anzeigen führen in den Chat. 15 passende warme Kontakte/Unternehmen in die Pipeline, fünf persönliche Gesprächsangebote vorbereiten, drei Discovery-Termine anstreben. Im Chat maximal drei Rückfragen, danach Vorschau und Inline-Termin. Im ersten Gespräch Volumen, echte Bearbeitungszeit, Ausnahmen und Datenzugang erfassen. Ein Pilotangebot erst nach diesem Abgleich zuschneiden. Ohne Kalender bleibt die Buchung eine Terminanfrage.

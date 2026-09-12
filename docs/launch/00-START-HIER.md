# START HIER — OpsDone morgen launchfähig machen

Dies ist die Reihenfolge für den ersten Arbeitstag. Ziel ist ein ehrlicher, testbarer Start mit einem empfohlenen Keil: **Lieferanten-Auftragsbestätigungen für industrielle KMU**. Der Launch erzeugt Gespräche; er behauptet noch keine Traktion. Rechtliche und Betreiberfragen laufen als eigener Prüfstrang mit; sie blockieren interne Vorbereitung und Discovery nicht, aber öffentliche Indexierung und Kundenverträge erst nach Klärung.

## Fakten und Annahmen

| Status | Aussage |
|---|---|
| Fakt | Im Repository existieren Next.js, Cloud Run/Cloud Build, Firestore, Vertex- und Calendar-Adapter. |
| Fakt | Der direkte Prozess-Check-Endpunkt, Lead-/Event-Routen, Buchungsrouten und `/api/health` sind vorhanden; die `/prozess-check`-Seite ist der fertige primäre UI-Funnel. |
| Fakt | Der ursprüngliche Strategietext liegt unverändert in `docs/COMPANY-STRATEGY.md`. |
| Annahme | Auftragsbestätigungen haben genug Volumen, klare Regeln und einen erreichbaren Einkauf als Buyer. |
| Annahme | 5.000–30.000 € Implementierung netto ist ein sinnvoller interner Testkorridor. |
| Offen | Geschäftsanschrift, Rechtsform, Domain-Anbindung und endgültiger OpsDone-Mailabsender. Ziel-Domain opsdone.de ist bestätigt. |

## Launch-Checkliste

Vor öffentlicher Indexierung abhaken und Nachweis/Datum ergänzen:

- [ ] **Betreiber:** vollständiger Name/Firma, ladungsfähige Anschrift, E-Mail und vertretungsberechtigte Person festgelegt.
- [ ] **Nebentätigkeit:** Arbeitsvertrag, Wettbewerbs-/IP-Regeln und schriftliche Arbeitgeberfreigabe geprüft; bis dahin keine Kundenverträge.
- [ ] **Rechtsform/Verträge:** Rechtsform, Haftpflicht/IT-Haftpflicht, AGB, Auftragsverarbeitung und Haftung fachlich geprüft; Dokumente sind Entwürfe, keine Rechtsberatung.
- [ ] **Domain:** `opsdone.de` als Ziel-Domain registriert sowie DNS/HTTPS geprüft; Betreiberangaben bleiben bis zur Bestätigung offen.
- [ ] **Mail:** Geschäftsadresse und `MAIL_SENDER` eingerichtet; Testmail zugestellt; Absender/Antwortadresse stimmt.
- [ ] **Backend:** Cloud Run-Dienstkonto, Firestore und Vertex-Berechtigung geprüft; `GOOGLE_CLOUD_PROJECT`, `VERTEX_LOCATION`, `VERTEX_MODEL` gesetzt.
- [ ] **Buchung:** `BOOKING_CALENDAR_ID` und Kalenderrechte geprüft oder bewusst Anfrage-Modus aktiviert; keine Buchung als bestätigt darstellen, wenn sie manuell bestätigt wird.
- [ ] **Admin:** `ADMIN_PASSWORD` und optional `CLEANUP_TOKEN` in Cloud Run/Secret Manager gesetzt; niemals im Repository.
- [ ] **Sichtbarkeit:** `SITE_LIVE=1` erst setzen, wenn rechtliche Seiten keine Platzhalter enthalten; vorher `SITE_PASSWORD` für Preview.
- [ ] **Delivery-Smoke-Test:** Startseite, `/prozesse`, `/prozess-check` (inkl. Fehler/Fallback), Lead, Slots/Anfrage, Buchung, `/api/health`, Admin-Login und mobile Darstellung geprüft.

## Tag 1 — genaue Reihenfolge (ca. 7 Stunden)

| Zeit | Ergebnis |
|---|---|
| 09:00–09:30 | Checklist-Status eintragen; offene Betreiber-/Arbeitgeberpunkte markieren und parallel weiterarbeiten. |
| 09:30–10:15 | Startseite auf OpsDone, Wedge und „Prozess prüfen“ lesen; unbelegte Aussagen entfernen. |
| 10:15–11:00 | `/api/health`, `/prozess-check`, Lead und Anfrage-Modus lokal testen; Fehler mit Ursache notieren. |
| 11:00–11:30 | Work-Eliminated-Rechner mit einem fiktiven Beispiel prüfen; klar als Hypothese markieren. |
| 11:30–12:00 | Discovery-Termine und Kalender-/Mail-Entscheidung treffen; keine externen Nachrichten automatisch senden. |
| 13:00–14:00 | Eine Liste mit 15 warmen Kontakten aus zulässigem eigenem Netzwerk anlegen; kein Arbeitgeber-/Kunden-IP verwenden. |
| 14:00–15:00 | Fünf persönliche Entwürfe aus `03-outbound-und-content.md` anpassen; vor Versand auf Fakten prüfen. |
| 15:00–16:00 | Drei Discovery-Gespräche anbieten oder Termine sammeln; Antworten in einfachem CRM/Sheet dokumentieren. |
| 16:00–16:30 | Scope-/Abnahmetemplate für einen Auftragsbestätigungs-Pilot ausfüllen. |
| 16:30–17:00 | Smoke-Test nach Deployment, Screenshots/Logs intern ablegen, offene Punkte mit Owner versehen. |

## Rauchtest nach Deployment

1. Öffentliche URL lädt mit OpsDone-Titel, Sprache und CTA.
2. `/prozess-check` nimmt eine kurze Wedge-Beschreibung an und bestätigt Speicherung/Zustellung oder den Fallback verständlich.
3. Neue Anfrage ist in `/admin` sichtbar; CSV-Export enthält den Vorgang.
4. Rückmeldung erfolgt persönlich; das Formular behauptet keine Terminbuchung.
5. `/api/health` meldet Service; `?probe=1` nur mit Rate-Limit und konfiguriertem Vertex testen.
6. Kein Geheimnis, keine interne Kundeninformation und kein Platzhalter erscheint öffentlich.

## Woche 1 und 30 Tage

Woche 1: Ziel-Domain und Kontaktweg verifizieren, Prozess-Check veröffentlichungsfähig machen, Wedge-Discovery führen, erste Baseline messen und maximal ein Pilotangebot senden; Betreiber-/Rechtsprüfung läuft parallel und bleibt Gate für öffentliche Indexierung und Vertrag. Tage 8–14: Pilot-Scope und Abnahmekriterien unterschreiben, Testdaten erhalten, Integrationsrisiko prüfen. Tage 15–21: kleinste lauffähige Version mit Human Approval bauen und erste Fälle messen. Tage 22–30: Abnahme, Work-Eliminated-Auswertung, Preis-/Scope-Hypothesen aktualisieren und nur dann einen zweiten Fall zusagen. Der ausführliche Plan steht in `07-kill-go-dashboard-und-wochenplan.md`.

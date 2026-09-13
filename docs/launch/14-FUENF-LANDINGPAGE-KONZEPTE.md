# Fünf eigenständige Landingpage-Erlebnisse

## Entscheidungsgrundlage

Briefing des Gründers: Das Angebot wird über übernommene Prozessarbeit und eine hochwertige, individuell entwickelte Anwendung verkauft. KI und Automation sind Mittel zur Umsetzung, nicht die zentrale Positionierung. Die fünf Richtungen sind Interpretationen des Nutzerbriefings, keine Arbeiten oder Empfehlungen der genannten Agenturen.

Die Vergleichsübersicht ist `/konzepte`. Die fünf Kundenseiten haben absichtlich keine Vergleichsnavigation und keine Agenturnamen:

| Pfad | Leitidee | Mechanik |
| --- | --- | --- |
| `/konzepte/arbeit-verschwindet` | Die Arbeit verschwindet. Das Ergebnis bleibt. | Arbeitsaufträge werden sichtbar zu Funktionen einer Anwendung. |
| `/konzepte/massarbeit` | Für Ihren Prozess gebaut. | Prozessbriefing und drei unterschiedliche Beispielanwendungen. |
| `/konzepte/business-case` | Was kostet die Handarbeit? | Vorgänge × Minuten ergeben den heutigen Aufwand; keine pauschale Einsparung. |
| `/konzepte/menschen` | Ihre besten Leute sind keine Schnittstelle. | Arbeitsalltag und Übergaben werden zu einer Entscheidung mit Kontext. |
| `/konzepte/loesungsentwurf` | Ihr Prozess wird zum sichtbaren Lösungsentwurf. | Echter Dialog und dynamischer Lösungssteckbrief direkt auf der Seite. |

## Gemeinsame Anforderungen

- Konkrete Prozesseingabe vor Kontaktdaten, höchstens drei Rückfragen, Ergebnis vor Buchung.
- Varianten 1–4 übergeben Texte direkt in den vorhandenen ChatDock, ohne erneutes Abschicken. Variante 5 verwendet denselben Serververtrag direkt in der Seite.
- Die Buchung verwendet die vorhandenen Endpunkte und unterscheidet bestätigte Termine von Anfragen. Fehlende Kalenderanbindung wird nicht als bestätigte Buchung dargestellt.
- Alle Produktansichten verwenden gekennzeichnete Beispieldaten. Sie sind keine Referenzkunden und keine bereits bereitgestellten Kundenanwendungen.
- Ein dynamischer Entwurf ist ein vorläufiges Lösungskonzept. Datenzugänge und Integration werden vor dem Angebot geprüft.
- Konzeptseiten bleiben unabhängig von SITE_LIVE nicht indexierbar und werden nicht in die öffentliche Sitemap aufgenommen.
- Bestehende Hauptseite bleibt als Vergleichsbasis erhalten. Die gemeinsame Dialogsprache erläutert nun auch die konkrete Anwendung als Liefergegenstand.

## Referenzbetrachtung

Erneut betrachtet: [Attio](https://attio.com/), [Personio](https://www.personio.de/), [Navan](https://navan.com/de), [OpenAI](https://openai.com/de-DE/). Relevant sind klare visuelle Hierarchie, konkret sichtbare Produktoberflächen, eine dominante nächste Aktion und erklärende Inhalte entlang der Kaufentscheidung. Es liegen keine internen Conversion-Daten dieser Websites vor; Gestaltung ist kein Beweis für höhere Conversion.

## Vergleich und späterer Test

Zunächst qualitativer Vergleich mit identischer Prozessbeschreibung auf Desktop und Mobil: versteht man Angebot und Liefergegenstand, sind Grenzen glaubwürdig, findet man den Einstieg und den Termin?

Für einen späteren bezahlten Vergleich gleiche Zielgruppe, Anzeigenbotschaft, Messdefinition und Zeitfenster verwenden. Varianten über den vorhandenen Ereignispfad unterscheiden. Primär qualifizierte geführte Gespräche und daraus entstandene Angebote/Piloten bewerten; Prozesseingaben, Vorschauen und Buchungsanfragen helfen bei der Diagnose. Kein Sieger allein aus Klicks oder der Google-Anzeigeneffektivität ableiten. Budget und ausreichende Beobachtungsdauer vor dem Test festlegen.

## Weiter offene Voraussetzungen für den echten Firmenstart

Domain-Anbindung, Betreiberangaben, erreichbarer Kontakteingang, Kalender oder verlässliche manuelle Bestätigung. Die Vorschau-Veröffentlichung schaltet keine Anzeigen und ändert keinen Produktions-Traffic.

## Verifikation am 13. September 2026

- Produktionsbuild und TypeScript-Prüfung erfolgreich.
- 28 Tests erfolgreich, einschließlich aller sechs neuen Routen, maximal drei Dialogrückfragen, Buchungs- und Intake-Validierung sowie Authentifizierung der Admin-Exporte.
- Lokaler Integrationstest ohne GOOGLE_CLOUD_PROJECT und MAIL_SENDER: fehlende Infrastruktur liefert einen Fehler; keine erfundene erfolgreiche Zustellung.
- Browserprüfung bei Desktopgröße und 390 px, ergänzende Überlaufprüfung bei 320 px.
- Lokale Funnel-Fixture: Prozesseingabe → Rückfrage → Lösungsentwurf ohne Kontaktdaten → Wunschzeit → Kontaktdaten → ausdrücklich unbestätigte Terminanfrage. Keine echten Kontakte, Kalenderbuchungen oder E-Mails im Test.
- Rechner 650 × 8 Minuten ergibt 86,7 Stunden; dieser Ausgangswert erscheint im Chat.
- Beispielansichten und Entscheidungsschaltflächen verändern lokalen Demostatus. Sie lösen keine fachlichen Aktionen in Kundensystemen aus.
- Fehlerfall des Inline-Dialogs zeigt den erhaltenen Prozess, Wiederholung und direkten Termineinstieg.

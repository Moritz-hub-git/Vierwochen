# Gemeinsamer Solution Blueprint Funnel

Alle fünf Konzeptseiten verwenden `components/blueprint/BlueprintFunnel.tsx`. Der bisher eigenständige Dialog von Konzept 5 wurde durch denselben Einstieg ersetzt. Die Hauptseite bleibt unverändert.

## Erlebnis

Prozesseingabe (oder eines von vier Beispielen) → kurze Spiegelung und maximal drei adaptive Rückfragen zu Volumen, Bearbeitungszeit und Systemen → kompletter Ergebnisbildschirm. Teilentwürfe erscheinen während der Rückfragen. Der Ladezustand beschreibt die tatsächliche Verarbeitung; keine künstliche Wartezeit, keine erfundenen abgeschlossenen Prüfschritte.

Vier Ergebnisbereiche: individuelle Beispielanwendung, Heute/Mit OpsDone, heutiger Aufwand und Kapazitätsszenario, Umsetzung/Betrieb/kapazitätsbasierter Rückfluss. Die Komponentenbibliothek setzt definierte Ansichten zusammen. Einkaufs-, Reporting-, Reklamations- und allgemeine Prozessansichten sind unterschiedlich und lokal bedienbar. Fiktive Daten und fehlende Integration sind gekennzeichnet.

## Zahlen

Explizite Nutzerangaben zu Menge und Zeit werden deterministisch ausgewertet. Unbekannte Angaben bleiben unbekannt. Wöchentliche Mengen verwenden 52 Wochen pro Jahr. 30–60 Prozent Entlastung und 50 Euro je Stunde sind sichtbare hypothetische Planungsannahmen, keine Vorhersage. Kapazität ist keine garantierte Kostensenkung. Rückfluss berücksichtigt laufende Kosten und wird nur bei positivem Wert über das ganze Szenario als Band angegeben.

Die feste Implementierungslogik berücksichtigt Grundaufwand, Systeme, Inputtypen, Teilabläufe, Rollen/Freigabe, Write-back und zusätzliche Oberflächen. Der Betrieb hängt von Systemzahl, Write-back und Volumenklasse ab. Unbekannter Scope wird durch explizite Annahmen und Bandbreiten kenntlich. Keine verbindlichen Angebote.

## Abschlüsse

- Inline-Terminwahl über die vorhandenen Booking-Endpunkte. Kontakte erst nach Zeitwahl. Ohne Kalenderanbindung ausdrücklich manuell zu bestätigende Anfrage.
- Sekundär angeforderter E-Mail-Versand des vollständigen servergespeicherten Blueprints. Keine Newsletter-Anmeldung. Fehler und manuelle Zustellung werden ehrlich angezeigt. Duplikate werden nicht mehrfach gesendet.
- Buchung übernimmt Blueprint, Preisband, Aufwandsbasis und offene Fragen in Sales-Kontext und interne Benachrichtigung.
- Offene E-Mail-Zustellungen erscheinen im authentifizierten Adminbereich und können persönlich bearbeitet werden.

## Messung und Prüfung

Bestehende Pfad-/UTM-Attribution, Dialogbeginn, Ergebnis, Terminwahl und Buchung; zusätzliche Ereignisse für E-Mail-Einstieg und angeforderte Zustellung. Keine Prozesse oder E-Mail-Adressen in Event-Metadaten.

Lokale Fixture simuliert drei Fragen, Beispielanwendung, E-Mail und Buchung ohne Nachrichten, Kalender- oder Datenbankzugriffe. Automatisierte Tests prüfen Mengen, Szenarien, Preisbänder, fehlende Daten, Fragebegrenzung, Validierung, Zustellfehler und Duplikate. Website- und API-Tests laufen ohne GOOGLE_CLOUD_PROJECT/MAIL_SENDER. Keine Live-Zustelltests.

Stand der Verifikation: 42 Tests bestanden, TypeScript-Prüfung und Produktionsbuild erfolgreich. Browserprüfung: alle fünf Einstiege, Desktop und 390 px, drei Rückfragen mit Chips/Slider, Wechsel zum Ergebnis, sichtbare Rechenannahmen, lokale Beispielaktionen, angeforderte E-Mail, manuell bestätigte Terminanfrage, Zurück-Navigation sowie Fehler ohne KI-Infrastruktur. E-Mail/Buchung nur mit lokaler Fixture; keine Live-Zustellung ausgeführt.

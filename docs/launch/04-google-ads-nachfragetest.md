# Suchintention testen — Auftragsbestätigungen

Dieses Dokument beschreibt einen kleinen Nachfrage-Test. Er startet erst, wenn Betreiberangaben, Datenschutz, Zielseite, Mail/Lead-Funnel und ein erreichbarer Gesprächsweg geprüft sind. Budget und Schwellen sind **interne Hypothesen**, keine Prognose.

## Hypothese

Menschen mit dem Problem suchen eher nach „Auftragsbestätigung prüfen automatisieren“ oder „SAP Auftragsbestätigung abgleichen“ als nach „AI-native Process Automation“. Der Test soll zeigen, ob qualifizierte Gespräche entstehen — Klicks allein sind kein Erfolg.

## Vorbereitung

- Eine Wedge-Zielseite mit Prozess, Voraussetzungen, Grenzen und persistentem Chat-Dock.
- Ein Chat, der die Prozessbeschreibung entgegennimmt, höchstens drei Rückfragen stellt und eine konkrete Vorschau ohne E-Mail-Gate ausgibt.
- Inline-Terminbuchung unter der Vorschau; ohne `BOOKING_CALENDAR_ID` wird eine Terminanfrage zur manuellen Bestätigung gespeichert.
- Lead-Quelle und Suchbegriff mitführen, ohne unnötige personenbezogene Daten zu sammeln.
- Ausschluss: Jobs, Schulungen, Vorlagen, private Buchhaltung, allgemeine Chatbots.
- Ein sachlicher Preis-/Scope-Hinweis: Pilot wird nach Discovery scoped; keine Ergebnisgarantie.

## Testaufbau (Entwurf)

Eine Kampagne, eine Region, deutschsprachig, Desktop und Mobil. Start mit wenigen eng gefassten Exact-/Phrase-Varianten:

```text
"auftragsbestätigung automatisieren"
"auftragsbestätigung prüfen automatisieren"
"bestellbestätigung gegen bestellung prüfen"
"sap auftragsbestätigung abgleichen"
"lieferanten auftragsbestätigung workflow"
```

Anzeigenentwurf:

> Auftragsbestätigungen automatisch prüfen
> Preise, Mengen und Termine gegen Ihre Bestellung abgleichen. Standardfälle laufen vorbereitet, Abweichungen bleiben beim Einkauf. Bestehende Systeme können bleiben. Prozess im Gespräch prüfen.

Nicht verwenden: „garantiert“, konkrete Einsparungen ohne Kundendaten, erfundene Kunden, „in vier Wochen“, „100 % automatisch“ oder nicht bestätigte Zertifizierungs-/Compliance-Aussagen.

## Messplan

| Stufe | Ereignis | Mindestdaten |
|---|---|---|
| 1 | qualifizierter Klick | Suchbegriff, Landingpage |
| 2 | Chat geöffnet/Prozess eingegeben | Session, Dialog-ID, Use Case |
| 3 | KI-Vorschau erhalten | Ergebnis, offene Punkte, Annahmen |
| 4 | Termin-Slot gewählt | Session, Dialog-ID, Slot |
| 5 | Termin gebucht/angefragt | Status, Kanal, Quelle |

Vorab definieren: maximaler Testbetrag [___] €, Laufzeit [___] Tage, Stop bei [___] € ohne qualifizierte Discovery. Erst nach dem Test Zahlen eintragen; keine nachträgliche Schönrechnung.

## Auswertung

Notiere pro Suchbegriff: Ausgaben, Klicks, Chat-Starts, Vorschauen, gewählte Slots, bestätigte oder angefragte Termine, No-Go-Gründe, Angebote und Pilote. Ein Lead gilt nur dann als qualifiziert, wenn Prozessowner, wiederkehrendes Volumen, Input/Output und ein nächster Prüfschritt vorhanden sind. Die Interaktionsmessung verwendet dafür `dialog_opened`, `dialog_started`, `dialog_question`, `result_delivered`, `booking_slot_selected` und `booked`; ein allgemeiner Pageview-Mount und Klick-ID-Speicherung gehören nicht zum Launch-Funnel.

**Weiter testen**, wenn mehrere qualifizierte Gespräche mit ähnlichem Wedge entstehen und der Aufwand je Gespräch tragbar ist. **Landing/Keyword ändern**, wenn Klicks aber keine Baselines entstehen. **Stoppen**, wenn keine qualifizierten Signale nach dem vorher festgelegten Testbetrag entstehen oder Anfragen überwiegend außerhalb des Scopes liegen.

## Keine Ads am ersten Tag, wenn

der rechtliche Betreiber fehlt, Mail/Lead nicht geprüft sind, der Wedge noch nicht in einem Discovery getestet wurde oder kein Zeitfenster für Antworten vorhanden ist. Dann zuerst Warm-Outreach und Baseline-Lernen; bezahlte Nachfrage kann später mit einem konkreteren Angebot getestet werden.

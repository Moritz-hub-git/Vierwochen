# OpsDone Verkaufssystem

Dieses Dokument ist der interne Ablauf vom ersten Signal bis zur Pilotentscheidung. Es ersetzt die frühere allgemeine Individualsoftware-Positionierung.

## Zielkunden und Keil

Wir sprechen operative Entscheider in dokumentenintensiven Industrie- und B2B-Unternehmen an. Der empfohlene erste Keil sind **Lieferanten-Auftragsbestätigungen**. Ein guter Fall hat wiederkehrende E-Mails/PDFs, eine bestehende Bestellung als Vergleich, klare Regeln, einen benannten Prozessowner und einen messbaren manuellen Aufwand.

Die vier weiteren Gesprächseinstiege sind RFQ-/Angebotsvorbereitung, Reklamationen/8D, Management-Reporting und Lieferanten-Onboarding. Sie bleiben Hypothesen, bis ein Gespräch echte Volumina, Zeitaufwand und Zugänge bestätigt.

## Funnel

1. **Signal:** persönliche Empfehlung, gezielte Recherche oder direkter Prozess-Check auf `opsdone.de`.
2. **Discovery (30 Minuten):** Ist-Prozess, Volumen, Zeit, Ausnahmen, Systeme, Risiko und gewünschtes Ergebnis verstehen.
3. **Prozess-Score:** nur Fälle mit klarem Owner, wiederholbaren Regeln, erreichbaren Daten und plausibler Wirtschaftlichkeit weiterführen.
4. **Pilot-Scope:** ein Input, ein Output, ein Systempfad, maximal zehn Abnahmekriterien, klare Später-Liste.
5. **Angebot:** interne Hypothese 5.000–30.000 € Implementierung netto; Betrieb separat und konkret scoped. Keine Garantie einer Quote oder Frist.
6. **Pilot:** zuerst Testdaten, dann begrenzter Live-Betrieb mit Human Approval und Logging.
7. **Review:** Work Eliminated, Fehler-/Ausnahmebild, Betriebsaufwand und Wiederverwendbarkeit messen.

## Work Eliminated

Die zentrale Metrik ist die vermiedene menschliche Bearbeitungszeit:

```text
Work Eliminated = (Vorgänge × Zeit vorher)
                 − (Ausnahmen × Zeit je Ausnahme)
```

Immer mit Zeitraum, Datenquelle und Annahmen erfassen. Zusätzlich notieren: Vorgangsvolumen, Standardfallquote, Zeit je Standardfall, Zeit je Ausnahme, Durchlaufzeit, Fehler-/Nacharbeitsfälle und menschliche Touchpoints. „Automatisierungsgrad“ allein ist keine Wertmetrik.

Beispiel (Hypothese, vor Ort zu prüfen): 400 Vorgänge/Monat × 6 Minuten = 40 Stunden. Nach dem Piloten bleiben 40 Ausnahmen × 2 Minuten = 1,3 Stunden. Geschätzte eliminierte Zeit: 38,7 Stunden/Monat. Das ist eine Rechnung, kein Kundenergebnis.

## Go-/No-Go-Regel

Weiter, wenn Prozessowner und Datenzugang geklärt sind, der Output eindeutig ist, ein Pilot in überschaubarem Umfang möglich ist und die Messung vor Start vereinbart wird. Stoppen oder neu schneiden, wenn Kern-ERP-Änderungen, unklare Freigaben, sicherheitskritische Steuerung, seltene Sonderfälle oder nicht zugängliche Daten den Pilot dominieren.

## Angebotslogik (interne Hypothese)

- Implementierung: 5.000–30.000 € netto, je nach Scope, Datenlage und Integration.
- Betrieb: monatliche scoped Gebühr für Hosting, Monitoring, Wartung und vereinbarte Änderungen.
- Nutzung/Output: erst testen, wenn Volumen und Qualität verlässlich messbar sind.

Die Zahl wird nach jedem Angebot zusammen mit geschätztem und tatsächlichem Aufwand, Risiko und Ergebnis aktualisiert. Sie ist keine veröffentlichte Marktbehauptung und wird erst nach Prüfung durch den Betreiber nach außen kommuniziert.

## Belege und Grenzen

Verwendbare persönliche Belege: anonymisierte Reporting-Reduktion von über 32 auf rund 6 Stunden pro Zyklus, rund 30 identifizierte KI-Anwendungsfälle mit zwei produktiven Anwendungen und drei eigene iOS-Apps mit Backend. Keine Firmenamen, Logos, Kundenstimmen oder Screenshots ohne Freigabe. Keine sicherheitskritischen Steuerungen, Medizintechnik oder Hochverfügbarkeitsbetrieb als Einstiegsfälle.

## Offene Annahmen

Noch zu validieren sind Zielbranche und Entscheiderzugang, tatsächliche Nachfrage nach dem Wedge, Zahlungsbereitschaft, Integrationswege, Datenschutz-/Vertragsanforderungen, verfügbare Betreiberzeit, Domain/Mail und die rechtliche Zulässigkeit einer Nebentätigkeit. Die Launch-Checkliste führt diese Punkte mit Owner und Nachweis.

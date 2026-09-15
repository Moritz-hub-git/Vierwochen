# Business-Review — OpsDone zum Start

Dieses Memo ersetzt die frühere umfangreiche Gutachtensammlung. Es ist eine Arbeitsentscheidung mit Unsicherheiten, keine Marktstudie.

## Was bereits feststeht

- Die Marke und der Claim im Arbeitsauftrag lauten OpsDone / AI-native Process Automation / Work eliminated.
- Die technische Basis ist im Repository vorhanden: Next.js, Cloud Run, Firestore, Vertex AI und Calendar-Adapter.
- Der ursprüngliche Strategieentwurf ist unverändert archiviert.
- Belegte persönliche Erfahrung umfasst anonymisiertes Reporting von über 32 auf rund 6 Stunden pro Zyklus, rund 30 identifizierte KI-Anwendungsfälle mit zwei produktiven Anwendungen und drei eigene iOS-Apps.

## Was nur Annahme ist

- Auftragsbestätigungen sind ein ausreichend dringendes und wiederholbares Einstiegsproblem.
- Industrie-KMU erreichen einen Entscheider ohne lange Procurement- oder IT-Schleife.
- Standardfälle lassen sich mit bestehenden Systemen, Human Approval und vertretbarem Risiko abbilden.
- 5.000–30.000 € netto Implementierung plus scoped Betrieb ist wirtschaftlich und kaufbar.
- Work Eliminated ist eine verständliche und belastbare Wertmetrik.

Jede Annahme braucht einen Test: Gespräch, Zeitmessung, Beispieldaten, Angebot oder Pilot. Bis dahin keine Case-Study-Sprache und keine Ergebnisgarantie.

## Empfehlung

Morgen mit einer einzigen konkreten Botschaft starten: „Wir prüfen, ob Lieferanten-Auftragsbestätigungen auf Ihren bestehenden Systemen so verarbeitet werden können, dass der Einkauf nur noch Abweichungen bearbeitet.“ Drei bis fünf Gespräche führen, eine Baseline erheben und höchstens einen kleinen Pilot anbieten. Die vier anderen Use Cases dienen als Ausweichpunkte, wenn ein anderer Prozess im Gespräch klarer messbar ist.

## Wirtschaftliche Prüfrechnung

```text
Kundenwert-Hypothese = Work Eliminated-Stunden × interne Vollkosten je Stunde
OpsDone-Aufwand       = Verkauf + Discovery + Build + Review + Betrieb
Entscheidung           = Scope und Preis nur bei plausibler Differenz weiter testen
```

Interne Vollkosten und Zeitwerte kommen vom Kunden oder werden als Annahme markiert. Keine öffentliche Einsparzahl aus einer Beispielrechnung ableiten.

## Risiken und Gegenmaßnahmen

| Risiko | Frühindikator | Gegenmaßnahme |
|---|---|---|
| Scope-Creep | neue Sonderfälle nach Freeze | Später-Liste, Tauschregel, zehn Kriterien |
| Integrationsfriktion | fehlender Zugang/undokumentierte API | Files/Mail zuerst, Phase 2, Zugang als Voraussetzung |
| Falsche Automatisierung | unlesbare oder mehrdeutige Fälle | Human Approval, Ausnahmequeue, Testmatrix |
| Vertrauenslücke | Fragen nach Referenzen/Betreiber | eigene Belege sauber kennzeichnen, keine Fiktion |
| Nebenjob-/Vertragsrisiko | offene Arbeitgeber- oder IP-Regel | vor Vertrag schriftlich prüfen |
| Betriebsüberlastung | Support versprochen, aber nicht scoped | monatlichen Betrieb konkret begrenzen und bepreisen |

## 30-Tage-Erfolg

Erfolg bedeutet nach 30 Tagen: Betreiber-/Rechtsblocker sind geklärt oder der Launch bleibt Preview; mehrere echte Wedge-Gespräche liegen vor; mindestens eine Baseline ist nachvollziehbar; ein Pilot-Scope mit Abnahmekriterien ist entscheidungsreif; Messung und Aufwand sind vorbereitet. Umsatz, Referenzen und ein Partner sind Ziele für später, keine Fakten des Starts.

## Review-Fragen am Tag 30

1. Welcher Prozessowner hat ein wiederkehrendes Problem bestätigt?
2. Welche Input-/Output- und Ausnahmefälle sind belegt?
3. Wie viele Stunden fallen vorher und nachher nachweisbar an?
4. Was kostete Discovery und Build tatsächlich?
5. Welche Integrations- oder Rechtsfrage blockiert noch?
6. Welche der fünf Use-Case-Hypothesen verdient den nächsten Test?

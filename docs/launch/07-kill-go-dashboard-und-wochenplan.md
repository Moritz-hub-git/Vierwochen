# Dashboard und 30-Tage-Plan

Das Dashboard trennt beobachtete Fakten von Annahmen. Jede Zahl bekommt Zeitraum, Quelle und Owner. Kleine Stichproben werden als solche markiert.

## Wöchentliche Tabelle

```text
Woche / Datum: [ ]   Owner: [ ]
Neue Kontakte: [ ]   Antworten: [ ]   Discovery: [ ]
Qualifizierte Baselines: [ ]   Angebote: [ ]   Pilote: [ ]
Implementierungs-Hypothese netto: [ ]   tatsächlicher Aufwand: [ ]
Work Eliminated geschätzt: [ ] h   gemessen: [ ] h
Häufigste Ausnahme: [ ]   größtes Risiko: [ ]   nächster Test: [ ]
Fakt / Annahme / offen: [ ]
```

## Messdefinition

```text
Baseline = Vorgänge × Minuten vor Automation ÷ 60
Rest = Ausnahmen × Minuten je Ausnahme ÷ 60
Work Eliminated = Baseline − Rest
```

Zusätzlich erfassen: Messfenster, Datenquelle, Standard-/Ausnahmequote, Nacharbeit, Durchlaufzeit und menschliche Touchpoints. Keine Arbeitszeit als „eliminiert“ verbuchen, wenn sie nur in eine andere Aufgabe verschoben wurde.

## 30 Tage

**Tage 1–2 — Startfähigkeit:** Launch-Checkliste, Domain/Mail, Preview, `/api/health`, Lead und Anfrage-Modus prüfen; Betreiber-/Arbeitgeberpunkte parallel klären. Wedge-Text auf jeder relevanten Oberfläche konsistent machen.

**Tage 3–5 — Discovery vorbereiten:** 15 zulässige Kontakte auswählen, fünf Outreach-Entwürfe personalisieren, Baseline- und Scope-Template öffnen, drei Termine anbieten. Kein Versand ohne Betreiber-/Absenderprüfung.

**Tage 6–7 — Lernen:** erste Gespräche führen; pro Gespräch Volumen, Zeit, Ausnahmen, Systeme, Owner und Risiko dokumentieren. Wedge nur anhand dieser Antworten anpassen.

**Tage 8–10 — Pilot entscheiden:** einen Fall auswählen oder begründet stoppen. Testdaten, Zugänge, Freigaben und maximal zehn Abnahmekriterien festhalten. Interne Preis-Hypothese 5.000–30.000 € netto nur nach Risikoprüfung verwenden.

**Tage 11–14 — Angebot:** Scope, Später-Liste, Mitwirkung, Betriebsumfang, Messplan und Zahlungs-/Vertragsfragen zur Prüfung geben. Keine Leistungs- oder Einspargarantie ergänzen.

**Tage 15–21 — kleinste Version:** mit künstlichen/anonymisierten Daten bauen; Extraktion und Prüfung zuerst, Aktion erst nach Human Approval. Positive, negative, doppelte und unlesbare Fälle testen.

**Tage 22–26 — Pilotfenster:** begrenzte Fälle durchlaufen lassen, Ausnahmegründe und Arbeitszeit erfassen, Sicherheit/Datenschutz-/Zugriffsfragen offen dokumentieren.

**Tage 27–30 — Review:** Kriterien abnehmen oder Nacharbeit im Scope dokumentieren. Work Eliminated und tatsächlichen Aufwand berechnen. Entscheidung: Wedge fortsetzen, Scope/Preis ändern, weiteren Use Case testen oder stoppen.

## Entscheidungstore

**Tag 7:** Gibt es mindestens ein Gespräch mit echter Baseline? Wenn nein, Outreach-These ändern, bevor Ads gestartet werden.

**Tag 14:** Sind Datenzugang, Owner und Abnahme prüfbar? Wenn nein, kein Pilotvertrag.

**Tag 30:** Hat der Pilot einen messbaren Output und eine belastbare Aufwand-/Work-Eliminated-Messung? Wenn nein, keine Skalierungs- oder Partnerentscheidung.

## Kill-Signale

Prozess bleibt unklar, Daten sind nicht zugänglich, Freigabe-/Haftungsweg ist offen, Aufwand wächst ohne Scope-Entscheidung oder Gespräche kommen ausschließlich wegen allgemeiner KI-Neugier. Dann stoppen oder neu schneiden. Keine erfundenen Benchmarks als Ersatz für fehlende Daten.

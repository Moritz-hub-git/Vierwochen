# Prozess-Aufnahme — Arbeitsblatt für Discovery und Pilot

Ein Blatt pro Prozess. Vor dem Gespräch mit bekannten Fakten vorbefüllen; Unbekanntes als „offen“ markieren. Keine vertraulichen Dokumente oder personenbezogenen Daten ins Repository kopieren. Für Beispiele genügen anonymisierte oder künstliche Daten.

## 1. Kontext

```text
Unternehmen: [ ]                 Datum: [ ]
Gesprächspartner / Rolle: [ ]    Prozessowner: [ ]
Use Case: [ ]                    Quelle des Kontakts: [ ]
Entscheidungstermin: [ ]         Bearbeiter: [ ]
```

## 2. Heutiger Ablauf

```text
Startsignal / Eingang: [E-Mail, PDF, Excel, Portal, ...]
Erster menschlicher Schritt: [ ]
Weitere Schritte (kurz, in Reihenfolge):
1. [ ]
2. [ ]
3. [ ]
Ergebnis heute: [ ]
Wer entscheidet oder gibt frei? [ ]
Wo wird der Vorgang abgelegt / protokolliert? [ ]
```

## 3. Volumen und Baseline

```text
Messzeitraum: [ ]       Quelle der Zahlen: [ ]
Vorgänge pro Zeitraum: [ ]
Minuten je Standardfall: [ ]
Minuten je Ausnahme: [ ]
Ausnahmen pro Zeitraum / Anteil: [ ]
Weitere Touchpoints oder Nacharbeit: [ ]
Durchlaufzeit heute: [ ]
Fehler-/Korrekturindikator: [ ]
```

Rechnung, solange nur Schätzwerte vorliegen:

```text
Baseline-Stunden = Vorgänge × Minuten je Vorgang ÷ 60
Restaufwand      = Ausnahmen × Minuten je Ausnahme ÷ 60
Work Eliminated  = Baseline-Stunden − Restaufwand
```

**Work Eliminated (Schätzung):** [ ] Stunden / Zeitraum. **Belegter Wert:** [ ] Stunden / Zeitraum. Annahmen und Abweichungen: [ ].

## 4. Daten, Systeme und Regeln

```text
Eingangsdaten / Formate: [ ]
Vergleichs- oder Referenzobjekt: [ ]
Zielsystem / gewünschter Output: [ ]
Verfügbare Exporte / API / Dateiablage: [ ]
Zugang vorhanden ab: [ ]        Ansprechpartner IT: [ ]
Geschäftsregeln / Toleranzen: [ ]
Pflichtfelder: [ ]
Freigaben und Berechtigungen: [ ]
Aufbewahrung / Löschung / sensible Felder: [ ]
```

## 5. Ausnahmebild

```text
Welche Fälle dürfen nie automatisch entschieden werden? [ ]
Was ist bei unlesbaren oder widersprüchlichen Daten zu tun? [ ]
Wer erhält eine Ausnahme und mit welcher Entscheidungsfrage? [ ]
Was passiert bei Ausfall oder verspätetem Eingang? [ ]
Wie wird eine Aktion rückgängig gemacht oder deaktiviert? [ ]
```

## 6. Pilotzuschnitt

```text
Version 1 verarbeitet: [ein Eingang / ein Prozess / ein Output]
Im Pilot enthalten: [ ]
Nicht enthalten / Später: [ ]
Human Approval an diesen Punkten: [ ]
Testdaten: [künstlich / anonymisiert / freigegeben]
Pilotzeitraum oder Fallzahl: [ ]
Messplan: [ ]
```

## 7. Abnahmekriterien (maximal 10)

| Nr. | Testfall | Erwartetes Ergebnis | Nachweis | Status |
|---:|---|---|---|---|
| 1 |  |  |  | offen |
| 2 |  |  |  | offen |
| 3 |  |  |  | offen |
| 4 |  |  |  | offen |
| 5 |  |  |  | offen |
| 6 |  |  |  | offen |
| 7 |  |  |  | offen |
| 8 |  |  |  | offen |
| 9 |  |  |  | offen |
| 10 |  |  |  | offen |

## 8. Fakten, Annahmen, offene Punkte

| Aussage | Status (`Fakt`, `Annahme`, `offen`) | Quelle/Nachweis | Owner | Fällig |
|---|---|---|---|---|
|  |  |  |  |  |
|  |  |  |  |  |
|  |  |  |  |  |

## 9. Empfehlung

```text
Entscheidung: [Go / Hold / No-Go]
Begründung in einem Satz: [ ]
Nächster Schritt: [ ]       Verantwortlich: [ ]       Datum: [ ]
Interne Preis-Hypothese: [ ] € netto Implementierung
Betriebsumfang-Hypothese: [ ]
Größtes verbleibendes Risiko: [ ]
```

Ein Go ist erst sinnvoll, wenn Prozessowner, Datenzugang, messbarer Output, Ausnahmeweg und Abnahmekriterien plausibel sind. Falls ein Prozess hauptsächlich aus individuellem Urteil, sicherheitskritischer Steuerung oder nicht zugänglichen Daten besteht, auf Hold/No-Go setzen oder kleiner schneiden.

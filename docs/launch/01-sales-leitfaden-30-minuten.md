# Discovery-Gespräch — 30 Minuten

Ziel ist ein belastbarer Pilot-Scope. Das Gespräch verkauft keine KI und verspricht keine Quote. Ein positives Ergebnis ist: Prozessowner, Baseline, Datenweg, Ausnahme- und Freigaberegeln sowie ein nächster Schritt sind klar.

## Vorbereitung (5 Minuten)

Notiere Branche, Rolle, Anlass und vermuteten Prozess. Öffne das [Prozess-Aufnahme-Arbeitsblatt](./09-PROZESS-AUFNAHME.md) und das Scope-Template. Prüfe, welche Aussage belegt ist; vermutete Mengen bleiben Vermutung.

## Gesprächsleitfaden

**0–3 Min — Rahmen**

> „Ich möchte heute nicht allgemein über KI sprechen. Wir nehmen einen wiederkehrenden Vorgang und prüfen, ob ein kleiner Pilot Arbeit aus dem Ablauf entfernen kann. Wenn Daten, Risiko oder Nutzen nicht passen, sagen wir das am Ende auch.“

**3–10 Min — Ist-Ablauf**

- „Nehmen wir die letzte Auftragsbestätigung: Wo kam sie an, wer hat sie geöffnet und was wurde verglichen?“
- „Was passiert bei einer Abweichung? Wer entscheidet und wo wird sie dokumentiert?“
- „Welche Systeme oder Dateien werden dabei berührt?“

Nicht wiederholen, was bereits gesagt wurde. Bei „weiß ich nicht“ markieren und später nachfordern. Keine Fragenkaskade; eine Frage, dann zuhören.

**10–15 Min — Volumen und Baseline**

- Vorgänge pro Woche/Monat: ___ Quelle: ___
- Zeit pro Standardfall: ___ Quelle/Messung: ___
- Zeit pro Ausnahme: ___
- Anteil/Anzahl Ausnahmen: ___
- Durchlaufzeit und Fehler/Nacharbeit: ___
- Beteiligte Personen/Touchpoints: ___

Rechnung im Gespräch:

```text
Baseline-Stunden = Vorgänge × Minuten vorher ÷ 60
Restaufwand      = Ausnahmen × Minuten je Ausnahme ÷ 60
Work Eliminated  = Baseline-Stunden − Restaufwand
```

Nur als Schätzung kennzeichnen, solange keine Zeitmessung vorliegt.

**15–21 Min — Zielbild und Risiko**

> „Wenn Standardfälle automatisch vorbereitet oder verarbeitet werden: Was muss immer ein Mensch freigeben? Welche Abweichung darf das System niemals selbst entscheiden?“

Klären: zulässige Daten, Aufbewahrung, Rollen, Test-/Produktionsumgebung, ERP-/Mailbox-Zugang, Eskalationsweg. Sicherheitskritische Steuerungen und fachlich nicht prüfbare Entscheidungen sind No-Go für den ersten Pilot.

**21–26 Min — Pilot zuschneiden**

Gemeinsam festhalten: ein Input-Kanal, ein Vergleichsobjekt, ein Output, ein Freigabepunkt, ein Zeitraum, maximal zehn Abnahmekriterien. Alles Weitere kommt auf die Später-Liste. Integrationen mit fehlendem Zugang werden als Risiko oder Phase 2 eingetragen.

**26–30 Min — Empfehlung und nächster Schritt**

> „Auf Basis dessen empfehle ich [Pilot/erst Baseline messen/kein Pilot]. Der nächste überprüfbare Schritt ist [Datenbeispiel und Scope bis Datum]. Ein Angebot nennt Umfang, Annahmen, Preis und Abnahme separat.“

## Qualifizierung

**Go:** benannter Owner, mindestens ein repräsentativer Testdatensatz, wiederkehrendes Volumen, klare Regeln, erreichbarer Output, vertretbarer Human Approval und eine Baseline. **Hold:** Datenzugang oder Freigabepfad offen. **No-Go:** sicherheitskritischer Prozess, unklarer Auftraggeber, vollständige ERP-Migration, kaum Volumen oder kein messbarer manueller Aufwand.

## Einwände

**„Wir wollen keine KI.“** — „Dann bauen wir keine KI um ihrer selbst willen. Wir prüfen, ob der Vorgang mit Regeln, Extraktion und Freigabe weniger manuelle Bearbeitung braucht.“

**„Unsere IT muss das prüfen.“** — „Ja. Wir definieren früh Datenzugang, Rollen, Hosting und einen kleinen Testpfad. Ohne diese Prüfung wird kein Live-Betrieb zugesagt.“

**„Das ist zu teuer.“** — „Lassen Sie uns zuerst die Baseline und den Pilotumfang prüfen. Wir stellen die Investition und die laufenden Kosten dem realistischen Nutzen gegenüber. Wenn das wirtschaftlich nicht trägt, verkleinern wir den Umfang oder empfehlen keinen Pilot.“

**„Wir melden uns.“** — „Gern. Darf ich zusammenfassen, welcher Nachweis für Ihre Entscheidung fehlt und bis wann Sie ihn prüfen möchten?“

## Nachbereitung

Binnen 24 Stunden: Gesprächsnotiz, Baseline mit Quellen, offene Annahmen, Entscheidung Go/Hold/No-Go und ein Scope-Entwurf. Kein Follow-up versenden, bevor der Inhalt sachlich geprüft ist. Discovery- und Angebotsdaten in einer Pipeline führen: Datum, Quelle, Use Case, Owner, Status, erwarteter Wert, nächster Schritt.

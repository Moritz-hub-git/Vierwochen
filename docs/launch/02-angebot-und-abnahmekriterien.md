# Angebot, Pilot-Scope und Abnahme

Diese Vorlage trennt eine überprüfbare Version 1 von Wünschen für später. Sie ist ein Arbeitsentwurf und ersetzt keine rechtliche Prüfung.

## Angebotsvorlage

```text
OpsDone — Pilotangebot [Nummer]
Kunde / Betreiber: [ ]
Prozessowner: [ ]     Datum: [ ]     Gültig bis: [ ]

Ausgangslage
[In den Worten des Kunden: Input, heutiger Ablauf, Volumen und Aufwand.]

Version 1 liefert
1. [Input-Kanal und erlaubte Dateiformate]
2. [Extraktion/Prüfung gegen genau welches Vergleichsobjekt]
3. [Output und Ablage/Benachrichtigung]
4. [Menschliche Freigabe und Ausnahmeweg]

Nicht enthalten / Später
[Systeme, Sonderfälle, Migration, zusätzliche Rollen, weitere Reports.]

Voraussetzungen des Kunden
[Testdaten, Zugänge, Ansprechpartner, Antwortfristen, fachliche Regeln.]

Zeitfenster
[Kick-off] · [Testversion] · [Pilotfenster] · [Abnahme]
Abhängigkeiten und Fristverschiebungen: [ ]

Preis (interne Hypothese, netto zzgl. USt.)
Implementierung: [ ] €
Betrieb ab Livegang: [ ] €/Monat, Umfang [ ]
Zahlungsplan: [ ]

Abnahme
Die nachfolgende Anlage A enthält maximal zehn messbare Kriterien.
Ergebnis ist eine vorläufige Prozessautomation mit Human Approval, sofern in Anlage A nicht anders vereinbart.

Offene fachliche/rechtliche Prüfung: [Datenschutz, AVV, Haftung, Rechte, Gewährleistung, Steuer-/Rechtsform].
```

Die Spanne **5.000–30.000 € netto Implementierung** ist nur eine interne Start-Hypothese. Vor einem echten Angebot Aufwand, Integrationsrisiko, Datenqualität und Mitwirkung prüfen. Betrieb wird separat nach tatsächlichem Umfang kalkuliert; keine pauschale „24/7“-Aussage ohne vereinbarte Leistung.

## Anlage A — Abnahmekriterien

Jedes Kriterium braucht Testfall, erwartetes Ergebnis und Nachweis. Formulierungen wie „intelligent“, „nahtlos“ oder „alle Fälle“ sind nicht abnahmefähig.

```text
Projekt: [ ]       Version: [ ]       Testdatenstand: [ ]

| Nr. | Kriterium / Testfall | Erwartetes Ergebnis | Nachweis | Status |
| 1   |                     |                     |          |        |
| 2   |                     |                     |          |        |
| 3   |                     |                     |          |        |
| 4   |                     |                     |          |        |
| 5   |                     |                     |          |        |
| 6   |                     |                     |          |        |
| 7   |                     |                     |          |        |
| 8   |                     |                     |          |        |
| 9   |                     |                     |          |        |
| 10  |                     |                     |          |        |
```

### Beispiel: Auftragsbestätigungen

- Eine eingehende Test-PDF wird dem richtigen Auftrag zugeordnet oder als „manuell prüfen“ markiert.
- Positionen, Mengen, Preise und Liefertermine werden in den vereinbarten Feldern extrahiert.
- Abweichungen werden mit Feld, Ist-Wert und Bestellwert angezeigt.
- Ein Standardfall erzeugt die vereinbarte interne Nachricht oder Aufgabenkarte.
- Ein unlesbarer/mehrdeutiger Fall wird nicht automatisch verbucht und landet in der Ausnahmequeue.
- Jede Aktion trägt Zeit, Quelle, Status und Bearbeiter/Automation im Audit-Log.
- Ein berechtigter Nutzer kann die Entscheidung freigeben, ablehnen oder korrigieren.
- Wiederholte Zustellung erzeugt keinen zweiten Vorgang, wenn die vereinbarte Idempotenzregel greift.

## Änderungsregel

Neue Wünsche nach Scope-Freeze werden mit Nutzen, Aufwand, Risiko und Zielversion in der Später-Liste dokumentiert. Ein Tausch ist möglich, wenn ein gleich großer Scope-Baustein entfällt. Keine stillen Erweiterungen aus Chat-Skizzen oder Demo-Daten.

## Projektablauf

1. **Vorbereitung:** Testdaten, Zugänge, Owner, Regeln und Abnahme unterschreiben.
2. **Discovery/Modellierung:** Felder und Ausnahmewege anhand echter anonymisierter Beispiele klären.
3. **Kleinste lauffähige Version:** erst Extraktion/Prüfung, dann Aktion; Human Approval aktiv.
4. **Test:** positive, negative, leere, doppelte und unlesbare Fälle.
5. **Begrenzter Pilotbetrieb:** Volumen und Work Eliminated messen.
6. **Abnahme/Übergabe:** Kriterien, offene Punkte, Runbook, Zugriff und Betriebsumfang protokollieren.

## Abnahmeprotokoll

```text
Am [Datum] wurde Version [ ] anhand der Kriterien [ ] geprüft.
Erfüllt: [ ]     Offen mit Frist: [ ]     Nicht im Scope: [ ]
Work Eliminated im Messfenster: [ ] Stunden (Quelle/Annahmen: [ ])
Betriebsverantwortung ab [ ]: [ ]
Kunde: [Name/Funktion/Unterschrift]   OpsDone: [Name/Unterschrift]
```

Rechtsgrundlage, Zahlungsplan, Rechte, Haftung und Gewährleistung vor Nutzung mit einer fachlich zuständigen Stelle prüfen. Diese Vorlage behauptet keine Rechtsfolge.

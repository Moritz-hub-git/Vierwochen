# 02 — Angebot, Abnahmekriterien, Projektablauf

Stand: 2026-09-08. Gilt für jedes Festpreisprojekt von vierwochen. Vier Teile:

1. Angebotsvorlage (Festpreis) — kopieren, Platzhalter füllen, PDF, raus.
2. Abnahmekriterien-Template mit drei ausgefüllten Beispielen und Abnahmeprotokoll.
3. Projektablauf: Kick-off (90 Min), Woche 1–4, Übergabe-Checkliste.
4. Punkte für den Anwalt (Werkvertrag, § 640, § 634a, Rechte).

Alles, was mit **[Anwalt]** markiert ist, ist ein Entwurf, den du vor dem ersten verschickten Angebot prüfen lässt. Die Gutachter beziffern das mit 800–1.500 € für AGB plus Angebotsmuster (gruender-risiko, coreMeasures). Das ist die günstigste Versicherung, die du in diesem Geschäft kaufen kannst.

---

## 0. Warum dieses Dokument das Herz des Geschäfts ist

Deine eine Zusage lautet: „Besteht die Abnahme nicht, entfällt die zweite Rate." Das ist ein starkes Verkaufsargument und gleichzeitig dein größter Streitherd. Der Gründer-Risiko-Gutachter formuliert es so: *„Ohne wasserdichte Abnahmekriterien in Woche 1 entscheidet der Kunde am Ende, ob er die zweite Hälfte zahlt."* Und: *„Widersprüche zwischen Werbung und AGB werden im Streit zu seinen Lasten ausgelegt."*

Die Zahlen aus dem Review, die du beim Schreiben jedes Angebots im Kopf haben musst:

| Größe | Wert laut Review | Quelle |
|---|---|---|
| Aufwand pro Projekt all-in (Vertrieb, Kick-off, Bau, Abnahme, Gewährleistung) | 95–130 h (gruender-risiko), 115–135 h (agentur-operator), 80–130 h Mittel 105 h (growth) | strategies[].unitEconomics |
| davon Bau mit ERP-/WaWi-Anbindung | 70–90 h; „die Anbindung ist der Teil, bei dem AI kaum hilft" | agentur-operator |
| davon Discovery/Abnahmekriterien | 6–8 h | growth-nachfrage |
| davon Gewährleistungs-Tail | 8–12 h (~8 % Rückstellung) | gruender-risiko |
| Kosten einer gescheiterten Abnahme | ~12.500 € Umsatz + ~9.000 € Kosten; „die Jahresmarge dieses Kopfes ist weg" | agentur-operator |
| Wenn 1 von 5 Abnahmen scheitert | Marge sinkt um 10 Prozentpunkte, „bei Scope-Streit um deutlich mehr" | vc-skeptiker |
| Empfohlene Rücklage je Projekt | 8 % (agentur-operator) bis 10 % (vc-skeptiker) | risks[].mitigation |
| Empfohlene Nachfrist bei Mängeln | 10 Arbeitstage | agentur-operator |
| Puffer | „5 Wochen intern, 4 kommuniziert" | gruender-risiko |
| Zugänge vom Kunden | „bis Tag 3", als Fristverlängerung verankert | agentur-operator |

Drei Regeln, die aus diesen Zahlen folgen und in jedem Angebot stehen:

1. **Maximal 10 messbare Abnahmekriterien, unterschrieben bis Tag 3 nach Kick-off.** Was nicht auf der Liste steht, ist nicht Abnahmegegenstand.
2. **Systemanbindung nur zum Festpreis, wenn die Schnittstelle dokumentiert ist und du den Zugang vor dem Kick-off getestet hast.** Sonst: Anbindung als Phase 2 oder als eigenes Modul nach Aufwand. (agentur-operator, risks[0]: „Bei Festpreis trägt das der Anbieter.")
3. **Änderungswünsche während des Baus landen auf der Später-Liste**, nicht im Umfang. Tausch 1:1 bis Ende Woche 2 möglich, danach Freeze.

Und eine für dich: **Jede Stunde ab Angebotsphase tracken** (Phase: Verkauf / Kick-off / Bau / Anbindung / Abnahme / Gewährleistung). Der Agentur-Gutachter: *„Ohne Zeit-Tracking weiß er nach drei Projekten nicht, ob 9.500 oder 19.500 der richtige Preis war."*

---

## 1. Angebotsvorlage (Festpreis)

Als Individualvereinbarung formuliert, nicht als AGB — Individualabreden schlagen AGB und sind nicht der AGB-Inhaltskontrolle nach § 307 BGB unterworfen **[Anwalt]**. Zwei Seiten Angebot plus Anlage A (Abnahmekriterien) plus Anlage B (AGB). Der Kunde unterschreibt das Angebot; die Abnahmekriterien werden bis Tag 3 nach Kick-off nachgereicht und unterschrieben.

Beispielwerte sind für ein Prüfprotokoll-Projekt im Elektrobau ausgefüllt (Testnische). Ersetze alles in [eckigen Klammern].

```markdown
# Festpreis-Angebot Nr. [2026-001]

**vierwochen** · [Rechtsform, z. B. vierwochen UG (haftungsbeschränkt)] · [Straße Nr.] · [PLZ Ort]
[USt-IdNr.] · [HRB-Nr., Amtsgericht] · moritz.schumacher@vierwochen.de · [Telefon]

**An:** [Firma] · [Ansprechpartner, Funktion] · [Straße] · [PLZ Ort]
**Datum:** [15.09.2026] · **Gültig bis:** [29.09.2026] (14 Tage)
**Projekt:** [Digitale Prüfprotokolle für Anlagenprüfungen]
**Ihr Ansprechpartner bei vierwochen:** Moritz Schumacher (persönlich verantwortlich für Konzeption, Bau, Abnahme und Gewährleistung)

---

## 1. Ausgangslage — in Ihren Worten

[Wörtlich aus dem Beratungsgespräch, 3–5 Sätze. Keine Umformulierung, keine Fachbegriffe, die der Kunde nicht benutzt hat. Beispiel:]

„Unsere sechs Monteure füllen die Prüfprotokolle nach DGUV V3 auf Papier aus. Die Zettel kommen freitags ins Büro, dort tippt Frau [Name] sie in Word ab, druckt sie, und wir schicken sie dem Kunden per Post. Pro Woche gehen dafür etwa [8] Stunden im Büro drauf, und alle paar Wochen fehlt ein Zettel. Wir wollen, dass das Protokoll auf der Baustelle am Tablet entsteht und der Kunde es am selben Tag als PDF hat."

**Messbares Ziel:** [Büroaufwand für Protokolle von ~8 h/Woche auf unter 1 h/Woche; kein Protokoll älter als 24 h nach Prüfung.]

## 2. Version 1 — was in vier Wochen live geht

Version 1 umfasst genau die folgenden Punkte. Jeder Punkt wird durch ein Abnahmekriterium in Anlage A geprüft.

1. [Anmeldung für zwei Nutzergruppen: Monteur (mobil) und Büro (Desktop), mit Rollen und Rechten.]
2. [Protokoll-Formular nach Vorlage [Ihr aktuelles Word-Formular, Stand 09/2026] mit Pflichtfeldern, Messwerten, Foto-Upload, Unterschrift auf dem Tablet.]
3. [Offline-Erfassung: Protokoll kann ohne Netz begonnen und abgeschlossen werden; Synchronisation bei Verbindung.]
4. [Kunden- und Anlagenstamm: Anlage anlegen, suchen, Prüfhistorie sehen.]
5. [PDF-Erzeugung im Layout Ihrer Vorlage mit Ihrem Logo; Versand per E-Mail an den Endkunden aus der Anwendung.]
6. [Büro-Übersicht: offene, abgeschlossene, fällige Prüfungen; Filter nach Kunde, Monteur, Zeitraum.]
7. [Datenübernahme: Import Ihrer bestehenden Anlagenliste aus [Excel-Datei, ~1.200 Zeilen].]
8. [Betrieb auf EU-Servern (Frankfurt), tägliche Sicherung, verschlüsselte Übertragung.]

**Nicht in Version 1** (auf der Später-Liste, jederzeit als Folgeauftrag oder im Betriebspaket 990 möglich):
- [Anbindung an Ihre Warenwirtschaft [Name] — Schnittstelle liegt nicht dokumentiert vor; wir prüfen sie in Woche 3 und bieten die Anbindung danach fest an.]
- [Terminplanung / Einsatzplanung der Monteure.]
- [Native App-Store-App; Version 1 ist eine mobile Web-App, die auf dem Tablet wie eine App installiert wird.]
- [Mehrsprachigkeit.]
- [Alles, was nicht unter Punkt 1–8 steht.]

## 3. Preis und Herleitung

| Position | Enthält | Netto |
|---|---|---|
| Grundprodukt „In vier Wochen live" | Kick-off-Workshop, Konzeption, Bau, eine Nutzergruppe, Anmeldung/Rollen, Datenmodell, Oberfläche, Tests, Abnahme, Übergabe, Doku, 24 Monate Gewährleistung | 12.500 € |
| Baustein: [weitere Nutzergruppe (Büro)] | [Desktop-Ansicht, eigene Rechte, Übersicht] | [1.500 €] |
| Baustein: [mobil / offline] | [Offline-Erfassung, Synchronisation, Tablet-Installation] | [3.000 €] |
| Baustein: [PDF-Dokumente] | [Protokoll-PDF in Ihrem Layout, Versand] | [2.000 €] |
| Baustein: [Datenübernahme] | [Import Anlagenliste aus Excel, einmalig] | [1.500 €] |
| **Festpreis Version 1** | | **[20.500 €]** |

zzgl. gesetzlicher Umsatzsteuer. Der Festpreis ändert sich nicht, solange der Umfang aus Abschnitt 2 und Anlage A unverändert bleibt. Es gibt keine Stundenabrechnung, keine Nachträge ohne Ihre schriftliche Beauftragung.

[Bausteinpreise nur innerhalb der festgelegten Korridore: Systemanbindung 2.500–5.000 · weitere Nutzergruppe 1.500–2.500 · Datenübernahme 1.500–3.500 · mobil/offline 2.500–4.000 · PDF 1.500–2.500 · Bezahlung 2.500–4.000 · AI-Funktion 2.000–4.000 · Decke 35.000 €. Der Richtpreis aus dem KI-Berater ist die Untergrenze des Korridors, nie ein Punktpreis — das Angebot darf nicht darunter liegen.]

## 4. Zahlung

| Rate | Fällig | Betrag |
|---|---|---|
| 1. Rate (50 %) | mit Auftrag, vor Kick-off | [10.250 €] netto |
| 2. Rate (50 %) | nach Abnahme gemäß Anlage A | [10.250 €] netto |

**Unsere Zusage:** Besteht Version 1 die Abnahme nach Anlage A auch nach der Nachfrist (Abschnitt 6) nicht, entfällt die zweite Rate. Die erste Rate deckt Workshop, Konzeption und die erbrachte Bauleistung und wird nicht erstattet.

## 5. Zeitplan

| Meilenstein | Datum |
|---|---|
| Auftrag + 1. Rate + Zugänge (Abschnitt 9) | bis [Fr, 25.09.2026] |
| Kick-off-Workshop, 90 Min, [vor Ort / Video] | [Mo, 28.09.2026, 09:00] |
| Abnahmekriterien (Anlage A) unterschrieben | bis [Mi, 30.09.2026] |
| Wöchentliche Abstimmung, 30 Min | [Di 08:00: 06.10., 13.10., 20.10.] |
| Demo-Freitag: klickbarer Stand | [Fr 02.10., 09.10., 16.10., jeweils 14:00] |
| Feedback-Freeze (letzte Änderungen an Anlage A) | [Fr, 09.10.2026] |
| Bereitstellung zur Abnahme | [Fr, 23.10.2026] |
| Abnahmetermin, 60 Min | [Mo, 26.10.2026] |
| Nachfrist für Nachbesserungen (falls nötig) | bis [Fr, 06.11.2026] (10 Arbeitstage) |
| Live-Betrieb | ab Abnahme |

Der Kick-off findet innerhalb von zwei Wochen nach Auftrag statt. Verzögert sich Ihre Mitwirkung (Abschnitt 9), verschieben sich alle Folgetermine um die Verzögerung.

## 6. Abnahme

- Die Abnahme erfolgt anhand der maximal zehn Kriterien in Anlage A. Was dort nicht steht, ist nicht Abnahmegegenstand.
- Am Abnahmetermin prüfen wir gemeinsam jedes Kriterium mit dem dort beschriebenen Prüfschritt. Ergebnis pro Kriterium: erfüllt / nicht erfüllt.
- Mängelklassen: **A** (Kriterium nicht erfüllt) · **B** (Kriterium erfüllt, aber Abweichung mit spürbarer Einschränkung) · **C** (kosmetisch). Die Abnahme wird erteilt, wenn kein A-Mangel offen ist. B- und C-Mängel werden im Rahmen der Gewährleistung binnen 10 Arbeitstagen behoben.
- Liegt ein A-Mangel vor, bessern wir innerhalb von 10 Arbeitstagen nach und wiederholen die Prüfung dieses Kriteriums. Gelingt das nicht, entfällt die zweite Rate (Abschnitt 4).
- Nehmen Sie innerhalb von 5 Arbeitstagen nach Bereitstellung nicht am Abnahmetermin teil oder verweigern Sie die Abnahme ohne Nennung mindestens eines A-Mangels, gilt Version 1 als abgenommen (§ 640 Abs. 2 BGB). Dasselbe gilt, wenn Sie Version 1 produktiv einsetzen.

## 7. Betrieb nach dem Livegang (optional, monatlich kündbar)

| Paket | Enthält | Monatlich |
|---|---|---|
| Betrieb | Hosting (EU), Sicherheits-Updates, tägliche Sicherung, Monitoring, Störungsbehebung, Ansprechpartner | 290 € |
| Betrieb + Weiterentwicklung | wie Betrieb, plus ein Änderungstag pro Monat (8 h) für neue Funktionen aus der Später-Liste | 990 € |

Ohne Betriebspaket übergeben wir Ihnen die Anwendung lauffähig auf Ihrer eigenen Infrastruktur (Abschnitt 10) mit Betriebsanleitung; laufende Hosting-Kosten [ca. 20–60 €/Monat je nach Anbieter] tragen Sie dann direkt.

## 8. Gewährleistung, Code-Eigentum, Sicherheit

- **Gewährleistung 24 Monate** ab Abnahme auf Version 1 gemäß Anlage A: Weicht die Anwendung von einem Abnahmekriterium ab, beheben wir das kostenlos. Reaktion: Rückmeldung am nächsten Arbeitstag, Behebung von A-Mängeln binnen 5 Arbeitstagen.
- **Der Code gehört Ihnen.** Mit vollständiger Zahlung erhalten Sie das ausschließliche, zeitlich und räumlich unbeschränkte Nutzungsrecht am Quellcode von Version 1 inklusive Bearbeitung und Weitergabe. Ausgenommen sind Open-Source-Komponenten (deren Lizenzen liegen bei) und allgemeine, nicht projektspezifische Bausteine von vierwochen (Anmeldung, Rollen, Grundgerüst), an denen Sie ein einfaches, unbeschränktes Nutzungsrecht erhalten. Das Repository liegt ab Tag 1 in [Ihrer GitHub-Organisation / einer Organisation, deren Eigentümer Sie sind].
- **Stack:** [TypeScript, Next.js, PostgreSQL, Hosting Cloud Run/Frankfurt] — verbreitet, dokumentiert, von jedem Web-Entwickler wartbar.
- **Sicherheit:** verschlüsselte Übertragung, Passwort-Hashing, Rollenrechte, tägliche Sicherung, Abhängigkeits-Scan vor Abnahme, keine Zugangsdaten im Code. Bei personenbezogenen Daten schließen wir vor Livegang einen Auftragsverarbeitungsvertrag (Art. 28 DSGVO).
- **Ausfall-Vorsorge:** Fällt Moritz Schumacher länger als 5 Arbeitstage aus, erhalten Sie sofort vollständigen Zugriff auf Code, Zugänge und Dokumentation (liegt ohnehin bei Ihnen) und [Name Backup-Entwickler] kann das Projekt auf Basis der Dokumentation fortführen.

## 9. Ihre Mitwirkung

Damit vier Wochen halten, brauchen wir von Ihnen:

1. **Einen Entscheider als festen Ansprechpartner** ([Name]), der Fragen zum Ablauf beantwortet und Freigaben erteilt, plus einen Vertreter ([Name]).
2. **Rückmeldung binnen 2 Arbeitstagen** auf Fragen und auf jeden Demo-Freitag-Stand.
3. **Zugänge bis Tag 3 nach Kick-off:** [Beispiel-Vorlagen (Word-Protokoll, Logo), Anlagenliste als Excel, Testzugang zu [System], 2 Test-Nutzer aus Ihrem Team, Domain/DNS-Zugang oder Subdomain-Freigabe].
4. **Teilnahme** am Kick-off (90 Min), an drei Abstimmungen (30 Min) und am Abnahmetermin (60 Min).
5. **Echte Testdaten** ab Woche 2 (anonymisiert, falls personenbezogen).

Bleibt eine Mitwirkung aus, verschieben sich Termine um die Dauer der Verzögerung; bei mehr als 10 Arbeitstagen Stillstand können wir das Projekt gegen Vergütung der bis dahin erbrachten Leistung beenden. [Anwalt: § 642/§ 643 BGB]

## 10. Sonstiges

- Es gelten die AGB von vierwochen (Anlage B), Stand [Datum]. Bei Widerspruch geht dieses Angebot vor.
- Referenz: [Optional für die ersten drei Projekte:] Sie gestatten uns, [Firmenname, Logo, ein Zitat von [Name] und anonymisierte Screenshots] als Referenz zu nutzen und ein Referenzgespräch mit Interessenten (max. [2] pro Jahr, je 15 Min) zu führen. Dafür ist im Preis ein Nachlass von [X €] berücksichtigt.
- Dieses Angebot ist 14 Tage gültig, bis [29.09.2026]. Danach können Termine und Verfügbarkeit abweichen.

**Auftrag erteilt:**

[Ort, Datum] ______________________ [Firma, Name, Funktion]

**Anlagen:** A — Abnahmekriterien (folgt bis Tag 3 nach Kick-off, wird Vertragsbestandteil mit Unterschrift beider Seiten) · B — AGB vierwochen
```

### Notizen zum Ausfüllen

- **Ausgangslage wörtlich.** Die Personas haben durchweg gesagt, dass sie sich in Fachsprache nicht wiederfinden (Kerstin: „Was ist ein ›digitales Produkt‹, was ist ›live‹ …"). Die Ausgangslage ist der Teil, an dem der Kunde prüft, ob du zugehört hast.
- **„Nicht in Version 1" ist die wichtigste Liste des Angebots.** Der Agentur-Gutachter warnt vor dem Konflikt in Woche 3: „das hatte die Skizze aber drin." Die Skizze aus dem KI-Berater hat eine Version-1/Später-Trennung — übernimm sie 1:1 in Abschnitt 2 und schreibe alles Weggelassene explizit unter „Nicht in Version 1".
- **Systemanbindung:** Nur als Festpreis-Baustein, wenn du vor dem Angebot (a) eine API-Doku gesehen und (b) einen Test-Call gegen das System gemacht hast. Sonst wie im Beispiel: Phase 2 nach Prüfung in Woche 3. Sag das dem Kunden im Gespräch so: „Die Anbindung ist die Stelle, an der Projekte kippen. Ich prüfe erst, ob Ihre Schnittstelle das hergibt, und biete sie dann fest an."
- **Termine:** Kick-off „innerhalb von zwei Wochen nach Auftrag", nicht „nächster Montag". Intern rechnest du mit fünf Wochen (Nachfrist ist deine fünfte Woche).
- **Ein Projekt zur Zeit**, solange du angestellt bist. Das Angebot verspricht Demo-Freitage und 2-Tage-Reaktion — das hältst du nicht bei zwei parallelen Projekten neben 40 Stunden Konzernjob.
- **Impressum-Zeile im Kopf muss vollständig sein** (Rechtsform, Anschrift, USt-IdNr., Telefon). Thomas, Markus, Sabine, Kerstin und der Agenturinhaber haben alle gesagt: ohne das kein Lieferantenstammsatz, kein Erstgespräch. Angebote erst versenden, wenn UG und Haftpflicht stehen (gruender-risiko: „Bis dahin: keine Angebote versenden").

---

## 2. Abnahmekriterien (Anlage A)

### 2.1 Regeln

- **Maximal 10 Kriterien.** Wenn du elf brauchst, ist der Umfang zu groß oder zwei Kriterien gehören zusammen.
- **Jedes Kriterium ist ein Prüfschritt mit erwartetem Ergebnis**, den ein Fachfremder in unter 10 Minuten nachvollziehen kann. Kein „intuitiv", kein „performant", kein „stabil". Stattdessen: Zahlen, Sekunden, Dateien, Zustände.
- **Ein Kriterium pro Punkt aus „Version 1"**, plus ein Kriterium für Sicherheit/Betrieb, plus optional eines für Geschwindigkeit.
- **Regel im Wortlaut (steht über der Tabelle):** „Abnahmegegenstand ist ausschließlich, was in dieser Liste steht. Eigenschaften, Funktionen und Verhalten, die hier nicht beschrieben sind, sind nicht Gegenstand der Abnahme und werden über die Später-Liste behandelt."
- **Unterschrift beider Seiten bis Tag 3 nach Kick-off.** Vorher baust du Grundgerüst und Datenmodell, keine Fachfunktionen.
- **Änderungen an Anlage A nur schriftlich, nur bis Feedback-Freeze (Ende Woche 2), nur als Tausch** (ein Kriterium raus, ein gleich großes rein). Danach ist die Liste eingefroren.
- **Gewährleistung bezieht sich auf diese Liste**, nicht auf allgemeine Erwartungen (vc-skeptiker: „Gewährleistung auf Fehler gegenüber den Abnahmekriterien begrenzen").

### 2.2 Leere Vorlage

```markdown
# Anlage A — Abnahmekriterien zu Angebot Nr. [2026-001]

Projekt: [Name] · Version 1 · Stand: [Datum] · ersetzt: [—]

Abnahmegegenstand ist ausschließlich, was in dieser Liste steht. Eigenschaften, Funktionen und Verhalten, die hier nicht beschrieben sind, sind nicht Gegenstand der Abnahme und werden über die Später-Liste behandelt. Änderungen an dieser Liste sind bis zum [Datum Feedback-Freeze] schriftlich und nur als 1:1-Tausch möglich.

Testumgebung: [URL] · Testnutzer: [Rolle A: …, Rolle B: …] · Testdaten: [Beschreibung]

| Nr. | Kriterium (Bezug Version-1-Punkt) | Prüfschritt | Erwartetes Ergebnis | Prüfer | Ergebnis |
|---|---|---|---|---|---|
| 1 | [ ] | [ ] | [ ] | [Kunde/Moritz] | [ ] |
| 2 | | | | | |
| … | | | | | |
| 10 | | | | | |

Später-Liste (nicht Abnahmegegenstand, für Folgeaufträge / Betriebspaket 990):
- [ ]
- [ ]

Unterschrieben:
[Ort, Datum] ______________ [Kunde]      [Ort, Datum] ______________ Moritz Schumacher, vierwochen
```

### 2.3 Beispiel A — Internes Tool (Handel/Großhandel: Retouren-Erfassung)

Ausgangslage: Retouren werden per E-Mail und Excel zwischen Lager und Innendienst hin- und hergeschoben. Version 1: ein internes Werkzeug für Lager und Innendienst, Datenübernahme aus Excel, keine Anbindung an die Warenwirtschaft (Phase 2).

| Nr. | Kriterium | Prüfschritt | Erwartetes Ergebnis |
|---|---|---|---|
| 1 | Anmeldung mit zwei Rollen | Login als Lager-Testnutzer und als Innendienst-Testnutzer | Lager sieht nur „Retoure erfassen" und eigene Liste; Innendienst sieht alle Retouren und „Entscheiden" |
| 2 | Retoure erfassen in unter 2 Minuten | Lager erfasst eine Retoure mit Kundennummer, Artikelnummer, Menge, Grund (Auswahlliste), 2 Fotos | Datensatz erscheint sofort in der Innendienst-Liste mit Status „Neu"; Erfassung dauert bei Stoppuhr < 2 Min |
| 3 | Pflichtfelder | Speichern ohne Artikelnummer und ohne Grund versuchen | Speichern wird verweigert, fehlende Felder sind rot markiert |
| 4 | Entscheidung mit Statuswechsel | Innendienst setzt Status auf „Gutschrift" / „Ersatz" / „Abgelehnt" mit Kommentar | Status und Kommentar sind in der Liste sichtbar; Lager sieht den neuen Status ohne Neuladen innerhalb von 10 Sekunden |
| 5 | Suche und Filter | Liste nach Kundennummer [12345] filtern; nach Status „Neu" filtern; Zeitraum [1.–15.10.] | Nur passende Retouren werden angezeigt; Trefferanzahl stimmt mit Testdaten überein |
| 6 | Datenübernahme | Import der Datei [retouren_2025.xlsx, 2.340 Zeilen] | 2.340 Retouren importiert, Importbericht zeigt 0 Fehler oder listet die fehlerhaften Zeilen mit Grund |
| 7 | Export | Liste mit Filter „Oktober 2026" als Excel exportieren | Datei öffnet in Excel, Spalten: Datum, Kunde, Artikel, Menge, Grund, Status, Kommentar; Zeilenzahl = Trefferanzahl |
| 8 | Historie | Retoure aus Kriterium 2 öffnen | Verlauf zeigt: wer hat wann erfasst, wer hat wann welchen Status gesetzt |
| 9 | Sicherheit | Aufruf der Innendienst-Liste per URL als Lager-Nutzer; Passwort-Reset für Testnutzer | Zugriff wird verweigert (Fehlerseite, keine Daten); Reset-Mail kommt binnen 1 Min, neues Passwort funktioniert |
| 10 | Betrieb | Sicherung der Datenbank vom Vortag wird in die Testumgebung eingespielt | Retouren vom Vortag sind sichtbar; Vorgang ist in der Betriebsanleitung beschrieben |

Später-Liste: Anbindung Warenwirtschaft [Name] (Kundendaten, Artikelstamm live) · automatische Gutschrift-Erstellung · Kunden-Benachrichtigung per E-Mail.

### 2.4 Beispiel B — Kundenportal mit ERP-Anbindung (Großhandel: Bestellstatus und Lieferscheine)

Voraussetzung, sonst kein Festpreis: ERP-Schnittstelle dokumentiert, Test-Zugang vor Kick-off geprüft, eine erfolgreiche Testabfrage gemacht. Im Beispiel: [ERP-Name] mit REST-API, lesender Zugriff auf Aufträge und Lieferscheine.

| Nr. | Kriterium | Prüfschritt | Erwartetes Ergebnis |
|---|---|---|---|
| 1 | Kundenlogin | Login mit Testkunde [K-1001], falsches Passwort dreimal | Login erfolgreich; nach drei Fehlversuchen 15 Minuten Sperre mit Hinweis |
| 2 | Auftragsübersicht aus dem ERP | Testkunde öffnet „Meine Aufträge" | Alle im ERP für K-1001 vorhandenen Aufträge der letzten 12 Monate werden angezeigt (Abgleich mit ERP-Auszug, Anzahl identisch); Ladezeit < 3 Sekunden bei bis zu 500 Aufträgen |
| 3 | Auftragsstatus aktuell | Status eines Auftrags im ERP von „In Bearbeitung" auf „Versandt" ändern | Portal zeigt „Versandt" spätestens 15 Minuten später (Synchronisationsintervall) |
| 4 | Lieferschein-PDF | Bei einem versandten Auftrag „Lieferschein" klicken | PDF öffnet, Inhalt entspricht dem ERP-Lieferschein (Positionen, Mengen, Lieferschein-Nr.) |
| 5 | Mandantentrennung | Als K-1001 die URL eines Auftrags von K-1002 aufrufen | Zugriff verweigert, keine Daten von K-1002 sichtbar |
| 6 | Sendungsverfolgung | Auftrag mit Trackingnummer öffnen | Link zum Paketdienst wird angezeigt und öffnet die richtige Sendung |
| 7 | Rückfrage zum Auftrag | Testkunde stellt eine Rückfrage per Formular | Innendienst erhält E-Mail an [innendienst@…] mit Kundennummer, Auftragsnummer, Text binnen 1 Min; Rückfrage ist im Portal in der Auftragshistorie sichtbar |
| 8 | Ausfall der ERP-Verbindung | ERP-Zugang testweise sperren, Portal aufrufen | Portal bleibt erreichbar, zeigt zuletzt bekannte Daten mit Hinweis „Stand: [Zeit]"; keine Fehlermeldung mit technischen Details an den Kunden |
| 9 | Kundenverwaltung (Innendienst) | Innendienst legt Portalzugang für K-1003 an und sperrt K-1002 | K-1003 erhält Einladungs-Mail und kann sich anmelden; K-1002 kann sich nicht mehr anmelden |
| 10 | Sicherheit und Betrieb | Abhängigkeits-Scan-Bericht vorlegen; HTTPS prüfen; Sicherung des Vortags einspielen | Bericht zeigt keine offenen Schwachstellen der Stufe „hoch/kritisch"; nur HTTPS erreichbar; Sicherung läuft wie in Betriebsanleitung |

Später-Liste: Bestellung im Portal auslösen (schreibender ERP-Zugriff) · Rechnungen als PDF · Preislisten je Kunde · SSO über [Entra ID].

Hinweis zu Markus (IT-Leiter-Persona): Er will Repo ab Tag 1 in der Kunden-Org, „Boring Technology", Dependency-Scanning, Backup, Verschlüsselung, SSO als Option. Kriterium 10 und Angebot Abschnitt 8 decken das ab — bei Kunden mit IT-Abteilung schickst du Anlage A vor Unterschrift an die IT.

### 2.5 Beispiel C — Mobile Protokoll-App (Anlagen-/Elektrobau: Prüfprotokolle)

Passt zum Angebotsbeispiel in Abschnitt 1.

| Nr. | Kriterium | Prüfschritt | Erwartetes Ergebnis |
|---|---|---|---|
| 1 | Installation auf dem Tablet | Anwendung auf [iPad / Android-Tablet des Kunden] „zum Home-Bildschirm hinzufügen", Login als Monteur | Icon auf dem Home-Bildschirm, Anwendung startet im Vollbild, Login funktioniert |
| 2 | Protokoll vollständig erfassen | Monteur erfasst Protokoll für Anlage [A-0042] nach Vorlage [DGUV-V3-Formular Stand 09/2026]: alle Pflichtfelder, 3 Messwerte, 2 Fotos, Unterschrift Kunde | Protokoll ist gespeichert, Status „Abgeschlossen", alle Felder der Vorlage sind vorhanden (Abgleich Feld für Feld) |
| 3 | Offline | Flugmodus einschalten, neues Protokoll beginnen, 2 Fotos, abschließen; Flugmodus aus | Protokoll ist ohne Netz vollständig erfassbar; nach Netzverbindung erscheint es binnen 2 Minuten im Büro |
| 4 | Plausibilitätsprüfung | Messwert außerhalb des zulässigen Bereichs [z. B. Isolationswiderstand < 1 MΩ] eingeben | Feld wird markiert, Protokoll kann nur mit Bemerkung „Mangel festgestellt" abgeschlossen werden |
| 5 | PDF im Kundenlayout | Abgeschlossenes Protokoll als PDF öffnen | PDF entspricht der Vorlage (Logo, Kopf, Felder, Fotos, Unterschrift), Seitenumbrüche sauber, Dateiname [Anlage_Datum_Protokollnr.pdf] |
| 6 | Versand an Endkunden | „An Kunden senden" klicken | Endkunde ([Test-Adresse]) erhält E-Mail mit PDF binnen 1 Min; Versand ist im Protokoll mit Zeitstempel vermerkt |
| 7 | Anlagenstamm und Historie | Anlage A-0042 im Büro öffnen | Alle Protokolle dieser Anlage chronologisch, nächster Prüftermin wird aus Prüfintervall [12 Monate] berechnet und angezeigt |
| 8 | Büro-Übersicht | Filter „fällig in den nächsten 30 Tagen" | Liste zeigt genau die Anlagen, deren berechneter Prüftermin in den nächsten 30 Tagen liegt (Abgleich mit Testdaten) |
| 9 | Datenübernahme | Import [anlagen.xlsx, 1.200 Zeilen] | 1.200 Anlagen angelegt, Importbericht ohne Fehler oder mit Zeilenliste |
| 10 | Rollen und Sicherheit | Monteur versucht, ein fremdes Protokoll zu ändern; Büro versucht, ein abgeschlossenes Protokoll zu ändern | Beides wird verweigert; abgeschlossene Protokolle sind unveränderbar (nur Nachtrag mit Verweis) |

Später-Liste: Anbindung Warenwirtschaft/Auftragsverwaltung · Einsatzplanung · native App-Store-Version · Mehrsprachigkeit.

### 2.6 Abnahmeprotokoll (Vorlage)

```markdown
# Abnahmeprotokoll — Angebot Nr. [2026-001], Version 1

Projekt: [Name] · Datum: [26.10.2026] · Ort: [Video / vor Ort]
Teilnehmer Kunde: [Name, Funktion] · vierwochen: Moritz Schumacher
Geprüfter Stand: [Git-Commit / Version-Tag, z. B. v1.0.0, 23.10.2026] auf [URL]
Grundlage: Anlage A, Stand [30.09.2026]

| Nr. | Kriterium (Kurzform) | Ergebnis | Mangelklasse (A/B/C) | Bemerkung |
|---|---|---|---|---|
| 1 | | erfüllt / nicht erfüllt | | |
| … | | | | |
| 10 | | | | |

Offene Mängel:
| Nr. | Beschreibung | Klasse | Behebung bis |
|---|---|---|---|
| | | | |

**Ergebnis** (eines ankreuzen):
[ ] Abnahme erteilt. Alle Kriterien erfüllt; keine A-Mängel offen. B-/C-Mängel werden bis [Datum] im Rahmen der Gewährleistung behoben. 2. Rate ist fällig.
[ ] Abnahme erteilt unter Vorbehalt der Behebung der B-Mängel Nr. [ ] bis [Datum]. 2. Rate ist fällig.
[ ] Abnahme nicht erteilt wegen A-Mangel Nr. [ ]. Nachbesserung bis [Datum, max. 10 Arbeitstage], Wiederholung der Prüfung der Kriterien Nr. [ ] am [Datum].
[ ] Abnahme nach Nachfrist endgültig nicht erteilt. Die zweite Rate entfällt gemäß Angebot Abschnitt 4.

Übergabe (nur bei Abnahme): [ ] Repo-Rechte übertragen  [ ] Zugänge übergeben  [ ] Betriebsanleitung übergeben  [ ] Betriebspaket [290 / 990 / keines] ab [Datum]

[Ort, Datum] ______________ [Kunde]      [Ort, Datum] ______________ Moritz Schumacher
```

Das Protokoll wird am Abnahmetermin gemeinsam ausgefüllt und noch im Termin unterschrieben (digital reicht). Danach am selben Tag: Rechnung 2. Rate, Repo-Übertragung, Betriebspaket-Start.

---

## 3. Projektablauf

### 3.1 Vor dem Kick-off (Woche 0)

Checkliste, alles erledigt, bevor der Kick-off stattfindet:

- [ ] Angebot unterschrieben zurück, 1. Rate eingegangen (Kick-off erst nach Zahlungseingang).
- [ ] Zugangs-Liste aus Angebot Abschnitt 9 an den Kunden geschickt, mit Datum „bis Tag 3".
- [ ] Bei Systemanbindung: API-Doku gelesen, Test-Call gemacht, Ergebnis im Projektordner.
- [ ] Repository in der Kunden-Organisation angelegt (oder eigene Org, Kunde als Owner eingetragen), Starter-Kit eingespielt (Auth, Rollen, Datenmodell-Muster, Deployment).
- [ ] Testumgebung deployt, Testnutzer angelegt, URL notiert.
- [ ] Zeit-Tracking angelegt: Phasen Verkauf / Kick-off / Bau / Anbindung / Abnahme / Gewährleistung. Verkaufsstunden rückwirkend eintragen.
- [ ] Kalender: 3 Abstimmungen, 4 Demo-Freitage, Abnahmetermin, Nachfrist-Ende als Termine mit dem Kunden verschickt.
- [ ] Backup-Entwickler (Name im Angebot) informiert: Projekt, Zeitraum, wo Doku und Zugänge liegen.
- [ ] Rücklage: 8–10 % des Festpreises auf ein separates Konto, nicht anfassen.
- [ ] Bei personenbezogenen Daten: AVV-Entwurf an Kunde. **[Anwalt]**

### 3.2 Kick-off-Agenda (90 Minuten)

Teilnehmer: Entscheider, Ansprechpartner, ein bis zwei Nutzer aus dem Alltag (der Monteur, die Lager-Kollegin). Nicht mehr als fünf Personen. Du moderierst, teilst den Bildschirm und schreibst live mit.

| Zeit | Block | Ziel | Ergebnis |
|---|---|---|---|
| 0:00–0:10 | Ziel und Zahl | Ausgangslage aus dem Angebot vorlesen, messbares Ziel bestätigen: „Woran merken Sie am [Datum + 3 Monate], dass es sich gelohnt hat?" | Ein Satz, eine Zahl, im Protokoll |
| 0:10–0:35 | Der Ablauf heute | Der Nutzer zeigt den echten Ablauf mit echten Unterlagen (der Zettel, die Excel, das Word-Formular). Du fragst nur: „Und dann?", „Wer?", „Wie oft?", „Was geht schief?" | Ablauf in 5–10 Schritten mitgeschrieben; Vorlagen als Dateien erhalten |
| 0:35–0:55 | Version 1 / Später | Punkte aus Angebot Abschnitt 2 durchgehen. Für jeden neuen Wunsch aus Block 2: „Version 1 oder Später?" Alles, was nicht unter Version 1 steht, kommt auf die Später-Liste, sichtbar für alle. | Version-1-Liste bestätigt, Später-Liste begonnen |
| 0:55–1:15 | Abnahmekriterien | Für jeden Version-1-Punkt gemeinsam Prüfschritt und erwartetes Ergebnis formulieren. Frage: „Was klicken Sie am Abnahmetag, und was muss dann passieren?" | Entwurf Anlage A mit 8–10 Zeilen |
| 1:15–1:25 | Zugänge, Personen, Termine | Zugangs-Liste abhaken, was fehlt, mit Name und Datum. Ansprechpartner + Vertreter. Demo-Freitage und Abnahmetermin bestätigen. Feedback-Regel „2 Arbeitstage" erklären. | Offene Zugänge mit Verantwortlichem und Datum |
| 1:25–1:30 | Nächste Schritte | Du schickst heute Abend: Protokoll, Anlage A zur Unterschrift bis Tag 3, Später-Liste, Zugangs-Liste. Erster Demo-Freitag: Grundgerüst mit Login und Datenmodell. | Alle wissen, was bis Tag 3 passiert |

Sätze, die du im Kick-off brauchst:

- Wenn ein neuer Wunsch kommt: „Guter Punkt. Version 1 oder Später? Wenn Version 1: Was fliegt dafür raus?"
- Wenn „das soll einfach intuitiv sein": „Was klicken Sie, und was muss dann passieren? Das schreiben wir als Prüfschritt auf."
- Wenn die Anbindung wieder aufkommt: „Die Anbindung prüfe ich in Woche 3 gegen Ihre Schnittstelle und biete sie fest an. Im Festpreis ist sie erst, wenn ich weiß, dass sie geht."
- Zum Schluss: „Ab Tag 3 baue ich nur, was auf Anlage A steht. Alles andere ist auf der Später-Liste und geht nicht verloren."

Am selben Abend verschicken (Vorlage):

```
Betreff: Kick-off [Projekt] — Protokoll, Abnahmekriterien zur Unterschrift bis [Mi, 30.09.]

Hallo [Name],

danke für heute. Anbei:
1. Protokoll (1 Seite) mit Ziel, Ablauf und Version-1-Liste.
2. Anlage A — Abnahmekriterien, [9] Punkte. Bitte prüfen und bis [Mi, 30.09.] unterschrieben zurück. Ab dann baue ich genau danach.
3. Später-Liste ([5] Punkte). Nichts davon ist verloren, nichts davon ist in Version 1.
4. Offene Zugänge: [Excel-Anlagenliste — Frau X — bis 30.09.] · [Testzugang System — Herr Y — bis 30.09.].

Erster Demo-Freitag: [Fr, 02.10., 14:00], Link folgt. Sie sehen dann Login, Rollen und die Grundstruktur mit Ihren Anlagen.

Viele Grüße
Moritz Schumacher
```

### 3.3 Woche 1–4

Rhythmus pro Woche: **Dienstag 08:00 Abstimmung (30 Min)** mit dem Ansprechpartner, **Freitag 14:00 Demo-Freitag (30 Min)** mit Ansprechpartner + Nutzer. Beide Termine haben eine feste Struktur; Protokoll ist eine E-Mail mit fünf Zeilen.

Abstimmung Dienstag (30 Min):
1. Stand gegen Anlage A: welche Kriterien sind grün, gelb, rot (5 Min).
2. Offene Fragen von dir, mit Entscheidung im Termin (15 Min). Keine Frage geht ohne Antwort aus dem Termin.
3. Feedback vom Demo-Freitag: übernommen / Später-Liste (5 Min).
4. Mitwirkung: was brauchst du bis Freitag (5 Min).

Demo-Freitag (30 Min): klickbarer Stand auf der Testumgebung, der Nutzer klickt selbst, du schaust zu. Rückmeldung bis Dienstag (2 Arbeitstage). Nach jedem Demo-Freitag die E-Mail: „Was Sie heute gesehen haben · Was bis nächsten Freitag kommt · Was ich von Ihnen brauche."

| Woche | Ziel bis Demo-Freitag | Intern (für dich) | Checkliste |
|---|---|---|---|
| **1** [28.09.–02.10.] | Login mit Rollen, Datenmodell, Grundnavigation, importierte Kundendaten (Rohform), erster Bildschirm des Kernablaufs | Anlage A unterschrieben bis Tag 3, sonst Stopp und Nachfrage. Starter-Kit statt Neubau. Zugänge geprüft. | [ ] Anlage A unterschrieben  [ ] Zugänge vollständig (sonst Fristverschiebung schriftlich festhalten)  [ ] Datenimport läuft  [ ] Deployment auf Testumgebung automatisch  [ ] Stunden getrackt |
| **2** [05.10.–09.10.] | Kernablauf durchgängig (Erfassen → Bearbeiten → Ausgabe), mit echten Testdaten des Kunden | Bis Freitag **Feedback-Freeze**: letzter Tag für Tausch-Änderungen an Anlage A. Anbindung (falls Phase 2): Schnittstelle prüfen, Festpreis für Phase 2 formulieren. | [ ] Kernablauf end-to-end klickbar  [ ] Echte Testdaten drin  [ ] Feedback-Freeze per Mail bestätigt  [ ] Stundenstand gegen Plan: liegt Bau über 60 h nach Woche 2, Warnsignal (Review: Bau 60–90 h all-in) |
| **3** [12.10.–16.10.] | Alle Version-1-Punkte vorhanden; PDF/Export/Rollen/Fehlerfälle; erster eigener Durchlauf aller 10 Kriterien | Sicherheits-Checkliste (HTTPS, Rollen-Test, Abhängigkeits-Scan, Secrets, Backup eingerichtet und Restore einmal getestet). Betriebsanleitung beginnen. | [ ] 10/10 Kriterien intern grün oder mit Restliste  [ ] Scan-Bericht liegt vor  [ ] Backup + Restore getestet  [ ] Betriebsanleitung Entwurf |
| **4** [19.10.–23.10.] | Freitag: Bereitstellung zur Abnahme, Version-Tag, Anlage A intern komplett grün | Doku fertig, Übergabe-Paket vorbereitet (3.4), Abnahmeprotokoll vorausgefüllt, Rechnung 2. Rate vorbereitet. Kein neues Feature mehr, nur Kriterien. | [ ] Version-Tag v1.0.0  [ ] Abnahmeprotokoll vorausgefüllt  [ ] Übergabe-Paket vollständig  [ ] Termin Mo bestätigt |
| **5 (Reserve)** [26.10.–06.11.] | Abnahmetermin Montag; Nachfrist bis Fr 06.11. für A-Mängel | Diese Woche ist im Angebot als Nachfrist sichtbar, intern ist sie dein Puffer. Wenn du sie nicht brauchst: Referenz-Zitat und Screenshot-Freigabe noch im Abnahmetermin einholen. | [ ] Abnahme erteilt  [ ] Rechnung 2. Rate raus  [ ] Übergabe erledigt  [ ] Referenz-Freigabe  [ ] Stunden-Auswertung je Phase |

Wenn etwas kippt:

- **Zugänge fehlen nach Tag 3:** noch am Tag 4 E-Mail: „Ohne [Zugang] kann ich [Kriterium Nr.] nicht bauen. Der Zeitplan verschiebt sich um jeden Tag Verzögerung, aktuell neuer Abnahmetermin: [Datum]." Nicht drohen, nur rechnen. Das ist die Fristverlängerung aus Angebot Abschnitt 9.
- **Kunde will nach dem Freeze etwas Neues:** „Kommt auf die Später-Liste. Nach der Abnahme machen wir das als Änderungstag im Betriebspaket oder als eigenes Festangebot." Ausnahmslos.
- **Du merkst in Woche 2, dass ein Kriterium nicht zu halten ist:** sofort sagen, Tausch anbieten (Kriterium raus, kleineres rein), schriftlich in Anlage A nachziehen. Vor dem Freeze ist das ein Tausch, nach dem Freeze ist es dein Problem.
- **Anbindung frisst Zeit:** Das ist laut allen Gutachtern der wahrscheinlichste Grund, dass vier Wochen zu acht werden. Deshalb steht sie in Version 1 nur mit getesteter Schnittstelle. Wenn du sie trotzdem drin hast und sie kippt: Kriterium so umformulieren, dass es die reale Schnittstelle abbildet (z. B. „Datei-Import täglich" statt „Live-Sync") — vor dem Freeze.

### 3.4 Übergabe-Checkliste

Übergabe am Abnahmetag, im Termin, nicht per Nachreichung. Alles in einem Übergabe-Ordner (Repo-Wiki oder PDF-Paket), Zugangsdaten nie per E-Mail, sondern per Passwort-Manager-Freigabe oder persönlich.

**Repository**
- [ ] Repo liegt in der Kunden-Organisation oder der Kunde ist Owner; du bist Collaborator (bei Betriebspaket) oder wirst entfernt (ohne Betriebspaket).
- [ ] Version-Tag v1.0.0 = abgenommener Stand.
- [ ] README: Zweck, Stack, lokal starten in 5 Befehlen, Deployment, Umgebungsvariablen (ohne Werte).
- [ ] Lizenzliste der Open-Source-Komponenten (automatisch erzeugt).
- [ ] Keine Zugangsdaten im Verlauf (Scan gelaufen).
- [ ] Automatischer Test-Lauf und Deployment laufen in der Kunden-Org.

**Zugänge**
- [ ] Hosting-Konto: Kunde ist Eigentümer/Admin, Rechnungsadresse des Kunden hinterlegt (auch bei Betriebspaket: Kunde Eigentümer, du Admin).
- [ ] Domain/DNS: Einträge dokumentiert, Kunde hat Zugang.
- [ ] Datenbank: Zugangsdaten übergeben, rotiert nach Übergabe.
- [ ] E-Mail-Versand, Speicher, Drittdienste: Konten auf Kunde, Schlüssel übergeben.
- [ ] Admin-Nutzer der Anwendung: Kunde hat mindestens einen, 2FA aktiviert.
- [ ] Alle Zugänge in einem geteilten Tresor (z. B. Bitwarden-Organisation des Kunden).

**Dokumentation** (maximal 6 Seiten, sonst liest sie niemand)
- [ ] Betriebsanleitung (2 Seiten): Wo läuft was, wie sehe ich, ob es läuft, was tue ich bei Störung (Runbook: Neustart, Sicherung einspielen, Logs finden), wen rufe ich an.
- [ ] Architektur-Skizze (1 Seite): Komponenten, Datenflüsse, externe Systeme.
- [ ] Datenmodell (1 Seite): Tabellen und Beziehungen.
- [ ] Nutzeranleitung (1–2 Seiten pro Rolle, mit Screenshots) — oder ein 5-Minuten-Video pro Rolle.
- [ ] Sicherung: Was wird wann gesichert, wo liegt es, wie lange, Restore-Test dokumentiert mit Datum.
- [ ] Später-Liste als Anhang: das ist die Grundlage für den nächsten Auftrag.

**Betrieb**
- [ ] Betriebspaket gewählt (290 / 990 / keines) und schriftlich bestätigt, Startdatum, monatlich kündbar.
- [ ] Monitoring aktiv (Erreichbarkeit, Fehlerrate), Alarm geht an [dich / Kunde].
- [ ] Update-Rhythmus vereinbart (Sicherheits-Updates monatlich, Hinweis vorab).
- [ ] Ohne Betriebspaket: Kunde hat einen benannten Ansprechpartner für Hosting-Rechnungen und Domain-Verlängerung; Restore einmal gemeinsam durchgespielt. Thomas-Persona: „Der Code gehört Ihnen — und dann liegt er bei mir wie ein Motor ohne Werkstatt." Die Antwort ist das Betriebspaket, und das verkaufst du im Abnahmetermin.

**Recht und Abschluss**
- [ ] Abnahmeprotokoll unterschrieben (beide Seiten).
- [ ] Rechnung 2. Rate am selben Tag, Zahlungsziel 14 Tage.
- [ ] Rechteübertragung wirksam mit Zahlungseingang (steht im Angebot) — Erinnerung im Kalender.
- [ ] AVV unterschrieben, falls personenbezogene Daten. **[Anwalt]**
- [ ] Referenz-Freigabe (Name, Logo, Zitat, Screenshots, Referenzgespräch) schriftlich eingeholt.
- [ ] Gewährleistungsbeginn = Abnahmedatum, Ende in 24 Monaten, im Kalender.
- [ ] Stunden-Auswertung: Ist-Stunden je Phase gegen Festpreis; effektiver Stundensatz notiert. Nach drei Projekten entscheidest du damit über Preise und Bausteinkorridore.

---

## 4. Punkte für den Anwalt

Du beauftragst einen Anwalt für IT-Recht mit: (a) AGB, (b) Angebotsvorlage aus Abschnitt 1, (c) Anlage-A-Regeln, (d) Abnahmeprotokoll. Budget laut Review 800–1.500 €. Die Punkte unten sind deine Checkliste für das Gespräch — mit dem, was du willst, damit der Anwalt nicht „übliche AGB" liefert, sondern dein Modell absichert. Alle Paragraphenangaben sind Laienstand und vom Anwalt zu prüfen.

### 4.1 Vertragstyp: Werkvertrag (§ 631 BGB)

- Du schuldest einen Erfolg (Version 1 gemäß Anlage A), nicht Bemühen. Das ist gewollt: Nur so trägt „Besteht die Abnahme nicht, entfällt die zweite Rate".
- Klarstellen lassen, ob der Vertrag als Werkvertrag oder Werklieferungsvertrag (§ 650 BGB, Kaufrecht-Anteile) eingeordnet wird und was das für Abnahme und Gewährleistung bedeutet.
- Das Angebot ist eine Individualvereinbarung, die AGB sind nachrangig. Vorrangregel („Bei Widerspruch geht dieses Angebot vor") prüfen lassen.
- Frage an den Anwalt: Sollen Betriebspaket (Dauerschuldverhältnis, eher Dienst-/Mietvertrag) und Werkvertrag zwei getrennte Verträge sein? Vermutlich ja.

### 4.2 Abnahme (§ 640 BGB)

- Abnahmekriterien als Vertragsbestandteil, die nach Vertragsschluss (bis Tag 3) nachgereicht werden — rechtssicher formulieren (Anlage A als „Konkretisierung des vereinbarten Umfangs", Regelung für den Fall, dass der Kunde nicht unterschreibt: dann gilt dein zugesandter Entwurf, wenn der Kunde nicht binnen 5 Arbeitstagen schriftlich widerspricht?).
- **Abnahmefiktion § 640 Abs. 2 BGB**: Abnahme gilt als erfolgt, wenn du eine angemessene Frist gesetzt hast und der Kunde nicht unter Angabe mindestens eines Mangels verweigert. Deine Frist (5 Arbeitstage nach Bereitstellung) und die Formulierung im Angebot prüfen lassen; ebenso die konkludente Abnahme durch Produktivnutzung.
- Mängelklassen A/B/C: Abnahme darf wegen unwesentlicher Mängel nicht verweigert werden (§ 640 Abs. 1 S. 2). Deine B/C-Definition soll genau das abbilden.
- Nachfrist 10 Arbeitstage (§ 323 / § 636 BGB): Sicherstellen, dass die vertragliche Nachfrist die gesetzliche Systematik nicht zu deinen Lasten verkürzt.
- **Die eine Zusage**: „Zweite Rate entfällt" rechtlich sauber fassen — als auflösend bedingter Vergütungsanspruch? Was gilt für die Rechte am bis dahin Gebauten (Empfehlung: Rechteübergang nur bei vollständiger Zahlung, Kunde bekommt bei Nichtabnahme keinen Code)? Was gilt, wenn die Nichtabnahme auf fehlender Mitwirkung beruht (dann muss die Rate fällig bleiben)? Was gilt bei Kündigung des Kunden vor Abnahme (§ 648 BGB: vereinbarte Vergütung abzüglich ersparter Aufwendungen — willst du das, oder eine einfachere Pauschale)?
- Konsistenz: Website, FAQ, Angebot und AGB müssen denselben Satz tragen. Der Gründer-Risiko-Gutachter hat drei Fassungen gefunden („kostet es nichts" / „zweite Hälfte entfällt" / „alles wird erstattet"). Eine Wahrheit: zweite Rate entfällt, erste Rate bleibt.

### 4.3 Gewährleistung (§ 634a BGB)

- 24 Monate ist die gesetzliche Verjährungsfrist für Werke dieser Art (§ 634a Abs. 1 Nr. 1 — prüfen lassen, ob Software hier als „Sache" gilt). Du versprichst also nichts über das Gesetz hinaus — und darfst es entsprechend nicht als „Garantie" bewerben (Agenturinhaber-Persona: „‚12 Monate Garantie' ist weniger, als mir das Gesetz beim Werkvertrag gibt"). Wortwahl überall: **Gewährleistung**.
- Gewährleistung inhaltlich auf Abweichungen von Anlage A begrenzen (Beschaffenheitsvereinbarung § 633 Abs. 2 S. 1). Klarstellen, dass Änderungen am Code durch den Kunden oder Dritte, Änderungen an angebundenen Systemen und Betrieb außerhalb der dokumentierten Umgebung die Gewährleistung für die betroffenen Teile ausschließen.
- Reaktions- und Behebungszeiten (nächster Arbeitstag / 5 Arbeitstage) als Service-Zusage, nicht als Garantie im Sinne § 443 BGB.
- Betriebspaket: Sicherheits-Updates gehören zum Betrieb (Dienstleistung), nicht zur Gewährleistung. Abgrenzung schriftlich.
- Rücklage 8–10 % je Projekt ist keine Rechtsfrage, aber der Anwalt sollte wissen, dass dein Modell sie vorsieht.

### 4.4 Rechte am Code (§§ 31, 69a ff. UrhG)

- Kunde erhält ausschließliches, unbeschränktes Nutzungsrecht an Version 1 (projektspezifischer Code) inkl. Bearbeitung, Weitergabe, Unterlizenzierung. Rechteübergang aufschiebend bedingt durch vollständige Zahlung (§ 158 BGB).
- **Starter-Kit / Bausteine:** Du musst Auth, Rollen, PDF-Erzeugung, ERP-Adapter-Skelett, Deployment in jedem Projekt wiederverwenden. Also: Kunde erhält an diesen Teilen ein einfaches, unbeschränktes Nutzungsrecht, du behältst das Recht zur Weiterverwendung. Das ist der Delivery-Fabrik-Punkt des Agentur-Gutachters. Formulierung so, dass sie für den Kunden nicht wie ein Lock-in klingt („Sie dürfen alles, nur nicht mir verbieten, meine eigenen Bausteine wiederzuverwenden").
- Open Source: Lizenzliste als Anlage; Copyleft-Lizenzen (GPL) im Kundenprojekt vermeiden, MIT/Apache/BSD sind unkritisch — Anwalt soll das bestätigen.
- AI-generierter Code: Urheberrecht setzt menschliche Schöpfung voraus. Klären, wie der Vertrag mit Teilen umgeht, die keinen urheberrechtlichen Schutz genießen (Nutzungsrechtseinräumung „soweit Rechte bestehen", plus vertragliches Nutzungs- und Weitergaberecht unabhängig vom Urheberrechtsschutz).
- Recht zur Referenznennung (Name, Logo, Screenshots, Zitat, Referenzgespräch) als eigene, widerrufliche Einwilligung mit Nachlass-Gegenleistung.
- Deine Nebentätigkeit: Prüfen, ob dein Arbeitsvertrag (§ 69b UrhG, Wettbewerbsklauseln) die Rechteübertragung an Kunden überhaupt erlaubt — vor dem ersten Vertrag, nicht danach. (gruender-risiko, coreMeasures[0])

### 4.5 Mitwirkung, Haftung, Daten

- Mitwirkungspflichten (Ansprechpartner, 2 Arbeitstage, Zugänge bis Tag 3) als echte Vertragspflicht oder Obliegenheit mit Rechtsfolgen: Fristverschiebung automatisch; nach 10 Arbeitstagen Stillstand Kündigungsrecht und Vergütung der erbrachten Leistung (§§ 642, 643 BGB).
- Haftungsbegrenzung: In B2B-AGB sind Begrenzungen auf den Auftragswert angreifbar (§ 307 BGB, Kardinalpflichten). Der Anwalt soll eine haltbare Fassung liefern (Vorsatz/grobe Fahrlässigkeit unbegrenzt, leichte Fahrlässigkeit auf vertragstypischen, vorhersehbaren Schaden, Deckungssumme der Haftpflicht als Referenz). Voraussetzung: UG und IT-Haftpflicht stehen (gruender-risiko: Versicherung 600–1.500 €/Jahr, UG 300–500 € Notar/Register).
- Datensicherung: Kunde ist für seine Daten verantwortlich, außer im Betriebspaket — dort definierter Umfang (täglich, 30 Tage Aufbewahrung, Restore-Zeit).
- AVV nach Art. 28 DSGVO als Vorlage, wenn du im Betriebspaket personenbezogene Daten verarbeitest. Hosting-Region EU festschreiben.
- NDA-Vorlage (gegenseitig, kurz) für Kunden, die vor dem Beratungsgespräch eine wollen (Sabine-Persona: „NDA-Bereitschaft").
- Vertragssprache Deutsch, Gerichtsstand [dein Sitz], Schriftform für Änderungen (Textform/E-Mail reicht).

### 4.6 Was du dem Anwalt mitgibst

- [ ] Dieses Dokument.
- [ ] Aktuelle AGB aus dem Repo (Hinweis: dort steht noch „alles wird erstattet" — soll auf „zweite Rate entfällt" gehen).
- [ ] Website-Texte zu Zusage, Gewährleistung, Code-Eigentum (FAQ, Landing) — sie müssen mit dem Vertrag übereinstimmen.
- [ ] Deinen Arbeitsvertrag (Nebentätigkeit, IP, Wettbewerb).
- [ ] Die Frage, ob UG-Gründung vor dem ersten Angebot zwingend ist (Antwort der Gutachter: ja).

---

## Anhang A — Später-Liste / Änderungswunsch (Vorlage)

Führst du ab dem Kick-off im Repo-Wiki oder als geteiltes Dokument. Jeder Wunsch bekommt eine Zeile, keiner wird diskutiert, ob er „doch noch reinpasst".

```markdown
# Später-Liste — [Projekt]

| Nr. | Wunsch (in Kundenworten) | Von | Datum | Größe (S/M/L) | Weg | Status |
|---|---|---|---|---|---|---|
| 1 | „Der Kunde soll das Protokoll auch selbst im Portal abrufen können" | [Name] | 02.10. | L | Folgeauftrag (Kundenportal) | offen |
| 2 | „Farbe der Warnung kräftiger" | [Name] | 09.10. | S | Änderungstag Betrieb 990 | offen |
| 3 | | | | | | |

Wege: Tausch (nur bis Feedback-Freeze [Datum], 1:1 gegen ein Kriterium aus Anlage A) · Änderungstag (Betriebspaket 990, 8 h/Monat) · Folgeauftrag (eigenes Festangebot, Bausteinpreise) · verworfen
```

## Anhang B — Tausch-Vereinbarung (bis Feedback-Freeze)

```
Betreff: Tausch in Anlage A — [Projekt]

Hallo [Name],

wie besprochen tauschen wir in Anlage A:
- Raus: Kriterium Nr. [6] „[Export als Excel]"
- Rein: Kriterium Nr. [6] neu „[Export als CSV mit Spalten …]"
Prüfschritt: [ … ] · Erwartetes Ergebnis: [ … ]

Festpreis und Termine bleiben unverändert. Bitte bestätigen Sie mit kurzer Antwort; ab dann gilt Anlage A in der Fassung vom [Datum].

Viele Grüße
Moritz Schumacher
```

## Anhang C — Stunden-Tracking (Struktur)

Eine Tabelle pro Projekt, ab der ersten Beratungsminute:

| Datum | Phase (Verkauf / Kick-off / Bau / Anbindung / Abnahme / Gewährleistung) | Stunden | Notiz |
|---|---|---|---|

Auswertung nach Abnahme: Summe je Phase, Festpreis / Summe = effektiver Stundensatz. Review-Bandbreite als Vergleich: 79 €/h (9.500 €/120 h) bis 108 €/h (13.000 €/120 h) laut gruender-risiko; bei 20.500 € Festpreis und 120 h wären es ~170 €/h. Liegt der Bau nach Woche 2 über 60 h oder die Anbindung allein über 25 h, ist das dein Signal, den Bausteinpreis im nächsten Angebot am oberen Korridorrand anzusetzen.

# Sales-Leitfaden: Das 30-Minuten-Beratungsgespräch

> Stand 2026-09-08. Gilt für jedes Gespräch, das über den KI-Berater oder direkt über /termin gebucht wurde.
> Zahlen in diesem Dokument stammen aus dem Vollreview (review.json, fünf Gutachter) oder aus dem Angebot selbst. Nichts ist erfunden. Wo ein Wert eine Annahme ist, steht „Annahme".

---

## 0. Fünf Regeln, die über allem stehen

1. **Du verkaufst eine Entscheidung, keine Software.** 40–60 % qualifizierter B2B-Deals enden in „keine Entscheidung", nicht beim Wettbewerber (JOLT-Studie, siehe docs/VERKAUFSSYSTEM.md). Dein Gegner ist das Einfrieren des Kunden. Rezept: eine klare Empfehlung aussprechen, die Auswahl begrenzen, das Risiko vom Tisch nehmen. Nicht: mehr Argumente, mehr Druck.
2. **Du bist einer, mit KI. Sag es, bevor er fragt.** Die Fassade ist gestrichen. Jede Sekunde, in der der Kunde denkt, er spricht mit einem Team, ist eine Sekunde, in der er sich später betrogen fühlt.
3. **Der Richtpreis aus dem KI-Berater ist bindend nach oben.** Festangebot = Richtpreis, es sei denn, der Umfang hat sich im Gespräch nachweislich geändert — dann sagst du im Gespräch, welche Zeile sich ändert und warum. Ein Festangebot über der Schätzung ohne Erklärung ist ein Lockvogel und kostet die Referenz, die du brauchst.
4. **Der Kunde redet 60 %, du 40 %.** In den ersten zehn Minuten redet er 80 %.
5. **Jedes Gespräch endet mit genau einem der drei nächsten Schritte** (Abschnitt 5). „Ich melde mich mal" ist keiner davon.

Und die Wahrheit im Hinterkopf, aus dem Review: Ohne Referenzen liegt Angebot→Abschluss bei Kalt-Leads bei **10–15 %**, mit zwei belegten Fällen bei **25–35 %** (agentur-operator). Deine ersten drei Projekte sind keine Umsatzprojekte, sie sind Beweisprojekte. Führe jedes Gespräch so, dass der Kunde entweder Kunde wird oder dir sagt, warum nicht.

---

## 1. Vorbereitung — 5 Minuten vor dem Call

Du hast aus der Buchung: die Lösungsskizze (Titel, Soll-Ablauf, Annahmen, offene Punkte), die `priceItems` (Herleitung Zeile für Zeile), den Umfang (`scope`), den Wochenplan (`weeks`), gegebenenfalls `savings` (Personentage/Woche aus Kundenangaben; Euro-Betrag wird serverseitig mit 45 Wochen × 300 € gerechnet), dazu Name, Rolle, Firmengröße, Branche.

Checkliste (in dieser Reihenfolge, 5 Minuten reichen):

- [ ] **Skizze lesen, laut in einem Satz zusammenfassen.** Das ist dein Eröffnungssatz. Beispiel: „Sie haben beschrieben: Prüfprotokolle für Elektroanlagen entstehen heute auf Papier, werden abends abgetippt, und drei Monteure warten auf Freigaben per Telefon."
- [ ] **priceItems auf Karte schreiben.** Grundprodukt 12.500 € + je Baustein eine Zeile. Prüfen: Ist eine Zeile im unteren, mittleren oder oberen Bereich der Spanne? Warum? Das musst du in einem Satz begründen können (Abschnitt 3.4).
- [ ] **Offene Punkte / Annahmen der Skizze markieren.** Das sind deine Fragen für Minute 3–10. Typisch: Welches System genau (Sage, Lexware, DATEV, eigenes ERP)? Gibt es eine dokumentierte Schnittstelle? Wer sind die Nutzergruppen wirklich? Gibt es Altdaten?
- [ ] **Einen Rausschmeiß-Kandidaten notieren.** Welche Zeile aus der Skizze würdest du für Version 1 streichen, wenn der Kunde am Preis hängt? (Meist: Datenübernahme oder zweite Nutzergruppe.) Du brauchst diesen Vorschlag fertig, nicht improvisiert.
- [ ] **Passt der Fall überhaupt?** Sicherheitskritische Steuerung, Medizinprodukt, komplette ERP-Ablösung → freundliches Nein vorbereiten (Abschnitt 5.3). Nicht das Gespräch absagen, aber in Minute 3 klären.
- [ ] **Firma 60 Sekunden googeln.** Website, Mitarbeiterzahl, Branche, ob die Person Entscheider ist (GF/Inhaber/Bereichsleiter) oder Vorprüfer (IT-Leiter, Einkauf, Assistenz). Bei Vorprüfer: Ziel des Gesprächs ist der Termin mit dem Entscheider, nicht der Abschluss.
- [ ] **Kalender prüfen:** Kann Kick-off am angezeigten Montag wirklich stattfinden? Wenn nicht (laufendes Projekt, Urlaub): den ehrlichen Montag parat haben. Der Kunde hat „Live am [Datum]" gesehen — ein anderer Termin ist okay, ein stillschweigend anderer nicht.
- [ ] **Notizblatt anlegen** mit den 5 Protokollfragen für danach (Abschnitt 6.1). Das dauert 20 Sekunden und erspart dir, es hinterher zu vergessen.

Nicht tun: Folien. Demo. Kundenwebsite kritisieren. Mehr als 5 Minuten vorbereiten — der Kunde hat sich über den Berater selbst qualifiziert, das reicht.

---

## 2. Minutenplan

| Min | Phase | Ziel | Du redest |
|---|---|---|---|
| 0–2 | Eröffnung | Rahmen setzen, Skizze bestätigen, Vorprüfer/Entscheider klären | 70 % |
| 2–10 | Ihr Ablauf heute | Verstehen, was es kostet, wer betroffen ist, was schon versucht wurde | 20 % |
| 10–20 | Zuschnitt Version 1 | Gemeinsam festlegen, was in vier Wochen live geht — und was nicht | 50 % |
| 20–27 | Preis, Ablauf, nächster Schritt | Festpreis nennen und schweigen; Zahlung, Abnahme, Zeitplan; Einwände | 50 % |
| 27–30 | Abschluss | Einen der drei Schritte vereinbaren, Termin für Angebot fixieren | 70 % |

Timer sichtbar laufen lassen. Bei Minute 20 ohne Preis: Phase 3 abbrechen und zum Preis springen. Der Preis ist der Grund, warum er hier ist.

---

## 3. Das Gespräch im Wortlaut

### 3.1 Eröffnung (0–2 Min)

Kamera an, Vollbild auf dich, nicht auf Folien. Erste Sätze:

> „Herr/Frau [Name], danke für die Zeit. Ich bin Moritz Schumacher, ich baue das, worüber wir gleich sprechen, selbst — mit KI als Werkzeug, aber ich bin die Person, die dafür geradesteht. Wir haben 30 Minuten. Mein Vorschlag: Zehn Minuten Ihr Ablauf heute, zehn Minuten legen wir gemeinsam fest, was in vier Wochen live gehen soll, und dann bekommen Sie von mir einen Preis, den ich nachher auch so ins Angebot schreibe. Passt das?"

Dann die Skizze in einem Satz (aus der Vorbereitung):

> „Der KI-Berater hat aufgeschrieben: [Ein-Satz-Zusammenfassung]. Stimmt das so, oder was fehlt?"

Wenn die Person nicht der Entscheider ist:

> „Wer entscheidet bei Ihnen am Ende, ob so etwas gebaut wird — Sie, oder gibt es noch jemanden, den wir einbeziehen sollten?"

Antwort merken. Wenn „mein Chef" oder „die GF": Ziel des Gesprächs ändert sich zu „Angebot, das die Person intern weitertragen kann" + Folgetermin mit Entscheider. Sag das offen: „Dann machen wir das so, dass Sie am Ende ein Blatt haben, das Sie [Chef] auf den Tisch legen können."

Warum das wirkt: Du hast in 40 Sekunden den Rahmen gesetzt (Konsistenz: wer „Passt das?" bejaht, folgt dem Plan), die Einzelperson offengelegt (Blemishing: ein zugegebener Nachteil macht alles andere glaubwürdiger) und den Kunden zum Korrigieren eingeladen (er redet ab Sekunde 60).

### 3.2 Ihr Ablauf heute (2–10 Min)

Ziel: Der Kunde beschreibt den Schmerz in eigenen Worten und beziffert ihn. Du fragst, hörst, notierst. Keine Lösung in dieser Phase, auch wenn sie offensichtlich ist.

Die Fragen, in dieser Reihenfolge, nur die stellen, die die Skizze offen lässt:

1. **Der Ablauf.** „Gehen Sie das einmal mit mir durch: Ein [Auftrag/Protokoll/Bestellung] kommt rein — was passiert dann, Schritt für Schritt, und wer fasst es an?"
2. **Die Menge.** „Wie oft am Tag oder in der Woche passiert das?" — Zahl notieren. Ohne Zahl kein Status-quo-Anker.
3. **Die Zeit.** „Wie viel Zeit steckt da pro Woche drin, über alle Beteiligten? Grob reicht — halbe Tage, ganze Tage?" — Wenn der Kunde zögert: „Wenn Sie es schätzen müssten: eher ein halber Tag pro Woche oder eher zwei?"
4. **Der Fehlerfall.** „Und wenn dabei etwas schiefgeht — was passiert dann? Was war das Letzte, das schiefgegangen ist?" (Hier kommt die Geschichte, die den Kunden wirklich hergebracht hat.)
5. **Die Systeme.** „Wo liegen die Daten heute — welche Software, welche Excel-Dateien, welche Zettel? Hat [System] eine Schnittstelle, die Ihr Dienstleister kennt?"
6. **Das Vorher.** „Haben Sie schon einmal versucht, das zu lösen — fertige Software, Agentur, jemand intern? Was ist daraus geworden?" (Bei „ERP für 80.000 € versenkt": das ist die Angst, gegen die du in Phase 4 verkaufst. Notieren.)
7. **Die Beteiligten.** „Wer muss das nachher benutzen — und wer muss es freigeben? IT, Einkauf, Geschäftsführung, Datenschutzbeauftragter?"

Zwischenrechnung laut machen, sobald du Zahl 2 und 3 hast:

> „Nur damit ich es richtig verstehe: Etwa [X] Personentage pro Woche, das sind über das Jahr rund [X × 45] Tage. Bei [300 € Annahme / oder: was kostet Sie ein Arbeitstag inklusive allem — 300, 400 €?] sind das etwa [Betrag] € im Jahr — jedes Jahr. Richtig?"

Der Kunde korrigiert oder bestätigt. Beides ist gut. Ab jetzt hat der Preis einen Bezugspunkt, den der Kunde selbst geliefert hat (Konsistenz: er hat die Zahl bestätigt, er wird sie später nicht kleinreden; Verlustaversion: der Status quo kostet jedes Jahr, die Lösung einmal).

Was du in dieser Phase nicht sagst: „Das kann ich lösen." „Das haben wir oft." „Das ist ein klassischer Fall." Du kennst noch keinen anderen Fall. Sag stattdessen: „Verstanden."

### 3.3 Zuschnitt Version 1 — gemeinsam (10–20 Min)

Kernregel: **Vorschlagen, nicht abfragen.** Ein Kunde, den du fragst „Was soll die Software können?", nennt zwölf Dinge und schaut dann auf den Preis. Ein Kunde, dem du sagst „Ich schlage vor, Version 1 macht genau diese vier Dinge", diskutiert über vier Dinge.

Übergang:

> „Gut. Dann schlage ich Ihnen vor, was ich als Version 1 bauen würde — das, was in vier Wochen live geht und Ihnen den größten Teil der [Betrag] € zurückholt. Sie sagen mir, wo ich falsch liege."

Dann in drei Spalten, laut und wenn möglich am Bildschirm geteilt (Notizdatei, kein Design-Tool):

**Spalte 1 — Version 1 (in vier Wochen live).** Maximal 4–6 Punkte, in Kundensprache, jeweils ein Satz. Beispiel Prüfprotokolle:
- Monteur füllt Protokoll auf dem Telefon aus, auch ohne Netz auf der Baustelle.
- Protokoll wird als PDF mit Unterschrift erzeugt und liegt zentral ab.
- Büro sieht alle offenen und fertigen Protokolle in einer Übersicht.
- Kundenname und Anlage kommen aus [Warenwirtschaft], nicht per Hand.

**Spalte 2 — Später (Version 2, nach Live).** Alles, was der Kunde nennt und das nicht in Spalte 1 muss. Nichts davon wird abgelehnt, alles wird geparkt. Wortlaut: „Das kommt in die zweite Spalte — nicht weil es unwichtig ist, sondern weil es nicht im Weg stehen soll, wenn die ersten vier Dinge live gehen."

**Spalte 3 — Nicht (bewusst).** Was du nicht baust, weil es fertige Software besser kann oder weil es außerhalb liegt (Buchhaltung, Lohn, Steuer, komplettes ERP). Wortlaut: „Das würde ich nicht bauen. Dafür gibt es [DATEV/Lexware/…], und ein Nachbau wäre teurer und schlechter."

Zu jedem Punkt in Spalte 1 eine Frage, die den Preis bewegt, keine, die ihn nicht bewegt:

- Anbindung: „Gibt es zu [System] eine Schnittstellendokumentation oder einen Ansprechpartner beim Hersteller?" (Ja → unterer Wert der Spanne 2.500–5.000. Nein/„weiß nicht" → mittlerer Wert. „Das ist eine Eigenentwicklung von 2009" → oberer Wert, und du sagst das.)
- Zweite Nutzergruppe: „Sollen [Kunden/Monteure/Lieferanten] selbst hineinschauen — oder reicht es, wenn sie eine E-Mail bekommen?" (E-Mail reicht → Baustein streichen, 1.500–2.500 gespart.)
- Datenübernahme: „Müssen die alten [Protokolle/Aufträge] mit hinein, oder reicht es, ab Live neu zu beginnen und das Alte im Archiv zu lassen?" (Meist reicht es. 1.500–3.500 gespart.)
- Mobil/offline: „Wo wird das benutzt — im Büro am Rechner, oder unterwegs auf Baustellen ohne Netz?"
- PDF: „Muss ein Dokument dabei herauskommen, das jemand unterschreibt oder das der Kunde bekommt?"
- AI-Funktion: nur ansprechen, wenn der Kunde es selbst nennt oder ein klarer Nutzen da ist (Texterkennung aus Papierprotokollen, Zusammenfassung). Nicht als Schmuck verkaufen.

Abnahmekriterien schon hier anreißen — das ist die persönliche Absicherung des Entscheiders:

> „Damit wir beide wissen, wann es fertig ist: Ich schreibe ins Angebot höchstens zehn Sätze, die am Ende wahr sein müssen. Zum Beispiel: ‚Ein Monteur kann ein Protokoll ohne Netz ausfüllen, und es liegt spätestens beim nächsten Netzkontakt im Büro.' Wenn die zehn Sätze stimmen, ist es abgenommen. Wenn nicht, zahlen Sie die zweite Hälfte nicht. Welche drei Sätze wären Ihnen die wichtigsten?"

Der Kunde nennt sie. Du hast damit drei Abnahmekriterien vom Kunden selbst — und er hat gerade zum ersten Mal über Abnahme gesprochen, als sei der Auftrag schon erteilt (Konsistenz, ohne Trick: er hat es selbst formuliert).

Bei Minute 18 spätestens: „Dann fasse ich zusammen, was Version 1 ist: [vier Punkte]. Einverstanden?" — Warten auf ein Ja. Dann Preis.

### 3.4 Preis, Ablauf, nächster Schritt (20–27 Min)

**Wie du den Festpreis nennst.** Herleitung in einem Satz, dann die Zahl, dann Schweigen. Nicht die Zahl zuerst und dann rechtfertigen. Nicht „ungefähr". Nicht „ab".

Wortlaut, Beispiel Prüfprotokolle:

> „Version 1 ist das Grundprodukt — eigene Datenhaltung, eine Nutzergruppe, saubere Oberfläche, Kick-off, Abnahme, Übergabe — dazu die mobile Nutzung mit Offline-Fähigkeit, das PDF-Protokoll mit Unterschrift und die Anbindung an [Warenwirtschaft], für die es eine dokumentierte Schnittstelle gibt. Das sind 12.500 plus 3.000 plus 2.000 plus 3.000: **20.500 Euro netto, Festpreis.**"

Dann nichts. Drei Sekunden, fünf, zehn. Der Kunde redet als Erster. Was er sagt, ist die wichtigste Information des Gesprächs: „Okay" (Abschluss), „Das ist mehr als der Berater gesagt hat" (erklären, welche Zeile sich geändert hat — oder es war ein Fehler, dann korrigieren), „Puh" (Einwand „zu teuer", Abschnitt 4.1), „Was ist da drin?" (Abnahmekriterien und Zeilen wiederholen).

Wenn der Richtpreis aus dem Berater niedriger war als deine Zahl: Das sagst du **vor** der Zahl, nicht danach.

> „Der Berater hatte 17.500 geschätzt. Nach dem, was Sie mir zur Anbindung erzählt haben — keine Dokumentation, Eigenentwicklung — liegt die Anbindung am oberen Ende. Ich sage Ihnen das lieber jetzt als in Woche zwei."

Direkt nach dem Preis, ohne Pause vom Kunden erzwingen zu wollen, sobald er reagiert hat, der Ablauf in vier Sätzen:

> „Der Ablauf: 50 Prozent bei Auftrag, 50 Prozent nach Abnahme. Besteht die Abnahme nicht, entfällt die zweite Rate — das ist die eine Zusage, an der Sie mich messen können. Der Code gehört Ihnen ab Tag eins, das Repository liegt in Ihrem Namen. 24 Monate Gewährleistung. Kick-off wäre Montag, der [Datum], live Freitag, der [Datum]."

Betrieb als Standard nennen, nicht als Frage:

> „Nach Live läuft es bei mir im Betrieb: 290 Euro im Monat für Hosting, Updates und Überwachung, monatlich kündbar. Wenn Sie regelmäßig Änderungen wollen, 990 Euro inklusive eines Änderungstags pro Monat. Sie können es auch selbst betreiben — der Code ist Ihrer — die meisten wollen das nicht."

Dann Einwände (Abschnitt 4). Dann Abschluss.

Wenn der Kunde Status-quo-Zahl geliefert hat, einmal — nur einmal — gegenüberstellen:

> „Zur Einordnung: Sie hatten vorhin [Betrag] Euro im Jahr genannt, die der heutige Ablauf kostet. Version 1 kostet einmal 20.500."

Nicht: „Das rechnet sich nach acht Monaten." Der Kunde rechnet selbst, und seine Rechnung glaubt er.

### 3.5 Abschluss (27–30 Min)

Ein Schritt, ein Datum, ein Satz.

> „Ich schlage vor: Sie bekommen bis [Wochentag, Datum, in 48 h] das Festangebot mit den zehn Abnahmesätzen und dem Zeitplan als PDF. Sie lesen es, und wir telefonieren am [Wochentag] 15 Minuten, ob es passt. Ist [Wochentag] gut?"

Wenn der Kunde zögert, die Auswahl begrenzen statt öffnen:

> „Es gibt aus meiner Sicht drei Möglichkeiten: Erstens, das Festangebot in 48 Stunden. Zweitens, wenn Sie das Risiko als einer der Ersten mittragen wollen: ein Pilot zu Referenzkonditionen, dazu sage ich Ihnen gleich, was das heißt. Drittens, wenn es nicht passt: Sie sagen es mir jetzt, und ich schicke Ihnen nichts. Was davon?"

Letzter Satz, immer:

> „Was müsste im Angebot stehen, damit Sie am [Wochentag] Ja sagen?"

Antwort wörtlich mitschreiben. Das ist die Gliederung deines Angebots.

---

## 4. Einwand-Handling im Wortlaut

Muster für jeden Einwand: **Bestätigen (ein Halbsatz) → Fakt → Angebot einer Handlung.** Nicht widersprechen, nicht überreden, nicht drei Argumente. Ein Einwand, den du zweimal beantworten musst, ist kein Einwand, sondern eine Absage — dann Abschnitt 5.3.

### 4.1 „Das ist zu teuer."

Dahinter: Entweder kein Budget (→ 4.9), kein Vergleichspunkt, oder der Umfang ist zu groß.

> „Verstehe. Darf ich fragen: zu teuer gemessen woran — an dem, was Sie erwartet hatten, oder an dem, was es Ihnen bringt?"

Bei „erwartet": „Was hatten Sie im Kopf?" — Zahl abwarten. Dann Umfang verkleinern, nicht Preis senken:

> „Dann lassen Sie uns Version 1 kleiner schneiden. Wenn wir [Rausschmeiß-Kandidat aus der Vorbereitung, z. B. die Datenübernahme] in die zweite Spalte schieben, sind wir bei [Preis minus Baustein]. Die alten Protokolle bleiben im Archiv, ab Live wird neu angefangen. Ginge das?"

Bei „bringt": zurück zur Status-quo-Zahl. „Sie hatten [Betrag] pro Jahr genannt. Ist die Zahl falsch, oder ist es etwas anderes?"

Nicht sagen: „Ich kann Ihnen 10 % Rabatt geben." Der Preis ist die Summe der Zeilen. Wer am Preis dreht, ohne eine Zeile zu streichen, sagt: Die Zeilen waren erfunden.

Zahl im Hinterkopf (nicht aussprechen): Ein Projekt kostet dich ehrlich 95–135 Stunden all-in inklusive Verkauf, Kick-off, Abnahme und Gewährleistungs-Tail (gruender-risiko, agentur-operator). Bei 13.000 € sind das ~108 €/h, bei 20.500 € ~160 €/h. Unter 12.500 € gibt es kein Projekt außer dem Pilot (5.2).

### 4.2 „Ein Freelancer macht das für 30 Euro die Stunde."

> „Kann sein, und für manche Aufgaben ist das die richtige Wahl. Der Unterschied ist nicht der Stundensatz, sondern wer das Risiko trägt. Bei 30 Euro die Stunde zahlen Sie jede Stunde — auch die, in der es nicht funktioniert, und die Anzahl der Stunden steht am Anfang nicht fest. Bei mir steht der Preis vor dem Start fest, die zweite Hälfte hängt an der Abnahme, und 24 Monate lang ist ein Fehler mein Problem, nicht Ihres. Wenn Sie jemanden haben, der das für 30 Euro mit Festpreis und Abnahme macht: nehmen Sie ihn, ehrlich."

Dann die Frage, die den Einwand meist auflöst:

> „Haben Sie das schon einmal so gemacht — und wer hat das Projekt gesteuert, Abnahmekriterien geschrieben, den Freelancer nach drei Wochen ersetzt?"

Bei Gründern (Persona Lena: „Für 15.000 € bekomme ich auf Upwork 400–500 Stunden"): „Stimmt. Die Frage ist, wer die 400 Stunden steuert. Wenn Sie das selbst können und die Zeit haben, ist Upwork die richtige Wahl. Wenn nicht, kaufen Sie bei mir nicht Stunden, sondern eine Person, die entscheidet, was gebaut wird, und dafür geradesteht."

### 4.3 „Ich baue das mit Lovable selbst."

Ehrlich bleiben. Für einen Prototyp stimmt der Einwand.

> „Für einen ersten Klick-Prototyp: ja, machen Sie das, das ist ein guter Weg, um zu sehen, was Sie wollen. Wo es nach meiner Erfahrung kippt, ist die Stelle, an der mehrere Leute mit unterschiedlichen Rechten gleichzeitig arbeiten, an der [Warenwirtschaft] angebunden wird, an der Daten nicht verloren gehen dürfen und an der jemand um sieben Uhr morgens anruft, weil es nicht geht. Das ist kein Lovable-Problem, das ist ein Betriebsproblem. Wenn Sie es selbst versuchen wollen: Ich schicke Ihnen trotzdem das Angebot, und wenn Sie nach drei Wochenenden bei Punkt drei hängen, ist mein Preis noch derselbe."

Reziprozität ohne Gegenleistung: Du gibst den Rat, es selbst zu versuchen. Das glaubt dir mehr als jedes Verkaufsargument, und ein Teil kommt zurück.

### 4.4 „Sie sind allein — was, wenn Sie ausfallen?"

Der wichtigste Einwand, weil er der ehrlichste ist. Nicht kleinreden.

> „Richtig, ich bin allein, und das ist ein echtes Risiko, deshalb ist es im Angebot so geregelt: Erstens, der Code, die Dokumentation und alle Zugänge liegen ab Tag eins in Ihrem Namen — in Ihrem GitHub- oder Azure-Konto, nicht in meinem. Fällt ich aus, verlieren Sie keinen Tag Arbeit. Zweitens, der Stack ist bewusst langweilig — [TypeScript, Next.js, Postgres] — jeder Entwickler in Deutschland kann das übernehmen. Drittens, [Name Vertretung], ein Entwickler, mit dem ich zusammenarbeite, ist namentlich als Vertretung im Vertrag genannt und bekommt Lesezugriff auf das Repository. Viertens: Sie zahlen die zweite Hälfte erst nach Abnahme. Wenn ich in Woche drei ausfalle, haben Sie 50 Prozent gezahlt und den bis dahin fertigen Code."

**To-do vor dem ersten Gespräch:** [Name Vertretung] muss real sein — ein Senior-Freelancer aus dem Netzwerk, mit dem eine schriftliche Vertretungsvereinbarung besteht (Stundensatz, Reaktionszeit, Lesezugriff). Ohne den Namen sagst du nur Punkt 1, 2 und 4 — und kein Wort von „Netzwerk". Vertretungsvereinbarung: vom Anwalt prüfen lassen.

### 4.5 „Sie haben keine Referenzen."

Nicht ausweichen, nicht Showcases zeigen, nicht „mehrere Projekte in Arbeit".

> „Stimmt. Sie wären eines der ersten drei Projekte unter dieser Marke, und ich sage Ihnen lieber, was ich belegen kann, als so zu tun, als hätte ich mehr: In einem SDAX-Unternehmen habe ich das Reporting von über 32 auf rund 6 Stunden pro Zyklus gebracht. Ich habe dort rund 30 KI-Anwendungsfälle identifiziert und zwei produktiv gestellt. Drei eigene iOS-Apps im App Store. Und die Website mit dem Berater, über den Sie gebucht haben, ist selbst mit genau dieser Methode gebaut — das ist das Produkt, das Sie schon ausprobiert haben. Keine Kundenreferenz, das ist der ehrliche Stand."

Dann wenden — das ist der Übergang zum Pilot (5.2):

> „Weil das so ist, biete ich den ersten drei Kunden etwas an, das ich später nicht mehr anbiete: [Referenzkonditionen]. Dafür möchte ich Sie danach als Referenz nennen dürfen — Name, eine Zahl, ein Satz, und dass ein zukünftiger Kunde Sie einmal anrufen darf. Wäre das für Sie ein fairer Handel?"

Blemishing wirkt hier am stärksten: Wer „keine Referenz" von sich aus sagt, dem glaubt man die 32 → 6 Stunden.

### 4.6 „KI-Code ist unsicher."

Persona Markus (IT-Leiter) fragt so. Antwort nicht technisch überfrachten, aber konkret.

> „Berechtigt, und die Antwort ist: KI-Code ist so sicher, wie die Person, die ihn verantwortet, ihn prüft. Konkret bei mir: Der Code läuft durch automatische Tests und Abhängigkeits-Scans bei jedem Commit, ich prüfe jede Änderung selbst gegen die OWASP Top 10, Secrets liegen nie im Code, Zugriff läuft über Rollen, und wenn Ihre IT es will, über Ihr Entra ID. Das Repository liegt in Ihrer Organisation, Ihre IT kann jederzeit hineinschauen — ab Tag eins, nicht erst bei Übergabe. Und: 24 Monate Gewährleistung heißt, eine Sicherheitslücke ist mein Problem, nicht Ihres."

Angebot einer Handlung:

> „Soll ich Ihrer IT die Fakten-Seite schicken — Stack, Hosting-Optionen, Rollenkonzept, Backup, Logging — damit die vor dem Kick-off Ja oder Nein sagen kann?"

**To-do:** Diese Seite („Fakten für Ihre IT", ein PDF) muss vor dem ersten Gespräch existieren. Inhalt laut Review-Persona Markus: Stack, Repo in Kunden-Org ab Tag 1, CI mit Tests, Dependency-Scanning, OWASP-Top-10-Check, Secrets-Handling, Logging/Monitoring, Backup, SSO über Entra ID (OIDC/SAML) als Option, Betrieb wahlweise im Kunden-Azure-Tenant, EU-Hosting, AVV-Muster, NDA-Bereitschaft.

### 4.7 „Unsere IT muss das freigeben."

Nicht als Hürde behandeln, als Beteiligten.

> „Gut, dann holen wir sie früh rein, nicht am Ende. Ich schlage vor: Ich schicke Ihrem IT-Leiter die Fakten-Seite und biete ihm 20 Minuten an — vor dem Angebot, nicht danach. Die Fragen, die ich von IT-Seite üblicherweise höre, sind: Wo läuft es, wer hat Zugriff, was passiert bei Ausfall, wer haftet. Auf alle vier gibt es eine schriftliche Antwort. Wen darf ich anschreiben?"

Namen und E-Mail im Gespräch notieren. Termin mit der IT innerhalb von 5 Werktagen anbieten. Angebot erst nach dem IT-Gespräch schicken — sonst schreibt die IT das Angebot um.

Haftungsfrage vorwegnehmen, weil sie kommt: „Haftung ist im Angebot auf den Auftragswert begrenzt, dazu eine IT-Haftpflicht mit [Deckungssumme] Euro." — **To-do:** IT-Haftpflicht abschließen, Deckungssumme kennen. Haftungsklausel: vom Anwalt prüfen lassen.

### 4.8 „Ich muss das erst mit dem Einkauf klären."

Persona Dr. Sabine (Konzernbereich). Der Einkauf braucht drei Dinge: einen Lieferantenstammsatz, ein vergleichbares Angebot, und einen Grund, warum dieser Anbieter.

> „Klar. Damit Ihr Einkauf nicht drei Runden dreht: Ich liefere Ihnen mit dem Angebot alles, was er für den Lieferantenstammsatz braucht — Rechtsform, Anschrift, USt-ID, Handelsregister, Versicherungsnachweis — und eine Seite, die die Frage ‚Warum dieser Anbieter?' für Sie beantwortet: Festpreis, Abnahme nach schriftlichen Kriterien, zweite Rate nur bei Bestehen, Code-Eigentum bei Ihnen. Das ist der Satz, den Sie intern brauchen: Sie haben kein Kostenrisiko ohne Ergebnis. Was braucht Ihr Einkauf noch — drei Vergleichsangebote, eine Rahmenvereinbarung, eine Bestellgrenze?"

Wenn Bestellgrenze: Aufteilung in Kick-off/Konzeption (Auftrag 1) und Bau (Auftrag 2) anbieten, wenn es die Grenze löst — nur wenn beide Aufträge vor Kick-off unterschrieben sind. Vertragsaufteilung: vom Anwalt prüfen lassen.

**To-do:** Lieferantenmappe als PDF (Impressum-Daten, Versicherung, AVV-Muster, NDA-Muster, Fakten-Seite) — einmal bauen, jedem Konzernkontakt mitschicken.

### 4.9 „Wir haben dieses Jahr kein Budget."

Dahinter: entweder wahr (dann Termin für nächstes Jahr fixieren) oder höflich für „Nein" (dann freundliches Nein, 5.3). Unterscheiden durch eine Frage:

> „Verstehe. Wenn das Budget da wäre — würden Sie es dann machen, so wie wir es gerade geschnitten haben?"

Bei „Ja": „Dann zwei Möglichkeiten. Erstens: Wir fixieren jetzt den Kick-off für [erster Montag nach Budgetfreigabe, z. B. Januar], ich halte den Slot, das Angebot bleibt bis dahin gültig, und Sie haben im Januar kein Wartequartal. Zweitens: Die erste Rate — 50 Prozent — liegt oft unter der Grenze, für die Sie keine Budgetfreigabe brauchen. Bei [Preis] wären das [Hälfte]. Die zweite Rate fällt nach Abnahme an, also im neuen Jahr. Ist eins davon ein Weg?"

Bei „Ehrlich gesagt, nein" oder Zögern: „Danke, dass Sie das sagen. Dann lassen wir es hier — ich schicke kein Angebot, und wenn sich bei Ihnen etwas ändert, wissen Sie, wo ich bin."

Nicht: „Ich kann Ihnen einen Sonderpreis für dieses Jahr machen." Das lehrt den Kunden, dass Warten Geld spart.

---

## 5. Die drei möglichen nächsten Schritte

Jedes Gespräch endet mit genau einem davon. Du wählst, nicht der Kunde — du schlägst vor, er stimmt zu oder korrigiert.

### 5.1 Festangebot in 48 Stunden

Standard. Bedingungen, die im Gespräch geklärt sein müssen: Entscheider bekannt, Version 1 zusammengefasst und bejaht, Preis genannt und nicht abgelehnt, Kick-off-Montag genannt.

> „Sie bekommen bis [Datum, 48 h] das Festangebot. Wir sprechen am [Datum] 15 Minuten. Ich blocke den Kick-off am [Montag] vorläufig — wenn Sie bis [Datum Rückruf + 2 Tage] nicht unterschreiben, geht der Slot an den Nächsten. Das ist kein Druck, ich kann nur ein Projekt gleichzeitig bauen."

Die Knappheit ist wahr (ein Kopf, ein Projekt zur Zeit). Deshalb darfst du sie sagen. Sobald sie nicht mehr wahr wäre, streichst du den Satz.

### 5.2 Pilot zu Referenzkonditionen

Nur für die ersten drei Projekte. Nur anbieten, wenn: (a) der Fall in die Testnische passt (Handel/Großhandel mit Warenwirtschaft, Anlagen-/Elektrobau mit Prüfprotokollen), (b) der Kunde nennbar ist und es sein will, (c) eine Vorher/Nachher-Zahl messbar ist (Stunden pro Woche, Durchlaufzeit, Fehlerquote).

Die Gutachter nennen für Referenz-Piloten 5.000–8.000 € (growth-nachfrage 5.000–6.000, gruender-risiko 5.000–6.500, vc-skeptiker 6.000–8.000) — gerechnet noch mit dem alten Floor von 9.500. Mit dem neuen Floor von 12.500 gilt:

- **Preis:** Version-1-Preis minus 30 %, Untergrenze 8.000 € netto. Nie darunter, egal wie gut die Referenz. (Annahme: 30 % ist der Rabatt, den drei nennbare Referenzen wert sind — Angebot→Abschluss verdoppelt sich laut Review von 10–15 % auf 25–35 %.)
- **Gegenleistung, schriftlich im Vertrag:** Namensnennung (Firma, Ansprechpartner, Rolle) auf der Website; eine Vorher/Nachher-Zahl, die der Kunde freigibt; ein Zitat von drei Sätzen; Screenshot-Freigabe (anonymisierte Daten); Bereitschaft, mit zwei zukünftigen Interessenten je 15 Minuten zu telefonieren. Referenzklausel: vom Anwalt prüfen lassen.
- **Alles andere bleibt gleich:** Festpreis, 50/50, Abnahme, 24 Monate, Code-Eigentum, Betrieb 290/990.
- **Zeitfenster:** Kick-off innerhalb von 3 Wochen, sonst verfällt die Kondition. Ein Pilot, der im Januar startet, ist kein Pilot.

Wortlaut:

> „Ich habe keine Referenzen, das wissen Sie. Deshalb mein Angebot für die ersten drei Kunden: Version 1 für [Preis minus 30 %] statt [Preis], alles andere identisch — Festpreis, Abnahme, zweite Rate nur bei Bestehen, Code gehört Ihnen. Dafür darf ich Sie nachher nennen, mit einer Zahl und einem Satz, und zwei zukünftige Kunden dürfen Sie einmal anrufen. Kick-off am [Montag in maximal 3 Wochen]. Wenn Sie das wollen, schreibe ich es so ins Angebot."

Reziprozität, ausgesprochen: Der Kunde bekommt etwas Konkretes und gibt etwas Konkretes. Kein „Sonderpreis", sondern Handel.

### 5.3 Freundliches Nein

Du sagst Nein, wenn: der Fall nicht passt (sicherheitskritisch, Medizinprodukt, ERP-Ablösung), der Kunde in Phase 3 keinen Umfang unter 35.000 € akzeptiert, kein Entscheider erreichbar ist und keiner benannt wird, das Budget wirklich nicht existiert, oder derselbe Einwand zum dritten Mal kommt.

> „Ich glaube, ich bin für das hier nicht der Richtige, und ich sage Ihnen lieber jetzt warum als nach dem Angebot: [Grund in einem Satz — z. B. ‚Eine komplette ERP-Ablösung ist kein Vier-Wochen-Projekt, und wer Ihnen das verspricht, lügt.']. Was ich Ihnen stattdessen empfehle: [konkreter Rat — fertige Software X, Systemhaus, den Prozess erst vereinfachen]. Wenn sich daraus später ein kleineres Stück ergibt, das in vier Wochen passt, melden Sie sich."

Kein Angebot, keine Follow-up-Sequenz. Eine E-Mail am selben Tag mit dem Rat aus dem Gespräch (drei Sätze). Das ist der Kunde, der dich in zwei Jahren empfiehlt, weil du ihm abgeraten hast (Persona Kerstin: „Wer mir ehrlich abrät, dem glaube ich").

---

## 6. Nachbereitung

### 6.1 Direkt nach dem Call (10 Minuten, nicht später)

Protokoll mit den fünf Fragen aus dem Review (growth-nachfrage), jede Antwort ein Satz:

- [ ] Budget genannt? (Zahl oder „nein")
- [ ] Entscheider? (Ja / Name des Entscheiders)
- [ ] Zeitrahmen? (Kick-off-Monat oder „offen")
- [ ] Was hätte gefehlt? (Wörtlich: was der Kunde auf „Was müsste im Angebot stehen?" gesagt hat)
- [ ] Warum gebucht? (Wörtlich, wenn genannt)

Dazu: Nächster Schritt (5.1/5.2/5.3), Datum Angebot, Datum Rückruf, Einwände (welche aus 4.1–4.9), Status-quo-Zahl. In eine Tabelle, ein Blatt pro Gespräch. Nach 10 Gesprächen liest du daraus, welcher Einwand wirklich zieht — das ist wichtiger als jede Landing-Variante.

Freitag, 30 Minuten: alle Blätter der Woche gegen die Benchmarks in Abschnitt 8.

### 6.2 Angebot binnen 48 Stunden

Zeitlimit: **2 Stunden pro Angebot** (vc-skeptiker: „Zeit für Angebot pro Lead auf 2 Stunden begrenzen, die Chat-Skizze ist die Vorarbeit"). Die Skizze und die priceItems sind 70 % des Angebots. Wer 8 Stunden an einem Angebot sitzt, hat bei 20 % Abschlussquote 40 Stunden pro Auftrag verbrannt.

Struktur, maximal 4 Seiten PDF:

1. **Seite 1 — Ihr Ablauf heute und Version 1.** Drei Sätze zum Status quo (mit der Zahl des Kunden). Dann die vier bis sechs Punkte aus Spalte 1, wörtlich wie besprochen. Spalte 2 („Für später vorgemerkt") als Liste. Spalte 3 („Bewusst nicht enthalten").
2. **Seite 2 — Abnahmekriterien.** Höchstens zehn messbare Sätze. Die drei des Kunden zuerst. Darunter der eine Satz: „Besteht die Abnahme nicht, entfällt die zweite Rate."
3. **Seite 3 — Preis und Ablauf.** Tabelle mit den priceItems-Zeilen, Summe, Festpreis netto. Zahlung 50/50. Kick-off-Montag, Feedback-Termin Woche 3, Abnahme Freitag Woche 4. Betrieb 290/990 als Zeile darunter, „monatlich kündbar". Gewährleistung 24 Monate. Code-Eigentum. Bei Pilot: Referenzkonditionen und Gegenleistung ausformuliert.
4. **Seite 4 — Wer baut, was passiert bei Ausfall, für Ihre IT.** Foto, drei belegbare Fakten (32 → 6 h, 30/2 Anwendungsfälle, drei Apps, diese Website). Vertretungsregelung. Link/Anhang Fakten-Seite. Gültigkeit des Angebots: 14 Tage, Kick-off-Slot vorläufig reserviert bis [Datum].

AGB und Angebotsmuster: vom Anwalt prüfen lassen — aber das erste Angebot geht trotzdem in 48 Stunden raus, mit dem Entwurf.

Begleitmail zum Angebot:

> Betreff: Festangebot [Projekttitel] — [Firma]
>
> Guten Tag [Herr/Frau Name],
>
> anbei das Festangebot, wie am [Wochentag] besprochen: Version 1 mit [vier Punkten in einem Halbsatz], [Preis] Euro netto Festpreis, Kick-off am [Montag], live am [Freitag].
>
> Auf Seite 2 stehen die zehn Sätze, an denen Sie die Abnahme messen — die drei wichtigsten sind Ihre. Besteht die Abnahme nicht, entfällt die zweite Rate.
>
> Ich habe den Kick-off-Slot am [Montag] bis [Datum] für Sie reserviert. Wir sprechen wie vereinbart am [Wochentag] um [Uhrzeit] — wenn vorher Fragen sind, rufen Sie an: [Telefon].
>
> Mit freundlichen Grüßen
> Moritz Schumacher
> vierwochen — Ihre Software. In vier Wochen live.

### 6.3 Follow-up-Sequenz

Gilt nur nach 5.1 und 5.2. Nicht nach 5.3. Drei Kontakte, dann Schluss. Jeder Kontakt bringt etwas mit (Reziprozität) oder stellt eine Frage, die mit einem Wort beantwortbar ist. Nie „Wollte nur mal nachfragen".

**Tag 2 (= vereinbarter Rückruf, wenn der nicht stattfand):**

> Betreff: Kurze Frage zum Angebot [Projekttitel]
>
> Guten Tag [Name],
>
> wir wollten heute kurz sprechen — ich vermute, der Tag ist dazwischengekommen. Zwei Termine, an denen ich 15 Minuten frei habe: [Option A], [Option B]. Welcher passt?
>
> Falls im Angebot etwas fehlt oder unklar ist, reicht ein Satz per Antwort, dann passe ich es an.
>
> Moritz Schumacher

**Tag 7:**

> Betreff: [Projekttitel] — ein Punkt, den ich im Gespräch nicht erwähnt habe
>
> Guten Tag [Name],
>
> ein Nachtrag zu unserem Gespräch: Sie hatten [konkreter Einwand oder offene Frage aus dem Protokoll, z. B. „gefragt, was passiert, wenn die Schnittstelle zu Sage nicht dokumentiert ist"]. Ich habe das noch einmal nachgesehen: [konkrete, belegbare Antwort in zwei Sätzen — z. B. „Sage 100 hat eine dokumentierte REST-Schnittstelle ab Version X; falls Ihre Version älter ist, gilt der obere Wert der Zeile, also 5.000 statt 3.000 Euro — das stünde dann so im Angebot, nicht als Überraschung in Woche zwei."]
>
> Der Kick-off-Slot am [Montag] ist noch bis [Datum] reserviert. Danach gebe ich ihn frei. Sagen Sie mir bis dahin einfach Ja, Nein oder „später" — jede der drei Antworten ist für mich in Ordnung.
>
> Moritz Schumacher

Warum „Ja, Nein oder später": Die Auswahl ist begrenzt, „Nein" ist ausdrücklich erlaubt, und das senkt die Schwelle, überhaupt zu antworten. Ein Nein mit Grund ist mehr wert als Schweigen.

**Tag 14 (letzter Kontakt):**

> Betreff: [Projekttitel] — ich lege es in die Schublade
>
> Guten Tag [Name],
>
> ich habe nichts von Ihnen gehört, und das ist eine Antwort, die ich respektiere. Ich lege das Angebot in die Schublade und melde mich nicht mehr von mir aus. Der Kick-off-Slot ist freigegeben.
>
> Zwei Dinge bleiben: Das Angebot gilt zu diesem Preis, wenn Sie sich innerhalb von [3 Monaten] melden — der Umfang liegt fest, ich muss nicht neu rechnen. Und die Skizze aus dem Berater dürfen Sie behalten und auch jemand anderem geben, wenn Sie es intern oder mit jemand anderem bauen wollen. Sie war dazu gedacht, Ihnen zu helfen, nicht mich zu binden.
>
> Alles Gute für [konkretes Vorhaben des Kunden]
> Moritz Schumacher

Danach: nichts mehr. Kontakt in die Liste „Schublade" mit Datum. Nach 3 Monaten eine einzige Mail, wenn es etwas Echtes gibt (erste Referenz live, neue Vorher/Nachher-Zahl). Sonst nie.

Bei Pilot-Angeboten (5.2) ist die Sequenz kürzer: Tag 2 und Tag 7, in Tag 7 zusätzlich der Satz „Die Referenzkonditionen gelten für die ersten drei Projekte — Stand heute sind [X] davon vergeben." Nur schreiben, wenn es stimmt.

---

## 7. Psychologie — wo sie wirkt, in einem Satz

Kein Vortrag. Nur damit du weißt, warum ein Satz an einer Stelle steht und nicht an einer anderen.

| Prinzip | Wo im Gespräch | Was du konkret tust | Grenze |
|---|---|---|---|
| **Reziprozität** | Berater-Skizze vor dem Call, Rat in 4.3, Tag-7- und Tag-14-Mail | Du gibst etwas Brauchbares (Skizze, Rat, Recherche), bevor du etwas bekommst — und sagst dazu, dass er es behalten darf | Kein Geschenk mit Haken. Die Skizze bleibt beim Kunden, auch wenn er nicht kauft |
| **Konsistenz** | „Passt das?" in der Eröffnung, Bestätigung der Status-quo-Zahl, die drei Abnahmesätze des Kunden, „Einverstanden?" vor dem Preis | Kleine Ja-Schritte, die der Kunde selbst formuliert; er widerspricht seinen eigenen Worten nicht | Nur echte Zustimmung. Ein erzwungenes Ja rächt sich in der Abnahme |
| **Verlustaversion** | Status-quo-Rechnung in 3.2, einmalige Gegenüberstellung in 3.4, Slot-Reservierung in 5.1 | Der heutige Zustand kostet jedes Jahr; die Lösung einmal. Der Slot geht an den Nächsten | Zahl kommt vom Kunden, nicht von dir. Knappheit nur, solange sie wahr ist |
| **Blemishing** (zugegebener Makel) | „Ich bin allein" in der Eröffnung, „Keine Referenzen" in 4.5, „Für einen Prototyp: ja, Lovable" in 4.3 | Ein Nachteil, den du selbst nennst, macht die Vorteile glaubwürdig | Der Makel muss echt sein und direkt danach kommt der Fakt, nicht die Entschuldigung |
| **Auswahl begrenzen** (JOLT) | Drei Spalten in 3.3, drei nächste Schritte in 3.5, „Ja, Nein oder später" in Tag 7 | Nie offene Fragen, immer zwei bis drei Optionen, eine davon empfohlen | Die dritte Option ist immer ein ehrliches Nein — sonst ist es Manipulation |
| **Risiko-Umkehr** | Nach dem Preis in 3.4, in jeder Mail | „Besteht die Abnahme nicht, entfällt die zweite Rate" — an der Stelle, an der der Kunde Angst hat, das Falsche zu kaufen | Muss im Vertrag genau so stehen (vom Anwalt prüfen lassen) |

Was du nicht tust: Countdown-Druck, erfundene Konkurrenzangebote, „andere Kunden in Ihrer Branche", Rabatt für schnelle Entscheidung. Alles davon erhöht die Entscheidungsangst statt sie zu senken — und du hast keine anderen Kunden.

---

## 8. Kennzahlen für dieses Gespräch

Benchmarks aus dem Review (growth-nachfrage, agentur-operator), Kalt-Leads ohne Referenzen. Deine Zahlen freitags daneben schreiben.

| Stufe | Benchmark ohne Referenzen | Mit 2–3 Referenzen | Deine Zahl |
|---|---|---|---|
| Buchung → Gespräch findet statt (Show) | 55–75 % | — | |
| Gespräch → Angebot verschickt | ~70 % | — | |
| Angebot → Auftrag | 10–20 % (growth: 20 %, agentur: 10–15 %) | 25–35 % | |
| Stunden Vertrieb pro gewonnenem Auftrag | 6–11 h (gruender-risiko 6 h, growth 11 h) | | |
| Warm/LinkedIn: Kontakte → Abschluss | 200 → 20 Antworten → 8 Gespräche → 5 Angebote → 1–2 Aufträge | | |

Konsequenzen:
- Show unter 40 % (growth, Kill-Signal für den Kanal): Kanal prüfen, nicht Gespräch. Erinnerungsmail 24 h vorher mit der Skizze im Anhang.
- Angebot → Auftrag unter 10 % nach 10 Angeboten: Der Einwand, der in den Protokollen am häufigsten steht, ist das Problem — Preis, Referenz oder Alleinsein. Dann Abschnitt 4 überarbeiten, nicht die Landing.
- Nach 15 Gesprächen kein einziges „Schicken Sie mir ein Angebot" (gruender-risiko): Preis, Zielgruppe und Versprechen hinterfragen, nicht das Design.

---

## Anhang A — Kurzkarte neben dem Bildschirm

```
EINSTIEG   Ich bin Moritz, ich baue das selbst, mit KI. 10/10/Preis. Passt das?
           Skizze in einem Satz. Wer entscheidet?
HEUTE      Ablauf → Menge → Zeit/Woche → letzter Fehler → Systeme → schon versucht? → wer nutzt/freigibt?
           Laut rechnen: __ Tage/Wo × 45 × 300 € = ______ €/Jahr. „Richtig?"
ZUSCHNITT  Vorschlagen, nicht fragen. Spalte 1 (4–6 Punkte) / Später / Nicht.
           Fragen, die den Preis bewegen: Doku für Schnittstelle? 2. Gruppe nötig? Altdaten? Offline? PDF?
           „Drei Sätze, die am Ende wahr sein müssen?" — „Einverstanden?"
PREIS      Zeilen in einem Satz → Zahl → SCHWEIGEN.
           50/50. Abnahme nicht bestanden → 2. Rate entfällt. Code Ihrer. 24 Mon. Kick-off Mo __ / live Fr __.
           Betrieb 290 / 990, monatlich kündbar.
ABSCHLUSS  Angebot bis __ (48 h). Rückruf am __. Slot reserviert bis __.
           „Was müsste im Angebot stehen, damit Sie Ja sagen?"
EINWÄNDE   teuer → woran gemessen? → Zeile streichen, nie Rabatt
           30 €/h → wer trägt Risiko, wer steuert?
           Lovable → Prototyp ja; Rechte/Anbindung/Betrieb nein; Angebot bleibt
           allein → Repo bei Ihnen, langweiliger Stack, [Vertretung], 50 % erst nach Abnahme
           Referenzen → keine. 32→6 h, 30/2 Fälle, 3 Apps, diese Seite. → Pilot
           KI-Code → Tests, Scans, OWASP, Repo bei Ihnen, 24 Mon. → Fakten-Seite an IT
           IT → früh rein, 20 Min vor Angebot
           Einkauf → Lieferantenmappe, „kein Kostenrisiko ohne Ergebnis"
           kein Budget → „wenn es da wäre?" → Slot Januar / 1. Rate jetzt / ehrliches Nein
DANACH     5 Fragen (Budget? Entscheider? Zeit? Was fehlte? Warum gebucht?) — SOFORT.
```

## Anhang B — Was vor dem ersten Gespräch existieren muss

- [ ] Fakten-Seite für IT als PDF (Stack, Repo-Ort, CI/Scans, OWASP, Secrets, Logging, Backup, SSO-Option, Hosting-Optionen, EU-Region, AVV-Muster, NDA-Bereitschaft)
- [ ] Lieferantenmappe (Impressum-Daten vollständig: Rechtsform, Anschrift, USt-ID, Register; Versicherungsnachweis)
- [ ] IT-Haftpflicht abgeschlossen, Deckungssumme bekannt
- [ ] Vertretungsvereinbarung mit [Name Vertretung] — schriftlich, vom Anwalt prüfen lassen
- [ ] Angebotsvorlage (4 Seiten, Abschnitt 6.2) mit Abnahmekriterien-Anlage — Entwurf fertig, vom Anwalt prüfen lassen
- [ ] Pilot-Vertragszusatz (Referenzkonditionen + Gegenleistung, Abschnitt 5.2) — vom Anwalt prüfen lassen
- [ ] Protokollvorlage (6.1) als Tabelle
- [ ] Nebentätigkeit gegenüber dem Arbeitgeber schriftlich angezeigt; kein Kontakt zu Kunden/Lieferanten des Arbeitgebers (gruender-risiko: Loyalitätspflicht)
- [ ] Telefonnummer, die im Angebot und in der Signatur steht, und die du abnimmst

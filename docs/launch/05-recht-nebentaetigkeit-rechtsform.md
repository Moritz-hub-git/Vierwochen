# 05 — Recht & Absicherung vor dem ersten Vertrag

Stand: 2026-09-08. Gilt bis zur Unterschrift unter den ersten Festpreisauftrag. Vier Teile:

1. Nebentätigkeit beim Arbeitgeber (Anzeige, Musteranschreiben, Vertragsklauseln, Trennung von Geräten/Accounts/Repos)
2. Rechtsform (Empfehlung UG, Kosten, Zeitplan, was bis zur Eintragung gilt, warum keine Kleinunternehmerregelung)
3. Versicherung (IT-Vermögensschadenhaftpflicht, Betriebshaftpflicht, Rechercheliste)
4. Website-Pflichten (Impressum/DDG, Datenschutz, EU-KI-VO Art. 50, UWG, AGB-Punkte für den Anwalt)

Alles mit **[Anwalt]** ist ein Entwurf auf Laienstand, den ein Fachanwalt prüft, bevor du ihn verwendest. Alles mit **[Steuerberater]** entsprechend. Die Entwürfe stehen trotzdem vollständig hier, damit das Prüfgespräch 30 Minuten dauert und nicht drei Stunden.

Warum dieses Dokument vor dem Sales-Leitfaden kommt: Der Gründer-Risiko-Gutachter setzt als erstes Kill-Kriterium *„Tag 30: Nebentätigkeit von thyssenkrupp nucera nicht schriftlich genehmigt oder mit Auflagen versehen, die Kundenkontakt tagsüber ausschließen -> stoppen oder Kündigung einplanen, aber nicht ‚unter dem Radar' weitermachen."* Und als Maßnahme 3: *„UG (haftungsbeschränkt) gründen und IT-Vermögensschadenhaftpflicht plus Betriebshaftpflicht abschließen, bevor der erste Vertrag unterschrieben wird. Bis dahin: keine Angebote versenden."* (strategies[4].coreMeasures)

---

## 0. Reihenfolge und Budget

Die Reihenfolge ist zwingend, weil jeder Schritt den nächsten absichert: Ohne Genehmigung kein Kundenkontakt. Ohne UG kein Vertrag. Ohne Versicherung kein Kick-off.

| Tag | Was | Kosten (Review) | Dauer |
|---|---|---|---|
| 1 | Arbeitsvertrag + Konzernrichtlinien lesen (Abschnitt 1.2), Anzeige an HR/Vorgesetzten raus (Abschnitt 1.3) | 0 € | 2 h Vertrag lesen + 1 Gespräch (gruender-risiko) |
| 1 | Geräte/Accounts/Repos trennen (Abschnitt 1.5) | 0–30 €/Monat (Workspace, Rufnummer) | 2 h |
| 1–2 | Website: Impressum füllen, Team-Fiktion raus, „Garantie" → „Gewährleistung", KI-Hinweis, Datenschutz angleichen (Abschnitt 4) | 0 € | 3–4 h Text |
| 3 | Notartermin UG vereinbaren, Versicherungsangebote anfordern, Anwalt IT-Recht anfragen | 0 € | 1 h |
| 5–10 | Beurkundung UG, Geschäftskonto, Stammkapital, Handelsregister-Anmeldung | Notar/Register ~300–500 €; Stammkapital praktisch 500–1.000 € (gruender-risiko) | 1 Termin |
| 7–14 | Versicherung abschließen (rückwirkend zum Beurkundungstag, wenn möglich) | 600–1.500 €/Jahr bei < 100 k€ Umsatz (gruender-risiko) | „in 2 Tagen abschließbar" |
| 7–14 | Steuerberater-Erstgespräch **[Steuerberater]** | 150–250 € (gruender-risiko) | 1 h |
| 7–21 | Anwalt: AGB + Angebotsmuster + Abnahmeprotokoll **[Anwalt]** | 800–1.500 € (gruender-risiko) | 1–2 Wochen |
| 14–30 | Eintragung UG (2–4 Wochen), Steuernummer, USt-IdNr., Impressum ergänzen | 0 € | wartet |
| 30 | Review: Genehmigung da? UG eingetragen? Versicherung aktiv? Sonst Kill-Kriterium Tag 30 | — | — |

Einmalig: ~2.000–3.500 €. Laufend: UG/Buchhaltung/Versicherung/IHK ~250 €/Monat (gruender-risiko, unitEconomics). Optional Fachanwalt Arbeitsrecht für den Arbeitsvertrag: 200–300 €.

Was du **nicht** tust, bis Tag 30 grün ist: Angebote verschicken, Kick-off-Termine zusagen, Zahlungen annehmen. Gespräche führen darfst du ab dem Tag, an dem die Anzeige beim Arbeitgeber raus ist und keine Auflage dagegensteht.

---

## 1. Nebentätigkeit beim Arbeitgeber

### 1.1 Rechtslage in fünf Sätzen

1. Eine Nebentätigkeit ist grundsätzlich erlaubt (Art. 12 GG, Berufsfreiheit). Der Arbeitgeber darf sie nur untersagen, wenn seine berechtigten Interessen beeinträchtigt sind: Wettbewerb, Leistungsfähigkeit, Ruf, Geheimnisschutz, Arbeitszeitgrenzen.
2. Fast jeder Konzernarbeitsvertrag enthält eine **Anzeigepflicht** oder einen **Genehmigungsvorbehalt**. Ein Genehmigungsvorbehalt ist wirksam, aber der Arbeitgeber muss genehmigen, wenn keine berechtigten Interessen entgegenstehen (BAG-Rechtsprechung, vom Anwalt bestätigen lassen). Verschweigen ist ein Abmahn- bis Kündigungsgrund, auch wenn die Tätigkeit selbst erlaubt wäre.
3. Das **Wettbewerbsverbot während des Arbeitsverhältnisses** gilt für dich unabhängig vom Vertrag: § 60 HGB direkt für kaufmännische Angestellte, für alle anderen über die Treuepflicht (§ 241 Abs. 2 BGB) in gleicher Reichweite. Verboten ist Geschäft „im Handelszweig des Arbeitgebers". Individualsoftware für Handelsbetriebe und Elektrobauer ist nicht der Handelszweig eines Elektrolyseur-Herstellers. Grenzfälle in 1.4.
4. **Software, die du im Rahmen deiner Aufgaben oder nach Anweisung** des Arbeitgebers schreibst, gehört ihm (§ 69b UrhG). Was du privat, auf privatem Gerät, außerhalb der Arbeitszeit und ohne Bezug zu deinen Aufgaben baust, gehört dir. Die Grenze ziehst du durch Beweisbarkeit: Gerät, Account, Zeitstempel, Repo (1.5).
5. Als **Vorstandsreferent** giltst du intern als Person mit erhöhter Loyalitätspflicht und Zugang zu Insiderinformationen. Rechne damit, dass neben HR auch Compliance (Interessenkonflikt-Erklärung) und dein Vorgesetzter zustimmen müssen und dass die Genehmigung mit Auflagen und Widerrufsvorbehalt kommt. Das ist normal; nimm sie an.

### 1.2 Checkliste: Was du im Arbeitsvertrag und in den Konzernrichtlinien prüfst

Lies den Arbeitsvertrag, alle Nachträge, die Betriebsvereinbarungen zu Arbeitszeit und den Code of Conduct/Compliance-Richtlinie. Zu jedem Punkt eine Notiz mit Fundstelle (Seite/§).

- [ ] **Nebentätigkeitsklausel.** Wortlaut: Anzeige („ist anzuzeigen") oder Genehmigung („bedarf der vorherigen schriftlichen Zustimmung")? Frist? Formvorschrift (schriftlich, Formular)? Adressat (HR, Vorgesetzter, Vorstand)? Widerrufsvorbehalt?
- [ ] **Wettbewerbsverbot während des Arbeitsverhältnisses** (§ 60 HGB / Treuepflicht). Ist es im Vertrag über den Handelszweig hinaus erweitert („jede Tätigkeit für Wettbewerber, Kunden oder Lieferanten")? Dann gilt die Erweiterung für deine Kundenauswahl (1.4).
- [ ] **Nachvertragliches Wettbewerbsverbot** (§§ 74 ff. HGB). Gibt es eines? Dauer (max. 2 Jahre), Karenzentschädigung (mind. 50 % der letzten Bezüge, sonst unverbindlich), räumlicher/sachlicher Umfang. Relevant für den Tag, an dem du kündigst, nicht für heute. **[Anwalt]**
- [ ] **IP-/Erfindungsklausel.** Typisch: „Alle Arbeitsergebnisse, die während der Dauer des Arbeitsverhältnisses entstehen, stehen dem Arbeitgeber zu." Wenn die Klausel auf „während der Dauer" statt „in Erfüllung der Aufgaben" abstellt, ist sie über § 69b UrhG hinaus weit gefasst und in dieser Weite regelmäßig unwirksam, aber du willst keinen Prozess darüber führen. Deshalb: privates Gerät, privater Zeitstempel, kein Aufgabenbezug (1.5). **[Anwalt]**
- [ ] **Arbeitnehmererfindungsgesetz.** Betrifft patentfähige Erfindungen, nicht Software als solche. Trotzdem: Wenn du glaubst, etwas Technisches erfunden zu haben, das mit deiner Tätigkeit zu tun hat, gibt es eine Mitteilungspflicht für freie Erfindungen (§ 18 ArbnErfG). Für vierwochen praktisch nicht relevant, aber merken.
- [ ] **Geheimhaltung / Geschäftsgeheimnisse (GeschGehG).** Was gilt als vertraulich? Reporting-Prozesse, KI-Use-Case-Listen, Lieferantennamen, Zahlen. Konsequenz für deine Belege: nur generisch („ein SDAX-Unternehmen", „>32 auf ~6 h/Zyklus"), kein Firmenname, keine Screenshots, keine internen Dokumente, keine konkreten Use-Case-Beschreibungen, die auf nucera rückschließen lassen.
- [ ] **Arbeitszeit.** Vertragliche Wochenstunden, Kernarbeitszeit, Gleitzeitrahmen, Vertrauensarbeitszeit, Homeoffice-Regelung. Das Arbeitszeitgesetz addiert nur abhängige Beschäftigungen (§ 2 Abs. 1 ArbZG); eine selbständige Nebentätigkeit fällt formal nicht darunter **[Anwalt]**, aber die Pflicht, ausgeruht und leistungsfähig zur Arbeit zu kommen, bleibt. Realistische Selbstauflage: max. 10–12 h/Woche, Abende und Wochenende, keine Kundentermine in der Kernarbeitszeit. Das Review hat Commits Do 14:07–15:18 und Fr 10:35–19:25 gefunden: *„entweder Urlaub, oder bereits ein arbeitsrechtliches Problem"* (gruender-risiko, realConstraint). Das muss ab jetzt erklärbar sein (Urlaubstag, Gleitzeitabbau) — oder unterbleiben.
- [ ] **Nutzung von Betriebsmitteln.** IT-Richtlinie: Privatnutzung von Laptop, M365, Copilot, VPN verboten? Fast immer für geschäftliche Fremdnutzung. Konsequenz: 1.5.
- [ ] **Compliance / Interessenkonflikt.** Gibt es ein Formular „Erklärung zu Interessenkonflikten / Nebentätigkeiten"? Dann parallel zur Anzeige ausfüllen.
- [ ] **Urlaub / Krankheit.** Manche Verträge verbieten Nebentätigkeit während des Urlaubs (§ 8 BUrlG verbietet „dem Urlaubszweck widersprechende Erwerbstätigkeit" ohnehin). Ein Kick-off-Workshop im Urlaub ist ein Graubereich; ein Bautag nicht. **[Anwalt]**
- [ ] **Kündigungsfrist.** Für die Go-Entscheidung an Tag 90/120 (goCriteria: „jetzt kündigen, UG in GmbH überführen"). Notieren.

### 1.3 Musteranschreiben an HR und Vorgesetzten

Per E-Mail von deiner privaten Adresse an deine dienstliche, dann intern weiterleiten — oder direkt im HR-Portal, wenn es ein Formular gibt. Kopie an dich privat. Wortlaut sachlich, keine Rechtfertigung, keine Bitte um Wohlwollen. Die eckigen Klammern füllst du; die Option in geschweiften Klammern wählst du nach Vertragswortlaut (Anzeige oder Zustimmung).

```
Betreff: Anzeige einer Nebentätigkeit gemäß [§ X] meines Arbeitsvertrags

Sehr geehrte/r [Name HR-Ansprechperson], sehr geehrte/r [Name Vorgesetzte/r],

hiermit zeige ich gemäß [§ X meines Arbeitsvertrags vom TT.MM.JJJJ] eine
selbständige Nebentätigkeit an. {Da der Vertrag Ihre vorherige Zustimmung
vorsieht, bitte ich um diese in Textform.}

Art der Tätigkeit
Geschäftsführer und alleiniger Gesellschafter der [vierwochen UG
(haftungsbeschränkt), in Gründung], Sitz [Ort]. Gegenstand: Entwicklung von
Individualsoftware (Web-Anwendungen, interne Werkzeuge, Kundenportale) zum
Festpreis für kleine und mittlere Betriebe, überwiegend Handel und Handwerk,
sowie deren Betrieb. Website: vierwochen.de.

Umfang und Zeit
Voraussichtlich [8–12] Stunden pro Woche, ausschließlich außerhalb meiner
Arbeitszeit (Abende, Wochenende, Urlaubs- bzw. Gleitzeittage). Beginn:
[TT.MM.JJJJ]. Kundentermine finden nicht während der Kernarbeitszeit statt.

Zusicherungen
1. Die Tätigkeit steht nicht in Wettbewerb zu [thyssenkrupp nucera] und
   nicht zum Handelszweig des Konzerns.
2. Ich werde keine Aufträge von Kunden, Lieferanten, Partnern oder
   Konzerngesellschaften von [thyssenkrupp nucera] annehmen. Im Zweifel
   frage ich vorher bei [Compliance/Vorgesetzte/r] nach.
3. Ich nutze keine Betriebsmittel, Daten, Zugänge, Lizenzen oder
   Arbeitsergebnisse des Arbeitgebers. Die Tätigkeit läuft vollständig auf
   privater Infrastruktur.
4. Vertrauliche Informationen aus meiner Tätigkeit werden weder verwendet
   noch offengelegt. Meine berufliche Erfahrung beschreibe ich gegenüber
   Dritten nur allgemein und ohne Nennung des Arbeitgebers.
5. Meine Leistungsfähigkeit und Erreichbarkeit im Arbeitsverhältnis bleiben
   unverändert; Arbeitszeitgrenzen werden eingehalten.
6. Änderungen von Art oder Umfang der Tätigkeit zeige ich unverzüglich an.

Ich bitte um Bestätigung des Eingangs {und um Ihre Entscheidung} bis zum
[Datum, 14 Tage]. Für Rückfragen stehe ich jederzeit zur Verfügung.

Mit freundlichen Grüßen
[Moritz Schumacher]
[Personalnummer], [Abteilung]
```

Wenn die Antwort mit Auflagen kommt (typisch: „keine Kundentermine 8–17 Uhr", „jederzeit widerruflich", „jährlich neu anzuzeigen", „keine Tätigkeit für die Unternehmen der Liste X"): schriftlich annehmen, Auflagen in dieses Dokument übernehmen, Buchungsslots in `lib/config.ts` (BOOKING) entsprechend legen. Das Review empfiehlt ohnehin *„Beratungsslots auf frühe Abende/Freitag legen"* (gruender-risiko, risks[3]).

Wenn die Antwort ein Nein ohne Begründung ist: Nachfragen, welches berechtigte Interesse entgegensteht, und Fachanwalt Arbeitsrecht (200–300 €) einschalten. Wenn die Antwort ein begründetes Nein ist (z. B. Zielgruppe überschneidet sich mit Lieferanten): entweder Zielgruppe anpassen und neu anzeigen, oder das Kill-Kriterium Tag 30 greift. Nicht: weitermachen.

### 1.4 Kundenauswahl: die Sperrliste

Die Testnische „Anlagen-/Elektrobau mit Prüfprotokollen" liegt näher am Umfeld eines Anlagenbauers als „Handel/Großhandel". Deshalb vor jedem Erstgespräch drei Fragen:

- [ ] Ist der Betrieb Lieferant, Dienstleister, Kunde, Partner oder Konzerngesellschaft von thyssenkrupp nucera bzw. thyssenkrupp? (Konzernweit prüfen, nicht nur nucera. Im Zweifel: Lieferantenportal/Einkauf fragen, ohne den Kundennamen im Klartext zu nennen — oder den Kunden fragen, ob er Geschäft mit dem Konzern hat.)
- [ ] Ist eine Kontaktperson dort ein aktueller oder ehemaliger Kollege, den du über den Job kennst?
- [ ] Würde das Projekt Wissen verwenden, das du nur aus dem Job hast (Prozesse, Zahlen, Tools)?

Ein Ja bei einer der drei Fragen: kein Auftrag. Das Review formuliert die Regel für den Vertrieb identisch: *„ohne Konzern-Kollegen und ohne nucera-Lieferanten/-Kunden — Loyalitätspflicht"* (gruender-risiko, coreMeasures[6]).

### 1.5 Trennung von Geräten, Accounts, Repos

Ziel: Im Streit kannst du für jede Datei zeigen, dass sie privat entstanden ist. Ein einziger Commit vom Dienstlaptop oder eine Sitzung unter der Konzernadresse reicht, um das Gegenteil zu behaupten. Das Review hat genau das gefunden: *„Diese Arbeitssitzung läuft unter moritz.schumacher@thyssenkrupp-nucera.com — wenn Konzern-Account, -Gerät oder -Lizenzen für das Nebengewerbe genutzt werden, ist das ein Compliance-Verstoß und gefährdet die IP-Zuordnung des gesamten Repos."* (gruender-risiko, coreMeasures[0])

- [ ] **Gerät.** Eigener Laptop, eigenes Telefon (oder Dual-SIM/eSIM mit eigener Nummer). Kein Konzern-VPN, kein M365-Login, kein Copilot, kein Konzern-Confluence auf dem Privatgerät während der vierwochen-Arbeit.
- [ ] **Identität.** Google Workspace für vierwochen.de (Business Starter, ~7 €/Nutzer/Monat) statt privatem Gmail — auch aus Datenschutzgründen, siehe 4.2. Alle Tool-Accounts (Google Cloud, GitHub, Claude/Cursor, Vercel, Stripe, Kalender) unter `moritz@vierwochen.de` oder deiner privaten Adresse; keinen einzigen unter der Konzernadresse.
- [ ] **Diese Sitzung und alle Coding-Agents.** Anbieter-Konto (Anthropic/Claude Code) auf private Mail umstellen. Die aktuelle Session-Identität ist die Konzernadresse — das ist der Befund aus dem Review, morgen früh beheben.
- [ ] **Git-Historie prüfen.** Im Repo ausführen:
  ```
  git log --format='%an <%ae>' | sort | uniq -c
  grep -rIl "thyssenkrupp\|nucera" --exclude-dir=node_modules --exclude-dir=.git .
  ```
  Steht die Konzernadresse in Commits: `git config user.email` privat setzen; solange das Repo privat ist, Autor-Mails der Historie umschreiben (git filter-repo, nur mit Backup). Steht der Konzernname im Code/Docs außerhalb dieses Dokuments: raus. Dieses Dokument selbst nennt den Arbeitgeber nur, weil es dein internes Rechtsdokument ist — es bleibt in einem privaten Repo und geht nie an Kunden.
- [ ] **Lizenzen.** AI-Tooling privat bezahlt (Review: „AI-Tools/Cloud ~300 €/Monat"). Rechnungen auf die UG, sobald sie existiert.
- [ ] **Zeit.** Ein Zeitprotokoll (auch für die Unit Economics nötig, siehe Dokument 02): Datum, Uhrzeit, Dauer, Phase. Es ist nebenbei dein Beweis, dass die Arbeit außerhalb der Arbeitszeit lag.
- [ ] **Belege aus dem Job.** Erlaubt, wie im Angebot definiert: „Reporting in einem SDAX-Unternehmen von >32 auf ~6 h/Zyklus", „~30 KI-Anwendungsfälle identifiziert, 2 produktiv", „drei eigene iOS-Apps", „diese Website selbst gebaut". Nicht erlaubt: Arbeitgebername, Projektnamen, Screenshots, Kollegen als Referenz, interne Zahlen jenseits dieser vier Sätze.
- [ ] **Kalender.** Buchungsfenster nur außerhalb der Kernarbeitszeit, z. B. Mo–Do 17:30–19:30, Fr 14:00–18:00 (nur wenn Freitag Gleitzeit ist), Sa 10:00–13:00. In `lib/config.ts` BOOKING anpassen, sobald die Auflagen aus 1.3 feststehen.

---

## 2. Rechtsform

### 2.1 Vergleich für dein Modell

Dein Modell ist maximale Risiko-Umkehr: Festpreis, zweite Rate entfällt bei Nicht-Abnahme, 24 Monate Gewährleistung, Code-Eigentum beim Kunden, Betrieb mit Kundendaten im Kundenportal. Das Review: *„ein einziger Datenverlust im Kundenportal eines Großhändlers übersteigt den Auftragswert um ein Vielfaches"* und *„Festpreis + ‚Bezahlt wird nur, was läuft' + 12 Monate Gewährleistung ist maximale Risiko-Umkehr — die gehört in eine haftungsbeschränkte Hülle."* (gruender-risiko, coreMeasures[2])

| Kriterium | Einzelunternehmen | UG (haftungsbeschränkt) | GmbH |
|---|---|---|---|
| Haftung | unbeschränkt, Privatvermögen | beschränkt auf Gesellschaftsvermögen (Ausnahmen: Durchgriff bei Vermischung, persönliche Deliktshaftung, Handelndenhaftung vor Eintragung) | wie UG |
| Stammkapital | keins | ab 1 €, praktisch 1.000–5.000 € (Review: 500–1.000 € einzahlen); 25 % des Jahresüberschusses als Rücklage bis 25.000 € erreicht (§ 5a GmbHG) | 25.000 €, davon 12.500 € bei Gründung einzuzahlen |
| Gründungskosten | Gewerbeanmeldung 20–60 € | Notar + Register ~300–500 € mit Musterprotokoll (Review) | Notar + Register ~600–1.000 € |
| Laufend | Buchhaltung/Steuer ~500–1.000 €/Jahr, keine Bilanz bis 80 k€ Gewinn | Bilanz + Jahresabschluss + Offenlegung, IHK: ~1.500–2.500 €/Jahr (Review) | wie UG, eher 2.000–3.000 € |
| Steuern | ESt auf Gewinn zum persönlichen Satz (bei Konzerngehalt: Spitzensteuersatz ab dem ersten Euro Gewinn) | ~30 % (KSt 15 % + Soli + GewSt) auf einbehaltenen Gewinn; Ausschüttung später mit Abgeltungsteuer | wie UG |
| Wahrnehmung bei „Fachbereichen in größeren Häusern" | Freelancer | „UG" wird von Einkäufern als Mini-GmbH gelesen; mit Versicherung + Vertrag akzeptabel | Standard |
| Zeit bis handlungsfähig | 1 Tag | 2–4 Wochen bis Eintragung (Review) | 2–4 Wochen |
| Umwandlung später | Einbringung in GmbH aufwendig (Bewertung, Vertragsübergang) | Umfirmierung in GmbH durch Kapitalerhöhung auf 25.000 €: Notar ~500–800 €, Verträge bleiben, Handelsregisternummer bleibt | — |

### 2.2 Empfehlung: UG (haftungsbeschränkt) jetzt, GmbH beim zweiten Kopf

Begründung:

1. **Haftung ist das Argument, nicht Steuern.** Als Einzelunternehmer haftest du mit dem Privatvermögen für die Haftungsklausel in deinen AGB, die in B2B-AGB „angreifbar (Kardinalpflichten, § 307 BGB)" ist (Review). Die Versicherung deckt Vermögensschäden bis zur Deckungssumme, nicht Erfüllungsansprüche, nicht Vertragsstrafen, nicht die Insolvenz eines Kunden nach Vorkasse-Streit. Die Hülle trägt den Rest.
2. **UG statt GmbH, weil das Geld an der Stelle nichts bringt.** 12.500 € gebundenes Stammkapital erhöhen deine Glaubwürdigkeit weniger als eine 1-Mio-€-Vermögensschadenhaftpflicht im Angebot und ein Referenzprojekt. Die Umfirmierung in die GmbH ist im Review ohnehin der geplante Schritt beim Einstieg eines Co-Founders (*„jetzt kündigen, UG in GmbH überführen, ‚wir' wird wahr"*, goCriteria) — dann mit Gesellschaftervertrag, Vesting, Notar 1.000–2.000 €.
3. **Steuerlich passt die UG zu deiner Lage.** Neben einem Konzerngehalt landet jeder Euro Einzelunternehmer-Gewinn im Spitzensteuersatz. In der UG bleiben ~70 % des Gewinns im Unternehmen und finanzieren den zweiten Kopf, die Rücklage für gescheiterte Abnahmen (Dokument 02: 8–10 % je Projekt) und die Gewährleistungs-Tails. Ausschütten kannst du, wenn du kündigst und das Gehalt fehlt. **[Steuerberater]**
4. **Geschäftsführergehalt: erstmal keins.** Solange du angestellt bist, zahlst du dir kein GF-Gehalt; du bist sozialversicherungsrechtlich über den Job abgesichert. Erst bei > 20 h/Woche wird die Selbständigkeit „hauptberuflich" (Krankenkasse informieren, Review risks[8]). **[Steuerberater]**

Wenn du 12.500 € liquide hast und sie zwölf Monate nicht brauchst: GmbH direkt spart die spätere Umfirmierung (~500–800 €) und den Erklärbedarf beim Einkauf. Das ist die einzige Situation, in der ich von der UG abweichen würde.

Nicht die Freiberufler-Frage stellen: Eine Kapitalgesellschaft ist kraft Rechtsform gewerblich. Mit Betrieb/Hosting als Standardleistung wärst du auch als Einzelunternehmer gewerblich (Review risks[8]: „Studio mit Betrieb/Hosting ist gewerblich").

### 2.3 Zeitplan Gründung (Checkliste)

- [ ] **Tag 1–3: Vorbereitung.** Firma festlegen: „vierwochen UG (haftungsbeschränkt)" — Rechtsformzusatz ist Pflicht (§ 5a Abs. 1 GmbHG), ungekürzt. Unternehmensgegenstand: „Entwicklung, Anpassung und Betrieb von Individualsoftware und digitalen Produkten sowie damit verbundene Beratung." Sitz: deine Wohnanschrift oder ein Geschäftssitz (ladungsfähig, kein Postfach; Coworking-Adresse geht, wenn Post zugestellt wird). Stammkapital: 2.500 € (nach Kosten bleibt Luft; 1 € sieht im Register nach nichts aus). Musterprotokoll (Anlage zu § 2 Abs. 1a GmbHG) reicht für Ein-Personen-UG; ein individueller Gesellschaftsvertrag kommt beim Co-Founder.
- [ ] **Tag 3: Notartermin.** Vorlaufzeit 3–10 Tage. Online-Beurkundung per Videokonferenz ist seit 2022 möglich (Notarportal der Bundesnotarkammer, eID nötig) — spart den Termin. Mitbringen: Personalausweis, Firma, Sitz, Gegenstand, Stammkapital.
- [ ] **Tag 5–10: Beurkundung.** Danach: „UG i.G." (in Gründung). Notar meldet zum Handelsregister an, sobald die Einzahlung nachgewiesen ist.
- [ ] **Sofort danach: Geschäftskonto** (Fintech-Konten eröffnen in 1–3 Tagen, Filialbanken 1–2 Wochen; einige verlangen die Eintragung, also vorher fragen). Stammkapital einzahlen, Nachweis an Notar.
- [ ] **Tag 7: Handelsregister-Anmeldung** durch Notar. Eintragung 1–4 Wochen (Review: 2–4). Du bekommst HRB-Nummer + Registergericht → ins Impressum.
- [ ] **Innerhalb 1 Woche nach Eintragung: Gewerbeanmeldung** bei der Gemeinde (§ 14 GewO, 20–60 €, oft online). Gemeinde informiert Finanzamt, IHK, Berufsgenossenschaft automatisch — verlassen würde ich mich nicht darauf.
- [ ] **Fragebogen zur steuerlichen Erfassung** über ELSTER (Pflicht innerhalb eines Monats nach Gründung). Darin: USt-IdNr. beantragen (Kästchen ankreuzen), Regelbesteuerung wählen (siehe 2.5), voraussichtliche Umsätze angeben (realistisch, z. B. 40–60 k€ im ersten Jahr — bestimmt die Voranmeldungsfrequenz). Steuernummer nach 2–6 Wochen, USt-IdNr. vom BZSt nach 1–4 Wochen. **[Steuerberater]** — den Fragebogen füllt idealerweise der Steuerberater.
- [ ] **Transparenzregister**: Eintragung des wirtschaftlich Berechtigten (du) ist Pflicht, Frist kurz nach Eintragung, Bußgeldbewehrt. 10 Minuten online.
- [ ] **Berufsgenossenschaft (VBG)**: Anmeldung innerhalb einer Woche nach Gründung, auch ohne Angestellte (Beitrag als GF ohne Gehalt: minimal oder befreit).
- [ ] **IHK**: Mitgliedschaft automatisch; Grundbeitrag im ersten Jahr bei Kleinunternehmen oft erlassen/reduziert — Antrag stellen.
- [ ] **Impressum, AGB, Angebotsvorlage** auf die UG umstellen (Firma, HRB, Registergericht, GF, USt-IdNr.). AGB § 1 nennt derzeit „Moritz Schumacher, handelnd unter vierwochen" — nach Eintragung ändern.
- [ ] **Steuerberater beauftragen** für laufende Buchhaltung, USt-Voranmeldung, Jahresabschluss. Budget im Review: 1.500–2.500 €/Jahr inkl. IHK.

### 2.4 Was bis zur Eintragung gilt

- **Vor der Beurkundung** bist du Einzelunternehmer bzw. Vorgründungsgesellschaft: unbeschränkte persönliche Haftung für alles, was du in dieser Zeit unterschreibst. Werbung (Website, Gespräche) ist erlaubt; das Impressum nennt dich als natürliche Person, das ist korrekt.
- **Zwischen Beurkundung und Eintragung** (UG i.G.) existiert die Gesellschaft als Vorgesellschaft. Wer für sie handelt, haftet persönlich (Handelndenhaftung § 11 Abs. 2 GmbHG) bis zur Eintragung; die Haftung erlischt mit der Eintragung. Trotzdem: **keinen Kundenvertrag vor Eintragung unterschreiben.** Das Review sagt es ohne Umweg: *„Kick-off-Workshop nur nach UG-Eintragung/Versicherungsbeginn — sonst Start um eine Woche schieben, ehrlich kommuniziert."* (gruender-risiko, firstThirtyDays)
- **Angebote in dieser Phase** (ab Beurkundung) dürfen raus, mit diesem Satz auf Seite 1:

  > Vertragspartner wird die vierwochen UG (haftungsbeschränkt), derzeit in Gründung (Beurkundung am [Datum]). Die Beauftragung erfolgt nach Eintragung im Handelsregister, voraussichtlich ab [Datum]. Der Projektstart verschiebt sich dadurch nicht: Kick-off am [Datum].

- **Zahlungen** nimmst du erst nach Eintragung an, auf das Geschäftskonto der UG. Keine erste Rate aufs Privatkonto — das ist die Vermögensvermischung, die die Haftungsbeschränkung später aushebelt.
- **Gerichtsstand** in AGB § 11 („PLATZHALTER") = Sitz der UG. Vereinbarung wirksam nur zwischen Kaufleuten (§ 38 ZPO); dein Kunde ist Unternehmer, deine UG Formkaufmann — passt. **[Anwalt]**

### 2.5 Warum keine Kleinunternehmerregelung (§ 19 UStG)

Nein, aus fünf Gründen:

1. **Die Grenze ist nach dem ersten Auftrag gerissen.** Seit 2025: 25.000 € Vorjahresumsatz, 100.000 € laufend. Ein Projekt zu 12.500 € plus Betrieb, und das zweite Projekt sprengt die 25.000 €. Der Wechsel in die Regelbesteuerung mitten im Jahr zwingt dich, Rechnungen und Angebote umzustellen — vor Kunden, die du gerade gewonnen hast.
2. **Deine Kunden sind vorsteuerabzugsberechtigt.** Für einen Handelsbetrieb ist „12.500 € netto zzgl. 19 % USt" exakt so teuer wie „12.500 € ohne USt". Die Regelung bringt B2B keinen Preisvorteil.
3. **Du verlierst den Vorsteuerabzug** auf Notar, Anwalt, Steuerberater, AI-Tooling, Hosting, Gerät: bei ~300 €/Monat Tooling plus ~3.000 € Einmalkosten sind das im ersten Jahr ~1.200 € Vorsteuer, die weg wären.
4. **Signalwirkung.** Der Satz „Gemäß § 19 UStG wird keine Umsatzsteuer berechnet" auf einer Rechnung an einen Fachbereich eines größeren Hauses sagt: Hobby. Genau die Zielgruppe, die der Review als „scheitert am DSB, nicht am Preis" beschreibt, liest solche Signale.
5. **Alle Preise auf der Seite sind bereits „netto"** kommuniziert (Festpreis ab 12.500 € netto, Betrieb 290 €/Monat). Das ist konsistent nur mit Regelbesteuerung.

Konsequenz: Im Fragebogen zur steuerlichen Erfassung Regelbesteuerung wählen; USt-Voranmeldung quartalsweise oder monatlich, je nach Festsetzung des Finanzamts **[Steuerberater]**; Rechnungen mit USt-IdNr., fortlaufender Nummer, Leistungszeitraum, Netto/USt/Brutto. E-Rechnungspflicht im B2B: Seit 2025 musst du E-Rechnungen (XRechnung/ZUGFeRD) empfangen können; ausstellen musst du sie ab 2027 (bei Vorjahresumsatz ≤ 800 k€ ab 2028). Rechnungstool wählen, das das kann.

---

## 3. Versicherung

### 3.1 Was du brauchst, was nicht

| Versicherung | Brauchst du? | Deckung, die du anfragst | Kostenrahmen |
|---|---|---|---|
| **IT-Vermögensschadenhaftpflicht** (IT-Berufshaftpflicht) | Ja, vor dem Kick-off | 1.000.000 € je Schadensfall Vermögensschäden (250–500 k€ sind marktüblich für Einzelne; Fachbereiche größerer Häuser verlangen im Lieferantenfragebogen oft 1 Mio.); 2× jährliche Maximierung; Selbstbehalt 500–1.000 € | Review: 600–1.500 €/Jahr bei < 100 k€ Umsatz — die IT-Haftpflicht ist der größte Posten davon |
| **Betriebshaftpflicht** (Personen-/Sachschäden) | Ja, meist im Paket mit der IT-Haftpflicht | 3–5 Mio. € pauschal Personen-/Sachschäden; Tätigkeitsschäden (Schäden an Kundensystemen, an denen du arbeitest) eingeschlossen | im Paket 100–300 €/Jahr Aufschlag |
| **Cyber-Baustein** (eigene Systeme, Datenverlust, Betriebsunterbrechung) | Sinnvoll, sobald Betrieb (290 €/Monat) läuft — du hostest dann Kundendaten | 250–500 k€ | 200–500 €/Jahr |
| **D&O** (Geschäftsführerhaftung) | Nein, solange du alleiniger Gesellschafter-GF bist | — | — |
| **Rechtsschutz Firma** | Optional; deckt Abmahnstreit (UWG) und Vertragsstreit teils nicht (Vertragsrechtsschutz ist selten und teuer) | — | 300–600 €/Jahr |
| **Krankentagegeld/BU** | Privat, hängt am Job; nicht Teil dieses Dokuments | — | — |

Was die Vermögensschadenhaftpflicht **nicht** deckt, und was du deshalb nicht verkaufen darfst, als sei es versichert: Erfüllungsansprüche (der Kunde bekommt keine funktionierende Software → das ist dein Werkvertragsrisiko, die entfallende zweite Rate), Nachbesserung (Gewährleistungsaufwand), Vertragsstrafen, vorsätzliche Verstöße, Bußgelder (DSGVO, KI-VO). Das Review rechnet dafür mit einer Rücklage von 8–10 % je Projekt (Dokument 02). Die Versicherung ist für den Fall gedacht, in dem eine Schnittstelle Bestelldaten doppelt ins ERP schreibt und der Großhändler 40.000 € Schaden hat.

### 3.2 Rechercheliste: drei Anbieter zum Vergleich

Alle drei am selben Tag anfragen, gleiche Angaben (UG i.G., 1 Person, Individualsoftware + Betrieb, Umsatz Jahr 1 geschätzt 50 k€, DACH), Angebote innerhalb von 2–5 Werktagen. Namen sind Rechercheeinstieg, keine Empfehlung — Konditionen ändern sich, prüf sie selbst.

| Anbieter | Warum auf der Liste | Was du konkret fragst |
|---|---|---|
| **exali** (Spezialmakler IT/Digital, Vermögensschaden + Betriebshaftpflicht kombiniert) | Zielgruppe exakt Solo-IT-Dienstleister; Online-Abschluss; Rückwärtsdeckung üblich | Sind Ansprüche aus **Terminüberschreitung** (Vier-Wochen-Zusage) gedeckt oder als Erfüllungsanspruch ausgeschlossen? Ist **KI-generierter Code** und daraus folgende Urheberrechts-/Lizenzverletzung (Open-Source-Copyleft) gedeckt? |
| **Hiscox** (IT-Haftpflicht direkt, auch über Makler) | Etablierter Gewerbeversicherer für Beratung/IT, wird von Konzern-Einkäufern anerkannt | **Subunternehmer/Freelancer** mitversichert (Review-Weg B: erster Freelancer ab Auftrag 4)? **Auslandsdeckung** AT/CH? Nachhaftung nach Vertragsende (mind. 3 Jahre für den Gewährleistungs-Tail)? |
| **Markel** (IT-/Medien-Haftpflicht) oder alternativ **andsafe** / **Finanzchef24** (Vergleichsplattformen mit mehreren Versicherern) | Zweite Direktoption bzw. Marktüberblick in einer Anfrage | Was kostet der Sprung von 500 k€ auf 1 Mio. € Vermögensschaden? Gibt es einen **Cyber-Baustein** im selben Vertrag? Wie sind **Datenverlust/Datenwiederherstellung** beim Kunden gedeckt? |

Vergleichskriterien (Checkliste für die drei Angebote):

- [ ] Deckungssumme Vermögensschaden ≥ 500 k€, Option 1 Mio. € bepreist
- [ ] Betriebshaftpflicht inkl. Tätigkeitsschäden an fremden IT-Systemen und Daten
- [ ] Erfüllungsansprüche ausgeschlossen (normal) — aber **Folgeschäden aus Mängeln** gedeckt
- [ ] Verstöße gegen Datenschutz (Schadensersatz Dritter, nicht Bußgeld) gedeckt
- [ ] Urheber-/Lizenzrechtsverletzung gedeckt, ausdrücklich auch bei AI-generiertem Code und Open-Source-Komponenten
- [ ] Subunternehmer mitversichert
- [ ] Rückwärtsdeckung ab Beurkundungsdatum; Nachhaftung ≥ 3 Jahre
- [ ] Geltungsbereich mind. EU, ideal weltweit außer USA/Kanada (Kunden in AT/CH)
- [ ] Selbstbehalt und Maximierung pro Jahr
- [ ] Bestätigung für Lieferantenfragebögen („Versicherungsbestätigung") in 48 h erhältlich
- [ ] Monatlich/jährlich kündbar; Beitrag bei Umsatzsprung anpassbar

Ins Angebot an Kunden gehört danach ein Satz: „Versichert über eine IT-Vermögensschadenhaftpflicht mit [Deckungssumme] € je Schadensfall ([Versicherer]). Bestätigung auf Anfrage." Das ist der Vertrauensbeleg, den eine UG braucht.

---

## 4. Website-Pflichten

### 4.1 Impressum (§ 5 DDG) — Checkliste

Das Impressum hat heute fünf PLATZHALTER (Straße, PLZ/Ort, E-Mail, Telefon, USt-IdNr.) und einen veralteten Hinweis auf die EU-OS-Plattform (Review, trust-beweis-ethik T6). Die Seite ist unter der Cloud-Run-URL öffentlich; *„noindex schützt nicht vor § 5 DDG und Art. 13 DSGVO"*.

Pflichtangaben, sobald die UG eingetragen ist (davor: dein Name als natürliche Person, Anschrift, E-Mail, Telefon, USt-IdNr. sobald vorhanden):

- [ ] Firma mit vollständigem Rechtsformzusatz: „vierwochen UG (haftungsbeschränkt)"
- [ ] Ladungsfähige Anschrift (Straße, Nr., PLZ, Ort — kein Postfach)
- [ ] Vertretungsberechtigter: „Geschäftsführer: Moritz Schumacher"
- [ ] E-Mail-Adresse (Pflicht) und ein zweiter schneller Kontaktweg (Telefonnummer; eine Rufnummer ist nach EuGH nicht zwingend, aber der Weg der geringsten Diskussion — eigene Nummer, siehe 1.5)
- [ ] Registergericht und Registernummer: „Amtsgericht [Ort], HRB [Nummer]"
- [ ] USt-IdNr. gemäß § 27a UStG
- [ ] Verantwortlich nach § 18 Abs. 2 MStV nur, wenn journalistisch-redaktionelle Inhalte (Blog) — dann Name + Anschrift; sonst Zeile löschen
- [ ] **OS-Plattform-Hinweis löschen** (Plattform 2025 eingestellt). Stattdessen, weil B2B-only, ein Satz zu § 36 VSBG: „Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen." (Bei ≤ 10 Mitarbeitenden nicht einmal Pflicht, aber unschädlich.)
- [ ] Impressum von jeder Seite in maximal zwei Klicks erreichbar — auch aus dem geöffneten Chat (Review CF-05: Footer-Links im Chatmodus ausgeblendet)
- [ ] Ich-/Wir-Form konsistent mit der Landing (Review T19): Nach der Entscheidung „ehrlich: Moritz baut selbst" ist „ich" überall richtig, „wir" nur für die UG als Vertragspartner.
- [ ] Keine „PLATZHALTER"-Strings mehr in `app/(site)/impressum/page.tsx`, `datenschutz/page.tsx` (Stand-Datum), `agb/page.tsx` (Gerichtsstand)

### 4.2 Datenschutz — was der Code tut und was die Erklärung sagen muss

Grundsatz aus dem Review: Die Erklärung muss den **realen** Funnel beschreiben, nicht den alten. *„Datenschutzerklärung beschreibt noch ein E-Mail-Gate, das nicht mehr existiert; Buchung erhebt Unternehmen, Firmengröße, Branche, Agenda, § 6 nennt sie nicht; bookings speichern die IP dauerhaft, § 7 spricht von ‚kurzzeitig'; Funnel-Events fehlen ganz."* (gruender-risiko, coreMeasures[4]). Und T10: *„§7 behauptet ‚Ein Tracking zu Werbezwecken … gibt es nicht', während der Code Werbe-Attribution einsammelt."*

**Entscheidungen, die du triffst (dann Text und Code angleichen):**

1. **Vertex-Region.** `lib/config.ts` setzt `VERTEX_LOCATION` auf `global` (Fallback), Modell `gemini-3.5-flash-lite`. Global heißt: Google routet die Anfrage in jede Region, auch USA. Zwei Wege:
   - **Empfehlung: EU-Region.** `VERTEX_LOCATION=europe-west4` (oder `europe-west1`) und ein Modell, das dort verfügbar ist (Review nennt `gemini-2.5-flash`; verfügbare Modelle je Region in der Vertex-Doku prüfen). Umstellung per Env-Variable ohne Code-Änderung, Latenz/Preis testen. Dann lautet die Erklärung: Verarbeitung in Rechenzentren in der EU; Google als Auftragsverarbeiter; Drittlandübermittlung nur im Rahmen des Google-Cloud-DPA (Support/Zugriff aus Drittländern, abgesichert über EU-Standardvertragsklauseln und den Angemessenheitsbeschluss EU-US Data Privacy Framework).
   - Alternative: global bleiben und den Hinweis **in den Chat-Einstieg** schreiben, nicht nur in die Erklärung: „Ihre Eingaben werden von Google Vertex AI verarbeitet, ggf. auch außerhalb der EU." Das Review hält das für ein Ausschlusskriterium bei jedem Mittelständler mit IT-Abteilung. Nimm den ersten Weg.
2. **Keine personenbezogenen Daten im Chat.** Der Berater fordert Leute auf, Prozesse zu beschreiben. Ein Satz unter dem Eingabefeld: „Bitte keine Namen oder personenbezogenen Daten eingeben — für die Einschätzung reicht der Ablauf." Das reduziert deine Verantwortung als Verantwortlicher erheblich.
3. **IP-Speicherung.** Entweder Code so ändern, dass IPs bei Dialogen und Buchungen nach 30 Tagen gelöscht werden (Cron/TTL in Firestore), oder die Erklärung sagt „dauerhaft bis Löschung des Datensatzes" — nur eines von beiden. Empfehlung: 30-Tage-TTL, Rechtsgrundlage Art. 6 Abs. 1 lit. f (Missbrauchsschutz), das steht schon so im Text.
4. **Reichweitenmessung und Werbe-Attribution.** `lib/track.ts` merkt gclid/gbraid/wbraid/utm_* und Referrer/Landing, `lib/events.ts` schreibt page_view-Events mit Session-ID nach Firestore. Rechtlich zwei Ebenen:
   - Speichern/Auslesen auf dem Endgerät (sessionStorage/localStorage) braucht nach § 25 TDDDG eine Einwilligung, es sei denn „unbedingt erforderlich". Eine Session-ID für die eigene, cookielose Reichweitenmessung wird von den Aufsichtsbehörden teils als erforderlich akzeptiert, wenn nicht geräteübergreifend und nicht mit Dritten geteilt; **Werbe-Attribution (gclid) ist es nicht.** **[Anwalt]**
   - Empfehlung für die Startphase: Session-ID nur im Speicher der Seite (kein Storage), keine Cookies, keine Drittanbieter-Skripte — dann keine Consent-Leiste. gclid/utm: entweder nur serverseitig beim Buchungs-Submit aus der URL lesen (kein Storage), oder für den Google-Ads-Test (Dokument 04) einen Einwilligungs-Toggle in das Buchungsformular setzen: „[ ] Ich bin einverstanden, dass die Herkunft meines Besuchs (Kampagnenparameter) zur Erfolgsmessung an Google Ads übermittelt wird." Ohne Häkchen kein Conversion-Upload.
   - Der Satz „Ein Tracking zu Werbezwecken gibt es nicht" bleibt nur stehen, wenn er stimmt. Sonst durch die ehrliche Beschreibung ersetzen.
5. **Google Workspace statt privatem Gmail.** Versand der Buchungsbestätigung per Gmail und Kalendereintrag per Google Calendar (Review T10, Bcc an Absender): Für ein privates Gmail-Konto gibt es keinen Auftragsverarbeitungsvertrag; Google Workspace (Business) enthält das Data Processing Addendum. Also: Workspace-Konto für vierwochen.de, Mail/Kalender-API darüber.

**AVV / Auftragsverarbeitung mit Google — Checkliste:**

- [ ] Google Cloud: „Cloud Data Processing Addendum" (CDPA) ist Bestandteil der Google-Cloud-Bedingungen; in der Console unter Rechtliches/Compliance die Zustimmung prüfen, EU-Standardvertragsklauseln (Modul 3) akzeptieren, Kopie (PDF) im Ordner „Datenschutz" ablegen. Gilt für Cloud Run, Firestore, Vertex AI.
- [ ] Google Workspace: „Data Processing Amendment" im Admin-Konsole-Bereich Rechtliches akzeptieren, PDF ablegen.
- [ ] Google Ads (nur bei Conversion-Upload, Dokument 04): Google ist dort eigenständig Verantwortlicher; „Google Ads Data Protection Terms" akzeptieren; Erklärung ergänzen.
- [ ] Vertex AI: Bestätigung aus der Google-Cloud-Dokumentation ablegen, dass Kundendaten nicht zum Modelltraining verwendet werden (Google Cloud „Generative AI"-Bedingungen; Datum und Fundstelle notieren — nicht aus dem Gedächtnis zitieren).
- [ ] Verzeichnis der Verarbeitungstätigkeiten (Art. 30 DSGVO) — Pflicht für jedes Unternehmen, eine Seite reicht: Website-Hosting, KI-Dialog, Buchung, Reichweitenmessung, E-Mail, Buchhaltung. Vorlage der Landesdatenschutzbehörden.
- [ ] Technisch-organisatorische Maßnahmen (Art. 32) als Liste: Verschlüsselung in Transit/at rest (Google Standard), Zugriff nur über dein Workspace-Konto mit 2FA, Firestore-Regeln, Löschfristen (30 Tage Logs/IP, Dialoge ohne Buchung nach [90] Tagen), Backup.
- [ ] Datenschutzbeauftragter: nicht nötig (< 20 Personen mit regelmäßiger Datenverarbeitung, keine Kerntätigkeit besonderer Kategorien).

**Datenschutzerklärung — Abschnitte, die drin sein müssen (Art. 13):**

- [ ] Verantwortlicher (UG, Anschrift, E-Mail)
- [ ] Hosting Google Cloud (EU-Region, Logs 30 Tage)
- [ ] KI-Dialog: Zweck, Rechtsgrundlage (Art. 6 Abs. 1 lit. b — vorvertraglich — bzw. lit. f), Empfänger Google Vertex AI, Region, Speicherdauer der Dialoge in Firestore, IP 30 Tage, Hinweis „keine personenbezogenen Daten eingeben"
- [ ] Buchung: alle Felder nennen — Name, E-Mail, Rufnummer, Kanal, Unternehmen, Firmengröße, Branche, Agenda, Termin, Kampagnenparameter (falls erhoben), IP; Speicherdauer; Kalender/Meet/Mail über Google Workspace
- [ ] Reichweitenmessung: was (page_view, Pfad, Referrer, Session-ID), wie (First-Party, keine Cookies), Rechtsgrundlage, Speicherdauer, keine Weitergabe
- [ ] Werbe-Attribution: nur wenn aktiv, mit Einwilligung
- [ ] Drittlandübermittlung: konkret, nicht pauschal
- [ ] Betroffenenrechte, Beschwerderecht bei der Aufsichtsbehörde (zuständige Landesbehörde nach Sitz nennen)
- [ ] Stand-Datum (heute PLATZHALTER)

Für Kundenprojekte mit Betrieb: **AVV mit dem Kunden** (Art. 28) als Anlage zum Betriebsvertrag — Muster der Aufsichtsbehörden oder vom Anwalt mit den AGB (4.5). **[Anwalt]**

### 4.3 EU-KI-VO Art. 50 — Offenlegung

Art. 50 gilt seit 2. August 2026 (Review CF-06). Für den KI-Berater bist du Betreiber (und, weil du ihn unter eigenem Namen anbietest, mit hoher Wahrscheinlichkeit auch Anbieter) eines KI-Systems, das mit natürlichen Personen interagiert. Pflicht: Die Person muss wissen, dass sie mit einer KI spricht, spätestens bei der ersten Interaktion, es sei denn, es ist offensichtlich. Ein Chat, der „Willkommen!" sagt, ist nicht offensichtlich.

Stand im Code: `ChatDock.tsx` trägt inzwischen „KI-Berater · 3 Fragen, eine Minute · Moritz prüft jede Skizze persönlich" und „Sie sprechen mit dem KI-Berater von vierwochen". Checkliste, damit das hält:

- [ ] Hinweis **vor** dem ersten Wort sichtbar, in jedem Einstieg: Dock auf der Landing, geöffnetes Panel, Deep-Link direkt in den Chat, Mobile 360 px
- [ ] Erste Assistenten-Nachricht beginnt mit der Rolle, nicht mit „Willkommen!" — z. B. „Ich bin der KI-Berater von vierwochen. Drei Fragen, dann bekommen Sie einen Richtpreis mit Herleitung."
- [ ] Ergebniskarte: „Richtpreis, von der KI aus Ihren Angaben berechnet. Moritz prüft die Skizze persönlich vor dem Gespräch; das Festangebot kann abweichen." Das ist gleichzeitig die UWG-Absicherung gegen den Lockvogel-Vorwurf (Review T11: Prompt drückt systematisch nach unten). Prüfe die Prompt-Anweisung „Im Zweifel die niedrigere Zahl" — sie ist rechtlich das Problem, nicht die Anzeige.
- [ ] Fehler- und Rate-Limit-Texte nennen ebenfalls den KI-Berater und den Weg zur Buchung
- [ ] Art. 4 KI-VO (KI-Kompetenz, seit Februar 2025): halbe Seite Dokumentation, was der Berater tut, welche Grenzen (kein Angebot, keine Rechtsberatung), wie du Ausgaben prüfst. Ablegen, nicht veröffentlichen.
- [ ] Kein Emotionserkennungs-, Scoring- oder Profiling-Anteil im Prompt (wäre eine andere Risikoklasse). Der „savings"-Wert wird intern gerechnet und nicht gezeigt — lassen.
- [ ] In der Datenschutzerklärung und auf der Ergebniskarte: keine automatisierte Entscheidung mit Rechtswirkung (Art. 22 DSGVO) — der Richtpreis bindet niemanden.

### 4.4 UWG — was die Seite nicht mehr behaupten darf

Konkurrenten und Wettbewerbsverbände können abmahnen; das Review beziffert *„1.000–2.000 € Anwaltskosten plus Unterlassung"* je Abmahnung und bei Konzernkunden zusätzlich *„Anfechtung wegen arglistiger Täuschung (§ 123 BGB) und Rückabwicklung"* (gruender-risiko, coreMeasures[1]).

| Verboten (Fundstelle Review) | Warum | Ersatz im Wortlaut |
|---|---|---|
| „Wir bauen", „festes Team je Projekt", „Am Projekt arbeitet nie nur eine Person allein", „erfahrene Entwickler verantworten jede Zeile", Prompt-Anweisung, die Einzelperson zu verschleiern (T1, CP-02) | Tatsachenbehauptung über die Person des Unternehmers, § 5 Abs. 2 Nr. 3 UWG | „Ich baue Ihre Software selbst — mit AI als Werkzeug. Ein Ansprechpartner, keine Übergabekette. Fällt er aus, übernimmt ein benannter Vertretungspartner, mit dem Sie im Kick-off Kontakt haben." (Nur, wenn es den Partner gibt. Sonst den zweiten Satz streichen.) |
| Showcase-Karten in Vergangenheitsform, mit Branche und Mitarbeiterzahl, unter „Arbeiten" (CP-01) | Vortäuschen abgeschlossener Kundenprojekte, § 5a UWG | Kicker „Beispiele", Zukunftsform: „So könnte Ihr Auftragscockpit aussehen." Keine Branchen-/MA-Angabe. Die einzigen echten Arbeiten sind diese Website und die drei iOS-Apps — verlinken. |
| „12 Monate Garantie" / „24 Monate Garantie" (T12) | Gesetzliche Werkvertrags-Gewährleistung ist 2 Jahre (§ 634a BGB). „Garantie" für das Gesetzliche ist irreführend und löst Garantierecht (§ 443 BGB) aus | „24 Monate Gewährleistung — die volle gesetzliche Frist, nicht verkürzt. Mängel im vereinbarten Umfang behebe ich kostenfrei." Wenn du eine echte Garantie willst (z. B. Reaktion am nächsten Arbeitstag), muss sie über das Gesetz hinausgehen und als Garantieerklärung mit Bedingungen stehen. **[Anwalt]** |
| Durchgestrichener „Statt-Preis" 16.000–24.000 € (CP-10, T15) | Suggeriert eigenen Vorherpreis; unbelegter Marktvergleich, § 5 Abs. 1 Nr. 2, § 6 UWG | Rechenbeispiel mit Quelle: „Zum Vergleich: 20 Tage Senior-Entwicklung zu Tagessätzen von 800–1.200 € ergeben 16.000–24.000 € — ohne Festpreis und ohne Abnahmezusage." |
| Drei Fassungen der Zusage: „Läuft es nicht, kostet es nichts" (Meta-Description), „zweite Hälfte entfällt", „2. Rate erst nach Abnahme" (CP-04, T5) | Widersprüchliche Angaben werden zu deinen Lasten ausgelegt; die 100 %-Fassung ist zudem falsch | Überall exakt `ACCEPTANCE_PROMISE`: „Besteht die Abnahme nicht, entfällt die zweite Rate." Meta-Description in `app/layout.tsx` ändern. |
| Kundenreferenzen, Logos, Zitate, „Kunden aus Konzernen", Sterne-Bewertungen | Keine vorhanden; erfundene Bewertungen sind per se unlauter (Anhang zu § 3 Abs. 3 UWG Nr. 23b/23c) | Nichts. Erst nach schriftlicher Freigabe des ersten Referenzkunden (Referenzklausel, 4.5). |
| Arbeitgebername, „Vorstandsreferent bei …" | Geheimhaltung/Loyalität (Abschnitt 1), plus Eindruck, der Konzern stehe hinter dem Angebot | „Programm-Manager in einem börsennotierten Industrieunternehmen; dort Reporting von >32 auf ~6 h je Zyklus gebracht, ~30 KI-Anwendungsfälle identifiziert, zwei produktiv." |
| Preise ohne Hinweis auf Netto/B2B | Öffentliche Seite; Preisangabenverordnung gilt gegenüber Verbrauchern | Bei jedem Preis: „netto zzgl. USt. Angebot ausschließlich für Unternehmer (§ 14 BGB)." Ein Satz im Footer und auf der Ergebniskarte. |
| „In vier Wochen live" ohne Bedingung | Zulässig als Leistungsversprechen — aber nur, wenn die Mitwirkungsbedingung sichtbar ist | „In vier Wochen live — ab Kick-off, bei Zugängen und Entscheidungen Ihrerseits bis Tag 3." |
| Zwei Marken auf einer Domain, alte Seite mit anderen Aussagen (T8, MV-02) | „Beweismaterial gegen ihn" — Selbstwiderlegung | Alte Routen per Redirect auf die eine Landing; Varianten-Index aus der Produktion. |

Regel für alles, was neu geschrieben wird: Jede Zahl, jede Personenangabe, jeder Vergleich muss auf Nachfrage mit einem Dokument belegbar sein. Was du nicht belegen kannst, steht nicht auf der Seite.

### 4.5 AGB — Punkte für den Anwalt

Dokument 02, Abschnitt 4, enthält bereits die Werkvertragsseite (§ 631, § 640, § 634a, Mitwirkung, Change-Requests, Abnahmeprotokoll). Hier nur, was dort fehlt oder sich aus diesem Dokument ergibt. Alles **[Anwalt]**; Budget 800–1.500 € für AGB + Angebotsmuster (Review).

1. **Vertragspartner.** § 1 auf die UG umstellen (Firma, Sitz, HRB). Bis zur Eintragung: Angebote mit dem Satz aus 2.4, keine Verträge.
2. **Haftung (§ 8).** Heute: Kardinalpflichten begrenzt auf den Auftragswert. Das Review nennt genau diese Klausel „angreifbar". Vorschlag zur Prüfung: bei einfacher Fahrlässigkeit Begrenzung auf den vertragstypisch vorhersehbaren Schaden, der Höhe nach auf die Deckungssumme der Vermögensschadenhaftpflicht (z. B. 500.000 € bzw. 1 Mio. €), mindestens aber den Auftragswert; Datenverlust nur, soweit bei ordnungsgemäßer Sicherung durch den Kunden vermeidbar — mit ausdrücklicher Datensicherungspflicht des Kunden in § 10. Deckungssumme im Vertrag nennen, damit die Grenze als angemessen gilt.
3. **Referenzklausel (§ 9) drehen.** Heute verbietet sie jede Referenznennung; *„Solange die Klausel steht, kann es strukturell nie öffentliche Referenzen geben"* (T17). Neu: „Der Auftragnehmer darf den Auftraggeber mit Firmenname und Logo als Referenz nennen und das Projekt in allgemeiner Form (Art des Werkzeugs, Branche, Nutzen) beschreiben, sofern der Auftraggeber nicht schriftlich widerspricht. Vertrauliche Inhalte, Zahlen und Zugangsdaten bleiben ausgenommen." Plus im Angebot: Referenzrabatt (Dokument 02) als Individualvereinbarung, damit die Freigabe Vertragsbestandteil ist.
4. **Gewährleistung (§ 7).** 24 Monate = gesetzliche Frist; so benennen. Klarstellen: Gewährleistung bezieht sich auf die Abnahmekriterien; Änderungen durch Dritte oder durch den Kunden am Code beenden sie für den geänderten Teil; Nachbesserung in angemessener Frist (Dokument 02: 10 Arbeitstage), zwei Fehlversuche, dann Minderung. Keine „Garantie"-Wortwahl in AGB oder Seite, außer als echte, definierte Garantie.
5. **Nicht-Abnahme (§ 5) zu Ende denken.** Was bekommt der Kunde nach gescheiterter Abnahme für die erste Rate? Vorschlag: den aktuellen Stand „wie besehen", einfaches Nutzungsrecht, ohne Gewährleistung; § 6 (Eigentumsübergang bei vollständiger Zahlung) entsprechend ergänzen. Und die Alternative regeln: Kunde kann statt Entfall der zweiten Rate eine kostenlose Nachbesserungsrunde (max. 10 Arbeitstage) wählen — beides ist besser für dich als ein Streit.
6. **Vier-Wochen-Zusage (§ 3).** Klarstellen, dass es kein Fixgeschäft (§ 323 Abs. 2 Nr. 2 BGB) ist: Bei Überschreitung Nachfrist von 10 Arbeitstagen, dann Rücktrittsrecht des Kunden; keine Vertragsstrafe; Fristbeginn ab Kick-off UND vollständigen Zugängen (Dokument 02: Zugänge bis Tag 3).
7. **Betrieb als eigener Vertrag.** 290/990 €/Monat sind ein Dauerschuldverhältnis (Miet-/Dienstvertragselemente), nicht Werkvertrag: eigener kurzer Vertrag mit Leistungsbeschreibung (Hosting, Updates, Monitoring, Sicherheits-Patches; beim Plus-Paket ein Änderungstag/Monat, nicht ansparbar), Verfügbarkeit (z. B. 99,5 % monatlich, ohne Vertragsstrafe, Minderung als einziges Mittel), Reaktionszeit (nächster Arbeitstag), monatlich kündbar, Preisanpassung mit 3 Monaten Ankündigung, Datenherausgabe und Löschung bei Ende (Export innerhalb 30 Tagen, danach Löschung), **AVV als Anlage** (Art. 28 DSGVO), Subunternehmer Google Cloud benannt.
8. **AI-generierter Code und Open Source.** Rechteübertragung in § 6 „soweit urheberrechtlich geschützte Werke entstehen" — an rein KI-generierten Teilen entsteht möglicherweise kein Urheberrecht, das ist für den Kunden unschädlich, sollte aber nicht als Zusicherung eines Urheberrechts formuliert sein. Open-Source-Komponenten: Liste im Übergabeprotokoll, keine Copyleft-Lizenzen (GPL/AGPL) in ausgeliefertem Code ohne schriftliche Zustimmung; Lizenzbedingungen gelten vorrangig.
9. **Subunternehmer.** Recht, Teilleistungen an namentlich benannte Freelancer zu vergeben (Review-Weg B ab Auftrag 4), unter deiner Verantwortung und mit gleicher Vertraulichkeit. Sonst musst du beim ersten Freelancer jeden Kunden fragen.
10. **Vertraulichkeit + Sperrliste.** Vertraulichkeit gegenseitig, 3 Jahre nach Ende; Hinweis, dass der Auftragnehmer keine Aufträge annimmt, die mit Loyalitätspflichten aus einem Arbeitsverhältnis kollidieren — muss nicht in die AGB, gehört aber in deine Angebotsprüfung (1.4).
11. **Textform statt Schriftform** für Änderungen, Abnahmeprotokoll, Kündigungen (§ 126b BGB) — sonst scheitert jede E-Mail-Freigabe an der Form.
12. **Gerichtsstand** = Sitz der UG; Rechtswahl Deutschland; salvatorische Klausel; keine Verbraucher (steht drin, bleibt).
13. **Einkaufsbedingungen des Kunden.** Fachbereiche größerer Häuser schicken eigene AGB. Der Abwehrsatz in § 1 ist da; wichtiger ist die Praxis: kein Auftrag „gemäß unseren Einkaufsbedingungen" ohne Gegenzeichnung deines Angebots als vorrangig. Frage an den Anwalt: Kurzfassung „Individualvereinbarung geht vor" als Deckblatt des Angebots.
14. **Bezahlung-Baustein (2.500–4.000 €)** und **AI-Funktion-Baustein**: bei Zahlungsfunktionen Hinweis, dass der Kunde Vertragspartner des Zahlungsdienstleisters wird; bei AI-Funktionen im Kundenprodukt gilt Art. 50 KI-VO für den Kunden als Betreiber — Hinweis- und Unterstützungspflicht deinerseits, keine Garantie für Modellverhalten. Formulierungsvorschlag vom Anwalt.

---

## 5. Ablage und Belege

Ein Ordner `recht/` (privat, außerhalb des Kunden-Repos) mit:

- [ ] Arbeitsvertrag + Nachträge + Richtlinien, mit den Fundstellen aus 1.2 markiert
- [ ] Anzeige der Nebentätigkeit (gesendet), Eingangsbestätigung, Genehmigung/Auflagen
- [ ] Notarurkunde, Handelsregisterauszug, Gesellschafterliste, Transparenzregister-Bestätigung
- [ ] Gewerbeanmeldung, Steuernummer, USt-IdNr., VBG-Anmeldung, IHK
- [ ] Versicherungspolice + Versicherungsbestätigung (für Lieferantenfragebögen)
- [ ] AGB (Anwaltsfassung, versioniert mit Datum), Angebotsvorlage, Abnahmeprotokoll, Betriebsvertrag, AVV-Muster
- [ ] Google CDPA, Workspace DPA, ggf. Ads-Terms (PDF mit Datum)
- [ ] Verzeichnis der Verarbeitungstätigkeiten, TOM-Liste, KI-Kompetenz-Notiz (Art. 4 KI-VO)
- [ ] Beleg-Liste: die vier belegbaren Fakten mit Quelle (privat), damit du sie bei Nachfrage zeigen kannst, ohne Interna preiszugeben
- [ ] Zeitprotokoll (auch Beweis für Arbeit außerhalb der Arbeitszeit)

Tag-30-Frage in einem Satz: Liegt zu jedem Häkchen in diesem Abschnitt ein Dokument? Wenn nein, ist der erste Kick-off noch nicht erlaubt — nicht wegen der Gutachter, sondern weil du sonst mit deinem Privatvermögen für ein Versprechen haftest, das du gerade erst zu halten lernst.

# 06 — Der zweite Kopf: Produktkopf auf Umsatzbeteiligung

Stand: 2026-09-08. Ziel dieses Dokuments: Du arbeitest in unter sechs Monaten nicht mehr allein, ohne 9.000 € Fixkosten im Monat und ohne eine zweite Fassade auf der Website. Fünf Teile:

1. Rollenprofil „Produktkopf" — Muss, Kann, No-Gos, Scorecard.
2. Deal-Struktur — Umsatzbeteiligung 60/10/30, Rechenbeispiel 18.000-€-Projekt, Jahr mit 12 Projekten, Vergleich zur Anstellung.
3. Wo du ihn findest — acht Kanäle mit Suchstrings im Wortlaut.
4. Ansprache, Auswahl (bezahltes Pilotprojekt), Vertragspunkte, Meilensteine (ab wann suchen, ab wann anstellen, ab wann aufhören).
5. Alternative Co-Founder (Equity 40–50 %, Vesting) — wann das der bessere Weg ist.

Alles mit **[Anwalt]** ist ein Entwurf, den du vor der Unterschrift prüfen lässt. Der Agentur-Gutachter kalkuliert dafür *„Partnervertrag vom Anwalt ~1.500 €"*. Alle Zahlen stammen aus dem Vollreview (`review.json`, `strategies[]`), Lens-Namen in Klammern.

---

## 0. Warum Partner und nicht Anstellung — die Zahlen der Gutachter

Alle fünf Gutachter kommen unabhängig zum gleichen Ergebnis: Das Modell skaliert linear mit Köpfen, und der erste zusätzliche Kopf darf keine Fixkosten haben.

| Größe | Wert laut Review | Quelle |
|---|---|---|
| Angestellter Senior-Produktkopf (DE) | 85.000 € brutto → ~102.000 € AG-Kosten + ~5.000 € Tools = **~107.000 €/Jahr ≈ 8.900 €/Monat** | agentur-operator |
| dito, andere Schätzungen | 7.000–9.000 €/Monat (gruender-risiko); 8–10 k€/Monat (growth); 110–155 k€/Jahr, Mittel 130 k€ (vc-skeptiker) | strategies[].unitEconomics |
| Kapazität eines angestellten Kopfs | 9–10 Projekte/Jahr bei 100 % gefüllter Pipeline (agentur); 8–9 (vc) | unitEconomics |
| Break-even-Ticket mit angestelltem zweiten Kopf | **~16.200 € pro Projekt für null Gewinn**, ~20.000 € für 25 % Marge (agentur); ~19.700 € (vc) | unitEconomics |
| Senior-Freelancer zum Tagessatz | 700–900 €/Tag × 20 Tage = 14.000–18.000 € — *„mehr als der Projektpreis. Ausgeschlossen."* (agentur); 800–1.100 €/Tag × 13 Tage = 10.500–14.000 € (growth) | unitEconomics |
| Umsatzbeteiligung (kein Fixum) | 60 % an den Liefernden: bei 15.000 € → 9.000 € (≈ 75–90 €/h bei 100–120 h), Studio 6.000 € — *„Bei null Auslastung: null Kosten. Das ist das einzige Modell, das bei dieser Preisunsicherheit skaliert"* (agentur); 55–60 % (growth); 60/40 (marke) | unitEconomics |
| Ehrliche Aufwandsspanne pro Projekt all-in | 95–130 h (gruender), 115–135 h (agentur), Mittel 105 h (growth) | unitEconomics |
| Gewährleistungsrücklage | 8 % (agentur) bis 10 % (vc) je Projekt | risks[].mitigation |
| Wie selten der Typ ist | *„Realistisch findet man davon 1 pro Quartal, wenn man gut ist."* | agentur, scalability.ceiling |
| Sourcing-Aufwand | *„Laufend 3–4 Stunden/Woche"* | agentur, coreMeasures |
| Anstellung frühestens | *„wenn drei Monate hintereinander ≥ 3 Abschlüsse/Monat zu ≥ 12k Durchschnittsticket gelaufen sind – frühestens Monat 6–7"* (growth); *„Drei Monate Pipeline (≥ 45.000 € unterschriebene Aufträge) im Voraus, dann Vollzeitwechsel und erste Einstellung"* (vc) | scalability |

Der Satz, den du dir merken sollst (agentur-operator, `pathToNotAlone`): *„Nicht einstellen — partnern. Ein Angestellter kostet ab Tag 1 rund 9.000 €/Monat bei null gesicherter Auslastung; das ist bei diesem Preis ein Verlustgeschäft und bei einem Angestellten-Gründer ohne Nebentätigkeitsgenehmigung juristisch heikel."*

Und die Reihenfolge, die alle fünf bestätigen: **erst 2–3 Referenzen selbst liefern, dann Partner, dann (vielleicht) Anstellung.** Nicht umgekehrt. Die Phase „allein liefern" ist nicht überspringbar, weil Referenzen die einzige Währung sind, mit der du einen guten Kopf gewinnst (marke-positionierung: *„das ist die einzige Währung, mit der man einen zweiten Kopf gewinnt"*).

Drei Regeln, die daraus folgen:

1. **Kein Fixum, kein Tagessatz, kein Gehalt für den ersten zweiten Kopf.** Nur Beteiligung an eingegangenen Zahlungen.
2. **Der Partner steht erst auf der Website, wenn er ein Projekt geliefert hat.** (marke-visuell-Audit: *„erst reale zweite Person, dann Grafik anpassen – nicht umgekehrt."*) Bis dahin bleibt die Seite bei „ein verantwortlicher Kopf + AI".
3. **Auswahl über Probeprojekt, nicht über Interview.** (agentur, risks[4].mitigation)

---

## 1. Rollenprofil „Produktkopf"

Der Agentur-Gutachter beschreibt den Typ so: *„die Kombination Senior-Entwickler + Produktverantwortung + Kundenkontakt + AI-Nativität — die seltenste und teuerste Person im Markt."* Du suchst also nicht „einen Entwickler", sondern jemanden, der dein Versprechen allein erfüllen kann: Kunde + ein Kopf entscheiden, AI baut, keine Übergabekette.

### 1.1 Muss-Kriterien (alle fünf, ohne Ausnahme)

| # | Kriterium | Woran du es erkennst (nachprüfbar) |
|---|---|---|
| M1 | **Hat selbst Produkte bei Kunden abgenommen** — nicht „mitgearbeitet", sondern verantwortet: Umfang entschieden, Abnahme geführt, Nachbesserung getragen. | Kann zwei Projekte mit Kunde, Preisrahmen, Abnahmekriterien und einem Fehler erzählen, der ihn Geld gekostet hat. Referenzkunde nennbar (du rufst an). |
| M2 | **Baut mit AI-Stack als Normalzustand**, nicht als Experiment: Claude Code / Cursor / vergleichbar, eigene Prompts, eigene Vorlagen, weiß, wo AI versagt (Anbindungen an undokumentierte Bestandssysteme — agentur: *„der Teil, bei dem AI kaum hilft"*). | Zeigt ein eigenes Repo oder ein Produkt, das er so gebaut hat. Im Probe-Review-Tag (4.2) sieht man es in 30 Minuten. |
| M3 | **Kann ein Kundengespräch führen und den Zuschnitt entscheiden**: aus einem Prozess in 30 Minuten „Version 1 / später" ableiten, Nein sagen zu Umfang, Preis begründen. Deutsch verhandlungssicher (Zielgruppe DACH-Mittelstand). | Rollenspiel im Erstgespräch (4.1): Du gibst ihm den Fall „Prüfprotokolle Elektrobau", er muss in 10 Minuten Version 1 mit ≤ 10 Abnahmekriterien skizzieren. |
| M4 | **Senior im Sinne von Verantwortung**, nicht Jahre: Standard-Stack (TypeScript/Next.js oder gleichwertig, relationale DB, Cloud-Deployment), Auth/Rollen, PDF, Schnittstellen, Deployment, Monitoring — alles allein, ohne DevOps daneben. | Hat mindestens ein System produktiv betrieben, das noch läuft. |
| M5 | **Freiberuflich/selbstständig mit eigener Firma oder Gewerbe, eigener IT-Haftpflicht, anderen Auftraggebern.** | Rechnungsfähig, Steuernummer, Versicherungsnachweis. Ohne das ist es Scheinselbstständigkeit (4.3). |

### 1.2 Kann-Kriterien (jedes ein Plus, keines Pflicht)

- [ ] Kennt Warenwirtschaft/ERP-Anbindungen aus der Praxis (Testnische Handel/Großhandel).
- [ ] Hat schon Prüf-/Inspektionsprozesse oder Formularlogik mit PDF-Ausgabe gebaut (Testnische Anlagen-/Elektrobau).
- [ ] Bringt 2–3 warme Kontakte mit, die ein Problem haben (vc-skeptiker: *„ein warmes Netzwerk mit 3–5 zahlungsbereiten Kontakten"* ist der einzige Weg, unter sechs Monaten zu bleiben).
- [ ] Sichtbar unter eigenem Namen (LinkedIn, Blog, Vorträge) — dann trägt sein Name auf der Seite echtes Vertrauen.
- [ ] Ex-Agentur, hat die Übergabekette selbst erlebt und hat genug davon (agentur: *„Ex-Agentur-Seniors, die genug von Übergabeketten haben"*).
- [ ] Mobile-Web/Offline-Erfahrung (Baustein „mobil/offline +2.500–4.000").
- [ ] Wohnt in Fahrdistanz zu deinen Kunden (Kick-off vor Ort ist bei Mittelständlern ein Argument).

### 1.3 No-Gos (eines reicht für Absage)

- **„Ich brauche einen Product Owner / eine Spec."** Dann ist er Entwickler, nicht Produktkopf. Das Modell hat keinen, der ihm die Spec schreibt.
- **Will Tagessatz oder Fixum.** Legitim — aber nicht in dieses Modell; bei 700–900 €/Tag übersteigt er den Projektpreis (agentur). Wer das Risiko nicht teilt, teilt auch nicht die Verantwortung.
- **Kein eigenes Unternehmerrisiko, nur ein Auftraggeber, will feste Stunden.** Scheinselbstständigkeit mit Ansage.
- **Kann keine Abnahme erzählen, die schiefging.** Dann hat er noch keine verantwortet.
- **AI als „hab ich mal probiert".** Der Hebel des Modells ist AI-Nativität; nachschulen kannst du dir bei 60 % Beteiligung nicht leisten.
- **Wettbewerbs-/Loyalitätskonflikt**: aktuell angestellt bei einem Anbieter aus derselben Nische, oder Kunde/Lieferant deines Arbeitgebers (deine eigene Loyalitätspflicht, gruender-risiko).
- **Will sofort Equity, bevor ein Projekt gemeinsam gelaufen ist.** Equity gibt es nur nach dem Weg in Teil 5.

### 1.4 Scorecard (nach dem Erstgespräch ausfüllen)

| Kriterium | 0 = fehlt | 1 = vorhanden | 2 = belegt | Punkte |
|---|---|---|---|---|
| M1 Abnahme verantwortet | | | Referenz anrufbar | [ ] |
| M2 AI-Stack als Normalzustand | | | Repo/Produkt gezeigt | [ ] |
| M3 Zuschnitt in 10 Minuten | | | ≤ 10 Kriterien, Nein gesagt | [ ] |
| M4 Betreibt ein System allein | | | läuft heute noch | [ ] |
| M5 Selbstständig, versichert | | | Nachweise da | [ ] |
| Kann: Nische / Netzwerk / Sichtbarkeit | | | | [ ] |
| **Summe (max. 12)** | | | | [ ] |

Regel: **< 8 Punkte oder eine 0 bei M1–M5 → Absage.** 8–9 → bezahlter Review-Tag. ≥ 10 → direkt Pilotprojekt anbieten.

---

## 2. Deal-Struktur: 60 / 10 / 30

### 2.1 Die Regeln (in den Rahmenvertrag, Teil 4.3)

1. **Bemessungsgrundlage sind eingegangene Zahlungen**, nicht der Angebotspreis. Scheitert die Abnahme, entfällt die zweite Rate für beide. Das ist die Zusage an den Kunden, und sie wirkt auf beide Köpfe gleich.
2. **Lieferanteil 60 %** des Projektpreises an den, der baut und die Abnahme verantwortet. Enthält: Kick-off mitführen, Bau, Abnahme, Doku, Übergabe und **die Gewährleistung** (24 Monate Nachbesserung gegenüber den Abnahmekriterien) als eigene Arbeitsleistung.
3. **Vertriebsprovision 10 %** des Projektpreises an den, der den Deal gebracht hat (Erstkontakt + Beratungsgespräch + Angebot). Bringt der Partner einen eigenen Kunden und baut selbst, bekommt er 70 %.
4. **Studio 30 %** netto (bzw. 40 %, wenn du selbst verkauft hast): Marke, Website, KI-Berater, Buchung, Angebots-/Abnahmevorlagen, Starter-Kit, Review vor Abnahme, Tooling, Rechnungsstellung, Inkasso, **Gewährleistungsrücklage 8 %**.
5. **Betrieb 50/50**: Retainer (290 €/Monat oder 990 €/Monat) wird zwischen Studio und dem Kopf geteilt, der das Projekt gebaut hat, solange er Second-Level und den Änderungstag leistet. Hosting läuft über das Studio-Konto (ein Standard-Stack, ein Monitoring).
6. **Review-Rotation als Pflicht**: Vor jeder Abnahme reviewt der jeweils andere Kopf 2–4 Stunden; das ist im Studioanteil enthalten. (agentur: *„AI-generierter Code ohne Review-Zweitpaar ist das Gewährleistungsrisiko der nächsten 12 Monate."*)
7. **Auszahlung 10 Bankarbeitstage nach Zahlungseingang** des Kunden, gegen Rechnung des Partners an das Studio.
8. **Ausfall**: Fällt der Liefernde aus, übernimmt der andere Kopf; der Aufwand wird mit [600] €/Tag gegen künftige Anteile des Ausgefallenen verrechnet. Damit wird die FAQ-Antwort „Was, wenn jemand ausfällt?" wahr, statt behauptet.

Warum 60 und nicht 55: Bei 55 % und 13.000 € Ticket landet der Partner bei 7.150 € für 100–120 h = 60–72 €/h — darunter holt ihn jeder Tagessatz-Auftrag weg. Bei 60 % und dem Ziel-Ticket ≥ 18.000 € liegt er bei 90–108 €/h ohne eigene Akquise. Das ist das Argument, mit dem du ihn gewinnst. 55 % ist die Untergrenze, wenn du ihm zusätzlich das komplette Kick-off abnimmst und selbst mit im Projekt sitzt.

### 2.2 Rechenbeispiel: ein Projekt zu 18.000 € netto

18.000 € ist der Zielwert aus dem Review (vc-skeptiker, Go-Kriterium: *„Durchschnittsticket ≥ 18.000 € über die ersten 5 Projekte"*), z. B. Basis 12.500 € + Systemanbindung 3.000 € + PDF-Dokumente 2.500 €.

**Fall A — du verkaufst, der Partner baut (Standardfall):**

| Posten | Rate 1 (Auftrag) | Rate 2 (Abnahme) | Summe |
|---|---|---|---|
| Kunde zahlt | 9.000 | 9.000 | 18.000 |
| Partner, Lieferanteil 60 % | 5.400 | 5.400 | **10.800** |
| Studio 40 % (30 % + 10 % Provision an dich) | 3.600 | 3.600 | 7.200 |
| davon Gewährleistungsrücklage 8 % vom Preis | 720 | 720 | −1.440 |
| davon Tooling anteilig (AI, Hosting, Testumgebung) | | | −500 |
| **bleibt bei dir** | | | **≈ 5.260** |

Partner: 10.800 € für 100–120 h → **90–108 €/h**, ohne Akquise, ohne Angebotsschreiben, mit fertig qualifiziertem Kunden und Skizze aus dem KI-Berater.
Du: ≈ 5.260 € für deinen Anteil (Beratungsgespräch 0,5 h, Angebot 2 h, Kick-off 3 h, Review 3 h, Abnahme 2 h, Verwaltung 2 h ≈ 15–20 h) → **≈ 260–350 €/h** für Zeit, die du neben dem Job leisten kannst. Genau das ist der Punkt: Der Partner kauft dir Bauzeit ab, die du nicht hast.

**Fall B — Partner bringt den Kunden und baut:** Partner 12.600 € (70 %), Studio 5.400 € − 1.440 € Rücklage − 500 € Tooling = ≈ 3.460 € für Review, Vorlagen, Marke, Rechnungswesen. Deine Zeit: ~6 h. Immer noch gut.

**Fall C — du verkaufst und baust selbst:** 18.000 € bleiben komplett im Studio (minus Rücklage/Tooling). Das ist dein Solo-Fall heute; Fall A ist die Erweiterung, nicht der Ersatz.

**Fall D — die Abnahme scheitert:** Nur Rate 1 fließt. Partner 5.400 € für ~100 h = 54 €/h, Studio 3.600 €. Beide verlieren, keiner verliert alles, keiner kann dem anderen den Schaden zuschieben. Vergleich Anstellung: Der Kopf kostet trotzdem ~8.900 € im Monat, das Studio hat 9.000 € Umsatz und ~9.000 € Kosten (agentur: *„Eine einzige gescheiterte Abnahme ... die Jahresmarge dieses Kopfes ist weg"*).

**Betrieb dazu:** Kunde nimmt 290 €/Monat → 145 € du, 145 € Partner; nimmt er 990 €/Monat inkl. Änderungstag → 495/495, den Tag macht der Partner. 12 Monate Betrieb an einem Fall-A-Projekt bringen dir 1.740–5.940 € zusätzlich, ohne Verkaufsarbeit.

### 2.3 Rechenbeispiel: ein Jahr mit 12 Projekten

Annahmen: Ø 18.000 €, ein Partner ab Monat 1 dieses Jahres, du baust 6 selbst, der Partner baut 6; du bringst 10 Deals, der Partner 2. Rücklage 8 % (17.280 €), Tooling 6.000 € (vc: 4–7 k€), Overhead UG/Buchhaltung/Versicherung/Anwalt 5.000 € (vc). Vertriebszeit ist deine Zeit, kein Cash.

| Posten | Partnermodell | Anstellung (gleiche 12 Projekte) |
|---|---|---|
| Umsatz 12 × 18.000 | 216.000 | 216.000 |
| An den zweiten Kopf | 6 × 10.800 + 2 × 1.800 = **68.400** (nur bei Zahlungseingang) | **107.000** (jeden Monat, egal was kommt) |
| Rücklage 8 % | −17.280 | −17.280 |
| Tooling + Overhead | −11.000 | −11.000 |
| **Bleibt bei dir vor Steuern** | **≈ 119.300** | **≈ 80.700** |
| Deine Stunden (6 Bauten à ~110 h + 12 × ~20 h Vertrieb/Review) | ≈ 900 h → ≈ 132 €/h | ≈ 900 h → ≈ 90 €/h |
| Retainer-Sockel Ende Jahr (Go-Kriterium vc: ≥ 40 % nehmen Retainer → 5 Kunden, z. B. 3 × 290 + 2 × 990) | 2.850 €/Monat Run-Rate, davon ~50 % an den Partner für seine Projekte | 2.850 €/Monat, alles Studio |
| Zweiter Kopf verdient | 68.400 € + Retaineranteil, für ~660 h ≈ 104 €/h | 85.000 € brutto |

**Was passiert, wenn die Pipeline nicht 12 liefert (und das ist im ersten Jahr der Normalfall):**

| Projekte im Jahr (Ø 18.000 €) | 6 | 12 | 18 |
|---|---|---|---|
| Umsatz | 108.000 | 216.000 | 324.000 |
| Partnermodell — an Partner (baut 3 / 6 / 10, bringt 1 / 2 / 4 Deals) | 34.200 | 68.400 | 115.200 |
| Partnermodell — **du vor Steuern** | **≈ 54.200** | **≈ 119.300** | **≈ 171.900** |
| Anstellung — Personalkosten | 107.000 | 107.000 | 107.000 |
| Anstellung — **du vor Steuern** | **≈ −18.600** | **≈ 80.700** | **≈ 180.100** |

Lesart:

- **Unter ~10 Projekten pro Jahr für den zweiten Kopf ist Anstellung ein Verlustgeschäft.** Break-even Anstellung vs. Partner: 107.000 € / 10.800 € ≈ **10 Projekte, die der angestellte Kopf allein liefert** — das ist exakt seine Vollauslastung (agentur: 9–10 Projekte/Jahr). Anstellung lohnt also nur bei 100 % Auslastung *und* Ø-Ticket ≥ 18.000 €.
- **Bei Ø 13.000 €** (der „realistische Durchschnitt" der Gutachter ohne Preisdisziplin) wären es 107.000 / 7.800 ≈ 13,7 Projekte — mehr, als ein Kopf schafft. Dann gewinnt die Anstellung nie. Zum Vergleich, 12 Projekte à 13.000 €: Partnermodell ≈ 83.100 € für dich, Anstellung ≈ 25.500 €.
- Die 18-Projekte-Spalte setzt voraus, dass du Vollzeit bist und 8 Projekte selbst baust. Das ist die Welt, in der die Anstellungsfrage überhaupt erst sinnvoll ist (Meilenstein 4.4).

### 2.4 Sensitivität, die du kennen musst

| Wenn … | dann … |
|---|---|
| Ø-Ticket fällt auf 13.000 € | Partner bei 7.800 € = 65–78 €/h; du verlierst ihn an den ersten 800-€-Tagessatz-Auftrag. Preisdisziplin (Floor 12.500 €, Bausteine nicht verschenken) ist Partnerbindung. |
| 1 von 5 Abnahmen scheitert | Partner verliert im Schnitt ~10 % seines Jahresanteils (ein Fünftel der zweiten Raten), du auch. Abnahmekriterien-Vorlage aus Dokument 02 ist Pflicht in jedem Partnerprojekt. |
| Partner baut 4 statt 6 | Deine Zahl sinkt um ~2 × 5.260 € = 10.500 €. Kein Fixkostenrisiko. Beim Angestellten wäre es der gleiche Umsatzverlust bei unveränderten 107.000 € Kosten. |
| Partner bringt eigene Kunden (Fall B) | Dein Anteil pro Projekt sinkt auf ≈ 3.460 €, deine Zeit auf ~6 h. Pro Stunde besser als Fall A. Deshalb ist die 10 %-Provision richtig gesetzt: Sie macht den Partner zum Verkäufer, ohne dir das Studio zu nehmen. |

---

## 3. Wo du ihn findest — acht Kanäle

Reihenfolge nach Trefferwahrscheinlichkeit für genau diesen Typ. Budget: 3–4 h/Woche (agentur). Ziel: 15 Namen auf der Liste, 5 Gespräche, 1 Review-Tag, 1 Pilot. Der Agentur-Gutachter: *„nicht über Stellenanzeigen."*

**Für alle Kanäle gilt:** Du suchst Leute, die *schon* selbstständig sind. Angestellte müssten erst kündigen, und das tun sie nicht für eine Beteiligung ohne Pipeline.

### Kanal 1 — Dein eigenes Industrie-Netzwerk (ohne Arbeitgeber-Umfeld)

Ex-Kollegen aus früheren Stationen, Berater, mit denen du KI-Anwendungsfälle umgesetzt hast, Leute aus deinem Studium. **Nicht**: aktuelle Kollegen, Lieferanten oder Kunden deines Arbeitgebers (gruender-risiko: Loyalitätspflicht, § 60 HGB).
- [ ] Liste: 20 Namen, die selbst Software verantwortet haben. Frage an jeden: „Wer ist der beste freie Entwickler, mit dem du je gearbeitet hast, der auch mit Kunden kann?" — du suchst Empfehlungen, nicht Kandidaten.

### Kanal 2 — Indie-Hacker- und AI-Builder-Communities

Leute, die eigene Produkte mit AI-Stack bauen, kennen Abnahme (die eigene) und AI-Nativität. Viele nehmen Kundenprojekte, um den eigenen Weg zu finanzieren.
- Indie Hackers (Forum, Gruppen „Germany"/„DACH"), Hacker News „Who wants to be hired?" (monatlicher Thread, Filter: Remote/Germany, „freelance"), X/Twitter-Suche `#buildinpublic ("Claude Code" OR Cursor) (Deutschland OR DACH OR Berlin OR München OR Köln OR Hamburg)`.
- Discord/Community-Server der AI-Coding-Werkzeuge (Cursor, Claude, Lovable): Kanäle „showcase"/„hire"/„jobs".
- [ ] Wöchentlich 30 Minuten: Wer zeigt ein fertiges, laufendes Produkt und schreibt Deutsch? Direktnachricht (4.1).

### Kanal 3 — Ex-Agentur-Seniors

Tech Leads / Senior Engineers, die nach 5–10 Jahren Agentur in die Selbstständigkeit gegangen sind. Sie haben Abnahmen, Kunden und Übergabeketten erlebt. Dein Pitch „keine Übergabekette" ist für sie geschrieben.
- LinkedIn-Suche (Personen), Filter „Standort: Deutschland/Österreich/Schweiz": `("Tech Lead" OR "Lead Developer" OR "Senior Software Engineer") AND ("Freelance" OR "Freiberufler" OR "selbstständig") AND (Agentur OR Agency OR Digitalagentur)`
- Zweiter String, auf Werdegang zielend: `"ehemals" AND (Agentur OR Digitalagentur) AND ("Full-Stack" OR Fullstack) AND ("Freelance" OR "Freiberufler")`
- [ ] Zusätzlich: Mitarbeiterlisten von 10 mittelgroßen Digitalagenturen in [Deine Region] durchgehen → „ehemals"-Einträge → Profile mit „Freelance" seit < 3 Jahren.

### Kanal 4 — LinkedIn-Suche nach Selbstbeschreibung (Suchstrings im Wortlaut)

LinkedIn-Personensuche versteht `AND`, `OR`, `NOT`, Anführungszeichen und Klammern. Standort-Filter auf DACH, Sprache Deutsch im Profil.

```
1) ("Freelance" OR "Freiberufler" OR "Freiberuflich" OR "selbstständig") AND ("Full-Stack" OR "Fullstack" OR "Product Engineer") AND ("Claude Code" OR "Cursor" OR "AI-first" OR "KI-gestützt" OR "AI-native")

2) ("Individualsoftware" OR "Kundenportal" OR "Webanwendung" OR "interne Tools") AND ("Freelance" OR "Freiberufler") AND ("Next.js" OR "TypeScript" OR "React") AND (Mittelstand OR KMU)

3) ("Fractional CTO" OR "Interim CTO" OR "Product Engineer") AND ("Freelance" OR "verfügbar" OR "available") AND (Deutschland OR DACH)

4) ("baue" OR "entwickle") AND ("mit KI" OR "mit AI" OR "AI-gestützt") AND ("für Kunden" OR "für den Mittelstand") AND ("Freelance" OR "Freiberufler")

5) ("Prüfprotokoll" OR "Warenwirtschaft" OR "ERP-Anbindung" OR "Schnittstelle") AND ("Freelance" OR "Freiberufler") AND ("Entwickler" OR "Engineer")
```

- [ ] Pro String die ersten 100 Treffer sichten, Kriterium: Profil zeigt ein *fertiges* Produkt oder eine *Kundenabnahme* im Text, nicht nur Technologien. Ziel: 3 Namen pro String.
- [ ] Zusätzlich LinkedIn-Beiträge durchsuchen (Suche → „Beiträge"): `"Claude Code" Kunde abgenommen` und `"in vier Wochen" gebaut Kunde` — wer darüber schreibt, denkt schon so wie du.

### Kanal 5 — Freelancer-Plattformen mit Filter

Nicht ausschreiben, sondern Profile durchsuchen und gezielt anschreiben. Ausschreibungen bringen Tagessatz-Angebote, nicht Partner.
- freelancermap, Malt, GULP, Uplink (DACH-Netzwerk für freie Entwickler): Filter „Full-Stack" + „TypeScript/Next.js" + Stundensatz 80–120 € + Verfügbarkeit ≥ 50 % + Profiltext enthält „Produkt", „Abnahme", „Kunde" oder „KI/AI".
- Toptal/ähnliche nur, wenn dort ein deutschsprachiges Profil mit eigenem Produkt auftaucht.
- [ ] Ein Nachmittag pro Plattform, 5 Profile je Plattform anschreiben. Wer im Profil eine Abnahme erzählt, kommt auf die Liste.

### Kanal 6 — Hochschul-Alumni und Ehemalige aus deinem Umfeld

Alumni-Netzwerk deiner Hochschule [Hochschule] (Alumni-Portal, LinkedIn-Alumni-Filter: Hochschule → „Was sie tun: Software" → „Freelance"), Fachschafts-Verteiler, Gründungszentrum der Hochschule, Ehemalige aus Wirtschaftsinformatik/Informatik, die nach 5–8 Jahren selbstständig sind.
- LinkedIn-Alumni-Filter: `Hochschule: [Hochschule]` → Suche im Ergebnis: `("Freelance" OR "selbstständig") AND (Software OR Entwickler OR Engineer)`
- [ ] Zusätzlich das Gründungszentrum anschreiben: „Ich suche einen freien Senior-Produktentwickler auf Umsatzbeteiligung — kennt ihr jemanden, der nach der ersten Gründung wieder frei ist?" Leute nach einem gescheiterten Startup sind oft genau der Typ: Produkturteil, Abnahme, kein Ego.

### Kanal 7 — Meetups und lokale Communities

AI-Coding-, JavaScript/TypeScript- und Gründer-Meetups in [Deine Stadt / Ruhrgebiet / Düsseldorf / Köln] (Meetup.com, Eventbrite, Luma: Suche „AI Builders", „Claude Code", „Cursor", „TypeScript", „Indie Hackers", „Founders").
- Regel: Hingehen, nicht pitchen. Frage an jeden, der etwas Fertiges zeigt: „Machst du das auch für Kunden? Wie sieht bei dir eine Abnahme aus?"
- [ ] 2 Meetups pro Monat, je 2 Gespräche mit Namen mitnehmen. Nach 6 Wochen selbst 15 Minuten vortragen: „Wie ich eine Website mit KI-Berater und Buchung allein in [X] Tagen gebaut habe" — das zieht genau den Typ an, der es auch kann.

### Kanal 8 — Content-Köder unter deinem Namen

Der Partner soll dich finden. Ein LinkedIn-Beitrag pro Woche (aus Dokument 03) mit einem Satz am Ende: „Ich suche einen zweiten Produktkopf auf Umsatzbeteiligung — freiberuflich, AI-Stack, hat selbst Produkte abgenommen. Wer das liest und sich erkennt: Nachricht."
- Plus eine schlichte Seite `vierwochen.de/produktkopf` mit Rollenprofil (1.1), Deal (2.1 in drei Sätzen) und einem Formular. Kein „Wir stellen ein", sondern „Ich suche einen Partner". Der Growth-Gutachter erwartet bei LinkedIn-Outbound unter eigenem Namen eine Antwortquote ≥ 8 % (Go-Kriterium) — das gilt für Partner-Sourcing genauso.
- [ ] Bis Ende Woche 4: Seite live, Beitrag Nr. 1 raus.

---

## 4. Ansprache, Auswahl, Vertrag, Meilensteine

### 4.1 Ansprache im Wortlaut

**LinkedIn-Nachricht (3 Sätze, unter 300 Zeichen, damit sie ohne „mehr" lesbar ist):**

> Hallo [Vorname], ich baue unter vierwochen.de Individualsoftware zum Festpreis in vier Wochen — allein, mit AI, und suche einen zweiten Produktkopf auf Umsatzbeteiligung statt Tagessatz: 60 % vom Projektpreis an den, der baut und abnimmt, kein Vertrieb für dich. Dein [Produkt/Projekt X] sieht genau nach dem aus, was ich meine. 20 Minuten diese Woche?

**Variante für Ex-Agentur-Seniors:**

> Hallo [Vorname], du kennst die Übergabekette Vertrieb → PM → Dev → Kunde aus [Agentur]; ich baue unter vierwochen.de das Gegenteil: ein Kopf entscheidet mit dem Kunden und baut mit AI, Festpreis, vier Wochen. Ich suche dafür einen zweiten Kopf auf 60 % Umsatzbeteiligung, Kunden kommen fertig qualifiziert. 20 Minuten diese Woche?

**Variante für Empfehler (Kanal 1):**

> Hallo [Vorname], kurze Frage ohne Umweg: Wer ist der beste freie Entwickler, mit dem du je gearbeitet hast — einer, der auch mit dem Kunden reden und den Umfang entscheiden kann? Ich suche so jemanden als Partner auf Umsatzbeteiligung für vierwochen.de. Ein Name reicht mir.

**Follow-up nach 5 Tagen (1 Satz):**

> [Vorname], falls es untergegangen ist: Hier ist die Rechnung, was ein 18.000-€-Projekt für dich bedeutet — [Link auf /produktkopf]. Wenn nicht passend, sag es kurz, dann höre ich auf.

**Erstgespräch, 20–30 Minuten, deine fünf Fragen (Antworten in die Scorecard 1.4):**

1. „Erzähl mir das letzte Projekt, das du bei einem Kunden abgenommen hast: Was war der Umfang, was hast du rausgestrichen, was ging schief?" (M1, M3)
2. „Womit baust du heute konkret? Zeig mir kurz, wie dein letzter Prompt für ein Datenmodell aussah." (M2)
3. Fall geben: „Elektrobetrieb, 40 Leute, Prüfprotokolle auf Papier, danach ins Büro abtippen, PDF an Kunden. Vier Wochen, Festpreis. Was ist Version 1, was ist später?" 10 Minuten, er redet. (M3, M4)
4. „Was läuft heute noch produktiv, das du allein gebaut und betrieben hast?" (M4)
5. „Wie viele Auftraggeber hast du dieses Jahr, hast du eine IT-Haftpflicht, und wie viel Kapazität hättest du ab [Monat]?" (M5, Scheinselbstständigkeit)

Deine drei Sätze zum Deal, wenn er fragt: „60 % vom Projektpreis an den, der baut und abnimmt, 10 % an den, der den Kunden bringt, 30 % ans Studio für Marke, Funnel, Vorlagen, Review und Rücklage. Bezahlt wird auf eingegangene Zahlungen — scheitert die Abnahme, entfällt die zweite Rate für uns beide. Betrieb teilen wir 50/50."

### 4.2 Auswahlprozess: bezahlt, gemeinsam, echt

Kein Interview-Marathon, keine Take-home-Aufgabe. Drei Stufen, jede mit Geld und echter Arbeit.

| Stufe | Was | Dauer | Wer zahlt was | Entscheidung |
|---|---|---|---|---|
| 1. Erstgespräch | Fünf Fragen (4.1), Scorecard | 30 min | — | < 8 Punkte → Absage mit Begründung |
| 2. **Bezahlter Review-Tag** | Er reviewt den Code deines Referenzprojekts 1 oder 2 vor der Abnahme: Sicherheit, Datenmodell, Auth/Rollen, Deployment. Schriftliches Ergebnis mit maximal 10 Findings, priorisiert. (agentur, Woche 3: *„einen zum Review des Pilot-Codes einladen (bezahlt, 1 Tag)"*) | 1 Tag | Du zahlst [700–900] € Tagessatz — ja, ausnahmsweise Tagessatz, weil noch kein Projekt da ist | Findings substanziell, Ton klar, keine Ausflüchte → Pilot anbieten |
| 3. **Pilotprojekt gemeinsam** = dein Projekt Nr. 3 | Echter Kunde, echter Festpreis ≥ 12.500 €. **Er baut, du führst Kunde und Abnahme** (agentur, Go-Kriterium: *„Ein Partner-Produktkopf hat ein Projekt vollständig gebaut, der Gründer nur Kunde und Abnahme geführt — und die Abnahme war ohne Nachfrist erfolgreich."*). Deal 2.1 gilt ab Stunde 1, per Einzelauftrag. | 4–5 Wochen | Kunde zahlt, Anteile wie 2.1 | Abnahme ohne Nachfrist + ≤ 120 getrackte Stunden + er will ein zweites → Rahmenvertrag unterschreiben, Name auf die Seite |

Was du im Pilot misst (Zeit-Tracking ab Stunde 1, Phasen wie in Dokument 02):
- [ ] Stunden gesamt ≤ 120 (agentur Go: *„≤ 120 getrackten Stunden"*), Bau ≤ 90.
- [ ] Anzahl Rückfragen an dich pro Woche — Ziel ≤ 3. Mehr heißt: Er entscheidet nicht selbst.
- [ ] Abnahme ohne Nachfrist; null Kriterien nachverhandelt.
- [ ] Der Kunde nennt im Abnahmegespräch seinen Namen als Ansprechpartner. Wenn der Kunde nur dich kennt, war er Entwickler, nicht Produktkopf.
- [ ] Dein Deckungsbeitrag nach Partneranteil und Rücklage ≥ 30 % (agentur Go-Kriterium).

Absage-Text nach Stufe 1 oder 2 (kurz, ehrlich, Tür offen):

> [Vorname], danke für [Gespräch/Review]. Für das Modell brauche ich jemanden, der [Abnahmen allein verantwortet hat / mit dem Kunden den Umfang entscheidet / AI-Stack als Normalzustand fährt] — das sehe ich bei dir noch nicht. Wenn sich das ändert, melde dich, ich meine das ernst.

### 4.3 Vertragspunkte: Freelancer-Rahmenvertrag **[Anwalt]**

Aufbau: **Rahmenvertrag** (einmal) + **Einzelauftrag** je Projekt (eine Seite: Kunde, Preis, Anteil, Abnahmekriterien als Anlage, Termin). Der Rahmenvertrag verpflichtet zu nichts, was nicht im Einzelauftrag steht — das ist der Kern gegen Scheinselbstständigkeit.

**§ 1 Parteien und Gegenstand.** [vierwochen UG (haftungsbeschränkt)] („Studio") und [Partner, Firma/Einzelunternehmen] („Produktkopf"). Gegenstand: projektbezogene Zusammenarbeit bei Individualsoftware-Werkverträgen des Studios mit Endkunden. Kein Arbeitsverhältnis, keine Gesellschaft.

**§ 2 Einzelaufträge.** Jedes Projekt wird per Einzelauftrag angeboten; der Produktkopf kann ablehnen. Inhalt: Kunde, Festpreis, Rollen (wer verkauft, wer baut, wer nimmt ab), Abnahmekriterien (Anlage), Zieltermin, Anteil gemäß § 3.

**§ 3 Vergütung.** Erfolgsbeteiligung an *eingegangenen* Zahlungen des Endkunden: Lieferanteil 60 %, Vertriebsanteil 10 %, Studioanteil 30 %; Betriebsretainer 50/50 solange der Produktkopf den Änderungs- und Second-Level-Anteil leistet. Fälligkeit 10 Bankarbeitstage nach Zahlungseingang gegen Rechnung zzgl. USt. Keine Vergütung ohne Zahlungseingang; kein Fixum, kein Mindestumsatz.

**§ 4 Gewährleistung und Nachbesserung.** Der Produktkopf erbringt die Nachbesserung gegenüber den Abnahmekriterien für die Gewährleistungsdauer des Kundenvertrags (24 Monate) als Teil des Lieferanteils. Bei Ausfall (Krankheit, Nichterreichbarkeit > 5 Arbeitstage bei gemeldetem Mangel) darf das Studio ersetzen und verrechnet [600] €/Tag gegen künftige Anteile. Umgekehrt vertritt das Studio ihn gegenüber dem Kunden — beide Seiten nennen im Kundenvertrag eine Vertretung.

**§ 5 Rechte am Arbeitsergebnis.** Der Produktkopf räumt dem Studio an allen projektbezogenen Arbeitsergebnissen ausschließliche, übertragbare, zeitlich/räumlich unbeschränkte Nutzungsrechte ein, damit das Studio sie wie versprochen **vollständig an den Kunden übertragen** kann („Code gehört dem Kunden"). Ausnahme: vorbestehende eigene Werkzeuge/Bibliotheken des Produktkopfs — die bleiben bei ihm, mit einfachem, unwiderruflichem Nutzungsrecht für Kunde und Studio. Starter-Kit/Vorlagen des Studios bleiben beim Studio, der Produktkopf darf sie für Studio-Projekte nutzen, nicht für eigene.

**§ 6 Scheinselbstständigkeit vermeiden — die Fakten, die im Vertrag *und* in der Praxis stimmen müssen:**
- Eigene Betriebsmittel (Rechner, Lizenzen, AI-Abos), eigener Ort, eigene Zeit; keine Anwesenheits- oder Kernzeitpflicht, keine Studio-E-Mail-Adresse als Pflicht.
- Weisungsfreiheit im *Wie*; gebunden ist er nur an Werkergebnis (Abnahmekriterien), Termin und Qualitätsstandard (Review, Sicherheits-Checkliste).
- Erfolgshonorar statt Zeitvergütung, eigenes Unternehmerrisiko (die Umsatzbeteiligung *ist* das Risiko — das ist ein Argument *für* Selbstständigkeit).
- Mehrere Auftraggeber; kein Ausschließlichkeitsanspruch des Studios; er tritt unter eigenem Namen auf und darf eigene Kunden haben.
- Ablehnungsrecht für jeden Einzelauftrag.
- Optional, wenn er über längere Zeit überwiegend für dich arbeitet: **Statusfeststellungsverfahren bei der Deutschen Rentenversicherung (§ 7a SGB IV) gemeinsam beantragen** — [Anwalt] entscheidet, ob und wann.

**§ 7 Kundenschutz statt Wettbewerbsverbot.** Kein allgemeines Wettbewerbsverbot (wäre bei Freien kaum durchsetzbar und ein Indiz für Scheinselbstständigkeit). Stattdessen: Kunden, die über das Studio kamen, für 24 Monate nach dem letzten Einzelauftrag nicht direkt bedienen; bei Verstoß Vergütung in Höhe des Studioanteils (30 %) auf den Umsatz. Umgekehrt: Kunden, die der Produktkopf mitgebracht hat, bleiben bei Kündigung seine.

**§ 8 Marke und Außenauftritt.** Der Produktkopf darf sich als „Produktkopf bei vierwochen" bezeichnen und wird nach dem ersten abgenommenen Projekt mit Name und Foto auf der Seite genannt („Ihr Kopf im Projekt: …" — marke-positionierung). Beide dürfen das gemeinsame Projekt als Referenz nennen, sofern der Kunde freigegeben hat.

**§ 9 Vertraulichkeit, Datenschutz, Sicherheit.** NDA gegenseitig; Auftragsverarbeitungsvertrag, wenn er Kundendaten verarbeitet; Sicherheits-Checkliste des Studios als Anlage; keine Kundendaten in externe AI-Dienste außerhalb der vom Studio freigegebenen Konfiguration.

**§ 10 Haftung und Versicherung.** Jede Seite hält eine eigene IT-Haftpflicht mit Vermögensschaden (gruender-risiko: 600–1.500 €/Jahr bei < 100 k€ Umsatz). Haftung des Produktkopfs gegenüber dem Studio begrenzt auf den Lieferanteil des jeweiligen Einzelauftrags, außer bei Vorsatz/grober Fahrlässigkeit. [Anwalt: Kardinalpflichten, § 307 BGB.]

**§ 11 Laufzeit und Kündigung.** Unbefristet, monatlich kündbar; laufende Einzelaufträge werden zu Ende geführt, Gewährleistungspflichten aus § 4 überdauern.

**§ 12 Umwandlungsoption.** Beide Seiten können nach [3] gemeinsamen Projekten Gespräche über eine Beteiligung (Teil 5) aufnehmen; ein Anspruch besteht nicht.

Checkliste vor Unterschrift:
- [ ] UG/Rechtsform des Studios eingetragen (gruender-risiko: als Einzelunternehmer haftest du privat).
- [ ] Nebentätigkeit schriftlich genehmigt — auch die Partnerschaft ist Nebentätigkeit.
- [ ] IT-Haftpflicht beider Seiten liegt vor.
- [ ] AGB und Kundenvertrag nennen die Vertretung (§ 4) — dann stimmt die Ausfall-FAQ.
- [ ] Anwalt hat § 3, § 5, § 6, § 7, § 10 gesehen (~1.500 €).

### 4.4 Meilensteine — ab wann suchen, ab wann anstellen, ab wann aufhören

**Vorbereiten (ab Woche 2, kostet nur Zeit):** Liste mit 15 Namen aus Kanälen 1–4 anlegen, Seite /produktkopf entwerfen. Noch niemanden ansprechen, den du nicht kennst — du hast noch nichts zu zeigen. (agentur: *„Partner-Suchprofil schreiben, 5 Kandidaten aus dem Netzwerk ansprechen"* in Woche 2 — nur Netzwerk.)

**Aktiv suchen ab: Referenz 2 abgenommen UND Pipeline ≥ 3 qualifizierte Gespräche/Woche.**
- „Referenz 2 abgenommen" heißt: zwei bezahlte Projekte, Abnahme bestanden, mindestens eines mit Namensnennung. Die Gutachter streuen zwischen „ab Projekt 2" (growth), „Monat 2–3" (agentur) und „ab Referenz 3" (marke). Referenz 2 ist der Mittelwert, und der Pilot mit dem Partner *ist* Referenz 3.
- „≥ 3 Gespräche/Woche" ist die Untergrenze aus dem VC-Kill-Kriterium (*„weniger als 3 qualifizierte Beratungsgespräche pro Woche"* = Kill) und über dem Agentur-Go (*„≥ 6 qualifizierte Beratungsgespräche pro Monat"*). Ohne diese Pipeline kannst du dem Partner kein Projekt in 8 Wochen versprechen — und ein Partner ohne Projekt ist in 8 Wochen weg.
- Ab hier: 3–4 h/Woche Sourcing, Ziel Review-Tag in Woche 2 der Suche, Pilotstart spätestens 6 Wochen später.

**Partner bestätigt (Go), wenn:**
- [ ] Pilot abgenommen ohne Nachfrist, ≤ 120 h, Deckungsbeitrag ≥ 30 % (agentur).
- [ ] Er will ein zweites Projekt (marke, Go-Kriterium).
- [ ] Der Kunde kennt seinen Namen.
→ Rahmenvertrag, Name auf die Seite, „wir" ist ab jetzt wahr. Zweiten Partner nach gleichem Muster suchen, sobald der Funnel dauerhaft ≥ 6 qualifizierte Gespräche/Monat liefert (agentur, Monat 4–6).

**Anstellen erst, wenn alle vier gleichzeitig gelten:**
1. **Drei Monate hintereinander ≥ 3 Abschlüsse/Monat** bei Ø-Ticket ≥ 12.000 € (growth) — besser ≥ 18.000 € (vc), sonst siehe 2.3: unter 16.200 € Break-even trägt kein Angestellter.
2. **≥ 45.000 € unterschriebene Aufträge für die nächsten drei Monate** (vc) — Fixkosten nur gegen gesicherte Auslastung.
3. **Du bist Vollzeit im Studio** (Kündigung ausgesprochen). Als Angestellter trägst du keine Arbeitgeberpflichten aus einem Nebengewerbe (agentur).
4. **Retainer-Sockel ≥ 3.000 €/Monat** — das Polster, das einen Monat Leerlauf des Angestellten deckt (vc: *„20 Kunden à 600 € = 12.000 €/Monat, das ist ein Junior-Gehalt"* — die Richtung, nicht der Startwert).
Und dann: Junior/Mid (55–70 k€, vc) für Bau unter Review deiner Partner — nicht der nächste Senior. Der Senior bleibt Partner auf Beteiligung.

**Aufhören mit der Partnersuche (Kill), wenn:**
- **Monat 4 nach Start: kein zweiter Produktkopf hat ein Projekt mitgeliefert** (agentur, Kill-Kriterium 6: *„das Solo-Modell ist damit bestätigt, und der Gründer will genau das nicht"*).
- **Monat 6: kein Freelancer bereit, unter der Marke mit eigenem Namen zu liefern** (marke, Kill-Kriterium 5).
- **Tag 180: keine zweite Person an Bord UND du noch angestellt** (gruender-risiko, Kill-Kriterium 5: *„ehrlich beenden statt vor sich hin köcheln"*).
- Und die Vorbedingung dafür: **Tag 90 ohne unterschriebenen Festpreisauftrag → kill, keine Partnersuche nötig** (gruender-risiko, Kill-Kriterium 3).

Diese Daten trägst du heute in den Kalender ein. Nicht „irgendwann".

---

## 5. Alternative: Co-Founder mit Equity

Der Gründer-Risiko-Gutachter macht den Weg auf: *„Weg A (Co-Founder jetzt): In den nächsten 60 Tagen eine zweite Person finden, die Produktkopf sein kann und für Equity (40–50 %) statt Gehalt einsteigt — realistisch nur, wenn bis dahin 2–3 bezahlte Projekte oder eine sichtbare Pipeline existieren."* Und die Maßnahme dazu: *„Co-Founder-Frage bis Tag 60 entscheiden: Liste von fünf Personen ... drei Gespräche führen, Equity-Rahmen (40–50 %, Vesting 4 Jahre, 1 Jahr Cliff) vorbereiten."*

### 5.1 Wann Co-Founder der bessere Weg ist

| Co-Founder (Equity) ist besser, wenn … | Partner (Umsatzbeteiligung) ist besser, wenn … |
|---|---|
| Die Person **bringt 3–5 zahlungsbereite Kontakte** mit (vc: der einzige Weg unter sechs Monaten aus der Anstellung heraus). | Die Person bringt Baukapazität, aber keine Pipeline. |
| Du willst nach 5–8 Projekten **ein vertikales Produkt** bauen (vc: *„das eine wiederkehrende Muster (Prüfprotokolle, Angebotsrechner, Schichtplan) als vertikales Produkt mit Setup-Fee + SaaS"*). Produkte brauchen Mitgründer, Dienstleistung braucht Partner. | Es bleibt ein Dienstleistungsstudio; dann ist Equity ein zu teurer Preis für Projektarbeit. |
| Du kannst **nicht kündigen, ohne dass jemand Vollzeit im Studio steht** — der Co-Founder geht Vollzeit, du folgst bei ≥ 45 k€ Pipeline. | Du kannst selbst bald Vollzeit gehen; dann brauchst du keine zweite Vollzeitperson, sondern Bauzeit. |
| Die Person kann das Modell **komplett allein** tragen (verkaufen, bauen, abnehmen) und will Verantwortung für die Firma, nicht für Projekte. | Die Person will Projekte, nicht Firma. (Das ist die Mehrheit — und das ist in Ordnung.) |
| Dein Antrieb ist ehrlich „nicht allein" (gruender-risiko: *„Wer das über sich weiß, sollte nicht allein gründen"*) — und du hältst das Vetorecht eines Partners aus. | Du willst die Kontrolle über Preis, Marke und Nische behalten und dich in 12 Monaten an Zahlen entscheiden. |

Zwei Regeln:
- **Kein Equity vor Referenzen.** Vor Projekt 2 hast du nichts zu zeigen und gibst 40–50 % für ein Versprechen ab. (gruender-risiko: „realistisch nur, wenn bis dahin 2–3 bezahlte Projekte oder eine sichtbare Pipeline existieren.")
- **Partner-first ist der Test für Co-Founder.** Der beste Weg zum Mitgründer ist ein Partner auf Umsatzbeteiligung, der nach 3 gemeinsamen Projekten (§ 12) sagt: „Ich will mehr als Projekte." Dann kennst du Abnahmequalität, Stundenzahl und Kundenwirkung — das ist eine bessere Grundlage als drei Kaffees.

### 5.2 Term-Sheet-Skelett **[Anwalt, Notar]**

| Punkt | Rahmen | Anmerkung |
|---|---|---|
| Anteile | Co-Founder 40–50 %, du 50–60 % | 50/50 nur, wenn beide Vollzeit und beide Pipeline bringen; sonst 40/60 mit Nachbesserungsoption auf 50 nach Meilenstein (z. B. 5 Projekte oder 100 k€ Umsatz verantwortet). |
| Vesting | 4 Jahre, 1 Jahr Cliff, danach monatlich (gruender-risiko) | Gilt für beide Gründer — auch für dich. |
| Leaver | Good Leaver behält gevestete Anteile zum Verkehrswert; Bad Leaver zum Nominalwert | [Anwalt] |
| Gehalt | 0 € bis Retainer-Sockel + Projektmarge ≥ 2 × [Mindestgehalt]; dann gleiches Geschäftsführergehalt | Bis dahin leben beide von Projektanteilen — Regel 2.1 kann intern weiterlaufen. |
| Rollen | Du: Marke, Funnel, Vertrieb, Nische. Co-Founder: Delivery-Fabrik, Qualität, Betrieb. Beide: Produktkopf im Projekt. | Schriftlich, mit Vetorechten: Preisliste und Nische nur einstimmig. |
| Rechtsform | UG → GmbH bei Einstieg (gruender-risiko, Go-Kriterium: *„jetzt kündigen, UG in GmbH überführen, ‚wir' wird wahr"*) | Notar/Anwalt 1.000–2.000 € (gruender-risiko). |
| IP | Alles Bestehende (Website, KI-Berater, Starter-Kit, Vorlagen) geht in die Gesellschaft ein | Bewertung als Gründerleistung, nicht als Cash. |
| Exit/Verkauf | Drag-along/Tag-along, Vorkaufsrecht | Standard, [Anwalt]. |
| Entscheidungsdatum | Tag 60 (gruender-risiko) | Danach Weg B (Partner) ohne weiteres Zögern. |

### 5.3 Ansprache für einen Co-Founder-Kandidaten (im Wortlaut, nach Referenz 2)

> [Vorname], ich habe zwei Projekte unter vierwochen.de abgenommen — [Kunde 1, Ergebnis], [Kunde 2, Ergebnis] — und eine Pipeline von [N] Gesprächen pro Woche. Ich will das nicht allein weiterführen: Ich suche einen Mitgründer mit 40–50 %, Vesting, der Produktkopf sein kann und [Bereich: Delivery/Betrieb] übernimmt, während ich Marke und Vertrieb mache. Bevor wir über Anteile reden, machen wir ein Projekt zusammen auf Umsatzbeteiligung — wenn das läuft, gehen wir zum Notar. Passt ein Gespräch nächste Woche?

---

## 6. Was du diese Woche tust

- [ ] Kalender: Tag 60 (Co-Founder-Entscheidung), Tag 90 (erster Auftrag oder Kill), Monat 4 (Partner hat geliefert oder Kill), Tag 180 (zweite Person oder Kill) — als Termine mit Erinnerung.
- [ ] Rollenprofil (1.1–1.3) in eine Seite /produktkopf gießen, noch nicht verlinken.
- [ ] 15-Namen-Liste anlegen: 5 aus Kanal 1, 5 aus Kanal 3/4 (Suchstrings laufen lassen), 5 aus Kanal 2/6. Spalten: Name, Kanal, Beleg für M1/M2, Kontaktweg, Datum.
- [ ] Zeit-Tracking für Referenzprojekt 1 läuft (Voraussetzung, um dem Partner ehrliche Stundenzahlen zu nennen).
- [ ] Rahmenvertrag (4.3) als Entwurf an den Anwalt, zusammen mit AGB und Angebotsmuster — ein Termin, ein Honorar.
- [ ] Nebentätigkeitsgenehmigung: prüfen, ob die Formulierung eine Partnerschaft/Beteiligung Dritter abdeckt.
- [ ] Referenz 1 liefern. Alles in diesem Dokument wartet darauf.

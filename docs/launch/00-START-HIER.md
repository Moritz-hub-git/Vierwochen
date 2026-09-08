# START HIER — Vollreview, Umbau, Plan

Stand: 2026-09-08, 04:00 Uhr. Geschrieben für den Morgen danach.

Du hast gesagt: „Mach nur Dinge, von denen Du wirklich überzeugt bist. Wenn die ganze Idee Müll ist, sag es mir." Hier ist die Antwort, dann alles, was heute Nacht gebaut wurde, dann der Plan, mit dem du morgen anfängst.

---

## 1. Das Urteil in sieben Sätzen

> Die Langfassung — fünf vollständige Gutachten, fünf unabhängige Stückkostenrechnungen, die unbequemen Wahrheiten im Wortlaut — steht in `08-gutachten-business.md`. Dieser Abschnitt ist die Zusammenfassung davon.

1. **Die Idee ist nicht Müll.** „Individualsoftware in vier Wochen zum Festpreis mit Abnahme, gebaut von einem, der Fachbereich und Technik kann" ist ein echtes, verkaufbares Versprechen. Fünf unabhängige Gutachter (VC-Skeptiker, Agentur-Operator, Marken-Stratege, Growth, Gründer-Coach) und sechs Kundenpersonas haben es geprüft. Niemand hat gesagt: lass es.
2. **Aber die Konfiguration von gestern Abend war nicht startfähig.** Alle fünf Gutachter und alle sechs Personas unabhängig voneinander: Die Team-Fassade („wir", „Studio", „2+AI-Methode") war der größte Vertrauenskiller, wettbewerbsrechtlich angreifbar und im Widerspruch zum Impressum. Der Preis von 9.500 € lag unter den Vollkosten jedes zweiten Kopfes und hat damit genau das verhindert, was du willst.
3. **Das Modell skaliert nicht über Kanäle, sondern über Referenzen und einen zweiten Kopf auf Umsatzbeteiligung.** Bezahlte Werbung rechnet sich erst ab einem Durchschnittspreis, den du ohne Referenzen nicht durchsetzen kannst. Das ist die Reihenfolge, nicht eine Option.
4. **Die Solo-Phase lässt sich nicht überspringen.** Drei gelieferte, referenzierbare Projekte sind die Eintrittskarte für den zweiten Kopf, für Empfehlungen und für einen Preis ab 12.500 €. Das sind, nebenberuflich, drei bis fünf Monate. Du kannst die Phase kurz halten, du kannst sie nicht streichen.
5. **Deine Bedingung „nur, wenn es zügig skaliert" ist damit vereinbar, wenn du „zügig" als „innerhalb von sechs Monaten nicht mehr allein" definierst** und nicht als „ab Woche vier ein Team". Dokument 06 beschreibt, wie der zweite Kopf ohne Fixkosten kommt.
6. **Ob es skaliert, weißt du in 12 Wochen mit drei Zahlen:** Gespräche aus warmem Netzwerk, Abschlussquote, und ob ein Kunde nach Abnahme bereit ist, mit Namen zu bürgen. Die Kill-/Go-Kriterien stehen in Abschnitt 6 und in Dokument 07.
7. **Meine ehrliche Empfehlung:** Starte. Mit dem ehrlichen Auftritt, dem höheren Preis und den Verkaufsgesprächen, die du bisher vermieden hast. Wenn nach 12 Wochen die Zahlen unter den Schwellen liegen, hör auf, ohne dass es dich mehr als drei Monate Abende und rund 3.000 € gekostet hat.

---

## 2. Entscheidungen, die ich für dich getroffen habe (und warum)

Jede davon ist eine einzige Konstante in `lib/config.ts`. Wenn du eine ändern willst, ändere sie dort, die Seite folgt überall.

| Entscheidung | Vorher | Jetzt | Warum |
|---|---|---|---|
| **Marke** | neoapp.studio (gestern), vierwochen (davor) | **vierwochen** (`SITE.name`) | „neoapp" ist nicht schützbar (neoapps GmbH existiert), „.studio" ist für Mittelstand fremd. „vierwochen" ist das Versprechen selbst, konkret und deutsch. Wordmark: vier·wochen. |
| **Positionierung** | Team-Studio, „wir", „2+AI" | **Ein Kopf + AI, mit Namen und Gesicht** (`SITE.founder`) | Alle 11 Reviewer unabhängig: Die Fassade kostet Vertrauen, ist UWG-riskant (§5 Irreführung) und widerspricht dem Impressum. Kunden geben einer Einzelperson mit drei belegten Projekten eher 12.500 € als einem anonymen „Team". |
| **Preisboden** | 9.500 € | **12.500 €** (`PRICE.floor`), Decke 35.000 € | 9.500 € lag unter den Vollkosten eines zweiten Kopfes. 12.500 € ist noch klar unter Agentur (25–60k) und lässt eine Umsatzbeteiligung zu. Der Streichpreis-Anker („16.000–24.000 €") ist weg, er war dein eigener Break-even. |
| **Preisherleitung** | Eine Zahl aus dem Modell | **Grundprodukt 12.500 € + benannte Bausteine = Summe**, serverseitig gerechnet | Persona „Lena": „Zeig mir die Rechnung, dann glaube ich sie." Bottom-up ist glaubwürdiger als jede Spanne. |
| **Betrieb** | „optional", unbepreist | **290 €/Monat Betrieb, 990 €/Monat Betrieb + Weiterentwicklung**, monatlich kündbar (`RETAINER`) | Die einzige wiederkehrende Einnahme. Steht jetzt auf der Karte und auf der Startseite. |
| **Gewährleistung** | 12 Monate | **24 Monate** (`WARRANTY_MONTHS`) | Zwei Jahre sind die gesetzliche Regelfrist beim Werkvertrag (§634a BGB). 24 Monate zu versprechen kostet dich nichts zusätzlich und liest sich wie ein Versprechen statt wie eine Verkürzung. |
| **Abnahme-Zusage** | Landing „zweite Rate entfällt" vs. AGB „100 % Erstattung" | **Ein Satz, überall wortgleich**: „Besteht die Abnahme nicht, entfällt die zweite Rate." (`ACCEPTANCE_PROMISE`) | Ein Widerspruch zwischen Landing und AGB ist ein Abmahngrund und ein Vertrauensverlust bei jedem IT-Leiter, der beides liest. |
| **Referenzen** | Erfundene Branchen-Showcases mit Mitarbeiterzahlen | **Ein echtes Projekt (diese Website) + sieben ehrlich als „Beispiel" markierte Zuschnitte** | Erfundene Referenzen sind das Ende, sobald jemand nachfragt. Die Seite sagt jetzt selbst: „keine Kundenreferenzen, die kommen, sobald die ersten Kunden freigeben." |
| **KI-Transparenz** | Berater tat, als sei er ein Mensch | **„KI-Berater" steht über dem Dialog, Vertex/Google wird genannt, Moritz prüft jede Skizze** | EU-KI-VO Art. 50 (seit August 2026 Pflicht), DSGVO, und Persona „Thomas": „Ich will wissen, ob ich mit einer Maschine rede." |
| **Zeitplan** | „Start Montag" ohne Datum | **Kick-off frühestens am Montag in zwei Wochen, Launch 25 Tage später**, echte Daten (`lib/timeline.ts`) | „Frühestens", weil zwischen Gespräch und Start Angebot und Unterschrift liegen. |
| **Termine** | ganztägig | **8–9, 12–13, 17–19 Uhr** (`BOOKING.hourWindows`) | Du bist angestellt. Slots außerhalb der Kernarbeitszeit sind ehrlicher und schützen dich arbeitsrechtlich. |
| **Indexierung** | offen | **gesperrt, bis `SITE_LIVE=1`** gesetzt ist | Die Seite geht erst in den Index, wenn Impressum und Datenschutz vollständig sind. |

---

## 3. Was heute Nacht gebaut wurde

Alles liegt auf dem Branch `claude/landing-page-modern-redesign-boi6yt` und ist nach der Verifikationsrunde (Abschnitt 4) nach `main` gepusht — Cloud Run baut daraus. Die Seite bleibt bis `SITE_LIVE=1` für Suchmaschinen gesperrt.

**Eine Marke, eine Adresse.** Die Startseite `/` ist jetzt die Landing (vorher lag sie unter `/v/fixfertig`, `/` zeigte eine andere Seite unter anderem Namen). `/v/fixfertig` leitet um. Alle Unterseiten (`/termin`, `/it`, `/impressum`, `/datenschutz`, `/agb`, `/zugang`) tragen dieselbe Navigation und denselben Namen.

**Startseite, komplett überarbeitet.**
- H1 „Ihre Software. In vier Wochen live." Kein rotierendes Wort mehr (Persona: „wechselt schneller, als ich lese").
- Drei Säulen: Festpreis ab 12.500 € · Zweite Rate erst nach Abnahme · Ein Kopf + AI. Jede führt zu ihrem Abschnitt und wird dort wieder aufgegriffen.
- Gründer-Zeile direkt unter den Säulen mit Avatar (Initialen, bis dein Foto da ist) und Link „Wer ist das?".
- Neuer Abschnitt **„Wer baut das"** (`#wer`): Name, Rolle, drei belegbare Fakten, ein ehrlicher Absatz („Ich baue Ihr Projekt selbst, mit AI. Kein Team, keine Subunternehmer."), „Was ich nicht baue".
- Beispiele-Karussell: erstes Element ist diese Website als echtes Projekt, alle anderen ehrlich als Beispiel markiert, ohne Mitarbeiterzahlen, im Präsens.
- Zeitplan mit echtem Kick-off-Datum. Preisabschnitt ohne Streichpreis, dafür mit Betrieb ab 290 €/Monat.
- FAQ ehrlich: „Haben Sie Referenzen?" (Antwort: noch nicht, hier ist, was Sie stattdessen prüfen können), „Wann ist fertige Software die bessere Wahl?".
- Sitemap, robots, Open Graph, Metadaten mit Titelvorlage.

**KI-Berater (der Dialog).**
- Neuer Systemprompt: kennt dich, deine Fakten, das Angebot, die Preislogik. Sagt nie „Team", gibt zu, KI zu sein, erfindet keine Referenzen, nennt nur, was `lib/config.ts` sagt.
- Preis = Grundprodukt 12.500 € + Bausteine (Systemanbindung, Nutzergruppe, Datenübernahme, mobil/offline, PDF, Bezahlung, KI), jeweils mittlerer Wert der Spanne. Der Server rechnet die Summe nach, rundet auf 500 €, klemmt auf 12.500–35.000 €.
- Neue Phase „Nachgespräch": Einwände (zu teuer, Freelancer, Lovable-Selbstbau, Referenzen, Scope-Änderung) werden beantwortet, die Karte aktualisiert sich in place.
- Panel-Kopf „Sie sprechen mit dem KI-Berater von vierwochen", Schrittanzeige „Frage n von höchstens 5", Schließen-Knopf, Fehlerpfade mit „Termin direkt buchen".
- Getestet mit zehn Fällen in zwei Runden, Prompt danach nachgeschärft (Preis-Clustering, Slider-Grenzen, keine Rückfrage im Ergebnis).

**Ergebniskarte.** Richtpreis mit Herleitung, Betrieb, drei Pillen (Abnahme-Zusage, 24 Monate, Code gehört Ihnen), Terminwahl daneben, Weg zum Launch mit echten Daten, Lösungsskizze (Ablauf, Annahmen, offene Punkte) zum ersten Mal sichtbar.

**Buchung.** Felder Firmengröße und Branche, Gründer-Block, Mails unter der Marke, Kalendereintrag „Beratungsgespräch vierwochen — <Name>". Leads (E-Mail ohne Termin) bekommen die Skizze per Mail.

**Recht und Daten.**
- Datenschutzerklärung an den Funnel angeglichen (Reichweitenmessung ohne Cookies, Buchungsfelder, KI-Verarbeitung, Fristen).
- **Die Fristen werden jetzt im Code eingehalten** (`lib/retention.ts`): IP-Adressen nach 30 Tagen entfernt, Dialoge ohne Kontakt nach 90 Tagen gelöscht, Ereignisse nach 12 Monaten. Läuft einmal täglich von selbst und auf Abruf über `POST /api/admin/cleanup`.
- AGB: 24 Monate, §5 mit der Abnahme-Zusage, als Entwurf markiert.
- Impressum: „Einzelunternehmen von Moritz Schumacher", Platzhalter sichtbar.

**Sieben Arbeitsdokumente** in `docs/launch/` (Abschnitt 8).

---

## 4. Verifikationsrunde: Ergebnis

Dieselben sechs Personas sind ein zweites Mal über den fertigen Produktionsbuild gelaufen (Playwright, Dialog mit Testantworten statt echtem Modell). Die zwei Audits und die Synthese sind am Sitzungslimit gescheitert; die Synthese habe ich selbst gemacht.

| Persona | Vertrauen vorher | nachher | Würde buchen |
|---|---|---|---|
| Thomas, Metallbau, iPad | 3 | 5 | nein — will ein Gesicht, eine Telefonnummer und etwas Nachprüfbares |
| Lena, Gründerin, Gmail | 3 | 6 | ja (kostenloses Gespräch) |
| Dr. Sabine, Konzern-QM | 3 | 6 | ja — Beauftragung erst mit Einkaufsunterlagen |
| Markus, IT-Leiter | 2 | 5 | ja — „schulde dem GF eine Antwort" |
| Wettbewerber-Agentur | 3 | 6 | nein — Belege nicht prüfbar |
| Kerstin, Elektrobetrieb, iPhone | 3 | 6 | nein — will erst anrufen |

**Was alle sechs gelobt haben und was bleibt:** die Ehrlichkeit („Ein Kopf + AI", „keine Kundenreferenzen — die kommen, sobald die ersten Kunden sie freigeben"), die Preisherleitung mit Summe, der Zeitplan mit echten Daten, die Abnahme-Zusage wortgleich auf Landing, Karte, /it und AGB, die Seite /it zum Weiterleiten.

**Was sie gefunden haben und was heute Nacht noch behoben wurde:**

- **Blocker, echt:** Im Gespräch lag das Panel über der Eingabeleiste. Feld und Pfeil waren per Maus und Touch nicht erreichbar, nur per Skript. Auf dem iPad hätte sich nie eine Tastatur geöffnet. Behoben und per Hit-Test auf 1440 und 390 verifiziert. Das war auf der alten Live-Seite genauso kaputt.
- **Landing gegen AGB, drei Widersprüche:** Code „ab Tag 1 Ihr Eigentum" gegen „mit vollständiger Zahlung"; Gewährleistung „unabhängig davon" gegen den Ausschluss bei Fremdänderung; „Bezahlt wird, was läuft" gegen „erste Rate wird nicht erstattet". Jetzt: Code liegt ab Tag 1 in Ihrem Repository, gehört Ihnen mit der Abnahme, und bleibt bei gescheiterter Abnahme beim Kunden (neu in AGB §6, für den Anwalt markiert). Gewährleistung gilt auf den abgenommenen Stand, auch wenn ein anderer weiterbaut, solange der Mangel nicht daher stammt (§7 angepasst). Säule zwei heißt „Zweite Rate erst nach Abnahme", die 50/50-Staffel steht in Euro auf der Karte und im Preisabschnitt.
- **„Wir" gegen „Einzelunternehmen":** FAQ, Methode und Leistungen sprechen jetzt in der Ich-Form; „Die 2+AI-Methode" heißt überall „Ein Kopf + AI".
- **Karte nicht chef-tauglich:** Jetzt mit Zahlung 50/50 in Euro, Betrieb im ersten Jahr, „Was es Sie heute kostet" mit Amortisation (nur, wenn der Kunde selbst eine Zeitangabe gemacht hat), Erklärung des Grundprodukts, Knopf „Drucken oder als PDF speichern" (eine Seite, mit Absender und Datum), Link auf /it für Einkauf und IT.
- **Leiste verdeckt Text beim Lesen** (alle Bildschirme unter 800 px Höhe): Sie taucht beim Scrollen nach unten ab und kommt beim Scrollen nach oben zurück. Auf Impressum, Datenschutz, AGB und Zugang gibt es sie nicht mehr.
- **Zielgruppe:** siebtes Beispiel „Buchungsportal für Praxen" (erste Produktversion für Gründer) und eine FAQ dazu; in „Für wen ist das nichts?" der Satz „Viele Nutzer sind kein Problem — viele gleichzeitige Entwickler sind es."
- **/it** um Login über Entra ID/Workspace, Schnittstellen statt Direktzugriff, konkreten Betrieb (Rückmeldung werktags am selben Tag, tägliche Backups, Cloud-Kosten 1:1) und einen Block „Für Ihren Einkauf" ergänzt. Dort stehen zwei neue Platzhalter für dich: Versicherer und Deckungssumme.
- Kleinigkeiten: „meist 3 Fragen" statt „3 Fragen" (der Dialog erlaubt fünf), Fachwörter raus (Stack, Lock-in, Patches), „Senior-Qualität" durch „Eine Verantwortung" ersetzt, Betrieb „optional" statt „inklusive", Zeitplan „frühestens", Knappheit „ein neuer Start pro Monat".

**Was offen bleibt und nur du lösen kannst** (die drei „nein"-Personas nennen genau das): Foto, LinkedIn-Link, die Namen deiner drei Apps mit App-Store-Link, eine Telefonnummer, und Versicherer plus Deckungssumme auf /it. Das sind die Punkte 2–6 und 8 in Abschnitt 5. Mit ihnen, sagen die Personas übereinstimmend, wären sie bei 7–8 von 10.

**Nicht umgesetzt, bewusst:** Gesundheitsdaten-Absatz auf /it (Persona Lena) — das wäre ein Versprechen über Verschlüsselung und AVV-Vorlagen, das du erst mit dem Anwalt geben solltest. Preisposten in der Karte abwählbar machen — der Nachfrage-Dialog kann das bereits („ohne Schnittstelle", Karte rechnet neu), ein Klick-Chip wäre die Ausbaustufe.

---

## 5. Was nur du tun kannst (in dieser Reihenfolge)

Alles hier ist bewusst nicht von mir erledigt worden, weil es deine Identität, deine Unterschrift oder dein Geld braucht. Reihenfolge = Priorität.

### Vor dem Livegang (Tag 1–3)

- [ ] **Nebentätigkeit schriftlich anzeigen** bei thyssenkrupp nucera. Musteranschreiben und Vertragsklauseln-Checkliste in Dokument 05. Das ist Kill-Kriterium Nr. 1 am Tag 30. Keine Kunden aus dem Arbeitgeber-Umfeld, keine Firmengeräte, keine Firmen-Mail.
- [ ] **Foto**: ein ehrliches Porträt (kein Stock, kein Anzugfoto aus 2019) nach `/public/moritz.jpg`, dann `SITE.founder.photo = "/moritz.jpg"` in `lib/config.ts`. Bis dahin stehen Initialen.
- [ ] **LinkedIn-URL** in `SITE.founder.linkedin`. Persona „Lena" googelt sofort. Das Profil muss zur Seite passen: Vorstandsreferent, Programm-Manager, baut Software mit AI.
- [ ] **Impressum**: Straße, PLZ/Ort, Rufnummer, USt-IdNr. (`app/(site)/impressum/page.tsx`, Platzhalter sind markiert). Datenschutz: Anschrift und Datum Livegang (`app/(site)/datenschutz/page.tsx`). AGB: Gerichtsstand (`app/(site)/agb/page.tsx`).
- [ ] **Drei Fakten prüfen** in `SITE.founder.facts`: Sie müssen wörtlich stimmen und belegbar sein (Zeugnis, Profil, Projekt). Lieber eine Zahl weniger als eine, die du nicht belegen kannst.
- [ ] **Telefonnummer** in `SITE.phone`, wenn du telefonisch erreichbar sein willst (Personas „Thomas" und „Kerstin": „Ich rufe an, ich buche nicht"). Leer = wird nicht gerendert.
- [ ] **Deine drei Apps mit Namen und App-Store-Link** im Abschnitt „Wer baut das" (`SITE.founder.facts` in `lib/config.ts`). Fünf von sechs Personas: „Das ist der einzige Beleg, den ich ohne Anruf prüfen kann."
- [ ] **/it, Block „Für Ihren Einkauf"**: Versicherer und Deckungssumme eintragen, sobald die IT-Haftpflicht steht (`app/(site)/it/page.tsx`). Bis dahin stehen dort sichtbare Platzhalter.
- [ ] **Cloud Run Umgebungsvariablen**: `SITE_LIVE=1` (erst wenn Impressum/Datenschutz vollständig), `ADMIN_PASSWORD`, `CLEANUP_TOKEN` (zufällig, 32+ Zeichen), `BOOKING_CALENDAR_ID`, `MAIL_SENDER`, `GOOGLE_CLOUD_PROJECT`. Optional: Cloud Scheduler täglich 03:00 auf `POST /api/admin/cleanup` mit `Authorization: Bearer <CLEANUP_TOKEN>`; ohne Scheduler läuft die Löschung trotzdem einmal täglich beim ersten Dialog des Tages.
- [ ] **Domain**: `vierwochen.de` auf Cloud Run mappen (die Seite nennt sie in Metadaten, Sitemap und Mails). Wenn du eine andere Domain willst: nur `SITE.domain`/`SITE.url` ändern.
- [ ] **/it lesen und unterschreiben können**: Die Seite verspricht Stack, Hosting-Region, Code-Übergabe. Alles, was dort steht, musst du im Projekt so leben.

### In Woche 1

- [ ] Rechtsform: UG-Termin beim Notar (Dokument 05, Empfehlung und Kosten). Bis zur Eintragung als Einzelunternehmen anbieten, Impressum sagt das bereits.
- [ ] IT-Vermögensschadenhaftpflicht: drei Angebote (Rechercheliste in 05). Vor dem ersten unterschriebenen Auftrag.
- [ ] Anwalt IT-Recht: AGB, Angebotsmuster mit Abnahmekriterien (Dokument 02), Partnervertrag-Skelett (06). Budget 1.500–3.000 €.
- [ ] Steuerberater-Erstgespräch.
- [ ] Warm-Liste: 50 Namen aus deinem Netzwerk ohne Arbeitgeber-Umfeld (Dokument 03 hat die Vorlage und die Nachrichten im Wortlaut).

---

## 6. Morgen früh: der erste Tag

| Zeit | Was | Ergebnis |
|---|---|---|
| 07:30 | Dieses Dokument lesen, Abschnitt 4a prüfen (Verifikationsergebnis). Seite auf Cloud Run ansehen. | Du weißt, was live ist. |
| 08:00 | Nebentätigkeitsanzeige schreiben (Muster in 05), abschicken. | Kill-Kriterium 1 in Arbeit. |
| 08:30 | Foto machen (Tageslicht, neutraler Hintergrund, Handy reicht). LinkedIn-Profil anpassen (Headline in 03). Beides in `lib/config.ts` eintragen, Impressum füllen, committen, pushen. | Seite ehrlich und vollständig. |
| 10:00 | `SITE_LIVE=1` setzen, Domain mappen. | Seite ist öffentlich. |
| 12:00 | Warm-Liste: 50 Namen (Dokument 03, Abschnitt 1). | Verkaufsbasis. |
| 17:00 | Erste 10 Nachrichten raus (Wortlaut in 03). Nicht die Seite verschicken, sondern die eine Frage: „Welcher Ablauf kostet dich jede Woche am meisten Zeit?" | Erste Gespräche in Anbahnung. |
| 18:00 | Anwalt und Versicherung anfragen (Vorlagen in 05). | Woche-1-Punkte laufen. |

---

## 7. Zwölf Wochen, drei Zahlen, ein Kill-Schalter

Details, Wochenplan und Dashboard in Dokument 07. Hier die Kurzfassung.

**Phase A · Woche 1–4 · Fundament und erster Pilot.** Nebentätigkeit, Recht, ehrliche Seite live, 50 warme Kontakte, 10 Erstgespräche (echte, nicht Chat), Ziel: **ein unterschriebener Pilot** zu 12.500 € (oder 9.500 € gegen schriftliches Referenzrecht mit Zahl).

**Phase B · Woche 5–8 · Liefern und zweiter Auftrag.** Pilot bauen (vier Wochen, Abnahmekriterien aus 02), parallel 40 LinkedIn-Kontakte/Woche unter eigenem Namen, zwei Beiträge/Woche (03). Google-Ads-Nachfragetest starten, sobald die Seite eine Woche stabil ist (04, 2.500–3.000 €, drei Wochen). Ziel: **zweiter Auftrag unterschrieben, Pilot abgenommen**.

**Phase C · Woche 9–12 · Referenz, Preis, zweiter Kopf.** Referenz mit Namen und Zahl auf die Seite. Dritter Auftrag zum vollen Preis. Erste Gespräche mit Kandidaten für den zweiten Kopf (06), erst Pilotprojekt gegen Umsatzbeteiligung.

**Go-Kriterien am Tag 84** (alle drei müssen stehen):

| Zahl | Go | Kill |
|---|---|---|
| Unterschriebene Aufträge | ≥ 2, davon ≥ 1 abgenommen | < 2 |
| Abschlussquote Erstgespräch → Auftrag | ≥ 15 % bei ≥ 10 Gesprächen | < 10 % bei ≥ 15 Gesprächen |
| Referenz | ≥ 1 Kunde bürgt mit Namen und Zahl | 0 |

**Harte Kill-Schalter, unabhängig vom Datum:** Nebentätigkeit am Tag 30 nicht genehmigt → Stopp oder Ausstieg aus dem Job planen, nicht beides. Pilot nach Woche 4 nicht abgenommen und Ursache liegt bei dir → Stopp. Ads-Test unter 1 gebuchtem Gespräch je 500 € → Ads aus, nicht das Business.

**Was „skaliert" hier konkret heißt:** Ab Monat 6 zwei Köpfe, jeder liefert 0,7–1 Projekt/Monat, Durchschnittspreis ≥ 15.000 €, Betrieb bei ≥ 60 % der Kunden. Das sind ~300–400k Jahresumsatz mit zwei Köpfen und ohne Fixkosten für Gehälter. Mehr geht nur mit einem dritten Kopf, und der kommt nach demselben Muster. Es wird keine Agentur mit 25 Leuten. Wenn du das willst, ist das ein anderes Geschäft.

---

## 8. Die Dokumente

| Nr. | Datei | Wofür |
|---|---|---|
| 00 | `00-START-HIER.md` | Dieses Dokument. |
| 01 | `01-sales-leitfaden-30-minuten.md` | Das Beratungsgespräch, Minute für Minute, mit Einwandbehandlung. |
| 02 | `02-angebot-und-abnahmekriterien.md` | Angebotsvorlage, Abnahmekriterien-Template mit Beispielen, Kick-off-Agenda, Übergabe-Checkliste, Anwaltspunkte. |
| 03 | `03-outbound-und-content.md` | Warm-Outbound (50 Namen, Nachrichten im Wortlaut), LinkedIn-Content 8 Wochen, Headline. |
| 04 | `04-google-ads-nachfragetest.md` | Kampagnenstruktur, Keywords, Anzeigen, Budget, Auswertung, Go-Schwellen. |
| 05 | `05-recht-nebentaetigkeit-rechtsform.md` | Nebentätigkeitsanzeige, UG, Versicherung, Website-Pflichten, EU-KI-VO. |
| 06 | `06-produktkopf-2-partnermodell.md` | Rollenprofil, Umsatzbeteiligung 60/10/30, Suche, Auswahl, Vertragspunkte, Co-Founder-Alternative. |
| 07 | `07-kill-go-dashboard-und-wochenplan.md` | Wochenplan 12 Wochen, Dashboard, Kill/Go im Detail. |
| 08 | `08-gutachten-business.md` | **Das Business-Assessment im Volltext:** fünf Gutachten, fünf Stückkostenrechnungen, Risiken, unbequeme Wahrheiten, was Personas und Audits fanden. Die Begründung für alles andere. |

Die Rohdaten des Reviews lagen als `review.json` (734 KB) nur im flüchtigen Sitzungsspeicher. Dokument 08 ist ihre dauerhafte Fassung: Gutachten und Stückkostenrechnungen vollständig, Personas und Audits verdichtet.

---

## 9. Was ich bewusst nicht gemacht habe

- **Push nach `main` erst nach der Verifikation.** Du hast mir Push-Rechte gegeben. Ich habe sie genutzt, nachdem die zweite Persona-Runde keinen Blocker mehr zeigte, der im Code liegt. Die Seite bleibt bis `SITE_LIVE=1` aus dem Suchindex.
- **Keine Google-Ads-Kampagne angelegt, keine LinkedIn-Posts veröffentlicht.** Beides ist außenwirksam und trägt deinen Namen. Alles steht fertig in 03 und 04, du entscheidest.
- **Kein Rechtsform-, Versicherungs- oder Anwaltsauftrag.** Kostet dein Geld, braucht deine Unterschrift. Vorlagen in 05.
- **Keine fünf Landing-Varianten mehr gepflegt.** `/v` bleibt intern erreichbar, aber die Startseite ist eine. Weitere Design-Varianten wären jetzt Vermeidung von Verkaufsgesprächen.
- **Keine erfundene Referenz, kein Foto-Platzhalter mit fremdem Gesicht, keine Zahl ohne Beleg.** Wo etwas fehlt, sagt die Seite, dass es fehlt.

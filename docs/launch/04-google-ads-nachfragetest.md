# Google-Ads-Nachfragetest: 2.500–3.000 € in drei Wochen

> Stand 2026-09-08. Zweck dieses Tests ist **eine Zahl für echte Suchnachfrage**, nicht Umsatz. Der Review ist eindeutig (growth-nachfrage, unitEconomics): „Paid ist als Kanal wirtschaftlich tot, nur Messinstrument" — CAC über Google Ads ohne Referenzen ≈ 6.000–8.000 € = 45–60 % des Tickets. Du kaufst dir für ~2.750 € die Antwort auf drei Fragen: (1) Sucht jemand in DACH nach dem, was du anbietest? (2) Versteht die Startseite ihn so gut, dass er den KI-Berater startet und die Skizze abholt? (3) Bucht und **erscheint** ein Fremder, der dich nicht kennt?
> Alle Zahlen: aus review.json (Gutachter: growth-nachfrage, vc-skeptiker, agentur-operator) oder aus lib/config.ts. Was Annahme ist, steht als „Annahme". CPC-Angaben sind **Schätzungen** — der Keyword-Planer ersetzt sie am Tag 0.

---

## 0. Die Erwartung, bevor du startest (damit du das Ergebnis nicht schönliest)

Benchmarks DACH B2B-Software-Dienstleistung laut Review (growth-nachfrage, coreMeasures):

| Stufe | Benchmark | Go-Schwelle |
|---|---|---|
| CPC | 5–12 € (vc-skeptiker: 4–10 €) | — |
| Klick → Dialog gestartet | 15–25 % | **≥ 20 %** |
| Dialog → Skizze erhalten | 45–60 % | **≥ 50 %** |
| Skizze → Termin gebucht | 6–12 % | **≥ 8 %** |
| Termin gebucht → wahrgenommen (Show-Rate) | 55–75 % | **≥ 60 %** (Kill: < 40 %) |
| Kosten je wahrgenommenem Gespräch | — | **≤ 300 € Go**, **> 600 € Kill** |

Erwartung des Gutachters für 2.500–3.000 €: **300–400 Klicks, 60–90 Dialoge, 35–50 Skizzen, 3–5 Buchungen, 2–3 wahrgenommene Gespräche.**

Rechne das einmal durch: 2.750 € / 2–3 Gespräche = **900–1.400 € je Gespräch**. Das liegt in der Kill-Zone. Der Gutachter erwartet also selbst, dass die *untere* Stufe das Go-Kriterium reißt — und schreibt trotzdem, der Test reicht „für eine Kill-/Go-Aussage zu den oberen Funnelstufen, nicht zum Abschluss". Das heißt für dich:

- Die oberen drei Quoten (Klick→Dialog, Dialog→Skizze, Skizze→Buchung) sind das eigentliche Ergebnis. Sie sagen, ob Seite und Berater bei Fremden funktionieren. Das nutzt jedem anderen Kanal (LinkedIn, Warm-Netz), weil alle auf derselben Seite landen.
- Kosten je Gespräch entscheidet nur darüber, ob Ads **nach** dem Test weiterläuft. Bei 3–5 Buchungen kippt eine einzige No-Show diese Zahl um Hunderte Euro — lies sie mit Vorsicht (Abschnitt 7.3).
- Der Test ist **kein Ersatz** für den Referenz-Sprint aus dem warmen Netzwerk (Review, alle fünf). Er läuft parallel dazu, nicht stattdessen.

---

## 1. Voraussetzungen vor dem ersten Klick

Jeder Klick auf eine Seite mit „PLATZHALTER" ist verbranntes Geld und ein Wettbewerbsverstoß (§ 5 DDG, Impressumspflicht). Reihenfolge einhalten; nichts davon ist optional.

### 1.1 Seite

- [ ] **Impressum vollständig** (`app/(site)/impressum/page.tsx` zeigt heute drei PLATZHALTER: Straße/Hausnummer, PLZ/Ort, USt-IdNr.; Telefon kommt aus `SITE.phone` in `lib/config.ts`, derzeit leer). Eine ladungsfähige Anschrift ist Pflicht — kein Postfach. USt-IdNr. beim BZSt beantragen, falls noch nicht vorhanden; bis dahin die Zeile entfernen statt Platzhalter stehen lassen. *Vom Anwalt prüfen lassen: Impressum als Einzelunternehmer mit Nebentätigkeit.*
- [ ] **Telefonnummer** in `SITE.phone` eintragen. Eine geschäftliche Rufnummer (z. B. eine zweite SIM oder VoIP-Nummer), nicht die Nummer vom Arbeitgeber-Handy.
- [ ] **Foto**: `/public/moritz.jpg` ablegen und `SITE.founder.photo` setzen. Persona Thomas (56, Metallbau, Review): „will Menschen sehen". Ohne Foto testest du eine Seite, die du gar nicht live lassen willst.
- [ ] **LinkedIn-Link** in `SITE.founder.linkedin` eintragen. Die Biografie ist dein einziges Vertrauenskapital; der Klick auf das Profil ist der Beweis, dass es dich gibt.
- [ ] **SITE_LIVE=1** in der Cloud-Run-Umgebung setzen. Das hebt `noindex` in `app/layout.tsx`, `app/robots.ts` und dem `X-Robots-Tag`-Header (`next.config.ts` Z. 14) gleichzeitig auf. Google Ads kann eine Seite mit `noindex` zwar bewerben, aber der Qualitätsfaktor leidet, und die Zielseite muss ohnehin öffentlich sein.
- [ ] **SITE_PASSWORD leer** (Middleware). Sonst landen alle Klicks auf `/zugang`. Prüfen im Inkognito-Fenster: `curl -sI https://vierwochen.de | grep -i -E "x-robots|location"` darf weder `noindex` noch eine Weiterleitung zeigen.
- [ ] **Kein „Team", kein „wir" mehr** auf Startseite, FAQ, Systemprompt (`lib/dialog.ts`) und Buchungskarte. Die Anzeigen unten sagen „ein Ansprechpartner" — die Seite muss dasselbe sagen. Ein Fremder, der aus einer Anzeige kommt, prüft genau das (Review, trust-beweis-ethik).
- [ ] **Preis auf der Seite = Preis in der Anzeige.** Anzeigen nennen „Festpreis ab 12.500 € netto". `PRICE.floor` ist 12.500, aber `PRICING_TIERS` enthält noch „Pilot: ab 9.500 €" (`lib/config.ts`). Wenn irgendwo 9.500 sichtbar ist, ist die Anzeige irreführend. Vorher bereinigen.
- [ ] **Datenschutzerklärung** nennt gclid/utm-Erfassung (tut sie: `app/(site)/datenschutz/page.tsx` Z. 96, 114). Kein Consent-Banner nötig, solange kein Google-Tag auf der Seite läuft (`lib/events.ts` Kopfkommentar). Dieser Plan kommt **ohne Google-Tag** aus (Abschnitt 5). Wenn du später gtag einbaust: Banner zuerst.
- [ ] **End-to-End-Test der Buchung** mit einer echten Firmenadresse (nicht Freemail — das Gate in `app/api/booking/book/route.ts` weist Gmail & Co. ab): Dialog → Skizze → Slot → Bestätigungsmail kommt an → Kalendereintrag mit Meet-Link vorhanden → Ereignis `booked` erscheint im Admin unter Quelle „Google Ads" (dafür beim Test `?gclid=TEST123` an die URL hängen).
- [ ] **Mailzustellung**: SPF, DKIM, DMARC für vierwochen.de gesetzt; Testmail an eine Outlook-/Exchange-Adresse kommt nicht im Spam an. Die Bestätigungsmail ist der wichtigste Hebel für die Show-Rate.
- [ ] **Slots** stimmen mit deinem Kalender (`BOOKING.hourWindows`: 8–9, 12–13, 17–19 Uhr, Vorlauf 24 h, 8 Werktage). Trage die Arbeitgeber-Termine ein, bevor ein Fremder einen Slot bucht, den du nicht halten kannst.
- [ ] **Ladezeit** der Startseite mobil unter 3 s (PageSpeed Insights, Mobil ≥ 70). Der Qualitätsfaktor bestraft langsame Zielseiten mit höherem CPC.

### 1.2 Firma

- [ ] **Nebentätigkeit beim Arbeitgeber angezeigt** und schriftlich bestätigt. Die Anzeigen laufen tagsüber unter deinem Namen; ein Kollege wird sie sehen. *Vom Anwalt prüfen lassen: Anzeigepflicht laut Arbeitsvertrag, Wettbewerbsverbot.*
- [ ] **Gewerbe angemeldet**, Steuernummer vorhanden (für Rechnung und Google-Zahlungsprofil).
- [ ] **Berufshaftpflicht / IT-Haftpflicht** mindestens beantragt — spätestens beim ersten Auftrag aktiv (Review gruender-risiko).

### 1.3 Google-Ads-Konto

- [ ] Konto unter der Firmenadresse, **Zahlungsprofil als Unternehmen** mit USt-IdNr. (Reverse-Charge, sonst zahlst du irische USt und bekommst sie nicht zurück).
- [ ] **Werbetreibenden-Verifizierung** sofort starten (dauert bis zu einer Woche; ohne sie pausiert Google irgendwann die Anzeigen).
- [ ] **Automatisches Tagging (gclid) an** — Kontoeinstellungen → Automatisches Tagging. Ohne gclid keine Rückmeldung an Google und keine Quelle „Google Ads" im Admin.
- [ ] **Conversion-Aktionen angelegt** (Abschnitt 5) — vor dem ersten Klick, sonst fehlen die Daten der ersten Tage.
- [ ] **Keine Google-Empfehlungen automatisch anwenden** (Einstellungen → Automatisch angewendete Empfehlungen: alles aus). Google will Broad Match, Display-Erweiterung und Suchpartner — alles drei verwässert den Test.
- [ ] **Kein Google-Vertriebsanruf** annehmen. Die „kostenlose Kontoberatung" schaltet in 90 % der Fälle Broad Match ein.

---

## 2. Kampagnenstruktur

Ein Konto, **zwei Kampagnen**, sechs Anzeigengruppen. Zwei Kampagnen, weil die Nischen-Keywords (Handel, Anlagenbau) sonst im Budget gegen die generischen Keywords verlieren und du nach drei Wochen nicht weißt, ob die Nische funktioniert.

### 2.1 Kampagneneinstellungen (beide Kampagnen identisch)

| Einstellung | Wert | Warum |
|---|---|---|
| Kampagnentyp | **Suche** (Search only) | Nur Suchintention. Kein Display, kein Performance Max, kein YouTube. |
| Netzwerke | Google-Suche, **Suchpartner AUS**, **Displaynetzwerk AUS** | Beide Häkchen sind standardmäßig gesetzt. Rausnehmen. |
| Standorte | Deutschland, Österreich, Schweiz | DACH. |
| Standortoptionen | **„Präsenz: Nutzer in den Zielregionen"** (nicht „Präsenz oder Interesse") | Sonst bezahlst du Klicks aus Indien von Leuten, die sich für DACH interessieren. |
| Sprache | **Deutsch** | Nur Deutsch. |
| Gebotsstrategie | **Klicks maximieren** mit **Gebotsobergrenze 12 €** (Annahme, aus Benchmark-CPC-Obergrenze) | Zu wenige Conversions für Ziel-CPA (Google braucht ≥ 15–30 in 30 Tagen). Manueller CPC ist die Alternative, kostet aber tägliche Pflege. |
| Tagesbudget | Kampagne A (Generisch): **110 €** · Kampagne B (Nischen): **70 €** | Zusammen 180 €/Werktag × 15 Werktage ≈ 2.700 €. Google darf an einem Tag bis zum Doppelten ausgeben, gleicht das im Monat aus — bei 3 Wochen Laufzeit also **wöchentlich den Gesamtstand prüfen** (Abschnitt 8). |
| Werbezeitplaner | **Mo–Fr 07:00–20:00** Europe/Berlin; Sa/So aus | B2B-Intent. Review: „Werktage, Desktop-Bias". Das Budget verteilt sich damit auf Werktage. |
| Geräte | Mobil **−30 %** Gebotsanpassung (Annahme) | Desktop-Bias laut Review. Der Berater funktioniert mobil, aber wer im Büro sitzt, ist näher am Auftrag. Nach 150 Klicks gegen die eigenen Daten prüfen (Abschnitt 7). |
| Start / Ende | Dienstag [Datum] / Freitag [Datum + 17 Tage] | Enddatum **setzen**, damit die Kampagne nicht weiterläuft, wenn du im Urlaub bist. |
| Anzeigenrotation | Optimieren (Standard) | Bei 6 Anzeigen und 300 Klicks ist ein manueller Rotationsvergleich nicht signifikant. |
| Tracking-Vorlage (Kontoebene) | `{lpurl}?utm_source=google&utm_medium=cpc&utm_campaign={_kampagne}&utm_term={keyword}&utm_content={creative}&utm_device={device}` | `lib/track.ts` sammelt gclid **und** utm_* ein. Im Admin wird die Quelle als „Google Ads · [Kampagne]" gruppiert (`lib/events.ts` Z. 211). |
| Benutzerdefinierter Parameter `{_kampagne}` | Kampagne A: `generisch` · Kampagne B: `nische` | Damit steht der Kampagnenname lesbar in der CSV. |
| Finale URL | `https://vierwochen.de/` | Landing = Startseite. Keine Sonderseite, keine Variante. Du testest die Seite, die auch LinkedIn-Kontakte sehen. |

### 2.2 Anzeigengruppen

| Kampagne | Anzeigengruppe | Intent | Anzeige (Abschnitt 4) |
|---|---|---|---|
| A Generisch | **A1 Individualsoftware** | „Ich brauche jemanden, der mir Software baut" | RSA-1 |
| A Generisch | **A2 Kosten & Preis** | „Was kostet das?" — Preisintent, hohe Kaufnähe | RSA-2 |
| A Generisch | **A3 Kundenportal & Web-App** | Konkretes Produkt im Kopf | RSA-3 |
| A Generisch | **A4 Excel ablösen** | Schmerz benannt, Lösung noch nicht | RSA-4 |
| B Nische | **B1 Handel / Warenwirtschaft** | Testnische 1 | RSA-5 |
| B Nische | **B2 Anlagen-/Elektrobau / Prüfprotokoll** | Testnische 2 | RSA-6 |

Regel: **eine Anzeige pro Anzeigengruppe**, keine zweite Variante. Bei ~50 Klicks je Gruppe ist ein A/B-Test von Anzeigen Rauschen. Was du vergleichst, sind Anzeigengruppen (= Intents), nicht Anzeigentexte.

---

## 3. Keywords

Match-Typen: `[exakt]` und `"Wortgruppe"`. **Kein Broad Match** — nicht mal „Broad mit Smart Bidding". Auch exakt ist bei Google seit 2021 „nahe Varianten", also Suchanfragenbericht täglich prüfen (Abschnitt 8).

CPC-Spalte: **Schätzung** auf Basis der Review-Benchmarks (5–12 €; vc-skeptiker 4–10 €), verteilt nach Wettbewerbsdruck. Am Tag 0 mit dem Google Keyword-Planer („Prognose" mit deinen Keywords) überschreiben und die Spalte „Planer" füllen. Volumen-Spalte ebenfalls Schätzung in Stufen (niedrig < 100 / Monat DACH, mittel 100–500, hoch > 500).

### 3.1 Kampagne A — Generisch

| # | Anzeigengruppe | Keyword | Match | Intent | CPC-Schätzung | Volumen (Schätzung) | Planer |
|---|---|---|---|---|---|---|---|
| 1 | A1 | individualsoftware entwickeln lassen | exakt + Wortgruppe | Beauftragung | 7–12 € | mittel | [ ] |
| 2 | A1 | software entwickeln lassen | exakt | Beauftragung, breiter | 8–14 € | hoch | [ ] |
| 3 | A1 | individualsoftware mittelstand | exakt + Wortgruppe | Beauftragung, Zielgruppe | 6–10 € | niedrig | [ ] |
| 4 | A1 | softwareentwicklung festpreis | exakt + Wortgruppe | Beauftragung, Preismodell | 5–9 € | niedrig | [ ] |
| 5 | A1 | individuelle software für unternehmen | Wortgruppe | Beauftragung | 6–10 € | niedrig–mittel | [ ] |
| 6 | A2 | software entwickeln lassen kosten | exakt + Wortgruppe | Preis | 5–10 € | mittel | [ ] |
| 7 | A2 | individualsoftware kosten | exakt + Wortgruppe | Preis | 5–9 € | mittel | [ ] |
| 8 | A2 | was kostet individualsoftware | Wortgruppe | Preis | 4–8 € | niedrig | [ ] |
| 9 | A2 | app entwickeln lassen kosten | exakt | Preis, App-Wortschatz | 6–11 € | hoch | [ ] |
| 10 | A2 | web app entwickeln lassen kosten | Wortgruppe | Preis, Web-App | 5–9 € | niedrig | [ ] |
| 11 | A3 | kundenportal entwickeln lassen | exakt + Wortgruppe | Produkt | 6–11 € | niedrig–mittel | [ ] |
| 12 | A3 | web app entwickeln lassen | exakt + Wortgruppe | Produkt | 7–12 € | mittel | [ ] |
| 13 | A3 | webanwendung entwickeln lassen | exakt + Wortgruppe | Produkt | 6–10 € | niedrig–mittel | [ ] |
| 14 | A3 | interne software entwickeln lassen | Wortgruppe | Produkt, interne Werkzeuge | 5–9 € | niedrig | [ ] |
| 15 | A3 | kundenportal erstellen lassen | Wortgruppe | Produkt | 5–9 € | niedrig | [ ] |
| 16 | A4 | excel ablösen software | exakt + Wortgruppe | Schmerz | 4–8 € | niedrig–mittel | [ ] |
| 17 | A4 | excel durch datenbank ersetzen | Wortgruppe | Schmerz | 3–7 € | niedrig | [ ] |
| 18 | A4 | excel liste in software umwandeln | Wortgruppe | Schmerz | 3–7 € | niedrig | [ ] |
| 19 | A4 | prozess digitalisieren software mittelstand | Wortgruppe | Schmerz, allgemein | 5–9 € | niedrig | [ ] |

### 3.2 Kampagne B — Nischen

| # | Anzeigengruppe | Keyword | Match | Intent | CPC-Schätzung | Volumen (Schätzung) | Planer |
|---|---|---|---|---|---|---|---|
| 20 | B1 | warenwirtschaft schnittstelle programmieren | Wortgruppe | Nische Handel, Integration | 4–9 € | niedrig | [ ] |
| 21 | B1 | warenwirtschaft anbindung entwickeln | Wortgruppe | Nische Handel | 4–8 € | niedrig | [ ] |
| 22 | B1 | bestellportal für kunden erstellen | Wortgruppe | Nische Handel, B2B-Portal | 5–9 € | niedrig | [ ] |
| 23 | B1 | b2b kundenportal großhandel | Wortgruppe | Nische Handel | 5–10 € | niedrig | [ ] |
| 24 | B2 | prüfprotokoll app entwickeln | Wortgruppe | Nische Anlagenbau | 3–7 € | niedrig | [ ] |
| 25 | B2 | prüfprotokoll digital erstellen software | Wortgruppe | Nische Anlagenbau | 4–8 € | niedrig | [ ] |
| 26 | B2 | elektro prüfprotokoll app | Wortgruppe | Nische Elektrobau | 4–8 € | niedrig–mittel | [ ] |
| 27 | B2 | baustellen app entwickeln lassen | Wortgruppe | Nische Bau, mobil/offline | 5–9 € | niedrig | [ ] |

Das sind 27 Keywords in 19 + 8. Wenn der Planer für ein Nischen-Keyword „–" (kein messbares Volumen) zeigt: trotzdem drin lassen, Wortgruppe fängt Varianten; bei 0 Impressionen nach 5 Werktagen streichen.

**Vorsicht bei #26 „elektro prüfprotokoll app":** Da suchen viele Elektriker nach fertigen Apps (Fluke, Benning, Mebedo, Gossen Metrawatt). Das ist ein Kaufintent für ein Produkt, nicht für Individualsoftware. Anzeige RSA-6 sagt deshalb „zum Festpreis entwickeln", damit der Fertigprodukt-Sucher nicht klickt. Wenn nach 40 Klicks kein Dialog: Keyword raus.

### 3.3 Negativ-Keywords (Kontoebene, Liste „vierwochen-negativ")

Als **Wortgruppen-Ausschluss** anlegen, sofern nicht anders markiert.

```
Kostenlos / Selbstbau
kostenlos, gratis, free, freeware, open source, opensource, download,
selber machen, selbst programmieren, selbst erstellen, selber erstellen,
tutorial, anleitung, lernen, kurs, schulung, webinar, bootcamp,
vorlage, template, muster, beispiel, excel vorlage, word vorlage,
low code, no code, nocode, lowcode, bubble, lovable, powerapps, power apps

Job / Karriere / Ausbildung
job, jobs, stellenangebot, stellenangebote, stellen, karriere, gehalt,
gehälter, verdienst, ausbildung, studium, studieren, bachelor, master,
praktikum, werkstudent, quereinsteiger, umschulung, weiterbildung, ihk prüfung

Recherche / Definition
was ist, definition, bedeutung, wikipedia, unterschied, vergleich, test,
erfahrungen, bewertung, forum, pdf, buch, bücher, ebook

Falsches Produkt (nicht im Angebot)
erp einführung, erp system, erp software, sap, navision, business central,
medizinprodukt, medizintechnik, sps, steuerung, steuerungstechnik,
spiel, game, spieleentwicklung, ios app, android app, app store, shopify,
wordpress, website erstellen, homepage erstellen, webdesign, seo, agentur

Falscher Einkaufsmodus
freelancer, freiberufler, stundensatz, stundenlohn, offshore, indien,
ukraine, nearshore, outsourcing, ausschreibung, vergabe

Fertigprodukte Prüfprotokoll (nur Kampagne B)
fluke, benning, gossen, metrawatt, mebedo, dguv v3 app, e-check app
```

Hinweis zu **„agentur"**: Wer „software agentur" sucht, ist ein echter Käufer — aber er will ein Team, das du nicht bist. Erst mal ausschließen; wenn A1 nach zwei Wochen zu wenig Impressionen hat, „agentur" freigeben und beobachten, ob diese Klicks Dialoge starten.

Hinweis zu **„günstig" / „billig"**: nicht ausschließen. Preissensible Käufer sind bei 12.500 € nicht deine Kunden, aber du willst wissen, wie viele es sind — der Berater sortiert sie kostenlos aus.

---

## 4. Sechs Responsive Search Ads (Wortlaut)

Regeln, die für alle sechs gelten:

- Headlines ≤ 30 Zeichen, Descriptions ≤ 90 Zeichen — **alle unten gezählt und geprüft**.
- Kein „wir", kein „Team", kein „unsere Entwickler". Was drinsteht, ist wahr: ein Ansprechpartner, KI baut, Festpreis ab 12.500 € netto, die Abnahme-Zusage, Code gehört dem Kunden.
- **„Netto"** steht bei jedem Preis. B2B-Preise ohne USt.-Hinweis sind in Anzeigen an Unternehmer zulässig, wenn die Zielgruppe klar ist; „netto" nimmt das Risiko raus (PAngV greift bei reinen B2B-Angeboten nicht — *vom Anwalt prüfen lassen*, weil die Startseite auch von Verbrauchern gesehen wird).
- **Nicht** mit „24 Monate Gewährleistung" werben. Das ist beim Werkvertrag gesetzlicher Standard (§ 634a BGB); Werbung mit Selbstverständlichkeiten ist nach § 5 UWG abmahnfähig. Auf der Seite darf es stehen (erklärend), in der Anzeige nicht als Vorteil. *Vom Anwalt prüfen lassen.*
- Die Abnahme-Zusage lautet auf der Seite wortgleich „Besteht die Abnahme nicht, entfällt die zweite Rate." (`ACCEPTANCE_PROMISE`). In der Headline gekürzt auf „Keine Abnahme, keine 2. Rate" — die lange Fassung steht in der Description. *Anwalt: Kurzform als Werbeaussage prüfen.*
- **Pinnen**: Nur Headline 1 (Intent-Headline) auf Position 1 pinnen. Alles andere frei — Google braucht die Freiheit für die Anzeigenstärke.
- Anzeigenstärke „Gut" reicht. „Sehr gut" verlangt meist Keyword-Wiederholungen, die den Text schlechter machen.

### RSA-1 — A1 Individualsoftware

Headlines (H1 gepinnt auf Position 1):
```
H1  Individualsoftware: Festpreis
H2  In vier Wochen live
H3  Festpreis ab 12.500 € netto
H4  Keine Abnahme, keine 2. Rate
H5  Ein Ansprechpartner, KI baut
H6  Richtpreis in einer Minute
H7  Code gehört Ihnen
H8  Direkt mit dem, der baut
H9  50 % jetzt, 50 % nach Abnahme
H10 Für Betriebe ohne IT-Abteilung
H11 vierwochen.de
```
Descriptions:
```
D1  Web-App, Portal oder internes Werkzeug. Festpreis ab 12.500 € netto, in vier Wochen live.
D2  Drei Fragen, eine Minute: Richtpreis mit Herleitung und Skizze. Dann 30 Minuten Gespräch.
D3  Besteht die Abnahme nicht, entfällt die zweite Rate. Der Code gehört Ihnen, komplett.
D4  Keine Übergabekette: ein verantwortlicher Kopf entscheidet mit Ihnen, KI baut.
```

### RSA-2 — A2 Kosten & Preis

```
H1  Was kostet Individualsoftware?
H2  Festpreis ab 12.500 € netto
H3  Richtpreis in einer Minute
H4  Preis mit Herleitung
H5  Bausteine, klar bepreist
H6  Höchstens 35.000 € netto
H7  Keine Abnahme, keine 2. Rate
H8  In vier Wochen live
H9  Rest erst nach Abnahme
H10 Kein Stundenzettel
H11 Ein Ansprechpartner, KI baut
```
```
D1  Grundpreis 12.500 € netto plus feste Bausteine, z. B. Systemanbindung ab 2.500 €.
D2  Drei Fragen im KI-Berater, eine Minute: Richtpreis, Herleitung, Skizze. Unverbindlich.
D3  Festangebot nach 30 Minuten Gespräch. Decke 35.000 €: mehr entsteht nicht in vier Wochen.
D4  50 % bei Auftrag, 50 % nach Abnahme. Besteht die Abnahme nicht, entfällt die zweite Rate.
```

### RSA-3 — A3 Kundenportal & Web-App

```
H1  Kundenportal in vier Wochen
H2  Web-App zum Festpreis
H3  Festpreis ab 12.500 € netto
H4  Anbindung an Ihr System
H5  Läuft auf Handy und Tablet
H6  Keine Abnahme, keine 2. Rate
H7  Ein Ansprechpartner, KI baut
H8  Richtpreis in einer Minute
H9  Login, Rollen, Dokumente
H10 Internes Werkzeug statt Excel
H11 Code gehört Ihnen
```
```
D1  Portal für Kunden oder Monteure: Login, Rollen, Dokumente, Anbindung an Ihr System.
D2  Ab 12.500 € netto, in vier Wochen live. Besteht die Abnahme nicht, entfällt die 2. Rate.
D3  Beschreiben Sie den Ablauf in drei Antworten: Skizze und Richtpreis in einer Minute.
D4  Betrieb ab 290 €/Monat: Hosting, Updates, Monitoring. Monatlich kündbar. Code ist Ihrer.
```

### RSA-4 — A4 Excel ablösen

```
H1  Excel ablösen in vier Wochen
H2  Schluss mit der Excel-Liste
H3  Aus Excel wird eine Anwendung
H4  Festpreis ab 12.500 € netto
H5  Mehrere Nutzer, ein Stand
H6  Datenübernahme als Baustein
H7  Keine Abnahme, keine 2. Rate
H8  Richtpreis in einer Minute
H9  Ein Ansprechpartner, KI baut
H10 Rechte, Historie, Auswertung
H11 Code gehört Ihnen
```
```
D1  Wenn drei Leute eine Tabelle pflegen: Datenbank, Oberfläche, Rechte. Ab 12.500 € netto.
D2  Ihre Excel-Daten werden übernommen (Baustein ab 1.500 €). In vier Wochen live.
D3  Drei Fragen, eine Minute: Richtpreis mit Herleitung und Skizze. Ohne Formular.
D4  Besteht die Abnahme nicht, entfällt die zweite Rate. Ein Ansprechpartner bis zum Betrieb.
```

### RSA-5 — B1 Handel / Warenwirtschaft

```
H1  WaWi-Anbindung zum Festpreis
H2  Portal an Ihre Warenwirtschaft
H3  Bestellportal für Ihre Kunden
H4  Systemanbindung ab 2.500 €
H5  Festpreis ab 12.500 € netto
H6  In vier Wochen live
H7  Keine Abnahme, keine 2. Rate
H8  Für Handel und Großhandel
H9  Ein Ansprechpartner, KI baut
H10 Richtpreis in einer Minute
H11 Lager, Preise, Bestellstatus
```
```
D1  Bestellportal oder Außendienst-App an Ihrer Warenwirtschaft. Ab 12.500 € netto.
D2  Anbindung an Ihr Bestandssystem als Baustein (2.500 bis 5.000 €). In vier Wochen live.
D3  Drei Fragen, eine Minute: Richtpreis und Skizze für Ihren Ablauf. Dann ein Gespräch.
D4  Besteht die Abnahme nicht, entfällt die zweite Rate. Betrieb ab 290 €/Monat.
```

### RSA-6 — B2 Anlagen-/Elektrobau / Prüfprotokoll

```
H1  Prüfprotokolle als App
H2  Prüfprotokoll digital erfassen
H3  Protokoll auf dem Tablet
H4  PDF-Protokoll auf Knopfdruck
H5  Offline auf der Baustelle
H6  Festpreis ab 12.500 € netto
H7  Zum Festpreis entwickeln
H8  In vier Wochen live
H9  Keine Abnahme, keine 2. Rate
H10 Für Anlagen- und Elektrobau
H11 Ein Ansprechpartner, KI baut
```
```
D1  Prüfprotokolle auf dem Tablet erfassen, Fotos anhängen, PDF an den Kunden. Auch offline.
D2  Individuell für Ihren Prüfablauf, kein Fertigprodukt. Festpreis ab 12.500 € netto.
D3  Beschreiben Sie Ihren Prüfablauf in drei Antworten: Skizze und Richtpreis in einer Minute.
D4  Besteht die Abnahme nicht, entfällt die zweite Rate. Mobil und offline als Bausteine.
```

### 4.1 Anzeigenerweiterungen (Assets, Kontoebene)

- **Sitelinks** (4): „Preise und Bausteine" → `/#preise` · „So läuft es ab" → `/#ablauf` · „Über Moritz Schumacher" → `/#ueber` · „Gespräch buchen" → `/termin`. (Anker an die tatsächlichen Abschnitts-IDs der Startseite anpassen.)
- **Zusatzinformationen** (Callouts, ≤ 25 Zeichen): „Festpreis ab 12.500 € netto" (27 — zu lang, nimm „Festpreis ab 12.500 €"), „Live in vier Wochen", „Code gehört Ihnen", „Monatlich kündbar", „Richtpreis in 1 Minute".
- **Snippet-Erweiterung** „Typen": Kundenportal, Web-App, Internes Werkzeug, Mobile Web-App, Schnittstelle.
- **Keine Anruferweiterung.** Du bist tagsüber angestellt und kannst nicht rangehen. Ein unbeantworteter Anruf ist schlimmer als keiner.
- **Kein Lead-Formular-Asset.** Der Berater ist das Formular.

---

## 5. Conversion-Ziele und Rückmeldung an Google (ohne Google-Tag)

Die Seite erfasst gclid/gbraid/wbraid und utm_* beim ersten Aufruf (`lib/track.ts`) und schreibt sie an jedes Ereignis und an die Buchung (`app/api/booking/book/route.ts` Z. 91–93). Es gibt **kein** Google-Tag, keine Cookies, kein Consent-Banner — und das bleibt so. Die Conversions gehen per **Offline-Conversion-Import (Klick-Conversions hochladen)** an Google. Das ist datensparsamer, exakter (du meldest nur, was wirklich passiert ist) und erlaubt die einzige Conversion, die zählt: **Gespräch wahrgenommen**, die kein Tag der Welt messen kann.

### 5.1 Conversion-Aktionen anlegen (Google Ads → Ziele → Conversions → Neu → Import → „Andere Datenquellen" → „Conversions aus Klicks verfolgen")

| Name in Google Ads | Ereignis in `lib/events.ts` | Zählung | Ziel-Typ | Wert (Annahme) |
|---|---|---|---|---|
| `vw_dialog_gestartet` | `dialog_started` | Eine pro Klick | Sekundär (Beobachtung) | 0 € |
| `vw_skizze_erhalten` | `result_delivered` | Eine pro Klick | Sekundär | 0 € |
| `vw_termin_gebucht` | `booked` | Eine pro Klick | **Primär** | 300 € |
| `vw_gespraech_wahrgenommen` | (manuell, aus deinem Kalender) | Eine pro Klick | **Primär** | 1.000 € |

Warum Werte: Google zeigt dann „Conv.-Wert / Kosten", und du siehst pro Anzeigengruppe sofort, ob 300 € pro Buchung erreicht sind. Die Werte sind Steuerungsgrößen, keine Umsätze. `dialog_opened` (nur Klick auf die Leiste) und `page_view` **nicht** importieren — Rauschen. `booking_slot_selected` auch nicht, das ist ein Zwischenschritt.

Conversion-Fenster: 90 Tage (Maximum für Klick-Conversions). Attribution: „Letzter Klick" — bei dieser Datenmenge ist alles andere Zahlenkosmetik.

### 5.2 Upload-Rhythmus

- **Dienstag und Freitag** je 10 Minuten, jeweils nur Ereignisse, deren Klick **mindestens 6 Stunden** zurückliegt (Google verwirft frühere Uploads teilweise ohne Meldung).
- `vw_gespraech_wahrgenommen` sofort nach jedem Gespräch nachtragen — in die gleiche Datei.
- gbraid/wbraid (iOS ohne gclid) werden vom gleichen Upload akzeptiert; Spalte einfach mitgeben.

### 5.3 Vom Admin-Export zur Google-Datei

Der Admin-Export liefert Ereignisse mit gclid: `https://vierwochen.de/api/admin/export?was=ereignisse&tage=30` (Semikolon, UTF-8 mit BOM, Spalten: Zeitpunkt, Typ, Sitzung, Dialog, Pfad, gclid, utm_source, utm_medium, utm_campaign, Verweis, Landung, Meta). Google will: `Google Click ID; Conversion Name; Conversion Time; Conversion Value; Conversion Currency` mit Zeitformat `yyyy-MM-dd HH:mm:ss+01:00` (im Sommer +02:00).

Skript (im Scratch-Ordner ablegen, nicht ins Repo — es ist ein Arbeitswerkzeug):

```python
# ads_upload.py — aus dem Admin-Export die Google-Upload-Datei bauen
import csv, sys
from datetime import datetime, timezone
from zoneinfo import ZoneInfo

MAP = {"dialog_started": ("vw_dialog_gestartet", 0),
       "result_delivered": ("vw_skizze_erhalten", 0),
       "booked": ("vw_termin_gebucht", 300)}
berlin = ZoneInfo("Europe/Berlin")
seen = set()
out = csv.writer(sys.stdout, delimiter=",")
out.writerow(["Google Click ID", "Conversion Name", "Conversion Time", "Conversion Value", "Conversion Currency"])
with open(sys.argv[1], encoding="utf-8-sig") as f:
    for row in csv.DictReader(f, delimiter=";"):
        typ, gclid = row["Typ"], row["gclid"]
        if typ not in MAP or not gclid: continue
        key = (gclid, typ)
        if key in seen: continue          # eine Conversion je Klick und Typ
        seen.add(key)
        t = datetime.fromisoformat(row["Zeitpunkt"].replace("Z", "+00:00")).astimezone(berlin)
        if (datetime.now(timezone.utc) - t).total_seconds() < 6 * 3600: continue  # zu frisch
        name, value = MAP[typ]
        out.writerow([gclid, name, t.strftime("%Y-%m-%d %H:%M:%S%z")[:-2] + ":" + t.strftime("%z")[-2:], value, "EUR"])
```

Aufruf: `python3 ads_upload.py vierwochen-ereignisse-2026-09-30.csv > upload.csv`, dann in Google Ads → Conversions → Uploads → Datei hochladen. Die Datei darf denselben Klick mehrfach in verschiedenen Uploads enthalten — Google dedupliziert je Klick, Name und Zeitstempel; **denselben Zeitstempel** deshalb nie ändern.

Für `vw_gespraech_wahrgenommen`: gclid aus der Buchung (Admin → Buchung → Attribution, oder aus dem `booked`-Ereignis mit derselben Sitzung), Zeit = Gesprächsbeginn, Wert 1000, händisch als Zeile anhängen.

### 5.4 Was der Admin heute nicht kann und was du bis Tag 0 brauchst

`FUNNEL_STEPS` endet bei `booked`. Show, Angebot, Abschluss fehlen (Review growth-nachfrage, coreMeasures „Messkette vervollständigen"). Für den Test reicht ein **Google Sheet** mit einer Zeile je Buchung:

| Buchung (Datum/Slot) | Name | Firma | Größe | Branche | Quelle (Admin) | Kampagne / Anzeigengruppe / Keyword (aus utm_term) | Erschienen? (ja/nein/verschoben) | Budget genannt? (≥ 10k / < 10k / nein) | Entscheider? | Zeitrahmen | Angebot verschickt (Datum, €) | Ergebnis (offen/gewonnen/verloren) | Verloren weil |

Das ist zugleich das Protokoll der 5 Fragen nach jedem Gespräch (Sales-Leitfaden 01, Abschnitt 6.1). Ohne dieses Blatt kannst du „Kosten je wahrgenommenem Gespräch" nicht ausrechnen — und das ist die Kill-Zahl.

---

## 6. Wochenplan

Start an einem **Dienstag** (Montag ist im B2B-Search der teuerste Tag, und du willst am ersten Tag Zeit haben, den Suchanfragenbericht abends zu lesen). Zeitbedarf: Setup 1 Tag, danach 2 h/Woche (Review) plus 10 Minuten täglich.

### Tag −3 bis 0 (Setup, Wochenende davor)

- [ ] Abschnitt 1 komplett abgehakt. Keine Ausnahme.
- [ ] Keyword-Planer: Prognose für alle 27 Keywords, Spalte „Planer" gefüllt. Keywords mit Planer-CPC > 15 € streichen oder nur exakt behalten.
- [ ] Beide Kampagnen, sechs Anzeigengruppen, sechs RSAs, Negativliste, Assets angelegt — **pausiert**.
- [ ] Vier Conversion-Aktionen angelegt (Abschnitt 5.1). Status „Keine aktuellen Conversions" ist normal.
- [ ] Tracking-Vorlage getestet: Anzeigenvorschau-Tool → Klick auf eigene Anzeige (kostet nichts im Vorschau-Tool) → Admin zeigt Sitzung mit Quelle „Google Ads · generisch".
- [ ] Google Sheet aus 5.4 angelegt.
- [ ] Anzeigenrichtlinien-Prüfung: alle Anzeigen „Zulässig" oder „Zulässig (eingeschränkt)". Bei „Abgelehnt" (häufig: „Irreführende Angaben" wegen Preis) — Landing muss den Preis sichtbar zeigen, dann Überprüfung beantragen.

### Woche 1 (Di–Fr, 4 Werktage) — Laufen lassen, Müll rausfiltern

Ziel: ~90–110 Klicks. **Keine Gebots- oder Struktur-Änderungen.** Review: „keine Änderungen vor 150 Klicks".

- [ ] Di 07:00: Kampagnen aktivieren. Abends: Suchanfragenbericht lesen. Alles, was kein Käufer ist (Jobs, Kurse, Fertigprodukte, „was ist"), in die Negativliste. Erwartung Tag 1: 30–50 % der Impressionen sind Müll — das ist normal, deshalb täglich.
- [ ] Mi–Fr täglich 10 Minuten: Suchanfragenbericht → Negativliste. Ausgaben prüfen (Soll: ≤ 180 €/Tag, kumuliert Fr ≤ 800 €).
- [ ] Fr 17:00 Review (30 Min): Klicks, CPC, Impressionsanteil je Anzeigengruppe; Admin-Funnel nach Quelle; erster Upload (Abschnitt 5.2). Noch **nichts entscheiden**. Nur notieren.
- [ ] Jede Buchung: innerhalb 2 Stunden persönliche Bestätigung per Mail (Sales-Leitfaden 01) — die Show-Rate wird hier gemacht, nicht im Ads-Konto.

### Woche 2 (Mo–Fr) — Erste Lesung bei 150 Klicken, Budget umschichten

Ziel: kumuliert ~250 Klicks.

- [ ] Mo: Wenn kumuliert ≥ 150 Klicks: **erste Lesung** mit Raster aus Abschnitt 7. Anzeigengruppen mit ≥ 40 Klicks und **0 Dialogen** pausieren (Annahme: bei 20 % Erwartung sind 0 aus 40 ein Signal, p ≈ 0,0001). Ihr Budget bleibt in der Kampagne — Google verteilt es auf die anderen Gruppen.
- [ ] Mo: Gerätevergleich — wenn Mobil Klick→Dialog < halb so gut wie Desktop, Mobil auf −50 % (Annahme). Wenn gleich gut, Anpassung auf 0.
- [ ] Mo: Länder — wenn CH oder AT ≥ 20 % Budget frisst bei 0 Dialogen, Land pausieren.
- [ ] Di + Fr: Upload.
- [ ] Täglich 10 Minuten Suchanfragenbericht (die Menge neuer Müll-Anfragen sollte deutlich sinken).
- [ ] Erste Gespräche finden statt. Nach jedem: 5 Fragen ins Sheet, `vw_gespraech_wahrgenommen` hochladen.
- [ ] Fr 17:00 Review: kumulierte Ausgaben Soll ≤ 1.700 €. Wenn du unter 1.300 € liegst (zu wenig Impressionen), Gebotsobergrenze auf 15 € und „agentur" aus der Negativliste nehmen. Wenn über 2.000 €, Tagesbudget A auf 90 €.

### Woche 3 (Mo–Fr) — Auslaufen, Show-Rate abwarten, Entscheidung

Ziel: kumuliert 300–400 Klicks, Spend 2.500–3.000 €.

- [ ] Mo: Zweite Lesung. Keine neuen Keywords mehr — was jetzt neu reinkommt, hat bis Freitag keine Buchung mehr.
- [ ] Do: Gebote nicht anfassen, aber Enddatum bestätigen (Fr 20:00).
- [ ] Fr 20:00: Kampagnen enden automatisch. **Nicht** verlängern, egal wie es aussieht — die Entscheidung fällt mit vollständigen Daten.
- [ ] Buchungen aus Woche 3 liegen wegen 24 h Vorlauf + 8 Werktagen Horizont bis zu **8 Werktage nach Kampagnenende**. Die endgültige Auswertung (Abschnitt 7) machst du deshalb erst am **Freitag der Woche 4** — Kalendereintrag jetzt setzen.
- [ ] Woche 4, Fr: Abschlussauswertung, Entscheidung nach Abschnitt 7.4, Ergebnis als Abschnitt in dieses Dokument schreiben (Vorlage 7.5).

---

## 7. Auswertungsraster

### 7.1 Datenquellen

| Zahl | Woher |
|---|---|
| Impressionen, Klicks, CPC, Kosten je Anzeigengruppe/Keyword | Google Ads, Bericht „Anzeigengruppen" / „Suchbegriffe" |
| Sitzungen mit gclid, Dialoge, Skizzen, Buchungen | Admin → Quellen (`buildSources`, `lib/events.ts` Z. 201) — Zeile „Google Ads · generisch" und „Google Ads · nische" |
| Je Anzeigengruppe / Keyword | Admin-Export `?was=ereignisse` → Spalte utm_campaign / `utm_term` aus der Landung (URL) |
| Show, Budget, Entscheider, Angebot | Google Sheet aus 5.4 |

**Klick ≠ Sitzung.** Google zählt Klicks, der Admin zählt Sitzungen mit gclid (Tab geschlossen = neue Sitzung beim nächsten Klick, gleicher Tab = eine Sitzung). Erwartung: Sitzungen ≈ 85–95 % der Klicks (Annahme; Rest sind Abbrüche vor dem ersten Skript, Bots, Doppelklicks). Wenn Sitzungen < 70 % der Klicks: Ladezeit oder Tracking kaputt — vor jeder weiteren Lesung klären.

Nenner für alle Quoten unten: **Google-Klicks** (nicht Sitzungen), weil du Kosten je Klick bezahlst.

### 7.2 Das Raster

| Stufe | Kill (Annahme, wo nicht Review) | Beobachten | Go (Review) | Was es bedeutet |
|---|---|---|---|---|
| Klick → Dialog gestartet (`dialog_started`) | < 10 % | 10–20 % | **≥ 20 %** | Unter 10 %: Anzeige verspricht etwas, das die Seite nicht einlöst, oder die Seite lädt nicht / überzeugt in 5 Sekunden nicht (Persona-Test Review: „Wer ist wir?"). Zwischen 10 und 20: Seite ok, Keyword-Intent zu breit. |
| Dialog gestartet → Skizze erhalten (`result_delivered`) | < 30 % | 30–50 % | **≥ 50 %** | Unter 30 %: der Berater verliert Leute — zu viele Fragen, Freemail-Gate greift bei Betrieben, Antwortzeit. Diese Quote ist **kanalunabhängig**; sie zählt für jeden Traffic. |
| Skizze → Termin gebucht (`booked`) | < 3 % | 3–8 % | **≥ 8 %** | Unter 3 %: Richtpreis schreckt ab **oder** Skizze ist gut genug, dass man sie mitnimmt, ohne dich zu brauchen. Unterscheidung: `lead_email`-Ereignisse (Skizze per Mail angefordert, aber nicht gebucht) zählen. Viele Mails, keine Buchungen = Preis. |
| Gebucht → wahrgenommen | **< 40 %** (Review) | 40–60 % | **≥ 60 %** | Unter 40 %: „Kalt-Nachfrage ist Neugier, keine Kaufabsicht" (Review). |
| Kosten je gebuchtem Gespräch | **> 600 €** (Review) | 300–600 € | ≤ 300 € | Bei 2.750 € und 8 € CPC braucht 300 € **~9 Buchungen** = 2,7 % aller Klicks. Das schafft der Funnel nur, wenn alle drei oberen Quoten am oberen Rand liegen (20 % × 50 % × 8 % = 0,8 % → 3 Buchungen ≈ 900 €). Sei darauf gefasst, dass diese Zahl „Beobachten" oder „Kill" zeigt, und lies dann die oberen Stufen. |
| Kosten je **wahrgenommenem** Gespräch | **> 600 €** (Review, Kill) | 300–600 € | **≤ 300 €** (Review, Go) | Die Kanal-Entscheidung. |
| Gesprächsqualität | < 30 % nennen Budget ≥ 10k oder Entscheidungstermin ≤ 4 Wochen | — | **≥ 30 %** (Review goCriteria) | Bei 2–3 Gesprächen ist das eine Person. Zählt erst zusammen mit den Warm-Gesprächen (Review: ≥ 8 Erstgespräche, davon ≥ 3 mit Budgetfreigabe). |

Zusätzlich je Anzeigengruppe (Signal, nicht Urteil):

| Anzeigengruppe | Klicks | CPC | Klick→Dialog | Dialog→Skizze | Skizze→Buchung | Buchungen | Kosten/Buchung |
|---|---|---|---|---|---|---|---|
| A1 Individualsoftware | | | | | | | |
| A2 Kosten & Preis | | | | | | | |
| A3 Kundenportal & Web-App | | | | | | | |
| A4 Excel ablösen | | | | | | | |
| B1 Handel / WaWi | | | | | | | |
| B2 Anlagenbau / Prüfprotokoll | | | | | | | |

### 7.3 Ehrlichkeit bei kleinen Zahlen

- **Klick→Dialog** bei 300 Klicks: 20 % gemessen bedeutet ein 95-%-Intervall von grob 16–25 %. Das ist brauchbar. Diese Stufe kannst du je Anzeigengruppe lesen (ab ~40 Klicks je Gruppe, grob ±12 Punkte).
- **Dialog→Skizze** bei 60–90 Dialogen: ±10 Punkte. Brauchbar auf Gesamtebene, nicht je Gruppe.
- **Skizze→Buchung** bei 35–50 Skizzen: 8 % = 3–4 Buchungen. Eine Buchung mehr oder weniger sind 2–3 Prozentpunkte. Nur Gesamtebene; „Kill" nur bei **0 Buchungen aus ≥ 40 Skizzen**.
- **Show-Rate und Kosten je Gespräch** bei 3–5 Buchungen: eine Person entscheidet. Lies die Zahl, aber triff die Kanalentscheidung mit 7.4 — nicht mit der Zahl allein.
- Ein Ergebnis, das du nach 150 Klicks siehst, hältst du drei Tage lang für wahr. Dann sieh es dir bei 300 noch einmal an.

### 7.4 Entscheidung am Ende (Freitag Woche 4)

Ergebnis A — **Oberer Funnel Go, unterer Kill** (wahrscheinlichster Fall laut Review):
Klick→Dialog ≥ 20 %, Dialog→Skizze ≥ 50 %, Skizze→Buchung ≥ 8 %, aber Kosten je wahrgenommenem Gespräch > 600 €.
→ Ads **stoppen**. Seite und Berater sind bewiesen; das Budget fließt als Zeit in LinkedIn-Outbound und den Referenz-Sprint (Review: „Budget in Outbound-Zeit umwidmen"). Ads erst wieder anfassen, wenn zwei nennbare Referenzen auf der Seite stehen — dann steigt Angebot→Abschluss von 10–15 % auf 25–35 % (agentur-operator) und die CAC-Rechnung ändert sich. Die Keyword-Liste und Negativliste sind dann fertig.

Ergebnis B — **Alles Go** (≤ 300 € je wahrgenommenem Gespräch, Show ≥ 60 %):
→ Nur die Anzeigengruppen weiterlaufen lassen, die geliefert haben, mit 60–80 €/Tag. Ziel-CPA erst ab 30 Conversions. Zwei Gespräche pro Woche sind neben der Anstellung die Obergrenze (Review gruender-risiko: Kapazität) — mehr Budget bringt nichts, bevor du nicht liefern kannst.

Ergebnis C — **Beobachten** (300–600 € je Gespräch, Show 40–60 %):
→ Kampagne B (Nische) weiterführen, wenn sie besser war als A; Kampagne A stoppen. 40 €/Tag, weitere 4 Wochen, Entscheidung dann mit ~8 Buchungen kumuliert.

Ergebnis D — **Oberer Funnel Kill** (Klick→Dialog < 10 % über alle Gruppen, oder Dialog→Skizze < 30 %):
→ Ads stoppen, aber das ist keine Aussage über Nachfrage, sondern über die **Seite**. Persona-Tests aus dem Review (Thomas, 56: „Wer ist wir? Wie viele Leute? Wo sitzen die?") wiederholen, Seite überarbeiten, Test mit 500 € wiederholen. Das Problem betrifft auch jeden LinkedIn-Kontakt, der auf die Seite kommt.

Ergebnis E — **Keine Impressionen** (< 2.000 Impressionen nach Woche 1 trotz Gebot 12 €):
→ Es gibt die Suchnachfrage in dieser Formulierung nicht. Das ist ein echtes Ergebnis: Leute suchen nicht „Individualsoftware entwickeln lassen", sie suchen ihr Problem („angebot schreiben dauert ewig") oder gar nicht. Dann ist Outbound nicht Plan B, sondern der einzige Kanal.

### 7.5 Vorlage für das Ergebnis (nach Woche 4 hier eintragen)

```
Laufzeit: [Di TT.MM.] – [Fr TT.MM.]   Spend: [x.xxx] €   Klicks: [xxx]   Ø CPC: [x,xx] €   Impressionen: [x.xxx]
Sitzungen mit gclid: [xxx] ([xx] % der Klicks)
Dialog gestartet: [xx] ([xx] % der Klicks)      → Go/Beobachten/Kill
Skizze erhalten:  [xx] ([xx] % der Dialoge)     → Go/Beobachten/Kill
Termin gebucht:   [x]  ([x] % der Skizzen)      → Go/Beobachten/Kill
Wahrgenommen:     [x]  ([xx] % der Buchungen)   → Go/Beobachten/Kill
Kosten je Buchung: [xxx] €   Kosten je wahrgenommenem Gespräch: [xxx] €   → Go/Beobachten/Kill
Gespräche mit Budget ≥ 10k oder Termin ≤ 4 Wochen: [x] von [x]
Beste Anzeigengruppe: [..] (Klick→Dialog [xx] %, [x] Buchungen)   Schlechteste: [..]
Entscheidung (A–E): [..]   Begründung in zwei Sätzen: [..]
Was ich an der Seite ändere: [..]
```

---

## 8. Tägliche 10 Minuten (Checkliste zum Ausdrucken)

- [ ] Google Ads → Kampagnen: Ausgaben gestern ≤ 360 € (2× Tagesbudget)? Kumuliert im Plan (Fr W1 ≤ 800, Fr W2 ≤ 1.700, Fr W3 ≤ 3.000)?
- [ ] Suchbegriffe (gestern): jeden Begriff lesen. Kein Käufer → Negativliste. Neuer guter Begriff mit ≥ 2 Klicks → als Wortgruppen-Keyword in die passende Gruppe (nur Woche 1–2).
- [ ] Anzeigenstatus: alles „Zulässig"? Verifizierung durch?
- [ ] Admin → Quellen: Zeile „Google Ads" — Sitzungen gestern plausibel zu Klicks gestern?
- [ ] Neue Buchung? → Bestätigung persönlich, Sheet-Zeile anlegen, Kalender prüfen.
- [ ] Neue `lead_email` ohne Buchung? → Zählen (Signal für „Preis schreckt ab", 7.2).
- [ ] Di/Fr: Upload (5.3).

---

## 9. Was du nicht tun wirst

- Broad Match, Display, Suchpartner, Performance Max, „Ziel-CPA" mit < 30 Conversions, Remarketing (kein Tag, kein Consent).
- Die Anzeigentexte in Woche 1–3 umschreiben. Sie sind ohne „Team" und ohne Referenzen ehrlich; wenn sie nicht ziehen, ist das die Antwort, nicht ein Copy-Problem.
- Eine zweite Landingpage bauen. Der Test misst **die** Seite.
- Den Test verlängern, weil „gerade noch eine Buchung reinkam". 3 Wochen, dann Woche-4-Lesung, dann Entscheidung.
- Anrufen, wer die Skizze bekommen hat, aber nicht gebucht hat. Es gibt keine Telefonnummer, nur die Mail — und ungebetene Anrufe an Unternehmer sind ohne mutmaßliche Einwilligung ein UWG-Risiko (§ 7 Abs. 2 UWG). Eine Mail-Antwort auf die Skizzen-Mail ist zulässig, ein Verkaufsanruf nicht. *Vom Anwalt prüfen lassen.*
- Aus 2 Gesprächen eine Conversion-Rate machen und damit ein Jahr planen. Der Review sagt, was der Test kann: „Kill-/Go-Aussage zu den oberen Funnelstufen, nicht zum Abschluss."

---

## Anhang A — Zahlen aus dem Review, auf die sich dieses Dokument stützt

| Größe | Wert | Gutachter |
|---|---|---|
| Ads-Testbudget | 2.500–3.000 € über 3 Wochen, 15–25 Exact/Phrase-Keywords, DACH, Werktage, Desktop-Bias | growth-nachfrage, coreMeasures |
| CPC DACH B2B-Software-Dienstleistung | 5–12 € (growth), 4–10 € (vc-skeptiker), Rechenwert 8 € | growth-nachfrage, vc-skeptiker |
| Klick→Dialog / Dialog→Skizze / Skizze→Buchung / Buchung→Show | 15–25 % / 45–60 % / 6–12 % / 55–75 % | growth-nachfrage |
| Erwartung für den Test | 300–400 Klicks, 60–90 Dialoge, 35–50 Skizzen, 3–5 Buchungen, 2–3 Gespräche | growth-nachfrage |
| Go-Kriterien Ads | Klick→Dialog ≥ 20 %, Dialog→Skizze ≥ 50 %, Skizze→Buchung ≥ 8 %, Show ≥ 60 %, ≤ 300 € je wahrgenommenem Gespräch | growth-nachfrage, goCriteria |
| Kill-Kriterien Ads | nach 2.500 € Spend > 600 € je gebuchtem Gespräch ODER Show < 40 % | growth-nachfrage, killCriteria |
| Regel | keine Änderungen vor 150 Klicks; Kill-/Go-Lesung bei ~300 Klicks | growth-nachfrage, firstThirtyDays |
| CAC Paid ohne Referenzen | 6.000–8.000 € = 45–60 % des Tickets → „wirtschaftlich tot, nur Messinstrument" | growth-nachfrage, unitEconomics |
| CAC Paid (zweite Rechnung) | ~250–300 Klicks je Auftrag ≈ 2.000 € Media + 2.000 € Vertriebszeit | vc-skeptiker, unitEconomics |
| Angebot→Abschluss ohne / mit 2 Referenzen | 10–15 % / 25–35 % | agentur-operator |
| Gesprächsqualität Go | ≥ 30 % nennen unaufgefordert Budget ≥ 10k oder Entscheidungstermin ≤ 4 Wochen | growth-nachfrage, goCriteria |
| Messlücke | FUNNEL_STEPS endet bei `booked`; Show/Angebot/Abschluss fehlen | growth-nachfrage, realConstraint |

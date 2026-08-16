# Die 2+AI-Methode — Referenz

> Stand: August 2026. Verbindliche Fassung der Methode — der Maßstab, gegen den
> jede Textfassung, Grafik und Slide geprüft wird. Ergebnis der Methodik-Arbeit
> auf dem Branch `claude/2-plus-ai-methode-j6klzg` (Entwurfsbretter I–III).
> Die Verkaufspsychologie dazu steht in [`VERKAUFSSYSTEM.md`](./VERKAUFSSYSTEM.md).

---

## 1. Der Kern in einem Satz

> **Der kürzeste Weg von der Idee zur Gewissheit: drei Fragen, die sonst drei
> Abteilungen gehören, in einem Kopf, der dafür geradesteht — geprüft am
> laufenden Produkt, nicht am Board. In Runden von einem Tag.**

- **Kurzform:** Drei Fragen. Ein Kopf. Eine Runde pro Tag.
- **Leitsatz 1:** Kurze Schleifen am laufenden System schlagen Spezifikation.
- **Leitsatz 2:** Validiert wird am Produkt, nicht am Board.

## 2. Die Formel — wer die 2 sind

```
Sie  +  Einer, der baut  +  AI   =   4 Wochen live
```

| Glied | Beitrag |
|---|---|
| **Sie** | Kennen den Ablauf, entscheiden. Kein Lastenheft, kein Umweg über eine Projektleitung. |
| **Der, der baut** | Businessverständnis und Code in einem Kopf — plus der Blick aus vielen Produkten dafür, was benutzt wird. |
| **AI** | Hundert Hände: tippt, testet, wiederholt. Schreibt schnell — entscheidet nichts. |

**Die wichtigste Pointe des Namens:** Die 2 sind nicht zwei Entwickler.
Der Kunde ist einer der beiden — er steht in der Produktionsformel, nicht am
Ende einer Auftragskette. Dieser Satz muss überall dort stehen, wo der Name
zum ersten Mal fällt.

## 3. Das Problem, das sie löst

Der Verlust im klassischen Projekt ist **strukturell**, nicht personell:

1. **Es ist keine Kette, es ist ein Stern.** Fast niemand spricht mit fast
   niemandem; alles läuft über eine Nabe (Projektleitung) — die einzige
   Person, die mit allen spricht, versteht weder den Betrieb noch den Code
   ganz. Die Gespräche Fachbereich↔Entwickler finden nie statt.
2. **Die Mitte ist leer.** Für die Entscheidung, *was* gebaut wird, müssen
   drei Wissensfelder gleichzeitig in einem Kopf sein: was der Betrieb
   wirklich tut, was technisch geht, was Menschen wirklich benutzen.
   Klassisch sind das drei Silos in drei Kalendern — die Zusammenschau
   existiert zwei Stunden alle drei Wochen und hinterlässt ein Protokoll.
3. **Wenn eine Antwort neun Tage kostet, wird geraten.** Beim Bauen tauchen
   dauernd Detailfragen auf. Muss die Antwort durch vier Stationen, ist die
   Annahme immer billiger als die Frage — nicht aus Nachlässigkeit, sondern
   weil sonst das Projekt steht. An diesen Stellen hört das Produkt auf, der
   Ablauf des Kunden zu sein, und wird jemandes Vermutung darüber.
4. **Gesprochen wird über Stellvertreter.** Backlog, Ticket, Wireframe,
   Statusfolie — über das Produkt selbst wird erst gesprochen, wenn es
   fertig ist. Am Reißbrett klingt sechs Monate lang alles plausibel; am
   laufenden System merkt man in zehn Minuten, was fehlt.

## 4. Der Mechanismus — die Runde

Jedes Projekt dreht dieselbe Runde: **Idee → Umsetzung → Prüfung.** Der
Unterschied ist, *worum* sie sich dreht und *wie lang* sie dauert:

- **Klassisch** kreist die Idee ums Board (Ticket → Priorisierung →
  Spezifikation → Sprint → Review). Eine Runde ≈ 3 Wochen; das Produkt wird
  einmal pro Zyklus berührt.
- **2+AI** kreist ums laufende Produkt (Idee → gebaut → am Produkt geprüft).
  Eine Runde ≈ 1 Tag, weil AI das Bau-Segment von Wochen auf Stunden
  verkürzt. Ideation, Tests und Änderungen sind Stationen **auf** diesem
  Kreis — nicht in einem Backlog daneben.

**Qualität ist Rundenzahl:** Gut wird ein Produkt durch geprüfte Runden vor
dem Go-live. Schema: ≈ 8 Runden in 6 Monaten gegen ≈ 20 Runden in 4 Wochen —
jede davon am laufenden Produkt statt am Papier.

## 5. Das Wer — drei Fragen, einer steht gerade

Jede gute Produktentscheidung ist ein **Tauschgeschäft** zwischen drei Fragen:

1. Was hilft dem Geschäft wirklich?
2. Was geht technisch — und hält?
3. Womit arbeiten Menschen gern?

„Wenn wir auf die Sonderfälle verzichten, reicht die halbe Maske — und der
Vertrieb spart trotzdem seine Stunde pro Tag": Diesen Satz kann nur jemand
sagen, der alle drei Fragen gleichzeitig im Kopf hat. Klassisch hat jede
Frage einen eigenen Besitzer (Fachbereich, Dienstleister, Design), und wenn
es schiefgeht, hat jeder seinen Teil richtig gemacht — nur das Produkt nicht.

**„Dafür geradestehen" ist Mechanik, nicht Haltung:** Besteht die Abnahme
nicht, entfällt die zweite Hälfte des Festpreises. Der Festpreis dreht
zugleich den Beratungsanreiz um — Unnötiges zu bauen kostet uns, nicht den
Kunden. Deshalb ist auch das Nein Teil der Leistung.

## 6. Die Folgen

- **Maßarbeit:** Zwischen Anforderung und Code liegt keine Übersetzung —
  Ergebnis ist „das, was Sie gemeint haben", nicht „ungefähr das, was mal
  besprochen wurde".
- **Tempo:** 4 Wochen bis zur Abnahme — Folge der Struktur, nicht ihr Zweck.
- **Danach:** Eine Änderung ist ein Anruf und meist ein Tag, kein Ticket und
  drei Wochen — der Kopf, der gebaut hat, muss sich nicht neu eindenken.
- **Die Schwelle sinkt:** Ab 9.500 € Festpreis lohnt Software schon für das
  Problem, das zwei Stunden pro Woche kostet — eine Klasse von Problemen,
  für die es nie ein klassisches Projekt gegeben hätte.

## 7. Warum das stimmt — Evidenz

| Behauptung | Beleg |
|---|---|
| Übergaben verlieren Information | Boehm (Fehlerkosten steigen je Phase); Brooks (Kommunikationsaufwand ~ n²); Conway's Law; DDD/„ubiquitous language" |
| Kurze Schleifen am laufenden System schlagen Spezifikation | Agile-Manifest („working software over documentation"); DORA-Forschung: kleine Änderungspakete + kurze Durchlaufzeiten korrelieren mit *besserer* Qualität |
| Das meiste Gebaute wird nicht benutzt | Pendo 2019 (~80 % der Features selten/nie genutzt); Standish (ältere Daten, gleiche Richtung) |
| Eigener Beleg | 32 h → 6 h Reporting: entstanden, weil einer den Prozess kannte *und* das Werkzeug baute |

Rundenzahlen und „neun Tage" sind **Schema, keine Messung** — auf der Seite
immer so markieren oder durch eigene Projektwerte ersetzen (Regel der Seite:
nur Belegbares).

## 8. Die ehrlichen Bedingungen

Der Vorteil ist real — als **bedingter Struktureffekt**, nicht als Magie:

1. **Die Person:** Die Struktur vermeidet Verluste, erzeugt aber keine
   Kompetenz. Ein starkes Spezialistenteam schlägt einen mittelmäßigen
   Generalisten. Vergleichsmaßstab ist das typische Mittelstandsprojekt.
2. **Die Größe:** Stärke ist das fokussierte Werkzeug. Keine ERP-Ablösungen,
   keine Plattformen mit zwanzig parallelen Entwicklern.
3. **Der Kunde muss am Tisch sitzen:** Die 2 funktioniert nur, wenn der
   Entscheider selbst antwortet. Schickt er einen Stellvertreter, ist die
   Telefonkette zurück — auf seiner Seite des Tischs.
4. **Ein Kopf hat einen blinden Fleck:** Kein zweites Augenpaar. Abgefedert
   durch Abnahmekriterien, Tests, Standard-Stack, Code-Eigentum des Kunden.

**Der Graben:** Agenturen können das Modell nicht kopieren, ohne ihr
Geschäftsmodell zu kannibalisieren — Tagessätze mal Köpfe *ist* die Kette.
Der Vorteil ist weniger „nur wir können das" als „die anderen dürfen es nicht".

## 9. Sprachregelungen

| Ort | Formulierung |
|---|---|
| Überschrift Methode-Sektion | „Der kürzeste Weg von der Idee zur Gewissheit." |
| Leitsatz (wiederholbar) | „Validiert wird am Produkt, nicht am Board." |
| Kurzform | „Drei Fragen. Ein Kopf. Eine Runde pro Tag." |
| Lead-Absatz | „Drei Fragen entscheiden über jede Software: Was hilft dem Geschäft wirklich? Was geht technisch — und hält? Womit arbeiten Menschen gern? Klassisch beantwortet jede Frage eine andere Abteilung, und die Antworten treffen sich in Meetings und Boards. Hier treffen sie sich in einem Kopf — und jede Annahme wird am laufenden Produkt geprüft, in Runden von einem Tag statt drei Wochen. Mit AI gebaut. Von einem verantwortet." |
| Einwände/FAQ | „Im klassischen Projekt haben am Ende alle ihren Teil richtig gemacht — und das Produkt ist trotzdem falsch. Dieses Trotzdem schaffen wir ab: Einer baut, einer steht gerade." |
| Unter der Runden-Grafik | „Am Reißbrett klingt sechs Monate lang alles plausibel. Am laufenden Produkt merken Sie in zehn Minuten, was fehlt." |
| Namens-Auflösung | „Die zwei sind nicht zwei Entwickler. Sie sind einer davon." |

## 10. Darstellung — die zwei Bilder

Die Methode-Sektion trägt **zwei** Grafiken (nicht fünf):

1. **Die Runde** (das Wie): zwei Kreisläufe — großer Kreis ums Board-Icon
   (6 Stationen, „1 Runde ≈ 3 Wochen") gegen kleinen Kreis ums Produkt-Icon
   (3 Stationen, „1 Runde ≈ 1 Tag"). Der Umfang des Kreises *ist* die
   Rundenzeit. Darunter Rundenzähler (8 vs. 20, als Schema markiert).
2. **Drei Fragen, ein Kopf** (das Wer): Panel statt Diagramm. Links die drei
   Fragen mit Besitzer-Chips und der „jeder hat seinen Teil richtig
   gemacht"-Fußzeile; rechts dieselben Fragen ohne Chips, ein Kopf,
   Abnahme-Mechanik als Beleg.

**Nebenbilder** (Vertiefung, Slides, „Und danach?"): Stille Post (beste
Einzel-Slide vor Publikum), Stern statt Kette, Lebenslinie (Tempo +
Änderungskosten), Schwelle (Wirtschaftlichkeit ab 2 h/Woche),
Definitionszeile (wer die 2 sind). Dreier-Serie für Termine:
Stille Post → Die Runde → Die Schwelle.

## 11. Aufbau der Methode-Sektion

1. Kicker „Die 2+AI-Methode" + H2 „Der kürzeste Weg von der Idee zur
   Gewissheit" + Lead-Absatz
2. Definitionszeile: wer die 2 sind
3. Hauptgrafik: die Runde
4. Panel: drei Fragen, ein Kopf
5. Anschluss: Zeitplan („Start: nächster Montag"); die Schwelle bleibt im
   Abschnitt „Und danach?"

## 12. Offene Bausteine

- [ ] Namens-Auflösung fehlt auf `/v/fixfertig` — die Definitionszeile muss
      vor die erste Grafik.
- [ ] Die dritte Frage (Bedienbarkeit/UX) steht bisher nirgends auf der Seite.
- [ ] **„Was wir von Ihnen brauchen"** als eigener Baustein: die Mitwirkung
      des Entscheiders (≈ eine Stunde pro Woche, und zwar seine) als ehrliche
      Voraussetzung — qualifiziert zugleich die richtigen Kunden.
- [ ] Schema-Zahlen (Runden, neun Tage) markieren oder durch eigene
      Projektwerte ersetzen.
- [ ] Präzise Preise statt runder („9.800" statt „ab 9.500") — offener Punkt
      aus `VERKAUFSSYSTEM.md` P1/#3.

# vierwochen.de — Build-Brief

> Status: Entwurf zur Abstimmung. Offene Entscheidungen stehen in Abschnitt 9.
> Dieses Dokument ist der Auftrag, mit dem der Bau gestartet wird — es ersetzt den Chat-Prompt.

## 1. Ziel

Eine Website, die aus einem anonymen Besucher in einer Sitzung einen gebuchten Termin macht.
Kein Kontaktformular-Friedhof, sondern ein geführter Dialog, an dessen Ende drei Dinge stehen:
eine **unverbindliche Preisspanne**, eine **Terminschiene über vier Wochen** und ein **gebuchter Slot**.

Anspruch an die Umsetzung: Die Seite selbst ist das Verkaufsargument. Wer sie benutzt, hat das
Produkt bereits erlebt — schnelle, saubere, KI-gestützte Software. Wenn der Funnel sich zäh
anfühlt, widerlegt die Seite ihre eigene Botschaft.

## 2. Marke und Kernbotschaft

- **Marke:** vierwochen — *In vier Wochen zum Ziel.*
- **Zielkunde:** inhabergeführte Unternehmen, ca. 20–500 Mitarbeitende, DACH. Entscheider ist die
  Geschäftsführung oder ein Bereichsleiter, nicht die IT-Abteilung.
- **Versprechen (das Leistungsschild, überall konsistent):**
  - 4 Wochen vom Auftrag bis zur Abnahme
  - Festpreis, vor dem ersten Handgriff vereinbart
  - Volles Eigentum: Code, Daten, Zugänge gehören dem Kunden
  - 12 Monate Gewährleistung auf das Gewerk
  - Betrieb optional ab 990 €/Monat, monatlich kündbar
- **Warum es geht (muss durchgehend sichtbar sein):** agentisches Coding. Das Tempo ist kein
  Versprechen, sondern eine Methode — Bau, Test und Integration laufen KI-gestützt.
- **Ton:** nüchtern-direkt, konkret, evidenzgeführt. Keine Beratersprache, keine Superlative ohne
  Zahl, keine Floskeln. Vergleiche `career/style.md`.

## 3. Seitenaufbau

1. **Hero** — Das Vier-Wochen-Versprechen groß, als bemaßte Strecke lesbar. Direkt darunter der
   Einstieg in den Projekt-Dialog (ein einziges Eingabefeld, kein Formular).
2. **Wie das geht** — agentisches Coding als Methode erklärt, in drei Sätzen, ohne Werkzeug-Namedropping.
3. **Der Weg** — die vier Wochen als Zeitschiene: Gespräch → Festangebot → Bau → Abnahme.
4. **Showcases** — anonymisierte Fälle (Inhalte liefert Moritz, siehe 8).
5. **Leistungsschild und Preise** — öffentlich, tabellarisch, ohne "auf Anfrage".
6. **Manifest** — die fünf harten Zusagen.
7. **Wer baut** — Person, Belege, ehrliche Grenzen.
8. **Abschluss** — erneuter Einstieg in den Dialog.

## 4. Herzstück: der Projekt-Dialog

### 4.1 Ablauf

1. **Einstieg:** Ein Feld, ein Satz Aufforderung — „Beschreiben Sie den Ablauf, der Sie am meisten
   Zeit kostet." Nach Absenden öffnet sich der Dialog als ruhige Ebene über der Seite.
2. **Rückfragen:** maximal 4–6, adaptiv. Wer knapp antwortet, wird schneller durchgelassen; wer
   ausführlich schreibt, bekommt tiefere Fragen. Ziel der Fragen ist die Klassifikation (siehe 5),
   nicht Neugier: Prozess, Beteiligte, Systeme, Datenlage, Häufigkeit, Zielbild.
3. **Lösungsskizze (das visuelle Element):** Parallel zum Gespräch baut sich rechts bzw. oberhalb
   eine Skizze auf, die mit jeder Antwort wächst — Prozessschritte, beteiligte Rollen, Systeme,
   Datenquellen, markierter Automatisierungsgrad. Kein Text-Log, sondern ein sichtbar
   entstehendes Bild der Lösung. Technisch: Das Modell liefert bei jedem Zug strukturiertes JSON,
   das die Skizze rendert.
4. **Abschluss:** Das Modell erklärt, dass es genug weiß, und zeigt: Preisspanne, Vier-Wochen-Schiene,
   Umfang, offene Punkte, Annahmen.
5. **E-Mail-Gate:** Die Auswertung gibt es gegen eine geschäftliche E-Mail-Adresse. Freemail-Adressen
   werden freundlich abgewiesen. Das Gate steht **hinter** dem Wert, nicht davor.
6. **Terminbuchung:** direkt im Dialog gebaut, kein fremdes Buchungsfenster. Auswahl zwischen
   Videocall und Telefon, echte freie Slots aus dem Kalender, Bestätigung per Kalendereinladung.
   Freie Zeiten kommen live aus der Google-Calendar-Schnittstelle (Freebusy); beim Buchen wird ein
   Termin angelegt, bei Videocall mit automatisch erzeugtem Meet-Link, bei Telefon mit der
   Rufnummer des Interessenten im Termin. Zwingend zu beherrschen: Zeitzonen, Doppelbuchung bei
   gleichzeitigen Zugriffen, Puffer zwischen Terminen, Vorlaufzeit, Absage- und Verschiebe-Link.

### 4.2 Qualitätsanspruch

Bewegung dient der Verständlichkeit, nicht der Show: Der Aufbau der Skizze darf sichtbar sein,
Antworten streamen, Zustandswechsel sind weich. `prefers-reduced-motion` wird respektiert.
Vollständig bedienbar per Tastatur, mobil gleichwertig, Ladezeit unter zwei Sekunden.

## 5. Preislogik — regelbasiert, nicht geraten

Die KI erfindet **keine** Preise. Sie klassifiziert den Fall entlang fester Merkmale
(Prozessanzahl, Nutzerzahl, Systemanbindungen, Datenqualität, Regulatorik, Migrationsbedarf) und
wählt daraus eine hinterlegte Preisspanne. Die Spannen liegen in einer Konfigurationsdatei, die
Moritz jederzeit ändert, ohne dass Code angefasst wird.

Startraster (von Moritz zu bestätigen):

| Kategorie | Spanne | Merkmale |
|---|---|---|
| Werkstück | 2.500 € | Ein Prototyp, keine Integration, wird verrechnet |
| Pilot | 9.800–14.000 € | Ein Prozess, produktiv, höchstens eine Anbindung |
| Ausbaustufe | 15.000–40.000 € | Mehrere Prozesse, ERP-/DMS-Anbindung, Rollen und Rechte |
| Sonderfall | Gespräch | Regulatorik, Migration von Altsystemen, unklare Datenlage |

Jede Ausgabe trägt sichtbar: **unverbindliche Ersteinschätzung, kein Angebot.** Grundlage sind die
Angaben des Nutzers; ein verbindliches Festangebot entsteht erst nach dem Gespräch.

## 6. Technik (entschieden)

Alles in **Google Cloud**, Region **europe-west3 (Frankfurt)**, damit Verarbeitung und Speicherung
in der EU bleiben.

| Baustein | Entscheidung |
|---|---|
| Anwendung | Next.js (App Router) im Container auf **Cloud Run**, skaliert auf null |
| Datenhaltung | **Firestore** (Native Mode, europe-west3): Dialoge, Klassifikationen, Leads, Buchungen |
| Modell | **Gemini über Vertex AI**, EU-Region — nicht über einen AI-Studio-Key |
| Authentifizierung zum Modell | **Dienstkonto der Cloud-Run-Instanz. Kein API-Schlüssel nötig.** |
| Terminbuchung | Eigenbau gegen die **Google-Calendar-API** (Freebusy lesen, Termin mit Meet-Link anlegen) |
| Geheimnisse | **Secret Manager**, niemals im Repository, niemals im Chat |
| Auslieferung | GitHub-Repository → **Cloud-Build-Trigger** → automatischer Deploy bei jedem Push |
| Missbrauchsschutz | Rate Limit pro IP und Sitzung, Token-Obergrenze je Dialog, Bot-Prüfung **vor** dem Modellaufruf |
| Kostenbremse | Hartes Limit pro Sitzung und pro Tag, Abschaltschwelle, Budget-Alarm im Projekt |
| Messung | Einstieg, Abbruch je Frage, E-Mail-Gate, Buchung — datenschutzkonform, ohne Fremd-Tracker |

**Warum Vertex AI und nicht ein Gemini-Schlüssel:** Auf Cloud Run authentifiziert sich die
Anwendung über ihr Dienstkonto. Es existiert damit kein Schlüssel, der geleakt werden könnte, und
die Datenverarbeitung läuft unter den Google-Cloud-Bedingungen inklusive Auftragsverarbeitung in
der EU-Region.

## 7. Recht und Daten

- **Impressum, Datenschutzerklärung, AGB** mit Haftungsbegrenzung und der Regelung zur
  Vier-Wochen-Zusage. Vor Veröffentlichung anwaltlich prüfen lassen.
- **DSGVO:** Auftragsverarbeitungsvertrag mit dem Modellanbieter, EU-Region, Löschfristen für
  Dialogverläufe, Hinweis im Dialog, dass ein KI-System antwortet und was gespeichert wird.
- **Wettbewerbsrecht:** Preisangaben netto und als unverbindlich kennzeichnen; die
  Vier-Wochen-Zusage nur mit den Bedingungen aus den AGB bewerben.
- **Voraussetzung für den Livegang:** Gewerbeanmeldung und Nebentätigkeitsgenehmigung. Bis dahin
  läuft die Seite ausschließlich passwortgeschützt als Vorschau.

## 8. Was Moritz liefern muss

**Inhalte**
- 3–5 Showcases: Ausgangslage, Lösung, Ergebnis, Dauer. Fälle aus dem aktuellen Arbeitsverhältnis
  nur als anonymisierte Beschreibung des Musters — keine Screenshots, keine Oberflächen, keine
  echten Daten. Eigene Projekte dürfen vollständig gezeigt werden.
- Bestätigung der Preisspannen aus Abschnitt 5.
- Kontaktdaten, Impressumsangaben, gewünschte Gesprächslängen.

**Einrichtung in Google Cloud** (macht Moritz selbst, einmalig, ca. 30–45 Minuten)

1. Projekt anlegen, Abrechnung aktivieren, **Budget-Alarm setzen** (z. B. 50 € pro Monat).
2. Schnittstellen aktivieren: Cloud Run, Cloud Build, Artifact Registry, Firestore, Vertex AI,
   Google Calendar API, Secret Manager.
3. Firestore-Datenbank in **europe-west3**, Native Mode.
4. Dienstkonto für die Anwendung anlegen; Rollen: Vertex AI User, Firestore User, Secret Accessor.
5. GitHub-Repository mit Cloud Build verbinden (Trigger auf den Branch), damit jeder Push deployt.
6. Kalender für Buchungen festlegen und der Anwendung einmalig Zugriff erteilen.
7. Vertex-AI-Kontingent prüfen und ein Tageslimit setzen.

**Was Moritz mir als Text nennt** (alles unkritisch, keine Geheimnisse):
Projekt-ID, Region, Kalenderadresse für Termine, gewünschte Gesprächsdauer und Vorlaufzeit,
Arbeitszeiten für buchbare Slots.

**Was Moritz mir niemals schickt:** Dienstkonto-Schlüssel, API-Schlüssel, Passwörter.
Alles Geheime setzt er selbst im Secret Manager.

**Weiterhin von ihm nötig**
- Domain `vierwochen.de` bei einem deutschen Registrar registrieren.
- Absenderdomäne für Bestätigungs-E-Mails verifizieren.

## 9. Entschiedene Punkte

1. **Modell:** Gemini, über Vertex AI in der EU-Region.
2. **Hosting:** Google Cloud — Cloud Run und Firestore.
3. **Terminbuchung:** Eigenbau im Dialog, gegen die Google-Calendar-API.
4. **Erster Durchlauf:** komplett, mit echtem Dialog, Auslieferung als passwortgeschützte Vorschau.

## 10. Abnahmekriterien

Der Bau gilt als fertig, wenn ein fremder Besucher ohne Anleitung: einen Fall beschreiben, den
Dialog führen, die Skizze entstehen sehen, eine plausible Preisspanne samt Zeitschiene erhalten,
seine Geschäfts-E-Mail hinterlassen und einen Termin buchen kann — auf dem Telefon genauso wie am
Rechner, in hellem und dunklem Erscheinungsbild, ohne dass ein einziger Schlüssel im Code steht.

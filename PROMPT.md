# OpsDone — Bauauftrag für die Website

Dieser Prompt beschreibt den aktuellen Produkt- und Inhaltsrahmen für die Hauptoberfläche. Er ersetzt die frühere Vierwochen-Positionierung. Die technische Basis bleibt bestehen: Next.js auf Cloud Run, Firestore, Gemini über Vertex AI und Google Calendar.

## 1. Marke und Ziel

- Marke: **OpsDone**
- Descriptor: **AI-native Process Automation**
- Claim: **Work eliminated.**
- Sprache zum Start: Deutsch, sachlich und konkret.
- Zielkunde: operative Entscheider in dokumentenintensiven Industrie- und B2B-Mittelständlern. Der erste empfohlene Keil sind Lieferanten-Auftragsbestätigungen.
- Produkt: Managed Automation. OpsDone baut, betreibt und verbessert einen klar abgegrenzten Prozess. Standardfälle laufen automatisch; Menschen bearbeiten Ausnahmen und Entscheidungen.

Die Seite darf keine Kunden, Logos, Domains, Zertifizierungen, Garantien, rechtlichen Tatsachen oder Leistungswerte erfinden. Belegte persönliche Erfahrung darf anonymisiert und als solche gekennzeichnet werden. Preisangaben sind interne Hypothesen, bis sie aus Gesprächen und Angeboten bestätigt sind.

## 2. Hauptseite

Die Startseite führt zu genau einem nächsten Schritt: **Prozess prüfen**. Der primäre Funnel ist der direkte Prozess-Check unter `/prozess-check`; der vorhandene KI-Chat bleibt technische Reserve/sekundärer Pfad, bis er bewusst entfernt oder neu positioniert wird. Die Seite erklärt in dieser Reihenfolge:

1. Welche wiederkehrende Arbeit OpsDone übernimmt.
2. Warum bestehende E-Mail-, PDF-, Excel-, ERP- und CRM-Systeme bleiben können.
3. Den empfohlenen Einstieg Auftragsbestätigungen.
4. Vier weitere Use Cases als konkrete Beispiele.
5. Den Ablauf vom Discovery-Gespräch bis zum Pilotbetrieb.
6. Die Messung: `Work eliminated` = vorherige manuelle Zeit minus verbleibende Ausnahmezeit, jeweils mit dokumentierten Annahmen.
7. Ehrliche Grenzen, offene Betreiberangaben und den Termin-/Anfrage-Funnel.

Der Prozess-Check fragt Name, Geschäftsadresse, Unternehmen, Prozess, grobes Volumen und optionale Ergänzungen ab. Er akzeptiert kurze Antworten, validiert Eingaben, speichert den Lead kontrolliert und zeigt eine klare Zustellung bzw. einen Fallback. Keine Zusage einer bestimmten Automatisierungsquote, Frist oder Ersparnis ohne Messbasis. Der bestehende KI-Dialog darf nicht als notwendiger Einstieg vorausgesetzt werden.

## 3. Die fünf Start-Use-Cases

1. **Lieferanten-Auftragsbestätigungen (empfohlener Wedge):** E-Mail/PDF erfassen, Positionen gegen Bestellung/ERP vergleichen, Abweichungen markieren, Standardfälle zur Prüfung oder Verbuchung weitergeben.
2. **RFQ- und Angebotsvorbereitung:** Anforderungen aus E-Mail, PDF und Excel strukturieren, fehlende Angaben markieren, vorhandene Produkt-/Preisdaten zusammenstellen, Entwurf vorbereiten.
3. **Reklamationen und 8D-Vorbereitung:** Eingang klassifizieren, Informationen und ähnliche Fälle sammeln, Maßnahmen-/Antwortentwurf vorbereiten; Freigabe bleibt beim Fachteam.
4. **Management-Reporting:** Exporte einsammeln, Zahlen prüfen, Abweichungen sichtbar machen und einen wiederholbaren Report-Entwurf erzeugen.
5. **Lieferanten-Onboarding:** Formulare/Zertifikate erfassen, fehlende Informationen erkennen, Stammdaten für eine Freigabe vorbereiten.

Jeder Use Case ist ein Gesprächseinstieg, kein bestehendes Produkt und keine Referenz. Validiert werden Volumen, Zeit je Vorgang, Ausnahmequote, Systeme, Freigaben, Datenzugang und messbarer Output.

## 4. Angebot und Pilot

Der Pilot enthält nur einen Prozess, definierte Inputs, Outputs, Integrationen und Abnahmekriterien. Die interne Preisannahme liegt bei **5.000–30.000 € Implementierung netto**, abhängig von Umfang und Integrationsrisiko; monatlicher Betrieb wird separat und scoped kalkuliert. Diese Zahlen werden im Erstgespräch nicht als Markt- oder Erfolgsgarantie dargestellt.

Die schriftliche Abnahme zählt maximal zehn messbare Kriterien. Alles außerhalb der Version 1 kommt auf eine Später-Liste. Datenschutz, Auftragsverarbeitung, Haftung, Gewährleistung, Rechte und Betreiberangaben werden vor Vertragsabschluss fachlich geprüft.

## 5. Gestaltung und Ton

Klar, ruhig, hochwertig, mobil gleichwertig, mit ausreichendem Kontrast und sichtbarem Fokus. Keine künstliche Knappheit, keine erfundenen Belege, keine Buzzword-Kaskaden. Schreibe über Arbeit, Durchlauf und Ausnahmen; die eingesetzte Modell- oder Workflow-Technik bleibt zweitrangig.

## 6. Infrastrukturregeln

Bestehende API-Routen und Adapter wiederverwenden. Keine API-Schlüssel einführen. Vertex über die Dienstkonto-Identität, Firestore für Persistenz und Limits, Calendar optional mit Anfrage-Fallback. Änderungen an Cloud Run/Cloud Build bleiben klein und nachvollziehbar. Vor Livegang gilt [`docs/launch/00-START-HIER.md`](./docs/launch/00-START-HIER.md).

## 7. Definition of Done

- OpsDone-Brand und die fünf Use Cases sind konsistent.
- Wedge und Discovery-CTA funktionieren auf Mobilgerät und Desktop.
- Work Eliminated wird als dokumentierte Schätzung mit Annahmen erklärt.
- Scope- und Abnahmevorlage ist verlinkt oder intern nutzbar.
- Impressum/Datenschutz/AGB enthalten keine Platzhalter mehr, bevor öffentlich live geschaltet wird.
- Backend-Fallbacks, Rate-Limits, `/api/health`, Prozess-Check, Lead und Buchung werden per Smoke-Test geprüft.
- `npm run build` und `npx tsc --noEmit` laufen erfolgreich; Änderungen am Script-Set werden in README dokumentiert.

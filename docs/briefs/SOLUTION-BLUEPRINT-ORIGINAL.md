keinen Chat-Funnel bauen, sondern einen 60–90-Sekunden-„Solution Blueprint Generator“. Der Chat ist nur die Eingabelogik. Das eigentliche Produkt im Funnel ist das Ergebnis.
Der Nutzer soll am Ende nicht denken:
„Netter KI-Chat.“

Sondern:
„Fuck. Genau diese Software brauche ich.“

Mein ideales Funnel-Erlebnis
1. Einstieg: „Welche wiederkehrende Arbeit kostet Ihr Team am meisten Zeit?“ Freitext plus 3–4 Beispiel-Prompts. Der Nutzer beschreibt den Prozess ganz normal.
2. AI versteht und spiegelt kurz zurück: Nicht zehn Zeilen. Eher: „Verstanden: Ihr Team prüft eingehende Auftragsbestätigungen gegen Bestellungen, klärt Abweichungen und überträgt das Ergebnis anschließend ins ERP.“
3. Maximal 2–3 adaptive Rückfragen. Nur Dinge, die für ROI und Lösung wirklich entscheidend sind. Typischerweise: Häufigkeit/Volumen, heutiger Aufwand pro Vorgang, beteiligte Systeme. Antwort möglichst über schöne Chips/Slider statt Tipparbeit. Beispiel: „Wie oft passiert das?“ → 10/Woche 50/Woche 200+/Woche Anders.
4. Danach wechselt die gesamte UI aus dem Chat heraus. Nicht einfach eine weitere Chat-Nachricht. Es erscheint ein hochwertiges Ergebnis-Dashboard:
   „Your OpsDone Blueprint“.
5. Dort sieht der Nutzer gleichzeitig seine zukünftige Anwendung, den neuen Prozess und den wirtschaftlichen Case.
6. CTA direkt im Ergebnis: „Diese Lösung gemeinsam konkretisieren“ → Kalender öffnet sich inline. Kein externer Calendly-Sprung, wenn vermeidbar.
Der eigentliche Wow-Moment: „Your App“
Das würde ich zum größten visuellen Element machen.
Zum Beispiel:
Your App
Supplier Confirmation Control
Custom AI-native Process Software

Daneben oder darunter ein echter Mini-App-Mockup.
Nicht irgendein generisches Dashboard. Sondern passend zum beschriebenen Prozess automatisch zusammengesetzt.
Bei Auftragsbestätigungen könnte man sehen:
Inbox / Vorgänge
Supplier	PO	Price	Quantity	Delivery	Status
Bosch	4711	✓	✓	✓	Auto-approved
ABC GmbH	4812	⚠ +4.2%	✓	⚠ +5d	Review


Rechts daneben:
2 exceptions need your decision

Mit Button:
Approve / Request clarification
Damit begreift der Kunde in drei Sekunden:
„Ah. Die bauen mir tatsächlich mein eigenes System dafür.“

Das ist für mich sehr wichtig.
Den Mockup würde ich nicht als Bild generieren
Technisch würde ich dafür eine eigene UI-Komponentenbibliothek bauen.
Der AI-Chat erzeugt nach der Analyse strukturiert:
Process type
Required views
Data objects
Actions
Approvals
Inputs
Outputs
Integrations
KPIs
Und dein Frontend kombiniert daraus immer hochwertige Komponenten:
Task Queue
Document Viewer
Approval Panel
Comparison Table
KPI Cards
Timeline
Audit Trail
Output Preview
etc.
Damit sieht jeder Entwurf anders aus, aber immer wie OpsDone.
Das ist viel besser als ein LLM jedes Mal eine wilde Benutzeroberfläche erfinden zu lassen.
Dann direkt daneben: „Today → With OpsDone“
Hier würde ich deine Zweiteilung wieder aufgreifen.
TODAY
E-Mail
↓
PDF öffnen
↓
Bestellung suchen
↓
Werte vergleichen
↓
Abweichungen markieren
↓
ERP aktualisieren
↓
Rückfrage schreiben
WITH OPSDONE
E-Mail / PDF
↓  
OpsDone App
Auto-check + match + process
↓
92% Standardfälle erledigt
oder, solange du das noch nicht seriös schätzen kannst:
Standardfälle automatisch
Ausnahmen zur Entscheidung
↓
Geprüfter ERP-Vorgang
Der interessante visuelle Effekt:
Die sechs manuellen Schritte links werden rechts zu einem Softwareblock komprimiert.
Das ist praktisch Work eliminated. als Grafik.
Und dann der wirtschaftliche Block
Der muss sehr stark aussehen.
Nicht „ROI Calculator“ wie irgendeine Unternehmensberatung.
Eher:
Potential Impact

Current manual work
~1,040 h / year
Potential work eliminated
~650–900 h / year
Capacity value
~€45k–€63k / year
Estimated implementation
€14k–€22k
Estimated ongoing cost
€600–€1,200 / month
Indicative payback  
4–8 months
Das ist brutal verkaufsstark.
Aber wichtig: Die AI darf diese Zahlen nicht einfach erfinden.
Der LLM extrahiert die Prozessmerkmale. Danach übernimmt eine deterministische Pricing-/ROI-Engine.
Zum Beispiel:
Base implementation
- Anzahl Systeme
- Anzahl Inputtypen
- Read-only vs Write-back
- Anzahl Workflows
- Approval Complexity
- Authentication
- Volume
- Special UI requirements
= Preisband.
Und darunter klein:
Indicative estimate based on the information provided. Final scope and pricing after technical review.

Das ist glaubwürdig.
Beim ROI würde ich eine wichtige sprachliche Feinheit einbauen
Nicht einfach:
€63.000 cost savings

Denn 1.000 gesparte Arbeitsstunden bedeuten nicht automatisch, dass der Kunde jemanden entlässt.
Besser:
€63.000 annual capacity released

oder deutsch:
Bis zu €63.000 gebundene Arbeitskapazität pro Jahr

Und vielleicht darunter:
Equivalent to ~0.8 FTE capacity.

Der CFO versteht trotzdem sofort, worum es geht.
Ich würde dem Ergebnis vier große Kacheln geben
YOUR SOFTWARE
Mini-App und Kernfunktionen.
YOUR NEW PROCESS
Vorher/Nachher-Prozessdiagramm.
WORK ELIMINATED
Stunden, manuelle Touchpoints, Intervention Rate.
INVESTMENT & RETURN
Preisband, laufende Kosten, Payback.
Mehr braucht der Nutzer eigentlich nicht.
Ganz wichtig: Das Ergebnis muss personalisiert klingen
Nicht:
„AI kann Ihren Prozess möglicherweise automatisieren.“

Sondern:
„Für Ihren Prozess würden wir eine Anwendung bauen, die eingehende Auftragsbestätigungen automatisch erfasst, mit den Bestelldaten abgleicht und nur Preis-, Mengen- oder Terminabweichungen an Ihr Einkaufsteam weitergibt.“

Dann:
„Basierend auf Ihren Angaben würde Ihr Team dadurch voraussichtlich nur noch 10–30 % der heutigen Fälle manuell bearbeiten.“

Wenn die Datenbasis dafür noch zu dünn ist:
„Unsere erste Einschätzung: hohes Automatisierungspotenzial.“

Glaubwürdigkeit schlägt übertriebene Genauigkeit.
Den CTA würde ich ebenfalls personalisieren
Nicht:
Termin buchen
Zu generisch.
Sondern:
Let's turn this into your software.

Deutsch:
Lassen Sie uns daraus Ihre Anwendung machen.

Darunter:
30 Minuten · kostenlos · keine Vorbereitung nötig
Wir prüfen Prozess, Systeme und Machbarkeit und konkretisieren Ihren Blueprint.

Und dann direkt freie Termine.
Der Termin sollte schon den Kontext kennen.
Also nicht:
„Worum geht es?“

sondern Sales bekommt automatisch:
Unternehmen
Prozessbeschreibung
Volumen
Systeme
Blueprint
Preisband
geschätzter Work Eliminated.
Der Call beginnt sofort auf Level 2.
Und wenn jemand noch keinen Termin will
Sehr wichtig.
Nicht verlieren.
Zweite CTA:
Blueprint per E-Mail erhalten

Jetzt erst fragst du die E-Mail-Adresse ab.
Damit erhältst du auch Leads, die noch nicht terminbereit sind.
Danach kannst du automatisiert nachfassen:
„Sie hatten einen Reportingprozess mit ~740 h jährlichem Aufwand analysiert. Soll ich Ihnen zeigen, wie wir die Anwendung technisch aufbauen würden?“

Das ist ein extrem warmer Follow-up.
Meine Lieblingsidee für den Chat selbst
Der Chat sollte während der 2–3 Fragen rechts live etwas entstehen lassen.
Zunächst nur:
Your solution

Dann nach Eingabe:
Input erkannt: E-Mail + PDF
Nach Frage 1:
~500 Vorgänge / Monat
Nach Frage 2:
ERP: SAP
Und plötzlich beginnt rechts der App-Mockup Gestalt anzunehmen.
Der Nutzer sieht:
Die bauen gerade meine Lösung zusammen.

Psychologisch viel stärker als:
Frage 1 von 3
Frage 2 von 3
Frage 3 von 3.

Es fühlt sich nicht wie ein Formular an.
Und ich würde einen kleinen „AI thinking“-Moment bewusst inszenieren
Nach Frage 3:
Designing your OpsDone solution…

Dann für vielleicht 2–4 Sekunden sichtbare Schritte:
Understanding workflow ✓
Mapping manual work ✓
Designing application ✓
Estimating implementation ✓
Calculating potential impact ✓
Nicht 20 Sekunden künstlich warten lassen.
Aber ein kurzer Moment vermittelt:
„Hier wird gerade etwas für mich berechnet.“

Dann geht der komplette Blueprint auf.
Ein psychologisch starker Trick: zuerst Nutzen, dann Preis
Das Ergebnis sollte nicht mit:
„Kostet €18.000.“

anfangen.
Reihenfolge:
1. Genau so würde deine Anwendung aussehen.
2. Genau diese Arbeit würde sie übernehmen.
3. So viel Kapazität ist betroffen.
4. Und dafür liegt das Investment ungefähr hier.
Dann fühlt sich €15k plötzlich ganz anders an.
Wenn der Nutzer zuerst €15k sieht, bevor er €60k jährlichen Pain sieht, ist die Conversion schlechter.
Ich würde auch eine „Feasibility“-Ampel einbauen
Beispielsweise:
Automation fit
HIGH
mit drei darunterliegenden Komponenten:
Repetition ●●●●●
Structured outcome ●●●●○
Integration complexity ●●●○○
Und Erklärung:
„Dieser Prozess eignet sich gut für AI-native Process Software, weil Input und gewünschter Output klar definiert sind und viele Schritte wiederkehren.“

Das gibt dem Nutzer zusätzlich das Gefühl:
„Das wurde tatsächlich analysiert.“

Was ich explizit NICHT machen würde
Kein 10-Minuten-Chat.
Keine 15 Fragen.
Keine Frage nach Name, E-Mail und Telefonnummer vor dem Ergebnis.
Kein „Danke, wir melden uns“.
Keine reine Textantwort.
Kein erfundener ROI mit zwei Nachkommastellen.
Keine völlig frei halluzinierte App.
Keinen klassischen Chatbot unten rechts als alleinigen Funnel.
Und ganz wichtig:
Der Blueprint darf wertvoll genug sein, dass der Nutzer ihn auch ohne Sales Call gern hätte.
Dann funktioniert das Ding als Lead Magnet.
export type ProcessStep = {
  title: string;
  text: string;
};

export type ProcessDefinition = {
  slug: string;
  title: string;
  category: string;
  shortDescription: string;
  headline: string;
  description: string;
  metaDescription: string;
  pains: string[];
  inputs: string[];
  checks: string[];
  output: string;
  steps: ProcessStep[];
  exceptions: string[];
  metrics: string[];
  questions: { question: string; answer: string }[];
};

export const processes: ProcessDefinition[] = [
  {
    slug: "auftragsbestaetigungen",
    title: "Auftragsbestätigungen automatisch prüfen",
    category: "Einkauf",
    shortDescription:
      "Preise, Mengen und Liefertermine aus Lieferantenbelegen gegen Bestellung und ERP prüfen.",
    headline: "Schluss mit manuellen Auftragsbestätigungen.",
    description:
      "OpsDone liest eingehende Auftragsbestätigungen, gleicht die relevanten Positionen mit Ihrer Bestellung ab und verarbeitet klare Standardfälle. Ihr Einkauf sieht nur noch Abweichungen, die eine Entscheidung brauchen.",
    metaDescription:
      "Auftragsbestätigungen automatisch prüfen: Preise, Mengen, Artikel und Liefertermine mit Bestellung und ERP abgleichen – bestehende Systeme bleiben.",
    pains: [
      "PDFs und E-Mails werden einzeln geöffnet und Position für Position geprüft.",
      "Abweichungen bei Preis, Menge oder Termin fallen spät auf oder werden uneinheitlich bewertet.",
      "Bestelldaten werden zwischen Postfach, Excel und ERP manuell übertragen.",
    ],
    inputs: [
      "E-Mail und PDF",
      "Bestellung oder Bestellexport",
      "ERP-Stammdaten",
      "Prüf- und Toleranzregeln",
    ],
    checks: [
      "Lieferant und Bestellnummer",
      "Artikel und Mengen",
      "Preise und Zahlungsbedingungen",
      "Liefertermine und Teillieferungen",
    ],
    output:
      "Ein dokumentierter Abgleich pro Vorgang: stimmige Standardfälle werden nach den vereinbarten Regeln weiterverarbeitet, Abweichungen landen mit Kontext bei der richtigen Person.",
    steps: [
      {
        title: "Eingang verstehen",
        text: "Die Automation überwacht das vereinbarte Postfach oder den Ablageort und ordnet Dokumente der richtigen Bestellung zu.",
      },
      {
        title: "Daten abgleichen",
        text: "Positionen, Preise, Mengen, Termine und Bedingungen werden extrahiert und gegen Bestell- und Stammdaten geprüft.",
      },
      {
        title: "Standardfall ausführen",
        text: "Liegt alles innerhalb der festgelegten Regeln, wird der Vorgang dokumentiert und im Zielsystem weitergeführt.",
      },
      {
        title: "Abweichung vorlegen",
        text: "Unklare oder abweichende Fälle gehen mit markierten Fundstellen und einer klaren Entscheidungsfrage an den Einkauf.",
      },
    ],
    exceptions: [
      "Preis außerhalb der Toleranz",
      "abweichender oder fehlender Liefertermin",
      "unbekannte Artikelnummer",
      "mehrdeutiger Bezug zu einer Bestellung",
    ],
    metrics: [
      "Bearbeitungszeit je Bestätigung",
      "Anteil automatisch erledigter Standardfälle",
      "menschliche Berührungen je Vorgang",
      "Zeit bis zur erkannten Abweichung",
    ],
    questions: [
      {
        question: "Muss unser ERP ersetzt werden?",
        answer:
          "Nein. Das bestehende ERP bleibt führend. Je nach System erfolgt die Anbindung über Exportdateien, APIs oder einen abgestimmten Bedienweg.",
      },
      {
        question: "Was passiert mit ungewöhnlichen Dokumenten?",
        answer:
          "Wenn Zuordnung oder Prüfung nicht sicher möglich ist, wird der Vorgang nicht blind verarbeitet. Er landet als Ausnahme mit den bereits erkannten Informationen beim Einkauf.",
      },
      {
        question: "Können unsere Toleranzen abgebildet werden?",
        answer:
          "Ja. Preis-, Mengen- und Terminregeln werden gemeinsam festgelegt, getestet und versioniert. Freigaben bleiben dort erhalten, wo Ihre Organisation sie verlangt.",
      },
    ],
  },
  {
    slug: "angebotsbearbeitung",
    title: "Angebotsbearbeitung automatisieren",
    category: "Vertrieb",
    shortDescription:
      "Anfragen aus E-Mail, PDF und Excel strukturieren und zu einem prüfbaren Angebotsentwurf führen.",
    headline:
      "Angebote vorbereiten, bevor Routinearbeit den Vertrieb ausbremst.",
    description:
      "OpsDone erfasst Anforderungen aus Anfragen und Ausschreibungen, prüft die Vollständigkeit, ergänzt freigegebene Produkt- und Preisinformationen und erstellt einen Angebotsentwurf. Ihr Team entscheidet über Konditionen und Sonderfälle.",
    metaDescription:
      "Angebotsbearbeitung automatisieren: Anfragen und RFQs erfassen, Anforderungen prüfen und Angebotsentwürfe aus bestehenden Produkt- und Preisdaten erstellen.",
    pains: [
      "Anforderungen stehen verteilt in E-Mails, Anhängen, Tabellen und Lastenheften.",
      "Vertriebsteams übertragen dieselben Kunden- und Produktdaten mehrfach.",
      "Rückfragen entstehen spät, weil Pflichtangaben erst während der Kalkulation fehlen.",
    ],
    inputs: [
      "Kundenmail und Anhänge",
      "RFQ- oder Ausschreibungsunterlagen",
      "Produkt- und Preisdaten",
      "Freigaberegeln",
    ],
    checks: [
      "Pflichtangaben und Fristen",
      "Produkte und Varianten",
      "Konditionen und Gültigkeiten",
      "offene fachliche Entscheidungen",
    ],
    output:
      "Ein strukturierter Vorgang mit Vollständigkeitscheck, offenen Punkten, verwendeten Quellen und einem Angebotsentwurf im bestehenden Format.",
    steps: [
      {
        title: "Anfrage erfassen",
        text: "E-Mail, Tabellen und Dokumente werden einem Vorgang zugeordnet; Anforderungen und Fristen werden strukturiert erfasst.",
      },
      {
        title: "Vollständigkeit prüfen",
        text: "Fehlende Angaben und Widersprüche werden früh sichtbar. Definierte Rückfragen können vorbereitet oder automatisch versendet werden.",
      },
      {
        title: "Entwurf erstellen",
        text: "Freigegebene Stamm-, Produkt- und Preisdaten fließen in das vorhandene Angebotsformat ein.",
      },
      {
        title: "Entscheidung einholen",
        text: "Sonderkonditionen, technische Ausnahmen und finale Freigaben bleiben beim verantwortlichen Team.",
      },
    ],
    exceptions: [
      "Sonderkondition oder unbekannter Rabatt",
      "technisch uneindeutige Anforderung",
      "fehlende Produktzuordnung",
      "Anfrage außerhalb des definierten Leistungsbereichs",
    ],
    metrics: [
      "Zeit von Anfrage bis Entwurf",
      "Anteil vollständiger Vorgänge beim ersten Durchlauf",
      "manuelle Übertragungen je Angebot",
      "Anzahl notwendiger Rückfrageschleifen",
    ],
    questions: [
      {
        question: "Erstellt OpsDone verbindliche Angebote?",
        answer:
          "Nur wenn Regeln und Vollmachten das ausdrücklich erlauben. Üblicherweise entsteht ein prüfbarer Entwurf; Preise, Sonderkonditionen und die finale Freigabe bleiben beim Vertrieb.",
      },
      {
        question: "Funktioniert das mit unseren Vorlagen?",
        answer:
          "Ja. Bestehende Word-, Excel-, CRM- oder ERP-Formate können weitergenutzt werden. Ziel ist ein fertiger Vorgang im vertrauten Arbeitsablauf.",
      },
      {
        question: "Sind auch umfangreiche Ausschreibungen möglich?",
        answer:
          "Grundsätzlich ja, wenn wiederkehrende Strukturen und klare Datenquellen vorliegen. Im Prozess-Check klären wir, welcher Teil zuerst zuverlässig automatisierbar ist.",
      },
    ],
  },
  {
    slug: "reklamationen",
    title: "Reklamationen und 8D-Vorbereitung automatisieren",
    category: "Qualitätsmanagement",
    shortDescription:
      "Reklamationen klassifizieren, Informationen zusammenführen und Dokumentation sowie Antwort vorbereiten.",
    headline: "Reklamationen automatisch vorbereiten. Ihr Team entscheidet.",
    description:
      "OpsDone strukturiert Kundenmeldungen und Anhänge, ergänzt Produkt- und Falldaten, sucht nach vereinbarten Mustern und bereitet Dokumentation, Maßnahmen und Kundenantwort vor. Fachliche Bewertung und Freigabe bleiben beim Qualitätsmanagement.",
    metaDescription:
      "Reklamationsbearbeitung und 8D-Vorbereitung automatisieren: Fälle klassifizieren, Daten sammeln, ähnliche Fälle finden und Dokumentation vorbereiten.",
    pains: [
      "Fallinformationen liegen in E-Mails, Bildern, ERP-Daten und separaten QM-Dateien.",
      "Die erste Klassifikation und Datensammlung wiederholt sich bei jedem Vorgang.",
      "Dokumentation und Kundenantwort werden unter Zeitdruck aus mehreren Quellen zusammengesetzt.",
    ],
    inputs: [
      "Kundenmail und Anlagen",
      "Fotos und Prüfberichte",
      "Produkt-, Auftrags- und Chargendaten",
      "QM-Kategorien und Vorlagen",
    ],
    checks: [
      "Produkt und betroffene Charge",
      "Fehlerbild und Dringlichkeit",
      "Pflichtinformationen",
      "ähnliche dokumentierte Fälle",
    ],
    output:
      "Ein vollständiger vorbereiteter Reklamationsvorgang mit Quellen, Klassifikation, fehlenden Angaben und Entwürfen für Dokumentation und Kommunikation.",
    steps: [
      {
        title: "Fall anlegen",
        text: "Die Eingangsmeldung und ihre Anhänge werden erkannt, dem richtigen Kunden oder Auftrag zugeordnet und strukturiert abgelegt.",
      },
      {
        title: "Kontext ergänzen",
        text: "Freigegebene Produkt-, Chargen- und Verlaufsdaten werden zusammengeführt; fehlende Pflichtangaben werden markiert.",
      },
      {
        title: "Bearbeitung vorbereiten",
        text: "Klassifikation, vergleichbare Fälle, mögliche nächste Schritte und benötigte Dokumente werden für das QM-Team vorbereitet.",
      },
      {
        title: "Fachlich entscheiden",
        text: "Ursachenbewertung, Maßnahmen, Haftungsfragen und externe Kommunikation werden von den zuständigen Menschen geprüft und freigegeben.",
      },
    ],
    exceptions: [
      "sicherheitskritischer oder haftungsrelevanter Fall",
      "unzureichende Belege",
      "Widerspruch zwischen Kundenmeldung und Produktdaten",
      "neues Fehlerbild ohne freigegebene Regel",
    ],
    metrics: [
      "Zeit bis zum vollständig angelegten Fall",
      "Aufwand für Datensammlung und Dokumentation",
      "Anteil automatisch vorbereiteter Vorgänge",
      "Durchlaufzeit bis zur ersten qualifizierten Antwort",
    ],
    questions: [
      {
        question: "Trifft die Automation Qualitätsentscheidungen?",
        answer:
          "Kritische fachliche Bewertungen bleiben bei Ihrem Team. OpsDone erledigt die vorbereitende Arbeit und leitet Fälle anhand vereinbarter Regeln weiter.",
      },
      {
        question: "Kann ein 8D-Bericht vollständig erzeugt werden?",
        answer:
          "Vorhandene Daten und freigegebene Textbausteine können in Ihre Vorlage übernommen werden. Inhalte wie Ursachenanalyse und Maßnahmen brauchen meist eine fachliche Freigabe.",
      },
      {
        question: "Wie werden Entscheidungen nachvollziehbar?",
        answer:
          "Quellen, extrahierte Daten, Regelprüfungen und menschliche Freigaben werden je nach Anforderung protokolliert. Die konkrete Audit-Tiefe wird im Projekt festgelegt.",
      },
    ],
  },
  {
    slug: "reporting",
    title: "Management-Reporting automatisieren",
    category: "Finance & Operations",
    shortDescription:
      "Daten aus Excel, ERP und Fachberichten sammeln, validieren und in bestehende Reports überführen.",
    headline: "Monatsreporting ohne Copy-Paste.",
    description:
      "OpsDone sammelt definierte Datenquellen, prüft Vollständigkeit und Plausibilität, berechnet Kennzahlen und aktualisiert Berichtsvorlagen. Verantwortliche prüfen Abweichungen und geben die finale Aussage frei.",
    metaDescription:
      "Management-Reporting automatisieren: Daten aus Excel und ERP sammeln, validieren, Kennzahlen berechnen und PowerPoint- oder Excel-Berichte aktualisieren.",
    pains: [
      "Daten werden jeden Monat aus denselben Quellen kopiert und neu formatiert.",
      "Zahlenfehler und Versionskonflikte werden erst kurz vor dem Termin entdeckt.",
      "Kommentierung bindet Zeit, weil Abweichungen und Ursachen erneut zusammengesucht werden.",
    ],
    inputs: [
      "ERP- und BI-Exporte",
      "Excel- und CSV-Dateien",
      "bestehende Berichtslogik",
      "PowerPoint-, Excel- oder Dokumentvorlagen",
    ],
    checks: [
      "Vollständigkeit und Berichtsperiode",
      "Plausibilität und Summenkonsistenz",
      "Abweichungen zu Plan und Vorperiode",
      "Version und Freigabestatus",
    ],
    output:
      "Ein aktualisierter Bericht mit validierten Kennzahlen, markierten Auffälligkeiten, Quellenbezug und vorbereiteten Kommentaren.",
    steps: [
      {
        title: "Quellen einsammeln",
        text: "Die Automation holt die vereinbarten Dateien und Exporte zum richtigen Zeitpunkt aus bestehenden Ablagen oder Systemen.",
      },
      {
        title: "Zahlen validieren",
        text: "Format, Zeitraum, Vollständigkeit und definierte Kontrollsummen werden geprüft, bevor Werte in den Bericht fließen.",
      },
      {
        title: "Report aktualisieren",
        text: "Kennzahlen, Tabellen und Diagrammdaten werden berechnet und in die vertraute Vorlage geschrieben.",
      },
      {
        title: "Auffälligkeiten vorlegen",
        text: "Abweichungen und Datenprobleme gehen mit Quellen und vorbereiteten Erläuterungen an die verantwortlichen Personen.",
      },
    ],
    exceptions: [
      "fehlender oder verspäteter Datenexport",
      "gebrochene Kontrollsumme",
      "unerwartete Strukturänderung",
      "Abweichung ohne belastbare Datenbasis",
    ],
    metrics: [
      "Arbeitszeit je Reporting-Zyklus",
      "Anzahl manueller Kopiervorgänge",
      "Zeit bis zum ersten prüfbaren Bericht",
      "Korrekturschleifen nach der Freigabe",
    ],
    questions: [
      {
        question: "Müssen wir unser BI-System wechseln?",
        answer:
          "Nein. OpsDone kann vorhandene Exporte, Datenbanken und Vorlagen verbinden. Die bestehenden Systeme und das gewohnte Berichtsformat können bleiben.",
      },
      {
        question: "Schreibt die KI Management-Kommentare?",
        answer:
          "Sie kann Entwürfe aus den validierten Zahlen und bereitgestelltem Kontext erstellen. Verantwortliche prüfen und verantworten die finale Einordnung.",
      },
      {
        question: "Was passiert bei geänderten Excel-Strukturen?",
        answer:
          "Definierte Strukturprüfungen erkennen Änderungen. Ein unsicherer Import wird angehalten und als Ausnahme gemeldet, statt unbemerkt falsche Zahlen zu verteilen.",
      },
    ],
  },
  {
    slug: "lieferanten-onboarding",
    title: "Lieferanten-Onboarding automatisieren",
    category: "Einkauf & Stammdaten",
    shortDescription:
      "Dokumente und Stammdaten prüfen, fehlende Angaben nachfordern und einen freigabefertigen Datensatz vorbereiten.",
    headline: "Neue Lieferanten ohne E-Mail-Pingpong onboarden.",
    description:
      "OpsDone erfasst Formulare, Zertifikate und Stammdaten, prüft sie gegen Ihre Anforderungen und fordert klar definierte fehlende Informationen nach. Einkauf, Compliance und Fachbereich erhalten einen vollständigen Vorgang zur Freigabe.",
    metaDescription:
      "Lieferanten-Onboarding automatisieren: Stammdaten und Zertifikate prüfen, fehlende Angaben nachfordern und freigabefertige Lieferantendatensätze vorbereiten.",
    pains: [
      "Formulare, Nachweise und Stammdaten treffen über mehrere E-Mail-Schleifen ein.",
      "Fehlende oder abgelaufene Dokumente werden erst beim Anlegen des Lieferanten entdeckt.",
      "Einkauf, Compliance und Stammdatenpflege führen parallele Checklisten.",
    ],
    inputs: [
      "Lieferantenformulare",
      "Zertifikate und Nachweise",
      "E-Mails und Anlagen",
      "interne Prüf- und Freigaberegeln",
    ],
    checks: [
      "Pflichtfelder und Datenformat",
      "Gültigkeit von Nachweisen",
      "Konsistenz von Firmen- und Bankdaten",
      "zuständige Freigaben",
    ],
    output:
      "Ein nachvollziehbarer, vollständiger Onboarding-Vorgang mit geprüften Dokumenten, geklärten Rückfragen und einem Datensatz zur Freigabe oder Anlage.",
    steps: [
      {
        title: "Unterlagen erfassen",
        text: "Eingehende Formulare und Dokumente werden dem Lieferanten zugeordnet und in eine einheitliche Struktur gebracht.",
      },
      {
        title: "Anforderungen prüfen",
        text: "Pflichtangaben, Gültigkeiten und definierte Konsistenzregeln werden automatisch kontrolliert.",
      },
      {
        title: "Lücken schließen",
        text: "Für klar benannte fehlende Informationen kann die Automation eine passende Rückfrage vorbereiten und Antworten erneut zuordnen.",
      },
      {
        title: "Freigabe vorbereiten",
        text: "Der vollständige Vorgang wird an Einkauf, Stammdaten oder Compliance gegeben; Systemanlage und Freigaben folgen den vereinbarten Rechten.",
      },
    ],
    exceptions: [
      "abweichende Bank- oder Firmendaten",
      "fehlender kritischer Nachweis",
      "komplexe Compliance-Bewertung",
      "Lieferant passt nicht in eine bestehende Kategorie",
    ],
    metrics: [
      "Durchlaufzeit bis zur Anlage",
      "Rückfragen je Lieferant",
      "Anteil vollständig eingereichter Vorgänge",
      "manueller Prüfaufwand je Onboarding",
    ],
    questions: [
      {
        question: "Legt OpsDone Lieferanten direkt im ERP an?",
        answer:
          "Das ist möglich, wenn Schnittstelle, Rollen und Freigaberegeln es erlauben. Häufig startet der erste Schritt mit einem geprüften, freigabefertigen Datensatz.",
      },
      {
        question: "Kann die Automation Dokumente auf Echtheit prüfen?",
        answer:
          "Sie kann formale Merkmale, Inhalte, Gültigkeiten und definierte Quellen prüfen. Eine rechtssichere Echtheits- oder Compliance-Bewertung wird nur mit den dafür vorgesehenen Verfahren und Freigaben umgesetzt.",
      },
      {
        question: "Wie gehen Sie mit sensiblen Daten um?",
        answer:
          "Datenminimierung, Zugriffsrechte, Aufbewahrung und Verarbeitungsorte werden vor der Umsetzung festgelegt. Details zur Standard-Arbeitsweise stehen auf der Sicherheitsseite.",
      },
    ],
  },
];

export function getProcess(slug: string) {
  return processes.find((process) => process.slug === slug);
}

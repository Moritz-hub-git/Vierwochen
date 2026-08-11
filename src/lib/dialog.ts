import { KATEGORIEN, KategorieId } from './pricing';

/** Was der Dialog über den Fall des Besuchers zusammenträgt. */
export interface Skizze {
  titel: string;
  prozess: string;
  schritte: { name: string; heute: string; kuenftig: string }[];
  rollen: string[];
  systeme: string[];
  datenquellen: string[];
  /** 0–100, wie viel des Ablaufs sich sinnvoll automatisieren lässt. */
  automatisierungsgrad: number;
  offenePunkte: string[];
}

export interface DialogAntwort {
  antwort: string;
  skizze: Skizze;
  genugInformation: boolean;
  kategorie: KategorieId | null;
  begruendung: string;
  annahmen: string[];
}

export const SKIZZE_LEER: Skizze = {
  titel: '',
  prozess: '',
  schritte: [],
  rollen: [],
  systeme: [],
  datenquellen: [],
  automatisierungsgrad: 0,
  offenePunkte: [],
};

/** Schema, an das sich das Modell halten muss. */
export const ANTWORT_SCHEMA = {
  type: 'object',
  properties: {
    antwort: { type: 'string' },
    skizze: {
      type: 'object',
      properties: {
        titel: { type: 'string' },
        prozess: { type: 'string' },
        schritte: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              heute: { type: 'string' },
              kuenftig: { type: 'string' },
            },
            required: ['name', 'heute', 'kuenftig'],
          },
        },
        rollen: { type: 'array', items: { type: 'string' } },
        systeme: { type: 'array', items: { type: 'string' } },
        datenquellen: { type: 'array', items: { type: 'string' } },
        automatisierungsgrad: { type: 'integer' },
        offenePunkte: { type: 'array', items: { type: 'string' } },
      },
      required: [
        'titel',
        'prozess',
        'schritte',
        'rollen',
        'systeme',
        'datenquellen',
        'automatisierungsgrad',
        'offenePunkte',
      ],
    },
    genugInformation: { type: 'boolean' },
    kategorie: {
      type: 'string',
      enum: ['werkstueck', 'pilot', 'ausbau', 'gespraech', 'offen'],
    },
    begruendung: { type: 'string' },
    annahmen: { type: 'array', items: { type: 'string' } },
  },
  required: [
    'antwort',
    'skizze',
    'genugInformation',
    'kategorie',
    'begruendung',
    'annahmen',
  ],
} as const;

const KATEGORIE_BESCHREIBUNG = KATEGORIEN.map(
  (k) => `- ${k.id}: ${k.name}. Erkennbar an: ${k.merkmale.join('; ')}.`,
).join('\n');

export const SYSTEM_ANWEISUNG = `
Du führst auf der Website von "vierwochen" ein kurzes Vorgespräch mit einem
Interessenten. vierwochen baut Individualsoftware für mittelständische
Unternehmen: in vier Wochen, zum Festpreis, integriert in die vorhandene IT.
Gebaut wird KI-gestützt (agentisches Coding), verantwortet von Moritz Schumacher.

DEINE AUFGABE
Verstehe den geschilderten Ablauf so weit, dass er einer Preiskategorie
zugeordnet werden kann. Stelle dafür höchstens sechs Rückfragen, je Nachricht
genau eine. Wer knapp antwortet, wird schneller durchgelassen. Sobald die
Zuordnung möglich ist, setze genugInformation auf true.

WORAUF DU HINAUSWILLST
1. Welcher Ablauf, wie oft, wie viele Personen?
2. Welche Systeme sind im Spiel (ERP, Warenwirtschaft, DMS, CRM, Excel)?
3. Wie liegen die Daten vor — strukturiert, gewachsen, verteilt?
4. Müssen Altdaten übernommen werden?
5. Gibt es regulatorische Anforderungen?

TONFALL
Nüchtern, direkt, konkret. Kurze Hauptsätze. Kein Beraterdeutsch, keine
Superlative, keine Begeisterungsfloskeln, keine Emojis. Du siezt. Du bist
keine Verkäuferin und kein Chatbot mit Persönlichkeit, sondern ein Fachmann,
der schnell verstehen will, worum es geht. Halte jede Antwort unter 60 Wörtern.

EHRLICHKEIT
Wenn der Fall keine KI braucht, sondern nur eine ordentliche Datenbank oder
einen aufgeräumten Prozess, sage das offen. Wenn der Fall nicht zu vierwochen
passt (sicherheitskritische Steuerung, Medizintechnik, Rechenzentrumsbetrieb),
sage das ebenfalls und wähle die Kategorie "gespraech".

DIE SKIZZE
Mit jeder Antwort aktualisierst du die Skizze. Sie wird dem Besucher als Bild
seines Falls angezeigt und soll mit jedem Zug vollständiger werden. Trage nur
ein, was tatsächlich gesagt wurde oder klar daraus folgt. Erfinde nichts.
Was du vermutest, gehört in "annahmen".

PREISKATEGORIEN — du ordnest nur zu, du rechnest nicht:
${KATEGORIE_BESCHREIBUNG}

Solange du noch fragst, setze kategorie auf "offen".
Nenne selbst niemals Preise, Beträge oder Zeiträume. Die Zahlen ergänzt die
Website aus ihrer eigenen Preisliste.
`.trim();

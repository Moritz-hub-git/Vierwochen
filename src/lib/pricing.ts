/**
 * Preislogik von vierwochen.de
 *
 * Grundsatz: Das Modell rechnet NICHT. Es klassifiziert den geschilderten Fall
 * anhand der unten definierten Merkmale und waehlt daraus eine hinterlegte
 * Spanne. Aenderungen an Preisen passieren ausschliesslich in dieser Datei —
 * niemand muss dafuer den Dialog oder das Modell anfassen.
 */

export type KategorieId = 'werkstueck' | 'pilot' | 'ausbau' | 'gespraech';

export interface Kategorie {
  id: KategorieId;
  name: string;
  von: number | null;
  bis: number | null;
  wochen: number | null;
  beschreibung: string;
  /** Woran das Modell diese Kategorie erkennt. Fliesst in den Systemprompt. */
  merkmale: string[];
}

export const KATEGORIEN: Kategorie[] = [
  {
    id: 'werkstueck',
    name: 'Werkstück',
    von: 2500,
    bis: 2500,
    wochen: 1,
    beschreibung:
      'Ein klickbarer Prototyp des Falls, ohne Anbindung an bestehende Systeme. Wird bei Beauftragung voll verrechnet.',
    merkmale: [
      'der Fall ist noch unscharf oder soll erst einmal sichtbar gemacht werden',
      'keine Anbindung an vorhandene Systeme noetig',
      'ein einzelner Bildschirm oder ein einzelner Ablauf',
    ],
  },
  {
    id: 'pilot',
    name: 'Pilot',
    von: 9800,
    bis: 14000,
    wochen: 4,
    beschreibung:
      'Ein Prozess, produktiv nutzbar, in vier Wochen. Festpreis, 50 Prozent bei Auftrag, Rest nach Abnahme.',
    merkmale: [
      'genau ein klar umrissener Prozess',
      'hoechstens eine Anbindung an ein vorhandenes System',
      'ueberschaubare Nutzerzahl, klare Datenlage',
      'kein Umzug von Altdaten in grossem Umfang',
    ],
  },
  {
    id: 'ausbau',
    name: 'Ausbaustufe',
    von: 15000,
    bis: 40000,
    wochen: 8,
    beschreibung:
      'Mehrere Prozesse, Anbindung an ERP, DMS oder Warenwirtschaft, Rollen und Rechte, Auswertungen.',
    merkmale: [
      'mehrere zusammenhaengende Prozesse',
      'Anbindung an ERP, DMS, Warenwirtschaft oder CRM',
      'Rollen- und Rechtekonzept noetig',
      'Uebernahme vorhandener Daten',
    ],
  },
  {
    id: 'gespraech',
    name: 'Erst ins Gespräch',
    von: null,
    bis: null,
    wochen: null,
    beschreibung:
      'Der Fall braucht ein Gespräch, bevor eine seriöse Zahl möglich ist. Das ist kein Nachteil — es ist ehrlicher als eine Zahl, die später nicht hält.',
    merkmale: [
      'regulatorische Anforderungen (Medizin, Luftfahrt, sicherheitskritische Steuerung)',
      'Ablösung eines gewachsenen Altsystems',
      'unklare oder sehr schlechte Datenlage',
      'mehr als rund 200 Personen arbeiten taeglich damit',
      'der geschilderte Bedarf passt in keine der anderen Kategorien',
    ],
  },
];

export function kategorie(id: KategorieId): Kategorie {
  const treffer = KATEGORIEN.find((k) => k.id === id);
  if (!treffer) throw new Error(`Unbekannte Preiskategorie: ${id}`);
  return treffer;
}

/** Formatiert eine Spanne fuer die Anzeige im Dialog. */
export function spanneAlsText(k: Kategorie): string {
  if (k.von === null || k.bis === null) return 'nach Gespräch';
  const f = (n: number) => n.toLocaleString('de-DE');
  return k.von === k.bis ? `${f(k.von)} €` : `${f(k.von)}–${f(k.bis)} €`;
}

/** Pflichttext unter jeder Schaetzung. Nicht entfernen. */
export const UNVERBINDLICHKEIT =
  'Unverbindliche Ersteinschätzung auf Basis Ihrer Angaben — kein Angebot. ' +
  'Ein verbindliches Festangebot entsteht nach dem Gespräch. Alle Beträge netto zzgl. USt.';

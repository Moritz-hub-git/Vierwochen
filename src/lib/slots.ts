/**
 * Terminfenster für Erstgespräche.
 *
 * Regeln (bewusst als Code-Konfiguration, bis eine Einstellseite existiert):
 *   Montag bis Freitag, 09:00–17:00 Uhr Europe/Berlin,
 *   30 Minuten je Gespräch, Beginn zur vollen und halben Stunde,
 *   mindestens 24 Stunden Vorlauf, Horizont: die nächsten 8 Arbeitstage.
 *
 * Zeitzonen sind die häufigste Fehlerquelle in Eigenbau-Buchungen, deshalb
 * hier ausdrücklich: Slots werden intern IMMER als UTC-ISO geführt und erst
 * bei der Anzeige nach Europe/Berlin formatiert. Die Umrechnung Berlin → UTC
 * läuft über Intl und ist sommerzeitfest (Zwei-Pass-Verfahren).
 */

export const GESPRAECH_MINUTEN = 30;
const VORLAUF_STUNDEN = 24;
const ARBEITSTAGE_HORIZONT = 8;
const START_STUNDE = 9;
const LETZTER_START_MINUTEN = 16 * 60 + 30; // 16:30 → Ende 17:00
const ZEITZONE = 'Europe/Berlin';

const teile = new Intl.DateTimeFormat('en-US', {
  timeZone: ZEITZONE,
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  weekday: 'short',
  hour12: false,
});

function berlinTeile(utcMs: number) {
  const p = Object.fromEntries(
    teile.formatToParts(new Date(utcMs)).map((t) => [t.type, t.value]),
  );
  return {
    jahr: Number(p.year),
    monat: Number(p.month),
    tag: Number(p.day),
    stunde: Number(p.hour) % 24,
    minute: Number(p.minute),
    sekunde: Number(p.second),
    wochentag: p.weekday as 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun',
  };
}

function versatz(utcMs: number): number {
  const b = berlinTeile(utcMs);
  const alsUtc = Date.UTC(b.jahr, b.monat - 1, b.tag, b.stunde, b.minute, b.sekunde);
  return alsUtc - Math.floor(utcMs / 1000) * 1000;
}

/** Wandelt eine Berliner Wanduhrzeit in einen UTC-Zeitstempel um. */
function berlinNachUtc(
  jahr: number,
  monat: number,
  tag: number,
  stunde: number,
  minute: number,
): number {
  const schaetzung = Date.UTC(jahr, monat - 1, tag, stunde, minute);
  let utc = schaetzung - versatz(schaetzung);
  const kontrolle = versatz(utc);
  if (schaetzung - kontrolle !== utc) utc = schaetzung - kontrolle;
  return utc;
}

export interface Slot {
  /** Beginn als UTC-ISO — der Fachschlüssel des Termins. */
  iso: string;
  utcMs: number;
}

/** Alle buchbaren Slots ab jetzt, ohne Abgleich mit Kalender/Buchungen. */
export function moeglicheSlots(jetztMs = Date.now()): Slot[] {
  const fruehestens = jetztMs + VORLAUF_STUNDEN * 60 * 60 * 1000;
  const slots: Slot[] = [];
  let arbeitstage = 0;

  for (let i = 0; i < 30 && arbeitstage < ARBEITSTAGE_HORIZONT; i++) {
    const tagMs = jetztMs + i * 24 * 60 * 60 * 1000;
    const b = berlinTeile(tagMs);
    if (b.wochentag === 'Sat' || b.wochentag === 'Sun') continue;

    let tagHatSlot = false;
    for (
      let minuten = START_STUNDE * 60;
      minuten <= LETZTER_START_MINUTEN;
      minuten += GESPRAECH_MINUTEN
    ) {
      const utcMs = berlinNachUtc(
        b.jahr,
        b.monat,
        b.tag,
        Math.floor(minuten / 60),
        minuten % 60,
      );
      if (utcMs < fruehestens) continue;
      slots.push({ iso: new Date(utcMs).toISOString(), utcMs });
      tagHatSlot = true;
    }
    if (tagHatSlot) arbeitstage++;
  }

  return slots;
}

/** Prüft, ob ein eingereichter Zeitpunkt ein regulärer Slot ist. */
export function istGueltigerSlot(iso: string, jetztMs = Date.now()): boolean {
  return moeglicheSlots(jetztMs).some((s) => s.iso === iso);
}

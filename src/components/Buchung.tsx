'use client';

import { useEffect, useMemo, useState } from 'react';

/**
 * Terminbuchung direkt im Dialog: Kanal wählen, Tag wählen, Zeit wählen,
 * Name eintragen, fertig. Die E-Mail-Adresse kommt aus dem Gate davor —
 * niemand tippt zweimal.
 */

const TAG_FORMAT = new Intl.DateTimeFormat('de-DE', {
  timeZone: 'Europe/Berlin',
  weekday: 'short',
  day: '2-digit',
  month: '2-digit',
});

const ZEIT_FORMAT = new Intl.DateTimeFormat('de-DE', {
  timeZone: 'Europe/Berlin',
  hour: '2-digit',
  minute: '2-digit',
});

const VOLL_FORMAT = new Intl.DateTimeFormat('de-DE', {
  timeZone: 'Europe/Berlin',
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  hour: '2-digit',
  minute: '2-digit',
});

type Phase = 'laedt' | 'wahl' | 'daten' | 'sendet' | 'fertig' | 'fehler';

export default function Buchung({ email, fall }: { email: string; fall: string }) {
  const [slots, setSlots] = useState<string[]>([]);
  const [phase, setPhase] = useState<Phase>('laedt');
  const [kanal, setKanal] = useState<'video' | 'telefon'>('video');
  const [tag, setTag] = useState<string | null>(null);
  const [slot, setSlot] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [telefon, setTelefon] = useState('');
  const [meldung, setMeldung] = useState<string | null>(null);
  const [modus, setModus] = useState<'bestaetigt' | 'angefragt'>('angefragt');

  useEffect(() => {
    fetch('/api/slots')
      .then((r) => r.json())
      .then((d) => {
        setSlots(d.slots ?? []);
        setPhase('wahl');
      })
      .catch(() => setPhase('fehler'));
  }, []);

  const tage = useMemo(() => {
    const gruppen = new Map<string, string[]>();
    for (const iso of slots) {
      const schluessel = TAG_FORMAT.format(new Date(iso));
      const liste = gruppen.get(schluessel) ?? [];
      liste.push(iso);
      gruppen.set(schluessel, liste);
    }
    return [...gruppen.entries()];
  }, [slots]);

  const aktiveSlots = useMemo(
    () => tage.find(([t]) => t === tag)?.[1] ?? [],
    [tage, tag],
  );

  async function buchen(ereignis: React.FormEvent) {
    ereignis.preventDefault();
    if (!slot) return;
    setPhase('sendet');
    setMeldung(null);
    try {
      const antwort = await fetch('/api/buchen', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slotIso: slot, kanal, name, email, telefon, fall }),
      });
      const daten = await antwort.json();
      if (!antwort.ok) {
        setMeldung(daten.fehler ?? 'Das hat nicht geklappt.');
        setPhase(antwort.status === 409 ? 'wahl' : 'daten');
        if (antwort.status === 409) {
          // Slotliste auffrischen, der gewählte ist weg.
          const neu = await fetch('/api/slots').then((r) => r.json());
          setSlots(neu.slots ?? []);
          setSlot(null);
        }
        return;
      }
      setModus(daten.modus);
      setPhase('fertig');
    } catch {
      setMeldung('Keine Verbindung. Bitte gleich noch einmal versuchen.');
      setPhase('daten');
    }
  }

  if (phase === 'laedt') {
    return <p className="buch__hinweis">Terminfenster werden geladen …</p>;
  }

  if (phase === 'fehler') {
    return (
      <p className="buch__hinweis">
        Die Terminauswahl ist gerade nicht erreichbar — schreiben Sie mir Ihren
        Wunschtermin einfach per E-Mail.
      </p>
    );
  }

  if (phase === 'fertig' && slot) {
    return (
      <div className="buch__fertig">
        <div className="buch__fertig-kopf">
          {modus === 'bestaetigt' ? 'Termin steht.' : 'Terminwunsch angekommen.'}
        </div>
        <p>
          {VOLL_FORMAT.format(new Date(slot))} Uhr ·{' '}
          {kanal === 'video' ? 'Videocall' : `Anruf unter ${telefon}`}
        </p>
        <p className="buch__hinweis">
          {modus === 'bestaetigt'
            ? 'Der Termin ist im Kalender eingetragen. Sie erhalten die Einladung mit allen Details an Ihre E-Mail-Adresse.'
            : 'Ich bestätige Ihnen den Termin persönlich per E-Mail — in der Regel innerhalb weniger Stunden.'}
        </p>
      </div>
    );
  }

  return (
    <form className="buch" onSubmit={buchen}>
      <div className="buch__zeile">
        <span className="buch__label">Gesprächsart</span>
        <div className="buch__kanaele" role="radiogroup" aria-label="Gesprächsart">
          <button
            type="button"
            className={`buch__kanal ${kanal === 'video' ? 'buch__kanal--aktiv' : ''}`}
            onClick={() => setKanal('video')}
            aria-pressed={kanal === 'video'}
          >
            Videocall
          </button>
          <button
            type="button"
            className={`buch__kanal ${kanal === 'telefon' ? 'buch__kanal--aktiv' : ''}`}
            onClick={() => setKanal('telefon')}
            aria-pressed={kanal === 'telefon'}
          >
            Telefon
          </button>
        </div>
      </div>

      <div className="buch__zeile">
        <span className="buch__label">Tag</span>
        <div className="buch__tage">
          {tage.map(([t]) => (
            <button
              type="button"
              key={t}
              className={`buch__tag ${t === tag ? 'buch__tag--aktiv' : ''}`}
              onClick={() => {
                setTag(t);
                setSlot(null);
              }}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {tag && (
        <div className="buch__zeile">
          <span className="buch__label">Uhrzeit</span>
          <div className="buch__slots">
            {aktiveSlots.map((iso) => (
              <button
                type="button"
                key={iso}
                className={`buch__slot ${iso === slot ? 'buch__slot--aktiv' : ''}`}
                onClick={() => setSlot(iso)}
              >
                {ZEIT_FORMAT.format(new Date(iso))}
              </button>
            ))}
          </div>
        </div>
      )}

      {slot && (
        <div className="buch__daten">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ihr Name"
            aria-label="Ihr Name"
            required
          />
          {kanal === 'telefon' && (
            <input
              type="tel"
              value={telefon}
              onChange={(e) => setTelefon(e.target.value)}
              placeholder="Ihre Rufnummer"
              aria-label="Ihre Rufnummer"
              required
            />
          )}
          <button
            className="btn btn--primary"
            type="submit"
            disabled={phase === 'sendet'}
          >
            {phase === 'sendet'
              ? 'Wird gebucht …'
              : `${ZEIT_FORMAT.format(new Date(slot))} Uhr verbindlich buchen`}
          </button>
        </div>
      )}

      {meldung && <div className="dlg__fehler">{meldung}</div>}
    </form>
  );
}

'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { Skizze } from '@/lib/dialog';
import { SKIZZE_LEER } from '@/lib/dialog';
import Buchung from './Buchung';

interface Nachricht {
  rolle: 'user' | 'model';
  text: string;
}

interface Preis {
  name: string;
  spanne: string;
  wochen: number | null;
  beschreibung: string;
  hinweis: string;
}

type Phase = 'gespraech' | 'gate' | 'ergebnis';

export default function Dialog({ start }: { start: string }) {
  const [verlauf, setVerlauf] = useState<Nachricht[]>([]);
  const [skizze, setSkizze] = useState<Skizze>(SKIZZE_LEER);
  const [annahmen, setAnnahmen] = useState<string[]>([]);
  const [preis, setPreis] = useState<Preis | null>(null);
  const [phase, setPhase] = useState<Phase>('gespraech');
  const [eingabe, setEingabe] = useState('');
  const [laeuft, setLaeuft] = useState(false);
  const [fehler, setFehler] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [gateFehler, setGateFehler] = useState<string | null>(null);
  const listeRef = useRef<HTMLDivElement>(null);
  const gestartet = useRef(false);

  const senden = useCallback(async (neuerVerlauf: Nachricht[]) => {
    setLaeuft(true);
    setFehler(null);
    try {
      const antwort = await fetch('/api/dialog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ verlauf: neuerVerlauf }),
      });
      const daten = await antwort.json();
      if (!antwort.ok) {
        setFehler(daten.fehler ?? 'Etwas ist schiefgelaufen.');
        return;
      }
      setVerlauf([...neuerVerlauf, { rolle: 'model', text: daten.antwort }]);
      if (daten.skizze) setSkizze(daten.skizze);
      if (daten.annahmen) setAnnahmen(daten.annahmen);
      if (daten.fertig && daten.preis) {
        setPreis(daten.preis);
        setPhase('gate');
      }
    } catch {
      setFehler('Keine Verbindung. Bitte versuchen Sie es gleich noch einmal.');
    } finally {
      setLaeuft(false);
    }
  }, []);

  // Erste Nachricht aus dem Einstiegsfeld der Startseite.
  useEffect(() => {
    if (gestartet.current) return;
    gestartet.current = true;
    const erste: Nachricht[] = [{ rolle: 'user', text: start }];
    setVerlauf(erste);
    void senden(erste);
  }, [start, senden]);

  useEffect(() => {
    listeRef.current?.scrollTo({ top: listeRef.current.scrollHeight, behavior: 'smooth' });
  }, [verlauf, laeuft]);

  function abschicken(ereignis: React.FormEvent) {
    ereignis.preventDefault();
    const text = eingabe.trim();
    if (!text || laeuft) return;
    const neu: Nachricht[] = [...verlauf, { rolle: 'user', text }];
    setVerlauf(neu);
    setEingabe('');
    void senden(neu);
  }

  async function gateAbschicken(ereignis: React.FormEvent) {
    ereignis.preventDefault();
    setGateFehler(null);
    const antwort = await fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, skizze, verlauf }),
    });
    const daten = await antwort.json();
    if (!antwort.ok) {
      setGateFehler(daten.fehler ?? 'Das hat nicht geklappt.');
      return;
    }
    setPhase('ergebnis');
  }

  return (
    <div className="dlg">
      {/* ─── Gespräch ─────────────────────────────────────── */}
      <section className="dlg__chat" aria-label="Dialog">
        <div className="dlg__verlauf" ref={listeRef}>
          {verlauf.map((n, i) => (
            <div key={i} className={`dlg__msg dlg__msg--${n.rolle}`}>
              {n.text}
            </div>
          ))}
          {laeuft && (
            <div className="dlg__msg dlg__msg--model dlg__msg--denkt" aria-live="polite">
              <span />
              <span />
              <span />
            </div>
          )}
          {fehler && <div className="dlg__fehler">{fehler}</div>}
        </div>

        {phase === 'gespraech' && (
          <form className="dlg__eingabe" onSubmit={abschicken}>
            <input
              type="text"
              value={eingabe}
              onChange={(e) => setEingabe(e.target.value)}
              placeholder="Ihre Antwort …"
              aria-label="Ihre Antwort"
              disabled={laeuft}
              maxLength={1500}
            />
            <button className="btn btn--primary" type="submit" disabled={laeuft}>
              Senden
            </button>
          </form>
        )}

        {phase === 'gate' && preis && (
          <form className="dlg__gate" onSubmit={gateAbschicken}>
            <p className="dlg__gate-titel">
              Die Einschätzung liegt vor: Kategorie <b>{preis.name}</b>.
            </p>
            <p className="dlg__gate-text">
              Preisspanne und Zeitplan zeige ich Ihnen gegen Ihre geschäftliche
              E-Mail-Adresse — dorthin geht auch die Zusammenfassung.
            </p>
            <div className="dlg__gate-feld">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="vorname.name@ihrefirma.de"
                aria-label="Geschäftliche E-Mail-Adresse"
                required
              />
              <button className="btn btn--primary" type="submit">
                Einschätzung anzeigen
              </button>
            </div>
            {gateFehler && <div className="dlg__fehler">{gateFehler}</div>}
          </form>
        )}

        {phase === 'ergebnis' && preis && (
          <div className="dlg__ergebnis">
            <div className="plate">
              <div className="plate__head">
                <span>Ersteinschätzung</span>
                <span>{preis.name}</span>
              </div>
              <div>
                <div className="plate__row">
                  <div className="plate__key">Preisspanne</div>
                  <div className="plate__val">
                    <b>{preis.spanne}</b>
                  </div>
                </div>
                {preis.wochen !== null && (
                  <div className="plate__row">
                    <div className="plate__key">Dauer</div>
                    <div className="plate__val">
                      <b>{preis.wochen} {preis.wochen === 1 ? 'Woche' : 'Wochen'}</b>{' '}
                      vom Auftrag bis zur Abnahme
                    </div>
                  </div>
                )}
                <div className="plate__row">
                  <div className="plate__key">Umfang</div>
                  <div className="plate__val">{preis.beschreibung}</div>
                </div>
              </div>
            </div>
            <p className="note">{preis.hinweis}</p>
            {annahmen.length > 0 && (
              <p className="note">Annahmen: {annahmen.join(' · ')}</p>
            )}

            <div className="buch__rahmen">
              <div className="dlg__gate-titel">
                Der nächste Schritt: 15 Minuten, in denen wir prüfen, ob die
                Einschätzung hält.
              </div>
              <Buchung email={email} fall={skizze.prozess || skizze.titel} />
            </div>
          </div>
        )}
      </section>

      {/* ─── Skizze ───────────────────────────────────────── */}
      <aside className="dlg__skizze" aria-label="Skizze Ihres Falls">
        <div className="skz">
          <div className="skz__kopf">
            <span>Skizze</span>
            <span>{skizze.titel || 'entsteht …'}</span>
          </div>

          {skizze.prozess && <p className="skz__prozess">{skizze.prozess}</p>}

          {skizze.schritte.length > 0 && (
            <ol className="skz__schritte">
              {skizze.schritte.map((s, i) => (
                <li key={i} className="skz__schritt">
                  <div className="skz__schritt-name">{s.name}</div>
                  <div className="skz__vergleich">
                    <div>
                      <span className="skz__tag">heute</span> {s.heute}
                    </div>
                    <div>
                      <span className="skz__tag skz__tag--neu">künftig</span> {s.kuenftig}
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          )}

          {(skizze.rollen.length > 0 ||
            skizze.systeme.length > 0 ||
            skizze.datenquellen.length > 0) && (
            <div className="skz__chips">
              {skizze.rollen.map((r) => (
                <span key={r} className="skz__chip">{r}</span>
              ))}
              {skizze.systeme.map((s) => (
                <span key={s} className="skz__chip skz__chip--system">{s}</span>
              ))}
              {skizze.datenquellen.map((d) => (
                <span key={d} className="skz__chip skz__chip--daten">{d}</span>
              ))}
            </div>
          )}

          {skizze.automatisierungsgrad > 0 && (
            <div className="skz__grad">
              <div className="skz__grad-beschriftung">
                <span>Automatisierbar</span>
                <span>{skizze.automatisierungsgrad} %</span>
              </div>
              <div
                className="skz__grad-balken"
                role="meter"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={skizze.automatisierungsgrad}
              >
                <div style={{ width: `${skizze.automatisierungsgrad}%` }} />
              </div>
            </div>
          )}

          {skizze.offenePunkte.length > 0 && (
            <div className="skz__offen">
              {skizze.offenePunkte.map((p) => (
                <div key={p}>◌ {p}</div>
              ))}
            </div>
          )}

          {skizze.schritte.length === 0 && !skizze.prozess && (
            <p className="skz__leer">
              Hier entsteht mit jeder Antwort das Bild Ihres Falls — Schritte,
              Beteiligte, Systeme.
            </p>
          )}
        </div>
      </aside>
    </div>
  );
}

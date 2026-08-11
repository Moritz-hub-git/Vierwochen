import { KATEGORIEN, spanneAlsText, UNVERBINDLICHKEIT } from '@/lib/pricing';

export default function Startseite() {
  return (
    <div className="sheet">
      <header className="masthead">
        <div className="masthead__mark">
          vierwochen<span>.</span>
        </div>
        <div className="masthead__meta">Individualsoftware · Mittelstand · Dortmund</div>
      </header>

      {/* ─── Kopfbereich ─────────────────────────────────────── */}
      <section className="hero">
        <div>
          <h1 className="hero__claim">In vier Wochen zum Ziel.</h1>
          <p className="hero__sub">
            Wir bauen die Software, die Ihr Betrieb wirklich braucht — zum Festpreis,
            integriert in Ihre bestehende IT.
          </p>

          <div
            className="dimension"
            role="img"
            aria-label="Bemaßung: vier Wochen vom Auftrag bis zur Abnahme"
          >
            <svg viewBox="0 0 420 54" xmlns="http://www.w3.org/2000/svg">
              <line className="dim-ext" x1="8" y1="6" x2="8" y2="34" />
              <line className="dim-ext" x1="412" y1="6" x2="412" y2="34" />
              <line className="dim-line" x1="8" y1="24" x2="412" y2="24" />
              <line className="dim-tick" x1="8" y1="18" x2="14" y2="30" />
              <line className="dim-tick" x1="412" y1="18" x2="406" y2="30" />
              <text className="dim-text" x="210" y="19" textAnchor="middle">
                4 WOCHEN
              </text>
              <text className="dim-end" x="8" y="48">
                AUFTRAG
              </text>
              <text className="dim-end" x="412" y="48" textAnchor="end">
                ABNAHME
              </text>
            </svg>
          </div>

          {/* Einstieg in den Projekt-Dialog. Die Dialogführung selbst
              folgt im nächsten Schritt — Feld und Zustand stehen bereits. */}
          <form className="entry" action="/dialog" method="get">
            <div className="entry__label">Ihr Fall in einem Satz</div>
            <div className="entry__field">
              <textarea
                className="entry__input"
                name="fall"
                rows={2}
                placeholder="Beschreiben Sie den Ablauf, der Sie am meisten Zeit kostet."
                aria-label="Beschreiben Sie den Ablauf, der Sie am meisten Zeit kostet"
              />
              <button className="btn btn--primary" type="submit">
                Einschätzung starten
              </button>
            </div>
            <p className="entry__hint">
              Ein kurzer Dialog, vier bis sechs Rückfragen, am Ende eine unverbindliche
              Preisspanne mit Zeitplan. Dauert etwa drei Minuten.
            </p>
          </form>
        </div>

        <div>
          <div className="plate">
            <div className="plate__head">
              <span>Leistungsschild</span>
              <span>Rev. 01</span>
            </div>
            <div>
              <div className="plate__row">
                <div className="plate__key">Lieferzeit</div>
                <div className="plate__val">
                  <b>4 Wochen</b> vom Auftrag bis zur Abnahme
                </div>
              </div>
              <div className="plate__row">
                <div className="plate__key">Preis</div>
                <div className="plate__val">
                  <b>Festpreis</b>, vor dem ersten Handgriff vereinbart
                </div>
              </div>
              <div className="plate__row">
                <div className="plate__key">Garantie</div>
                <div className="plate__val">
                  Läuft es nach vier Wochen nicht, <b>zahlen Sie nichts</b>
                </div>
              </div>
              <div className="plate__row">
                <div className="plate__key">Gewährleistung</div>
                <div className="plate__val">
                  <b>12 Monate</b> auf das Gewerk
                </div>
              </div>
              <div className="plate__row">
                <div className="plate__key">Eigentum</div>
                <div className="plate__val">
                  Code, Daten und Zugänge <b>gehören Ihnen</b>
                </div>
              </div>
              <div className="plate__row">
                <div className="plate__key">Betrieb</div>
                <div className="plate__val">ab 990 €/Monat, monatlich kündbar</div>
              </div>
              <div className="plate__row">
                <div className="plate__key">Kapazität</div>
                <div className="plate__val">
                  <b>2 Projektplätze</b> je Monat — mehr nehme ich nicht an
                </div>
              </div>
            </div>
          </div>

          <div className="actions">
            <a className="btn btn--ghost" href="#preise">
              Preise ansehen
            </a>
          </div>
        </div>
      </section>

      {/* ─── Warum das geht ──────────────────────────────────── */}
      <section className="band">
        <div className="band__inner">
          <div className="pos">A</div>
          <div className="stack">
            <div>
              <div className="label">Warum vier Wochen reichen</div>
              <h2>Agentisches Coding ist kein Werbewort, sondern die Methode.</h2>
            </div>
            <p className="prose">
              Software entsteht hier nicht mehr Zeile für Zeile. Ich beschreibe das Ziel,
              KI-Agenten bauen, testen und integrieren — ich prüfe, korrigiere und
              verantworte das Ergebnis. Das verschiebt den Aufwand weg vom Tippen hin zum
              Verstehen Ihres Prozesses, und genau dort entscheidet sich, ob Software
              nützt. <strong>Der Preisvorteil ist eine Folge davon, nicht der Kern.</strong>
            </p>
            <p className="prose">
              Was dabei nicht wegfällt: Architektur, Datenschutz, Abnahme und der Mensch,
              der geradesteht. Deshalb steht auf jedem Angebot ein Name — meiner.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Fälle ───────────────────────────────────────────── */}
      <section className="band">
        <div className="band__inner">
          <div className="pos">B</div>
          <div className="stack">
            <div>
              <div className="label">Wofür Sie mich holen</div>
              <h2>Drei Sätze, die ich ständig höre.</h2>
            </div>

            <div className="cases">
              <div className="case">
                <div className="case__no">01</div>
                <div>
                  <p className="case__q">
                    „Der ganze Prozess hängt an einer Excel-Datei, die keiner mehr
                    anfassen will."
                  </p>
                  <p className="case__a">
                    Gewachsen über Jahre, drei Personen verstehen sie, eine davon geht
                    bald in Rente. Daraus wird eine richtige Datenbank mit sauberer
                    Oberfläche, Rechten und Auswertung — ohne dass Ihre Leute ihre
                    Arbeitsweise neu lernen müssen.
                  </p>
                </div>
              </div>

              <div className="case">
                <div className="case__no">02</div>
                <div>
                  <p className="case__q">
                    „Unser Serviceteam sortiert jeden Tag stundenlang Postfächer."
                  </p>
                  <p className="case__a">
                    Anfragen laufen in Sammelpostfächer und werden von Hand verteilt.
                    Künftig liest, klassifiziert und verteilt das System, legt den Vorgang
                    an und schreibt den Antwortentwurf. Ihre Mitarbeiterin prüft und
                    schickt ab — der Mensch entscheidet, immer.
                  </p>
                </div>
              </div>

              <div className="case">
                <div className="case__no">03</div>
                <div>
                  <p className="case__q">„Unser Reporting entsteht durch Copy-und-Paste."</p>
                  <p className="case__a">
                    Zahlen werden aus fünf Systemen zusammengetragen, in Folien gegossen
                    und sind am Tag der Sitzung schon veraltet. Danach: einmal erfassen,
                    Bericht auf Knopfdruck, immer aktueller Stand.
                  </p>
                </div>
              </div>
            </div>

            <p className="prose">
              Ihr Fall steht nicht dabei? Dann beschreiben Sie ihn oben.{' '}
              <strong>Und wenn dafür keine KI nötig ist, sage ich Ihnen das</strong> — sehr
              oft braucht es nur eine ordentliche Datenbank und einen aufgeräumten Prozess.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Ablauf ──────────────────────────────────────────── */}
      <section className="band">
        <div className="band__inner">
          <div className="pos">C</div>
          <div className="stack">
            <div>
              <div className="label">Ablauf</div>
              <h2>Vom ersten Satz bis zur Abnahme.</h2>
            </div>

            <div>
              {[
                {
                  no: '00',
                  name: 'Einschätzung',
                  meta: '3 Minuten · hier auf der Seite',
                  txt: 'Sie beschreiben den Fall, ein kurzer Dialog stellt Rückfragen. Am Ende steht eine unverbindliche Spanne und ein Zeitplan.',
                },
                {
                  no: '01',
                  name: 'Erstgespräch',
                  meta: '15 Minuten · kostenlos',
                  txt: 'Wir gehen den Fall durch. Ich sage Ihnen, ob ich ihn lösen kann — oder dass Sie mich nicht brauchen.',
                },
                {
                  no: '02',
                  name: 'Werkstück',
                  meta: 'optional · 2.500 €',
                  txt: 'Freitag erklären Sie mir das Problem, Montag klicken Sie durch eine erste Lösung. Beauftragen Sie danach, wird der Betrag verrechnet.',
                },
                {
                  no: '03',
                  name: 'Festangebot',
                  meta: 'eine Seite',
                  txt: 'Umfang, Abnahmekriterien, Preis, Termin. Was nicht auf dieser Seite steht, wird auch nicht gebaut — das schützt uns beide.',
                },
                {
                  no: '04',
                  name: 'Bau',
                  meta: '4 Wochen',
                  txt: 'Jede Woche sehen Sie den echten Stand im laufenden System. Keine Statusfolien, keine Ampeln, kein Lenkungskreis.',
                },
                {
                  no: '05',
                  name: 'Abnahme',
                  meta: 'gegen die vereinbarten Kriterien',
                  txt: 'Erfüllt die Software, was im Angebot steht, stelle ich die Rechnung. Erfüllt sie es nicht, stelle ich keine.',
                },
                {
                  no: '06',
                  name: 'Betrieb',
                  meta: 'ab 990 €/Monat',
                  txt: 'Hosting, Wartung, Weiterentwicklung, fester Ansprechpartner. Monatlich kündbar — Sie bleiben, weil es läuft, nicht wegen eines Vertrags.',
                },
              ].map((s) => (
                <div className="step" key={s.no}>
                  <div className="step__no">{s.no}</div>
                  <div className="step__name">
                    {s.name}
                    <em>{s.meta}</em>
                  </div>
                  <div className="step__txt">{s.txt}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Belege ──────────────────────────────────────────── */}
      <section className="band">
        <div className="band__inner">
          <div className="pos">D</div>
          <div className="stack">
            <div>
              <div className="label">Belege</div>
              <h2>Gebaut, gemessen, läuft.</h2>
            </div>

            <div className="show">
              <div className="show__karte">
                <div className="show__mass">&gt;32 h → ~6 h</div>
                <div className="show__titel">Reporting ohne Handarbeit</div>
                <p className="show__text">
                  Monatliches Berichtswesen: vorher Formulare, verstreute Quellen und
                  händisches Zusammenschreiben — danach eine Datenbank, automatische
                  Erinnerungen und KI-entworfene Berichtstexte, die ein Mensch freigibt.
                </p>
                <div className="show__quelle">SDAX-Industrieunternehmen · anonymisiert</div>
              </div>

              <div className="show__karte">
                <div className="show__mass">1 Team · täglich</div>
                <div className="show__titel">Postfach, das sich selbst sortiert</div>
                <p className="show__text">
                  Ein Sammelpostfach mit Kundenanfragen: Das System liest, ordnet zu,
                  legt den Vorgang an und entwirft die Antwort. Freigegeben wird von
                  Menschen — genutzt vom gesamten Serviceteam.
                </p>
                <div className="show__quelle">SDAX-Industrieunternehmen · anonymisiert</div>
              </div>

              <div className="show__karte">
                <div className="show__mass">3 Apps · im Store</div>
                <div className="show__titel">End-to-end, allein gebaut</div>
                <p className="show__text">
                  Drei eigene iOS-Apps, veröffentlicht im App Store — mit Backend,
                  Datenbank, KI-Anbindung, Datenschutz und Betrieb. Der Beweis, dass
                  hier jemand liefert und nicht nur berät.
                </p>
                <div className="show__quelle">eigene Produkte · öffentlich</div>
              </div>
            </div>

            <p className="prose">
              Aus laufenden Kundenprojekten zeige ich keine Interna — auch Ihre später
              nicht. Im Gespräch führe ich Ihnen stattdessen <strong>klickbare
              Nachbauten mit Beispieldaten</strong> vor.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Preise ──────────────────────────────────────────── */}
      <section className="band" id="preise">
        <div className="band__inner">
          <div className="pos">E</div>
          <div className="stack">
            <div>
              <div className="label">Preise</div>
              <h2>Stehen hier. Nicht im Angebotsgespräch.</h2>
            </div>

            <div className="pricewrap">
              <table>
                <thead>
                  <tr>
                    <th scope="col">Leistung</th>
                    <th scope="col">Preis</th>
                    <th scope="col">Was Sie bekommen</th>
                  </tr>
                </thead>
                <tbody>
                  {KATEGORIEN.map((k) => (
                    <tr key={k.id}>
                      <td>{k.name}</td>
                      <td className="amount">{spanneAlsText(k)}</td>
                      <td>{k.beschreibung}</td>
                    </tr>
                  ))}
                  <tr>
                    <td>Betrieb</td>
                    <td className="amount">ab 990 €/Mon.</td>
                    <td>
                      Hosting, Wartung, Weiterentwicklung, Support. Monatlich kündbar.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="note">{UNVERBINDLICHKEIT}</p>

            <p className="note">
              Zum Einordnen: Eine Sachbearbeitungsstelle kostet 45.000–60.000 € — pro
              Jahr, jedes Jahr. Ein Pilot kostet einmalig weniger als zwei Monatsgehälter
              davon und kündigt nie.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Manifest ────────────────────────────────────────── */}
      <section className="band">
        <div className="band__inner">
          <div className="pos">F</div>
          <div className="stack">
            <div>
              <div className="label">Wie ich arbeite</div>
              <h2>Fünf Sätze, an denen Sie mich messen können.</h2>
            </div>

            <div className="manifest">
              <ul>
                {[
                  'Sie bekommen von mir keine PowerPoint.',
                  'Die Preise stehen öffentlich auf dieser Seite.',
                  'Läuft es nach vier Wochen nicht, kostet es nichts.',
                  'Code, Daten und Zugänge gehören Ihnen — kein Lock-in.',
                  'Brauchen Sie keine KI, sage ich es Ihnen. Kostenlos.',
                ].map((satz, i) => (
                  <li key={satz}>
                    <span className="mark">{String(i + 1).padStart(2, '0')}</span>
                    <span>{satz}</span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="prose">
              Mein Maßstab ist Software, die <strong>ohne mich weiterläuft</strong>. Zu
              jedem Gewerk gehören Dokumentation, Übergabe und eine Einweisung Ihrer Leute.
              Wenn Sie irgendwann selbst übernehmen wollen, ist das der Plan — nicht der
              Notfall.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Wer baut ────────────────────────────────────────── */}
      <section className="band">
        <div className="band__inner">
          <div className="pos">G</div>
          <div className="stack">
            <div>
              <div className="label">Wer baut</div>
              <h2>Moritz Schumacher</h2>
            </div>

            <p className="prose">
              Ich komme nicht aus der Agenturwelt, sondern aus dem Betrieb: Vorstandsreferent
              und Programm-Manager in einem börsennotierten Industrieunternehmen, zuletzt
              verantwortlich dafür, KI-Anwendungsfälle zu finden und produktiv zu stellen.
              Ich weiß deshalb, wie ein Angebotsprozess wirklich läuft, warum eine Abteilung
              an ihrer Excel hängt und was passiert, wenn Software an der Realität vorbei
              gebaut wird. <strong>Ich rede nicht über KI, ich liefere damit.</strong>
            </p>

            <div>
              {[
                {
                  num: '>32 h → ~6 h',
                  txt: 'Aufwand pro Reporting-Zyklus nach der Digitalisierung des Prozesses (SDAX-Industrieunternehmen)',
                },
                {
                  num: '~30 / 2',
                  txt: 'KI-Anwendungsfälle mit den Fachbereichen identifiziert, davon zwei im Produktivbetrieb',
                },
                {
                  num: '3',
                  txt: 'eigene iOS-Apps im App Store veröffentlicht — inklusive Backend, Datenbank und Betrieb',
                },
                {
                  num: '100 %',
                  txt: 'eines der gebauten Werkzeuge läuft nach meinem Wechsel unverändert weiter — ohne mich',
                },
              ].map((f) => (
                <div className="fact" key={f.num}>
                  <div className="fact__num">{f.num}</div>
                  <div className="fact__txt">{f.txt}</div>
                </div>
              ))}
            </div>

            <p className="limit">
              <strong>Wofür ich nicht der Richtige bin:</strong> sicherheitskritische
              Steuerungen, Medizintechnik, der Betrieb hochverfügbarer Rechenzentren. Dafür
              hole ich Spezialisten dazu — oder sage Ihnen ab. Interna meiner Kunden
              bekommen Sie bei mir übrigens nie zu sehen. Ihre sieht später auch niemand.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Abschluss ───────────────────────────────────────── */}
      <section className="close" id="kontakt">
        <div className="label">Nächster Schritt</div>
        <h2>Erzählen Sie mir Ihren Fall.</h2>
        <p className="prose">
          Drei Minuten Dialog, danach wissen Sie, was Ihr Vorhaben ungefähr kostet und wie
          lange es dauert. Wenn es passt, buchen Sie direkt einen Termin.
        </p>
        <div className="actions">
          <a className="btn btn--primary" href="#top">
            Einschätzung starten
          </a>
        </div>
      </section>

      <footer>
        <div>vierwochen — Individualsoftware für den Mittelstand</div>
        <div>
          <a href="/impressum">Impressum</a> · <a href="/datenschutz">Datenschutz</a> · <a href="/agb">AGB</a>
        </div>
      </footer>
    </div>
  );
}

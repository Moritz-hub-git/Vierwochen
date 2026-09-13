"use client";

import Link from "next/link";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import Booking from "@/components/chat/Booking";
import { Chips, MultiChips, Stepper } from "@/components/chat/Controls";
import type { DialogTurn, Sketch, UiMessage } from "@/components/chat/types";
import { captureAttribution, track } from "@/lib/track";
import styles from "./live-concept.module.css";

const MAX_CHARS = 1500;

const EXAMPLES = {
  einkauf: {
    label: "Einkauf",
    title: "Lieferantenbestätigungen prüfen",
    source: "E-Mail · PDF · Bestellung",
    rows: [
      ["AB-2048", "Preisabweichung", "+ 2,4 %"],
      ["AB-2047", "Geprüft", "Ohne Befund"],
      ["AB-2046", "Liefertermin", "+ 4 Tage"],
    ],
    decision: "2 Abweichungen brauchen eine Entscheidung",
  },
  reporting: {
    label: "Reporting",
    title: "Managementbericht vorbereiten",
    source: "3 Excel-Dateien · Vormonat",
    rows: [
      ["Umsatz DACH", "Geprüft", "1.248.400 €"],
      ["Marge", "Plausibilisieren", "28,7 %"],
      ["Forecast", "Freigabe offen", "Q4"],
    ],
    decision: "Berichtsvorschau wartet auf Freigabe",
  },
  reklamation: {
    label: "Reklamationen",
    title: "Reklamationen bearbeiten",
    source: "E-Mail · Fotos · Lieferschein",
    rows: [
      ["R-1083", "Nachweise vollständig", "Priorität hoch"],
      ["R-1082", "Antwort vorbereitet", "Prüfung offen"],
      ["R-1081", "Rückfrage", "Beleg fehlt"],
    ],
    decision: "1 Antwort braucht eine fachliche Freigabe",
  },
} as const;

type ExampleKey = keyof typeof EXAMPLES;

function mark(automation: Sketch["steps"][number]["automation"]) {
  if (automation === "automatisch") return "Automatisch";
  if (automation === "teilautomatisch") return "Mit Prüfung";
  return "Entscheidung durch Ihr Team";
}

export default function LiveConcept() {
  const dialogId = useRef("");
  const history = useRef<UiMessage[]>([]);
  const pending = useRef(false);
  const abort = useRef<AbortController | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const conversationEnd = useRef<HTMLDivElement>(null);
  const [example, setExample] = useState<ExampleKey>("einkauf");
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<UiMessage[]>([]);
  const [turn, setTurn] = useState<DialogTurn | null>(null);
  const [solution, setSolution] = useState<DialogTurn | null>(null);
  const [busy, setBusy] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [booked, setBooked] = useState(false);
  const started = messages.length > 0;

  useEffect(() => {
    captureAttribution();
    return () => abort.current?.abort();
  }, []);

  const updateMessages = (next: UiMessage[]) => {
    history.current = next;
    setMessages(next);
  };

  const send = async (text: string, retry = false) => {
    const value = text.trim().slice(0, MAX_CHARS);
    if (!value || pending.current) return;
    if (!dialogId.current) dialogId.current = crypto.randomUUID();
    const clean = history.current.filter((message) => !message.error);
    if (retry && clean.at(-1)?.role === "user") clean.pop();
    const next: UiMessage[] = [...clean, { role: "user", display: value }];
    updateMessages(next);
    setDraft("");
    setBusy(true);
    setTurn(null);
    pending.current = true;
    track(clean.length ? "dialog_question" : "dialog_started", {
      dialogId: dialogId.current,
      meta: { turn: next.filter((message) => message.role === "user").length },
    });

    const controller = new AbortController();
    abort.current = controller;
    const timer = window.setTimeout(() => controller.abort(), 45_000);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        signal: controller.signal,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          dialogId: dialogId.current,
          messages: next.map((message) => ({
            role: message.role,
            content: message.raw ?? message.display,
          })),
        }),
      });
      const data = (await response.json()) as {
        ok?: boolean;
        turn?: DialogTurn;
        error?: string;
      };
      if (!response.ok || !data.ok || !data.turn) {
        throw new Error(
          data.error || "Die Einschätzung ist gerade nicht erreichbar.",
        );
      }
      const answer = data.turn;
      updateMessages([
        ...next,
        {
          role: "assistant",
          display: answer.reply,
          raw: JSON.stringify(answer),
        },
      ]);
      setTurn(answer);
      if (answer.sketch.steps.length) setSolution(answer);
      if (answer.result) {
        track("result_delivered", { dialogId: dialogId.current });
        requestAnimationFrame(() =>
          resultRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          }),
        );
      } else if (window.matchMedia("(max-width: 850px)").matches) {
        requestAnimationFrame(() =>
          conversationEnd.current?.scrollIntoView({
            behavior: "smooth",
            block: "center",
          }),
        );
      }
    } catch (error) {
      updateMessages([
        ...next,
        {
          role: "assistant",
          display: controller.signal.aborted
            ? "Die Antwort dauert gerade zu lange. Ihr Text bleibt erhalten."
            : error instanceof Error
              ? error.message
              : "Keine Verbindung. Bitte versuchen Sie es erneut.",
          error: true,
        },
      ]);
    } finally {
      window.clearTimeout(timer);
      pending.current = false;
      setBusy(false);
      abort.current = null;
    }
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    void send(draft);
  };

  const questions = messages.filter((message) => {
    try {
      return JSON.parse(message.raw || "{}").phase === "question";
    } catch {
      return false;
    }
  }).length;
  const lastError = messages.at(-1)?.error;
  const active = EXAMPLES[example];
  const sketch = solution?.sketch;
  const summary = useMemo(
    () =>
      [
        sketch?.title,
        messages.find((message) => message.role === "user")?.display,
      ]
        .filter(Boolean)
        .join(" — "),
    [messages, sketch?.title],
  );

  return (
    <div className={styles.page}>
      <a className={styles.skip} href="#main">
        Zum Inhalt
      </a>
      <header className={styles.header}>
        <Link href="/" className={styles.logo} aria-label="OpsDone Startseite">
          <span aria-hidden="true">✦</span> OpsDone<i>.</i>
        </Link>
        <nav aria-label="Seitennavigation">
          <a href="#so-funktionierts">So funktioniert es</a>
          <a href="#zusammenarbeit">Zusammenarbeit</a>
          <a href="#fragen">Fragen</a>
          <a className={styles.headerCta} href="#entwurf">
            Prozess beschreiben
          </a>
        </nav>
      </header>

      <main id="main">
        <section className={styles.hero} id="entwurf">
          <div className={styles.heroCopy}>
            <p className={styles.kicker}>
              <span /> Individuelle Anwendungen für Ihre Abläufe
            </p>
            <h1>Work eliminated.</h1>
            <p className={styles.claim}>
              Geben Sie uns Ihren Prozess.
              <br />
              Wir bauen die Software, die ihn erledigt.
            </p>
          </div>

          <div className={styles.workspace}>
            <section className={styles.intake} aria-labelledby="intake-title">
              <div className={styles.panelHead}>
                <span>01</span>
                <div>
                  <small>IHR PROZESS</small>
                  <h2 id="intake-title">Beschreiben Sie Ihre Arbeit.</h2>
                </div>
              </div>

              {!started ? (
                <div className={styles.start}>
                  <label htmlFor="process-description">
                    Welche Arbeit soll bei Ihnen verschwinden?
                  </label>
                  <p>
                    Beschreiben Sie einen wiederkehrenden Ablauf. Konkrete
                    Stichpunkte reichen.
                  </p>
                  <form onSubmit={onSubmit} className={styles.firstForm}>
                    <textarea
                      id="process-description"
                      value={draft}
                      onChange={(event) => setDraft(event.target.value)}
                      maxLength={MAX_CHARS}
                      rows={6}
                      placeholder="Zum Beispiel: Wir vergleichen jeden Monat mehrere Excel-Dateien und bauen daraus unseren Managementbericht."
                    />
                    <div>
                      <span>
                        {draft.length} / {MAX_CHARS}
                      </span>
                      <button disabled={busy || !draft.trim()}>
                        Entwurf starten <b>↗</b>
                      </button>
                    </div>
                  </form>
                  <div className={styles.starters}>
                    <span>Oder mit einem Beispiel beginnen</span>
                    <button
                      onClick={() =>
                        void send(
                          "Wir gleichen Auftragsbestätigungen manuell mit Bestellungen ab.",
                        )
                      }
                    >
                      Auftragsbestätigungen prüfen
                    </button>
                    <button
                      onClick={() =>
                        void send(
                          "Wir vergleichen jeden Monat mehrere Excel-Dateien und bauen daraus unseren Managementbericht.",
                        )
                      }
                    >
                      Managementbericht erstellen
                    </button>
                    <button
                      onClick={() =>
                        void send(
                          "Wir bearbeiten Reklamationen aus E-Mails, Fotos und Lieferscheinen manuell.",
                        )
                      }
                    >
                      Reklamationen bearbeiten
                    </button>
                  </div>
                </div>
              ) : (
                <div className={styles.conversation}>
                  <div
                    className={styles.messages}
                    role="log"
                    aria-live="polite"
                  >
                    {messages.map((message, index) => (
                      <div
                        key={index}
                        className={`${styles.message} ${message.role === "user" ? styles.user : styles.assistant} ${message.error ? styles.error : ""}`}
                      >
                        <small>
                          {message.role === "user" ? "SIE" : "OPSDONE"}
                        </small>
                        <p>{message.display}</p>
                      </div>
                    ))}
                    {busy && (
                      <p className={styles.thinking} role="status">
                        <span />
                        <span />
                        <span /> Prozess wird eingeordnet …
                      </p>
                    )}
                  </div>

                  {!busy && turn?.input && !turn.result && (
                    <div className={styles.controls}>
                      {turn.input.kind === "chips" && (
                        <Chips
                          options={turn.input.options || []}
                          onPick={(value) => void send(value)}
                        />
                      )}
                      {turn.input.kind === "multichips" && (
                        <MultiChips
                          options={turn.input.options || []}
                          onSubmit={(value) => void send(value)}
                        />
                      )}
                      {turn.input.kind === "number" && (
                        <Stepper
                          input={turn.input}
                          onSubmit={(value) => void send(value)}
                        />
                      )}
                    </div>
                  )}

                  {sketch && !turn?.result && (
                    <a
                      className={styles.mobilePreviewLink}
                      href="#preview-title"
                    >
                      <span>Entwurf aktualisiert</span>
                      <b>{sketch.title}</b>
                      <i aria-hidden="true">↓</i>
                    </a>
                  )}

                  {lastError && !busy && (
                    <div className={styles.errorActions}>
                      <button
                        className={styles.retry}
                        onClick={() =>
                          void send(
                            messages
                              .filter((message) => message.role === "user")
                              .at(-1)?.display || "",
                            true,
                          )
                        }
                      >
                        Erneut versuchen
                      </button>
                      <button
                        className={styles.directBooking}
                        onClick={() => setBookingOpen(true)}
                      >
                        Direkt zum Termin
                      </button>
                    </div>
                  )}

                  <div ref={conversationEnd} />

                  {!turn?.result && (
                    <form onSubmit={onSubmit} className={styles.composer}>
                      <label htmlFor="process-answer">Ihre Antwort</label>
                      <div>
                        <textarea
                          id="process-answer"
                          rows={2}
                          value={draft}
                          maxLength={MAX_CHARS}
                          onChange={(event) => setDraft(event.target.value)}
                          placeholder="In eigenen Worten antworten …"
                        />
                        <button
                          disabled={busy || !draft.trim()}
                          aria-label="Antwort senden"
                        >
                          ↑
                        </button>
                      </div>
                      <small>
                        {questions
                          ? `Rückfrage ${Math.min(questions, 3)} von höchstens 3 · `
                          : ""}
                        Bitte keine vertraulichen Daten eingeben.
                      </small>
                    </form>
                  )}
                </div>
              )}
            </section>

            <section
              className={styles.preview}
              aria-labelledby="preview-title"
              ref={resultRef}
            >
              <div className={styles.panelHead}>
                <span>02</span>
                <div>
                  <small>IHRE SOFTWARE</small>
                  <h2 id="preview-title">So könnte Ihre Lösung aussehen.</h2>
                </div>
              </div>
              <div className={styles.disclaimer}>
                <span>Vorläufiges Lösungskonzept</span> Noch keine fertige
                Anwendung.
              </div>

              {!sketch ? (
                <div className={styles.exampleArea}>
                  <div
                    className={styles.exampleTabs}
                    role="tablist"
                    aria-label="Beispielanwendungen"
                  >
                    {(Object.keys(EXAMPLES) as ExampleKey[]).map((key) => (
                      <button
                        key={key}
                        role="tab"
                        aria-selected={example === key}
                        onClick={() => setExample(key)}
                      >
                        {EXAMPLES[key].label}
                      </button>
                    ))}
                  </div>
                  <p className={styles.exampleLabel}>BEISPIELANWENDUNG</p>
                  <div className={styles.productShell}>
                    <div className={styles.productTop}>
                      <div>
                        <span className={styles.productMark}>O</span>
                        <b>{active.title}</b>
                      </div>
                      <span className={styles.live}>
                        <i /> Vorgänge
                      </span>
                    </div>
                    <div className={styles.productMeta}>
                      <span>Datenquellen</span>
                      <b>{active.source}</b>
                    </div>
                    <div className={styles.productRows}>
                      {active.rows.map((row) => (
                        <div key={row[0]}>
                          <b>{row[0]}</b>
                          <span>{row[1]}</span>
                          <em>{row[2]}</em>
                        </div>
                      ))}
                    </div>
                    <div className={styles.decision}>
                      <span>!</span>
                      <div>
                        <small>ENTSCHEIDUNG</small>
                        <b>{active.decision}</b>
                      </div>
                      <span className={styles.openLabel}>Ansicht</span>
                    </div>
                  </div>
                  <p className={styles.exampleNote}>
                    Drei Beispiele dafür, wie unterschiedlich eine Anwendung
                    aussehen kann. Ihr Entwurf richtet sich nach Ihrem Prozess.
                  </p>
                </div>
              ) : (
                <div className={styles.brief}>
                  <p className={styles.briefKicker}>
                    {turn?.result
                      ? "ERSTER LÖSUNGSENTWURF"
                      : "ENTWURF ENTSTEHT"}
                  </p>
                  <h3>{sketch.title}</h3>
                  <p className={styles.origin}>
                    Aus Ihren Angaben abgeleitet. Noch nicht persönlich geprüft.
                  </p>
                  <div className={styles.flow}>
                    {sketch.steps.map((step, index) => (
                      <div key={`${step.label}-${index}`}>
                        <span>{String(index + 1).padStart(2, "0")}</span>
                        <b>{step.label}</b>
                        <em data-kind={step.automation}>
                          {mark(step.automation)}
                        </em>
                      </div>
                    ))}
                  </div>
                  <div className={styles.briefGrid}>
                    <article>
                      <small>GEWÜNSCHTES ERGEBNIS</small>
                      {sketch.value.length ? (
                        sketch.value.map((item) => <p key={item}>{item}</p>)
                      ) : (
                        <p>Wird im Gespräch konkretisiert.</p>
                      )}
                    </article>
                    <article>
                      <small>ANNAHMEN ZU DATEN UND ABLAUF</small>
                      <p>Datenzugänge klären wir im Gespräch.</p>
                      {sketch.assumptions.length ? (
                        sketch.assumptions.map((item) => (
                          <p key={item}>{item}</p>
                        ))
                      ) : (
                        <p>Datenquellen werden gemeinsam geklärt.</p>
                      )}
                    </article>
                    <article>
                      <small>MÖGLICHE AUTOMATISIERUNG</small>
                      {sketch.steps
                        .filter((step) => step.automation !== "manuell")
                        .map((item) => (
                          <p key={item.label}>{item.label}</p>
                        ))}
                    </article>
                    <article>
                      <small>MENSCHLICHE ENTSCHEIDUNGEN</small>
                      {sketch.steps
                        .filter((step) => step.automation !== "automatisch")
                        .map((item) => (
                          <p key={item.label}>{item.label}</p>
                        ))}
                    </article>
                  </div>
                  <article className={styles.openQuestions}>
                    <small>OFFENE INTEGRATIONS- UND PROZESSFRAGEN</small>
                    {sketch.open.map((item) => (
                      <p key={item}>{item}</p>
                    ))}
                  </article>
                  {turn?.result && !booked && (
                    <button
                      className={styles.bookButton}
                      onClick={() => {
                        setBookingOpen(true);
                        track("booking_opened", { dialogId: dialogId.current });
                      }}
                    >
                      Entwurf gemeinsam prüfen <span>↗</span>
                    </button>
                  )}
                  {booked && (
                    <p className={styles.booked}>
                      ✓ Details zu Ihrem nächsten Schritt finden Sie unten.
                    </p>
                  )}
                </div>
              )}
            </section>
          </div>
          <p className={styles.privacy}>
            Ersteinschätzung ohne E-Mail-Adresse · Kontaktdaten erst bei einer
            Terminwahl · <Link href="/datenschutz">Datenschutz</Link>
          </p>
        </section>

        {bookingOpen && (
          <section
            className={styles.bookingSection}
            aria-label="Termin vereinbaren"
          >
            {!booked && (
              <button
                className={styles.bookingClose}
                onClick={() => setBookingOpen(false)}
                aria-label="Terminbereich schließen"
              >
                ×
              </button>
            )}
            <Booking
              dialogId={dialogId.current}
              caseSummary={summary}
              suggestedAgenda={sketch?.open[0]}
              onBooked={() => setBooked(true)}
            />
          </section>
        )}

        <section className={styles.explainer} id="so-funktionierts">
          <p className={styles.sectionKicker}>VOM PROZESS ZUM BETRIEB</p>
          <h2>Software, die sich an Ihre Arbeit anpasst.</h2>
          <div className={styles.steps}>
            <article>
              <span>01</span>
              <h3>Prozess verstehen</h3>
              <p>
                Wir erfassen Eingänge, Regeln, Sonderfälle und das Ergebnis, das
                Ihr Team wirklich braucht.
              </p>
            </article>
            <article>
              <span>02</span>
              <h3>Pilot bauen</h3>
              <p>
                Ein klar begrenzter Ablauf wird zur nutzbaren Anwendung – mit
                echten Prüfregeln und sichtbaren Entscheidungen.
              </p>
            </article>
            <article>
              <span>03</span>
              <h3>Sicher betreiben</h3>
              <p>
                Standardfälle laufen verlässlich. Unsicherheit bleibt sichtbar
                und wird an die richtigen Menschen gegeben.
              </p>
            </article>
          </div>
        </section>

        <section className={styles.principles} id="zusammenarbeit">
          <div>
            <p className={styles.sectionKicker}>DAS PRODUKTVERSPRECHEN</p>
            <h2>
              Ihre Systeme bleiben.
              <br />
              Die Handarbeit dazwischen geht.
            </h2>
          </div>
          <div className={styles.principleList}>
            <article>
              <b>Individuell gebaut</b>
              <p>
                Ihre Regeln, Verantwortlichen und Daten bestimmen die Anwendung.
              </p>
            </article>
            <article>
              <b>Entscheidungen bleiben menschlich</b>
              <p>
                Die Software bereitet vor, dokumentiert und eskaliert, wo Urteil
                gefragt ist.
              </p>
            </article>
            <article>
              <b>Verantwortlich betrieben</b>
              <p>
                OpsDone entwickelt, überwacht und verbessert den vereinbarten
                Prozess.
              </p>
            </article>
          </div>
        </section>

        <section className={styles.faq} id="fragen">
          <p className={styles.sectionKicker}>HÄUFIGE FRAGEN</p>
          <h2>Was Sie vor dem ersten Gespräch wissen sollten.</h2>
          <details>
            <summary>
              Entsteht hier schon meine fertige Software?<span>+</span>
            </summary>
            <p>
              Nein. Der interaktive Entwurf macht Anforderungen und eine
              mögliche Lösung konkret. Integrationen, Regeln und Machbarkeit
              prüfen wir anschließend gemeinsam.
            </p>
          </details>
          <details>
            <summary>
              Müssen wir bestehende Systeme ersetzen?<span>+</span>
            </summary>
            <p>
              In der Regel nicht. Die Anwendung wird für den vereinbarten
              Prozess entwickelt und arbeitet mit den vorhandenen Systemen,
              soweit geeignete Zugänge verfügbar sind.
            </p>
          </details>
          <details>
            <summary>
              Was passiert mit Sonderfällen?<span>+</span>
            </summary>
            <p>
              Sie werden sichtbar gemacht und mit dem nötigen Kontext an die
              verantwortliche Person gegeben. Entscheidungen werden nicht hinter
              einer grünen Statusanzeige versteckt.
            </p>
          </details>
          <details>
            <summary>
              Wie beginnt die Zusammenarbeit?<span>+</span>
            </summary>
            <p>
              Mit einem begrenzten Pilot für einen klar beschriebenen Prozess.
              Umfang, Datenzugänge, Freigaben und Betrieb werden vor der
              Umsetzung gemeinsam festgelegt.
            </p>
          </details>
        </section>
      </main>

      <footer className={styles.footer}>
        <div>
          <Link href="/" className={styles.logo}>
            <span aria-hidden="true">✦</span> OpsDone<i>.</i>
          </Link>
          <p>Work eliminated.</p>
        </div>
        <div>
          <Link href="/impressum">Impressum</Link>
          <Link href="/datenschutz">Datenschutz</Link>
          <Link href="/agb">Vertragsgrundlagen</Link>
        </div>
        <small>© {new Date().getFullYear()} OpsDone</small>
      </footer>
    </div>
  );
}

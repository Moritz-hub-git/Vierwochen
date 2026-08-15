"use client";

import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { track } from "@/lib/track";
import Booking from "./Booking";
import { Chips, MultiChips, Stepper } from "./Controls";
import EmailGate from "./EmailGate";
import SolutionCard from "./SolutionCard";
import type { DialogInput, DialogResult, DialogTurn, Sketch, UiMessage } from "./types";

/**
 * Die Dialogleiste ist die EINZIGE herausgehobene Call-to-Action der Seite
 * (Rücksprache 2026-08-14, Vorbild: brunellocucinelli.ai): groß, frei über dem
 * Inhalt schwebend, mit getipptem Ziel-Banner. Beim Absenden übernimmt der
 * Dialog den ganzen Bildschirm.
 *
 * Offenlegung (EU-KI-VO Art. 50): Es antwortet erkennbar eine KI — als
 * Produktbeweis gerahmt, denn dieser Dialog ist selbst Individualsoftware.
 */

/** Ziel-Banner: läuft zweimal durch, bevor die Beispiel-Fälle rotieren. */
const BANNER = [
  "Welches Ziel wollen Sie erreichen?",
  "In 60 Sekunden: Lösungsskizze, Zeitplan & Preisschätzung.",
];

/** Beispiel-Fälle: werden getippt, gehalten, gelöscht — Inspiration im Takt. */
const EXAMPLES = [
  "Unser Angebotsprozess lebt in drei Excel-Listen …",
  "Bestellungen kommen als PDF ins Sammelpostfach …",
  "Der Monatsbericht entsteht per Copy-Paste aus fünf Systemen …",
  "Wir tippen jeden Lieferschein zweimal ab …",
  "Die Urlaubsplanung läuft über eine Wandtafel …",
];

/** Einstiegsbeispiele im geöffneten Dialog: Wer nicht formulieren muss, fängt eher an. */
const STARTERS = [
  "Wir pflegen Artikel in mehreren Excel-Listen und tippen alles doppelt ein.",
  "Bestellungen kommen ins Sammelpostfach und gehen dort unter.",
  "Unser Monatsreporting entsteht per Copy-Paste aus mehreren Systemen.",
];

/** Vorschläge, die beim Anklicken der Dialogleiste aufsteigen. Der Chip
 *  bleibt kurz genug zum Überfliegen, übergeben wird der ganze Satz —
 *  damit der Berater sofort etwas Greifbares zu lesen hat. */
const DOCK_HINTS = [
  {
    label: "Daten in Excel-Listen",
    text: "Wir pflegen unsere Daten in mehreren Excel-Listen und tippen vieles doppelt ein.",
  },
  {
    label: "Bestellungen im Postfach",
    text: "Bestellungen kommen als PDF ins Sammelpostfach und gehen dort unter.",
  },
  {
    label: "Planung per Zuruf",
    text: "Unsere Einsatz- und Schichtplanung läuft über Zuruf, Zettel und Anrufe.",
  },
  {
    label: "Angebote dauern zu lang",
    text: "Ein Angebot zu kalkulieren dauert bei uns Tage, weil alles Handarbeit ist.",
  },
  {
    label: "Kunden fragen Status ab",
    text: "Kunden rufen bei uns an, um den Stand ihrer Bestellung zu erfahren.",
  },
];

const MAX_CHARS = 1500;
const MAX_QUESTIONS = 3;

// Fortschritt startet mit Guthaben (Endowed Progress) und ist dynamisch:
// Er nähert sich mit jeder beantworteten Frage, voll erst beim Ergebnis.
const PROGRESS_BASELINE = 0.15;
const PROGRESS_CAP = 0.9;

// Laborillusion: benannte Arbeitsschritte statt stummer Punkte.
const BUSY_LABELS = [
  "Liest Ihre Angabe …",
  "Gleicht mit typischen Fällen ab …",
  "Skizze wird ergänzt …",
];

function SparkIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2c.4 3.9 1.6 6.5 3.5 8.4C17.4 12.3 20 13.5 24 14c-4 .4-6.6 1.6-8.5 3.5-1.9 1.9-3.1 4.5-3.5 8.5-.4-4-1.6-6.6-3.5-8.5C6.6 15.6 4 14.4 0 14c4-.5 6.6-1.7 8.5-3.6C10.4 8.5 11.6 5.9 12 2Z" />
    </svg>
  );
}

function Avatar() {
  return (
    <span className="avatar" aria-hidden>
      <SparkIcon size={15} />
    </span>
  );
}

/** Getipptes Placeholder: Banner zweimal, danach Beispiele im Loop. */
function useTypewriter(active: boolean) {
  const [text, setText] = useState("");
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  useEffect(() => {
    if (!active || reduced) return;
    const sequence = [...BANNER, ...BANNER];
    let seqIdx = 0;
    let charIdx = 0;
    let deleting = false;
    let timer: ReturnType<typeof setTimeout>;

    const current = () =>
      seqIdx < sequence.length
        ? sequence[seqIdx]
        : EXAMPLES[(seqIdx - sequence.length) % EXAMPLES.length];

    const tick = () => {
      const full = current();
      if (!deleting) {
        charIdx += 1;
        setText(full.slice(0, charIdx));
        if (charIdx >= full.length) {
          deleting = true;
          timer = setTimeout(tick, seqIdx < sequence.length ? 2100 : 2400);
        } else {
          timer = setTimeout(tick, 32);
        }
      } else {
        charIdx -= 2;
        setText(full.slice(0, Math.max(0, charIdx)));
        if (charIdx <= 0) {
          deleting = false;
          charIdx = 0;
          seqIdx += 1;
          timer = setTimeout(tick, 350);
        } else {
          timer = setTimeout(tick, 14);
        }
      }
    };

    timer = setTimeout(tick, 500);
    return () => clearTimeout(timer);
  }, [active, reduced]);

  return { text: reduced ? BANNER[0] : text, reduced };
}

export default function ChatDock() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<UiMessage[]>([]);
  const [sketch, setSketch] = useState<Sketch | null>(null);
  const [result, setResult] = useState<DialogResult | null>(null);
  const [phase, setPhase] = useState<"question" | "result" | "reject">("question");
  const [input, setInput] = useState<DialogInput | null>(null);
  const [busy, setBusy] = useState(false);
  const [revealing, setRevealing] = useState(false);
  const [booked, setBooked] = useState(false);
  const [draft, setDraft] = useState("");
  const [dockDraft, setDockDraft] = useState("");
  const [dockFocused, setDockFocused] = useState(false);
  const [busyLabelIdx, setBusyLabelIdx] = useState(0);

  const dialogIdRef = useRef<string>("");
  const endRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesRef = useRef<UiMessage[]>([]);
  const sketchRef = useRef<Sketch | null>(null);
  messagesRef.current = messages;
  sketchRef.current = sketch;

  // Auf der Direktbuchung und der IT-Faktenseite schwebt keine Dialogleiste:
  // Dort soll nichts vom eigentlichen Zweck der Seite ablenken oder das
  // Formular überlappen. Der Dialog bleibt über den Kopfzeilen-Knopf erreichbar.
  const pathname = usePathname();
  const dockSuppressed = pathname === "/termin" || pathname === "/it";

  const { text: typed } = useTypewriter(!open && !dockSuppressed);

  if (!dialogIdRef.current && typeof window !== "undefined") {
    dialogIdRef.current =
      typeof crypto.randomUUID === "function"
        ? crypto.randomUUID()
        : `d-${Date.now()}-${Math.floor(Math.random() * 1e9)}`;
  }

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, busy, revealing, result]);

  useEffect(() => {
    if (!busy) {
      setBusyLabelIdx(0);
      return;
    }
    const timer = setInterval(
      () => setBusyLabelIdx((i) => Math.min(i + 1, BUSY_LABELS.length - 1)),
      900
    );
    return () => clearInterval(timer);
  }, [busy]);

  const askedCount = messages.filter((m) => m.role === "assistant" && !m.error).length;

  const send = useCallback(
    async (text: string) => {
      const trimmed = text.trim().slice(0, MAX_CHARS);
      if (!trimmed || busy) return;

      setInput(null);
      const history = messagesRef.current.filter((m) => !m.error);
      const nextMessages: UiMessage[] = [...history, { role: "user", display: trimmed }];
      // Trichter: Die erste eigene Antwort ist die Stufe, an der aus einem
      // Besucher ein Interessent wird — sie zählt gesondert.
      track(history.length === 0 ? "dialog_started" : "dialog_question", {
        dialogId: dialogIdRef.current,
        meta: { turn: history.filter((m) => m.role === "user").length + 1 },
      });
      setMessages(nextMessages);
      setBusy(true);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            dialogId: dialogIdRef.current,
            messages: nextMessages.map((m) => ({
              role: m.role,
              content: m.role === "assistant" ? (m.raw ?? m.display) : m.display,
            })),
          }),
        });
        const data = (await res.json()) as { ok: boolean; turn?: DialogTurn; error?: string };
        if (data.ok && data.turn) {
          const turn = data.turn;
          const grew = turn.sketch && turn.sketch.steps.length > 0;
          const isResult = turn.phase === "result" && Boolean(turn.result);
          const pushTurn = () => {
            setMessages((prev) => [
              ...prev,
              {
                role: "assistant",
                display: turn.reply,
                raw: JSON.stringify(turn),
                sketch: grew ? turn.sketch : undefined,
                prevSketch: sketchRef.current,
                result: isResult ? turn.result : undefined,
              },
            ]);
            if (grew) setSketch(turn.sketch);
            setPhase(turn.phase);
            setInput(turn.input ?? null);
            if (isResult && turn.result) setResult(turn.result);
            setRevealing(false);
          };
          if (isResult && turn.result) {
            track("result_delivered", {
              dialogId: dialogIdRef.current,
              meta: {
                tier: turn.result.tier,
                price: turn.result.price,
                annualEuro: turn.result.savings?.annualEuro ?? 0,
              },
            });
          } else if (turn.phase === "reject") {
            track("rejected", { dialogId: dialogIdRef.current });
          }
          if (isResult) {
            // Kurzer Moment der Entstehung vor dem großen Ergebnis.
            const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            setBusy(false);
            if (reduced) {
              pushTurn();
            } else {
              setRevealing(true);
              setTimeout(pushTurn, 1600);
            }
            return;
          }
          pushTurn();
        } else {
          setMessages((prev) => [
            ...prev,
            {
              role: "assistant",
              display: data.error ?? "Das hat gerade nicht geklappt. Bitte versuchen Sie es erneut.",
              error: true,
            },
          ]);
        }
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            display: "Keine Verbindung. Bitte versuchen Sie es in einem Moment erneut.",
            error: true,
          },
        ]);
      } finally {
        setBusy(false);
        setTimeout(() => textareaRef.current?.focus(), 50);
      }
    },
    [busy]
  );

  const openPanel = useCallback(
    (initialText?: string) => {
      setOpen(true);
      track("dialog_opened", { dialogId: dialogIdRef.current });
      const text = (initialText ?? "").trim();
      if (text) void send(text);
      setTimeout(() => textareaRef.current?.focus(), 350);
    },
    [send]
  );

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<{ text?: string }>).detail;
      openPanel(detail?.text);
    };
    window.addEventListener("vw:dialog", handler);
    return () => window.removeEventListener("vw:dialog", handler);
  }, [openPanel]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const submitDock = (e: React.FormEvent) => {
    e.preventDefault();
    const text = dockDraft;
    setDockDraft("");
    openPanel(text || undefined);
  };

  const submitComposer = (e?: React.FormEvent) => {
    e?.preventDefault();
    const text = draft;
    if (!text.trim()) return;
    setDraft("");
    void send(text);
  };

  const caseSummary = [sketch?.title, messages.find((m) => m.role === "user")?.display]
    .filter(Boolean)
    .join(" — ");

  // Fortschritt: startet mit Guthaben, wächst je Frage, voll beim Ergebnis.
  const progress =
    phase === "result"
      ? 1
      : PROGRESS_BASELINE +
        Math.min(PROGRESS_CAP - PROGRESS_BASELINE, (askedCount / MAX_QUESTIONS) * (PROGRESS_CAP - PROGRESS_BASELINE));

  const remaining = Math.max(1, MAX_QUESTIONS - askedCount);
  const goalStatus =
    phase === "result"
      ? "Geschafft — Ihre Skizze ist da"
      : messages.length === 0
        ? "Startklar"
        : `noch ~${remaining} kurze ${remaining === 1 ? "Frage" : "Fragen"}`;

  // Die Skizze bleibt bis zum Schluss verborgen. Damit der Nutzer trotzdem
  // sieht, dass seine Antworten etwas bewirken, zählt die Zielzeile die
  // erfassten Punkte mit — ein Satz Spannung statt einer Karte.
  const capturedPoints = sketch
    ? sketch.steps.length + sketch.value.length + sketch.assumptions.length
    : 0;

  const suggestedAgenda = sketch?.open?.[0] ?? "";

  return (
    <>
      {/* Das Dock bleibt eingehängt und blendet weich aus, während das Panel
          darüber aufblendet — ein Kreuzblenden statt eines harten Sprungs. */}
      {!dockSuppressed && (
      <div
        className={`dock${open ? " is-hidden" : ""}${dockFocused && !dockDraft ? " has-hints" : ""}`}
        aria-hidden={open}
      >
        <div className="dock-stack">
          {/* Beim Anklicken der Leiste steigen Beispiele auf: Wer nicht weiß,
              wie er anfangen soll, wählt eines aus und ist im Gespräch.
              onMouseDown/preventDefault hält den Fokus im Feld — sonst
              verschwänden die Vorschläge, bevor der Klick ankommt. */}
          {dockFocused && !dockDraft && (
            <div className="dock-hints" role="group" aria-label="Beispiele zum Auswählen">
              {DOCK_HINTS.map((hint, i) => (
                <button
                  key={hint.label}
                  type="button"
                  className="dock-hint"
                  style={{ animationDelay: `${i * 55}ms` }}
                  tabIndex={open ? -1 : undefined}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => openPanel(hint.text)}
                >
                  {hint.label}
                </button>
              ))}
            </div>
          )}
        <form className="dock-bar" onSubmit={submitDock}>
          <span className="spark" aria-hidden>
            <SparkIcon size={20} />
          </span>
          <span className="dock-inputwrap">
            <input
              type="text"
              value={dockDraft}
              maxLength={MAX_CHARS}
              tabIndex={open ? -1 : undefined}
              onChange={(e) => setDockDraft(e.target.value)}
              onFocus={() => setDockFocused(true)}
              onBlur={() => setDockFocused(false)}
              placeholder=""
              aria-label="Beschreiben Sie Ihr Ziel oder Ihr Problem"
            />
            {!dockDraft && !dockFocused && (
              <span className="dock-type" aria-hidden>
                {typed}
                <i className="dock-caret" />
              </span>
            )}
          </span>
          <button type="submit" className="dock-send" tabIndex={open ? -1 : undefined} aria-label="Einschätzung starten">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="m5 12 14 0M13 6l6 6-6 6" />
            </svg>
          </button>
        </form>
        </div>
      </div>
      )}

      {open && (
        <section className="panel" role="dialog" aria-modal="true" aria-label="Projekt-Dialog">
          <div className="panel-head">
            <div className="panel-person">
              <Avatar />
              <span className="panel-person-text">
                <strong>KI-Projektberater</strong>
                <span>vierwochen.de · KI auf Basis echter Projektdaten — Moritz liest jede Skizze</span>
              </span>
            </div>
            <button type="button" className="icon-btn" onClick={() => setOpen(false)} aria-label="Dialog minimieren">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
          </div>

          <div className="panel-goal">
            <span className="panel-goal-label">
              <span className="goal-full">Ziel: Lösungsskizze&nbsp;+ Zeitplan&nbsp;+ Preisschätzung</span>
              <span className="goal-short">Lösungsskizze &amp; Preis</span>
            </span>
            <span className="panel-goal-meta">
              {capturedPoints > 0 && phase !== "result" && (
                <span className="goal-count" aria-live="polite">
                  {capturedPoints} Punkte erfasst
                </span>
              )}
              <span className={`panel-goal-status${phase === "result" ? " done" : ""}`}>{goalStatus}</span>
            </span>
          </div>
          <div className="panel-progress" aria-hidden>
            <span style={{ transform: `scaleX(${progress})` }} />
          </div>

          <div className="stream">
            {/* Keine Begrüßungsnachricht (Rücksprache 2026-08-14): Das Gespräch
                beginnt mit dem, was der Nutzer selbst geschrieben hat. Die
                KI-Offenlegung (EU-KI-VO Art. 50) trägt der Panel-Kopf. */}
            {messages.length === 0 && !busy && (
              <div className="starters">
                <span className="starters-label">Zum Start: ein typischer Fall — oder schreiben Sie unten einfach los.</span>
                {STARTERS.map((s, i) => (
                  <button
                    key={s}
                    type="button"
                    className="chip-btn"
                    style={{ animationDelay: `${i * 0.07}s` }}
                    onClick={() => void send(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Fragment statt Wrapper-div: So ist die Ergebniskarte ein
                direktes Kind des Stroms und darf breiter werden als die
                Lesespalte des Gesprächs. */}
            {messages.map((m, i) => (
              <Fragment key={i}>
                {m.role === "user" ? (
                  <div className="msg user">{m.display}</div>
                ) : (
                  <div className="msg-row">
                    <Avatar />
                    <div className={`msg assistant${m.error ? " error" : ""}`}>{m.display}</div>
                  </div>
                )}
                {/* Die Skizze erscheint bewusst NUR am Ende (Rücksprache
                    2026-08-14): Im Verlauf lenkte die mitwachsende Karte vom
                    Gespräch ab. Der Zähler in der Zielzeile hält die Spannung,
                    die große Enthüllung bleibt der Lohn. */}
                {m.result && (m.sketch ?? sketch) && (
                  <SolutionCard sketch={(m.sketch ?? sketch)!} result={m.result} />
                )}
              </Fragment>
            ))}

            {busy && (
              <div className="msg-row">
                <Avatar />
                <div className="typing" aria-label="Antwort wird erstellt">
                  <span className="typing-dots"><i /><i /><i /></span>
                  <span className="typing-label">{BUSY_LABELS[busyLabelIdx]}</span>
                </div>
              </div>
            )}

            {revealing && (
              <div className="reveal" role="status">
                <span className="reveal-spark"><SparkIcon size={22} /></span>
                <span className="reveal-text">Ihre Lösungsskizze wird gezeichnet …</span>
                <span className="reveal-bar"><i /></span>
              </div>
            )}

            {/* Bedienelemente des letzten Zuges */}
            {!busy && input?.kind === "chips" && input.options && (
              <Chips options={input.options} onPick={(v) => void send(v)} />
            )}
            {!busy && input?.kind === "multichips" && input.options && (
              <MultiChips options={input.options} onSubmit={(v) => void send(v)} />
            )}
            {!busy && input?.kind === "number" && (
              <Stepper input={input} onSubmit={(v) => void send(v)} />
            )}

            {/* Abschluss: Termin direkt im Gesprächsverlauf. Booking bleibt nach
                der Buchung eingehängt — es zeigt selbst den Erfolgsbildschirm;
                nur die leise E-Mail-Alternative verschwindet dann. */}
            {phase === "result" && result && (
              <>
                <Booking
                  dialogId={dialogIdRef.current}
                  caseSummary={caseSummary}
                  suggestedAgenda={suggestedAgenda}
                  onBooked={() => setBooked(true)}
                />
                {!booked && (
                  <EmailGate dialogId={dialogIdRef.current} sketchTitle={sketch?.title ?? ""} />
                )}
              </>
            )}

            <div ref={endRef} />
          </div>

          <form className="composer" onSubmit={submitComposer}>
            <textarea
              ref={textareaRef}
              rows={1}
              value={draft}
              maxLength={MAX_CHARS}
              disabled={busy}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  submitComposer();
                }
              }}
              placeholder={messages.length === 0 ? "Ihr Ziel oder Problem in ein, zwei Sätzen …" : "Ihre Antwort …"}
              aria-label="Ihre Nachricht"
            />
            <button type="submit" className="dock-send" disabled={busy || !draft.trim()} aria-label="Senden">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="m5 12 14 0M13 6l6 6-6 6" />
              </svg>
            </button>
          </form>
        </section>
      )}
    </>
  );
}

"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Booking from "./Booking";
import EmailGate from "./EmailGate";
import ResultCard from "./ResultCard";
import SketchView from "./Sketch";
import type { DialogResult, DialogTurn, Sketch, UiMessage } from "./types";

/**
 * Das dauerhafte Dialogfenster in der Fußleiste (PROMPT.md §5.1) mit
 * wechselnden Inspirationstexten. Beim Absenden öffnet sich das Panel:
 * links das Gespräch, rechts die sichtbar wachsende Lösungsskizze.
 */

const INSPIRATIONS = [
  "Unser Angebotsprozess lebt in drei Excel-Listen …",
  "Bestellungen kommen als PDF ins Sammelpostfach …",
  "Der Monatsbericht entsteht per Copy-Paste aus fünf Systemen …",
  "Wir tippen jeden Lieferschein zweimal ab …",
  "Die Urlaubsplanung läuft über eine Wandtafel …",
  "Was würde so etwas bei uns kosten?",
];

const GREETING =
  "Guten Tag. Beschreiben Sie in ein, zwei Sätzen, was Sie loswerden wollen — ich stelle höchstens drei Rückfragen und Sie bekommen eine Preisspanne mit Vier-Wochen-Plan.";

const MAX_CHARS = 1500;

export default function ChatDock() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<UiMessage[]>([]);
  const [sketch, setSketch] = useState<Sketch | null>(null);
  const [result, setResult] = useState<DialogResult | null>(null);
  const [phase, setPhase] = useState<"question" | "result" | "reject">("question");
  const [busy, setBusy] = useState(false);
  const [gateUser, setGateUser] = useState<{ email: string; name: string } | null>(null);
  const [draft, setDraft] = useState("");
  const [dockDraft, setDockDraft] = useState("");
  const [placeholderIdx, setPlaceholderIdx] = useState(0);
  const [placeholderFading, setPlaceholderFading] = useState(false);

  const dialogIdRef = useRef<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesRef = useRef<UiMessage[]>([]);
  messagesRef.current = messages;

  if (!dialogIdRef.current && typeof window !== "undefined") {
    dialogIdRef.current =
      typeof crypto.randomUUID === "function"
        ? crypto.randomUUID()
        : `d-${Date.now()}-${Math.floor(Math.random() * 1e9)}`;
  }

  // Wechselnde Inspirationstexte in der Fußleiste.
  useEffect(() => {
    if (open) return;
    const timer = setInterval(() => {
      setPlaceholderFading(true);
      setTimeout(() => {
        setPlaceholderIdx((i) => (i + 1) % INSPIRATIONS.length);
        setPlaceholderFading(false);
      }, 400);
    }, 4200);
    return () => clearInterval(timer);
  }, [open]);

  // Nachrichtenliste ans Ende scrollen.
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, busy]);

  const send = useCallback(
    async (text: string) => {
      const trimmed = text.trim().slice(0, MAX_CHARS);
      if (!trimmed || busy) return;

      const history = messagesRef.current.filter((m) => !m.error);
      const nextMessages: UiMessage[] = [...history, { role: "user", display: trimmed }];
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
          setMessages((prev) => [
            ...prev,
            { role: "assistant", display: turn.reply, raw: JSON.stringify(turn) },
          ]);
          if (turn.sketch && turn.sketch.steps.length > 0) setSketch(turn.sketch);
          setPhase(turn.phase);
          if (turn.phase === "result" && turn.result) setResult(turn.result);
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
      const text = (initialText ?? "").trim();
      if (text) {
        void send(text);
      }
      setTimeout(() => textareaRef.current?.focus(), 350);
    },
    [send]
  );

  // Einstiege von Hero, Kopfzeile und Abschluss-Abschnitt.
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<{ text?: string }>).detail;
      openPanel(detail?.text);
    };
    window.addEventListener("vw:dialog", handler);
    return () => window.removeEventListener("vw:dialog", handler);
  }, [openPanel]);

  // Escape schließt das Panel (Gesprächsstand bleibt erhalten).
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

  const caseSummary = [
    sketch?.title,
    messagesRef.current.find((m) => m.role === "user")?.display,
  ]
    .filter(Boolean)
    .join(" — ");

  const showGate = phase === "result" && result !== null && !gateUser;
  const showBooking = phase === "result" && result !== null && gateUser !== null;

  return (
    <>
      {/* Dauerhafte Fußleiste */}
      {!open && (
        <div className="dock">
          <form className="dock-bar" onSubmit={submitDock}>
            <span className="spark" aria-hidden>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2c.4 3.9 1.6 6.5 3.5 8.4C17.4 12.3 20 13.5 24 14c-4 .4-6.6 1.6-8.5 3.5-1.9 1.9-3.1 4.5-3.5 8.5-.4-4-1.6-6.6-3.5-8.5C6.6 15.6 4 14.4 0 14c4-.5 6.6-1.7 8.5-3.6C10.4 8.5 11.6 5.9 12 2Z" />
              </svg>
            </span>
            <input
              type="text"
              value={dockDraft}
              maxLength={MAX_CHARS}
              onChange={(e) => setDockDraft(e.target.value)}
              placeholder={INSPIRATIONS[placeholderIdx]}
              className={placeholderFading ? "placeholder-fading" : ""}
              aria-label="Beschreiben Sie Ihren Fall"
            />
            <button type="submit" className="dock-send" aria-label="Einschätzung starten">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="m5 12 14 0M13 6l6 6-6 6" />
              </svg>
            </button>
          </form>
        </div>
      )}

      {/* Dialog-Panel */}
      {open && (
        <>
          <div className="panel-backdrop" onClick={() => setOpen(false)} aria-hidden />
          <section className="panel" role="dialog" aria-modal="true" aria-label="Projekt-Dialog">
            <div className="panel-head">
              <div className="title">
                <span className="spark" style={{ color: "var(--accent)" }} aria-hidden>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2c.4 3.9 1.6 6.5 3.5 8.4C17.4 12.3 20 13.5 24 14c-4 .4-6.6 1.6-8.5 3.5-1.9 1.9-3.1 4.5-3.5 8.5-.4-4-1.6-6.6-3.5-8.5C6.6 15.6 4 14.4 0 14c4-.5 6.6-1.7 8.5-3.6C10.4 8.5 11.6 5.9 12 2Z" />
                  </svg>
                </span>
                <span>{sketch?.title ?? "Ihre unverbindliche Ersteinschätzung"}</span>
              </div>
              <button type="button" className="icon-btn" onClick={() => setOpen(false)} aria-label="Dialog minimieren">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
            </div>

            <div className="panel-body">
              <div className="panel-chat">
                <div className="messages">
                  <div className="msg assistant">{GREETING}</div>
                  {messages.map((m, i) => (
                    <div key={i} className={`msg ${m.role}${m.error ? " error" : ""}`}>
                      {m.display}
                    </div>
                  ))}
                  {busy && (
                    <div className="typing" aria-label="Antwort wird erstellt">
                      <i /><i /><i />
                    </div>
                  )}
                  <div ref={messagesEndRef} />
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
                    placeholder={messages.length === 0 ? "Ihr Fall in ein, zwei Sätzen …" : "Ihre Antwort …"}
                    aria-label="Ihre Nachricht"
                  />
                  <button type="submit" className="dock-send" disabled={busy || !draft.trim()} aria-label="Senden">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="m5 12 14 0M13 6l6 6-6 6" />
                    </svg>
                  </button>
                </form>
              </div>

              <aside className="panel-sketch" aria-label="Lösungsskizze und Ergebnis">
                {result && <ResultCard result={result} />}
                {showGate && (
                  <EmailGate
                    dialogId={dialogIdRef.current}
                    sketchTitle={sketch?.title ?? ""}
                    onDone={(email, name) => setGateUser({ email, name })}
                  />
                )}
                {showBooking && gateUser && (
                  <Booking
                    email={gateUser.email}
                    name={gateUser.name}
                    dialogId={dialogIdRef.current}
                    caseSummary={caseSummary}
                  />
                )}
                <SketchView sketch={sketch} />
              </aside>
            </div>
          </section>
        </>
      )}
    </>
  );
}

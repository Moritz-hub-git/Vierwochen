"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Chips, MultiChips, Stepper } from "./Controls";
import SolutionCard from "./SolutionCard";
import Booking from "./Booking";
import type { DialogTurn, UiMessage } from "./types";
import { processes } from "@/lib/processes";
import { track, captureAttribution } from "@/lib/track";

const STARTERS = [
  "Wir gleichen Auftragsbestätigungen manuell mit Bestellungen ab.",
  "Wir kopieren jeden Monat Zahlen aus Excel in unser Reporting.",
  "Angebotsanfragen kommen per E-Mail und werden manuell vorbereitet.",
];
const MAX_CHARS = 1500;
export default function ChatDock() {
  const pathname = usePathname();
  useEffect(() => { captureAttribution(); }, []);
  const modal = useRef<HTMLDialogElement>(null);
  const composer = useRef<HTMLTextAreaElement>(null);
  const bottom = useRef<HTMLDivElement>(null);
  const pending = useRef(false);
  const previewSeen = useRef(false);
  const abort = useRef<AbortController | null>(null);
  const dialogId = useRef("");
  const submitFromPage = useRef<(text: string) => void>(() => {});
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<UiMessage[]>([]);
  const history = useRef<UiMessage[]>([]);
  const [turn, setTurn] = useState<DialogTurn | null>(null);
  const [solution, setSolution] = useState<DialogTurn | null>(null);
  const [busy, setBusy] = useState(false);
  const [directBooking, setDirectBooking] = useState(false);
  const [booked, setBooked] = useState(false);
  const [dockFocused, setDockFocused] = useState(false);
  const hidden = ["/impressum", "/datenschutz", "/agb", "/zugang"].includes(
    pathname,
  );
  const updateMessages = (items: UiMessage[]) => {
    history.current = items;
    setMessages(items);
  };

  const show = useCallback((text = "", booking = false) => {
    if (!dialogId.current) dialogId.current = crypto.randomUUID();
    setDirectBooking(booking);
    if (text) setDraft(text);
    if (!modal.current?.open) {
      if (!window.history.state?.opsridChat)
        window.history.pushState(
          { ...window.history.state, opsridChat: true },
          "",
          window.location.href,
        );
      modal.current?.showModal();
    }
    setOpen(true);
    track("dialog_opened", { dialogId: dialogId.current });
    if (!booking) requestAnimationFrame(() => composer.current?.focus());
  }, []);
  const close = () => {
    modal.current?.close();
    setOpen(false);
    if (window.history.state?.opsridChat) window.history.back();
  };
  useEffect(() => {
    const onBack = () => {
      if (!window.history.state?.opsridChat) {
        modal.current?.close();
        setOpen(false);
      }
    };
    window.addEventListener("popstate", onBack);
    return () => window.removeEventListener("popstate", onBack);
  }, []);
  useEffect(() => {
    const prev = document.body.style.overflow;
    if (open) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);
  useEffect(
    () => () => {
      abort.current?.abort();
    },
    [],
  );
  useEffect(() => {
    if (busy) return;
    if (solution && !previewSeen.current) {
      previewSeen.current = true;
      modal.current
        ?.querySelector("#ergebnis")
        ?.scrollIntoView({ block: "start", behavior: "instant" });
    } else
      bottom.current?.scrollIntoView({ block: "nearest", behavior: "instant" });
  }, [messages, busy, solution]);
  useEffect(() => {
    const scroll = modal.current?.querySelector(".ai-chat-scroll");
    if (scroll) scroll.scrollTop = 0;
  }, [directBooking]);
  useEffect(() => {
    const el = composer.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = Math.min(el.scrollHeight, 130) + "px";
    }
  }, [draft, open]);

  useEffect(() => {
    const fromUrl = (url: URL) => {
      const process = processes.find(
        (p) => p.slug === url.searchParams.get("prozess"),
      );
      const volume = url.searchParams.get("volumen");
      return (
        (process
          ? "Wir möchten " +
            process.title.replace(/ automatisieren$/, "").toLowerCase() +
            " automatisieren."
          : "") +
        (volume && /^\d{1,7}$/.test(volume)
          ? " Bei uns fallen ungefähr " + volume + " Vorgänge pro Monat an."
          : "")
      );
    };
    const launch = (e: Event) => {
      const detail = (e as CustomEvent<{ text?: string; submit?: boolean }>).detail;
      show(detail?.text);
      if (detail?.submit && detail.text?.trim()) submitFromPage.current(detail.text);
    };
    const click = (e: MouseEvent) => {
      if (
        e.defaultPrevented ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey ||
        e.button !== 0
      )
        return;
      const anchor = (e.target as Element).closest<HTMLAnchorElement>(
        "a[href]",
      );
      if (!anchor || anchor.target === "_blank") return;
      const url = new URL(anchor.href);
      if (url.origin !== location.origin || url.searchParams.has("formular"))
        return;
      if (url.pathname === "/prozess-check" || url.pathname === "/termin") {
        e.preventDefault();
        show(fromUrl(url), url.pathname === "/termin");
      } else if (modal.current?.open) {
        modal.current.close();
        setOpen(false);
      }
    };
    document.addEventListener("click", click, true);
    window.addEventListener("opsrid:chat", launch);
    const url = new URL(location.href);
    if (
      (pathname === "/prozess-check" && !url.searchParams.has("formular")) ||
      pathname === "/termin"
    )
      show(fromUrl(url), pathname === "/termin");
    return () => {
      document.removeEventListener("click", click, true);
      window.removeEventListener("opsrid:chat", launch);
    };
  }, [pathname, show]);

  const send = async (text: string, retry = false) => {
    const value = text.trim().slice(0, MAX_CHARS);
    if (!value || pending.current) return;
    if (!dialogId.current) dialogId.current = crypto.randomUUID();
    const clean = history.current.filter((m) => !m.error);
    if (retry && clean.at(-1)?.role === "user") clean.pop();
    const next: UiMessage[] = [...clean, { role: "user", display: value }];
    updateMessages(next);
    setDraft("");
    setBusy(true);
    pending.current = true;
    setTurn(null);
    track(clean.length ? "dialog_question" : "dialog_started", {
      dialogId: dialogId.current,
      meta: { turn: next.filter((m) => m.role === "user").length },
    });
    const controller = new AbortController();
    abort.current = controller;
    const timer = setTimeout(() => controller.abort(), 45000);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        signal: controller.signal,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          dialogId: dialogId.current,
          messages: next.map((m) => ({
            role: m.role,
            content: m.raw ?? m.display,
          })),
        }),
      });
      const data = await response.json();
      if (!response.ok || !data.ok || !data.turn)
        throw new Error(
          data.error || "Die Einschätzung ist gerade nicht erreichbar.",
        );
      const answer = data.turn as DialogTurn;
      updateMessages([
        ...next,
        {
          role: "assistant",
          display: answer.reply,
          raw: JSON.stringify(answer),
        },
      ]);
      setTurn(answer);
      if (answer.result) {
        setSolution(answer);
        track("result_delivered", { dialogId: dialogId.current });
      }
    } catch (error) {
      updateMessages([
        ...next,
        {
          role: "assistant",
          display: controller.signal.aborted
            ? "Die Antwort dauert gerade zu lange. Ihr Text bleibt erhalten. Versuchen Sie es erneut oder sprechen Sie direkt mit uns."
            : error instanceof Error
              ? error.message
              : "Keine Verbindung. Bitte versuchen Sie es erneut.",
          error: true,
        },
      ]);
    } finally {
      clearTimeout(timer);
      pending.current = false;
      setBusy(false);
      abort.current = null;
    }
  };
  submitFromPage.current = (text) => { void send(text); };
  const lastError = messages.at(-1)?.error;
  const questions = messages.filter((m) => {
    try {
      return JSON.parse(m.raw || "{}").phase === "question";
    } catch {
      return false;
    }
  }).length;
  const summary = [
    solution?.sketch.title,
    messages.find((m) => m.role === "user")?.display,
  ]
    .filter(Boolean)
    .join(" — ");

  return (
    <>
      {!hidden && !open && (
        <aside
          className={`ai-dock ${dockFocused ? "is-focused" : ""}`}
          aria-label="Ihren Prozess beschreiben"
        >
          <div className="ai-dock-hints" aria-hidden={!dockFocused}>
            {STARTERS.map((starter) => (
              <button
                key={starter}
                type="button"
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => {
                  show();
                  void send(starter);
                }}
              >
                {starter}
              </button>
            ))}
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              show();
              if (draft.trim()) void send(draft);
            }}
          >
            <span className="ai-orb" aria-hidden="true">
              ✳
            </span>
            <label className="sr-only" htmlFor="dock-process">
              Welcher Prozess kostet Sie gerade am meisten Zeit?
            </label>
            <input
              id="dock-process"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              maxLength={MAX_CHARS}
              placeholder="Welcher Prozess kostet Sie gerade am meisten Zeit?"
              onFocus={() => setDockFocused(true)}
              onBlur={() => setDockFocused(false)}
            />
            <button type="submit" aria-label="Prozess-Check starten">
              ↗
            </button>
          </form>
          <p>
            Ihr Lösungsentwurf <span>·</span> Ohne E-Mail-Pflicht <span>·</span>{" "}
            Kostenlos
          </p>
        </aside>
      )}
      <dialog
        ref={modal}
        className="ai-dialog"
        aria-labelledby="chat-title"
        onCancel={(e) => {
          e.preventDefault();
          close();
        }}
        onClose={() => setOpen(false)}
      >
        <header className="ai-chat-header">
          <div className="ai-chat-brand">
            <span className="ai-orb" aria-hidden="true">
              ✳
            </span>
            <div>
              <strong id="chat-title">Ihr Prozess. Weitergedacht.</strong>
              <small>Opsrid · Ihre Anwendung beginnt hier</small>
            </div>
          </div>
          <div className="ai-chat-actions">
            <button
              type="button"
              onClick={() => setDirectBooking(!directBooking)}
            >
              {directBooking ? "Zurück zum Prozess" : "Direkt zum Termin"}
            </button>
            <button
              type="button"
              className="ai-close"
              onClick={close}
              aria-label="Dialog schließen"
            >
              ×
            </button>
          </div>
        </header>
        <div className="ai-stage-nav" aria-label="Ablauf">
          <span className={!solution && !directBooking ? "active" : ""}>
            01 Prozess verstehen
          </span>
          <span className={solution && !directBooking ? "active" : ""}>
            02 Vorschau
          </span>
          <span className={directBooking ? "active" : ""}>
            03 Gemeinsam umsetzen
          </span>
        </div>
        <div className="ai-chat-scroll">
          {dialogId.current && (
            <div className="ai-direct-booking" hidden={!directBooking}>
              <Booking
                dialogId={dialogId.current}
                caseSummary={summary}
                suggestedAgenda={solution?.sketch.open[0]}
                onBooked={() => setBooked(true)}
              />
            </div>
          )}
          <div hidden={directBooking}>
            {!messages.length && (
              <div className="ai-welcome">
                <span className="eyebrow">FANGEN WIR MIT IHREM ALLTAG AN</span>
                <h2>
                  Was würden Sie gerne
                  <br />
                  nicht mehr von Hand machen?
                </h2>
                <p>
                  Beschreiben Sie einen wiederkehrenden Ablauf. Mit bis zu drei
                  Rückfragen entsteht ein vorläufiger Lösungsentwurf: welche
                  Arbeit Ihre Anwendung übernehmen könnte und wo Ihr Team entscheidet.
                </p>
                <div className="ai-starters">
                  {STARTERS.map((s) => (
                    <button key={s} onClick={() => void send(s)}>
                      {s}
                      <span aria-hidden="true">↗</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
            <div
              className="ai-messages"
              role="log"
              aria-label="Gespräch"
              aria-live="polite"
            >
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={"ai-message " + m.role + (m.error ? " error" : "")}
                >
                  {m.role === "assistant" && (
                    <span className="ai-message-label">OPSRID AI</span>
                  )}
                  <p>{m.display}</p>
                </div>
              ))}
            </div>
            {busy && (
              <div className="ai-thinking" role="status">
                <span />
                Ihr Prozess wird eingeordnet …
              </div>
            )}
            {lastError && !busy && (
              <div className="ai-error-actions">
                <button
                  className="button button-primary"
                  onClick={() =>
                    void send(
                      messages.filter((m) => m.role === "user").at(-1)
                        ?.display || "",
                      true,
                    )
                  }
                >
                  Erneut versuchen
                </button>
                <button
                  className="button button-secondary"
                  onClick={() => setDirectBooking(true)}
                >
                  Direkt zum Termin
                </button>
                <a href="/prozess-check?formular=1" onClick={close}>
                  Kontaktformular
                </a>
              </div>
            )}
            {!busy && turn?.input && !solution && (
              <div className="ai-controls" key={messages.length}>
                {turn.input.kind === "chips" && (
                  <Chips
                    options={turn.input.options || []}
                    onPick={(v) => void send(v)}
                  />
                )}
                {turn.input.kind === "multichips" && (
                  <MultiChips
                    options={turn.input.options || []}
                    onSubmit={(v) => void send(v)}
                  />
                )}
                {turn.input.kind === "number" && (
                  <Stepper input={turn.input} onSubmit={(v) => void send(v)} />
                )}
                <small>Oder antworten Sie unten in Ihren eigenen Worten.</small>
              </div>
            )}
            {solution?.result && (
              <SolutionCard
                sketch={solution.sketch}
                result={solution.result}
                dialogId={dialogId.current}
                caseSummary={summary}
                suggestedAgenda={solution.sketch.open[0] || ""}
                booked={booked}
                onBooked={() => setBooked(true)}
                onChooseBooking={() => setDirectBooking(true)}
              />
            )}
            <div ref={bottom} />
          </div>
        </div>
        {!directBooking && (
          <div className="ai-composer-wrap">
            <form
              className="ai-composer"
              onSubmit={(e) => {
                e.preventDefault();
                void send(draft);
              }}
            >
              <textarea
                ref={composer}
                rows={1}
                value={draft}
                maxLength={MAX_CHARS}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (
                    e.key === "Enter" &&
                    !e.shiftKey &&
                    !e.nativeEvent.isComposing
                  ) {
                    e.preventDefault();
                    void send(draft);
                  }
                }}
                placeholder={
                  solution
                    ? "Frage oder Ergänzung zu Ihrer Vorschau …"
                    : messages.length
                      ? "Ihre Antwort …"
                      : "Zum Beispiel: Wir tippen jede Bestellung aus PDFs ab …"
                }
                aria-label="Ihre Nachricht"
              />
              <button
                disabled={busy || !draft.trim()}
                aria-label="Nachricht senden"
              >
                ↑
              </button>
            </form>
            <p>
              {questions > 0 && !solution
                ? "Rückfrage " + Math.min(questions, 3) + " von höchstens 3 · "
                : ""}
              KI-Ersteinschätzung · Bitte keine vertraulichen Daten eingeben.{" "}
              <a href="/datenschutz">Datenschutz</a>
            </p>
          </div>
        )}
      </dialog>
    </>
  );
}

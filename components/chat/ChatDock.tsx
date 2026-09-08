"use client";

import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { SITE } from "@/lib/config";
import { track } from "@/lib/track";
import StreamedText from "./StreamedText";
import { Chips, MultiChips, Stepper } from "./Controls";
import SolutionCard from "./SolutionCard";
import type { DialogInput, DialogResult, DialogTurn, Sketch, UiMessage } from "./types";

/**
 * Die Dialogleiste ist die EINZIGE herausgehobene Call-to-Action der Seite
 * (Rücksprache 2026-08-14, Vorbild: brunellocucinelli.ai): groß, frei über dem
 * Inhalt schwebend. Beim Absenden übernimmt der Dialog den ganzen Bildschirm.
 *
 * Offenlegung (EU-KI-VO Art. 50): Es antwortet erkennbar eine KI — unter der
 * Leiste im Ruhezustand und im offenen Panel als dauerhafte Kopfzeile. Die
 * Skizze prüft Moritz persönlich; das steht dort ebenfalls.
 */

/** Einstiegsbeispiele im geöffneten Dialog: Wer nicht formulieren muss, fängt eher an. */
const STARTERS = [
  "Wir pflegen Artikel in mehreren Excel-Listen und tippen alles doppelt ein.",
  "Bestellungen kommen ins Sammelpostfach und gehen dort unter.",
  "Ich habe eine Produktidee und brauche eine erste Version, die läuft.",
];

/** Vorschläge, die beim Anklicken der Dialogleiste aufsteigen. Auf der
 *  Bubble steht die Quintessenz; in die Leiste wandert eine ausformulierte
 *  Beschreibung, die man übernehmen oder weiterschreiben kann.
 *
 *  Gezeigt werden die ERSTEN FÜNF (auf dem Handy die ersten drei) — die
 *  Reihenfolge ist deshalb die Auswahl: Sie deckt die drei Zielgruppen ab
 *  (Betrieb, Gründer/Produkt, Fachbereich), und zwar schon in den ersten
 *  drei Einträgen. Der Rest bleibt im Pool für spätere Variation. */
const DOCK_HINTS = [
  {
    label: "Daten in Excel-Listen",
    text: "Wir pflegen unsere Artikel- und Kundendaten in mehreren Excel-Listen. Jede Änderung muss an mehreren Stellen nachgetragen werden, und am Ende weiß niemand sicher, welche Liste gerade stimmt.",
  },
  {
    label: "Produktidee, erste Version",
    text: "Ich habe eine Produktidee und brauche eine erste Version, die echte Nutzer bedienen können: Anmeldung, Datenhaltung, die Kernfunktion. Kein Klick-Prototyp, sondern etwas, das läuft.",
  },
  {
    label: "IT hat keine Zeit für unser Tool",
    text: "Unsere IT hat keine Kapazität für das Werkzeug, das unser Fachbereich braucht. Wir helfen uns mit Excel und Mails und brauchen etwas, das wir in wenigen Wochen nutzen können — abgestimmt mit der IT.",
  },
  {
    label: "Bestellungen gehen unter",
    text: "Bestellungen erreichen uns als PDF oder Mail im Sammelpostfach. Jemand muss sie von Hand ins System übertragen, dabei bleibt regelmäßig etwas liegen und Kunden fragen nach.",
  },
  {
    label: "Prototyp muss jetzt echt laufen",
    text: "Wir haben einen Prototyp, der jetzt echt laufen muss: mehrere Nutzer, Rechte, Anbindung an ein bestehendes System und ein sauberer Betrieb statt Bastellösung.",
  },
  {
    label: "Ein Portal für unsere Kunden",
    text: "Unsere Kunden sollen Preise, Bestellungen und Lieferscheine selbst einsehen können, statt bei uns anzurufen — angebunden an die Daten, die wir ohnehin schon pflegen.",
  },
  {
    label: "Auswertungen per Klick",
    text: "Unser Reporting entsteht jeden Monat per Copy-Paste aus mehreren Systemen. Ich hätte die wichtigsten Zahlen gern jederzeit aktuell auf einem Bildschirm, statt sie zusammenzubauen.",
  },
  {
    label: "Angebote dauern zu lang",
    text: "Ein Angebot zu kalkulieren dauert bei uns ein bis zwei Tage, weil die Preise aus Erfahrungswerten und alten Angeboten zusammengesucht werden. Schnelle Anfragen verlieren wir dadurch.",
  },
  {
    label: "Papier aus dem Außendienst",
    text: "Unsere Monteure füllen Protokolle und Stundenzettel auf Papier aus. Im Büro wird alles abgetippt, Rückfragen kommen Tage später und die Abrechnung verzögert sich.",
  },
  {
    label: "Planung per Zuruf",
    text: "Unsere Einsatz- und Schichtplanung läuft über Zuruf, Aushang und Telefon. Wer tauschen will, ruft im Büro an, und Änderungen erreichen nicht zuverlässig alle.",
  },
  {
    label: "KI für unsere Unterlagen",
    text: "Wir haben viele Dokumente, Angebote und Mails, in denen das Wissen unserer Firma steckt. Ich hätte gern eine Suche, die Fragen dazu in normaler Sprache beantwortet.",
  },
];

/**
 * Die Frage in der Leiste. Sie fragt nach dem Bestand, nicht nach einer
 * Vision: Was heute Zeit kostet, weiß jeder sofort — ein Ziel muss man
 * erst formulieren. Genau diese Angabe braucht der Dialog später auch,
 * um Aufwand und Nutzen zu rechnen.
 */
const DOCK_QUESTION = "Was kostet Sie gerade am meisten Zeit?";

const MAX_CHARS = 1500;
/** Höchstzahl Rückfragen — wie im Systemprompt (lib/dialog.ts). */
const MAX_QUESTIONS = 5;
/** Kurze Pause vor dem Ergebnis: Moment der Entstehung, ohne zu bremsen. */
const REVEAL_MS = 800;

function SparkIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2c.4 3.9 1.6 6.5 3.5 8.4C17.4 12.3 20 13.5 24 14c-4 .4-6.6 1.6-8.5 3.5-1.9 1.9-3.1 4.5-3.5 8.5-.4-4-1.6-6.6-3.5-8.5C6.6 15.6 4 14.4 0 14c4-.5 6.6-1.7 8.5-3.6C10.4 8.5 11.6 5.9 12 2Z" />
    </svg>
  );
}

function newDialogId(): string {
  return typeof crypto.randomUUID === "function"
    ? crypto.randomUUID()
    : `d-${Date.now()}-${Math.floor(Math.random() * 1e9)}`;
}

/** Phase eines gespeicherten Assistenten-Zugs — aus dem Roh-JSON, ohne eigenes Feld. */
function turnPhase(m: UiMessage): DialogTurn["phase"] | null {
  if (m.role !== "assistant" || m.error || !m.raw) return null;
  try {
    return (JSON.parse(m.raw) as { phase?: DialogTurn["phase"] }).phase ?? null;
  } catch {
    return null;
  }
}

export default function ChatDock() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<UiMessage[]>([]);
  const [sketch, setSketch] = useState<Sketch | null>(null);
  // Skizze und Ergebnis leben im State, nicht in der Nachricht: Ein
  // Nachgespräch (phase=followup) darf beides aktualisieren, und die eine
  // Ergebniskarte liest dann die neuen Werte an ihrer alten Stelle.
  const [result, setResult] = useState<DialogResult | null>(null);
  const [phase, setPhase] = useState<DialogTurn["phase"]>("question");
  const [input, setInput] = useState<DialogInput | null>(null);
  const [busy, setBusy] = useState(false);
  const [revealing, setRevealing] = useState(false);
  const [booked, setBooked] = useState(false);
  const [dockDraft, setDockDraft] = useState("");
  const [dockFocused, setDockFocused] = useState(false);
  const [sending, setSending] = useState(false);
  // Index des Zuges, der gerade herausgeschrieben wird (nur der neueste).
  const [animateIdx, setAnimateIdx] = useState<number | null>(null);
  // Erst wenn der Text vollständig steht, dürfen Vorschläge, Regler und
  // Karten erscheinen — sonst poppen sie vor der Antwort auf und wirken
  // dem Lesefluss vorgreifend statt aus ihm hervorgehend.
  const [textSettled, setTextSettled] = useState(true);

  const dialogIdRef = useRef<string>("");
  const endRef = useRef<HTMLDivElement>(null);
  const streamRef = useRef<HTMLDivElement>(null);
  const dockInputRef = useRef<HTMLTextAreaElement>(null);
  const messagesRef = useRef<UiMessage[]>([]);
  const sketchRef = useRef<Sketch | null>(null);
  const resultRef = useRef<DialogResult | null>(null);
  // Synchron lesbar für popstate/Escape — der State hinkt einen Tick nach.
  const openRef = useRef(false);
  // Zur Karte wird genau einmal gescrollt: beim ersten Erscheinen.
  const scrolledToCardRef = useRef(false);
  messagesRef.current = messages;
  sketchRef.current = sketch;
  resultRef.current = result;

  // Auf der Direktbuchung und der IT-Faktenseite schwebt keine Dialogleiste:
  // Dort soll nichts vom eigentlichen Zweck der Seite ablenken oder das
  // Formular überlappen. Der Dialog bleibt über den Kopfzeilen-Knopf erreichbar.
  const pathname = usePathname();
  const dockSuppressed = pathname === "/termin" || pathname === "/it";

  if (!dialogIdRef.current && typeof window !== "undefined") {
    dialogIdRef.current = newDialogId();
  }

  const scrollToEnd = useCallback(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, []);

  useEffect(() => {
    scrollToEnd();
  }, [messages, busy, revealing, result, scrollToEnd]);

  /**
   * Nach dem Ergebnis gezielt zur Karte (Audit CA-H1: Preis und Termine
   * standen unter der Falz). Sobald die Karte steht — also nachdem der
   * Ergebnistext fertig geschrieben ist —, rückt ihr Anfang an die Oberkante
   * des Stroms. Selektor abgestimmt mit der Karte: id="ergebnis"; Rückfall
   * auf die Klasse, falls die id fehlt.
   */
  useEffect(() => {
    if (!result || !textSettled || scrolledToCardRef.current) return;
    scrolledToCardRef.current = true;
    const t = window.setTimeout(() => {
      const el =
        document.getElementById("ergebnis") ?? streamRef.current?.querySelector(".solution");
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      el?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
    }, 300);
    return () => window.clearTimeout(t);
  }, [result, textSettled]);

  /** Die Leiste wächst mit dem Text und schrumpft wieder — ohne Sprung. */
  const fitDockHeight = useCallback(() => {
    const el = dockInputRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 168)}px`;
  }, []);

  useEffect(() => {
    fitDockHeight();
  }, [dockDraft, fitDockHeight]);

  const send = useCallback(
    /** `base`: Verlauf, auf dem gesendet wird — beim Wiederholen ohne den gescheiterten Zug. */
    async (text: string, base?: UiMessage[]) => {
      const trimmed = text.trim().slice(0, MAX_CHARS);
      if (!trimmed || busy) return;

      setInput(null);
      const history = (base ?? messagesRef.current).filter((m) => !m.error);
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
          // Nachgespräch: wird wie eine normale Antwort geschrieben; bringt
          // es ein result mit, ersetzt das die Werte der bestehenden Karte.
          // Gab es noch keine Karte (Modell hat die result-Phase
          // übersprungen), wird dieser Zug zur Kartenstelle.
          const isFollowup = turn.phase === "followup";
          const updatesResult = isFollowup && Boolean(turn.result);
          const anchorsCard = isResult || (updatesResult && !resultRef.current);
          const pushTurn = () => {
            // Der neue Zug bekommt den nächsten Index — nur er wird geschrieben.
            setAnimateIdx(messagesRef.current.length);
            setTextSettled(false);
            setMessages((prev) => [
              ...prev,
              {
                role: "assistant",
                display: turn.reply,
                raw: JSON.stringify(turn),
                sketch: grew ? turn.sketch : undefined,
                prevSketch: sketchRef.current,
                // Marker für die Stelle der Karte — die Werte kommen aus dem State.
                result: anchorsCard ? turn.result : undefined,
              },
            ]);
            if (grew) setSketch(turn.sketch);
            setPhase(turn.phase);
            setInput(turn.input ?? null);
            if ((isResult || updatesResult) && turn.result) setResult(turn.result);
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
              setTimeout(pushTurn, REVEAL_MS);
            }
            return;
          }
          pushTurn();
        } else {
          setAnimateIdx(null);
          setTextSettled(true);
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
        setAnimateIdx(null);
        setTextSettled(true);
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
        setTimeout(() => dockInputRef.current?.focus(), 50);
      }
    },
    [busy]
  );

  /** Nach einem Fehler: den letzten eigenen Text noch einmal schicken — der
   *  gescheiterte Zug wird dabei ersetzt, nicht verdoppelt (sonst stünden
   *  zwei Nutzer-Züge hintereinander im Verlauf). */
  const retryLast = useCallback(() => {
    const clean = messagesRef.current.filter((m) => !m.error);
    const last = clean[clean.length - 1];
    if (!last || last.role !== "user") return;
    void send(last.display, clean.slice(0, -1));
  }, [send]);

  /**
   * Übergang in den Chatmodus: Die Navigation bleibt oben stehen, alles
   * darunter blendet weich weg und gibt den Verlauf frei. Ausgeblendet wird
   * per Klasse auf den Geschwistern der Navigation — so trägt der Übergang
   * jede Seitenstruktur, ohne dass die Seiten etwas davon wissen müssen.
   * Weggeblendetes ist auch für Tastatur und Screenreader weg (inert,
   * aria-hidden) — sonst wanderte der Fokus in die unsichtbare Seite.
   */
  const fadePageOut = useCallback(() => {
    const nav = document.querySelector("nav, header");
    const root = nav?.parentElement ?? document.body;
    const targets = Array.from(root.children).filter(
      (el) =>
        el !== nav &&
        !el.classList.contains("dock") &&
        !el.classList.contains("panel") &&
        el.tagName !== "SCRIPT" &&
        el.tagName !== "STYLE"
    );
    // Erst die Überblendregel setzen, im nächsten Bild den Zielzustand —
    // sonst wäre der Wechsel ein Sprung statt einer Blende.
    targets.forEach((el) => {
      el.classList.add("vw-fadeable");
      el.setAttribute("inert", "");
      el.setAttribute("aria-hidden", "true");
    });
    requestAnimationFrame(() =>
      targets.forEach((el) => el.classList.add("vw-faded"))
    );
    if (nav) {
      document.documentElement.style.setProperty(
        "--chat-top",
        `${Math.round(nav.getBoundingClientRect().height)}px`
      );
      nav.classList.add("vw-nav-pinned");
    }
    document.documentElement.setAttribute("data-chat", "on");
  }, []);

  const restorePage = useCallback(() => {
    document.documentElement.removeAttribute("data-chat");
    document.documentElement.style.removeProperty("--chat-top");
    document
      .querySelectorAll(".vw-nav-pinned")
      .forEach((el) => el.classList.remove("vw-nav-pinned"));
    const faded = Array.from(document.querySelectorAll(".vw-faded"));
    faded.forEach((el) => {
      el.classList.remove("vw-faded");
      el.removeAttribute("inert");
      el.removeAttribute("aria-hidden");
    });
    window.setTimeout(
      () => faded.forEach((el) => el.classList.remove("vw-fadeable")),
      700
    );
  }, []);

  const openPanel = useCallback(
    (initialText?: string) => {
      const text = (initialText ?? "").trim();
      track("dialog_opened", { dialogId: dialogIdRef.current });
      // Eigener Verlaufseintrag: „Zurück" schließt nur das Panel, statt die
      // Seite zu verlassen (Audit: Chat ist ein Zustand der Seite, kein Ort).
      if (!openRef.current && window.history.state?.chat !== 1) {
        window.history.pushState({ chat: 1 }, "", window.location.href);
      }
      openRef.current = true;
      // Die Leiste sinkt nach unten weg, während die Seite verblasst; erst
      // danach steigt der Verlauf auf. Nacheinander, nicht gleichzeitig.
      setSending(true);
      fadePageOut();
      window.setTimeout(() => {
        setOpen(true);
        setSending(false);
        if (text) void send(text);
        window.setTimeout(() => dockInputRef.current?.focus(), 300);
      }, 430);
    },
    [send, fadePageOut]
  );

  /** Verlassen heißt hier: aufräumen. Der nächste Einstieg beginnt frisch.
   *  `fromHistory`: Auslöser war schon ein „Zurück" — dann nicht noch einmal
   *  zurückgehen, sonst verließe der zweite Schritt die Seite. */
  const closeChat = useCallback((fromHistory = false) => {
    const wasOpen = openRef.current;
    openRef.current = false;
    setOpen(false);
    setMessages([]);
    setSketch(null);
    setResult(null);
    setPhase("question");
    setInput(null);
    setBooked(false);
    setAnimateIdx(null);
    setTextSettled(true);
    setDockDraft("");
    scrolledToCardRef.current = false;
    dialogIdRef.current = newDialogId();
    if (wasOpen && !fromHistory && window.history.state?.chat === 1) {
      window.history.back();
    }
  }, []);

  // Beim Verlassen des Chats kommt die Seite genauso weich zurück.
  useEffect(() => {
    if (!open) restorePage();
  }, [open, restorePage]);

  // „Zurück" im Browser schließt das Panel — und nur das.
  useEffect(() => {
    const onPop = () => {
      if (openRef.current) closeChat(true);
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, [closeChat]);

  /**
   * Die Navigation ist im Gespräch der Rückweg: Ein Klick auf das Logo (oder
   * einen Sprungmarken-Link) beendet den Chat, statt ins Leere zu springen.
   * Links auf andere Seiten dürfen weiterhin navigieren.
   */
  useEffect(() => {
    if (!open) return;
    const nav = document.querySelector(".vw-nav-pinned");
    if (!nav) return;
    const onClick = (e: Event) => {
      const link = (e.target as HTMLElement).closest("a");
      if (!link) return;
      const href = link.getAttribute("href") ?? "";
      const staysHere = href.startsWith("#") || href === window.location.pathname;
      if (!staysHere && href !== "" && !href.startsWith("/v")) return;
      e.preventDefault();
      closeChat();
    };
    nav.addEventListener("click", onClick);
    return () => nav.removeEventListener("click", onClick);
  }, [open, closeChat]);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<{ text?: string }>).detail;
      openPanel(detail?.text);
    };
    window.addEventListener("vw:dialog", handler);
    return () => window.removeEventListener("vw:dialog", handler);
  }, [openPanel]);

  // Einstiegsknöpfe wecken nur die Leiste — geschrieben wird selbst.
  useEffect(() => {
    const handler = () => {
      dockInputRef.current?.focus();
      setDockFocused(true);
    };
    window.addEventListener("vw:focus-dock", handler);
    return () => window.removeEventListener("vw:focus-dock", handler);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeChat();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, closeChat]);

  const submitDock = (e: React.FormEvent) => {
    e.preventDefault();
    const text = dockDraft.trim();
    if (open) {
      // Im Gespräch ist dieselbe Leiste die Antwortzeile.
      if (!text || busy) return;
      setDockDraft("");
      void send(text);
      return;
    }
    setDockDraft("");
    openPanel(text || undefined);
  };

  const caseSummary = [sketch?.title, messages.find((m) => m.role === "user")?.display]
    .filter(Boolean)
    .join(" — ");

  const suggestedAgenda = sketch?.open?.[0] ?? "";

  // Fortschritt für die Kopfzeile: gestellte Rückfragen, gezählt am Verlauf.
  const questionsAsked = messages.filter((m) => turnPhase(m) === "question").length;
  const hasResult = result !== null;
  const stepLabel = hasResult
    ? "Ihre Skizze steht"
    : phase === "reject"
      ? ""
      : `Frage ${Math.min(MAX_QUESTIONS, Math.max(1, questionsAsked))} von höchstens ${MAX_QUESTIONS}`;

  const dockPlaceholder = !open
    ? DOCK_QUESTION
    : hasResult
      ? "Frage oder Änderungswunsch …"
      : messages.length === 0
        ? "Ihr Ziel oder Problem in ein, zwei Sätzen …"
        : "Ihre Antwort …";

  return (
    <>
      {/* Dieselbe Leiste, zwei Rollen: vor dem Gespräch der Einstieg, im
          Gespräch die Antwortzeile. Sie wird nie ersetzt, nur umgedeutet.
          id: Das offene Panel bindet die Leiste per aria-owns in den Dialog
          ein — sie steht im DOM außerhalb, gehört aber dazu. */}
      {!dockSuppressed && (
      <div
        id="dialog-dock"
        className={`dock${open ? " in-chat" : ""}${sending || (open && (busy || revealing)) ? " is-sending" : ""}${!open && dockFocused ? " is-focused" : ""}`}
      >
        <div className="dock-stack">
          {/* Beim Anklicken der Leiste poppen Beispiele auf. Ein Klick schreibt
              den Satz ins Feld — abgeschickt wird erst mit Enter, damit man
              vorher noch ergänzen kann. onMouseDown/preventDefault hält den
              Fokus im Feld, sonst verschwänden die Vorschläge vor dem Klick.
              !sending verhindert, dass sie beim Absenden kurz nochmal
              aufblitzen — submitDock leert das Feld, bevor der Chat öffnet,
              was sonst genau die Bedingung für ihr Erscheinen erfüllt. */}
          {!open && !sending && dockFocused && !dockDraft && (
            <div className="dock-hints" role="group" aria-label="Beispiele zum Übernehmen">
              {/* Nur fünf zeigen, nicht alle — sonst stapeln sich die
                  Bubbles über den ganzen Bildschirm und verdecken den Knopf
                  darunter (Rücksprache 2026-08-15). */}
              {DOCK_HINTS.slice(0, 5).map((hint, i) => (
                <button
                  key={hint.label}
                  type="button"
                  className="dock-hint"
                  style={{ animationDelay: `${i * 65}ms` }}
                  tabIndex={open ? -1 : undefined}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    setDockDraft(hint.text);
                    dockInputRef.current?.focus();
                  }}
                >
                  {hint.label}
                </button>
              ))}
            </div>
          )}
        {/* Kein Stern-Icon mehr: Auf dem Handy trieb er die Frage in den
            Umbruch (kein Platz für „Was kostet Sie gerade am meisten Zeit?"
            in einer Zeile). Der linke Innenabstand der Leiste übernimmt
            jetzt den Raum, den das Icon vorher eingenommen hat. */}
        <form className="dock-bar" onSubmit={submitDock}>
          <span className="dock-inputwrap">
            {/* Textfeld statt einzeiliger Eingabe: Es beginnt flach und wächst
                mit dem Umbruch mit. Eingabe schickt ab, Umschalt+Eingabe
                setzt eine neue Zeile. */}
            <textarea
              ref={dockInputRef}
              rows={1}
              value={dockDraft}
              maxLength={MAX_CHARS}
              onChange={(e) => setDockDraft(e.target.value)}
              onFocus={() => setDockFocused(true)}
              onBlur={() => setDockFocused(false)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  submitDock(e);
                }
              }}
              placeholder={dockPlaceholder}
              aria-label={
                open
                  ? hasResult
                    ? "Frage oder Änderungswunsch"
                    : "Ihre Antwort"
                  : "Beschreiben Sie Ihr Ziel oder Ihr Problem"
              }
            />
          </span>
          <button type="submit" className="dock-send" aria-label={open ? "Antwort senden" : "Einschätzung starten"}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="m5 12 14 0M13 6l6 6-6 6" />
            </svg>
          </button>
        </form>
        {/* KI-Offenlegung schon vor dem ersten Wort (EU-KI-VO Art. 50) —
            leise, unter der Leiste, nur im Ruhezustand. */}
        {!open && (
          <p className="dock-note">
            KI-Berater · 3 Fragen, eine Minute · Moritz prüft jede Skizze persönlich
          </p>
        )}
        </div>
      </div>
      )}

      {open && (
        <section
          className="panel"
          role="dialog"
          aria-modal="true"
          aria-label="Preiseinschätzung"
          aria-owns={dockSuppressed ? undefined : "dialog-dock"}
        >
          {/* Dauerhafte Kopfzeile: Wer antwortet, wohin die Daten gehen, wie
              weit das Gespräch ist — und der Weg hinaus. Ruhig, kein Kasten. */}
          <div className="chat-head">
            <div className="chat-head-who">
              <span className="chat-head-title">Sie sprechen mit dem KI-Berater von {SITE.name}</span>
              <span className="chat-head-note">
                Verarbeitung über Google Vertex AI — bitte keine vertraulichen Daten
              </span>
            </div>
            <div className="chat-head-side">
              {stepLabel && (
                <span className={`chat-step${hasResult ? " done" : ""}`} aria-live="polite">
                  {stepLabel}
                </span>
              )}
              <button
                type="button"
                className="chat-close"
                aria-label="Dialog schließen"
                onClick={() => closeChat()}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden>
                  <path d="M6 6l12 12M18 6 6 18" />
                </svg>
              </button>
            </div>
          </div>

          <div className="stream" ref={streamRef} role="log" aria-live="polite">
            {/* Keine Begrüßungsnachricht: Das Gespräch beginnt mit dem, was
                der Nutzer selbst geschrieben hat. */}
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
                  /* Die Antwort ist Text auf der Seite, keine Sprechblase —
                     das hält den Dialog als Teil der Seite statt als Fenster.
                     Der jeweils neueste Zug wird herausgeschrieben. */
                  <div className={`msg assistant${m.error ? " error" : ""}`}>
                    <StreamedText
                      text={m.display}
                      animate={i === animateIdx && !m.error}
                      onTick={scrollToEnd}
                      onDone={i === animateIdx ? () => setTextSettled(true) : undefined}
                    />
                  </div>
                )}
                {/* Fehler sind kein Ende: Wiederholen oder gleich den
                    Termin nehmen. Beim Tageslimit zusätzlich der Mailweg. */}
                {m.error && i === messages.length - 1 && !busy && (
                  <div className="chat-error-actions" role="group" aria-label="Weiter nach Fehler">
                    <button type="button" className="chip-btn" onClick={retryLast}>
                      Erneut senden
                    </button>
                    <a className="chip-btn" href="/termin">
                      Termin direkt buchen
                    </a>
                    {/tageslimit/i.test(m.display) && SITE.email && (
                      <a className="chip-btn" href={`mailto:${SITE.email}`}>
                        {SITE.email}
                      </a>
                    )}
                  </div>
                )}
                {/* Die eine Ergebniskarte sitzt an der Stelle des
                    Ergebniszugs und liest Skizze und Preis aus dem State —
                    ein Nachgespräch aktualisiert sie dort, statt eine zweite
                    zu rendern. Sie erscheint, sobald ihr Zug fertig
                    geschrieben ist, und bleibt bei späteren Zügen stehen. */}
                {m.result && (sketch ?? m.sketch) && (i !== animateIdx || textSettled) && (
                  <SolutionCard
                    sketch={(sketch ?? m.sketch)!}
                    result={result ?? m.result}
                    dialogId={dialogIdRef.current}
                    caseSummary={caseSummary}
                    suggestedAgenda={suggestedAgenda}
                    booked={booked}
                    onBooked={() => setBooked(true)}
                  />
                )}
              </Fragment>
            ))}

            {/* Denkanzeige: drei Punkte, die nacheinander anschwellen —
                kein Kasten, kein Text; für Hilfstechnik ein Statustext. */}
            {busy && (
              <div className="thinking" role="status">
                <span className="chat-sr-only">Antwort wird erstellt</span>
                <span className="thinking-dot" aria-hidden="true" />
                <span className="thinking-dot" aria-hidden="true" />
                <span className="thinking-dot" aria-hidden="true" />
              </div>
            )}

            {revealing && (
              <div className="reveal" role="status">
                <span className="reveal-spark"><SparkIcon size={22} /></span>
                <span className="reveal-text">Ihre Lösungsskizze wird gezeichnet …</span>
                <span className="reveal-bar"><i /></span>
              </div>
            )}

            {/* Bedienelemente des letzten Zuges — sie fliegen erst ein, wenn
                die Antwort fertig geschrieben ist (textSettled). */}
            {!busy && textSettled && input?.kind === "chips" && input.options && (
              <Chips options={input.options} onPick={(v) => void send(v)} />
            )}
            {!busy && textSettled && input?.kind === "multichips" && input.options && (
              <MultiChips options={input.options} onSubmit={(v) => void send(v)} />
            )}
            {!busy && textSettled && input?.kind === "number" && (
              <Stepper input={input} onSubmit={(v) => void send(v)} />
            )}

            <div ref={endRef} />
          </div>
          {/* Keine eigene Eingabezeile: Die Leiste unten ist dieselbe, mit
              der das Gespräch begonnen hat — nach dem Ergebnis bleibt sie
              für Fragen und Änderungswünsche offen. */}
        </section>
      )}
    </>
  );
}

"use client";

import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import type { DialogTurn, UiMessage } from "@/components/chat/types";
import { Chips, MultiChips, Stepper } from "@/components/chat/Controls";
import Booking from "@/components/chat/Booking";
import BlueprintApp from "./BlueprintApp";
import type { SolutionBlueprint } from "@/lib/blueprint";
import { captureAttribution, track } from "@/lib/track";
import styles from "./blueprint-funnel.module.css";

const EXAMPLES = [
  [
    "Bestätigungen prüfen",
    "Wir prüfen Auftragsbestätigungen aus E-Mail und PDF gegen unsere Bestellungen und klären Preis-, Mengen- und Terminabweichungen.",
  ],
  [
    "Reporting erstellen",
    "Wir führen jeden Monat mehrere Excel-Dateien zusammen, prüfen die Zahlen und erstellen daraus einen Managementbericht.",
  ],
  [
    "Reklamationen bearbeiten",
    "Wir erfassen Reklamationen aus E-Mails, suchen Nachweise und bereiten eine Antwort zur Freigabe vor.",
  ],
  [
    "Daten übertragen",
    "Unser Team überträgt regelmäßig Daten zwischen Formularen, Excel und unserem ERP und muss Fehler von Hand nachprüfen.",
  ],
];
const money = (n: number) =>
  new Intl.NumberFormat("de-DE", { maximumFractionDigits: 0 }).format(
    Math.round(n),
  );
const range = (v: { low: number; high: number }, unit = "") =>
  `${money(v.low)}–${money(v.high)}${unit}`;

export function startBlueprint(text = "", submit = false) {
  window.dispatchEvent(
    new CustomEvent("opsdone:chat", { detail: { text, submit } }),
  );
}

export default function BlueprintFunnel() {
  const pathname = usePathname();
  const modal = useRef<HTMLDialogElement>(null);
  const abort = useRef<AbortController | null>(null);
  const locked = useRef(false);
  const id = useRef("");
  const history = useRef<UiMessage[]>([]);
  const sendRef = useRef<(text: string) => void>(() => {});
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<UiMessage[]>([]);
  const [turn, setTurn] = useState<DialogTurn | null>(null);
  const [blueprint, setBlueprint] = useState<SolutionBlueprint | null>(null);
  const [result, setResult] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [booking, setBooking] = useState(false);
  const [emailOpen, setEmailOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [emailBusy, setEmailBusy] = useState(false);
  const [emailMessage, setEmailMessage] = useState("");
  const [emailError, setEmailError] = useState("");
  const [stage, setStage] = useState(0);
  const resultRef = useRef<HTMLDivElement>(null);
  const bookRef = useRef<HTMLElement>(null);
  const questionRef = useRef<HTMLDivElement>(null);
  const liveRef = useRef<HTMLDivElement>(null);
  const emailFormRef = useRef<HTMLFormElement>(null);
  const emailAbort = useRef<AbortController | null>(null);

  const show = useCallback((text = "") => {
    if (!id.current) id.current = crypto.randomUUID();
    if (text) setDraft(text);
    if (!modal.current?.open) {
      if (!window.history.state?.opsdoneBlueprint)
        window.history.pushState(
          { ...window.history.state, opsdoneBlueprint: true },
          "",
          window.location.href,
        );
      modal.current?.showModal();
    }
    setOpen(true);
    track("dialog_opened", { dialogId: id.current });
  }, []);
  const close = () => {
    modal.current?.close();
    setOpen(false);
    if (window.history.state?.opsdoneBlueprint) window.history.back();
  };
  useEffect(() => {
    const back = () => {
      if (!window.history.state?.opsdoneBlueprint) {
        modal.current?.close();
        setOpen(false);
      }
    };
    window.addEventListener("popstate", back);
    return () => window.removeEventListener("popstate", back);
  }, []);
  useEffect(() => {
    if (emailOpen)
      emailFormRef.current?.scrollIntoView({
        block: "center",
        behavior: "smooth",
      });
  }, [emailOpen]);
  useEffect(() => {
    // A reload must not leave a phantom open-dialog history entry.
    if (window.history.state?.opsdoneBlueprint)
      window.history.replaceState(
        { ...window.history.state, opsdoneBlueprint: false },
        "",
        window.location.href,
      );
    captureAttribution();
    track("page_view");
    return () => {
      abort.current?.abort();
      emailAbort.current?.abort();
    };
  }, []);
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);
  useEffect(() => {
    const launch = (event: Event) => {
      const detail = (event as CustomEvent<{ text?: string; submit?: boolean }>)
        .detail;
      show(detail?.text);
      if (detail?.submit && detail.text?.trim()) sendRef.current(detail.text);
    };
    const click = (e: MouseEvent) => {
      if (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      )
        return;
      const a = (e.target as Element).closest<HTMLAnchorElement>("a[href]");
      if (!a || a.target === "_blank") return;
      const url = new URL(a.href);
      if (url.origin !== location.origin) return;
      if (
        ["/prozess-check", "/termin"].includes(url.pathname) &&
        !url.searchParams.has("formular")
      ) {
        e.preventDefault();
        show();
        if (url.pathname === "/termin") setBooking(true);
      }
    };
    window.addEventListener("opsdone:chat", launch);
    document.addEventListener("click", click, true);
    return () => {
      window.removeEventListener("opsdone:chat", launch);
      document.removeEventListener("click", click, true);
    };
  }, [show, pathname]);
  useEffect(() => {
    if (!busy) return;
    setStage(0);
    const timer = setInterval(() => setStage((n) => Math.min(n + 1, 3)), 2200);
    return () => clearInterval(timer);
  }, [busy]);
  useEffect(() => {
    if (result) resultRef.current?.scrollIntoView({ block: "start" });
    else if (turn && !busy)
      questionRef.current?.scrollIntoView({ block: "nearest" });
  }, [turn, result, busy]);
  useEffect(() => {
    if (booking)
      bookRef.current?.scrollIntoView({ block: "start", behavior: "smooth" });
  }, [booking]);

  const send = async (text: string, retry = false) => {
    const value = text.trim().slice(0, 1500);
    if (!value || locked.current) return;
    if (!id.current) id.current = crypto.randomUUID();
    if (result) {
      history.current = [];
      id.current = crypto.randomUUID();
      setResult(false);
      setBlueprint(null);
      setBooking(false);
      setEmailOpen(false);
      setEmailMessage("");
    }
    locked.current = true;
    setBusy(true);
    setError("");
    setDraft("");
    const clean = [...history.current];
    if (retry && clean.at(-1)?.role === "user") clean.pop();
    const next: UiMessage[] = [...clean, { role: "user", display: value }];
    history.current = next;
    setMessages(next);
    track(clean.length ? "dialog_question" : "dialog_started", {
      dialogId: id.current,
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
          dialogId: id.current,
          messages: next.map((m) => ({
            role: m.role,
            content: m.raw ?? m.display,
          })),
        }),
      });
      const data = await response.json();
      if (!response.ok || !data.ok || !data.turn)
        throw Error(
          data.error || "Ihr Entwurf konnte gerade nicht erstellt werden.",
        );
      const answer = data.turn as DialogTurn;
      const updated: UiMessage[] = [
        ...next,
        {
          role: "assistant",
          display: answer.reply,
          raw: JSON.stringify(answer),
        },
      ];
      history.current = updated;
      setMessages(updated);
      setTurn(answer);
      if (answer.blueprint) setBlueprint(answer.blueprint);
      if (answer.result) {
        if (!answer.blueprint)
          throw Error(
            "Die Anwendungsansicht fehlt noch. Bitte versuchen Sie es erneut.",
          );
        setResult(true);
        track("result_delivered", { dialogId: id.current });
      }
    } catch (e) {
      setError(
        controller.signal.aborted
          ? "Die Erstellung dauert gerade zu lange. Ihre Angaben bleiben erhalten. Versuchen Sie es erneut."
          : e instanceof Error
            ? e.message
            : "Keine Verbindung. Ihre Angaben bleiben erhalten.",
      );
    } finally {
      clearTimeout(timer);
      locked.current = false;
      setBusy(false);
      abort.current = null;
    }
  };
  sendRef.current = (text) => {
    void send(text);
  };
  const begin = (e: FormEvent) => {
    e.preventDefault();
    show(draft);
    if (draft.trim()) void send(draft);
  };
  const book = () => {
    setBooking(true);
    track("booking_opened", { dialogId: id.current });
  };
  const sendEmail = async (e: FormEvent) => {
    e.preventDefault();
    if (emailBusy) return;
    setEmailBusy(true);
    setEmailError("");
    const controller = new AbortController();
    emailAbort.current = controller;
    const timeout = setTimeout(() => controller.abort(), 25000);
    try {
      const response = await fetch("/api/blueprint-email", {
        method: "POST",
        signal: controller.signal,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dialogId: id.current, email }),
      });
      const data = await response.json();
      if (!response.ok || !data.ok)
        throw Error(data.error || "Der Versand ist gerade nicht möglich.");
      setEmailMessage(data.message);
      track("blueprint_email_requested", { dialogId: id.current });
    } catch (e) {
      setEmailError(
        controller.signal.aborted
          ? "Der Versand ist noch nicht bestätigt. Bitte versuchen Sie es erneut."
          : e instanceof Error
            ? e.message
            : "Der Versand ist gerade nicht möglich.",
      );
    } finally {
      clearTimeout(timeout);
      setEmailBusy(false);
      emailAbort.current = null;
    }
  };
  const first = messages.find((m) => m.role === "user")?.display || "";
  const questions = messages.filter((m) => {
    try {
      return JSON.parse(m.raw || "{}").phase === "question";
    } catch {
      return false;
    }
  }).length;
  const summary = [blueprint?.title, first].filter(Boolean).join(" — ");

  return (
    <>
      <aside
        className={styles.dock}
        aria-label="Ihren Solution Blueprint erstellen"
      >
        <form onSubmit={begin}>
          <span aria-hidden="true">✦</span>
          <input
            aria-label="Welche Arbeit kostet Ihr Team am meisten Zeit?"
            placeholder="Welche Arbeit kostet Ihr Team am meisten Zeit?"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            maxLength={1500}
          />
          <button aria-label="Blueprint erstellen">
            {result ? "Blueprint öffnen" : "Entwurf starten"}
            <span aria-hidden="true">↗</span>
          </button>
        </form>
        <p>
          Ihre Anwendung · Ihr neuer Ablauf · Ihr Potenzial{" "}
          <span>Ohne E-Mail-Pflicht</span>
        </p>
      </aside>
      <dialog
        ref={modal}
        className={styles.dialog}
        aria-labelledby="blueprint-title"
        onCancel={(e) => {
          e.preventDefault();
          close();
        }}
        onClose={() => setOpen(false)}
      >
        <header className={styles.header}>
          <div className={styles.brand}>
            ✦ OpsDone<span>Solution Blueprint</span>
          </div>
          <button
            className={styles.close}
            onClick={close}
            aria-label="Blueprint schließen"
          >
            ×
          </button>
        </header>
        <div className={styles.scroll}>
          {!result && (
            <div className={styles.workbench}>
              <div className={styles.intake} ref={questionRef}>
                <p className={styles.eyebrow}>
                  VON IHRER ARBEIT ZU IHRER ANWENDUNG
                </p>
                <h2
                  id="blueprint-title"
                  className={messages.length ? styles.compactTitle : undefined}
                >
                  {messages.length
                    ? "Ihre Anwendung nimmt Form an."
                    : "Welche wiederkehrende Arbeit kostet Ihr Team am meisten Zeit?"}
                </h2>
                {!messages.length ? (
                  <>
                    <p className={styles.intro}>
                      Beschreiben Sie Ihren Ablauf. In wenigen Schritten sehen
                      Sie, was wir dafür bauen würden.
                    </p>
                    <form onSubmit={begin}>
                      <label
                        className={styles.srOnly}
                        htmlFor="blueprint-process"
                      >
                        Ihr Prozess
                      </label>
                      <textarea
                        id="blueprint-process"
                        value={draft}
                        onChange={(e) => setDraft(e.target.value)}
                        placeholder="Zum Beispiel: Wir gleichen jede Woche …"
                        maxLength={1500}
                        rows={4}
                      />
                      <button
                        className={styles.primary}
                        disabled={!draft.trim()}
                      >
                        Meinen Blueprint erstellen <span>↗</span>
                      </button>
                    </form>
                    <div className={styles.examples}>
                      {EXAMPLES.map(([label, text]) => (
                        <button key={label} onClick={() => void send(text)}>
                          {label} <span>↗</span>
                        </button>
                      ))}
                    </div>
                    <p className={styles.note}>
                      Ca. 60–90 Sekunden · Keine Kontaktdaten nötig
                    </p>
                  </>
                ) : (
                  <>
                    <details className={styles.processSummary}>
                      <summary>
                        Ihr Prozess <span>✓</span>
                      </summary>
                      <p>{first}</p>
                      {messages
                        .filter((m) => m.role === "user")
                        .slice(1)
                        .map((m, i) => (
                          <p key={i}>{m.display}</p>
                        ))}
                    </details>
                    {busy ? (
                      <div className={styles.thinking} role="status">
                        <span className={styles.spinner} />
                        <h3>
                          {questions >= 2
                            ? "Ihr Blueprint entsteht."
                            : "Ihr Prozess nimmt Form an."}
                        </h3>
                        <p>
                          {
                            [
                              "Wir ordnen Ihre Angaben ein.",
                              "Wir strukturieren Ablauf und Anwendung.",
                              "Wir prüfen die Grundlage für Aufwand und Investment.",
                              "Der Entwurf wird vorbereitet. Einen Moment noch …",
                            ][stage]
                          }
                        </p>
                        <div className={styles.thinkingLine} />
                      </div>
                    ) : (
                      <>
                        {turn && (
                          <div className={styles.question}>
                            <p>{turn.reply}</p>
                            {turn.phase !== "reject" && (
                              <span className={styles.note}>
                                Eine kurze Antwort genügt.
                              </span>
                            )}
                          </div>
                        )}
                        {error && (
                          <div className={styles.error} role="alert">
                            <p>{error}</p>
                            <button
                              onClick={() =>
                                void send(
                                  history.current
                                    .filter((m) => m.role === "user")
                                    .at(-1)?.display || first,
                                  true,
                                )
                              }
                            >
                              Erneut versuchen
                            </button>
                            <button onClick={book}>
                              Direkt gemeinsam besprechen
                            </button>
                          </div>
                        )}
                        {!error && turn?.phase === "question" && (
                          <div
                            className={styles.controls}
                            key={messages.length}
                          >
                            {turn.input?.kind === "chips" && (
                              <Chips
                                options={turn.input.options || []}
                                onPick={(text) => void send(text)}
                              />
                            )}
                            {turn.input?.kind === "multichips" && (
                              <MultiChips
                                options={turn.input.options || []}
                                onSubmit={(text) => void send(text)}
                              />
                            )}
                            {turn.input?.kind === "number" && (
                              <Stepper
                                input={turn.input}
                                onSubmit={(text) => void send(text)}
                              />
                            )}
                          </div>
                        )}
                        {turn?.phase !== "reject" && (
                          <form
                            className={styles.answerForm}
                            onSubmit={(e) => {
                              e.preventDefault();
                              void send(draft);
                            }}
                          >
                            <label htmlFor="blueprint-answer">
                              {turn?.input
                                ? "Oder in eigenen Worten"
                                : "Ihre Antwort"}
                            </label>
                            <div>
                              <textarea
                                id="blueprint-answer"
                                value={draft}
                                onChange={(e) => setDraft(e.target.value)}
                                maxLength={1500}
                                rows={2}
                                placeholder="Eine kurze Antwort genügt …"
                              />
                              <button
                                disabled={!draft.trim()}
                                aria-label="Antwort übernehmen"
                              >
                                ↗
                              </button>
                            </div>
                          </form>
                        )}
                        {turn?.phase === "reject" && (
                          <button className={styles.primary} onClick={book}>
                            Prozess persönlich besprechen ↗
                          </button>
                        )}
                      </>
                    )}
                  </>
                )}
                {blueprint && (
                  <button
                    type="button"
                    className={styles.mobilePreviewLink}
                    onClick={() =>
                      liveRef.current?.scrollIntoView({
                        block: "start",
                        behavior: "smooth",
                      })
                    }
                  >
                    ✦ Ihr Entwurf entsteht{" "}
                    {blueprint.metrics.monthlyVolume !== null
                      ? ` · ${money(blueprint.metrics.monthlyVolume)} Vorgänge/Monat`
                      : ""}{" "}
                    <span>Ansicht ↓</span>
                  </button>
                )}
                <p className={styles.privacy}>
                  KI-gestützter Lösungsentwurf · Bitte keine vertraulichen Daten
                  eingeben.{" "}
                  <a href="/datenschutz" target="_blank" rel="noreferrer">
                    Datenschutz
                  </a>
                </p>
              </div>
              <div className={styles.livePreview} ref={liveRef}>
                <div className={styles.previewHeading}>
                  <span>YOUR SOLUTION</span>
                  <span>
                    {blueprint
                      ? "Aus Ihren Angaben"
                      : "So könnte Ihr Entwurf aussehen"}
                  </span>
                </div>
                {blueprint ? (
                  <>
                    <div className={styles.facts}>
                      <div>
                        <small>EINGÄNGE</small>
                        <strong>
                          {blueprint.inputs.join(" + ") || "Werden geklärt"}
                        </strong>
                      </div>
                      <div>
                        <small>VOLUMEN</small>
                        <strong>
                          {blueprint.metrics.monthlyVolume !== null
                            ? `${money(blueprint.metrics.monthlyVolume)} / Monat`
                            : "Noch offen"}
                        </strong>
                      </div>
                      <div>
                        <small>SYSTEME</small>
                        <strong>
                          {blueprint.integrations.join(" · ") || "Noch offen"}
                        </strong>
                      </div>
                    </div>
                    <BlueprintApp
                      blueprint={blueprint}
                      key={blueprint.processType}
                    />
                  </>
                ) : (
                  <div className={styles.emptyApp}>
                    <span className={styles.appIcon}>O</span>
                    <h3>
                      Ihre Arbeit.
                      <br />
                      Als Anwendung gedacht.
                    </h3>
                    <div className={styles.skeletonRow}>
                      <span>01</span>Eingänge erfassen
                      <i />
                    </div>
                    <div className={styles.skeletonRow}>
                      <span>02</span>Daten prüfen
                      <i />
                    </div>
                    <div className={styles.skeletonRow}>
                      <span>03</span>Entscheidungen vorbereiten
                      <i />
                    </div>
                    <div className={styles.skeletonOutput}>
                      Ein klares Ergebnis statt vieler Handgriffe.
                    </div>
                    <p>
                      Beispielstruktur. Ihre Angaben bestimmen Ansichten,
                      Funktionen und Freigaben.
                    </p>
                  </div>
                )}
                <p className={styles.note}>
                  Vorläufiges Lösungskonzept. Noch keine fertige Anwendung.
                </p>
              </div>
            </div>
          )}
          {result && blueprint && (
            <div className={styles.result} ref={resultRef}>
              <div className={styles.resultHeading}>
                <div>
                  <p className={styles.eyebrow}>
                    WORK ELIMINATED. / IHR LÖSUNGSENTWURF
                  </p>
                  <h2 id="blueprint-title">
                    Your OpsDone Blueprint<span>.</span>
                  </h2>
                  <p>{blueprint.summary}</p>
                </div>
                <button className={styles.primary} onClick={book}>
                  Diese Lösung konkretisieren ↗
                </button>
              </div>
              <section
                className={styles.software}
                aria-labelledby="your-app-title"
              >
                <div className={styles.sectionHeader}>
                  <div>
                    <p className={styles.eyebrow}>01 / YOUR SOFTWARE</p>
                    <h3 id="your-app-title">{blueprint.title}</h3>
                  </div>
                  <span className={styles.conceptBadge}>
                    Vorläufiger Entwurf · Beispieldaten
                  </span>
                </div>
                <BlueprintApp
                  blueprint={blueprint}
                  key={blueprint.processType}
                />
                <div className={styles.functionList}>
                  {blueprint.actions.map((x) => (
                    <span key={x}>↗ {x}</span>
                  ))}
                </div>
              </section>
              <section
                className={styles.processCard}
                aria-labelledby="new-process-title"
              >
                <p className={styles.eyebrow}>02 / YOUR NEW PROCESS</p>
                <h3 id="new-process-title">Die Arbeit dazwischen fällt weg.</h3>
                <div className={styles.processGrid}>
                  <div>
                    <h4>HEUTE</h4>
                    <ol>
                      {blueprint.todaySteps.map((s, i) => (
                        <li key={i}>
                          <span>{String(i + 1).padStart(2, "0")}</span>
                          {s}
                        </li>
                      ))}
                    </ol>
                  </div>
                  <div className={styles.compressArrow} aria-hidden="true">
                    →
                  </div>
                  <div>
                    <h4>MIT OPSDONE</h4>
                    <p className={styles.inputFlow}>
                      {blueprint.inputs.join(" + ") || "Ihre Eingänge"}
                    </p>
                    <div className={styles.softwareBlock}>
                      <span>✦ OPSDONE APP</span>
                      <strong>{blueprint.title}</strong>
                      <p>
                        Standardfälle bearbeiten.
                        <br />
                        Ausnahmen zur Entscheidung vorbereiten.
                      </p>
                    </div>
                    <p className={styles.outputFlow}>
                      ↓<br />
                      {blueprint.outputs.join(" · ") || "Geprüftes Ergebnis"}
                    </p>
                    <p className={styles.humanNote}>
                      Bei Ihrem Team:{" "}
                      {blueprint.approvals.join(" · ") ||
                        "Freigaben und fachliche Entscheidungen"}
                    </p>
                  </div>
                </div>
              </section>
              <div className={styles.economicGrid}>
                <section className={styles.impactCard}>
                  <p className={styles.eyebrow}>03 / WORK ELIMINATED</p>
                  <h3>Was Ihre Arbeit heute bindet.</h3>
                  <div className={styles.bigMetric}>
                    {blueprint.metrics.annualHours !== null
                      ? `${money(blueprint.metrics.annualHours)} h`
                      : "Noch offen"}
                    <span>manueller Aufwand pro Jahr</span>
                  </div>
                  <p>
                    {blueprint.metrics.monthlyVolume !== null &&
                    blueprint.metrics.minutesPerCase !== null
                      ? `${money(blueprint.metrics.monthlyVolume)} Vorgänge / Monat × ${blueprint.metrics.minutesPerCase} Minuten × 12 Monate.`
                      : "Für einen belastbaren Ausgangswert fehlen Volumen oder Bearbeitungszeit."}
                  </p>
                  <div className={styles.scenarioLabel}>
                    RECHENSZENARIO · KEINE EINSPARPROGNOSE
                  </div>
                  <p className={styles.note}>
                    Angenommen,{" "}
                    {Math.round(blueprint.impact.scenarioShare.low * 100)}–
                    {Math.round(blueprint.impact.scenarioShare.high * 100)} %
                    des heutigen Aufwands entfallen, bewertet mit{" "}
                    {money(blueprint.impact.hourlyRate)} € je Stunde. Den
                    tatsächlichen Anteil prüfen wir im Pilot.
                  </p>
                  <dl>
                    <div>
                      <dt>Entfallende Handarbeit</dt>
                      <dd>
                        {blueprint.impact.annualHours
                          ? range(blueprint.impact.annualHours, " h / Jahr")
                          : "Nach Aufwandsklärung"}
                      </dd>
                    </div>
                    <div>
                      <dt>Wert freigesetzter Kapazität</dt>
                      <dd>
                        {blueprint.impact.annualCapacityEuro
                          ? range(
                              blueprint.impact.annualCapacityEuro,
                              " € / Jahr",
                            )
                          : "Noch nicht berechenbar"}
                      </dd>
                    </div>
                  </dl>
                  <p className={styles.note}>
                    Freie Kapazität ist keine automatische Senkung Ihrer
                    Personalkosten.
                  </p>
                  <details>
                    <summary>Rechenannahmen ansehen</summary>
                    {blueprint.impact.assumptions.map((s, i) => (
                      <p key={i}>{s}</p>
                    ))}
                  </details>
                </section>
                <section className={styles.investmentCard}>
                  <p className={styles.eyebrow}>04 / INVESTMENT & RETURN</p>
                  <h3>Der Rahmen für Ihre Anwendung.</h3>
                  <div className={styles.bigMetric}>
                    {range(blueprint.investment.implementation, " €")}
                    <span>einmalige Umsetzung · indikatives Preisband</span>
                  </div>
                  <dl>
                    <div>
                      <dt>Entwicklung & Einführung</dt>
                      <dd>
                        {range(blueprint.investment.implementation, " €")}
                      </dd>
                    </div>
                    <div>
                      <dt>Laufender Betrieb</dt>
                      <dd>
                        {range(blueprint.investment.monthly, " € / Monat")}
                      </dd>
                    </div>
                    <div>
                      <dt>Kapazitätsbasierter Rückfluss im Szenario</dt>
                      <dd>
                        {blueprint.impact.paybackMonths
                          ? range(blueprint.impact.paybackMonths, " Monate")
                          : "Noch nicht belastbar"}
                      </dd>
                    </div>
                  </dl>
                  <p className={styles.note}>
                    Unverbindliche Schätzung, netto zzgl. USt. Leistungsumfang
                    und Preis nach technischer Prüfung. Kein Angebot.
                  </p>
                  <details>
                    <summary>Was die Schätzung bestimmt</summary>
                    {blueprint.investment.factors.map((s, i) => (
                      <p key={i}>{s.label}</p>
                    ))}
                    {blueprint.investment.assumptions.map((s, i) => (
                      <p key={`a${i}`}>{s}</p>
                    ))}
                  </details>
                </section>
              </div>
              <section className={styles.feasibility}>
                <div>
                  <p className={styles.eyebrow}>
                    MACHBARKEIT / ERSTE EINORDNUNG
                  </p>
                  <h3>{blueprint.feasibility.label}</h3>
                  {blueprint.feasibility.reasons.map((s, i) => (
                    <p key={i}>{s}</p>
                  ))}
                </div>
                <div>
                  <h4>Das klären wir gemeinsam</h4>
                  <ul>
                    {blueprint.openQuestions.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </div>
              </section>
              <section className={styles.conversion}>
                <p className={styles.eyebrow}>IHR NÄCHSTER SCHRITT</p>
                <h3>
                  Lassen Sie uns daraus
                  <br />
                  Ihre Anwendung machen.
                </h3>
                <p>
                  30 Minuten · kostenlos · keine Vorbereitung nötig.
                  <br />
                  Wir prüfen Prozess, Systeme und Machbarkeit und konkretisieren
                  Ihren Blueprint.
                </p>
                <div className={styles.ctas}>
                  <button className={styles.primary} onClick={book}>
                    Diese Lösung gemeinsam konkretisieren ↗
                  </button>
                  <button
                    className={styles.secondary}
                    onClick={() => {
                      setEmailOpen(true);
                      track("blueprint_email_opened", { dialogId: id.current });
                    }}
                  >
                    Blueprint per E-Mail erhalten
                  </button>
                </div>
                <p className={styles.note}>
                  Ihr Blueprint wird zum Gespräch mitgegeben. Sie müssen Ihren
                  Prozess nicht noch einmal erklären.
                </p>
                {emailOpen && (
                  <form
                    className={styles.emailForm}
                    onSubmit={sendEmail}
                    ref={emailFormRef}
                  >
                    {emailMessage ? (
                      <p role="status">{emailMessage}</p>
                    ) : (
                      <>
                        <label htmlFor="blueprint-email">
                          Wohin dürfen wir Ihren Blueprint senden?
                        </label>
                        <div>
                          <input
                            id="blueprint-email"
                            type="email"
                            autoComplete="email"
                            required
                            maxLength={254}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="sie@unternehmen.de"
                          />
                          <button disabled={emailBusy}>
                            {emailBusy
                              ? "Wird angefordert …"
                              : "Blueprint senden ↗"}
                          </button>
                        </div>
                        <p>
                          Nur der angeforderte Blueprint. Keine automatische
                          Newsletter-Anmeldung.{" "}
                          <a
                            href="/datenschutz"
                            target="_blank"
                            rel="noreferrer"
                          >
                            Datenschutz
                          </a>
                        </p>
                        {emailError && (
                          <p role="alert" className={styles.error}>
                            {emailError}
                          </p>
                        )}
                      </>
                    )}
                  </form>
                )}
              </section>
            </div>
          )}
          {booking && (
            <section
              className={styles.booking}
              ref={bookRef}
              aria-label="Blueprint gemeinsam konkretisieren"
            >
              <Booking
                dialogId={id.current}
                caseSummary={summary || first}
                suggestedAgenda={
                  blueprint
                    ? `Blueprint: ${blueprint.title}. Systeme, Machbarkeit und Pilotumfang prüfen.`
                    : undefined
                }
              />
            </section>
          )}
          <footer className={styles.footer}>
            OpsDone · Work eliminated.{" "}
            <a href="/datenschutz" target="_blank" rel="noreferrer">
              Datenschutz
            </a>
            <a href="/impressum" target="_blank" rel="noreferrer">
              Impressum
            </a>
          </footer>
        </div>
      </dialog>
    </>
  );
}

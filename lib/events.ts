/**
 * Trichter-Messung (Nachfragetest, Rücksprache 2026-08-15).
 *
 * Zweck ist nicht Webanalyse, sondern eine einzige Frage: An welcher Stelle
 * verlieren wir Besucher — und welche Hypothese ist damit widerlegt? Deshalb
 * werden bewusst wenige, klar benannte Schritte gezählt statt alles Mögliche.
 *
 * Datensparsam: keine IP, keine Cookies, keine Drittanbieter. Die Sitzungs-ID
 * ist eine Zufallszahl im sessionStorage des Browsers und verfällt mit dem
 * Schließen des Tabs. Damit bleibt die Messung ohne Einwilligung zulässig;
 * erst die spätere Google-Anbindung braucht ein Consent-Banner.
 */
import { FieldValue, Firestore } from "@google-cloud/firestore";
import { safe } from "./firestore";

/** Die Stufen des Trichters, in der Reihenfolge der Auswertung. */
export const FUNNEL_STEPS = [
  { type: "page_view", label: "Seite gesehen" },
  { type: "dialog_opened", label: "Dialog geöffnet" },
  { type: "dialog_started", label: "Erste Antwort geschrieben" },
  { type: "result_delivered", label: "Lösungsskizze erhalten" },
  { type: "booking_slot_selected", label: "Termin ausgewählt" },
  { type: "booked", label: "Termin gebucht" },
] as const;

export type EventType =
  | (typeof FUNNEL_STEPS)[number]["type"]
  | "dialog_question"
  | "lead_email"
  | "rejected";

const KNOWN_TYPES = new Set<string>([
  ...FUNNEL_STEPS.map((s) => s.type),
  "dialog_question",
  "lead_email",
  "rejected",
]);

export function isEventType(value: unknown): value is EventType {
  return typeof value === "string" && KNOWN_TYPES.has(value);
}

/** Werbe-Herkunft. Wird vom Browser beim ersten Seitenaufruf eingesammelt. */
export interface Attribution {
  gclid?: string;
  gbraid?: string;
  wbraid?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  referrer?: string;
  landing?: string;
}

const ATTR_KEYS: (keyof Attribution)[] = [
  "gclid", "gbraid", "wbraid",
  "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content",
  "referrer", "landing",
];

/** Nimmt nur bekannte Felder und kappt die Länge — nichts Fremdes in die Datenbank. */
export function cleanAttribution(raw: unknown): Attribution {
  const out: Attribution = {};
  if (!raw || typeof raw !== "object") return out;
  const obj = raw as Record<string, unknown>;
  for (const key of ATTR_KEYS) {
    const v = obj[key];
    if (typeof v === "string" && v.trim() !== "") out[key] = v.trim().slice(0, 300);
  }
  return out;
}

export interface EventInput {
  type: EventType;
  sessionId: string;
  dialogId?: string | null;
  path?: string;
  attr?: Attribution;
  meta?: Record<string, string | number | boolean>;
}

/** Tagesstempel in Europe/Berlin — Grundlage für die Tagesauswertung. */
export function berlinDay(d = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Berlin",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(d);
}

/** Schreibt ein Ereignis. Schlägt das fehl, bricht nie der Funnel. */
export async function recordEvent(input: EventInput): Promise<void> {
  await safe(
    (db) =>
      db.collection("events").add({
        type: input.type,
        sessionId: input.sessionId.slice(0, 64),
        dialogId: input.dialogId ?? null,
        path: (input.path ?? "").slice(0, 200),
        attr: input.attr ?? {},
        meta: input.meta ?? {},
        day: berlinDay(),
        createdAt: FieldValue.serverTimestamp(),
      }),
    `Ereignis ${input.type}`
  );
}

/* ---------- Auswertung ---------- */

export interface StoredEvent {
  type: string;
  sessionId: string;
  dialogId: string | null;
  path: string;
  attr: Attribution;
  meta: Record<string, unknown>;
  day: string;
  createdAt: Date | null;
}

/** Lädt die Ereignisse der letzten `days` Tage (Obergrenze gegen Ausreißer). */
export async function loadEvents(days: number, limit = 8000): Promise<StoredEvent[]> {
  const cutoff = new Date(Date.now() - days * 24 * 3600 * 1000);
  const rows = await safe(async (db: Firestore) => {
    const snap = await db
      .collection("events")
      .where("createdAt", ">=", cutoff)
      .orderBy("createdAt", "desc")
      .limit(limit)
      .get();
    return snap.docs.map((d) => {
      const v = d.data();
      return {
        type: String(v.type ?? ""),
        sessionId: String(v.sessionId ?? ""),
        dialogId: (v.dialogId as string) ?? null,
        path: String(v.path ?? ""),
        attr: (v.attr as Attribution) ?? {},
        meta: (v.meta as Record<string, unknown>) ?? {},
        day: String(v.day ?? ""),
        createdAt: v.createdAt?.toDate?.() ?? null,
      };
    });
  }, "Ereignisse laden");
  return rows ?? [];
}

export interface FunnelRow {
  type: string;
  label: string;
  /** Verschiedene Sitzungen, die diese Stufe erreicht haben. */
  sessions: number;
  /** Anteil an der ersten Stufe. */
  ofTop: number;
  /** Anteil an der jeweils vorherigen Stufe — hier sieht man den Absprung. */
  ofPrev: number;
}

/** Zählt je Stufe die verschiedenen Sitzungen und die Absprungquoten. */
export function buildFunnel(events: StoredEvent[]): FunnelRow[] {
  const perType = new Map<string, Set<string>>();
  for (const e of events) {
    if (!e.sessionId) continue;
    if (!perType.has(e.type)) perType.set(e.type, new Set());
    perType.get(e.type)!.add(e.sessionId);
  }
  const rows: FunnelRow[] = [];
  let top = 0;
  let prev = 0;
  for (const step of FUNNEL_STEPS) {
    const n = perType.get(step.type)?.size ?? 0;
    if (rows.length === 0) {
      top = n;
      prev = n;
    }
    rows.push({
      type: step.type,
      label: step.label,
      sessions: n,
      ofTop: top > 0 ? n / top : 0,
      ofPrev: prev > 0 ? n / prev : 0,
    });
    prev = n;
  }
  return rows;
}

export interface SourceRow {
  source: string;
  sessions: number;
  dialogs: number;
  results: number;
  bookings: number;
}

/** Gruppiert die Sitzungen nach Herkunft — welcher Kanal liefert echte Dialoge? */
export function buildSources(events: StoredEvent[]): SourceRow[] {
  // Herkunft je Sitzung aus dem frühesten Ereignis bestimmen.
  const sessionSource = new Map<string, string>();
  const ordered = [...events].sort(
    (a, b) => (a.createdAt?.getTime() ?? 0) - (b.createdAt?.getTime() ?? 0)
  );
  for (const e of ordered) {
    if (!e.sessionId || sessionSource.has(e.sessionId)) continue;
    const a = e.attr ?? {};
    let src: string;
    if (a.gclid || a.gbraid || a.wbraid) src = `Google Ads${a.utm_campaign ? ` · ${a.utm_campaign}` : ""}`;
    else if (a.utm_source) src = `${a.utm_source}${a.utm_campaign ? ` · ${a.utm_campaign}` : ""}`;
    else if (a.referrer) {
      try {
        src = new URL(a.referrer).hostname.replace(/^www\./, "");
      } catch {
        src = "verweisend";
      }
    } else src = "direkt";
    sessionSource.set(e.sessionId, src);
  }

  const agg = new Map<string, SourceRow>();
  const seen = new Map<string, Set<string>>(); // source -> sessions je Stufe
  const bump = (src: string, key: keyof SourceRow, session: string, bucket: string) => {
    if (!agg.has(src)) agg.set(src, { source: src, sessions: 0, dialogs: 0, results: 0, bookings: 0 });
    const k = `${src}|${bucket}`;
    if (!seen.has(k)) seen.set(k, new Set());
    const set = seen.get(k)!;
    if (set.has(session)) return;
    set.add(session);
    (agg.get(src)![key] as number) += 1;
  };

  for (const e of events) {
    const src = sessionSource.get(e.sessionId);
    if (!src) continue;
    if (e.type === "page_view") bump(src, "sessions", e.sessionId, "s");
    if (e.type === "dialog_started") bump(src, "dialogs", e.sessionId, "d");
    if (e.type === "result_delivered") bump(src, "results", e.sessionId, "r");
    if (e.type === "booked") bump(src, "bookings", e.sessionId, "b");
  }
  return [...agg.values()].sort((a, b) => b.sessions - a.sessions);
}

/* ---------- Fälle (der eigentliche Schatz) ---------- */

export interface CaseRow {
  dialogId: string;
  updatedAt: Date | null;
  firstMessage: string;
  sketchTitle: string;
  lastPhase: string;
  turns: number;
  tier: string | null;
  price: number | null;
  annualEuro: number | null;
  personDays: number | null;
}

/**
 * Liest die geführten Dialoge im Klartext. Nach 50 Fällen zeigt sich hier,
 * WELCHES Produkt der Markt eigentlich will — nicht nur ob er etwas will.
 */
export async function loadCases(limit = 200): Promise<CaseRow[]> {
  const rows = await safe(async (db: Firestore) => {
    const snap = await db.collection("dialogs").orderBy("updatedAt", "desc").limit(limit).get();
    return snap.docs.map((doc) => {
      const v = doc.data() as Record<string, unknown>;
      const messages = Array.isArray(v.messages) ? (v.messages as Record<string, unknown>[]) : [];
      const firstUser = messages.find((m) => m.role === "user");
      const userTurns = messages.filter((m) => m.role === "user").length;
      return {
        dialogId: doc.id,
        updatedAt: (v.updatedAt as { toDate?: () => Date })?.toDate?.() ?? null,
        firstMessage: typeof firstUser?.content === "string" ? firstUser.content : "",
        sketchTitle: typeof v.sketchTitle === "string" ? v.sketchTitle : "",
        lastPhase: typeof v.lastPhase === "string" ? v.lastPhase : "",
        turns: userTurns,
        tier: typeof v.resultTier === "string" ? v.resultTier : null,
        price: typeof v.resultPrice === "number" ? v.resultPrice : null,
        annualEuro: typeof v.resultAnnualEuro === "number" ? v.resultAnnualEuro : null,
        personDays: typeof v.resultPersonDays === "number" ? v.resultPersonDays : null,
      };
    });
  }, "Fälle laden");
  return rows ?? [];
}

export interface BookingRow {
  slotStart: string;
  name: string;
  email: string;
  company: string | null;
  status: string;
  agenda: string | null;
  caseSummary: string | null;
  createdAt: Date | null;
}

export async function loadBookings(limit = 100): Promise<BookingRow[]> {
  const rows = await safe(async (db: Firestore) => {
    const snap = await db.collection("bookings").orderBy("createdAt", "desc").limit(limit).get();
    return snap.docs.map((doc) => {
      const v = doc.data() as Record<string, unknown>;
      return {
        slotStart: typeof v.slotStart === "string" ? v.slotStart : "",
        name: typeof v.name === "string" ? v.name : "",
        email: typeof v.email === "string" ? v.email : "",
        company: typeof v.company === "string" ? v.company : null,
        status: typeof v.status === "string" ? v.status : "",
        agenda: typeof v.agenda === "string" ? v.agenda : null,
        caseSummary: typeof v.caseSummary === "string" ? v.caseSummary : null,
        createdAt: (v.createdAt as { toDate?: () => Date })?.toDate?.() ?? null,
      };
    });
  }, "Buchungen laden");
  return rows ?? [];
}

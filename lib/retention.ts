/**
 * Löschroutinen — die Datenschutzerklärung verspricht Fristen, dieser Code
 * hält sie ein (Vollreview 2026-09-08: die Zusagen standen im Text, nirgends
 * im Code).
 *
 *   • IP-Adressen: nach RETENTION.ipDays aus Dialogen, Buchungen, Leads und Prozess-Checks
 *     entfernt; Tageszähler (rateLimits) ganz gelöscht.
 *   • Dialoge ohne Kontaktangabe: nach RETENTION.dialogDays gelöscht. „Mit
 *     Kontaktangabe" heißt: ein Lead oder eine Buchung verweist auf den
 *     Dialog — die bleiben, bis die Anfrage abgeschlossen ist (manuell).
 *   • Ereignisse: nach RETENTION.eventDays gelöscht.
 *
 * Ausgelöst von /api/admin/cleanup (Cloud Scheduler oder Hand) und einmal
 * täglich nebenläufig aus /api/chat — so gilt die Frist auch, wenn nie ein
 * Scheduler eingerichtet wird. Alles bewusst in Häppchen (Firestore-Batch
 * ≤ 500) und mit Obergrenze je Lauf: lieber morgen weitermachen als eine
 * Anfrage blockieren.
 */
import { FieldValue, Firestore, type DocumentSnapshot, type Query, type QuerySnapshot } from "@google-cloud/firestore";
import { RETENTION } from "./config";
import { firestore } from "./firestore";

export interface RetentionReport {
  ranAt: string;
  ipsStripped: { dialogs: number; bookings: number; leads: number; processChecks: number };
  rateLimitsDeleted: number;
  dialogsDeleted: number;
  dialogsKept: number;
  eventsDeleted: number;
  errors: string[];
}

const BATCH = 400;
/** Höchstzahl Dokumente je Sammlung und Lauf — Kostendeckel, kein Fachlimit. */
const MAX_PER_RUN = 4000;

const daysAgo = (days: number, now: Date) => new Date(now.getTime() - days * 24 * 3600 * 1000);

async function eachPage(query: Query, handle: (docs: DocumentSnapshot[]) => Promise<void>): Promise<number> {
  let processed = 0;
  let last: DocumentSnapshot | null = null;
  while (processed < MAX_PER_RUN) {
    const q: Query = last ? query.startAfter(last).limit(BATCH) : query.limit(BATCH);
    const snap: QuerySnapshot = await q.get();
    if (snap.empty) break;
    await handle(snap.docs);
    processed += snap.size;
    last = snap.docs[snap.docs.length - 1];
    if (snap.size < BATCH) break;
  }
  return processed;
}

/** Entfernt das Feld `ip` aus allen Treffern, die es noch tragen. */
async function stripIps(db: Firestore, query: Query): Promise<number> {
  let stripped = 0;
  await eachPage(query, async (docs) => {
    const batch = db.batch();
    let n = 0;
    for (const d of docs) {
      if (d.get("ip") === undefined || d.get("ip") === null) continue;
      batch.update(d.ref, { ip: FieldValue.delete(), ipRemovedAt: FieldValue.serverTimestamp() });
      n += 1;
    }
    if (n > 0) await batch.commit();
    stripped += n;
  });
  return stripped;
}

async function deleteAll(db: Firestore, query: Query, keep?: (d: DocumentSnapshot) => boolean): Promise<{ deleted: number; kept: number }> {
  let deleted = 0;
  let kept = 0;
  await eachPage(query, async (docs) => {
    const batch = db.batch();
    let n = 0;
    for (const d of docs) {
      if (keep && keep(d)) {
        kept += 1;
        continue;
      }
      batch.delete(d.ref);
      n += 1;
    }
    if (n > 0) await batch.commit();
    deleted += n;
  });
  return { deleted, kept };
}

/** IDs aller Dialoge, auf die ein Lead oder eine Buchung verweist. */
async function referencedDialogIds(db: Firestore): Promise<Set<string>> {
  const ids = new Set<string>();
  for (const name of ["leads", "bookings"]) {
    const snap = await db.collection(name).select("dialogId").get();
    for (const d of snap.docs) {
      const id = d.get("dialogId");
      if (typeof id === "string" && id) ids.add(id);
    }
  }
  return ids;
}

/**
 * Führt alle Löschroutinen aus. Fehler einer Routine stoppen die anderen
 * nicht — sie landen im Bericht.
 */
export async function runRetention(now = new Date()): Promise<RetentionReport | null> {
  const db = firestore();
  if (!db) return null;

  const report: RetentionReport = {
    ranAt: now.toISOString(),
    ipsStripped: { dialogs: 0, bookings: 0, leads: 0, processChecks: 0 },
    rateLimitsDeleted: 0,
    dialogsDeleted: 0,
    dialogsKept: 0,
    eventsDeleted: 0,
    errors: [],
  };
  const ipCutoff = daysAgo(RETENTION.ipDays, now);
  const dialogCutoff = daysAgo(RETENTION.dialogDays, now);
  const eventCutoff = daysAgo(RETENTION.eventDays, now);
  const step = async (label: string, fn: () => Promise<void>) => {
    try {
      await fn();
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      report.errors.push(`${label}: ${msg}`);
      console.error(`[retention] ${label} fehlgeschlagen:`, err);
    }
  };

  await step("IP Dialoge", async () => {
    report.ipsStripped.dialogs = await stripIps(db, db.collection("dialogs").where("updatedAt", "<", ipCutoff).orderBy("updatedAt"));
  });
  await step("IP Buchungen", async () => {
    report.ipsStripped.bookings = await stripIps(db, db.collection("bookings").where("createdAt", "<", ipCutoff).orderBy("createdAt"));
  });
  await step("IP Leads", async () => {
    report.ipsStripped.leads = await stripIps(db, db.collection("leads").where("createdAt", "<", ipCutoff).orderBy("createdAt"));
  });
  await step("IP Prozess-Checks", async () => {
    report.ipsStripped.processChecks = await stripIps(
      db,
      db.collection("processChecks").where("createdAt", "<", ipCutoff).orderBy("createdAt")
    );
  });
  await step("Tageszähler", async () => {
    // Dokument-ID beginnt mit dem UTC-Tag (YYYY-MM-DD_…); das Feld `day` trägt ihn auch.
    const dayCutoff = ipCutoff.toISOString().slice(0, 10);
    const r = await deleteAll(db, db.collection("rateLimits").where("day", "<", dayCutoff).orderBy("day"));
    report.rateLimitsDeleted = r.deleted;
  });
  await step("Dialoge", async () => {
    const referenced = await referencedDialogIds(db);
    const r = await deleteAll(
      db,
      db.collection("dialogs").where("updatedAt", "<", dialogCutoff).orderBy("updatedAt"),
      (d) => referenced.has(d.id)
    );
    report.dialogsDeleted = r.deleted;
    report.dialogsKept = r.kept;
  });
  await step("Ereignisse", async () => {
    const r = await deleteAll(db, db.collection("events").where("createdAt", "<", eventCutoff).orderBy("createdAt"));
    report.eventsDeleted = r.deleted;
  });

  console.log("[retention]", JSON.stringify(report));
  return report;
}

/* ---------- Nebenläufiger Tageslauf ---------- */

let lastOpportunisticRun = 0;
let running: Promise<RetentionReport | null> | null = null;

/**
 * Höchstens einmal je Instanz und Tag, nie wartend: Wer das aufruft, bekommt
 * sofort die Kontrolle zurück. Cloud Run skaliert auf null — darum reicht
 * ein Instanz-Gedächtnis; doppelte Läufe sind harmlos (idempotent).
 */
export function scheduleOpportunisticRetention(now = new Date()): void {
  void runOpportunisticRetention(now);
}

/** Awaitable form for Next.js `after()`, so serverless runtimes finish cleanup. */
export async function runOpportunisticRetention(
  now = new Date(),
): Promise<RetentionReport | null> {
  if (running) return running;
  if (now.getTime() - lastOpportunisticRun < 24 * 3600 * 1000) return null;
  lastOpportunisticRun = now.getTime();
  running = runRetention(now)
    .catch((err) => {
      console.error("[retention] Tageslauf fehlgeschlagen:", err);
      return null;
    })
    .finally(() => {
      running = null;
    });
  return running;
}

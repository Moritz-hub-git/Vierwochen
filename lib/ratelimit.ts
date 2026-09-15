/**
 * Kostenbremse (PROMPT.md §8): Eine offen erreichbare Modellschnittstelle ohne
 * Begrenzung ist eine offene Rechnung.
 *
 * Zwei Linien:
 * 1. Prozessspeicher: gleitendes Fenster je IP und Minute (schnell, pro Instanz).
 * 2. Firestore: Tageszähler je IP (überlebt Instanzwechsel und Skalierung).
 *    Fällt Firestore aus, gilt weiterhin Linie 1 — der Funnel bricht nicht.
 */
import { FieldValue } from "@google-cloud/firestore";
import { LIMITS } from "./config";
import { safe } from "./firestore";

const windows = new Map<string, number[]>();
const endpointWindows = new Map<string, number[]>();

function pruneWindows() {
  // Verhindert unbegrenztes Wachstum der Map in langlebigen Instanzen.
  if (windows.size < 5000) return;
  const cutoff = Date.now() - 120_000;
  for (const [key, hits] of windows) {
    if (hits.length === 0 || hits[hits.length - 1] < cutoff) windows.delete(key);
  }
}

export function clientIp(req: Request): string {
  // Cloud Run steht hinter einem Load Balancer: die echte Client-IP ist der
  // vorletzte Eintrag in X-Forwarded-For; als Rückfall der erste Eintrag.
  const xff = req.headers.get("x-forwarded-for");
  if (xff) {
    const parts = xff.split(",").map((p) => p.trim()).filter(Boolean);
    if (parts.length >= 2) return parts[parts.length - 2];
    if (parts.length === 1) return parts[0];
  }
  return "unbekannt";
}

/** Linie 1: je IP höchstens LIMITS.perMinute Modellaufrufe pro Minute. */
export function checkMinuteLimit(ip: string): boolean {
  const now = Date.now();
  const hits = (windows.get(ip) ?? []).filter((t) => now - t < 60_000);
  if (hits.length >= LIMITS.perMinute) {
    windows.set(ip, hits);
    return false;
  }
  hits.push(now);
  windows.set(ip, hits);
  pruneWindows();
  return true;
}

/** Small, endpoint-specific sliding window for public forms. */
export function checkWindowLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const hits = (endpointWindows.get(key) ?? []).filter((time) => now - time < windowMs);
  if (hits.length >= limit) {
    endpointWindows.set(key, hits);
    return false;
  }
  hits.push(now);
  endpointWindows.set(key, hits);
  if (endpointWindows.size >= 5000) {
    for (const [storedKey, storedHits] of endpointWindows) {
      if (!storedHits.some((time) => now - time < windowMs)) endpointWindows.delete(storedKey);
    }
  }
  return true;
}

/** Linie 2: je IP höchstens LIMITS.perDay Modellaufrufe pro Kalendertag (UTC). */
export async function checkDayLimit(ip: string): Promise<boolean> {
  const day = new Date().toISOString().slice(0, 10);
  const key = `${day}_${ip.replaceAll("/", "_").replaceAll(":", "_")}`;
  const count = await safe(async (db) => {
    const ref = db.collection("rateLimits").doc(key);
    const result = await db.runTransaction(async (tx) => {
      const snap = await tx.get(ref);
      const current = (snap.data()?.count as number | undefined) ?? 0;
      if (current >= LIMITS.perDay) return current;
      tx.set(
        ref,
        { count: FieldValue.increment(1), day, ip, updatedAt: FieldValue.serverTimestamp() },
        { merge: true }
      );
      return current + 1;
    });
    return result;
  }, "Tageslimit");
  // Firestore nicht erreichbar → nur Linie 1 greift; bewusst durchlassen.
  if (count === null) return true;
  return count <= LIMITS.perDay;
}

/** Distributed daily limit for non-model public endpoints. Falls back to the local window. */
export async function checkPersistentDailyLimit(namespace: string, ip: string, limit: number): Promise<boolean> {
  const day = new Date().toISOString().slice(0, 10);
  const safeNamespace = namespace.replace(/[^a-zA-Z0-9_-]/g, "_").slice(0, 40);
  const safeIp = ip.replace(/[^a-zA-Z0-9_.-]/g, "_").slice(0, 120);
  const key = `${safeNamespace}_${day}_${safeIp}`;
  const count = await safe(async (db) => {
    const ref = db.collection("rateLimits").doc(key);
    return db.runTransaction(async (tx) => {
      const snap = await tx.get(ref);
      const current = (snap.data()?.count as number | undefined) ?? 0;
      if (current >= limit) return current;
      tx.set(ref, {
        count: FieldValue.increment(1), day, ip, namespace: safeNamespace,
        updatedAt: FieldValue.serverTimestamp(),
      }, { merge: true });
      return current + 1;
    });
  }, `${safeNamespace} Tageslimit`);
  return count === null || count <= limit;
}

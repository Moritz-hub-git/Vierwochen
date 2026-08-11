/**
 * Firestore-Zugriff (Native Mode, Multiregion eur3 — existiert bereits, PROMPT.md §8).
 *
 * Authentifizierung ausschließlich über die Identität des Laufzeit-Dienstkontos
 * (Application Default Credentials). Keine Schlüssel, nirgends.
 *
 * Alle Schreibzugriffe laufen über `safe(...)`: Fällt Firestore aus (oder läuft die
 * Anwendung lokal ohne Zugangsdaten), bricht der Funnel nicht — der Fehler wird
 * geloggt und die Anwendung arbeitet weiter (PROMPT.md §7: „Der Funnel darf nie brechen").
 */
import { Firestore } from "@google-cloud/firestore";
import { env } from "./config";

let db: Firestore | null = null;
let unavailableLogged = false;

export function firestore(): Firestore | null {
  if (db) return db;
  const projectId = env("GOOGLE_CLOUD_PROJECT");
  if (!projectId) {
    if (!unavailableLogged) {
      console.warn("[firestore] GOOGLE_CLOUD_PROJECT nicht gesetzt — Persistenz deaktiviert (lokaler Betrieb).");
      unavailableLogged = true;
    }
    return null;
  }
  try {
    db = new Firestore({ projectId, ignoreUndefinedProperties: true });
    return db;
  } catch (err) {
    console.error("[firestore] Initialisierung fehlgeschlagen:", err);
    return null;
  }
}

/** Führt eine Firestore-Operation aus, ohne bei Fehlern den Aufrufer zu reißen. */
export async function safe<T>(op: (db: Firestore) => Promise<T>, label: string): Promise<T | null> {
  const database = firestore();
  if (!database) return null;
  try {
    return await op(database);
  } catch (err) {
    console.error(`[firestore] ${label} fehlgeschlagen:`, err);
    return null;
  }
}

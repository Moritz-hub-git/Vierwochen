/**
 * Zugang zur Auswertung (/admin).
 *
 * Bewusst ein EIGENES Passwort (ADMIN_PASSWORD), getrennt vom Vorschau-Schutz:
 * Den Vorschaulink gibt man Kunden und Bekannten, die Auswertung sieht nur der
 * Betreiber. Ohne gesetztes ADMIN_PASSWORD ist der Bereich vollständig
 * gesperrt — lieber unerreichbar als versehentlich offen.
 */
import { cookies } from "next/headers";
import { env } from "./config";

export const ADMIN_COOKIE = "vw_admin";

export async function sha256Hex(text: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export function adminPassword(): string | undefined {
  return env("ADMIN_PASSWORD");
}

/** Prüft das Zugangs-Cookie serverseitig. */
export async function isAdmin(): Promise<boolean> {
  const password = adminPassword();
  if (!password) return false;
  const store = await cookies();
  const value = store.get(ADMIN_COOKIE)?.value;
  if (!value) return false;
  return value === (await sha256Hex(password));
}

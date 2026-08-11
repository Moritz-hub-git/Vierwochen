import { FREEMAIL_DOMAINS } from "./config";

const EMAIL_RE =
  // Bewusst pragmatisch: Syntaxprüfung, keine RFC-Vollabdeckung.
  /^[A-Za-z0-9._%+-]+@[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?)+$/;

export type EmailCheck =
  | { ok: true; email: string; domain: string }
  | { ok: false; reason: "invalid" | "freemail" };

/** Prüft Syntax und weist Freemail-Adressen freundlich ab (PROMPT.md §5.5). */
export function checkBusinessEmail(raw: string): EmailCheck {
  const email = (raw ?? "").trim().toLowerCase();
  if (email.length > 254 || !EMAIL_RE.test(email)) {
    return { ok: false, reason: "invalid" };
  }
  const domain = email.slice(email.lastIndexOf("@") + 1);
  if (FREEMAIL_DOMAINS.has(domain)) {
    return { ok: false, reason: "freemail" };
  }
  return { ok: true, email, domain };
}

import { FREEMAIL_DOMAINS } from "./config";

const EMAIL_RE =
  // Bewusst pragmatisch: Syntaxprüfung, keine RFC-Vollabdeckung.
  /^[A-Za-z0-9._%+-]+@[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?)+$/;

export type EmailCheck =
  | { ok: true; email: string; domain: string; freemail: boolean }
  | { ok: false; reason: "invalid" | "freemail" };

/**
 * Prüft Syntax und weist Freemail-Adressen freundlich ab (PROMPT.md §5.5).
 *
 * `allowFreemail`: Bei der TERMINBUCHUNG gilt das Gate nicht (Audit CA-H4) —
 * Gründer vor der Gründung haben keine Firmenadresse, und ein gebuchter
 * Termin ist ein stärkeres Signal als jede Domain. Das Ergebnis trägt
 * `freemail`, damit der Aufrufer die Herkunft trotzdem speichern kann.
 */
export function checkBusinessEmail(raw: string, opts: { allowFreemail?: boolean } = {}): EmailCheck {
  const email = (raw ?? "").trim().toLowerCase();
  if (email.length > 254 || !EMAIL_RE.test(email)) {
    return { ok: false, reason: "invalid" };
  }
  const domain = email.slice(email.lastIndexOf("@") + 1);
  const freemail = FREEMAIL_DOMAINS.has(domain);
  if (freemail && !opts.allowFreemail) {
    return { ok: false, reason: "freemail" };
  }
  return { ok: true, email, domain, freemail };
}

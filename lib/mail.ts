/**
 * E-Mail-Versand über die Gmail API — ausschließlich per Service-Account
 * (PROMPT.md §4: NIEMALS API-Keys).
 *
 * Funktionsweise: Der Laufzeit-Service-Account signiert per IAM-Credentials-API
 * (signJwt) ein JWT mit `sub` = MAIL_SENDER und tauscht es gegen ein
 * Zugriffstoken (Domain-wide Delegation). Damit sendet er als das Postfach
 * MAIL_SENDER über die Gmail API.
 *
 * Voraussetzungen (einmalig, außerhalb dieses Codes):
 *  1. MAIL_SENDER als Umgebungsvariable setzen (z. B. SITE.email aus lib/config.ts).
 *  2. Dem Service-Account die Rolle „Service Account Token Creator" auf sich
 *     selbst geben (für signJwt).
 *  3. In der Workspace-Admin-Konsole der Client-ID des Service-Accounts den
 *     Scope https://www.googleapis.com/auth/gmail.send delegieren.
 *
 * Ohne diese Konfiguration wird der Versand sauber übersprungen und geloggt —
 * die Buchung selbst darf daran nie scheitern (Funnel bricht nie).
 */
import { GoogleAuth } from "google-auth-library";
import { SITE, env } from "./config";
import { formatBerlinDateTime } from "./slots";

const auth = new GoogleAuth({
  scopes: ["https://www.googleapis.com/auth/cloud-platform"],
});

/** Zugriffstoken für MAIL_SENDER über signJwt + Domain-wide Delegation. */
async function delegatedAccessToken(subject: string, scope: string): Promise<string | null> {
  try {
    const client = await auth.getClient();
    const creds = await auth.getCredentials();
    const serviceAccount = creds.client_email;
    if (!serviceAccount) {
      console.warn("[mail] Kein Service-Account ermittelbar — Versand übersprungen.");
      return null;
    }

    const now = Math.floor(Date.now() / 1000);
    const signRes = await client.request<{ signedJwt?: string }>({
      url: `https://iamcredentials.googleapis.com/v1/projects/-/serviceAccounts/${encodeURIComponent(serviceAccount)}:signJwt`,
      method: "POST",
      data: {
        payload: JSON.stringify({
          iss: serviceAccount,
          sub: subject,
          scope,
          aud: "https://oauth2.googleapis.com/token",
          iat: now,
          exp: now + 3600,
        }),
      },
    });
    const signedJwt = signRes.data.signedJwt;
    if (!signedJwt) return null;

    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
        assertion: signedJwt,
      }),
    });
    if (!tokenRes.ok) {
      console.warn(
        `[mail] Token-Tausch fehlgeschlagen (${tokenRes.status}) — vermutlich fehlt die ` +
          "Domain-wide Delegation für gmail.send. Versand übersprungen."
      );
      return null;
    }
    const token = (await tokenRes.json()) as { access_token?: string };
    return token.access_token ?? null;
  } catch (err) {
    console.warn("[mail] Delegiertes Token nicht erhältlich — Versand übersprungen:", err);
    return null;
  }
}

/** RFC-2047-Betreff (UTF-8), damit Umlaute sauber ankommen. */
function encodeSubject(subject: string): string {
  return `=?UTF-8?B?${Buffer.from(subject, "utf8").toString("base64")}?=`;
}

export interface MailInput {
  to: string;
  subject: string;
  html: string;
}

/**
 * Versendet eine HTML-Mail als MAIL_SENDER. Gibt false zurück, wenn der
 * Versand nicht konfiguriert oder fehlgeschlagen ist — wirft nie.
 */
export async function sendMail(input: MailInput): Promise<boolean> {
  const sender = env("MAIL_SENDER");
  if (!sender) {
    console.warn("[mail] MAIL_SENDER nicht gesetzt — Versand übersprungen.");
    return false;
  }
  const token = await delegatedAccessToken(sender, "https://www.googleapis.com/auth/gmail.send");
  if (!token) return false;

  try {
    const mime = [
      `From: ${SITE.name} <${sender}>`,
      `To: ${input.to}`,
      `Bcc: ${sender}`,
      `Subject: ${encodeSubject(input.subject)}`,
      "MIME-Version: 1.0",
      'Content-Type: text/html; charset="UTF-8"',
      "Content-Transfer-Encoding: base64",
      "",
      Buffer.from(input.html, "utf8").toString("base64"),
    ].join("\r\n");

    const res = await fetch("https://gmail.googleapis.com/gmail/v1/users/me/messages/send", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ raw: Buffer.from(mime).toString("base64url") }),
    });
    if (!res.ok) {
      console.warn(`[mail] Gmail-Versand fehlgeschlagen (${res.status}): ${await res.text()}`);
      return false;
    }
    return true;
  } catch (err) {
    console.warn("[mail] Versand fehlgeschlagen:", err);
    return false;
  }
}

/** Betreff der Bestätigungsmail — Marke aus SITE, damit Mail und Seite
 *  denselben Namen tragen. `when` ist der bereits formatierte Termin. */
export function bookingMailSubject(mode: "bestätigt" | "angefragt", when: string): string {
  return mode === "bestätigt"
    ? `Ihr Beratungsgespräch am ${when} Uhr — ${SITE.name}`
    : `Ihre Terminanfrage für ${when} Uhr — ${SITE.name}`;
}

export interface BookingMailInput {
  to: string;
  name: string;
  company?: string;
  slotStartIso: string;
  channel: "video" | "telefon";
  agenda?: string;
  caseTitle?: string;
  mode: "bestätigt" | "angefragt";
  meetLink?: string;
}

/** Bestätigungsmail im Markenlook (Ink/Indigo wie die Seite) — bewusst
 *  schlicht, tabellenbasiert, ohne Bilder. „Moritz liest … persönlich" bleibt:
 *  Es ist wahr, und es ist der Grund, warum das Gespräch kurz sein darf. */
export function bookingConfirmationHtml(input: BookingMailInput): string {
  const when = `${formatBerlinDateTime(input.slotStartIso)} Uhr`;
  const kanal = input.channel === "video" ? "Online-Call" : "Telefon";
  const statusLine =
    input.mode === "bestätigt"
      ? "Ihr Termin steht. Die Kalendereinladung kommt separat."
      : "Ihre Anfrage ist eingegangen — Sie erhalten kurzfristig die persönliche Bestätigung.";
  const row = (label: string, value: string, trustedHtml = false) =>
    `<tr><td style="padding:6px 14px 6px 0;color:#6a6d8c;font-size:14px;white-space:nowrap;vertical-align:top">${escapeHtml(label)}</td><td style="padding:6px 0;color:#181a33;font-size:14px">${trustedHtml ? value : escapeHtml(value)}</td></tr>`;

  return `<!doctype html><html lang="de"><body style="margin:0;padding:0;background:#f3f4fd">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f3f4fd;padding:32px 12px"><tr><td align="center">
<table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background:#ffffff;border-radius:14px;overflow:hidden;font-family:'Segoe UI',system-ui,-apple-system,sans-serif">
<tr><td style="background:#ffffff;padding:22px 32px 0">
  <span style="color:#181a33;font-size:19px;font-weight:800;letter-spacing:-0.02em">${SITE.name}</span>
</td></tr>
<tr><td style="padding:30px 32px 8px">
  <h1 style="margin:0 0 10px;font-size:21px;color:#181a33">${input.mode === "bestätigt" ? "Ihr Beratungsgespräch ist gebucht" : "Ihre Terminanfrage ist da"}</h1>
  <p style="margin:0 0 18px;font-size:14.5px;line-height:1.6;color:#3c3f5e">Guten Tag${input.name ? ` ${escapeHtml(input.name)}` : ""}, ${statusLine}</p>
  <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-top:1px solid #e6e8f8;border-bottom:1px solid #e6e8f8;padding:4px 0">
    ${row("Termin", when)}
    ${row("Dauer", "30 Minuten, kostenlos & unverbindlich")}
    ${row("Kanal", kanal)}
    ${input.meetLink ? row("Zugang", `<a href="${escapeHtml(input.meetLink)}" style="color:#4f46e5">${escapeHtml(input.meetLink)}</a>`, true) : ""}
    ${input.company ? row("Unternehmen", input.company) : ""}
    ${input.caseTitle ? row("Ihr Fall", input.caseTitle) : ""}
    ${input.agenda ? row("Agenda", input.agenda) : ""}
  </table>
  <p style="margin:18px 0 6px;font-size:14.5px;line-height:1.6;color:#3c3f5e">
    Moritz liest Ihre Prozessskizze vor dem Termin durch. Im Gespräch klären wir
    Ausnahmefälle, Integrationen und den sinnvollen Pilotumfang. Danach kann ein
    belastbares Angebot für Umsetzung und Managed Automation entstehen.
  </p>
  <p style="margin:14px 0 0;font-size:13px;color:#6a6d8c">
    Termin verschieben oder absagen? Antworten Sie einfach auf diese E-Mail.
  </p>
</td></tr>
<tr><td style="padding:22px 32px 28px">
  <p style="margin:0;font-size:12px;color:#6a6d8c;border-top:1px solid #e6e8f8;padding-top:16px">
    ${SITE.name} · ${SITE.claim}<br>
    Diese Nachricht wurde automatisch nach Ihrer Buchung versendet.
  </p>
</td></tr>
</table></td></tr></table></body></html>`;
}

/** Zeilen einer Benachrichtigung: [Bezeichnung, Wert]. */
export interface OwnerNoticeInput {
  heading: string;
  rows: [string, string][];
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Interne Benachrichtigung an den Gründer (neue Buchung, neue Anfrage).
 * Nüchtern und tabellarisch — sie wird auf dem Telefon gelesen. Werte
 * stammen aus Nutzereingaben und werden deshalb escaped.
 */
export function ownerNoticeHtml(input: OwnerNoticeInput): string {
  const rows = input.rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:6px 14px 6px 0;color:#6a6d8c;font-size:14px;white-space:nowrap;vertical-align:top">${escapeHtml(label)}</td><td style="padding:6px 0;color:#181a33;font-size:14px;white-space:pre-wrap">${escapeHtml(value)}</td></tr>`
    )
    .join("");
  return `<!doctype html><html lang="de"><body style="margin:0;padding:24px 12px;background:#f3f4fd;font-family:'Segoe UI',system-ui,-apple-system,sans-serif">
<table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;margin:0 auto;background:#ffffff;border-radius:14px;padding:24px 28px">
<tr><td>
  <span style="color:#181a33;font-size:15px;font-weight:800;letter-spacing:-0.02em">${SITE.name}</span>
  <h1 style="margin:14px 0 10px;font-size:19px;color:#181a33">${escapeHtml(input.heading)}</h1>
  <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-top:1px solid #e6e8f8;padding-top:4px">${rows}</table>
</td></tr>
</table></body></html>`;
}

/* ---------- Lead-Mail: die Einschätzung, die das Gate verspricht ----------
   (Audit T4/CF-07): „Sie bekommen die Einschätzung mit der Lösungsskizze" war
   ein leeres Versprechen — jetzt geht sie wirklich raus. Reine Funktionen,
   der Versand bleibt sendMail(). Zahlen kommen fertig gerechnet vom Server
   (dialog.ts), hier wird nur formatiert. */

// Eigener Import im eigenen Abschnitt, damit die Kopfzeilen der Datei
// (parallel in Bearbeitung) unangetastet bleiben.
import { ACCEPTANCE_PROMISE as ACCEPTANCE } from "./config";

/** Kurzform von escapeHtml (oben) — Modell- und Nutzertext landet in der Mail. */
const esc = escapeHtml;

const euro = (n: number) => `${n.toLocaleString("de-DE")} €`;

export interface LeadSketchMailInput {
  to: string;
  title: string;
  steps: { label: string; automation: string }[];
  value: string[];
  open: string[];
  assumptions: string[];
  price: number;
  priceItems: { label: string; euro: number }[];
  weeks: { week: number; label: string }[];
  /** Absolute URL zur Terminseite. */
  bookingUrl: string;
}

export function leadSketchSubject(title: string): string {
  return `Ihre Einschätzung: ${title} — ${SITE.name}`;
}

/** Die Einschätzung als Mail: Skizze, Preis mit Herleitung, Zeitplan, Buchungslink. */
export function leadSketchHtml(input: LeadSketchMailInput): string {
  const li = (items: string[]) => items.map((v) => `<li style="margin:0 0 6px">${esc(v)}</li>`).join("");
  const h2 = (t: string) =>
    `<h2 style="margin:22px 0 8px;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:#4f46e5">${t}</h2>`;
  const steps = input.steps
    .map(
      (s, i) =>
        `<tr><td style="padding:5px 10px 5px 0;color:#6a6d8c;font-size:14px;vertical-align:top;white-space:nowrap">${i + 1}.</td>` +
        `<td style="padding:5px 0;color:#181a33;font-size:14px">${esc(s.label)} <span style="color:#6a6d8c;font-size:12px">· ${esc(s.automation)}</span></td></tr>`
    )
    .join("");
  const items = input.priceItems
    .map(
      (it) =>
        `<tr><td style="padding:5px 10px 5px 0;color:#3c3f5e;font-size:14px">${esc(it.label)}</td>` +
        `<td align="right" style="padding:5px 0;color:#181a33;font-size:14px;white-space:nowrap">${euro(it.euro)}</td></tr>`
    )
    .join("");
  const phases = input.weeks
    .map(
      (w) =>
        `<tr><td style="padding:5px 10px 5px 0;color:#6a6d8c;font-size:14px;white-space:nowrap;vertical-align:top">Phase ${w.week}</td>` +
        `<td style="padding:5px 0;color:#181a33;font-size:14px">${esc(w.label)}</td></tr>`
    )
    .join("");

  return `<!doctype html><html lang="de"><body style="margin:0;padding:0;background:#f3f4fd">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f3f4fd;padding:32px 12px"><tr><td align="center">
<table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background:#ffffff;border-radius:14px;overflow:hidden;font-family:'Segoe UI',system-ui,-apple-system,sans-serif">
<tr><td style="padding:22px 32px 0">
  <span style="color:#181a33;font-size:19px;font-weight:800;letter-spacing:-0.02em">${SITE.name}</span>
</td></tr>
<tr><td style="padding:26px 32px 8px">
  <p style="margin:0 0 6px;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:#4f46e5">Ihre Ersteinschätzung</p>
  <h1 style="margin:0 0 12px;font-size:22px;color:#181a33">${esc(input.title)}</h1>
  <p style="margin:0;font-size:14.5px;line-height:1.6;color:#3c3f5e">
    Hier ist die unverbindliche Einschätzung aus dem KI-Dialog. Sie zeigt einen möglichen
    Zielprozess; Integrationen, Ausnahmewege und Annahmen werden im Gespräch geprüft.
  </p>

  ${h2("Lösungsskizze")}
  <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%">${steps}</table>
  ${input.value.length ? `${h2("Ihr Vorteil")}<ul style="margin:0;padding-left:18px;font-size:14px;line-height:1.5;color:#181a33">${li(input.value)}</ul>` : ""}

  ${h2("Unverbindliche Preisschätzung")}
  <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-top:1px solid #e6e8f8">
    ${items}
    <tr><td style="padding:9px 10px 5px 0;border-top:1px solid #e6e8f8;color:#181a33;font-size:15px;font-weight:700">Richtpreis</td>
        <td align="right" style="padding:9px 0 5px;border-top:1px solid #e6e8f8;color:#181a33;font-size:15px;font-weight:700;white-space:nowrap">${euro(input.price)}</td></tr>
  </table>
  <p style="margin:6px 0 0;font-size:12.5px;color:#6a6d8c">Netto zzgl. USt. Unverbindliche Schätzung, kein Angebot. ${esc(ACCEPTANCE)}</p>

  ${input.weeks.length ? `${h2("Umsetzungsphasen")}<table role="presentation" cellpadding="0" cellspacing="0" style="width:100%">${phases}</table>` : ""}
  ${input.open.length ? `${h2("Offene Punkte fürs Gespräch")}<ul style="margin:0;padding-left:18px;font-size:14px;line-height:1.5;color:#181a33">${li(input.open)}</ul>` : ""}
  ${input.assumptions.length ? `${h2("Annahmen — bitte korrigieren")}<ul style="margin:0;padding-left:18px;font-size:14px;line-height:1.5;color:#181a33">${li(input.assumptions)}</ul>` : ""}

  <table role="presentation" cellpadding="0" cellspacing="0" style="margin:26px 0 6px"><tr><td style="background:#4f46e5;border-radius:10px">
    <a href="${esc(input.bookingUrl)}" style="display:inline-block;padding:12px 20px;color:#ffffff;font-size:14.5px;font-weight:700;text-decoration:none">Termin für 30 Minuten wählen</a>
  </td></tr></table>
  <p style="margin:8px 0 0;font-size:13px;color:#6a6d8c">Oder antworten Sie einfach auf diese E-Mail.</p>
</td></tr>
<tr><td style="padding:22px 32px 28px">
  <p style="margin:0;font-size:12px;color:#6a6d8c;border-top:1px solid #e6e8f8;padding-top:16px">
    ${SITE.name} · ${SITE.claim}<br>
    Diese Nachricht wurde auf Ihre Anfrage im Dialog versendet.
  </p>
</td></tr>
</table></td></tr></table></body></html>`;
}

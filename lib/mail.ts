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
 *  1. MAIL_SENDER als Umgebungsvariable setzen (z. B. kontakt@vierwochen.de).
 *  2. Dem Service-Account die Rolle „Service Account Token Creator" auf sich
 *     selbst geben (für signJwt).
 *  3. In der Workspace-Admin-Konsole der Client-ID des Service-Accounts den
 *     Scope https://www.googleapis.com/auth/gmail.send delegieren.
 *
 * Ohne diese Konfiguration wird der Versand sauber übersprungen und geloggt —
 * die Buchung selbst darf daran nie scheitern (Funnel bricht nie).
 */
import { GoogleAuth } from "google-auth-library";
import { env } from "./config";
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
      `From: vierwochen.de <${sender}>`,
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

/** Bestätigungsmail im Markenlook — bewusst schlicht, tabellenbasiert, ohne Bilder. */
export function bookingConfirmationHtml(input: BookingMailInput): string {
  const when = `${formatBerlinDateTime(input.slotStartIso)} Uhr`;
  const kanal = input.channel === "video" ? "Online-Call" : "Telefon";
  const statusLine =
    input.mode === "bestätigt"
      ? "Ihr Termin steht. Die Kalendereinladung kommt separat."
      : "Ihre Anfrage ist eingegangen — Sie erhalten kurzfristig die persönliche Bestätigung.";
  const row = (label: string, value: string) =>
    `<tr><td style="padding:6px 14px 6px 0;color:#5c6a66;font-size:14px;white-space:nowrap;vertical-align:top">${label}</td><td style="padding:6px 0;color:#15201d;font-size:14px">${value}</td></tr>`;

  return `<!doctype html><html lang="de"><body style="margin:0;padding:0;background:#f4f6f5">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f5;padding:32px 12px"><tr><td align="center">
<table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background:#ffffff;border-radius:14px;overflow:hidden;font-family:'Segoe UI',system-ui,-apple-system,sans-serif">
<tr><td style="background:#0d7a68;padding:22px 32px">
  <span style="color:#ffffff;font-size:19px;font-weight:700;letter-spacing:0.01em">vierwochen<span style="opacity:0.75">.</span></span>
</td></tr>
<tr><td style="padding:30px 32px 8px">
  <h1 style="margin:0 0 10px;font-size:21px;color:#15201d">${input.mode === "bestätigt" ? "Ihr Beratungsgespräch ist gebucht" : "Ihre Terminanfrage ist da"}</h1>
  <p style="margin:0 0 18px;font-size:14.5px;line-height:1.6;color:#3c4a46">Guten Tag${input.name ? ` ${input.name}` : ""}, ${statusLine}</p>
  <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-top:1px solid #e4e9e7;border-bottom:1px solid #e4e9e7;padding:4px 0">
    ${row("Termin", when)}
    ${row("Dauer", "30 Minuten, kostenlos & unverbindlich")}
    ${row("Kanal", kanal)}
    ${input.meetLink ? row("Zugang", `<a href="${input.meetLink}" style="color:#0d7a68">${input.meetLink}</a>`) : ""}
    ${input.company ? row("Unternehmen", input.company) : ""}
    ${input.caseTitle ? row("Ihr Fall", input.caseTitle) : ""}
    ${input.agenda ? row("Agenda", input.agenda) : ""}
  </table>
  <p style="margin:18px 0 6px;font-size:14.5px;line-height:1.6;color:#3c4a46">
    Moritz liest Ihre Lösungsskizze vor dem Termin persönlich durch — das Gespräch
    startet direkt bei Ihren offenen Punkten, nicht bei einer Präsentation.
    Danach erhalten Sie das verbindliche Festpreis-Angebot.
  </p>
  <p style="margin:14px 0 0;font-size:13px;color:#5c6a66">
    Termin verschieben oder absagen? Antworten Sie einfach auf diese E-Mail.
  </p>
</td></tr>
<tr><td style="padding:22px 32px 28px">
  <p style="margin:0;font-size:12px;color:#8a938f;border-top:1px solid #e4e9e7;padding-top:16px">
    vierwochen.de · Individualsoftware in vier Wochen zum Festpreis<br>
    Diese Nachricht wurde automatisch nach Ihrer Buchung versendet.
  </p>
</td></tr>
</table></td></tr></table></body></html>`;
}

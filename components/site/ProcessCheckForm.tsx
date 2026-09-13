"use client";
import { useState, type FormEvent } from "react";
import Link from "next/link";
import { processes } from "@/lib/processes";
import { Arrow, Check } from "./Icons";
export default function ProcessCheckForm({
  initialProcess,
  initialVolume,
  contactEmail,
}: {
  initialProcess: string;
  initialVolume: string;
  contactEmail: string;
}) {
  const [process, setProcess] = useState(initialProcess),
    [busy, setBusy] = useState(false),
    [error, setError] = useState(""),
    [done, setDone] = useState(false);
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (busy) return;
    setError("");
    setBusy(true);
    const form = new FormData(e.currentTarget);
    try {
      const response = await fetch("/api/process-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          email: form.get("email"),
          company: form.get("company"),
          process: form.get("process"),
          volume: form.get("volume"),
          message: form.get("message"),
          consent: form.get("consent") === "on",
          website: form.get("website"),
        }),
        signal: AbortSignal.timeout(30000),
      });
      const data = await response.json();
      if (!response.ok || !data.ok) {
        setError(
          data.error ||
            "Ihre Anfrage konnte nicht übermittelt werden. Bitte versuchen Sie es erneut.",
        );
        return;
      }
      setDone(true);
    } catch {
      setError(
        "Die Übermittlung konnte nicht bestätigt werden. Bitte versuchen Sie es erneut oder schreiben Sie uns direkt per E-Mail.",
      );
    } finally {
      setBusy(false);
    }
  }
  if (done)
    return (
      <div className="form-success" role="status">
        <span className="eyebrow">
          <Check /> ANFRAGE EINGEGANGEN
        </span>
        <h2 style={{ marginTop: 20 }}>
          Der erste Schritt
          <br />
          ist erledigt.
        </h2>
        <p>
          Vielen Dank. Wir prüfen Ihren Prozess und melden uns persönlich über
          Ihre angegebene E-Mail-Adresse, um den nächsten Schritt zu besprechen.
        </p>
        <p>
          Ein Termin ist damit noch nicht gebucht. Für das Gespräch helfen
          ungefähres Monatsvolumen und typische Ausnahmen.
        </p>
        <Link href="/prozesse" className="text-link">
          Weitere Prozesse entdecken <Arrow />
        </Link>
      </div>
    );
  return (
    <form className="process-form" onSubmit={submit}>
      <div className="form-heading">
        <strong>Ihr Prozess in wenigen Worten</strong>
        <span>ca. 2 Minuten</span>
      </div>
      <div className="field-pair">
        <label className="field" htmlFor="contact-name">
          Ihr Name *
          <input
            id="contact-name"
            name="name"
            autoComplete="name"
            required
            minLength={2}
            maxLength={120}
            placeholder="Vor- und Nachname"
          />
        </label>
        <label className="field" htmlFor="contact-company">
          Unternehmen *
          <input
            id="contact-company"
            name="company"
            autoComplete="organization"
            required
            minLength={2}
            maxLength={160}
            placeholder="Ihr Unternehmen"
          />
        </label>
      </div>
      <label className="field" htmlFor="contact-email">
        E-Mail-Adresse *
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          required
          maxLength={254}
          placeholder="name@unternehmen.de"
        />
      </label>
      <label className="field" htmlFor="contact-process">
        Welchen Prozess möchten Sie prüfen? *
        <select
          id="contact-process"
          name="process"
          value={process}
          onChange={(e) => setProcess(e.target.value)}
          required
        >
          <option value="" disabled>
            Prozess auswählen
          </option>
          {processes.map((p) => (
            <option key={p.slug} value={p.title}>
              {p.title}
            </option>
          ))}
          <option value="Anderer Prozess">Anderer Prozess</option>
        </select>
      </label>
      <label className="field" htmlFor="contact-volume">
        Ungefähre Vorgänge pro Monat <span className="sr-only">optional</span>
        <input
          id="contact-volume"
          name="volume"
          defaultValue={initialVolume}
          maxLength={120}
          placeholder="z. B. 500 Bestätigungen (optional)"
        />
      </label>
      <label className="field" htmlFor="contact-message">
        Was erledigt Ihr Team heute noch manuell?
        <textarea
          id="contact-message"
          name="message"
          required={process === "Anderer Prozess"}
          minLength={process === "Anderer Prozess" ? 15 : undefined}
          maxLength={3000}
          rows={4}
          placeholder="Zum Beispiel: Wir gleichen Preise und Termine aus PDFs mit einer Bestellung in SAP ab. (optional)"
        />
      </label>
      <div className="honeypot" aria-hidden="true">
        <label htmlFor="website">
          Website
          <input id="website" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <label className="form-consent">
        <input type="checkbox" name="consent" required />
        <span>
          Opsrid darf mich zu dieser Anfrage kontaktieren. Hinweise zur
          Verarbeitung meiner Angaben stehen in der{" "}
          <Link href="/datenschutz">Datenschutzerklärung</Link>. *
        </span>
      </label>
      {error && (
        <div className="form-error" role="alert">
          {error}
          <br />
          <a href={`mailto:${contactEmail}?subject=Opsrid%20Prozess-Check`}>
            Direkt per E-Mail anfragen
          </a>
        </div>
      )}
      <button className="button button-primary" type="submit" disabled={busy}>
        {busy
          ? "Anfrage wird übermittelt …"
          : "Kostenlosen Prozess-Check anfragen"}
        <Arrow />
      </button>
      <p className="form-footnote">
        Keine Verpflichtung. Kein Newsletter. Bitte keine vertraulichen
        Dokumente oder personenbezogenen Falldaten eingeben.
      </p>
    </form>
  );
}

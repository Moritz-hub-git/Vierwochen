"use client";

import { useState } from "react";

/**
 * Auffangweg für Besucher, die heute nicht telefonieren wollen (PROMPT.md §5.5).
 *
 * Vorher war die E-Mail-Abfrage eine Mauer VOR der Terminliste. Das kostete
 * Buchungen und brachte keinen zusätzlichen Lead. Jetzt sitzt das Gate im
 * Bestätigungsschritt der Buchung — und wer nicht buchen will, kann hier mit
 * einem einzigen Feld trotzdem in Kontakt bleiben.
 *
 * Bewusst eingeklappt: Pro Bildschirm nur ein sichtbarer nächster Schritt
 * (§2.8). Der Termin bleibt das Angebot, das hier ist die leise Alternative.
 */
export default function EmailGate({
  dialogId,
  sketchTitle,
}: {
  dialogId: string;
  sketchTitle: string;
}) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  // done: null = noch nicht; true = Mail ist raus; false = Moritz reicht sie
  // persönlich nach (kein Versand konfiguriert oder Dialog ohne Ergebnis).
  const [done, setDone] = useState<boolean | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, dialogId, sketchTitle }),
      });
      const data = (await res.json()) as { ok: boolean; sent?: boolean; error?: string };
      if (!data.ok) {
        setError(data.error ?? "Das hat nicht geklappt. Bitte prüfen Sie die Adresse.");
        return;
      }
      setDone(data.sent === true);
    } catch {
      setError("Keine Verbindung. Bitte versuchen Sie es erneut.");
    } finally {
      setBusy(false);
    }
  };

  // Nur versprechen, was wirklich passiert ist (Audit T4/CF-07): Die Mail ist
  // entweder nachweislich raus — oder Moritz schickt sie selbst.
  if (done !== null) {
    return (
      <p className="gate-done" role="status">
        {done
          ? `Ist unterwegs: Die Einschätzung mit Lösungsskizze und Preis-Herleitung geht an ${email}.`
          : "Danke — Moritz schickt Ihnen die Einschätzung innerhalb eines Werktags persönlich."}
      </p>
    );
  }

  if (!open) {
    return (
      <button type="button" className="gate-toggle" onClick={() => setOpen(true)}>
        Heute keine Zeit für einen Termin? Einschätzung per E-Mail erhalten
      </button>
    );
  }

  return (
    <form className="gate-inline" onSubmit={submit}>
      <label htmlFor="gate-email">
        Ihre geschäftliche E-Mail — Sie erhalten diese Einschätzung samt Skizze
        und Preis-Herleitung schriftlich, ohne Anruf.
      </label>
      <div className="gate-inline-row">
        <input
          id="gate-email"
          type="email"
          autoComplete="email"
          required
          maxLength={254}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="name@ihre-firma.de"
        />
        <button type="submit" className="btn btn-ghost" disabled={busy}>
          {busy ? "…" : "Senden"}
        </button>
      </div>
      {error && <div className="form-error" role="alert">{error}</div>}
    </form>
  );
}

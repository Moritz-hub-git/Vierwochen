"use client";

import { useState } from "react";

/**
 * E-Mail-Gate (PROMPT.md §5.5): steht HINTER dem Wert — Skizze und Preisspanne
 * sind bereits sichtbar. Die geschäftliche Adresse schaltet die Terminbuchung
 * frei; Freemail wird serverseitig freundlich abgewiesen.
 */
export default function EmailGate({
  dialogId,
  sketchTitle,
  onDone,
}: {
  dialogId: string;
  sketchTitle: string;
  onDone: (email: string, name: string) => void;
}) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, dialogId, sketchTitle }),
      });
      const data = (await res.json()) as { ok: boolean; error?: string };
      if (!data.ok) {
        setError(data.error ?? "Das hat nicht geklappt. Bitte prüfen Sie die Adresse.");
        return;
      }
      onDone(email.trim().toLowerCase(), name.trim());
    } catch {
      setError("Keine Verbindung. Bitte versuchen Sie es erneut.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <form className="gate" onSubmit={submit}>
      <h3>Nächster Schritt: das Erstgespräch</h3>
      <p>
        Hinterlassen Sie Ihre geschäftliche E-Mail-Adresse — dann können Sie direkt
        hier einen Termin wählen und erhalten die Einschätzung schriftlich.
      </p>
      <div className="field">
        <label htmlFor="gate-name">Ihr Name</label>
        <input
          id="gate-name"
          type="text"
          autoComplete="name"
          required
          maxLength={200}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Vor- und Nachname"
        />
      </div>
      <div className="field">
        <label htmlFor="gate-email">Geschäftliche E-Mail</label>
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
      </div>
      {error && <div className="form-error" role="alert">{error}</div>}
      <button type="submit" className="btn btn-primary" disabled={busy} style={{ width: "100%" }}>
        {busy ? "Einen Moment …" : "Weiter zur Terminwahl"}
      </button>
    </form>
  );
}

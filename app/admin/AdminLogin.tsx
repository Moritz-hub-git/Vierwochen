"use client";

import { useState } from "react";

/** Anmeldung zur Auswertung — bewusst schlicht, nur für den Betreiber. */
export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = (await res.json()) as { ok: boolean; error?: string };
      if (data.ok) {
        window.location.reload();
        return;
      }
      setError(data.error ?? "Anmeldung fehlgeschlagen.");
    } catch {
      setError("Keine Verbindung.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="container legal" style={{ maxWidth: 420 }}>
      <h1>Auswertung</h1>
      <p>Dieser Bereich ist nur für den Betreiber.</p>
      <form onSubmit={submit}>
        <div className="field">
          <label htmlFor="admin-pw">Passwort</label>
          <input
            id="admin-pw"
            type="password"
            autoFocus
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && (
          <div className="form-error" role="alert">
            {error}
          </div>
        )}
        <button type="submit" className="btn btn-primary" disabled={busy} style={{ width: "100%" }}>
          {busy ? "Prüfe …" : "Anmelden"}
        </button>
      </form>
    </main>
  );
}

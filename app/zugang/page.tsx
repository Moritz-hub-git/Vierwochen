import type { Metadata } from "next";
import AccessForm from "./AccessForm";

export const metadata: Metadata = { title: "Zugang — vierwochen" };

/** Zugangsseite für die passwortgeschützte Vorschau (PROMPT.md §8, SITE_PASSWORD). */
export default function Zugang() {
  return (
    <div className="access-wrap">
      <div className="card access-card">
        <h1>
          vierwochen<span style={{ color: "var(--accent)" }}>.</span>
        </h1>
        <p>Diese Vorschau ist passwortgeschützt.</p>
        <AccessForm />
      </div>
    </div>
  );
}

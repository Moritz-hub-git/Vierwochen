import type { Metadata } from "next";
import AccessForm from "./AccessForm";
export const metadata: Metadata = {
  title: "Vorschau-Zugang",
  robots: { index: false, follow: false },
};
export default function Zugang() {
  return (
    <main id="main" className="section container">
      <div className="prose" style={{ maxWidth: 420, margin: "auto" }}>
        <span className="eyebrow">OPSDONE VORSCHAU</span>
        <h1 style={{ fontSize: 40, marginTop: 20 }}>Willkommen.</h1>
        <p>Diese Vorschau ist passwortgeschützt.</p>
        <AccessForm />
      </div>
    </main>
  );
}

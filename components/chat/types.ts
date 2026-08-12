/** Client-Typen — Spiegel des Server-Vertrags aus lib/dialog.ts. */

export interface SketchStep {
  label: string;
  automation: "automatisch" | "teilautomatisch" | "manuell";
}

export interface Sketch {
  title: string;
  steps: SketchStep[];
  value: string[];
  open: string[];
  assumptions: string[];
}

export interface DialogResult {
  tier: string;
  priceMin: number;
  priceMax: number;
  scope: string[];
  weeks: { week: number; label: string }[];
  savings?: { annualEuro: number; basis: string };
}

export interface DialogTurn {
  reply: string;
  phase: "question" | "result" | "reject";
  sketch: Sketch;
  result?: DialogResult;
}

export interface UiMessage {
  role: "user" | "assistant";
  /** Text für die Anzeige. */
  display: string;
  /** Nur Assistent: Roh-JSON des Modell-Zugs für die Historie. */
  raw?: string;
  error?: boolean;
}

export function formatEuro(n: number): string {
  return n.toLocaleString("de-DE", { maximumFractionDigits: 0 }) + " €";
}

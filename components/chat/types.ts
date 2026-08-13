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
  savings?: { personDaysPerWeek: number; quote: string; annualEuro: number; basis: string };
}

export interface DialogInput {
  kind: "chips" | "number";
  options?: string[];
  label?: string;
  unit?: string;
  min?: number;
  max?: number;
  step?: number;
  preset?: number;
}

export interface DialogTurn {
  reply: string;
  phase: "question" | "result" | "reject";
  sketch: Sketch;
  result?: DialogResult;
  input?: DialogInput;
}

export interface UiMessage {
  role: "user" | "assistant";
  /** Text für die Anzeige. */
  display: string;
  /** Nur Assistent: Roh-JSON des Modell-Zugs für die Historie. */
  raw?: string;
  error?: boolean;
  /** Skizzenstand nach diesem Zug — wird als Karte unter der Nachricht gezeigt. */
  sketch?: Sketch;
  /** Skizzenstand davor, um Neues zu markieren. */
  prevSketch?: Sketch | null;
  /** Angebot, sofern dieser Zug das Ergebnis geliefert hat. */
  result?: DialogResult;
}

export function formatEuro(n: number): string {
  return n.toLocaleString("de-DE", { maximumFractionDigits: 0 }) + " €";
}

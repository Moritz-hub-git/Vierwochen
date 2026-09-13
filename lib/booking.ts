import { safe } from "./firestore";

/** Random dialog IDs act as an unlisted capability; never enumerate or echo data. */
export function validBlueprintDialogId(value: unknown): value is string {
  return (
    typeof value === "string" &&
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      value,
    )
  );
}

export async function loadStoredBlueprint(
  dialogId: string,
): Promise<Record<string, unknown> | null> {
  if (!validBlueprintDialogId(dialogId)) return null;
  return safe(async (db) => {
    const data = (await db.collection("dialogs").doc(dialogId).get()).data();
    if (
      !data ||
      !["result", "followup"].includes(String(data.lastPhase)) ||
      data.blueprintVersion !== 1
    )
      return null;
    const blueprint: unknown = data.blueprint;
    if (!blueprint || typeof blueprint !== "object" || Array.isArray(blueprint))
      return null;
    return blueprint as Record<string, unknown>;
  }, "Lösungsentwurf für angefragte Zustellung laden");
}

/** Bounded plain text only. Mail templates escape every value before rendering. */
export function blueprintSummary(blueprint: Record<string, unknown>): string {
  const text = (v: unknown): string =>
    typeof v === "string" ? v.slice(0, 2000) : "";
  const list = (v: unknown): string =>
    Array.isArray(v)
      ? v.map(text).filter(Boolean).slice(0, 12).join(" · ")
      : "";
  const obj = (v: unknown): Record<string, unknown> =>
    v && typeof v === "object" && !Array.isArray(v)
      ? (v as Record<string, unknown>)
      : {};
  const number = (v: unknown, unit = "") =>
    typeof v === "number" && Number.isFinite(v)
      ? `${Math.round(v).toLocaleString("de-DE")}${unit}`
      : "Noch offen";
  const band = (v: unknown, unit: string) => {
    const b = obj(v);
    return typeof b.low === "number" && typeof b.high === "number"
      ? `${number(b.low)}–${number(b.high)} ${unit}`
      : "Noch nicht belastbar berechenbar";
  };
  const metrics = obj(blueprint.metrics),
    investment = obj(blueprint.investment),
    impact = obj(blueprint.impact);
  return [
    text(blueprint.title),
    text(blueprint.summary),
    `Eingaben: ${list(blueprint.inputs) || "Noch zu klären"}`,
    `Ergebnisse: ${list(blueprint.outputs) || "Noch zu klären"}`,
    `Systeme (Anbindung zu prüfen): ${list(blueprint.integrations) || "Noch zu klären"}`,
    `Funktionen: ${list(blueprint.actions)}`,
    `Datenobjekte: ${list(blueprint.dataObjects)}`,
    `Kennzahlen der Anwendung: ${list(blueprint.kpis)}`,
    `Menschliche Entscheidungen: ${list(blueprint.approvals) || "Freigaberegeln zu klären"}`,
    `Heute: ${list(blueprint.todaySteps)}`,
    `Mit OpsDone: ${list(blueprint.futureSteps)}`,
    `Volumen: ${number(metrics.monthlyVolume, " Vorgänge / Monat")}`,
    `Heutiger Aufwand je Vorgang: ${number(metrics.minutesPerCase, " Minuten")}`,
    `Heutiger manueller Aufwand: ${number(metrics.annualHours, " Stunden / Jahr")}`,
    `Szenario entfallender Aufwand: ${band(impact.annualHours, "Stunden / Jahr")}`,
    `Szenario Kapazitätswert: ${band(impact.annualCapacityEuro, "€ / Jahr")}`,
    `Indikative Umsetzung: ${band(investment.implementation, "€ netto")}`,
    `Indikativer Betrieb: ${band(investment.monthly, "€ netto / Monat")}`,
    `Kapazitätsbasierte Amortisation im Szenario: ${band(impact.paybackMonths, "Monate")}`,
    `Rechenannahmen: ${list(impact.assumptions)}`,
    `Preisannahmen: ${list(investment.assumptions)}`,
    `Machbarkeit: ${text(obj(blueprint.feasibility).label)}. ${list(obj(blueprint.feasibility).reasons)}`,
    `Offene Fragen: ${list(blueprint.openQuestions)}`,
    "Vorläufiges Lösungskonzept. Noch keine fertige Anwendung. Kein verbindliches Angebot oder garantierter Kostenvorteil.",
  ]
    .filter(Boolean)
    .join("\n\n")
    .slice(0, 20_000);
}

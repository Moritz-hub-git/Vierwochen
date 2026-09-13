/** Pure, deterministic estimate. Model output describes scope, never financial results. */
export type ProcessType = "purchasing" | "reporting" | "complaints" | "generic";
export type ViewType =
  | "task-queue"
  | "document-viewer"
  | "approval-panel"
  | "comparison-table"
  | "kpi-cards"
  | "timeline"
  | "audit-trail"
  | "output-preview";
export interface Band {
  low: number;
  high: number;
}
export interface SolutionBlueprint {
  version: 1;
  title: string;
  summary: string;
  processType: ProcessType;
  requiredViews: ViewType[];
  dataObjects: string[];
  actions: string[];
  approvals: string[];
  inputs: string[];
  outputs: string[];
  integrations: string[];
  kpis: string[];
  todaySteps: string[];
  futureSteps: string[];
  openQuestions: string[];
  metrics: {
    monthlyVolume: number | null;
    minutesPerCase: number | null;
    annualHours: number | null;
    evidence: string[];
  };
  investment: {
    implementation: Band;
    monthly: Band;
    factors: { label: string; euro: number }[];
    assumptions: string[];
  };
  impact: {
    scenarioShare: Band;
    annualHours: Band | null;
    annualCapacityEuro: Band | null;
    paybackMonths: Band | null;
    hourlyRate: number;
    assumptions: string[];
  };
  feasibility: { label: "Zu prüfen" | "Plausibler Ansatz"; reasons: string[] };
}
export type Blueprint = SolutionBlueprint;

type SketchLike = {
  title: string;
  steps: { label: string; automation: string }[];
  value: string[];
  open: string[];
  assumptions: string[];
};
const strings = (v: unknown, limit = 8): string[] =>
  Array.isArray(v)
    ? [
        ...new Set(
          v
            .filter((s): s is string => typeof s === "string" && !!s.trim())
            .map((s) => s.trim().slice(0, 180)),
        ),
      ].slice(0, limit)
    : [];
const record = (v: unknown): Record<string, unknown> =>
  v && typeof v === "object" && !Array.isArray(v)
    ? (v as Record<string, unknown>)
    : {};
const numberFrom = (s: string) =>
  Number(s.replace(/\.(?=\d{3}(?:\D|$))/g, "").replace(",", "."));
const round = (n: number) => Math.round(n);
const money = (n: number) => Math.round(n / 500) * 500;
const amount =
  "(?<![\\d.,])(\\d{1,3}(?:\\.\\d{3})+(?:,\\d+)?|\\d+(?:[.,]\\d+)?)";

/** Only explicit user quantities, never LLM numeric values. Weekly conversion uses 52/12. */
export function extractWorkload(
  userText: string,
): SolutionBlueprint["metrics"] {
  const nouns =
    "(?:Vorgänge[n]?|Fälle[n]?|Auftragsbestätigungen|Bestellungen|Rechnungen|Berichte[n]?|Dateien|Reklamationen|Tickets|Mal)";
  const patterns = [
    new RegExp(
      `${amount}\\s*${nouns}?\\s*(?:pro|im|je|/|in der)\\s*(Monat|Woche|Jahr)`,
      "gi",
    ),
    new RegExp(
      `${amount}\\s*${nouns}\\s*(monatlich|wöchentlich|jährlich)`,
      "gi",
    ),
    new RegExp(
      `(?:jeden|pro|im)\\s*(Monat|Woche|Jahr)\\s*${amount}\\s*${nouns}`,
      "gi",
    ),
  ];
  const volumes = patterns
    .flatMap((pattern, index) =>
      [...userText.matchAll(pattern)].map((match) => ({
        quote: match[0],
        index: match.index ?? 0,
        amount: match[index === 2 ? 2 : 1],
        period: match[index === 2 ? 1 : 2],
      })),
    )
    .sort((a, b) => a.index - b.index);

  const effortPattern = new RegExp(
    `${amount}\\s*(?:Minuten?|Min\\.?)(?:\\b|(?=\\s|/))\\s*(?:pro|je|/|für jeden)\\s*(Vorgang|Fall|Bestätigung|Bestellung|Rechnung|Bericht|Datei|Ticket)`,
    "gi",
  );
  const effort = [...userText.matchAll(effortPattern)].at(-1);
  // A standalone numeric answer is also valid; narrative time amounts without per-case context are not.
  const standaloneEffort = [
    ...userText.matchAll(
      new RegExp(`^\\s*${amount}\\s*(?:Minuten?|Min\\.?)\\s*$`, "gim"),
    ),
  ].at(-1);
  const selectedEffort = [effort, standaloneEffort]
    .filter((match): match is RegExpExecArray => !!match)
    .sort((a, b) => (a.index ?? 0) - (b.index ?? 0))
    .at(-1);
  const quantityKind = (text: string): string | null => {
    if (/Vorg[aä]ng|F[aä]ll/i.test(text)) return "case";
    if (/Bestätigung/i.test(text)) return "confirmation";
    if (/Bestellung/i.test(text)) return "order";
    if (/Rechnung/i.test(text)) return "invoice";
    if (/Bericht/i.test(text)) return "report";
    if (/Datei/i.test(text)) return "file";
    if (/Ticket/i.test(text)) return "ticket";
    if (/Reklamation/i.test(text)) return "complaint";
    return null;
  };
  const effortKind = quantityKind(selectedEffort?.[2] ?? "");
  const matching = effortKind
    ? volumes.filter((v) => quantityKind(v.quote) === effortKind)
    : [];
  const candidates = matching.length ? matching : volumes;
  let volume = candidates.at(-1);
  // Do not multiply input-file counts by effort per output case. An explicit later chip
  // answer can update a prior amount, but two differing narrative counts are ambiguous.
  if (volume) {
    const lastLine = userText
      .slice(userText.lastIndexOf("\n", volume.index) + 1)
      .split("\n")[0]
      .trim();
    const uniqueCounts = new Set(
      candidates.map(
        (v) => `${numberFrom(v.amount)}:${v.period.toLowerCase()}`,
      ),
    );
    if (uniqueCounts.size > 1 && lastLine !== volume.quote.trim())
      volume = undefined;
    else if (
      effortKind &&
      effortKind !== "case" &&
      quantityKind(volume.quote) &&
      quantityKind(volume.quote) !== effortKind
    )
      volume = undefined;
  }
  let monthlyVolume = volume
    ? numberFrom(volume.amount) *
      (/Woch|wöch/i.test(volume.period)
        ? 52 / 12
        : /Jahr|jähr/i.test(volume.period)
          ? 1 / 12
          : 1)
    : null;
  let minutesPerCase = selectedEffort ? numberFrom(selectedEffort[1]) : null;
  // Ranges and lower bounds do not provide an exact baseline.
  const hasRangePrefix = (index: number) =>
    /(?:[–\-+]|bis|über|mindestens|höchstens|oder)\s*$/.test(
      userText.slice(Math.max(0, index - 16), index),
    );
  if (volume && hasRangePrefix(volume.index)) monthlyVolume = null;
  if (selectedEffort && hasRangePrefix(selectedEffort.index ?? 0))
    minutesPerCase = null;
  if (
    monthlyVolume !== null &&
    (!(monthlyVolume > 0) || monthlyVolume > 1_000_000)
  )
    monthlyVolume = null;
  if (
    minutesPerCase !== null &&
    (!(minutesPerCase > 0) || minutesPerCase > 10_080)
  )
    minutesPerCase = null;
  const annualHours =
    monthlyVolume !== null && minutesPerCase !== null
      ? round((monthlyVolume * 12 * minutesPerCase) / 60)
      : null;
  return {
    monthlyVolume,
    minutesPerCase,
    annualHours,
    evidence: [
      monthlyVolume !== null ? volume?.quote : null,
      minutesPerCase !== null ? selectedEffort?.[0] : null,
    ].filter((s): s is string => !!s),
  };
}

const defaults: Record<ProcessType, ViewType[]> = {
  purchasing: [
    "task-queue",
    "comparison-table",
    "approval-panel",
    "audit-trail",
  ],
  reporting: [
    "kpi-cards",
    "comparison-table",
    "output-preview",
    "approval-panel",
  ],
  complaints: ["task-queue", "document-viewer", "timeline", "approval-panel"],
  generic: ["task-queue", "timeline", "approval-panel", "output-preview"],
};
const views = new Set<ViewType>(Object.values(defaults).flat());

export function buildBlueprint(
  raw: unknown,
  sketch: SketchLike,
  userText: string,
): SolutionBlueprint {
  const data = record(raw);
  const context = userText.toLowerCase();
  const detected: ProcessType = /reklamation|beschwerde|retoure/.test(context)
    ? "complaints"
    : /report|bericht|kennzahl/.test(context)
      ? "reporting"
      : /auftragsbestätigung|bestellung|einkauf|lieferant/.test(context)
        ? "purchasing"
        : "generic";
  const processType: ProcessType = [
    "purchasing",
    "reporting",
    "complaints",
    "generic",
  ].includes(String(data.processType))
    ? (data.processType as ProcessType)
    : detected;
  // Named connections must be mentioned by the user; suggested integrations remain open questions.
  const integrations = strings(data.integrations).filter((s) =>
    context.includes(s.toLowerCase()),
  );
  if (!integrations.length)
    for (const name of [
      "SAP",
      "DATEV",
      "Salesforce",
      "Excel",
      "Microsoft 365",
      "ERP",
      "CRM",
    ])
      if (new RegExp(`\\b${name}\\b`, "i").test(userText))
        integrations.push(name);
  const inputs = strings(data.inputs);
  const outputs = strings(data.outputs);
  const approvals = strings(data.approvals);
  const extractedViews = strings(data.requiredViews).filter(
    (s): s is ViewType => views.has(s as ViewType),
  );
  const metrics = extractWorkload(userText);
  const complexity = record(data.complexity);
  const bounded = (v: unknown, fallback: number, max: number) =>
    typeof v === "number" && Number.isFinite(v)
      ? Math.min(max, Math.max(1, Math.round(v)))
      : fallback;
  const workflowCount = bounded(complexity.workflowCount, 1, 5);
  const writeBack =
    /zurückschreib|ins? (?:erp|crm).*übertrag|(?:erp|crm).*aktualisier|write.?back/i.test(
      userText,
    );
  const factors = [
    {
      label: "Prozessaufnahme, individuelle Anwendung und Abnahme",
      euro: 5000,
    },
    {
      label: `${Math.max(1, integrations.length)} Systemübergabe(n), Schnittstellen zu prüfen`,
      euro: Math.max(1, integrations.length) * 1500,
    },
    {
      label: "Eingaben, Datenprüfung und Ausnahmebehandlung",
      euro: Math.max(1, inputs.length) * 500,
    },
    {
      label: "Rollen, Anmeldung und Freigabeweg (Planungsannahme)",
      euro: 1500,
    },
    ...(workflowCount > 1
      ? [
          {
            label: `${workflowCount} beschriebene Teilabläufe`,
            euro: (workflowCount - 1) * 1000,
          },
        ]
      : []),
    ...(writeBack
      ? [
          {
            label: "Kontrolliertes Zurückschreiben ins Bestandssystem",
            euro: 2000,
          },
        ]
      : []),
    ...(complexity.specialUi === true
      ? [{ label: "Zusätzliche Oberflächenlogik (zu validieren)", euro: 1500 }]
      : []),
  ];
  const base = factors.reduce((sum, item) => sum + item.euro, 0);
  const implementation = { low: money(base), high: money(base * 1.5) };
  const monthlyBase =
    300 +
    Math.max(1, integrations.length) * 100 +
    (writeBack ? 100 : 0) +
    (metrics.monthlyVolume && metrics.monthlyVolume > 2000 ? 200 : 0);
  const monthly = { low: monthlyBase, high: monthlyBase * 2 };
  const hourlyRate = 50;
  const scenarioShare = { low: 0.3, high: 0.6 };
  const hours =
    metrics.annualHours === null
      ? null
      : {
          low: round(metrics.annualHours * scenarioShare.low),
          high: round(metrics.annualHours * scenarioShare.high),
        };
  const capacity = hours
    ? {
        low: round(hours.low * hourlyRate),
        high: round(hours.high * hourlyRate),
      }
    : null;
  const netLow = capacity ? capacity.low / 12 - monthly.high : 0;
  const netHigh = capacity ? capacity.high / 12 - monthly.low : 0;
  const paybackMonths =
    netLow > 0 && netHigh > 0
      ? {
          low: Math.ceil(implementation.low / netHigh),
          high: Math.ceil(implementation.high / netLow),
        }
      : null;
  return {
    version: 1,
    title:
      typeof data.title === "string" ? data.title.slice(0, 100) : sketch.title,
    summary:
      typeof data.summary === "string"
        ? data.summary.slice(0, 500)
        : `Eine individuelle Anwendung für ${sketch.title}: ${sketch.steps
            .slice(0, 3)
            .map((s) => s.label)
            .join(", ")}.`,
    processType,
    requiredViews: extractedViews.length
      ? extractedViews
      : defaults[processType],
    dataObjects: strings(data.dataObjects),
    actions: strings(data.actions),
    approvals,
    inputs,
    outputs,
    integrations,
    kpis: strings(data.kpis),
    todaySteps: strings(data.todaySteps).length
      ? strings(data.todaySteps)
      : sketch.steps.map((s) => s.label),
    futureSteps: [
      inputs.join(" / ") || "Prozesseingang",
      "Individuelle OpsDone Anwendung",
      "Standardfälle nach geprüften Regeln · Ausnahmen zur Entscheidung",
      outputs.join(" / ") || "Geprüftes Ergebnis",
    ],
    openQuestions: [
      ...new Set([
        ...sketch.open,
        ...strings(data.openQuestions),
        "Schnittstellen, Datenqualität und Freigaberegeln technisch prüfen.",
      ]),
    ].slice(0, 8),
    metrics,
    investment: {
      implementation,
      monthly,
      factors,
      assumptions: [
        "Unverbindliche Modellschätzung, kein Angebot. Alle Beträge netto zzgl. USt.",
        "Ein Pilotprozess, Rollen und Anmeldung sowie mindestens eine Systemübergabe sind eingeplant.",
        "Oberes Preisband: 50 % Scope-Reserve. Schnittstellenzugang, Datenqualität, Lizenzen und Service-Level sind noch zu prüfen.",
        "Betriebsband für Überwachung und Pflege; externe Lizenzen und außergewöhnlicher Verbrauch können hinzukommen.",
      ],
    },
    impact: {
      scenarioShare,
      annualHours: hours,
      annualCapacityEuro: capacity,
      paybackMonths,
      hourlyRate,
      assumptions: [
        "Rechenszenario: 30–60 % des heutigen Aufwands entfallen. Das ist eine Planungsannahme, keine Prozessprognose.",
        "Kapazitätswert mit angenommenen 50 € Vollkosten je Stunde; frei werdende Zeit ist keine garantierte Kostensenkung.",
        "12 Monate beziehungsweise 52 Wochen pro Jahr; regelmäßiger, unveränderter Durchsatz angenommen.",
        "Amortisation auf Basis des Kapazitätswerts nach laufenden Kosten, keine Cashflow-Zusage. Ohne positiven Wert im gesamten Szenario keine Spanne.",
      ],
    },
    feasibility: {
      label:
        inputs.length && outputs.length ? "Plausibler Ansatz" : "Zu prüfen",
      reasons: [
        inputs.length
          ? "Eingaben für einen ersten Entwurf beschrieben."
          : "Eingaben noch zu konkretisieren.",
        outputs.length
          ? "Gewünschtes Ergebnis beschrieben."
          : "Gewünschtes Ergebnis noch zu konkretisieren.",
        "Technische Machbarkeit und tatsächlich entfallende Arbeit sind noch nicht validiert.",
      ],
    },
  };
}

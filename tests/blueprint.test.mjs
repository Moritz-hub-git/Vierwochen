import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import vm from "node:vm";
import ts from "typescript";

const code = ts.transpileModule(
  readFileSync(new URL("../lib/blueprint.ts", import.meta.url), "utf8"),
  {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
    },
  },
).outputText;
const exports = {};
vm.runInNewContext(code, { exports });
const { extractWorkload, buildBlueprint } = exports;
const sketch = {
  title: "Bestellungen prüfen",
  steps: [
    { label: "E-Mail lesen", automation: "automatisch" },
    { label: "Abweichung freigeben", automation: "manuell" },
  ],
  value: [],
  open: [],
  assumptions: [],
};

test("monthly baseline is calculated from explicit user volume and effort", () => {
  const m = extractWorkload("600 Vorgänge pro Monat\n8 Minuten pro Vorgang");
  assert.equal(m.monthlyVolume, 600);
  assert.equal(m.minutesPerCase, 8);
  assert.equal(m.annualHours, 960);
  assert.equal(m.evidence.length, 2);
  assert.equal(
    extractWorkload("jeden Monat 600 Vorgänge\n8 Minuten").annualHours,
    960,
  );
  assert.equal(
    extractWorkload("600 Vorgänge monatlich\n8 Minuten pro Vorgang")
      .annualHours,
    960,
  );
});

test("weekly volumes use 52 weeks and decimal minutes retain their meaning", () => {
  const m = extractWorkload("50/Woche\n2,5 Minuten pro Fall");
  assert.equal(m.annualHours, 108);
  assert.equal(m.minutesPerCase, 2.5);
  assert.equal(extractWorkload("50/Woche\n2,5 Min./Vorgang").annualHours, 108);
});

test("unknowns, quantity ranges and unrelated narrative time never fabricate an exact ROI", () => {
  for (const text of [
    "600 Vorgänge pro Monat",
    "8 Minuten pro Vorgang",
    "200+/Woche\n8 Minuten pro Vorgang",
    "10–50 Vorgänge pro Woche\n8 Minuten pro Vorgang",
    "600 Vorgänge pro Monat\n5–10 Minuten pro Vorgang",
    "600 Vorgänge pro Monat. Wir haben einen Termin in 30 Minuten.",
  ]) {
    assert.equal(extractWorkload(text).annualHours, null, text);
  }
});

test("model-authored financial values are discarded and missing workload remains null", () => {
  const b = buildBlueprint(
    {
      monthlyVolume: 100000,
      minutesPerCase: 60,
      investment: { implementation: { low: 1, high: 1 } },
      impact: { annualCapacityEuro: { low: 99999999, high: 99999999 } },
    },
    sketch,
    "Wir prüfen Bestellungen in SAP.",
  );
  assert.equal(b.metrics.annualHours, null);
  assert.equal(b.impact.annualHours, null);
  assert.equal(b.impact.paybackMonths, null);
  assert.ok(b.investment.implementation.low >= 5000);
  assert.equal(b.processType, "purchasing");
});

test("scope changes deterministically increase pricing, unsupported integrations disappear", () => {
  const simple = buildBlueprint(
    { inputs: ["E-Mail"], integrations: ["SAP", "Unbekannt"] },
    sketch,
    "Bestellungen in SAP.",
  );
  const extended = buildBlueprint(
    {
      inputs: ["E-Mail", "PDF"],
      integrations: ["SAP", "CRM"],
      complexity: { workflowCount: 3, specialUi: true },
    },
    sketch,
    "Bestellungen in SAP, CRM aktualisieren.",
  );
  assert.equal(simple.integrations.join(","), "SAP");
  assert.ok(
    extended.investment.implementation.low >
      simple.investment.implementation.low,
  );
  assert.ok(extended.investment.monthly.high > simple.investment.monthly.high);
  assert.equal(
    simple.investment.implementation.low,
    simple.investment.factors.reduce((sum, f) => sum + f.euro, 0),
  );
});

test("capacity scenario and payback include operating costs and clearly expose assumptions", () => {
  const b = buildBlueprint(
    { inputs: ["PDF"], outputs: ["Geprüfte Bestellung"] },
    sketch,
    "600 Vorgänge pro Monat\n8 Minuten pro Vorgang",
  );
  assert.equal(b.impact.annualHours.low, 288);
  assert.equal(b.impact.annualHours.high, 576);
  assert.equal(b.impact.annualCapacityEuro.low, 14400);
  assert.equal(b.impact.annualCapacityEuro.high, 28800);
  assert.equal(
    b.impact.paybackMonths.low,
    Math.ceil(
      b.investment.implementation.low / (28800 / 12 - b.investment.monthly.low),
    ),
  );
  assert.match(b.impact.assumptions.join(" "), /keine Prozessprognose/);
  assert.match(
    b.impact.assumptions.join(" "),
    /keine garantierte Kostensenkung/,
  );
  const small = buildBlueprint(
    {},
    sketch,
    "10 Vorgänge pro Monat\n1 Minute pro Vorgang",
  );
  assert.equal(small.impact.paybackMonths, null);
});

test("German thousands are parsed as a whole quantity, never as a numeric suffix", () => {
  const m = extractWorkload("1.040 Vorgänge/Monat\n8 Minuten pro Vorgang");
  assert.equal(m.monthlyVolume, 1040);
  assert.equal(m.annualHours, 1664);
  assert.equal(
    extractWorkload("1.040.500 Vorgänge/Monat\n8 Minuten pro Vorgang")
      .monthlyVolume,
    null,
  );
});

test("input quantities are not multiplied by effort for a different output object", () => {
  const cases = extractWorkload(
    "600 Vorgänge pro Monat und 1.200 Dateien pro Monat. 8 Minuten pro Vorgang.",
  );
  assert.equal(cases.monthlyVolume, 600);
  assert.equal(cases.annualHours, 960);
  const reports = extractWorkload(
    "12 Berichte pro Monat aus 600 Dateien pro Monat. 8 Minuten pro Bericht.",
  );
  assert.equal(reports.monthlyVolume, 12);
  assert.equal(
    extractWorkload("600 Dateien pro Monat. 8 Minuten pro Bericht.")
      .annualHours,
    null,
  );
  assert.equal(
    extractWorkload(
      "600 Bestellungen pro Monat und 400 Rechnungen pro Monat. 8 Minuten pro Vorgang.",
    ).annualHours,
    null,
  );
});

test("a later explicit chip can update an amount, while ambiguous ranges cannot", () => {
  assert.equal(
    extractWorkload(
      "Wir bearbeiten 600 Vorgänge pro Monat.\n800 Vorgänge pro Monat\n8 Minuten pro Vorgang",
    ).monthlyVolume,
    800,
  );
  assert.equal(
    extractWorkload("200+/Woche\n8 Minuten pro Vorgang").annualHours,
    null,
  );
  assert.equal(
    extractWorkload("200 oder 300 Vorgänge pro Woche\n8 Minuten pro Vorgang")
      .annualHours,
    null,
  );
});

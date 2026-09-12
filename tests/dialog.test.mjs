import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import vm from "node:vm";
import ts from "typescript";

const code = ts.transpileModule(
  readFileSync(new URL("../lib/dialog.ts", import.meta.url), "utf8"),
  {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
    },
  },
).outputText;

const exports = {};
vm.runInNewContext(code, {
  exports,
  require(name) {
    assert.equal(name, "./config");
    return {
      COST_ANCHOR: { euroPerPersonDay: 300, workWeeksPerYear: 45 },
      LIMITS: { maxMessageChars: 1500 },
      PRICE: { floor: 5000, ceiling: 30000 },
      RETAINER: {
        monthlyLabel: "monatlich nach Umfang",
        notice: "Laufzeit laut Angebot",
      },
      SITE: {
        name: "OpsDone",
        category: "AI-native Process Automation",
        founder: { name: "Moritz Schumacher" },
      },
    };
  },
  console,
});

const { ensureConverged, normalizeTurn } = exports;

function rawResult(quote = "12 Stunden pro Woche") {
  return {
    reply: "Hier ist die Vorschau.",
    phase: "result",
    sketch: {
      title: "Rechnungsprüfung",
      steps: [
        { label: "Rechnung empfangen", automation: "automatisch" },
        { label: "Abweichungen prüfen", automation: "teilautomatisch" },
        { label: "Freigabe erteilen", automation: "manuell" },
      ],
      value: ["Weniger Übertragung"],
      open: [],
      assumptions: [],
    },
    input: { kind: "chips", options: ["A", "B"] },
    result: {
      tier: "pilot",
      priceItems: [{ label: "Pilot", euro: 5000 }],
      scope: ["Rechnungseingang"],
      weeks: [
        { week: 1, label: "Prozessaufnahme" },
        { week: 2, label: "Pilot" },
        { week: 3, label: "Abnahme" },
      ],
      savings: { timesPerWeek: 1, hoursEach: 12, quote },
    },
  };
}

test("third answered discovery question forces a terminal preview", () => {
  const question = normalizeTurn({
    reply: "Welche Freigabe gilt?",
    phase: "question",
    sketch: rawResult().sketch,
    input: { kind: "chips", options: ["Vier Augen", "Keine"] },
  });
  const result = ensureConverged(question, {
    questionsAsked: 3,
    userTurns: 4,
  });

  assert.equal(result.phase, "result");
  assert.ok(result.result);
  assert.equal(result.input, undefined);
  assert.match(result.reply, /vorläufige Prozessvorschau/i);
});

test("a business count alone cannot produce a savings estimate", () => {
  const result = normalizeTurn(
    rawResult("500 Vorgänge"),
    "Wir bearbeiten 500 Vorgänge in SAP.",
  );
  assert.equal(result.result?.savings, undefined);
});

test("result turns never retain interactive question input", () => {
  const result = normalizeTurn(
    rawResult(),
    "Das kostet uns 12 Stunden pro Woche.",
  );
  assert.equal(result.phase, "result");
  assert.equal(result.input, undefined);
});

test("savings require an exact, time-based quote from the user", () => {
  const grounded = normalizeTurn(
    rawResult("12 Stunden pro Woche"),
    "Die manuelle Prüfung kostet uns 12 Stunden pro Woche.",
  );
  assert.equal(grounded.result?.savings?.quote, "12 Stunden pro Woche");
  assert.equal(grounded.result?.savings?.personDaysPerWeek, 1.5);

  const fabricated = normalizeTurn(
    rawResult("20 Stunden pro Woche"),
    "Die manuelle Prüfung kostet uns 12 Stunden pro Woche.",
  );
  assert.equal(fabricated.result?.savings, undefined);
});

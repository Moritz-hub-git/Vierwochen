import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import ts from "typescript";
const source = ts.transpileModule(
  readFileSync(new URL("../lib/potential.ts", import.meta.url), "utf8"),
  { compilerOptions: { module: ts.ModuleKind.ES2022 } },
).outputText;
const { calculatePotential } = await import(
  `data:text/javascript;base64,${Buffer.from(source).toString("base64")}`
);
test("500 cases at 5 minutes, 80% automated, 2 minute exceptions gives 38.33h and €20700/year", () => {
  const r = calculatePotential({
    volume: 500,
    minutes: 5,
    hourlyCost: 45,
    automation: 80,
    exceptionMinutes: 2,
  });
  assert.ok(Math.abs(r.savedHours - 38.3333333333333) < 1e-8);
  assert.ok(Math.abs(r.annualCapacityValue - 20700) < 1e-8);
});
test("example in company strategy: 90% standard cases and one minute exceptions eliminates 98% of time", () => {
  const r = calculatePotential({
    volume: 500,
    minutes: 5,
    hourlyCost: 45,
    automation: 90,
    exceptionMinutes: 1,
  });
  assert.ok(Math.abs(r.eliminatedPercent - 98) < 1e-8);
});
test("no work cannot produce capacity value", () => {
  assert.equal(
    calculatePotential({
      volume: 0,
      minutes: 5,
      hourlyCost: 45,
      automation: 100,
      exceptionMinutes: 2,
    }).annualCapacityValue,
    0,
  );
});
test("exceptions longer than the baseline never promise negative savings", () => {
  assert.equal(
    calculatePotential({
      volume: 500,
      minutes: 1,
      hourlyCost: 45,
      automation: 0,
      exceptionMinutes: 5,
    }).savedHours,
    0,
  );
});
test("invalid assumptions are rejected", () => {
  for (const override of [
    { automation: 101 },
    { volume: -1 },
    { minutes: NaN },
    { hourlyCost: Infinity },
  ])
    assert.throws(() =>
      calculatePotential({
        volume: 500,
        minutes: 5,
        hourlyCost: 45,
        automation: 80,
        exceptionMinutes: 2,
        ...override,
      }),
    );
});

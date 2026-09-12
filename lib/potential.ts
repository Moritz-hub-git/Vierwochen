export type PotentialInput = {
  volume: number;
  minutes: number;
  hourlyCost: number;
  automation: number;
  exceptionMinutes: number;
};
export function calculatePotential(input: PotentialInput) {
  const values = Object.values(input);
  if (
    values.some((v) => !Number.isFinite(v) || v < 0) ||
    input.automation > 100
  )
    throw new Error("Invalid potential inputs");
  const beforeHours = (input.volume * input.minutes) / 60;
  const afterHours =
    (input.volume * (1 - input.automation / 100) * input.exceptionMinutes) / 60;
  const savedHours = Math.max(0, beforeHours - afterHours);
  return {
    beforeHours,
    afterHours,
    savedHours,
    annualCapacityValue: savedHours * 12 * input.hourlyCost,
    eliminatedPercent: beforeHours ? (savedHours / beforeHours) * 100 : 0,
  };
}

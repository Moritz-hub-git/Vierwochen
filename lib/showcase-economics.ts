/** Illustrative unlevered hydrogen project. All monetary results are in EUR million. */
export const ECONOMICS_ASSUMPTIONS = {
  capacityMW: 1000,
  energyKWhPerKg: 50,
  hydrogenPricePerKg: 4.9,
  annualOperatingCostMillion: 142.8,
  years: 20,
  discountRate: 0.1,
} as const;

export type ScenarioInputs = {
  electricity: number;
  hours: number;
  capex: number;
};
export function projectEconomics(input: ScenarioInputs) {
  const { electricity, hours, capex } = input;
  if (
    ![electricity, hours, capex].every(Number.isFinite) ||
    electricity < 0 ||
    hours <= 0 ||
    hours > 8760 ||
    capex <= 0
  )
    throw new Error("Invalid scenario assumptions");
  const a = ECONOMICS_ASSUMPTIONS;
  const energyMWh = a.capacityMW * hours;
  const revenue =
    (((energyMWh * 1000) / a.energyKWhPerKg) * a.hydrogenPricePerKg) / 1e6;
  const cashflow =
    revenue - (energyMWh * electricity) / 1e6 - a.annualOperatingCostMillion;
  const discountedValue = (rate: number) =>
    -capex +
    Array.from(
      { length: a.years },
      (_, i) => cashflow / (1 + rate) ** (i + 1),
    ).reduce((sum, value) => sum + value, 0);
  let irr: number | null = null;
  if (cashflow > 0) {
    let low = -0.99,
      high = 1;
    while (discountedValue(high) > 0 && high < 1e6) high *= 2;
    for (let i = 0; i < 100; i++) {
      const mid = (low + high) / 2;
      if (discountedValue(mid) > 0) low = mid;
      else high = mid;
    }
    irr = (low + high) / 2;
  }
  const simplePayback = cashflow > 0 ? capex / cashflow : null;
  return {
    cashflow,
    revenue,
    npv: discountedValue(a.discountRate),
    irr,
    payback:
      simplePayback !== null && simplePayback <= a.years ? simplePayback : null,
  };
}

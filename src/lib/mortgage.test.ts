import { describe, it, expect } from "vitest";

// Pure EMI formula extracted from MortgageCalculatorTool for testability
export function calcEmi(principal: number, annualRatePct: number, years: number) {
  const n = years * 12;
  const mr = annualRatePct / 100 / 12;
  if (mr === 0) return principal / n;
  return (principal * mr) / (1 - Math.pow(1 + mr, -n));
}

describe("mortgage EMI", () => {
  it("calculates known EMI", () => {
    // 200k loan, 6% annual, 30 years => ~1199.10
    const emi = calcEmi(200000, 6, 30);
    expect(emi).toBeCloseTo(1199.10, 0);
  });
  it("handles zero interest", () => {
    expect(calcEmi(120000, 0, 10)).toBeCloseTo(1000, 5);
  });
  it("handles down payment via principal reduction", () => {
    const loan = 250000;
    const down = 50000;
    const principal = loan - down;
    const emi = calcEmi(principal, 5, 15);
    expect(emi).toBeGreaterThan(0);
    expect(emi).toBeLessThan(2000);
  });
});

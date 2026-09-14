import { describe, it, expect } from "vitest";

// Pure EMI formula extracted from MortgageCalculatorTool for testability
export function calcEmi(principal: number, annualRatePct: number, years: number) {
  if (!isFinite(years) || years<=0 || !isFinite(principal) || principal<=0) return NaN;
  const n = years * 12;
  if (n===0 || !isFinite(n)) return NaN;
  const mr = annualRatePct / 100 / 12;
  if (!isFinite(mr)) return NaN;
  if (mr === 0) return principal / n;
  const emi = (principal * mr) / (1 - Math.pow(1 + mr, -n));
  if (!isFinite(emi)) return NaN;
  return emi;
}

describe("mortgage EMI", () => {
  it("calculates known EMI", () => {
    // 200k loan, 6% annual, 30 years => ~1199.10
    const emi = calcEmi(200000, 6, 30);
    expect(emi).toBeCloseTo(1199.10, 2);
  });
  it("golden EMI 536.82 for 100k 5% 30y", () => {
    expect(calcEmi(100000, 5, 30)).toBeCloseTo(536.82, 2);
  });
  it("handles zero interest", () => {
    expect(calcEmi(120000, 0, 10)).toBeCloseTo(1000, 2);
  });
  it("handles down payment via principal reduction", () => {
    const loan = 250000;
    const down = 50000;
    const principal = loan - down;
    const emi = calcEmi(principal, 5, 15);
    expect(emi).toBeGreaterThan(0);
    expect(emi).toBeLessThan(2000);
  });
  it("handles y=0 returns NaN", () => {
    expect(calcEmi(100000, 5, 0)).toBeNaN();
  });
  it("handles y=-1 returns NaN", () => {
    expect(calcEmi(100000, 5, -1)).toBeNaN();
  });
  it("handles down>loan returns NaN", () => {
    const loan = 200000;
    const down = 250000;
    const principal = loan - down; // down>loan => principal <=0
    expect(calcEmi(principal, 5, 30)).toBeNaN();
  });
  it("handles Infinity returns NaN", () => {
    expect(calcEmi(Infinity, 5, 30)).toBeNaN();
    expect(calcEmi(100000, 5, Infinity)).toBeNaN();
    expect(calcEmi(100000, Infinity, 30)).toBeNaN();
  });
  it("handles NaN returns NaN", () => {
    expect(calcEmi(NaN, 5, 30)).toBeNaN();
    expect(calcEmi(100000, NaN, 30)).toBeNaN();
    expect(calcEmi(100000, 5, NaN)).toBeNaN();
  });
  it("handles n===0 edge", () => {
    expect(calcEmi(100000, 5, 0)).toBeNaN();
    // very small years leading to n===0 after handling
    expect(calcEmi(100000, 5, 0 as number)).toBeNaN();
  });
});

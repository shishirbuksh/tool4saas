import { describe, it, expect } from "vitest";
import {
  calcEmi,
  amortizationSchedule,
  salesTaxTotal,
  gstSplit,
  indiaSlabTax,
  fdMaturity,
  ppfMaturity,
  estimateTokens,
} from "./finance-calc";

describe("finance-calc – calcEmi", () => {
  it("golden EMI 536.82 for 100k 5% 30y", () => {
    const r = calcEmi({ principal: 100000, annualRatePct: 5, years: 30 });
    expect(r).not.toBeNull();
    expect(r!.emi).toBeCloseTo(536.82, 2);
    expect(r!.months).toBe(360);
    expect(r!.total).toBeCloseTo(r!.emi * 360, 2);
    expect(r!.interest).toBeCloseTo(r!.total - 100000, 2);
    expect(r!.interest).toBeGreaterThan(0);
  });

  it("zero-rate EMI is principal/months", () => {
    const r = calcEmi({ principal: 120000, annualRatePct: 0, years: 10 });
    expect(r).not.toBeNull();
    expect(r!.emi).toBeCloseTo(1000, 2);
    expect(r!.months).toBe(120);
    expect(r!.interest).toBeCloseTo(0, 2);
  });

  it("returns null for invalid inputs", () => {
    expect(calcEmi({ principal: 0, annualRatePct: 5, years: 30 })).toBeNull();
    expect(calcEmi({ principal: -100, annualRatePct: 5, years: 30 })).toBeNull();
    expect(calcEmi({ principal: 100000, annualRatePct: 5, years: 0 })).toBeNull();
    expect(calcEmi({ principal: 100000, annualRatePct: -1, years: 30 })).toBeNull();
    expect(calcEmi({ principal: NaN, annualRatePct: 5, years: 30 })).toBeNull();
    expect(calcEmi({ principal: Infinity, annualRatePct: 5, years: 30 })).toBeNull();
  });
});

describe("finance-calc – amortizationSchedule", () => {
  it("has 360 rows for 30y and positive first principal", () => {
    const rows = amortizationSchedule(100000, 5, 30);
    expect(rows.length).toBe(360);
    const first = rows[0];
    expect(first.month).toBe(1);
    expect(first.emi).toBeCloseTo(536.82, 2);
    expect(first.interest).toBeCloseTo(416.67, 1);
    expect(first.principal).toBeGreaterThan(0);
    expect(first.principal).toBeCloseTo(120.15, 1);
    expect(first.balance).toBeLessThan(100000);
    expect(rows[rows.length - 1].balance).toBeCloseTo(0, 2);
  });

  it("returns [] for invalid inputs", () => {
    expect(amortizationSchedule(0, 5, 30)).toEqual([]);
    expect(amortizationSchedule(100000, 5, 0)).toEqual([]);
  });
});

describe("finance-calc – fdMaturity", () => {
  it("quarterly compounding 100k 7% 5y", () => {
    const r = fdMaturity({ principal: 100000, annualRatePct: 7, years: 5 });
    expect(r).not.toBeNull();
    expect(r!.maturity).toBeCloseTo(141477.82, 1);
    expect(r!.interest).toBeCloseTo(41477.82, 1);
    expect(r!.effYieldPct).toBeGreaterThan(7);
  });

  it("returns null for invalid inputs", () => {
    expect(fdMaturity({ principal: 0, annualRatePct: 7, years: 5 })).toBeNull();
    expect(fdMaturity({ principal: 100000, annualRatePct: 16, years: 5 })).toBeNull();
    expect(fdMaturity({ principal: 100000, annualRatePct: 7, years: 0 })).toBeNull();
  });
});

describe("finance-calc – ppfMaturity bounds", () => {
  it("150k 7.1% 15y maturity exceeds invested", () => {
    const r = ppfMaturity({ yearlyDeposit: 150000, annualRatePct: 7.1, years: 15 });
    expect(r).not.toBeNull();
    expect(r!.invested).toBe(2250000);
    expect(r!.maturity).toBeCloseTo(4068209.22, 0);
    expect(r!.maturity).toBeGreaterThan(r!.invested);
    expect(r!.interest).toBeCloseTo(r!.maturity - r!.invested, 2);
    expect(r!.interest).toBeGreaterThan(0);
  });

  it("returns null outside PPF rules", () => {
    expect(ppfMaturity({ yearlyDeposit: 100, annualRatePct: 7.1, years: 15 })).toBeNull();
    expect(ppfMaturity({ yearlyDeposit: 150000, annualRatePct: 7.1, years: 10 })).toBeNull();
    expect(ppfMaturity({ yearlyDeposit: 200000, annualRatePct: 7.1, years: 15 })).toBeNull();
  });
});

describe("finance-calc – gstSplit", () => {
  it("intra-state splits CGST/SGST", () => {
    const r = gstSplit(1000, 18, false);
    expect(r).not.toBeNull();
    expect(r!.cgst).toBeCloseTo(90, 2);
    expect(r!.sgst).toBeCloseTo(90, 2);
    expect(r!.igst).toBe(0);
    expect(r!.total).toBeCloseTo(1180, 2);
  });

  it("inter-state books IGST", () => {
    const r = gstSplit(1000, 18, true);
    expect(r).not.toBeNull();
    expect(r!.cgst).toBe(0);
    expect(r!.sgst).toBe(0);
    expect(r!.igst).toBeCloseTo(180, 2);
    expect(r!.total).toBeCloseTo(1180, 2);
  });
});

describe("finance-calc – salesTaxTotal", () => {
  it("100 @ 8% => tax 8 total 108", () => {
    const r = salesTaxTotal(100, 8);
    expect(r).not.toBeNull();
    expect(r!.tax).toBeCloseTo(8, 2);
    expect(r!.total).toBeCloseTo(108, 2);
  });

  it("returns null for negatives", () => {
    expect(salesTaxTotal(-100, 8)).toBeNull();
    expect(salesTaxTotal(100, -8)).toBeNull();
  });
});

describe("finance-calc – indiaSlabTax (FY26-27 new regime)", () => {
  it("nil up to 4L", () => {
    expect(indiaSlabTax(400000)).toBe(0);
  });

  it("5L => 5k (5% of 1L)", () => {
    expect(indiaSlabTax(500000)).toBeCloseTo(5000, 2);
  });

  it("10L => 40k (20k + 20k)", () => {
    expect(indiaSlabTax(1000000)).toBeCloseTo(40000, 2);
  });
});

describe("finance-calc – estimateTokens", () => {
  it("empty string is zero", () => {
    expect(estimateTokens("")).toEqual({ chars: 0, words: 0, tokens: 0 });
  });

  it("prose uses ~4 chars per token", () => {
    const r = estimateTokens("hello world");
    expect(r.words).toBe(2);
    expect(r.tokens).toBe(3);
  });

  it("code gets 1.15x boost", () => {
    const plain = estimateTokens("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    const code = estimateTokens("const x = 1; function f() { return [1,2,3]; }");
    expect(code.tokens).toBeGreaterThanOrEqual(plain.tokens);
    expect(code.words).toBeGreaterThan(0);
  });
});

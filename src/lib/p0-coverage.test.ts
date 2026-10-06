import { describe, it, expect } from "vitest";
import {
  loanFromEmi,
  homeLoanEligibility,
  overpaymentSchedule,
  hraExemption,
  inHandIndia,
  simulatePayoff,
  calcIndiaCG,
  estimateAiCost,
  calcEmi,
} from "./finance-calc";
import {
  validatePdfFile,
  validatePdfBatch,
  MAX_PDF_SIZE,
  MAX_PDF_FILES,
  MAX_PDF_TOTAL_SIZE,
} from "./validate";
import {
  MS_PER_HOUR,
  MS_PER_MINUTE,
  MS_PER_SECOND,
  EPSILON_RATE,
  UINT32_MAX_PLUS_ONE,
  WPM_SPEAKING,
  BMI_UNDERWEIGHT,
  BMI_NORMAL,
  BMI_OVERWEIGHT,
  KG_PER_LB,
  METERS_PER_INCH,
} from "./format";

function pdfFile(name: string, size: number, type: string): File {
  return { name, size, type } as unknown as File;
}

describe("finance-calc – previously uncovered exports", () => {
  it("loanFromEmi inverts calcEmi", () => {
    const emi = calcEmi({ principal: 100000, annualRatePct: 5, years: 30 })!.emi;
    const p = loanFromEmi(emi, 5, 30);
    expect(p).not.toBeNull();
    expect(p!).toBeCloseTo(100000, 0);
    expect(loanFromEmi(1000, 0, 10)).toBeCloseTo(120000, 0);
    expect(loanFromEmi(-5, 5, 30)).toBeNull();
    expect(loanFromEmi(NaN, 5, 30)).toBeNull();
  });

  it("homeLoanEligibility respects FOIR and multiplier caps", () => {
    const r = homeLoanEligibility({ netMonthly: 100000, annualRatePct: 9, years: 20 });
    expect(r).not.toBeNull();
    expect(r!.availEmi).toBeCloseTo(50000, 0);
    expect(r!.maxByMultiplier).toBe(5500000);
    expect(r!.eligible).toBeGreaterThan(0);
    expect(r!.eligible).toBeLessThanOrEqual(r!.maxByMultiplier);
    expect(homeLoanEligibility({ netMonthly: 0, annualRatePct: 9, years: 20 })).toBeNull();
    const noAvail = homeLoanEligibility({ netMonthly: 50000, existingEmi: 40000, annualRatePct: 9, years: 20 });
    expect(noAvail!.eligible).toBe(0);
  });

  it("overpaymentSchedule saves interest and months", () => {
    const r = overpaymentSchedule(500000, 8, 20, 5000, 0);
    expect(r).not.toBeNull();
    expect(r!.saved).toBeGreaterThan(0);
    expect(r!.monthsSaved).toBeGreaterThan(0);
    expect(r!.newTermMonths).toBeLessThan(240);
    expect(overpaymentSchedule(100000, 5, 30, -1, 0)).toBeNull();
  });

  it("hraExemption metro vs non-metro", () => {
    const metro = hraExemption({ hra: 300000, basic: 600000, rent: 400000, metro: true });
    const nonMetro = hraExemption({ hra: 300000, basic: 600000, rent: 400000, metro: false });
    expect(metro).not.toBeNull();
    expect(nonMetro).not.toBeNull();
    expect(metro!).toBeGreaterThanOrEqual(nonMetro!);
    expect(hraExemption({ hra: -1, basic: 100, rent: 100 })).toBeNull();
  });

  it("inHandIndia FY26-27 basic flow", () => {
    const r = inHandIndia({ ctcAnnual: 1200000, basicDaAnnual: 600000 });
    expect(r).not.toBeNull();
    expect(r!.inHandMonthly).toBeGreaterThan(0);
    expect(r!.annualTax).toBeGreaterThanOrEqual(0);
    expect(inHandIndia({ ctcAnnual: 500000, basicDaAnnual: 600000 })).toBeNull();
  });

  it("simulatePayoff snowball vs avalanche order", () => {
    const debts = [
      { name: "card", balance: 50000, aprPct: 36, minPayment: 2000 },
      { name: "loan", balance: 200000, aprPct: 12, minPayment: 5000 },
    ];
    const snow = simulatePayoff(debts, 5000, "snowball");
    const aval = simulatePayoff(debts, 5000, "avalanche");
    expect(snow).not.toBeNull();
    expect(aval).not.toBeNull();
    expect(snow!.order[0]).toBe("card");
    expect(aval!.order[0]).toBe("card");
    expect(snow!.neverPaysOff).toBe(false);
    expect(simulatePayoff([], 100, "snowball")).toBeNull();
  });

  it("calcIndiaCG equity LTCG exemption and STCG", () => {
    const ltcg = calcIndiaCG({ asset: "equity", buyPrice: 100000, salePrice: 300000, holdingMonths: 18 });
    expect(ltcg).not.toBeNull();
    expect(ltcg!.isLongTerm).toBe(true);
    expect(ltcg!.ratePct).toBe(12.5);
    expect(ltcg!.taxableGain).toBeLessThanOrEqual(ltcg!.gain);
    const stcg = calcIndiaCG({ asset: "equity", buyPrice: 100000, salePrice: 150000, holdingMonths: 6 });
    expect(stcg!.ratePct).toBe(20);
    const loss = calcIndiaCG({ asset: "equity", buyPrice: 200000, salePrice: 150000, holdingMonths: 18 });
    expect(loss!.totalTax).toBe(0);
    expect(calcIndiaCG({ asset: "equity", buyPrice: -1, salePrice: 100, holdingMonths: 5 })).toBeNull();
  });

  it("estimateAiCost scales per million", () => {
    expect(estimateAiCost(1000000, 5)).toBeCloseTo(5, 6);
    expect(estimateAiCost(0, 5)).toBe(0);
    expect(estimateAiCost(-1, 5)).toBeNull();
    expect(estimateAiCost(NaN, 5)).toBeNull();
  });
});

describe("validate – PDF exports", () => {
  it("validatePdfFile accepts pdf type and .pdf extension", () => {
    expect(validatePdfFile(pdfFile("a.pdf", 100, "application/pdf")).valid).toBe(true);
    expect(validatePdfFile(pdfFile("a.pdf", 0, "application/pdf")).valid).toBe(false);
    expect(validatePdfFile(pdfFile("a.pdf", MAX_PDF_SIZE + 1, "application/pdf")).valid).toBe(false);
    expect(validatePdfFile(pdfFile("a.txt", 100, "text/plain")).valid).toBe(false);
    expect(validatePdfFile(pdfFile("noext", 100, "")).valid).toBe(false);
    // empty type + .pdf extension fallback passes
    expect(validatePdfFile(pdfFile("scan.pdf", 100, "")).valid).toBe(true);
  });

  it("validatePdfBatch enforces count and total size", () => {
    const ok = [pdfFile("a.pdf", 100, "application/pdf"), pdfFile("b.pdf", 100, "application/pdf")];
    expect(validatePdfBatch(ok).valid).toBe(true);
    const tooMany = Array.from({ length: MAX_PDF_FILES + 1 }, (_, i) => pdfFile(`${i}.pdf`, 100, "application/pdf"));
    expect(validatePdfBatch(tooMany).valid).toBe(false);
    const huge = [pdfFile("big.pdf", MAX_PDF_TOTAL_SIZE + 1, "application/pdf")];
    expect(validatePdfBatch(huge).valid).toBe(false);
  });
});

describe("format – previously unasserted constants", () => {
  it("time and numeric constants are sane", () => {
    expect(MS_PER_SECOND).toBe(1000);
    expect(MS_PER_MINUTE).toBe(60000);
    expect(MS_PER_HOUR).toBe(3600000);
    expect(EPSILON_RATE).toBeGreaterThan(0);
    expect(UINT32_MAX_PLUS_ONE).toBe(4294967296);
    expect(WPM_SPEAKING).toBeGreaterThan(0);
  });

  it("health conversion constants are sane", () => {
    expect(BMI_UNDERWEIGHT).toBeLessThan(BMI_NORMAL);
    expect(BMI_NORMAL).toBeLessThan(BMI_OVERWEIGHT);
    expect(KG_PER_LB).toBeCloseTo(0.4536, 3);
    expect(METERS_PER_INCH).toBeCloseTo(0.0254, 4);
  });
});

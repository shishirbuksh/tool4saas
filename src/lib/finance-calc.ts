import { EPSILON_RATE } from "./format";

export type EmiInput = {
  principal: number;
  annualRatePct: number;
  years: number;
};

export type EmiResult = {
  emi: number;
  total: number;
  interest: number;
  months: number;
} | null;

export function calcEmi({ principal, annualRatePct, years }: EmiInput): EmiResult {
  if (!isFinite(principal) || !isFinite(annualRatePct) || !isFinite(years)) return null;
  if (principal <= 0 || years <= 0 || annualRatePct < 0) return null;
  const n = Math.round(years * 12);
  if (!isFinite(n) || n <= 0) return null;
  const mr = annualRatePct / 100 / 12;
  if (!isFinite(mr)) return null;
  const emi = mr === 0 || Math.abs(mr) < EPSILON_RATE ? principal / n : (principal * mr) / (1 - Math.pow(1 + mr, -n));
  if (!isFinite(emi)) return null;
  const total = emi * n;
  if (!isFinite(total)) return null;
  const interest = total - principal;
  if (!isFinite(interest)) return null;
  return { emi, total, interest, months: n };
}

export type AmortRow = { month: number; emi: number; principal: number; interest: number; balance: number };

export function amortizationSchedule(principal: number, annualRatePct: number, years: number, maxRows = 360): AmortRow[] {
  const r = calcEmi({ principal, annualRatePct, years });
  if (!r) return [];
  const mr = annualRatePct / 100 / 12;
  let balance = principal;
  const rows: AmortRow[] = [];
  const n = Math.min(r.months, maxRows);
  for (let m = 1; m <= n; m++) {
    const interest = balance * mr;
    const princ = Math.min(r.emi - interest, balance);
    balance = Math.max(0, balance - princ);
    rows.push({ month: m, emi: r.emi, principal: princ, interest, balance });
    if (balance <= 0) break;
  }
  return rows;
}

export function salesTaxTotal(subtotal: number, ratePct: number): { tax: number; total: number } | null {
  if (!isFinite(subtotal) || !isFinite(ratePct) || subtotal < 0 || ratePct < 0) return null;
  const tax = (subtotal * ratePct) / 100;
  if (!isFinite(tax)) return null;
  return { tax, total: subtotal + tax };
}

export function loanFromEmi(emi: number, annualRatePct: number, years: number): number | null {
  if (!isFinite(emi) || !isFinite(annualRatePct) || !isFinite(years)) return null;
  if (emi <= 0 || years <= 0 || annualRatePct < 0) return null;
  const n = Math.round(years * 12);
  if (n <= 0) return null;
  const mr = annualRatePct / 100 / 12;
  if (!isFinite(mr)) return null;
  if (mr === 0 || Math.abs(mr) < EPSILON_RATE) return emi * n;
  const p = (emi * (1 - Math.pow(1 + mr, -n))) / mr;
  return isFinite(p) && p > 0 ? p : null;
}

export function homeLoanEligibility(opts: {
  netMonthly: number;
  existingEmi?: number;
  annualRatePct: number;
  years: number;
  foirCap?: number;
  multiplierCap?: number;
}): { availEmi: number; maxByFoir: number | null; maxByMultiplier: number; eligible: number } | null {
  const { netMonthly, annualRatePct, years } = opts;
  const existingEmi = opts.existingEmi ?? 0;
  const foirCap = opts.foirCap ?? 0.5;
  const multiplierCap = opts.multiplierCap ?? 55;
  if (!isFinite(netMonthly) || !isFinite(existingEmi) || !isFinite(annualRatePct) || !isFinite(years)) return null;
  if (netMonthly <= 0 || years <= 0 || annualRatePct < 0 || existingEmi < 0) return null;
  const availEmi = netMonthly * foirCap - existingEmi;
  if (availEmi <= 0) return { availEmi, maxByFoir: 0, maxByMultiplier: netMonthly * multiplierCap, eligible: 0 };
  const maxByFoir = loanFromEmi(availEmi, annualRatePct, years);
  const maxByMultiplier = netMonthly * multiplierCap;
  const eligible = Math.min(maxByFoir ?? 0, maxByMultiplier);
  return { availEmi, maxByFoir, maxByMultiplier, eligible: Math.max(0, eligible) };
}

export function overpaymentSchedule(
  principal: number,
  annualRatePct: number,
  years: number,
  extraMonthly = 0,
  lumpSum = 0,
): { baseInterest: number; newInterest: number; saved: number; monthsSaved: number; newTermMonths: number } | null {
  const base = calcEmi({ principal, annualRatePct, years });
  if (!base) return null;
  if (!isFinite(extraMonthly) || !isFinite(lumpSum) || extraMonthly < 0 || lumpSum < 0) return null;
  const mr = annualRatePct / 100 / 12;
  let balance = principal - Math.min(lumpSum, principal);
  let months = 0;
  let interest = 0;
  const cap = Math.round(years * 12) + 600;
  while (balance > 0 && months < cap) {
    const i = balance * mr;
    const pay = base.emi; // base EMI
    let princ = pay - i + extraMonthly;
    if (princ <= 0) return null;
    princ = Math.min(princ, balance);
    balance -= princ;
    interest += i;
    months++;
  }
  if (balance > 0) return null;
  const saved = Math.max(0, base.interest - interest);
  return { baseInterest: base.interest, newInterest: interest, saved, monthsSaved: Math.max(0, base.months - months), newTermMonths: months };
}

export function hraExemption(opts: { hra: number; basic: number; rent: number; metro?: boolean }): number | null {
  const { hra, basic, rent } = opts;
  const metro = opts.metro ?? false;
  if (![hra, basic, rent].every((v) => isFinite(v) && v >= 0)) return null;
  const pct = metro ? 0.5 * basic : 0.4 * basic;
  const over = Math.max(0, rent - 0.1 * basic);
  return Math.max(0, Math.min(hra, pct, over));
}

export function gstSplit(taxable: number, ratePct: number, interState: boolean): { cgst: number; sgst: number; igst: number; total: number } | null {
  if (!isFinite(taxable) || !isFinite(ratePct) || taxable < 0 || ratePct < 0) return null;
  const tax = (taxable * ratePct) / 100;
  if (!isFinite(tax)) return null;
  if (interState) return { cgst: 0, sgst: 0, igst: tax, total: taxable + tax };
  return { cgst: tax / 2, sgst: tax / 2, igst: 0, total: taxable + tax };
}

// India FY26-27 new regime slabs (Budget 2025 retained in 2026)
export type IndiaSlab = { upTo: number; rate: number };
export const INDIA_NEW_REGIME_FY26_27: IndiaSlab[] = [
  { upTo: 400_000, rate: 0 },
  { upTo: 800_000, rate: 0.05 },
  { upTo: 1_200_000, rate: 0.1 },
  { upTo: 1_600_000, rate: 0.15 },
  { upTo: 2_000_000, rate: 0.2 },
  { upTo: 2_400_000, rate: 0.25 },
  { upTo: Infinity, rate: 0.3 },
];
export const INDIA_STD_DED = 75_000;
export const INDIA_87A_LIMIT = 1_200_000;
export const INDIA_87A_MAX = 60_000;
export const INDIA_CESS = 0.04;

export function indiaSlabTax(taxable: number, slabs = INDIA_NEW_REGIME_FY26_27): number | null {
  if (!isFinite(taxable) || taxable < 0) return null;
  let tax = 0;
  let prev = 0;
  for (const s of slabs) {
    if (taxable <= prev) break;
    tax += (Math.min(taxable, s.upTo) - prev) * s.rate;
    prev = s.upTo;
  }
  return isFinite(tax) ? tax : null;
}

export function inHandIndia(opts: { ctcAnnual: number; basicDaAnnual: number; ptMonthly?: number; pfCapped?: boolean }): {
  grossAnnual: number; empPfAnnual: number; ptAnnual: number; taxable: number; slabTax: number; rebate: number; cess: number; annualTax: number; inHandMonthly: number; inHandAnnual: number;
} | null {
  const { ctcAnnual, basicDaAnnual } = opts;
  const ptMonthly = opts.ptMonthly ?? 200;
  const pfCapped = opts.pfCapped ?? true;
  if (![ctcAnnual, basicDaAnnual, ptMonthly].every((v) => isFinite(v) && v >= 0)) return null;
  if (ctcAnnual <= 0 || basicDaAnnual > ctcAnnual) return null;
  const basicMo = basicDaAnnual / 12;
  const pfBase = pfCapped ? Math.min(basicMo, 15000) : basicMo;
  const empPfMo = pfBase * 0.12;
  const grossAnnual = ctcAnnual - empPfMo * 12;
  const ptAnnual = Math.min(ptMonthly * 12, 2500);
  const taxable = Math.max(0, grossAnnual - INDIA_STD_DED);
  const slab = indiaSlabTax(taxable);
  if (slab === null) return null;
  let rebate = 0;
  let pre = slab;
  if (taxable <= INDIA_87A_LIMIT) {
    rebate = Math.min(slab, INDIA_87A_MAX);
    pre = slab - rebate;
  } else {
    pre = Math.min(slab, Math.max(0, taxable - INDIA_87A_LIMIT));
    rebate = slab - pre;
  }
  const cess = pre * INDIA_CESS;
  const annualTax = pre + cess;
  const inHandAnnual = grossAnnual - empPfMo * 12 - ptAnnual - annualTax;
  return { grossAnnual, empPfAnnual: empPfMo * 12, ptAnnual, taxable, slabTax: slab, rebate, cess, annualTax, inHandMonthly: inHandAnnual / 12, inHandAnnual };
}

export function fdMaturity(opts: { principal: number; annualRatePct: number; years: number }): { maturity: number; interest: number; effYieldPct: number } | null {
  const { principal, annualRatePct, years } = opts;
  if (![principal, annualRatePct, years].every((v) => isFinite(v))) return null;
  if (principal <= 0 || years <= 0 || annualRatePct < 0 || annualRatePct > 15) return null;
  const r = annualRatePct / 400;
  const maturity = principal * Math.pow(1 + r, 4 * years);
  if (!isFinite(maturity)) return null;
  const interest = maturity - principal;
  const effYieldPct = (Math.pow(maturity / principal, 1 / years) - 1) * 100;
  return { maturity, interest, effYieldPct: isFinite(effYieldPct) ? effYieldPct : 0 };
}

export function ppfMaturity(opts: { yearlyDeposit: number; annualRatePct: number; years: number }): { maturity: number; invested: number; interest: number } | null {
  const { yearlyDeposit, annualRatePct, years } = opts;
  if (![yearlyDeposit, annualRatePct, years].every((v) => isFinite(v))) return null;
  if (yearlyDeposit < 500 || yearlyDeposit > 150000 || annualRatePct < 0 || annualRatePct > 12) return null;
  if (!Number.isInteger(years) || years < 15 || years > 50 || years % 5 !== 0) return null;
  const r = annualRatePct / 100;
  let maturity: number;
  if (Math.abs(r) < EPSILON_RATE) maturity = yearlyDeposit * years;
  else maturity = yearlyDeposit * ((Math.pow(1 + r, years) - 1) / r) * (1 + r);
  if (!isFinite(maturity)) return null;
  const invested = yearlyDeposit * years;
  return { maturity, invested, interest: maturity - invested };
}

export type PayoffDebt = { name: string; balance: number; aprPct: number; minPayment: number };

export function simulatePayoff(debts: PayoffDebt[], extraMonthly: number, strategy: "snowball" | "avalanche"): {
  months: number; totalInterest: number; totalPaid: number; neverPaysOff: boolean; order: string[];
} | null {
  if (!Array.isArray(debts) || debts.length < 1 || !isFinite(extraMonthly) || extraMonthly < 0) return null;
  for (const d of debts) {
    if (!isFinite(d.balance) || !isFinite(d.aprPct) || !isFinite(d.minPayment)) return null;
    if (d.balance <= 0 || d.minPayment <= 0 || d.aprPct < 0 || d.aprPct > 60) return null;
  }
  const order = [...debts].sort((a, b) =>
    strategy === "snowball" ? a.balance - b.balance || b.aprPct - a.aprPct : b.aprPct - a.aprPct || a.balance - b.balance,
  ).map((d) => d.name);
  const bals = new Map(debts.map((d) => [d.name, d.balance]));
  const mins = new Map(debts.map((d) => [d.name, d.minPayment]));
  const pool = [...mins.values()].reduce((s, v) => s + v, 0) + extraMonthly;
  let interest = 0;
  let months = 0;
  for (let m = 1; m <= 600; m++) {
    let monthInterest = 0;
    for (const [name, bal] of bals) {
      if (bal <= 0) continue;
      const d = debts.find((x) => x.name === name)!;
      const i = bal * (d.aprPct / 100 / 12);
      bals.set(name, bal + i);
      monthInterest += i;
    }
    interest += monthInterest;
    let remaining = pool;
    for (const name of order) {
      const bal = bals.get(name)!;
      if (bal <= 0) continue;
      const pay = Math.min(bal, mins.get(name)!, remaining);
      bals.set(name, bal - pay);
      remaining -= pay;
      if (remaining <= 0) break;
    }
    for (const name of order) {
      const bal = bals.get(name)!;
      if (bal <= 0 || remaining <= 0) continue;
      const kill = Math.min(bal, remaining);
      bals.set(name, bal - kill);
      remaining -= kill;
    }
    months = m;
    if ([...bals.values()].every((b) => b <= 0.005)) {
      const principal = debts.reduce((s, d) => s + d.balance, 0);
      return { months, totalInterest: interest, totalPaid: principal + interest, neverPaysOff: false, order };
    }
    if (pool <= monthInterest) {
      const principal = debts.reduce((s, d) => s + d.balance, 0);
      return { months: 600, totalInterest: interest, totalPaid: principal + interest, neverPaysOff: true, order };
    }
  }
  const principal = debts.reduce((s, d) => s + d.balance, 0);
  return { months: 600, totalInterest: interest, totalPaid: principal + interest, neverPaysOff: true, order };
}

export const INDIA_CG = { EQUITY_LTCG: 12.5, EQUITY_STCG: 20, NON_EQUITY_LTCG: 12.5, EQUITY_EXEMPT: 125000, CESS: 4 } as const;

export function calcIndiaCG(opts: {
  asset: "equity" | "property" | "gold"; buyPrice: number; salePrice: number; expenses?: number;
  holdingMonths: number; slabRatePct?: number; equityExemptionUsed?: number;
}): { gain: number; isLongTerm: boolean; ratePct: number; taxableGain: number; baseTax: number; cess: number; totalTax: number; netProceeds: number } | null {
  const { asset, buyPrice, salePrice, holdingMonths } = opts;
  const expenses = opts.expenses ?? 0;
  const slab = opts.slabRatePct ?? 30;
  const used = opts.equityExemptionUsed ?? 0;
  if (![buyPrice, salePrice, expenses, holdingMonths, slab, used].every((v) => isFinite(v))) return null;
  if (buyPrice <= 0 || salePrice < 0 || expenses < 0 || holdingMonths < 0) return null;
  const gain = salePrice - buyPrice - expenses;
  if (gain <= 0) return { gain, isLongTerm: asset === "equity" ? holdingMonths > 12 : holdingMonths > 24, ratePct: 0, taxableGain: 0, baseTax: 0, cess: 0, totalTax: 0, netProceeds: salePrice - expenses };
  const isLongTerm = asset === "equity" ? holdingMonths > 12 : holdingMonths > 24;
  let ratePct: number;
  let taxableGain: number;
  if (asset === "equity" && isLongTerm) {
    ratePct = INDIA_CG.EQUITY_LTCG;
    taxableGain = Math.max(0, gain - Math.max(0, INDIA_CG.EQUITY_EXEMPT - used));
  } else if (asset === "equity") {
    ratePct = INDIA_CG.EQUITY_STCG;
    taxableGain = gain;
  } else if (isLongTerm) {
    ratePct = INDIA_CG.NON_EQUITY_LTCG;
    taxableGain = gain;
  } else {
    ratePct = slab;
    taxableGain = gain;
  }
  const baseTax = (taxableGain * ratePct) / 100;
  const cess = (baseTax * INDIA_CG.CESS) / 100;
  const totalTax = baseTax + cess;
  return { gain, isLongTerm, ratePct, taxableGain, baseTax, cess, totalTax, netProceeds: salePrice - expenses - totalTax };
}

// GPT/cl100k approximation: ~4 chars per token for English prose, code-weighted.
export function estimateTokens(text: string): { chars: number; words: number; tokens: number } {
  const chars = [...text].length;
  const words = (text.match(/\S+/g) || []).length;
  if (!text.trim()) return { chars, words: 0, tokens: 0 };
  const codeBoost = /[{}\[\]();=<>:/\\]{3,}|function |const |import |def |class /.test(text) ? 1.15 : 1;
  const tokens = Math.ceil((chars / 4) * codeBoost);
  return { chars, words, tokens };
}

export function estimateAiCost(tokens: number, pricePerMillion: number): number | null {
  if (!isFinite(tokens) || !isFinite(pricePerMillion) || tokens < 0 || pricePerMillion < 0) return null;
  const cost = (tokens / 1_000_000) * pricePerMillion;
  return isFinite(cost) ? cost : null;
}

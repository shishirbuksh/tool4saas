
import { useMemo, useState } from "react";
import ToolPaper from "@/components/ToolPaper";
import NumericField from "@/components/NumericField";import { Box, Typography, Stack, Alert, Grid, Select, MenuItem, FormControl, InputLabel } from "@/components/ds";

import { money } from "@/lib/format";

const num = (v: string) => {
  const n = parseFloat(v);
  return isFinite(n) && n >= 0 ? n : 0;
};

type Filing = "single" | "mfj" | "mfs" | "hoh";

const FILING_LABELS: Array<{ value: Filing; label: string }> = [
  { value: "single", label: "Single" },
  { value: "mfj", label: "Married filing jointly (MFJ)" },
  { value: "mfs", label: "Married filing separately (MFS)" },
  { value: "hoh", label: "Head of household (HoH)" },
];

const FREQUENCIES = [
  { value: "52", label: "Weekly (52)" },
  { value: "26", label: "Bi-weekly (26)" },
  { value: "24", label: "Semi-monthly (24)" },
  { value: "12", label: "Monthly (12)" },
];

const STATE_PRESETS = [
  { value: "TX", label: "Texas — TX (0%)", rate: 0 },
  { value: "FL", label: "Florida — FL (0%)", rate: 0 },
  { value: "WA", label: "Washington — WA (0%)", rate: 0 },
  { value: "CA", label: "California — CA (9.3%)", rate: 9.3 },
  { value: "NY", label: "New York — NY (6.85%)", rate: 6.85 },
  { value: "Custom", label: "Custom", rate: null as number | null },
] as const;

type StatePreset = (typeof STATE_PRESETS)[number]["value"];

const STD_DED: Record<Filing, number> = {
  single: 16100,
  mfj: 32200,
  hoh: 24150,
  mfs: 16100,
};

// 2026 federal brackets (IRS Rev Proc 2025-32): [upper bound, rate].
const SINGLE_BRACKETS: Array<[number, number]> = [
  [12400, 0.1],
  [50400, 0.12],
  [105700, 0.22],
  [201775, 0.24],
  [256225, 0.32],
  [640600, 0.35],
];
const MFJ_BRACKETS: Array<[number, number]> = [
  [24800, 0.1],
  [100800, 0.12],
  [211400, 0.22],
  [403550, 0.24],
  [512450, 0.32],
  [768700, 0.35],
];
const HOH_BRACKETS: Array<[number, number]> = [
  [17700, 0.1],
  [67450, 0.12],
  [105700, 0.22],
  [201750, 0.24],
  [256200, 0.32],
  [640600, 0.35],
];
const MFS_BRACKETS: Array<[number, number]> = MFJ_BRACKETS.map(([cap, rate]) => [cap / 2, rate]);

const TOP_RATE = 0.37;
const SS_RATE = 0.062;
const SS_WAGE_BASE = 184500;
const MEDICARE_RATE = 0.0145;

function bracketTax(taxable: number, brackets: Array<[number, number]>): number {
  let tax = 0;
  let prev = 0;
  for (const [cap, rate] of brackets) {
    if (taxable <= prev) break;
    tax += (Math.min(taxable, cap) - prev) * rate;
    prev = cap;
  }
  if (taxable > prev) tax += (taxable - prev) * TOP_RATE;
  return tax;
}

export default function UsPaycheckTool() {
  const [grossAnnual, setGrossAnnual] = useState("85000");
  const [filing, setFiling] = useState<Filing>("single");
  const [frequency, setFrequency] = useState("26");
  const [stateRate, setStateRate] = useState<StatePreset>("TX");
  const [stateCustom, setStateCustom] = useState("");
  const [pretax401k, setPretax401k] = useState("0");

  const result = useMemo(() => {
    const gross = num(grossAnnual);
    const pretax = Math.min(num(pretax401k), gross);
    const stdDed = STD_DED[filing];
    const taxable = Math.max(0, gross - pretax - stdDed);

    const brackets =
      filing === "mfj" ? MFJ_BRACKETS : filing === "hoh" ? HOH_BRACKETS : filing === "mfs" ? MFS_BRACKETS : SINGLE_BRACKETS;
    const usesSingleFallback = false;

    const federal = bracketTax(taxable, brackets);

    const preset = STATE_PRESETS.find((s) => s.value === stateRate);
    const effectiveStateRate = stateRate === "Custom" ? num(stateCustom) : (preset?.rate ?? 0);
    const state = taxable * (effectiveStateRate / 100);

    const ss = Math.min(gross, SS_WAGE_BASE) * SS_RATE;
    const medicare = gross * MEDICARE_RATE;

    const totalTax = federal + state + ss + medicare;
    const annualNet = Math.max(0, gross - pretax - totalTax);
    const freq = parseInt(frequency, 10) || 1;
    return {
      gross,
      pretax,
      stdDed,
      taxable,
      federal,
      state,
      effectiveStateRate,
      ss,
      medicare,
      totalTax,
      annualNet,
      perPaycheck: annualNet / freq,
      grossPerPaycheck: gross / freq,
      freq,
      usesSingleFallback,
    };
  }, [grossAnnual, filing, frequency, stateRate, stateCustom, pretax401k]);

  return (
    <ToolPaper>
      <Typography variant="h3" className="text-[20px] font-bold">
        Paycheck details
      </Typography>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <NumericField label="Gross annual salary (USD)" value={grossAnnual} onChange={setGrossAnnual} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <NumericField label="Pre-tax 401(k) / year (USD)" value={pretax401k} onChange={setPretax401k} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <FormControl fullWidth>
            <InputLabel>Filing status</InputLabel>
            <Select
              label="Filing status"
              value={filing}
              onChange={(e) => setFiling(e.target.value as Filing)}
             
              className="min-h-[44px]"
            >
              {FILING_LABELS.map((f) => (
                <MenuItem key={f.value} value={f.value}>
                  {f.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <FormControl fullWidth>
            <InputLabel>Pay frequency</InputLabel>
            <Select
              label="Pay frequency"
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
             
              className="min-h-[44px]"
            >
              {FREQUENCIES.map((f) => (
                <MenuItem key={f.value} value={f.value}>
                  {f.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid size={{ xs: 12, sm: stateRate === "Custom" ? 6 : 12 }}>
          <FormControl fullWidth>
            <InputLabel>State tax</InputLabel>
            <Select
              label="State tax"
              value={stateRate}
              onChange={(e) => setStateRate(e.target.value as StatePreset)}
             
              className="min-h-[44px]"
            >
              {STATE_PRESETS.map((s) => (
                <MenuItem key={s.value} value={s.value}>
                  {s.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        {stateRate === "Custom" && (
          <Grid size={{ xs: 12, sm: 6 }}>
            <NumericField label="Custom state rate (%)" value={stateCustom} onChange={setStateCustom} />
          </Grid>
        )}
      </Grid>


      <Box
        className="p-4 rounded-[16px] border border-primary text-center"
      >
        <Typography variant="overline" color="text.secondary">
          Net per paycheck
        </Typography>
        <Typography variant="h3" className="font-extrabold text-primary">
          {money(result.perPaycheck, "USD")}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {money(result.grossPerPaycheck, "USD")} gross · {result.freq} paychecks/year
        </Typography>
      </Box>

      <Stack spacing={1.5}>
        <Box className="flex justify-between">
          <Typography color="text.secondary">Taxable (gross − 401(k) − std. ded. {money(result.stdDed, "USD")})</Typography>
          <Typography className="font-bold">{money(result.taxable, "USD")}</Typography>
        </Box>
        <Box className="flex justify-between">
          <Typography color="text.secondary">Federal (simplified 2026)</Typography>
          <Typography className="font-bold">{money(result.federal, "USD")}</Typography>
        </Box>
        <Box className="flex justify-between">
          <Typography color="text.secondary">State ({result.effectiveStateRate}%)</Typography>
          <Typography className="font-bold">{money(result.state, "USD")}</Typography>
        </Box>
        <Box className="flex justify-between">
          <Typography color="text.secondary">Social Security (6.2% to {money(SS_WAGE_BASE, "USD")})</Typography>
          <Typography className="font-bold">{money(result.ss, "USD")}</Typography>
        </Box>
        <Box className="flex justify-between">
          <Typography color="text.secondary">Medicare (1.45%)</Typography>
          <Typography className="font-bold">{money(result.medicare, "USD")}</Typography>
        </Box>
        <Box className="flex justify-between">
          <Typography color="text.secondary">Annual net</Typography>
          <Typography className="font-bold">{money(result.annualNet, "USD")}</Typography>
        </Box>
      </Stack>

      {result.usesSingleFallback && (
        <Alert severity="info">
          Note: MFS / Head of household use the single-bracket schedule in this simplified model.
        </Alert>
      )}
      <Alert severity="warning">Simplified estimate, not tax advice. Verify with IRS tables or a CPA.</Alert>
    </ToolPaper>
  );
}

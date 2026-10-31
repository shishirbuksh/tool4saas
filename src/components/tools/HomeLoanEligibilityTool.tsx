
import { useMemo, useState } from "react";import { Box, Typography, Stack, Alert, Select, MenuItem, FormControl, InputLabel } from "@/components/ds";

import { money } from "@/lib/format";
import { homeLoanEligibility } from "@/lib/finance-calc";
import ToolPaper from "@/components/ToolPaper";
import NumericField from "@/components/NumericField";

const FOIR_OPTIONS = [0.4, 0.45, 0.5] as const;
const MULTIPLIER_OPTIONS = [48, 55, 60] as const;

export default function HomeLoanEligibilityTool() {
  const [netMonthly, setNetMonthly] = useState("");
  const [existingEmi, setExistingEmi] = useState("");
  const [rate, setRate] = useState("8.5");
  const [years, setYears] = useState("20");
  const [foirCap, setFoirCap] = useState<(typeof FOIR_OPTIONS)[number]>(0.45);
  const [multiplier, setMultiplier] = useState<(typeof MULTIPLIER_OPTIONS)[number]>(55);

  const result = useMemo(() => {
    const net = parseFloat(netMonthly);
    const existing = existingEmi.trim() === "" ? 0 : parseFloat(existingEmi);
    const r = parseFloat(rate);
    const y = parseFloat(years);
    if (!isFinite(net) || !isFinite(existing) || !isFinite(r) || !isFinite(y)) return null;
    return homeLoanEligibility({
      netMonthly: net,
      existingEmi: existing,
      annualRatePct: r,
      years: y,
      foirCap,
      multiplierCap: multiplier,
    });
  }, [netMonthly, existingEmi, rate, years, foirCap, multiplier]);

  return (
    <ToolPaper>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <NumericField label="Net monthly income (₹)" value={netMonthly} onChange={setNetMonthly} />
        <NumericField label="Existing EMIs / month (₹)" value={existingEmi} onChange={setExistingEmi} />
      </Stack>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <NumericField label="Interest rate (% p.a.)" value={rate} onChange={setRate} />
        <NumericField label="Tenure (years)" value={years} onChange={setYears} />
      </Stack>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <FormControl fullWidth>
          <InputLabel>FOIR cap</InputLabel>
          <Select
            label="FOIR cap"
            value={foirCap}
            onChange={(e) => setFoirCap(Number(e.target.value) as typeof foirCap)}
           
            className="min-h-[44px]"
          >
            {FOIR_OPTIONS.map((o) => (
              <MenuItem key={o} value={o}>
                {(o * 100).toFixed(o === 0.45 ? 1 : 0)}%
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel>Income multiplier</InputLabel>
          <Select
            label="Income multiplier"
            value={multiplier}
            onChange={(e) => setMultiplier(Number(e.target.value) as typeof multiplier)}
           
            className="min-h-[44px]"
          >
            {MULTIPLIER_OPTIONS.map((o) => (
              <MenuItem key={o} value={o}>
                {o}x
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
      <Box
        className="p-4 rounded-[16px] border border-primary text-center"
      >
        <Typography variant="overline" color="text.secondary">
          Eligible loan amount
        </Typography>
        <Typography variant="h3" className="font-extrabold text-primary">
          {result !== null && isFinite(result.eligible) ? money(result.eligible, "INR") : "—"}
        </Typography>
      </Box>
      <Stack spacing={1.5}>
        <Box className="flex justify-between">
          <Typography color="text.secondary">Available for EMI (FOIR)</Typography>
          <Typography className="font-bold">
            {result !== null && isFinite(result.availEmi) ? money(result.availEmi, "INR") : "—"}
          </Typography>
        </Box>
        <Box className="flex justify-between">
          <Typography color="text.secondary">Max by FOIR</Typography>
          <Typography className="font-bold">
            {result?.maxByFoir != null && isFinite(result.maxByFoir) ? money(result.maxByFoir, "INR") : "—"}
          </Typography>
        </Box>
        <Box className="flex justify-between">
          <Typography color="text.secondary">Max by income multiplier</Typography>
          <Typography className="font-bold">
            {result !== null && isFinite(result.maxByMultiplier) ? money(result.maxByMultiplier, "INR") : "—"}
          </Typography>
        </Box>
      </Stack>
      <Alert severity="info">
        Estimate only — banks apply their own FOIR, multiplier, credit-score and property checks. Not financial
        advice. See /terms
      </Alert>
    </ToolPaper>
  );
}

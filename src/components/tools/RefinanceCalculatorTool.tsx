"use client";

import { useMemo, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import { money, EPSILON_RATE } from "@/lib/format";
import ToolPaper from "@/components/ToolPaper";

function emiFor(principal: number, annualRatePct: number, months: number): number | null {
  if (!isFinite(principal) || !isFinite(annualRatePct) || !isFinite(months)) return null;
  if (principal <= 0 || months <= 0) return null;
  const mr = annualRatePct / 100 / 12;
  if (!isFinite(mr)) return null;
  const emiVal =
    mr === 0 || Math.abs(mr) < EPSILON_RATE
      ? principal / months
      : (principal * mr) / (1 - Math.pow(1 + mr, -months));
  if (!isFinite(emiVal)) return null;
  return emiVal;
}

export default function RefinanceCalculatorTool() {
  const [balance, setBalance] = useState("");
  const [oldRate, setOldRate] = useState("");
  const [newRate, setNewRate] = useState("");
  const [yearsLeft, setYearsLeft] = useState("");
  const [closingCosts, setClosingCosts] = useState("");

  const { oldEmi, newEmi, monthlySaving, oldInterest, newInterest, breakEven } = useMemo(() => {
    const bal = parseFloat(balance);
    const oR = parseFloat(oldRate);
    const nR = parseFloat(newRate);
    const y = parseFloat(yearsLeft);
    const costs = parseFloat(closingCosts) || 0;
    const empty = {
      oldEmi: null as number | null,
      newEmi: null as number | null,
      monthlySaving: null as number | null,
      oldInterest: null as number | null,
      newInterest: null as number | null,
      breakEven: null as number | null,
    };
    if (!isFinite(bal) || !isFinite(oR) || !isFinite(nR) || !isFinite(y)) return empty;
    if (bal <= 0 || y <= 0) return empty;
    if (!isFinite(costs) || costs < 0) return empty;
    const n = y * 12;
    if (!isFinite(n) || n <= 0) return empty;
    const oldEmiVal = emiFor(bal, oR, n);
    const newEmiVal = emiFor(bal, nR, n);
    if (oldEmiVal === null || newEmiVal === null) return empty;
    const saving = oldEmiVal - newEmiVal;
    if (!isFinite(saving)) return empty;
    const oldTot = oldEmiVal * n;
    const newTot = newEmiVal * n;
    if (!isFinite(oldTot) || !isFinite(newTot)) return empty;
    const oldInt = oldTot - bal;
    const newInt = newTot - bal;
    if (!isFinite(oldInt) || !isFinite(newInt)) return empty;
    const be = saving > 0 && costs > 0 ? costs / saving : costs === 0 && saving > 0 ? 0 : null;
    const beVal = be !== null && isFinite(be) ? be : null;
    return {
      oldEmi: oldEmiVal,
      newEmi: newEmiVal,
      monthlySaving: saving,
      oldInterest: oldInt,
      newInterest: newInt,
      breakEven: beVal,
    };
  }, [balance, oldRate, newRate, yearsLeft, closingCosts]);

  const field = (label: string, value: string, set: (v: string) => void) => (
    <TextField
      label={label}
      type="number"
      fullWidth
      value={value}
      onChange={(e) => set(e.target.value)}
      placeholder={`${label}…`}
      slotProps={{
        input: { inputMode: "decimal", spellCheck: false, autoComplete: "off" },
        htmlInput: { min: 0, step: "any" },
      }}
      sx={{ "& .MuiInputBase-root": { minHeight: 44 } }}
    />
  );

  return (
    <ToolPaper>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        {field("Remaining balance", balance, setBalance)}
        {field("Current rate (%)", oldRate, setOldRate)}
        {field("New rate (%)", newRate, setNewRate)}
      </Stack>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        {field("Years left", yearsLeft, setYearsLeft)}
        {field("Closing costs", closingCosts, setClosingCosts)}
      </Stack>
      <Box
        sx={{
          p: 2,
          borderRadius: 2,
          border: "1px solid",
          borderColor: "primary.main",
          textAlign: "center",
        }}
      >
        <Typography variant="overline" color="text.secondary">
          Monthly saving
        </Typography>
        <Typography variant="h3" sx={{ fontWeight: 800, color: "primary.main" }}>
          {monthlySaving !== null && isFinite(monthlySaving) ? money(monthlySaving) : "—"}
        </Typography>
      </Box>
      <Stack spacing={1.5}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography color="text.secondary">Current EMI</Typography>
          <Typography sx={{ fontWeight: 700 }}>
            {oldEmi !== null && isFinite(oldEmi) ? money(oldEmi) : "—"}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography color="text.secondary">New EMI</Typography>
          <Typography sx={{ fontWeight: 700 }}>
            {newEmi !== null && isFinite(newEmi) ? money(newEmi) : "—"}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography color="text.secondary">Current total interest</Typography>
          <Typography sx={{ fontWeight: 700 }}>
            {oldInterest !== null && isFinite(oldInterest) ? money(oldInterest) : "—"}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography color="text.secondary">New total interest</Typography>
          <Typography sx={{ fontWeight: 700 }}>
            {newInterest !== null && isFinite(newInterest) ? money(newInterest) : "—"}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography color="text.secondary">Break-even (months)</Typography>
          <Typography sx={{ fontWeight: 700 }}>
            {breakEven !== null && isFinite(breakEven) ? breakEven.toFixed(1) : "—"}
          </Typography>
        </Box>
      </Stack>
      <Alert severity="info">For informational purposes only — not financial advice. See /terms</Alert>
    </ToolPaper>
  );
}

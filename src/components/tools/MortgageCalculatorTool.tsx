"use client";

import { useMemo, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import { money } from "@/lib/format";
import ToolPaper from "@/components/ToolPaper";

export default function MortgageCalculatorTool() {
  const [loanAmount, setLoanAmount] = useState("");
  const [downPayment, setDownPayment] = useState("");
  const [rate, setRate] = useState("");
  const [years, setYears] = useState("");

  const { emi, total, interest } = useMemo(() => {
    const loan = parseFloat(loanAmount);
    const down = parseFloat(downPayment) || 0;
    const r = parseFloat(rate);
    const y = parseFloat(years);
    if (!isFinite(loan) || !isFinite(r) || !isFinite(y) || loan <= 0 || y <= 0)
      return { emi: null, total: null, interest: null };
    const principal = loan - down;
    if (!isFinite(principal) || principal <= 0)
      return { emi: null, total: null, interest: null };
    const n = y * 12;
    const mr = r / 100 / 12;
    const emiVal = mr === 0 ? principal / n : (principal * mr) / (1 - Math.pow(1 + mr, -n));
    const tot = emiVal * n;
    return { emi: emiVal, total: tot, interest: tot - principal };
  }, [loanAmount, downPayment, rate, years]);

  const field = (label: string, value: string, set: (v: string) => void) => (
    <TextField
      label={label}
      type="number"
      fullWidth
      value={value}
      onChange={(e) => set(e.target.value)}
      slotProps={{ input: { inputMode: "decimal", spellCheck: false, autoComplete: "off" } }}
    />
  );

  return (
    <ToolPaper>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        {field("Loan amount", loanAmount, setLoanAmount)}
        {field("Down payment", downPayment, setDownPayment)}
        {field("Annual rate (%)", rate, setRate)}
        {field("Term (years)", years, setYears)}
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
          Monthly payment (EMI)
        </Typography>
        <Typography variant="h3" sx={{ fontWeight: 800, color: "primary.main" }}>
          {emi !== null ? money(emi) : "—"}
        </Typography>
      </Box>
      <Stack spacing={1.5}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography color="text.secondary">Total paid</Typography>
          <Typography sx={{ fontWeight: 700 }}>{total !== null ? money(total) : "—"}</Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography color="text.secondary">Total interest</Typography>
          <Typography sx={{ fontWeight: 700 }}>{interest !== null ? money(interest) : "—"}</Typography>
        </Box>
      </Stack>
      <Alert severity="info">For informational purposes only — not financial advice. See /terms</Alert>
    </ToolPaper>
  );
}

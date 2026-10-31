
import { useMemo, useState } from "react";import { Box, TextField, Typography, Stack, Link, Alert, Select, MenuItem, FormControl, InputLabel, Button, Table, TableHead, TableBody, TableRow, TableCell, TableContainer } from "@/components/ds";

import { money } from "@/lib/format";
import { calcEmi, amortizationSchedule } from "@/lib/finance-calc";
import ToolPaper from "@/components/ToolPaper";

const CURRENCIES = ["USD", "EUR", "GBP", "INR", "JPY", "CAD", "AUD"] as const;

export default function EmiCalculatorTool() {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [years, setYears] = useState("");
  const [currency, setCurrency] = useState<(typeof CURRENCIES)[number]>("USD");

  const result = useMemo(() => {
    const p = parseFloat(principal);
    const r = parseFloat(rate);
    const y = parseFloat(years);
    if (!isFinite(p) || !isFinite(r) || !isFinite(y)) return null;
    return calcEmi({ principal: p, annualRatePct: r, years: y });
  }, [principal, rate, years]);

  const schedule = useMemo(() => {
    const p = parseFloat(principal);
    const r = parseFloat(rate);
    const y = parseFloat(years);
    if (!isFinite(p) || !isFinite(r) || !isFinite(y)) return [];
    return amortizationSchedule(p, r, y).slice(0, 12);
  }, [principal, rate, years]);

  const handleExportCsv = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate);
    const y = parseFloat(years);
    if (!isFinite(p) || !isFinite(r) || !isFinite(y)) return;
    const rows = amortizationSchedule(p, r, y);
    if (rows.length === 0) return;
    const header = "Month,EMI,Principal,Interest,Balance";
    const lines = rows.map((row) => [row.month, row.emi, row.principal, row.interest, row.balance].join(","));
    const csv = [header, ...lines].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "emi-schedule.csv";
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 5000);
  };

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
      
    />
  );

  return (
    <ToolPaper>
      <FormControl fullWidth>
        <InputLabel>Currency</InputLabel>
        <Select
          label="Currency"
          value={currency}
          onChange={(e) => setCurrency(e.target.value as typeof currency)}
         
          className="min-h-[44px]"
        >
          {CURRENCIES.map((c) => (
            <MenuItem key={c} value={c}>
              {c}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        {field("Principal", principal, setPrincipal)}
        {field("Annual rate (%)", rate, setRate)}
        {field("Term (years)", years, setYears)}
      </Stack>
      <Box
        className="p-4 rounded-[16px] border border-primary text-center"
      >
        <Typography variant="overline" color="text.secondary">
          Monthly payment (EMI)
        </Typography>
        <Typography variant="h3" className="font-extrabold text-primary">
          {result !== null && isFinite(result.emi) ? money(result.emi, currency) : "—"}
        </Typography>
      </Box>
      <Stack spacing={1.5}>
        <Box className="flex justify-between">
          <Typography color="text.secondary">Total paid</Typography>
          <Typography className="font-bold">
            {result !== null && isFinite(result.total) ? money(result.total, currency) : "—"}
          </Typography>
        </Box>
        <Box className="flex justify-between">
          <Typography color="text.secondary">Total interest</Typography>
          <Typography className="font-bold">
            {result !== null && isFinite(result.interest) ? money(result.interest, currency) : "—"}
          </Typography>
        </Box>
        {result !== null && isFinite(result.interest) && (
          <Typography variant="caption" color="text.secondary">
            Tip: Want to cut total interest? Learn how extra payments reduce your loan balance in our{" "}
            <Link href="/blog/mortgage-calculator-guide/mortgage-overpayment-extra-payment" underline="hover" color="primary">
              mortgage overpayment guide
            </Link>.
          </Typography>
        )}
      </Stack>
      {schedule.length > 0 && (
        <Stack spacing={1.5}>
          <Box className="flex justify-between items-center">
            <Typography variant="h6">Amortization (first 12 months)</Typography>
            <Button variant="outlined" onClick={handleExportCsv}>
              Export CSV
            </Button>
          </Box>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Month</TableCell>
                  <TableCell align="right">EMI</TableCell>
                  <TableCell align="right">Principal</TableCell>
                  <TableCell align="right">Interest</TableCell>
                  <TableCell align="right">Balance</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {schedule.map((row) => (
                  <TableRow key={row.month}>
                    <TableCell>{row.month}</TableCell>
                    <TableCell align="right">{money(row.emi, currency)}</TableCell>
                    <TableCell align="right">{money(row.principal, currency)}</TableCell>
                    <TableCell align="right">{money(row.interest, currency)}</TableCell>
                    <TableCell align="right">{money(row.balance, currency)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Stack>
      )}
      <Alert severity="info">For informational purposes only — not financial advice. See /terms</Alert>
    </ToolPaper>
  );
}

"use client";

import { useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { money } from "@/lib/format";
import { ppfMaturity } from "@/lib/finance-calc";
import ToolPaper from "@/components/ToolPaper";
import YMYLDisclaimer from "@/components/YMYLDisclaimer";
import NumericField from "@/components/NumericField";

type ScheduleRow = { year: number; deposit: number; interest: number; balance: number; invested: number };

export default function PpfCalculatorTool() {
  const [yearlyDeposit, setYearlyDeposit] = useState("150000");
  const [rate, setRate] = useState("7.1");
  const [years, setYears] = useState("15");

  const yearsNum = parseFloat(years);
  const yearsValid =
    years.trim() !== "" &&
    Number.isInteger(yearsNum) &&
    yearsNum >= 15 &&
    yearsNum <= 50 &&
    yearsNum % 5 === 0;

  const result = useMemo(() => {
    const dep = parseFloat(yearlyDeposit);
    const r = parseFloat(rate);
    const y = parseFloat(years);
    if (!isFinite(dep) || !isFinite(r) || !isFinite(y)) return null;
    return ppfMaturity({ yearlyDeposit: dep, annualRatePct: r, years: y });
  }, [yearlyDeposit, rate, years]);

  const schedule = useMemo<ScheduleRow[]>(() => {
    if (!result) return [];
    const dep = parseFloat(yearlyDeposit);
    const r = parseFloat(rate) / 100;
    const n = parseInt(years, 10);
    if (!isFinite(dep) || !isFinite(r) || !isFinite(n) || n <= 0 || n > 50) return [];
    const rows: ScheduleRow[] = [];
    let balance = 0;
    for (let y = 1; y <= n; y++) {
      const interest = (balance + dep) * r;
      balance += dep + interest;
      rows.push({ year: y, deposit: dep, interest, balance, invested: dep * y });
    }
    return rows;
  }, [result, yearlyDeposit, rate, years]);

  return (
    <ToolPaper>
      <YMYLDisclaimer type="finance" />
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <NumericField
          label="Yearly deposit (₹)"
          value={yearlyDeposit}
          onChange={setYearlyDeposit}
          error={yearlyDeposit.trim() !== "" && (parseFloat(yearlyDeposit) < 500 || parseFloat(yearlyDeposit) > 150000)}
          helperText="₹500 – ₹1,50,000 per year"
        />
        <NumericField label="Annual rate (%)" value={rate} onChange={setRate} />
        <NumericField
          label="Term (years)"
          value={years}
          onChange={setYears}
          error={years.trim() !== "" && !yearsValid}
          helperText={years.trim() !== "" && !yearsValid ? "15–50 years, in 5-year blocks" : "15–50 years, step 5"}
        />
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
          Maturity value
        </Typography>
        <Typography variant="h3" sx={{ fontWeight: 800, color: "primary.main" }}>
          {result !== null ? money(result.maturity, "INR") : "—"}
        </Typography>
      </Box>
      <Stack spacing={1.5}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography color="text.secondary">Total invested</Typography>
          <Typography sx={{ fontWeight: 700 }}>
            {result !== null ? money(result.invested, "INR") : "—"}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography color="text.secondary">Interest earned</Typography>
          <Typography sx={{ fontWeight: 700 }}>
            {result !== null ? money(result.interest, "INR") : "—"}
          </Typography>
        </Box>
      </Stack>
      {schedule.length > 0 && (
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
            Year-wise balance schedule
          </Typography>
          <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
            <Table size="small" stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Year</TableCell>
                  <TableCell align="right">Deposit</TableCell>
                  <TableCell align="right">Interest</TableCell>
                  <TableCell align="right">Balance</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {schedule.map((row) => (
                  <TableRow key={row.year}>
                    <TableCell>{row.year}</TableCell>
                    <TableCell align="right">{money(row.deposit, "INR")}</TableCell>
                    <TableCell align="right">{money(row.interest, "INR")}</TableCell>
                    <TableCell align="right">{money(row.balance, "INR")}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
      <Alert severity="info">
        Rate disclaimer: 7.1% p.a. is the Q2 FY2026-27 notified PPF rate, compounded annually. The Finance
        Ministry resets small-savings rates every quarter, so future extensions may earn a different rate.
        Projection assumes the deposit is made at the start of each year and ignores loans, withdrawals, and
        tax. For illustration only — not financial advice.
      </Alert>
    </ToolPaper>
  );
}

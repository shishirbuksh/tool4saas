
import { useMemo, useState } from "react";import { Box, Typography, Stack, Alert, Table, TableHead, TableBody, TableRow, TableCell, TableContainer } from "@/components/ds";

import { money } from "@/lib/format";
import { fdMaturity } from "@/lib/finance-calc";
import ToolPaper from "@/components/ToolPaper";
import NumericField from "@/components/NumericField";

export default function FdCalculatorTool() {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [years, setYears] = useState("");

  const result = useMemo(() => {
    const p = parseFloat(principal);
    const r = parseFloat(rate);
    const y = parseFloat(years);
    if (!isFinite(p) || !isFinite(r) || !isFinite(y)) return null;
    return fdMaturity({ principal: p, annualRatePct: r, years: y });
  }, [principal, rate, years]);

  const yearly = useMemo(() => {
    const p = parseFloat(principal);
    const r = parseFloat(rate);
    const y = parseFloat(years);
    if (!isFinite(p) || !isFinite(r) || !isFinite(y)) return [];
    const n = Math.min(Math.floor(y), 30);
    if (n <= 0) return [];
    const rows: Array<{ year: number; maturity: number; interest: number }> = [];
    for (let i = 1; i <= n; i++) {
      const m = fdMaturity({ principal: p, annualRatePct: r, years: i });
      if (!m) break;
      rows.push({ year: i, maturity: m.maturity, interest: m.interest });
    }
    return rows;
  }, [principal, rate, years]);

  return (
    <ToolPaper>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <NumericField label="Principal (₹)" value={principal} onChange={setPrincipal} />
        <NumericField label="Annual rate (% p.a.)" value={rate} onChange={setRate} />
        <NumericField label="Tenure (years)" value={years} onChange={setYears} />
      </Stack>
      <Box
        className="p-4 rounded-[16px] border border-primary text-center"
      >
        <Typography variant="overline" color="text.secondary">
          Maturity value
        </Typography>
        <Typography variant="h3" className="font-extrabold text-primary">
          {result !== null && isFinite(result.maturity) ? money(result.maturity, "INR") : "—"}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Fixed quarterly compounding
        </Typography>
      </Box>
      <Stack spacing={1.5}>
        <Box className="flex justify-between">
          <Typography color="text.secondary">Interest earned</Typography>
          <Typography className="font-bold">
            {result !== null && isFinite(result.interest) ? money(result.interest, "INR") : "—"}
          </Typography>
        </Box>
        <Box className="flex justify-between">
          <Typography color="text.secondary">Effective yield (p.a.)</Typography>
          <Typography className="font-bold">
            {result !== null && isFinite(result.effYieldPct) ? `${result.effYieldPct.toFixed(2)}%` : "—"}
          </Typography>
        </Box>
      </Stack>
      {yearly.length > 0 && (
        <Stack spacing={1}>
          <Typography variant="h6">Year-wise growth</Typography>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Year</TableCell>
                  <TableCell align="right">Value</TableCell>
                  <TableCell align="right">Interest</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {yearly.map((r) => (
                  <TableRow key={r.year}>
                    <TableCell>{r.year}</TableCell>
                    <TableCell align="right">{money(r.maturity, "INR")}</TableCell>
                    <TableCell align="right">{money(r.interest, "INR")}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Typography variant="caption" color="text.secondary">
            Fixed quarterly rests: A = P × (1 + r/400)^(4t). Effective yield exceeds the nominal rate due to
            reinvestment.
          </Typography>
        </Stack>
      )}
      <Alert severity="info">
        Illustration only — pre-TDS maturity; banks deduct TDS above ₹40k yearly interest. Actual payout may vary
        with rounding and payout frequency. See /terms
      </Alert>
    </ToolPaper>
  );
}

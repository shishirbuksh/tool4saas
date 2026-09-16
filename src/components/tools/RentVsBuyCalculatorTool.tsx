"use client";

import { useMemo, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import { money, EPSILON_RATE } from "@/lib/format";
import ToolPaper from "@/components/ToolPaper";
import YMYLDisclaimer from "@/components/YMYLDisclaimer";

export default function RentVsBuyCalculatorTool() {
  const [monthlyRent, setMonthlyRent] = useState("");
  const [homePrice, setHomePrice] = useState("");
  const [down, setDown] = useState("");
  const [rate, setRate] = useState("");
  const [years, setYears] = useState("");
  const [appreciation, setAppreciation] = useState("");

  const result = useMemo(() => {
    const rent = parseFloat(monthlyRent);
    const price = parseFloat(homePrice);
    const downPay = parseFloat(down) || 0;
    const r = parseFloat(rate);
    const y = parseFloat(years);
    const apprec = parseFloat(appreciation) || 0;
    if (!isFinite(rent) || !isFinite(price) || !isFinite(r) || !isFinite(y)) return null;
    if (rent <= 0 || price <= 0 || y <= 0) return null;
    if (!isFinite(downPay) || downPay < 0 || downPay >= price) return null;
    if (!isFinite(apprec)) return null;
    const principal = price - downPay;
    if (!isFinite(principal) || principal <= 0) return null;
    const n = y * 12;
    if (!isFinite(n) || n <= 0) return null;
    const mr = r / 100 / 12;
    if (!isFinite(mr)) return null;
    const emi = mr === 0 || Math.abs(mr) < EPSILON_RATE ? principal / n : (principal * mr) / (1 - Math.pow(1 + mr, -n));
    if (!isFinite(emi)) return null;
    const buyTotal = downPay + emi * n;
    if (!isFinite(buyTotal)) return null;
    const growth = 0.03;
    const rentTotal = rent * 12 * ((Math.pow(1 + growth, y) - 1) / growth);
    if (!isFinite(rentTotal)) return null;
    const homeValue = price * Math.pow(1 + apprec / 100, y);
    if (!isFinite(homeValue)) return null;
    const diff = Math.abs(buyTotal - rentTotal);
    const buyCheaper = buyTotal < rentTotal;
    const verdict = buyCheaper ? "Buying is cheaper" : "Renting is cheaper";

    let breakEven: number | null = null;
    const maxYear = Math.ceil(y);
    for (let k = 1; k <= maxYear; k++) {
      const buyCum = downPay + emi * 12 * k;
      const rentCum = rent * 12 * ((Math.pow(1 + growth, k) - 1) / growth);
      if (!isFinite(buyCum) || !isFinite(rentCum)) break;
      if (buyCum <= rentCum) {
        breakEven = k;
        break;
      }
    }

    return { emi, buyTotal, rentTotal, homeValue, diff, buyCheaper, verdict, breakEven };
  }, [monthlyRent, homePrice, down, rate, years, appreciation]);

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
      <YMYLDisclaimer type="finance" />
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        {field("Monthly rent", monthlyRent, setMonthlyRent)}
        {field("Home price", homePrice, setHomePrice)}
        {field("Down payment", down, setDown)}
      </Stack>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        {field("Mortgage rate (%)", rate, setRate)}
        {field("Horizon (years)", years, setYears)}
        {field("Appreciation (%/yr)", appreciation, setAppreciation)}
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
          Verdict
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: 800, color: "primary.main" }}>
          {result ? result.verdict : "—"}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {result
            ? result.buyCheaper
              ? `Buying saves ${money(result.diff)} over ${years} years`
              : `Renting saves ${money(result.diff)} over ${years} years`
            : "Enter rent, price, rate, and years to compare"}
        </Typography>
      </Box>
      <Stack spacing={1.5}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography color="text.secondary">Buy total (down + EMI × n)</Typography>
          <Typography sx={{ fontWeight: 700 }}>{result ? money(result.buyTotal) : "—"}</Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography color="text.secondary">Rent total (3% yearly hike)</Typography>
          <Typography sx={{ fontWeight: 700 }}>{result ? money(result.rentTotal) : "—"}</Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography color="text.secondary">Monthly EMI</Typography>
          <Typography sx={{ fontWeight: 700 }}>{result ? money(result.emi) : "—"}</Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography color="text.secondary">Projected home value</Typography>
          <Typography sx={{ fontWeight: 700 }}>{result ? money(result.homeValue) : "—"}</Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography color="text.secondary">Break-even</Typography>
          <Typography sx={{ fontWeight: 700 }}>
            {result ? (result.breakEven !== null ? `Year ${result.breakEven}` : `No break-even within ${years} years`) : "—"}
          </Typography>
        </Box>
      </Stack>
      <Alert severity="info">For informational purposes only — not financial advice. See /terms</Alert>
    </ToolPaper>
  );
}

"use client";

import { useMemo, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import { EPSILON_RATE, money } from "@/lib/format";
import ToolPaper from "@/components/ToolPaper";

export default function HomeAffordabilityCalculatorTool() {
  const [annualIncome, setAnnualIncome] = useState("");
  const [monthlyDebts, setMonthlyDebts] = useState("");
  const [downPayment, setDownPayment] = useState("");
  const [rate, setRate] = useState("");
  const [years, setYears] = useState("");

  const { maxHousing, maxTotal, affordable, price } = useMemo(() => {
    const income = parseFloat(annualIncome);
    if (!isFinite(income) || income <= 0)
      return { maxHousing: null, maxTotal: null, affordable: null, price: null };

    const debts = parseFloat(monthlyDebts) || 0;
    const down = parseFloat(downPayment) || 0;
    const monthlyIncome = income / 12;

    const maxHousingVal = monthlyIncome * 0.28;
    const maxTotalVal = monthlyIncome * 0.36 - (isFinite(debts) && debts > 0 ? debts : 0);
    if (!isFinite(maxHousingVal) || !isFinite(maxTotalVal))
      return { maxHousing: null, maxTotal: null, affordable: null, price: null };

    const affordableVal = Math.max(0, Math.min(maxHousingVal, maxTotalVal));
    if (!isFinite(affordableVal))
      return { maxHousing: maxHousingVal, maxTotal: maxTotalVal, affordable: null, price: null };

    const r = parseFloat(rate);
    const y = parseFloat(years);
    if (!isFinite(r) || !isFinite(y) || y <= 0 || r < 0)
      return { maxHousing: maxHousingVal, maxTotal: maxTotalVal, affordable: affordableVal, price: null };

    const n = y * 12;
    if (!isFinite(n) || n <= 0)
      return { maxHousing: maxHousingVal, maxTotal: maxTotalVal, affordable: affordableVal, price: null };

    const mr = r / 100 / 12;
    if (!isFinite(mr))
      return { maxHousing: maxHousingVal, maxTotal: maxTotalVal, affordable: affordableVal, price: null };

    const loan =
      mr === 0 || Math.abs(mr) < EPSILON_RATE
        ? affordableVal * n
        : (affordableVal * (1 - Math.pow(1 + mr, -n))) / mr;
    if (!isFinite(loan))
      return { maxHousing: maxHousingVal, maxTotal: maxTotalVal, affordable: affordableVal, price: null };

    const safeDown = isFinite(down) && down > 0 ? down : 0;
    const priceVal = loan + safeDown;
    if (!isFinite(priceVal))
      return { maxHousing: maxHousingVal, maxTotal: maxTotalVal, affordable: affordableVal, price: null };

    return { maxHousing: maxHousingVal, maxTotal: maxTotalVal, affordable: affordableVal, price: priceVal };
  }, [annualIncome, monthlyDebts, downPayment, rate, years]);

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
        {field("Annual income", annualIncome, setAnnualIncome)}
        {field("Monthly debts", monthlyDebts, setMonthlyDebts)}
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
          Affordable monthly payment (28/36 DTI rule)
        </Typography>
        <Typography variant="h3" sx={{ fontWeight: 800, color: "primary.main" }}>
          {affordable !== null && isFinite(affordable) ? money(affordable) : "—"}
        </Typography>
      </Box>
      <Stack spacing={1.5}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography color="text.secondary">Max housing (28% of income)</Typography>
          <Typography sx={{ fontWeight: 700 }}>
            {maxHousing !== null && isFinite(maxHousing) ? money(maxHousing) : "—"}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography color="text.secondary">Max total debt (36% minus debts)</Typography>
          <Typography sx={{ fontWeight: 700 }}>
            {maxTotal !== null && isFinite(maxTotal) ? money(maxTotal) : "—"}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography color="text.secondary">Estimated home price (EMI inverse)</Typography>
          <Typography sx={{ fontWeight: 700 }}>
            {price !== null && isFinite(price) ? money(price) : "—"}
          </Typography>
        </Box>
      </Stack>
      <Alert severity="info">For informational purposes only — not financial advice. See /terms</Alert>
    </ToolPaper>
  );
}

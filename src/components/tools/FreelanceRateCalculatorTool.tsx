"use client";

import { useMemo, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import { money } from "@/lib/format";
import ToolPaper from "@/components/ToolPaper";

export default function FreelanceRateCalculatorTool() {
  const [annualSalary, setAnnualSalary] = useState("");
  const [billableHours, setBillableHours] = useState("");
  const [expenses, setExpenses] = useState("");
  const [margin, setMargin] = useState("");

  const { hourly, daily, project } = useMemo(() => {
    const salary = parseFloat(annualSalary);
    const hours = parseFloat(billableHours);
    const exp = parseFloat(expenses);
    const mar = parseFloat(margin);

    if (!isFinite(salary) || salary < 0 || !isFinite(hours) || hours <= 0) {
      return {
        hourly: null as number | null,
        daily: null as number | null,
        project: null as number | null,
      };
    }

    const expensesVal = isFinite(exp) && exp >= 0 ? exp : 0;
    const marginVal = isFinite(mar) && mar >= 0 ? mar : 0;

    const hourlyVal = ((salary + expensesVal) * (1 + marginVal / 100)) / hours;

    if (!isFinite(hourlyVal) || hourlyVal < 0) {
      return { hourly: null, daily: null, project: null };
    }

    return {
      hourly: hourlyVal,
      daily: hourlyVal * 8,
      project: hourlyVal * hours,
    };
  }, [annualSalary, billableHours, expenses, margin]);

  const field = (label: string, value: string, set: (v: string) => void, suffix?: string) => (
    <TextField
      label={label}
      type="number"
      fullWidth
      value={value}
      onChange={(e) => set(e.target.value)}
      slotProps={{ input: { inputMode: "decimal", spellCheck: false, autoComplete: "off", endAdornment: suffix } }}
    />
  );

  return (
    <ToolPaper>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        {field("Desired annual salary", annualSalary, setAnnualSalary)}
        {field("Billable hours / year", billableHours, setBillableHours)}
      </Stack>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        {field("Annual expenses", expenses, setExpenses)}
        {field("Profit margin (%)", margin, setMargin, "%")}
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
          Required hourly rate
        </Typography>
        <Typography variant="h3" sx={{ fontWeight: 800, color: "primary.main" }}>
          {hourly !== null ? money(hourly) : "—"}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          (salary + expenses) × (1 + margin / 100) ÷ hours
        </Typography>
      </Box>

      <Stack spacing={1.5}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography color="text.secondary">Daily rate (8h)</Typography>
          <Typography sx={{ fontWeight: 700 }}>{daily !== null ? money(daily) : "—"}</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            p: 1.5,
            borderRadius: 2,
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          <Typography color="text.secondary">Project total (all billable hours)</Typography>
          <Typography sx={{ fontWeight: 800 }}>{project !== null ? money(project) : "—"}</Typography>
        </Box>
      </Stack>

      <Alert severity="warning">
        Disclaimer: This is a simplified estimate for informational purposes only and does not constitute
        financial or business advice. Actual rates may vary due to taxes, benefits, unpaid time, utilization,
        market conditions, and local regulations. Consult a qualified professional for accurate calculations.
      </Alert>
    </ToolPaper>
  );
}

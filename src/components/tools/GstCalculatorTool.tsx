"use client";

import { useMemo, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import { money } from "@/lib/format";
import ToolPaper from "@/components/ToolPaper";
import YMYLDisclaimer from "@/components/YMYLDisclaimer";

const CURRENCIES = ["USD", "EUR", "GBP", "INR", "JPY", "CAD", "AUD"] as const;

export default function GstCalculatorTool() {
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState<(typeof CURRENCIES)[number]>("USD");
  const [rate, setRate] = useState("");
  const [mode, setMode] = useState("exclusive");

  const { gst, net, total } = useMemo(() => {
    const a = parseFloat(amount);
    const r = parseFloat(rate);
    if (!isFinite(a) || a < 0) return { gst: null, net: null, total: null };
    const pct = isFinite(r) ? r : 0;
    if (mode === "exclusive") {
      const g = a * (pct / 100);
      return { gst: g, net: a, total: a + g };
    }
    const t = a;
    const nett = t / (1 + pct / 100);
    return { gst: t - nett, net: nett, total: t };
  }, [amount, rate, mode]);

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
        <YMYLDisclaimer type="finance" />
        <FormControl fullWidth size="small">
          <InputLabel>Currency</InputLabel>
          <Select label="Currency" value={currency} onChange={(e) => setCurrency(e.target.value as typeof currency)}>
            {CURRENCIES.map((c) => (
              <MenuItem key={c} value={c}>
                {c}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          {field("Amount", amount, setAmount, mode === "exclusive" ? "net" : "total")}
          {field("GST / VAT (%)", rate, setRate, "%")}
        </Stack>
        <RadioGroup row value={mode} onChange={(e) => setMode(e.target.value)}>
          <FormControlLabel value="exclusive" control={<Radio />} label="Add tax (exclusive)" />
          <FormControlLabel value="inclusive" control={<Radio />} label="Price includes tax (inclusive)" />
        </RadioGroup>
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
            Tax amount
          </Typography>
          <Typography variant="h3" sx={{ fontWeight: 800, color: "primary.main" }}>
            {gst !== null ? money(gst, currency) : "—"}
          </Typography>
        </Box>
        <Stack spacing={1.5}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography color="text.secondary">Net {mode === "exclusive" ? "price" : "of total"}</Typography>
            <Typography sx={{ fontWeight: 700 }}>{net !== null ? money(net, currency) : "—"}</Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography color="text.secondary">Total</Typography>
            <Typography sx={{ fontWeight: 700 }}>{total !== null ? money(total, currency) : "—"}</Typography>
          </Box>
        </Stack>
    </ToolPaper>
  );
}

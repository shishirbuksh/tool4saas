"use client";

import { useMemo, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Slider from "@mui/material/Slider";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { money } from "@/lib/format";
import ToolPaper from "@/components/ToolPaper";

const CURRENCIES = ["USD", "EUR", "GBP", "INR", "JPY", "CAD", "AUD"] as const;

export default function TipCalculatorTool() {
  const [bill, setBill] = useState("");
  const [tip, setTip] = useState(15);
  const [people, setPeople] = useState("1");
  const [currency, setCurrency] = useState<(typeof CURRENCIES)[number]>("USD");

  const { tipAmount, total, perPerson } = useMemo(() => {
    const b = parseFloat(bill);
    const p = Math.max(1, parseInt(people, 10) || 1);
    if (!isFinite(b) || b < 0) return { tipAmount: 0, total: 0, perPerson: 0 };
    const t = b * (tip / 100);
    const tot = b + t;
    return { tipAmount: t, total: tot, perPerson: tot / p };
  }, [bill, tip, people]);

  return (
    <ToolPaper>
        <FormControl fullWidth>
          <InputLabel>Currency</InputLabel>
          <Select
            label="Currency"
            value={currency}
            onChange={(e) => setCurrency(e.target.value as typeof currency)}
            MenuProps={{ slotProps: { paper: { sx: { bgcolor: "background.paper", color: "text.primary" } } } }}
            sx={{ minHeight: 44 }}
          >
            {CURRENCIES.map((c) => (
              <MenuItem key={c} value={c}>
                {c}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Bill amount"
          type="number"
          fullWidth
          value={bill}
          onChange={(e) => setBill(e.target.value)}
          placeholder="e.g. 50…"
          slotProps={{
            input: { inputMode: "decimal", spellCheck: false, autoComplete: "off", startAdornment: currency === "USD" ? "$" : currency },
            htmlInput: { min: 0, step: "any" },
          }}
          sx={{ "& .MuiInputBase-root": { minHeight: 44 } }}
        />
        <Box>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.5 }}>
            Tip: {tip}%
          </Typography>
          <Slider
            value={tip}
            onChange={(_, v) => setTip(Array.isArray(v) ? v[0] : v)}
            min={0}
            max={30}
            step={1}
            valueLabelDisplay="auto"
            aria-label="Tip percentage"
            marks={[
              { value: 0, label: "0%" },
              { value: 15, label: "15%" },
              { value: 30, label: "30%" },
            ]}
          />
        </Box>
        <TextField
          label="Number of people"
          type="number"
          fullWidth
          value={people}
          onChange={(e) => setPeople(e.target.value)}
          placeholder="e.g. 2…"
          slotProps={{
            input: { inputMode: "numeric", spellCheck: false, autoComplete: "off" },
            htmlInput: { min: 1, step: 1 },
          }}
          sx={{ "& .MuiInputBase-root": { minHeight: 44 } }}
        />
        <Stack spacing={1.5} sx={{ mt: 1 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography color="text.secondary">Tip amount</Typography>
            <Typography sx={{ fontWeight: 700 }}>{money(tipAmount, currency)}</Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography color="text.secondary">Total</Typography>
            <Typography sx={{ fontWeight: 700 }}>{money(total, currency)}</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              p: 1.5,
              borderRadius: 2,
              border: "1px solid",
              borderColor: "primary.main",
            }}
          >
            <Typography color="text.secondary">Per person</Typography>
            <Typography sx={{ fontWeight: 800, color: "primary.main" }}>{money(perPerson, currency)}</Typography>
           </Box>
         </Stack>
    </ToolPaper>
  );
}

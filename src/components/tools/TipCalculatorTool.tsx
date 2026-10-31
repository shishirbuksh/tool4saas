
import { useMemo, useState } from "react";import { Box, TextField, Typography, Stack, Slider, Select, MenuItem, FormControl, InputLabel } from "@/components/ds";

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
           
            className="min-h-[44px]"
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
          
        />
        <Box>
          <Typography variant="subtitle2" className="font-bold mb-1">
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
          
        />
        <Stack spacing={1.5} className="mt-2">
          <Box className="flex justify-between">
            <Typography color="text.secondary">Tip amount</Typography>
            <Typography className="font-bold">{money(tipAmount, currency)}</Typography>
          </Box>
          <Box className="flex justify-between">
            <Typography color="text.secondary">Total</Typography>
            <Typography className="font-bold">{money(total, currency)}</Typography>
          </Box>
          <Box
            className="flex justify-between p-3 rounded-[16px] border border-primary"
          >
            <Typography color="text.secondary">Per person</Typography>
            <Typography className="font-extrabold text-primary">{money(perPerson, currency)}</Typography>
           </Box>
         </Stack>
    </ToolPaper>
  );
}

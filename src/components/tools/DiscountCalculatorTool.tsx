"use client";

import { useMemo, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { money } from "@/lib/format";
import ToolPaper from "@/components/ToolPaper";

export default function DiscountCalculatorTool() {
  const [price, setPrice] = useState("");
  const [percent, setPercent] = useState("");
  const [tax, setTax] = useState("");

  const { saved, final, withTax } = useMemo(() => {
    const p = parseFloat(price);
    const d = Math.abs(parseFloat(percent));
    const t = Math.abs(parseFloat(tax));
    if (!isFinite(p) || p < 0) return { saved: null, final: null, withTax: null };
    const disc = isFinite(d) ? d : 0;
    const save = p * (disc / 100);
    const fin = p - save;
    const wt = isFinite(t) ? fin * (1 + t / 100) : null;
    return { saved: save, final: fin, withTax: wt };
  }, [price, percent, tax]);

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
          {field("Original price", price, setPrice)}
          {field("Discount (%)", percent, setPercent, "%")}
          {field("Tax (%)", tax, setTax, "%")}
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
            Final price
          </Typography>
          <Typography variant="h3" sx={{ fontWeight: 800, color: "primary.main" }}>
            {final !== null ? money(final) : "—"}
          </Typography>
        </Box>
        <Stack spacing={1.5}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography color="text.secondary">You save</Typography>
            <Typography sx={{ fontWeight: 700 }}>{saved !== null ? money(saved) : "—"}</Typography>
          </Box>
          {withTax !== null && (
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography color="text.secondary">With tax</Typography>
              <Typography sx={{ fontWeight: 700 }}>{money(withTax)}</Typography>
            </Box>
          )}
        </Stack>
    </ToolPaper>
  );
}

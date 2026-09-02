"use client";

import { useState, useMemo } from "react";
import ToolPaper from "@/components/ToolPaper";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";

const UNITS = ["B", "KB", "MB", "GB", "TB"] as const;
type Unit = (typeof UNITS)[number];

const UNIT_EXP: Record<Unit, number> = {
  B: 0,
  KB: 1,
  MB: 2,
  GB: 3,
  TB: 4,
};

export default function FileSizeConverterTool() {
  const [value, setValue] = useState("1");
  const [from, setFrom] = useState<Unit>("MB");
  const [to, setTo] = useState<Unit>("KB");
  const [binary, setBinary] = useState(true);

  const base = binary ? 1024 : 1000;

  const result = useMemo(() => {
    const n = parseFloat(value);
    if (value.trim() === "" || isNaN(n)) return "";
    const bytes = n * Math.pow(base, UNIT_EXP[from]);
    const out = bytes / Math.pow(base, UNIT_EXP[to]);
    if (!isFinite(out)) return "∞";
    // Use locale string with up to 6 fraction digits, avoid scientific for small numbers
    return out.toLocaleString(undefined, { maximumFractionDigits: 6 });
  }, [value, from, to, base]);

  const bytesPreview = useMemo(() => {
    const n = parseFloat(value);
    if (value.trim() === "" || isNaN(n)) return "";
    const bytes = n * Math.pow(base, UNIT_EXP[from]);
    if (!isFinite(bytes)) return "∞";
    return bytes.toLocaleString(undefined, { maximumFractionDigits: 2 });
  }, [value, from, base]);

  return (
    <ToolPaper>
      <TextField
        label="Value"
        type="number"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        fullWidth
        slotProps={{ input: { inputMode: "decimal", spellCheck: false, autoComplete: "off" } }}
      />

      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <FormControl fullWidth>
          <InputLabel>From</InputLabel>
          <Select label="From" value={from} onChange={(e) => setFrom(e.target.value as Unit)}>
            {UNITS.map((u) => (
              <MenuItem key={u} value={u}>
                {u}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>To</InputLabel>
          <Select label="To" value={to} onChange={(e) => setTo(e.target.value as Unit)}>
            {UNITS.map((u) => (
              <MenuItem key={u} value={u}>
                {u}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>

      <Stack direction="row" spacing={2} sx={{ alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" }}>
        <FormControlLabel
          control={<Switch checked={binary} onChange={(e) => setBinary(e.target.checked)} />}
          label={binary ? "Binary (1024)" : "Decimal (1000)"}
        />
        <Typography variant="caption" color="text.secondary">
          {binary ? "1 KB = 1024 B" : "1 KB = 1000 B"} · base {base}
        </Typography>
      </Stack>

      <Box sx={{ p: 2, bgcolor: "primary.main", color: "primary.contrastText", borderRadius: 2 }}>
        <Typography variant="caption" sx={{ opacity: 0.9 }}>
          Result
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: 800, wordBreak: "break-all" }}>
          {result ? `${result} ${to}` : "—"}
        </Typography>
        {bytesPreview && (
          <Typography variant="body2" sx={{ opacity: 0.85, mt: 0.5, fontFamily: "monospace" }}>
            {bytesPreview} B · {value} {from} = bytes ({value} × {base}^{UNIT_EXP[from]})
          </Typography>
        )}
      </Box>

      <Typography variant="caption" color="text.secondary">
        Formula: bytes = value × {base}
        <Box component="span" sx={{ verticalAlign: "super", fontSize: "0.7em" }}>
          {UNIT_EXP[from]}
        </Box>{" "}
        (from), result = bytes ÷ {base}
        <Box component="span" sx={{ verticalAlign: "super", fontSize: "0.7em" }}>
          {UNIT_EXP[to]}
        </Box>{" "}
        (to)
      </Typography>
    </ToolPaper>
  );
}


import { useState, useMemo } from "react";
import ToolPaper from "@/components/ToolPaper";import { Box, TextField, Typography, Stack, Select, MenuItem, FormControl, InputLabel, Switch, FormControlLabel } from "@/components/ds";


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

      <Stack direction="row" spacing={2} className="items-center justify-between flex-wrap">
        <FormControlLabel
          control={<Switch checked={binary} onChange={(e) => setBinary(e.target.checked)} />}
          label={binary ? "Binary (1024)" : "Decimal (1000)"}
        />
        <Typography variant="caption" color="text.secondary">
          {binary ? "1 KB = 1024 B" : "1 KB = 1000 B"} · base {base}
        </Typography>
      </Stack>

      <Box className="p-4 bg-primary rounded-[16px]" style={{ color: "var(--color-primary-content)" }}>
        <Typography variant="caption" className="opacity-[0.9]">
          Result
        </Typography>
        <Typography variant="h4" className="font-extrabold break-all">
          {result ? `${result} ${to}` : "—"}
        </Typography>
        {bytesPreview && (
          <Typography variant="body2" className="opacity-[0.85] mt-1" style={{ fontFamily: "monospace" }}>
            {bytesPreview} B · {value} {from} = bytes ({value} × {base}^{UNIT_EXP[from]})
          </Typography>
        )}
      </Box>

      <Typography variant="caption" color="text.secondary">
        Formula: bytes = value × {base}
        <Box component="span" className="text-[0.7em]" style={{ verticalAlign: "super" }}>
          {UNIT_EXP[from]}
        </Box>{" "}
        (from), result = bytes ÷ {base}
        <Box component="span" className="text-[0.7em]" style={{ verticalAlign: "super" }}>
          {UNIT_EXP[to]}
        </Box>{" "}
        (to)
      </Typography>
    </ToolPaper>
  );
}

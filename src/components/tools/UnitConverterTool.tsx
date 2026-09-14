"use client";

import { useMemo, useState } from "react";
import ToolPaper from "@/components/ToolPaper";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import { KG_PER_LB, METERS_PER_INCH, fmtNumber } from "@/lib/format";

type Cat = {
  label: string;
  units: Record<string, number>;
};

const CATEGORIES: Record<string, Cat> = {
  length: {
    label: "Length",
    units: { mm: 0.001, cm: 0.01, m: 1, km: 1000, in: METERS_PER_INCH, ft: 0.3048, yd: 0.9144, mi: 1609.344 },
  },
  weight: {
    label: "Weight",
    units: { mg: 1e-6, g: 0.001, kg: 1, oz: 0.0283495, lb: KG_PER_LB, t: 1000 },
  },
  time: {
    label: "Time",
    units: { ms: 0.001, s: 1, min: 60, h: 3600, day: 86400, week: 604800 },
  },
  data: {
    label: "Data",
    units: { B: 1, KB: 1024, MB: 1024 ** 2, GB: 1024 ** 3, TB: 1024 ** 4 },
  },
  temperature: {
    label: "Temperature",
    units: { C: 1, F: 1, K: 1 },
  },
};

function toC(v: number, u: string) {
  if (u === "C") return v;
  if (u === "F") return ((v - 32) * 5) / 9;
  return v - 273.15;
}
function fromC(v: number, u: string) {
  if (u === "C") return v;
  if (u === "F") return (v * 9) / 5 + 32;
  return v + 273.15;
}

export default function UnitConverterTool() {
  const [cat, setCat] = useState("length");
  const [value, setValue] = useState("1");
  const [from, setFrom] = useState("m");
  const [to, setTo] = useState("ft");

  const units = CATEGORIES[cat].units;
  const result = useMemo(() => {
    const n = parseFloat(value);
    if (isNaN(n)) return "";
    if (cat === "temperature") return "";
    const base = n * units[from];
    const out = base / units[to];
    return fmtNumber(out, { maximumFractionDigits: 6 });
  }, [value, from, to, cat, units]);

  const tempResult = useMemo(() => {
    if (cat !== "temperature") return "";
    const n = parseFloat(value);
    if (isNaN(n)) return "";
    return fmtNumber(fromC(toC(n, from), to), { maximumFractionDigits: 4 });
  }, [value, from, to, cat]);

  const swap = () => {
    setFrom(to);
    setTo(from);
  };

  // ensure temperature handled: if category temp, use temp units
  const unitKeys = Object.keys(units);

  return (
    <ToolPaper>
        <FormControl fullWidth>
          <InputLabel>Category</InputLabel>
          <Select label="Category" value={cat} onChange={(e) => {
            const c = e.target.value;
            setCat(c);
            const ks = Object.keys(CATEGORIES[c].units);
            setFrom(ks[0]);
            setTo(ks[1] ?? ks[0]);
          }}>
            {Object.entries(CATEGORIES).map(([k, v]) => (
              <MenuItem key={k} value={k}>{v.label}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField label="Value" type="number" value={value} onChange={(e) => setValue(e.target.value)} fullWidth slotProps={{ input: { inputMode: "decimal", spellCheck: false, autoComplete: "off" } }} />

        <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ alignItems: "center" }}>
          <FormControl fullWidth>
            <InputLabel>From</InputLabel>
            <Select label="From" value={from} onChange={(e) => setFrom(e.target.value)}>
              {unitKeys.map((u) => (
                <MenuItem key={u} value={u}>{u}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button onClick={swap} aria-label="swap" sx={{ minWidth: 0 }}><SwapVertIcon /></Button>
          <FormControl fullWidth>
            <InputLabel>To</InputLabel>
            <Select label="To" value={to} onChange={(e) => setTo(e.target.value)}>
              {unitKeys.map((u) => (
                <MenuItem key={u} value={u}>{u}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>

        <Box sx={{ p: 2, bgcolor: "primary.main", color: "primary.contrastText", borderRadius: 2 }}>
          <Typography variant="caption">Result</Typography>
          <Typography  variant="h4"  sx={{ fontWeight: 800 }}>
            {cat === "temperature" ? tempResult || "—" : result || "—"}
          </Typography>
        </Box>
      </ToolPaper>
  );
}

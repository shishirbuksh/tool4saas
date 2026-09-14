"use client";

import { useMemo, useState } from "react";
import ToolPaper from "@/components/ToolPaper";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { fmtNumber } from "@/lib/format";

type Shape = "slab" | "footing" | "column";
type Unit = "ft" | "m" | "in";

const FT_PER_UNIT: Record<Unit, number> = {
  ft: 1,
  m: 3.28084,
  in: 1 / 12,
};

const CU_FT_PER_80LB_BAG = 0.6;

export default function ConcreteCalculatorTool() {
  const [shape, setShape] = useState<Shape>("slab");
  const [unit, setUnit] = useState<Unit>("ft");
  const [length, setLength] = useState("10");
  const [width, setWidth] = useState("10");
  const [depth, setDepth] = useState("0.5");

  const result = useMemo(() => {
    const factor = FT_PER_UNIT[unit];
    if (shape === "column") {
      const diameterFt = parseFloat(length) * factor;
      const heightFt = parseFloat(depth) * factor;
      if (!isFinite(diameterFt) || !isFinite(heightFt) || diameterFt <= 0 || heightFt <= 0) {
        return null;
      }
      const cuFt = Math.PI * (diameterFt / 2) ** 2 * heightFt;
      const cuYd = cuFt / 27;
      const bags = Math.ceil(cuFt / CU_FT_PER_80LB_BAG);
      return { cuFt, cuYd, bags };
    }
    const lFt = parseFloat(length) * factor;
    const wFt = parseFloat(width) * factor;
    const dFt = parseFloat(depth) * factor;
    if (!isFinite(lFt) || !isFinite(wFt) || !isFinite(dFt) || lFt <= 0 || wFt <= 0 || dFt <= 0) {
      return null;
    }
    const cuFt = lFt * wFt * dFt;
    const cuYd = cuFt / 27;
    const bags = Math.ceil(cuFt / CU_FT_PER_80LB_BAG);
    return { cuFt, cuYd, bags };
  }, [length, width, depth, unit, shape]);

  const isColumn = shape === "column";

  return (
    <ToolPaper>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <FormControl fullWidth>
          <InputLabel>Shape</InputLabel>
          <Select label="Shape" value={shape} onChange={(e) => setShape(e.target.value as Shape)}>
            <MenuItem value="slab">Slab (l × w × d)</MenuItem>
            <MenuItem value="footing">Footing (l × w × d)</MenuItem>
            <MenuItem value="column">Column (π × r² × h)</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel>Unit</InputLabel>
          <Select label="Unit" value={unit} onChange={(e) => setUnit(e.target.value as Unit)}>
            <MenuItem value="ft">Feet (ft)</MenuItem>
            <MenuItem value="m">Meters (m)</MenuItem>
            <MenuItem value="in">Inches (in)</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      {isColumn ? (
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <TextField
            label={`Diameter (${unit})`}
            type="number"
            value={length}
            onChange={(e) => setLength(e.target.value)}
            fullWidth
            placeholder="e.g. 2…"
            slotProps={{
              input: { inputMode: "decimal", spellCheck: false, autoComplete: "off" },
              htmlInput: { min: 0, step: "any" },
            }}
          />
          <TextField
            label={`Height (${unit})`}
            type="number"
            value={depth}
            onChange={(e) => setDepth(e.target.value)}
            fullWidth
            placeholder="e.g. 8…"
            slotProps={{
              input: { inputMode: "decimal", spellCheck: false, autoComplete: "off" },
              htmlInput: { min: 0, step: "any" },
            }}
          />
        </Stack>
      ) : (
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <TextField
            label={`Length (${unit})`}
            type="number"
            value={length}
            onChange={(e) => setLength(e.target.value)}
            fullWidth
            placeholder="e.g. 10…"
            slotProps={{
              input: { inputMode: "decimal", spellCheck: false, autoComplete: "off" },
              htmlInput: { min: 0, step: "any" },
            }}
          />
          <TextField
            label={`Width (${unit})`}
            type="number"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
            fullWidth
            placeholder="e.g. 10…"
            slotProps={{
              input: { inputMode: "decimal", spellCheck: false, autoComplete: "off" },
              htmlInput: { min: 0, step: "any" },
            }}
          />
          <TextField
            label={`Depth (${unit})`}
            type="number"
            value={depth}
            onChange={(e) => setDepth(e.target.value)}
            fullWidth
            placeholder="e.g. 0.5…"
            slotProps={{
              input: { inputMode: "decimal", spellCheck: false, autoComplete: "off" },
              htmlInput: { min: 0, step: "any" },
            }}
          />
        </Stack>
      )}

      <Box sx={{ p: 2, bgcolor: "primary.main", color: "primary.contrastText", borderRadius: 2 }}>
        <Typography variant="caption">Concrete needed</Typography>
        <Typography variant="h4" sx={{ fontWeight: 800 }}>
          {result ? `${fmtNumber(result.cuYd, { maximumFractionDigits: 3 })} cu yd` : "—"}
        </Typography>
        <Typography variant="body2" sx={{ mt: 1, opacity: 0.9 }}>
          {result
            ? `${fmtNumber(result.cuFt, { maximumFractionDigits: 2 })} cu ft • ${fmtNumber(result.bags, { maximumFractionDigits: 0 })} × 80 lb bags (0.6 cu ft each)`
            : "Enter positive dimensions to calculate volume."}
        </Typography>
      </Box>

      <Typography variant="caption" color="text.secondary">
        {isColumn
          ? "Column volume = π × r² × h. Bags are rounded up; add 5–10% extra for waste."
          : "Slab / footing volume = length × width × depth. Bags are rounded up; add 5–10% extra for waste."}
      </Typography>
    </ToolPaper>
  );
}

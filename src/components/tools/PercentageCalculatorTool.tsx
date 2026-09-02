"use client";

import { useState } from "react";
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

type Mode = "of" | "what" | "change";

const fmt = (n: number) => n.toLocaleString(undefined, { maximumFractionDigits: 4 });

export default function PercentageCalculatorTool() {
  const [mode, setMode] = useState<Mode>("of");
  const [x, setX] = useState("25");
  const [y, setY] = useState("200");
  const [result, setResult] = useState("");

  const calc = () => {
    const a = parseFloat(x);
    const b = parseFloat(y);
    if (isNaN(a) || isNaN(b)) {
      setResult("Enter valid numbers.");
      return;
    }
    if (mode === "of") {
      setResult(`${a}% of ${fmt(b)} = ${fmt((a / 100) * b)}`);
    } else if (mode === "what") {
      if (b === 0) return setResult("Cannot divide by zero.");
      setResult(`${fmt(a)} is ${fmt((a / b) * 100)}% of ${fmt(b)}`);
    } else {
      const inc = b * (1 + a / 100);
      const dec = b * (1 - a / 100);
      setResult(`+${a}% → ${fmt(inc)}\n−${a}% → ${fmt(dec)}`);
    }
  };

  return (
    <ToolPaper>
        <FormControl fullWidth>
          <InputLabel>Calculation</InputLabel>
          <Select label="Calculation" value={mode} onChange={(e) => setMode(e.target.value as Mode)}>
            <MenuItem value="of">What is X% of Y?</MenuItem>
            <MenuItem value="what">X is what % of Y?</MenuItem>
            <MenuItem value="change">Increase / decrease Y by X%</MenuItem>
          </Select>
        </FormControl>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <TextField
            label={mode === "what" ? "Part (X)" : mode === "change" ? "Percent (X%)" : "Percent (X%)"}
            type="number"
            value={x}
            onChange={(e) => setX(e.target.value)}
            fullWidth
            slotProps={{ input: { inputMode: "decimal", spellCheck: false, autoComplete: "off" } }}
          />
          <TextField
            label={mode === "change" ? "Base (Y)" : "Whole (Y)"}
            type="number"
            value={y}
            onChange={(e) => setY(e.target.value)}
            fullWidth
            slotProps={{ input: { inputMode: "decimal", spellCheck: false, autoComplete: "off" } }}
          />
        </Stack>
        <Button variant="contained" onClick={calc}>Calculate</Button>
        {result && (
          <Box sx={{ p: 2, bgcolor: "primary.main", color: "primary.contrastText", borderRadius: 2, whiteSpace: "pre-line" }}>
            <Typography  variant="h5"  sx={{ fontWeight: 800 }}>{result}</Typography>
          </Box>
        )}
      </ToolPaper>
  );
}

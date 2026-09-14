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

type Operation = "+" | "-" | "*" | "/";

const fmt = (n: number) => n.toLocaleString(undefined, { maximumFractionDigits: 6 });

function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b !== 0) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a === 0 ? 1 : a;
}

function simplify(num: number, den: number): { num: number; den: number } {
  if (den === 0) return { num, den };
  if (num === 0) return { num: 0, den: 1 };
  if (den < 0) {
    num = -num;
    den = -den;
  }
  const d = gcd(num, den);
  return { num: num / d, den: den / d };
}

export default function FractionCalculatorTool() {
  const [num1, setNum1] = useState("3");
  const [den1, setDen1] = useState("4");
  const [num2, setNum2] = useState("1");
  const [den2, setDen2] = useState("2");
  const [operation, setOperation] = useState<Operation>("+");
  const [result, setResult] = useState("");

  const calc = () => {
    const n1 = parseInt(num1, 10);
    const d1 = parseInt(den1, 10);
    const n2 = parseInt(num2, 10);
    const d2 = parseInt(den2, 10);

    if (
      isNaN(n1) ||
      isNaN(d1) ||
      isNaN(n2) ||
      isNaN(d2) ||
      !Number.isInteger(n1) ||
      !Number.isInteger(d1) ||
      !Number.isInteger(n2) ||
      !Number.isInteger(d2)
    ) {
      setResult("Enter valid integers for all numerators and denominators.");
      return;
    }
    if (d1 === 0 || d2 === 0) {
      setResult("Denominator cannot be zero.");
      return;
    }

    let rNum: number;
    let rDen: number;

    if (operation === "+") {
      rNum = n1 * d2 + n2 * d1;
      rDen = d1 * d2;
    } else if (operation === "-") {
      rNum = n1 * d2 - n2 * d1;
      rDen = d1 * d2;
    } else if (operation === "*") {
      rNum = n1 * n2;
      rDen = d1 * d2;
    } else {
      if (n2 === 0) {
        setResult("Cannot divide by zero fraction.");
        return;
      }
      rNum = n1 * d2;
      rDen = d1 * n2;
    }

    const s = simplify(rNum, rDen);
    const decimal = s.num / s.den;
    const fractionStr = s.den === 1 ? `${s.num}` : `${s.num}/${s.den}`;
    setResult(`${n1}/${d1} ${operation} ${n2}/${d2} = ${fractionStr} = ${fmt(decimal)}`);
  };

  return (
    <ToolPaper>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <TextField
          label="Numerator 1"
          type="number"
          value={num1}
          onChange={(e) => setNum1(e.target.value)}
          fullWidth
          slotProps={{ input: { inputMode: "numeric", spellCheck: false, autoComplete: "off" } }}
        />
        <TextField
          label="Denominator 1"
          type="number"
          value={den1}
          onChange={(e) => setDen1(e.target.value)}
          fullWidth
          slotProps={{ input: { inputMode: "numeric", spellCheck: false, autoComplete: "off" } }}
        />
      </Stack>
      <FormControl fullWidth>
        <InputLabel>Operation</InputLabel>
        <Select
          label="Operation"
          value={operation}
          onChange={(e) => setOperation(e.target.value as Operation)}
        >
          <MenuItem value="+">Add (+)</MenuItem>
          <MenuItem value="-">Subtract (−)</MenuItem>
          <MenuItem value="*">Multiply (×)</MenuItem>
          <MenuItem value="/">Divide (÷)</MenuItem>
        </Select>
      </FormControl>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <TextField
          label="Numerator 2"
          type="number"
          value={num2}
          onChange={(e) => setNum2(e.target.value)}
          fullWidth
          slotProps={{ input: { inputMode: "numeric", spellCheck: false, autoComplete: "off" } }}
        />
        <TextField
          label="Denominator 2"
          type="number"
          value={den2}
          onChange={(e) => setDen2(e.target.value)}
          fullWidth
          slotProps={{ input: { inputMode: "numeric", spellCheck: false, autoComplete: "off" } }}
        />
      </Stack>
      <Button variant="contained" onClick={calc}>
        Calculate
      </Button>
      {result && (
        <Box
          sx={{
            p: 2,
            bgcolor: "primary.main",
            color: "primary.contrastText",
            borderRadius: 2,
            whiteSpace: "pre-line",
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 800 }}>
            {result}
          </Typography>
        </Box>
      )}
    </ToolPaper>
  );
}

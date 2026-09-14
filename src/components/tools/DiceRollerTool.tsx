"use client";

import { useState } from "react";
import ToolPaper from "@/components/ToolPaper";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import { UINT32_MAX_PLUS_ONE } from "@/lib/format";

const rand = (max: number) => {
  const range = UINT32_MAX_PLUS_ONE;
  const limit = Math.floor(range / max) * max;
  const buf = new Uint32Array(1);
  let r: number;
  do {
    crypto.getRandomValues(buf);
    r = buf[0];
  } while (r >= limit);
  return (r % max) + 1;
};

export default function DiceRollerTool() {
  const [count, setCount] = useState("2");
  const [sides, setSides] = useState("6");
  const [results, setResults] = useState<number[]>([]);
  const copy = (v: string) => v && void import("@/lib/clipboard").then(m=>m.copyToClipboard(v));

  const roll = () => {
    const c = Math.max(1, Math.min(20, parseInt(count, 10) || 1));
    const s = Math.max(2, Math.min(100, parseInt(sides, 10) || 6));
    setResults(Array.from({ length: c }, () => rand(s)));
  };

  const total = results.reduce((a, b) => a + b, 0);

  return (
    <ToolPaper>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <TextField
            label="Number of dice"
            type="number"
            value={count}
            onChange={(e) => setCount(e.target.value)}
            slotProps={{ input: { inputMode: "numeric", spellCheck: false, autoComplete: "off" } }}
          />
          <TextField
            label="Sides per die"
            type="number"
            value={sides}
            onChange={(e) => setSides(e.target.value)}
            slotProps={{ input: { inputMode: "numeric", spellCheck: false, autoComplete: "off" } }}
          />
        </Stack>
        <Button variant="contained" onClick={roll}>
          Roll dice
        </Button>
        {results.length > 0 && (
          <Stack spacing={1.5}>
            <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", gap: 1 }}>
              {results.map((r, i) => (
                <Chip key={i} label={r} color="primary" sx={{ fontFamily: "monospace", fontWeight: 700 }} />
              ))}
            </Stack>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography color="text.secondary">Total</Typography>
              <Typography sx={{ fontWeight: 700 }}>{total}</Typography>
            </Box>
            <Button size="small" onClick={() => copy(results.join(", "))}>
              Copy results
            </Button>
          </Stack>
        )}
      </ToolPaper>
  );
}

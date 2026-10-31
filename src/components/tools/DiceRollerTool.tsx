
import { useState } from "react";
import ToolPaper from "@/components/ToolPaper";import { Box, TextField, Button, Typography, Stack, Chip } from "@/components/ds";

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

type RollRecord = { label: string; values: number[]; total: number };

const PRESETS = [
  { label: "d6", count: "1", sides: "6" },
  { label: "d20", count: "1", sides: "20" },
  { label: "2d6", count: "2", sides: "6" },
  { label: "3d6", count: "3", sides: "6" },
] as const;

export default function DiceRollerTool() {
  const [count, setCount] = useState("2");
  const [sides, setSides] = useState("6");
  const [results, setResults] = useState<number[]>([]);
  const [history, setHistory] = useState<RollRecord[]>([]);
  const copy = (v: string) => v && void import("@/lib/clipboard").then(m=>m.copyToClipboard(v));

  const roll = (presetCount?: string, presetSides?: string) => {
    const c = Math.max(1, Math.min(20, parseInt(presetCount ?? count, 10) || 1));
    const s = Math.max(2, Math.min(100, parseInt(presetSides ?? sides, 10) || 6));
    const values = Array.from({ length: c }, () => rand(s));
    setResults(values);
    setHistory((h) =>
      [{ label: `${c}d${s}`, values, total: values.reduce((a, b) => a + b, 0) }, ...h].slice(0, 20)
    );
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
        <Stack direction="row" spacing={1} className="flex-wrap">
          {PRESETS.map((p) => (
            <Button
              key={p.label}
              size="small"
              variant="outlined"
              onClick={() => {
                setCount(p.count);
                setSides(p.sides);
                roll(p.count, p.sides);
              }}
            >
              {p.label}
            </Button>
          ))}
        </Stack>
        <Button variant="contained" onClick={() => roll()}>
          Roll dice
        </Button>
        {results.length > 0 && (
          <Stack spacing={1.5}>
            <Stack direction="row" spacing={1} className="flex-wrap gap-2">
              {results.map((r, i) => (
                <Chip key={i} label={r} color="primary" className="font-bold" style={{ fontFamily: "monospace" }} />
              ))}
            </Stack>
            <Box className="flex justify-between">
              <Typography color="text.secondary">Total</Typography>
              <Typography className="font-bold">{total}</Typography>
            </Box>
            <Button size="small" onClick={() => copy(results.join(", "))}>
              Copy results
            </Button>
          </Stack>
        )}
        {history.length > 1 && (
          <Box className="w-full max-h-[160px] overflow-auto">
            <Typography variant="body2" color="text.secondary" className="mb-1">
              Roll history
            </Typography>
            {history.slice(1).map((h, i) => (
              <Box
                key={i}
                className="flex justify-between px-2 py-1 border-b border-base-300"
              >
                <Typography variant="body2" color="text.secondary">
                  {h.label}: {h.values.join(", ")}
                </Typography>
                <Typography variant="body2" className="font-bold">
                  {h.total}
                </Typography>
              </Box>
            ))}
          </Box>
        )}
      </ToolPaper>
  );
}

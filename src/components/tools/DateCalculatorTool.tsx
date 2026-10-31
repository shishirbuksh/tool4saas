
import { useState } from "react";
import ToolPaper from "@/components/ToolPaper";import { Box, TextField, Typography, Stack, ToggleButton, ToggleButtonGroup } from "@/components/ds";

import { MS_PER_DAY } from "@/lib/format";

const fmt = (d: Date) =>
  new Intl.DateTimeFormat(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(d);

export default function DateCalculatorTool() {
  const [mode, setMode] = useState<"shift" | "diff">("shift");
  const [start, setStart] = useState("");
  const [days, setDays] = useState("7");
  const [sign, setSign] = useState<"+" | "-">("+");
  const [a, setA] = useState("");
  const [b, setB] = useState("");

  const shiftResult = (() => {
    if (!start || !days) return null;
    const d = new Date(start);
    if (isNaN(d.getTime())) return null;
    const n = parseInt(days, 10) || 0;
    d.setDate(d.getDate() + (sign === "-" ? -n : n));
    return d;
  })();

  const diffResult = (() => {
    if (!a || !b) return null;
    const da = new Date(a);
    const db = new Date(b);
    if (isNaN(da.getTime()) || isNaN(db.getTime())) return null;
    return Math.round((db.getTime() - da.getTime()) / MS_PER_DAY);
  })();

  return (
    <ToolPaper>
        <ToggleButtonGroup size="small" value={mode} exclusive onChange={(_, v) => v && setMode(v)}>
          <ToggleButton value="shift">Add / subtract days</ToggleButton>
          <ToggleButton value="diff">Difference</ToggleButton>
        </ToggleButtonGroup>

        {mode === "shift" ? (
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              label="Start date"
              type="date"
              fullWidth
              value={start}
              onChange={(e) => setStart(e.target.value)}
              slotProps={{ input: { spellCheck: false, autoComplete: "off" } }}
            />
            <TextField
              label="Days"
              type="number"
              fullWidth
              value={days}
              onChange={(e) => setDays(e.target.value)}
              slotProps={{
                input: { inputMode: "numeric", spellCheck: false, autoComplete: "off" },
              }}
            />
            <ToggleButtonGroup
              size="small"
              value={sign}
              exclusive
              onChange={(_, v) => v && setSign(v)}
            >
              <ToggleButton value="+">+</ToggleButton>
              <ToggleButton value="-">−</ToggleButton>
            </ToggleButtonGroup>
          </Stack>
        ) : (
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              label="First date"
              type="date"
              fullWidth
              value={a}
              onChange={(e) => setA(e.target.value)}
              slotProps={{ input: { spellCheck: false, autoComplete: "off" } }}
            />
            <TextField
              label="Second date"
              type="date"
              fullWidth
              value={b}
              onChange={(e) => setB(e.target.value)}
              slotProps={{ input: { spellCheck: false, autoComplete: "off" } }}
            />
          </Stack>
        )}

        <Box
          className="p-4 rounded-[16px] border border-base-300 bg-base-100"
        >
          <Typography variant="overline" color="text.secondary">
            {mode === "shift" ? "Resulting date" : "Difference"}
          </Typography>
          <Typography variant="h6" className="font-bold">
            {mode === "shift"
              ? shiftResult
                ? fmt(shiftResult)
                : "Enter a start date and number of days"
              : diffResult !== null
                ? `${diffResult} day${diffResult === 1 ? "" : "s"}`
                : "Pick two dates"}
          </Typography>
        </Box>
      </ToolPaper>
  );
}

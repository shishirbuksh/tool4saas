
import { useMemo, useState } from "react";
import ToolPaper from "@/components/ToolPaper";import { Box, TextField, Typography, Stack } from "@/components/ds";


export default function PercentageDifferenceTool() {
  const [a, setA] = useState("");
  const [b, setB] = useState("");

  const diff = useMemo(() => {
    const x = parseFloat(a);
    const y = parseFloat(b);
    if (!isFinite(x) || !isFinite(y)) return null;
    const avg = (Math.abs(x) + Math.abs(y)) / 2;
    if (avg === 0) return 0;
    return Math.abs(x - y) / avg * 100;
  }, [a, b]);

  return (
    <ToolPaper>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <TextField
            label="Value A"
            type="number"
            fullWidth
            value={a}
            onChange={(e) => setA(e.target.value)}
            slotProps={{ input: { inputMode: "decimal", spellCheck: false, autoComplete: "off" } }}
          />
          <TextField
            label="Value B"
            type="number"
            fullWidth
            value={b}
            onChange={(e) => setB(e.target.value)}
            slotProps={{ input: { inputMode: "decimal", spellCheck: false, autoComplete: "off" } }}
          />
        </Stack>
        <Box
          className="p-4 rounded-[16px] border border-primary text-center"
        >
          <Typography variant="overline" color="text.secondary">
            Difference
          </Typography>
          <Typography variant="h3" className="font-extrabold text-primary">
            {diff !== null ? `${diff.toFixed(2)}%` : "—"}
          </Typography>
        </Box>
        {diff !== null && (
          <Typography variant="body2" color="text.secondary">
            {diff >= 0 ? "Increase" : "Decrease"}
          </Typography>
        )}
      </ToolPaper>
  );
}
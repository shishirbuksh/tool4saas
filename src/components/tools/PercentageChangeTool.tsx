
import { useMemo, useState } from "react";
import ToolPaper from "@/components/ToolPaper";import { Box, TextField, Typography, Stack } from "@/components/ds";


export default function PercentageChangeTool() {
  const [old, setOld] = useState("");
  const [newVal, setNewVal] = useState("");

  const change = useMemo(() => {
    const o = parseFloat(old);
    const n = parseFloat(newVal);
    if (!isFinite(o) || !isFinite(n)) return null;
    if (o === 0) return n === 0 ? 0 : null;
    return ((n - o) / o) * 100;
  }, [old, newVal]);

  return (
    <ToolPaper>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <TextField
            label="Old value"
            type="number"
            fullWidth
            value={old}
            onChange={(e) => setOld(e.target.value)}
            slotProps={{ input: { inputMode: "decimal", spellCheck: false, autoComplete: "off" } }}
          />
          <TextField
            label="New value"
            type="number"
            fullWidth
            value={newVal}
            onChange={(e) => setNewVal(e.target.value)}
            slotProps={{ input: { inputMode: "decimal", spellCheck: false, autoComplete: "off" } }}
          />
        </Stack>
        <Box
          className="p-4 rounded-[16px] border border-primary text-center"
        >
          <Typography variant="overline" color="text.secondary">
            Change
          </Typography>
          <Typography variant="h3" className="font-extrabold text-primary">
            {change !== null ? `${change.toFixed(2)}%` : "—"}
          </Typography>
        </Box>
        {change !== null && (
          <Typography variant="body2" color="text.secondary">
            {change >= 0 ? "Increase" : "Decrease"}
          </Typography>
        )}
      </ToolPaper>
  );
}
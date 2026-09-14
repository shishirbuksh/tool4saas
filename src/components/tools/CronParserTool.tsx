"use client";

import { useMemo, useState, useEffect } from "react";
import ToolPaper from "@/components/ToolPaper";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";

const FIELD_REGEX =
  /^(\*(\/\d+)?|\d+(-\d+)?(\/\d+)?)(,(\*(\/\d+)?|\d+(-\d+)?(\/\d+)?))*$/;

const FIELD_META = [
  { label: "Minute", name: "minute", min: 0, max: 59 },
  { label: "Hour", name: "hour", min: 0, max: 23 },
  { label: "Day of month", name: "day-of-month", min: 1, max: 31 },
  { label: "Month", name: "month", min: 1, max: 12 },
  { label: "Day of week", name: "day-of-week", min: 0, max: 7 },
] as const;

function fieldMatches(value: number, field: string, min: number, max: number): boolean {
  if (field === "*") return true;
  const parts = field.split(",");
  for (const part of parts) {
    if (!part) continue;
    if (part.includes("/")) {
      const [base, stepStr] = part.split("/");
      const step = parseInt(stepStr, 10);
      if (!step || step <= 0 || Number.isNaN(step)) continue;
      if (base === "*") {
        if ((value - min) % step === 0) return true;
      } else if (base.includes("-")) {
        const [sStr, eStr] = base.split("-");
        const s = parseInt(sStr, 10);
        const e = parseInt(eStr, 10);
        if (Number.isNaN(s) || Number.isNaN(e)) continue;
        if (value >= s && value <= e && (value - s) % step === 0) return true;
      } else {
        const start = parseInt(base, 10);
        if (Number.isNaN(start)) continue;
        if (value >= start && value <= max && (value - start) % step === 0) return true;
      }
    } else if (part.includes("-")) {
      const [sStr, eStr] = part.split("-");
      const s = parseInt(sStr, 10);
      const e = parseInt(eStr, 10);
      if (!Number.isNaN(s) && !Number.isNaN(e) && value >= s && value <= e) return true;
    } else if (part === "*") {
      return true;
    } else {
      const n = parseInt(part, 10);
      if (Number.isNaN(n)) continue;
      // day-of-week: 0 and 7 both mean Sunday
      if (min === 0 && max === 7) {
        if (value === n) return true;
        if (n === 7 && value === 0) return true;
        if (n === 0 && value === 7) return true;
      } else {
        if (value === n) return true;
      }
    }
  }
  return false;
}

function isCronMatch(date: Date, fields: string[]): boolean {
  const minute = date.getMinutes();
  const hour = date.getHours();
  const dom = date.getDate();
  const month = date.getMonth() + 1;
  const dow = date.getDay(); // 0-6

  if (!fieldMatches(minute, fields[0], 0, 59)) return false;
  if (!fieldMatches(hour, fields[1], 0, 23)) return false;
  if (!fieldMatches(month, fields[3], 1, 12)) return false;

  const domField = fields[2];
  const dowField = fields[4];
  const domIsStar = domField === "*";
  const dowIsStar = dowField === "*";
  const domMatch = fieldMatches(dom, domField, 1, 31);
  const dowMatch = fieldMatches(dow, dowField, 0, 7);

  let domDowMatch: boolean;
  if (domIsStar && dowIsStar) domDowMatch = true;
  else if (domIsStar) domDowMatch = dowMatch;
  else if (dowIsStar) domDowMatch = domMatch;
  else domDowMatch = domMatch || dowMatch;

  if (!domDowMatch) return false;
  return true;
}

function describeField(field: string, meta: (typeof FIELD_META)[number]): string {
  if (field === "*") return `every ${meta.name}`;
  if (/^\*\/\d+$/.test(field)) {
    const step = field.slice(2);
    return `every ${step} ${meta.name}s`;
  }
  if (/^\d+$/.test(field)) return `${meta.name} ${field}`;
  if (/^\d+-\d+$/.test(field)) return `${meta.name}s ${field.replace("-", " through ")}`;
  if (/^\d+(,\d+)+$/.test(field)) return `${meta.name}s ${field}`;
  return `${meta.name} ${field}`;
}

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

function getPlainDescription(fields: string[]): string {
  const [minF, hourF, domF, monF, dowF] = fields;

  const isSimpleMinute = /^\d+$/.test(minF);
  const isSimpleHour = /^\d+$/.test(hourF);

  let timePart = "";
  if (isSimpleMinute && isSimpleHour) {
    timePart = `At ${pad(parseInt(hourF, 10))}:${pad(parseInt(minF, 10))}`;
  } else if (isSimpleMinute && hourF === "*") {
    timePart = `At minute ${pad(parseInt(minF, 10))} past every hour`;
  } else if (minF === "*" && isSimpleHour) {
    timePart = `Every minute during hour ${hourF}`;
  } else if (minF.startsWith("*/") && hourF === "*") {
    timePart = `Every ${minF.slice(2)} minutes`;
  } else if (minF === "*" && hourF === "*") {
    timePart = `Every minute`;
  } else {
    timePart = `At minute ${minF} past hour ${hourF}`;
  }

  const extras: string[] = [];
  if (domF !== "*") extras.push(`on day-of-month ${domF}`);
  if (monF !== "*") extras.push(`in month ${monF}`);
  if (dowF !== "*") extras.push(`on day-of-week ${dowF}`);

  if (extras.length === 0) {
    if (timePart === "Every minute") return "Every minute";
    return timePart;
  }
  return `${timePart} ${extras.join(" and ")}`;
}

function validateCron(expression: string): { valid: boolean; error?: string; fields?: string[] } {
  const trimmed = expression.trim();
  if (!trimmed) return { valid: false, error: "Enter a cron expression (5 fields)." };
  const parts = trimmed.split(/\s+/);
  if (parts.length !== 5) {
    return { valid: false, error: `Expected 5 fields, got ${parts.length}. Format: minute hour day-of-month month day-of-week` };
  }
  for (let i = 0; i < 5; i++) {
    const field = parts[i];
    if (!FIELD_REGEX.test(field)) {
      return { valid: false, error: `Invalid field "${field}" at position ${i + 1} (${FIELD_META[i].label}).` };
    }
    // range validation
    const meta = FIELD_META[i];
    const values = field.split(",");
    for (const v of values) {
      const base = v.split("/")[0];
      if (base === "*") continue;
      if (base.includes("-")) {
        const [sStr, eStr] = base.split("-");
        const s = parseInt(sStr, 10);
        const e = parseInt(eStr, 10);
        if (Number.isNaN(s) || Number.isNaN(e) || s < meta.min || e > meta.max || s > e) {
          return { valid: false, error: `${meta.label} out of range (${meta.min}–${meta.max}): "${v}"` };
        }
      } else if (base !== "*") {
        const n = parseInt(base, 10);
        if (Number.isNaN(n) || n < meta.min || n > meta.max) {
          return { valid: false, error: `${meta.label} out of range (${meta.min}–${meta.max}): "${v}"` };
        }
      }
      const stepStr = v.split("/")[1];
      if (stepStr !== undefined) {
        const step = parseInt(stepStr, 10);
        if (Number.isNaN(step) || step <= 0) {
          return { valid: false, error: `Invalid step value in "${v}"` };
        }
      }
    }
  }
  return { valid: true, fields: parts };
}

export default function CronParserTool() {
  const [expression, setExpression] = useState("0 0 * * *");

  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
  }, []);

  const { error, fields, description, nextRuns } = useMemo(() => {
    const result = validateCron(expression);
    if (!result.valid || !result.fields || !now) {
      return { error: result.error || "Invalid cron expression.", fields: null as string[] | null, description: "", nextRuns: [] as Date[] };
    }
    const fields = result.fields;
    const description = getPlainDescription(fields);

    // next 5 run times approximated by iterating minutes (simple loop up to 100k minutes)
    const runs: Date[] = [];
    const localNow = new Date(now.getTime());
    localNow.setSeconds(0, 0);
    // start from next minute
    const cursor = new Date(localNow.getTime() + 60_000);
    for (let i = 0; i < 100_000 && runs.length < 5; i++) {
      const d = new Date(cursor.getTime() + i * 60_000);
      if (isCronMatch(d, fields)) {
        runs.push(d);
      }
    }
    return { error: "", fields, description, nextRuns: runs };
  }, [expression, now]);

  const hasError = !!error;

  return (
    <ToolPaper>
      <TextField
        label="Cron expression (5 fields)"
        fullWidth
        value={expression}
        onChange={(e) => setExpression(e.target.value)}
        placeholder="e.g., 0 0 * * *  or  */15 9-17 * * 1-5"
        helperText={hasError ? error : "Format: minute hour day-of-month month day-of-week — e.g., 0 0 * * * = daily at midnight"}
        error={hasError}
        slotProps={{ input: { spellCheck: false, autoComplete: "off" } }}
        sx={{ "& input": { fontFamily: "monospace" } }}
      />

      {!hasError && fields ? (
        <Stack spacing={2}>
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
              Field breakdown
            </Typography>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={1} sx={{ flexWrap: "wrap" }}>
              {fields.map((f, idx) => (
                <Box
                  key={idx}
                  sx={{
                    flex: 1,
                    minWidth: 120,
                    p: 1.5,
                    borderRadius: 2,
                    border: "1px solid",
                    borderColor: "divider",
                    bgcolor: "background.paper",
                  }}
                >
                  <Typography variant="caption" color="text.secondary" sx={{ textTransform: "uppercase", letterSpacing: 0.5 }}>
                    {FIELD_META[idx].label}
                  </Typography>
                  <Typography variant="body2" sx={{ fontFamily: "monospace", fontWeight: 700 }}>
                    {f}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {describeField(f, FIELD_META[idx])}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Box>

          <Alert severity="info">{description}</Alert>

          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
              Next 5 run times
            </Typography>
            {nextRuns.length === 0 ? (
              <Alert severity="warning">No run times found in the next 100,000 minutes (~69 days). Check the expression.</Alert>
            ) : (
              <Stack spacing={1}>
                {nextRuns.map((d, i) => (
                  <Box
                    key={i}
                    sx={{
                      p: 1.5,
                      borderRadius: 2,
                      border: "1px solid",
                      borderColor: "divider",
                      fontFamily: "monospace",
                      fontSize: 14,
                      display: "flex",
                      justifyContent: "space-between",
                      gap: 2,
                      flexWrap: "wrap",
                    }}
                  >
                    <Typography component="span" variant="body2" sx={{ fontFamily: "monospace" }}>
                      {d.toLocaleString()}
                    </Typography>
                    <Typography component="span" variant="caption" color="text.secondary" sx={{ fontFamily: "monospace" }}>
                      {d.toISOString().replace("T", " ").slice(0, 16)} UTC
                    </Typography>
                  </Box>
                ))}
                <Typography variant="caption" color="text.secondary">
                  Approximated by iterating minutes (simple loop up to 100k minutes) from now.
                </Typography>
              </Stack>
            )}
          </Box>
        </Stack>
      ) : (
        <Alert severity="error">{error}</Alert>
      )}

      <Box sx={{ pt: 1 }}>
        <Typography variant="caption" color="text.secondary">
          Examples: <Box component="span" sx={{ fontFamily: "monospace" }}>* * * * *</Box> every minute ·{" "}
          <Box component="span" sx={{ fontFamily: "monospace" }}>0 * * * *</Box> hourly ·{" "}
          <Box component="span" sx={{ fontFamily: "monospace" }}>0 0 * * 0</Box> weekly ·{" "}
          <Box component="span" sx={{ fontFamily: "monospace" }}>30 9 1 * *</Box> At 09:30 on day-of-month 1
        </Typography>
      </Box>
    </ToolPaper>
  );
}

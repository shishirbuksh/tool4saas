
import { useMemo, useState } from "react";
import ToolPaper from "@/components/ToolPaper";import { Box, TextField, Typography, Stack, LinearProgress } from "@/components/ds";


const rules = [
  { label: "At least 8 characters", test: (v: string) => v.length >= 8 },
  { label: "Lowercase letter", test: (v: string) => /[a-z]/.test(v) },
  { label: "Uppercase letter", test: (v: string) => /[A-Z]/.test(v) },
  { label: "Number", test: (v: string) => /[0-9]/.test(v) },
  { label: "Symbol (!@#$…)", test: (v: string) => /[^A-Za-z0-9]/.test(v) },
];

const STRENGTH = ["Very weak", "Weak", "Fair", "Good", "Strong"];

export default function PasswordStrengthTool() {
  const [pw, setPw] = useState("");

  const passed = useMemo(() => rules.map((r) => r.test(pw)), [pw]);
  const score = passed.filter(Boolean).length;

  return (
    <ToolPaper>
        <TextField
          label="Password"
          type="text"
          fullWidth
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          slotProps={{ input: { spellCheck: false, autoComplete: "off" } }}
        />
        {pw && (
          <Box>
            <Box className="flex justify-between mb-1">
              <Typography variant="body2" color="text.secondary">
                Strength
              </Typography>
              <Typography variant="body2" className="font-bold">
                {STRENGTH[score]}
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={(score / 5) * 100}
              color={score <= 1 ? "error" : score <= 3 ? "warning" : "success"}
              className="h-[8px] rounded-[7992px]"
            />
            <Stack spacing={0.5} className="mt-3">
              {rules.map((r, i) => (
                <Typography
                  key={r.label}
                  variant="body2"
                  style={{ color: passed[i] ? "success.main" : "text.secondary" }}
                >
                  {passed[i] ? "✓" : "○"} {r.label}
                </Typography>
              ))}
            </Stack>
          </Box>
        )}
      </ToolPaper>
  );
}

"use client";

import { useState } from "react";
import ToolPaper from "@/components/ToolPaper";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Alert from "@mui/material/Alert";

const luhn = (num: string): boolean => {
  const digits = num.replace(/\D/g, "");
  if (!digits) return false;
  let sum = 0;
  let alt = false;
  for (let i = digits.length - 1; i >= 0; i--) {
    let d = parseInt(digits[i], 10);
    if (alt) {
      d *= 2;
      if (d > 9) d -= 9;
    }
    sum += d;
    alt = !alt;
  }
  return sum % 10 === 0;
};

const brand = (num: string): string => {
  const n = num.replace(/\D/g, "");
  if (/^4/.test(n)) return "Visa";
  if (/^(5[1-5]|2[2-7])/.test(n)) return "Mastercard";
  if (/^3[47]/.test(n)) return "American Express";
  if (/^(6011|65|64[4-9])/.test(n)) return "Discover";
  if (/^36/.test(n)) return "Diners Club";
  if (/^62/.test(n)) return "UnionPay";
  return "Unknown";
};

export default function CreditCardValidatorTool() {
  const [input, setInput] = useState("");

  const digits = input.replace(/\D/g, "");
  const valid = digits.length >= 12 && luhn(digits);
  const detected = digits ? brand(digits) : "";

  return (
    <ToolPaper>
        <TextField
          label="Card number"
          fullWidth
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="4242 4242 4242 4242"
          slotProps={{ input: { inputMode: "numeric", spellCheck: false, autoComplete: "off" } }}
        />
        <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
          <Chip label={`Brand: ${detected || "—"}`} variant="outlined" />
          <Chip
            label={digits ? (valid ? "Valid (Luhn)" : "Invalid") : "Enter a number"}
            color={digits ? (valid ? "success" : "error") : "default"}
          />
          <Chip label={`Length: ${digits.length || 0}`} variant="outlined" />
        </Stack>
        {digits && !valid && (
          <Alert severity="info">
            This number fails the Luhn check. Never enter real card details on unknown sites.
          </Alert>
        )}
        <Box>
          <Typography variant="body2" color="text.secondary">
            Validation runs locally using the Luhn algorithm. No data is sent anywhere.
          </Typography>
        </Box>
      </ToolPaper>
  );
}

"use client";

import { useEffect, useMemo, useState } from "react";
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
import SwapVertIcon from "@mui/icons-material/SwapVert";
import { fmtNumber, money } from "@/lib/format";

const CURRENCIES = [
  "USD",
  "EUR",
  "GBP",
  "INR",
  "JPY",
  "CAD",
  "AUD",
  "CHF",
  "CNY",
  "SEK",
  "NZD",
  "MXN",
  "SGD",
  "HKD",
  "NOK",
  "KRW",
  "TRY",
  "ZAR",
  "BRL",
  "AED",
] as const;

type Currency = (typeof CURRENCIES)[number];

// Static fallback rates: units of currency per 1 USD.
const FALLBACK_RATES: Record<string, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  INR: 83.5,
  JPY: 149.8,
  CAD: 1.36,
  AUD: 1.52,
  CHF: 0.88,
  CNY: 7.24,
  SEK: 10.45,
  NZD: 1.64,
  MXN: 17.1,
  SGD: 1.34,
  HKD: 7.82,
  NOK: 10.65,
  KRW: 1330,
  TRY: 32.5,
  ZAR: 18.9,
  BRL: 5.05,
  AED: 3.6725,
};

type ErApiResponse = {
  result?: string;
  rates?: Record<string, number>;
  time_last_update_utc?: string;
};

export default function CurrencyConverterTool() {
  const [amount, setAmount] = useState("100");
  const [from, setFrom] = useState<string>("USD");
  const [to, setTo] = useState<string>("EUR");
  const [rates, setRates] = useState<Record<string, number>>(FALLBACK_RATES);
  const [status, setStatus] = useState<"loading" | "live" | "offline">("loading");
  const [updatedAt, setUpdatedAt] = useState<string>("");

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch("https://open.er-api.com/v6/latest/USD", {
          signal: AbortSignal.timeout(8000),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = (await res.json()) as ErApiResponse;
        if (data.result !== "success" || !data.rates) throw new Error("Bad API response");
        if (cancelled) return;
        setRates((prev) => {
          const next: Record<string, number> = { ...prev };
          for (const code of CURRENCIES) {
            const v = data.rates?.[code];
            if (typeof v === "number" && isFinite(v) && v > 0) next[code] = v;
          }
          return next;
        });
        setUpdatedAt(data.time_last_update_utc ?? new Date().toUTCString());
        setStatus("live");
      } catch {
        if (!cancelled) {
          setUpdatedAt("");
          setStatus("offline");
        }
      }
    }
    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  const parsed = useMemo(() => {
    const n = parseFloat(amount);
    return isNaN(n) ? null : n;
  }, [amount]);

  const converted = useMemo(() => {
    if (parsed === null || !isFinite(parsed)) return null;
    const fromRate = rates[from] ?? 0;
    const toRate = rates[to] ?? 0;
    if (!fromRate || !toRate) return null;
    const inUsd = parsed / fromRate;
    return inUsd * toRate;
  }, [parsed, rates, from, to]);

  const result = useMemo(() => {
    if (converted === null || !isFinite(converted)) return "";
    try {
      return money(converted, to as Currency);
    } catch {
      return fmtNumber(converted, { maximumFractionDigits: 2 });
    }
  }, [converted, to]);

  const unitRate = useMemo(() => {
    const fromRate = rates[from] ?? 0;
    const toRate = rates[to] ?? 0;
    if (!fromRate || !toRate) return "";
    const r = toRate / fromRate;
    return `1 ${from} = ${fmtNumber(r, { maximumFractionDigits: 6 })} ${to}`;
  }, [rates, from, to]);

  const swap = () => {
    setFrom(to);
    setTo(from);
  };

  return (
    <ToolPaper>
      <TextField
        label="Amount"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        fullWidth
        slotProps={{ input: { inputMode: "decimal", spellCheck: false, autoComplete: "off" } }}
      />

      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ alignItems: "center" }}>
        <FormControl fullWidth>
          <InputLabel>From</InputLabel>
          <Select label="From" value={from} onChange={(e) => setFrom(e.target.value)}>
            {CURRENCIES.map((c) => (
              <MenuItem key={c} value={c}>
                {c}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button onClick={swap} aria-label="swap" sx={{ minWidth: 0 }}>
          <SwapVertIcon />
        </Button>
        <FormControl fullWidth>
          <InputLabel>To</InputLabel>
          <Select label="To" value={to} onChange={(e) => setTo(e.target.value)}>
            {CURRENCIES.map((c) => (
              <MenuItem key={c} value={c}>
                {c}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>

      <Box sx={{ p: 2, bgcolor: "primary.main", color: "primary.contrastText", borderRadius: 2 }}>
        <Typography variant="caption">Result</Typography>
        <Typography variant="h4" sx={{ fontWeight: 800 }}>
          {result || "—"}
        </Typography>
        <Typography variant="caption" sx={{ opacity: 0.85 }}>
          {unitRate}
        </Typography>
      </Box>

      <Typography variant="caption" color="text.secondary">
        {status === "loading"
          ? "Fetching live rates from open.er-api.com…"
          : status === "live"
            ? `Live rates via open.er-api.com (USD base)${updatedAt ? ` • updated ${updatedAt}` : ""}`
            : "Offline — using fallback rates (may be stale). Your IP is only sent to open.er-api.com when live rates load."}
      </Typography>
    </ToolPaper>
  );
}

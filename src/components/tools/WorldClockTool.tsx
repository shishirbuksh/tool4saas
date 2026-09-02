"use client";

import { useState, useEffect } from "react";
import ToolPaper from "@/components/ToolPaper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

type City = {
  label: string;
  zone: string;
};

const DEFAULT_CITIES: City[] = [
  { label: "New York", zone: "America/New_York" },
  { label: "London", zone: "Europe/London" },
  { label: "Tokyo", zone: "Asia/Tokyo" },
  { label: "Sydney", zone: "Australia/Sydney" },
  { label: "Dubai", zone: "Asia/Dubai" },
];

const PRESET_ZONES: City[] = [
  { label: "Los Angeles", zone: "America/Los_Angeles" },
  { label: "Chicago", zone: "America/Chicago" },
  { label: "São Paulo", zone: "America/Sao_Paulo" },
  { label: "Paris", zone: "Europe/Paris" },
  { label: "Berlin", zone: "Europe/Berlin" },
  { label: "Cairo", zone: "Africa/Cairo" },
  { label: "Kolkata", zone: "Asia/Kolkata" },
  { label: "Shanghai", zone: "Asia/Shanghai" },
  { label: "Auckland", zone: "Pacific/Auckland" },
  { label: "UTC", zone: "UTC" },
];

function zoneOffsetMs(tz: string, date: Date): number {
  const dtf = new Intl.DateTimeFormat("en-US", {
    timeZone: tz,
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const parts = dtf.formatToParts(date);
  const m: Record<string, string> = {};
  for (const p of parts) if (p.type !== "literal") m[p.type] = p.value;
  const asUTC = Date.UTC(+m.year, +m.month - 1, +m.day, +m.hour, +m.minute, +m.second);
  return asUTC - date.getTime();
}

function formatOffset(tz: string, date: Date): string {
  const offsetMs = zoneOffsetMs(tz, date);
  const totalMinutes = Math.round(offsetMs / 60000);
  const sign = totalMinutes >= 0 ? "+" : "-";
  const abs = Math.abs(totalMinutes);
  const hh = String(Math.floor(abs / 60)).padStart(2, "0");
  const mm = String(abs % 60).padStart(2, "0");
  return `UTC${sign}${hh}:${mm}`;
}

function isValidTimeZone(tz: string): boolean {
  if (!tz) return false;
  try {
    Intl.DateTimeFormat(undefined, { timeZone: tz });
    return true;
  } catch {
    return false;
  }
}

function formatTime(tz: string, date: Date, hour12: boolean): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: tz,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12,
  }).format(date);
}

function formatDate(tz: string, date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: tz,
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}

export default function WorldClockTool() {
  const [now, setNow] = useState(() => new Date());
  const [cities, setCities] = useState<City[]>(DEFAULT_CITIES);
  const [customZone, setCustomZone] = useState("");
  const [presetSelect, setPresetSelect] = useState("");
  const [error, setError] = useState("");
  const [hour12, setHour12] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const handleAddCustom = () => {
    const tz = customZone.trim();
    if (!tz) {
      setError("Enter an IANA timezone, e.g. Europe/Paris");
      return;
    }
    if (!isValidTimeZone(tz)) {
      setError(`Invalid IANA timezone: ${tz}`);
      return;
    }
    if (cities.some((c) => c.zone === tz)) {
      setError(`${tz} is already added`);
      return;
    }
    const label = tz.split("/").pop()?.replace(/_/g, " ") ?? tz;
    setCities((prev) => [...prev, { label, zone: tz }]);
    setCustomZone("");
    setError("");
  };

  const handleAddPreset = (zone: string) => {
    if (!zone) return;
    if (cities.some((c) => c.zone === zone)) {
      setError(`${zone} is already added`);
      return;
    }
    const found = PRESET_ZONES.find((p) => p.zone === zone);
    const label = found?.label ?? zone.split("/").pop()?.replace(/_/g, " ") ?? zone;
    setCities((prev) => [...prev, { label, zone }]);
    setPresetSelect("");
    setError("");
  };

  const handleRemove = (zone: string) => {
    setCities((prev) => prev.filter((c) => c.zone !== zone));
  };

  const handleReset = () => {
    setCities(DEFAULT_CITIES);
    setError("");
    setCustomZone("");
    setPresetSelect("");
  };

  return (
    <ToolPaper spacing={3}>
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 800 }}>
          World Clock
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Current time in 5 cities updating every second. Add any IANA timezone (e.g. Asia/Kolkata).
        </Typography>
      </Box>

      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ alignItems: "flex-start" }}>
        <TextField
          label="Add IANA timezone"
          placeholder="Europe/Paris"
          value={customZone}
          onChange={(e) => {
            setCustomZone(e.target.value);
            if (error) setError("");
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleAddCustom();
          }}
          fullWidth
          error={Boolean(error)}
          helperText={error || "Validate via Intl.DateTimeFormat — e.g. America/Los_Angeles"}
          slotProps={{ input: { spellCheck: false, autoComplete: "off" } }}
          sx={{ "& input": { fontFamily: "monospace" } }}
        />
        <Button variant="contained" onClick={handleAddCustom} sx={{ whiteSpace: "nowrap", mt: { xs: 0, sm: 1 } }}>
          Add zone
        </Button>
      </Stack>

      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ alignItems: "center" }}>
        <FormControl fullWidth>
          <InputLabel>Quick add preset</InputLabel>
          <Select
            label="Quick add preset"
            value={presetSelect}
            onChange={(e) => {
              const v = e.target.value;
              setPresetSelect(v);
              if (v) handleAddPreset(v);
            }}
          >
            <MenuItem value="">
              <em>Select city</em>
            </MenuItem>
            {PRESET_ZONES.map((p) => (
              <MenuItem key={p.zone} value={p.zone}>
                {p.label} — {p.zone}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 140 }}>
          <InputLabel>Format</InputLabel>
          <Select label="Format" value={hour12 ? "12h" : "24h"} onChange={(e) => setHour12(e.target.value === "12h")}>
            <MenuItem value="24h">24-hour</MenuItem>
            <MenuItem value="12h">12-hour</MenuItem>
          </Select>
        </FormControl>

        <Button variant="outlined" onClick={handleReset} sx={{ whiteSpace: "nowrap" }}>
          Reset
        </Button>
      </Stack>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" },
          gap: 2,
        }}
      >
        {cities.map((city) => {
          const time = formatTime(city.zone, now, hour12);
          const date = formatDate(city.zone, now);
          const offset = formatOffset(city.zone, now);
          return (
            <Box
              key={city.zone}
              sx={{
                p: 2,
                borderRadius: 2,
                border: "1px solid",
                borderColor: "divider",
                bgcolor: "background.paper",
                textAlign: "center",
              }}
            >
              <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                {city.label}
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ fontFamily: "monospace", display: "block", mb: 0.5 }}>
                {city.zone} · {offset}
              </Typography>
              <Typography
                variant="h5"
                sx={{ fontWeight: 800, fontFamily: "monospace", letterSpacing: 0.5 }}
                aria-live="polite"
              >
                {time}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {date}
              </Typography>
              <Box sx={{ mt: 1 }}>
                <Button size="small" color="inherit" onClick={() => handleRemove(city.zone)}>
                  Remove
                </Button>
              </Box>
            </Box>
          );
        })}
      </Box>

      <Typography variant="caption" color="text.secondary" sx={{ display: "block", textAlign: "center" }}>
        Times rendered via Intl.DateTimeFormat with timeZone and refreshed every second via setInterval.
      </Typography>
    </ToolPaper>
  );
}

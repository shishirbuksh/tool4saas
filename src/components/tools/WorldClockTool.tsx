
import { useState, useEffect } from "react";
import ToolPaper from "@/components/ToolPaper";import { Typography, Box, Stack, TextField, Button, MenuItem, Select, FormControl, InputLabel } from "@/components/ds";

import { MS_PER_MINUTE } from "@/lib/format";

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
  const dtf = new Intl.DateTimeFormat(undefined, {
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
  const totalMinutes = Math.round(offsetMs / MS_PER_MINUTE);
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
  return new Intl.DateTimeFormat(undefined, {
    timeZone: tz,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12,
  }).format(date);
}

function formatDate(tz: string, date: Date): string {
  return new Intl.DateTimeFormat(undefined, {
    timeZone: tz,
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}

export default function WorldClockTool() {
  const [now, setNow] = useState<Date | null>(null);
  const [cities, setCities] = useState<City[]>(DEFAULT_CITIES);
  const [customZone, setCustomZone] = useState("");
  const [presetSelect, setPresetSelect] = useState("");
  const [error, setError] = useState("");
  const [hour12, setHour12] = useState(false);

  useEffect(() => {
    setNow(new Date());
    let id: ReturnType<typeof setInterval> | null = null;
    const start = () => {
      if (id == null) id = setInterval(() => setNow(new Date()), 1000);
    };
    const stop = () => {
      if (id != null) {
        clearInterval(id);
        id = null;
      }
    };
    const onVisibility = () => {
      if (document.hidden) {
        stop();
      } else {
        setNow(new Date());
        start();
      }
    };
    start();
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVisibility);
    };
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
        <Typography variant="h6" className="font-extrabold">
          World Clock
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Current time in 5 cities updating every second. Add any IANA timezone (e.g. Asia/Kolkata).
        </Typography>
      </Box>

      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} className="items-start">
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
          className="[&_input]:[font-family:monospace]"
        />
        <Button variant="contained" onClick={handleAddCustom} className="whitespace-nowrap mt-0 sm:mt-2">
          Add zone
        </Button>
      </Stack>

      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} className="items-center">
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

        <FormControl className="min-w-[140px]">
          <InputLabel>Format</InputLabel>
          <Select label="Format" value={hour12 ? "12h" : "24h"} onChange={(e) => setHour12(e.target.value === "12h")}>
            <MenuItem value="24h">24-hour</MenuItem>
            <MenuItem value="12h">12-hour</MenuItem>
          </Select>
        </FormControl>

        <Button variant="outlined" onClick={handleReset} className="whitespace-nowrap">
          Reset
        </Button>
      </Stack>

      <Box
        className="grid grid-cols-[1fr] sm:grid-cols-[1fr_1fr] md:grid-cols-[1fr_1fr_1fr] gap-4"
      >
        {cities.map((city) => {
          const time = now ? formatTime(city.zone, now, hour12) : "—";
          const date = now ? formatDate(city.zone, now) : "—";
          const offset = now ? formatOffset(city.zone, now) : "—";
          return (
            <Box
              key={city.zone}
              className="p-4 rounded-[16px] border border-base-300 bg-base-100 text-center"
            >
              <Typography variant="subtitle2" className="font-bold">
                {city.label}
              </Typography>
              <Typography variant="caption" color="text.secondary" className="block mb-1" style={{ fontFamily: "monospace" }}>
                {city.zone} · {offset}
              </Typography>
              <Typography
                variant="h5"
                className="font-extrabold tracking-[0.5px]" style={{ fontFamily: "monospace" }}
                aria-live="polite"
              >
                {time}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {date}
              </Typography>
              <Box className="mt-2">
                <Button size="small" color="inherit" onClick={() => handleRemove(city.zone)}>
                  Remove
                </Button>
              </Box>
            </Box>
          );
        })}
      </Box>

      <Typography variant="caption" color="text.secondary" className="block text-center">
        Times rendered via Intl.DateTimeFormat with timeZone and refreshed every second via setInterval.
      </Typography>
    </ToolPaper>
  );
}

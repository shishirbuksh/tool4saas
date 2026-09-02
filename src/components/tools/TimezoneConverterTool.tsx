"use client";

import { useState } from "react";
import ToolPaper from "@/components/ToolPaper";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const ZONES = [
  "UTC",
  "America/Los_Angeles",
  "America/Denver",
  "America/Chicago",
  "America/New_York",
  "America/Sao_Paulo",
  "Europe/London",
  "Europe/Paris",
  "Europe/Berlin",
  "Africa/Cairo",
  "Asia/Dubai",
  "Asia/Kolkata",
  "Asia/Shanghai",
  "Asia/Tokyo",
  "Australia/Sydney",
];

const localZone = () => Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";

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

export default function TimezoneConverterTool() {
  const [value, setValue] = useState("");
  const [from, setFrom] = useState(localZone());
  const [to, setTo] = useState("UTC");

  const instant = (() => {
    if (!value) return null;
    const d = new Date(value);
    if (isNaN(d.getTime())) return null;
    return new Date(d.getTime() - zoneOffsetMs(from, d));
  })();

  const fmt = (tz: string) =>
    instant
      ? new Intl.DateTimeFormat(undefined, {
          timeZone: tz,
          weekday: "short",
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          timeZoneName: "short",
        }).format(instant)
      : "";

  const zoneSelect = (label: string, val: string, set: (v: string) => void) => (
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select label={label} value={val} onChange={(e) => set(e.target.value)}>
        {ZONES.map((z) => (
          <MenuItem key={z} value={z}>
            {z}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );

  return (
    <ToolPaper>
        <TextField
          label="Date & time"
          type="datetime-local"
          fullWidth
          value={value}
          onChange={(e) => setValue(e.target.value)}
          slotProps={{ input: { spellCheck: false, autoComplete: "off" } }}
        />
        {zoneSelect("From timezone", from, setFrom)}
        {zoneSelect("To timezone", to, setTo)}
        <Box
          sx={{
            p: 2,
            borderRadius: 2,
            border: "1px solid",
            borderColor: "primary.main",
            textAlign: "center",
          }}
        >
          <Typography variant="overline" color="text.secondary">
            {to}
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 800, color: "primary.main" }}>
            {instant ? fmt(to) : "—"}
          </Typography>
          {instant && (
            <Typography variant="body2" color="text.secondary">
              {from}: {fmt(from)}
            </Typography>
          )}
        </Box>
      </ToolPaper>
  );
}

"use client";

import { useMemo, useState } from "react";
import ToolPaper from "@/components/ToolPaper";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";

export default function UrlParserTool() {
  const [url, setUrl] = useState("");

  const parsed = useMemo(() => {
    if (!url.trim()) return null;
    try {
      const u = new URL(url.trim());
      const params: [string, string][] = [];
      u.searchParams.forEach((value, key) => params.push([key, value]));
      return {
        protocol: u.protocol,
        host: u.host,
        hostname: u.hostname,
        port: u.port,
        origin: u.origin,
        pathname: u.pathname,
        search: u.search,
        hash: u.hash,
        params,
      };
    } catch {
      return "error" as const;
    }
  }, [url]);

  const rows: [string, string][] = parsed && parsed !== "error"
    ? [
        ["Protocol", parsed.protocol],
        ["Host", parsed.host],
        ["Hostname", parsed.hostname],
        ["Port", parsed.port || "(default)"],
        ["Origin", parsed.origin],
        ["Path", parsed.pathname],
        ["Query", parsed.search || "(none)"],
        ["Hash", parsed.hash || "(none)"],
      ]
    : [];

  return (
    <ToolPaper>
        <TextField
          label="URL"
          fullWidth
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com/path?q=hello#section"
          slotProps={{ input: { spellCheck: false, autoComplete: "off" } }}
          error={parsed === "error"}
          helperText={parsed === "error" ? "Enter a valid absolute URL (including https://)." : " "}
        />
        {parsed && parsed !== "error" && (
          <Stack spacing={1}>
            {rows.map(([k, v]) => (
              <Box
                key={k}
                sx={{
                  display: "flex",
                  gap: 2,
                  p: 1.5,
                  borderRadius: 2,
                  border: "1px solid",
                  borderColor: "divider",
                }}
              >
                <Typography sx={{ width: 110, fontWeight: 700, color: "text.secondary" }}>{k}</Typography>
                <Typography sx={{ fontFamily: "monospace", fontSize: 14, wordBreak: "break-all" }}>{v}</Typography>
              </Box>
            ))}
            {parsed.params.length > 0 && (
              <Box sx={{ mt: 1 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
                  Query parameters
                </Typography>
                <Stack spacing={1}>
                  {parsed.params.map(([k, v]) => (
                    <Box
                      key={k}
                      sx={{
                        display: "flex",
                        gap: 2,
                        p: 1.5,
                        borderRadius: 2,
                        border: "1px solid",
                        borderColor: "divider",
                      }}
                    >
                      <Typography sx={{ width: 160, fontWeight: 600, color: "primary.main" }}>{k}</Typography>
                      <Typography sx={{ fontFamily: "monospace", fontSize: 14, wordBreak: "break-all" }}>{v}</Typography>
                    </Box>
                  ))}
                </Stack>
              </Box>
            )}
          </Stack>
        )}
        {parsed === "error" && <Alert severity="error">That is not a valid URL.</Alert>}
      </ToolPaper>
  );
}

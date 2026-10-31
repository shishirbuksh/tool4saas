
import { useMemo, useState } from "react";
import ToolPaper from "@/components/ToolPaper";import { Box, TextField, Typography, Stack, Alert } from "@/components/ds";


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
                className="flex gap-4 p-3 rounded-[16px] border border-base-300"
              >
                <Typography className="w-[110px] font-bold text-base-content/70">{k}</Typography>
                <Typography className="text-[14px] break-all" style={{ fontFamily: "monospace" }}>{v}</Typography>
              </Box>
            ))}
            {parsed.params.length > 0 && (
              <Box className="mt-2">
                <Typography variant="subtitle2" className="font-bold mb-2">
                  Query parameters
                </Typography>
                <Stack spacing={1}>
                  {parsed.params.map(([k, v]) => (
                    <Box
                      key={k}
                      className="flex gap-4 p-3 rounded-[16px] border border-base-300"
                    >
                      <Typography className="w-[160px] font-semibold text-primary">{k}</Typography>
                      <Typography className="text-[14px] break-all" style={{ fontFamily: "monospace" }}>{v}</Typography>
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


import { useMemo, useState } from "react";
import ToolPaper from "@/components/ToolPaper";import { Box, TextField, Button, Typography, Stack, Alert } from "@/components/ds";

import { ContentCopy as ContentCopyIcon } from "@/components/ds/icons";

const MAX_JWT_SIZE = 1_000_000;

const b64urlDecode = (s: string) => {
  const pad = s.length % 4 === 0 ? "" : "=".repeat(4 - (s.length % 4));
  const b64 = s.replace(/-/g, "+").replace(/_/g, "/") + pad;
  const bin = atob(b64);
  const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
};

export default function JwtDecoderTool() {
  const [token, setToken] = useState("");
  const copy = (v: string) => v && void import("@/lib/clipboard").then(m=>m.copyToClipboard(v));

  const { header, payload, error } = useMemo(() => {
    if (!token.trim()) return { header: "", payload: "", error: "" };
    if (token.length > MAX_JWT_SIZE) return { header: "", payload: "", error: `JWT too large — max ${MAX_JWT_SIZE.toLocaleString()} chars.` };
    const parts = token.trim().split(".");
    if (parts.length < 2) return { header: "", payload: "", error: "A JWT has three parts separated by dots." };
    try {
      const h = JSON.stringify(JSON.parse(b64urlDecode(parts[0])), null, 2);
      const p = JSON.stringify(JSON.parse(b64urlDecode(parts[1])), null, 2);
      return { header: h, payload: p, error: "" };
    } catch {
      return { header: "", payload: "", error: "Could not decode the header or payload — check the token." };
    }
  }, [token]);

  return (
    <ToolPaper>
        <TextField
          label="JWT (paste the full token)"
          multiline
          minRows={3}
          fullWidth
          value={token}
          onChange={(e) => setToken(e.target.value.slice(0, MAX_JWT_SIZE + 1))}
          placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.…"
          slotProps={{ input: { spellCheck: false, autoComplete: "off" } }}
          error={!!error}
          helperText={error || `Decoding is local; ${token.length.toLocaleString()} / ${MAX_JWT_SIZE.toLocaleString()} chars — nothing sent anywhere.`}
        />
        {token.length > MAX_JWT_SIZE && <Alert severity="warning">JWT exceeds 1M chars — truncated.</Alert>}
        <Box>
          <Stack direction="row" className="items-center justify-between mb-1">
            <Typography variant="subtitle2" className="font-bold">
              Header
            </Typography>
            <Button size="small" startIcon={<ContentCopyIcon />} onClick={() => copy(header)} disabled={!header}>
              Copy
            </Button>
          </Stack>
          <TextField
            value={header}
            multiline
            minRows={3}
            fullWidth
            slotProps={{ input: { readOnly: true, "aria-label": "Decoded JWT header", spellCheck: false } }}
            className="[&_textarea]:text-[13px] [&_textarea]:[font-family:monospace]"
          />
        </Box>
        <Box>
          <Stack direction="row" className="items-center justify-between mb-1">
            <Typography variant="subtitle2" className="font-bold">
              Payload
            </Typography>
            <Button size="small" startIcon={<ContentCopyIcon />} onClick={() => copy(payload)} disabled={!payload}>
              Copy
            </Button>
          </Stack>
          <TextField
            value={payload}
            multiline
            minRows={5}
            fullWidth
            slotProps={{ input: { readOnly: true, "aria-label": "Decoded JWT payload", spellCheck: false } }}
            className="[&_textarea]:text-[13px] [&_textarea]:[font-family:monospace]"
          />
        </Box>
        {token.trim() && !error && (
          <Alert severity="info" className="mt-2">
            Signature present (not verified). Only decode JWTs you trust.
          </Alert>
        )}
      </ToolPaper>
  );
}

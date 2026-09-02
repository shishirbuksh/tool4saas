"use client";

import { useMemo, useState } from "react";
import ToolPaper from "@/components/ToolPaper";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

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
          onChange={(e) => setToken(e.target.value)}
          placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.…"
          slotProps={{ input: { spellCheck: false, autoComplete: "off" } }}
          error={!!error}
          helperText={error || "Decoding is done locally; nothing is sent anywhere."}
        />
        <Box>
          <Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between", mb: 0.5 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
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
            sx={{ "& textarea": { fontSize: 13, fontFamily: "monospace" } }}
          />
        </Box>
        <Box>
          <Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between", mb: 0.5 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
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
            sx={{ "& textarea": { fontSize: 13, fontFamily: "monospace" } }}
          />
        </Box>
        {token.trim() && !error && (
          <Alert severity="info" sx={{ mt: 1 }}>
            Signature present (not verified). Only decode JWTs you trust.
          </Alert>
        )}
      </ToolPaper>
  );
}

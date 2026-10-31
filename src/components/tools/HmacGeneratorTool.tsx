
import { useState } from "react";
import ToolPaper from "@/components/ToolPaper";import { Box, TextField, Button, Typography, Stack, FormControl, InputLabel, Select, MenuItem } from "@/components/ds";

import { ContentCopy as ContentCopyIcon } from "@/components/ds/icons";

const ALGOS = ["SHA-256", "SHA-384", "SHA-512"] as const;

type Algo = (typeof ALGOS)[number];

async function computeHmac(algo: Algo, key: string, message: string) {
  const enc = new TextEncoder();
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    enc.encode(key),
    { name: "HMAC", hash: algo },
    false,
    ["sign"]
  );
  const buf = await crypto.subtle.sign("HMAC", cryptoKey, enc.encode(message));
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export default function HmacGeneratorTool() {
  const [message, setMessage] = useState("");
  const [key, setKey] = useState("");
  const [algorithm, setAlgorithm] = useState<Algo>("SHA-256");
  const [output, setOutput] = useState("");
  const [busy, setBusy] = useState(false);

  const generate = async () => {
    if (!message || !key) return;
    if (!window.isSecureContext) { setOutput("HMAC requires HTTPS (secure context)."); return; }
    setBusy(true);
    try {
      setOutput(await computeHmac(algorithm, key, message));
    } catch {
      setOutput("HMAC failed — algorithm not supported.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <ToolPaper>
        <TextField
          label="Message"
          multiline
          minRows={5}
          fullWidth
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type or paste message…"
          slotProps={{ input: { spellCheck: false, autoComplete: "off" } }}
        />
        <TextField
          label="Secret key"
          multiline
          minRows={2}
          fullWidth
          value={key}
          onChange={(e) => setKey(e.target.value)}
          placeholder="Enter secret key…"
          slotProps={{ input: { spellCheck: false, autoComplete: "off" } }}
        />
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <FormControl className="min-w-[160px]">
            <InputLabel>Algorithm</InputLabel>
            <Select label="Algorithm" value={algorithm} onChange={(e) => setAlgorithm(e.target.value as Algo)}>
              {ALGOS.map((a) => (
                <MenuItem key={a} value={a}>{a}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button variant="contained" onClick={generate} disabled={!message || !key || busy}>
            {busy ? "Computing…" : "Generate HMAC"}
          </Button>
          <Button variant="outlined" startIcon={<ContentCopyIcon />} onClick={() => output && void import("@/lib/clipboard").then(m=>m.copyToClipboard(output))} disabled={!output}>
            Copy
          </Button>
        </Stack>
        {output && (
          <Box>
            <Typography  variant="subtitle2"  gutterBottom className="font-bold">HMAC-{algorithm} result</Typography>
            <TextField
              value={output}
              multiline
              minRows={3}
              fullWidth
              slotProps={{ input: { readOnly: true, "aria-label": "HMAC result", spellCheck: false } }}
              className="[&_textarea]:[font-family:monospace] [&_textarea]:text-[13px]"
            />
          </Box>
        )}
      </ToolPaper>
  );
}

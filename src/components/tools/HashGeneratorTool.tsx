
import { useState } from "react";
import ToolPaper from "@/components/ToolPaper";import { Box, TextField, Button, Typography, Stack, FormControl, InputLabel, Select, MenuItem } from "@/components/ds";

import { ContentCopy as ContentCopyIcon } from "@/components/ds/icons";

const ALGOS = ["SHA-1", "SHA-256", "SHA-384", "SHA-512"] as const;

const MAX_HASH_INPUT = 1_000_000; // 1M chars cap (parity with Base64/JWT/HtmlEntities)

async function digest(algo: string, text: string) {
  const data = new TextEncoder().encode(text);
  const buf = await crypto.subtle.digest(algo, data);
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export default function HashGeneratorTool() {
  const [input, setInput] = useState("");
  const [algo, setAlgo] = useState<(typeof ALGOS)[number]>("SHA-256");
  const [output, setOutput] = useState("");
  const [busy, setBusy] = useState(false);

  const generate = async () => {
    if (!input) return;
    if (input.length > MAX_HASH_INPUT) { setOutput(`Input too large — max ${MAX_HASH_INPUT.toLocaleString()} chars.`); return; }
    if (!window.isSecureContext) { setOutput("Hash requires HTTPS (secure context)."); return; }
    setBusy(true);
    try {
      setOutput(await digest(algo, input));
    } catch {
      setOutput("Hash failed — algorithm not supported.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <ToolPaper>
        <TextField
          label="Text to hash"
          multiline
          minRows={5}
          fullWidth
          value={input}
          onChange={(e) => setInput(e.target.value.slice(0, MAX_HASH_INPUT + 1))}
          placeholder="Type or paste text…"
          slotProps={{ input: { spellCheck: false, autoComplete: "off" } }}
          helperText={`${input.length.toLocaleString()} / ${MAX_HASH_INPUT.toLocaleString()} chars`}
          error={input.length > MAX_HASH_INPUT}
        />
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <FormControl className="min-w-[160px]">
            <InputLabel>Algorithm</InputLabel>
            <Select label="Algorithm" value={algo} onChange={(e) => setAlgo(e.target.value as (typeof ALGOS)[number])}>
              {ALGOS.map((a) => (
                <MenuItem key={a} value={a}>{a}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button variant="contained" onClick={generate} disabled={!input || busy}>
            {busy ? "Hashing…" : "Generate hash"}
          </Button>
          <Button variant="outlined" startIcon={<ContentCopyIcon />} onClick={() => output && void import("@/lib/clipboard").then(m=>m.copyToClipboard(output))} disabled={!output}>
            Copy
          </Button>
        </Stack>
        {output && (
          <Box>
            <Typography  variant="subtitle2"  gutterBottom className="font-bold">{algo} result</Typography>
            <TextField
              value={output}
              multiline
              minRows={3}
              fullWidth
              slotProps={{ input: { readOnly: true, "aria-label": "Hash result", spellCheck: false } }}
              className="[&_textarea]:[font-family:monospace] [&_textarea]:text-[13px]"
            />
          </Box>
        )}
      </ToolPaper>
  );
}

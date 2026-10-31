
import { useState } from "react";
import ToolPaper from "@/components/ToolPaper";import { Box, TextField, Button, Typography, Stack } from "@/components/ds";

import { ContentCopy as ContentCopyIcon } from "@/components/ds/icons";

function encodeEntities(text: string) {
  if (text.length > 1_000_000) throw new Error("Input too large (max 1M chars)");
  const ta = document.createElement("textarea");
  ta.textContent = text;
  return ta.innerHTML;
}
function decodeEntities(text: string) {
  if (text.length > 1_000_000) throw new Error("Input too large (max 1M chars)");
  const ta = document.createElement("textarea");
  ta.innerHTML = text;
  return ta.value;
}

export default function HtmlEntitiesTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const encode = () => {
    try { setOutput(encodeEntities(input)); } catch (e) { setOutput((e as Error).message); }
  };
  const decode = () => {
    try { setOutput(decodeEntities(input)); } catch (e) { setOutput((e as Error).message); }
  };

  return (
    <ToolPaper>
        <TextField
          label="Input"
          multiline
          minRows={6}
          fullWidth
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`<div class="box">Hello & "world"</div>`}
          slotProps={{ input: { spellCheck: false, autoComplete: "off" } }}
          style={{ fontFamily: "monospace" }}
        />
        <Stack direction="row" spacing={1}  useFlexGap className="flex-wrap">
          <Button variant="contained" onClick={encode} disabled={!input}>Encode →</Button>
          <Button variant="contained" color="secondary" onClick={decode} disabled={!input}>← Decode</Button>
          <Button variant="outlined" startIcon={<ContentCopyIcon />} onClick={() => output && void import("@/lib/clipboard").then(m=>m.copyToClipboard(output))} disabled={!output}>Copy</Button>
        </Stack>
        {output && (
          <Box>
            <Typography  variant="subtitle2"  gutterBottom className="font-bold">Output</Typography>
            <TextField
              value={output}
              multiline
              minRows={6}
              fullWidth
              slotProps={{ input: { readOnly: true, "aria-label": "Output", spellCheck: false } }}
              className="[&_textarea]:[font-family:monospace] [&_textarea]:text-[13px]"
            />
          </Box>
        )}
      </ToolPaper>
  );
}

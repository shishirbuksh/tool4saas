
import { useState } from "react";
import ToolPaper from "@/components/ToolPaper";import { Box, TextField, Button, Typography, Stack } from "@/components/ds";

import { ContentCopy as ContentCopyIcon } from "@/components/ds/icons";

export default function UrlEncoderTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const encode = () => {
    try {
      setOutput(encodeURIComponent(input));
    } catch {
      setOutput("Encoding failed.");
    }
  };
  const decode = () => {
    try {
      setOutput(decodeURIComponent(input.replace(/\+/g, " ")));
    } catch {
      setOutput("Not a valid encoded URL component.");
    }
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
          placeholder="https://example.com/search?q=hello world"
          slotProps={{ input: { spellCheck: false, autoComplete: "off" } }}
          style={{ fontFamily: "monospace" }}
        />
        <Stack direction="row" spacing={1}  useFlexGap className="flex-wrap">
          <Button variant="contained" onClick={encode} disabled={!input}>Encode →</Button>
          <Button variant="contained" color="secondary" onClick={decode} disabled={!input}>← Decode</Button>
          <Button variant="outlined" startIcon={<ContentCopyIcon />} onClick={() => void import("@/lib/clipboard").then(m=>m.copyToClipboard(output))} disabled={!output}>Copy</Button>
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

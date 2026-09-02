"use client";

import { useState } from "react";
import ToolPaper from "@/components/ToolPaper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";

function prettyXml(xml: string): string {
  const tokens = xml.match(/<[^>]+>|[^<]+/g) || [];
  let indent = 0;
  const out: string[] = [];
  for (const raw of tokens) {
    const t = raw.trim();
    if (!t) continue;
    if (t.startsWith("<?") || t.startsWith("<!")) {
      out.push("  ".repeat(indent) + t);
    } else if (t.startsWith("</")) {
      indent = Math.max(0, indent - 1);
      out.push("  ".repeat(indent) + t);
    } else if (t.startsWith("<")) {
      const selfClose = t.endsWith("/>");
      out.push("  ".repeat(indent) + t);
      if (!selfClose) indent++;
    } else {
      out.push("  ".repeat(indent) + t);
    }
  }
  return out.join("\n");
}

export default function XmlFormatterTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const copy = () => output && void import("@/lib/clipboard").then((m) => m.copyToClipboard(output));

  const handleFormat = (minify: boolean) => {
    if (input.length > 500_000) {
      setError("Input too large (max 500 KB)");
      return;
    }
    setError("");
    try {
      if (!input.trim()) {
        setError("Please enter XML");
        setOutput("");
        return;
      }
      const parser = new DOMParser();
      const doc = parser.parseFromString(input, "application/xml");
      const parserError = doc.getElementsByTagName("parsererror");
      if (parserError.length > 0) {
        const msg = parserError[0].textContent || "Invalid XML";
        throw new Error(msg);
      }
      const serialized = new XMLSerializer().serializeToString(doc);
      if (minify) {
        setOutput(serialized.replace(/>\s+</g, "><").trim());
      } else {
        setOutput(prettyXml(serialized));
      }
    } catch (e) {
      setError((e as Error).message);
      setOutput("");
    }
  };

  return (
    <ToolPaper>
      <TextField
        label="Paste XML here"
        multiline
        minRows={8}
        fullWidth
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={`<?xml version="1.0"?><root><child>value</child></root>`}
        slotProps={{ input: { spellCheck: false, autoComplete: "off" } }}
        sx={{ fontFamily: "monospace" }}
      />
      <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: "wrap" }}>
        <Button variant="contained" startIcon={<AutoFixHighIcon />} onClick={() => handleFormat(false)} disabled={!input}>
          Format
        </Button>
        <Button variant="outlined" onClick={() => handleFormat(true)} disabled={!input}>
          Minify
        </Button>
        <Button variant="outlined" startIcon={<ContentCopyIcon />} onClick={copy} disabled={!output}>
          Copy
        </Button>
      </Stack>
      {error && <Alert severity="error">{error}</Alert>}
      {output && (
        <Box>
          <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 700 }}>
            Result
          </Typography>
          <TextField
            value={output}
            multiline
            minRows={8}
            fullWidth
            slotProps={{ input: { readOnly: true, "aria-label": "Result", spellCheck: false, autoComplete: "off" } }}
            sx={{ "& textarea": { fontFamily: "monospace", fontSize: 13 } }}
          />
        </Box>
      )}
    </ToolPaper>
  );
}

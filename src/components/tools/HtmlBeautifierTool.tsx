"use client";

import { useState } from "react";
import ToolPaper from "@/components/ToolPaper";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const VOID = new Set([
  "area", "base", "br", "col", "embed", "hr", "img", "input",
  "link", "meta", "param", "source", "track", "wbr",
]);

function formatHtml(html: string): string {
  const tokens = html.match(/<[^>]+>|[^<]+/g) || [];
  let indent = 0;
  const out: string[] = [];
  for (const raw of tokens) {
    const t = raw.trim();
    if (!t) continue;
    if (t.startsWith("</")) {
      indent = Math.max(0, indent - 1);
      out.push("  ".repeat(indent) + t);
    } else if (t.startsWith("<")) {
      out.push("  ".repeat(indent) + t);
      const name = (t.match(/<\s*([a-zA-Z0-9]+)/)?.[1] || "").toLowerCase();
      const selfClose = t.endsWith("/>");
      if (!selfClose && !VOID.has(name)) indent++;
    } else {
      out.push("  ".repeat(indent) + t);
    }
  }
  return out.join("\n");
}

export default function HtmlBeautifierTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const copy = (v: string) => v && void import("@/lib/clipboard").then(m=>m.copyToClipboard(v));

  const format = () => setOutput(formatHtml(input));

  return (
    <ToolPaper>
        <TextField
          label="HTML"
          multiline
          minRows={8}
          fullWidth
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="<div><p>Hello</p></div>"
          slotProps={{ input: { spellCheck: false, autoComplete: "off" } }}
        />
        <Box>
          <Button variant="contained" onClick={format}>
            Beautify
          </Button>
        </Box>
        {output && (
          <Stack spacing={1}>
            <Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between" }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                Formatted HTML
              </Typography>
              <Button size="small" startIcon={<ContentCopyIcon />} onClick={() => copy(output)}>
                Copy
              </Button>
            </Stack>
            <TextField
              value={output}
              multiline
              minRows={8}
              fullWidth
              slotProps={{ input: { readOnly: true, spellCheck: false, autoComplete: "off" } }}
            />
          </Stack>
        )}
      </ToolPaper>
  );
}

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
import { copyToClipboard } from "@/lib/clipboard";

function beautifyCss(css: string): string {
  if (!css.trim()) return "";

  // Preserve comments by replacing with placeholders
  const comments: string[] = [];
  const placeholder = "__CSS_COMMENT_";
  const withPlaceholders = css.replace(/\/\*[\s\S]*?\*\//g, (match) => {
    const idx = comments.length;
    comments.push(match);
    return `${placeholder}${idx}__`;
  });

  // Insert newlines around braces and semicolons, normalize whitespace
  const normalized = withPlaceholders
    .replace(/\s+/g, " ")
    .replace(/\s*{\s*/g, " {\n")
    .replace(/\s*}\s*/g, "\n}\n")
    .replace(/\s*;\s*/g, ";\n")
    .replace(/\s*:\s*/g, ": ")
    .replace(/\s*,\s*/g, ", ")
    .trim();

  const lines = normalized.split("\n");
  let indent = 0;
  const out: string[] = [];

  for (const raw of lines) {
    let line = raw.trim();
    if (!line) continue;

    // Restore comments in line before indent logic
    line = line.replace(new RegExp(`${placeholder}(\\d+)__`, "g"), (_, idx) => comments[Number(idx)]);

    // Handle comments as standalone lines - keep indent but don't affect indent level
    if (line.startsWith("/*") && line.endsWith("*/")) {
      out.push("  ".repeat(indent) + line);
      continue;
    }

    // Decrease indent if line starts with closing brace
    if (line.startsWith("}")) {
      indent = Math.max(0, indent - 1);
    }

    out.push("  ".repeat(indent) + line);

    // Increase indent if line ends with opening brace
    if (line.endsWith("{")) {
      indent++;
    }
  }

  // Final restore for any remaining placeholders that were split across lines
  let result = out.join("\n");
  result = result.replace(new RegExp(`${placeholder}(\\d+)__`, "g"), (_, idx) => comments[Number(idx)]);

  // Clean up extra blank lines and trailing spaces
  result = result.replace(/[ \t]+$/gm, "").replace(/\n{3,}/g, "\n\n").trim();

  return result;
}

function minifyCss(css: string): string {
  if (!css.trim()) return "";
  return css
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\s+/g, " ")
    .replace(/\s*{\s*/g, "{")
    .replace(/\s*}\s*/g, "}")
    .replace(/\s*;\s*/g, ";")
    .replace(/\s*:\s*/g, ":")
    .replace(/\s*,\s*/g, ",")
    .replace(/;}/g, "}")
    .trim();
}

export default function CssBeautifierTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const handleFormat = () => {
    if (!input.trim()) {
      setError("Please enter CSS to format.");
      setOutput("");
      return;
    }
    setError("");
    setCopied(false);
    setOutput(beautifyCss(input));
  };

  const handleMinify = () => {
    if (!input.trim()) {
      setError("Please enter CSS to minify.");
      setOutput("");
      return;
    }
    setError("");
    setCopied(false);
    setOutput(minifyCss(input));
  };

  const handleCopy = async () => {
    if (!output) return;
    const ok = await copyToClipboard(output);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <ToolPaper>
      <Typography variant="h6" sx={{ fontWeight: 700 }}>
        CSS Beautifier
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Format CSS with brace-based indentation (2 spaces) or minify by collapsing whitespace. Comments are preserved on beautify.
      </Typography>

      <TextField
        label="Input CSS"
        multiline
        minRows={8}
        fullWidth
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={"/* Example */\n.container{display:flex;justify-content:center;}\n.container .item{color:red;}"}
        slotProps={{ input: { spellCheck: false, autoComplete: "off" } }}
        sx={{ "& textarea": { fontFamily: "monospace", fontSize: 13 } }}
      />

      <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: "wrap" }}>
        <Button variant="contained" onClick={handleFormat} disabled={!input.trim()}>
          Format
        </Button>
        <Button variant="outlined" onClick={handleMinify} disabled={!input.trim()}>
          Minify
        </Button>
        <Button
          variant="outlined"
          startIcon={<ContentCopyIcon />}
          onClick={handleCopy}
          disabled={!output}
        >
          Copy
        </Button>
      </Stack>

      {error && <Alert severity="warning">{error}</Alert>}
      {copied && <Alert severity="success">Copied to clipboard!</Alert>}

      {output && (
        <Stack spacing={1}>
          <Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between" }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
              Output Preview
            </Typography>
            <Button size="small" startIcon={<ContentCopyIcon />} onClick={handleCopy}>
              Copy
            </Button>
          </Stack>
          <TextField
            value={output}
            multiline
            minRows={8}
            fullWidth
            slotProps={{ input: { readOnly: true, spellCheck: false, autoComplete: "off" } }}
            sx={{ "& textarea": { fontFamily: "monospace", fontSize: 13 } }}
          />
          <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
            Preview
          </Typography>
          <Box
            sx={{
              p: 2,
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 1,
              overflow: "auto",
            }}
          >
            <style>{output}</style>
            <Typography variant="body2" sx={{ mb: 1 }} color="text.secondary">
              Preview area styled by your CSS (if selectors match elements below):
            </Typography>
            <Box className="preview-container" sx={{ p: 2, border: "1px dashed", borderColor: "divider" }}>
              <Box component="div" className="container">
                <Box component="div" className="item">
                  Sample .container .item element
                </Box>
              </Box>
              <Box component="div" className="box" sx={{ mt: 1 }}>
                Sample .box element
              </Box>
              <Typography variant="body2" className="text">
                Sample .text element
              </Typography>
            </Box>
          </Box>
        </Stack>
      )}
    </ToolPaper>
  );
}

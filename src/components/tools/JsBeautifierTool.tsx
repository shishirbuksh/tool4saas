"use client";

import { useState } from "react";
import ToolPaper from "@/components/ToolPaper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { copyToClipboard } from "@/lib/clipboard";

const MAX_INPUT_SIZE = 500 * 1024; // 500KB guard

function extractPreserved(src: string): { text: string; preserved: string[] } {
  const preserved: string[] = [];
  let out = "";
  let i = 0;
  const n = src.length;
  while (i < n) {
    const c = src[i];
    const next = i + 1 < n ? src[i + 1] : "";
    // Line comment (must check before strings so // inside strings is safe — strings are tokenized first per position)
    if (c === "/" && next === "/") {
      let j = i + 2;
      while (j < n && src[j] !== "\n") j++;
      const idx = preserved.length;
      preserved.push(src.slice(i, j));
      out += `__JS_PRESERVED_${idx}__`;
      i = j;
      continue;
    }
    // Block comment
    if (c === "/" && next === "*") {
      const end = src.indexOf("*/", i + 2);
      const j = end === -1 ? n : end + 2;
      const idx = preserved.length;
      preserved.push(src.slice(i, j));
      out += `__JS_PRESERVED_${idx}__`;
      i = j;
      continue;
    }
    // String or template literal (handles escapes)
    if (c === "'" || c === '"' || c === "`") {
      const quote = c;
      let j = i + 1;
      while (j < n) {
        if (src[j] === "\\") {
          j += 2;
          continue;
        }
        if (src[j] === quote) {
          j++;
          break;
        }
        j++;
      }
      const idx = preserved.length;
      preserved.push(src.slice(i, Math.min(j, n)));
      out += `__JS_PRESERVED_${idx}__`;
      i = Math.min(j, n);
      continue;
    }
    out += c;
    i++;
  }
  return { text: out, preserved };
}

function restorePreserved(s: string, preserved: string[]): string {
  return s.replace(/__JS_PRESERVED_(\d+)__/g, (_, idx) => preserved[Number(idx)] ?? "");
}

function beautifyJs(js: string): string {
  if (!js.trim()) return "";

  // Protect strings/comments so { ; } inside them don't affect indentation
  const { text, preserved } = extractPreserved(js);

  // Simple indent: split on { ; } and newlines
  const normalized = text
    .replace(/\r\n/g, "\n")
    .replace(/\s*{\s*/g, " {\n")
    .replace(/\s*}\s*/g, "\n}\n")
    .replace(/\s*;\s*/g, ";\n")
    .trim();

  const lines = normalized.split("\n");
  let indent = 0;
  const out: string[] = [];

  for (const raw of lines) {
    const line = raw.trim();
    if (!line) continue;

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

  let result = restorePreserved(out.join("\n"), preserved);

  // Clean up trailing spaces and excess blank lines
  result = result
    .replace(/[ \t]+$/gm, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  return result;
}

function minifyJs(js: string): string {
  if (!js.trim()) return "";

  // Preserve strings, strip comments
  const strings: string[] = [];
  let noComments = "";
  let i = 0;
  const n = js.length;
  while (i < n) {
    const c = js[i];
    const next = i + 1 < n ? js[i + 1] : "";
    if (c === "/" && next === "/") {
      let j = i + 2;
      while (j < n && js[j] !== "\n") j++;
      noComments += "\n";
      i = j;
      continue;
    }
    if (c === "/" && next === "*") {
      const end = js.indexOf("*/", i + 2);
      i = end === -1 ? n : end + 2;
      noComments += " ";
      continue;
    }
    if (c === "'" || c === '"' || c === "`") {
      const quote = c;
      let j = i + 1;
      while (j < n) {
        if (js[j] === "\\") {
          j += 2;
          continue;
        }
        if (js[j] === quote) {
          j++;
          break;
        }
        j++;
      }
      const idx = strings.length;
      strings.push(js.slice(i, Math.min(j, n)));
      noComments += `__JS_STR_${idx}__`;
      i = Math.min(j, n);
      continue;
    }
    noComments += c;
    i++;
  }

  const minified = noComments
    .replace(/\s+/g, " ")
    .replace(/\s*([{};:(),[\]])\s*/g, "$1")
    .replace(/;}/g, "}")
    .trim();

  return minified.replace(/__JS_STR_(\d+)__/g, (_, idx) => strings[Number(idx)] ?? "");
}

export default function JsBeautifierTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const handleFormat = () => {
    if (!input.trim()) {
      setError("Please enter JavaScript to format.");
      setOutput("");
      return;
    }
    if (input.length > MAX_INPUT_SIZE) {
      setError(`Input too large — max 500KB (${MAX_INPUT_SIZE.toLocaleString()} chars).`);
      setOutput("");
      return;
    }
    setError("");
    setCopied(false);
    setOutput(beautifyJs(input));
  };

  const handleMinify = () => {
    if (!input.trim()) {
      setError("Please enter JavaScript to minify.");
      setOutput("");
      return;
    }
    if (input.length > MAX_INPUT_SIZE) {
      setError(`Input too large — max 500KB (${MAX_INPUT_SIZE.toLocaleString()} chars).`);
      setOutput("");
      return;
    }
    setError("");
    setCopied(false);
    setOutput(minifyJs(input));
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
        JS Beautifier
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Format JavaScript with brace-based indentation (2 spaces) or minify by collapsing whitespace. Strings and comments are preserved on
        beautify. Max input 500KB.
      </Typography>

      <TextField
        label="Input JavaScript"
        multiline
        minRows={8}
        fullWidth
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={'function greet(name){const msg="Hello, "+name; // comment\nreturn msg;}'}
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
        <Button variant="outlined" startIcon={<ContentCopyIcon />} onClick={handleCopy} disabled={!output}>
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
        </Stack>
      )}
    </ToolPaper>
  );
}

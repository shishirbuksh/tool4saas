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
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";

function getIndent(line: string): number {
  const m = line.match(/^ */);
  return m ? m[0].length : 0;
}

function parseScalar(raw: string): unknown {
  const s = raw.trim();
  if (s === "" || s === "null" || s === "~" || s === "Null" || s === "NULL") return null;
  if (s === "true" || s === "True" || s === "TRUE") return true;
  if (s === "false" || s === "False" || s === "FALSE") return false;
  // quoted strings
  if ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))) {
    // handle single quotes: '' is escaped single quote in YAML
    if (s.startsWith("'")) return s.slice(1, -1).replace(/''/g, "'");
    // double quoted - unescape basic sequences
    const inner = s.slice(1, -1);
    return inner
      .replace(/\\n/g, "\n")
      .replace(/\\t/g, "\t")
      .replace(/\\"/g, '"')
      .replace(/\\\\/g, "\\");
  }
  // numbers
  if (/^-?\d+$/.test(s)) {
    const n = Number(s);
    if (Number.isSafeInteger(n)) return n;
    return n;
  }
  if (/^-?\d*\.\d+([eE][-+]?\d+)?$/.test(s) || /^-?\d+[eE][-+]?\d+$/.test(s)) {
    const n = Number(s);
    if (!Number.isNaN(n)) return n;
  }
  return s;
}

function parseYaml(yaml: string): unknown {
  const lines = yaml.split("\n");
  let idx = 0;

  const peekNextIndent = (): number | null => {
    for (let j = idx; j < lines.length; j++) {
      const l = lines[j];
      if (l.trim() === "" || l.trim().startsWith("#")) continue;
      return getIndent(l);
    }
    return null;
  };

  const parseBlock = (indent: number): unknown => {
    // skip empty/comments
    while (idx < lines.length && (lines[idx].trim() === "" || lines[idx].trim().startsWith("#"))) idx++;
    if (idx >= lines.length) return null;

    const firstIndent = getIndent(lines[idx]);
    if (firstIndent !== indent) {
      // if first block and indent mismatch, treat as indent error unless we are at nested level where firstIndent > indent
      // allow if firstIndent > indent at top-level call handled by caller; otherwise error
      if (firstIndent < indent) return null;
    }

    const firstTrim = lines[idx].trim();
    const isArray = firstTrim.startsWith("-");

    if (isArray) {
      const arr: unknown[] = [];
      while (idx < lines.length) {
        // skip empties
        while (idx < lines.length && (lines[idx].trim() === "" || lines[idx].trim().startsWith("#"))) idx++;
        if (idx >= lines.length) break;
        const curIndent = getIndent(lines[idx]);
        if (curIndent < indent) break;
        if (curIndent > indent) {
          throw new Error(`Unexpected indentation at line ${idx + 1}: "${lines[idx]}"`);
        }
        const trimmed = lines[idx].trim();
        if (!trimmed.startsWith("-")) break;
        // ensure dash followed by space or end
        const afterDash = trimmed.slice(1);
        if (afterDash.length > 0 && afterDash[0] !== " " && afterDash[0] !== "\t") {
          // In YAML, "-" must be followed by space to denote list item; treat as error if not but allow?
          // We'll require space or empty
          throw new Error(`Invalid list item at line ${idx + 1}: "${lines[idx]}"`);
        }
        const content = trimmed.slice(1).trim();

        if (content === "") {
          idx++;
          const nextIndent = peekNextIndent();
          if (nextIndent !== null && nextIndent > indent) {
            arr.push(parseBlock(nextIndent));
          } else {
            arr.push(null);
          }
        } else {
          // check if content is an inline object start: "key: value"
          const colonIdx = content.indexOf(":");
          // distinguish scalar containing colon vs key: value
          // if colon exists and before colon there is no space that would imply scalar? But YAML key: value always has colon
          // We'll treat as object if colonIdx !== -1 and (colonIdx === content.length -1 || content[colonIdx+1]===" " || content[colonIdx+1]==="\t")
          // and key part looks like a valid key (no leading dash)
          const isKeyValue =
            colonIdx !== -1 &&
            (colonIdx === content.length - 1 || content[colonIdx + 1] === " " || content[colonIdx + 1] === "\t");

          if (isKeyValue) {
            const obj: Record<string, unknown> = {};
            const key = content.slice(0, colonIdx).trim();
            const valStr = content.slice(colonIdx + 1).trim();

            if (!key) throw new Error(`Missing key at line ${idx + 1}`);

            if (valStr === "") {
              idx++;
              const nextIndent = peekNextIndent();
              if (nextIndent !== null && nextIndent > indent) {
                obj[key] = parseBlock(nextIndent);
              } else {
                obj[key] = null;
              }
            } else {
              obj[key] = parseScalar(valStr);
              idx++;
            }

            // consume following indented keys belonging to this object (indent + 2)
            while (idx < lines.length) {
              // peek
              while (idx < lines.length && (lines[idx].trim() === "" || lines[idx].trim().startsWith("#"))) idx++;
              if (idx >= lines.length) break;
              const peekIndent = getIndent(lines[idx]);
              if (peekIndent <= indent) break;
              const peekTrim = lines[idx].trim();
              if (peekTrim.startsWith("-")) break;
              if (peekIndent !== indent + 2) {
                // If deeper than expected, it should have been handled as nested block above; break
                // Also allow inconsistent indent error
                if (peekIndent > indent + 2) {
                  throw new Error(`Unexpected indentation at line ${idx + 1}: "${lines[idx]}"`);
                }
                break;
              }
              const cIdx = peekTrim.indexOf(":");
              if (cIdx === -1) throw new Error(`Invalid YAML: missing ':' at line ${idx + 1}: "${lines[idx]}"`);
              const k = peekTrim.slice(0, cIdx).trim();
              const v = peekTrim.slice(cIdx + 1).trim();
              if (!k) throw new Error(`Missing key at line ${idx + 1}`);
              if (v === "") {
                idx++;
                const nIndent = peekNextIndent();
                if (nIndent !== null && nIndent > peekIndent) {
                  obj[k] = parseBlock(nIndent);
                } else {
                  obj[k] = null;
                }
              } else {
                obj[k] = parseScalar(v);
                idx++;
              }
            }
            arr.push(obj);
          } else {
            // scalar list item
            arr.push(parseScalar(content));
            idx++;
            // Check if next line is indented continuation? Not handling folded scalars for simplicity.
          }
        }
      }
      return arr;
    } else {
      // object block
      const obj: Record<string, unknown> = {};
      while (idx < lines.length) {
        while (idx < lines.length && (lines[idx].trim() === "" || lines[idx].trim().startsWith("#"))) idx++;
        if (idx >= lines.length) break;
        const curIndent = getIndent(lines[idx]);
        if (curIndent < indent) break;
        if (curIndent > indent) {
          throw new Error(`Unexpected indentation at line ${idx + 1}: "${lines[idx]}"`);
        }
        const trimmed = lines[idx].trim();
        if (trimmed.startsWith("-")) break;
        const colonIdx = trimmed.indexOf(":");
        if (colonIdx === -1) {
          throw new Error(`Invalid YAML: missing ':' at line ${idx + 1}: "${lines[idx]}"`);
        }
        const key = trimmed.slice(0, colonIdx).trim();
        const valStr = trimmed.slice(colonIdx + 1).trim();
        if (!key) throw new Error(`Missing key at line ${idx + 1}`);
        // validation: 2-space indentation enforced for nesting
        if (valStr === "") {
          idx++;
          const nextIndent = peekNextIndent();
          if (nextIndent !== null && nextIndent > indent) {
            if (nextIndent !== indent + 2) {
              throw new Error(`Invalid indentation: expected 2 spaces at line ${idx + 1}, got ${nextIndent - indent}`);
            }
            obj[key] = parseBlock(nextIndent);
          } else {
            obj[key] = null;
          }
        } else {
          obj[key] = parseScalar(valStr);
          idx++;
        }
      }
      return obj;
    }
  };

  // handle empty input
  if (yaml.trim() === "") return null;
  // handle document separators --- not needed

  const firstNonEmpty = lines.findIndex((l) => l.trim() !== "" && !l.trim().startsWith("#"));
  if (firstNonEmpty === -1) return null;

  // Validate indentation uses 2 spaces (warn but allow); we enforce nested is multiple of 2
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i];
    if (l.trim() === "" || l.trim().startsWith("#")) continue;
    const ind = getIndent(l);
    if (ind % 2 !== 0) {
      throw new Error(`Invalid indentation at line ${i + 1}: indentation must be 2 spaces (got ${ind})`);
    }
  }

  idx = firstNonEmpty;
  const result = parseBlock(getIndent(lines[firstNonEmpty]));
  // check for trailing content not consumed at root indent level
  while (idx < lines.length && (lines[idx].trim() === "" || lines[idx].trim().startsWith("#"))) idx++;
  if (idx < lines.length) {
    throw new Error(`Unexpected content at line ${idx + 1}: "${lines[idx]}"`);
  }
  return result ?? {};
}

export default function YamlToJsonTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const copy = (v: string) => v && void import("@/lib/clipboard").then((m) => m.copyToClipboard(v));

  const convert = () => {
    setError("");
    setOutput("");
    if (!input.trim()) {
      setError("Please enter YAML");
      return;
    }
    if (input.length > 500_000) {
      setError("Input too large (max 500 KB)");
      return;
    }
    try {
      const parsed = parseYaml(input);
      setOutput(JSON.stringify(parsed, null, 2));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Invalid YAML");
    }
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setError("");
  };

  return (
    <ToolPaper>
      <Typography variant="h6" sx={{ fontWeight: 700 }}>
        YAML to JSON
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Paste YAML (2-space indentation) and convert to JSON. Supports key: value, lists with &quot;-&quot;, nested objects/arrays, strings, numbers, booleans and null.
      </Typography>
      <TextField
        label="YAML Input"
        multiline
        minRows={8}
        fullWidth
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={`name: Ada\nage: 30\nactive: true\nroles:\n  - admin\n  - editor\naddress:\n  city: Paris\n  zip: 75001`}
        slotProps={{ input: { spellCheck: false, autoComplete: "off" } }}
        sx={{ fontFamily: "monospace" }}
      />
      <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: "wrap" }}>
        <Button variant="contained" startIcon={<SwapHorizIcon />} onClick={convert} disabled={!input}>
          Convert to JSON
        </Button>
        <Button variant="outlined" onClick={handleClear} disabled={!input && !output && !error}>
          Clear
        </Button>
        <Button variant="outlined" startIcon={<ContentCopyIcon />} onClick={() => copy(output)} disabled={!output}>
          Copy JSON
        </Button>
      </Stack>
      {error && <Alert severity="error">{error}</Alert>}
      {output && (
        <Box>
          <Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between", mb: 1 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
              JSON Output
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
            slotProps={{ input: { readOnly: true, spellCheck: false, autoComplete: "off", "aria-label": "JSON Output" } }}
            sx={{ "& textarea": { fontFamily: "monospace", fontSize: 13 } }}
          />
        </Box>
      )}
    </ToolPaper>
  );
}

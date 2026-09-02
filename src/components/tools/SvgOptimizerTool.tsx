"use client";

import { useState } from "react";
import ToolPaper from "@/components/ToolPaper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import { copyToClipboard } from "@/lib/clipboard";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";

function optimizeSvg(svg: string): string {
  let out = svg;
  // strip XML/HTML comments
  out = out.replace(/<!--[\s\S]*?-->/g, "");
  // collapse whitespace between tags: >   < => ><
  out = out.replace(/>\s+</g, "><");
  // remove empty attributes like attr="" or attr=''
  out = out.replace(/\s+[a-zA-Z_:][\w:.-]*\s*=\s*(""|'')/g, "");
  // shorten hex colors #aabbcc -> #abc (only when each pair matches)
  out = out.replace(
    /#([0-9a-fA-F])\1([0-9a-fA-F])\2([0-9a-fA-F])\3(?=[^0-9a-fA-F])/g,
    "#$1$2$3"
  );
  // trim outer whitespace
  out = out.trim();
  // remove whitespace before self-closing />
  out = out.replace(/\s+\/>/g, "/>");
  // collapse 2+ whitespace characters to single space
  out = out.replace(/\s{2,}/g, " ");
  return out;
}

function sanitizeSvg(svg: string): string {
  let s = svg;
  // --- Regex pre-sanitization (covers unquoted attributes, foreignObject, style javascript:) ---
  // remove script tags
  s = s.replace(/<script[\s\S]*?<\/script>/gi, "");
  // remove iframe/object/embed/foreignObject/link/meta/style blocks that may contain active content
  s = s.replace(/<iframe[\s\S]*?<\/iframe>/gi, "");
  s = s.replace(/<object[\s\S]*?<\/object>/gi, "");
  s = s.replace(/<embed[^>]*\/?>/gi, "");
  s = s.replace(/<foreignObject[\s\S]*?<\/foreignObject>/gi, "");
  s = s.replace(/<link[^>]*\/?>/gi, "");
  s = s.replace(/<meta[^>]*\/?>/gi, "");
  s = s.replace(/<style[\s\S]*?<\/style>/gi, "");
  // remove on* event handler attributes (quoted, single-quoted, or unquoted)
  s = s.replace(/\s+on\w+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, "");
  // neutralize javascript: urls in href/src/xlink:href/action/formaction - quoted
  s = s.replace(
    /\s+(href|xlink:href|src|action|formaction)\s*=\s*("|')\s*javascript:[^"']*\2/gi,
    ""
  );
  // neutralize javascript: urls unquoted
  s = s.replace(/\s+(href|xlink:href|src|action|formaction)\s*=\s*javascript:[^\s>]+/gi, "");
  // neutralize data:text/html urls quoted
  s = s.replace(/\s+(href|xlink:href|src)\s*=\s*("|')\s*data:text\/html[^"']*\2/gi, "");
  // neutralize data:text/html urls unquoted
  s = s.replace(/\s+(href|xlink:href|src)\s*=\s*data:text\/html[^\s>]+/gi, "");
  // remove style attributes containing javascript:, expression(, -moz-binding, behaviour, vbscript:
  s = s.replace(/\s+style\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, (m) => {
    if (/javascript:|expression\s*\(|-moz-binding|behaviour|vbscript:/i.test(m)) return "";
    return m;
  });
  // remove xmlns with javascript/data URIs
  s = s.replace(/\s+xmlns\s*=\s*("[^"]*javascript:[^"]*"|'[^']*javascript:[^']*'|[^\s>]*javascript:[^\s>]*)/gi, "");

  // --- DOMParser based sanitization for deeper tree walk ---
  if (typeof DOMParser !== "undefined" && typeof XMLSerializer !== "undefined") {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(s, "image/svg+xml");
      if (doc.querySelector("parsererror")) {
        return s;
      }
      const dangerousTags = ["script", "iframe", "object", "embed", "foreignObject", "link", "meta", "style"];
      dangerousTags.forEach((tag) => {
        doc.querySelectorAll(tag).forEach((el) => el.remove());
      });
      const all = doc.querySelectorAll("*");
      all.forEach((el) => {
        [...el.attributes].forEach((attr) => {
          const name = attr.name.toLowerCase();
          const value = attr.value;
          const lowerVal = value.trim().toLowerCase();
          if (name.startsWith("on")) {
            el.removeAttribute(attr.name);
          } else if (["href", "xlink:href", "src", "action", "formaction"].includes(name)) {
            if (
              lowerVal.startsWith("javascript:") ||
              lowerVal.startsWith("data:text/html") ||
              lowerVal.startsWith("vbscript:")
            ) {
              el.removeAttribute(attr.name);
            }
          } else if (name === "style") {
            if (/javascript:|expression\s*\(|-moz-binding|behaviour|vbscript:/i.test(value)) {
              el.removeAttribute(attr.name);
            }
          } else if (name === "href" || name.includes("href")) {
            if (/javascript:/i.test(value) || /data:text\/html/i.test(value)) {
              el.removeAttribute(attr.name);
            }
          }
        });
      });
      const svgEl = doc.documentElement;
      if (!svgEl || svgEl.nodeName.toLowerCase() === "parsererror") return s;
      return new XMLSerializer().serializeToString(svgEl);
    } catch {
      return s;
    }
  }
  return s;
}

function byteLength(str: string): number {
  if (typeof TextEncoder !== "undefined") {
    return new TextEncoder().encode(str).length;
  }
  return new Blob([str]).size;
}

export default function SvgOptimizerTool() {
  const [input, setInput] = useState(
    `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="" >\n  <!-- This is a comment -->\n  <rect width="100" height="100" fill="#ff0000" stroke="" />\n  <circle cx="50" cy="50" r="40" fill="#112233" />\n</svg>`
  );
  const [optimized, setOptimized] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const handleOptimize = () => {
    setCopied(false);
    if (!input.trim()) {
      setError("Please paste SVG markup to optimize.");
      setOptimized("");
      return;
    }
    if (input.length > 500_000) {
      setError("Input too large (max 500 KB).");
      return;
    }
    setError("");
    const result = optimizeSvg(input);
    setOptimized(result);
  };

  const handleClear = () => {
    setInput("");
    setOptimized("");
    setError("");
    setCopied(false);
  };

  const handleCopy = async () => {
    if (!optimized) return;
    const ok = await copyToClipboard(optimized);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const originalBytes = input ? byteLength(input) : 0;
  const optimizedBytes = optimized ? byteLength(optimized) : 0;
  const savedPercent =
    originalBytes > 0 && optimized
      ? (((originalBytes - optimizedBytes) / originalBytes) * 100).toFixed(1)
      : "0";
  const savedBytes = originalBytes - optimizedBytes;

  const sanitizedPreview = optimized ? sanitizeSvg(optimized) : "";

  return (
    <ToolPaper>
      <Typography variant="h6" sx={{ fontWeight: 700 }}>
        SVG Optimizer
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Paste SVG code, strip comments, collapse whitespace, remove empty attributes and shorten
        hex colors. Preview is sanitized before rendering.
      </Typography>

      <TextField
        label="SVG Input"
        multiline
        minRows={8}
        fullWidth
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={`<svg xmlns="http://www.w3.org/2000/svg"><rect fill="#ff0000" /></svg>`}
        slotProps={{ input: { spellCheck: false, autoComplete: "off" } }}
        sx={{ fontFamily: "monospace", "& textarea": { fontFamily: "monospace", fontSize: 13 } }}
      />

      <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: "wrap" }}>
        <Button variant="contained" startIcon={<AutoFixHighIcon />} onClick={handleOptimize}>
          Optimize
        </Button>
        <Button variant="outlined" onClick={handleClear}>
          Clear
        </Button>
        <Button
          variant="outlined"
          startIcon={<ContentCopyIcon />}
          onClick={handleCopy}
          disabled={!optimized}
        >
          Copy Optimized
        </Button>
      </Stack>

      {error && <Alert severity="error">{error}</Alert>}
      {copied && <Alert severity="success">Copied to clipboard!</Alert>}

      {optimized && (
        <Stack spacing={2}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1}
            sx={{ alignItems: { sm: "center" }, justifyContent: "space-between" }}
          >
            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
              Optimized SVG
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ fontFamily: "monospace" }}>
              {originalBytes} → {optimizedBytes} bytes
              {savedBytes >= 0 ? ` · saved ${savedBytes} bytes (${savedPercent}%)` : ""}
            </Typography>
          </Stack>

          <Alert severity="info" sx={{ fontFamily: "monospace", fontSize: 13 }}>
            Original: {originalBytes} bytes · Optimized: {optimizedBytes} bytes · Saved:{" "}
            {savedPercent}% ({savedBytes} bytes)
          </Alert>

          <TextField
            value={optimized}
            multiline
            minRows={8}
            fullWidth
            slotProps={{
              input: { readOnly: true, "aria-label": "Optimized SVG", spellCheck: false, autoComplete: "off" },
            }}
            sx={{ "& textarea": { fontFamily: "monospace", fontSize: 13 } }}
          />

          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
              Preview (sanitized)
            </Typography>
            <Box
              sx={{
                p: 2,
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 2,
                bgcolor: "background.paper",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: 120,
                overflow: "auto",
                "& svg": { maxWidth: "100%", maxHeight: 280 },
              }}
              // sanitized SVG rendered safely
              dangerouslySetInnerHTML={{ __html: sanitizedPreview }}
            />
            {!sanitizedPreview.trim() && (
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: "block" }}>
                No preview available for empty output.
              </Typography>
            )}
          </Box>
        </Stack>
      )}

      {!optimized && !error && (
        <Box
          sx={{
            p: 2,
            border: "1px dashed",
            borderColor: "divider",
            borderRadius: 2,
            textAlign: "center",
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Preview will appear here after optimization. Dangerous content like scripts and event
            handlers is stripped before rendering.
          </Typography>
          {input.trim().startsWith("<svg") || input.includes("<svg") ? (
            <Box
              sx={{
                mt: 2,
                p: 2,
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: 80,
                overflow: "auto",
                "& svg": { maxWidth: "100%", maxHeight: 200 },
              }}
              dangerouslySetInnerHTML={{ __html: sanitizeSvg(input) }}
            />
          ) : null}
        </Box>
      )}
    </ToolPaper>
  );
}

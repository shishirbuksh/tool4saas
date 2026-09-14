"use client";

import { useEffect, useState } from "react";
import ToolPaper from "@/components/ToolPaper";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Alert from "@mui/material/Alert";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { runRegexInWorker, terminateRegexWorker } from "@/lib/regexWorker";

// Exported pure function for testing and reusability – O(n) via parts array + join
export function findReplaceNonRegex(
  text: string,
  find: string,
  replace: string,
  matchCase: boolean
): string {
  // Edge: find="" must return original text to avoid infinite loop and O(n²) blowup
  if (!find || find.length === 0) return text;
  if (!text) return "";
  // Handle 1M+ chars efficiently with O(n) parts array (avoids repeated string concat O(n²))
  const f = matchCase ? find : find.toLowerCase();
  const t = matchCase ? text : text.toLowerCase();
  const flen = find.length;
  const parts: string[] = [];
  let i = 0;
  // Use indexOf loop with parts push; guarantees linear time for 1M chars
  while (i < text.length) {
    const idx = t.indexOf(f, i);
    if (idx === -1) {
      parts.push(text.slice(i));
      break;
    }
    // push slice before match and replacement
    parts.push(text.slice(i, idx));
    parts.push(replace);
    i = idx + flen;
    // Safety: ensure progress even if find length 0 (already handled)
    if (flen === 0) break;
  }
  return parts.join("");
}

export default function TextFindReplaceTool() {
  const [text, setText] = useState("");
  const [find, setFind] = useState("");
  const [replace, setReplace] = useState("");
  const [useRegex, setUseRegex] = useState(false);
  const [matchCase, setMatchCase] = useState(false);
  const [result, setResult] = useState("");
  const [regexError, setRegexError] = useState("");
  const [isOffline, setIsOffline] = useState(false);
  const [isSecureContextState, setIsSecureContextState] = useState(true);

  // Offline and isSecureContext handling
  useEffect(() => {
    const updateOffline = () => {
      if (typeof navigator !== "undefined") setIsOffline(!navigator.onLine);
    };
    const updateSecure = () => {
      if (typeof window !== "undefined") setIsSecureContextState(!!window.isSecureContext);
    };
    updateOffline();
    updateSecure();
    window.addEventListener("online", updateOffline);
    window.addEventListener("offline", updateOffline);
    return () => {
      window.removeEventListener("online", updateOffline);
      window.removeEventListener("offline", updateOffline);
    };
  }, []);

  // Ensure worker URL revoked on unmount (global revokeObjectURL ledger)
  useEffect(() => {
    return () => {
      try {
        terminateRegexWorker();
      } catch {}
    };
  }, []);

  useEffect(() => {
    if (!text) {
      setResult("");
      setRegexError("");
      return;
    }
    // Handle find="" edge – avoid infinite loop, return original text
    if (!find || find.length === 0) {
      setResult(text);
      setRegexError("");
      return;
    }
    // Handle 1M chars performance: guard huge inputs gracefully, still O(n) for 1M
    if (text.length > 5_000_000) {
      setRegexError("Text too long (max 5M chars). Trim input.");
      setResult(text);
      return;
    }
    if (find.length > 1000) {
      setRegexError("Find pattern too long (max 1000 chars).");
      setResult(text);
      return;
    }
    if (!useRegex) {
      // Non-regex path is safe sync (no ReDoS) – O(n) via parts array + join
      try {
        const out = findReplaceNonRegex(text, find, replace, matchCase);
        setResult(out);
        setRegexError("");
      } catch (e) {
        setResult(text);
        setRegexError(String((e as Error)?.message || e));
      }
      return;
    }
    // Regex path: run in Worker with 1s timeout – requires CSP worker-src blob:
    // Worker handles offline fine (blob URL worker, no network), check isSecureContext not required for Worker
    let cancelled = false;
    const flags = matchCase ? "g" : "gi";
    runRegexInWorker({ type: "test", pattern: find, flags, text, replace, mode: "replace" } as any, 1000).then((res) => {
      if (cancelled) return;
      if (res.ok) {
        setResult((res as any).result ?? text);
        setRegexError("");
      } else {
        setResult(text);
        setRegexError(res.error);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [text, find, replace, useRegex, matchCase]);

  const copy = (v: string) => {
    if (!v) return;
    // isSecureContext handling: clipboard lib already falls back to execCommand when not secure or NotAllowedError
    const isSecure =
      typeof window !== "undefined"
        ? (window as unknown as { isSecureContext?: boolean }).isSecureContext !== false
        : true;
    // Still attempt copy; library handles both secure and non-secure contexts
    void import("@/lib/clipboard").then((m) => m.copyToClipboard(v));
    // Optional: could show message if not secure, but we proceed with fallback
    void isSecure;
  };

  return (
    <ToolPaper>
        {isOffline && (
          <Alert severity="info">
            You are offline — find & replace runs entirely in your browser and works without an internet connection.
          </Alert>
        )}
        {!isSecureContextState && (
          <Alert severity="info">
            Non-secure context detected — clipboard copy will use fallback (execCommand). All replacement still works offline.
          </Alert>
        )}
        <TextField
          label="Your text"
          multiline
          minRows={6}
          fullWidth
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste the text you want to edit…"
          slotProps={{ input: { spellCheck: true, autoComplete: "off" } }}
          helperText={`${text.length.toLocaleString()} chars ${text.length > 1_000_000 ? "— large input handled with O(n) algorithm" : ""}`}
        />
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <TextField
            label="Find"
            fullWidth
            value={find}
            onChange={(e) => setFind(e.target.value)}
            slotProps={{ input: { spellCheck: false, autoComplete: "off" } }}
            helperText={find.length === 0 ? "Enter text to find (empty = no replacement)" : undefined}
          />
          <TextField
            label="Replace with"
            fullWidth
            value={replace}
            onChange={(e) => setReplace(e.target.value)}
            slotProps={{ input: { spellCheck: false, autoComplete: "off" } }}
          />
        </Stack>
        <Stack direction="row" spacing={3} sx={{ flexWrap: "wrap" }}>
          <FormControlLabel
            control={<Checkbox checked={useRegex} onChange={(e) => setUseRegex(e.target.checked)} />}
            label="Use regular expression"
          />
          <FormControlLabel
            control={<Checkbox checked={matchCase} onChange={(e) => setMatchCase(e.target.checked)} />}
            label="Match case"
          />
        </Stack>
        {regexError && <Alert severity="error">{regexError}</Alert>}
        <Stack direction="row" spacing={1}>
          <Button variant="contained" onClick={() => setText(result)} disabled={!result}>
            Replace in text
          </Button>
          <Button
            variant="outlined"
            startIcon={<ContentCopyIcon />}
            onClick={() => copy(result)}
            disabled={!result}
          >
            Copy result
          </Button>
        </Stack>
        <Box>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.5 }}>
            Result
          </Typography>
          <TextField
            value={result}
            multiline
            minRows={6}
            fullWidth
            slotProps={{
              input: { readOnly: true, "aria-label": "Replaced text", spellCheck: false },
            }}
          />
        </Box>
        <Typography variant="caption" color="text.secondary">
          Works offline — all processing happens locally in your browser. {isSecureContextState ? "Secure context: clipboard available." : "Non-secure context: fallback copy used."} Worker CSP: requires <code>worker-src blob:</code>.
        </Typography>
      </ToolPaper>
  );
}

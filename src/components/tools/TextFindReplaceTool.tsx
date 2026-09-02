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
import { runRegexInWorker } from "@/lib/regexWorker";

export default function TextFindReplaceTool() {
  const [text, setText] = useState("");
  const [find, setFind] = useState("");
  const [replace, setReplace] = useState("");
  const [useRegex, setUseRegex] = useState(false);
  const [matchCase, setMatchCase] = useState(false);
  const [result, setResult] = useState("");
  const [regexError, setRegexError] = useState("");

  useEffect(() => {
    if (!text) {
      setResult("");
      setRegexError("");
      return;
    }
    if (!find) {
      setResult(text);
      setRegexError("");
      return;
    }
    if (!useRegex) {
      // Non-regex path is safe sync (no ReDoS)
      const f = matchCase ? find : find.toLowerCase();
      const t = matchCase ? text : text.toLowerCase();
      let out = "";
      let i = 0;
      while (i < text.length) {
        const idx = t.indexOf(f, i);
        if (idx === -1) {
          out += text.slice(i);
          break;
        }
        out += text.slice(i, idx) + replace;
        i = idx + find.length;
      }
      setResult(out);
      setRegexError("");
      return;
    }
    // Regex path: run in Worker with 1s timeout
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

  const copy = (v: string) => v && void import("@/lib/clipboard").then(m=>m.copyToClipboard(v));

  return (
    <ToolPaper>
        <TextField
          label="Your text"
          multiline
          minRows={6}
          fullWidth
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste the text you want to edit…"
          slotProps={{ input: { spellCheck: true, autoComplete: "off" } }}
        />
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <TextField
            label="Find"
            fullWidth
            value={find}
            onChange={(e) => setFind(e.target.value)}
            slotProps={{ input: { spellCheck: false, autoComplete: "off" } }}
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
      </ToolPaper>
  );
}

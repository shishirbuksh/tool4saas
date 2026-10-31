
import { useEffect, useState } from "react";
import ToolPaper from "@/components/ToolPaper";import { Box, TextField, Typography, Stack, FormControlLabel, Checkbox, Alert } from "@/components/ds";

import { runRegexInWorker, terminateRegexWorker } from "@/lib/regexWorker";

export default function RegexTesterTool() {
  const [pattern, setPattern] = useState("");
  const [text, setText] = useState("");
  const [flags, setFlags] = useState({ g: true, i: false, m: false, s: false });
  const [error, setError] = useState("");
  const [matches, setMatches] = useState<{ value: string; index: number }[]>([]);

  // Ensure worker terminated and worker URL revoked on unmount
  useEffect(() => {
    return () => {
      try {
        terminateRegexWorker();
      } catch {}
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    if (!pattern) {
      setError("");
      setMatches([]);
      return;
    }
    const f = `${flags.g ? "g" : ""}${flags.i ? "i" : ""}${flags.m ? "m" : ""}${flags.s ? "s" : ""}`;
    // Run in Worker with 1s timeout to mitigate ReDoS; heuristic fallback inside worker
    runRegexInWorker({ type: "test", pattern, flags: f, text, mode: "match" }, 1000).then((res) => {
      if (cancelled) return;
      if (res.ok) {
        setError("");
        setMatches(res.matches ?? []);
      } else {
        setError(res.error);
        setMatches([]);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [pattern, text, flags]);

  const toggle = (k: keyof typeof flags) => setFlags((p) => ({ ...p, [k]: !p[k] }));

  return (
    <ToolPaper>
        <TextField
          label="Regular expression"
          fullWidth
          value={pattern}
          onChange={(e) => setPattern(e.target.value)}
          placeholder="e.g. (\w+)@(\w+)…"
          slotProps={{ input: { spellCheck: false, autoComplete: "off" } }}
          
          error={!!error}
          helperText={error || "Enter a JavaScript-style regex pattern."}
        />
        <Stack direction="row" spacing={3} className="flex-wrap">
          {(["g", "i", "m", "s"] as const).map((k) => (
            <FormControlLabel
              key={k}
              control={<Checkbox checked={flags[k]} onChange={() => toggle(k)} />}
              label={`/${k}`}
            />
          ))}
        </Stack>
        <TextField
          label="Test string"
          multiline
          minRows={5}
          fullWidth
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste the text to test against…"
          slotProps={{ input: { spellCheck: false, autoComplete: "off" } }}
          
        />
        <Box>
          <Typography variant="subtitle2" className="font-bold mb-2">
            Matches ({matches.length})
          </Typography>
          {matches.length === 0 ? (
            <Typography variant="body2" color="text.secondary">
              No matches yet.
            </Typography>
          ) : (
            <Stack spacing={1}>
              {matches.slice(0, 100).map((m, i) => (
                <Box
                  key={i}
                  className="p-3 rounded-[16px] border border-base-300 text-[14px] overflow-x-auto" style={{ fontFamily: "monospace" }}
                >
                  <Typography component="span" variant="caption" color="text.secondary">
                    #{i + 1} @ {m.index}:{" "}
                  </Typography>
                  {m.value || "(empty)"}
                </Box>
              ))}
              {matches.length > 100 && (
                <Alert severity="warning">
                  Showing first 100 matches out of {matches.length}
                </Alert>
              )}
            </Stack>
          )}
        </Box>
      </ToolPaper>
  );
}


import { useState } from "react";
import ToolPaper from "@/components/ToolPaper";import { Box, Button, Typography, Stack } from "@/components/ds";

import { ContentCopy as ContentCopyIcon } from "@/components/ds/icons";

type Outcome = "Heads" | "Tails";

const BEST_OF_OPTIONS = [3, 5, 7] as const;

export default function CoinFlipTool() {
  const [result, setResult] = useState<Outcome | null>(null);
  const [history, setHistory] = useState<Outcome[]>([]);
  const [bestOf, setBestOf] = useState<number>(5);
  const copy = (v: string) => v && void import("@/lib/clipboard").then(m=>m.copyToClipboard(v));

  const flip = () => {
    const outcomes = ["Heads", "Tails"] as const;
    const buf = new Uint32Array(1);
    crypto.getRandomValues(buf);
    const next = outcomes[buf[0] % 2];
    setResult(next);
    setHistory((h) => [...h, next].slice(-50));
  };

  const heads = history.filter((h) => h === "Heads").length;
  const tails = history.length - heads;

  const currentStreak = (() => {
    if (history.length === 0) return null;
    const last = history[history.length - 1];
    let n = 0;
    for (let i = history.length - 1; i >= 0 && history[i] === last; i--) n++;
    return { side: last, count: n };
  })();

  const longestStreak = (() => {
    let best = 0;
    let run = 0;
    let prev: Outcome | null = null;
    for (const h of history) {
      run = h === prev ? run + 1 : 1;
      prev = h;
      if (run > best) best = run;
    }
    return best;
  })();

  const window_ = history.slice(-bestOf);
  const wHeads = window_.filter((h) => h === "Heads").length;
  const wTails = window_.length - wHeads;
  const needed = Math.floor(bestOf / 2) + 1;
  const winner =
    wHeads >= needed ? "Heads" : wTails >= needed ? "Tails" : null;

  return (
    <ToolPaper>
      <Stack spacing={2} className="items-center">
        <Typography variant="h2" className="font-extrabold" style={{ fontFamily: "sans-serif" }}>
          {result ?? "—"}
        </Typography>
        <Button variant="contained" onClick={flip}>
          Flip
        </Button>
        <Stack direction="row" spacing={1} className="items-center">
          <Typography variant="body2" color="text.secondary">
            Best of
          </Typography>
          {BEST_OF_OPTIONS.map((n) => (
            <Button
              key={n}
              size="small"
              variant={bestOf === n ? "contained" : "outlined"}
              onClick={() => setBestOf(n)}
            >
              {n}
            </Button>
          ))}
        </Stack>
        {history.length > 0 && (
          <Typography variant="body2" color="text.secondary">
            Best-of-{bestOf} (last {window_.length}): Heads {wHeads} – Tails {wTails}
            {winner ? ` → ${winner} wins` : ""}
          </Typography>
        )}
        {result && (
          <Button variant="outlined" onClick={() => setResult(null)} className="mt-2">
            New flip
          </Button>
        )}
        {result && (
          <Box className="mt-2 text-center">
            <Button size="small" startIcon={<ContentCopyIcon />} onClick={() => copy(result)}>
              Copy result
            </Button>
          </Box>
        )}
        {history.length > 0 && (
          <Box className="w-full mt-2">
            <Typography variant="body2" color="text.secondary" className="text-center">
              {heads} Heads · {tails} Tails
              {currentStreak ? ` · ${currentStreak.count} ${currentStreak.side} in a row` : ""}
              {longestStreak > 1 ? ` · longest run ${longestStreak}` : ""}
            </Typography>
            <Box className="max-h-[120px] overflow-auto mt-2">
              {[...history].reverse().slice(0, 20).map((h, i) => (
                <Box
                  key={i}
                  className="flex justify-between px-2 py-1 border-b border-base-300"
                >
                  <Typography variant="body2" color="text.secondary">
                    Flip {history.length - i}
                  </Typography>
                  <Typography variant="body2" className="font-bold">
                    {h}
                  </Typography>
                </Box>
              ))}
            </Box>
            <Box className="text-center mt-2">
              <Button
                size="small"
                startIcon={<ContentCopyIcon />}
                onClick={() => copy(history.join(", "))}
              >
                Copy history
              </Button>
            </Box>
          </Box>
        )}
      </Stack>
    </ToolPaper>
  );
}

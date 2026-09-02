"use client";

import { useState } from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

export default function CoinFlipTool() {
  const [result, setResult] = useState<string | null>(null);
  const copy = (v: string) => v && void import("@/lib/clipboard").then(m=>m.copyToClipboard(v));

  const flip = () => {
    const outcomes = ["Heads", "Tails"] as const;
    const buf = new Uint32Array(1);
    crypto.getRandomValues(buf);
    setResult(outcomes[buf[0] % 2]);
  };

  return (
    <Paper sx={{ p: { xs: 2, md: 4 } }} variant="outlined">
      <Stack spacing={2} sx={{ alignItems: "center" }}>
        <Typography variant="h2" sx={{ fontFamily: "sans-serif", fontWeight: 800 }}>
          {result}
        </Typography>
        <Button variant="contained" onClick={flip}>
          Flip
        </Button>
        {result && (
          <Button
            variant="outlined"
            onClick={() => setResult(null)}
            sx={{ mt: 1 }}
          >
            New flip
          </Button>
        )}
        {result && (
          <Box sx={{ mt: 1, textAlign: "center" }}>
            <Button size="small" startIcon={<ContentCopyIcon />} onClick={() => copy(result)}>
              Copy result
            </Button>
          </Box>
        )}
      </Stack>
    </Paper>
  );
}
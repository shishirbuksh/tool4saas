"use client";

import { useMemo, useState } from "react";
import ToolPaper from "@/components/ToolPaper";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

type DiffPart = { t: "same" | "add" | "del"; v: string };

function diffWords(a: string, b: string): DiffPart[] {
  const A = a.split(/(\s+)/);
  const B = b.split(/(\s+)/);

  let start = 0;
  while (start < A.length && start < B.length && A[start] === B[start]) {
    start++;
  }
  let endA = A.length - 1;
  let endB = B.length - 1;
  while (endA >= start && endB >= start && A[endA] === B[endB]) {
    endA--;
    endB--;
  }

  const midA = A.slice(start, endA + 1);
  const midB = B.slice(start, endB + 1);

  const res: DiffPart[] = [];
  for (let k = 0; k < start; k++) res.push({ t: "same", v: A[k] });

  const n = midA.length;
  const m = midB.length;
  
  if (n * m > 1000000) {
    for (let k = 0; k < n; k++) res.push({ t: "del", v: midA[k] });
    for (let k = 0; k < m; k++) res.push({ t: "add", v: midB[k] });
  } else {
    const dp: number[][] = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
    for (let i = n - 1; i >= 0; i--) {
      for (let j = m - 1; j >= 0; j--) {
        dp[i][j] = midA[i] === midB[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
      }
    }
    let i = 0;
    let j = 0;
    while (i < n && j < m) {
      if (midA[i] === midB[j]) {
        res.push({ t: "same", v: midA[i] });
        i++;
        j++;
      } else if (dp[i + 1][j] >= dp[i][j + 1]) {
        res.push({ t: "del", v: midA[i] });
        i++;
      } else {
        res.push({ t: "add", v: midB[j] });
        j++;
      }
    }
    while (i < n) res.push({ t: "del", v: midA[i++] });
    while (j < m) res.push({ t: "add", v: midB[j++] });
  }

  for (let k = endA + 1; k < A.length; k++) res.push({ t: "same", v: A[k] });
  return res;
}

export default function TextDiffTool() {
  const [a, setA] = useState("");
  const [b, setB] = useState("");

  const parts = useMemo(() => (a || b ? diffWords(a, b) : []), [a, b]);
  const added = parts.filter((p) => p.t === "add").length;
  const removed = parts.filter((p) => p.t === "del").length;

  return (
    <ToolPaper>
        <TextField
          label="Original text"
          multiline
          minRows={5}
          fullWidth
          value={a}
          onChange={(e) => setA(e.target.value)}
          placeholder="Paste the original text…"
        />
        <TextField
          label="Changed text"
          multiline
          minRows={5}
          fullWidth
          value={b}
          onChange={(e) => setB(e.target.value)}
          placeholder="Paste the modified text…"
        />
        {parts.length > 0 && (
          <Box>
            <Stack direction="row" spacing={2} sx={{ mb: 1 }}>
              <Typography variant="caption" sx={{ color: "error.main" }}>Removed: {removed}</Typography>
              <Typography variant="caption" sx={{ color: "success.main" }}>Added: {added}</Typography>
            </Stack>
            <Box
              sx={{
                p: 2,
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 2,
                whiteSpace: "pre-wrap",
                fontFamily: "monospace",
                fontSize: 13,
                lineHeight: 1.7,
              }}
            >
              {parts.map((p, idx) =>
                p.t === "same" ? (
                  <span key={idx}>{p.v}</span>
                ) : p.t === "del" ? (
                  <Box component="span" key={idx} sx={{ bgcolor: "error.light", color: "error.dark", textDecoration: "line-through" }}>
                    {p.v}
                  </Box>
                ) : (
                  <Box component="span" key={idx} sx={{ bgcolor: "success.light", color: (t) => t.palette.mode === 'dark' ? '#fff' : '#06340f' }}>
                    {p.v}
                  </Box>
                )
              )}
            </Box>
          </Box>
        )}
        <Box>
          <Button variant="outlined" onClick={() => { setA(""); setB(""); }}>Clear</Button>
        </Box>
      </ToolPaper>
  );
}

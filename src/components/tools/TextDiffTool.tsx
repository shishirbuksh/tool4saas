
import { useMemo, useState } from "react";
import ToolPaper from "@/components/ToolPaper";import { Box, TextField, Button, Typography, Stack } from "@/components/ds";


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
            <Stack direction="row" spacing={2} className="mb-2">
              <Typography variant="caption" className="text-error">Removed: {removed}</Typography>
              <Typography variant="caption" className="text-success">Added: {added}</Typography>
            </Stack>
            <Box
              className="p-4 border border-base-300 rounded-[16px] whitespace-pre-wrap text-[13px] leading-[1.7]" style={{ fontFamily: "monospace" }}
            >
              {parts.map((p, idx) =>
                p.t === "same" ? (
                  <span key={idx}>{p.v}</span>
                ) : p.t === "del" ? (
                  <Box component="span" key={idx} className="line-through" style={{ backgroundColor: "color-mix(in oklab, var(--color-error) 15%, var(--color-base-100))", color: "var(--color-error)" }}>
                    {p.v}
                  </Box>
                ) : (
                  <Box component="span" key={idx} style={{ backgroundColor: "color-mix(in oklab, var(--color-success) 15%, var(--color-base-100))", color: "var(--color-success-content)" }}>
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

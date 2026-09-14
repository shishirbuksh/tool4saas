"use client";

import { useState } from "react";
import ToolPaper from "@/components/ToolPaper";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

type Perm = { r: boolean; w: boolean; x: boolean };

function tripleToDigit(p: Perm): number {
  return (p.r ? 4 : 0) + (p.w ? 2 : 0) + (p.x ? 1 : 0);
}

function tripleToSymbolic(p: Perm): string {
  return `${p.r ? "r" : "-"}${p.w ? "w" : "-"}${p.x ? "x" : "-"}`;
}

function PermGroup({
  label,
  digit,
  perm,
  onChange,
}: {
  label: string;
  digit: number;
  perm: Perm;
  onChange: (next: Perm) => void;
}) {
  return (
    <Box sx={{ flex: 1, minWidth: 0, border: "1px solid", borderColor: "divider", borderRadius: 2, p: 2 }}>
      <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
        {label} ({digit})
      </Typography>
      <Stack direction="row" spacing={1}>
        {(["r", "w", "x"] as const).map((k) => (
          <FormControlLabel
            key={k}
            control={
              <Checkbox
                checked={perm[k]}
                onChange={(e) => onChange({ ...perm, [k]: e.target.checked })}
                slotProps={{ input: { "aria-label": `${label} ${k}` } }}
              />
            }
            label={k.toUpperCase()}
          />
        ))}
      </Stack>
    </Box>
  );
}

export default function ChmodCalculatorTool() {
  const [owner, setOwner] = useState<Perm>({ r: true, w: true, x: true });
  const [group, setGroup] = useState<Perm>({ r: true, w: false, x: true });
  const [other, setOther] = useState<Perm>({ r: true, w: false, x: true });

  const o = tripleToDigit(owner);
  const g = tripleToDigit(group);
  const t = tripleToDigit(other);
  const octal = `${o}${g}${t}`;
  const symbolic = `${tripleToSymbolic(owner)}${tripleToSymbolic(group)}${tripleToSymbolic(other)}`;
  const command = `chmod ${octal} file`;

  return (
    <ToolPaper>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <PermGroup label="Owner" digit={o} perm={owner} onChange={setOwner} />
        <PermGroup label="Group" digit={g} perm={group} onChange={setGroup} />
        <PermGroup label="Other" digit={t} perm={other} onChange={setOther} />
      </Stack>
      <Box>
        <Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between", mb: 0.5 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
            Octal
          </Typography>
          <Button
            size="small"
            startIcon={<ContentCopyIcon />}
            onClick={() => void import("@/lib/clipboard").then((m) => m.copyToClipboard(octal))}
          >
            Copy
          </Button>
        </Stack>
        <TextField
          value={octal}
          fullWidth
          slotProps={{ input: { readOnly: true, "aria-label": "Octal", spellCheck: false } }}
          sx={{ "& input": { fontFamily: "monospace", fontSize: 16 } }}
        />
      </Box>
      <Box>
        <Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between", mb: 0.5 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
            Symbolic
          </Typography>
          <Button
            size="small"
            startIcon={<ContentCopyIcon />}
            onClick={() => void import("@/lib/clipboard").then((m) => m.copyToClipboard(symbolic))}
          >
            Copy
          </Button>
        </Stack>
        <TextField
          value={symbolic}
          fullWidth
          slotProps={{ input: { readOnly: true, "aria-label": "Symbolic", spellCheck: false } }}
          sx={{ "& input": { fontFamily: "monospace", fontSize: 16 } }}
        />
      </Box>
      <Box>
        <Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between", mb: 0.5 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
            Command
          </Typography>
          <Button
            size="small"
            startIcon={<ContentCopyIcon />}
            onClick={() => void import("@/lib/clipboard").then((m) => m.copyToClipboard(command))}
          >
            Copy
          </Button>
        </Stack>
        <TextField
          value={command}
          fullWidth
          slotProps={{ input: { readOnly: true, "aria-label": "Command", spellCheck: false } }}
          sx={{ "& input": { fontFamily: "monospace", fontSize: 16 } }}
        />
      </Box>
    </ToolPaper>
  );
}


import { useState } from "react";
import ToolPaper from "@/components/ToolPaper";import { Box, TextField, Button, Typography, Stack, Checkbox, FormControlLabel } from "@/components/ds";

import { ContentCopy as ContentCopyIcon } from "@/components/ds/icons";

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
    <Box className="flex-1 min-w-[0px] border border-base-300 rounded-[16px] p-4">
      <Typography variant="subtitle2" className="font-bold mb-2">
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
        <Stack direction="row" className="items-center justify-between mb-1">
          <Typography variant="subtitle2" className="font-bold">
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
          className="[&_input]:[font-family:monospace] [&_input]:text-[16px]"
        />
      </Box>
      <Box>
        <Stack direction="row" className="items-center justify-between mb-1">
          <Typography variant="subtitle2" className="font-bold">
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
          className="[&_input]:[font-family:monospace] [&_input]:text-[16px]"
        />
      </Box>
      <Box>
        <Stack direction="row" className="items-center justify-between mb-1">
          <Typography variant="subtitle2" className="font-bold">
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
          className="[&_input]:[font-family:monospace] [&_input]:text-[16px]"
        />
      </Box>
    </ToolPaper>
  );
}

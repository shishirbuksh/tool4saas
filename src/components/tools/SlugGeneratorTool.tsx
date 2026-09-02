"use client";

import { useMemo, useState } from "react";
import ToolPaper from "@/components/ToolPaper";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

function slugify(s: string, sep: string) {
  return s
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, sep)
    .replace(new RegExp(`^${sep}+|${sep}+$`, "g"), "");
}

export default function SlugGeneratorTool() {
  const [input, setInput] = useState("");
  const [sep, setSep] = useState("-");
  const [output, setOutput] = useState("");

  const generate = () => {
    const lines = input.split(/\r?\n/).map((l) => slugify(l, sep)).filter((l) => l.length > 0);
    setOutput(lines.join("\n"));
  };

  const count = useMemo(() => output ? output.split("\n").length : 0, [output]);

  return (
    <ToolPaper>
        <TextField
          label="Titles or topics (one per line)"
          multiline
          minRows={6}
          fullWidth
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={"My First Blog Post\nHow To Use The Tool\nContact Us"}
          slotProps={{ input: { spellCheck: false, autoComplete: "off" } }}
        />
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <FormControl sx={{ minWidth: 180 }}>
            <InputLabel>Separator</InputLabel>
            <Select label="Separator" value={sep} onChange={(e) => setSep(e.target.value)}>
              <MenuItem value="-">Hyphen (-)</MenuItem>
              <MenuItem value="_">Underscore (_)</MenuItem>
            </Select>
          </FormControl>
          <Button variant="contained" onClick={generate} disabled={!input}>Generate slugs</Button>
          <Button variant="outlined" startIcon={<ContentCopyIcon />} onClick={() => void import("@/lib/clipboard").then(m=>m.copyToClipboard(output))} disabled={!output}>Copy</Button>
        </Stack>
        {output && (
          <Box>
            <Typography  variant="subtitle2"  gutterBottom sx={{ fontWeight: 700 }}>{count} slug{count === 1 ? "" : "s"}</Typography>
            <TextField
              value={output}
              multiline
              minRows={6}
              fullWidth
              slotProps={{ input: { readOnly: true, "aria-label": "Slugs", spellCheck: false } }}
              sx={{ "& textarea": { fontFamily: "monospace", fontSize: 13 } }}
            />
          </Box>
        )}
      </ToolPaper>
  );
}

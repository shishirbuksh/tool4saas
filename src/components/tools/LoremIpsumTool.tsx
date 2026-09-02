"use client";

import { useState } from "react";
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

const WORDS =
  "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo consequat duis aute irure in reprehenderit voluptate velit esse cillum eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt culpa qui officia deserunt mollit anim id est laborum".split(
    " "
  );

function rand(n: number) {
  return Math.floor(Math.random() * n);
}

function sentence(min = 6, max = 14) {
  const len = min + rand(max - min);
  const words: string[] = [];
  for (let i = 0; i < len; i++) words.push(WORDS[rand(WORDS.length)]);
  let s = words.join(" ");
  s = s.charAt(0).toUpperCase() + s.slice(1);
  return s + ".";
}

function paragraph() {
  const sentences = 4 + rand(3);
  return Array.from({ length: sentences }, () => sentence()).join(" ");
}

export default function LoremIpsumTool() {
  const [mode, setMode] = useState<"paragraphs" | "sentences" | "words">("paragraphs");
  const [count, setCount] = useState(3);
  const [startWith, setStartWith] = useState(true);
  const [output, setOutput] = useState("");

  const generate = () => {
    let text = "";
    if (mode === "paragraphs") {
      const paras = Array.from({ length: count }, () => paragraph());
      if (startWith) paras[0] = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. " + paras[0];
      text = paras.join("\n\n");
    } else if (mode === "sentences") {
      text = Array.from({ length: count }, () => sentence()).join(" ");
    } else {
      text = Array.from({ length: count }, () => WORDS[rand(WORDS.length)]).join(" ");
    }
    setOutput(text);
  };

  return (
    <ToolPaper>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <FormControl fullWidth>
            <InputLabel>Type</InputLabel>
            <Select label="Type" value={mode} onChange={(e) => setMode(e.target.value as typeof mode)}>
              <MenuItem value="paragraphs">Paragraphs</MenuItem>
              <MenuItem value="sentences">Sentences</MenuItem>
              <MenuItem value="words">Words</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Amount"
            type="number"
            value={count}
            onChange={(e) => setCount(Math.max(1, Math.min(200, Number(e.target.value) || 1)))}
            fullWidth
            slotProps={{ input: { inputMode: "numeric", spellCheck: false, autoComplete: "off" } }}
          />
          {mode === "paragraphs" && (
            <FormControl fullWidth sx={{ maxWidth: 220 }}>
              <InputLabel>Start</InputLabel>
              <Select label="Start" value={startWith ? "yes" : "no"} onChange={(e) => setStartWith(e.target.value === "yes")}>
                <MenuItem value="yes">Start with “Lorem ipsum…”</MenuItem>
                <MenuItem value="no">Random</MenuItem>
              </Select>
            </FormControl>
          )}
        </Stack>
        <Button variant="contained" onClick={generate}>
          Generate
        </Button>
        {output && (
          <Box>
            <Stack direction="row"   sx={{ alignItems: "center", justifyContent: "space-between",  mb: 0.5 }}>
              <Typography  variant="subtitle2"  sx={{ fontWeight: 700 }}>Result</Typography>
              <Button size="small" startIcon={<ContentCopyIcon />} onClick={() => void import("@/lib/clipboard").then(m=>m.copyToClipboard(output))}>Copy</Button>
            </Stack>
            <TextField value={output} multiline minRows={8} fullWidth slotProps={{ input: { readOnly: true, "aria-label": "Generated text", spellCheck: false } }} sx={{ "& textarea": { fontSize: 13, lineHeight: 1.6 } }} />
          </Box>
        )}
      </ToolPaper>
  );
}


import { useMemo, useState } from "react";
import ToolPaper from "@/components/ToolPaper";import { Paper, Box, TextField, Typography, Grid, Stack, Alert, Button, FormControl, InputLabel, Select, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@/components/ds";

import { ContentCopy as ContentCopyIcon } from "@/components/ds/icons";
import { estimateTokens, estimateAiCost } from "@/lib/finance-calc";

function Stat({ label, value }: { label: string; value: number | string }) {
  return (
    <Paper variant="outlined" className="p-4 text-center">
      <Typography variant="h3" className="text-[28px] font-extrabold text-primary">
        {value}
      </Typography>
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>
    </Paper>
  );
}

type ModelDef = { id: string; name: string; price: number };

const DEFAULT_MODELS: ModelDef[] = [
  { id: "gpt-4o", name: "GPT-4o", price: 2.5 },
  { id: "claude-sonnet", name: "Claude Sonnet", price: 3 },
  { id: "gemini-flash", name: "Gemini Flash", price: 0.35 },
];

// 500KB guard – avoid O(n) estimation on huge inputs
const MAX_CHARS = 500_000; // ~500KB

export default function AiTokenCounterTool() {
  const [text, setText] = useState("");
  const [models, setModels] = useState<ModelDef[]>(DEFAULT_MODELS);
  const [selectedId, setSelectedId] = useState("gpt-4o");
  const [copied, setCopied] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    let v = e.target.value;
    if (v.length > MAX_CHARS) v = v.slice(0, MAX_CHARS);
    setText(v);
    setCopied(false);
  };

  const updatePrice = (id: string, raw: string) => {
    const n = Number(raw);
    setModels((prev) => prev.map((m) => (m.id === id ? { ...m, price: raw === "" ? 0 : n } : m)));
  };

  const stats = useMemo(() => {
    // Normalize to NFC before counting – ensures e + combining accent === single char
    const normalized = text.normalize("NFC");
    // estimateTokens is emoji-aware internally ([...text].length counts 😀 as 1)
    return estimateTokens(normalized);
  }, [text]);

  const costs = useMemo(
    () =>
      models.map((m) => ({
        ...m,
        cost: estimateAiCost(stats.tokens, m.price),
      })),
    [stats.tokens, models]
  );

  const selected = costs.find((m) => m.id === selectedId) ?? costs[0];

  const handleCopy = async () => {
    const lines = [
      `Characters: ${stats.chars}`,
      `Words: ${stats.words}`,
      `Estimated tokens: ${stats.tokens}`,
      ...costs.map(
        (m) => `${m.name} ($${m.price}/1M): ${m.cost === null ? "—" : `$${m.cost.toFixed(6)}`}`
      ),
    ];
    const { copyToClipboard } = await import("@/lib/clipboard");
    const ok = await copyToClipboard(lines.join("\n"));
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  const isAtLimit = text.length >= MAX_CHARS;

  return (
    <ToolPaper>
      <TextField
        label="Paste or type your text"
        multiline
        minRows={8}
        fullWidth
        value={text}
        onChange={handleChange}
        placeholder="Paste your prompt or document here…"
        slotProps={{ htmlInput: { maxLength: MAX_CHARS } } as unknown as object}
        
      />
      {isAtLimit && (
        <Typography variant="caption" color="warning.main" className="mt-2 block">
          Reached 500KB limit (~500,000 characters) – further input is truncated for performance.
        </Typography>
      )}
      <Typography variant="caption" color="text.secondary" className="block">
        {text.length.toLocaleString()} / {MAX_CHARS.toLocaleString()} characters
      </Typography>

      <Grid container spacing={2} className="mt-2">
        <Grid size={{ xs: 6, sm: 3 }}>
          <Stat label="Characters" value={stats.chars.toLocaleString()} />
        </Grid>
        <Grid size={{ xs: 6, sm: 3 }}>
          <Stat label="Words" value={stats.words.toLocaleString()} />
        </Grid>
        <Grid size={{ xs: 6, sm: 3 }}>
          <Stat label="Est. tokens" value={stats.tokens.toLocaleString()} />
        </Grid>
        <Grid size={{ xs: 6, sm: 3 }}>
          <Stat
            label={`Cost · ${selected?.name ?? ""}`}
            value={selected?.cost === null || selected?.cost === undefined ? "—" : `$${selected.cost.toFixed(6)}`}
          />
        </Grid>
      </Grid>

      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} className="mt-4">
        <FormControl fullWidth className="sm:max-w-[280px]">
          <InputLabel id="ai-model-label">Model</InputLabel>
          <Select
            labelId="ai-model-label"
            label="Model"
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
          >
            {models.map((m) => (
              <MenuItem key={m.id} value={m.id}>
                {m.name} (${m.price}/1M)
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box className="flex-1" />
        <Button
          variant="outlined"
          startIcon={<ContentCopyIcon />}
          onClick={handleCopy}
          disabled={!text.trim()}
        >
          {copied ? "Copied!" : "Copy summary"}
        </Button>
      </Stack>

      <Box className="mt-4">
        <Typography variant="subtitle2" gutterBottom className="font-bold">
          Cost per model (input pricing, editable)
        </Typography>
        <TableContainer component={Paper} variant="outlined">
          <Table size="small" aria-label="Estimated cost per model">
            <TableHead>
              <TableRow>
                <TableCell>Model</TableCell>
                <TableCell align="right">Price / 1M tokens</TableCell>
                <TableCell align="right">Est. cost</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {costs.map((m) => (
                <TableRow key={m.id} selected={m.id === selectedId}>
                  <TableCell>{m.name}</TableCell>
                  <TableCell align="right">
                    <TextField
                      type="number"
                      size="small"
                      aria-label={`${m.name} price per million tokens`}
                      value={Number.isFinite(m.price) ? m.price : 0}
                      onChange={(e) => updatePrice(m.id, e.target.value)}
                      slotProps={{ htmlInput: { min: 0, step: 0.05 } }}
                      className="w-[130px]"
                    />
                  </TableCell>
                  <TableCell align="right" style={{ fontFamily: "monospace" }}>
                    {m.cost === null ? "—" : `$${m.cost.toFixed(6)}`}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Typography variant="caption" color="text.secondary" className="block mt-2">
          {stats.tokens.toLocaleString()} tokens × selected model rate. Edit prices anytime — pricing changes
          frequently.
        </Typography>
      </Box>

      <Alert severity="info">
        Heuristic estimate only — ~4 characters per token with a code boost, not exact tiktoken or provider
        tokenizer counts. Always verify billing in provider dashboards.
      </Alert>
    </ToolPaper>
  );
}

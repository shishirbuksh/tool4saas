"use client";

import { useState, useMemo } from "react";
import ToolPaper from "@/components/ToolPaper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DownloadIcon from "@mui/icons-material/Download";
import { copyToClipboard } from "@/lib/clipboard";

interface FaqPair {
  id: number;
  question: string;
  answer: string;
}

let nextId = 3;

const INITIAL_PAIRS: FaqPair[] = [
  { id: 1, question: "What is your return policy?", answer: "We offer a 30-day money-back guarantee on all orders." },
  { id: 2, question: "How long does shipping take?", answer: "Standard shipping takes 3-5 business days." },
];

export default function FaqSchemaGeneratorTool() {
  const [pairs, setPairs] = useState<FaqPair[]>(INITIAL_PAIRS);

  const validPairs = useMemo(
    () =>
      pairs.filter(
        (p) => p.question.trim().length > 0 && p.answer.trim().length > 0
      ),
    [pairs]
  );

  const jsonLd = useMemo(() => {
    if (validPairs.length === 0) return "";
    return JSON.stringify(
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: validPairs.map((p) => ({
          "@type": "Question",
          name: p.question.trim(),
          acceptedAnswer: {
            "@type": "Answer",
            text: p.answer.trim(),
          },
        })),
      },
      null,
      2
    );
  }, [validPairs]);

  const updatePair = (id: number, field: "question" | "answer", value: string) => {
    setPairs((prev) => prev.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
  };

  const addPair = () => {
    setPairs((prev) => [...prev, { id: nextId++, question: "", answer: "" }]);
  };

  const removePair = (id: number) => {
    setPairs((prev) => prev.filter((p) => p.id !== id));
  };

  const handleCopy = () => {
    if (jsonLd) void copyToClipboard(jsonLd);
  };

  const handleDownload = () => {
    if (!jsonLd) return;
    const blob = new Blob([jsonLd], { type: "application/ld+json;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "faq-schema.json";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <ToolPaper>
      <Stack spacing={2}>
        {pairs.map((pair, index) => (
          <Box
            key={pair.id}
            sx={{
              p: 2,
              borderRadius: 2,
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            <Stack direction="row" spacing={1} sx={{ alignItems: "center", justifyContent: "space-between", mb: 1 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                Question {index + 1}
              </Typography>
              <IconButton
                aria-label={`Remove question ${index + 1}`}
                onClick={() => removePair(pair.id)}
                disabled={pairs.length <= 1}
                size="small"
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Stack>
            <Stack spacing={2}>
              <TextField
                label="Question"
                fullWidth
                value={pair.question}
                onChange={(e) => updatePair(pair.id, "question", e.target.value)}
                placeholder="e.g. What is your return policy?"
                slotProps={{ input: { spellCheck: true, autoComplete: "off" } }}
              />
              <TextField
                label="Answer"
                multiline
                minRows={2}
                fullWidth
                value={pair.answer}
                onChange={(e) => updatePair(pair.id, "answer", e.target.value)}
                placeholder="e.g. We offer a 30-day money-back guarantee."
                slotProps={{ input: { spellCheck: true, autoComplete: "off" } }}
              />
            </Stack>
          </Box>
        ))}
      </Stack>

      <Box>
        <Button variant="outlined" startIcon={<AddIcon />} onClick={addPair}>
          Add question
        </Button>
      </Box>

      <Typography variant="body2" color="text.secondary">
        {validPairs.length} of {pairs.length} question{pairs.length === 1 ? "" : "s"} complete
      </Typography>

      {pairs.length !== validPairs.length && (
        <Alert severity="warning">
          Empty questions or answers are excluded from the generated schema.
        </Alert>
      )}

      {jsonLd ? (
        <Box>
          <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 700 }}>
            Preview — FAQ JSON-LD ({validPairs.length} question{validPairs.length === 1 ? "" : "s"})
          </Typography>
          <TextField
            value={jsonLd}
            multiline
            minRows={12}
            fullWidth
            slotProps={{
              input: {
                readOnly: true,
                "aria-label": "Generated FAQ JSON-LD",
                spellCheck: false,
                autoComplete: "off",
              },
            }}
            sx={{ "& textarea": { fontFamily: "monospace", fontSize: 12 } }}
          />
        </Box>
      ) : (
        <Alert severity="info">
          Enter at least one question and answer pair to generate the FAQ schema.
        </Alert>
      )}

      <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: "wrap" }}>
        <Button
          variant="contained"
          startIcon={<ContentCopyIcon />}
          onClick={handleCopy}
          disabled={!jsonLd}
        >
          Copy JSON-LD
        </Button>
        <Button
          variant="outlined"
          startIcon={<DownloadIcon />}
          onClick={handleDownload}
          disabled={!jsonLd}
        >
          Download faq-schema.json
        </Button>
      </Stack>
    </ToolPaper>
  );
}

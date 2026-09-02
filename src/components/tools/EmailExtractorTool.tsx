"use client";

import { useMemo, useState } from "react";
import ToolPaper from "@/components/ToolPaper";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const EMAIL_RE = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;

export default function EmailExtractorTool() {
  const [text, setText] = useState("");
  const copy = (v: string) => v && void import("@/lib/clipboard").then(m=>m.copyToClipboard(v));

  const emails = useMemo(() => {
    if (!text) return [];
    return Array.from(new Set(text.match(EMAIL_RE) ?? []));
  }, [text]);

  return (
    <ToolPaper>
        <TextField
          label="Paste text containing emails"
          multiline
          minRows={6}
          fullWidth
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste text and we'll pull out every email address…"
          slotProps={{ input: { spellCheck: true, autoComplete: "off" } }}
        />
        <Box>
          <Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between", mb: 1 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
              Found {emails.length} unique email{emails.length === 1 ? "" : "s"}
            </Typography>
            <Button
              size="small"
              startIcon={<ContentCopyIcon />}
              onClick={() => copy(emails.join("\n"))}
              disabled={emails.length === 0}
            >
              Copy all
            </Button>
          </Stack>
          {emails.length === 0 ? (
            <Typography variant="body2" color="text.secondary">
              No email addresses found yet.
            </Typography>
          ) : (
            <Stack spacing={1}>
              {emails.map((e) => (
                <Box
                  key={e}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    p: 1.5,
                    borderRadius: 2,
                    border: "1px solid",
                    borderColor: "divider",
                    fontFamily: "monospace",
                    fontSize: 14,
                  }}
                >
                  <span>{e}</span>
                  <Button size="small" onClick={() => copy(e)}>
                    Copy
                  </Button>
                </Box>
              ))}
            </Stack>
          )}
        </Box>
      </ToolPaper>
  );
}

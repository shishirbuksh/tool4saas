
import { useMemo, useState } from "react";
import ToolPaper from "@/components/ToolPaper";import { Box, TextField, Button, Typography, Stack } from "@/components/ds";

import { ContentCopy as ContentCopyIcon } from "@/components/ds/icons";

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
          <Stack direction="row" className="items-center justify-between mb-2">
            <Typography variant="subtitle2" className="font-bold">
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
              {emails.slice(0, 100).map((e) => (
                <Box
                  key={e}
                  className="flex justify-between items-center p-3 rounded-[16px] border border-base-300 text-[14px]" style={{ fontFamily: "monospace" }}
                >
                  <span>{e}</span>
                  <Button size="small" onClick={() => copy(e)}>
                    Copy
                  </Button>
                </Box>
              ))}
              {emails.length > 100 && (
                <Typography variant="body2" color="text.secondary" className="text-center mt-2">
                  Showing first 100 results. {emails.length - 100} more not shown.
                </Typography>
              )}
            </Stack>
          )}
        </Box>
      </ToolPaper>
  );
}

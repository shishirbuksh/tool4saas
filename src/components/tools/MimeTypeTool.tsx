
import { useMemo, useState } from "react";
import ToolPaper from "@/components/ToolPaper";import { Box, TextField, Typography, Stack, Alert } from "@/components/ds";


const MAP: Record<string, string> = {
  txt: "text/plain",
  html: "text/html",
  css: "text/css",
  csv: "text/csv",
  json: "application/json",
  xml: "application/xml",
  js: "text/javascript",
  mjs: "text/javascript",
  ts: "text/typescript",
  jsx: "text/jsx",
  tsx: "text/tsx",
  md: "text/markdown",
  pdf: "application/pdf",
  doc: "application/msword",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  xls: "application/vnd.ms-excel",
  xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ppt: "application/vnd.ms-powerpoint",
  pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  gif: "image/gif",
  webp: "image/webp",
  svg: "image/svg+xml",
  ico: "image/x-icon",
  bmp: "image/bmp",
  avif: "image/avif",
  mp3: "audio/mpeg",
  wav: "audio/wav",
  ogg: "audio/ogg",
  mp4: "video/mp4",
  webm: "video/webm",
  mov: "video/quicktime",
  zip: "application/zip",
  gz: "application/gzip",
  tar: "application/x-tar",
  rar: "application/vnd.rar",
  woff: "font/woff",
  woff2: "font/woff2",
  ttf: "font/ttf",
  otf: "font/otf",
  sqlite: "application/vnd.sqlite3",
  wasm: "application/wasm",
};

export default function MimeTypeTool() {
  const [input, setInput] = useState("");
  const copy = (v: string) => v && void import("@/lib/clipboard").then(m=>m.copyToClipboard(v));

  const result = useMemo(() => {
    const q = input.trim().toLowerCase().replace(/^\./, "");
    if (!q) return null;
    if (MAP[q]) return { type: "extension" as const, ext: q, mime: MAP[q] };
    const ext = Object.keys(MAP).find((k) => MAP[k] === q);
    if (ext) return { type: "mime" as const, ext, mime: q };
    return "none" as const;
  }, [input]);

  return (
    <ToolPaper>
        <TextField
          label="File extension or MIME type"
          fullWidth
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder=".json  or  image/png"
          slotProps={{ input: { spellCheck: false, autoComplete: "off" } }}
        />
        {result && result !== "none" && (
          <Stack spacing={1}>
            <Box
              className="flex justify-between p-3 rounded-[16px] border border-base-300"
            >
              <Typography color="text.secondary">Extension</Typography>
              <Typography className="font-bold" style={{ fontFamily: "monospace" }}>.{result.ext}</Typography>
            </Box>
            <Box
              className="flex justify-between p-3 rounded-[16px] border border-base-300"
            >
              <Typography color="text.secondary">MIME type</Typography>
              <Typography className="font-bold" style={{ fontFamily: "monospace" }}>{result.mime}</Typography>
            </Box>
          </Stack>
        )}
        {result === "none" && <Alert severity="info">No match found in the built-in table.</Alert>}
        {result && result !== "none" && (
          <Stack direction="row" spacing={1}>
            <Box
              component="button"
              onClick={() => copy(result.type === "extension" ? result.mime : `.${result.ext}`)}
              className="px-4 py-2 rounded-[16px] border border-primary text-primary cursor-pointer font-semibold" style={{ background: "transparent" }}
            >
              Copy {result.type === "extension" ? "MIME" : "extension"}
            </Box>
          </Stack>
        )}
      </ToolPaper>
  );
}

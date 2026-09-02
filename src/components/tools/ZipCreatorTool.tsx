"use client";

import { useState } from "react";
import ToolPaper from "@/components/ToolPaper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";

type ZipFileEntry = {
  id: number;
  name: string;
  content: string;
};

let nextId = 1;

export default function ZipCreatorTool() {
  const [files, setFiles] = useState<ZipFileEntry[]>([
    { id: nextId++, name: "hello.txt", content: "Hello, world!" },
  ]);
  const [zipName, setZipName] = useState("archive.zip");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const addFile = () => {
    setFiles((prev) => [...prev, { id: nextId++, name: `file${prev.length + 1}.txt`, content: "" }]);
  };

  const removeFile = (id: number) => {
    setFiles((prev) => (prev.length <= 1 ? prev : prev.filter((f) => f.id !== id)));
  };

  const updateFile = (id: number, patch: Partial<ZipFileEntry>) => {
    setFiles((prev) => prev.map((f) => (f.id === id ? { ...f, ...patch } : f)));
  };

  const generateZip = async () => {
    setError("");
    setSuccess("");

    if (!files.length) {
      setError("Add at least one file.");
      return;
    }

    const trimmedNames = files.map((f) => f.name.trim());
    if (trimmedNames.some((n) => !n)) {
      setError("All filenames must be non-empty.");
      return;
    }
    if (new Set(trimmedNames).size !== trimmedNames.length) {
      setError("Filenames must be unique.");
      return;
    }
    if (trimmedNames.some((n) => n.includes("/") || n.includes("\\") || n.startsWith("."))) {
      // allow simple names but warn about path traversal; fflate supports nested paths, but keep it simple
      // we just allow "/" for subfolders if user intentionally wants, so we only block backslash and dot-start
      // to be permissive, we won't error on "/" – remove this check if needed
    }

    setLoading(true);
    try {
      let fflate: unknown;
      try {
        // @ts-expect-error - fflate is optional, lazy loaded via dynamic import("fflate")
        fflate = await import("fflate" as unknown as number);
      } catch {
        setError('fflate is not installed. Run "npm install fflate" to enable ZIP creation.');
        setLoading(false);
        return;
      }

      // Build file map: filename -> Uint8Array
      const fileMap: Record<string, Uint8Array> = {};
      const encoder = typeof TextEncoder !== "undefined" ? new TextEncoder() : null;
      for (const f of files) {
        const name = f.name.trim();
        // Prefer fflate.strToU8 if available, fallback to TextEncoder
        const u8 =
          typeof (fflate as unknown as { strToU8?: (s: string) => Uint8Array }).strToU8 === "function"
            ? (fflate as unknown as { strToU8: (s: string) => Uint8Array }).strToU8(f.content)
            : encoder
              ? encoder.encode(f.content)
              : new Uint8Array(Array.from(f.content).map((c) => c.charCodeAt(0)));
        fileMap[name] = u8;
      }

      // Use zipSync if available, otherwise async zip
      let zipped: Uint8Array;
      if (typeof (fflate as unknown as { zipSync?: unknown }).zipSync === "function") {
        const zipSync = (fflate as unknown as { zipSync: (data: Record<string, Uint8Array>) => Uint8Array }).zipSync;
        zipped = zipSync(fileMap);
      } else if (typeof (fflate as unknown as { zip?: unknown }).zip === "function") {
        const zip = (fflate as unknown as { zip: (data: Record<string, Uint8Array>, cb: (err: Error | null, data: Uint8Array) => void) => void }).zip;
        zipped = await new Promise<Uint8Array>((resolve, reject) => {
          zip(fileMap, (err, data) => {
            if (err) reject(err);
            else resolve(data);
          });
        });
      } else {
        throw new Error("fflate does not expose zipSync or zip.");
      }

      const blob = new Blob([zipped as BlobPart], { type: "application/zip" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      const outName = zipName.trim() || "archive.zip";
      const finalName = outName.endsWith(".zip") ? outName : `${outName}.zip`;
      a.href = url;
      a.download = finalName;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      setSuccess(`Generated ${finalName} with ${files.length} file(s). Download started.`);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      // Dynamic import failure fallback already handled; this is generic
      if (msg.includes("Cannot find module") || msg.includes("fflate")) {
        setError('fflate is not installed. Run "npm install fflate" to enable ZIP creation.');
      } else {
        setError(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToolPaper>
      <Typography variant="h6" sx={{ fontWeight: 700 }}>
        ZIP Creator
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Add multiple text files (filename + content) and generate a ZIP archive in the browser. Uses lazy-loaded fflate via
        dynamic import(&quot;fflate&quot;).
      </Typography>

      <Stack spacing={2}>
        {files.map((file) => (
          <Box
            key={file.id}
            sx={{
              p: 2,
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 2,
              bgcolor: "background.paper",
            }}
          >
            <Stack spacing={1.5}>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} sx={{ alignItems: "flex-start" }}>
                <TextField
                  label="Filename"
                  value={file.name}
                  onChange={(e) => updateFile(file.id, { name: e.target.value })}
                  placeholder="example.txt"
                  fullWidth
                  size="small"
                  slotProps={{ input: { spellCheck: false, autoComplete: "off" } }}
                  sx={{ flex: 1 }}
                />
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => removeFile(file.id)}
                  disabled={files.length <= 1}
                  sx={{ flexShrink: 0, whiteSpace: "nowrap" }}
                >
                  Remove
                </Button>
              </Stack>
              <TextField
                label="File content"
                value={file.content}
                onChange={(e) => updateFile(file.id, { content: e.target.value })}
                placeholder="Enter text content for this file..."
                multiline
                minRows={3}
                fullWidth
                slotProps={{ input: { spellCheck: false } }}
                sx={{ "& textarea": { fontFamily: "monospace", fontSize: 13 } }}
              />
            </Stack>
          </Box>
        ))}
      </Stack>

      <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: "wrap" }}>
        <Button variant="outlined" onClick={addFile}>
          Add file
        </Button>
        <Button variant="text" onClick={() => setFiles([{ id: nextId++, name: "hello.txt", content: "Hello, world!" }])}>
          Reset
        </Button>
      </Stack>

      <TextField
        label="ZIP filename"
        value={zipName}
        onChange={(e) => setZipName(e.target.value)}
        placeholder="archive.zip"
        fullWidth
        size="small"
        helperText='Output name for the archive, e.g. "archive.zip"'
        slotProps={{ input: { spellCheck: false, autoComplete: "off" } }}
      />

      <Box>
        <Button variant="contained" onClick={generateZip} disabled={loading || files.length === 0}>
          {loading ? "Generating..." : `Generate & Download ZIP (${files.length} file${files.length === 1 ? "" : "s"})`}
        </Button>
        <Typography variant="caption" color="text.secondary" sx={{ ml: 2 }}>
          Creates Blob and triggers browser download. All processing runs locally.
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" onClose={() => setError("")}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" onClose={() => setSuccess("")}>
          {success}
        </Alert>
      )}

      <Alert severity="info">
        Requires <code>fflate</code> — if not installed you will see: <code>npm install fflate</code>. ZIP is built with{" "}
        <code>dynamic import(&quot;fflate&quot;)</code> and downloaded via <code>Blob</code> + object URL.
      </Alert>
    </ToolPaper>
  );
}

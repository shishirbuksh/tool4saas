
import { useState, useMemo } from "react";
import ToolPaper from "@/components/ToolPaper";import { Box, Stack, TextField, Typography, Button } from "@/components/ds";

import { ContentCopy as ContentCopyIcon } from "@/components/ds/icons";
import { copyToClipboard } from "@/lib/clipboard";

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  let h = hex.replace("#", "").trim();
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  if (!/^[0-9a-fA-F]{6}$/.test(h)) return null;
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  };
}

function rgbToHex(r: number, g: number, b: number): string {
  const c = (n: number) => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, "0");
  return `#${c(r)}${c(g)}${c(b)}`;
}

// CMYK converter: r/=255 etc., k=1-max(r,g,b), c=(1-r-k)/(1-k) etc.
function rgbToCmyk(r: number, g: number, b: number): { c: number; m: number; y: number; k: number } {
  // r/=255 etc.
  const r1 = r / 255;
  const g1 = g / 255;
  const b1 = b / 255;
  // also support r/=255 style
  // r /= 255; g /= 255; b /= 255;
  const k = 1 - Math.max(r1, g1, b1);
  if (k === 1) {
    return { c: 0, m: 0, y: 0, k: 100 };
  }
  const c = (1 - r1 - k) / (1 - k);
  const m = (1 - g1 - k) / (1 - k);
  const y = (1 - b1 - k) / (1 - k);
  return {
    c: Math.round(c * 100),
    m: Math.round(m * 100),
    y: Math.round(y * 100),
    k: Math.round(k * 100),
  };
}

function cmykToRgb(c: number, m: number, y: number, k: number): { r: number; g: number; b: number } {
  const c1 = c / 100;
  const m1 = m / 100;
  const y1 = y / 100;
  const k1 = k / 100;
  const r = 255 * (1 - c1) * (1 - k1);
  const g = 255 * (1 - m1) * (1 - k1);
  const b = 255 * (1 - y1) * (1 - k1);
  return { r: Math.round(r), g: Math.round(g), b: Math.round(b) };
}

export default function CmykConverterTool() {
  const [hexInput, setHexInput] = useState("#0099cc");

  const rgb = useMemo(() => hexToRgb(hexInput), [hexInput]);

  const cmyk = useMemo(() => {
    if (!rgb) return null;
    return rgbToCmyk(rgb.r, rgb.g, rgb.b);
  }, [rgb]);

  // derived display values
  const hexDisplay = useMemo(() => {
    if (rgb) return rgbToHex(rgb.r, rgb.g, rgb.b);
    return hexInput;
  }, [rgb, hexInput]);

  const rgbString = useMemo(() => (rgb ? `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` : "—"), [rgb]);
  const hexString = useMemo(() => (rgb ? rgbToHex(rgb.r, rgb.g, rgb.b).toUpperCase() : "—"), [rgb]);
  const cmykString = useMemo(
    () => (cmyk ? `cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)` : "—"),
    [cmyk]
  );

  const copy = (text: string) => {
    if (text && text !== "—") void copyToClipboard(text);
  };

  const handleHexChange = (value: string) => {
    setHexInput(value);
  };

  const handleRgbChange = (channel: "r" | "g" | "b", value: string) => {
    // allow empty while typing
    if (value === "") return;
    const n = parseInt(value, 10);
    if (Number.isNaN(n) || !rgb) return;
    const clamped = Math.max(0, Math.min(255, n));
    const next = { r: rgb.r, g: rgb.g, b: rgb.b, [channel]: clamped } as { r: number; g: number; b: number };
    setHexInput(rgbToHex(next.r, next.g, next.b));
  };

  const handleCmykChange = (channel: "c" | "m" | "y" | "k", value: string) => {
    if (value === "" || !cmyk) return;
    const n = parseInt(value, 10);
    if (Number.isNaN(n)) return;
    const clamped = Math.max(0, Math.min(100, n));
    const next = { ...cmyk, [channel]: clamped };
    const converted = cmykToRgb(next.c, next.m, next.y, next.k);
    setHexInput(rgbToHex(converted.r, converted.g, converted.b));
  };

  const isValid = !!rgb && !!cmyk;
  const previewColor = isValid ? hexDisplay : "#ffffff";

  return (
    <ToolPaper>
      <Typography variant="h6" className="font-extrabold">
        CMYK Converter
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Convert between HEX, RGB and CMYK. Edit any format — others update instantly using r/=255, k=1-max(r,g,b), c=(1-r-k)/(1-k).
      </Typography>

      {/* Swatches */}
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <Box
          className="flex-1 h-[120px] rounded-[16px] border border-base-300 flex items-center justify-center" style={{ backgroundColor: previewColor }}
        >
          <Typography
            variant="caption"
            className="font-bold px-3 py-1 rounded-[8px] bg-[rgba(0,0,0,0.55)] text-[#fff]" style={{ fontFamily: "monospace" }}
          >
            {isValid ? hexString : "Invalid color"}
          </Typography>
        </Box>
        <Box
          className="flex-1 h-[120px] rounded-[16px] border border-base-300 opacity-[0.9] flex items-center justify-center relative overflow-hidden" style={{ backgroundColor: previewColor }}
        >
          <Box
            className="absolute inset-0" style={{ background: cmyk
                ? `linear-gradient(135deg, ${previewColor} 0%, rgba(0,0,0,${cmyk.k / 100}) 100%)`
                : previewColor }}
          />
          <Typography
            variant="caption"
            className="font-bold px-3 py-1 rounded-[8px] bg-[rgba(255,255,255,0.85)] text-[#111] relative" style={{ fontFamily: "monospace" }}
          >
            {isValid ? cmykString : "—"}
          </Typography>
        </Box>
      </Stack>

      {/* HEX input */}
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} className="sm:items-center">
        <Box
          component="input"
          type="color"
          value={isValid ? hexDisplay : "#000000"}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setHexInput(e.target.value)}
          aria-label="Color picker"
          className="w-[56px] h-[44px] min-w-[44px] min-h-[44px] border border-base-300 rounded-[16px] p-1 cursor-pointer bg-transparent"
        />
        <TextField
          label="HEX"
          value={hexInput}
          onChange={(e) => handleHexChange(e.target.value)}
          fullWidth
          placeholder="#0099cc"
          error={!isValid}
          helperText={!isValid ? "Enter a valid hex (e.g. #0099cc or #09c)" : ""}
          slotProps={{ input: { spellCheck: false, autoComplete: "off" } }}
          className="[&_input]:[font-family:monospace] [&_input]:uppercase"
        />
        <Button
          variant="outlined"
          startIcon={<ContentCopyIcon />}
          onClick={() => copy(hexString)}
          disabled={!isValid}
          className="whitespace-nowrap min-h-[44px] h-[44px]"
        >
          Copy HEX
        </Button>
      </Stack>

      {/* RGB inputs */}
      <Box>
        <Typography variant="subtitle2" className="font-bold mb-2">
          RGB (0–255)
        </Typography>
        <Stack direction="row" spacing={1.5}>
          <TextField
            label="R"
            type="number"
            value={rgb ? String(rgb.r) : ""}
            onChange={(e) => handleRgbChange("r", e.target.value)}
            fullWidth
            slotProps={{ input: { inputMode: "numeric", spellCheck: false } }}
          />
          <TextField
            label="G"
            type="number"
            value={rgb ? String(rgb.g) : ""}
            onChange={(e) => handleRgbChange("g", e.target.value)}
            fullWidth
            slotProps={{ input: { inputMode: "numeric", spellCheck: false } }}
          />
          <TextField
            label="B"
            type="number"
            value={rgb ? String(rgb.b) : ""}
            onChange={(e) => handleRgbChange("b", e.target.value)}
            fullWidth
            slotProps={{ input: { inputMode: "numeric", spellCheck: false } }}
          />
        </Stack>
      </Box>

      {/* CMYK inputs */}
      <Box>
        <Typography variant="subtitle2" className="font-bold mb-2">
          CMYK (0–100%)
        </Typography>
        <Stack direction="row" spacing={1.5}>
          <TextField
            label="C"
            type="number"
            value={cmyk ? String(cmyk.c) : ""}
            onChange={(e) => handleCmykChange("c", e.target.value)}
            fullWidth
            slotProps={{ input: { inputMode: "numeric", spellCheck: false } }}
          />
          <TextField
            label="M"
            type="number"
            value={cmyk ? String(cmyk.m) : ""}
            onChange={(e) => handleCmykChange("m", e.target.value)}
            fullWidth
            slotProps={{ input: { inputMode: "numeric", spellCheck: false } }}
          />
          <TextField
            label="Y"
            type="number"
            value={cmyk ? String(cmyk.y) : ""}
            onChange={(e) => handleCmykChange("y", e.target.value)}
            fullWidth
            slotProps={{ input: { inputMode: "numeric", spellCheck: false } }}
          />
          <TextField
            label="K"
            type="number"
            value={cmyk ? String(cmyk.k) : ""}
            onChange={(e) => handleCmykChange("k", e.target.value)}
            fullWidth
            slotProps={{ input: { inputMode: "numeric", spellCheck: false } }}
          />
        </Stack>
      </Box>

      {/* All formats with swatches and copy buttons */}
      <Stack spacing={1}>
        <Typography variant="subtitle2" className="font-bold">
          All formats
        </Typography>

        <Box
          className="flex items-center justify-between gap-2 p-3 border border-base-300 rounded-[16px]"
        >
          <Stack direction="row" spacing={1.5} className="items-center flex-1 min-w-[0px]">
            <Box className="w-[36px] h-[36px] rounded-[8px] border border-base-300 shrink-0" style={{ backgroundColor: previewColor }} />
            <Box className="min-w-[0px]">
              <Typography variant="caption" color="text.secondary" className="block font-bold">
                HEX
              </Typography>
              <Typography variant="body2" className="font-bold break-all" style={{ fontFamily: "monospace" }}>
                {hexString}
              </Typography>
            </Box>
          </Stack>
          <Button variant="outlined" size="small" startIcon={<ContentCopyIcon />} onClick={() => copy(hexString)} disabled={!isValid}>
            Copy
          </Button>
        </Box>

        <Box
          className="flex items-center justify-between gap-2 p-3 border border-base-300 rounded-[16px]"
        >
          <Stack direction="row" spacing={1.5} className="items-center flex-1 min-w-[0px]">
            <Box className="w-[36px] h-[36px] rounded-[8px] border border-base-300 shrink-0" style={{ backgroundColor: previewColor }} />
            <Box className="min-w-[0px]">
              <Typography variant="caption" color="text.secondary" className="block font-bold">
                RGB
              </Typography>
              <Typography variant="body2" className="font-bold break-all" style={{ fontFamily: "monospace" }}>
                {rgbString}
              </Typography>
            </Box>
          </Stack>
          <Button variant="outlined" size="small" startIcon={<ContentCopyIcon />} onClick={() => copy(rgbString)} disabled={!isValid}>
            Copy
          </Button>
        </Box>

        <Box
          className="flex items-center justify-between gap-2 p-3 border border-base-300 rounded-[16px]"
        >
          <Stack direction="row" spacing={1.5} className="items-center flex-1 min-w-[0px]">
            <Box className="w-[36px] h-[36px] rounded-[8px] border border-base-300 shrink-0" style={{ backgroundColor: previewColor }} />
            <Box className="min-w-[0px]">
              <Typography variant="caption" color="text.secondary" className="block font-bold">
                CMYK
              </Typography>
              <Typography variant="body2" className="font-bold break-all" style={{ fontFamily: "monospace" }}>
                {cmykString}
              </Typography>
            </Box>
          </Stack>
          <Button variant="outlined" size="small" startIcon={<ContentCopyIcon />} onClick={() => copy(cmykString)} disabled={!isValid}>
            Copy
          </Button>
        </Box>
      </Stack>

      {/* Readonly fields with copy for quick access */}
      <Stack spacing={1}>
        <Box className="flex items-center justify-between gap-2">
          <Typography variant="subtitle2" className="font-bold w-[56px]">
            HEX
          </Typography>
          <TextField
            value={hexString}
            slotProps={{ input: { readOnly: true, "aria-label": "HEX", spellCheck: false } }}
            fullWidth
            className="[&_input]:[font-family:monospace]"
          />
          <Button variant="outlined" startIcon={<ContentCopyIcon />} onClick={() => copy(hexString)} disabled={!isValid}>
            Copy
          </Button>
        </Box>
        <Box className="flex items-center justify-between gap-2">
          <Typography variant="subtitle2" className="font-bold w-[56px]">
            RGB
          </Typography>
          <TextField
            value={rgbString}
            slotProps={{ input: { readOnly: true, "aria-label": "RGB", spellCheck: false } }}
            fullWidth
            className="[&_input]:[font-family:monospace]"
          />
          <Button variant="outlined" startIcon={<ContentCopyIcon />} onClick={() => copy(rgbString)} disabled={!isValid}>
            Copy
          </Button>
        </Box>
        <Box className="flex items-center justify-between gap-2">
          <Typography variant="subtitle2" className="font-bold w-[56px]">
            CMYK
          </Typography>
          <TextField
            value={cmykString}
            slotProps={{ input: { readOnly: true, "aria-label": "CMYK", spellCheck: false } }}
            fullWidth
            className="[&_input]:[font-family:monospace]"
          />
          <Button variant="outlined" startIcon={<ContentCopyIcon />} onClick={() => copy(cmykString)} disabled={!isValid}>
            Copy
          </Button>
        </Box>
      </Stack>
    </ToolPaper>
  );
}

"use client";

import { useState } from "react";
import ToolPaper from "@/components/ToolPaper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { validateImageFile } from "@/lib/validate";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

type ExifTags = Record<string, string>;

const ORIENTATION_MAP: Record<number, string> = {
  1: "1 - Top-left (Normal)",
  2: "2 - Top-right (Mirror horizontal)",
  3: "3 - Bottom-right (Rotate 180)",
  4: "4 - Bottom-left (Mirror vertical)",
  5: "5 - Left-top (Mirror horizontal + rotate 270 CW)",
  6: "6 - Right-top (Rotate 90 CW)",
  7: "7 - Right-bottom (Mirror horizontal + rotate 90 CW)",
  8: "8 - Left-bottom (Rotate 270 CW)",
};

function getTypeSize(type: number): number {
  switch (type) {
    case 1: // BYTE
    case 2: // ASCII
    case 6: // SBYTE
    case 7: // UNDEFINED
      return 1;
    case 3: // SHORT
    case 8: // SSHORT
      return 2;
    case 4: // LONG
    case 9: // SLONG
    case 11: // FLOAT
      return 4;
    case 5: // RATIONAL
    case 10: // SRATIONAL
    case 12: // DOUBLE
      return 8;
    default:
      return 1;
  }
}

function readAscii(view: DataView, pos: number, count: number): string {
  let s = "";
  for (let i = 0; i < count; i++) {
    const c = view.getUint8(pos + i);
    if (c === 0) break;
    s += String.fromCharCode(c);
  }
  return s;
}

function readRational(view: DataView, pos: number, little: boolean): number {
  const num = view.getUint32(pos, little);
  const den = view.getUint32(pos + 4, little);
  if (den === 0) return 0;
  return num / den;
}

function dmsToDecimal(
  view: DataView,
  pos: number,
  little: boolean,
  ref: string
): string {
  const d = readRational(view, pos, little);
  const m = readRational(view, pos + 8, little);
  const s = readRational(view, pos + 16, little);
  let dec = d + m / 60 + s / 3600;
  if (ref === "S" || ref === "W") dec = -dec;
  const dms = `${d}° ${m}' ${s.toFixed(2)}" ${ref}`;
  return `${dms} (${dec.toFixed(6)}°)`;
}

function parseTiff(view: DataView, tiffStart: number, little: boolean): ExifTags {
  const tags: ExifTags = {};

  const getValuePos = (
    entryOffset: number,
    type: number,
    count: number,
    valueOffset: number
  ): number => {
    const size = getTypeSize(type) * count;
    if (size <= 4) return entryOffset + 8;
    return tiffStart + valueOffset;
  };

  const firstIfdOffset = view.getUint32(tiffStart + 4, little);
  if (firstIfdOffset >= view.byteLength) return tags;

  const ifdOffset = firstIfdOffset;
  let gpsIfdOffset: number | null = null;
  // Also track exif sub-IFD if needed
  let exifIfdOffset: number | null = null;

  const ifdPos = tiffStart + ifdOffset;
  if (ifdPos + 2 > view.byteLength) return tags;
  const numEntries = view.getUint16(ifdPos, little);

  for (let i = 0; i < numEntries; i++) {
    const entryOffset = ifdPos + 2 + i * 12;
    if (entryOffset + 12 > view.byteLength) break;
    const tag = view.getUint16(entryOffset, little);
    const type = view.getUint16(entryOffset + 2, little);
    const count = view.getUint32(entryOffset + 4, little);
    const valueOffset = view.getUint32(entryOffset + 8, little);
    const valuePos = getValuePos(entryOffset, type, count, valueOffset);

    try {
      switch (tag) {
        case 0x010f: // Make
          if (type === 2) tags["Make"] = readAscii(view, valuePos, count);
          break;
        case 0x0110: // Model
          if (type === 2) tags["Model"] = readAscii(view, valuePos, count);
          break;
        case 0x0132: // DateTime
          if (type === 2) tags["DateTime"] = readAscii(view, valuePos, count);
          break;
        case 0x0112: // Orientation
          {
            let v: number;
            if (getTypeSize(type) * count <= 4) {
              // inline
              v = view.getUint16(entryOffset + 8, little);
            } else {
              v = view.getUint16(valuePos, little);
            }
            tags["Orientation"] = ORIENTATION_MAP[v] ?? String(v);
          }
          break;
        case 0x0131: // Software
          if (type === 2) tags["Software"] = readAscii(view, valuePos, count);
          break;
        case 0x8298: // Copyright
          if (type === 2) tags["Copyright"] = readAscii(view, valuePos, count);
          break;
        case 0x8825: // GPS IFD pointer
          gpsIfdOffset = valueOffset;
          break;
        case 0x8769: // Exif IFD pointer
          exifIfdOffset = valueOffset;
          break;
        default:
          break;
      }
    } catch {
      // ignore tag parse errors
    }
  }

  // Parse Exif sub-IFD for additional tags like DateTimeOriginal
  if (exifIfdOffset !== null) {
    try {
      const exifPos = tiffStart + exifIfdOffset;
      if (exifPos + 2 <= view.byteLength) {
        const n = view.getUint16(exifPos, little);
        for (let i = 0; i < n; i++) {
          const entryOffset = exifPos + 2 + i * 12;
          if (entryOffset + 12 > view.byteLength) break;
          const tag = view.getUint16(entryOffset, little);
          const type = view.getUint16(entryOffset + 2, little);
          const count = view.getUint32(entryOffset + 4, little);
          const valueOffset = view.getUint32(entryOffset + 8, little);
          const valuePos = getValuePos(entryOffset, type, count, valueOffset);
          if (tag === 0x9003 && type === 2) {
            const v = readAscii(view, valuePos, count);
            if (v) tags["DateTimeOriginal"] = v;
          } else if (tag === 0x9004 && type === 2) {
            const v = readAscii(view, valuePos, count);
            if (v) tags["DateTimeDigitized"] = v;
          } else if (tag === 0xa002 && (type === 3 || type === 4)) {
            const w = getTypeSize(type) * count <= 4
              ? type === 3
                ? view.getUint16(entryOffset + 8, little)
                : view.getUint32(entryOffset + 8, little)
              : type === 3
              ? view.getUint16(valuePos, little)
              : view.getUint32(valuePos, little);
            tags["PixelXDimension"] = String(w);
          } else if (tag === 0xa003 && (type === 3 || type === 4)) {
            const h = getTypeSize(type) * count <= 4
              ? type === 3
                ? view.getUint16(entryOffset + 8, little)
                : view.getUint32(entryOffset + 8, little)
              : type === 3
              ? view.getUint16(valuePos, little)
              : view.getUint32(valuePos, little);
            tags["PixelYDimension"] = String(h);
          }
        }
      }
    } catch {
      // ignore
    }
  }

  // Parse GPS IFD
  if (gpsIfdOffset !== null) {
    try {
      const gpsPos = tiffStart + gpsIfdOffset;
      if (gpsPos + 2 <= view.byteLength) {
        const numGps = view.getUint16(gpsPos, little);
        let latRef = "";
        let lonRef = "";
        let latPos: number | null = null;
        let lonPos: number | null = null;
        let altRef: number | null = null;
        let altPos: number | null = null;

        for (let i = 0; i < numGps; i++) {
          const entryOffset = gpsPos + 2 + i * 12;
          if (entryOffset + 12 > view.byteLength) break;
          const tag = view.getUint16(entryOffset, little);
          const type = view.getUint16(entryOffset + 2, little);
          const count = view.getUint32(entryOffset + 4, little);
          const valueOffset = view.getUint32(entryOffset + 8, little);
          const valuePos = getValuePos(entryOffset, type, count, valueOffset);

          switch (tag) {
            case 0x0001: // GPSLatitudeRef
              latRef = readAscii(view, valuePos, count);
              break;
            case 0x0002: // GPSLatitude
              if (type === 5 && count === 3) latPos = valuePos;
              break;
            case 0x0003: // GPSLongitudeRef
              lonRef = readAscii(view, valuePos, count);
              break;
            case 0x0004: // GPSLongitude
              if (type === 5 && count === 3) lonPos = valuePos;
              break;
            case 0x0005: // GPSAltitudeRef
              altRef = view.getUint8(valuePos);
              break;
            case 0x0006: // GPSAltitude
              if (type === 5) altPos = valuePos;
              break;
            default:
              break;
          }
        }

        if (latPos !== null && latRef) {
          tags["GPS Latitude"] = dmsToDecimal(view, latPos, little, latRef);
        }
        if (lonPos !== null && lonRef) {
          tags["GPS Longitude"] = dmsToDecimal(view, lonPos, little, lonRef);
        }
        if (altPos !== null) {
          const alt = readRational(view, altPos, little);
          const sign = altRef === 1 ? -1 : 1;
          tags["GPS Altitude"] = `${(alt * sign).toFixed(2)} m`;
        }
        if (!tags["GPS Latitude"] && !tags["GPS Longitude"]) {
          // Fallback: if we have raw refs without position, set placeholder
          if (latRef || lonRef) {
            tags["GPS"] = `Ref: ${latRef} / ${lonRef}`;
          }
        }
      }
    } catch {
      // ignore GPS errors
    }
  }

  return tags;
}

function parseJpegExif(buffer: ArrayBuffer): ExifTags | null {
  const view = new DataView(buffer);

  if (view.byteLength < 2 || view.getUint16(0, false) !== 0xffd8) {
    throw new Error("Not a JPEG file (missing SOI marker). Try a JPEG image.");
  }

  let offset = 2;

  while (offset < view.byteLength - 1) {
    if (view.getUint8(offset) !== 0xff) {
      // Not a marker, stop scanning
      break;
    }
    const marker = view.getUint16(offset, false);
    offset += 2;

    // Standalone markers without length
    if (marker === 0xffd8 || marker === 0xffd9) continue;
    if (marker === 0xffda) break; // SOS - start of scan, no more headers

    if (offset + 2 > view.byteLength) break;
    const segmentLength = view.getUint16(offset, false);
    if (segmentLength < 2) break;

    if (marker === 0xffe1) {
      // APP1 - potential EXIF
      if (segmentLength >= 8) {
        // Check for "Exif\0\0" at offset+2
        const e0 = view.getUint8(offset + 2);
        const e1 = view.getUint8(offset + 3);
        const e2 = view.getUint8(offset + 4);
        const e3 = view.getUint8(offset + 5);
        const e4 = view.getUint8(offset + 6);
        const e5 = view.getUint8(offset + 7);
        if (e0 === 0x45 && e1 === 0x78 && e2 === 0x69 && e3 === 0x66 && e4 === 0x00 && e5 === 0x00) {
          const tiffStart = offset + 8;
          if (tiffStart + 8 > view.byteLength) throw new Error("Invalid EXIF header.");

          const byteOrder = view.getUint16(tiffStart, false);
          let little: boolean;
          if (byteOrder === 0x4949) little = true;
          else if (byteOrder === 0x4d4d) little = false;
          else throw new Error("Invalid TIFF byte order.");

          const magic = view.getUint16(tiffStart + 2, little);
          if (magic !== 42) throw new Error("Invalid TIFF magic number.");

          const tags = parseTiff(view, tiffStart, little);
          return tags;
        }
      }
    }

    offset += segmentLength;
  }

  return null;
}

export default function ExifViewerTool() {
  const [fileName, setFileName] = useState<string>("");
  const [exif, setExif] = useState<ExifTags | null>(null);
  const [error, setError] = useState<string>("");
  const [info, setInfo] = useState<string>("");

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    setError("");
    setInfo("");
    setExif(null);

    const v = validateImageFile(file);
    if (!v.valid) {
      setError(v.error || "Invalid image.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const buffer = reader.result as ArrayBuffer;
        const tags = parseJpegExif(buffer);
        if (!tags || Object.keys(tags).length === 0) {
          setInfo("No EXIF data found in this image. The file may not contain EXIF, or it may be stripped / PNG/WebP.");
          setExif(null);
        } else {
          setExif(tags);
        }
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Failed to parse EXIF.";
        // Distinguish no EXIF vs parse error
        if (msg.includes("Not a JPEG")) {
          setError(msg);
        } else if (msg.includes("No EXIF") || msg.includes("Invalid")) {
          setError(msg);
        } else {
          setError(msg);
        }
      }
    };
    reader.readAsArrayBuffer(file);
    e.target.value = "";
  };

  const clear = () => {
    setFileName("");
    setExif(null);
    setError("");
    setInfo("");
  };

  const hasResult = exif && Object.keys(exif).length > 0;

  return (
    <ToolPaper>
      <Typography variant="h6" sx={{ fontWeight: 700 }}>
        EXIF Viewer
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Choose a JPEG image to view its EXIF metadata (camera make/model, date, orientation, GPS). Images are parsed locally in your browser.
      </Typography>

      <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} sx={{ alignItems: { sm: "center" } }}>
        <Button variant="contained" component="label">
          Choose image
          <input type="file" accept="image/*" hidden onChange={onFile} />
        </Button>
        {fileName && (
          <Typography variant="body2" color="text.secondary" sx={{ wordBreak: "break-all" }}>
            {fileName}
          </Typography>
        )}
        {(fileName || exif || error || info) && (
          <Button variant="outlined" onClick={clear} sx={{ ml: { sm: "auto" } }}>
            Clear
          </Button>
        )}
      </Stack>

      {error && <Alert severity="error">{error}</Alert>}
      {info && !error && <Alert severity="info">{info}</Alert>}

      {hasResult && (
        <Box>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
            EXIF Data
          </Typography>
          <Box sx={{ border: "1px solid", borderColor: "divider", borderRadius: 2, overflow: "hidden" }}>
            <Table size="small" aria-label="EXIF data table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700, bgcolor: "background.paper", width: "40%" }}>Tag</TableCell>
                  <TableCell sx={{ fontWeight: 700, bgcolor: "background.paper" }}>Value</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.entries(exif!).map(([k, v]) => (
                  <TableRow key={k} hover>
                    <TableCell sx={{ fontWeight: 600, whiteSpace: "nowrap" }}>{k}</TableCell>
                    <TableCell sx={{ wordBreak: "break-all", fontFamily: k.includes("GPS") ? "monospace" : undefined, fontSize: 13 }}>
                      {v || <Box component="span" color="text.secondary">—</Box>}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: "block" }}>
            {Object.keys(exif!).length} tag(s) found. GPS coordinates are shown as DMS and decimal degrees.
          </Typography>
        </Box>
      )}

      {!hasResult && !error && !info && (
        <Box sx={{ p: 2, border: "1px dashed", borderColor: "divider", borderRadius: 2, textAlign: "center" }}>
          <Typography variant="body2" color="text.secondary">
            No image loaded. Choose a JPEG photo to inspect EXIF.
          </Typography>
        </Box>
      )}
    </ToolPaper>
  );
}
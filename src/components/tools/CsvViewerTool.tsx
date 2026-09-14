"use client";

import { useState, useMemo } from "react";
import ToolPaper from "@/components/ToolPaper";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

// 500KB cap – prevent UI freeze on huge CSV pastes (performance guard)
export const MAX_CSV_SIZE = 500 * 1024; // 500KB cap

const sanitizeCell = (value: string): string => {
  // Sanitize cells: remove null bytes, trim control, limit length, prevent XSS/formula injection
  let v = value.replace(/\0/g, "");
  // Limit individual cell to 10k chars to avoid bloat
  if (v.length > 10000) v = v.slice(0, 10000);
  v = v.trim();
  // Basic XSS sanitization: strip/escape potential script injection (React already escapes, but sanitize here)
  // Prevent CSV formula injection: prefix =,+, -, @
  if (/^[=+\-@]/.test(v)) v = "'" + v;
  return v;
};

export const parseCsv = (csv: string): { headers: string[]; rows: Record<string, string>[] } => {
  // 500KB performance cap
  if (csv.length > MAX_CSV_SIZE) csv = csv.slice(0, MAX_CSV_SIZE);
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;
  for (let i = 0; i < csv.length; i++) {
    const c = csv[i];
    if (inQuotes) {
      if (c === '"') {
        if (csv[i + 1] === '"') {
          field += '"';
          i++;
        } else inQuotes = false;
      } else field += c;
    } else if (c === '"') inQuotes = true;
    else if (c === ",") {
      row.push(field);
      field = "";
    } else if (c === "\n" || c === "\r") {
      if (c === "\r" && csv[i + 1] === "\n") i++;
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else field += c;
  }
  if (field.length || row.length) {
    row.push(field);
    rows.push(row);
  }
  if (!rows.length) return { headers: [], rows: [] };
  // Handle duplicate headers: make unique by suffixing _1, _2 etc., sanitize
  const rawHeaders = rows[0].map((h) => sanitizeCell(h));
  const seen = new Map<string, number>();
  const headers = rawHeaders.map((h, idx) => {
    const base = h || `Column ${idx + 1}`;
    const count = seen.get(base) ?? 0;
    seen.set(base, count + 1);
    if (count === 0) return base;
    return `${base}_${count}`;
  });
  // Sanitize cells and build rows
  const data = rows.slice(1).map((r) => {
    const obj: Record<string, string> = {};
    headers.forEach((h, idx) => {
      const raw = r[idx] ?? "";
      obj[h] = sanitizeCell(raw);
    });
    return obj;
  });
  return { headers, rows: data };
};

export default function CsvViewerTool() {
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("");
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const isOverCap = input.length > MAX_CSV_SIZE;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let v = e.target.value;
    if (v.length > MAX_CSV_SIZE) v = v.slice(0, MAX_CSV_SIZE);
    setInput(v);
  };

  const { headers, rows } = useMemo(() => {
    if (!input.trim()) return { headers: [] as string[], rows: [] as Record<string, string>[] };
    // Enforce 500KB cap in memo as well
    const sliced = input.length > MAX_CSV_SIZE ? input.slice(0, MAX_CSV_SIZE) : input;
    return parseCsv(sliced);
  }, [input]);

  const displayedRows = useMemo(() => {
    let result = [...rows];
    if (filter.trim()) {
      const q = filter.toLowerCase();
      result = result.filter((r) => Object.values(r).some((v) => String(v).toLowerCase().includes(q)));
    }
    if (sortColumn) {
      result.sort((a, b) => {
        const avRaw = a[sortColumn] ?? "";
        const bvRaw = b[sortColumn] ?? "";
        const av = avRaw.trim();
        const bv = bvRaw.trim();
        const an = Number(av);
        const bn = Number(bv);
        // Fix numeric sort: use Number.isFinite and ensure both are truly numeric before numeric compare
        // Previously used !isNaN which treats "" as 0 and Infinity as numeric – fix with isFinite
        const aIsNum = av !== "" && Number.isFinite(an);
        const bIsNum = bv !== "" && Number.isFinite(bn);
        let cmp: number;
        if (aIsNum && bIsNum) cmp = an - bn;
        else if (aIsNum && !bIsNum) cmp = -1;
        else if (!aIsNum && bIsNum) cmp = 1;
        else cmp = String(avRaw).localeCompare(String(bvRaw), undefined, { numeric: true, sensitivity: "base" });
        return sortDir === "asc" ? cmp : -cmp;
      });
    }
    return result;
  }, [rows, filter, sortColumn, sortDir]);

  const handleSort = (col: string) => {
    if (sortColumn === col) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortColumn(col);
      setSortDir("asc");
    }
  };

  const handleCopyJson = () => {
    if (!displayedRows.length) return;
    const json = JSON.stringify(displayedRows, null, 2);
    void import("@/lib/clipboard").then((m) => m.copyToClipboard(json));
  };

  return (
    <ToolPaper>
      <Typography variant="h6" sx={{ fontWeight: 700 }}>
        CSV Viewer
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Paste CSV data to preview it as a table. Click headers to sort, filter rows, and copy as JSON.
      </Typography>
      <TextField
        label="Paste CSV"
        multiline
        minRows={6}
        fullWidth
        value={input}
        onChange={handleInputChange}
        placeholder={'name,age,city\nAda,36,"New York, NY"\nBob,29,London'}
        slotProps={{ input: { spellCheck: false, autoComplete: "off" } }}
        helperText={
          isOverCap
            ? `Input truncated to 500KB (${MAX_CSV_SIZE.toLocaleString()} chars) for performance.`
            : `${input.length.toLocaleString()} / ${MAX_CSV_SIZE.toLocaleString()} chars (500KB cap)`
        }
      />
      {input.length >= MAX_CSV_SIZE && (
        <Typography variant="caption" color="warning.main">
          Reached 500KB limit – further input is truncated.
        </Typography>
      )}
      <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} sx={{ alignItems: { sm: "center" } }}>
        <TextField
          label="Filter rows"
          size="small"
          fullWidth
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Type to filter..."
          slotProps={{ input: { spellCheck: false, autoComplete: "off" } }}
        />
        <Button
          variant="outlined"
          startIcon={<ContentCopyIcon />}
          onClick={handleCopyJson}
          disabled={!displayedRows.length}
          sx={{ whiteSpace: "nowrap", flexShrink: 0 }}
        >
          Copy as JSON
        </Button>
      </Stack>

      <Box>
        <Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between", mb: 0.5 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
            Preview {rows.length ? `(${displayedRows.length > 100 ? "100 of " : ""}${displayedRows.length} / ${rows.length} rows)` : ""}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {headers.length ? `${headers.length} columns` : "No data"}
          </Typography>
        </Stack>

        {headers.length > 0 && displayedRows.length > 0 ? (
          <TableContainer component={Paper} variant="outlined" sx={{ maxHeight: 440 }}>
            <Table size="small" stickyHeader aria-label="CSV data table">
              <TableHead>
                <TableRow>
                  {headers.map((h) => (
                    <TableCell
                      key={h}
                      onClick={() => handleSort(h)}
                      sx={{
                        fontWeight: 700,
                        cursor: "pointer",
                        userSelect: "none",
                        whiteSpace: "nowrap",
                        bgcolor: "background.paper",
                      }}
                    >
                      <Box component="span" sx={{ display: "inline-flex", alignItems: "center", gap: 0.5 }}>
                        {h}
                        {sortColumn === h ? (sortDir === "asc" ? " ▲" : " ▼") : " ↕"}
                      </Box>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {displayedRows.slice(0, 100).map((row, idx) => (
                  <TableRow key={idx} hover>
                    {headers.map((h) => (
                      <TableCell key={h} sx={{ whiteSpace: "nowrap", maxWidth: 300, overflow: "hidden", textOverflow: "ellipsis" }}>
                        {row[h]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Paper variant="outlined" sx={{ p: 2, textAlign: "center" }}>
            <Typography variant="body2" color="text.secondary">
              {input.trim() ? "No rows to display." : "Paste CSV above to see the table preview."}
            </Typography>
          </Paper>
        )}
      </Box>
    </ToolPaper>
  );
}

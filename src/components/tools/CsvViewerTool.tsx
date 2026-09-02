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

const parseCsv = (csv: string): { headers: string[]; rows: Record<string, string>[] } => {
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
  const headers = rows[0];
  const data = rows.slice(1).map((r) => Object.fromEntries(headers.map((h, idx) => [h, r[idx] ?? ""])));
  return { headers, rows: data };
};

export default function CsvViewerTool() {
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("");
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const { headers, rows } = useMemo(() => {
    if (!input.trim()) return { headers: [] as string[], rows: [] as Record<string, string>[] };
    return parseCsv(input);
  }, [input]);

  const displayedRows = useMemo(() => {
    let result = [...rows];
    if (filter.trim()) {
      const q = filter.toLowerCase();
      result = result.filter((r) => Object.values(r).some((v) => String(v).toLowerCase().includes(q)));
    }
    if (sortColumn) {
      result.sort((a, b) => {
        const av = a[sortColumn] ?? "";
        const bv = b[sortColumn] ?? "";
        const an = Number(av);
        const bn = Number(bv);
        const bothNumeric = av.trim() !== "" && bv.trim() !== "" && !isNaN(an) && !isNaN(bn);
        let cmp: number;
        if (bothNumeric) cmp = an - bn;
        else cmp = String(av).localeCompare(String(bv));
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
        onChange={(e) => setInput(e.target.value)}
        placeholder={'name,age,city\nAda,36,"New York, NY"\nBob,29,London'}
        slotProps={{ input: { spellCheck: false, autoComplete: "off" } }}
      />
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
            Preview {rows.length ? `(${displayedRows.length} / ${rows.length} rows)` : ""}
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
                {displayedRows.map((row, idx) => (
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

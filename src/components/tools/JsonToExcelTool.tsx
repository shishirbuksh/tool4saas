"use client";

import { useState, useMemo } from "react";
import ToolPaper from "@/components/ToolPaper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DownloadIcon from "@mui/icons-material/Download";
import TableViewIcon from "@mui/icons-material/TableView";

const escapeCsv = (v: unknown) => {
  const s = v === null || v === undefined ? "" : String(v);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};

const escapeHtml = (v: unknown) => {
  const s = v === null || v === undefined ? "" : String(v);
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
};

export default function JsonToExcelTool() {
  const [input, setInput] = useState('[\n  {"name": "Ada", "age": 36, "city": "London"},\n  {"name": "Bob", "age": 29, "city": "Paris"},\n  {"name": "Cara", "age": 31, "city": "New York"}\n]');

  const { data, headers, csv, error } = useMemo(() => {
    if (!input.trim()) return { data: [] as Record<string, unknown>[], headers: [] as string[], csv: "", error: "" };
    try {
      const parsed = JSON.parse(input);
      const arr: Record<string, unknown>[] = Array.isArray(parsed)
        ? parsed
        : typeof parsed === "object" && parsed !== null
          ? [parsed as Record<string, unknown>]
          : [];
      if (!Array.isArray(parsed) && (typeof parsed !== "object" || parsed === null)) {
        return { data: [], headers: [], csv: "", error: "JSON must be an object or an array of objects." };
      }
      if (arr.length === 0) return { data: [], headers: [], csv: "", error: "" };
      // validate array items are objects
      if (!arr.every((o) => typeof o === "object" && o !== null && !Array.isArray(o))) {
        return { data: [], headers: [], csv: "", error: "JSON array must contain objects only." };
      }
      const keys = Array.from(new Set(arr.flatMap((o) => Object.keys(o))));
      const lines = [keys.map(escapeCsv).join(",")];
      for (const row of arr) {
        lines.push(keys.map((k) => escapeCsv(row[k])).join(","));
      }
      return { data: arr, headers: keys, csv: lines.join("\n"), error: "" };
    } catch (e) {
      return { data: [], headers: [], csv: "", error: (e as Error).message };
    }
  }, [input]);

  const copy = (v: string) => v && void import("@/lib/clipboard").then((m) => m.copyToClipboard(v));

  const handleDownloadCsv = () => {
    if (!csv) return;
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "data.xls";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const handleDownloadXls = () => {
    if (!headers.length || !data.length) return;
    const headerRow = `<tr>${headers.map((h) => `<th style="background:#f0f0f0;border:1px solid #ccc;padding:4px 8px;text-align:left;">${escapeHtml(h)}</th>`).join("")}</tr>`;
    const bodyRows = data
      .map((row) => `<tr>${headers.map((h) => `<td style="border:1px solid #ccc;padding:4px 8px;">${escapeHtml(row[h])}</td>`).join("")}</tr>`)
      .join("");
    const html = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><meta charset="UTF-8" /><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>Sheet1</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>${headerRow}${bodyRows}</table></body></html>`;
    const blob = new Blob([html], { type: "application/vnd.ms-excel;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "data.xls";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const handleCopyCsv = () => copy(csv);

  const previewRows = data.slice(0, 100);

  return (
    <ToolPaper>
      <Typography variant="h6" sx={{ fontWeight: 700 }}>
        JSON to Excel
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Paste a JSON array of objects. Preview as a table, copy as CSV, and download as .xls (HTML table compatible with Excel).
      </Typography>

      <TextField
        label="Paste JSON array"
        multiline
        minRows={8}
        fullWidth
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder='[{"name":"Ada","age":36},{"name":"Bob","age":29}]'
        slotProps={{ input: { spellCheck: false, autoComplete: "off" } }}
        sx={{ "& textarea": { fontFamily: "monospace", fontSize: 13 } }}
        error={!!error}
        helperText={error || "Supports array of objects or a single object. All processing runs locally."}
      />

      {error && (
        <Alert severity="error" sx={{ mt: 1 }}>
          {error}
        </Alert>
      )}

      <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: "wrap" }}>
        <Button
          variant="contained"
          startIcon={<DownloadIcon />}
          onClick={handleDownloadXls}
          disabled={!headers.length || !!error}
        >
          Download .xls
        </Button>
        <Button
          variant="outlined"
          startIcon={<TableViewIcon />}
          onClick={handleDownloadCsv}
          disabled={!csv || !!error}
        >
          Download CSV (.xls)
        </Button>
        <Button
          variant="outlined"
          startIcon={<ContentCopyIcon />}
          onClick={handleCopyCsv}
          disabled={!csv || !!error}
        >
          Copy CSV
        </Button>
        <Button
          variant="text"
          onClick={() => copy(JSON.stringify(data, null, 2))}
          disabled={!data.length}
        >
          Copy JSON
        </Button>
      </Stack>

      <Box>
        <Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between", mb: 0.5 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
            Preview {data.length ? `(${previewRows.length} / ${data.length} rows)` : ""}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {headers.length ? `${headers.length} columns` : "No data"}
          </Typography>
        </Stack>

        {headers.length > 0 && previewRows.length > 0 ? (
          <TableContainer component={Paper} variant="outlined" sx={{ maxHeight: 440 }}>
            <Table size="small" stickyHeader aria-label="JSON to Excel preview">
              <TableHead>
                <TableRow>
                  {headers.map((h) => (
                    <TableCell
                      key={h}
                      sx={{ fontWeight: 700, whiteSpace: "nowrap", bgcolor: "background.paper" }}
                    >
                      {h}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {previewRows.map((row, idx) => (
                  <TableRow key={idx} hover>
                    {headers.map((h) => (
                      <TableCell
                        key={h}
                        sx={{ whiteSpace: "nowrap", maxWidth: 300, overflow: "hidden", textOverflow: "ellipsis" }}
                      >
                        {String(row[h] ?? "")}
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
              {input.trim() ? (error ? "Fix JSON errors to see preview." : "No rows to display.") : "Paste JSON above to see the table preview."}
            </Typography>
          </Paper>
        )}
        {data.length > 100 && (
          <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: "block" }}>
            Showing first 100 rows. Download to get all {data.length} rows.
          </Typography>
        )}
      </Box>

      {csv && !error && (
        <Alert severity="success">Parsed {data.length} rows with {headers.length} columns. Download opens directly in Excel.</Alert>
      )}
    </ToolPaper>
  );
}

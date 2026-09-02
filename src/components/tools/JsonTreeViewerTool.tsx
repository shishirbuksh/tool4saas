"use client";

import { useState, useMemo } from "react";
import ToolPaper from "@/components/ToolPaper";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import UnfoldLessIcon from "@mui/icons-material/UnfoldLess";

type JsonValue = unknown;

function getType(value: JsonValue): string {
  if (value === null) return "null";
  if (Array.isArray(value)) return "array";
  return typeof value;
}

function getValuePreview(value: JsonValue): string {
  if (value === null) return "null";
  if (typeof value === "string") return `"${value}"`;
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  if (value === undefined) return "undefined";
  if (Array.isArray(value)) return `Array(${value.length})`;
  if (typeof value === "object") return `Object(${Object.keys(value as Record<string, unknown>).length})`;
  return String(value);
}

function getTypeColor(type: string): string {
  switch (type) {
    case "string":
      return "#2e7d32";
    case "number":
      return "#1565c0";
    case "boolean":
      return "#6a1b9a";
    case "null":
      return "#757575";
    case "array":
      return "#e65100";
    case "object":
      return "#37474f";
    default:
      return "#616161";
  }
}

function collectPaths(value: JsonValue, path: string, out: string[]) {
  out.push(path);
  if (value !== null && typeof value === "object") {
    if (Array.isArray(value)) {
      value.forEach((item, idx) => {
        collectPaths(item, `${path}[${idx}]`, out);
      });
    } else {
      Object.entries(value as Record<string, unknown>).forEach(([k, v]) => {
        collectPaths(v, `${path}.${k}`, out);
      });
    }
  }
}

export default function JsonTreeViewerTool() {
  const [input, setInput] = useState(
    '{\n  "name": "Ada Lovelace",\n  "age": 36,\n  "active": true,\n  "roles": ["admin", "editor"],\n  "address": {\n    "city": "London",\n    "zip": null,\n    "coords": [51.5, -0.12]\n  },\n  "meta": {\n    "created": "2024-01-01",\n    "tags": []\n  }\n}'
  );
  const [expanded, setExpanded] = useState<Set<string>>(() => new Set(["root"]));
  const [copiedPath, setCopiedPath] = useState<string | null>(null);

  const { data, error } = useMemo(() => {
    if (!input.trim()) return { data: null as JsonValue, error: "" };
    if (input.length > 500_000) return { data: null, error: "Input too large (max 500 KB)" };
    try {
      const parsed = JSON.parse(input) as JsonValue;
      return { data: parsed, error: "" };
    } catch (e) {
      return { data: null, error: (e as Error).message };
    }
  }, [input]);

  const toggle = (path: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(path)) next.delete(path);
      else next.add(path);
      return next;
    });
  };

  const handleExpandAll = () => {
    if (data === null && error) return;
    if (data === undefined && !input.trim()) return;
    const all: string[] = [];
    if (data !== null || (input.trim() && !error)) {
      // data may be primitive root — still need to collect root path
      collectPaths(data, "root", all);
    }
    setExpanded(new Set(all));
  };

  const handleCollapseAll = () => {
    setExpanded(new Set());
  };

  const copyPath = (path: string) => {
    void import("@/lib/clipboard").then((m) => m.copyToClipboard(path));
    setCopiedPath(path);
    window.setTimeout(() => setCopiedPath((p) => (p === path ? null : p)), 1500);
  };

  const copyValue = (value: JsonValue) => {
    const text = typeof value === "string" ? value : JSON.stringify(value, null, 2);
    void import("@/lib/clipboard").then((m) => m.copyToClipboard(text ?? ""));
  };

  const renderNode = (name: string, value: JsonValue, path: string, depth: number) => {
    const type = getType(value);
    const isExpandable = value !== null && typeof value === "object";
    const isExpanded = expanded.has(path);
    const childrenCount = isExpandable
      ? Array.isArray(value)
        ? (value as unknown[]).length
        : Object.keys(value as Record<string, unknown>).length
      : 0;

    return (
      <Box key={path} sx={{ ml: depth * 2, borderLeft: depth > 0 ? "1px dashed #e0e0e0" : "none", pl: depth > 0 ? 1.2 : 0, py: 0.15 }}>
        <Stack direction="row" spacing={0.5} sx={{ alignItems: "center", flexWrap: "wrap", gap: 0.5 }}>
          {isExpandable ? (
            <Button
              size="small"
              onClick={() => toggle(path)}
              sx={{ minWidth: 28, width: 28, height: 22, p: 0, color: "text.secondary" }}
              aria-label={isExpanded ? `Collapse ${path}` : `Expand ${path}`}
            >
              {isExpanded ? <ExpandMoreIcon sx={{ fontSize: 18 }} /> : <ChevronRightIcon sx={{ fontSize: 18 }} />}
            </Button>
          ) : (
            <Box sx={{ width: 28, height: 22, display: "inline-flex" }} />
          )}

          {name !== "__root__" && (
            <Typography variant="body2" component="span" sx={{ fontWeight: 600, fontFamily: "monospace", fontSize: 13, color: "#1a237e" }}>
              {name}
              <Typography component="span" sx={{ fontWeight: 400, color: "text.secondary" }}>
                :
              </Typography>
            </Typography>
          )}

          {isExpandable ? (
            <Typography
              variant="body2"
              component="span"
              sx={{ fontFamily: "monospace", fontSize: 12.5, color: "text.secondary", cursor: "pointer" }}
              onClick={() => toggle(path)}
            >
              {type === "array" ? `Array[${childrenCount}]` : `Object{${childrenCount}}`}
              {!isExpanded && childrenCount > 0 && (
                <Typography component="span" sx={{ ml: 0.5, color: "text.disabled", fontSize: 12 }}>
                  {type === "array" ? "[…]" : "{…}"}
                </Typography>
              )}
            </Typography>
          ) : (
            <Typography
              variant="body2"
              component="span"
              sx={{
                fontFamily: "monospace",
                fontSize: 13,
                color: getTypeColor(type),
                wordBreak: "break-all",
                fontWeight: type === "string" ? 400 : 500,
              }}
            >
              {getValuePreview(value)}
            </Typography>
          )}

          <Typography
            variant="caption"
            sx={{
              ml: 0.5,
              px: 0.6,
              py: 0.15,
              borderRadius: 0.5,
              bgcolor: "#f5f5f5",
              color: getTypeColor(type),
              fontFamily: "monospace",
              fontSize: 11,
              fontWeight: 600,
              border: "1px solid #eeeeee",
            }}
          >
            {type}
          </Typography>

          <Stack direction="row" spacing={0.25} sx={{ ml: 0.5 }}>
            <Button
              size="small"
              variant="text"
              startIcon={<ContentCopyIcon sx={{ fontSize: 14 }} />}
              onClick={() => copyPath(path)}
              sx={{ fontSize: 11, py: 0.1, px: 0.6, minWidth: 0, height: 20, textTransform: "none" }}
              aria-label={`Copy path ${path}`}
            >
              {copiedPath === path ? "Copied!" : "path"}
            </Button>
            {!isExpandable && (
              <Button
                size="small"
                variant="text"
                startIcon={<ContentCopyIcon sx={{ fontSize: 14 }} />}
                onClick={() => copyValue(value)}
                sx={{ fontSize: 11, py: 0.1, px: 0.6, minWidth: 0, height: 20, textTransform: "none" }}
                aria-label={`Copy value ${path}`}
              >
                value
              </Button>
            )}
          </Stack>
        </Stack>

        {isExpandable && isExpanded && (
          <Box sx={{ mt: 0.25 }}>
            {childrenCount === 0 ? (
              <Typography variant="caption" sx={{ ml: 3.5, color: "text.disabled", fontFamily: "monospace", fontStyle: "italic" }}>
                {type === "array" ? "empty array" : "empty object"}
              </Typography>
            ) : Array.isArray(value) ? (
              (value as unknown[]).map((item, idx) => renderNode(`[${idx}]`, item, `${path}[${idx}]`, depth + 1))
            ) : (
              Object.entries(value as Record<string, unknown>).map(([k, v]) => renderNode(k, v, `${path}.${k}`, depth + 1))
            )}
          </Box>
        )}
      </Box>
    );
  };

  return (
    <ToolPaper>
      <Typography variant="h6" sx={{ fontWeight: 700 }}>
        JSON Tree Viewer
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Paste JSON to explore it as an interactive collapsible tree. Expand/collapse nodes, see types and values, and copy JSON paths.
      </Typography>

      <TextField
        label="JSON input"
        multiline
        minRows={8}
        maxRows={18}
        fullWidth
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder='{ "hello": "world", "count": 42 }'
        slotProps={{ input: { spellCheck: false, autoComplete: "off" } }}
        sx={{ "& textarea": { fontFamily: "monospace", fontSize: 13 } }}
      />

      {error ? (
        <Alert severity="error">Invalid JSON: {error}</Alert>
      ) : !input.trim() ? (
        <Alert severity="info">Enter JSON above to render the tree.</Alert>
      ) : null}

      {data !== null || (!error && input.trim() && data === null) ? null : null}

      {!error && input.trim() && data !== null && (
        <Box>
          <Stack direction="row" spacing={1} sx={{ alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 1, mb: 1 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
              Tree View
            </Typography>
            <Stack direction="row" spacing={1}>
              <Button size="small" variant="outlined" startIcon={<UnfoldMoreIcon />} onClick={handleExpandAll}>
                Expand all
              </Button>
              <Button size="small" variant="outlined" startIcon={<UnfoldLessIcon />} onClick={handleCollapseAll}>
                Collapse all
              </Button>
            </Stack>
          </Stack>

          <Box
            sx={{
              border: "1px solid #e0e0e0",
              borderRadius: 1.5,
              p: 1.5,
              bgcolor: "#fafafa",
              maxHeight: 520,
              overflow: "auto",
              fontFamily: "monospace",
            }}
          >
            {data !== null && typeof data === "object" ? (
              // root is object/array — show its children directly with root label
              <Box>
                <Stack direction="row" spacing={0.5} sx={{ alignItems: "center", mb: 0.5 }}>
                  <Button
                    size="small"
                    onClick={() => toggle("root")}
                    sx={{ minWidth: 28, width: 28, height: 22, p: 0, color: "text.secondary" }}
                    aria-label={expanded.has("root") ? "Collapse root" : "Expand root"}
                  >
                    {expanded.has("root") ? <ExpandMoreIcon sx={{ fontSize: 18 }} /> : <ChevronRightIcon sx={{ fontSize: 18 }} />}
                  </Button>
                  <Typography variant="body2" sx={{ fontWeight: 700, fontFamily: "monospace", fontSize: 13 }}>
                    root
                  </Typography>
                  <Typography variant="caption" sx={{ color: "text.secondary", fontFamily: "monospace" }}>
                    {Array.isArray(data) ? `Array[${(data as unknown[]).length}]` : `Object{${Object.keys(data as Record<string, unknown>).length}}`}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      px: 0.6,
                      py: 0.15,
                      borderRadius: 0.5,
                      bgcolor: "#fff",
                      color: getTypeColor(getType(data)),
                      fontFamily: "monospace",
                      fontSize: 11,
                      fontWeight: 600,
                      border: "1px solid #eeeeee",
                    }}
                  >
                    {getType(data)}
                  </Typography>
                  <Button
                    size="small"
                    variant="text"
                    startIcon={<ContentCopyIcon sx={{ fontSize: 14 }} />}
                    onClick={() => copyPath("root")}
                    sx={{ fontSize: 11, py: 0.1, px: 0.6, minWidth: 0, height: 20, textTransform: "none" }}
                  >
                    {copiedPath === "root" ? "Copied!" : "copy path"}
                  </Button>
                </Stack>
                {expanded.has("root") && (
                  <Box>
                    {Array.isArray(data)
                      ? (data as unknown[]).map((item, idx) => renderNode(`[${idx}]`, item, `root[${idx}]`, 1))
                      : Object.entries(data as Record<string, unknown>).map(([k, v]) => renderNode(k, v, `root.${k}`, 1))}
                    {Array.isArray(data) && (data as unknown[]).length === 0 && (
                      <Typography variant="caption" sx={{ ml: 3.5, color: "text.disabled", fontStyle: "italic" }}>
                        empty array
                      </Typography>
                    )}
                    {!Array.isArray(data) && Object.keys(data as Record<string, unknown>).length === 0 && (
                      <Typography variant="caption" sx={{ ml: 3.5, color: "text.disabled", fontStyle: "italic" }}>
                        empty object
                      </Typography>
                    )}
                  </Box>
                )}
              </Box>
            ) : (
              // primitive root
              renderNode("__root__", data, "root", 0)
            )}
          </Box>

          <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 1 }}>
            Tip: path uses dot notation for objects (e.g. <Box component="span" sx={{ fontFamily: "monospace" }}>root.address.city</Box>) and brackets for
            arrays (e.g. <Box component="span" sx={{ fontFamily: "monospace" }}>root.roles[0]</Box>).
          </Typography>
        </Box>
      )}

      {!error && input.trim() && data === null && getType(data) === "null" && (
        <Box
          sx={{
            border: "1px solid #e0e0e0",
            borderRadius: 1.5,
            p: 1.5,
            bgcolor: "#fafafa",
            maxHeight: 520,
            overflow: "auto",
          }}
        >
          {renderNode("__root__", data, "root", 0)}
        </Box>
      )}
    </ToolPaper>
  );
}

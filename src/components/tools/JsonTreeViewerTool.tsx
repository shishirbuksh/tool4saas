
import { useState, useMemo } from "react";
import ToolPaper from "@/components/ToolPaper";import { Box, TextField, Typography, Stack, Alert, Button } from "@/components/ds";

import { ContentCopy as ContentCopyIcon, ExpandMore as ExpandMoreIcon, ChevronRight as ChevronRightIcon, UnfoldMore as UnfoldMoreIcon, UnfoldLess as UnfoldLessIcon } from "@/components/ds/icons";

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
      <Box key={path} className="py-0.3" style={{ marginLeft: "calc((depth * 2) * 8px)", borderLeft: depth > 0 ? "1px dashed #e0e0e0" : "none", paddingLeft: "calc((depth > 0 ? 1.2 : 0) * 8px)" }}>
        <Stack direction="row" spacing={0.5} className="items-center flex-wrap gap-1">
          {isExpandable ? (
            <Button
              size="small"
              onClick={() => toggle(path)}
              className="min-w-[28px] w-[28px] h-[22px] p-0 text-base-content/70"
              aria-label={isExpanded ? `Collapse ${path}` : `Expand ${path}`}
            >
              {isExpanded ? <ExpandMoreIcon className="text-[18px]" /> : <ChevronRightIcon className="text-[18px]" />}
            </Button>
          ) : (
            <Box className="w-[28px] h-[22px] inline-flex" />
          )}

          {name !== "__root__" && (
            <Typography variant="body2" component="span" className="font-semibold text-[13px] text-[#1a237e]" style={{ fontFamily: "monospace" }}>
              {name}
              <Typography component="span" className="font-normal text-base-content/70">
                :
              </Typography>
            </Typography>
          )}

          {isExpandable ? (
            <Typography
              variant="body2"
              component="span"
              className="text-[12.5px] text-base-content/70 cursor-pointer" style={{ fontFamily: "monospace" }}
              onClick={() => toggle(path)}
            >
              {type === "array" ? `Array[${childrenCount}]` : `Object{${childrenCount}}`}
              {!isExpanded && childrenCount > 0 && (
                <Typography component="span" className="ml-1 text-base-content/40 text-[12px]">
                  {type === "array" ? "[…]" : "{…}"}
                </Typography>
              )}
            </Typography>
          ) : (
            <Typography
              variant="body2"
              component="span"
              className="text-[13px] break-all" style={{ fontFamily: "monospace", color: getTypeColor(type), fontWeight: type === "string" ? 400 : 500 }}
            >
              {getValuePreview(value)}
            </Typography>
          )}

          <Typography
            variant="caption"
            className="ml-1 px-1.2 py-0.3 rounded-[4px] bg-[#f5f5f5] text-[11px] font-semibold border border-[#eeeeee]" style={{ color: getTypeColor(type), fontFamily: "monospace" }}
          >
            {type}
          </Typography>

          <Stack direction="row" spacing={0.25} className="ml-1">
            <Button
              size="small"
              variant="text"
              startIcon={<ContentCopyIcon className="text-[14px]" />}
              onClick={() => copyPath(path)}
              className="text-[11px] py-0.2 px-1.2 min-w-[0px] h-[20px] normal-case"
              aria-label={`Copy path ${path}`}
            >
              {copiedPath === path ? "Copied!" : "path"}
            </Button>
            {!isExpandable && (
              <Button
                size="small"
                variant="text"
                startIcon={<ContentCopyIcon className="text-[14px]" />}
                onClick={() => copyValue(value)}
                className="text-[11px] py-0.2 px-1.2 min-w-[0px] h-[20px] normal-case"
                aria-label={`Copy value ${path}`}
              >
                value
              </Button>
            )}
          </Stack>
        </Stack>

        {isExpandable && isExpanded && (
          <Box className="mt-0.5">
            {childrenCount === 0 ? (
              <Typography variant="caption" className="ml-7 text-base-content/40 italic" style={{ fontFamily: "monospace" }}>
                {type === "array" ? "empty array" : "empty object"}
              </Typography>
            ) : Array.isArray(value) ? (
              <>
                {(value as unknown[]).slice(0, 200).map((item, idx) => renderNode(`[${idx}]`, item, `${path}[${idx}]`, depth + 1))}
                {(value as unknown[]).length > 200 && (
                  <Typography variant="caption" className="ml-7 text-base-content/70 italic">
                    ... {(value as unknown[]).length - 200} more items hidden
                  </Typography>
                )}
              </>
            ) : (
              <>
                {Object.entries(value as Record<string, unknown>).slice(0, 200).map(([k, v]) => renderNode(k, v, `${path}.${k}`, depth + 1))}
                {Object.keys(value as Record<string, unknown>).length > 200 && (
                  <Typography variant="caption" className="ml-7 text-base-content/70 italic">
                    ... {Object.keys(value as Record<string, unknown>).length - 200} more keys hidden
                  </Typography>
                )}
              </>
            )}
          </Box>
        )}
      </Box>
    );
  };

  return (
    <ToolPaper>
      <Typography variant="h6" className="font-bold">
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
        className="[&_textarea]:[font-family:monospace] [&_textarea]:text-[13px]"
      />

      {error ? (
        <Alert severity="error">Invalid JSON: {error}</Alert>
      ) : !input.trim() ? (
        <Alert severity="info">Enter JSON above to render the tree.</Alert>
      ) : null}

      {data !== null || (!error && input.trim() && data === null) ? null : null}

      {!error && input.trim() && data !== null && (
        <Box>
          <Stack direction="row" spacing={1} className="items-center justify-between flex-wrap gap-2 mb-2">
            <Typography variant="subtitle2" className="font-bold">
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
            className="border border-[#e0e0e0] rounded-[12px] p-3 bg-[#fafafa] max-h-[520px] overflow-auto" style={{ fontFamily: "monospace" }}
          >
            {data !== null && typeof data === "object" ? (
              // root is object/array — show its children directly with root label
              <Box>
                <Stack direction="row" spacing={0.5} className="items-center mb-1">
                  <Button
                    size="small"
                    onClick={() => toggle("root")}
                    className="min-w-[28px] w-[28px] h-[22px] p-0 text-base-content/70"
                    aria-label={expanded.has("root") ? "Collapse root" : "Expand root"}
                  >
                    {expanded.has("root") ? <ExpandMoreIcon className="text-[18px]" /> : <ChevronRightIcon className="text-[18px]" />}
                  </Button>
                  <Typography variant="body2" className="font-bold text-[13px]" style={{ fontFamily: "monospace" }}>
                    root
                  </Typography>
                  <Typography variant="caption" className="text-base-content/70" style={{ fontFamily: "monospace" }}>
                    {Array.isArray(data) ? `Array[${(data as unknown[]).length}]` : `Object{${Object.keys(data as Record<string, unknown>).length}}`}
                  </Typography>
                  <Typography
                    variant="caption"
                    className="px-1.2 py-0.3 rounded-[4px] bg-[#fff] text-[11px] font-semibold border border-[#eeeeee]" style={{ color: getTypeColor(getType(data)), fontFamily: "monospace" }}
                  >
                    {getType(data)}
                  </Typography>
                  <Button
                    size="small"
                    variant="text"
                    startIcon={<ContentCopyIcon className="text-[14px]" />}
                    onClick={() => copyPath("root")}
                    className="text-[11px] py-0.2 px-1.2 min-w-[0px] h-[20px] normal-case"
                  >
                    {copiedPath === "root" ? "Copied!" : "copy path"}
                  </Button>
                </Stack>
                {expanded.has("root") && (
                  <Box>
                    {Array.isArray(data)
                      ? (data as unknown[]).slice(0, 200).map((item, idx) => renderNode(`[${idx}]`, item, `root[${idx}]`, 1))
                      : Object.entries(data as Record<string, unknown>).slice(0, 200).map(([k, v]) => renderNode(k, v, `root.${k}`, 1))}
                    {Array.isArray(data) && (data as unknown[]).length > 200 && (
                      <Typography variant="caption" className="ml-7 text-base-content/70 italic">
                        ... {(data as unknown[]).length - 200} more items hidden
                      </Typography>
                    )}
                    {!Array.isArray(data) && Object.keys(data as Record<string, unknown>).length > 200 && (
                      <Typography variant="caption" className="ml-7 text-base-content/70 italic">
                        ... {Object.keys(data as Record<string, unknown>).length - 200} more keys hidden
                      </Typography>
                    )}

                    {Array.isArray(data) && (data as unknown[]).length === 0 && (
                      <Typography variant="caption" className="ml-7 text-base-content/40 italic">
                        empty array
                      </Typography>
                    )}
                    {!Array.isArray(data) && Object.keys(data as Record<string, unknown>).length === 0 && (
                      <Typography variant="caption" className="ml-7 text-base-content/40 italic">
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

          <Typography variant="caption" color="text.secondary" className="block mt-2">
            Tip: path uses dot notation for objects (e.g. <Box component="span" style={{ fontFamily: "monospace" }}>root.address.city</Box>) and brackets for
            arrays (e.g. <Box component="span" style={{ fontFamily: "monospace" }}>root.roles[0]</Box>).
          </Typography>
        </Box>
      )}

      {!error && input.trim() && data === null && getType(data) === "null" && (
        <Box
          className="border border-[#e0e0e0] rounded-[12px] p-3 bg-[#fafafa] max-h-[520px] overflow-auto"
        >
          {renderNode("__root__", data, "root", 0)}
        </Box>
      )}
    </ToolPaper>
  );
}

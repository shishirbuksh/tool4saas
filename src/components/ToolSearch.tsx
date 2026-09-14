"use client";

import { useDeferredValue, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import type { SxProps } from "@mui/material";
import { tools, type Tool } from "@/lib/tools";

type IndexedTool = Tool & { haystack: string };
const indexedTools: IndexedTool[] = tools.map((t) => ({
  ...t,
  haystack: [t.title, t.short, t.description, t.slug, ...(t.keywords ?? [])].join(" ").toLowerCase(),
}));

export default function ToolSearch({ sx }: { sx?: SxProps }) {
  const router = useRouter();
  const [value, setValue] = useState<Tool | null>(null);
  const [inputValue, setInputValue] = useState("");
  const deferredInput = useDeferredValue(inputValue);
  const filtered = useMemo(() => {
    const q = deferredInput.trim().toLowerCase();
    if (!q) return [];
    return indexedTools.filter((o) => o.haystack.includes(q)).slice(0, 8);
  }, [deferredInput]);

  return (
    <Autocomplete<Tool>
      options={filtered}
      value={value}
      inputValue={inputValue}
      onChange={(_, v) => {
        setValue(v);
        if (v) {
          router.push(`/${v.slug}`);
          setInputValue("");
          setValue(null);
        }
      }}
      onInputChange={(_, v) => setInputValue(v)}
      getOptionLabel={(o) => o.title}
      filterOptions={(x) => x}
      noOptionsText="No tools found"
      size="small"
      sx={{ width: { xs: "100%", md: 280 }, minWidth: 0, ...sx }}
      slotProps={{ popper: { sx: { zIndex: 1400 } } }}
      renderInput={({ InputLabelProps: _InputLabelProps, InputProps, ...params }: any) => (
        <TextField
          {...params}
          placeholder="Search tools…"
          slotProps={{
            input: {
              ...(params.slotProps?.input ?? InputProps),
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            },
            htmlInput: { 
              ...(params.slotProps?.htmlInput ?? params.inputProps), 
              "aria-label": "Search tools", 
              spellCheck: false, 
              autoComplete: "off" 
            },
          }}
        />
      )}
    />
  );
}

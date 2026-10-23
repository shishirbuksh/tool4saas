"use client";

import { useDeferredValue, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import type { SxProps } from "@mui/material";
import { SEARCH_TOOLS, type SearchTool } from "@/lib/tools/search-index.generated";

type ToolSearchProps = {
  sx?: SxProps;
  variant?: "header" | "hero";
  placeholder?: string;
};

export default function ToolSearch({ sx, variant = "header", placeholder }: ToolSearchProps) {
  const router = useRouter();
  const [value, setValue] = useState<SearchTool | null>(null);
  const [inputValue, setInputValue] = useState("");
  const deferredInput = useDeferredValue(inputValue);
  const isHero = variant === "hero";
  const filtered = useMemo(() => {
    const q = deferredInput.trim().toLowerCase();
    if (!q) return [];
    return SEARCH_TOOLS.filter((o) => o.haystack.includes(q)).slice(0, 8);
  }, [deferredInput]);

  return (
    <Autocomplete<SearchTool>
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
      size={isHero ? "medium" : "small"}
      sx={{
        width: isHero ? "100%" : { xs: "100%", md: 280 },
        minWidth: 0,
        "& .MuiInputBase-root": {
          minHeight: isHero ? 56 : 44,
          fontSize: isHero ? "1rem" : undefined,
          bgcolor: isHero ? "background.paper" : undefined,
          boxShadow: isHero ? "var(--shadow-md)" : undefined,
        },
        ...sx,
      }}
      slotProps={{ popper: { sx: { zIndex: 1400 } } }}
      renderInput={({ InputLabelProps: _InputLabelProps, InputProps, ...params }: any) => (
        <TextField
          {...params}
          placeholder={placeholder ?? "Search tools…"}
          slotProps={{
            input: {
              ...(params.slotProps?.input ?? InputProps),
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" aria-hidden="true" />
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

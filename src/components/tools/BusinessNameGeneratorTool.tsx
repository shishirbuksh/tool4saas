"use client";

import { useState } from "react";
import ToolPaper from "@/components/ToolPaper";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Chip from "@mui/material/Chip";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import DeleteIcon from "@mui/icons-material/Delete";
import { UINT32_MAX_PLUS_ONE } from "@/lib/format";

type StyleOption = "modern" | "classic" | "playful" | "tech" | "luxury";
type LengthOption = "short" | "medium" | "long" | "any";

const PREFIXES: string[] = [
  "Bright",
  "Swift",
  "Prime",
  "True",
  "Clear",
  "Bold",
  "Fresh",
  "Smart",
  "Pure",
  "Rapid",
  "Blue",
  "Golden",
  "Silver",
  "Ever",
  "Pro",
  "Ultra",
];

const SUFFIXES: string[] = [
  "Labs",
  "Hub",
  "Co",
  "Works",
  "Studio",
  "Partners",
  "Group",
  "Supply",
  "Market",
  "Foundry",
  "Collective",
  "House",
];

const BRAND_ENDINGS: string[] = ["ly", "ify", "ora", "io", "era", "ist", "well", "lane", "root", "craft"];

const STYLE_CORES: Record<StyleOption, string[]> = {
  modern: ["Nova", "Loop", "Shift", "Dash", "Wave", "Frame", "Drift", "Bloom"],
  classic: ["Heritage", "Sterling", "Crown", "Oak", "Harbor", "Stone", "Anchor", "Meridian"],
  playful: ["Bubble", "Sunny", "Cheery", "Zippy", "Bouncy", "Mango", "Sprinkle", "Wobble"],
  tech: ["Pixel", "Cloud", "Quantum", "Vector", "Kernel", "Syntax", "Cipher", "Node"],
  luxury: ["Velvet", "Opal", "Marble", "Silk", "Onyx", "Ivory", "Gilded", "Regal"],
};

function getRandomInt(max: number): number {
  if (max <= 0) return 0;
  if (typeof crypto !== "undefined" && typeof crypto.getRandomValues === "function") {
    const limit = UINT32_MAX_PLUS_ONE - (UINT32_MAX_PLUS_ONE % max);
    const buf = new Uint32Array(1);
    let r: number;
    do {
      crypto.getRandomValues(buf);
      r = buf[0];
    } while (r >= limit);
    return r % max;
  }
  return Math.floor(Math.random() * max);
}

function pick<T>(arr: T[]): T {
  return arr[getRandomInt(arr.length)];
}

function capitalize(word: string): string {
  const t = word.trim();
  if (!t) return "";
  return t.charAt(0).toUpperCase() + t.slice(1).toLowerCase();
}

function matchesLength(name: string, length: LengthOption): boolean {
  if (length === "any") return true;
  const compact = name.replace(/[^A-Za-z0-9]/g, "").length;
  if (length === "short") return compact <= 10;
  if (length === "medium") return compact >= 8 && compact <= 16;
  return compact > 14;
}

function buildOne(keyword: string, style: StyleOption): string {
  const clean = keyword.trim().replace(/[^A-Za-z0-9 ]/g, "").slice(0, 20);
  const key = clean ? capitalize(clean.split(/\s+/)[0]) : pick(STYLE_CORES[style]);
  const prefix = pick(PREFIXES);
  const core = pick(STYLE_CORES[style]);
  const suffix = pick(SUFFIXES);
  const ending = pick(BRAND_ENDINGS);
  const pattern = getRandomInt(6);
  switch (pattern) {
    case 0:
      return `${key} ${suffix}`;
    case 1:
      return `${prefix} ${key}`;
    case 2:
      return `${prefix} ${key} ${suffix}`;
    case 3:
      return `${key}${ending}`;
    case 4:
      return `${core} ${key}`;
    default:
      return `${key} & ${core}`;
  }
}

function generateNames(keyword: string, style: StyleOption, length: LengthOption, count = 12): string[] {
  const out = new Set<string>();
  let attempts = 0;
  while (out.size < count && attempts < count * 40) {
    attempts += 1;
    const name = buildOne(keyword, style).replace(/\s+/g, " ").trim();
    if (!name) continue;
    if (!matchesLength(name, length)) continue;
    out.add(name);
  }
  return Array.from(out);
}

export default function BusinessNameGeneratorTool() {
  const [keyword, setKeyword] = useState<string>("");
  const [style, setStyle] = useState<StyleOption>("modern");
  const [length, setLength] = useState<LengthOption>("any");
  const [names, setNames] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [copied, setCopied] = useState<string>("");

  const handleGenerate = () => {
    setNames(generateNames(keyword, style, length, 12));
    setCopied("");
  };

  const handleCopy = (value: string) => {
    if (!value) return;
    void import("@/lib/clipboard")
      .then((m) => m.copyToClipboard(value))
      .then(() => {
        setCopied(`Copied: ${value}`);
        setTimeout(() => setCopied(""), 1500);
      });
  };

  const toggleFavorite = (value: string) => {
    setFavorites((prev) => (prev.includes(value) ? prev.filter((f) => f !== value) : [...prev, value]));
  };

  const removeFavorite = (value: string) => {
    setFavorites((prev) => prev.filter((f) => f !== value));
  };

  const clearFavorites = () => {
    setFavorites([]);
  };

  const copyFavorites = () => {
    if (!favorites.length) return;
    handleCopy(favorites.join("\n"));
  };

  return (
    <ToolPaper>
      <Typography variant="h6" sx={{ fontWeight: 700 }}>
        Business Name Generator
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Enter a keyword, pick a style and length, then generate brandable names locally using prefix/suffix lists and crypto.getRandomValues.
      </Typography>

      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <TextField
          label="Keyword"
          placeholder="e.g. bake, fit, pixel"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          fullWidth
          slotProps={{ input: { spellCheck: false, autoComplete: "off" } }}
        />
        <FormControl fullWidth>
          <InputLabel id="bng-style-label">Style</InputLabel>
          <Select
            labelId="bng-style-label"
            label="Style"
            value={style}
            onChange={(e) => setStyle(e.target.value as StyleOption)}
          >
            <MenuItem value="modern">Modern</MenuItem>
            <MenuItem value="classic">Classic</MenuItem>
            <MenuItem value="playful">Playful</MenuItem>
            <MenuItem value="tech">Tech</MenuItem>
            <MenuItem value="luxury">Luxury</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="bng-length-label">Length</InputLabel>
          <Select
            labelId="bng-length-label"
            label="Length"
            value={length}
            onChange={(e) => setLength(e.target.value as LengthOption)}
          >
            <MenuItem value="any">Any length</MenuItem>
            <MenuItem value="short">Short (≤ 10 chars)</MenuItem>
            <MenuItem value="medium">Medium (8 – 16 chars)</MenuItem>
            <MenuItem value="long">Long (&gt; 14 chars)</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      <Stack direction="row" spacing={1} sx={{ alignItems: "center", flexWrap: "wrap" }}>
        <Button variant="contained" onClick={handleGenerate}>
          Generate names
        </Button>
        <Button
          variant="outlined"
          startIcon={<ContentCopyIcon />}
          disabled={!names.length}
          onClick={() => handleCopy(names.join("\n"))}
        >
          Copy all
        </Button>
        <Box sx={{ flexGrow: 1 }} />
        <Typography variant="caption" color="text.secondary">
          {names.length ? `${names.length} ideas` : "12 ideas per run"}
        </Typography>
      </Stack>

      {copied && (
        <Typography variant="caption" color="success.main">
          {copied}
        </Typography>
      )}

      {names.length > 0 ? (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" },
            gap: 1.5,
          }}
        >
          {names.map((name) => {
            const isFav = favorites.includes(name);
            return (
              <Paper key={name} variant="outlined" sx={{ p: 1.5, display: "flex", alignItems: "center", gap: 1 }}>
                <Box sx={{ minWidth: 0, flexGrow: 1 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700 }} noWrap title={name}>
                    {name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" noWrap>
                    {name.toLowerCase().replace(/[^a-z0-9]+/g, "")}.com
                  </Typography>
                </Box>
                <IconButton size="small" aria-label={`Copy ${name}`} onClick={() => handleCopy(name)}>
                  <ContentCopyIcon fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  aria-label={isFav ? `Remove ${name} from shortlist` : `Save ${name} to shortlist`}
                  onClick={() => toggleFavorite(name)}
                  color={isFav ? "warning" : "default"}
                >
                  {isFav ? <StarIcon fontSize="small" /> : <StarBorderIcon fontSize="small" />}
                </IconButton>
              </Paper>
            );
          })}
        </Box>
      ) : (
        <Paper variant="outlined" sx={{ p: 2, textAlign: "center" }}>
          <Typography variant="body2" color="text.secondary">
            Add an optional keyword, choose a style and length, then click Generate names.
          </Typography>
        </Paper>
      )}

      <Box>
        <Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between", mb: 1 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
            Shortlist ({favorites.length})
          </Typography>
          <Stack direction="row" spacing={1}>
            <Button size="small" variant="outlined" disabled={!favorites.length} onClick={copyFavorites}>
              Copy shortlist
            </Button>
            <Button size="small" disabled={!favorites.length} onClick={clearFavorites}>
              Clear
            </Button>
          </Stack>
        </Stack>
        {favorites.length > 0 ? (
          <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", gap: 1 }}>
            {favorites.map((fav) => (
              <Chip
                key={fav}
                label={fav}
                onClick={() => handleCopy(fav)}
                onDelete={() => removeFavorite(fav)}
                deleteIcon={<DeleteIcon />}
              />
            ))}
          </Stack>
        ) : (
          <Typography variant="body2" color="text.secondary">
            Star any idea to pin it here for comparison.
          </Typography>
        )}
      </Box>
    </ToolPaper>
  );
}

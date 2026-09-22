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
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DownloadIcon from "@mui/icons-material/Download";
import { UINT32_MAX_PLUS_ONE } from "@/lib/format";

// deterministic fake arrays (US default)
type Locale = "US" | "UK" | "IN";

const US_FIRST_NAMES = [
  "James", "Mary", "John", "Patricia", "Robert", "Jennifer", "Michael", "Linda",
  "William", "Elizabeth", "David", "Barbara", "Richard", "Susan", "Joseph", "Jessica",
  "Thomas", "Sarah", "Charles", "Karen", "Christopher", "Nancy", "Daniel", "Lisa",
  "Matthew", "Betty", "Anthony", "Margaret", "Mark", "Sandra",
];

const FIRST_NAMES = US_FIRST_NAMES;

const UK_FIRST_NAMES = [
  "Oliver", "Amelia", "George", "Isla", "Harry", "Poppy", "Jack", "Ava",
  "Jacob", "Lily", "Charlie", "Sophie", "Alfie", "Grace", "Freddie", "Evie",
  "Archie", "Ruby", "Henry", "Daisy", "Leo", "Mia", "Oscar", "Ella",
  "Arthur", "Isabelle", "Finley", "Chloe", "Teddy", "Freya",
];

const IN_FIRST_NAMES = [
  "Aarav", "Priya", "Rohan", "Neha", "Vikram", "Ananya", "Arjun", "Divya",
  "Kabir", "Meera", "Ishaan", "Kavya", "Aditya", "Sneha", "Rahul", "Pooja",
  "Karan", "Ritu", "Sahil", "Tanvi", "Manav", "Ira", "Dev", "Zoya",
  "Yash", "Naina", "Farhan", "Lakshmi", "Nikhil", "Shreya",
];

const US_LAST_NAMES = [
  "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis",
  "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas",
  "Taylor", "Moore", "Jackson", "Martin", "Lee", "Perez", "Thompson", "White",
  "Harris", "Sanchez", "Clark", "Ramirez", "Lewis", "Robinson",
];

const LAST_NAMES = US_LAST_NAMES;

const UK_LAST_NAMES = [
  "Smith", "Jones", "Taylor", "Davies", "Brown", "Wilson", "Evans", "Thomas",
  "Roberts", "Walker", "Wright", "Thompson", "White", "Hughes", "Edwards", "Green",
  "Hall", "Wood", "Harris", "Martin", "Clarke", "Patel", "Lewis", "Baker",
  "Adams", "Campbell", "Bell", "Cook", "Parker", "Miller",
];

const IN_LAST_NAMES = [
  "Sharma", "Patel", "Singh", "Gupta", "Mehta", "Reddy", "Iyer", "Khan",
  "Joshi", "Nair", "Agarwal", "Das", "Kulkarni", "Chopra", "Verma", "Malhotra",
  "Rao", "Pillai", "Bose", "Yadav", "Mishra", "Kapoor", "Jain", "Chauhan",
  "Pawar", "Desai", "Ghosh", "Menon", "Kaur", "Sinha",
];

const STREETS = [
  "Main St", "Oak Ave", "Maple Ave", "Cedar Ln", "Elm St", "Pine St", "Washington Ave",
  "Park Ave", "Lakeview Dr", "Sunset Blvd", "Broadway", "1st Ave", "2nd St", "Highland Ave",
  "Hill St", "Bridge St", "Church St", "Union St", "Market St", "Chestnut St",
];

const US_CITIES = [
  "New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia", "San Antonio",
  "San Diego", "Dallas", "San Jose", "Austin", "Jacksonville", "Fort Worth", "Columbus",
  "San Francisco", "Charlotte", "Indianapolis", "Seattle", "Denver", "Boston",
];

const CITIES = US_CITIES;

const UK_CITIES = [
  "London", "Birmingham", "Manchester", "Leeds", "Glasgow", "Liverpool", "Bristol",
  "Sheffield", "Edinburgh", "Cardiff", "Newcastle", "Nottingham", "Leicester", "Coventry",
  "Hull", "Plymouth", "Southampton", "Portsmouth", "York", "Oxford",
];

const IN_CITIES = [
  "Mumbai", "Delhi", "Bengaluru", "Hyderabad", "Chennai", "Kolkata", "Pune",
  "Ahmedabad", "Jaipur", "Surat", "Lucknow", "Kanpur", "Nagpur", "Indore",
  "Bhopal", "Ludhiana", "Patna", "Vadodara", "Kochi", "Coimbatore",
];

const COUNTRIES = ["USA", "Canada", "UK", "Australia", "Germany", "France", "Japan"];

const COMPANIES = [
  "Acme Corp", "Globex Corporation", "Soylent Corp", "Initech", "Umbrella Corp",
  "Hooli", "Stark Industries", "Wayne Enterprises", "Wonka Industries", "Cyberdyne Systems",
  "Massive Dynamic", "Gekko & Co", "Sterling Cooper", "Wonka Industries", "Oscorp",
  "Gotham Industries", "Acme Solutions", "Vertex Labs", "Apex Innovations", "BrightFuture LLC",
];

const COMPANY_SUFFIXES = ["Inc", "LLC", "Ltd", "Group", "Holdings", "Solutions", "Systems", "Technologies"];

const LOREM_WORDS = "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo consequat duis aute irure in reprehenderit voluptate velit esse cillum eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt culpa qui officia deserunt mollit anim id est laborum".split(" ");

type DataType = "person" | "address" | "company" | "lorem";

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

function firstNamesFor(locale: Locale): string[] {
  if (locale === "UK") return UK_FIRST_NAMES;
  if (locale === "IN") return IN_FIRST_NAMES;
  return US_FIRST_NAMES;
}

function lastNamesFor(locale: Locale): string[] {
  if (locale === "UK") return UK_LAST_NAMES;
  if (locale === "IN") return IN_LAST_NAMES;
  return US_LAST_NAMES;
}

function citiesFor(locale: Locale): string[] {
  if (locale === "UK") return UK_CITIES;
  if (locale === "IN") return IN_CITIES;
  return US_CITIES;
}

function countryFor(locale: Locale): string {
  if (locale === "UK") return "UK";
  if (locale === "IN") return "India";
  return "USA";
}

function postalHeaderFor(locale: Locale): string {
  if (locale === "UK") return "postcode";
  if (locale === "IN") return "pin";
  return "zip";
}

function randomPhone(locale: Locale = "US"): string {
  if (locale === "IN") {
    // +91 with 10-digit mobile starting 6-9, e.g. +91 98765 43210
    const first = String(6 + getRandomInt(4));
    let rest = "";
    for (let i = 0; i < 9; i++) rest += String(getRandomInt(10));
    const all = first + rest;
    return `+91 ${all.slice(0, 5)} ${all.slice(5)}`;
  }
  if (locale === "UK") {
    // +44 mobile, e.g. +44 7700 900123
    const a = 1000 + getRandomInt(9000);
    const b = 100000 + getRandomInt(900000);
    return `+44 7${String(a).slice(1)} ${b}`;
  }
  const a = 200 + getRandomInt(600);
  const b = 100 + getRandomInt(900);
  const c = 1000 + getRandomInt(9000);
  return `+1 (${a}) ${b}-${c}`;
}

function randomPostal(locale: Locale = "US"): string {
  if (locale === "IN") {
    // 6-digit PIN, e.g. 400001
    return String(100000 + getRandomInt(900000));
  }
  if (locale === "UK") {
    // Simplified UK postcode, e.g. SW1A 1AA
    const areas = ["SW", "EC", "W", "E", "N", "NW", "SE", "M", "B", "L", "G", "EH"];
    const letters = "ABDEFGLNPRSTUWXYZ";
    const area = pick(areas);
    const d1 = String(1 + getRandomInt(9));
    const d2 = String(getRandomInt(10));
    const l1 = letters[getRandomInt(letters.length)];
    const l2 = letters[getRandomInt(letters.length)];
    return `${area}${d1} ${d2}${l1}${l2}`;
  }
  return String(10000 + getRandomInt(90000));
}

function randomZip(): string {
  return randomPostal("US");
}

function randomEmail(name: string, domain?: string): string {
  const base = name.toLowerCase().replace(/[^a-z]+/g, ".").replace(/^\.+|\.+$/g, "");
  const suffix = getRandomInt(1000);
  const d = domain ?? "example.com";
  return `${base}${suffix % 3 === 0 ? suffix : ""}@${d}`;
}

function loremSentence(min = 6, max = 12): string {
  const len = min + getRandomInt(Math.max(1, max - min + 1));
  const words: string[] = [];
  for (let i = 0; i < len; i++) words.push(pick(LOREM_WORDS));
  let s = words.join(" ");
  s = s.charAt(0).toUpperCase() + s.slice(1);
  return s + ".";
}

function loremParagraph(_sentences = 3): string {
  const n = 2 + getRandomInt(3);
  return Array.from({ length: n }, () => loremSentence()).join(" ");
}

type Row = Record<string, string>;

function generateRows(type: DataType, count: number, locale: Locale = "US"): { headers: string[]; rows: Row[] } {
  const rows: Row[] = [];
  const firstNames = firstNamesFor(locale);
  const lastNames = lastNamesFor(locale);
  const cities = citiesFor(locale);
  const country = countryFor(locale);
  const postalHeader = postalHeaderFor(locale);
  if (type === "person") {
    const headers = ["id", "name", "email", "phone", "age"];
    for (let i = 0; i < count; i++) {
      const first = pick(firstNames);
      const last = pick(lastNames);
      const name = `${first} ${last}`;
      rows.push({
        id: String(i + 1),
        name,
        email: randomEmail(name),
        phone: randomPhone(locale),
        age: String(18 + getRandomInt(63)),
      });
    }
    return { headers, rows };
  }
  if (type === "address") {
    const headers = ["id", "street", "city", postalHeader, "country"];
    for (let i = 0; i < count; i++) {
      rows.push({
        id: String(i + 1),
        street: `${1 + getRandomInt(9999)} ${pick(STREETS)}`,
        city: pick(cities),
        [postalHeader]: randomPostal(locale),
        country,
      });
    }
    return { headers, rows };
  }
  if (type === "company") {
    const headers = ["id", "company", "domain", "email", "phone"];
    for (let i = 0; i < count; i++) {
      const base = pick(COMPANIES);
      const withSuffix = getRandomInt(2) === 0 ? `${base} ${pick(COMPANY_SUFFIXES)}` : base;
      const domain = withSuffix.toLowerCase().replace(/[^a-z0-9]+/g, "") + ".com";
      rows.push({
        id: String(i + 1),
        company: withSuffix,
        domain,
        email: `info@${domain}`,
        phone: randomPhone(locale),
      });
    }
    return { headers, rows };
  }
  // lorem
  const headers = ["id", "text"];
  for (let i = 0; i < count; i++) {
    rows.push({
      id: String(i + 1),
      text: loremParagraph(),
    });
  }
  return { headers, rows };
}

function toCSV(headers: string[], rows: Row[], includeHeader: boolean): string {
  const esc = (v: string) => {
    if (v == null) return "";
    const s = String(v);
    if (s.includes('"') || s.includes(",") || s.includes("\n")) return `"${s.replace(/"/g, '""')}"`;
    return s;
  };
  const lines: string[] = [];
  if (includeHeader) lines.push(headers.map(esc).join(","));
  for (const r of rows) lines.push(headers.map((h) => esc(r[h] ?? "")).join(","));
  return lines.join("\n");
}

export default function FakeDataGeneratorTool() {
  const [dataType, setDataType] = useState<DataType>("person");
  const [locale, setLocale] = useState<Locale>("US");
  const [count, setCount] = useState<string>("5");
  const [includeHeaders, setIncludeHeaders] = useState<boolean>(true);
  const [headers, setHeaders] = useState<string[]>([]);
  const [rows, setRows] = useState<Row[]>([]);
  const [copied, setCopied] = useState<string>("");

  const handleGenerate = () => {
    const n = Math.max(1, Math.min(500, parseInt(count, 10) || 5));
    const { headers: h, rows: r } = generateRows(dataType, n, locale);
    setHeaders(h);
    setRows(r);
    setCopied("");
  };

  const csvString = headers.length && rows.length ? toCSV(headers, rows, includeHeaders) : "";

  const handleCopy = () => {
    if (!csvString) return;
    void import("@/lib/clipboard").then((m) => m.copyToClipboard(csvString)).then(() => {
      setCopied("Copied!");
      setTimeout(() => setCopied(""), 1500);
    });
  };

  const handleDownload = () => {
    if (!csvString) return;
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `fake-${dataType}-${locale.toLowerCase()}-${rows.length}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <ToolPaper>
      <Typography variant="h6" sx={{ fontWeight: 700 }}>
        Fake Data Generator
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Generate realistic fake datasets for testing — people, addresses, companies or lorem text. Data is generated locally using crypto.getRandomValues and deterministic fake arrays.
      </Typography>

      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ alignItems: { sm: "center" } }}>
        <FormControl fullWidth>
          <InputLabel id="fake-data-type-label">Data type</InputLabel>
          <Select
            labelId="fake-data-type-label"
            label="Data type"
            value={dataType}
            onChange={(e) => setDataType(e.target.value as DataType)}
          >
            <MenuItem value="person">Person</MenuItem>
            <MenuItem value="address">Address</MenuItem>
            <MenuItem value="company">Company</MenuItem>
            <MenuItem value="lorem">Lorem</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Count"
          type="number"
          value={count}
          onChange={(e) => setCount(e.target.value)}
          fullWidth
          slotProps={{ input: { inputMode: "numeric", spellCheck: false, autoComplete: "off" } }}
          helperText="1 – 500"
        />

        <FormControl fullWidth>
          <InputLabel id="fake-data-locale-label">Locale</InputLabel>
          <Select
            labelId="fake-data-locale-label"
            label="Locale"
            value={locale}
            onChange={(e) => setLocale(e.target.value as Locale)}
          >
            <MenuItem value="US">US — +1, ZIP, New York</MenuItem>
            <MenuItem value="UK">UK — +44, Postcode, London</MenuItem>
            <MenuItem value="IN">IN — +91, PIN, Mumbai</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", alignItems: "center" }}>
        <FormControlLabel
          control={<Checkbox checked={includeHeaders} onChange={(e) => setIncludeHeaders(e.target.checked)} />}
          label="Include header row in CSV"
        />
        <Box sx={{ flexGrow: 1 }} />
        <Button variant="contained" onClick={handleGenerate}>
          Generate
        </Button>
        <Button
          variant="outlined"
          startIcon={<ContentCopyIcon />}
          onClick={handleCopy}
          disabled={!rows.length}
        >
          Copy CSV
        </Button>
        <Button
          variant="outlined"
          startIcon={<DownloadIcon />}
          onClick={handleDownload}
          disabled={!rows.length}
        >
          Download CSV
        </Button>
      </Stack>

      {copied && (
        <Typography variant="caption" color="success.main">
          {copied}
        </Typography>
      )}

      {rows.length > 0 ? (
        <Box>
          <Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between", mb: 1 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
              Preview — {rows.length} {dataType} {rows.length === 1 ? "row" : "rows"}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {headers.length} columns
            </Typography>
          </Stack>

          <TableContainer component={Paper} variant="outlined" sx={{ maxHeight: 440 }}>
            <Table size="small" stickyHeader aria-label="Fake data table">
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
                {rows.map((row, idx) => (
                  <TableRow key={idx} hover>
                    {headers.map((h) => (
                      <TableCell
                        key={h}
                        sx={{
                          whiteSpace: h === "text" ? "normal" : "nowrap",
                          maxWidth: h === "text" ? 520 : 220,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          fontSize: 13,
                        }}
                      >
                        {row[h]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box sx={{ mt: 1.5 }}>
            <Typography variant="caption" color="text.secondary" sx={{ display: "block", mb: 0.5 }}>
              CSV preview (first 3 rows)
            </Typography>
            <Box
              component="pre"
              sx={{
                p: 1.5,
                borderRadius: 1,
                border: "1px solid",
                borderColor: "divider",
                bgcolor: "background.paper",
                fontFamily: "monospace",
                fontSize: 12,
                whiteSpace: "pre-wrap",
                wordBreak: "break-all",
                maxHeight: 160,
                overflow: "auto",
                m: 0,
              }}
            >
              {csvString.split("\n").slice(0, includeHeaders ? 4 : 3).join("\n")}
              {csvString.split("\n").length > 4 ? "\n..." : ""}
            </Box>
          </Box>
        </Box>
      ) : (
        <Paper variant="outlined" sx={{ p: 2, textAlign: "center" }}>
          <Typography variant="body2" color="text.secondary">
            Choose a data type and count, then click Generate to create fake data.
          </Typography>
        </Paper>
      )}
    </ToolPaper>
  );
}

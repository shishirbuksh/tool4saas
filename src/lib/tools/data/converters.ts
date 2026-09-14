import type { Tool } from "../types";

export const convertersTools: Tool[] = [
  {
    slug: "unit-converter",
    title: "Unit Converter",
    short: "Convert length, weight, temp & more",
    description:
      "Convert length, weight, temperature, and more. Fast, accurate unit conversions right in your browser.",
    icon: "Straighten",
    keywords: ["unit converter", "convert units online", "length weight converter"],
    category: "converters",
    faq: [{"question":"Which units can I convert?","answer":"Length, weight, temperature, time and data units, among others."},{"question":"Is the unit converter accurate?","answer":"Yes. Conversions use standard factors and temperature uses exact formulas."},{"question":"Is it free and private?","answer":"Yes, it is free, works offline in your browser, and your data never leaves your device."}],
    howTo: [{"name":"Select quantity","text":"Select the quantity (length, weight, temperature, and more)."},{"name":"Enter value","text":"Enter the value and choose the from and to units."},{"name":"Read result","text":"Read the converted result instantly."}],
  },
  {
    slug: "json-csv",
    title: "JSON ↔ CSV Converter",
    short: "Convert between JSON and CSV",
    description:
      "Convert JSON arrays to CSV or parse CSV back to JSON. Fast, offline conversions for spreadsheets and APIs.",
    icon: "TableChart",
    keywords: ["json to csv", "csv to json", "convert json csv online"],
    category: "converters",
    faq: [{"question":"What JSON shape works for JSON to CSV?","answer":"An array of flat objects; keys become CSV columns."},{"question":"Is my data uploaded?","answer":"No. Conversion runs locally in your browser."},{"question":"Is it free and private?","answer":"Yes, it is free, works offline in your browser, and your data never leaves your device."}],
    howTo: [{"name":"Pick a direction","text":"Choose JSON to CSV or CSV to JSON."},{"name":"Paste data","text":"Paste your JSON array or CSV text."},{"name":"Copy result","text":"Copy the converted output."}],
  },
  {
    slug: "url-parser",
    title: "URL Parser",
    short: "Break down any URL",
    description:
      "Parse any URL into protocol, hostname, port, path, hash, and decoded query parameters with one-click copying for debugging links and API endpoints offline.",
    icon: "Http",
    keywords: ["url parser", "parse url", "query string parser"],
    category: "converters",
    faq: [{"question":"What does the parser extract?","answer":"Protocol, host, port, origin, path, query string and individual query parameters."},{"question":"Is my URL sent anywhere?","answer":"No. Parsing happens locally in your browser."},{"question":"Is it free and private?","answer":"Yes, it is free, works offline in your browser, and your data never leaves your device."}],
    howTo: [{"name":"Paste URL","text":"Paste a full URL including the protocol."},{"name":"Review parts","text":"See each component broken out."},{"name":"Inspect params","text":"Review the query parameters individually."}],
  },
  {
    slug: "number-to-words",
    title: "Number to Words",
    short: "Spell out numbers in English",
    description:
      "Convert integers and decimals into spelled-out English words for checks, invoices, and legal documents with correct hyphens, and, and plural forms offline.",
    icon: "Spellcheck",
    keywords: ["number to words", "number spell out", "integer to words"],
    category: "converters",
    faq: [{"question":"What range is supported?","answer":"Whole numbers up to a few trillion are supported, including zero and negatives."},{"question":"Is it free?","answer":"Yes, fully free and runs in your browser."},{"question":"Is it free and private?","answer":"Yes, it is free, works offline in your browser, and your data never leaves your device."}],
    howTo: [{"name":"Enter a number","text":"Type an integer."},{"name":"Read words","text":"See the number spelled out in English."},{"name":"Copy","text":"Copy the words to use elsewhere."}],
  },
  {
    slug: "roman-numeral",
    title: "Roman Numeral Converter",
    short: "Roman ↔ Arabic numbers",
    description:
      "Convert Roman numerals to Arabic numbers and back from 1 to 3999 with validation, subtractive-notation handling, and instant bidirectional results offline.",
    icon: "Numbers",
    keywords: ["roman numeral converter", "roman to number", "arabic to roman"],
    category: "converters",
    faq: [{"question":"What range is supported?","answer":"Integers from 1 to 3999, the standard Roman numeral range."},{"question":"Can it convert both ways?","answer":"Yes. Switch between number-to-Roman and Roman-to-number."},{"question":"Is it free and private?","answer":"Yes, it is free, works offline in your browser, and your data never leaves your device."}],
    howTo: [{"name":"Choose direction","text":"Pick number to Roman or Roman to number."},{"name":"Enter value","text":"Type a number or a Roman numeral."},{"name":"Copy result","text":"Copy the converted value."}],
  },
  {
    slug: "image-to-base64",
    title: "Image to Base64",
    short: "Encode & decode image data URLs",
    description:
      "Convert images to Base64 data URLs or decode them back to preview. Fast, offline encoding for web development.",
    icon: "Image",
    keywords: ["image to base64", "base64 image encoder", "data url converter"],
    category: "converters",
    faq: [{"question":"Are my images uploaded?","answer":"No. The file is read and encoded locally in your browser."},{"question":"Can I decode a Base64 image?","answer":"Yes. Paste a data URL to preview the image."},{"question":"Is it free and private?","answer":"Yes, it is free, works offline in your browser, and your data never leaves your device."}],
    howTo: [{"name":"Choose image","text":"Select an image file to encode."},{"name":"Or paste data URL","text":"Switch to decode mode and paste a Base64 data URL."},{"name":"Copy or preview","text":"Copy the data URL or preview the image."}],
  },
  {
    slug: "csv-viewer",
    title: "CSV Viewer",
    short: "View, sort & filter CSV",
    description: "View CSV files as sortable, filterable tables with column search, type-aware sorting, and JSON export while keeping large datasets fully private offline.",
    icon: "TableChart",
    keywords: ["csv viewer", "csv to table", "view csv online"],
    category: "converters",
    faq: [{ question: "Does it handle quotes?", answer: "Yes, RFC 4180 quoted fields with double quotes and commas are parsed correctly." }, { question: "Can I sort?", answer: "Yes, click headers to sort asc/desc and filter to narrow rows." }, { question: "Is it free and private?", answer: "Yes, it is free, works offline in your browser, and your data never leaves your device." }],
    howTo: [{ name: "Paste CSV", text: "Paste CSV text or upload file content." }, { name: "View table", text: "See data as sortable table." }, { name: "Filter & copy", text: "Filter rows and copy as JSON." }]
  },
  {
    slug: "morse-translator",
    title: "Morse Code Translator",
    short: "Text ↔ Morse code",
    description: "Translate English text to Morse code dots and dashes and decode back with precise letter spacing, word slashes, and audio-friendly playback timing offline.",
    icon: "Code",
    keywords: ["morse code translator", "text to morse", "morse decoder"],
    category: "converters",
    faq: [{ question: "What characters are supported?", answer: "A-Z and 0-9. Unknown characters are skipped. Morse uses dot-dash with space between letters and / between words." }, { question: "Is it private?", answer: "Yes, translation is a lookup table running locally." }, { question: "Is it free and private?", answer: "Yes, it is free, works offline in your browser, and your data never leaves your device." }],
    howTo: [{ name: "Choose mode", text: "Pick Encode (text→Morse) or Decode (Morse→text)." }, { name: "Enter input", text: "Type text or paste Morse with spaces and /." }, { name: "Copy", text: "Copy the translated output." }]
  },
  {
    slug: "ascii-converter",
    title: "ASCII / Hex / Binary Converter",
    short: "Text ↔ codes",
    description: "Convert text to ASCII codes, hex, binary, and octal with live encoding tables, delimiter options, and reverse decoding for debugging data formats offline.",
    icon: "Code",
    keywords: ["ascii converter", "text to hex", "binary converter text"],
    category: "converters",
    faq: [{ question: "What bases are supported?", answer: "Decimal ASCII, hex (2-digit), binary (8-bit) and octal. Decode supports all four via radio selection." }, { question: "Is it private?", answer: "Yes, charCodeAt and parseInt run locally." }, { question: "Is it free and private?", answer: "Yes, it is free, works offline in your browser, and your data never leaves your device." }],
    howTo: [{ name: "Encode", text: "Type text to see ASCII, hex, binary and octal." }, { name: "Decode", text: "Switch to Decode and paste codes to get text." }, { name: "Copy", text: "Copy any encoding." }]
  },
  {
    slug: "file-size-converter",
    title: "File Size Converter",
    short: "Bytes, KB, MB, GB",
    description: "Convert bytes, KB, MB, GB, TB, and PB between binary 1024 and decimal 1000 standards with precise formatting for storage planning and uploads offline.",
    icon: "Straighten",
    keywords: ["file size converter", "bytes to mb", "kb to gb converter"],
    category: "converters",
    faq: [{ question: "Binary vs decimal?", answer: "Binary uses 1024 (KiB), decimal uses 1000 (KB). Toggle to see both." }, { question: "Is it private?", answer: "Yes, byte math with 1024/1000 bases runs locally; your numbers never leave the browser." }, { question: "Is it free and private?", answer: "Yes, it is free, works offline in your browser, and your data never leaves your device." }],
    howTo: [{ name: "Enter value", text: "Enter number and select from unit." }, { name: "Choose target", text: "Select to unit and base." }, { name: "View", text: "See converted result." }]
  },
  {
    slug: "json-to-excel",
    title: "JSON to Excel",
    short: "JSON → XLS download",
    description: "Convert JSON arrays into Excel-compatible XLS tables with automatic headers, nested-field flattening, live preview, and one-click download privately offline.",
    icon: "TableChart",
    keywords: ["json to excel", "json to xls", "convert json to excel"],
    category: "converters",
    faq: [{ question: "What JSON is accepted?", answer: "Array of objects or single object (wrapped). Keys become headers." }, { question: "Is it private?", answer: "Yes, JSON parsing and XLS table building run locally; your data never leaves the browser." }, { question: "Is it free and private?", answer: "Yes, it is free, works offline in your browser, and your data never leaves your device." }],
    howTo: [{ name: "Paste JSON", text: "Paste JSON array." }, { name: "Preview", text: "See table preview." }, { name: "Download", text: "Download .xls." }]
  },
  {
    slug: "zip-creator",
    title: "ZIP Creator",
    short: "Create ZIP files",
    description: "Bundle multiple text files into a downloadable ZIP archive. Create and compress files entirely offline.",
    icon: "AttachFile",
    keywords: ["zip creator", "create zip online", "make zip file"],
    category: "converters",
    faq: [{ question: "What files can I add?", answer: "Text files with filename and content. Add, remove and set ZIP name." }, { question: "Is it private?", answer: "Yes, the ZIP archive builds locally with fflate from your named files; nothing is uploaded." }, { question: "Is it free and private?", answer: "Yes, it is free, works offline in your browser, and your data never leaves your device." }],
    howTo: [{ name: "Add files", text: "Enter filename and content for each file." }, { name: "Set ZIP name", text: "Choose ZIP filename." }, { name: "Create", text: "Click Create ZIP and download." }]
  },
  {
    slug: "currency-converter",
    title: "Currency Converter",
    short: "Live rates + offline",
    description: "Convert 150+ currencies with live rates and offline fallback. Instantly check exchange rates directly in your browser.",
    icon: "AttachMoney",
    keywords: ["currency converter", "usd to eur", "exchange rate calculator"],
    category: "converters",
    faq: [{ question: "Are rates live or offline?", answer: "Live via open.er-api.com with static fallback when offline; shows source and timestamp." }, { question: "Is it private?", answer: "Yes, conversion runs locally; only rate fetch hits API." }, { question: "Is it free and private?", answer: "Yes, it is free, works offline in your browser, and your data never leaves your device." }],
    howTo: [{ name: "Enter amount", text: "Type amount to convert." }, { name: "Pick pair", text: "Choose from and to currencies." }, { name: "View", text: "See converted result instantly." }]
  },
];

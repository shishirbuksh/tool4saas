import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>A CSV file looks simple until a field contains a comma, a quoted newline, a leading zero or a formula. Spreadsheet software hides those details behind formatting, and by the time an import fails the original file may already be open in three places. A quick table preview is a cheap way to see what the parser will actually see before the data reaches a database or a billing system.</p>
<p>Part of the <a href="/blog/json-formatter-guide">developer toolkit guide</a>. The local <a href="/csv-viewer">CSV viewer</a> accepts pasted text rather than a file upload. That keeps the data in the page, but it also means the first step is opening the file in a text editor and copying its contents. For files that must stay on disk, use a desktop parser with the same review checklist.</p>

<h2 id="why-preview">Why a preview catches problems Excel hides</h2>
<p>Spreadsheets interpret values as you open them. A product code of <code>00123</code> may display as <code>123</code>. A date may be reordered according to the machine's locale. A long number may lose precision after the fifteenth digit. The file itself still contains the original text, but what you see on screen is a rendering, not the bytes. A plain-text preview shows the delimiters and quotes before any interpretation.</p>
<p>Formula injection is the other reason to inspect. A cell beginning with <code>=</code>, <code>+</code>, <code>-</code> or <code>@</code> can be executed as a formula by some spreadsheet programs when the file is opened or re-exported. That is dangerous for exports built from user input. The viewer prefixes those cells with an apostrophe in its output so the leading character is visibly neutralized, but that is a display aid, not a complete security control for every downstream tool.</p>
<p>Encoding problems also surface early. A UTF-8 BOM at the start of the file can become part of the first header if a naive parser does not strip it. Windows line endings, stray blank lines and mixed quoting styles all change how rows are counted. Looking at the first few records in a neutral viewer is faster than debugging a failed import after the fact.</p>

<h2 id="tool-behavior">What the viewer does with pasted CSV</h2>
<p>The input is capped at 500,000 characters, roughly 500 KB. Parsing is comma-only and follows the common quoting rules: a field wrapped in double quotes may contain commas and newlines, and a doubled quote inside a quoted field becomes one literal quote. Both LF and CRLF line endings are accepted. The first row becomes the header row.</p>
<p>Headers are cleaned before display. A blank header becomes <code>Column 1</code>, and duplicates get a numeric suffix such as <code>name_1</code>. Cell values are trimmed, null bytes are removed and each cell is capped at 10,000 characters. A cell that starts with a formula character is prefixed with an apostrophe in the parsed output. These transformations make the preview stable, but they also mean the copied JSON is not a byte-for-byte export of the original file.</p>
<p>The table shows at most 100 rows at a time, with a count of filtered rows and total rows above it. The filter is a case-insensitive substring match across every column of a row. Clicking a header sorts by that column: in ascending order, numeric values sort numerically and come before text, while text uses a locale-aware comparison that handles embedded numbers. Clicking the same header again reverses the direction.</p>
<p>The Copy as JSON button exports the currently filtered and sorted rows, not just the 100 visible ones. That is useful for a quick API fixture, but the output is an array of objects keyed by the cleaned headers. Nested structures, dates and numbers all become strings. If you need typed values, convert them after the copy rather than assuming the JSON preserves the original types.</p>

<h2 id="formula-safety">Formula injection and the apostrophe prefix</h2>
<p>A value such as <code>=HYPERLINK("https://example.com","click")</code> is data in a CSV file but a formula in a spreadsheet. Prefixing it with an apostrophe is a common spreadsheet convention that forces the cell to be treated as text. The viewer applies that prefix when it builds its rows, so the preview and the copied JSON show the neutralized form. It does not rewrite the source file, and it cannot guarantee that a different import tool will honor the apostrophe the same way.</p>
<p>If you are generating CSV for others, sanitize at the source: prefix dangerous leading characters, quote fields that contain delimiters, and document the expected encoding. If you are importing a file from an untrusted source, open it in a viewer or a text editor first, not in a spreadsheet with macros enabled. The viewer's transformation is one layer of defense, not a replacement for validating the data.</p>
<p>Leading zeros are a separate issue. The viewer keeps them as text, which is usually what you want for postal codes, account numbers and product IDs. A spreadsheet may drop them unless the column is explicitly formatted as text. When you export JSON for an application, keep those fields as strings to avoid the same loss.</p>

<h2 id="sort-filter">Sorting and filtering quirks</h2>
<p>The filter is a simple substring search, not a query language. It does not support column scoping, negation or regular expressions. A search for <code>2026</code> matches every row containing that sequence anywhere, including a product name or a note. Clear the filter before sorting if the row count looks wrong; the sort applies to the filtered set.</p>
<p>Numeric detection uses the browser's number parsing. Values such as <code>1e3</code> and <code>0x10</code> may be treated as numbers, and a value with a currency symbol is not. Mixed columns therefore produce an order where numeric-looking cells come first, followed by text. That is predictable once you know the rule, but it is not the same as a database sort with a declared type.</p>
<p>Duplicate headers are renamed rather than rejected. If the original file has two columns called <code>email</code>, the second becomes <code>email_1</code>. Any downstream mapping that expects the original duplicate name will need adjustment. This is a good reason to inspect headers before writing an import script.</p>

<h2 id="limits">What this viewer does not do</h2>
<table>
<thead><tr><th>Task</th><th>Viewer behavior</th><th>Better tool</th></tr></thead>
<tbody>
<tr><td><strong>Open a file directly</strong></td><td>Paste text only</td><td>A desktop editor or a parser script</td></tr>
<tr><td><strong>Detect delimiters</strong></td><td>Comma only</td><td>A CSV library with delimiter sniffing</td></tr>
<tr><td><strong>Preserve raw bytes</strong></td><td>Trims cells and prefixes formulas</td><td>A byte-level parser</td></tr>
<tr><td><strong>Edit or export CSV</strong></td><td>No editing; JSON copy only</td><td>A spreadsheet or a data tool</td></tr>
<tr><td><strong>Validate types</strong></td><td>Everything is a string</td><td>Schema validation in your import pipeline</td></tr>
<tr><td><strong>Large files</strong></td><td>500,000-character cap</td><td>Streaming parser or database import</td></tr>
</tbody>
</table>
<p>Semicolon-separated and tab-separated files will appear as a single column because the parser expects commas. Replace the delimiter in a copy if the data is otherwise simple, or use a parser that accepts a delimiter option. Quoted commas are handled, but a stray quote that is never closed can swallow the rest of the file into one field; check the last row if the preview looks short.</p>

<h2 id="workflow">A five-minute import check</h2>
<ol>
<li>Open the file in a text editor and confirm it is really comma-separated.</li>
<li>Copy the first few hundred lines into the viewer and check the header names.</li>
<li>Filter for the values that usually break: leading zeros, long IDs, dates and formula characters.</li>
<li>Sort by the column you plan to join on and look for unexpected blanks or duplicates.</li>
<li>Copy the filtered JSON as a fixture, then validate it against the real import schema.</li>
<li>Keep the original file unchanged and test the import in staging before production.</li>
</ol>
<p>For a structured conversion rather than a preview, the <a href="/blog/json-formatter-guide/json-to-csv">JSON to CSV guide</a> covers the reverse direction. For payload validation after the copy, see the <a href="/blog/json-formatter-guide/json-parse-errors">JSON parse error guide</a>.</p>
<div class="cta-box"><strong>Preview a CSV now:</strong> paste the text into the <a href="/csv-viewer">CSV viewer</a>, sort and filter it, then copy the rows you need as JSON. Nothing is uploaded, and the original file stays untouched.</div>
`;

export const csvViewer: BlogPost = {
  pillar: "json-formatter-guide",
  slug: "inspect-csv-before-import",
  kind: "cluster",
  title: "Inspect a CSV File Before You Import It",
  description:
    "Preview pasted CSV data without Excel, handle quoted fields and formulas safely, and copy filtered rows as JSON for an import test.",
  keywords: ["csv viewer online", "open csv without excel", "inspect csv file", "csv formula injection", "csv to json preview"],
  toolSlugs: ["csv-viewer"],
  relatedSlugs: ["json-to-csv", "json-parse-errors", "mime-type-content-type"],
  published: "2026-10-23",
  updated: "2026-10-23",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "why-preview", text: "Why preview a CSV", level: 2 },
    { id: "tool-behavior", text: "Viewer behavior", level: 2 },
    { id: "formula-safety", text: "Formula injection", level: 2 },
    { id: "sort-filter", text: "Sorting and filtering", level: 2 },
    { id: "limits", text: "What it does not do", level: 2 },
    { id: "workflow", text: "Import check workflow", level: 2 },
  ],
  html,
  faqs: [
    { question: "Can I upload a CSV file instead of pasting it?", answer: "No. The viewer accepts pasted text only. Open the file in a text editor or terminal and copy the contents, or use a desktop parser if the data cannot leave the machine. The paste limit is 500,000 characters." },
    { question: "Does it support semicolon-separated files?", answer: "No. The parser expects commas. A semicolon-separated file will appear as one column with the semicolons inside the values. Convert the delimiter in a copy or use a CSV library that accepts a delimiter option." },
    { question: "Why did my leading zeros disappear?", answer: "The viewer keeps cells as text, so leading zeros should remain visible. A spreadsheet is more likely to drop them. When exporting JSON, keep ID and postal-code fields as strings, and check the import target's type coercion as well." },
    { question: "What does the apostrophe before a value mean?", answer: "The viewer prefixes cells that start with a formula character to make them display as text. It is a preview-level neutralization, not a guarantee that every downstream spreadsheet will behave the same way. Sanitize untrusted exports at the source and open unknown files outside a macro-enabled spreadsheet." },
    { question: "Does Copy as JSON include the visible 100 rows only?", answer: "No. It exports every row in the current filtered and sorted result, even though the table preview shows at most 100. All values are strings, and the headers are the cleaned versions shown in the table." },
  ],
};

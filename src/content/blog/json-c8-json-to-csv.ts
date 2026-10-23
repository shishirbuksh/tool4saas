import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>A spreadsheet request sounds simple: take the JSON returned by an API and turn it into rows. The first attempt often produces a single column of [object Object], or columns that shift when one record carries an extra field. JSON and CSV disagree about structure. JSON allows nested objects and missing keys; CSV expects a rectangle of cells. Conversion works when the source is a flat array of objects and you understand how the converter builds the header, fills gaps and escapes values.</p>
<p>Part of the <a href="/blog/json-formatter-guide">developer toolkit guide</a>. Run the conversion in the <a href="/json-csv">JSON to CSV converter</a>. If the payload needs repair first, the <a href="/blog/json-formatter-guide/json-parse-errors">JSON parse error guide</a> covers the common syntax faults.</p>

<h2 id="flat-array-rule">The flat array rule</h2>
<p>The converter accepts one shape: a JSON array whose entries are objects. A top-level object fails with “JSON must be an array of objects.” An array of strings or numbers has no stable field names, and a null entry has no keys, so neither belongs in a CSV export. Wrap each record in an object with named properties before converting.</p>
<p>Flat means each value is a scalar: a string, number, boolean or null. Nested objects are not flattened. The converter calls String(value), so <code>{"customer":{"name":"Ada"}}</code> becomes <code>[object Object]</code> in the cell. Arrays are turned into comma-joined text, which can collide with the CSV delimiter. If a cell must hold a list, serialize it deliberately first, for example as <code>math|science</code>.</p>
<p>An empty array returns empty output, not a header, because there are no keys to union. A single object outside an array is rejected even though it looks like one record. If the API wraps the rows in a field such as <code>data</code> or <code>results</code>, unwrap that field first; the converter does not search inside an object for the first array it finds. These strict shapes are deliberate: guessing where the rows live would create silent, hard-to-audit exports.</p>
<p>The tool also has no delimiter menu. Output is comma-separated. If a locale expects semicolons, do not assume conversion will adapt; convert first, then handle the separator in your spreadsheet import step. The header is built from JSON keys, not from a template you supply.</p>

<h2 id="union-and-order">Union keys and column order</h2>
<p>The header is the union of every key in the array, in first-seen order. It is not taken from the first row alone. A field that appears only in the third record still becomes a column, placed after the keys seen earlier. Records without that key get an empty cell. This design prevents data loss, but it also means the column order depends on the order of the source array.</p>
<p>Example 1 shows the effect. The input is <code>[{"id":1,"name":"Ada","team":"math"},{"id":2,"name":"Grace","email":"g@example.com"},{"id":3,"name":"Linus","team":"kernel","active":true}]</code>. The output header is <code>id,name,team,email,active</code>. Ada has no email or active value, Grace has no team or active value, and Linus has no email. The rows are still aligned because every row is written against the same header.</p>
<p>This is why a single sample record is a poor template. Before exporting, scan the whole array for the largest set of keys. If Excel must see a fixed order, normalize the objects in the source, or reorder the CSV columns after conversion. The tool does not alphabetize or let you drag columns.</p>

<h2 id="escaping">Escaping commas, quotes and newlines</h2>
<p>Simple values pass through unchanged. Any value containing a comma, double quote or newline is wrapped in double quotes, and internal quotes are doubled. That is standard CSV, and it is the reason a cell can contain punctuation without splitting the row. The table shows the behavior you should expect.</p>
<table>
<thead><tr><th>Value in JSON</th><th>Cell in CSV</th><th>Rule</th></tr></thead>
<tbody>
<tr><td><strong>Ada</strong></td><td>Ada</td><td>No special characters, no wrapping</td></tr>
<tr><td><strong>Ada, Jr.</strong></td><td>"Ada, Jr."</td><td>Comma forces quotes</td></tr>
<tr><td><strong>She said "hi"</strong></td><td>"She said ""hi"""</td><td>Quotes are doubled inside a quoted cell</td></tr>
<tr><td><strong>Line one<br>Line two</strong></td><td>"Line one<br>Line two"</td><td>Newline stays inside one quoted cell</td></tr>
<tr><td><strong>null</strong></td><td>(empty)</td><td>Null and missing values become blanks</td></tr>
<tr><td><strong>true</strong></td><td>true</td><td>Booleans are written as text</td></tr>
<tr><td><strong>{"a":1}</strong></td><td>[object Object]</td><td>Nested objects are not flattened</td></tr>
</tbody>
</table>
<p>One limit sits outside the cell rules: header names are joined directly and are not escaped. A key containing a comma, quote or newline can break the header row. Rename such keys before conversion. Long numeric IDs are another quiet problem, because JSON.parse rounds integers beyond its safe range; store identifiers as strings when precision matters.</p>

<h2 id="nested-json">Nested JSON: flatten before converting</h2>
<p>Example 2 is a typical order record: <code>[{"order":1001,"customer":{"name":"Ada","city":"London"},"items":[{"sku":"A1","qty":2}],"total":49.5}]</code>. The converter produces a header of <code>order,customer,items,total</code> and a row where both customer and items read <code>[object Object]</code>. The numbers survive; the structure does not. That output is not a bug in the escaping, it is the flat-array rule meeting data that is not flat.</p>
<p>Flatten the record before conversion. A workable line-item table is <code>[{"order":1001,"customer_name":"Ada","customer_city":"London","item_sku":"A1","item_qty":2,"total":49.5}]</code>. If an order has several items, emit one row per item and repeat the order fields, which is the usual shape for spreadsheet analysis. If you need one row per order instead, join the SKUs into a single documented field such as <code>A1|B2</code> rather than letting an array stringify on its own.</p>
<p>Decide the grain before you touch the tool. One row per order answers revenue questions; one row per line item answers product questions. A mixed file with some orders collapsed and others expanded will produce misleading totals, even when every cell is technically valid.</p>

<h2 id="csv-to-json">The reverse direction and the 500KB cap</h2>
<p>The same tool converts CSV back to JSON with a local parser. The first row becomes the header keys, duplicate header names get numeric suffixes, and blank headers become generated column names. Values come back as strings, so a price of <code>19.99</code> returns as text. The parser also guards spreadsheet formula injection by prefixing cells that start with <code>=</code>, <code>+</code>, <code>-</code> or <code>@</code> with an apostrophe.</p>
<p>CSV input is capped at 500KB. Anything beyond the cap is truncated before parsing, and the interface warns that only the first part was converted. Split large exports or trim unnecessary columns. The JSON-to-CSV direction is the one to use when you already have structured API data; the CSV-to-JSON direction is for data that started life in a spreadsheet.</p>

<h2 id="workflow">A conversion workflow that survives review</h2>
<ol>
<li>Confirm the source is an array, not a wrapper object with a <code>data</code> field. Unwrap it first.</li>
<li>List every key across all records. Note the odd fields that appear in only one row.</li>
<li>Flatten nested objects and choose one row grain before converting.</li>
<li>Convert, then count the header cells and compare them with the key list.</li>
<li>Open the CSV in a spreadsheet and check blank cells, quoted commas and multi-line values.</li>
<li>Keep the original JSON and the flattening logic so the export can be reproduced.</li>
</ol>
<p>If the CSV opens with every row in one column, the spreadsheet likely ignored the delimiter or the file was saved with a different separator. If columns are shifted, a header name probably contained a comma or a row was edited by hand. Fix the source, not the symptoms.</p>
<p>For large exports, validate the JSON before converting. The <a href="/blog/json-formatter-guide/json-parse-errors">parse error fixes</a> save time when the failure is a trailing comma rather than a data shape problem. When URLs or encoded identifiers appear in cells, the <a href="/blog/json-formatter-guide/url-encoding-spaces-symbols">URL encoding guide</a> explains why a value may look different after a round trip.</p>
<div class="cta-box"><strong>Convert a sample now:</strong> open the <a href="/json-csv">JSON to CSV converter</a>, paste a flat array and copy the result. The conversion runs locally, with no upload and no account. For the wider toolkit, start with the <a href="/blog/json-formatter-guide">developer guide</a>.</div>
`;

export const jsonToCsv: BlogPost = {
  pillar: "json-formatter-guide",
  slug: "json-to-csv",
  kind: "cluster",
  title: "JSON to CSV: Convert Flat Arrays Correctly",
  description:
    "Convert a flat JSON array to CSV correctly: union keys, leave missing values blank, escape commas and quotes, and know when to flatten nested data first.",
  keywords: ["json to csv flat array", "convert json array of objects to csv", "json nested object object csv", "csv escaping commas quotes", "json csv 500kb limit"],
  toolSlugs: ["json-csv"],
  relatedSlugs: ["json-parse-errors", "url-encoding-spaces-symbols", "base64-url-safe-vs-standard"],
  published: "2026-10-22",
  updated: "2026-10-22",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "flat-array-rule", text: "The flat array rule", level: 2 },
    { id: "union-and-order", text: "Union keys and order", level: 2 },
    { id: "escaping", text: "Escaping cells", level: 2 },
    { id: "nested-json", text: "Nested JSON", level: 2 },
    { id: "csv-to-json", text: "Reverse direction and limits", level: 2 },
    { id: "workflow", text: "Conversion workflow", level: 2 },
  ],
  html,
  faqs: [
    { question: "Why does my CSV say [object Object]?", answer: "The converter only writes scalar values. When a JSON value is an object, String(value) produces [object Object], and an array of objects does the same. Flatten the nested fields into separate keys before conversion, or serialize the object as JSON text in a single cell if the spreadsheet truly needs it." },
    { question: "Does the tool flatten nested JSON automatically?", answer: "No. It unions top-level keys and leaves nested structure alone, which is why nested objects become [object Object]. Build a flat array first, for example customer_name and customer_city instead of a customer object. Arrays should be joined into a documented single field or expanded into one row per item." },
    { question: "How are missing keys handled?", answer: "The header includes every key found in any row, in first-seen order. A row missing a key gets an empty cell in that column. Nothing is shifted, because each row is written against the full header. This is why a field that appears in only one record still produces a column." },
    { question: "Can I choose semicolons or tabs as the delimiter?", answer: "No. The JSON-to-CSV output is comma-separated, and there is no delimiter setting. If your spreadsheet locale expects semicolons, convert first and handle the separator during import or with a controlled post-processing step. Do not rename the file and assume the format changed." },
    { question: "Why are my columns in an unexpected order?", answer: "The header follows the first-seen order of keys across the array, not an alphabetical or template order. A new field in a later record appears after earlier keys. Normalize the objects in the source or reorder the columns in the spreadsheet after conversion if the order matters." },
    { question: "Is there an input size limit?", answer: "The CSV-to-JSON direction caps input at 500KB and truncates anything beyond it with a warning. Split larger exports before pasting. The JSON-to-CSV direction is intended for normal API-sized arrays; keep huge payloads out of the browser tool and process them in a script." },
  ],
};

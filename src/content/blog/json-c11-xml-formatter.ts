import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>XML still carries sitemaps, RSS and Atom feeds, SVG files, SOAP payloads and a long tail of configuration formats. A single unclosed tag or unquoted attribute stops the whole document from parsing, and the failure often surfaces far from the mistake. A formatter gives you two things at once: a well-formedness check and an indented view of the hierarchy. This guide explains what the local <a href="/xml-formatter">XML formatter</a> actually does, where its tokenizer can distort unusual markup, and how to prepare a sitemap or feed for publication.</p>
<p>Part of the <a href="/blog/json-formatter-guide">developer toolkit guide</a>. The tool runs entirely in the page, so internal config files never leave the machine. That privacy is useful, but it also means the tool has no schema service behind it: well-formed is not the same as valid against your XSD or business rules.</p>

<h2 id="what-it-checks">What the formatter checks</h2>
<p>The input is parsed with the browser's <code>DOMParser</code> using the <code>application/xml</code> type. If the parser reports an error, the tool shows a generic invalid-XML message and refuses to produce partial output. Failing closed matters because a half-formatted document can look plausible while hiding the exact tag that broke. The input limit is 500,000 characters, close to 500 KB; anything larger is rejected before parsing.</p>
<p>This is a well-formedness check, not schema validation. The parser confirms that tags close, attributes are quoted, entities resolve and there is a single document element. It does not know whether a sitemap contains the required namespace, whether an RSS item has the fields your reader expects, or whether an order element follows your XSD. Those checks need a schema-aware validator or the receiving service.</p>
<p>The error message does not include a line and column number. If you need the exact location, open the file in an editor with XML support or check the browser console for the parser's own diagnostic. The value of the tool is the fast pass or fail and a readable tree once the document is accepted.</p>

<h2 id="formatting">What changes when you press Format</h2>
<p>Formatting is line-oriented. The serializer first normalizes the document, then a small tokenizer walks opening tags, closing tags, declarations, comments and text. Each opening tag increases the indent by two spaces, each closing tag decreases it, and self-closing tags stay on one line. The result is easy to scan:</p>
<p><code>&lt;rss&gt;<br>&nbsp;&nbsp;&lt;channel&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&lt;title&gt;Example&lt;/title&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&lt;link&gt;https://example.com/&lt;/link&gt;<br>&nbsp;&nbsp;&lt;/channel&gt;<br>&lt;/rss&gt;</code></p>
<p>Attributes are not reformatted or wrapped. A long attribute list stays on the element's line, which is fine for IDs and namespaces but unhelpful for dozens of attributes. Indentation is cosmetic; it does not add namespace declarations or repair missing closing tags.</p>
<p>Two edge cases deserve attention. Text nodes are trimmed, so mixed content such as <code>&lt;p&gt;Hello &lt;b&gt;world&lt;/b&gt;&lt;/p&gt;</code> loses the space before the inline element when it is placed on its own line. Do not use the pretty output for XML where whitespace inside text is significant. Second, the tokenizer looks for the next <code>&gt;</code> character, so an attribute value containing a literal greater-than sign can be split incorrectly. XML permits <code>&gt;</code> in a quoted attribute, although escaping it is safer. Minify mode is the better choice for such documents.</p>
<p>CDATA sections can also confuse the line tokenizer when they contain <code>&gt;</code> or look like tags. If a document uses CDATA for embedded HTML or SQL, format a copy and compare the text content before and after. For configuration files and sitemaps without CDATA, the output is predictable.</p>

<h2 id="minify">Minify mode and signed documents</h2>
<p>Minify serializes the parsed document and collapses whitespace between adjacent tags with a simple replacement. It does not remove comments, change attribute order or rewrite namespaces. Elements that already sit next to each other stay unchanged, so the saving depends on how much indentation the source contains. A sitemap that is already machine-generated may shrink very little.</p>
<p>Never minify a document covered by an XML signature. XML digital signatures can include whitespace in the signed byte stream, and changing indentation or inter-tag spaces invalidates the signature even though the logical tree is identical. The same caution applies to files compared by checksum in a deployment pipeline. Keep the canonical byte-for-byte copy and use the formatter only on a scratch copy.</p>
<p>Minified output is still well-formed XML and is acceptable for sitemaps and feeds. Search engines do not require pretty indentation. What they require is a successful parse, the correct namespace and content that follows the sitemap protocol.</p>

<h2 id="sitemaps-feeds">Sitemaps, feeds and namespaces</h2>
<p>A sitemap is a small XML document with a specific namespace, a set of <code>&lt;url&gt;</code> entries and optional metadata. The formatter preserves namespace prefixes because the serializer keeps qualified names. After formatting, check that the root still declares the sitemap namespace and that every URL is absolute. The tool cannot check either condition for you. A sitemap may parse cleanly while pointing at relative paths that crawlers ignore.</p>
<p>Feed files have the same shape of risk. RSS and Atom are XML, so an unescaped ampersand in a title or a raw HTML fragment in a description will break the feed. Encode the text, or wrap markup in CDATA, then validate. If the feed is generated by a CMS, compare the generated file with a known-good sample rather than editing only the pretty output.</p>
<p>Sitemap protocol limits are separate from the parser. A single sitemap file is capped at 50,000 URLs and 50 MB uncompressed. Large sites should split into a sitemap index. None of that is enforced here; formatting a 60,000-URL file will succeed even though the file violates the protocol. Check the limits before submitting.</p>

<h2 id="limits">Where the tool stops</h2>
<table>
<thead><tr><th>Task</th><th>Supported here</th><th>Use instead</th></tr></thead>
<tbody>
<tr><td><strong>Well-formedness</strong></td><td>Yes, via the browser XML parser</td><td>Nothing else needed for a quick check</td></tr>
<tr><td><strong>XSD or Relax NG validation</strong></td><td>No</td><td>A schema validator in your build or CI</td></tr>
<tr><td><strong>Line and column errors</strong></td><td>No</td><td>An XML-aware editor or the browser console</td></tr>
<tr><td><strong>Large documents</strong></td><td>Up to 500,000 characters</td><td>Split the file or use a command-line tool</td></tr>
<tr><td><strong>Mixed content whitespace</strong></td><td>Trimmed during pretty print</td><td>Keep the source or use minify carefully</td></tr>
<tr><td><strong>CDATA with angle brackets</strong></td><td>Can be tokenized incorrectly</td><td>Compare content, or avoid pretty printing</td></tr>
<tr><td><strong>Signed XML</strong></td><td>No signature awareness</td><td>Keep the canonical bytes untouched</td></tr>
</tbody>
</table>
<p>The 500,000-character limit is a UI guard, not a statement about what XML can contain. Command-line parsers handle much larger files. If a sitemap is too large for the page, it is also a signal to split it, which is better for crawling and for error isolation.</p>

<h2 id="workflow">A practical workflow</h2>
<ol>
<li>Keep the original file in version control or a backup folder before pasting it anywhere.</li>
<li>Format a copy first. If the tool rejects it, fix the first structural error and retry rather than rewriting the whole document.</li>
<li>Inspect namespaces, the root element and the first few records after formatting.</li>
<li>Check text values for accidental trimming, especially in mixed-content documents.</li>
<li>Minify only if the receiving system benefits and the file is not signed or checksummed.</li>
<li>Validate the final file against the protocol or schema that actually governs it before publishing.</li>
</ol>
<p>A clean parse is necessary but not sufficient. For a sitemap, the next checks are URL count, absolute links, encoding and robots rules. For a feed, test in a reader and confirm that dates, GUIDs and enclosures survive. For a config file, deploy to staging and compare the parsed settings with the source of truth.</p>
<div class="cta-box"><strong>Check XML now:</strong> paste a sitemap, feed or config into the <a href="/xml-formatter">XML formatter</a>, fix any parse failure, then copy the indented or minified result. For JSON payloads, use the <a href="/blog/json-formatter-guide/json-parse-errors">JSON parse error guide</a>; for form-encoded values, see <a href="/blog/json-formatter-guide/url-encoding-spaces-symbols">URL encoding</a>.</div>
`;

export const xmlFormatter: BlogPost = {
  pillar: "json-formatter-guide",
  slug: "format-xml-sitemaps-feeds",
  kind: "cluster",
  title: "Format XML for Sitemaps, Feeds and Configs",
  description:
    "Format XML sitemaps, feeds and config files, see how local parsing and minification work, and catch malformed markup before publishing.",
  keywords: ["format xml sitemap", "xml formatter validator", "pretty print xml feed", "minify xml safely", "xml well formed check"],
  toolSlugs: ["xml-formatter"],
  relatedSlugs: ["json-parse-errors", "format-sql-queries", "url-encoding-spaces-symbols"],
  published: "2026-10-23",
  updated: "2026-10-23",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "what-it-checks", text: "What the formatter checks", level: 2 },
    { id: "formatting", text: "What Format changes", level: 2 },
    { id: "minify", text: "Minify mode and signatures", level: 2 },
    { id: "sitemaps-feeds", text: "Sitemaps, feeds and namespaces", level: 2 },
    { id: "limits", text: "Where the tool stops", level: 2 },
    { id: "workflow", text: "A practical workflow", level: 2 },
  ],
  html,
  faqs: [
    { question: "Does the XML formatter validate against a schema?", answer: "No. It checks well-formedness with the browser XML parser. It can confirm that tags close and attributes are quoted, but it has no XSD, Relax NG or sitemap protocol knowledge. Use a schema validator or the receiving service for those checks." },
    { question: "Why is there no line number on the error?", answer: "The page reports a generic parse failure and withholds output. Browsers expose richer parser diagnostics in the console, and desktop editors show line and column positions. If you need the exact location, open the source in one of those tools and compare the first broken element." },
    { question: "Can I minify a signed XML document?", answer: "Do not. XML signatures can cover whitespace in the byte stream, so collapsing indentation can invalidate the signature even when the element tree is unchanged. Keep the signed copy untouched and format a separate working copy only." },
    { question: "Why did formatting change spaces in my text?", answer: "Pretty printing trims text nodes and places them on their own lines. That is harmless for element-only data such as sitemaps, but it changes mixed content where a space between text and an inline element matters. Avoid pretty printing those documents or compare the text content before and after." },
    { question: "Is my XML uploaded anywhere?", answer: "No. Parsing and serialization happen in the page. The tradeoff is that the tool cannot validate against a remote schema or call a server-side parser. Keep sensitive configuration files on a trusted machine and review the output before copying it into a deployment." },
  ],
};

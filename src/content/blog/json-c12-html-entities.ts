import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>An HTML entity is a short sequence that represents a character the parser would otherwise treat as markup. The ampersand starts an entity, the less-than sign starts a tag, and a quote can end an attribute. Encode the wrong one and a page shows raw code; encode twice and visitors see <code>&amp;amp;</code> in the middle of a sentence. This guide covers the rules, the exact behavior of the local <a href="/html-entities">HTML entities tool</a>, and the contexts where HTML escaping is the wrong layer entirely.</p>
<p>Part of the <a href="/blog/json-formatter-guide">developer toolkit guide</a>. The tool handles text-level escaping in the page. It is not a template engine, a URL encoder or a JavaScript string escaper, and it does not know where the result will be inserted.</p>

<h2 id="when-escaping-matters">When escaping matters</h2>
<p>In HTML text content, two characters are mandatory: <code>&amp;</code> becomes <code>&amp;amp;</code> and <code>&lt;</code> becomes <code>&amp;lt;</code>. The greater-than sign does not have to be escaped in text, but escaping it avoids confusion around sequences such as <code>]]&gt;</code>. In an attribute value, the quote that delimits the attribute must also be escaped. A double-quoted attribute needs <code>&amp;quot;</code>; a single-quoted attribute needs <code>&amp;#39;</code> or <code>&amp;apos;</code>.</p>
<p>That distinction explains a common mistake. People paste text containing <code>"</code> and <code>'</code> into an HTML encoder, see the quotes unchanged, and assume the tool is broken. It is not. In a text node, quotes need no escaping at all. The encoder is doing exactly what the browser's serializer does for text. If you are building an attribute string by hand, you need a different step that knows the delimiter.</p>
<p>There are also contexts where HTML entities do nothing useful. Inside a URL query value, a space must be percent-encoded, not turned into <code>&amp;nbsp;</code>. Inside a JavaScript string, a quote needs a backslash, not an entity, unless the string is itself inside an HTML attribute and the whole thing is decoded before the script runs. Inside JSON, entities are just text and should not be introduced. Match the escaping to the parser that will read the value next.</p>

<h2 id="tool-behavior">What the encoder and decoder actually do</h2>
<p>Encode reads the input as text and serializes it back as HTML. In practice that means <code>&amp;</code>, <code>&lt;</code> and <code>&gt;</code> are escaped, a non-breaking space becomes <code>&amp;nbsp;</code>, and ordinary punctuation and accented letters stay as they are. Quotes are not escaped because they are not special in a text node. The tool accepts up to 1,000,000 characters and reports an error above that limit.</p>
<p>Decode does the reverse: it parses the input as HTML fragment content and returns the text value. Named entities such as <code>&amp;copy;</code>, decimal references such as <code>&amp;#169;</code> and hexadecimal references such as <code>&amp;#xA9;</code> all become the corresponding character. An unknown entity such as <code>&amp;unknown;</code> is left as literal text by the browser rather than causing an error, so a successful decode does not prove that every entity was valid.</p>
<p>Neither direction is a sanitizer. Encoding makes text safe for display, but decoding an untrusted string and inserting the result with <code>innerHTML</code> would reintroduce markup. The tool returns text; where you put it is still your responsibility. Use <code>textContent</code> for plain text insertion, and a maintained sanitizer if you genuinely need to allow a subset of HTML.</p>

<h2 id="named-and-numeric">Named, decimal and hexadecimal references</h2>
<p>Named entities are easier to read, numeric references are more predictable across old documents. <code>&amp;nbsp;</code> is U+00A0, a non-breaking space that prevents a line break but is not an ordinary space for searching or wrapping. Replacing every space with it produces text that cannot wrap naturally. <code>&amp;copy;</code> is ©, <code>&amp;mdash;</code> is an em dash, and <code>&amp;rsquo;</code> is a right single quotation mark. HTML5 recognizes a large set of names; XML without a DTD recognizes only a handful, which is why numeric references are safer in XML.</p>
<p>Names are case-sensitive. <code>&amp;amp;</code> and <code>&amp;AMP;</code> both decode to an ampersand, but <code>&amp;Amp;</code> is not recognized, and a missing semicolon can change how the parser consumes the following characters. Browsers are lenient with some legacy forms, but email clients and XML parsers are not. Always include the semicolon and prefer lowercase names from the HTML standard.</p>
<p>Hexadecimal references are useful for characters you cannot easily type. <code>&amp;#x1F600;</code> is a grinning face emoji, and <code>&amp;#x27;</code> is an apostrophe. Supplementary-plane characters can also be written as surrogate pairs, but a single code point reference is cleaner. Keep the <code>x</code> lowercase or uppercase consistently; both parse, but a style checker will thank you.</p>

<h2 id="attributes">The attribute problem</h2>
<p>Suppose you have a title and want to place it in <code>title="..."</code>. If the title contains a double quote, the encoder leaves it alone because it treats the input as text. The attribute then ends early and the rest of the title becomes stray attributes. The correct workflow is to replace <code>&amp;</code> first, then the delimiter quote, then the less-than sign if your framework requires it. Order matters: replacing <code>&amp;</code> last would double-escape the ampersands introduced by the other replacements.</p>
<p>If you control the template, let the framework do this work. React, Vue, Svelte and server-side template engines escape interpolated values according to context. Raw HTML helpers exist precisely because escaping is context-sensitive. Hand-encoding a string and then passing it to a helper that escapes again is how visible entities end up on the page.</p>
<p>The same warning applies to URLs. An ampersand separating query parameters must become <code>&amp;amp;</code> in an HTML attribute, but the parameter values themselves need percent-encoding before that. Two layers, two encoders. The <a href="/blog/json-formatter-guide/url-encoding-spaces-symbols">URL encoding guide</a> covers the percent-encoding layer; this tool covers the HTML layer.</p>

<h2 id="double-escaping">Recognizing double escaping</h2>
<p>If a page displays <code>&amp;amp;</code>, the source probably contains <code>&amp;amp;amp;</code> or the value was encoded twice. If it displays <code>&amp;lt;div&amp;gt;</code> where a tag was intended, the content was encoded for display and then inserted as markup, or encoded before a template escaped it again. Decode once in a scratch copy and compare with the source of truth. Do not decode directly in a production database or CMS field unless you have a backup.</p>
<p>Round-tripping is a useful test. Encode a sample, decode the result, and compare it with the original. For plain text without non-breaking spaces, the result should match. If it does not, look for a second encoding step, a sanitizer that rewrote entities, or a rich-text editor that normalized the markup on save.</p>
<p>Email templates are a frequent offender. A marketing platform may escape merge tags, then an email client may decode them differently. Test the final received message, not just the preview in the editor. Transactional email should keep entities simple and avoid relying on named entities that older clients might not recognize.</p>

<h2 id="workflow">A safe encode or decode checklist</h2>
<ol>
<li>Identify the destination context: text node, attribute, URL, script or JSON.</li>
<li>Use this tool only for HTML text. Use percent-encoding for URLs and a language-specific escaper for scripts.</li>
<li>Encode a copy and paste the result into the smallest possible test page.</li>
<li>Check quotes, ampersands and non-breaking spaces specifically; they are the usual suspects.</li>
<li>Decode a sample back and compare it with the original before saving.</li>
<li>Let the template engine handle dynamic values instead of pre-encoding them.</li>
</ol>
<table>
<thead><tr><th>Input</th><th>Encoded text</th><th>Note</th></tr></thead>
<tbody>
<tr><td><code>Tom &amp; Jerry</code></td><td><code>Tom &amp;amp; Jerry</code></td><td>The ampersand is mandatory</td></tr>
<tr><td><code>&lt;div&gt;</code></td><td><code>&amp;lt;div&amp;gt;</code></td><td>Shows markup as text</td></tr>
<tr><td><code>"quoted"</code></td><td><code>"quoted"</code></td><td>Quotes stay in a text node</td></tr>
<tr><td><code>10&nbsp;kg</code></td><td><code>10&amp;nbsp;kg</code></td><td>Non-breaking space is preserved</td></tr>
<tr><td><code>&amp;copy;</code></td><td><code>&amp;copy;</code> decoded to ©</td><td>Named entity becomes a character</td></tr>
</tbody>
</table>
<div class="cta-box"><strong>Encode or decode a snippet:</strong> paste it into the <a href="/html-entities">HTML entities tool</a>, check the output in context, then copy it. For structured payloads, start with the <a href="/blog/json-formatter-guide/json-parse-errors">JSON parse error guide</a>.</div>
`;

export const htmlEntities: BlogPost = {
  pillar: "json-formatter-guide",
  slug: "html-entities-encode-decode",
  kind: "cluster",
  title: "HTML Entities: Encode and Decode Without Breaking Markup",
  description:
    "Learn when to escape ampersands, angle brackets and quotes, decode named or numeric entities, and avoid double-escaping in templates.",
  keywords: ["html entity encoder", "decode html entities", "escape ampersand html", "nbsp entity meaning", "html entities in attributes"],
  toolSlugs: ["html-entities"],
  relatedSlugs: ["json-parse-errors", "url-encoding-spaces-symbols", "format-xml-sitemaps-feeds"],
  published: "2026-10-23",
  updated: "2026-10-23",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "when-escaping-matters", text: "When escaping matters", level: 2 },
    { id: "tool-behavior", text: "Encoder and decoder behavior", level: 2 },
    { id: "named-and-numeric", text: "Named and numeric references", level: 2 },
    { id: "attributes", text: "The attribute problem", level: 2 },
    { id: "double-escaping", text: "Recognizing double escaping", level: 2 },
    { id: "workflow", text: "A safe checklist", level: 2 },
  ],
  html,
  faqs: [
    { question: "Why does the encoder leave my quotes alone?", answer: "Because quotes are not special in an HTML text node. The tool serializes the input as text, so only characters that would start markup or an entity are escaped. If the value will sit inside a quoted attribute, you must escape the delimiter quote separately." },
    { question: "Does decoding an unknown entity fail?", answer: "No. Browsers leave an unrecognized named entity as literal text instead of raising an error. The decoder follows that behavior, so a clean-looking result can still contain a typo. Check unusual names against the HTML standard if the output looks wrong." },
    { question: "Is a non-breaking space the same as a normal space?", answer: "No. A non-breaking space is U+00A0 and suppresses a line break at that point. Search, wrapping and string comparison can treat it differently from U+0020. Use it deliberately for units and labels, not as a replacement for every space." },
    { question: "Can I use the encoded output in an attribute?", answer: "Only if you also escape the quote that delimits the attribute. The text encoder does not know the surrounding syntax. For attribute values, use a context-aware template helper or escape the matching quote before inserting the value." },
    { question: "Is decoding HTML entities safe for untrusted content?", answer: "Decoding itself is just text conversion, but inserting the decoded result as HTML can reintroduce scripts and event handlers. Use textContent for plain text. If you need to allow markup, pass it through a maintained sanitizer rather than decoding and trusting it." },
  ],
};

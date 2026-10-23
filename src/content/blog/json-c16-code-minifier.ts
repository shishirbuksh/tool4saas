import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>Minifying code removes characters that do not change behavior: indentation, comments, extra spaces and some optional punctuation. It is not compression. A gzip or Brotli response compresses the bytes on the wire and reverses them exactly; a minifier rewrites the text and does not restore the original. That distinction explains why a minified file can feel smaller in an editor yet travel at nearly the same compressed size, and why a bad minifier can break code that looked fine in the source.</p>
<p>Part of the <a href="/blog/json-formatter-guide">developer toolkit guide</a>. The local <a href="/code-minifier">code formatter and minifier</a> has three tabs. HTML can be beautified, while CSS and JavaScript can be beautified or minified. The implementation is deliberately lightweight, so this guide focuses on what it can safely change and when to use a full build tool instead.</p>

<h2 id="what-minification-does">What minification can and cannot remove</h2>
<p>Whitespace between tokens is usually optional in CSS and JavaScript, but not always. A space can separate two identifiers, a newline can trigger automatic semicolon insertion, and a line break can end a single-line comment. A safe minifier has to understand strings, template literals, regular expressions and comments before it removes anything. A regex-based minifier can handle the common cases, but it cannot reason about the language.</p>
<p>Minification also does not rename variables, fold constants, remove dead branches or split bundles. Those are optimizations for a compiler or a bundler. The tool here only collapses whitespace and comments. That means the savings are modest compared with a production pipeline, and the risk is different: the output should remain readable enough to debug, but it may still break edge cases.</p>
<p>Always keep the source file. Commit the readable version and generate the minified artifact in a build step. If the minified file is the only copy, the next editor has to reverse-engineer formatting before making a change.</p>

<h2 id="css-tab">CSS: comments, strings and the license problem</h2>
<p>The CSS tab formats with brace-based indentation and preserves comments in the formatted output. Minify does the opposite: it removes every <code>/* ... */</code> comment, collapses whitespace runs and strips spaces around braces, colons, commas and semicolons. It also removes the final semicolon before a closing brace. For a typical rule set, the result is a compact one-line stylesheet.</p>
<p>Two limitations matter. First, the minifier does not protect quoted strings before applying its replacements. A declaration such as <code>content: "a ; b";</code> can lose the spaces around the semicolon because the global semicolon rule runs inside the string too. The same applies to comment-like sequences inside a URL or a string. Review any CSS that contains generated content, data URIs or unusual quoting.</p>
<p>Second, all comments are removed, including license headers written as <code>/*! ... */</code>. If a license requires the notice to remain in the distributed file, do not use this minifier on that file, or restore the notice manually. A production CSS minifier usually has a setting to preserve important comments; this one does not.</p>
<p>The CSS tab has no explicit character cap in the component, unlike the JavaScript tab. Very large pasted stylesheets can still make the page sluggish on an older device. For a design system with tens of thousands of rules, use a command-line minifier and inspect the diff.</p>

<h2 id="js-tab">JavaScript: strings are protected, regexes are not</h2>
<p>Beautify adds two-space indentation after opening braces and splits statements at semicolons. It temporarily replaces strings, template literals and comments with placeholders so braces inside them do not affect indentation. That is enough for small functions, but it is not a parser. Object literals, arrow functions and nested ternaries can still produce awkward line breaks.</p>
<p>Minify walks the source, removes line and block comments, protects quoted strings and template literals, then collapses whitespace and spaces around punctuation. The protected strings are restored at the end. The 500,000-character limit is enforced before either operation.</p>
<p>The gap is regular expressions. A regex literal is not tokenized as a string, so a pattern containing spaces, braces or comment-like sequences can be altered. Division and regex literals are also hard to distinguish without a parser. Test any code that uses complex patterns, and prefer a real JavaScript minifier for production bundles.</p>
<p>Automatic semicolon insertion is the other risk. Removing a newline can change meaning when the newline was significant:</p>
<p><code>function value() {<br>&nbsp;&nbsp;return<br>&nbsp;&nbsp;42;<br>}</code></p>
<p>This function returns <code>undefined</code> because the newline after <code>return</code> ends the statement. A minifier that joins the lines can turn it into <code>return 42</code>, silently changing the result. Similar hazards exist with a newline before <code>++</code> or <code>--</code>. The tool does not insert semicolons or analyze statement boundaries, so check the output before shipping it.</p>

<h2 id="html-tab">HTML is formatted, not minified</h2>
<p>The HTML tab recognizes a list of void elements such as <code>br</code>, <code>img</code>, <code>input</code> and <code>meta</code>, and indents the rest by two spaces. It does not have a minify button, despite what a general “code minifier” label might suggest. That is a deliberate limitation of the page, not a hidden mode.</p>
<p>Formatting HTML with a token-based indenter can change rendering. Whitespace inside <code>&lt;pre&gt;</code>, <code>&lt;textarea&gt;</code> and inline elements is significant. A space between two inline elements can disappear when each is moved to its own line, and a newline can appear where none existed. Inline <code>&lt;script&gt;</code> and <code>&lt;style&gt;</code> content is also tokenized as text, so a <code>&lt;</code> inside a JavaScript comparison can be mistaken for a tag. Use the HTML tab for a quick look at simple markup, not for a production template with inline scripts or preformatted content.</p>
<p>The same tokenizer caveat applies to attribute values containing a literal <code>&gt;</code>. Escape it as <code>&amp;gt;</code> or avoid reformatting that element. A browser may accept the raw character, but the formatter's tag boundary can be wrong.</p>

<h2 id="workflow">A safe minification workflow</h2>
<ol>
<li>Start from a source file in version control, never from the minified artifact.</li>
<li>Format first if you need to read the code; compare the formatted output with the original before minifying.</li>
<li>Minify a copy and run the project's tests or a syntax check on the result.</li>
<li>Open the page in a browser and exercise the code paths that use strings, regexes and automatic semicolons.</li>
<li>Check license headers if the file is distributed to third parties.</li>
<li>For production, use a maintained minifier such as esbuild, Terser or Lightning CSS, with source maps and a build pipeline.</li>
</ol>
<table>
<thead><tr><th>Tab</th><th>Format</th><th>Minify</th><th>Main risk</th></tr></thead>
<tbody>
<tr><td><strong>HTML</strong></td><td>Two-space indent</td><td>Not available</td><td>Whitespace-sensitive inline, pre and script content</td></tr>
<tr><td><strong>CSS</strong></td><td>Comments preserved</td><td>All comments removed</td><td>Strings, data URIs and license notices</td></tr>
<tr><td><strong>JavaScript</strong></td><td>Strings and comments protected</td><td>Comments removed, strings protected</td><td>Regex literals, ASI and complex expressions</td></tr>
</tbody>
</table>
<p>If the minified output fails, compare it with the formatted source around the first changed line. A missing space, a removed newline or a comment that was part of a URL is more likely than a structural bug. Restore the source, fix the pattern, and retry with a narrower input.</p>
<div class="cta-box"><strong>Try it now:</strong> paste a small stylesheet or function into the <a href="/code-minifier">code formatter and minifier</a>, format it first, then minify a copy and test the result. For data payloads, the <a href="/blog/json-formatter-guide/json-parse-errors">JSON parse error guide</a> covers a different kind of syntax failure.</div>
`;

export const codeMinifier: BlogPost = {
  pillar: "json-formatter-guide",
  slug: "minify-css-js-safely",
  kind: "cluster",
  title: "Minify CSS and JavaScript Without a Build Step",
  description:
    "Beautify HTML and minify CSS or JavaScript in the browser, with clear limits on what a regex-based minifier can safely change.",
  keywords: ["minify css javascript", "code formatter minifier", "css beautifier online", "javascript minifier limits", "remove css comments"],
  toolSlugs: ["code-minifier"],
  relatedSlugs: ["json-parse-errors", "format-sql-queries", "mime-type-content-type"],
  published: "2026-10-23",
  updated: "2026-10-23",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "what-minification-does", text: "What minification changes", level: 2 },
    { id: "css-tab", text: "CSS comments and strings", level: 2 },
    { id: "js-tab", text: "JavaScript limits", level: 2 },
    { id: "html-tab", text: "HTML is formatted only", level: 2 },
    { id: "workflow", text: "Safe workflow", level: 2 },
  ],
  html,
  faqs: [
    { question: "Does the tool minify HTML?", answer: "No. The HTML tab only beautifies with two-space indentation. CSS and JavaScript each have Format and Minify buttons. If a label or a third-party description suggests otherwise, trust the controls on the page." },
    { question: "Why did my CSS content string change?", answer: "The CSS minifier removes whitespace around punctuation without protecting quoted strings first. A value containing a semicolon, comma or brace and intentional spaces can be altered. Check generated content and data URIs, or use a parser-based minifier for that stylesheet." },
    { question: "Does it preserve license comments?", answer: "No. Every CSS comment is removed, including important license headers. If the license requires the notice in the distributed file, keep the comment outside the minified output or use a minifier with a preserve-license option." },
    { question: "Is the minified JavaScript production-ready?", answer: "Treat it as a quick reduction, not a production build. It does not rename variables, analyze scope or protect regular expressions, and removing newlines can change automatic semicolon insertion. Run tests and use a maintained minifier for deployed bundles." },
    { question: "What is the input limit?", answer: "The JavaScript tab enforces a 500,000-character limit before formatting or minifying. The CSS tab does not have the same explicit cap, so very large sheets may still tax the browser. Split large inputs or use a command-line tool." },
  ],
};

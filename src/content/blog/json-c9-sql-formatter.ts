import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>SQL arrives in every shape: a one-line query copied from an ORM log, a join with four tables and no indentation, a migration with a nested subquery. A formatter turns that wall of text into clause-per-line SQL that a reviewer can scan. The important qualification is that a lightweight formatter is not a database parser. It recognizes a fixed keyword list, moves major clauses onto new lines and indents parentheses. It cannot know your dialect, validate syntax or run the query. Read the output before you paste it into a production console.</p>
<p>Part of the <a href="/blog/json-formatter-guide">developer toolkit guide</a>. Format in the <a href="/sql-formatter">SQL formatter</a>, keep a copy of the original, and run the reviewed statement against a development database rather than trusting the layout alone.</p>

<h2 id="how-it-works">What the formatter actually changes</h2>
<p>The tool begins by collapsing every run of whitespace to a single space. It then protects single-quoted strings and double-quoted identifiers with placeholders, uppercases a fixed keyword list, and inserts a newline before major clauses such as SELECT, FROM, WHERE, GROUP BY, ORDER BY, JOIN, HAVING, LIMIT and UNION. AND, OR and ON begin new lines. Semicolons start a new line, and lines inside parentheses receive two spaces of indentation per level.</p>
<p>That is a useful clause-level layout, not a complete pretty-printer. It does not align equals signs, split a long select list into one column per line, uppercase every SQL word or add missing punctuation. Functions such as COUNT and modifiers such as DESC are outside its keyword list, so they keep the casing you typed. The Minify button goes the other way and collapses the whole statement to a single line.</p>
<p>The formatter has no database connection and no schema awareness. It cannot tell whether a name is a table, a column or a keyword in your dialect. It also does not validate the query. A missing comma stays missing after formatting, and a misplaced JOIN remains misplaced.</p>

<h2 id="clause-layout">Clause layout and joins</h2>
<p>Example 1 starts as one line: <code>select u.id,u.name,count(o.id) as orders from users u left join orders o on o.user_id=u.id where u.active=1 and o.created_at&gt;='2026-01-01' group by u.id,u.name order by orders desc limit 20;</code>. Formatting produces this structure:</p>
<p><code>SELECT u.id,u.name,count(o.id) AS orders<br>FROM users u<br>LEFT<br>JOIN orders o<br>ON o.user_id=u.id<br>WHERE u.active=1<br>AND o.created_at&gt;='2026-01-01'<br>GROUP BY u.id,u.name<br>ORDER BY orders desc<br>LIMIT 20;</code></p>
<p>The clauses are now easy to find, but the output also shows why review matters. The compound LEFT JOIN is split into LEFT and JOIN because JOIN is itself a major clause, and the ON line is not indented at the top level because each line is trimmed. The select list is still one long line, the operators have no added spaces, and <code>count</code> and <code>desc</code> remain lowercase because they are not in the keyword list. If your team wants one column per line, do that part by hand or use a full dialect-aware formatter. The value here is structural clarity, not cosmetic perfection.</p>
<p>The indentation also follows parentheses. A subquery inside FROM shifts its contents right by two spaces, and a closing parenthesis outdents one level. Deeply nested queries can still become tall, but the nesting is visible instead of hidden in a single line.</p>

<h2 id="literals-comments">Quoted literals and comments need review</h2>
<p>Single-quoted strings and double-quoted identifiers are protected from keyword uppercasing. That means a value such as <code>'select all'</code> keeps its lowercase text. However, whitespace is collapsed before that protection, so a literal containing two intentional spaces becomes one. Minify performs the same collapse, and it is even less careful because it does not protect literals at all. Never minify a statement whose string values contain meaningful spacing without checking the result.</p>
<p>Example 2 shows the more dangerous edge. The input is <code>select id, note from audit where note='please  review' -- select latest row;</code>. The formatter treats the SELECT inside the comment as a major clause. The comment marker can end up alone on a line, with the words after it moved to a new line. The output may read:</p>
<p><code>SELECT id, note<br>FROM audit<br>WHERE note='please review' --<br>SELECT latest row;</code></p>
<p>The double space inside the literal is gone, and the comment text now looks like a live statement. Remove comments before formatting, or inspect every comment containing a keyword. A similar problem appears with identifiers that match the keyword list. A column named <code>order</code> can trigger an ORDER line break unless it is quoted in a form the tool protects. Dialect-specific quoting such as backticks or square brackets is not protected, so check those names after formatting.</p>

<h2 id="behavior-table">What to verify after formatting</h2>
<table>
<thead><tr><th>Job</th><th>What the tool does</th><th>What you must check</th></tr></thead>
<tbody>
<tr><td><strong>Keyword case</strong></td><td>Uppercases a fixed list of common keywords</td><td>Dialect keywords not in the list keep their original case</td></tr>
<tr><td><strong>Clause breaks</strong></td><td>Starts a new line before major clauses</td><td>Compound joins can split, and comments or identifiers can trigger breaks</td></tr>
<tr><td><strong>Indentation</strong></td><td>Adds space by parenthesis depth</td><td>Top-level AND and ON lines lose extra indentation during trimming</td></tr>
<tr><td><strong>Literals</strong></td><td>Protects quoted text from keyword uppercasing</td><td>Repeated spaces inside literals are already collapsed</td></tr>
<tr><td><strong>Minify</strong></td><td>Collapses all whitespace to single spaces</td><td>String values, comments and readability</td></tr>
<tr><td><strong>Execution</strong></td><td>No connection, no syntax validation</td><td>Run against a dev database, not production first</td></tr>
</tbody>
</table>

<h2 id="dialect-limits">Dialect limits and unusual syntax</h2>
<p>The keyword list covers common SELECT, INSERT, UPDATE and DELETE patterns. It does not cover every extension. PostgreSQL's <code>ILIKE</code>, Snowflake's <code>QUALIFY</code>, Oracle's <code>CONNECT BY</code>, SQL Server's <code>TOP</code> and PostgreSQL's <code>RETURNING</code> are not in the list, so they keep whatever case you typed. That is not harmful by itself, but do not read the output as proof that the query is valid for your engine.</p>
<p>More serious breakage comes from word-boundary matching. If an unquoted identifier happens to equal a keyword, the formatter can uppercase it and insert a line break at the wrong place. Backtick-quoted MySQL identifiers and bracket-quoted SQL Server identifiers are not placeholders, so keywords inside them can be rewritten. Review those statements line by line, and prefer a dialect-aware parser for migrations or generated SQL.</p>
<p>Operators, casts, window frames and vendor-specific functions are left as written. The formatter does not add spaces around <code>=</code>, does not expand <code>SELECT *</code>, and does not add a missing semicolon. Use it to expose the clause skeleton, then finish the style by hand if the query is going into a reviewed migration.</p>

<h2 id="workflow">A safe formatting workflow</h2>
<ol>
<li>Keep the original query in version control or a scratch file before formatting.</li>
<li>Format a copy and compare the output with the source, especially comments and string literals.</li>
<li>Check quoted identifiers, backticks and bracket names that could contain keywords.</li>
<li>Run the formatted statement in a development database or wrap it in a transaction with a rollback.</li>
<li>Use minify only for logs, transport or a single-line config value, never as the reviewed master copy.</li>
<li>Store the formatted version as the readable source of truth and re-run the formatter after edits.</li>
</ol>
<p>If the formatted query fails, the cause is often a comment that moved, an identifier that matched a keyword, or a dialect feature the tool does not understand. Compare the first changed line with the original rather than rewriting the whole statement. For queries built from application strings, format the final SQL after parameter substitution in a safe development environment; the tool has no idea which placeholders are bound at runtime.</p>
<p>When the query is part of an API debugging session, the <a href="/blog/json-formatter-guide/json-parse-errors">JSON parse error guide</a> covers the other half of the payload. When a query string contains encoded values, the <a href="/blog/json-formatter-guide/url-encoding-spaces-symbols">URL encoding guide</a> explains why a parameter may not match what you see in the editor.</p>
<div class="cta-box"><strong>Format a query now:</strong> paste it into the <a href="/sql-formatter">SQL formatter</a>, review the clause layout, then copy the result. The tool runs locally and never connects to a database. For the surrounding workflow, start with the <a href="/blog/json-formatter-guide">developer toolkit guide</a>.</div>
`;

export const sqlFormatter: BlogPost = {
  pillar: "json-formatter-guide",
  slug: "format-sql-queries",
  kind: "cluster",
  title: "Format SQL Queries: Readable Joins and Clauses",
  description:
    "Format SQL queries into readable joins and clauses, understand the tool's keyword rules, and verify the output before running it in any database.",
  keywords: ["format sql query joins", "sql formatter keyword based", "readable sql clauses", "sql minify whitespace", "sql formatter dialect limits"],
  toolSlugs: ["sql-formatter"],
  relatedSlugs: ["json-parse-errors", "regex-flags-capture-groups", "url-encoding-spaces-symbols"],
  published: "2026-10-22",
  updated: "2026-10-22",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "how-it-works", text: "What the formatter changes", level: 2 },
    { id: "clause-layout", text: "Clause layout and joins", level: 2 },
    { id: "literals-comments", text: "Literals and comments", level: 2 },
    { id: "behavior-table", text: "What to verify", level: 2 },
    { id: "dialect-limits", text: "Dialect limits", level: 2 },
    { id: "workflow", text: "Safe workflow", level: 2 },
  ],
  html,
  faqs: [
    { question: "Is the SQL formatter a full parser?", answer: "No. It is a keyword and whitespace formatter. It uppercases a fixed list of common keywords, breaks major clauses onto new lines and indents parentheses. It does not validate syntax, understand schemas or know your database dialect, so review the output before running it." },
    { question: "Which SQL dialects does it support?", answer: "It is dialect-neutral but limited to its keyword list. Common SELECT, JOIN, GROUP BY and UPDATE patterns format well. Vendor-specific keywords such as QUALIFY, ILIKE or RETURNING are not recognized and keep their original case. For migrations or generated SQL, use a dialect-aware parser and test against the target engine." },
    { question: "Why did a comment move onto its own line?", answer: "The formatter treats keywords inside comments like any other keyword. A comment containing SELECT can trigger a major-clause line break, leaving the comment marker alone and the remaining text on a new line. Remove comments before formatting, or inspect the result carefully before executing anything." },
    { question: "Does minify change string values?", answer: "It can. Minify collapses every whitespace run to one space, including spaces inside quoted strings, and it does not protect literals first. A value with two intentional spaces becomes one. Check string data after minifying, or keep the formatted multi-line version as the authoritative copy." },
    { question: "Does the formatter connect to my database?", answer: "No. The tool runs in the browser with no connection and no credentials. It cannot check whether tables exist, whether a join is valid or whether the statement will lock rows. Those checks belong in a development database, a transaction or an execution plan review." },
    { question: "Why did my query break after formatting?", answer: "A likely cause is a keyword-like identifier, especially in backticks or square brackets that the tool does not protect. Another is a comment containing a clause keyword. Compare the first changed line with the original, quote identifiers correctly for your dialect, and run the statement in a safe environment before production." },
  ],
};

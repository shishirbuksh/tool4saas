import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>A test suite failed for the third time in a week because test B assumed the user created by test A still had ID 7. The database had been reseeded, the auto-increment counter had moved, and the assumption collapsed. Switching the fixtures to UUIDs removed the dependency on insertion order. <strong>Random identifiers decouple tests from sequence</strong>, but they introduce a second question that is easy to miss: should the same test run produce the same IDs every time? The answer depends on whether you are protecting isolation or protecting a snapshot.</p>
<p>The wider <a href="/blog/json-formatter-guide">developer toolkit guide</a> covers the surrounding debugging workflow. Generate IDs in the UUIDs tab of the <a href="/random-number">random number and UUID studio</a>, then format the resulting fixtures in the <a href="/json-formatter">JSON formatter</a>.</p>

<h2 id="math">122 random bits, and what the collision odds mean</h2>
<p>An RFC 4122 version 4 UUID contains 128 bits, of which 122 are random; six bits are fixed for the version and variant. The birthday approximation for the chance of at least one duplicate among <em>n</em> IDs is about <em>n</em>² divided by twice 2¹²². For 10,000 IDs that is roughly <strong>9.4 × 10⁻³⁰</strong>, close to 10⁻²⁹. Reaching a 50% chance would take about 2.7 quintillion IDs. At a million IDs per second, that is tens of thousands of years, which is why the risk is negligible at practical scale. Negligible is not the same as impossible, so the honest phrasing is low risk rather than collision-proof.</p>
<p><strong>Worked example: 10,000 user fixtures.</strong> The probability of any duplicate is about one in 10²⁹, far below the chance of a hardware fault corrupting the seed file. A unique index on the ID column still costs almost nothing and catches a duplicated row from a bad import or a copy-paste error. Deduplication is belt and braces, not a sign that the math is shaky.</p>
<p>The formula grows with the square of the number of IDs, which is why the odds stay tiny for test-sized sets and become interesting only at astronomical scale. A million IDs still sit near 10⁻²⁵. The practical lesson is not to memorize the exponent but to stop treating uniqueness as a scheduling problem: generate the IDs, enforce a unique constraint, and spend the saved attention on the test logic.</p>
<p>The browser tool caps a run at 500 UUIDs. Ten thousand IDs therefore means 20 runs of 500, or a script or database function that does it in one statement. The tool has no 10,000-in-one-click mode, and requesting a larger number silently produces 500 rather than an error; the result header tells you how many were generated, so check it. Practical generation options include <code>crypto.randomUUID()</code> in browsers and Node, <code>uuid.uuid4()</code> in Python, <code>gen_random_uuid()</code> in PostgreSQL, <code>UUID()</code> in MySQL and <code>NEWID()</code> in SQL Server. The versions differ: MySQL's <code>UUID()</code> returns a time-based version 1 value, while <code>NEWID()</code> is random. Check the version digit when the distinction matters.</p>
<pre><code>import { randomUUID } from "node:crypto";

const ids = Array.from({ length: 10000 }, () => randomUUID());</code></pre>
<p>Write those IDs to a fixture file or insert them in a transaction; do not regenerate them for every row of a related table. The point of a UUID is that a value can be referenced without knowing when it was inserted. The version and variant bits do not add randomness beyond the 122 bits, and the hyphenated 8-4-4-4-12 layout is formatting rather than entropy.</p>

<h2 id="bulk">Bulk generation and reproducible fixtures</h2>
<p>The <a href="/random-number">random studio</a> has three tabs: Numbers, Strings and UUIDs. In the UUIDs tab, set the count, choose whether to uppercase the output, press Generate, then use Copy to take all lines at once. Uppercase is presentation only; normalize to lowercase before comparing or storing if your schema expects canonical form. For a 10,000-row seed, 20 batches of 500 are possible but tedious, and every Copy replaces the clipboard, so paste each batch into a growing file before generating the next one.</p>
<p>That workflow is fine for a one-off fixture. It is a poor fit for repeatable test data, because random values generated at runtime change on every run. Tests become order-independent, which is the goal, but any snapshot, golden file or hard-coded assertion that contains an ID becomes non-deterministic. The suite may pass while the snapshot diff fails, or the diff may be accepted blindly and stop protecting anything. Decide which property the test needs.</p>
<p><strong>Worked example: a committed fixture file.</strong> Generate 10,000 IDs once, write them to <code>tests/fixtures/users.json</code>, and commit that file. Every developer and CI run reads the same IDs, so snapshots stay stable and a failing diff points at real behavior. Regenerate the file deliberately when the fixture schema changes, and treat the change as a reviewable diff. This is usually the right choice for integration tests that compare complete responses.</p>
<p><strong>Worked example: deterministic UUIDv5.</strong> When even a fixture file feels heavy, derive IDs from stable inputs with UUIDv5. The same namespace and name always produce the same identifier, so <code>user:42</code> can map to a fixed UUID without storing a lookup table. Version 5 uses SHA-1 over the namespace and name; it is deterministic, not random. Do not use it for secrets or for values that must be unguessable. The UUIDs tab does not generate v5, so use a library or a database function that supports it.</p>
<p>A committed fixture does not need 10,000 rows to prove the pattern. Start with the five or ten records a test actually reads, give each a fixed UUID, and reference them by name in the test code rather than by position in the file. The seed script can load the same fixture for local development. If a test needs volume, generate the bulk rows from the fixture, keeping the referenced IDs stable while the filler rows remain disposable.</p>
<p>For tests that mutate data in parallel, random IDs generated per test remain the better isolation tool. Use them where no snapshot asserts the literal value, and add <code>ORDER BY</code> to queries whose row order would otherwise depend on insertion sequence. A unique constraint on the identifier column is still worthwhile. Reusing one fixed ID across tests that delete rows creates a different kind of flake, so choose the pattern per test rather than applying one rule everywhere.</p>

<h2 id="uuid-vs-string">Storage, sorting and the wrong jobs for a UUID</h2>
<table>
<thead><tr><th>Need</th><th>Use</th><th>Why</th></tr></thead>
<tbody>
<tr><td><strong>Test row identifier</strong></td><td>UUID v4 in a native column</td><td>122 random bits, independent of insertion order</td></tr>
<tr><td><strong>Stable snapshot value</strong></td><td>Committed fixture or UUID v5</td><td>Same input produces the same ID every run</td></tr>
<tr><td><strong>Time-ordered key</strong></td><td>UUID v7 from an application library</td><td>Sortable by creation time; this tool does not generate it</td></tr>
<tr><td><strong>Human-facing code</strong></td><td>Random string</td><td>Shorter and easier to read aloud than 36 characters</td></tr>
<tr><td><strong>API key or token</strong></td><td>Dedicated secret system</td><td>Needs revocation, hashing and rotation, not just uniqueness</td></tr>
</tbody>
</table>
<p>Storage choices matter more than they appear. PostgreSQL has a 16-byte <code>uuid</code> type; SQL Server uses 16-byte <code>uniqueidentifier</code>; MySQL commonly stores <code>BINARY(16)</code> after conversion, while <code>CHAR(36)</code> costs 36 bytes before index overhead. The native or binary form is more compact and compares efficiently. Index the column, and never truncate a UUID to make it fit a shorter field: truncation discards part of the random value and can turn a negligible collision risk into a real one.</p>
<p>UUID and GUID describe the same 128-bit value under different ecosystem names. .NET exposes <code>Guid</code>, SQL Server calls the type <code>uniqueidentifier</code>, and RFC 4122 defines the textual layout. The version number still matters: a v4 GUID and a v4 UUID have the same randomness, while a v5 value is deterministic. Check the version digit before assuming two identifiers behave alike.</p>
<p>Version 4 values are not time-sortable. Inserting them as a clustered primary key scatters writes across the index, which is why some teams prefer UUIDv7 or a time-ordered ULID for high-volume tables. UUIDv7 is not generated by this tool, so do not assume the tab's output has that property. If sort order matters for test output, add an explicit <code>ORDER BY</code> on a stable column instead of relying on ID order; if it matters for production inserts, choose the identifier format with the database's index behavior in mind.</p>
<p>Finally, a UUID is an identifier, not a credential. It is not an API key, a session token or a password, and it has no revocation or rotation semantics. A v4 value has enough entropy for uniqueness, but using it as a bearer token turns any accidental log line into a security incident. Production secrets belong in a dedicated system with prefixes, hashed storage, scoped permissions and a rotation plan. Uppercasing a UUID does not make it more secure, and neither does keeping it secret in a test fixture.</p>
<blockquote class="tip">General guidance only. Schema, indexing and fixture strategy depend on your database and test runner. Validate migration behavior on a copy before changing identifier types in production.</blockquote>
`;

export const uuidSeed: BlogPost = {
  pillar: "json-formatter-guide",
  slug: "uuid-seed-test-database",
  kind: "cluster",
  title: "Seed Test Databases With UUIDs: Math and Workflow",
  description:
    "Generate 10,000 UUIDs for seed data, understand v4 collision odds, and choose committed fixtures or deterministic v5 IDs for stable tests.",
  keywords: ["seed test database uuid", "uuid v4 collision probability 10000", "bulk uuid generator 500", "deterministic uuid fixture tests", "uuidv4 vs uuidv7 storage"],
  toolSlugs: ["random-number"],
  relatedSlugs: ["sha256-vs-md5-hashes", "json-parse-errors", "regex-flags-capture-groups"],
  published: "2026-10-07",
  updated: "2026-10-22",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "math", text: "122-bit collision math", level: 2 },
    { id: "bulk", text: "Bulk generation and fixtures", level: 2 },
    { id: "uuid-vs-string", text: "Storage and alternatives", level: 2 },
  ],
  html,
  faqs: [
    { question: "Can generated UUIDs collide?", answer: "The risk is negligible at practical scale, not zero. A v4 UUID has 122 random bits, so 10,000 IDs have a duplicate probability near 9.4×10⁻³⁰, and a 50% chance would need about 2.7 quintillion IDs. Keep a unique index on the column as a cheap safeguard against import errors." },
    { question: "How many UUIDs can I generate at once?", answer: "The UUIDs tab generates at most 500 per run, with an optional uppercase toggle and a copy-all button. For 10,000 IDs, run it 20 times or use crypto.randomUUID() in a script, uuid.uuid4() in Python, or a database function such as gen_random_uuid(). Check the result header if you request a larger number, because the input is capped." },
    { question: "Are random UUIDs good for reproducible tests?", answer: "They are good for test isolation but not for snapshots. Fresh IDs on every run make order-dependent tests independent, while golden files containing those IDs change each time. Commit a generated fixture file for stable snapshots, or derive deterministic UUIDv5 values from stable inputs when you need the same ID every run." },
    { question: "Is UUIDv5 generated by the tool?", answer: "No. The tool generates RFC 4122 version 4 values with crypto.randomUUID(). Version 5 is deterministic and derived from a namespace and name using SHA-1, so it needs a library or database function. Use v5 for stable test keys, never for secrets or values that must be unguessable." },
    { question: "Should I store UUIDs as CHAR(36)?", answer: "Prefer a native UUID type or 16-byte binary where the database supports it. CHAR(36) costs more storage and index space, though it is simple and portable. Index the column, normalize case before comparisons, and never truncate the value to fit a shorter field, since that weakens the uniqueness guarantee." },
    { question: "Can I use a UUID as an API key?", answer: "No. A UUID identifies a row; it does not authorize access, expire or revoke. API keys need a dedicated design with enough random bytes, an identifiable prefix, hashed storage and a rotation process. Reusing a fixture UUID as a bearer token turns any log leak into an incident." },
  ],
};

import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>A file extension is a naming convention. A MIME type is a declaration that tells the browser or the server how to interpret the bytes. When a stylesheet loads as <code>text/plain</code>, the browser may refuse to apply it. When an API response is labeled <code>text/html</code>, a fetch call can parse it as text or reject it. Most of the time the mapping is automatic, which is why the failures feel mysterious when it is not.</p>
<p>Part of the <a href="/blog/json-formatter-guide">developer toolkit guide</a>. Use the local <a href="/mime-type-lookup">MIME type lookup</a> to move between common extensions and their registered types, then read the caveats below before treating the result as a server configuration.</p>

<h2 id="header-anatomy">What a MIME type actually contains</h2>
<p>A MIME type has a top-level type and a subtype, separated by a slash: <code>text/html</code>, <code>image/svg+xml</code>, <code>application/json</code>. It can carry parameters such as <code>charset=utf-8</code> or a multipart boundary. The <code>Content-Type</code> header on an HTTP response is the server's statement about the body. A <code>&lt;meta charset&gt;</code> tag or an HTML attribute can influence parsing, but the header usually wins for the initial response.</p>
<p>Type names are case-insensitive, although lowercase is conventional. The subtype can carry a structured-syntax suffix, as in <code>application/ld+json</code> or <code>image/svg+xml</code>. That suffix signals a structured syntax rather than a different top-level category. A server that does not recognize a suffix may still serve it correctly if the client understands the base type.</p>
<p>There is no universal registry lookup in the browser. The operating system, the web server, the framework and the CDN each carry their own table. That is why a file can have the right extension and still arrive with the wrong header. Diagnose the header, not just the file name.</p>

<h2 id="lookup-behavior">How the lookup tool behaves</h2>
<p>The tool contains a small built-in table of 44 common extensions and their types. It accepts an extension with or without a leading dot, lowercases the input and returns both sides of the mapping. It also accepts a MIME type and searches for the first matching extension. For example, <code>json</code> and <code>.json</code> both return <code>application/json</code>, while <code>application/json</code> returns <code>.json</code>.</p>
<p>Reverse lookup is not one-to-one. <code>image/jpeg</code> maps to both <code>jpg</code> and <code>jpeg</code>; the tool returns the first entry it encounters, which is <code>jpg</code>. <code>text/javascript</code> maps to <code>js</code> and <code>mjs</code>, and returns <code>js</code>. If you need a specific extension, use the extension-to-type direction instead of assuming the reverse is unique.</p>
<p>The table covers documents, images, audio, video, archives, fonts and a few application formats. It does not include every registered type, vendor-specific types, parameters such as <code>charset</code>, or structured suffixes beyond the ones in the table. An unknown value returns an informational no-match message. That is a limitation, not a statement that the type is invalid.</p>
<table>
<thead><tr><th>Extension</th><th>Type</th><th>Typical use</th></tr></thead>
<tbody>
<tr><td><strong>.html</strong></td><td>text/html</td><td>HTML documents</td></tr>
<tr><td><strong>.css</strong></td><td>text/css</td><td>Stylesheets</td></tr>
<tr><td><strong>.js</strong></td><td>text/javascript</td><td>Classic and module scripts</td></tr>
<tr><td><strong>.json</strong></td><td>application/json</td><td>Structured API data</td></tr>
<tr><td><strong>.svg</strong></td><td>image/svg+xml</td><td>Vector images, also executable in some contexts</td></tr>
<tr><td><strong>.woff2</strong></td><td>font/woff2</td><td>Web fonts</td></tr>
<tr><td><strong>.webp</strong></td><td>image/webp</td><td>Compressed images</td></tr>
<tr><td><strong>.wasm</strong></td><td>application/wasm</td><td>WebAssembly modules</td></tr>
</tbody>
</table>

<h2 id="serving">Serving assets with the right type</h2>
<p>Static hosts usually infer the type from the extension. Dynamic frameworks may set it from a route handler or a file response helper. The failures cluster around a few patterns. A JavaScript module served as <code>text/plain</code> is blocked because module scripts require a JavaScript type. A CSS file served as <code>text/html</code> is ignored under strict MIME checking. A JSON endpoint served as <code>text/html</code> can still be read as text, but a client that expects JSON may parse it differently or reject it.</p>
<p>Fonts are another common case. A font served with the wrong type may fail to load, and a cross-origin font request also needs the right CORS headers. The MIME type alone does not grant permission. Check both the <code>Content-Type</code> and <code>Access-Control-Allow-Origin</code> values when a font or module fails only on a different origin.</p>
<p>SVG deserves separate treatment. It is an image type, but an SVG file is also XML and can contain scripts and external references. Served as <code>image/svg+xml</code> and loaded through <code>&lt;img&gt;</code>, scripts generally do not run. Inlined into the page or loaded as a document, the security model changes. Treat user-uploaded SVG as untrusted markup, not as a harmless picture.</p>

<h2 id="security">Content-Type is not a security boundary</h2>
<p>A browser may sniff the body and override a vague or missing type. <code>X-Content-Type-Options: nosniff</code> disables that behavior for many responses and makes a wrong type fail loudly instead of being guessed. That is usually desirable for scripts and styles, but it raises the cost of misconfiguration. Set the header deliberately and test the site after enabling it.</p>
<p>On uploads, the client-supplied type is a hint, not proof. An attacker can name an HTML file <code>photo.jpg</code> and send <code>image/jpeg</code> as the type. Validate the actual bytes, re-encode images where possible, store uploads outside the web root or serve them with <code>Content-Disposition: attachment</code> when they are not meant to render. Never rely on the extension alone.</p>
<p>For APIs, declare <code>application/json</code> and reject unexpected content types on write endpoints. Accepting <code>text/plain</code> because a proxy rewrote the header hides a real configuration problem. Log the received type when debugging, but do not echo it back without validation.</p>

<h2 id="debugging">Debugging a MIME problem</h2>
<ol>
<li>Open the network panel and read the response <code>Content-Type</code>, not the file extension.</li>
<li>Check the server or CDN rule that sets the header for that path or extension.</li>
<li>Confirm the file is not being served by a fallback route that returns HTML for missing assets.</li>
<li>Look for a proxy, service worker or build step that rewrites the response.</li>
<li>Test with a direct request such as <code>curl -I</code> to separate browser behavior from server behavior.</li>
<li>After changing the rule, purge the CDN cache and retest in a fresh tab.</li>
</ol>
<p>A 404 disguised as a MIME error is common in single-page apps. The server returns the app shell with <code>text/html</code> for a missing script, and the browser reports a type mismatch. The real fix is the missing file or the route fallback, not the MIME table.</p>

<h2 id="limits">Limits of a small lookup table</h2>
<p>The tool is a quick reference, not an authoritative registry. It will not resolve newer or vendor-specific types, and it does not tell you which type a particular server will send. Use it to check a familiar mapping, then verify the live header. For standards work, consult the IANA media types registry and your server's documentation. For a file you are about to publish, test the actual response from the actual host.</p>
<div class="cta-box"><strong>Look up a type now:</strong> enter an extension or MIME value in the <a href="/mime-type-lookup">MIME type lookup</a>, then verify the live header on the deployed asset. For structured data, continue with the <a href="/blog/json-formatter-guide/json-parse-errors">JSON parse error guide</a>.</div>
`;

export const mimeType: BlogPost = {
  pillar: "json-formatter-guide",
  slug: "mime-type-content-type",
  kind: "cluster",
  title: "MIME Types: What Content-Type Actually Controls",
  description:
    "Look up common file extensions and MIME types, understand Content-Type headers, and fix the misconfigurations that break assets.",
  keywords: ["mime type lookup", "content type header", "file extension mime", "application json content type", "mime type checker"],
  toolSlugs: ["mime-type-lookup"],
  relatedSlugs: ["json-to-csv", "format-xml-sitemaps-feeds", "base64-url-safe-vs-standard"],
  published: "2026-10-23",
  updated: "2026-10-23",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "header-anatomy", text: "What a MIME type contains", level: 2 },
    { id: "lookup-behavior", text: "How the lookup behaves", level: 2 },
    { id: "serving", text: "Serving assets correctly", level: 2 },
    { id: "security", text: "Security boundaries", level: 2 },
    { id: "debugging", text: "Debugging a MIME problem", level: 2 },
    { id: "limits", text: "Limits of the table", level: 2 },
  ],
  html,
  faqs: [
    { question: "Is a MIME type the same as a file extension?", answer: "No. The extension is part of the file name and helps software guess a type. The MIME type is a declaration sent with the content. A server can send any type it wants for a given extension, which is why the live header matters more than the file name." },
    { question: "Why does reverse lookup return only one extension?", answer: "Several extensions can share a type, such as jpg and jpeg for image/jpeg. The tool returns the first match in its table. Use extension-to-type lookup when you need to confirm a specific extension, and do not treat the reverse result as the only valid name." },
    { question: "Where does charset belong?", answer: "Charset is a parameter of the Content-Type header, as in text/html; charset=utf-8. The lookup table stores base types only. Set the charset in the server response or the document metadata, and keep the two consistent to avoid decoding errors." },
    { question: "Is image/svg+xml safe for uploads?", answer: "Not automatically. SVG is XML and can contain scripts, event handlers and external references. Serving it as an image limits some behavior, but inlining it or opening it as a document changes the risk. Validate and sanitize untrusted SVG, and consider serving downloads as attachments." },
    { question: "What if the type is not in the table?", answer: "The tool returns a no-match message. That does not prove the type is invalid; the table is intentionally small. Check the IANA registry or your platform documentation, then verify what the server actually sends for the file." },
  ],
};

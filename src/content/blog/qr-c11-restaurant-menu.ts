import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>A restaurant menu QR code is not a design object. It is a bridge between a hungry customer and a page that must load before they lose interest. Most failed menus fail for a boring reason: the code points at a PDF that downloads instead of opens, or at a desktop page that needs pinch-zoom to read a price. The square scans fine; the destination is the problem. This guide covers the destination, the code, print sizes and the update routine that saves reprints.</p>
<p>Part of the <a href="/blog/qr-code-generator-guide">free QR code generator guide</a>.</p>

<h2 id="choose-destination">Choose the destination before the code</h2>
<p>Three options exist, and they are not equal. A <strong>mobile web page</strong> is the best default: text stays crisp, prices are easy to update, search engines can read it, and customers can jump to a section. A <strong>PDF</strong> is acceptable for a short, stable menu. A <strong>photo of a printed menu</strong> is the weakest: it cannot reflow, blurs when zoomed, and a screen reader cannot read it.</p>
<p>The test is simple. Open the link on a phone using mobile data, not office WiFi. Time how long it takes to show prices, and read the cheapest and most expensive item without zooming. If the page forces a download, opens a Drive preview toolbar, or shows a cookie wall before the food, fix the destination first.</p>
<ul>
<li><strong>Mobile page:</strong> one column, text-based, sections for starters, mains, drinks and allergens.</li>
<li><strong>PDF:</strong> selectable text, one or two pages, under about 2 MB, stable URL on your own domain.</li>
<li><strong>Drive or Dropbox:</strong> only if anyone with the link can view; preview chrome gets in the way.</li>
<li><strong>Image-only menu:</strong> avoid it; it is a picture of a menu, not a menu.</li>
</ul>

<h2 id="build-menu-page">Build a menu page that works on a phone</h2>
<p>Keep the page brutally simple: restaurant name, a one-line description, then menu sections. Use real text for dish names and prices. Group items so a customer can find a vegetarian dish, a gluten-free option or a drink without scrolling through everything. State allergens where you can and tell customers to inform staff of serious allergies.</p>
<p>Set the page to load fast on a mid-range Android: compressed images, no autoplay video, no blocking web font, no email pop-up before the menu. A menu is not a lead magnet. Keep the font readable and test on a flaky connection.</p>
<h3>If you must use a PDF</h3>
<p>Export from the original design file. Use selectable text, embed the fonts, and name the file lunch-menu-october.pdf. Host it on your own domain and link directly. Test on an iPhone and an Android; some browsers open PDFs, others download them. Print a short URL under the code as a second route. A two-page PDF is fine; a 20-page drinks book is not a menu link.</p>

<h2 id="generate-code">Generate and size the code</h2>
<p>Shorten the link before encoding it. A clean address such as https://example.com/menu produces a sparse pattern that scans at 3–4 cm. A booking URL with tracking parameters can run past 100 characters and produce a dense grid that needs a larger print. If you need a short link, use one on your own domain that you control. Avoid a free shortener you do not administer; if it disappears, every printed code dies with it.</p>
<p>Generate a 2048px PNG for table tents, counter cards and window signs, and 512px only for small cards viewed at arm’s length. Keep black on white with the four-module quiet zone intact. Do not place the code over a food photo, dark brand colour or patterned tablecloth. Matte lamination beats gloss because it does not throw a ceiling light into the camera. The sizing rules are in the <a href="/blog/qr-code-generator-guide/qr-code-size-print-guide">QR code print size guide</a>.</p>

<h2 id="placement">Placement: table, counter, window</h2>
<p>Put the code where a seated customer can scan it without getting up, and a second where takeaway customers wait. Table tents should sit flat, not inside a curved holder that distorts the pattern. Counter cards need a stand that stops them sliding. Window decals need exterior-grade material out of direct sun, because fading kills contrast.</p>
<table>
<thead><tr><th>Placement</th><th>Viewing distance</th><th>Minimum size</th><th>Material and notes</th></tr></thead>
<tbody>
<tr><td><strong>Table tent</strong></td><td>40–60 cm</td><td>4–6 cm</td><td>Matte laminated card, flat base, one per table</td></tr>
<tr><td><strong>Counter card</strong></td><td>50–80 cm</td><td>5–8 cm</td><td>Rigid stand, wipeable, near the till or pickup point</td></tr>
<tr><td><strong>Window or door</strong></td><td>1.5–3 m</td><td>15–30 cm</td><td>Exterior-grade vinyl, shaded from direct sun, 2048px</td></tr>
<tr><td><strong>Bill folder</strong></td><td>30–40 cm</td><td>3–4 cm</td><td>Matte card, paired with a payment prompt</td></tr>
<tr><td><strong>Takeaway bag</strong></td><td>40–60 cm</td><td>4–6 cm</td><td>Matte sticker, placed on a flat panel, not a fold</td></tr>
</tbody>
</table>
<p>Label the code with its job: “Menu” is enough. If you run separate lunch and dinner pages, label them clearly and keep the codes physically separate. Two unlabelled codes side by side force the customer to guess, and guessing at a table is how a menu QR code gets ignored. If both menus live on one page with tabs, one code is simpler and easier to maintain.</p>

<h2 id="update">Update the menu without reprinting</h2>
<p>A static QR code cannot be edited after printing, but the page behind it can. That suits most restaurants: encode a stable URL you control, then change prices, mark items as sold out and swap the lunch PDF at that URL. The printed code keeps working because the destination has not moved.</p>
<p>If you need to change the destination itself, you have two options. Reprint the code, which is cheap for a table tent and expensive for a window decal, or use a dynamic QR code that routes through a provider. Dynamic codes allow editing and scan counts, but they depend on a subscription; stop paying and the printed code stops working. For a single restaurant with a stable page, a static code paired with a page you control is simpler and has no recurring cost. The trade-offs are compared in <a href="/blog/qr-code-generator-guide/static-vs-dynamic-qr-codes">static vs dynamic QR codes</a>.</p>

<h2 id="test">Test the scan before the lunch rush</h2>
<p>Print one table tent and one counter card at 100% scale. Disable “fit to page” in the printer dialog, because it shrinks the pattern by a few percent and can eat the quiet zone. Scan both with two phones at the real distance, in daylight and pendant light. Open the menu over mobile data, not restaurant WiFi, and check the load time. Try an older phone with a weaker camera. If the code scans but the PDF downloads, the problem is the destination, not the print.</p>
<p>Do this before a busy service, not during one. A code that fails at 12:30 on a Saturday is a queue of customers holding phones while a server tries to explain. Keep one printed test card behind the till with the date on the back. When the menu changes, test again; a new PDF can break a link that worked last month. Most restaurant failures are destination problems: a moved file, a permission change or a page that no longer exists.</p>

<h2 id="worked-examples">Two worked setups</h2>
<p><strong>Example 1 — 40-cover neighbourhood restaurant, Bengaluru.</strong> The restaurant builds a one-page menu at https://example.com/menu with sections for small plates, mains, breads, desserts and drinks. Prices are text, not images, and the page loads quickly over mobile data on a mid-range Android. The code is generated at 2048px and printed at 5 cm on matte laminated table tents, one per table, with a second 6 cm card at the pickup counter. The line above the code reads “Scan for the menu.” The manager updates the page when a dish sells out and changes prices there, never on the printed card. A test scan is repeated after every menu edit.</p>
<p><strong>Example 2 — 12-seat bakery, Pune.</strong> The bakery has a single-page PDF at https://example.com/bakery-menu.pdf, exported from the original design file with selectable text and a file size under 2 MB. The code is printed at 6 cm on an A5 counter card and at 4 cm on takeaway bags. Because some Android browsers download PDFs instead of opening them, the card also prints the short URL in 14-point type underneath. The owner tests the link on an iPhone and a budget Android after each seasonal change, and keeps the previous PDF at the same URL until the new one works.</p>

<h2 id="common-mistakes">Five mistakes that ruin a menu code</h2>
<ol>
<li><strong>Encoding a login-only file.</strong> Set sharing so anyone with the link can view, then test signed out.</li>
<li><strong>Printing too small.</strong> A dense 120-character URL at 2.5 cm fails on older phones. Shorten it or print at 5 cm.</li>
<li><strong>Using curved or glossy stock.</strong> Reflections and distortion break the pattern. Use flat matte material.</li>
<li><strong>Letting the destination die.</strong> Replacing menu-final-v3.pdf breaks the old link. Keep stable URLs.</li>
<li><strong>Skipping the mobile test.</strong> A page that looks fine on a laptop can be unreadable on a phone.</li>
</ol>
<div class="cta-box"><strong>Make the code:</strong> open the <a href="/qr-code-generator">free QR code generator</a>, paste your stable menu URL, export 2048px, and print one test tent before ordering a full set.</div>
`;

export const qrRestaurantMenu: BlogPost = {
  pillar: "qr-code-generator-guide",
  slug: "qr-code-restaurant-menu",
  kind: "cluster",
  title: "Restaurant Menu QR Code: Setup & Best Practices",
  description:
    "Set up a restaurant menu QR code that opens a fast mobile page or PDF. Print sizes, table placement, update rules and scan tests for 2026.",
  keywords: ["restaurant menu qr code", "menu qr code for restaurant", "qr code menu pdf", "digital menu qr code", "table tent qr code size"],
  toolSlugs: ["qr-code-generator", "qr-scanner"],
  relatedSlugs: ["qr-code-size-print-guide", "static-vs-dynamic-qr-codes", "qr-code-not-scanning-fix"],
  published: "2026-10-22",
  updated: "2026-10-22",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "choose-destination", text: "Choose the destination first", level: 2 },
    { id: "build-menu-page", text: "Build a phone-friendly menu", level: 2 },
    { id: "generate-code", text: "Generate and size the code", level: 2 },
    { id: "placement", text: "Placement: table, counter, window", level: 2 },
    { id: "update", text: "Update without reprinting", level: 2 },
    { id: "test", text: "Test before the lunch rush", level: 2 },
    { id: "worked-examples", text: "Two worked setups", level: 2 },
    { id: "common-mistakes", text: "Five menu-code mistakes", level: 2 },
  ],
  html,
  faqs: [
    { question: "Should a restaurant menu QR code open a page or a PDF?", answer: "A mobile web page is the better default because text reflows, prices are easy to update and the page is accessible. A short text-based PDF is acceptable for a stable one-page menu, but test that it opens in the browser instead of downloading. Never use a photo of a printed menu; it cannot reflow and blurs when zoomed." },
    { question: "What size should a table tent QR code be?", answer: "Use 4–6 cm for a table tent viewed at 40–60 cm, and 5–8 cm for a counter card at 50–80 cm. Window codes read from 1.5–3 m need 15–30 cm. The working rule is width in centimetres roughly equal to the viewing distance in centimetres divided by 10, with a 2 cm floor for short links." },
    { question: "Can I change the menu after printing the QR code?", answer: "Yes, if the code points to a page or file URL you control. Edit the page or replace the PDF at the same address and the printed code keeps working. A static code cannot change its destination, so if you move to a new URL you must reprint. Dynamic codes allow redirects but depend on a subscription." },
    { question: "Do menu QR codes expire?", answer: "A static QR code never expires because the destination is embedded in the pattern. The menu can still break if the page is deleted, the PDF is moved, or a third-party shortener shuts down. Use a stable URL on your own domain, test it after every menu change, and keep the PDF at the same address until the replacement is confirmed." },
    { question: "Why does the menu PDF download instead of opening?", answer: "Browsers handle PDFs differently, especially on Android, where some download the file rather than display it. Host the PDF on your own domain, link directly to the file, keep it under about 2 MB and test on both iPhone and Android. Print a short URL under the code as a fallback for customers whose browser downloads it." },
    { question: "How many menu QR codes does a restaurant need?", answer: "One code per distinct menu or location is enough. If lunch and dinner use separate URLs, print two clearly labelled codes; if both live on one page with tabs, use one code. Groups with multiple branches need a separate code per branch so the destination matches the location. Avoid placing two unlabelled codes side by side." },
  ],
};

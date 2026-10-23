import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>A customer who has just paid is the easiest person to ask for a review, and the hardest to send on a scavenger hunt. Telling them to open Google, search your business, scroll past the map and tap “Write a review” loses the moment. A <strong>google review qr code</strong> collapses that journey into one tap: the review form opens with the star rating on screen. The code takes a minute; the link inside it, the wording and the timing decide whether the scan becomes a published review.</p>
<p>This guide is part of the <a href="/blog/qr-code-generator-guide">free QR code generator guide</a>. It covers the only link worth encoding, placement, policy and the scan test that prevents a silent failure at the counter.</p>

<h2 id="why-direct-link">Why the direct review link wins</h2>
<p>There are three links a business owner can put behind a QR code, and only one is useful. The ordinary Google Maps listing opens photos, hours, directions and a review section the customer still has to find. The Business Profile dashboard link asks for a login and shows internal controls, which is worse. The review form link Google generates for the location opens a page with the business name and five stars, ready to rate.</p>
<p>That direct link matters because friction is cumulative. The customer needs a Google account, a connection and patience to finish. Every extra tap before the form is a chance to abandon. The direct link removes the searching and the doubt about which listing is correct. It does not remove the sign-in requirement or write the review. It puts the form where the customer already is.</p>
<p>A QR code also beats a printed URL because nobody has to type a 30-character address. The pattern carries the full link, including the place identifier, so it cannot be mistyped.</p>

<h2 id="get-the-link">Get your review link from Business Profile</h2>
<p>Sign in at business.google.com with the account that manages the location, choose the location if you manage several, and find the reviews card. Google labels the action “Get more reviews” or “Ask for reviews” depending on the dashboard version. The link it offers opens the review form for that specific location, which is exactly what you want to encode.</p>
<p>Google also publishes a direct form at <strong>https://search.google.com/local/writereview?placeid=YOUR_PLACE_ID</strong>, with the place ID from the Maps Platform Place ID Finder. This URL is useful when the dashboard link is awkward to copy, but it is long and easy to break by hand. Copy it whole and test it signed out.</p>
<ul>
<li><strong>Never encode the Maps listing URL.</strong> It adds search steps and often opens the Maps app instead of the form.</li>
<li><strong>Never encode the dashboard URL.</strong> It asks for a login and exposes controls customers should not see.</li>
<li><strong>One location, one link.</strong> One per branch, each labelled.</li>
<li><strong>Re-check after a listing change.</strong> Listing merges and name changes can break the link.</li>
</ul>

<h2 id="placement">Where to place the code</h2>
<p>Placement decides more than graphic design. The code should appear when the customer is most satisfied and least rushed: after payment, after a successful appointment, or while waiting for takeaway. A code by the door competes with traffic and rain. A code on the bill folder arrives while the customer is still seated and still thinking about the service.</p>
<table>
<thead><tr><th>Placement</th><th>Viewing distance</th><th>Minimum size</th><th>Why it works</th></tr></thead>
<tbody>
<tr><td><strong>Bill folder or receipt sleeve</strong></td><td>30–40 cm</td><td>3–4 cm</td><td>Arrives at payment, when the visit is fresh</td></tr>
<tr><td><strong>Counter card</strong></td><td>50–80 cm</td><td>5–8 cm</td><td>Visible while waiting, easy for staff to point at</td></tr>
<tr><td><strong>Table tent</strong></td><td>40–70 cm</td><td>4–7 cm</td><td>Works during a long meal without staff prompting</td></tr>
<tr><td><strong>Reception frame</strong></td><td>1–2 m</td><td>10–20 cm</td><td>Seen while queuing or checking in</td></tr>
<tr><td><strong>Takeaway bag sticker</strong></td><td>40–60 cm</td><td>4–6 cm</td><td>Extends the ask beyond the shop</td></tr>
</tbody>
</table>
<p>The sentence next to the code does more work than the code. “Loved your visit? 10 seconds” sounds friendly but quietly filters: a customer who had a mixed experience reads it as an invitation for happy people only. Google’s policies discourage selective solicitation, and the practice distorts the feedback you need. Use neutral wording such as “Tell us about your visit — two minutes.” Staff can add a spoken prompt at payment.</p>

<h2 id="size-and-testing">Size, contrast and scan testing</h2>
<p>Use the same rule as any print code: minimum width in centimetres is roughly viewing distance divided by 10, with a 2 cm floor for short URLs. A Business Profile review link is usually short — often a g.page/r/... address — so the pattern is sparse. That does not make 2 cm sensible on a folder picked up and photographed at an angle. Give it 3 cm at 30 cm, 5–6 cm at 50–60 cm, and 10–20 cm for a poster read from two metres.</p>
<p>Export 512px for prints up to about 5 cm and 2048px above that; never upscale. Keep black modules on white, leave the four-module quiet zone untouched, and choose matte lamination. A glossy card reflecting a ceiling light is the most common reason a review code fails at a counter. The full distance table is in the <a href="/blog/qr-code-generator-guide/qr-code-size-print-guide">QR code size and print guide</a>.</p>
<p>Test before the print run. Print one copy at 100%, disable “fit to page”, then scan it signed out of Google with two phones. The form should appear without a login prompt or permission error. Scan at the real distance under the real lighting, and try an older Android as well as an iPhone. If the camera struggles, the print is the problem; the <a href="/blog/qr-code-generator-guide/qr-code-not-scanning-fix">not-scanning fixes</a> walk through size, contrast, glare and file faults.</p>

<h2 id="policy">Google policy: ask everyone, never gate</h2>
<p>Google’s prohibited content policy bans incentives: no discount, free dessert, prize draw or staff bonus tied to a review. It also bans review gating, the trick of asking only customers who answer a satisfaction question positively. A code that opens the review form for every customer is fine. A code that opens a screening survey first is not. Reviews can be removed and ratings filtered.</p>
<p>Ask once, ask everyone, and never write the review for them. Do not stand over the customer or hold the phone. The code should make the honest path easy, not manufacture a rating. If a customer had a bad experience, the same code gives them a way to say so before they tell the neighbourhood. That is useful information arriving while you can still act on it.</p>

<h2 id="worked-examples">Two worked setups</h2>
<p><strong>Example 1 — neighbourhood café, Kochi.</strong> A 28-seat café prints 4 cm codes on matte card stock for the bill folder. The destination is the Business Profile review link, generated at 2048px because the folder sits 30–40 cm from the customer’s phone and is handled constantly. The line above the code reads “Tell us about today’s visit — two minutes.” Staff slide the folder across with the card facing up and say one sentence. It is tested at 40 cm in daylight and pendant light on an iPhone and a budget Android. If the review link changes after a listing merge, only the folder card is reprinted; the table tents use a separate file.</p>
<p><strong>Example 2 — dental clinic, Jaipur.</strong> A two-chair clinic places a 6 cm framed code at reception, with a 3 cm version on the appointment card. The frame is 60 cm from a seated patient, so 6 cm gives a comfortable margin over the distance rule. The card asks after the appointment is booked, not while the patient is in the chair. The frame is matte, fixed flat to the wall and wiped weekly. The receptionist can point to it if someone hesitates, but does not hand over a phone or dictate the wording. A small line reads “Reviews help other patients choose carefully.” That sentence is true whether the review is glowing or critical.</p>

<h2 id="measure">Measure reviews, not scans</h2>
<p>A static QR code carries no analytics. You will not know how many people scanned it, and any service promising scan counts is routing your link through its own server. For a review code that trade is wrong: the link is short, the destination is Google, and a redirect that expires would break every printed card. Measure new reviews week by week and the proportion that mention a server, a dish, a treatment or a repair. Ask staff to note when a customer says they scanned the code; a paper tally at the till is enough.</p>
<p>Keep the link and the code in one document: the review URL, the date it was last tested, the print files and who approved the wording. When a manager changes, the next person can regenerate the code in a minute.</p>
<div class="cta-box"><strong>Your next step:</strong> copy the review link from your Business Profile, paste it into the <a href="/qr-code-generator">free QR code generator</a>, download a 2048px PNG and print one test card before ordering a batch. The code is static, so it keeps working for as long as the review link does.</div>
`;

export const qrGoogleReviews: BlogPost = {
  pillar: "qr-code-generator-guide",
  slug: "qr-code-google-reviews",
  kind: "cluster",
  title: "Google Review QR Code: Get More Reviews",
  description:
    "Turn your Google Business Profile review link into a QR code customers can scan at the counter. Sizes, placement, policy tips and scan tests.",
  keywords: ["google review qr code", "qr code for google reviews", "google business profile review link", "get more google reviews qr", "review qr code for restaurant"],
  toolSlugs: ["qr-code-generator"],
  relatedSlugs: ["qr-code-for-business", "qr-code-size-print-guide", "qr-code-not-scanning-fix"],
  published: "2026-10-22",
  updated: "2026-10-22",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "why-direct-link", text: "Why the direct review link wins", level: 2 },
    { id: "get-the-link", text: "Get your review link", level: 2 },
    { id: "placement", text: "Where to place the code", level: 2 },
    { id: "size-and-testing", text: "Size, contrast and scan testing", level: 2 },
    { id: "policy", text: "Google policy: ask everyone", level: 2 },
    { id: "worked-examples", text: "Two worked setups", level: 2 },
    { id: "measure", text: "Measure reviews, not scans", level: 2 },
  ],
  html,
  faqs: [
    { question: "Where do I find my Google review link?", answer: "Sign in at business.google.com, select the location and open the reviews card labelled Get more reviews or Ask for reviews. Copy the link it offers and test it in a private window while signed out. Google also publishes a direct writereview URL using a place ID from the Maps Platform Place ID Finder, but the dashboard link is shorter and easier to verify." },
    { question: "Can I offer a discount for scanning the review code?", answer: "No. Google prohibits incentives such as discounts, free items, prize draws or staff bonuses tied to reviews, and it prohibits review gating that shows the form only to happy customers. Ask every customer with neutral wording and keep the code optional. Incentives risk removed reviews and damage the accuracy of the feedback you are trying to collect." },
    { question: "What size should a review QR code be?", answer: "Use 3–4 cm on a bill folder or receipt sleeve viewed at 30–40 cm, 5–8 cm for a counter card at 50–80 cm, and 10–20 cm for a reception poster read from one to two metres. The distance rule is width in centimetres roughly equal to viewing distance divided by 10. Export 512px up to 5 cm and 2048px above that." },
    { question: "Do QR codes for Google reviews expire?", answer: "The QR code is static, so the pattern itself never expires. The destination can change if the Business Profile is merged, moved or closed, or if a third-party redirect in front of the link shuts down. Keep the review link on your own printed card, test it quarterly, and regenerate the code only if the underlying link changes." },
    { question: "Can I track how many people scan the review QR code?", answer: "Not with a static code. There is no scan counter because the pattern carries the destination directly. Watch new reviews on the Business Profile and ask staff to tally customers who mention scanning. Avoid putting a dynamic redirect in front of a review link just for analytics, since an expired subscription would break every printed card." },
    { question: "Why does the review form ask customers to sign in?", answer: "Posting a Google review requires a Google account, so the sign-in prompt is expected. What is not expected is a request for access to a file or a message that you need permission. That usually means the encoded link points to the Business Profile dashboard or a restricted document instead of the public review form. Re-copy the review link and test it signed out." },
  ],
};

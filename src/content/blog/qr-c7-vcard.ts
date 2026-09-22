import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>At a 2025 trade expo I watched two stalls: one handed paper cards (half left on tables), the other had a <strong>vCard QR code</strong> on a stand — visitors scanned, contact saved, follow-up same evening. I scanned it too: name, two numbers, email, company, all imported to my phone in 5 seconds with zero typos. Paper cards get lost; scanned contacts get called. Here is how to make yours.</p>
<p>Part of the <a href="/blog/qr-code-generator-guide">free QR code generator guide</a>. Generate in the <a href="/qr-code-generator">free QR code generator</a>; verify imports with the <a href="/qr-scanner">QR scanner</a>.</p>

<h2 id="what-vcard">What a vCard QR code holds (and why order matters)</h2>
<p>A vCard is a standard contact format — name, organization, title, phones, email, address, website — encoded as text. Phones parse it into an “Add contact” prompt. Field order and labels decide whether iPhone and Android both import cleanly: standard fields (N, FN, ORG, TITLE, TEL, EMAIL, URL, ADR) work everywhere; exotic extensions get ignored by one platform or the other. Keep to the classics.</p>
<ul>
<li><strong>Always include:</strong> full name, one mobile with country code (+91 / +1 / +44), one email. These three make the contact usable.</li>
<li><strong>Usually include:</strong> company, title, website. Context that prevents “who is this?” six months later.</li>
<li><strong>Skip:</strong> photos (bloat the code past scannable density), three addresses, five numbers. A card with everything scans like nothing.</li>
</ul>

<h2 id="make-it">Make yours: fields + density control</h2>
<ol>
<li><strong>Draft minimal fields:</strong> name, mobile (+country code), email, company + title, one website. That is ~150 characters — comfortably scannable.</li>
<li><strong>Generate</strong> in the <a href="/qr-code-generator">free QR code generator</a> and eyeball density. Snowstorm pattern? Cut a field before printing — never shrink a dense vCard under 2.5 cm.</li>
<li><strong>Download 512px PNG</strong> for cards and email signatures (<strong>qr-contact-512.png</strong>). Print minimum 2–2.5 cm on cards; 5 cm+ on stands.</li>
<li><strong>Test both platforms:</strong> scan with one iPhone and one Android and actually tap “Save”. I caught an Android-quirk once where a second TEL line without a type label imported as fax. One label fixed it.</li>
</ol>
<table>
<thead><tr><th>Use</th><th>Size</th><th>Extra tip</th></tr></thead>
<tbody>
<tr><td><strong>Business card back</strong></td><td>2–2.5 cm</td><td>Label it “Scan to save contact” — bare squares get ignored</td></tr>
<tr><td><strong>Email signature</strong></td><td>~100px image</td><td>Link the image to your site too, for desktop readers</td></tr>
<tr><td><strong>Expo stand / badge</strong></td><td>5–8 cm</td><td>Arm's length scanning in crowds; matte finish</td></tr>
<tr><td><strong>Freelancer portfolio</strong></td><td>3 cm on leave-behind</td><td>Pair with a URL code to your work, not instead of it</td></tr>
</tbody>
</table>

<h2 id="label-place">Label it and place it: the half everyone skips</h2>
<p>A perfect vCard code that nobody scans is a decoration. Bare squares get ignored — people do not point cameras at unexplained patterns. Always print a micro-label: “Scan to save my contact” on cards, “Scan to save the speaker's contact” on stands. Place it where the phone already is: back of the business card (not buried inside a brochure), table tents at eye level when seated, badges at chest height where another person's camera naturally points during conversation. At expos, the stand code beats the badge code — badges tilt, twist and hang in shadows; stands stay flat, lit and still.</p>

<h2 id="india-context">India context: two numbers, WhatsApp, UPI</h2>
<p>Indian networking runs on specifics: include the <strong>WhatsApp number explicitly</strong> (often the same mobile — label it), add your UPI ID on freelancer cards so “send advance” takes seconds (see <a href="/blog/qr-code-generator-guide/upi-payment-qr-code-india">UPI QR guide</a>), and keep a English + regional-language card only if clients ask — one clean English vCard scans most reliably. Consultants: your designation line (“GST Consultant, Pune”) matters more than a logo. Print logic for all of this in <a href="/blog/qr-code-generator-guide/qr-code-size-print-guide">the sizing guide</a>; when scans fail, <a href="/blog/qr-code-generator-guide/qr-code-not-scanning-fix">not-scanning fixes</a>.</p>
<div class="cta-box"><strong>Make it now:</strong> draft 5 fields, generate in the <a href="/qr-code-generator">free QR code generator</a>, save-test on two phones. Overview: <a href="/blog/qr-code-generator-guide">pillar guide</a>.</div>
`;

export const qrVcard: BlogPost = {
  pillar: "qr-code-generator-guide",
  slug: "vcard-contact-qr-code",
  kind: "cluster",
  title: "vCard QR Code: Digital Business Card That Saves in 5 Seconds",
  description:
    "vCard QR code guide: fields that import cleanly on iPhone + Android, density control, card/stand sizes + India tips. Free generator included.",
  keywords: [
    "vcard qr code",
    "digital business card qr",
    "contact qr code generator",
    "qr code for business card",
    "save contact qr scan",
  ],
  toolSlugs: ["qr-code-generator", "qr-scanner", "wifi-qr-generator"],
  relatedSlugs: ["how-to-create-qr-code", "qr-code-size-print-guide", "qr-code-for-business"],
  published: "2026-09-22",
  updated: "2026-09-22",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "what-vcard", text: "What a vCard QR holds", level: 2 },
    { id: "make-it", text: "Make yours: fields + density", level: 2 },
    { id: "label-place", text: "Label it and place it", level: 2 },
    { id: "india-context", text: "India: WhatsApp, UPI, two numbers", level: 2 },
  ],
  html,
  faqs: [
    { question: "How do I make a QR code for my contact details?", answer: "Draft name, mobile with country code, email, company and website (~150 chars), generate in the free QR code generator, download 512px PNG, print at 2–2.5 cm on cards and save-test on iPhone and Android." },
    { question: "Do vCard QR codes work on iPhone and Android?", answer: "Yes with standard fields (name, TEL, EMAIL, ORG). Stick to classic labels, avoid exotic extensions, and test-save on both platforms — one mislabeled second number once imported as fax on Android." },
    { question: "How big should a contact QR be on a business card?", answer: "2–2.5 cm minimum since vCards run denser than URL codes. Label it Scan to save contact. For expo stands use 5–8 cm matte." },
    { question: "Should I include a photo in the vCard?", answer: "No — photos bloat the payload past reliable density for small prints. Keep 5–6 text fields; link to your photo via the website field instead." },
    { question: "Can I add UPI ID to my business card QR?", answer: "Keep contact and payment codes separate: vCard for saving details, UPI payee code for collecting money. Two labeled codes beat one overloaded code — see the UPI payment guide." },
  ],
};

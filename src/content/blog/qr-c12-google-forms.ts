import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>A QR code for Google Forms is the fastest way to move a survey from a link someone will never click to a form already open on their phone. The mechanics take a minute: build the form, copy the responder link, generate the code. The part that fails is sharing. A form that looks public in the editor can still ask respondents to sign in, request permission, or refuse responses, and the printed code cannot explain any of that. This guide fixes the permissions before the ink dries.</p>
<p>Part of the <a href="/blog/qr-code-generator-guide">free QR code generator guide</a>.</p>

<h2 id="build-form">Build the form, then copy the responder link</h2>
<p>Create the form and add only the questions you will act on. A form with 15 fields gets abandoned; four questions and an optional comment get finished. Decide whether to collect email addresses, limit responses per person or allow edits after submitting; each choice affects who can open the form.</p>
<p>When the form is ready, click <strong>Send</strong> and choose the link tab. If the dialog offers <strong>Shorten URL</strong>, enable it; a forms.gle/... address produces a sparser pattern than the full docs.google.com/forms/d/e/.../viewform URL. The short version scans more easily when printed small. Do not copy the browser URL while editing: the editor link ends in /edit and opens the design view, not the respondent form.</p>
<ul>
<li><strong>Responder link:</strong> ends in /viewform or uses forms.gle. Encode this one.</li>
<li><strong>Editor link:</strong> ends in /edit. It asks for a login and must never be printed.</li>
<li><strong>Embed code:</strong> HTML for an iframe, not a URL.</li>
<li><strong>Prefilled link:</strong> a long URL with answers filled. Useful, but dense.</li>
</ul>

<h2 id="permissions">Set sharing so anyone with the link can respond</h2>
<p>Open the responder link in a private window while signed out of every Google account. This is the only test that matches what a customer will experience. The form should load and accept an answer without a login prompt. If it asks you to sign in or says you need permission, it is not open to everyone with the link, and a QR code will not fix that.</p>
<p>Forms links are normally open to anyone with the URL, but there are three common exceptions. A Workspace administrator can restrict sharing so only domain accounts respond. A <strong>file upload</strong> question requires sign-in because the file needs an owner. <strong>Limit to 1 response</strong> also requires sign-in so Google can identify each respondent. Turn those off if anonymous answers matter more.</p>
<p>Confirm the form is still accepting responses. A closed form shows a message saying it is no longer accepting responses, which looks like a broken code from the customer’s side. Reopen the existing form for a new round rather than creating a new one, so the printed code keeps working. In Workspace, ask the admin to confirm link sharing is allowed before printing cards.</p>

<h2 id="generate">Turn the link into a QR code</h2>
<p>Paste the responder link into the generator, preview the pattern, and export at the size your placement needs. Google Forms URLs are long, especially the full viewform address, so the pattern is denser than a short menu link. That is the main reason to enable the short link and print larger. A 40-character forms.gle link at 5 cm is comfortable; a 150-character prefilled link at 3 cm is not.</p>
<p>Use black on white, keep the quiet zone clear and choose matte stock. Do not put the code on a glossy poster behind glass or tint it to match a brand palette. Print at the size the room demands: 15–20 cm for an exit poster read from two metres, 5–6 cm for a desk card. The distance tables are in the <a href="/blog/qr-code-generator-guide/qr-code-size-print-guide">QR code size and print guide</a>.</p>

<h2 id="placement">Placement and print sizes</h2>
<p>Put the code where the respondent is already holding a phone and has a reason to answer. An exit poster catches people before they leave; a desk card catches a student before class; a counter card catches a patient at check-in. A code in a newsletter or slide competes with every other link, so print it on the handout too if the room is physical.</p>
<table>
<thead><tr><th>Use case</th><th>Example form</th><th>Print size</th><th>Placement</th></tr></thead>
<tbody>
<tr><td><strong>Event feedback</strong></td><td>Four questions and one comment</td><td>15–20 cm</td><td>Exit poster at 1.5–2 m, with a handout</td></tr>
<tr><td><strong>Classroom exit ticket</strong></td><td>Three quick questions</td><td>5 cm</td><td>Desk card or printed worksheet corner</td></tr>
<tr><td><strong>Clinic intake</strong></td><td>Contact details and history</td><td>8 cm</td><td>Reception counter at 80 cm</td></tr>
<tr><td><strong>Maintenance request</strong></td><td>Location, issue, photo upload</td><td>4–5 cm</td><td>Laminated label on the equipment</td></tr>
<tr><td><strong>Restaurant feedback</strong></td><td>Rating and one comment</td><td>3–4 cm</td><td>Bill folder at 30–40 cm</td></tr>
</tbody>
</table>
<p>Label the code with the action and time cost: “30-second feedback” or “Report a fault.” A bare square is easy to ignore. If the form asks for personal data, say so on the card and link to a privacy notice; the code is a shortcut, not a consent mechanism.</p>

<h2 id="prefilled">Prefilled links and long URLs</h2>
<p>Google Forms can prefill answers through the three-dot menu and <strong>Get pre-filled link</strong>. Fill the fields, click Get link, and copy the result. This is useful for a session, location or cohort without asking the respondent to choose. The values are visible in the URL and can usually be changed, so do not treat them as secure data.</p>
<p>Prefilled URLs are much longer than the plain responder link. A 200-character URL creates a dense pattern that needs a larger print and a better camera. For a table tent, use the plain link and ask the question inside the form. For attribution, a short forms.gle link to a separate form per channel scans more easily. Fewer characters is the cheapest scanability upgrade.</p>

<h2 id="test">Test like a respondent, not an editor</h2>
<p>Scan the printed code with a phone signed out of Google, over mobile data. Confirm four things: the form loads, the questions are readable without zooming, submit works, and the confirmation appears. Then check the Responses tab for the test answer. Delete it if it would distort your data, or use a duplicate form for testing.</p>
<p>Repeat at the real distance and lighting. A poster code that works at arm’s length may fail at two metres; a laminated card may glare under a fluorescent tube. Test an older Android as well as an iPhone, because a long forms.gle URL is the kind of dense pattern budget cameras struggle with. If it will not scan, the <a href="/blog/qr-code-generator-guide/qr-code-not-scanning-fix">not-scanning fixes</a> start with size and contrast.</p>
<p>Re-test after every edit. Changing a question, closing the form or toggling a setting changes what the respondent sees while the printed code stays the same. Write the test date on the back of one card.</p>

<h2 id="worked-examples">Two worked setups</h2>
<p><strong>Example 1 — conference session feedback, Hyderabad.</strong> The organiser builds a five-question form with a session code, two rating scales and a comment box, then leaves email collection off so respondents can answer anonymously. The responder link is shortened to forms.gle, encoded at 2048px and printed at 18 cm on a poster beside the exit, with a 6 cm version on the handout. The poster is tested from two metres in the venue’s afternoon light, and the first test submission is checked in the Responses tab. The form stays open for a week, so late scans still work.</p>
<p><strong>Example 2 — dental clinic intake, Kochi.</strong> A two-chair clinic creates a form for name, contact number, reason for visit and preferred appointment time. Because it does not need file uploads or one-response limits, the link opens without a Google sign-in. The code is printed at 8 cm on a matte counter card at reception, 80 cm from a seated patient, with the line “Complete intake before your appointment.” The receptionist tests it signed out, submits one dummy response, deletes it, and repeats the test whenever the questions change.</p>

<h2 id="track">What you can and cannot track</h2>
<p>Google Forms counts responses, not scans. A static QR code has no analytics, so you cannot tell how many people pointed a camera and walked away. You can see completed responses and arrival times. To compare channels, use a separate form or prefilled field and compare response counts. Do not put a tracking redirect in front of the form unless you accept that service as a dependency for every printed code.</p>
<p>Judge the response count against the room, not a made-up benchmark. If 100 people attended and 12 responded, the problem may be placement, wording or form length. Move the poster closer to the exit, shorten the form, or have the host mention it once. A QR code removes friction; it cannot create motivation.</p>
<div class="cta-box"><strong>Make the code now:</strong> copy your Google Forms responder link, paste it into the <a href="/qr-code-generator">free QR code generator</a>, export 2048px and scan the first print signed out before you distribute it. The code stays static; edit the form, not the print.</div>
`;

export const qrGoogleForms: BlogPost = {
  pillar: "qr-code-generator-guide",
  slug: "qr-code-google-forms",
  kind: "cluster",
  title: "QR Code for Google Forms: Share a Survey Fast",
  description:
    "Create a QR code for Google Forms in minutes. Copy the responder link, fix sharing permissions, size it for print and test it signed out.",
  keywords: ["qr code for google forms", "google forms qr code", "share google form qr code", "google forms qr code generator", "print qr code for survey"],
  toolSlugs: ["qr-code-generator", "qr-scanner"],
  relatedSlugs: ["qr-code-size-print-guide", "qr-code-not-scanning-fix", "qr-code-for-business"],
  published: "2026-10-22",
  updated: "2026-10-22",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "build-form", text: "Build the form and copy the link", level: 2 },
    { id: "permissions", text: "Set sharing for anyone with the link", level: 2 },
    { id: "generate", text: "Turn the link into a QR code", level: 2 },
    { id: "placement", text: "Placement and print sizes", level: 2 },
    { id: "prefilled", text: "Prefilled links and long URLs", level: 2 },
    { id: "test", text: "Test like a respondent", level: 2 },
    { id: "worked-examples", text: "Two worked setups", level: 2 },
    { id: "track", text: "What you can and cannot track", level: 2 },
  ],
  html,
  faqs: [
    { question: "How do I make a QR code for a Google Form?", answer: "Open the form, click Send, choose the link tab and copy the responder link, which ends in viewform or uses forms.gle. Paste that link into the QR generator, choose 2048px for print, download the PNG and test it signed out. Never encode the editor URL that ends in edit." },
    { question: "Why does my Google Forms QR code ask for permission?", answer: "You probably encoded the editor link, or the form is restricted by a Workspace sharing policy, or it uses a file upload or one-response limit that requires sign-in. Copy the responder link from the Send dialog, test it in a private window while signed out, and turn off sign-in-only features if anonymous responses are required." },
    { question: "Do Google Forms QR codes expire when I edit the form?", answer: "No. The code is static and the responder URL stays the same when you edit questions or settings, so the printed code keeps working. The link can break if you delete the form, create a new one, or let a third-party shortener expire. Re-test after edits to confirm the form still accepts responses." },
    { question: "What size should a QR code for a survey be?", answer: "Use 3–4 cm for a bill folder at 30–40 cm, 5–6 cm for a desk card at 40–60 cm, 8 cm for a reception counter at 80 cm, and 15–20 cm for an exit poster at 1.5–2 m. Long forms.gle URLs produce denser patterns, so print one size larger than you would for a short menu link." },
    { question: "Can I track how many people scan the QR code?", answer: "Not with a static code. Google Forms reports completed responses, not scans, and the code carries the link directly with no redirect. Use separate forms or prefilled channel fields to compare response sources. Avoid adding a tracking redirect unless you accept that its shutdown would break every printed code." },
    { question: "Can I use a prefilled Google Forms link in a QR code?", answer: "Yes, but the URL is much longer, which makes the pattern denser and harder to scan at small sizes. Use a prefilled link only when the fixed fields are worth the extra density, print it larger, and remember respondents can often change the prefilled answers. For table tents, use the plain short link and ask the question inside the form." },
  ],
};

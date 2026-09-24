import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>You cleared four interview rounds — then the offer letter arrived with a 3-month probation, 90-day notice period and a variable-pay-heavy CTC nobody mentioned. A friend signed without reading; leaving later cost him the notice-period buyout fight. <strong>Offer letters</strong> deserve the same scrutiny you gave the interviews. Here is what every clause means, the CTC math, and the negotiation lines that work — plus a generator for the other side of the table.</p>
<p>Part of the <a href="/blog/resume-builder-guide">free resume builder guide</a>. Employers: generate clean letters with the <a href="/offer-letter-generator">offer letter generator</a> (role, CTC, joining date, terms, print to PDF locally). I'm not a lawyer; verified Sept 2026 for India private-sector offers and rules change by state and year — have HR or counsel review anything you sign or send.</p>

<h2 id="anatomy">Anatomy of an offer letter: every clause explained</h2>
<ol>
<li><strong>Role, level and reporting:</strong> exact designation (SDE-1 vs SDE-2 changes everything), team, manager. Verbal promises mean nothing — ink only.</li>
<li><strong>CTC breakup:</strong> fixed, variable, joining bonus, ESOPs/RSUs with vesting. A Rs 12 LPA offer at 70% fixed pays Rs 8.4L guaranteed — the headline number is marketing. Demand the table.</li>
<li><strong>Joining date + validity:</strong> offer expiry (usually 7–15 days). Never resign your current job before the written letter — verbal offers evaporate.</li>
<li><strong>Probation:</strong> typically 3–6 months with easier termination. Ask what confirmation criteria are, in writing.</li>
<li><strong>Notice period:</strong> 30–90 days in India; 2–4 weeks US/UK typical. Long notice traps you later — negotiate before signing, not during exit.</li>
<li><strong>Location + work mode:</strong> city, hybrid days, transfer clause. “Work from anywhere” needs ink, not Slack messages.</li>
<li><strong>Bonds and training costs:</strong> service agreements with payout clauses. Legal in India within limits — understand the number before signing, not after.</li>
</ol>

<h2 id="ctc-math">CTC math: read the numbers, not the headline</h2>
<table>
<thead><tr><th>Component</th><th>Example (Rs 12 LPA)</th><th>What to check</th></tr></thead>
<tbody>
<tr><td><strong>Fixed pay</strong></td><td>Rs 8.4L (70%)</td><td>Monthly in-hand driver; higher % = safer</td></tr>
<tr><td><strong>Variable/bonus</strong></td><td>Rs 1.8L (15%)</td><td>Payout history? Company or individual linked?</td></tr>
<tr><td><strong>Joining bonus</strong></td><td>Rs 1L one-time</td><td>Clawback if you leave in year one?</td></tr>
<tr><td><strong>ESOPs/RSUs</strong></td><td>Rs 0.8L paper value</td><td>Vesting schedule? Worth zero if you leave early</td></tr>
</tbody>
</table>
<ul>
<li><strong>Compare fixed-to-fixed</strong> across offers, not headline CTCs. A Rs 10L all-fixed offer beats Rs 12L with 40% variable for most people.</li>
<li><strong>Ask in writing:</strong> variable payout % achieved last 2 years, appraisal cycle dates, first-hike eligibility. HR answers verbally; email confirms.</li>
<li><strong>Freshers:</strong> training-period stipend vs confirmed salary, bond duration and amount. Details pair with <a href="/blog/resume-builder-guide/fresher-resume-guide">fresher tactics</a>.</li>
</ul>

<h2 id="negotiate">Negotiation lines that work (without bluffing)</h2>
<ul>
<li><strong>Anchor on market, not need:</strong> “Similar SDE-1 roles in Bengaluru close at Rs 9–10L fixed; can we meet Rs 9.5L?” — data beats “I expected more”.</li>
<li><strong>Trade, don't just ask:</strong> “I can join in 15 days instead of 30 if we fix the joining bonus.” Give to get.</li>
<li><strong>Negotiate structure first:</strong> move variable to fixed, shorten notice, cut probation — often easier wins than headline bumps.</li>
<li><strong>Get the revised letter:</strong> every agreed change re-issued in writing before you resign. The <a href="/offer-letter-generator">generator</a> shows what a clean revision looks like — all terms, CTC table, signature block.</li>
<li><strong>Experienced hires:</strong> probation waiver and notice buyout terms are negotiable at senior levels — see <a href="/blog/resume-builder-guide/experienced-resume-guide">experienced guide</a>. Not legal advice; run final letters past counsel for CXO contracts.</li>
</ul>
<h2 id="red-flags">Red flags: when to walk away</h2>
<p>Some letters warn you off the job itself. Verbal-only offers with “letter next week” while pressing you to resign — never resign on promises. CTC with no breakup table — the variable share is hiding. Bonds exceeding 2 years for junior roles, or training-cost clauses above Rs 2L without itemization — price your exit before entry. Probation beyond 6 months, termination-at-will buried in appointment terms, non-competes barring your entire industry for a year — each negotiable, each a signal about culture. And the classic: joining date pressure (“sign in 24 hours”) paired with vague variable math. Urgency plus opacity equals a bad deal; good employers answer in writing and wait a week. Walking away from one bad offer beats a year of bond-trapped regret — I have watched both outcomes, and patience won every time. Document questions? Run final CXO paperwork past counsel; this guide is orientation, not legal advice.</p>
<h2 id="campus-offers">Campus offers: PPOs, Day-1 slots and fine print freshers miss</h2>
<p>Campus placements add traps working professionals never meet. <strong>PPOs (pre-placement offers)</strong> from internships often carry lower fixed pay than Day-1 offers for the same role — compare fixed-to-fixed before accepting out of gratitude. <strong>Day-slot pressure:</strong> “sign in 48 hours or lose the slot” is placement-cell mechanics, not employer generosity; ask for the written letter with CTC table before blocking competing processes. Freshers routinely miss: training-period stipend vs confirmed salary (6 months at Rs 25k then Rs 45k changes year-one math), service agreements of 1–2 years with Rs 1–2L payouts (price your exit before entry), and location-flexibility clauses that move you cities later. Rule: no competing offer is worse than a bad signed bond — 48 hours of polite stalling (“awaiting the written CTC table”) beats a year of regret. Pair with <a href="/blog/resume-builder-guide/fresher-resume-guide">fresher resume tactics</a> for the application side.</p>
<div class="cta-box"><strong>Generate or verify now:</strong> employers use the <a href="/offer-letter-generator">offer letter generator</a>; candidates compare fixed-to-fixed and get revisions in writing. System: <a href="/blog/resume-builder-guide">pillar guide</a>.</div>
`;

export const resumeOfferLetter: BlogPost = {
  pillar: "resume-builder-guide",
  slug: "offer-letter-guide",
  kind: "cluster",
  title: "Offer Letter Guide: CTC Math, Clauses & Negotiation (India, 2026)",
  description:
    "Offer letter explained: CTC breakup math, probation, notice, bonds + negotiation lines. For candidates and employers. Free generator included.",
  keywords: [
    "offer letter format",
    "job offer letter with ctc india",
    "ctc breakup explained",
    "offer letter negotiation",
    "probation notice period meaning",
  ],
  toolSlugs: ["offer-letter-generator", "resume-builder", "cover-letter-builder"],
  relatedSlugs: ["experienced-resume-guide", "cover-letter-guide", "how-to-make-resume"],
  published: "2026-09-23",
  updated: "2026-09-23",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "anatomy", text: "Every clause explained", level: 2 },
    { id: "ctc-math", text: "CTC math, not headlines", level: 2 },
    { id: "negotiate", text: "Negotiation lines that work", level: 2 },
    { id: "campus-offers", text: "Campus offers: PPOs + fine print", level: 2 },
    { id: "red-flags", text: "Red flags: walk away", level: 2 },
  ],
  html,
  faqs: [
    { question: "What should an offer letter include?", answer: "Exact role and level, full CTC breakup table, joining date and offer validity, probation terms, notice period, location and work mode, plus any bond clauses — all in writing with a signature block." },
    { question: "How do I read CTC breakup?", answer: "Separate fixed (guaranteed monthly driver) from variable, joining bonus (check clawbacks) and ESOPs (check vesting). Compare fixed-to-fixed across offers, not headline totals." },
    { question: "Can I negotiate an offer letter?", answer: "Yes — anchor on market data, trade concessions like joining speed, negotiate structure (variable-to-fixed, notice length) alongside headlines, and get every change re-issued in writing before resigning." },
    { question: "What notice period is normal in India?", answer: "30–90 days depending on seniority; US/UK typically 2–4 weeks. Negotiate before signing — exit-time negotiation has no leverage." },
    { question: "Should I resign on a verbal offer?", answer: "Never. Verbal offers evaporate with budget freezes and manager changes. Resign only against a signed written letter with the full CTC table." },
  ],
};

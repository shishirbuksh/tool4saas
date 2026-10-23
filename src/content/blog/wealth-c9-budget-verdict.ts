import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>Budget 2026, presented on 1 February 2026, did not change the income-tax slabs for FY 2026-27. For salaried taxpayers, that is the headline: no rate cut, no new slab, no windfall. The new-regime structure remains nil to ₹4 lakh, 5% to ₹8 lakh, 10% to ₹12 lakh, 15% to ₹16 lakh, 20% to ₹20 lakh, 25% to ₹24 lakh, and 30% above ₹24 lakh. The ₹75,000 standard deduction and the 87A rebate remain part of the calculation.</p>
<p>The larger change is legislative. The Income-tax Act, 2025 takes effect on 1 April 2026, replacing the 1961 Act. The substance largely continues; the numbering, rules, and forms are new. That distinction matters when you read a tax article, fill a return, or compare this year's payroll deduction with last year's. This is part of the <a href="/blog/sip-calculator-guide">India wealth and tax guide</a>.</p>

<h2 id="verdict-table">The verdict table: what Budget 2026 kept for FY 2026-27</h2>
<table>
<thead><tr><th>Element</th><th>Status for FY 2026-27</th><th>What it means</th></tr></thead>
<tbody>
<tr><td><strong>New-regime slabs</strong></td><td>Unchanged: nil to ₹4L, 5% to ₹8L, 10% to ₹12L, 15% to ₹16L, 20% to ₹20L, 25% to ₹24L, 30% above ₹24L</td><td>No rate cut; plan on known numbers</td></tr>
<tr><td><strong>Standard deduction</strong></td><td>₹75,000 for salaried new-regime income</td><td>Supports zero tax up to about ₹12.75L gross</td></tr>
<tr><td><strong>87A rebate</strong></td><td>Up to ₹60,000 for taxable income up to ₹12L</td><td>Zero tax at ₹12L taxable; marginal relief just above</td></tr>
<tr><td><strong>Old regime</strong></td><td>Existing slabs, ₹12,500 rebate and ₹50,000 standard deduction retained</td><td>Still available on opting; real deductions decide</td></tr>
<tr><td><strong>Listed-equity LTCG</strong></td><td>12.5% above the ₹1.25L annual exemption under s.112A</td><td>Harvesting discipline still matters</td></tr>
<tr><td><strong>Listed-equity STCG</strong></td><td>20% under s.111A</td><td>Short holding periods cost more</td></tr>
<tr><td><strong>Income-tax Act, 2025</strong></td><td>Effective 1 April 2026</td><td>New numbering and forms; broad structure continues</td></tr>
</tbody>
</table>
<p>The 87A rebate is a rebate, not a slab change. It can reduce tax to zero, but it does not alter the marginal rate that applies once taxable income crosses ₹12 lakh. The familiar “zero tax up to ₹12.75 lakh” figure assumes salary income, the ₹75,000 standard deduction, and no other income or deductions. Add rental income, capital gains, or a second salary and the calculation changes.</p>
<p>Worked example one: a salaried taxpayer with gross salary of ₹12.75 lakh and only the standard deduction has taxable income of ₹12 lakh. Slab tax is ₹60,000—nothing on the first ₹4 lakh, 5% on the next ₹4 lakh, and 10% on the last ₹4 lakh. The 87A rebate of up to ₹60,000 wipes that out, leaving no income tax. Worked example two: at ₹16 lakh gross, taxable income is ₹15.25 lakh. There is no rebate at that level, and the tax works out to about ₹1.13 lakh including the 4% cess, assuming no other deductions.</p>
<p>Capital gains were not changed either. Listed-equity long-term gains are taxed at 12.5% above the ₹1.25 lakh annual exemption under section 112A, while listed-equity short-term gains are taxed at 20% under section 111A. Other-asset long-term gains are generally taxed at 12.5% without indexation, with grandfathering available for eligible land or buildings acquired before 23 July 2024. Those are broad statements; the asset type, holding period, and acquisition date decide the actual treatment. Use the <a href="/capital-gains-tax-india">capital gains tax calculator</a> for a simplified estimate.</p>
<p>Other Budget 2026 announcements worth noting: STT on futures rises from 0.02% to 0.05%; options premium STT from 0.1% to 0.15%, and exercise STT from 0.125% to 0.15%; buyback proceeds are taxed as capital gains for shareholders, with an additional levy on promoters; TCS on LRS remittances above the applicable threshold is 2% for education and medical purposes and 20% for other purposes; overseas tour packages face 2% TCS; TDS on manpower services is set at 1% or 2%; the revised-return window extends to 31 March with a fee; and MAT is 14% as a final tax for companies. These are Budget proposals and announcements, not all of which affect salaried employees. Verify the Finance Act text and notified rules before acting.</p>

<h2 id="bands">What the unchanged slabs mean by income band</h2>
<p><strong>Under ₹12.75 lakh gross.</strong> A salaried taxpayer with only the standard deduction is effectively outside income tax under the new regime. That does not mean every deduction disappears: professional tax, employee PF, and other payroll items still reduce take-home pay. The practical move is to direct the cash flow toward an emergency fund and long-term investments rather than buying a tax-saving product you do not need. The <a href="/blog/sip-calculator-guide/sip-1-crore-goal">₹1 crore SIP math</a> is a better use of the planning energy than a last-minute 80C purchase.</p>
<p><strong>₹12.75 lakh to ₹20 lakh.</strong> This is where the slab climb becomes visible. At ₹16 lakh gross, the new-regime tax is about ₹1.13 lakh including cess, as the example above shows. The old regime can compete only if actual HRA, 80C, 80D, and home-loan interest claims are large enough to overcome its higher slab rates. A deduction you would not otherwise use is not a reason to buy a product. Model both regimes with your real numbers in the <a href="/in-hand-salary-india">in-hand salary calculator</a>, which estimates CTC-to-take-home under the new regime. It is not a full filing calculator.</p>
<p><strong>Above ₹20 lakh.</strong> The 25% and 30% slabs do most of the work. Old-regime deductions can still matter, especially for someone with a large home loan, substantial HRA, or a family health premium. The answer depends on the size and legitimacy of those claims, not on a generic “old is better” or “new is better” rule. Compare the final tax, not just the taxable income.</p>
<p><strong>Capital income.</strong> Holding-period discipline remains valuable. A ₹2 lakh listed-equity LTCG with no prior exemption used leaves ₹75,000 taxable at 12.5%, or about ₹9,750 including cess. The same ₹2 lakh treated as STCG is taxed at 20%, or about ₹41,600 including cess. These simplified figures exclude surcharge and special cases, but they show why the holding period matters. The sibling note on <a href="/blog/sip-calculator-guide/equity-ltcg-vs-fd-tax">equity LTCG versus FD tax</a> compares the post-tax outcomes.</p>

<h2 id="actions">The practical verdict and the actions that follow</h2>
<p>The verdict for salaried savers is unglamorous: no windfall from the slabs, and no reason to overhaul a sensible plan. The useful actions are about using the rules you already have, not chasing a headline.</p>
<ol>
<li><strong>Do not budget for a tax cut.</strong> Recalculate your payroll TDS with the current slabs rather than last year's rumour. If your salary and declarations are unchanged, your tax should be broadly unchanged.</li>
<li><strong>Use the new regime as the default when deductions are low.</strong> Compare the old regime only with real HRA, 80C, 80D, and home-loan claims. A hypothetical deduction is not a saving. The <a href="/blog/sip-calculator-guide/old-vs-new-regime-2026">old versus new regime guide</a> covers the crossover logic.</li>
<li><strong>Treat the payroll regime choice as a withholding decision.</strong> It affects TDS during the year, but salaried taxpayers without business income can generally change the regime when filing the return. The final return reconciles the difference. Confirm the current rule before relying on it.</li>
<li><strong>Do not buy a tax product just to save tax.</strong> ELSS, insurance-cum-investment plans, and PPF should fit the goal first. In the new regime, 80C usually does not apply, so a product bought only for the deduction can leave you with a poor fit and a locked-in commitment. Check the <a href="/blog/sip-calculator-guide/ppf-extend-15-years">PPF extension choices</a> before locking money for another block.</li>
<li><strong>Keep capital-gains harvesting disciplined.</strong> Use the ₹1.25 lakh annual equity LTCG exemption where it fits your plan, track holding periods, and avoid bunching sales into March. Harvesting above the exemption triggers tax, so it is not a free exercise.</li>
</ol>
<p>The Income-tax Act, 2025 adds a transition cost: new section numbers, new forms, and rules that may be notified after the Act takes effect. Do not assume an old section number still applies. When a payroll portal or a tax article cites a section, check it against the current Act and the latest departmental guidance. The broad structure is familiar, but the labels are not.</p>
<p><strong>Official sources:</strong> <a href="https://www.incometax.gov.in">Income Tax Department</a> and <a href="https://www.pib.gov.in">Press Information Bureau</a>. Budget announcements take effect through the Finance Act and notified rules; verify the final text before filing. The in-hand salary calculator linked above is an estimate, not a filing tool, and the capital gains calculator is simplified.</p>
<blockquote class="tip">Educational information only, not tax or financial advice. Slabs, rebates and capital-gains rules can change; confirm your position with the current law and a qualified professional. See /terms.</blockquote>
`;

export const wealthBudgetVerdict: BlogPost = {
  pillar: "sip-calculator-guide",
  slug: "budget-2026-verdict-salaried",
  kind: "cluster",
  title: "Budget 2026 Verdict: What Changed for Salaried Savers",
  description:
    "Budget 2026 left FY 2026-27 slabs unchanged. What the new tax Act, capital gains rules and TCS changes mean for salaried savers.",
  keywords: ["budget 2026 salaried verdict", "fy 2026-27 new regime slabs", "income tax act 2025 april 2026", "equity ltcg 12.5 stcg 20", "budget 2026 tcs stt changes", "12.75 lakh zero tax salaried"],
  toolSlugs: ["in-hand-salary-india", "capital-gains-tax-india", "sip-calculator"],
  relatedSlugs: ["old-vs-new-regime-2026", "equity-ltcg-vs-fd-tax", "sip-1-crore-goal"],
  published: "2026-10-07",
  updated: "2026-10-22",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "verdict-table", text: "Verdict table", level: 2 },
    { id: "bands", text: "Impact by income band", level: 2 },
    { id: "actions", text: "Practical verdict and actions", level: 2 },
  ],
  html,
  faqs: [
    { question: "Did Budget 2026 change income-tax slabs?", answer: "No. The old and new regime slabs for FY 2026-27 remain unchanged. New-regime rates stay at nil to ₹4 lakh, 5% to ₹8 lakh, 10% to ₹12 lakh, 15% to ₹16 lakh, 20% to ₹20 lakh, 25% to ₹24 lakh, and 30% above ₹24 lakh. The ₹75,000 standard deduction and the 87A rebate also remain, so a salaried taxpayer with only that deduction can still reach zero tax at about ₹12.75 lakh gross." },
    { question: "What is the Income-tax Act, 2025?", answer: "It is the law that replaces the Income-tax Act, 1961 and takes effect on 1 April 2026. The broad tax structure continues, but section numbers, rules, and forms change. Treat it as a numbering and process transition rather than a rate cut. Check current departmental guidance before citing a section or filling a new form." },
    { question: "Did capital-gains tax rates change?", answer: "The main listed-equity rates were unchanged. LTCG is 12.5% above the ₹1.25 lakh annual exemption under section 112A, and STCG is 20% under section 111A. Other-asset LTCG is generally 12.5% without indexation, with grandfathering for eligible land or buildings acquired before 23 July 2024. Asset type and holding period still decide the actual treatment." },
    { question: "Should a salaried taxpayer choose the old regime?", answer: "Only if the real deductions make it cheaper. Compare the final tax under both regimes using actual HRA, 80C, 80D, and home-loan interest claims. A deduction you would not otherwise use is not a reason to buy a product. With low deductions, the new regime is usually the simpler default, but the answer depends on your numbers." },
    { question: "Can I change the regime after telling payroll?", answer: "Salaried taxpayers without business income can generally change the regime when filing the return, even if a different option was declared to the employer for TDS. The payroll choice affects withholding during the year; the return reconciles the final liability. Confirm the current rule and any exceptions before relying on this." },
    { question: "What should salaried savers do after Budget 2026?", answer: "Do not budget for a tax cut. Recalculate TDS, use the new regime as the default when deductions are low, compare the old regime only with real claims, and avoid buying tax products for the deduction alone. Keep equity LTCG harvesting within the ₹1.25 lakh annual exemption and track holding periods. Verify the Finance Act and notified rules." },
  ],
};

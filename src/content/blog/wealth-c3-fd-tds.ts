import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>An Indian bank fixed deposit quotation usually leads with the card rate: 7% for five years, perhaps a little more for senior citizens. The maturity value depends on how often interest is compounded, whether interest is paid out or reinvested, and how much tax is deducted along the way. A 7% cumulative FD with quarterly rests matures at an effective yield near 7.19%, before TDS. A non-cumulative version of the same deposit pays interest out and never compounds. This guide explains the mechanics in general terms, with formulas and worked examples, and flags the tax questions to confirm with a professional.</p>
<p>This is part of the <a href="/blog/sip-calculator-guide">India wealth and tax guide</a>. Model maturity in the <a href="/fd-calculator">FD calculator</a>, compare compounding in the <a href="/compound-interest-calculator">compound interest calculator</a>, and contrast deposits with market investments in the <a href="/sip-calculator">SIP calculator</a>.</p>

<h2 id="how-fd-interest-works">How Indian bank FD interest is calculated</h2>
<p>Most Indian bank term deposits use quarterly compounding for cumulative deposits. The standard formula is <strong>A = P × (1 + r/400)^(4 × t)</strong>, where P is principal, r is the nominal annual rate in percent, and t is tenure in years. The 400 comes from dividing the annual percentage rate by four quarterly rests and converting it to a decimal.</p>
<p>Worked example: ₹5,00,000 at 7% for five years. A = 5,00,000 × (1 + 7/400)^(4 × 5) = 5,00,000 × (1.0175)^20 = ₹7,07,389.10. Interest is ₹2,07,389.10. The effective annual yield is (1.0175)^4 − 1 = 7.1859%, which is why the product is often described as roughly 7.19%.</p>
<p>The gap between 7% nominal and 7.19% effective is the compounding effect. It is not a bonus rate. It is the same 7% applied four times a year to a growing balance. Each quarter's interest joins the principal and earns interest in later quarters.</p>
<p>Banks may use different conventions for different products. Some pay simple interest on non-cumulative deposits, some compound monthly, and some use a 365-day calculation. The sanction letter or term deposit advice should state the method. If it does not, ask for the maturity amount in writing before booking.</p>

<h2 id="cumulative-vs-non-cumulative">Cumulative vs non-cumulative FDs</h2>
<p>In a cumulative FD, interest is added to principal and paid at maturity. In a non-cumulative FD, interest is credited to your account at a chosen interval, usually monthly, quarterly, half-yearly, or annually. The headline rate can be identical while the outcomes differ substantially.</p>
<p>Worked example: the same ₹5,00,000 at 7% for five years, paid quarterly. Each quarter pays 5,00,000 × 0.07 ÷ 4 = ₹8,750. Annual interest is ₹35,000, and five years of payouts total ₹1,75,000. The cumulative deposit from the previous section earns ₹2,07,389.10 over the same period. The difference is ₹32,389.10, entirely due to reinvestment.</p>
<table>
<thead><tr><th>Feature</th><th>Cumulative FD</th><th>Non-cumulative FD</th></tr></thead>
<tbody>
<tr><td><strong>Interest credit</strong></td><td>Added to principal, paid at maturity</td><td>Paid to your account periodically</td></tr>
<tr><td><strong>Compounding</strong></td><td>Yes, usually quarterly</td><td>No, payout leaves the deposit</td></tr>
<tr><td><strong>TDS timing</strong></td><td>May be deducted as interest accrues</td><td>Deducted when interest is credited</td></tr>
<tr><td><strong>Liquidity</strong></td><td>Lower until maturity</td><td>Higher through regular payouts</td></tr>
<tr><td><strong>Best suited to</strong></td><td>Long-term growth and known future costs</td><td>Regular income needs</td></tr>
</tbody>
</table>

<h2 id="tds-mechanics">How 10% TDS on FD interest works</h2>
<p>Banks deduct tax at source on interest paid or credited above the threshold prescribed for a financial year. For resident depositors with PAN on record, the general rate is 10%. The threshold is not the same as the taxable income limit, and it is revised from time to time. Do not rely on a figure from an old article; confirm the current limit with your bank or the Income Tax Department.</p>
<p>TDS applies to interest, not principal. If a cumulative FD earns ₹2,07,389 over five years, the bank may deduct TDS as interest accrues each year even though you receive nothing until maturity. That can reduce the amount reinvested unless you add cash to cover the tax.</p>
<p>Interest is tracked per depositor and per bank, not per branch or per deposit in the way many people assume. Multiple FDs in the same bank can aggregate. Deposits across different banks are generally tracked separately, but you must still report all interest in your return. Joint accounts and nominations can complicate the mapping, so check how the bank records the deposit.</p>
<p>TDS is a prepayment of tax, not a final tax. If your total income is below the taxable limit, you can claim a refund by filing a return. If your slab rate is higher than 10%, you may owe more. If it is lower, you may be due a refund. Provide PAN; without it, the bank may deduct at a higher rate and you may lose the benefit of the lower deduction.</p>

<h2 id="form-15g-15h">Form 15G and 15H: what they do and when they fail</h2>
<p>Form 15G is a declaration by a resident non-senior that estimated total income is below the taxable limit and that no tax is liable to be deducted. Form 15H is the equivalent for resident senior citizens. Submitting the correct form can stop TDS on FD interest for that financial year.</p>
<p>Caveats matter. The declaration is generally valid for one financial year and must be renewed. It is for individuals and certain other eligible persons, not companies or firms. It does not apply to non-residents. If your income later exceeds the taxable limit, the declaration may become incorrect.</p>
<p>A false declaration can attract penalties and interest. The bank may also reject a form that is incomplete or filed after interest has been credited. Keep proof of submission. Even with a valid form, you must report the interest in your income tax return if your income requires filing.</p>
<p>If you have multiple banks, submit the form at each bank. If you are a senior citizen, confirm whether the bank applies Form 15H automatically or requires a fresh form each year. Eligibility depends on your total income, not just the interest from one deposit.</p>

<h2 id="threshold-caveat">Why you should not quote an old TDS threshold</h2>
<p>Tax thresholds are revised by law. An article written years ago may quote a limit that no longer applies. The same risk applies to senior-citizen thresholds, which can differ from the general limit. Using an outdated number can lead to either unnecessary TDS or an unwelcome tax bill.</p>
<p>The safe approach is to check the current threshold in the Income Tax Act, the department's website, or your bank's latest communication. Ask the bank how much interest it has credited or accrued for the financial year, and how much TDS it has deducted. Reconcile that with Form 26AS or the Annual Information Statement before filing.</p>
<p>Thresholds also interact with the type of deposit, the depositor's age, and whether PAN is available. A single number cannot answer every case. Rules and administrative practice change; a tax professional can apply the current version to your facts.</p>
<blockquote class="tip">This is general information, not tax advice; confirm current rules with a tax professional before acting.</blockquote>

<h2 id="fd-strategy">Using FDs without losing the compounding advantage</h2>
<p>Match the payout structure to the goal. Cumulative FDs suit money that will not be touched for the full tenure: an emergency buffer beyond the immediate reserve, a tax payment, a down payment, or a known expense. Non-cumulative FDs suit retirees or anyone who needs regular income. The trade-off is the lost compounding shown in the worked example.</p>
<p>Ladder maturities across 1, 2, 3, and 5 years so a single emergency does not break the longest deposit. Check the premature-withdrawal penalty before booking. Some banks reprice the entire deposit to the rate for the completed tenure, which can be far below the original card rate.</p>
<p>Compare post-tax effective yield, not the headline. Tax at your slab rate can cut the post-tax return well below the advertised number. A tax-free instrument with a lower headline rate may win on a like-for-like horizon. The <a href="/blog/sip-calculator-guide/equity-ltcg-vs-fd-tax">equity LTCG vs FD tax</a> guide covers the long-term comparison, and <a href="/blog/sip-calculator-guide/real-return-inflation">real vs nominal returns</a> adjusts for inflation.</p>
<p>Use the <a href="/fd-calculator">FD calculator</a> for maturity, the <a href="/compound-interest-calculator">compound interest calculator</a> for frequency comparisons, and the <a href="/sip-calculator">SIP calculator</a> for long-horizon alternatives. The <a href="/blog/sip-calculator-guide/ppf-extend-15-years">PPF extension guide</a> is a useful contrast for tax-free compounding, while <a href="/blog/sip-calculator-guide/lumpsum-compounding-frequency">lump sum compounding frequency</a> explains rests in more detail.</p>
<div class="cta-box"><strong>Run the numbers:</strong> open the <a href="/fd-calculator">FD calculator</a> to see quarterly-compounded maturity, then compare the same principal in the <a href="/compound-interest-calculator">compound interest calculator</a> under different frequencies. If you are deciding between deposits and monthly investing, use the <a href="/sip-calculator">SIP calculator</a> and read the <a href="/blog/sip-calculator-guide">full wealth guide</a>.</div>
<blockquote class="tip">Bank terms, rates, and tax thresholds change. Verify the current terms before booking. See /terms.</blockquote>
`;

export const fdTds: BlogPost = {
  pillar: "sip-calculator-guide",
  slug: "fd-quarterly-tds",
  kind: "cluster",
  title: "FD Interest, TDS and Quarterly Compounding (2026)",
  description:
    "Understand Indian bank FD interest, quarterly compounding, 10% TDS, Form 15G/15H caveats, and cumulative vs non-cumulative payouts with worked examples.",
  keywords: ["fd interest tds india", "fd quarterly compounding", "form 15g 15h fd interest", "cumulative vs non cumulative fd", "fd tds threshold"],
  toolSlugs: ["fd-calculator", "compound-interest-calculator", "income-tax-calculator"],
  relatedSlugs: ["lumpsum-compounding-frequency", "sip-5000-10-years", "old-vs-new-regime-2026"],
  published: "2026-10-07",
  updated: "2026-10-22",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "how-fd-interest-works", text: "How FD interest is calculated", level: 2 },
    { id: "cumulative-vs-non-cumulative", text: "Cumulative vs non-cumulative", level: 2 },
    { id: "tds-mechanics", text: "How 10% TDS works", level: 2 },
    { id: "form-15g-15h", text: "Form 15G and 15H caveats", level: 2 },
    { id: "threshold-caveat", text: "Old thresholds and current rules", level: 2 },
    { id: "fd-strategy", text: "Using FDs well", level: 2 },
  ],
  html,
  faqs: [
    { question: "How is FD interest compounded in Indian banks?", answer: "Most cumulative bank FDs compound quarterly using A = P × (1 + r/400)^(4 × t), where r is the annual rate in percent and t is years. At 7% for five years, ₹5,00,000 matures near ₹7,07,389.10. Effective yield is about 7.1859%. Confirm the method in your sanction letter, because products can differ." },
    { question: "When is TDS deducted on FD interest?", answer: "Banks deduct TDS when interest credited or accrued in a financial year crosses the applicable threshold. For resident depositors with PAN, the general rate is 10%. The threshold is revised from time to time, so check the current limit with your bank or the Income Tax Department rather than relying on an old article." },
    { question: "Can Form 15G or 15H stop TDS on my FD?", answer: "Yes, if you are an eligible resident and your estimated total income is below the taxable limit. Form 15G is for non-seniors and Form 15H for senior citizens. The declaration is generally renewed each year and must be filed at each bank. A false declaration can attract penalties, so confirm eligibility first." },
    { question: "Is TDS the final tax on FD interest?", answer: "No. TDS is a prepayment of tax. Interest is added to your total income and taxed at your slab rate. If TDS exceeds your actual liability, you can claim a refund by filing a return. If your slab rate is higher than 10%, you may owe more. PAN helps avoid a higher deduction rate." },
    { question: "Cumulative or non-cumulative FD?", answer: "Choose cumulative if you do not need the interest as income and want compounding. Choose non-cumulative if you need regular payouts. On ₹5,00,000 at 7% for five years, cumulative interest is about ₹2,07,389 while quarterly payouts total ₹1,75,000. The ₹32,389 difference is the value of reinvestment." },
    { question: "How should I compare FD returns after tax?", answer: "Compare effective annual yield after tax, not the headline rate. Confirm the compounding frequency, payout option, tenure, and premature-withdrawal penalty. Then apply your slab rate to the interest. A higher nominal FD can lose to a lower-rate tax-free option over the same horizon. Use the FD calculator for maturity and a tax professional for your liability." },
  ],
};

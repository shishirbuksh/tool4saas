import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>₹50,000 lump sum, 8%, 10 years. Monthly rests: ₹1,07,946. Yearly rests: ₹1,10,982. Same money, same rate, same decade — <strong>₹3,036 conjured by compounding frequency alone</strong>. Banks print the frequency in sanction letters hardly anyone reads, then pay accordingly. This guide explains rests, compares monthly vs quarterly vs yearly with worked figures, and shows payout-vs-cumulative choices that change effective yield.</p>
<p>Part of the <a href="/blog/sip-calculator-guide">India wealth &amp; tax guide</a>. Test frequencies in the <a href="/compound-interest-calculator">compound interest calculator</a>; contrast with monthly SIPs in <a href="/blog/sip-calculator-guide/sip-5000-10-years">SIP growth</a>.</p>

<h2 id="rests">Rests explained: A=P×(1+r/f)^(f×t)</h2>
<p>Frequency f divides the annual rate into smaller, more frequent credits: f=12 monthly, 4 quarterly, 2 half-yearly, 1 yearly. More rests = interest earning interest sooner. The formula's quiet power: doubling frequency from yearly to half-yearly gains more than doubling again to quarterly — diminishing returns, so don't overpay for daily rests that add basis points. What matters is knowing your product's f: FDs typically quarterly, savings accounts quarterly-or-monthly, PPF yearly (April balance rule!).</p>

<h2 id="worked">Worked: ₹50,000 at 8% for 10 years</h2>
<table>
<thead><tr><th>Rest</th><th>Maturity</th><th>vs yearly</th></tr></thead>
<tbody>
<tr><td><strong>Yearly</strong></td><td>₹1,07,946</td><td>—</td></tr>
<tr><td><strong>Half-yearly</strong></td><td>₹1,09,556</td><td>+₹1,610</td></tr>
<tr><td><strong>Quarterly</strong></td><td>₹1,10,402</td><td>+₹2,456</td></tr>
<tr><td><strong>Monthly</strong></td><td>₹1,10,982</td><td>+₹3,036</td></tr>
</tbody>
</table>
<p>Reproduce every row with the frequency switcher, then test your own principal. Note the pattern for negotiations: asking a lender for monthly rests on deposits (or yearly rests on loans — the mirror image favors borrowers) is free money via arithmetic.</p>

<h2 id="payout-cumulative">Payout vs cumulative: the same rate, different cash</h2>
<p>Cumulative FDs reinvest quarterly interest (the table above); payout FDs credit it to your account (monthly/quarterly income, no compounding). A 7% cumulative FD yields ~7.19% effective; the payout twin yields exactly 7% as cash flow. Retirees needing income choose payout; accumulators choose cumulative — mixing them up silently forfeits a fifth of a percent yearly. Sanction letters define rests explicitly; the word “cumulative” without a rest frequency deserves one pointed question before signing (see <a href="/blog/sip-calculator-guide/fd-quarterly-tds">FD mechanics</a>).</p>
<blockquote class="tip">Informational purposes only — not financial advice. Verify rest definitions in your sanction letter; product variants differ. See /terms.</blockquote>
`;

export const lumpSumFreq: BlogPost = {
  pillar: "sip-calculator-guide",
  slug: "lumpsum-compounding-frequency",
  kind: "cluster",
  title: "Lump Sum Compounding: Monthly vs Yearly Rests",
  description:
    "Compounding frequency with ₹50,000 worked table: monthly beats yearly by ₹3,036, rest formula + payout vs cumulative rules. Free calculator.",
  keywords: [
    "lump sum vs sip compounding frequency explained",
    "monthly vs yearly rests extra 2084",
    "50000 at 8 percent 10 years maturity",
    "daily quarterly compounding difference",
    "payout vs cumulative",
    "Does compounding frequency really matter?",
  ],
  toolSlugs: ["compound-interest-calculator", "fd-calculator", "sip-calculator"],
  relatedSlugs: ["sip-5000-10-years", "fd-quarterly-tds", "real-return-inflation"],
  published: "2026-10-07",
  updated: "2026-10-07",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "rests", text: "Rest formula", level: 2 },
    { id: "worked", text: "₹50,000 worked table", level: 2 },
    { id: "payout-cumulative", text: "Payout vs cumulative", level: 2 },
  ],
  html,
  faqs: [
    { question: "Does compounding frequency really matter?", answer: "Yes, 50,000 at 8 percent for 10 years yields 1,07,946 with yearly rests versus 1,10,982 with monthly rests, or 3,036 from frequency alone. Frequency divides the rate into frequent credits through A equals P times one plus r over f to the f times t. Reproduce rows with the frequency switcher, then test your principal." },
    { question: "What are quarterly rests in FDs?", answer: "Quarterly rests credit interest four times yearly, with each credit compounding afterward so interest earns interest sooner. A 7 percent cumulative FD therefore yields about 7.19 percent effective, while payout variants pay exactly 7 percent as cash flow. Most Indian FDs compound quarterly, so confirm cumulative versus payout and the rest in the sanction letter." },
    { question: "Payout or cumulative FD?", answer: "Choose payout FDs for income needs because interest credits to your account as monthly or quarterly cash flow without compounding. Choose cumulative FDs for growth because quarterly interest reinvests under the table above. Mixing them up silently forfeits about 0.2 percent yearly, so retirees needing income and accumulators building wealth should pick deliberately." },
    { question: "How do I compare two frequencies?", answer: "Use the frequency switcher on identical principal, rate and tenure to isolate frequency, such as 50,000 at 8 percent for 10 years across yearly, half-yearly, quarterly and monthly. Expect diminishing returns because doubling from yearly to half-yearly gains more than doubling again to quarterly. Do not overpay for daily rests that add only basis points." },
    { question: "Where is my product's frequency defined?", answer: "Your product frequency is defined explicitly in the sanction letter or product sheet, which states rests like monthly, quarterly or yearly. FDs are typically quarterly, savings quarterly or monthly, and PPF yearly under the April balance rule. If wording says cumulative without a rest frequency, ask one pointed question before signing." },
  ],
};

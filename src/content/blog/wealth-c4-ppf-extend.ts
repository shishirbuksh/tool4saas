import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>At the end of 15 years, a Public Provident Fund account funded with ₹1.5 lakh every year at 7.1% is worth about ₹40.68 lakh. You contributed ₹22.5 lakh; the rest, about ₹18.18 lakh, is interest. Those figures assume annual compounding and deposits at the start of each year, and they sit before any tax or withdrawal. The harder question is what to do next: close the account, extend it in five-year blocks with fresh money, or extend it without fresh deposits.</p>
<p>The three paths have different liquidity, contribution, and tax consequences. Use the <a href="/ppf-calculator">PPF calculator</a> to reproduce the base case, and confirm the current process with your bank or post office before acting. This is part of the <a href="/blog/sip-calculator-guide">India wealth and tax guide</a>.</p>

<h2 id="fifteen-math">15 years at 7.1%: ₹1.5 lakh a year becomes about ₹40.68 lakh</h2>
<p>The annual-compounding formula is <strong>FV = D × [((1 + r)^n − 1) ÷ r] × (1 + r)</strong>, where D is the yearly deposit, r is the annual rate as a decimal, and n is the term in years. With D = ₹1,50,000, r = 0.071, and n = 15, the full multiplier is 27.1214, so the maturity is ₹40,68,209. The final (1 + r) factor reflects a deposit at the start of each year.</p>
<p>The 7.1% input is the Q2 FY2026-27 notified PPF rate, and the calculator sets it as an editable default. The Finance Ministry reviews small-savings rates every quarter, so a 15-year or 30-year projection at one constant rate is an illustration, not a lock-in. The calculator accepts yearly deposits from ₹500 to ₹1,50,000 and terms from 15 to 50 years in five-year blocks. It compounds annually, assumes the deposit is made at the start of the year, and shows maturity, total invested, interest, and a year-wise schedule.</p>
<p>Worked example one: ₹1.5 lakh a year for 15 years invests ₹22.5 lakh and matures near ₹40.68 lakh. Interest is about ₹18.18 lakh, or roughly 44.7% of the final balance. Worked example two: keep the same ₹1.5 lakh annual deposit for 30 years—the original term and three further five-year blocks—and the maturity is about ₹1.55 crore on ₹45 lakh invested, with interest near ₹1.10 crore. The second 15 years add far more interest than the first because the opening balance is larger. A single five-year extension with fresh deposits reaches about ₹66.58 lakh at year 20 on ₹30 lakh invested, which shows how quickly the later blocks build on the earlier balance.</p>
<table>
<thead><tr><th>Path</th><th>Total invested</th><th>Maturity ≈</th><th>Interest ≈</th></tr></thead>
<tbody>
<tr><td><strong>15 years, ₹1.5L a year</strong></td><td>₹22.5L</td><td>₹40.68L</td><td>₹18.18L</td></tr>
<tr><td><strong>30 years, ₹1.5L a year</strong></td><td>₹45.0L</td><td>₹1.55Cr</td><td>₹1.10Cr</td></tr>
<tr><td><strong>15 years, then 15 years with no fresh deposits</strong></td><td>₹22.5L</td><td>₹1.14Cr</td><td>₹91.33L</td></tr>
</tbody>
</table>
<p>The third row is manual illustrative math, not a calculator mode. It assumes the ₹40.68 lakh balance at year 15 simply compounds at 7.1% for another 15 years, with no new deposits and no withdrawals. The result is about ₹1.14 crore. All three rows assume a constant 7.1% rate for the entire period, which is unlikely; the actual rate will reset each quarter.</p>

<h2 id="extend-withdraw">Extend, withdraw or close: the three maturity choices</h2>
<p><strong>Close and withdraw.</strong> At the end of the original 15-year term you can take the full balance and close the account. That ends further PPF interest and moves the money into whatever you choose next. It makes sense if you need the capital, if the account no longer fits your goals, or if a different post-tax option is clearly better for the next stage.</p>
<p><strong>Extend in five-year blocks with fresh contributions.</strong> You can continue the account for another five years and keep depositing within the annual ₹500 to ₹1,50,000 cap. At the end of each block you decide again. This suits an ongoing 80C need or a long tax-free compounding goal. The commitment is not permanent, but it is a series of five-year decisions rather than a fully liquid account.</p>
<p><strong>Extend without fresh contributions.</strong> The existing balance can continue to earn PPF interest without new deposits. No fresh contribution is allowed after maturity unless you elect the extension with subscription route. This path suits someone who has stopped contributing but wants the tax-free compounding tail. The PPF calculator does not model this no-contribution extension; the ₹1.14 crore row above is a separate calculation.</p>
<p>The operational details vary by bank and post office, and forms and portal steps change. Confirm the current process with your provider rather than relying on a form number from an article. Ask three questions: what is the last date to elect extension, can the election be made online, and what happens if no election is filed? The answers determine whether your intended path is actually available.</p>
<p>Partial withdrawals and loans are separate features. They are generally available only subject to eligibility conditions and current rules, and they interact with the account's term and balance. The calculator does not model either. If liquidity is a real possibility, keep an emergency fund outside PPF rather than assuming you can access the corpus whenever you want. The headline lock-in is 15 years, and an extension adds another five-year block each time.</p>
<p>The decision is easier if you separate the money into roles. Cash needed within five years does not belong in an extension block. Money that is part of a long-term debt allocation can stay if the rate and tax treatment remain competitive. Write down the role before choosing the route, then check whether the PPF balance is still the best home for that role. The calculator can compare rates and terms, but it cannot tell you which role the money should serve.</p>

<h2 id="eee-frame">EEE versus taxable FD interest, and the liquidity price</h2>
<p>PPF is often described as EEE: the contribution can qualify for an 80C deduction subject to the regime and the overall limit, while interest and maturity are tax-free under current rules. The 80C benefit is available in the old regime, not generally in the new regime. The tax-free interest and maturity apply to the account itself, but future law can change. The deduction is also capped, and it shares the ₹1.5 lakh 80C ceiling with other eligible products.</p>
<p>A fixed deposit does not get that treatment. FD interest is taxable at your slab rate, and TDS can apply once annual interest crosses the threshold. If you pay tax on the interest each year, the amount left to compound is smaller. At a 30% slab, a 7.1% FD has a rough post-tax compounding rate near 4.97%; at a 20% slab it is near 5.68%. These are approximations before cess and surcharge, but the direction is clear.</p>
<p>Worked example: ₹1.5 lakh a year for 15 years at a post-tax compounding rate of about 4.97% grows to roughly ₹33.9 lakh. That is a 7.1% FD taxed at 30%. The same contributions in PPF at 7.1% tax-free grow to about ₹40.68 lakh. At a 20% slab the FD figure is closer to ₹36 lakh. The gap is meaningful, but it is not a universal verdict. A higher FD rate, a lower tax slab, or a need for liquidity can change the ranking.</p>
<p>The comparison also depends on how the FD interest is taxed. If tax is paid from outside cash, the FD balance compounds on the full amount, but the tax bill still reduces your overall wealth. If tax is paid from the interest, the reinvested amount is smaller. Either way, the PPF's tax-free compounding is the feature being compared, not just the headline rate.</p>
<p>PPF is not always better. Its rate resets quarterly, its money is locked for 15 years and any extension block, and partial access is restricted. An FD can be broken, usually with a penalty, and it may pay a higher headline rate. The useful comparison is post-tax return after liquidity needs, not the advertised rate. For the FD side, see the <a href="/fd-calculator">FD calculator</a> and the note on <a href="/blog/sip-calculator-guide/fd-quarterly-tds">FD quarterly compounding and TDS</a>.</p>
<p>Before extending, check the current rate, your tax regime, and the role this money plays in your plan. The <a href="/blog/sip-calculator-guide/old-vs-new-regime-2026">old versus new regime guide</a> explains why an 80C deduction may be worth little in the new regime. If the PPF is part of a long-term debt allocation, extension can make sense. If it is your only liquid reserve, it probably should not be. The <a href="/blog/sip-calculator-guide/sip-5000-10-years">SIP growth example</a> shows the alternative for money that can tolerate market risk.</p>
<blockquote class="tip">Educational information only, not financial or tax advice. PPF rates, rules and tax treatment can change; verify the current scheme notification and confirm the extension process with your provider. See /terms.</blockquote>
`;

export const ppfExtend: BlogPost = {
  pillar: "sip-calculator-guide",
  slug: "ppf-extend-15-years",
  kind: "cluster",
  title: "PPF After 15 Years: Extend, Withdraw or Close",
  description:
    "PPF at 15 years and beyond: the ₹40.68 lakh math, five-year extension choices, EEE versus taxable FD interest, and the liquidity trade-off.",
  keywords: ["ppf extension after 15 years", "ppf 1.5 lakh 15 years maturity", "ppf 30 years corpus", "ppf eee vs fd tds", "ppf 7.1 rate fy 2026-27"],
  toolSlugs: ["ppf-calculator", "fd-calculator"],
  relatedSlugs: ["fd-quarterly-tds", "old-vs-new-regime-2026", "sip-5000-10-years"],
  published: "2026-10-07",
  updated: "2026-10-22",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "fifteen-math", text: "15-year PPF math", level: 2 },
    { id: "extend-withdraw", text: "The three maturity choices", level: 2 },
    { id: "eee-frame", text: "EEE versus FD interest", level: 2 },
  ],
  html,
  faqs: [
    { question: "What happens to PPF after 15 years?", answer: "You choose between closing the account, extending it in five-year blocks with fresh contributions, and extending it without fresh deposits. Each choice has different liquidity and tax consequences. Confirm the current election process, deadlines, and forms with your bank or post office, because operational details vary and can change." },
    { question: "How much does ₹1.5 lakh a year become in 15 years?", answer: "At 7.1% with annual compounding and start-of-year deposits, about ₹40.68 lakh on ₹22.5 lakh invested. Interest is roughly ₹18.18 lakh. The figure is an illustration because the PPF rate resets quarterly. It also assumes no withdrawals, loans, or tax, so the actual maturity will depend on the rates notified during the term." },
    { question: "Can I extend PPF without adding money?", answer: "Yes, an extension without fresh contributions is one of the maturity choices. The existing balance continues to earn PPF interest, but no new deposits are allowed unless the extension-with-subscription route is elected. The PPF calculator does not model this no-contribution mode. A manual calculation of ₹40.68 lakh compounding at 7.1% for 15 more years gives about ₹1.14 crore." },
    { question: "Is PPF better than FD after tax?", answer: "Often for investors in higher slabs, because PPF interest and maturity are tax-free under current rules while FD interest is taxable. At a 30% slab, a 7.1% FD compounds at roughly 4.97% after tax, against 7.1% tax-free in PPF. PPF is not always better: it has a 15-year lock-in and extension blocks, while an FD can be broken. Compare post-tax returns after liquidity needs." },
    { question: "Can I withdraw PPF partially or take a loan?", answer: "Partial withdrawals and loans are separate features available only subject to eligibility conditions and current rules. The PPF calculator does not model either. If you may need the money, keep an emergency fund outside PPF rather than assuming the corpus is accessible. Ask your provider about the current conditions before relying on them." },
    { question: "Does the 80C deduction apply in the new tax regime?", answer: "Generally no. The 80C deduction is available under the old regime, subject to the overall limit, and the PPF contribution shares that ceiling with other eligible products. The new regime does not usually allow 80C. Check your own regime and current law before treating the deduction as part of the PPF return." },
  ],
};

import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>A jacket marked 20% off costs $72. What was the original price? The tempting move is to add 20% to $72 and call it $86.40. That is wrong, and the receipt makes the error easy to see: 20% of $90 is $18, and $90 − $18 = $72. The original was $90. <strong>Reverse percentage undoes a percentage change by dividing, not by adding the rate back.</strong> This guide covers the formula for discounts, GST-inclusive totals and raises, with checks you can do in your head.</p>
<p>Part of the <a href="/blog/percentage-calculator-guide">Percentage Calculator Guide</a>. Run the division in the <a href="/percentage-calculator">percentage calculator</a>, see forward sale math in <a href="/blog/percentage-calculator-guide/discount-and-sale-price">discount and sale price</a>, and split inclusive tax with the <a href="/gst-calculator">GST calculator</a>.</p>

<h2 id="reverse-percentage-formula">The reverse percentage formula</h2>
<p>Start with the forward equation. A price after a discount is final = original × (1 − r), where r is the discount rate as a decimal. A value after an increase is final = original × (1 + r). To go backward, divide both sides by that factor:</p>
<p><strong>Original after a decrease = final ÷ (1 − r). Original after an increase = final ÷ (1 + r).</strong> The rate must be a decimal in the division: 20% becomes 0.20, not 20.</p>
<p>For the jacket: 72 ÷ (1 − 0.20) = 72 ÷ 0.80 = 90. For a salary of $56,000 after a 12% raise: 56,000 ÷ 1.12 = 50,000. The same logic works when you know a part and its share of the whole: whole = part ÷ (rate ÷ 100). If 30 is 20% of a number, the number is 30 ÷ 0.20 = 150.</p>
<p>The common mistake is subtracting the rate from the final value. A 20% discount is 20% of the original, not 20% of the sale price, so the final value cannot serve as the base. The error grows with the size of the rate. At 50% off, a $50 sale price implies a $100 original; subtracting 50% from $50 gives $25, which is not even close. At 10% off, the shortcut lands at $79.20 instead of $80, a small miss that still compounds across a cart.</p>
<blockquote class="tip"><strong>Check forward, not backward:</strong> after finding the original, multiply it by the same factor. If 90 × 0.80 returns 72, the reverse step is correct. This one-line check catches most mistakes.</blockquote>

<h2 id="discount-example">Worked example: original price before a discount</h2>
<p>Take the $72 jacket at 20% off. The forward factor is 1 − 0.20 = 0.80. Divide: 72 ÷ 0.80 = 90. Verify: 90 × 0.20 = 18 discount, and 90 − 18 = 72. The original price was $90 and the shopper saved $18.</p>
<p>A second case: a desk sells for $84 after 25% off. The factor is 0.75. Divide: 84 ÷ 0.75 = 112. Verify: 112 × 0.25 = 28, and 112 − 28 = 84. The original was $112, the saving $28. Notice that $84 is 75% of $112, not 75% of some smaller number; the sale price always represents the remaining share of the original.</p>
<p>Stacked discounts need one extra step. Suppose a $72 final price followed a 20% clearance and then an extra 10% at the register. Each cut applies to the balance left by the previous one, so the combined factor is 0.80 × 0.90 = 0.72. Divide: 72 ÷ 0.72 = 100. Verify forward: 100 → 80 after 20% off → 72 after 10% off. Dividing by 0.70 would give 102.86, which is wrong because the two rates do not add.</p>
<table>
<thead><tr><th>Final amount</th><th>What already happened</th><th>Reverse factor</th><th>Original</th><th>Forward check</th></tr></thead>
<tbody>
<tr><td>$72</td><td>20% discount</td><td>÷ 0.80</td><td>$90</td><td>90 × 0.80 = 72</td></tr>
<tr><td>$84</td><td>25% discount</td><td>÷ 0.75</td><td>$112</td><td>112 × 0.75 = 84</td></tr>
<tr><td>₹1,180</td><td>18% GST added</td><td>÷ 1.18</td><td>₹1,000</td><td>1,000 × 1.18 = 1,180</td></tr>
<tr><td>$56,000</td><td>12% raise applied</td><td>÷ 1.12</td><td>$50,000</td><td>50,000 × 1.12 = 56,000</td></tr>
</tbody>
</table>
<p>One pattern to remember: a discount factor is below 1, so dividing by it makes the number larger; an increase factor is above 1, so dividing by it makes the number smaller. If your answer moves in the wrong direction, you used the wrong sign.</p>

<h2 id="tax-and-raise-examples">Reverse GST and reverse a raise</h2>
<p>A total of ₹1,180 includes 18% GST. The base is not 1,180 − 18% of 1,180, because the tax was calculated on the pre-tax amount. Divide by 1.18: 1,180 ÷ 1.18 = ₹1,000. The tax portion is ₹180, confirmed by 1,000 × 0.18 = 180 and 1,000 + 180 = 1,180. If you subtract 18% from the inclusive total you get ₹967.60 and a tax figure of ₹212.40, both wrong.</p>
<p>Order matters when a discount and a tax meet. A $100 item with 20% off and then 10% sales tax ends at 100 × 0.80 × 1.10 = $88. To reverse a final $88 in one step, divide by 0.88, the product of the two factors. Dividing by 1.10 and then by 0.80 returns the same $100. What you cannot do is subtract 20% and then 10% from the final amount; percentages applied in sequence multiply, so reverse them by dividing by each factor in turn.</p>
<p>The same reversal handles pay raises. A salary of $56,000 after a 12% increase means the old salary was 56,000 ÷ 1.12 = $50,000. The raise was $6,000, which is 12% of $50,000. Subtracting 12% from the new salary gives $49,280 and understates the old salary by $720, because 12% of $56,000 is not the raise that was applied.</p>
<p>This is also where margin and markup get confused. A $100 price with a 20% margin leaves $80 of cost, so you multiply by 0.80. A $100 price built from a 20% markup on cost implies a cost of 100 ÷ 1.20 = $83.33. The words describe different bases, and reversing the wrong one puts your cost off by several dollars per unit.</p>

<h2 id="common-mistakes">Five mistakes that produce the wrong original</h2>
<ul>
<li><strong>Adding the discount back to the sale price.</strong> 20% of $72 is $14.40, but the actual discount was 20% of $90, or $18. The final value is the wrong base.</li>
<li><strong>Subtracting an included tax from the gross total.</strong> 18% of ₹1,180 is ₹212.40, while the GST inside the total is ₹180. Always divide by 1 + rate to find the base first.</li>
<li><strong>Adding stacked rates.</strong> 20% then 10% is not 30%. The combined factor is 0.80 × 0.90 = 0.72, so a $72 final price points to a $100 original.</li>
<li><strong>Rounding before the final step.</strong> A $72.99 item after 15% off gives 72.99 ÷ 0.85 = 85.8706, or $85.87. Rounding the sale price to $73 first gives $85.88, a one-cent miss; rounding the factor 0.85 to 0.9 gives $81.10, a four-dollar miss.</li>
<li><strong>Mixing percent with percentage points.</strong> If a rate falls from 5% to 4%, that is 1 percentage point, not a 1% cut. The relative decline is 1 ÷ 5 = 20%. Reversing a points change and reversing a percent change are different operations.</li>
</ul>

<h2 id="calculator-workflow">A four-step workflow you can repeat</h2>
<ol>
<li>Write the forward relationship: final = original × factor. Name whether the change was a discount, tax or raise.</li>
<li>Turn the rate into a factor: 1 − r for a decrease, 1 + r for an increase. For stacked cuts, multiply the factors first.</li>
<li>Divide the final amount by the factor. Keep at least four decimals until the last step.</li>
<li>Multiply the answer forward by the same factor. If it does not match the final amount, recheck the rate or the direction.</li>
</ol>
<p>For a quick second opinion, enter the original and rate in the <a href="/percentage-calculator">percentage calculator</a> and confirm the forward result. For GST-inclusive invoices, the <a href="/gst-calculator">GST calculator</a> extracts the base and tax in one pass, which removes the temptation to subtract the rate from the gross total.</p>
<div class="cta-box"><strong>Try it:</strong> open the <a href="/percentage-calculator">percentage calculator</a> and reverse the $72 jacket at 20% off, then check ₹1,180 at 18% GST in the <a href="/gst-calculator">GST calculator</a>. The <a href="/blog/percentage-calculator-guide">pillar guide</a> covers the forward formulas and the rest of the percentage family.</div>
`;

export const percentageReverse: BlogPost = {
  pillar: "percentage-calculator-guide",
  slug: "reverse-percentage",
  kind: "cluster",
  title: "Reverse Percentage: Find the Original Price or Number",
  description:
    "Reverse percentage calculator method: find the original price before a discount, remove GST from a total and undo a raise with worked examples.",
  keywords: [
    "reverse percentage calculator",
    "find original price after discount",
    "reverse percentage formula",
    "remove gst from total",
    "original number before percentage increase",
    "undo percentage change",
  ],
  toolSlugs: ["percentage-calculator", "gst-calculator"],
  relatedSlugs: ["discount-and-sale-price", "percentage-difference", "percentage-increase-decrease"],
  published: "2026-10-22",
  updated: "2026-10-22",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "reverse-percentage-formula", text: "The reverse percentage formula", level: 2 },
    { id: "discount-example", text: "Original price before a discount", level: 2 },
    { id: "tax-and-raise-examples", text: "Reverse GST and reverse a raise", level: 2 },
    { id: "common-mistakes", text: "Five common mistakes", level: 2 },
    { id: "calculator-workflow", text: "A repeatable workflow", level: 2 },
  ],
  html,
  faqs: [
    {
      question: "How do I reverse a percentage discount?",
      answer:
        "Divide the sale price by 1 minus the discount rate. A $72 price after 20% off means 72 ÷ (1 − 0.20) = 72 ÷ 0.80 = $90. Check forward: 90 × 0.20 = $18 discount, and 90 − 18 = 72. Adding 20% to $72 gives $86.40, which uses the wrong base.",
    },
    {
      question: "How do I find the original amount before a percentage increase?",
      answer:
        "Divide the final amount by 1 plus the rate. A $56,000 salary after a 12% raise implies 56,000 ÷ 1.12 = $50,000. The raise was 12% of $50,000, or $6,000. Subtracting 12% from the new salary would give $49,280 and understate the original by $720.",
    },
    {
      question: "How do I remove GST from an inclusive total?",
      answer:
        "Divide the gross total by 1 plus the GST rate. For ₹1,180 at 18%, the base is 1,180 ÷ 1.18 = ₹1,000 and the tax is ₹180. Subtracting 18% of ₹1,180 would wrongly produce ₹967.60, because the tax was charged on ₹1,000 rather than on the inclusive amount.",
    },
    {
      question: "Why can't I just subtract the percentage from the final value?",
      answer:
        "Because the percentage was calculated on the original value, not the final one. Twenty percent of $72 is $14.40, while the actual discount was 20% of $90, or $18. The bigger the rate, the bigger the error: at 50% off, a $50 sale price implies a $100 original, not $75.",
    },
    {
      question: "How do I reverse two discounts in a row?",
      answer:
        "Multiply the two remaining fractions, then divide once. A 20% discount followed by 10% leaves 0.80 × 0.90 = 0.72 of the original, so $72 ÷ 0.72 = $100. Verify forward: 100 → 80 → 72. Adding the rates and dividing by 0.70 would give $102.86, which is wrong.",
    },
    {
      question: "What is the reverse percentage formula in one line?",
      answer:
        "Original = final ÷ (1 + r) for an increase, and original = final ÷ (1 − r) for a decrease, where r is the rate as a decimal. For a part-and-whole question, whole = part ÷ (rate ÷ 100). Multiply the answer forward by the same factor to verify it.",
    },
  ],
};

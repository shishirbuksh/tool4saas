import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>A clearance tag says 30% off. A coupon adds another 10%. Tax waits at checkout. By the time the receipt prints, the number on screen and the number in your head have drifted apart. A discount calculator exists to close that gap: it turns a list price and a rate into the amount you save, the amount you pay, and the tax that follows.</p>
<p>This guide, part of the <a href="/blog/percentage-calculator-guide">percentage calculator guide</a>, covers the arithmetic behind sale prices, including stacked offers, tax order and the reverse question every shopper eventually asks. Use the <a href="/discount-calculator">discount calculator</a> to check your own cart as you read.</p>

<h2 id="discount-formula">The discount formula in one line</h2>
<p>A discount is a percentage of the original price. The saving is <strong>list price × rate ÷ 100</strong>. The sale price is <strong>list price − saving</strong>. The shortcut is to multiply by the complement: paying 75% of the price is the same as taking 25% off.</p>
<p>For a 120 item at 25% off, the saving is 120 × 0.25 = 30. The sale price is 120 − 30 = 90. The complement method gives 120 × 0.75 = 90 directly. Both routes are correct because the discount and the amount you pay add up to 100% of the original.</p>
<p>The formula assumes the discount applies to the full list price. If a product is already reduced, or if the coupon excludes certain items, the base changes. Read the terms before multiplying. A “25% off” sign attached to a price that was quietly raised last week is a discount relative to the new tag, not the old one.</p>

<h2 id="worked-examples">Two worked examples with the arithmetic shown</h2>
<p><strong>Example 1: 120 at 25% off.</strong> Convert the rate to 0.25. Saving = 120 × 0.25 = 30. Sale price = 120 − 30 = 90. Check with the complement: 120 × 0.75 = 90. If the local sales tax is 8%, tax is calculated on the sale price: 90 × 0.08 = 7.20, so the total is 97.20. Charging tax on 120 instead would add 9.60 and produce 99.60, a 2.40 overcharge.</p>
<p><strong>Example 2: 249 at 30% off.</strong> Saving = 249 × 0.30 = 74.70. Sale price = 249 − 74.70 = 174.30. Check: 249 × 0.70 = 174.30. With 8% tax, the tax is 174.30 × 0.08 = 13.944, which rounds to 13.94, and the total is 188.24. If the register shows 188.25, it rounded the tax differently; a one-cent difference is normal and not a reason to abandon the calculation.</p>
<table>
<thead><tr><th>List price</th><th>Discount</th><th>You save</th><th>Sale price</th><th>With 8% tax</th></tr></thead>
<tbody>
<tr><td>120</td><td>25%</td><td>30.00</td><td>90.00</td><td>97.20</td></tr>
<tr><td>249</td><td>30%</td><td>74.70</td><td>174.30</td><td>188.24</td></tr>
<tr><td>80</td><td>15%</td><td>12.00</td><td>68.00</td><td>73.44</td></tr>
<tr><td>100</td><td>20% then 10%</td><td>28.00</td><td>72.00</td><td>77.76</td></tr>
</tbody>
</table>

<h2 id="stacked-discounts">Stacked discounts multiply, they do not add</h2>
<p>“20% off, then an extra 10% off” is the most misunderstood phrase in retail. It does not mean 30% off. The first discount applies to 100, taking it to 80. The second applies to 80, taking another 8 off and leaving 72. The total saving is 28, which is 28% of the original.</p>
<p>Multiplying the factors shows why: 0.80 × 0.90 = 0.72. You pay 72% of the list price, so the effective discount is 28%. If the order is reversed — 10% first, then 20% — the result is the same: 0.90 × 0.80 = 0.72. Multiplication is commutative, so the sequence does not change the final price when both rates apply to the running balance.</p>
<p>Three discounts behave the same way. 20%, then 10%, then 5% gives 0.80 × 0.90 × 0.95 = 0.684, an effective 31.6% off. The headline rates add to 35%, but the actual saving is smaller because each cut is calculated on a smaller base.</p>
<p>Fixed-amount coupons work differently. A 20 coupon on a 100 order is a 20% discount only at that exact price. On a 50 order, the same coupon is 40% off, and many stores set a minimum spend to prevent that. When a coupon and a percentage discount combine, apply the rules in the order the store specifies; the result is not always the same as applying them in the order that looks convenient.</p>

<h2 id="tax-after-discount">Tax usually comes after the discount</h2>
<p>In most retail systems, sales tax or GST is calculated on the discounted price, not the original tag. The 90 sale price from the first example attracts 8% tax of 7.20, for 97.20 total. That order is standard because the customer never pays the undiscounted amount.</p>
<p>India’s GST follows the same principle for a straightforward markdown: discount first, tax on the net amount. A 4,800 service with 18% GST becomes 5,664. If a 10% discount is applied first, the taxable value falls to 4,320, the GST becomes 777.60, and the total is 5,097.60. Applying the discount after tax would give a different, usually incorrect, result.</p>
<p>Some situations complicate the order. Manufacturer rebates may arrive after the sale and do not reduce the taxable price at checkout. Shipping charges may be taxed separately. A “free gift” with a purchase can have its own tax treatment. When the receipt matters for a business expense, keep the tax invoice and check the taxable value rather than reconstructing it from the total.</p>
<p>For quick checks, a GST calculator can add tax to a net figure or extract it from a gross figure. The discount tool handles the markdown; the tax tool handles the rate. Keeping the two steps separate makes it easier to see which number changed. This is general information, not tax advice.</p>

<h2 id="comparing-offers">Comparing two offers without getting fooled</h2>
<p>A percentage is only one part of the cost. Shipping, tax, membership requirements and return fees can reverse the ranking of two deals that look obvious at first glance.</p>
<ul>
<li><strong>Normalize to the final amount.</strong> Compare what leaves your account, including tax and shipping, not the headline discount.</li>
<li><strong>Check the minimum spend.</strong> A 20% coupon that requires a 150 purchase can cost more than it saves if you only needed a 60 item.</li>
<li><strong>Separate cashback from discount.</strong> A 20% cashback offer returns money later; a 20% discount reduces the amount you pay now. If the cashback is capped or expires, the effective saving is lower.</li>
<li><strong>Watch the base.</strong> A 30% discount on a marked-up price can be worse than a 15% discount on a lower price. Compare final totals, not rates.</li>
<li><strong>Account for returns.</strong> If you might return the item, check whether the refund is based on the discounted price and whether the original shipping is returned.</li>
</ul>
<p>Suppose Store A sells a 120 item at 25% off with 8% tax and free shipping: total 97.20. Store B sells the same item for 110 with 15% off and 8% tax but charges 6 shipping: sale 93.50, tax 7.48, total 106.98. Store A wins even though Store B’s sticker is lower. The only fair comparison is the final line.</p>
<p>For a business, the same logic applies to promotional pricing. A discount reduces revenue per unit, and the margin falls faster than the price. The <a href="/blog/percentage-calculator-guide/markup-vs-margin">markup vs margin guide</a> shows how a 10% markdown can remove a much larger share of profit. The <a href="/blog/percentage-calculator-guide/percentage-increase-decrease">percentage increase and decrease guide</a> covers the reverse calculation when you know the sale price and need the original.</p>

<h2 id="calculator">Using the discount calculator step by step</h2>
<p>The <a href="/discount-calculator">discount calculator</a> takes a list price and a discount rate, then returns the saving, the sale price and an optional tax-inclusive total. It also handles a second discount for stacked offers.</p>
<ol>
<li>Enter the price on the tag, not the price you remember from last month.</li>
<li>Enter the first discount rate. If the offer says “extra 10% at checkout,” add that as a second stage rather than combining the rates.</li>
<li>Add the tax rate only if you want the out-the-door total. Leave it at zero for a pre-tax comparison.</li>
<li>Read the saving and the sale price, then check the arithmetic with the complement method: sale = list × (1 − rate).</li>
</ol>
<p>To reverse a sale price, divide by the complement. A 68 price after 15% off means the original was 68 ÷ 0.85 = 80. Adding 15% to 68 gives 78.20, which is not the original and will make a return or price-match conversation confusing. The reverse percentage method is the same one used for tax extraction: divide by the factor that produced the final number.</p>
<div class="cta-box"><strong>Price your cart:</strong> open the <a href="/discount-calculator">discount calculator</a>, enter the list price, the markdown and any tax, and compare the final total with the tag. No signup, and the numbers stay on your device.</div>
`;

export const percentageDiscountSale: BlogPost = {
  pillar: "percentage-calculator-guide",
  slug: "discount-and-sale-price",
  kind: "cluster",
  title: "Discount Calculator: Sale Price and Savings Explained",
  description:
    "Use a discount calculator to find sale price, savings and tax after markdown, including stacked coupons and reverse checks. Worked examples inside.",
  keywords: ["discount calculator", "sale price calculator", "how to calculate discount percentage", "percent off calculator", "stacked discounts"],
  toolSlugs: ["discount-calculator", "gst-calculator"],
  relatedSlugs: ["markup-vs-margin", "percentage-increase-decrease", "reverse-percentage"],
  published: "2026-10-22",
  updated: "2026-10-22",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "discount-formula", text: "The discount formula", level: 2 },
    { id: "worked-examples", text: "Worked examples", level: 2 },
    { id: "stacked-discounts", text: "Stacked discounts", level: 2 },
    { id: "tax-after-discount", text: "Tax after the discount", level: 2 },
    { id: "comparing-offers", text: "Comparing offers", level: 2 },
    { id: "calculator", text: "Using the discount calculator", level: 2 },
  ],
  html,
  faqs: [
    { question: "How do I calculate 25% off a price?", answer: "Multiply the list price by 0.25 to get the saving, then subtract it. For 120, the saving is 30 and the sale price is 90. The faster route is to multiply by 0.75, the complement of the discount. Both methods give the same answer before tax." },
    { question: "Why is 20% off then 10% off not 30% off?", answer: "Each discount applies to the remaining balance, not the original price. On 100, the first cut leaves 80 and the second takes 8 more, leaving 72. The total saving is 28, or 28% of the list price. Multiplying 0.80 by 0.90 gives the same 0.72 factor." },
    { question: "Is tax calculated before or after a discount?", answer: "In most retail and GST systems, tax is calculated on the discounted price. A 90 sale price with 8% tax adds 7.20 for a 97.20 total. Taxing the original 120 would overstate the bill because the customer never pays that amount. Confirm unusual cases with the seller or a tax professional." },
    { question: "How do I find the original price from a sale price?", answer: "Divide the sale price by one minus the discount rate. If 68 is the price after 15% off, the original is 68 ÷ 0.85 = 80. Do not add 15% to 68, which gives 78.20. The division reverses the multiplication that produced the sale price." },
    { question: "Is cashback the same as a discount?", answer: "No. A discount reduces what you pay at checkout. Cashback returns money later, often with conditions, caps or expiry dates. A 20% cashback offer on 100 returns 20 eventually, while a 20% discount takes 20 off immediately. If the cashback is capped at 10, the effective saving is only 10%." },
    { question: "How do I compare a percentage discount with a fixed coupon?", answer: "Convert both offers to the final amount you pay for the same basket. A 25% discount on 120 saves 30; a fixed 35 coupon saves 35 on that basket, so the coupon is better there. On a 250 basket, the percentage saves 62.50 and wins. Compare totals, not headline rates." },
  ],
};

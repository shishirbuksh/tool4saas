import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>A percentage is a comparison squeezed into a small number. It can describe a pay raise, a clearance tag, a tax line or the gap between two supplier quotes, but the arithmetic changes with the question. This guide gives you the formulas, the worked examples and the traps, then points you to the right view in the <a href="/percentage-calculator">percentage calculator</a>.</p>
<p>Read it in order or jump straight to the section you need. The numbers stay simple on purpose so you can check each result on paper.</p>

<h2 id="what-percentage-means">What a percentage actually means</h2>
<p>Percent means “per hundred.” One percent is one part in one hundred, written as 1/100 or 0.01. So 37% is 37 parts per hundred, 0.37 as a decimal, and 37/100 as a fraction. The same quantity can wear all three outfits: 3/8 equals 0.375, which equals 37.5%.</p>
<p>That definition explains why percentages are so useful. They put different-sized things on one scale. A ₹200 increase sounds bigger than a ₹150 increase until you learn the first was on a ₹10,000 salary and the second on a ₹3,000 fee. As percentages, those are 2% and 5%.</p>
<p>The catch is the base. “20% off” means 20% of the marked price, not 20% of the price you eventually pay. “A 10% raise followed by a 10% cut” does not return you to the starting salary. Almost every percentage mistake comes from multiplying by the wrong base or adding percentages that were calculated from different bases.</p>
<p>Keep two phrases in mind. “Of” usually means multiply: 18% of 250 is 0.18 × 250. “What percent” usually means divide, then multiply by 100: 45 out of 180 is 45 ÷ 180 × 100. Simple, but only if you identify the whole.</p>
<p>Percentages also hide the size of the thing they describe. A 5% fee on ₹200 is ₹10; the same 5% on ₹2,00,000 is ₹10,000. The rate is identical, the consequence is not. Before comparing two percentages, ask what base each one sits on and whether the two bases are measured the same way.</p>

<h2 id="core-formulas">The four formulas behind almost every question</h2>
<p>Most percentage requests fit one of four patterns. Learn the pattern first, then reach for a calculator. This table is the compact version; the sections below unpack each row.</p>
<table>
<thead><tr><th>Question</th><th>Formula</th><th>Example</th><th>Answer</th></tr></thead>
<tbody>
<tr><td><strong>What is X% of Y?</strong></td><td>(X ÷ 100) × Y</td><td>18% of 250</td><td>45</td></tr>
<tr><td><strong>A is what percent of B?</strong></td><td>(A ÷ B) × 100</td><td>45 out of 180</td><td>25%</td></tr>
<tr><td><strong>Old value to new value</strong></td><td>((New − Old) ÷ Old) × 100</td><td>240 to 300</td><td>+25%</td></tr>
<tr><td><strong>Reverse a percentage change</strong></td><td>Final ÷ (1 ± rate)</td><td>68 after 15% off</td><td>80 original</td></tr>
</tbody>
</table>
<p>Two more formulas cover comparisons that are easy to confuse with change. Percentage difference divides the gap by the average of the two values: 60 and 80 differ by 20, and 20 ÷ 70 × 100 = 28.57%. Percentage error divides the gap by the true or accepted value instead. Those distinctions matter in reports, so they get their own sections later.</p>
<p>Read the table from the question backward. If the sentence gives a rate and asks for an amount, you are multiplying. If it gives two amounts and asks for a rate, you are dividing one by the other. If it gives a starting point and an ending point, the starting point is the denominator for change. If it gives only the ending point, you are reversing a change that has already happened.</p>

<h2 id="percent-of-a-number">Percent of a number, and the two reverse questions</h2>
<p>Start with the easiest case. To find 20% of 150, convert the rate to a decimal and multiply: 0.20 × 150 = 30. To find 7.5% of 240, use 0.075 × 240 = 18. If the rate is friendly, the fraction route is faster: 25% is one quarter, so 25% of 84 is 21.</p>
<p>The reverse question — “45 is what percent of 180?” — flips the division. Put the part over the whole: 45 ÷ 180 = 0.25, then multiply by 100 for 25%. The part always goes on top. Reversing those positions gives 400%, which is technically an answer but almost never the one you want.</p>
<p>A third version asks for the whole: “12 is 30% of what number?” Divide the part by the rate as a decimal. 12 ÷ 0.30 = 40. This is the same move you use to recover a pre-discount price or a pre-tax subtotal. The <a href="/blog/percentage-calculator-guide/percent-of-a-number">percent of a number tutorial</a> walks through all three arrangements with more examples, and the <a href="/blog/percentage-calculator-guide/reverse-percentage">reverse percentage guide</a> focuses on the cases where the final number is already on the receipt.</p>

<h2 id="increase-decrease">Increase and decrease: direction changes the denominator</h2>
<p>Percentage change compares a new value with an old one. Subtract old from new, divide by the old value, then multiply by 100. From 240 to 300 the gap is 60, and 60 ÷ 240 × 100 = 25%. The move from 300 back to 240 is a different calculation: −60 ÷ 300 × 100 = −20%.</p>
<p>That asymmetry is not a rounding quirk. The same absolute gap is being measured against a different base. A 20% increase followed by a 20% decrease leaves 96, not 100: 100 becomes 120, then 120 × 0.80 = 96. To undo a 20% rise you need a 16.67% fall, because 20 ÷ 120 = 0.1667.</p>
<p>Decreases work the same way. A price that drops from 480 to 420 has fallen by 60; 60 ÷ 480 × 100 = 12.5%. If a value falls by 15% to 68, the original was 68 ÷ 0.85 = 80. Notice that reversing a decrease means dividing by 0.85, not multiplying by 1.15. Adding 15% to 68 gives 78.20, which is why “add back the discount” so often produces a number that does not match the tag.</p>
<p>Use change when there is a clear before and after: monthly revenue, website traffic, body weight, electricity use. Use percentage difference when neither value is a baseline and you want a neutral comparison. The <a href="/blog/percentage-calculator-guide/percentage-increase-decrease">increase and decrease guide</a> covers business cases, and the <a href="/blog/percentage-calculator-guide/percentage-difference">percentage difference tutorial</a> explains the symmetric version.</p>

<h2 id="discounts-and-tax">Discounts, sale prices and tax</h2>
<p>A discount is a percentage of the original price. If a ₹120 item is 25% off, the saving is 0.25 × 120 = ₹30 and the sale price is 120 − 30 = ₹90. The quick route is to multiply by the complement: 120 × 0.75 = ₹90. Both methods agree because the discount and the amount you pay add up to 100% of the original.</p>
<p>Stacked discounts are where shoppers get surprised. “20% off, then an extra 10% off” does not mean 30% off. Apply the first cut to ₹100 and you have ₹80. Apply the second cut to ₹80 and you save ₹8 more, leaving ₹72. The total saving is ₹28, or 28% — not 30%. Sequential percentages multiply, so the combined factor is 0.80 × 0.90 = 0.72.</p>
<p>Tax usually applies after the discount. Take the ₹90 sale price and add 8% sales tax: 90 × 0.08 = ₹7.20, for a total of ₹97.20. Charging tax on the original ₹120 would overstate the bill by 8% of ₹30, or ₹2.40. The order matters, even when both rates look small.</p>
<p>Coupons, cashback and loyalty points are not interchangeable. A ₹100 coupon on a ₹500 bill cuts the price by 20%. A 20% cashback offer returns ₹100 later, but you still pay ₹500 at checkout and may spend the reward on something else. If the cashback is capped at ₹50, the effective saving is 10%. Compare offers by the money that actually leaves your account, not by the headline rate.</p>
<p>GST works the same way but frequently travels in the opposite direction. A ₹4,800 service invoice at 18% GST carries 4,800 × 0.18 = ₹864 tax, for ₹5,664 total. If all you have is the inclusive total, extract the base with 5,664 × 100 ÷ 118 = ₹4,800, leaving ₹864 tax. Multiplying 5,664 by 0.18 would give ₹1,019.52, which is wrong because the total already contains the tax.</p>
<p>The <a href="/discount-calculator">discount calculator</a> handles markdowns and optional tax in one pass. The <a href="/gst-calculator">GST calculator</a> switches between adding tax to a net figure and extracting it from a gross figure. For the shopping logic in more detail, read the <a href="/blog/percentage-calculator-guide/discount-and-sale-price">discount and sale price guide</a>.</p>

<h2 id="margin-and-markup">Margin and markup: same profit, different denominator</h2>
<p>Business pricing runs on two percentages that sound interchangeable and are not. Margin divides profit by revenue. Markup divides profit by cost. A product that costs ₹60 and sells for ₹100 earns ₹40 profit. Margin is 40 ÷ 100 = 40%. Markup is 40 ÷ 60 = 66.67%.</p>
<p>Because the denominators differ, the markup number is always larger for a profitable sale. The gap widens as margin rises. At a 50% margin, markup is 100%; at a 20% margin, markup is 25%. If a supplier says “I use a 50% markup,” the resulting margin is 33.33%, not 50%. That is a costly misunderstanding when you are setting a price list.</p>
<p>To price from a target margin, divide cost by one minus the margin. A ₹60 item at a 40% target margin needs 60 ÷ (1 − 0.40) = ₹100. At a 50% target it needs 60 ÷ 0.50 = ₹120. To price from a target markup, multiply cost by 1.5 for a 50% markup: ₹60 × 1.50 = ₹90, which carries only a 33.33% margin.</p>
<p>Margin also shrinks faster than price when you discount. Cutting a ₹100 price by 10% removes ₹10 of revenue and, with cost unchanged at ₹60, removes ₹10 of profit. Profit falls from ₹40 to ₹30 and margin from 40% to 33.33%. In relative terms, a 10% discount cost 16.67% of the margin. That is why a promotion that looks modest on the tag can wipe out the reason you stocked the item.</p>
<p>These are gross figures. Payment fees, shipping, returns, rent and advertising all come out of that margin before anything reaches your bank account. Treat the calculation as a pricing checkpoint, not a profit guarantee. The <a href="/profit-margin-calculator">profit margin calculator</a> shows profit, margin and markup together, and the <a href="/blog/percentage-calculator-guide/markup-vs-margin">markup vs margin guide</a> works through target pricing and discount damage. This is general information, not financial advice.</p>

<h2 id="points-vs-percent">Percentage points vs percent change</h2>
<p>When a rate itself moves, there are two honest ways to describe the move. A savings rate that goes from 4% to 5% has risen by 1 percentage point. Relative to where it started, it has risen by 25%, because 1 ÷ 4 = 0.25. Both statements are true; they answer different questions.</p>
<p>Newsletters and product pages often choose whichever number sounds more dramatic. If a conversion rate moves from 2% to 3%, that is 1 point but a 50% relative increase. If a fee moves from 12% to 9%, that is a 3-point drop but a 25% relative decrease. State the unit and you avoid the argument. The <a href="/blog/percentage-calculator-guide/percentage-points-vs-percent">percentage points guide</a> has a longer set of examples.</p>
<p>Measurement error is a separate calculation. If a scale reads 48 kg for an object with a true mass of 50 kg, the error is (48 − 50) ÷ 50 × 100 = −4%. The absolute error is 4%, and the sign tells you the reading was low. The <a href="/blog/percentage-calculator-guide/percentage-error">percentage error guide</a> covers accepted values, absolute error and the cases where a negative sign is meaningful.</p>

<h2 id="choose-view">Which percentage calculator view to use</h2>
<p>Most mistakes happen before any arithmetic, when someone picks the wrong relationship. Match the wording of the question to the view below, then enter the numbers.</p>
<ul>
<li><strong>“What is 15% of 80?”</strong> Use the percent view. Rate and base go in; the part comes out. 0.15 × 80 = 12.</li>
<li><strong>“18 is what percent of 72?”</strong> Use the what-percent view. Part divided by whole: 18 ÷ 72 × 100 = 25%.</li>
<li><strong>“Sales went from 1,200 to 1,500.”</strong> Use the change view. 300 ÷ 1,200 × 100 = 25% growth.</li>
<li><strong>“The price is 68 after 15% off.”</strong> Use the reverse view. 68 ÷ 0.85 = 80.</li>
<li><strong>“Compare 60 with 80.”</strong> Use the difference view for a neutral 28.57% gap, not a directional change.</li>
</ul>
<p>Write the question in words before touching the keypad. “Percent of” and “percent change” look similar in a search box and behave nothing alike on the page. A five-second translation saves a wrong quote, a mispriced invoice or a confusing chart.</p>

<h2 id="mistakes">Common mistakes and a 10-second sanity check</h2>
<p>Percentage errors rarely come from bad multiplication. They come from choosing the wrong base, skipping a step, or reporting a relative change as if it were an absolute one.</p>
<ol>
<li><strong>Adding percentages from different bases.</strong> A 10% rise then a 10% fall is not zero. It is −1% overall, because 100 → 110 → 99.</li>
<li><strong>Discounting the tax-inclusive total.</strong> A 20% coupon on a ₹1,180 GST-inclusive bill does not necessarily reduce the tax by 20%; the discount usually applies to the taxable value, then tax is recalculated.</li>
<li><strong>Using markup as margin.</strong> A 50% markup on ₹60 gives ₹90 and a 33.33% margin. Calling it a 50% margin overstates profitability.</li>
<li><strong>Reversing with the wrong operator.</strong> To undo a 20% increase, divide by 1.20. Do not subtract 20% from the new value.</li>
<li><strong>Reporting points as percent.</strong> A move from 4% to 5% is 1 point and a 25% relative increase. Pick one and label it.</li>
<li><strong>Rounding too early.</strong> Keep full precision through the steps, then round the final money amount to two decimals. Rounding a rate to a whole number midway can shift a total by several rupees.</li>
</ol>
<p>A quick check catches most of these. Ten percent of a number is one decimal shift left: 10% of 250 is 25. One percent is two shifts: 2.50. If your answer for 18% of 250 lands far from 45, the decimal point probably moved. For money, ask whether the final total is plausible against the original. A ₹90 item with 8% tax should land near ₹97, not ₹107 or ₹81.</p>
<p>Finally, distinguish gross margin from net margin. Gross margin subtracts the direct cost of the item; net margin also subtracts overhead, fees and tax. A 40% gross margin can become a 12% net margin after marketplace commission, shipping and returns. Both numbers are useful, but they answer different questions, and quoting one while meaning the other is how a healthy product line starts to look unprofitable.</p>
<div class="cta-box"><strong>Run your own numbers:</strong> open the <a href="/percentage-calculator">free percentage calculator</a> for percent-of, what-percent, change and difference in one place. For shopping math use the <a href="/discount-calculator">discount calculator</a>; for pricing use the <a href="/profit-margin-calculator">profit margin calculator</a>; for tax use the <a href="/gst-calculator">GST calculator</a>. This guide is general information, not financial or tax advice.</div>
`;

const toc = [
  { id: "what-percentage-means", text: "What a percentage actually means", level: 2 as const },
  { id: "core-formulas", text: "The four core formulas", level: 2 as const },
  { id: "percent-of-a-number", text: "Percent of a number", level: 2 as const },
  { id: "increase-decrease", text: "Increase and decrease", level: 2 as const },
  { id: "discounts-and-tax", text: "Discounts, sale prices and tax", level: 2 as const },
  { id: "margin-and-markup", text: "Margin and markup", level: 2 as const },
  { id: "points-vs-percent", text: "Percentage points vs percent", level: 2 as const },
  { id: "choose-view", text: "Which calculator view to use", level: 2 as const },
  { id: "mistakes", text: "Common mistakes and sanity checks", level: 2 as const },
];

export const percentagePillar: BlogPost = {
  pillar: "percentage-calculator-guide",
  slug: "percentage-calculator-guide",
  kind: "pillar",
  title: "Percentage Calculator Guide: Formulas, Discounts & Real-Life Uses",
  description:
    "Percentage formulas for everyday math: percent of a number, increase, discounts, tax, margin and percentage points, with worked examples.",
  keywords: ["percentage calculator guide", "how to calculate percentage", "percentage formulas", "percent of a number", "percentage increase and decrease", "discount percentage formula", "markup vs margin", "percentage points vs percent"],
  toolSlugs: ["percentage-calculator", "discount-calculator", "profit-margin-calculator", "gst-calculator"],
  relatedSlugs: ["percent-of-a-number", "percentage-increase-decrease", "discount-and-sale-price", "markup-vs-margin", "percentage-difference", "reverse-percentage", "percentage-error", "percentage-points-vs-percent"],
  published: "2026-10-22",
  updated: "2026-10-22",
  readingMinutes: readingMinutesFor(html),
  toc,
  html,
  faqs: [
    { question: "How do I calculate a percentage of a number?", answer: "Turn the rate into a decimal and multiply it by the base. For 18% of 250, compute 0.18 × 250 = 45. For 7.5% of 240, compute 0.075 × 240 = 18. If the rate is a familiar fraction, 25% of 84 is simply one quarter, or 21. The percentage calculator shows the same formula beside the result." },
    { question: "What is the difference between percentage points and percent?", answer: "A move from 4% to 5% is 1 percentage point, because the two rates differ by one unit. It is also a 25% relative increase, because the change of 1 is divided by the starting rate of 4. Use points when describing the rate itself and percent when describing growth relative to the starting value." },
    { question: "Why does a 20% increase not cancel a 20% decrease?", answer: "The two changes use different bases. Start at 100, add 20% to reach 120, then take 20% of 120, which is 24, leaving 96. To return from 120 to 100 you need a fall of 20 ÷ 120 = 16.67%. The same absolute gap is being compared with a larger base on the way down." },
    { question: "How do I find the original price after a discount?", answer: "Divide the sale price by one minus the discount rate. A price of 68 after 15% off means 68 ÷ 0.85 = 80. Do not add 15% to 68, which gives 78.20. For a price after a 20% increase, divide by 1.20 instead. The reverse percentage tutorial covers both directions." },
    { question: "Is markup the same as margin?", answer: "No. A product costing 60 and selling for 100 earns 40 profit. Margin is 40 ÷ 100 = 40%, while markup is 40 ÷ 60 = 66.67%. Margin uses revenue as the denominator and markup uses cost. A 50% markup therefore produces a 33.33% margin, which matters when you set prices from a target." },
    { question: "How do I remove GST from an inclusive total?", answer: "Divide the gross amount by 1.18 at 18%. A total of 5,664 becomes 5,664 ÷ 1.18 = 4,800, so the tax is 864. Multiplying 5,664 by 0.18 is incorrect because the gross figure already includes tax. Use the GST calculator in extract mode to avoid that inversion." },
    { question: "Which calculator view should I choose?", answer: "Use percent-of when you have a rate and a base, what-percent when you have a part and a whole, change when you have an old and new value, and difference when neither value is a baseline. For a total that already includes tax or a discount, use reverse. Writing the question in words before entering numbers prevents most errors." },
  ],
};

import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>Two sellers buy the same item for 60. One prices it at 100 and says, “That is a 66.7% markup.” The other looks at the same numbers and says, “That is a 40% margin.” Both statements are correct. They are describing different ratios, and confusing them is one of the fastest ways to misprice a product.</p>
<p>This guide separates markup from margin, shows the conversion formulas, and works through target pricing and discount damage. Keep the <a href="/profit-margin-calculator">profit margin calculator</a> nearby if you want to test your own cost and price.</p>

<h2 id="what-each-term-means">What markup and margin each measure</h2>
<p>Profit is the same number in both calculations: selling price minus cost. What changes is the denominator. Margin divides profit by revenue, while markup divides profit by cost.</p>
<p><strong>Margin</strong> answers a simple question: of every rupee or dollar that comes in, how much is left after the direct cost of the item? A 40% margin means 40% of the selling price is gross profit and 60% covers the cost. It is the ratio retailers usually quote when they talk about the health of a product line.</p>
<p><strong>Markup</strong> answers a different question: how much was added on top of the cost? A 66.7% markup means the price is 1.667 times the cost. It is the ratio a contractor or wholesaler often uses when building a quote from a cost sheet.</p>
<p>Neither ratio is more honest. They are two views of the same transaction. The trouble starts when someone sets a price using markup and then reports the result as margin, or when a target margin gets translated into the wrong multiplier. A 50% markup does not produce a 50% margin; it produces a 33.3% margin.</p>

<h2 id="formulas-side-by-side">The formulas, side by side</h2>
<p>Let profit equal price minus cost. Then:</p>
<ul>
<li><strong>Margin % = (Profit ÷ Price) × 100</strong></li>
<li><strong>Markup % = (Profit ÷ Cost) × 100</strong></li>
<li><strong>Price from margin = Cost ÷ (1 − Margin)</strong></li>
<li><strong>Price from markup = Cost × (1 + Markup)</strong></li>
</ul>
<p>To convert one ratio into the other, use the relationship between price and cost. Since price = cost + profit, markup is profit divided by cost, and margin is profit divided by (cost + profit). A 66.67% markup becomes 66.67 ÷ 166.67 = 40% margin. A 40% margin becomes 40 ÷ 60 = 66.67% markup.</p>
<p>The general conversions are <strong>Margin = Markup ÷ (1 + Markup)</strong> and <strong>Markup = Margin ÷ (1 − Margin)</strong>, with both rates written as decimals. These are worth memorizing if you move between a cost sheet and a price list. They save you from guessing which multiplier the other person used.</p>
<table>
<thead><tr><th>Cost</th><th>Price</th><th>Profit</th><th>Margin</th><th>Markup</th></tr></thead>
<tbody>
<tr><td>60</td><td>100</td><td>40</td><td>40%</td><td>66.67%</td></tr>
<tr><td>60</td><td>90</td><td>30</td><td>33.33%</td><td>50%</td></tr>
<tr><td>45</td><td>75</td><td>30</td><td>40%</td><td>66.67%</td></tr>
<tr><td>80</td><td>120</td><td>40</td><td>33.33%</td><td>50%</td></tr>
<tr><td>80</td><td>160</td><td>80</td><td>50%</td><td>100%</td></tr>
</tbody>
</table>

<h2 id="worked-examples">Worked examples with the arithmetic shown</h2>
<p><strong>Example 1: Cost 60, price 100.</strong> Profit = 100 − 60 = 40. Margin = 40 ÷ 100 × 100 = 40%. Markup = 40 ÷ 60 × 100 = 66.67%. The price is 1.667 times the cost, and 40% of the price is profit.</p>
<p><strong>Example 2: Cost 45, price 75.</strong> Profit = 75 − 45 = 30. Margin = 30 ÷ 75 × 100 = 40%. Markup = 30 ÷ 45 × 100 = 66.67%. Different cost and price, same ratios, because both numbers moved by the same proportion. This is a useful check: if cost and price both double, margin and markup stay the same even though the absolute profit doubles.</p>
<p><strong>Example 3: A 30% discount on the 60-cost, 100-price item.</strong> The new price is 70. Profit falls to 70 − 60 = 10. Margin is 10 ÷ 70 × 100 = 14.29%. Markup is 10 ÷ 60 × 100 = 16.67%. A discount that looks like 30% of the price removed 75% of the profit and 64.3% of the original margin in relative terms. This is why discounting a low-margin item is dangerous: the price can still look healthy while the profit nearly disappears.</p>
<p><strong>Example 4: Cost 80, target margin 50%.</strong> Price = 80 ÷ (1 − 0.50) = 160. Profit = 80, markup = 80 ÷ 80 = 100%. If you had used a 50% markup instead, the price would be 80 × 1.50 = 120, with a profit of 40 and a margin of 33.33%. The same “50%” label produces two very different prices.</p>

<h2 id="pricing-from-a-target-margin">Pricing from a target margin</h2>
<p>Most pricing decisions start with a margin target, not a markup target. A business wants to keep a certain share of revenue after direct costs, then work backward to a price. The formula is price = cost ÷ (1 − margin). The subtraction is important: a 40% margin means cost is 60% of price, so dividing cost by 0.60 gives the price.</p>
<p>If the cost is 60 and the target margin is 40%, the price is 60 ÷ 0.60 = 100. If the target is 50%, the price is 60 ÷ 0.50 = 120. If the target is 25%, the price is 60 ÷ 0.75 = 80. Notice how quickly the required price rises as the target margin approaches 100%. A 90% margin target would require 60 ÷ 0.10 = 600, which may be impossible in a competitive market.</p>
<p>To go the other way, from a target markup, multiply cost by 1.5 for a 50% markup: 60 × 1.50 = 90. The resulting margin is 30 ÷ 90 = 33.33%. A 100% markup gives 120 and a 50% margin. The markup number will always be larger than the margin number for a profitable sale, and the gap widens as the rates rise.</p>
<p>Use the same basis for every product in a comparison. If one spreadsheet column is margin and another is markup, the totals will not reconcile. Label the column, state the formula in the header, and convert before ranking products. The <a href="/gst-calculator">GST calculator</a> can help separate tax from revenue if your prices include GST, since margin should be calculated on the tax-exclusive selling price. This is general information, not financial advice.</p>

<h2 id="discounts-hit-margin-harder">Why discounts hit margin harder than they look</h2>
<p>Discounts reduce revenue, but cost stays the same. That leverage makes margin fall faster than price. Take the 60-cost item at 100 with a 40% margin. A 10% discount lowers the price to 90, profit to 30, and margin to 33.33%. The price fell 10%, but profit fell 25% and margin fell 6.67 percentage points.</p>
<p>At a 20% discount, the price is 80, profit is 20, and margin is 25%. Profit has halved. At 30% off, the price is 70, profit is 10, and margin is 14.29%. At 40% off, the price equals the cost and profit is zero. Every additional point of discount removes a larger share of the remaining profit.</p>
<p>Volume has to compensate. After the 10% discount, the seller earns 30 per unit instead of 40. To keep the same total gross profit, they need 40 ÷ 30 = 1.333, or 33.3% more units. After the 20% discount, they need 40 ÷ 20 = 2, or twice the volume. Whether that volume is achievable depends on demand, capacity and the cost of acquiring more customers, which is why a discount should be modeled before it is launched.</p>
<p>This is the same arithmetic covered in the <a href="/blog/percentage-calculator-guide/discount-and-sale-price">discount and sale price guide</a>, viewed from the seller’s side. The customer sees the sale price; the seller needs to see the profit line. A promotion that raises revenue can still lower gross profit if the margin falls faster than volume rises.</p>

<h2 id="calculator">Using the profit margin calculator</h2>
<p>The <a href="/profit-margin-calculator">profit margin calculator</a> takes a unit cost and a selling price, then returns profit, margin and markup together. Seeing all three numbers side by side is the quickest way to catch a label error.</p>
<ol>
<li>Enter the fully loaded direct cost per unit: materials, labor and packaging. Leave overhead for a separate net-margin calculation.</li>
<li>Enter the tax-exclusive selling price. If your price includes GST or sales tax, remove the tax first so the margin is not flattered by money you collect on behalf of the government.</li>
<li>Read the profit, margin and markup. Check that the margin is profit ÷ price and the markup is profit ÷ cost.</li>
<li>Change the price by a few units and watch the margin move. A small price change can produce a much larger percentage change in profit.</li>
</ol>
<p>For a target-margin price, divide cost by one minus the target. For a target-markup price, add the markup rate to 1 and multiply by cost. Compare the two results before choosing a list price, and remember that discounts, payment fees, shipping and returns all come out of the gross margin afterward. The <a href="/blog/percentage-calculator-guide">percentage calculator guide</a> connects these pricing ratios to the broader formulas for change, tax and percentage points.</p>
<div class="cta-box"><strong>Check your pricing:</strong> open the <a href="/profit-margin-calculator">profit margin calculator</a>, enter cost and price, and compare margin with markup before you publish the number. The calculation runs locally with no signup.</div>
`;

export const percentageMarkupMargin: BlogPost = {
  pillar: "percentage-calculator-guide",
  slug: "markup-vs-margin",
  kind: "cluster",
  title: "Markup vs Margin: Formula, Examples & Pricing",
  description:
    "Markup vs margin explained with formulas, a comparison table and worked pricing examples, the discount trap and a free margin calculator.",
  keywords: ["markup vs margin", "markup formula", "profit margin formula", "how to calculate markup", "margin vs markup pricing"],
  toolSlugs: ["profit-margin-calculator", "gst-calculator"],
  relatedSlugs: ["discount-and-sale-price", "percentage-increase-decrease"],
  published: "2026-10-22",
  updated: "2026-10-22",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "what-each-term-means", text: "What markup and margin measure", level: 2 },
    { id: "formulas-side-by-side", text: "The formulas side by side", level: 2 },
    { id: "worked-examples", text: "Worked examples", level: 2 },
    { id: "pricing-from-a-target-margin", text: "Pricing from a target margin", level: 2 },
    { id: "discounts-hit-margin-harder", text: "Why discounts hit margin harder", level: 2 },
    { id: "calculator", text: "Using the profit margin calculator", level: 2 },
  ],
  html,
  faqs: [
    { question: "What is the difference between markup and margin?", answer: "Margin divides profit by selling price; markup divides the same profit by cost. A 60 cost sold at 100 yields 40 profit, which is a 40% margin and a 66.67% markup. Margin shows the share of revenue retained, while markup shows the uplift applied to cost." },
    { question: "How do I convert markup to margin?", answer: "Add 1 to the markup as a decimal, then divide. A 66.67% markup is 0.6667 ÷ 1.6667 = 0.40, or 40% margin. For a 50% markup, 0.50 ÷ 1.50 = 0.3333, or 33.33% margin. The markup number is always larger when there is a profit." },
    { question: "How do I price for a 40% margin?", answer: "Divide the cost by one minus the target margin. If the cost is 60, the price is 60 ÷ 0.60 = 100. A 50% target would require 60 ÷ 0.50 = 120. Do not multiply cost by 1.40, which produces 84 and only a 28.57% margin." },
    { question: "Why does a 50% markup give only a 33% margin?", answer: "A 50% markup on 60 adds 30, producing a 90 price. Profit of 30 divided by the 90 price is 33.33%. The markup is measured against the smaller cost base, while margin is measured against the larger price base. The two rates cannot be equal unless profit is zero." },
    { question: "How much does a 10% discount reduce margin?", answer: "On a 60-cost, 100-price item, a 10% discount lowers the price to 90 and profit to 30. Margin falls from 40% to 33.33%, a drop of 6.67 percentage points. Profit falls 25% in dollar terms, so volume would need to rise 33.3% to recover the same gross profit." },
    { question: "Should I use margin or markup for pricing?", answer: "Use margin when you need to know how much of each sales dollar survives after direct cost, especially if you offer discounts or pay sales commissions. Use markup when building a price from a cost sheet or quote. Whichever you choose, label it clearly and convert before comparing products." },
  ],
};

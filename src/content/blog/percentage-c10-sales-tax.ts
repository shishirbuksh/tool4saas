import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>Sales tax looks like one multiplication: price x rate. The hard part is finding the rate. A state rate is only the first layer. Counties, cities and special districts can add their own percentages, some products are exempt, and the rate that applies depends on where the buyer receives the goods. The <a href="/us-sales-tax-calculator">US sales tax calculator</a> keeps the arithmetic simple: enter a taxable subtotal, choose one of five presets or a custom rate, and read the tax and total.</p>
<p>Part of the <a href="/blog/percentage-calculator-guide">percentage calculator guide</a>. The tool is deliberately small. It does not look up a ZIP code, itemize local layers or decide whether an item is taxable. It applies one rate to one subtotal and displays the result in USD. Those constraints are useful if you use the tool for what it actually does.</p>

<h2 id="formula">The formula and two worked examples</h2>
<p>Sales tax is a percentage of the taxable price:</p>
<ul>
<li><strong>Tax</strong> = taxable subtotal x rate / 100</li>
<li><strong>Total</strong> = taxable subtotal + tax</li>
</ul>
<p>A 100 dollar subtotal at 7.25 percent produces 7.25 in tax and 107.25 total. The same subtotal at 6.25 percent produces 6.25 and 106.25. At 8.875 percent, the tax is 8.875, displayed as 8.88, and the total is 108.875, displayed as 108.88. The unrounded value is used through the calculation; the display rounds to cents at the end.</p>
<p>Scaling up does not change the method. A 250 dollar subtotal at 7.25 percent produces 18.125 in tax, displayed as 18.13, and 268.125 total, displayed as 268.13. At 6.25 percent, the same cart produces 15.625 tax and 265.625 total, displayed as 15.63 and 265.63. If you are comparing two jurisdictions, use the same subtotal and the combined rate that actually applies to the ship-to address.</p>
<p>Here are the five presets on a 100 dollar taxable subtotal:</p>
<table>
<thead><tr><th>Preset</th><th>Rate</th><th>Tax</th><th>Total</th></tr></thead>
<tbody>
<tr><td>California</td><td>7.25%</td><td>7.25</td><td>107.25</td></tr>
<tr><td>New York City</td><td>8.875%</td><td>8.88</td><td>108.88</td></tr>
<tr><td>Texas</td><td>6.25%</td><td>6.25</td><td>106.25</td></tr>
<tr><td>Florida</td><td>6%</td><td>6.00</td><td>106.00</td></tr>
<tr><td>Washington</td><td>10.35%</td><td>10.35</td><td>110.35</td></tr>
</tbody>
</table>
<p>The presets are starting points, not a complete rate table. Rates change, and the local layers that apply to a particular delivery address are not included. Verify the current combined rate before quoting a customer or filing a return.</p>

<h2 id="combined">Why one combined rate is the right input</h2>
<p>Suppose the state rate is 6.25 percent, the county adds 1 percent and the city adds 0.5 percent. The combined rate is 7.75 percent. On a 120 dollar taxable subtotal, the tax is 120 x 0.0775 = 9.30 and the total is 129.30. The calculator does not need to know the three layers separately; it needs the combined percentage. Select Custom and enter 7.75.</p>
<p>That is also the tool's main limitation. It does not itemize state, county, city and district components, and it cannot tell you whether the layers apply to a specific product or address. If a receipt shows a state rate, a county rate and a transit district rate, add them yourself from an official source, then enter the combined figure. Keep the component rates in your notes so you can explain the quote later.</p>
<p>Do not add percentages to a base more than once. A common error is to apply 6.25 percent, then apply 1 percent to the result, then apply another 0.5 percent to the new result. That is compounding, not stacking. Sales tax layers are normally combined into one rate and applied once to the taxable price. The difference is small at these rates, but it grows with the subtotal and makes reconciliation harder.</p>

<h2 id="taxable">Start from the taxable subtotal</h2>
<p>The calculator taxes every dollar you enter. It has no exemption checklist and no product categories. If a basket contains 100 dollars of goods and 20 dollars of exempt groceries, enter 80, not 100. At 7.25 percent, the tax on 80 is 5.80 and the total is 85.80. That is different from taxing the full 100 and then trying to subtract the tax on the exempt portion.</p>
<p>Shipping and delivery charges are another state-specific question. Some jurisdictions tax delivery when the goods are taxable, some do not, and some treat separately stated charges differently. The tool cannot resolve that. Decide whether the charge belongs in the taxable subtotal under the rules for the destination, then enter the adjusted amount.</p>
<p>Resale certificates, agricultural exemptions and occasional sales tax holidays add more exceptions. The calculator is not a compliance system. It is a way to apply a known rate to a known taxable base. If the base is wrong, the output will be wrong even when the multiplication is perfect.</p>
<p>Destination sourcing matters for remote sales. A seller may collect based on the ship-to location rather than the warehouse. The page has no address field, so it cannot implement that rule. Look up the destination rate, decide whether the product is taxable, and then use the chosen rate in Custom.</p>

<h2 id="compare">Comparing states without mixing bases</h2>
<p>To compare two states, hold the taxable subtotal constant and change only the rate. A 250 dollar cart at 7.25 percent is 268.13; at 6.25 percent it is 265.63. The difference is 2.50, which is exactly 1 percentage point of 250. That is a useful sanity check: one percentage point on a 250 base is 2.50, before rounding.</p>
<p>A state-only comparison can mislead when local rates differ sharply. California's 7.25 percent preset excludes many local additions. The New York City preset at 8.875 percent is a combined state and city figure; the statewide base is lower and other localities differ. Washington's 10.35 percent is a high combined starting point, yet some jurisdictions produce a different figure. Treat each preset as a labeled assumption, not a quote for a specific address.</p>
<p>Use the same currency and the same subtotal for every comparison. The calculator displays USD only, which is appropriate for US sales tax but not for a cross-border VAT comparison. For a value-added tax, use the <a href="/gst-calculator">GST and VAT calculator</a> instead of forcing a sales tax model onto an invoice.</p>

<h2 id="workflow">A practical checkout workflow</h2>
<ol>
<li>Build the taxable subtotal. Remove exempt items and add taxable delivery charges only when the destination rules require it.</li>
<li>Find the combined rate for the ship-to location and product category from an official source.</li>
<li>Choose the matching preset if it is close, or select Custom and enter the exact combined rate.</li>
<li>Read the tax and total, then record the rate, the date and the source beside the quote.</li>
<li>Recheck the rate when the address, product mix or tax authority guidance changes.</li>
</ol>
<p>If the register total differs from the estimate, compare the taxable subtotal and the combined rate before assuming the calculator is broken. A missing local layer, an exempt item that was not removed or a delivery charge that was treated differently can explain the gap. The page shows one rate and two outputs, so there is no hidden district breakdown to inspect.</p>
<div class="cta-box"><strong>Apply a rate to a subtotal:</strong> open the <a href="/us-sales-tax-calculator">US sales tax calculator</a>, enter the taxable amount, and choose a preset or a combined custom rate. For percentage changes rather than tax, use the <a href="/percentage-calculator">percentage calculator</a>.</div>
`;

export const salesTaxPrice: BlogPost = {
  pillar: "percentage-calculator-guide",
  slug: "sales-tax-on-a-price",
  kind: "cluster",
  title: "Sales Tax on a Price: Formula and Examples",
  description:
    "Calculate sales tax from a subtotal and a combined rate, compare preset rates, and see why a register total can differ from a state-only estimate.",
  keywords: ["sales tax calculator", "sales tax formula", "calculate sales tax", "state sales tax rates", "combined sales tax rate", "price before tax"],
  toolSlugs: ["us-sales-tax-calculator"],
  relatedSlugs: ["percent-of-a-number", "reverse-percentage", "discount-and-sale-price"],
  published: "2026-10-23",
  updated: "2026-10-23",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "formula", text: "The formula and worked examples", level: 2 },
    { id: "combined", text: "Why one combined rate", level: 2 },
    { id: "taxable", text: "Start from the taxable subtotal", level: 2 },
    { id: "compare", text: "Comparing states", level: 2 },
    { id: "workflow", text: "A practical checkout workflow", level: 2 },
  ],
  html,
  faqs: [
    { question: "Does the calculator look up my rate by ZIP code?", answer: "No. It has no address or ZIP field. It applies the selected preset or the custom rate you enter to the subtotal. Look up the combined rate from an official source before using it for a quote or return." },
    { question: "Which rates are preset?", answer: "California at 7.25 percent, New York City at 8.875 percent, Texas at 6.25 percent, Florida at 6 percent and Washington at 10.35 percent. Choose Custom for another state or for a combined state, county and city rate." },
    { question: "Can I enter a combined local rate?", answer: "Yes. Select Custom and enter the combined percentage. The tool applies that single rate once. It does not itemize the state, county, city or district components." },
    { question: "Does it handle exemptions or shipping?", answer: "No. It taxes the full subtotal you enter. Remove exempt items first, and include delivery charges only when the destination rules make them taxable. The calculator does not know product categories." },
    { question: "Is the result tax advice?", answer: "No. It is arithmetic for planning. Rates, sourcing rules and product taxability vary by jurisdiction and change over time. Verify the current rule and consult a tax professional for filing or collection decisions." },
  ],
};

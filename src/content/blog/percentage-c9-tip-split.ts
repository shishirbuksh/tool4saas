import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>A restaurant bill is not one decision. You choose a gratuity rate, decide what amount the percentage applies to, and divide the result by the number of people. A tip calculator makes those steps visible, but only if you know what its fields do. The local <a href="/tip-calculator">tip calculator</a> takes a bill amount, a whole-number percentage from 0 to 30, a headcount and one of seven currencies. It returns the tip, the total and an equal per-person share.</p>
<p>Part of the <a href="/blog/percentage-calculator-guide">percentage calculator guide</a>. The tool has no tax field, no service-charge detector and no custom split. Those limits are not hidden, but they matter when a receipt includes tax, a mandatory gratuity or a shared appetizer.</p>

<h2 id="fields">What the four fields actually change</h2>
<p>The bill field is the base for the percentage. It accepts decimals and ignores negative values by falling back to zero. There is no separate sales-tax input, so the number you type is exactly the number the tip is calculated on. If you want to tip on the pre-tax subtotal, enter the subtotal. If you want to tip on the final charge, enter the final charge. The calculator will not infer either choice.</p>
<p>The tip slider runs from 0 to 30 in one-point steps. That means 15, 18 and 20 are available, while 18.5 is not. The value is stored as a whole number and the displayed label uses the same integer. A custom percentage would need a different tool or manual arithmetic.</p>
<p>The headcount field is parsed as an integer. A value such as 3.7 becomes 3, and a blank, zero or negative value becomes 1. The result is always an equal split; there is no way to assign a different share to one diner or to exclude someone from the total.</p>
<p>The currency menu lists USD, EUR, GBP, INR, JPY, CAD and AUD. Changing it changes the symbol and number formatting only. It does not convert the amount. A bill entered as 84.50 with EUR selected is still 84.50, now formatted as euros. JPY is displayed with no decimal places because of its normal currency formatting, so a per-person result can look more rounded than the same number in USD.</p>

<h2 id="formula">The formula behind the three results</h2>
<p>The arithmetic is short enough to check by hand:</p>
<ul>
<li><strong>Tip</strong> = bill x rate / 100</li>
<li><strong>Total</strong> = bill + tip</li>
<li><strong>Per person</strong> = total / headcount</li>
</ul>
<p>For an 84.50 bill at 18 percent with three people, the tip is 84.50 x 0.18 = 15.21. The total is 84.50 + 15.21 = 99.71. Each share is 99.71 / 3 = 33.2366..., displayed as 33.24. Raising the rate to 20 percent gives a 16.90 tip, a 101.40 total and a 33.80 share. The difference in the tip is 1.69, and the difference per person is 0.56.</p>
<p>Display rounding explains small inconsistencies. Three displayed shares of 33.24 add to 99.72, one cent more than the displayed 99.71 total. The underlying values are not rounded before division; the page rounds each formatted amount for display. If you are collecting cash, decide who absorbs the extra cent rather than treating the mismatch as a calculation error.</p>
<p>Here is the same 84.50 bill at four rates, with three diners:</p>
<table>
<thead><tr><th>Rate</th><th>Tip</th><th>Total</th><th>Each of 3</th></tr></thead>
<tbody>
<tr><td>15%</td><td>12.68</td><td>97.18</td><td>32.39</td></tr>
<tr><td>18%</td><td>15.21</td><td>99.71</td><td>33.24</td></tr>
<tr><td>20%</td><td>16.90</td><td>101.40</td><td>33.80</td></tr>
<tr><td>25%</td><td>21.13</td><td>105.63</td><td>35.21</td></tr>
</tbody>
</table>
<p>The 15 percent row shows the display effect clearly: 84.50 x 0.15 is 12.675, and 97.175 divided by three is 32.3916..., so the formatted values are 12.68, 97.18 and 32.39. The cents do not have to add back to the total after each line is rounded.</p>

<h2 id="tax">Pre-tax, post-tax and service charges</h2>
<p>Sales tax is not part of the calculation. If an 84.50 subtotal is taxed at 8 percent, the post-tax charge is 91.26. An 18 percent tip on the subtotal is 15.21; the same rate on the post-tax charge is 16.43. That is a 1.22 difference. Neither answer is universally correct. Customs vary by country and city, and some people tip on the pre-tax base while others round up from the final charge. Choose the base deliberately and apply the same rule when you compare rates.</p>
<p>A mandatory service charge is a different problem. If the receipt already includes an 18 percent service charge, adding another 18 percent tip on the full charge pays twice for the same service. The calculator cannot detect a service charge, so read the bill before entering the number. Some restaurants print a service charge and leave the tip line blank; others include both a service charge and a discretionary gratuity. The tool can split a total, but it cannot tell you what the total represents.</p>
<p>Delivery orders and counter service can invert the usual assumptions. A delivery fee is not a tip, and a counter-service order may not expect one. The calculator stays neutral: it applies the rate you choose to the amount you enter. Etiquette is outside its scope.</p>

<h2 id="split">Splitting the bill without false precision</h2>
<p>Equal splitting is the only mode. For a 100 bill at 15 percent, the tip is 15, the total is 115 and each of three pays 38.333..., displayed as 38.33. At 18 percent, the total is 118 and each share is 39.33. At 20 percent, the total is 120 and each share is exactly 40. At 25 percent, the total is 125 and each share is 41.67.</p>
<p>If one person pays the whole card charge and the others reimburse in cash, use the total as the amount to collect, not the sum of the rounded shares. If everyone pays separately, the payment processor may split the exact total and ignore the display rounding. The correct reconciliation depends on who is paying, not on the calculator.</p>
<p>Shared items do not change the math once the bill total is known. The tool does not track who ordered what, so an uneven split needs a manual adjustment after the equal share is calculated. For example, if one diner owes 10 more for a shared bottle, add that amount to their share and subtract it from another. Do that outside the tool and keep a note of the adjustment.</p>

<h2 id="workflow">A short workflow before you pay</h2>
<ol>
<li>Read the receipt and separate the subtotal, tax, service charge and any delivery fee.</li>
<li>Decide whether the tip applies to the pre-tax subtotal or the final charge.</li>
<li>Enter that amount in the bill field.</li>
<li>Move the slider to an available whole percentage and enter the number of people.</li>
<li>Select the currency that matches the bill. Remember that this is formatting, not conversion.</li>
<li>Compare two rates before committing, then use the total for payment and the per-person figure for reimbursement.</li>
</ol>
<p>For a quick sanity check, 10 percent of 84.50 is 8.45. A 20 percent tip is double that, or 16.90. An 18 percent tip sits slightly below 20 percent, at 15.21. If the displayed tip is far from that range, check whether the bill field contains the subtotal or the post-tax total.</p>
<div class="cta-box"><strong>Split the next bill:</strong> open the <a href="/tip-calculator">tip calculator</a>, enter the amount and headcount, and compare rates before paying. For the underlying percentage math, use the <a href="/percentage-calculator">percentage calculator</a>.</div>
`;

export const tipBillSplit: BlogPost = {
  pillar: "percentage-calculator-guide",
  slug: "tip-calculator-bill-split",
  kind: "cluster",
  title: "Tip Calculator: How to Split a Bill Fairly",
  description:
    "Use a tip calculator to apply a percentage, split the total by headcount and compare 15, 18 and 20 percent shares on the same bill.",
  keywords: ["tip calculator", "split bill", "how to calculate a tip", "restaurant bill split", "tip percentage", "gratuity calculator"],
  toolSlugs: ["tip-calculator"],
  relatedSlugs: ["percent-of-a-number", "discount-and-sale-price", "percentage-increase-decrease"],
  published: "2026-10-23",
  updated: "2026-10-23",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "fields", text: "What the four fields change", level: 2 },
    { id: "formula", text: "The formula behind the results", level: 2 },
    { id: "tax", text: "Pre-tax, post-tax and service charges", level: 2 },
    { id: "split", text: "Splitting the bill", level: 2 },
    { id: "workflow", text: "A short payment workflow", level: 2 },
  ],
  html,
  faqs: [
    { question: "Does the calculator add sales tax?", answer: "No. There is no tax field. It applies the selected percentage to the number in the bill field. Enter the pre-tax subtotal if you want to tip on that base, or the post-tax total if you prefer to tip on the final charge." },
    { question: "Can I enter 18.5 percent?", answer: "No. The slider moves in one-point steps from 0 to 30, so 18 and 19 are available but 18.5 is not. Use the closest whole rate or calculate the exact gratuity separately." },
    { question: "Does it support an uneven split?", answer: "No. The headcount field divides the total equally and truncates decimals in the headcount. Adjust individual shares outside the tool if one person owes more for a shared item." },
    { question: "Does changing the currency convert the amount?", answer: "No. USD, EUR, GBP, INR, JPY, CAD and AUD change the symbol and formatting only. The numeric amount stays the same, so convert the bill first if you need a different currency." },
    { question: "Is the bill or result stored?", answer: "No. The calculation runs in the page, with no account and no history. Closing the page clears the entries. Keep the receipt or a separate note if you need a record." },
  ],
};

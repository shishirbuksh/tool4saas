import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>Credit card debt behaves differently from a fixed installment loan. The balance revolves, the APR is usually high, the minimum is usually small, and new purchases can quietly undo a month of progress. A payoff plan for cards has to deal with all four facts, not just the repayment order.</p>
<p>This guide covers the order to pay cards, how APR and minimums interact, why stopping new charges matters, and what to check before considering a balance transfer. The <a href="/debt-payoff-calculator">debt payoff calculator</a> runs the numbers, and the <a href="/blog/debt-payoff-guide">full debt payoff guide</a> explains the snowball and avalanche methods in more depth.</p>

<h2 id="why-cards-are-different">Why credit card debt needs its own plan</h2>
<p>APR is the yearly cost of borrowing expressed as a rate. For a rough monthly cost, divide the APR by 12 and multiply by the balance. A card charging 26% APR costs about 2.17% of the balance in interest each month. On a $3,200 balance, that is roughly $69 in the first month before any payment.</p>
<p>Interest is charged on the balance that remains, so the cost falls as the balance falls. That makes every extra dollar of principal reduction more valuable over time. It also means the order of payments can matter more on cards than on a mix of low-rate loans.</p>
<p>The minimum payment is usually a small percentage of the balance, a flat floor, or whichever is greater. It is recalculated as the balance changes, so it tends to shrink at the same time the balance does. Left alone, this can stretch a payoff across many years while the account stays in good standing.</p>

<h2 id="payoff-order">Choosing a credit card payoff order</h2>
<p>Avalanche ranks cards by APR, highest first. Snowball ranks them by balance, smallest first. Both keep every minimum current and send the remaining pool to one priority card. The difference is which card stops charging interest first.</p>
<p>If two cards have similar rates, the interest difference between the orders is small, and the smallest-balance-first approach may be easier to sustain. If one card charges a much higher rate, avalanche usually saves more interest for the same monthly payment, assuming fixed rates and no new charges.</p>
<p>What usually does not work is splitting the extra amount evenly across every card. Spreading the surplus dilutes the focus. The freed minimum from a cleared card is worth more when it lands on a single priority balance.</p>

<h2 id="minimum-payment-mechanics">What a minimum payment really covers</h2>
<p>Take a card with a $5,000 balance at 24% APR. The monthly periodic rate is 2%, so the first month charges $100 of interest. A $150 minimum pays the interest and reduces principal by $50. Next month interest is calculated on $4,950, so the interest is still close to $100.</p>
<p>The calculator asks for a fixed dollar minimum to keep the simulation deterministic. Real issuers may recalculate the minimum as the balance falls, so the output is an approximation. Enter the current minimum and rerun the plan when it changes.</p>
<p>The tool also flags a plan that cannot pay off. If the monthly pool is not larger than the monthly interest, the balance does not fall reliably. A high APR with a small minimum and no extra payment is the usual cause. The <a href="/blog/debt-payoff-guide/minimum-payment-trap">minimum payment trap</a> explains the mechanics in detail.</p>

<h2 id="example-one-avalanche">Example 1: avalanche across three cards</h2>
<p>The example uses three cards. Card A has a $900 balance at 24% APR with a $35 minimum. Card B has a $3,200 balance at 26% APR with an $80 minimum. Card C has a $1,400 balance at 19% APR with a $45 minimum. The extra payment is $150, so the monthly pool is $35 + $80 + $45 + $150 = $310.</p>
<table>
<thead><tr><th>Card</th><th>Balance</th><th>APR</th><th>Minimum</th><th>Avalanche order</th><th>Snowball order</th></tr></thead>
<tbody>
<tr><td><strong>Card A</strong></td><td>$900</td><td>24%</td><td>$35</td><td>2nd</td><td>1st</td></tr>
<tr><td><strong>Card B</strong></td><td>$3,200</td><td>26%</td><td>$80</td><td>1st</td><td>3rd</td></tr>
<tr><td><strong>Card C</strong></td><td>$1,400</td><td>19%</td><td>$45</td><td>3rd</td><td>2nd</td></tr>
<tr><td><strong>Total</strong></td><td>$5,500</td><td>—</td><td>$160</td><td>—</td><td>—</td></tr>
</tbody>
</table>
<p>Month one interest is $18 on Card A, about $69.33 on Card B and about $22.17 on Card C, for roughly $109.50. Avalanche sends $230 to Card B: its $80 minimum and the $150 extra. Card A receives $35 and Card C receives $45. Card B clears in month 17, Card A in month 19 and Card C in month 22. Total interest is $1,300.74, so total paid is $5,500 + $1,300.74 = $6,800.74.</p>

<h2 id="example-two-snowball">Example 2: snowball across the same cards</h2>
<p>The snowball run uses the same three cards and the same $310 pool. Month one sends $185 to Card A: its $35 minimum and the $150 extra. Card B receives $80 and Card C receives $45. The month-one interest is the same $109.50.</p>
<p>Card A clears in month 6, Card C in month 12 and Card B in month 23. Total interest is $1,411.71, so total paid is $5,500 + $1,411.71 = $6,911.71. Compared with avalanche, snowball costs $110.97 more and finishes one month later, but the first cleared card arrives at month 6 instead of month 17.</p>

<h2 id="stop-new-charges">Stopping new charges is part of the payoff</h2>
<p>A payoff plan fails when new spending replaces the principal being paid down. Consider a single $3,200 card at 26%. First-month interest is about $69.33. A payment of $230, made of an $80 minimum and a $150 extra, reduces principal by about $160.67. Add $160 of new charges and the net reduction is close to zero.</p>
<p>The practical steps are simple even when they feel uncomfortable: stop saving the card details for easy checkout, remove stored cards from shopping apps, set autopay for the minimums so a missed payment cannot raise the APR, and give recurring bills a different payment method. A card used only for planned purchases that are paid in full is a budgeting tool. A card used to cover a shortfall is new debt.</p>
<p>If essentials are landing on the card every month, the budget needs attention before the payoff order does. The arithmetic cannot fix a cash-flow gap.</p>

<h2 id="balance-transfer-caveats">Balance transfer caveats to check first</h2>
<p>A balance transfer can move debt to a card with a lower promotional rate, but the details decide whether it helps. Check the transfer fee, which is usually a percentage of the amount moved. Check how long the promotional window lasts and what rate applies after it ends. Check whether new purchases are covered or charged at a different rate.</p>
<p>Minimum payments are still required during a promotional period, and a missed payment can end the promotion or trigger a penalty rate. Approval is not guaranteed, and the credit limit offered may be lower than the amount you hoped to move. Moving only part of a balance leaves the plan split across accounts.</p>
<p>Utilization also matters. A transfer can raise the balance on the new card relative to its limit, and closing the old account removes available credit from the calculation. Both effects can change how the balances look to a scoring model. The calculator does not model transfers or credit scores. The <a href="/blog/debt-payoff-guide/debt-consolidation-vs-payoff">consolidation comparison</a> weighs transfers and loans against plain payoff.</p>

<h2 id="statement-vs-due-date">Statement date, due date and utilization</h2>
<p>The statement date is when the issuer takes a snapshot of the account, and the statement balance is what appears on that snapshot. The due date is when the payment must arrive. They are different dates with different consequences, and issuer rules vary.</p>
<p>Paying before the statement date can reduce the balance the issuer reports, which can lower measured utilization. The effect depends on reporting timing and how a particular score is calculated. What matters for interest is usually the statement balance and whether you carried a balance from the prior month. Read the card agreement rather than relying on a rule of thumb.</p>
<p>Utilization is the relationship between reported balances and credit limits. Paying down cards can improve it over time, but the payoff calculator does not include it. Treat the simulated debt-free date as a repayment estimate, not a credit-score forecast.</p>

<h2 id="putting-it-together">Putting the plan together</h2>
<p>List every card with its balance, APR and current minimum. Pick one order, avalanche for interest or snowball for momentum, and send the extra to a single card. Keep the minimums on autopay, stop new charges, and hold a small buffer outside the pool. Rerun the simulation when a rate or minimum changes.</p>
<p>The <a href="/blog/debt-payoff-guide/snowball-vs-avalanche">snowball vs avalanche comparison</a> shows both orders on one debt set, and the <a href="/blog/debt-payoff-guide/debt-avalanche-method">avalanche method walkthrough</a> turns the order into a step-by-step routine.</p>
<div class="cta-box"><strong>Plan your card payoff:</strong> open the <a href="/debt-payoff-calculator">debt payoff calculator</a>, add each card balance, APR and minimum, then set an extra amount. Switch between snowball and avalanche to see months, total interest and a debt-free date. The tool does not negotiate debts, move balances or promise approvals.</div>
`;

export const debtCreditCard: BlogPost = {
  pillar: "debt-payoff-guide",
  slug: "how-to-pay-off-credit-card-debt",
  kind: "cluster",
  title: "How to Pay Off Credit Card Debt: Order, APR and Minimums",
  description:
    "Choose a credit card payoff order, understand APR and minimums, stop new charges, and check balance-transfer caveats before you commit.",
  keywords: ["how to pay off credit card debt", "credit card payoff order", "credit card minimum payment", "credit card apr explained", "balance transfer caveats", "stop using credit cards"],
  toolSlugs: ["debt-payoff-calculator"],
  relatedSlugs: ["minimum-payment-trap", "debt-consolidation-vs-payoff", "snowball-vs-avalanche"],
  published: "2026-10-22",
  updated: "2026-10-22",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "why-cards-are-different", text: "Why credit card debt needs its own plan", level: 2 },
    { id: "payoff-order", text: "Choosing a credit card payoff order", level: 2 },
    { id: "minimum-payment-mechanics", text: "What a minimum payment really covers", level: 2 },
    { id: "example-one-avalanche", text: "Example 1: avalanche across three cards", level: 2 },
    { id: "example-two-snowball", text: "Example 2: snowball across the cards", level: 2 },
    { id: "stop-new-charges", text: "Stopping new charges", level: 2 },
    { id: "balance-transfer-caveats", text: "Balance transfer caveats", level: 2 },
    { id: "statement-vs-due-date", text: "Statement date, due date and utilization", level: 2 },
    { id: "putting-it-together", text: "Putting the plan together", level: 2 },
  ],
  html,
  faqs: [
    { question: "Should I pay the smallest card or the highest APR first?", answer: "Avalanche pays the highest APR first and usually costs less interest. Snowball pays the smallest balance first and usually produces an earlier cleared card. In the three-card example, avalanche cost $1,300.74 in interest and snowball cost $1,411.71, while snowball cleared the first card six months sooner. Pick the order you will maintain and rerun both in the calculator." },
    { question: "How is a credit card minimum payment calculated?", answer: "Issuers commonly set the minimum as a small percentage of the balance, a flat floor, or whichever is greater, and recalculate it as the balance falls. The exact formula is in your card agreement. The payoff calculator accepts a fixed dollar minimum, so treat its output as an estimate and update the figure when your issuer changes it." },
    { question: "Does paying before the statement date reduce interest?", answer: "It can reduce the balance the issuer reports, which may lower measured utilization. Whether it reduces interest depends on the statement balance, any balance carried from the prior month and the grace-period terms in your agreement. Paying before the due date is what avoids a late payment. Read the card agreement for the rules that apply to your account." },
    { question: "Is a balance transfer a good way to pay off cards?", answer: "It can help if the lower rate lasts long enough and the transfer fee is small relative to the interest saved, but no transfer is guaranteed to be approved or to cover the full balance. Check the fee, the promotional window, the rate afterward, whether purchases are covered and what a missed payment does. A transfer does not fix the spending that created the debt, and the calculator does not model it." },
    { question: "How much extra should I pay each month?", answer: "Start with an amount that fits the budget after essentials and a small emergency buffer. In the three-card example, $150 extra cut the timeline to 22 months under avalanche. More extra money usually shortens the timeline; the right amount is the largest one you can sustain without borrowing again. Rerun the calculator with a few extra amounts before committing." },
    { question: "Is this credit card payoff guide financial advice?", answer: "No. This is general information, not financial advice. It explains how APR, minimums and payment order interact, but it does not know your income, obligations or credit situation. It does not negotiate debts, move balances or promise approvals. For decisions about transfers, consolidation or a specific account, consult a qualified professional." },
  ],
};

<x-card class="p-6 md:p-8" x-data="{
    balance: 15000,
    rate: 18.0,
    monthlyPayment: 500,
    init() {
        const params = new URLSearchParams(window.location.search);
        if (params.has('balance')) {
            const val = parseFloat(params.get('balance'));
            if (!isNaN(val) && val > 0) this.balance = val;
        }
        if (params.has('rate')) {
            const val = parseFloat(params.get('rate'));
            if (!isNaN(val) && val >= 0) this.rate = val;
        }
        if (params.has('payment') || params.has('monthlyPayment')) {
            const val = parseFloat(params.get('payment') || params.get('monthlyPayment'));
            if (!isNaN(val) && val > 0) this.monthlyPayment = val;
        }
    },
    setScenario(b, r, p) {
        this.balance = b;
        this.rate = r;
        this.monthlyPayment = p;
    },
    get payoff() {
        let b = parseFloat(this.balance) || 0;
        const r = (parseFloat(this.rate) || 0) / 100 / 12;
        const pmt = parseFloat(this.monthlyPayment) || 0;

        if (b * r >= pmt) return { error: 'Payment is too low to cover monthly interest' };
        
        let months = 0;
        let totalInterest = 0;
        while (b > 0 && months < 360) {
            const int = b * r;
            totalInterest += int;
            b -= (pmt - int);
            months++;
        }
        return {
            months,
            years: (months / 12).toFixed(1),
            totalInterest: Math.round(totalInterest),
            totalPaid: Math.round((parseFloat(this.balance) || 0) + totalInterest)
        };
    }
}">
    <div class="space-y-6">
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-2 text-base-content/70">Total Debt Balance ($)</label>
                <input aria-label="Total Debt Balance ($)" type="number" min="100" step="500" x-model="balance" class="input input-bordered w-full rounded-[12px] font-bold text-base" />
            </div>

            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-2 text-base-content/70">Interest Rate APR (%)</label>
                <input aria-label="Interest Rate APR (%)" type="number" min="0" max="40" step="0.5" x-model="rate" class="input input-bordered w-full rounded-[12px] font-bold text-base" />
            </div>

            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-2 text-base-content/70">Monthly Budget ($)</label>
                <input aria-label="Monthly Budget ($)" type="number" min="10" step="50" x-model="monthlyPayment" class="input input-bordered w-full rounded-[12px] font-bold text-base" />
            </div>
        </div>

        {{-- Quick Scenario Presets --}}
        <div>
            <span class="text-xs font-bold text-base-content/60 block mb-2 uppercase tracking-wider font-mono">Common Debt Payoff Scenarios</span>
            <div class="flex flex-wrap gap-2">
                <button type="button" @click="setScenario(5000, 22.0, 250)" class="px-3.5 py-1.5 rounded-full bg-base-200 border border-base-300 text-xs font-semibold hover:border-primary hover:bg-[#e2f6d5] transition-all">$5k Card @ 22% ($250/mo)</button>
                <button type="button" @click="setScenario(10000, 19.9, 350)" class="px-3.5 py-1.5 rounded-full bg-base-200 border border-base-300 text-xs font-semibold hover:border-primary hover:bg-[#e2f6d5] transition-all">$10k Card @ 19.9% ($350/mo)</button>
                <button type="button" @click="setScenario(15000, 18.0, 500)" class="px-3.5 py-1.5 rounded-full bg-base-200 border border-base-300 text-xs font-semibold hover:border-primary hover:bg-[#e2f6d5] transition-all">$15k Card @ 18% ($500/mo)</button>
                <button type="button" @click="setScenario(25000, 12.0, 600)" class="px-3.5 py-1.5 rounded-full bg-base-200 border border-base-300 text-xs font-semibold hover:border-primary hover:bg-[#e2f6d5] transition-all">$25k Personal Loan @ 12% ($600/mo)</button>
                <button type="button" @click="setScenario(35000, 6.5, 400)" class="px-3.5 py-1.5 rounded-full bg-base-200 border border-base-300 text-xs font-semibold hover:border-primary hover:bg-[#e2f6d5] transition-all">$35k Student Loan @ 6.5% ($400/mo)</button>
            </div>
        </div>

        <template x-if="payoff.error">
            <div class="alert alert-error rounded-[16px]">
                <span x-text="payoff.error"></span>
            </div>
        </template>

        <template x-if="!payoff.error">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div class="p-6 rounded-[20px] bg-[#163300] text-white">
                    <span class="text-xs uppercase tracking-widest text-[#9fe870] font-bold font-mono">Time to Debt-Free</span>
                    <p class="font-mono text-4xl font-extrabold mt-2 text-[#9fe870]" x-text="payoff.months + ' Months (' + payoff.years + ' yrs)'"></p>
                    <p class="text-xs text-white/70 mt-2">Expected date of total debt elimination.</p>
                </div>

                <div class="p-6 rounded-[20px] bg-base-200/50 border border-base-300">
                    <span class="text-xs uppercase tracking-widest text-base-content/60 font-bold font-mono">Total Cumulative Interest</span>
                    <p class="font-mono text-4xl font-extrabold mt-2 text-error" x-text="'$' + payoff.totalInterest.toLocaleString()"></p>
                    <p class="text-xs text-base-content/60 mt-2" x-text="'Total money paid: $' + payoff.totalPaid.toLocaleString()"></p>
                </div>
            </div>
        </template>

        {{-- Technical Comparison: Debt Payoff Strategies Matrix --}}
        <div class="mt-8 pt-6 border-t border-base-300">
            <h3 class="font-bold text-base sm:text-lg text-base-content font-display mb-4">
                Debt Snowball vs. Debt Avalanche vs. Debt Consolidation Strategy Matrix
            </h3>
            <div class="overflow-x-auto rounded-3xl border border-base-300">
                <table class="table table-zebra w-full text-xs sm:text-sm">
                    <thead class="bg-base-200 text-base-content/70 uppercase text-[11px] font-mono">
                        <tr>
                            <th>Payoff Strategy</th>
                            <th>Priority Ordering</th>
                            <th>Total Interest Savings</th>
                            <th>Psychological Motivation</th>
                            <th>Best Suited For</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="font-bold font-mono text-[#163300] dark:text-[#9fe870]">Debt Avalanche</td>
                            <td>Highest APR interest rate first</td>
                            <td class="font-bold text-success font-mono">Maximum (Mathematically optimal)</td>
                            <td>Moderate (Requires sustained discipline)</td>
                            <td>Analytical borrowers with high-APR credit cards</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-[#163300] dark:text-[#9fe870]">Debt Snowball</td>
                            <td>Smallest principal balance first</td>
                            <td class="font-mono">Moderate (Pays more total interest)</td>
                            <td class="font-bold text-success">Highest (Fast early quick wins)</td>
                            <td>Borrowers needing emotional momentum &amp; habit building</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">0% Balance Transfer Card</td>
                            <td>Transfer multiple balances to 0% intro APR</td>
                            <td class="font-mono text-success">Very High (If paid in 12–21 mos)</td>
                            <td>High (Single consolidated payment)</td>
                            <td>Good credit scores (690+) with high short-term cash flow</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">Fixed Personal Loan</td>
                            <td>Consolidate unsecured debts into 1 fixed term</td>
                            <td class="font-mono">Substantial (7–12% vs 24%+ credit card)</td>
                            <td>High (Predetermined debt-free date)</td>
                            <td>Borrowers with credit score 660+ and fixed income</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</x-card>

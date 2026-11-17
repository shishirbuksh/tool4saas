<x-card class="p-6 md:p-8" x-data="{
    loanBalance: 300000,
    currentRate: 7.0,
    newRate: 5.5,
    tenureYears: 30,
    closingCosts: 5000,
    init() {
        const params = new URLSearchParams(window.location.search);
        if (params.has('balance')) this.loanBalance = parseFloat(params.get('balance')) || this.loanBalance;
        if (params.has('current')) this.currentRate = parseFloat(params.get('current')) || this.currentRate;
        if (params.has('new')) this.newRate = parseFloat(params.get('new')) || this.newRate;
        if (params.has('tenure')) this.tenureYears = parseInt(params.get('tenure'), 10) || this.tenureYears;
        if (params.has('costs')) this.closingCosts = parseFloat(params.get('costs')) || this.closingCosts;
    },
    setPreset(balance, current, newR, tenure, costs) {
        this.loanBalance = balance;
        this.currentRate = current;
        this.newRate = newR;
        this.tenureYears = tenure;
        this.closingCosts = costs;
    },
    calcPmt(p, ratePct, years) {
        const r = (ratePct / 100) / 12;
        const n = years * 12;
        if (r === 0) return p / n;
        return (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    },
    get currentPayment() {
        return this.calcPmt(parseFloat(this.loanBalance) || 0, parseFloat(this.currentRate) || 0, parseInt(this.tenureYears) || 30);
    },
    get newPayment() {
        return this.calcPmt(parseFloat(this.loanBalance) || 0, parseFloat(this.newRate) || 0, parseInt(this.tenureYears) || 30);
    },
    get monthlySavings() {
        return Math.max(0, this.currentPayment - this.newPayment);
    },
    get breakEvenMonths() {
        if (this.monthlySavings <= 0) return 0;
        return Math.ceil((parseFloat(this.closingCosts) || 0) / this.monthlySavings);
    }
}">
    <div class="space-y-6">
        {{-- Quick Scenario Chips --}}
        <div>
            <span class="text-xs font-bold uppercase tracking-wider text-base-content/60 font-mono block mb-2">Popular Refinance Scenarios:</span>
            <div class="flex flex-wrap gap-2">
                <button type="button" @click="setPreset(300000, 7.0, 5.5, 30, 5000)" class="btn btn-xs rounded-full border border-base-300 bg-base-100 hover:bg-primary/20 font-mono">
                    7.0% ➔ 5.5% ($300k / $5k Costs)
                </button>
                <button type="button" @click="setPreset(400000, 6.5, 5.0, 30, 6000)" class="btn btn-xs rounded-full border border-base-300 bg-base-100 hover:bg-primary/20 font-mono">
                    6.5% ➔ 5.0% ($400k / $6k Costs)
                </button>
                <button type="button" @click="setPreset(200000, 7.5, 6.0, 20, 3000)" class="btn btn-xs rounded-full border border-base-300 bg-base-100 hover:bg-primary/20 font-mono">
                    7.5% ➔ 6.0% ($200k / $3k Costs)
                </button>
                <button type="button" @click="setPreset(300000, 6.5, 4.75, 15, 4000)" class="btn btn-xs rounded-full border border-base-300 bg-base-100 hover:bg-primary/20 font-mono">
                    15-Yr Pivot (6.5% 30-Yr ➔ 4.75% 15-Yr)
                </button>
            </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-1 text-base-content/70">Remaining Principal ($)</label>
                <input type="number" min="10000" step="5000" x-model="loanBalance" class="input input-bordered w-full rounded-[12px] font-bold text-sm" />
            </div>
            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-1 text-base-content/70">Current Interest Rate (%)</label>
                <input type="number" min="1" max="15" step="0.1" x-model="currentRate" class="input input-bordered w-full rounded-[12px] font-bold text-sm" />
            </div>
            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-1 text-base-content/70">New Refinance Rate (%)</label>
                <input type="number" min="1" max="15" step="0.1" x-model="newRate" class="input input-bordered w-full rounded-[12px] font-bold text-sm" />
            </div>
            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-1 text-base-content/70">Closing Costs ($)</label>
                <input type="number" min="0" step="500" x-model="closingCosts" class="input input-bordered w-full rounded-[12px] font-bold text-sm" />
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div class="p-6 rounded-[20px] bg-[#163300] text-white">
                <span class="text-xs uppercase tracking-widest text-[#9fe870] font-bold font-mono">Monthly Cash Flow Savings</span>
                <p class="font-mono text-4xl font-extrabold mt-2 text-[#9fe870]" x-text="'$' + Math.round(monthlySavings).toLocaleString() + '/mo'"></p>
                <p class="text-xs text-white/70 mt-2" x-text="'Drops from $' + Math.round(currentPayment) + ' to $' + Math.round(newPayment) + ' per month.'"></p>
            </div>

            <div class="p-6 rounded-[20px] bg-base-200/50 border border-base-300">
                <span class="text-xs uppercase tracking-widest text-base-content/60 font-bold font-mono">Closing Costs Break-Even Point</span>
                <p class="font-mono text-4xl font-extrabold mt-2 text-primary" x-text="breakEvenMonths + ' Months'"></p>
                <p class="text-xs text-base-content/60 mt-2" x-text="'Refinancing pays for itself in ' + (breakEvenMonths / 12).toFixed(1) + ' years.'"></p>
            </div>
        </div>

        {{-- Technical Comparison: Mortgage Refinancing Structures Matrix --}}
        <div class="mt-8 pt-6 border-t border-base-300">
            <h3 class="font-bold text-base sm:text-lg text-base-content font-display mb-4">
                Mortgage Refinancing Types: Rate-and-Term vs. Cash-Out vs. Streamline Matrix
            </h3>
            <div class="overflow-x-auto rounded-3xl border border-base-300">
                <table class="table table-zebra w-full text-xs sm:text-sm">
                    <thead class="bg-base-200 text-base-content/70 uppercase text-[11px] font-mono">
                        <tr>
                            <th>Refinance Type</th>
                            <th>Primary Financial Goal</th>
                            <th>Typical Closing Costs</th>
                            <th>Appraisal &amp; Underwriting</th>
                            <th>Break-Even Viability Rule</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="font-bold font-mono text-primary">Rate-and-Term Refinance</td>
                            <td>Lower monthly interest rate or switch 30-yr to 15-yr</td>
                            <td class="font-mono">2% – 5% of loan balance ($3k–$8k)</td>
                            <td>Standard full appraisal + income verification</td>
                            <td class="font-bold text-success">Viable if staying in home &gt; break-even months (usually 2–3 yrs)</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-primary">Cash-Out Refinance</td>
                            <td>Liquidate accumulated home equity for home improvements/debt</td>
                            <td class="font-mono">3% – 5% (Often rolled into new principal)</td>
                            <td>Strict full appraisal (Capped at 80% LTV maximum)</td>
                            <td>Viable if reinvestment ROI exceeds mortgage interest rate</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">FHA / VA Streamline</td>
                            <td>Speedy rate reduction for existing government-backed loans</td>
                            <td class="font-mono text-success font-bold">1% – 2% (Ultra low cost)</td>
                            <td class="text-success font-semibold">No appraisal, no income verification required</td>
                            <td class="text-success font-semibold">Instant break-even (Requires net tangible benefit)</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">Shortened Term (30y → 15y)</td>
                            <td>Drastically cut total cumulative lifetime interest charges</td>
                            <td class="font-mono">Standard 2% – 4%</td>
                            <td>Full underwriting (Requires higher monthly payment qualification)</td>
                            <td>Saves $100,000+ in interest; higher monthly cash obligation</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</x-card>

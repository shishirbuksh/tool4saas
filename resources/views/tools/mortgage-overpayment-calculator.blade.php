<x-card class="p-6 md:p-8" x-data="{
    loanAmount: 250000,
    interestRate: 6.0,
    tenureYears: 25,
    extraMonthly: 200,
    init() {
        const params = new URLSearchParams(window.location.search);
        if (params.has('loan')) this.loanAmount = parseFloat(params.get('loan')) || this.loanAmount;
        if (params.has('rate')) this.interestRate = parseFloat(params.get('rate')) || this.interestRate;
        if (params.has('tenure')) this.tenureYears = parseInt(params.get('tenure'), 10) || this.tenureYears;
        if (params.has('extra')) this.extraMonthly = parseFloat(params.get('extra')) || this.extraMonthly;
    },
    setPreset(loan, rate, tenure, extra) {
        this.loanAmount = loan;
        this.interestRate = rate;
        this.tenureYears = tenure;
        this.extraMonthly = extra;
    },
    calcEmi(p, rPct, yrs) {
        const r = (rPct / 100) / 12;
        const n = yrs * 12;
        if (r === 0) return p / n;
        return (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    },
    get standardEmi() {
        return this.calcEmi(parseFloat(this.loanAmount) || 0, parseFloat(this.interestRate) || 0, parseInt(this.tenureYears) || 25);
    },
    get simulation() {
        const p0 = parseFloat(this.loanAmount) || 0;
        const r = (parseFloat(this.interestRate) || 0) / 100 / 12;
        const stdPmt = this.standardEmi;
        const extra = parseFloat(this.extraMonthly) || 0;
        const totalPmt = stdPmt + extra;

        let bal1 = p0;
        let totalIntStd = 0;
        for (let i = 0; i < this.tenureYears * 12; i++) {
            const int = bal1 * r;
            totalIntStd += int;
            bal1 -= (stdPmt - int);
            if (bal1 <= 0) break;
        }

        let bal2 = p0;
        let totalIntNew = 0;
        let months = 0;
        while (bal2 > 0 && months < this.tenureYears * 12) {
            const int = bal2 * r;
            totalIntNew += int;
            bal2 -= (totalPmt - int);
            months++;
        }

        const yearsSaved = Math.max(0, ((this.tenureYears * 12 - months) / 12).toFixed(1));
        const interestSaved = Math.max(0, Math.round(totalIntStd - totalIntNew));

        return { yearsSaved, interestSaved, newMonths: months };
    }
}">
    <div class="space-y-6">
        {{-- Quick Scenario Chips --}}
        <div>
            <span class="text-xs font-bold uppercase tracking-wider text-base-content/60 font-mono block mb-2">Popular Overpayment Strategies:</span>
            <div class="flex flex-wrap gap-2">
                <button type="button" @click="setPreset(250000, 6.0, 25, 100)" class="btn btn-xs rounded-full border border-base-300 bg-base-100 hover:bg-primary/20 font-mono">
                    +$100/mo ($250k @ 6.0% 25 Yrs)
                </button>
                <button type="button" @click="setPreset(300000, 6.5, 30, 200)" class="btn btn-xs rounded-full border border-base-300 bg-base-100 hover:bg-primary/20 font-mono">
                    +$200/mo ($300k @ 6.5% 30 Yrs)
                </button>
                <button type="button" @click="setPreset(400000, 6.5, 30, 500)" class="btn btn-xs rounded-full border border-base-300 bg-base-100 hover:bg-primary/20 font-mono">
                    +$500/mo ($400k @ 6.5% 30 Yrs)
                </button>
                <button type="button" @click="setPreset(500000, 7.0, 30, 1000)" class="btn btn-xs rounded-full border border-base-300 bg-base-100 hover:bg-primary/20 font-mono">
                    +$1,000/mo Aggressive ($500k @ 7.0%)
                </button>
            </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-1 text-base-content/70">Loan Principal ($)</label>
                <input type="number" min="10000" step="10000" x-model="loanAmount" class="input input-bordered w-full rounded-[12px] font-bold text-sm" />
            </div>
            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-1 text-base-content/70">Interest Rate (%)</label>
                <input type="number" min="1" max="15" step="0.1" x-model="interestRate" class="input input-bordered w-full rounded-[12px] font-bold text-sm" />
            </div>
            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-1 text-base-content/70">Loan Term (Years)</label>
                <input type="number" min="5" max="35" step="5" x-model="tenureYears" class="input input-bordered w-full rounded-[12px] font-bold text-sm" />
            </div>
            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-1 text-base-content/70">Extra Monthly Payment ($)</label>
                <input type="number" min="0" step="50" x-model="extraMonthly" class="input input-bordered w-full rounded-[12px] font-bold text-sm" />
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div class="p-6 rounded-[20px] bg-[#163300] text-white">
                <span class="text-xs uppercase tracking-widest text-[#9fe870] font-bold font-mono">Total Interest Saved</span>
                <p class="font-mono text-4xl font-extrabold mt-2 text-[#9fe870]" x-text="'$' + simulation.interestSaved.toLocaleString()"></p>
                <p class="text-xs text-white/70 mt-2">Money saved directly on mortgage financing charges.</p>
            </div>

            <div class="p-6 rounded-[20px] bg-base-200/50 border border-base-300">
                <span class="text-xs uppercase tracking-widest text-base-content/60 font-bold font-mono">Time Saved on Loan</span>
                <p class="font-mono text-4xl font-extrabold mt-2 text-primary" x-text="simulation.yearsSaved + ' Years Earlier'"></p>
                <p class="text-xs text-base-content/60 mt-2" x-text="'Paid off in ' + (simulation.newMonths / 12).toFixed(1) + ' years instead of ' + tenureYears + ' years.'"></p>
            </div>
        </div>

        {{-- Technical Comparison: Mortgage Prepayment Strategies Matrix --}}
        <div class="mt-8 pt-6 border-t border-base-300">
            <h3 class="font-bold text-base sm:text-lg text-base-content font-display mb-4">
                Mortgage Overpayment Strategies: Monthly Extra vs. Lump Sum vs. Bi-Weekly Payments Matrix
            </h3>
            <div class="overflow-x-auto rounded-3xl border border-base-300">
                <table class="table table-zebra w-full text-xs sm:text-sm">
                    <thead class="bg-base-200 text-base-content/70 uppercase text-[11px] font-mono">
                        <tr>
                            <th>Prepayment Technique</th>
                            <th>Payment Mechanics</th>
                            <th>Amortization Impact</th>
                            <th>Lender Penalty Risk</th>
                            <th>Cash Flow Flexibility</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="font-bold font-mono text-primary">Monthly Extra Principal</td>
                            <td class="font-mono">Add $100–$500 to regular monthly check</td>
                            <td class="font-bold text-success font-mono">Compounds monthly (Cuts 4–8 yrs off 30-yr loan)</td>
                            <td class="text-success font-semibold">Zero on standard conventional/FHA</td>
                            <td class="text-success font-semibold">High (Can pause extra payment any month)</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-primary">Bi-Weekly Payment Schedule</td>
                            <td class="font-mono">Pay half monthly EMI every 2 weeks (26 halves = 13 full payments)</td>
                            <td class="font-bold text-success font-mono">1 full extra monthly principal payment / yr</td>
                            <td class="text-success font-semibold">Zero</td>
                            <td>Moderate (Tied to bi-weekly payroll cycle)</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">Annual Bonus Lump Sum</td>
                            <td class="font-mono">Single lump sum (tax refund / bonus) applied to principal</td>
                            <td class="font-mono">Immediate step-down in balance and future interest</td>
                            <td>Check lender annual prepayment cap (some UK/Canada loans cap at 10–20%)</td>
                            <td>Highest during high-earning years</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">Mortgage Recasting</td>
                            <td class="font-mono">Lump sum payment followed by lender re-amortizing remaining term</td>
                            <td class="font-mono">Lowers monthly required payment permanently</td>
                            <td>Small admin fee ($250–$500); no refinancing closing costs</td>
                            <td>Excellent for homeowners selling previous house after closing</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</x-card>

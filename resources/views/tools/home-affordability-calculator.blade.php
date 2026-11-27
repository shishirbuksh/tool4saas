<x-card class="p-6 md:p-8" x-data="{
    annualIncome: 120000,
    monthlyDebt: 500,
    downPayment: 60000,
    interestRate: 6.5,
    init() {
        const params = new URLSearchParams(window.location.search);
        if (params.has('income')) this.annualIncome = parseFloat(params.get('income')) || this.annualIncome;
        if (params.has('debt')) this.monthlyDebt = parseFloat(params.get('debt')) || this.monthlyDebt;
        if (params.has('down')) this.downPayment = parseFloat(params.get('down')) || this.downPayment;
        if (params.has('rate')) this.interestRate = parseFloat(params.get('rate')) || this.interestRate;
    },
    setPreset(income, debt, down, rate) {
        this.annualIncome = income;
        this.monthlyDebt = debt;
        this.downPayment = down;
        this.interestRate = rate;
    },
    get maxMonthlyHousingPayment() {
        const monthlyGross = (parseFloat(this.annualIncome) || 0) / 12;
        // 28% front-end DTI rule
        const frontEnd = monthlyGross * 0.28;
        // 36% back-end DTI rule minus existing debt
        const backEnd = (monthlyGross * 0.36) - (parseFloat(this.monthlyDebt) || 0);
        return Math.max(0, Math.min(frontEnd, backEnd));
    },
    get affordableHomePrice() {
        const pmt = this.maxMonthlyHousingPayment;
        const r = (parseFloat(this.interestRate) || 6.5) / 100 / 12;
        const n = 360; // 30 years
        if (r === 0) return 0;
        const loanAmount = (pmt * (Math.pow(1 + r, n) - 1)) / (r * Math.pow(1 + r, n));
        return Math.round(loanAmount + (parseFloat(this.downPayment) || 0));
    }
}">
    <div class="space-y-6">
        {{-- Quick Scenario Chips --}}
        <div>
            <span class="text-xs font-bold uppercase tracking-wider text-base-content/60 font-mono block mb-2">Household Income Benchmarks:</span>
            <div class="flex flex-wrap gap-2">
                <button type="button" @click="setPreset(80000, 400, 30000, 6.5)" class="btn btn-xs rounded-full border border-base-300 bg-base-100 hover:bg-primary/20 font-mono">
                    $80k Income ($30k Down)
                </button>
                <button type="button" @click="setPreset(120000, 500, 60000, 6.5)" class="btn btn-xs rounded-full border border-base-300 bg-base-100 hover:bg-primary/20 font-mono">
                    $120k Income ($60k Down)
                </button>
                <button type="button" @click="setPreset(180000, 800, 100000, 6.5)" class="btn btn-xs rounded-full border border-base-300 bg-base-100 hover:bg-primary/20 font-mono">
                    $180k Income ($100k Down)
                </button>
                <button type="button" @click="setPreset(250000, 1200, 150000, 6.2)" class="btn btn-xs rounded-full border border-base-300 bg-base-100 hover:bg-primary/20 font-mono">
                    $250k Dual Earner ($150k Down)
                </button>
            </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-1 text-base-content/70">Gross Annual Household Income ($)</label>
                <input aria-label="Gross Annual Household Income ($)" type="number" min="10000" step="5000" x-model="annualIncome" class="input input-bordered w-full rounded-[12px] font-bold text-sm" />
            </div>
            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-1 text-base-content/70">Monthly Debt Payments ($)</label>
                <input aria-label="Monthly Debt Payments ($)" type="number" min="0" step="100" x-model="monthlyDebt" class="input input-bordered w-full rounded-[12px] font-bold text-sm" />
            </div>
            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-1 text-base-content/70">Available Down Payment ($)</label>
                <input aria-label="Available Down Payment ($)" type="number" min="0" step="5000" x-model="downPayment" class="input input-bordered w-full rounded-[12px] font-bold text-sm" />
            </div>
            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-1 text-base-content/70">Interest Rate (%)</label>
                <input aria-label="Interest Rate (%)" type="number" min="1" max="15" step="0.1" x-model="interestRate" class="input input-bordered w-full rounded-[12px] font-bold text-sm" />
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div class="p-6 rounded-[20px] bg-[#163300] text-white">
                <span class="text-xs uppercase tracking-widest text-[#9fe870] font-bold font-mono">Maximum Affordable Home Price</span>
                <p class="font-mono text-4xl font-extrabold mt-2 text-[#9fe870]" x-text="'$' + affordableHomePrice.toLocaleString()"></p>
                <p class="text-xs text-white/70 mt-2">Based on the conservative 28/36 debt-to-income lending rule.</p>
            </div>

            <div class="p-6 rounded-[20px] bg-base-200/50 border border-base-300">
                <span class="text-xs uppercase tracking-widest text-base-content/60 font-bold font-mono">Max Monthly Mortgage Payment</span>
                <p class="font-mono text-4xl font-extrabold mt-2 text-[#163300] dark:text-[#9fe870]" x-text="'$' + Math.round(maxMonthlyHousingPayment).toLocaleString() + '/mo'"></p>
                <p class="text-xs text-base-content/60 mt-2">Recommended ceiling for principal, interest, taxes, and insurance.</p>
            </div>
        </div>

        {{-- Technical Comparison: Mortgage Loan Types & DTI Thresholds Matrix --}}
        <div class="mt-8 pt-6 border-t border-base-300">
            <h3 class="font-bold text-base sm:text-lg text-base-content font-display mb-4">
                Mortgage Loan Types, DTI Thresholds &amp; Down Payment Guidelines Matrix
            </h3>
            <div class="overflow-x-auto rounded-3xl border border-base-300">
                <table class="table table-zebra w-full text-xs sm:text-sm">
                    <thead class="bg-base-200 text-base-content/70 uppercase text-[11px] font-mono">
                        <tr>
                            <th>Loan Program</th>
                            <th>Min Down Payment</th>
                            <th>Max Front-End DTI</th>
                            <th>Max Back-End DTI</th>
                            <th>Min Credit Score (FICO)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="font-bold font-mono text-[#163300] dark:text-[#9fe870]">Conventional (Fannie Mae)</td>
                            <td class="font-mono">3% – 5% (20% avoids PMI)</td>
                            <td class="font-mono font-bold">28%</td>
                            <td class="font-mono font-bold">36% (up to 45% automated)</td>
                            <td class="font-mono">620</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-[#163300] dark:text-[#9fe870]">FHA Loan (Govt Insured)</td>
                            <td class="font-mono">3.5%</td>
                            <td class="font-mono">31%</td>
                            <td class="font-mono">43% (up to 50% with compensating factors)</td>
                            <td class="font-mono font-bold text-success">580 (500 with 10% down)</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-[#163300] dark:text-[#9fe870]">VA Loan (Veterans)</td>
                            <td class="font-mono font-bold text-success">0% Down</td>
                            <td class="font-mono">No fixed ceiling</td>
                            <td class="font-mono">41% benchmark</td>
                            <td class="font-mono">580 – 620 (Lender overlay)</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">USDA Rural Housing</td>
                            <td class="font-mono font-bold text-success">0% Down</td>
                            <td class="font-mono">29%</td>
                            <td class="font-mono">41%</td>
                            <td class="font-mono">640</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">Jumbo Non-Conforming</td>
                            <td class="font-mono">10% – 20%</td>
                            <td class="font-mono">28% – 30%</td>
                            <td class="font-mono">38% – 43% strict</td>
                            <td class="font-mono text-error font-bold">700 – 740+</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</x-card>

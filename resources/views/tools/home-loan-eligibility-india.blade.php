<x-card class="p-6 md:p-8" x-data="{
    monthlyIncome: 75000,
    existingEmi: 10000,
    interestRate: 8.5,
    tenureYears: 20,
    foirPercent: 50,
    init() {
        const params = new URLSearchParams(window.location.search);
        if (params.has('income')) this.monthlyIncome = parseFloat(params.get('income')) || this.monthlyIncome;
        if (params.has('emi')) this.existingEmi = parseFloat(params.get('emi')) || this.existingEmi;
        if (params.has('rate')) this.interestRate = parseFloat(params.get('rate')) || this.interestRate;
        if (params.has('tenure')) this.tenureYears = parseInt(params.get('tenure'), 10) || this.tenureYears;
    },
    setPreset(income, emi, rate, tenure) {
        this.monthlyIncome = income;
        this.existingEmi = emi;
        this.interestRate = rate;
        this.tenureYears = tenure;
    },
    get maxEligibleEmi() {
        const inc = parseFloat(this.monthlyIncome) || 0;
        const emi = parseFloat(this.existingEmi) || 0;
        const foir = (parseFloat(this.foirPercent) || 50) / 100;
        return Math.max(0, (inc * foir) - emi);
    },
    get eligibleLoanAmount() {
        const emi = this.maxEligibleEmi;
        const r = (parseFloat(this.interestRate) || 8.5) / 100 / 12;
        const n = (parseInt(this.tenureYears) || 20) * 12;
        if (r === 0 || emi <= 0) return 0;
        const p = (emi * (Math.pow(1 + r, n) - 1)) / (r * Math.pow(1 + r, n));
        return Math.round(p);
    }
}">
    <div class="space-y-6">
        {{-- Quick Scenario Chips --}}
        <div>
            <span class="text-xs font-bold uppercase tracking-wider text-base-content/60 font-mono block mb-2">Monthly In-Hand Salary Scenarios:</span>
            <div class="flex flex-wrap gap-2">
                <button type="button" @click="setPreset(50000, 5000, 8.5, 20)" class="btn btn-xs rounded-full border border-base-300 bg-base-100 hover:bg-primary/20 font-mono">
                    ₹50k / mo Salary
                </button>
                <button type="button" @click="setPreset(75000, 10000, 8.5, 20)" class="btn btn-xs rounded-full border border-base-300 bg-base-100 hover:bg-primary/20 font-mono">
                    ₹75k / mo Salary
                </button>
                <button type="button" @click="setPreset(100000, 15000, 8.5, 20)" class="btn btn-xs rounded-full border border-base-300 bg-base-100 hover:bg-primary/20 font-mono">
                    ₹1 Lakh / mo Salary
                </button>
                <button type="button" @click="setPreset(150000, 20000, 8.4, 25)" class="btn btn-xs rounded-full border border-base-300 bg-base-100 hover:bg-primary/20 font-mono">
                    ₹1.5 Lakh / mo (25 Yrs)
                </button>
            </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-1 text-base-content/70">Gross Monthly Income (₹)</label>
                <input type="number" min="10000" step="5000" x-model="monthlyIncome" class="input input-bordered w-full rounded-[12px] font-bold text-sm" />
            </div>
            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-1 text-base-content/70">Existing EMIs / Obligations (₹)</label>
                <input type="number" min="0" step="1000" x-model="existingEmi" class="input input-bordered w-full rounded-[12px] font-bold text-sm" />
            </div>
            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-1 text-base-content/70">Home Loan Interest Rate (%)</label>
                <input type="number" min="5" max="15" step="0.25" x-model="interestRate" class="input input-bordered w-full rounded-[12px] font-bold text-sm" />
            </div>
            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-1 text-base-content/70">Loan Tenure (Years)</label>
                <input type="number" min="5" max="30" step="5" x-model="tenureYears" class="input input-bordered w-full rounded-[12px] font-bold text-sm" />
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div class="p-6 rounded-[20px] bg-[#163300] text-white">
                <span class="text-xs uppercase tracking-widest text-[#9fe870] font-bold font-mono">Eligible Home Loan Amount</span>
                <p class="font-mono text-4xl font-extrabold mt-2 text-[#9fe870]" x-text="'₹' + eligibleLoanAmount.toLocaleString('en-IN')"></p>
                <p class="text-xs text-white/70 mt-2" x-text="'Approx. ' + (eligibleLoanAmount / 100000).toFixed(2) + ' Lakhs borrowing capacity'"></p>
            </div>

            <div class="p-6 rounded-[20px] bg-base-200/50 border border-base-300">
                <span class="text-xs uppercase tracking-widest text-base-content/60 font-bold font-mono">Maximum Allowable Monthly EMI</span>
                <p class="font-mono text-4xl font-extrabold mt-2 text-primary" x-text="'₹' + Math.round(maxEligibleEmi).toLocaleString('en-IN') + '/mo'"></p>
                <p class="text-xs text-base-content/60 mt-2" x-text="'Capped at ' + foirPercent + '% Indian Bank FOIR ceiling'"></p>
            </div>
        </div>

        {{-- Technical Comparison: Indian Home Loan Lending Norms Matrix --}}
        <div class="mt-8 pt-6 border-t border-base-300">
            <h3 class="font-bold text-base sm:text-lg text-base-content font-display mb-4">
                Indian Bank FOIR Ratios, CIBIL Score Brackets &amp; RBI LTV Caps Matrix
            </h3>
            <div class="overflow-x-auto rounded-3xl border border-base-300">
                <table class="table table-zebra w-full text-xs sm:text-sm">
                    <thead class="bg-base-200 text-base-content/70 uppercase text-[11px] font-mono">
                        <tr>
                            <th>Gross Monthly Income Bracket</th>
                            <th>Max Permissible FOIR</th>
                            <th>Target CIBIL Score Range</th>
                            <th>RBI Max LTV Ratio (Property Value)</th>
                            <th>Leading Bank Benchmark (SBI / HDFC)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="font-bold font-mono text-primary">₹30,000 – ₹50,000 / mo</td>
                            <td class="font-mono font-bold">40% – 45%</td>
                            <td class="font-mono">750+ (Prime rate)</td>
                            <td class="font-mono">Up to 90% (Loans ≤ ₹30 Lakhs)</td>
                            <td>Standard repo linked lending rate (RLLR + spread)</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-primary">₹50,000 – ₹1,00,000 / mo</td>
                            <td class="font-mono font-bold">50%</td>
                            <td class="font-mono">750 – 799</td>
                            <td class="font-mono">Up to 80% (Loans ₹30L to ₹75 Lakhs)</td>
                            <td>Lowest concessions for salaried borrowers</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-primary">₹1,00,000+ / mo</td>
                            <td class="font-mono font-bold text-success">55% – 65%</td>
                            <td class="font-mono">800+</td>
                            <td class="font-mono">Up to 75% (Loans &gt; ₹75 Lakhs)</td>
                            <td>Premium HNI loan processing &amp; instant approval</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-error">Sub-prime (&lt; ₹30k or CIBIL &lt; 650)</td>
                            <td class="font-mono">Capped at 35%</td>
                            <td class="font-mono text-error">&lt; 650</td>
                            <td class="font-mono">60% – 70% strict</td>
                            <td class="text-error">Subject to guarantor or higher NBFC rate</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</x-card>

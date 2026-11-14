<x-card class="p-6 md:p-8" x-data="{
    monthlyIncome: 75000,
    existingEmi: 10000,
    interestRate: 8.5,
    tenureYears: 20,
    foirPercent: 50,
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
    </div>
</x-card>

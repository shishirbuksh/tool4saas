<x-card class="p-6 md:p-8" x-data="{
    annualIncome: 120000,
    monthlyDebt: 500,
    downPayment: 60000,
    interestRate: 6.5,
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
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-1 text-base-content/70">Gross Annual Household Income ($)</label>
                <input type="number" min="10000" step="5000" x-model="annualIncome" class="input input-bordered w-full rounded-[12px] font-bold text-sm" />
            </div>
            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-1 text-base-content/70">Monthly Debt Payments ($)</label>
                <input type="number" min="0" step="100" x-model="monthlyDebt" class="input input-bordered w-full rounded-[12px] font-bold text-sm" />
            </div>
            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-1 text-base-content/70">Available Down Payment ($)</label>
                <input type="number" min="0" step="5000" x-model="downPayment" class="input input-bordered w-full rounded-[12px] font-bold text-sm" />
            </div>
            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-1 text-base-content/70">Interest Rate (%)</label>
                <input type="number" min="1" max="15" step="0.1" x-model="interestRate" class="input input-bordered w-full rounded-[12px] font-bold text-sm" />
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
                <p class="font-mono text-4xl font-extrabold mt-2 text-primary" x-text="'$' + Math.round(maxMonthlyHousingPayment).toLocaleString() + '/mo'"></p>
                <p class="text-xs text-base-content/60 mt-2">Recommended ceiling for principal, interest, taxes, and insurance.</p>
            </div>
        </div>
    </div>
</x-card>

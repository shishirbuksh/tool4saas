<x-card class="p-6 md:p-8" x-data="{
    monthlyRent: 2200,
    homePrice: 450000,
    downPaymentPercent: 20,
    interestRate: 6.5,
    tenureYears: 30,
    get monthlyMortgage() {
        const p = this.homePrice * (1 - this.downPaymentPercent / 100);
        const r = (parseFloat(this.interestRate) || 6.5) / 100 / 12;
        const n = this.tenureYears * 12;
        if (r === 0) return p / n;
        return (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    },
    get totalMonthlyBuy() {
        // Mortgage + approx 1.2% property tax + 0.5% home insurance
        const taxAndIns = (this.homePrice * 0.017) / 12;
        return this.monthlyMortgage + taxAndIns;
    },
    get monthlyDifference() {
        return Math.round(this.totalMonthlyBuy - this.monthlyRent);
    }
}">
    <div class="space-y-6">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-1 text-base-content/70">Current Monthly Rent ($)</label>
                <input type="number" min="0" step="50" x-model="monthlyRent" class="input input-bordered w-full rounded-[12px] font-bold text-sm" />
            </div>
            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-1 text-base-content/70">Target Home Purchase Price ($)</label>
                <input type="number" min="50000" step="10000" x-model="homePrice" class="input input-bordered w-full rounded-[12px] font-bold text-sm" />
            </div>
            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-1 text-base-content/70">Down Payment (%)</label>
                <input type="number" min="3" max="100" x-model="downPaymentPercent" class="input input-bordered w-full rounded-[12px] font-bold text-sm" />
            </div>
            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-1 text-base-content/70">Mortgage Interest Rate (%)</label>
                <input type="number" min="1" max="15" step="0.1" x-model="interestRate" class="input input-bordered w-full rounded-[12px] font-bold text-sm" />
            </div>
            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-1 text-base-content/70">Mortgage Tenure (Years)</label>
                <input type="number" min="10" max="30" step="5" x-model="tenureYears" class="input input-bordered w-full rounded-[12px] font-bold text-sm" />
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div class="p-6 rounded-[20px] bg-base-200/50 border border-base-300">
                <span class="text-xs uppercase tracking-widest text-base-content/60 font-bold font-mono">Monthly Cost to Rent</span>
                <p class="font-mono text-4xl font-extrabold mt-2 text-[#163300] dark:text-base-content" x-text="'$' + Number(monthlyRent).toLocaleString()"></p>
                <p class="text-xs text-base-content/60 mt-2">Zero equity accumulation, fixed maintenance</p>
            </div>

            <div class="p-6 rounded-[20px] bg-[#163300] text-white">
                <span class="text-xs uppercase tracking-widest text-[#9fe870] font-bold font-mono">Total Monthly Ownership Cost</span>
                <p class="font-mono text-4xl font-extrabold mt-2 text-[#9fe870]" x-text="'$' + Math.round(totalMonthlyBuy).toLocaleString()"></p>
                <p class="text-xs text-white/70 mt-2" x-text="monthlyDifference > 0 ? '$' + monthlyDifference + '/mo more expensive than renting' : '$' + Math.abs(monthlyDifference) + '/mo cheaper than renting'"></p>
            </div>
        </div>
    </div>
</x-card>

<x-card class="p-6 md:p-8" x-data="{
    balance: 15000,
    rate: 18.0,
    monthlyPayment: 500,
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
                <input type="number" min="100" step="500" x-model="balance" class="input input-bordered w-full rounded-[12px] font-bold text-base" />
            </div>

            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-2 text-base-content/70">Interest Rate APR (%)</label>
                <input type="number" min="0" max="40" step="0.5" x-model="rate" class="input input-bordered w-full rounded-[12px] font-bold text-base" />
            </div>

            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-2 text-base-content/70">Monthly Budget ($)</label>
                <input type="number" min="10" step="50" x-model="monthlyPayment" class="input input-bordered w-full rounded-[12px] font-bold text-base" />
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
    </div>
</x-card>

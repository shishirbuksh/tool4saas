<x-card class="p-6 md:p-8" x-data="{
    loanBalance: 300000,
    currentRate: 7.0,
    newRate: 5.5,
    tenureYears: 30,
    closingCosts: 5000,
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
    </div>
</x-card>

<x-card class="p-6 md:p-8" x-data="{
    amount: 1000,
    rate: 3.5,
    years: 10,
    get futureCost() {
        const p = parseFloat(this.amount) || 0;
        const r = parseFloat(this.rate) || 0;
        const y = parseFloat(this.years) || 0;
        return p * Math.pow(1 + (r / 100), y);
    },
    get purchasingPower() {
        const p = parseFloat(this.amount) || 0;
        const r = parseFloat(this.rate) || 0;
        const y = parseFloat(this.years) || 0;
        return p / Math.pow(1 + (r / 100), y);
    },
    get lossPercentage() {
        const p = parseFloat(this.amount) || 0;
        if (!p) return 0;
        return Math.round(((p - this.purchasingPower) / p) * 100);
    }
}">
    <div class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-2 text-base-content/70">Current Amount ($)</label>
                <input type="number" min="1" step="100" x-model="amount" class="input input-bordered w-full rounded-[12px] font-bold text-base" />
            </div>

            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-2 text-base-content/70">Annual Inflation Rate (%)</label>
                <input type="number" min="0" max="50" step="0.1" x-model="rate" class="input input-bordered w-full rounded-[12px] font-bold text-base" />
            </div>

            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-2 text-base-content/70">Horizon Period (Years)</label>
                <input type="number" min="1" max="50" x-model="years" class="input input-bordered w-full rounded-[12px] font-bold text-base" />
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div class="p-6 rounded-[20px] bg-[#163300] text-white">
                <span class="text-xs uppercase tracking-widest text-[#9fe870] font-bold font-mono">Future Required Amount</span>
                <p class="font-mono text-4xl font-extrabold mt-2 text-[#9fe870]" x-text="'$' + futureCost.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })"></p>
                <p class="text-xs text-white/70 mt-2" x-text="'What costs $' + amount + ' today will cost in ' + years + ' years.'"></p>
            </div>

            <div class="p-6 rounded-[20px] bg-base-200/50 border border-base-300">
                <span class="text-xs uppercase tracking-widest text-base-content/60 font-bold font-mono">Future Purchasing Power</span>
                <p class="font-mono text-4xl font-extrabold mt-2 text-error" x-text="'$' + purchasingPower.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })"></p>
                <p class="text-xs text-error/80 mt-2 font-semibold" x-text="'Purchasing power eroded by ' + lossPercentage + '%'"></p>
            </div>
        </div>
    </div>
</x-card>

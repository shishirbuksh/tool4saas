<x-card class="p-6 md:p-8" x-data="{
    sales: 10000,
    rate: 10,
    currency: '$',
    get commissionAmount() {
        const s = parseFloat(this.sales) || 0;
        const r = parseFloat(this.rate) || 0;
        return s * (r / 100);
    },
    get totalEarnings() {
        const s = parseFloat(this.sales) || 0;
        return s + this.commissionAmount;
    }
}">
    <div class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-2 text-base-content/70">Currency Symbol</label>
                <select x-model="currency" class="select select-bordered w-full rounded-[12px] font-mono text-base">
                    <option value="$">$ (USD / CAD / AUD)</option>
                    <option value="€">€ (EUR)</option>
                    <option value="£">£ (GBP)</option>
                    <option value="₹">₹ (INR)</option>
                    <option value="¥">¥ (JPY / CNY)</option>
                </select>
            </div>

            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-2 text-base-content/70">Gross Sales Volume</label>
                <input type="number" min="0" step="100" x-model="sales" class="input input-bordered w-full rounded-[12px] font-bold text-base" />
            </div>

            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-2 text-base-content/70">Commission Rate (%)</label>
                <input type="number" min="0" max="100" step="0.5" x-model="rate" class="input input-bordered w-full rounded-[12px] font-bold text-base" />
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            <div class="p-6 rounded-[20px] bg-[#163300] text-white">
                <span class="text-xs uppercase tracking-widest text-[#9fe870] font-bold font-mono">Commission Payout</span>
                <p class="font-mono text-4xl font-extrabold mt-2 text-[#9fe870]" x-text="currency + commissionAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })"></p>
                <p class="text-xs text-white/60 mt-2" x-text="'Calculated at ' + rate + '% of ' + currency + Number(sales || 0).toLocaleString()"></p>
            </div>

            <div class="p-6 rounded-[20px] bg-base-200/50 border border-base-300">
                <span class="text-xs uppercase tracking-widest text-base-content/70 font-bold font-mono">Total (Sales + Commission)</span>
                <p class="font-mono text-4xl font-extrabold mt-2 text-[#163300] dark:text-base-content" x-text="currency + totalEarnings.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })"></p>
                <p class="text-xs text-base-content/60 mt-2">Combined gross proceeds</p>
            </div>
        </div>
    </div>
</x-card>

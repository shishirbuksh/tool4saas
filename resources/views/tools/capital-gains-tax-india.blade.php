<x-card class="p-6 md:p-8" x-data="{
    purchasePrice: 100000,
    salePrice: 250000,
    assetType: 'equity_listed',
    holdingPeriodYears: 2,
    get gain() {
        return Math.max(0, (parseFloat(this.salePrice) || 0) - (parseFloat(this.purchasePrice) || 0));
    },
    get isLtcg() {
        const y = parseFloat(this.holdingPeriodYears) || 0;
        if (this.assetType === 'equity_listed') return y > 1;
        if (this.assetType === 'real_estate') return y > 2;
        return false;
    },
    get tax() {
        const g = this.gain;
        if (g <= 0) return 0;
        if (this.assetType === 'equity_listed') {
            if (this.isLtcg) {
                // Post-Budget 2024: 12.5% above ₹1.25 Lakh exemption
                const taxable = Math.max(0, g - 125000);
                return taxable * 0.125 * 1.04;
            } else {
                // STCG: 20%
                return g * 0.20 * 1.04;
            }
        } else {
            // Real estate post-July 2024: 12.5% without indexation
            return g * 0.125 * 1.04;
        }
    }
}">
    <div class="space-y-6">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-1 text-base-content/70">Original Purchase Price (₹)</label>
                <input type="number" min="0" step="10000" x-model="purchasePrice" class="input input-bordered w-full rounded-[12px] font-bold text-sm" />
            </div>
            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-1 text-base-content/70">Final Sale Proceeds (₹)</label>
                <input type="number" min="0" step="10000" x-model="salePrice" class="input input-bordered w-full rounded-[12px] font-bold text-sm" />
            </div>
            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-1 text-base-content/70">Asset Class</label>
                <select x-model="assetType" class="select select-bordered w-full rounded-[12px] text-sm">
                    <option value="equity_listed">Listed Shares / Mutual Funds</option>
                    <option value="real_estate">Real Estate & Property</option>
                </select>
            </div>
            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-1 text-base-content/70">Holding Duration (Years)</label>
                <input type="number" min="0" max="40" step="0.5" x-model="holdingPeriodYears" class="input input-bordered w-full rounded-[12px] font-bold text-sm" />
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div class="p-6 rounded-[20px] bg-[#163300] text-white">
                <span class="text-xs uppercase tracking-widest text-[#9fe870] font-bold font-mono">Estimated Capital Gains Tax</span>
                <p class="font-mono text-4xl font-extrabold mt-2 text-[#9fe870]" x-text="'₹' + Math.round(tax).toLocaleString('en-IN')"></p>
                <p class="text-xs text-white/70 mt-2" x-text="isLtcg ? 'Long Term Capital Gains (LTCG with Budget 2024 rates & 4% cess)' : 'Short Term Capital Gains (STCG with 4% cess)'"></p>
            </div>

            <div class="p-6 rounded-[20px] bg-base-200/50 border border-base-300">
                <span class="text-xs uppercase tracking-widest text-base-content/60 font-bold font-mono">Total Capital Gain Profit</span>
                <p class="font-mono text-4xl font-extrabold mt-2 text-primary" x-text="'₹' + Math.round(gain).toLocaleString('en-IN')"></p>
                <p class="text-xs text-base-content/60 mt-2" x-text="'Net Profit after Tax: ₹' + Math.round(gain - tax).toLocaleString('en-IN')"></p>
            </div>
        </div>
    </div>
</x-card>

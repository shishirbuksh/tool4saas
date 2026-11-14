<x-tool-paper x-data="{
    cost: 50,
    revenue: 120,
    currencySymbol: '$',
    get numCost() {
        return Math.max(0, parseFloat(this.cost) || 0);
    },
    get numRevenue() {
        return Math.max(0, parseFloat(this.revenue) || 0);
    },
    get profit() {
        return this.numRevenue - this.numCost;
    },
    get marginPercent() {
        if (this.numRevenue <= 0) return 0;
        return ((this.profit / this.numRevenue) * 100).toFixed(1);
    },
    get markupPercent() {
        if (this.numCost <= 0) return 0;
        return ((this.profit / this.numCost) * 100).toFixed(1);
    }
}">
    <div class="space-y-6">
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <x-numeric-field label="Cost of Goods (Cost)" model="cost" prefix="$" placeholder="50" />
            <x-numeric-field label="Selling Price (Revenue)" model="revenue" prefix="$" placeholder="120" />
            <div class="form-control">
                <label class="label py-1"><span class="label-text font-bold text-xs uppercase tracking-wider text-base-content/60 font-mono">Currency</span></label>
                <select x-model="currencySymbol" class="select select-bordered rounded-xl w-full text-sm">
                    <option value="$">USD / CAD / AUD ($)</option>
                    <option value="€">EUR (€)</option>
                    <option value="£">GBP (£)</option>
                    <option value="₹">INR (₹)</option>
                    <option value="¥">JPY / CNY (¥)</option>
                </select>
            </div>
        </div>

        {{-- Polarity-Flipped Dark Hero Display --}}
        <div class="p-6 sm:p-9 rounded-3xl bg-[#0e0f0c] text-white border border-[#242a20] shadow-sm text-center">
            <span class="text-xs font-bold uppercase tracking-wider text-[#868685] font-mono">Net Gross Profit</span>
            <div class="text-4xl sm:text-6xl font-black my-2 font-display tabular-nums" :class="profit >= 0 ? 'text-primary' : 'text-error'">
                <span x-text="currencySymbol"></span><span x-text="profit.toFixed(2)"></span>
            </div>
            <p class="text-xs sm:text-sm text-[#868685]">
                Profit = Selling Price (<span x-text="currencySymbol"></span><span x-text="numRevenue.toFixed(2)"></span>) − Cost (<span x-text="currencySymbol"></span><span x-text="numCost.toFixed(2)"></span>)
            </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
            <div class="p-5 rounded-2xl bg-base-200/70 border border-base-300">
                <span class="text-[11px] font-bold text-base-content/60 uppercase tracking-wider font-mono">Gross Profit Margin</span>
                <div class="text-3xl font-black mt-1 font-display tabular-nums" :class="marginPercent >= 0 ? 'text-[#2ead4b]' : 'text-error'">
                    <span x-text="marginPercent"></span>%
                </div>
                <span class="text-[10px] text-base-content/60 font-mono">(Profit ÷ Revenue) × 100</span>
            </div>
            <div class="p-5 rounded-2xl bg-base-200/70 border border-base-300">
                <span class="text-[11px] font-bold text-base-content/60 uppercase tracking-wider font-mono">Markup Percentage</span>
                <div class="text-3xl font-black text-primary mt-1 font-display tabular-nums">
                    <span x-text="markupPercent"></span>%
                </div>
                <span class="text-[10px] text-base-content/60 font-mono">(Profit ÷ Cost) × 100</span>
            </div>
        </div>
    </div>
</x-tool-paper>

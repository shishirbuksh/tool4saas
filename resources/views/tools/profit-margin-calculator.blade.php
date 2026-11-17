<x-tool-paper x-data="{
    cost: 50,
    revenue: 120,
    currencySymbol: '$',
    init() {
        const params = new URLSearchParams(window.location.search);
        if (params.has('cost')) {
            const val = parseFloat(params.get('cost'));
            if (!isNaN(val) && val >= 0) this.cost = val;
        }
        if (params.has('revenue')) {
            const val = parseFloat(params.get('revenue'));
            if (!isNaN(val) && val >= 0) this.revenue = val;
        }
        if (params.has('price')) {
            const val = parseFloat(params.get('price'));
            if (!isNaN(val) && val >= 0) this.revenue = val;
        }
        if (params.has('currency')) {
            const c = params.get('currency');
            if (['$', '€', '£', '₹', '¥'].includes(c)) this.currencySymbol = c;
        }
    },
    setBenchmark(c, r) {
        this.cost = c;
        this.revenue = r;
    },
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

        {{-- Quick Benchmark Chips --}}
        <div>
            <span class="text-xs font-bold text-base-content/60 block mb-2 uppercase tracking-wider font-mono">Industry Margin Benchmarks</span>
            <div class="flex flex-wrap gap-2">
                <button type="button" @click="setBenchmark(20, 100)" class="px-3.5 py-1.5 rounded-full bg-base-200 border border-base-300 text-xs font-semibold hover:border-primary hover:bg-[#e2f6d5] transition-all">SaaS Software (80% Margin)</button>
                <button type="button" @click="setBenchmark(50, 100)" class="px-3.5 py-1.5 rounded-full bg-base-200 border border-base-300 text-xs font-semibold hover:border-primary hover:bg-[#e2f6d5] transition-all">E-Commerce (50% Margin)</button>
                <button type="button" @click="setBenchmark(70, 100)" class="px-3.5 py-1.5 rounded-full bg-base-200 border border-base-300 text-xs font-semibold hover:border-primary hover:bg-[#e2f6d5] transition-all">Retail / Physical Goods (30% Margin)</button>
                <button type="button" @click="setBenchmark(85, 100)" class="px-3.5 py-1.5 rounded-full bg-base-200 border border-base-300 text-xs font-semibold hover:border-primary hover:bg-[#e2f6d5] transition-all">Restaurant (15% Margin)</button>
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

        {{-- Technical Comparison: Profit Margin Types Matrix --}}
        <div class="mt-8 pt-6 border-t border-base-300">
            <h3 class="font-bold text-base sm:text-lg text-base-content font-display mb-4">
                Gross Margin vs. Operating Margin vs. Net Profit Margin Matrix
            </h3>
            <div class="overflow-x-auto rounded-3xl border border-base-300">
                <table class="table table-zebra w-full text-xs sm:text-sm">
                    <thead class="bg-base-200 text-base-content/70 uppercase text-[11px] font-mono">
                        <tr>
                            <th>Margin Dimension</th>
                            <th>Mathematical Formula</th>
                            <th>Deductions Accounted For</th>
                            <th>Business Health Meaning</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="font-bold font-mono text-primary">Gross Margin</td>
                            <td class="font-mono text-primary">((Revenue − COGS) ÷ Rev) × 100</td>
                            <td>Direct materials, labor &amp; production</td>
                            <td>Measures product manufacturing pricing power</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-primary">Operating Margin</td>
                            <td class="font-mono text-primary">(Operating Income ÷ Rev) × 100</td>
                            <td>COGS + SG&amp;A, marketing, salaries, R&amp;D</td>
                            <td>Measures managerial efficiency &amp; sales overhead</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-primary">Net Profit Margin</td>
                            <td class="font-mono text-primary">(Net Income ÷ Revenue) × 100</td>
                            <td>All expenses: COGS, overhead, interest, taxes</td>
                            <td>True bottom-line cash generation capacity</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">Markup vs Margin</td>
                            <td class="font-mono">((Price − Cost) ÷ Cost) × 100</td>
                            <td>Calculated on cost basis, not revenue</td>
                            <td>A 50% markup equals a 33.3% gross margin</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</x-tool-paper>

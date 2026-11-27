<x-card class="p-6 md:p-8" x-data="{
    purchasePrice: 100000,
    salePrice: 250000,
    assetType: 'equity_listed',
    holdingPeriodYears: 2,
    init() {
        const params = new URLSearchParams(window.location.search);
        if (params.has('buy')) { const b = parseFloat(params.get('buy')); if (!isNaN(b) && b >= 0) this.purchasePrice = b; }
        if (params.has('sell')) { const s = parseFloat(params.get('sell')); if (!isNaN(s) && s >= 0) this.salePrice = s; }
        if (params.has('type') && ['equity_listed', 'real_estate'].includes(params.get('type'))) this.assetType = params.get('type');
        if (params.has('years')) { const y = parseFloat(params.get('years')); if (!isNaN(y) && y >= 0) this.holdingPeriodYears = y; }
    },
    setPreset(buy, sell, type, years) {
        this.purchasePrice = buy;
        this.salePrice = sell;
        this.assetType = type;
        this.holdingPeriodYears = years;
    },
    get gain() {
        return Math.max(0, (parseFloat(this.salePrice) || 0) - (parseFloat(this.purchasePrice) || 0));
    },
    get isLtcg() {
        const y = Math.max(0, parseFloat(this.holdingPeriodYears) || 0);
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
            }
            // Equity STCG: 20% + 4% cess
            return g * 0.20 * 1.04;
        }
        if (this.isLtcg) {
            // Real estate LTCG (>2 yrs) post-July 2024: 12.5% without indexation + 4% cess
            return g * 0.125 * 1.04;
        }
        // Real estate STCG (<=2 yrs): Taxed at income slab (estimated at 30% top marginal slab + 4% cess)
        return g * 0.30 * 1.04;
    }
}">
    <div class="space-y-6">
        {{-- Quick Scenario Chips --}}
        <div>
            <span class="text-xs font-bold uppercase tracking-wider text-base-content/60 font-mono block mb-2">Budget 2024 Scenarios:</span>
            <div class="flex flex-wrap gap-2">
                <button type="button" @click="setPreset(100000, 350000, 'equity_listed', 2)" class="btn btn-xs rounded-full border border-base-300 bg-base-100 hover:bg-primary/20 font-mono">
                    Equity LTCG (₹2.5L Gain / 12.5%)
                </button>
                <button type="button" @click="setPreset(100000, 200000, 'equity_listed', 0.5)" class="btn btn-xs rounded-full border border-base-300 bg-base-100 hover:bg-primary/20 font-mono">
                    Equity STCG (₹1L Gain / 20%)
                </button>
                <button type="button" @click="setPreset(3000000, 5000000, 'real_estate', 4)" class="btn btn-xs rounded-full border border-base-300 bg-base-100 hover:bg-primary/20 font-mono">
                    Real Estate (₹20L Gain / 12.5%)
                </button>
                <button type="button" @click="setPreset(100000, 200000, 'equity_listed', 1.5)" class="btn btn-xs rounded-full border border-base-300 bg-base-100 hover:bg-primary/20 font-mono">
                    LTCG Under ₹1.25L Exemption (₹0 Tax)
                </button>
            </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-1 text-base-content/70">Original Purchase Price (₹)</label>
                <input aria-label="Original Purchase Price (₹)" type="number" min="0" step="10000" x-model="purchasePrice" class="input input-bordered w-full rounded-[12px] font-bold text-sm" />
            </div>
            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-1 text-base-content/70">Final Sale Proceeds (₹)</label>
                <input aria-label="Final Sale Proceeds (₹)" type="number" min="0" step="10000" x-model="salePrice" class="input input-bordered w-full rounded-[12px] font-bold text-sm" />
            </div>
            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-1 text-base-content/70">Asset Class</label>
                <select aria-label="Asset Class" x-model="assetType" class="select select-bordered w-full rounded-[12px] text-sm">
                    <option value="equity_listed">Listed Shares / Mutual Funds</option>
                    <option value="real_estate">Real Estate & Property</option>
                </select>
            </div>
            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-1 text-base-content/70">Holding Duration (Years)</label>
                <input aria-label="Holding Duration (Years)" type="number" min="0" max="40" step="0.5" x-model="holdingPeriodYears" class="input input-bordered w-full rounded-[12px] font-bold text-sm" />
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
                <p class="font-mono text-4xl font-extrabold mt-2 text-[#163300] dark:text-[#9fe870]" x-text="'₹' + Math.round(gain).toLocaleString('en-IN')"></p>
                <p class="text-xs text-base-content/60 mt-2" x-text="'Net Profit after Tax: ₹' + Math.round(gain - tax).toLocaleString('en-IN')"></p>
            </div>
        </div>

        {{-- Technical Comparison: Post-Budget 2024 Capital Gains Tax Rates --}}
        <div class="pt-4 border-t border-base-300">
            <h3 class="font-bold text-base sm:text-lg text-base-content font-display mb-4">
                Short-Term vs. Long-Term Capital Gains Tax in India (Post-Budget 2024 Rules)
            </h3>
            <div class="overflow-x-auto rounded-3xl border border-base-300">
                <table class="table table-zebra w-full text-xs sm:text-sm">
                    <thead class="bg-base-200 text-base-content/70 uppercase text-[11px] font-mono">
                        <tr>
                            <th>Asset Class</th>
                            <th>LTCG Holding Period</th>
                            <th>LTCG Tax Rate</th>
                            <th>STCG Tax Rate</th>
                            <th>Annual Exemption</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="font-bold font-mono">Listed Equity &amp; Mutual Funds</td>
                            <td>&gt; 12 Months</td>
                            <td>12.5% (Sec 112A)</td>
                            <td>20% (Sec 111A)</td>
                            <td>₹1,25,000 / FY</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">Real Estate &amp; Property</td>
                            <td>&gt; 24 Months</td>
                            <td>12.5% (Without indexation)</td>
                            <td>Applicable slab rates</td>
                            <td>Sec 54 / 54EC rollover</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">Unlisted Shares &amp; Startups</td>
                            <td>&gt; 24 Months</td>
                            <td>12.5% (Without indexation)</td>
                            <td>Applicable slab rates</td>
                            <td>Nil</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">Debt Mutual Funds (Post Apr 2023)</td>
                            <td>Any duration</td>
                            <td>Taxed at slab rate</td>
                            <td>Taxed at slab rate</td>
                            <td>Nil</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</x-card>

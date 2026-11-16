<x-card class="p-6 md:p-8" x-data="{
    subtotal: 100,
    rate: 7.25,
    state: 'California',
    rates: {
        'California': 7.25, 'Texas': 6.25, 'New York': 4.0, 'Florida': 6.0,
        'Illinois': 6.25, 'Pennsylvania': 6.0, 'Ohio': 5.75, 'Georgia': 4.0,
        'North Carolina': 4.75, 'Michigan': 6.0, 'Washington': 6.5, 'Other': 6.0
    },
    updateState() {
        this.rate = this.rates[this.state] || 6.0;
    },
    get taxAmount() {
        const s = parseFloat(this.subtotal) || 0;
        const r = parseFloat(this.rate) || 0;
        return s * (r / 100);
    },
    get total() {
        return (parseFloat(this.subtotal) || 0) + this.taxAmount;
    }
}">
    <div class="space-y-6">
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-2 text-base-content/70">Purchase Subtotal ($)</label>
                <input type="number" min="0" step="10" x-model="subtotal" class="input input-bordered w-full rounded-[12px] font-bold text-base" />
            </div>

            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-2 text-base-content/70">Select US State</label>
                <select x-model="state" @change="updateState()" class="select select-bordered w-full rounded-[12px] text-sm font-semibold">
                    <template x-for="(r, s) in rates" :key="s">
                        <option :value="s" x-text="s + ' (' + r + '%)'"></option>
                    </template>
                </select>
            </div>

            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-2 text-base-content/70">Custom Tax Rate (%)</label>
                <input type="number" min="0" max="25" step="0.25" x-model="rate" class="input input-bordered w-full rounded-[12px] font-bold text-base" />
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div class="p-6 rounded-[20px] bg-[#163300] text-white">
                <span class="text-xs uppercase tracking-widest text-[#9fe870] font-bold font-mono">Calculated Sales Tax</span>
                <p class="font-mono text-4xl font-extrabold mt-2 text-[#9fe870]" x-text="'$' + taxAmount.toFixed(2)"></p>
                <p class="text-xs text-white/70 mt-2" x-text="rate + '% sales tax on $' + Number(subtotal || 0).toFixed(2)"></p>
            </div>

            <div class="p-6 rounded-[20px] bg-base-200/50 border border-base-300">
                <span class="text-xs uppercase tracking-widest text-base-content/60 font-bold font-mono">Total Transaction Amount</span>
                <p class="font-mono text-4xl font-extrabold mt-2 text-[#163300] dark:text-base-content" x-text="'$' + total.toFixed(2)"></p>
                <p class="text-xs text-base-content/60 mt-2">Gross total with sales tax included</p>
            </div>
        </div>

        {{-- Technical Comparison: US State Sales Tax Rates & Local City Surcharges Matrix --}}
        <div class="mt-8 pt-6 border-t border-base-300">
            <h3 class="font-bold text-base sm:text-lg text-base-content font-display mb-4">
                US State Baseline Sales Tax Rates vs. Max Local City Surcharges Matrix
            </h3>
            <div class="overflow-x-auto rounded-3xl border border-base-300">
                <table class="table table-zebra w-full text-xs sm:text-sm">
                    <thead class="bg-base-200 text-base-content/70 uppercase text-[11px] font-mono">
                        <tr>
                            <th>US State Jurisdiction</th>
                            <th>State Base Sales Tax</th>
                            <th>Max Local City/County Surcharge</th>
                            <th>Combined Average Rate</th>
                            <th>Economic Nexus Threshold (Wayfair)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="font-bold font-mono text-primary">California (CA)</td>
                            <td class="font-mono font-bold">7.25% (Highest base)</td>
                            <td class="font-mono">+3.00%</td>
                            <td class="font-mono font-bold text-error">8.85% (Up to 10.75% in LA/SF)</td>
                            <td>$500,000 annual gross sales</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-primary">Texas (TX)</td>
                            <td class="font-mono">6.25%</td>
                            <td class="font-mono">+2.00%</td>
                            <td class="font-mono font-bold">8.20% (Common 8.25% cap)</td>
                            <td>$500,000 annual sales</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-primary">New York (NY)</td>
                            <td class="font-mono">4.00%</td>
                            <td class="font-mono">+4.875% (NYC)</td>
                            <td class="font-mono font-bold text-error">8.52% (8.875% in NYC)</td>
                            <td>$500,000 sales + 100 transactions</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">Florida (FL)</td>
                            <td class="font-mono">6.00%</td>
                            <td class="font-mono">+1.50%</td>
                            <td class="font-mono">7.02% average</td>
                            <td>$100,000 remote seller revenue</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-success">NOMAD States (NH, OR, MT, DE)</td>
                            <td class="font-mono font-bold text-success">0.00% (No Sales Tax)</td>
                            <td class="font-mono font-bold text-success">0.00%</td>
                            <td class="font-mono font-bold text-success">0.00% Total</td>
                            <td class="text-success font-semibold">Exempt (Zero general state sales tax)</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</x-card>

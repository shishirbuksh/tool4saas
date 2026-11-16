<x-tool-paper x-data="{
    amount: 1000,
    from: 'USD',
    to: 'EUR',
    rates: {
        USD: 1,
        EUR: 0.92,
        GBP: 0.79,
        INR: 83.50,
        JPY: 149.80,
        CAD: 1.36,
        AUD: 1.52,
        CHF: 0.88,
        CNY: 7.24,
        SGD: 1.34,
        AED: 3.67
    },
    currencies: [
        { code: 'USD', name: 'US Dollar', symbol: '$' },
        { code: 'EUR', name: 'Euro', symbol: '€' },
        { code: 'GBP', name: 'British Pound', symbol: '£' },
        { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
        { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
        { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
        { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
        { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF' },
        { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' },
        { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$' },
        { code: 'AED', name: 'UAE Dirham', symbol: 'AED' }
    ],
    get converted() {
        const amt = parseFloat(this.amount) || 0;
        const fromRate = this.rates[this.from] || 1;
        const toRate = this.rates[this.to] || 1;
        const inUsd = amt / fromRate;
        return (inUsd * toRate).toFixed(2);
    },
    get unitRate() {
        const fromRate = this.rates[this.from] || 1;
        const toRate = this.rates[this.to] || 1;
        return (toRate / fromRate).toFixed(4);
    },
    swap() {
        const tmp = this.from;
        this.from = this.to;
        this.to = tmp;
    }
}">
    <div class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-7 gap-4 items-center">
            {{-- From Input --}}
            <div class="md:col-span-3 space-y-2">
                <label class="block text-xs font-bold uppercase tracking-wider text-base-content/60 font-mono">You Send</label>
                <input
                    type="number"
                    step="any"
                    x-model.number="amount"
                    class="input input-bordered rounded-2xl w-full text-2xl font-black p-4 tabular-nums"
                />
                <select x-model="from" class="select select-bordered rounded-xl w-full text-xs font-bold">
                    <template x-for="c in currencies" :key="c.code">
                        <option :value="c.code" x-text="`${c.code} – ${c.name}`" :selected="from === c.code"></option>
                    </template>
                </select>
            </div>

            {{-- Swap Button --}}
            <div class="md:col-span-1 flex justify-center py-2 md:py-0">
                <button
                    type="button"
                    @click="swap()"
                    class="w-12 h-12 rounded-full bg-base-200 hover:bg-primary hover:text-primary-content border border-base-300 flex items-center justify-center transition-all shadow-xs"
                    aria-label="Swap currencies"
                >
                    ⇄
                </button>
            </div>

            {{-- To Output --}}
            <div class="md:col-span-3 space-y-2">
                <label class="block text-xs font-bold uppercase tracking-wider text-base-content/60 font-mono">Recipient Gets</label>
                <div class="p-4 rounded-2xl bg-base-200/70 border border-base-300 min-h-[52px] flex items-center font-display text-2xl font-black text-base-content tabular-nums">
                    <span x-text="converted"></span>
                </div>
                <select x-model="to" class="select select-bordered rounded-xl w-full text-xs font-bold">
                    <template x-for="c in currencies" :key="c.code">
                        <option :value="c.code" x-text="`${c.code} – ${c.name}`" :selected="to === c.code"></option>
                    </template>
                </select>
            </div>
        </div>

        {{-- Wise Mid-Market Exchange Rate Banner (Polarity-Flipped Dark Hero Card) --}}
        <div class="p-6 sm:p-9 rounded-3xl bg-[#0e0f0c] text-white border border-[#242a20] shadow-sm text-center">
            <span class="text-xs font-bold uppercase tracking-wider text-[#868685] font-mono">Mid-Market Exchange Rate</span>
            <div class="text-3xl sm:text-5xl font-black text-primary my-2 font-display tabular-nums">
                1 <span x-text="from"></span> = <span x-text="unitRate"></span> <span x-text="to"></span>
            </div>
            <p class="text-xs text-[#868685] font-mono mt-1">Real mid-market benchmark rates with zero hidden markups or commission spread.</p>
        </div>

        {{-- Technical Comparison: Global Reserve Currencies Matrix --}}
        <div class="mt-8 pt-6 border-t border-base-300">
            <h3 class="font-bold text-base sm:text-lg text-base-content font-display mb-4">
                Major Global Reserve Currencies &amp; ISO 4217 Currency Codes Matrix
            </h3>
            <div class="overflow-x-auto rounded-3xl border border-base-300">
                <table class="table table-zebra w-full text-xs sm:text-sm">
                    <thead class="bg-base-200 text-base-content/70 uppercase text-[11px] font-mono">
                        <tr>
                            <th>ISO Code</th>
                            <th>Currency Name</th>
                            <th>Central Bank Issuer</th>
                            <th>Global FX Share (BIS)</th>
                            <th>Reserve Currency Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="font-bold font-mono text-primary">USD ($)</td>
                            <td>United States Dollar</td>
                            <td>Federal Reserve (Fed)</td>
                            <td class="font-mono text-[#2ead4b] font-bold">~88.5%</td>
                            <td>Dominant global reserve; world commodity settlement</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-primary">EUR (€)</td>
                            <td>European Euro</td>
                            <td>European Central Bank (ECB)</td>
                            <td class="font-mono text-[#2ead4b]">~30.5%</td>
                            <td>Second largest global reserve; 20 Eurozone nations</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-primary">JPY (¥)</td>
                            <td>Japanese Yen</td>
                            <td>Bank of Japan (BOJ)</td>
                            <td class="font-mono">~16.8%</td>
                            <td>Premier Asian safe-haven; global carry trade standard</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-primary">GBP (£)</td>
                            <td>British Pound Sterling</td>
                            <td>Bank of England (BOE)</td>
                            <td class="font-mono">~12.9%</td>
                            <td>Oldest active currency; London financial market hub</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-primary">INR (₹)</td>
                            <td>Indian Rupee</td>
                            <td>Reserve Bank of India (RBI)</td>
                            <td class="font-mono">Expanding</td>
                            <td>Fastest growing major Asian currency; UPI global trade</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</x-tool-paper>

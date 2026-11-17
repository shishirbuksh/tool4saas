<x-card class="p-6 md:p-8" x-data="{
    amount: 1000,
    rate: 3.5,
    years: 10,
    init() {
        const params = new URLSearchParams(window.location.search);
        if (params.has('amount')) this.amount = parseFloat(params.get('amount')) || this.amount;
        if (params.has('rate')) this.rate = parseFloat(params.get('rate')) || this.rate;
        if (params.has('years')) this.years = parseFloat(params.get('years')) || this.years;
    },
    setPreset(amount, rate, years) {
        this.amount = amount;
        this.rate = rate;
        this.years = years;
    },
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
        {{-- Quick Scenario Chips --}}
        <div>
            <span class="text-xs font-bold uppercase tracking-wider text-base-content/60 font-mono block mb-2">Historical &amp; Target Inflation Scenarios:</span>
            <div class="flex flex-wrap gap-2">
                <button type="button" @click="setPreset(1000, 3.0, 10)" class="btn btn-xs rounded-full border border-base-300 bg-base-100 hover:bg-primary/20 font-mono">
                    US Long-Term (3.0% / 10 Yrs)
                </button>
                <button type="button" @click="setPreset(1000, 6.0, 5)" class="btn btn-xs rounded-full border border-base-300 bg-base-100 hover:bg-primary/20 font-mono">
                    High Inflation Spike (6.0% / 5 Yrs)
                </button>
                <button type="button" @click="setPreset(50000, 4.0, 18)" class="btn btn-xs rounded-full border border-base-300 bg-base-100 hover:bg-primary/20 font-mono">
                    College Fund ($50k @ 4% / 18 Yrs)
                </button>
                <button type="button" @click="setPreset(100000, 3.5, 25)" class="btn btn-xs rounded-full border border-base-300 bg-base-100 hover:bg-primary/20 font-mono">
                    Retirement Purchasing Power ($100k / 25 Yrs)
                </button>
            </div>
        </div>

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

        {{-- Technical Comparison: Inflation Erosion Matrix --}}
        <div class="pt-4 border-t border-base-300">
            <h3 class="font-bold text-base sm:text-lg text-base-content font-display mb-4">
                Purchasing Power Depreciation Matrix ($100 Baseline over 5, 10, 20 &amp; 30 Years)
            </h3>
            <div class="overflow-x-auto rounded-3xl border border-base-300">
                <table class="table table-zebra w-full text-xs sm:text-sm">
                    <thead class="bg-base-200 text-base-content/70 uppercase text-[11px] font-mono">
                        <tr>
                            <th>Time Horizon</th>
                            <th>Value at 2% CPI (Target)</th>
                            <th>Value at 3% CPI (Avg)</th>
                            <th>Value at 5% CPI (High)</th>
                            <th>Purchasing Power Lost</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="font-bold font-mono">5 Years</td>
                            <td class="font-mono">$90.57</td>
                            <td class="font-mono">$86.26</td>
                            <td class="font-mono">$78.35</td>
                            <td class="text-warning font-mono">−9.4% to −21.6%</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">10 Years</td>
                            <td class="font-mono">$82.03</td>
                            <td class="font-mono">$74.41</td>
                            <td class="font-mono">$61.39</td>
                            <td class="text-warning font-mono">−18.0% to −38.6%</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">20 Years</td>
                            <td class="font-mono">$67.30</td>
                            <td class="font-mono">$55.37</td>
                            <td class="font-mono">$37.69</td>
                            <td class="text-error font-mono font-bold">−32.7% to −62.3%</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">30 Years</td>
                            <td class="font-mono">$55.21</td>
                            <td class="font-mono">$41.20</td>
                            <td class="font-mono text-error font-bold">$23.14</td>
                            <td class="text-error font-mono font-bold">−44.8% to −76.9%</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</x-card>

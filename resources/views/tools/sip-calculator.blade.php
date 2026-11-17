<x-tool-paper x-data="{
    monthly: 500,
    rate: 12,
    years: 10,
    currencySymbol: '$',
    init() {
        const p = new URLSearchParams(window.location.search);
        if (p.has('monthly')) this.monthly = Math.max(0, parseFloat(p.get('monthly')) || this.monthly);
        if (p.has('rate')) this.rate = Math.max(0, parseFloat(p.get('rate')) || this.rate);
        if (p.has('years')) this.years = Math.max(1, parseFloat(p.get('years')) || this.years);
        if (p.has('currency')) this.currencySymbol = p.get('currency');
    },
    get months() {
        return Math.max(1, Math.round((parseFloat(this.years) || 0) * 12));
    },
    get invested() {
        const m = Math.max(0, parseFloat(this.monthly) || 0);
        return m * this.months;
    },
    get futureValue() {
        const m = Math.max(0, parseFloat(this.monthly) || 0);
        const annualRate = Math.max(0, parseFloat(this.rate) || 0);
        const n = this.months;
        if (m <= 0 || n <= 0) return 0;
        const mr = annualRate / 100 / 12;
        if (mr === 0) return m * n;
        return m * ((Math.pow(1 + mr, n) - 1) / mr) * (1 + mr);
    },
    get estimatedGains() {
        return Math.max(0, this.futureValue - this.invested);
    },
    get gainPercent() {
        if (this.invested <= 0) return 0;
        return Math.round((this.estimatedGains / this.invested) * 100);
    }
}">
    <div class="space-y-6">
        {{-- Inputs Grid --}}
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <x-numeric-field label="Monthly Investment" model="monthly" prefix="$" placeholder="500" />
            <x-numeric-field label="Expected Return (% p.a.)" model="rate" suffix="%" step="0.5" placeholder="12" />
            <x-numeric-field label="Investment Period (Years)" model="years" suffix="Yrs" min="1" max="40" placeholder="10" />
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

        {{-- Polarity-Flipped Dark Hero Card --}}
        <div class="p-6 sm:p-9 rounded-3xl bg-[#0e0f0c] text-white border border-[#242a20] shadow-sm text-center">
            <span class="text-xs font-bold uppercase tracking-wider text-[#868685] font-mono">Expected Maturity Value</span>
            <div class="text-4xl sm:text-6xl font-black text-primary my-2 font-display tabular-nums">
                <span x-text="currencySymbol"></span><span x-text="Math.round(futureValue).toLocaleString()"></span>
            </div>
            <p class="text-xs sm:text-sm text-[#868685]">
                Total returns compounded over <span x-text="months"></span> monthly contributions (<span x-text="years"></span> years)
            </p>
        </div>

        {{-- Summary Metrics --}}
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div class="p-5 rounded-2xl bg-base-200/70 border border-base-300">
                <span class="text-[11px] font-bold text-base-content/60 uppercase tracking-wider font-mono">Invested Amount</span>
                <div class="text-2xl font-black text-base-content mt-1 font-display tabular-nums">
                    <span x-text="currencySymbol"></span><span x-text="Math.round(invested).toLocaleString()"></span>
                </div>
            </div>
            <div class="p-5 rounded-2xl bg-base-200/70 border border-base-300">
                <span class="text-[11px] font-bold text-base-content/60 uppercase tracking-wider font-mono">Estimated Returns</span>
                <div class="text-2xl font-black text-[#2ead4b] mt-1 font-display tabular-nums">
                    +<span x-text="currencySymbol"></span><span x-text="Math.round(estimatedGains).toLocaleString()"></span>
                </div>
            </div>
            <div class="p-5 rounded-2xl bg-base-200/70 border border-base-300">
                <span class="text-[11px] font-bold text-base-content/60 uppercase tracking-wider font-mono">Wealth Multiple</span>
                <div class="text-2xl font-black text-base-content mt-1 font-display tabular-nums">
                    +<span x-text="gainPercent"></span>%
                </div>
            </div>
        </div>

        <div class="p-4 rounded-2xl bg-base-100 border border-base-300 text-xs text-base-content/70 flex items-center gap-3">
            <svg class="size-5 text-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Mutual fund and equity investments are subject to market risks. Past returns are not indicative of future performance.</span>
        </div>

        {{-- Technical Comparison: SIP vs Lump Sum --}}
        <div class="pt-4 border-t border-base-300">
            <h3 class="font-bold text-base sm:text-lg text-base-content font-display mb-4">
                SIP (Systematic Investment) vs. Lump Sum Investment Comparison
            </h3>
            <div class="overflow-x-auto rounded-3xl border border-base-300">
                <table class="table table-zebra w-full text-xs sm:text-sm">
                    <thead class="bg-base-200 text-base-content/70 uppercase text-[11px] font-mono">
                        <tr>
                            <th>Investment Parameter</th>
                            <th>SIP (Systematic Plan)</th>
                            <th>Lump Sum Investment</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="font-bold font-mono">Capital Deployment</td>
                            <td>Fixed monthly installments (e.g. $100/mo)</td>
                            <td>Single upfront capital deposit (e.g. $12,000)</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">Market Timing Risk</td>
                            <td>Zero market timing required; rupee/dollar cost averaging</td>
                            <td>High timing risk; vulnerable if entered at market peak</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">Volatility Management</td>
                            <td>Buys more mutual fund units during market corrections</td>
                            <td>Fixed unit count; entire capital exposed to fluctuations</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">Income Suitability</td>
                            <td>Ideal for salaried earners with regular monthly cash flow</td>
                            <td>Ideal for windfalls, bonuses, dividends, or asset sales</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">Behavioral Advantage</td>
                            <td>Eliminates emotional impulse; enforces automated investing</td>
                            <td>Requires discipline to avoid panic-selling during drawdowns</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</x-tool-paper>

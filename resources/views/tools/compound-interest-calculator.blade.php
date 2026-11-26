<x-tool-paper x-data="{
    principal: 10000,
    rate: 8,
    years: 5,
    freq: 12,
    currency: 'USD',
    currencySymbol: '$',
    init() {
        const params = new URLSearchParams(window.location.search);
        if (params.has('principal')) {
            const p = parseFloat(params.get('principal'));
            if (!isNaN(p) && p > 0) this.principal = p;
        }
        if (params.has('rate')) {
            const r = parseFloat(params.get('rate'));
            if (!isNaN(r) && r >= 0) this.rate = r;
        }
        if (params.has('years')) {
            const y = parseFloat(params.get('years'));
            if (!isNaN(y) && y > 0) this.years = y;
        }
        if (params.has('freq')) {
            const f = parseInt(params.get('freq'), 10);
            if ([1, 2, 4, 12, 365].includes(f)) this.freq = f;
        }
        if (params.has('currency')) {
            const c = params.get('currency');
            if (['USD', 'EUR', 'GBP', 'INR', '$', '€', '£', '₹'].includes(c)) {
                const syms = { 'USD': '$', 'EUR': '€', 'GBP': '£', 'INR': '₹', '$': '$', '€': '€', '£': '£', '₹': '₹' };
                this.currencySymbol = syms[c] || '$';
            }
        }
    },
    setPreset(p, r, y, f) {
        this.principal = p;
        this.rate = r;
        this.years = y;
        this.freq = f;
    },
    get totalAmount() {
        const p = Math.max(0, parseFloat(this.principal) || 0);
        const r = Math.max(0, parseFloat(this.rate) || 0) / 100;
        const y = Math.max(0, parseFloat(this.years) || 0);
        const n = parseInt(this.freq, 10) || 1;
        if (!p || !y) return 0;
        return p * Math.pow(1 + (r / n), n * y);
    },
    get interestEarned() {
        const p = Math.max(0, parseFloat(this.principal) || 0);
        return Math.max(0, this.totalAmount - p);
    },
    updateCurrency(code, symbol) {
        this.currency = code;
        this.currencySymbol = symbol;
    },
    exportScheduleCsv() {
        const p = Math.max(0, parseFloat(this.principal) || 0);
        const r = Math.max(0, parseFloat(this.rate) || 0) / 100;
        const totalYears = Math.max(1, parseInt(this.years, 10) || 1);
        const n = parseInt(this.freq, 10) || 1;
        let csv = 'Year,Starting Principal,Interest Earned,Ending Balance\n';
        let currentBalance = p;
        for (let y = 1; y <= totalYears; y++) {
            const startBal = currentBalance;
            const endBal = p * Math.pow(1 + (r / n), n * y);
            const yrInterest = endBal - startBal;
            currentBalance = endBal;
            csv += [y, startBal.toFixed(2), yrInterest.toFixed(2), endBal.toFixed(2)].join(',') + '\n';
        }
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'compound-interest-growth-schedule.csv';
        a.click();
    }
}">
    <div class="space-y-6">
        {{-- Quick Compounding Presets --}}
        <div>
            <span class="text-xs font-bold text-base-content/60 block mb-2 uppercase tracking-wider font-mono">Popular Investment Horizons</span>
            <div class="flex flex-wrap gap-2">
                <button type="button" @click="setPreset(10000, 8.0, 10, 12)" class="px-3.5 py-1.5 rounded-full bg-base-200 border border-base-300 text-xs font-semibold hover:border-primary hover:bg-[#e2f6d5] transition-all"><span x-text="currencySymbol"></span>10k @ 8% for 10 Yrs (Index Fund)</button>
                <button type="button" @click="setPreset(25000, 5.0, 5, 12)" class="px-3.5 py-1.5 rounded-full bg-base-200 border border-base-300 text-xs font-semibold hover:border-primary hover:bg-[#e2f6d5] transition-all"><span x-text="currencySymbol"></span>25k @ 5% for 5 Yrs (HYSA / CD)</button>
                <button type="button" @click="setPreset(50000, 10.0, 20, 12)" class="px-3.5 py-1.5 rounded-full bg-base-200 border border-base-300 text-xs font-semibold hover:border-primary hover:bg-[#e2f6d5] transition-all"><span x-text="currencySymbol"></span>50k @ 10% for 20 Yrs (Retirement)</button>
                <button type="button" @click="setPreset(100000, 10.0, 30, 12)" class="px-3.5 py-1.5 rounded-full bg-base-200 border border-base-300 text-xs font-semibold hover:border-primary hover:bg-[#e2f6d5] transition-all"><span x-text="currencySymbol"></span>100k @ 10% for 30 Yrs (Wealth Compound)</button>
            </div>
        </div>

        {{-- Inputs Grid --}}
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <x-numeric-field label="Principal Deposit" model="principal" prefix="$" placeholder="10000" />
            <x-numeric-field label="Annual Rate (%)" model="rate" suffix="%" step="0.1" placeholder="8.0" />
            <x-numeric-field label="Investment Term" model="years" suffix="Yrs" min="1" max="50" placeholder="5" />
            <div class="form-control">
                <label class="label py-1"><span class="label-text font-bold text-xs uppercase tracking-wider text-base-content/60 font-mono">Frequency</span></label>
                <select x-model.number="freq" class="select select-bordered rounded-xl w-full text-sm">
                    <option value="1">Annually (1x/yr)</option>
                    <option value="2">Semi-Annually (2x/yr)</option>
                    <option value="4">Quarterly (4x/yr)</option>
                    <option value="12">Monthly (12x/yr)</option>
                    <option value="365">Daily (365x/yr)</option>
                </select>
            </div>
        </div>

        {{-- Polarity-Flipped Dark Hero Card --}}
        <div class="p-6 sm:p-9 rounded-3xl bg-[#0e0f0c] text-white border border-[#242a20] shadow-sm text-center">
            <span class="text-xs font-bold uppercase tracking-wider text-[#868685] font-mono">Projected Total Balance</span>
            <div class="text-4xl sm:text-6xl font-black text-primary my-2 font-display tabular-nums">
                <span x-text="currencySymbol"></span><span x-text="Math.round(totalAmount).toLocaleString()"></span>
            </div>
            <p class="text-xs sm:text-sm text-[#868685]">
                Includes <span class="font-bold text-white"><span x-text="currencySymbol"></span><span x-text="Math.round(interestEarned).toLocaleString()"></span></span> compound interest over <span x-text="years"></span> years
            </p>
            <div class="mt-5 flex items-center justify-center gap-3">
                <button
                    type="button"
                    @click="exportScheduleCsv()"
                    class="px-5 py-2.5 rounded-full bg-primary text-primary-content text-xs font-bold hover:bg-[#cdffad] transition-all shadow-xs inline-flex items-center gap-2 cursor-pointer"
                >
                    <span>📥</span>
                    <span>Export Annual Compounding Schedule (.CSV)</span>
                </button>
            </div>
        </div>

        {{-- Growth Breakdown Cards --}}
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div class="p-5 rounded-2xl bg-base-200/70 border border-base-300">
                <span class="text-[11px] font-bold text-base-content/60 uppercase tracking-wider font-mono">Starting Principal</span>
                <div class="text-2xl font-black text-base-content mt-1 font-display tabular-nums">
                    <span x-text="currencySymbol"></span><span x-text="Number(principal).toLocaleString()"></span>
                </div>
            </div>
            <div class="p-5 rounded-2xl bg-base-200/70 border border-base-300">
                <span class="text-[11px] font-bold text-base-content/60 uppercase tracking-wider font-mono">Total Interest</span>
                <div class="text-2xl font-black text-[#2ead4b] mt-1 font-display tabular-nums">
                    +<span x-text="currencySymbol"></span><span x-text="Math.round(interestEarned).toLocaleString()"></span>
                </div>
            </div>
            <div class="p-5 rounded-2xl bg-base-200/70 border border-base-300">
                <span class="text-[11px] font-bold text-base-content/60 uppercase tracking-wider font-mono">Total Growth</span>
                <div class="text-2xl font-black text-base-content mt-1 font-display tabular-nums">
                    +<span x-text="principal > 0 ? Math.round((interestEarned / principal) * 100) : 0"></span>%
                </div>
            </div>
        </div>

        {{-- Technical Comparison: Compounding Frequency Yield Matrix --}}
        <div class="mt-8 pt-6 border-t border-base-300">
            <h3 class="font-bold text-base sm:text-lg text-base-content font-display mb-4">
                Compounding Frequency Yield Impact Comparison ($10,000 at 8% APR for 10 Years)
            </h3>
            <div class="overflow-x-auto rounded-3xl border border-base-300">
                <table class="table table-zebra w-full text-xs sm:text-sm">
                    <thead class="bg-base-200 text-base-content/70 uppercase text-[11px] font-mono">
                        <tr>
                            <th>Compounding Interval</th>
                            <th>Periods / Yr (n)</th>
                            <th>Effective APY</th>
                            <th>Final Wealth (10 Yrs)</th>
                            <th>Compounding Gain</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="font-bold font-mono">Annual Compounding</td>
                            <td class="font-mono">n = 1</td>
                            <td class="font-mono">8.000%</td>
                            <td class="font-mono">$21,589.25</td>
                            <td class="text-base-content/60">Baseline</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">Semi-Annual</td>
                            <td class="font-mono">n = 2</td>
                            <td class="font-mono">8.160%</td>
                            <td class="font-mono">$21,911.23</td>
                            <td class="text-[#2ead4b]">+$321.98</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">Quarterly</td>
                            <td class="font-mono">n = 4</td>
                            <td class="font-mono">8.243%</td>
                            <td class="font-mono">$22,080.40</td>
                            <td class="text-[#2ead4b]">+$491.15</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">Monthly</td>
                            <td class="font-mono">n = 12</td>
                            <td class="font-mono">8.300%</td>
                            <td class="font-mono">$22,196.40</td>
                            <td class="text-[#2ead4b]">+$607.15</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">Daily (Standard Bank)</td>
                            <td class="font-mono">n = 365</td>
                            <td class="font-mono">8.328%</td>
                            <td class="font-mono text-primary font-bold">$22,253.46</td>
                            <td class="text-[#2ead4b] font-bold">+$664.21</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</x-tool-paper>

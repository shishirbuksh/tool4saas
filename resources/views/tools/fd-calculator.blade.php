<x-tool-paper x-data="{
    principal: 100000,
    rate: 7.1,
    years: 5,
    currencySymbol: '₹',
    init() {
        const params = new URLSearchParams(window.location.search);
        if (params.has('principal')) this.principal = parseFloat(params.get('principal')) || this.principal;
        if (params.has('rate')) this.rate = parseFloat(params.get('rate')) || this.rate;
        if (params.has('years')) this.years = parseFloat(params.get('years')) || this.years;
        if (params.has('currency')) this.currencySymbol = params.get('currency');
    },
    setPreset(principal, rate, years, currency) {
        this.principal = principal;
        this.rate = rate;
        this.years = years;
        if (currency) this.currencySymbol = currency;
    },
    get numP() { return Math.max(0, parseFloat(this.principal) || 0); },
    get numR() { return Math.max(0, parseFloat(this.rate) || 0); },
    get numY() { return Math.max(0, parseFloat(this.years) || 0); },
    get maturity() {
        if (this.numP <= 0 || this.numY <= 0) return 0;
        return this.numP * Math.pow(1 + (this.numR / 400), 4 * this.numY);
    },
    get interestEarned() {
        return Math.max(0, this.maturity - this.numP);
    },
    get effectiveYield() {
        if (this.numY <= 0 || this.numP <= 0) return 0;
        return ((Math.pow(1 + (this.numR / 400), 4) - 1) * 100).toFixed(2);
    }
}">
    <div class="space-y-6">
        {{-- Quick Scenario Chips --}}
        <div>
            <span class="text-xs font-bold uppercase tracking-wider text-base-content/60 font-mono block mb-2">Popular Fixed Deposit Tenures:</span>
            <div class="flex flex-wrap gap-2">
                <button type="button" @click="setPreset(100000, 7.1, 1, '₹')" class="btn btn-xs rounded-full border border-base-300 bg-base-100 hover:bg-primary/20 font-mono">
                    ₹1 Lakh @ 7.1% 1 Yr
                </button>
                <button type="button" @click="setPreset(500000, 7.5, 3, '₹')" class="btn btn-xs rounded-full border border-base-300 bg-base-100 hover:bg-primary/20 font-mono">
                    ₹5 Lakh @ 7.5% 3 Yrs
                </button>
                <button type="button" @click="setPreset(150000, 7.25, 5, '₹')" class="btn btn-xs rounded-full border border-base-300 bg-base-100 hover:bg-primary/20 font-mono">
                    Tax Saver 5 Yrs (₹1.5L @ 7.25%)
                </button>
                <button type="button" @click="setPreset(1000000, 7.75, 5, '₹')" class="btn btn-xs rounded-full border border-base-300 bg-base-100 hover:bg-primary/20 font-mono">
                    Senior Citizen (₹10L @ 7.75% 5 Yrs)
                </button>
            </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <x-numeric-field label="Deposit Principal" model="principal" prefix="₹" placeholder="100000" />
            <x-numeric-field label="Interest Rate (% p.a.)" model="rate" suffix="%" step="0.1" placeholder="7.1" />
            <x-numeric-field label="Tenure (Years)" model="years" suffix="Yrs" min="1" max="25" placeholder="5" />
            <div class="form-control">
                <label class="label py-1"><span class="label-text font-bold text-xs uppercase tracking-wider text-base-content/60 font-mono">Currency</span></label>
                <select x-model="currencySymbol" class="select select-bordered rounded-xl w-full text-sm">
                    <option value="₹">INR (₹)</option>
                    <option value="$">USD / CAD / AUD ($)</option>
                    <option value="€">EUR (€)</option>
                    <option value="£">GBP (£)</option>
                </select>
            </div>
        </div>

        {{-- Polarity-Flipped Dark Hero Display --}}
        <div class="p-6 sm:p-9 rounded-3xl bg-[#0e0f0c] text-white border border-[#242a20] shadow-sm text-center">
            <span class="text-xs font-bold uppercase tracking-wider text-[#868685] font-mono">Total Maturity Value (Quarterly Compounded)</span>
            <div class="text-4xl sm:text-6xl font-black text-primary my-2 font-display tabular-nums">
                <span x-text="currencySymbol"></span><span x-text="Math.round(maturity).toLocaleString()"></span>
            </div>
            <p class="text-xs sm:text-sm text-[#868685]">
                Standard bank quarterly rest formula: A = P × (1 + r/400)<sup>4t</sup>
            </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div class="p-5 rounded-2xl bg-base-200/70 border border-base-300">
                <span class="text-[11px] font-bold text-base-content/60 uppercase tracking-wider font-mono">Principal Invested</span>
                <div class="text-2xl font-black text-base-content mt-1 font-display tabular-nums">
                    <span x-text="currencySymbol"></span><span x-text="Number(principal).toLocaleString()"></span>
                </div>
            </div>
            <div class="p-5 rounded-2xl bg-base-200/70 border border-base-300">
                <span class="text-[11px] font-bold text-base-content/60 uppercase tracking-wider font-mono">Total Interest Accrued</span>
                <div class="text-2xl font-black text-[#2ead4b] mt-1 font-display tabular-nums">
                    +<span x-text="currencySymbol"></span><span x-text="Math.round(interestEarned).toLocaleString()"></span>
                </div>
            </div>
            <div class="p-5 rounded-2xl bg-base-200/70 border border-base-300">
                <span class="text-[11px] font-bold text-base-content/60 uppercase tracking-wider font-mono">Effective Annual Yield (APY)</span>
                <div class="text-2xl font-black text-primary mt-1 font-display tabular-nums">
                    <span x-text="effectiveYield"></span>% p.a.
                </div>
            </div>
        </div>

        {{-- Technical Comparison: FD Compounding Frequency Matrix --}}
        <div class="mt-8 pt-6 border-t border-base-300">
            <h3 class="font-bold text-base sm:text-lg text-base-content font-display mb-4">
                Fixed Deposit (FD) Compounding Frequency vs. Effective Annual Yield (APY) Matrix
            </h3>
            <div class="overflow-x-auto rounded-3xl border border-base-300">
                <table class="table table-zebra w-full text-xs sm:text-sm">
                    <thead class="bg-base-200 text-base-content/70 uppercase text-[11px] font-mono">
                        <tr>
                            <th>Compounding Frequency</th>
                            <th>Periods / Year (n)</th>
                            <th>Nominal 7.00% APY Yield</th>
                            <th>Nominal 8.00% APY Yield</th>
                            <th>Bank Application &amp; Payout Rules</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="font-bold font-mono text-primary">Quarterly Compounding</td>
                            <td class="font-mono font-bold">n = 4</td>
                            <td class="font-mono font-bold text-success">7.186% APY</td>
                            <td class="font-mono font-bold text-success">8.243% APY</td>
                            <td>Indian Banking Standard (SBI, HDFC, ICICI, PNB)</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-primary">Monthly Compounding</td>
                            <td class="font-mono font-bold">n = 12</td>
                            <td class="font-mono font-bold text-success">7.229% APY</td>
                            <td class="font-mono font-bold text-success">8.300% APY</td>
                            <td>Corporate FDs &amp; NBFC high-yield fixed deposits</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">Half-Yearly (Semi-Annual)</td>
                            <td class="font-mono">n = 2</td>
                            <td class="font-mono">7.123% APY</td>
                            <td class="font-mono">8.160% APY</td>
                            <td>Government sovereign savings bonds (RBI 7.15%)</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">Annual Compounding</td>
                            <td class="font-mono">n = 1</td>
                            <td class="font-mono">7.000% APY</td>
                            <td class="font-mono">8.000% APY</td>
                            <td>Post office time deposits &amp; simple reinvestment</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</x-tool-paper>

<x-tool-paper x-data="{
    principal: 100000,
    rate: 7.1,
    years: 5,
    currencySymbol: '₹',
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
    </div>
</x-tool-paper>

<x-tool-paper x-data="{
    gross: 75000,
    taxRate: 22,
    deductions: 5000,
    freq: 12,
    currencySymbol: '$',
    get numGross() { return Math.max(0, parseFloat(this.gross) || 0); },
    get numTaxRate() { return Math.max(0, parseFloat(this.taxRate) || 0) / 100; },
    get numDed() { return Math.max(0, parseFloat(this.deductions) || 0); },
    get taxableIncome() {
        return Math.max(0, this.numGross - this.numDed);
    },
    get annualTax() {
        return this.taxableIncome * this.numTaxRate;
    },
    get netAnnual() {
        return Math.max(0, this.numGross - this.annualTax);
    },
    get perPaycheck() {
        const divisor = parseInt(this.freq, 10) || 12;
        return this.netAnnual / divisor;
    }
}">
    <div class="space-y-6">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <x-numeric-field label="Gross Annual Salary" model="gross" prefix="$" placeholder="75000" />
            <x-numeric-field label="Est. Tax Rate (%)" model="taxRate" suffix="%" step="0.5" placeholder="22" />
            <x-numeric-field label="Pre-Tax Deductions" model="deductions" prefix="$" placeholder="5000" />
            <div class="form-control">
                <label class="label py-1"><span class="label-text font-bold text-xs uppercase tracking-wider text-base-content/60 font-mono">Currency</span></label>
                <select x-model="currencySymbol" class="select select-bordered rounded-xl w-full text-sm">
                    <option value="$">USD / CAD / AUD ($)</option>
                    <option value="€">EUR (€)</option>
                    <option value="£">GBP (£)</option>
                    <option value="₹">INR (₹)</option>
                </select>
            </div>
        </div>

        <div class="form-control max-w-xs">
            <label class="label py-1"><span class="label-text font-bold text-xs uppercase tracking-wider text-base-content/60 font-mono">Paycheck Frequency</span></label>
            <select x-model.number="freq" class="select select-bordered rounded-xl w-full text-sm">
                <option value="12">Monthly (12 paychecks / yr)</option>
                <option value="24">Semi-Monthly (24 paychecks / yr)</option>
                <option value="26">Bi-Weekly (26 paychecks / yr)</option>
                <option value="52">Weekly (52 paychecks / yr)</option>
            </select>
        </div>

        {{-- Polarity-Flipped Dark Hero Display --}}
        <div class="p-6 sm:p-9 rounded-3xl bg-[#0e0f0c] text-white border border-[#242a20] shadow-sm text-center">
            <span class="text-xs font-bold uppercase tracking-wider text-[#868685] font-mono">Net Annual Take-Home Pay</span>
            <div class="text-4xl sm:text-6xl font-black text-primary my-2 font-display tabular-nums">
                <span x-text="currencySymbol"></span><span x-text="Math.round(netAnnual).toLocaleString()"></span>
            </div>
            <p class="text-xs sm:text-sm text-[#868685]">
                Equivalent to <span class="text-white font-bold"><span x-text="currencySymbol"></span><span x-text="Math.round(perPaycheck).toLocaleString()"></span></span> per paycheck (<span x-text="freq == 12 ? 'Monthly' : (freq == 26 ? 'Bi-Weekly' : 'Weekly')"></span>)
            </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div class="p-5 rounded-2xl bg-base-200/70 border border-base-300">
                <span class="text-[11px] font-bold text-base-content/60 uppercase tracking-wider font-mono">Gross Base Pay</span>
                <div class="text-2xl font-black text-base-content mt-1 font-display tabular-nums">
                    <span x-text="currencySymbol"></span><span x-text="Number(gross).toLocaleString()"></span>
                </div>
            </div>
            <div class="p-5 rounded-2xl bg-base-200/70 border border-base-300">
                <span class="text-[11px] font-bold text-base-content/60 uppercase tracking-wider font-mono">Total Tax Withholding</span>
                <div class="text-2xl font-black text-warning mt-1 font-display tabular-nums">
                    −<span x-text="currencySymbol"></span><span x-text="Math.round(annualTax).toLocaleString()"></span>
                </div>
            </div>
            <div class="p-5 rounded-2xl bg-base-200/70 border border-base-300">
                <span class="text-[11px] font-bold text-base-content/60 uppercase tracking-wider font-mono">Effective Tax Rate</span>
                <div class="text-2xl font-black text-base-content mt-1 font-display tabular-nums">
                    <span x-text="numGross > 0 ? Math.round((annualTax / numGross) * 100) : 0"></span>%
                </div>
            </div>
        </div>
    </div>
</x-tool-paper>

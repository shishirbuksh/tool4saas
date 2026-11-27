<x-tool-paper x-data="{
    gross: 75000,
    taxRate: 22,
    deductions: 5000,
    freq: 12,
    currencySymbol: '$',
    init() {
        const params = new URLSearchParams(window.location.search);
        if (params.has('gross')) {
            const val = parseFloat(params.get('gross'));
            if (!isNaN(val) && val > 0) this.gross = val;
        }
        if (params.has('taxRate')) {
            const val = parseFloat(params.get('taxRate'));
            if (!isNaN(val) && val >= 0) this.taxRate = val;
        }
        if (params.has('freq')) {
            const val = parseInt(params.get('freq'), 10);
            if ([12, 24, 26, 52].includes(val)) this.freq = val;
        }
        if (params.has('currency')) {
            const c = params.get('currency');
            if (['$', '€', '£', '₹'].includes(c)) this.currencySymbol = c;
        }
    },
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
                <select aria-label="Currency" x-model="currencySymbol" class="select select-bordered rounded-xl w-full text-sm">
                    <option value="$">USD / CAD / AUD ($)</option>
                    <option value="€">EUR (€)</option>
                    <option value="£">GBP (£)</option>
                    <option value="₹">INR (₹)</option>
                </select>
            </div>
        </div>

        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div class="form-control max-w-xs">
                <label class="label py-1"><span class="label-text font-bold text-xs uppercase tracking-wider text-base-content/60 font-mono">Paycheck Frequency</span></label>
                <select aria-label="Paycheck Frequency" x-model.number="freq" class="select select-bordered rounded-xl w-full text-sm">
                    <option value="12">Monthly (12 paychecks / yr)</option>
                    <option value="24">Semi-Monthly (24 paychecks / yr)</option>
                    <option value="26">Bi-Weekly (26 paychecks / yr)</option>
                    <option value="52">Weekly (52 paychecks / yr)</option>
                </select>
            </div>

            <div>
                <span class="text-xs font-bold text-base-content/60 block mb-2 uppercase tracking-wider font-mono">Benchmark Annual Salaries</span>
                <div class="flex flex-wrap gap-1.5">
                    <button type="button" @click="gross = 50000" :class="gross == 50000 ? 'bg-[#163300] text-[#9fe870] border-[#163300]' : 'bg-base-200 border-base-300 text-base-content/80 hover:bg-base-300'" class="px-3 py-1.5 rounded-full border text-xs font-bold transition-all"><span x-text="currencySymbol"></span>50,000 / yr</button>
                    <button type="button" @click="gross = 75000" :class="gross == 75000 ? 'bg-[#163300] text-[#9fe870] border-[#163300]' : 'bg-base-200 border-base-300 text-base-content/80 hover:bg-base-300'" class="px-3 py-1.5 rounded-full border text-xs font-bold transition-all"><span x-text="currencySymbol"></span>75,000 / yr</button>
                    <button type="button" @click="gross = 100000" :class="gross == 100000 ? 'bg-[#163300] text-[#9fe870] border-[#163300]' : 'bg-base-200 border-base-300 text-base-content/80 hover:bg-base-300'" class="px-3 py-1.5 rounded-full border text-xs font-bold transition-all"><span x-text="currencySymbol"></span>100,000 / yr</button>
                    <button type="button" @click="gross = 150000" :class="gross == 150000 ? 'bg-[#163300] text-[#9fe870] border-[#163300]' : 'bg-base-200 border-base-300 text-base-content/80 hover:bg-base-300'" class="px-3 py-1.5 rounded-full border text-xs font-bold transition-all"><span x-text="currencySymbol"></span>150,000 / yr</button>
                    <button type="button" @click="gross = 200000" :class="gross == 200000 ? 'bg-[#163300] text-[#9fe870] border-[#163300]' : 'bg-base-200 border-base-300 text-base-content/80 hover:bg-base-300'" class="px-3 py-1.5 rounded-full border text-xs font-bold transition-all"><span x-text="currencySymbol"></span>200,000 / yr</button>
                </div>
            </div>
        </div>

        {{-- International Country Presets --}}
        <div>
            <span class="text-xs font-bold text-base-content/60 block mb-2 uppercase tracking-wider font-mono">International Salary Standards:</span>
            <div class="flex flex-wrap gap-2">
                <button type="button" @click="gross = 120000; taxRate = 24; freq = 26; currencySymbol = '$'" class="btn btn-xs rounded-full border border-base-300 bg-base-100 hover:bg-primary/20 font-mono">
                    US Tech ($120k / 24% Bi-Weekly)
                </button>
                <button type="button" @click="gross = 45000; taxRate = 20; freq = 12; currencySymbol = '£'" class="btn btn-xs rounded-full border border-base-300 bg-base-100 hover:bg-primary/20 font-mono">
                    UK Average (£45k / 20% Monthly)
                </button>
                <button type="button" @click="gross = 65000; taxRate = 32; freq = 12; currencySymbol = '€'" class="btn btn-xs rounded-full border border-base-300 bg-base-100 hover:bg-primary/20 font-mono">
                    EU Professional (€65k / 32% Monthly)
                </button>
                <button type="button" @click="gross = 1800000; taxRate = 15; freq = 12; currencySymbol = '₹'" class="btn btn-xs rounded-full border border-base-300 bg-base-100 hover:bg-primary/20 font-mono">
                    India CTC (₹18 Lakh / 15% Monthly)
                </button>
            </div>
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

        {{-- Technical Comparison: Hourly to Annual Salary Conversion Matrix --}}
        <div class="pt-4 border-t border-base-300">
            <h3 class="font-bold text-base sm:text-lg text-base-content font-display mb-4">
                Hourly Wage to Annual, Monthly &amp; Weekly Salary Reference Table (40 Hrs/Wk)
            </h3>
            <div class="overflow-x-auto rounded-3xl border border-base-300">
                <table class="table table-zebra w-full text-xs sm:text-sm">
                    <thead class="bg-base-200 text-base-content/70 uppercase text-[11px] font-mono">
                        <tr>
                            <th>Hourly Rate</th>
                            <th>Weekly Pay (40h)</th>
                            <th>Bi-Weekly Pay (80h)</th>
                            <th>Monthly Gross (Avg)</th>
                            <th>Annual Gross (2,080h)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="font-bold font-mono">$15.00 / hr</td>
                            <td class="font-mono">$600</td>
                            <td class="font-mono">$1,200</td>
                            <td class="font-mono">$2,600</td>
                            <td class="font-bold font-mono text-[#163300] dark:text-[#9fe870]">$31,200</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">$20.00 / hr</td>
                            <td class="font-mono">$800</td>
                            <td class="font-mono">$1,600</td>
                            <td class="font-mono">$3,467</td>
                            <td class="font-bold font-mono text-[#163300] dark:text-[#9fe870]">$41,600</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">$25.00 / hr</td>
                            <td class="font-mono">$1,000</td>
                            <td class="font-mono">$2,000</td>
                            <td class="font-mono">$4,333</td>
                            <td class="font-bold font-mono text-[#163300] dark:text-[#9fe870]">$52,000</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">$35.00 / hr</td>
                            <td class="font-mono">$1,400</td>
                            <td class="font-mono">$2,800</td>
                            <td class="font-mono">$6,067</td>
                            <td class="font-bold font-mono text-[#163300] dark:text-[#9fe870]">$72,800</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">$50.00 / hr</td>
                            <td class="font-mono">$2,000</td>
                            <td class="font-mono">$4,000</td>
                            <td class="font-mono">$8,667</td>
                            <td class="font-bold font-mono text-[#163300] dark:text-[#9fe870]">$104,000</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">$75.00 / hr</td>
                            <td class="font-mono">$3,000</td>
                            <td class="font-mono">$6,000</td>
                            <td class="font-mono">$13,000</td>
                            <td class="font-bold font-mono text-[#163300] dark:text-[#9fe870]">$156,000</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">$100.00 / hr</td>
                            <td class="font-mono">$4,000</td>
                            <td class="font-mono">$8,000</td>
                            <td class="font-mono">$17,333</td>
                            <td class="font-bold font-mono text-[#163300] dark:text-[#9fe870]">$208,000</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</x-tool-paper>

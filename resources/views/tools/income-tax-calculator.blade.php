<x-card class="p-6 md:p-8" x-data="{
    income: 75000,
    regime: 'us_single',
    get tax() {
        const inc = parseFloat(this.income) || 0;
        if (this.regime === 'us_single') {
            // US Standard Deduction ~$14,600
            const taxable = Math.max(0, inc - 14600);
            let t = 0;
            if (taxable > 100525) t += (taxable - 100525) * 0.24 + 16290;
            else if (taxable > 47150) t += (taxable - 47150) * 0.22 + 5426;
            else if (taxable > 11600) t += (taxable - 11600) * 0.12 + 1160;
            else t += taxable * 0.10;
            return t;
        } else {
            // UK standard tax
            const taxable = Math.max(0, inc - 12570);
            let t = 0;
            if (taxable > 37700) t += (taxable - 37700) * 0.40 + 7540;
            else t += taxable * 0.20;
            return t;
        }
    },
    get effectiveRate() {
        const inc = parseFloat(this.income) || 0;
        if (inc <= 0) return '0.0';
        return ((this.tax / inc) * 100).toFixed(1);
    },
    get takeHome() {
        const inc = parseFloat(this.income) || 0;
        return Math.max(0, inc - this.tax);
    }
}">
    <div class="space-y-6">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-2 text-base-content/70">Gross Annual Income</label>
                <input type="number" min="0" step="1000" x-model="income" class="input input-bordered w-full rounded-[12px] font-bold text-base" />
            </div>

            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-2 text-base-content/70">Jurisdiction & Filing Status</label>
                <select x-model="regime" class="select select-bordered w-full rounded-[12px] font-semibold text-sm">
                    <option value="us_single">United States (Federal Single Filer)</option>
                    <option value="uk_standard">United Kingdom (HMRC Standard Rate)</option>
                </select>
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div class="p-6 rounded-[20px] bg-[#163300] text-white">
                <span class="text-xs uppercase tracking-widest text-[#9fe870] font-bold font-mono">Estimated Income Tax</span>
                <p class="font-mono text-3xl font-extrabold mt-2 text-[#9fe870]" x-text="'$' + tax.toLocaleString('en-US', { maximumFractionDigits: 0 })"></p>
                <p class="text-xs text-white/70 mt-1" x-text="'Effective rate: ' + effectiveRate + '%'"></p>
            </div>

            <div class="p-6 rounded-[20px] bg-base-200/50 border border-base-300">
                <span class="text-xs uppercase tracking-widest text-base-content/60 font-bold font-mono">Net Take-Home Pay</span>
                <p class="font-mono text-3xl font-extrabold mt-2 text-[#163300] dark:text-base-content" x-text="'$' + takeHome.toLocaleString('en-US', { maximumFractionDigits: 0 })"></p>
                <p class="text-xs text-base-content/60 mt-1">Annual disposable income</p>
            </div>

            <div class="p-6 rounded-[20px] bg-base-200/50 border border-base-300">
                <span class="text-xs uppercase tracking-widest text-base-content/60 font-bold font-mono">Monthly In-Hand</span>
                <p class="font-mono text-3xl font-extrabold mt-2 text-primary" x-text="'$' + (takeHome / 12).toLocaleString('en-US', { maximumFractionDigits: 0 })"></p>
                <p class="text-xs text-base-content/60 mt-1">Average per calendar month</p>
            </div>
        </div>

        {{-- Technical Comparison: US Federal Income Tax Brackets Matrix --}}
        <div class="mt-8 pt-6 border-t border-base-300">
            <h3 class="font-bold text-base sm:text-lg text-base-content font-display mb-4">
                US Federal Marginal Income Tax Brackets &amp; Standard Deductions Matrix
            </h3>
            <div class="overflow-x-auto rounded-3xl border border-base-300">
                <table class="table table-zebra w-full text-xs sm:text-sm">
                    <thead class="bg-base-200 text-base-content/70 uppercase text-[11px] font-mono">
                        <tr>
                            <th>Marginal Tax Rate</th>
                            <th>Single Filers (Taxable Income)</th>
                            <th>Married Filing Jointly</th>
                            <th>Head of Household</th>
                            <th>Effective Tax Planning Strategy</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="font-bold font-mono text-primary">10% Bracket</td>
                            <td class="font-mono">$0 to $11,600</td>
                            <td class="font-mono">$0 to $23,200</td>
                            <td class="font-mono">$0 to $16,550</td>
                            <td>Baseline standard deduction absorbs first tier</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-primary">12% Bracket</td>
                            <td class="font-mono">$11,601 to $47,150</td>
                            <td class="font-mono">$23,201 to $94,300</td>
                            <td class="font-mono">$16,551 to $63,100</td>
                            <td>Optimal bracket for Roth IRA / 401(k) conversions</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-primary">22% Bracket</td>
                            <td class="font-mono">$47,151 to $100,525</td>
                            <td class="font-mono">$94,301 to $201,050</td>
                            <td class="font-mono">$63,101 to $100,500</td>
                            <td>Traditional 401(k) and HSA contributions reduce marginal burden</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">24% Bracket</td>
                            <td class="font-mono">$100,526 to $191,950</td>
                            <td class="font-mono">$201,051 to $383,900</td>
                            <td class="font-mono">$100,501 to $191,950</td>
                            <td>Broad plateau; back-door Roth strategies common</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">32% / 35% / 37%</td>
                            <td class="font-mono">$191,951+ to $609,350+</td>
                            <td class="font-mono">$383,901+ to $731,200+</td>
                            <td class="font-mono">$191,951+ to $609,350+</td>
                            <td class="font-bold text-error">Maximum marginal tiers; itemized deductions &amp; muni bonds</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</x-card>

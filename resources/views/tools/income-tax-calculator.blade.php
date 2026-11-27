<x-card class="p-6 md:p-8" x-data="{
    income: 75000,
    regime: 'us_single',
    get currency() {
        return this.regime === 'uk_standard' ? '£' : '$';
    },
    get locale() {
        return this.regime === 'uk_standard' ? 'en-GB' : 'en-US';
    },
    get tax() {
        const inc = Math.max(0, parseFloat(this.income) || 0);
        if (this.regime === 'us_single') {
            // 2024/2025 US Single Filer Federal Brackets after ~$14,600 Standard Deduction
            const taxable = Math.max(0, inc - 14600);
            const brackets = [
                [609350, 0.37],
                [243725, 0.35],
                [191950, 0.32],
                [100525, 0.24],
                [47150, 0.22],
                [11600, 0.12],
                [0, 0.10],
            ];
            let t = 0;
            let remaining = taxable;
            for (const [threshold, rate] of brackets) {
                if (remaining > threshold) {
                    t += (remaining - threshold) * rate;
                    remaining = threshold;
                }
            }
            return t;
        } else {
            // UK Income Tax (HMRC): £12,570 Personal Allowance tapered £1 for every £2 over £100,000
            const reduction = inc > 100000 ? Math.min(12570, (inc - 100000) / 2) : 0;
            const allowance = Math.max(0, 12570 - reduction);
            const taxable = Math.max(0, inc - allowance);
            const ukAdditionalThreshold = Math.max(0, 125140 - allowance);
            const ukHigherThreshold = 37700;
            let t = 0;
            let rem = taxable;
            if (rem > ukAdditionalThreshold) {
                t += (rem - ukAdditionalThreshold) * 0.45;
                rem = ukAdditionalThreshold;
            }
            if (rem > ukHigherThreshold) {
                t += (rem - ukHigherThreshold) * 0.40;
                rem = ukHigherThreshold;
            }
            if (rem > 0) {
                t += rem * 0.20;
            }
            return t;
        }
    },
    get effectiveRate() {
        const inc = Math.max(0, parseFloat(this.income) || 0);
        if (inc <= 0) return '0.0';
        return ((this.tax / inc) * 100).toFixed(1);
    },
    get takeHome() {
        const inc = Math.max(0, parseFloat(this.income) || 0);
        return Math.max(0, inc - this.tax);
    },
    setPreset(inc, reg) {
        this.income = inc;
        this.regime = reg;
    }
}">
    <div class="space-y-6">
        {{-- 1-Click Tax Scenarios --}}
        <div>
            <span class="text-xs font-bold uppercase tracking-wider text-base-content/60 font-mono block mb-2">1-Click Income Benchmarks:</span>
            <div class="flex flex-wrap gap-2">
                <button type="button" @click="setPreset(45000, 'us_single')" class="btn btn-xs rounded-full border border-base-300 bg-base-100 hover:border-primary hover:bg-[#e2f6d5] font-mono transition-all">
                    US Entry Salary ($45k)
                </button>
                <button type="button" @click="setPreset(85000, 'us_single')" class="btn btn-xs rounded-full border border-base-300 bg-base-100 hover:border-primary hover:bg-[#e2f6d5] font-mono transition-all">
                    US Median Tech ($85k)
                </button>
                <button type="button" @click="setPreset(150000, 'us_single')" class="btn btn-xs rounded-full border border-base-300 bg-base-100 hover:border-primary hover:bg-[#e2f6d5] font-mono transition-all">
                    US Senior Professional ($150k)
                </button>
                <button type="button" @click="setPreset(50000, 'uk_standard')" class="btn btn-xs rounded-full border border-base-300 bg-base-100 hover:border-primary hover:bg-[#e2f6d5] font-mono transition-all">
                    UK Average (£50k)
                </button>
            </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-2 text-base-content/70">Gross Annual Income</label>
                <input aria-label="Gross Annual Income" type="number" min="0" step="1000" x-model="income" class="input input-bordered w-full rounded-[12px] font-bold text-base" />
            </div>

            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-2 text-base-content/70">Jurisdiction & Filing Status</label>
                <select aria-label="Jurisdiction &amp; Filing Status" x-model="regime" class="select select-bordered w-full rounded-[12px] font-semibold text-sm">
                    <option value="us_single">United States (Federal Single Filer)</option>
                    <option value="uk_standard">United Kingdom (HMRC Standard Rate)</option>
                </select>
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div class="p-6 rounded-[20px] bg-[#163300] text-white">
                <span class="text-xs uppercase tracking-widest text-[#9fe870] font-bold font-mono">Estimated Income Tax</span>
                <p class="font-mono text-3xl font-extrabold mt-2 text-[#9fe870]" x-text="currency + tax.toLocaleString(locale, { maximumFractionDigits: 0 })"></p>
                <p class="text-xs text-white/70 mt-1" x-text="'Effective rate: ' + effectiveRate + '%'"></p>
            </div>

            <div class="p-6 rounded-[20px] bg-base-200/50 border border-base-300">
                <span class="text-xs uppercase tracking-widest text-base-content/60 font-bold font-mono">Net Take-Home Pay</span>
                <p class="font-mono text-3xl font-extrabold mt-2 text-[#163300] dark:text-[#9fe870]" x-text="currency + takeHome.toLocaleString(locale, { maximumFractionDigits: 0 })"></p>
                <p class="text-xs text-base-content/60 mt-1">Annual disposable income</p>
            </div>

            <div class="p-6 rounded-[20px] bg-base-200/50 border border-base-300">
                <span class="text-xs uppercase tracking-widest text-base-content/60 font-bold font-mono">Monthly In-Hand</span>
                <p class="font-mono text-3xl font-extrabold mt-2 text-[#163300] dark:text-[#9fe870]" x-text="currency + (takeHome / 12).toLocaleString(locale, { maximumFractionDigits: 0 })"></p>
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
                            <td class="font-bold font-mono text-[#163300] dark:text-[#9fe870]">10% Bracket</td>
                            <td class="font-mono">$0 to $11,600</td>
                            <td class="font-mono">$0 to $23,200</td>
                            <td class="font-mono">$0 to $16,550</td>
                            <td>Baseline standard deduction absorbs first tier</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-[#163300] dark:text-[#9fe870]">12% Bracket</td>
                            <td class="font-mono">$11,601 to $47,150</td>
                            <td class="font-mono">$23,201 to $94,300</td>
                            <td class="font-mono">$16,551 to $63,100</td>
                            <td>Optimal bracket for Roth IRA / 401(k) conversions</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-[#163300] dark:text-[#9fe870]">22% Bracket</td>
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

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
    </div>
</x-card>

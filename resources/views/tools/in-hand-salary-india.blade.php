<x-card class="p-6 md:p-8" x-data="{
    ctc: 1200000,
    regime: 'new',
    get inHand() {
        const gross = parseFloat(this.ctc) || 0;
        // Standard deduction FY 2024-25: ₹75,000 for new regime, ₹50,000 for old
        const stdDed = this.regime === 'new' ? 75000 : 50000;
        // Employee PF: approx 12% of basic (basic ~40-50% of CTC)
        const epf = Math.min(21600, gross * 0.05);
        const taxable = Math.max(0, gross - stdDed);

        let tax = 0;
        if (this.regime === 'new') {
            // New Regime slabs: 0-3L nil, 3-7L 5%, 7-10L 10%, 10-12L 15%, 12-15L 20%, >15L 30%
            // Section 87A rebate up to 7L
            if (taxable <= 700000) tax = 0;
            else {
                if (taxable > 1500000) tax += (taxable - 1500000) * 0.30 + 150000;
                else if (taxable > 1200000) tax += (taxable - 1200000) * 0.20 + 90000;
                else if (taxable > 1000000) tax += (taxable - 1000000) * 0.15 + 60000;
                else if (taxable > 700000) tax += (taxable - 700000) * 0.10 + 30000;
                tax += tax * 0.04; // Cess
            }
        } else {
            // Old Regime
            if (taxable > 1000000) tax += (taxable - 1000000) * 0.30 + 112500;
            else if (taxable > 500000) tax += (taxable - 500000) * 0.20 + 12500;
            else if (taxable > 250000) tax += (taxable - 250000) * 0.05;
            tax += tax * 0.04; // Cess
        }

        const netAnnual = Math.max(0, gross - tax - epf);
        return {
            annual: Math.round(netAnnual),
            monthly: Math.round(netAnnual / 12),
            tax: Math.round(tax),
            epf: Math.round(epf)
        };
    }
}">
    <div class="space-y-6">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-2 text-base-content/70">Annual CTC Package (₹)</label>
                <input type="number" min="100000" step="50000" x-model="ctc" class="input input-bordered w-full rounded-[12px] font-bold text-base" />
            </div>

            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-2 text-base-content/70">Income Tax Regime (FY 2024-25)</label>
                <select x-model="regime" class="select select-bordered w-full rounded-[12px] font-semibold text-sm">
                    <option value="new">New Tax Regime (₹75k Standard Deduction)</option>
                    <option value="old">Old Tax Regime (HRA & 80C Deductions)</option>
                </select>
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div class="p-6 rounded-[20px] bg-[#163300] text-white">
                <span class="text-xs uppercase tracking-widest text-[#9fe870] font-bold font-mono">Monthly Take-Home Salary</span>
                <p class="font-mono text-4xl font-extrabold mt-2 text-[#9fe870]" x-text="'₹' + inHand.monthly.toLocaleString('en-IN') + '/mo'"></p>
                <p class="text-xs text-white/70 mt-2" x-text="'Annual In-Hand: ₹' + inHand.annual.toLocaleString('en-IN')"></p>
            </div>

            <div class="p-6 rounded-[20px] bg-base-200/50 border border-base-300">
                <span class="text-xs uppercase tracking-widest text-base-content/60 font-bold font-mono">Total Deductions</span>
                <p class="font-mono text-4xl font-extrabold mt-2 text-error" x-text="'₹' + (inHand.tax + inHand.epf).toLocaleString('en-IN')"></p>
                <p class="text-xs text-base-content/60 mt-2" x-text="'Income Tax: ₹' + inHand.tax.toLocaleString('en-IN') + ' · EPF: ₹' + inHand.epf.toLocaleString('en-IN')"></p>
            </div>
        </div>
    </div>
</x-card>

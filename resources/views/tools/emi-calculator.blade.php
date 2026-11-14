<x-tool-paper x-data="{
    principal: 250000,
    rate: 6.5,
    tenureYears: 20,
    currencySymbol: '$',
    get months() {
        return Math.max(1, Math.round((parseFloat(this.tenureYears) || 0) * 12));
    },
    get emi() {
        const p = Math.max(0, parseFloat(this.principal) || 0);
        const annualRate = Math.max(0, parseFloat(this.rate) || 0);
        const n = this.months;
        if (p <= 0 || n <= 0) return 0;
        const mr = annualRate / 100 / 12;
        if (mr === 0) return p / n;
        return (p * mr * Math.pow(1 + mr, n)) / (Math.pow(1 + mr, n) - 1);
    },
    get totalPayment() {
        return this.emi * this.months;
    },
    get totalInterest() {
        const p = Math.max(0, parseFloat(this.principal) || 0);
        return Math.max(0, this.totalPayment - p);
    },
    get principalPercent() {
        if (this.totalPayment <= 0) return 50;
        return Math.round(((parseFloat(this.principal) || 0) / this.totalPayment) * 100);
    },
    exportScheduleCsv() {
        const p = Math.max(0, parseFloat(this.principal) || 0);
        const annualRate = Math.max(0, parseFloat(this.rate) || 0);
        const n = this.months;
        const mr = annualRate / 100 / 12;
        let balance = p;
        let csv = 'Month,Payment,Principal,Interest,Remaining Balance\n';
        for (let m = 1; m <= n; m++) {
            const interest = balance * mr;
            const princ = Math.min(this.emi - interest, balance);
            balance = Math.max(0, balance - princ);
            csv += [m, this.emi.toFixed(2), princ.toFixed(2), interest.toFixed(2), balance.toFixed(2)].join(',') + '\n';
            if (balance <= 0) break;
        }
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'emi-amortization-schedule.csv';
        a.click();
    }
}">
    <div class="space-y-6">
        {{-- Inputs Grid --}}
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <x-numeric-field label="Loan Amount" model="principal" prefix="$" placeholder="250000" />
            <x-numeric-field label="Interest Rate (% p.a.)" model="rate" suffix="%" step="0.05" placeholder="6.5" />
            <x-numeric-field label="Loan Tenure (Years)" model="tenureYears" suffix="Yrs" min="1" max="40" placeholder="20" />
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
            <span class="text-xs font-bold uppercase tracking-wider text-[#868685] font-mono">Monthly Payment (EMI)</span>
            <div class="text-4xl sm:text-6xl font-black text-primary my-2 font-display tabular-nums">
                <span x-text="currencySymbol"></span><span x-text="Math.round(emi).toLocaleString()"></span>
            </div>
            <p class="text-xs sm:text-sm text-[#868685]">
                Over <span x-text="months"></span> monthly installments (<span x-text="tenureYears"></span> years)
            </p>
        </div>

        {{-- Loan Breakdown Summary --}}
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div class="p-5 rounded-2xl bg-base-200/70 border border-base-300">
                <span class="text-[11px] font-bold text-base-content/60 uppercase tracking-wider font-mono">Principal Borrowed</span>
                <div class="text-2xl font-black text-base-content mt-1 font-display tabular-nums">
                    <span x-text="currencySymbol"></span><span x-text="Number(principal).toLocaleString()"></span>
                </div>
            </div>
            <div class="p-5 rounded-2xl bg-base-200/70 border border-base-300">
                <span class="text-[11px] font-bold text-base-content/60 uppercase tracking-wider font-mono">Total Interest</span>
                <div class="text-2xl font-black text-warning mt-1 font-display tabular-nums">
                    <span x-text="currencySymbol"></span><span x-text="Math.round(totalInterest).toLocaleString()"></span>
                </div>
            </div>
            <div class="p-5 rounded-2xl bg-base-200/70 border border-base-300">
                <span class="text-[11px] font-bold text-base-content/60 uppercase tracking-wider font-mono">Total Repayment</span>
                <div class="text-2xl font-black text-base-content mt-1 font-display tabular-nums">
                    <span x-text="currencySymbol"></span><span x-text="Math.round(totalPayment).toLocaleString()"></span>
                </div>
            </div>
        </div>

        {{-- Ratio Bar & Export Action --}}
        <div class="p-5 rounded-2xl bg-base-100 border border-base-300 space-y-3">
            <div class="flex items-center justify-between text-xs font-mono">
                <span class="text-base-content/70">Principal: <span class="font-bold text-base-content" x-text="principalPercent + '%'"></span></span>
                <span class="text-base-content/70">Interest: <span class="font-bold text-warning" x-text="(100 - principalPercent) + '%'"></span></span>
            </div>
            <div class="w-full bg-warning/30 h-3 rounded-full overflow-hidden flex">
                <div class="bg-primary h-full transition-all duration-300" :style="'width: ' + principalPercent + '%'"></div>
            </div>
            <div class="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                <span class="text-xs text-base-content/60">Amortization schedule includes principal and interest breakdown.</span>
                <button
                    type="button"
                    @click="exportScheduleCsv()"
                    class="px-4 py-2 rounded-full bg-base-200 hover:bg-primary hover:text-primary-content text-xs font-bold transition-all"
                >
                    Export Amortization CSV
                </button>
            </div>
        </div>
    </div>
</x-tool-paper>

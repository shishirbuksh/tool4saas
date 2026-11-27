<x-tool-paper x-data="{
    homePrice: 400000,
    downPayment: 80000,
    interestRate: 6.5,
    loanYears: 30,
    propertyTaxAnnual: 4800,
    homeInsuranceAnnual: 1200,
    pmiMonthly: 0,
    init() {
        const p = new URLSearchParams(window.location.search);
        if (p.has('homePrice')) { const v = parseFloat(p.get('homePrice')); if (!isNaN(v) && v >= 0) this.homePrice = v; }
        if (p.has('downPayment')) { const v = parseFloat(p.get('downPayment')); if (!isNaN(v) && v >= 0) this.downPayment = v; }
        if (p.has('interestRate')) { const v = parseFloat(p.get('interestRate')); if (!isNaN(v) && v >= 0) this.interestRate = v; }
        if (p.has('loanYears')) { const v = parseInt(p.get('loanYears'), 10); if (!isNaN(v) && v > 0) this.loanYears = v; }
        if (p.has('propertyTax')) { const v = parseFloat(p.get('propertyTax')); if (!isNaN(v) && v >= 0) this.propertyTaxAnnual = v; }
        if (p.has('insurance')) { const v = parseFloat(p.get('insurance')); if (!isNaN(v) && v >= 0) this.homeInsuranceAnnual = v; }
    },
    get loanAmount() {
        return Math.max(0, (parseFloat(this.homePrice) || 0) - Math.max(0, parseFloat(this.downPayment) || 0));
    },
    get monthlyPrincipalInterest() {
        const principal = this.loanAmount;
        const years = Math.max(1, parseInt(this.loanYears, 10) || 1);
        if (principal <= 0) return 0;
        const monthlyRate = Math.max(0, parseFloat(this.interestRate) || 0) / 100 / 12;
        const totalMonths = years * 12;
        if (monthlyRate === 0) return principal / totalMonths;
        return (principal * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths))) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
    },
    get monthlyPropertyTax() {
        return Math.max(0, parseFloat(this.propertyTaxAnnual) || 0) / 12;
    },
    get monthlyInsurance() {
        return Math.max(0, parseFloat(this.homeInsuranceAnnual) || 0) / 12;
    },
    get totalMonthlyPayment() {
        return this.monthlyPrincipalInterest + this.monthlyPropertyTax + this.monthlyInsurance + Math.max(0, parseFloat(this.pmiMonthly) || 0);
    },
    get totalInterestPaid() {
        const years = Math.max(1, parseInt(this.loanYears, 10) || 1);
        return Math.max(0, (this.monthlyPrincipalInterest * years * 12) - this.loanAmount);
    },
    exportScheduleCsv() {
        const principal = this.loanAmount;
        const years = Math.max(1, parseInt(this.loanYears, 10) || 1);
        const monthlyRate = Math.max(0, parseFloat(this.interestRate) || 0) / 100 / 12;
        const pmt = this.monthlyPrincipalInterest;
        let balance = principal;
        let csv = 'Year,Starting Balance,Principal Paid,Interest Paid,Total Installment,Ending Balance\n';
        for (let y = 1; y <= years; y++) {
            let startBal = balance;
            let yrPrincipal = 0;
            let yrInterest = 0;
            for (let m = 1; m <= 12; m++) {
                if (balance <= 0) break;
                const int = balance * monthlyRate;
                const pr = Math.min(pmt - int, balance);
                yrInterest += int;
                yrPrincipal += pr;
                balance = Math.max(0, balance - pr);
            }
            csv += [y, startBal.toFixed(2), yrPrincipal.toFixed(2), yrInterest.toFixed(2), (yrPrincipal + yrInterest).toFixed(2), balance.toFixed(2)].join(',') + '\n';
            if (balance <= 0) break;
        }
        window.downloadCsvBlob(csv, 'mortgage-amortization-schedule.csv');
    }
}">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <x-numeric-field label="Home Price" model="homePrice" prefix="$" placeholder="400000" />
        <x-numeric-field label="Down Payment" model="downPayment" prefix="$" placeholder="80000" />
        <x-numeric-field label="Interest Rate (%)" model="interestRate" suffix="%" step="0.01" placeholder="6.5" />
        <div class="form-control">
            <label class="label py-1"><span class="label-text font-semibold text-sm">Loan Term</span></label>
            <select aria-label="Loan Term" x-model.number="loanYears" class="select select-bordered rounded-xl w-full text-sm">
                <option value="30">30 Years Fixed</option>
                <option value="20">20 Years Fixed</option>
                <option value="15">15 Years Fixed</option>
                <option value="10">10 Years Fixed</option>
            </select>
        </div>
    </div>

    {{-- Quick Loan Scenario Presets --}}
    <div class="mb-6">
        <span class="text-xs font-bold text-base-content/60 block mb-2 uppercase tracking-wider font-mono">Popular Mortgage Scenarios</span>
        <div class="flex flex-wrap gap-2">
            <button type="button" @click="homePrice = 300000; downPayment = 30000; interestRate = 6.5; loanYears = 30;" class="px-3.5 py-1.5 rounded-full bg-base-200 border border-base-300 text-xs font-semibold hover:border-primary hover:bg-[#e2f6d5] transition-all">Starter Home ($300k, 10% Down)</button>
            <button type="button" @click="homePrice = 420000; downPayment = 84000; interestRate = 6.5; loanYears = 30;" class="px-3.5 py-1.5 rounded-full bg-base-200 border border-base-300 text-xs font-semibold hover:border-primary hover:bg-[#e2f6d5] transition-all">Median Home ($420k, 20% Down)</button>
            <button type="button" @click="homePrice = 350000; downPayment = 70000; interestRate = 5.8; loanYears = 15;" class="px-3.5 py-1.5 rounded-full bg-base-200 border border-base-300 text-xs font-semibold hover:border-primary hover:bg-[#e2f6d5] transition-all">15-Year Wealth Builder ($350k, 5.8%)</button>
            <button type="button" @click="homePrice = 800000; downPayment = 160000; interestRate = 6.75; loanYears = 30;" class="px-3.5 py-1.5 rounded-full bg-base-200 border border-base-300 text-xs font-semibold hover:border-primary hover:bg-[#e2f6d5] transition-all">Jumbo Loan ($800k, 20% Down)</button>
        </div>
    </div>

    {{-- Main Monthly Payment Hero Banner (Wise Lime Surface) --}}
    <div class="p-6 sm:p-9 rounded-3xl bg-primary text-primary-content border border-primary shadow-sm text-center mb-8">
        <span class="text-xs font-bold uppercase tracking-wider text-primary-content/80 font-mono">Estimated Total Monthly Payment</span>
        <div class="text-4xl sm:text-6xl font-black my-2 font-display tabular-nums">
            $<span x-text="Math.round(totalMonthlyPayment).toLocaleString()"></span><span class="text-xl font-normal text-primary-content/80">/mo</span>
        </div>
        <p class="text-xs sm:text-sm text-primary-content/85">
            Principal &amp; Interest: $<span x-text="Math.round(monthlyPrincipalInterest).toLocaleString()" class="font-bold"></span> · Taxes &amp; Insurance: $<span x-text="Math.round(monthlyPropertyTax + monthlyInsurance).toLocaleString()" class="font-bold"></span>
        </p>
    </div>

    {{-- Detailed PITI Breakdown Cards --}}
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-3.5 text-center">
        <div class="p-4 rounded-2xl bg-base-200/70 border border-base-300">
            <div class="text-[11px] font-bold text-base-content/60 uppercase tracking-wider font-mono">Loan Principal</div>
            <div class="text-xl font-black text-base-content mt-1 tabular-nums font-display">$<span x-text="loanAmount.toLocaleString()"></span></div>
        </div>
        <div class="p-4 rounded-2xl bg-base-200/70 border border-base-300">
            <div class="text-[11px] font-bold text-base-content/60 uppercase tracking-wider font-mono">Total Interest</div>
            <div class="text-xl font-black text-[#b86700] mt-1 tabular-nums font-display">$<span x-text="Math.round(totalInterestPaid).toLocaleString()"></span></div>
        </div>
        <div class="p-4 rounded-2xl bg-base-200/70 border border-base-300">
            <div class="text-[11px] font-bold text-base-content/60 uppercase tracking-wider font-mono">Property Tax</div>
            <div class="text-xl font-black text-base-content mt-1 tabular-nums font-display">$<span x-text="Math.round(monthlyPropertyTax)"></span>/mo</div>
        </div>
        <div class="p-4 rounded-2xl bg-base-200/70 border border-base-300">
            <div class="text-[11px] font-bold text-base-content/60 uppercase tracking-wider font-mono">Home Insurance</div>
            <div class="text-xl font-black text-base-content mt-1 tabular-nums font-display">$<span x-text="Math.round(monthlyInsurance)"></span>/mo</div>
        </div>
    </div>

    {{-- Amortization Schedule CSV Export Action --}}
    <div class="mt-4 p-4 rounded-2xl bg-base-100 border border-base-300 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
        <div class="text-xs text-base-content/70">
            <span>Download your complete <strong><span x-text="loanYears"></span>-year</strong> mortgage amortization schedule with principal and interest breakdown.</span>
        </div>
        <button
            type="button"
            @click="exportScheduleCsv()"
            class="px-4 py-2 rounded-full bg-base-200 hover:bg-primary hover:text-primary-content text-xs font-bold transition-all shrink-0"
        >
            📥 Export Amortization CSV
        </button>
    </div>

    {{-- Technical Comparison: 15-Yr vs 30-Yr Mortgage --}}
    <div class="mt-8 pt-6 border-t border-base-300">
        <h3 class="font-bold text-base sm:text-lg text-base-content font-display mb-4">
            15-Year vs. 30-Year Fixed Mortgage Comparison ($400,000 Loan at 6.5%)
        </h3>
        <div class="overflow-x-auto rounded-3xl border border-base-300">
            <table class="table table-zebra w-full text-xs sm:text-sm">
                <thead class="bg-base-200 text-base-content/70 uppercase text-[11px] font-mono">
                    <tr>
                        <th>Loan Metric</th>
                        <th>15-Year Fixed Mortgage</th>
                        <th>30-Year Fixed Mortgage</th>
                        <th>Financial Difference</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="font-bold font-mono">Monthly Payment (P&amp;I)</td>
                        <td class="font-mono">~$3,485 / mo</td>
                        <td class="font-mono">~$2,528 / mo</td>
                        <td>15-Yr requires +$957/mo higher cash flow</td>
                    </tr>
                    <tr>
                        <td class="font-bold font-mono">Total Interest Paid</td>
                        <td class="font-mono text-[#2ead4b]">~$227,330</td>
                        <td class="font-mono text-warning">~$510,178</td>
                        <td class="font-bold text-[#2ead4b]">15-Yr saves $282,848 in interest</td>
                    </tr>
                    <tr>
                        <td class="font-bold font-mono">Total Loan Cost</td>
                        <td class="font-mono">~$627,330</td>
                        <td class="font-mono">~$910,178</td>
                        <td>30-Yr costs 45% more over life of loan</td>
                    </tr>
                    <tr>
                        <td class="font-bold font-mono">50% Principal Payoff</td>
                        <td class="font-mono">Year 8.5</td>
                        <td class="font-mono">Year 20.5</td>
                        <td>15-Yr builds home equity 2.4x faster</td>
                    </tr>
                    <tr>
                        <td class="font-bold font-mono">Lender Qualification</td>
                        <td>Requires lower Debt-to-Income (DTI) ratio</td>
                        <td>Easier approval with lower monthly commitment</td>
                        <td>30-Yr maximizes initial borrowing power</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</x-tool-paper>

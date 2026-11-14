<x-tool-paper x-data="{
    homePrice: 400000,
    downPayment: 80000,
    interestRate: 6.5,
    loanYears: 30,
    propertyTaxAnnual: 4800,
    homeInsuranceAnnual: 1200,
    pmiMonthly: 0,
    get loanAmount() {
        return Math.max(0, this.homePrice - this.downPayment);
    },
    get monthlyPrincipalInterest() {
        const principal = this.loanAmount;
        if (principal <= 0) return 0;
        const monthlyRate = (this.interestRate / 100) / 12;
        const totalMonths = this.loanYears * 12;
        if (monthlyRate === 0) return principal / totalMonths;
        return (principal * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths))) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
    },
    get monthlyPropertyTax() {
        return (this.propertyTaxAnnual || 0) / 12;
    },
    get monthlyInsurance() {
        return (this.homeInsuranceAnnual || 0) / 12;
    },
    get totalMonthlyPayment() {
        return this.monthlyPrincipalInterest + this.monthlyPropertyTax + this.monthlyInsurance + (this.pmiMonthly || 0);
    },
    get totalInterestPaid() {
        return Math.max(0, (this.monthlyPrincipalInterest * this.loanYears * 12) - this.loanAmount);
    }
}">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <x-numeric-field label="Home Price" model="homePrice" prefix="$" placeholder="400000" />
        <x-numeric-field label="Down Payment" model="downPayment" prefix="$" placeholder="80000" />
        <x-numeric-field label="Interest Rate (%)" model="interestRate" suffix="%" step="0.01" placeholder="6.5" />
        <div class="form-control">
            <label class="label py-1"><span class="label-text font-semibold text-sm">Loan Term</span></label>
            <select x-model.number="loanYears" class="select select-bordered rounded-xl w-full text-sm">
                <option value="30">30 Years Fixed</option>
                <option value="20">20 Years Fixed</option>
                <option value="15">15 Years Fixed</option>
                <option value="10">10 Years Fixed</option>
            </select>
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
</x-tool-paper>

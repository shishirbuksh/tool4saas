<x-card class="p-6 md:p-8" x-data="{
    loanAmount: 35000,
    interestRate: 6.5,
    loanTermYears: 10,
    extraMonthly: 0,
    planMode: 'standard',
    annualIncome: 55000,
    familySize: 1,
    accruedGraceInterest: 0,
    scheduleView: 'annual',
    init() {
        const params = new URLSearchParams(window.location.search);
        if (params.has('amount')) {
            const a = parseFloat(params.get('amount'));
            if (!isNaN(a) && a > 0) this.loanAmount = a;
        }
        if (params.has('rate')) {
            const r = parseFloat(params.get('rate'));
            if (!isNaN(r) && r >= 0) this.interestRate = r;
        }
        if (params.has('term')) {
            const t = parseInt(params.get('term'), 10);
            if (!isNaN(t) && t > 0) this.loanTermYears = t;
        }
        if (params.has('extra')) {
            const e = parseFloat(params.get('extra'));
            if (!isNaN(e) && e >= 0) this.extraMonthly = e;
        }
    },
    setPreset(amt, rate, term, extra = 0) {
        this.loanAmount = amt;
        this.interestRate = rate;
        this.loanTermYears = term;
        this.extraMonthly = extra;
        this.planMode = 'standard';
    },
    get principal() {
        return (parseFloat(this.loanAmount) || 0) + (parseFloat(this.accruedGraceInterest) || 0);
    },
    get monthlyRate() {
        return ((parseFloat(this.interestRate) || 0) / 100) / 12;
    },
    get totalMonths() {
        return (parseInt(this.loanTermYears, 10) || 10) * 12;
    },
    get standardMonthlyPayment() {
        const p = this.principal;
        const r = this.monthlyRate;
        const n = this.totalMonths;
        if (p <= 0 || n <= 0) return 0;
        if (r <= 0) return p / n;
        return (p * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1);
    },
    get standardSummary() {
        const pmt = this.standardMonthlyPayment;
        const n = this.totalMonths;
        const totalPaid = pmt * n;
        const totalInterest = Math.max(0, totalPaid - this.principal);
        return {
            monthlyPayment: pmt,
            totalPaid: totalPaid,
            totalInterest: totalInterest
        };
    },
    get acceleratedSummary() {
        const p = this.principal;
        const r = this.monthlyRate;
        const basePmt = this.standardMonthlyPayment;
        const extra = parseFloat(this.extraMonthly) || 0;
        const totalPmt = basePmt + extra;

        if (totalPmt <= 0 || p <= 0) {
            return { months: 0, years: '0.0', totalPaid: 0, totalInterest: 0, interestSaved: 0, monthsSaved: 0 };
        }

        let balance = p;
        let months = 0;
        let totalInterest = 0;
        const maxMonths = 600;

        while (balance > 0.01 && months < maxMonths) {
            months++;
            const intCharge = balance * r;
            totalInterest += intCharge;
            let principalPaid = totalPmt - intCharge;
            if (principalPaid >= balance) {
                principalPaid = balance;
                balance = 0;
            } else {
                balance -= principalPaid;
            }
        }

        const totalPaid = p + totalInterest;
        const std = this.standardSummary;
        const interestSaved = Math.max(0, std.totalInterest - totalInterest);
        const monthsSaved = Math.max(0, this.totalMonths - months);

        return {
            months: months,
            years: (months / 12).toFixed(1),
            totalPaid: totalPaid,
            totalInterest: totalInterest,
            interestSaved: interestSaved,
            monthsSaved: monthsSaved,
            effectivePayment: totalPmt
        };
    },
    get idrEstimate() {
        const income = parseFloat(this.annualIncome) || 0;
        const size = parseInt(this.familySize, 10) || 1;
        // 2026 Federal Poverty Level benchmark: $15,060 for 1 person + $5,380 each additional
        const povertyLine = 15060 + (size - 1) * 5380;
        // SAVE / IDR Discretionary Income base = 225% of Poverty Line
        const discretionaryThreshold = povertyLine * 2.25;
        const discretionaryIncome = Math.max(0, income - discretionaryThreshold);
        // Under SAVE plan: 10% discretionary income cap for graduate or 5-10% blended
        const annualIdr = discretionaryIncome * 0.10;
        const monthlyIdr = annualIdr / 12;
        return {
            povertyLine: povertyLine,
            discretionaryThreshold: discretionaryThreshold,
            discretionaryIncome: discretionaryIncome,
            monthlyPayment: monthlyIdr
        };
    },
    get amortizationSchedule() {
        const p = this.principal;
        const r = this.monthlyRate;
        const basePmt = this.standardMonthlyPayment;
        const extra = parseFloat(this.extraMonthly) || 0;
        const totalPmt = basePmt + extra;

        if (p <= 0 || totalPmt <= 0) return { years: [], months: [] };

        let balance = p;
        let monthCount = 0;
        const monthlyRows = [];
        const annualMap = {};

        while (balance > 0.01 && monthCount < 480) {
            monthCount++;
            const yearNum = Math.ceil(monthCount / 12);
            const begBalance = balance;
            const intCharge = balance * r;
            let pPaid = totalPmt - intCharge;
            if (pPaid >= balance) {
                pPaid = balance;
                balance = 0;
            } else {
                balance -= pPaid;
            }

            if (!annualMap[yearNum]) {
                annualMap[yearNum] = {
                    year: yearNum,
                    begBalance: begBalance,
                    principalPaid: 0,
                    interestPaid: 0,
                    totalPaid: 0,
                    endBalance: balance
                };
            }
            annualMap[yearNum].principalPaid += pPaid;
            annualMap[yearNum].interestPaid += intCharge;
            annualMap[yearNum].totalPaid += (pPaid + intCharge);
            annualMap[yearNum].endBalance = balance;

            if (monthCount <= 36) {
                monthlyRows.push({
                    month: monthCount,
                    begBalance: begBalance,
                    payment: pPaid + intCharge,
                    principalPaid: pPaid,
                    interestPaid: intCharge,
                    endBalance: balance
                });
            }
        }

        return {
            years: Object.values(annualMap),
            months: monthlyRows
        };
    },
    exportScheduleCsv() {
        const schedule = this.amortizationSchedule;
        let csvContent = 'data:text/csv;charset=utf-8,';
        csvContent += 'Year,Starting Balance,Principal Paid,Interest Paid,Total Paid,Ending Balance\n';
        schedule.years.forEach(y => {
            csvContent += `${y.year},${y.begBalance.toFixed(2)},${y.principalPaid.toFixed(2)},${y.interestPaid.toFixed(2)},${y.totalPaid.toFixed(2)},${y.endBalance.toFixed(2)}\n`;
        });
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', 'student_loan_amortization_schedule.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}">
    <div class="space-y-6">
        <x-student-tools-nav active="student-loan-calculator" />

        {{-- Repayment Strategy Toggle --}}
        <div class="flex items-center justify-between flex-wrap gap-3 pb-2 border-b border-base-300">
            <div>
                <span class="text-xs font-bold uppercase tracking-wider text-base-content/70 font-mono block">Repayment Strategy</span>
                <span class="text-xs text-base-content/60">Choose standard fixed amortization or income-driven repayment</span>
            </div>
            <div class="join bg-base-200/80 p-1 rounded-2xl border border-base-300">
                <button
                    type="button"
                    @click="planMode = 'standard'"
                    class="btn btn-sm rounded-xl join-item transition-all"
                    :class="planMode === 'standard' ? 'bg-[#163300] text-[#9fe870] font-bold shadow-xs' : 'btn-ghost text-base-content/80'"
                >
                    Standard &amp; Extra Payoff
                </button>
                <button
                    type="button"
                    @click="planMode = 'idr'"
                    class="btn btn-sm rounded-xl join-item transition-all"
                    :class="planMode === 'idr' ? 'bg-[#163300] text-[#9fe870] font-bold shadow-xs' : 'btn-ghost text-base-content/80'"
                >
                    IDR / SAVE Plan Estimator
                </button>
            </div>
        </div>

        {{-- 1-Click Typical Student Loan Benchmarks --}}
        <div>
            <span class="text-xs font-bold uppercase tracking-wider text-base-content/60 font-mono block mb-2">
                1-Click Loan Scenarios:
            </span>
            <div class="flex flex-wrap gap-2">
                <button
                    type="button"
                    @click="setPreset(35000, 6.53, 10, 0)"
                    class="px-3.5 py-1.5 rounded-xl border border-base-300 bg-base-100 text-xs font-semibold hover:border-primary hover:bg-[#e2f6d5] transition-all"
                >
                    🎓 Federal Undergrad ($35k @ 6.53%, 10y)
                </button>
                <button
                    type="button"
                    @click="setPreset(65000, 8.08, 10, 50)"
                    class="px-3.5 py-1.5 rounded-xl border border-base-300 bg-base-100 text-xs font-semibold hover:border-primary hover:bg-[#e2f6d5] transition-all"
                >
                    📜 Federal Graduate ($65k @ 8.08%, 10y)
                </button>
                <button
                    type="button"
                    @click="setPreset(45000, 5.25, 7, 100)"
                    class="px-3.5 py-1.5 rounded-xl border border-base-300 bg-base-100 text-xs font-semibold hover:border-primary hover:bg-[#e2f6d5] transition-all"
                >
                    🏦 Private Refinanced ($45k @ 5.25%, 7y)
                </button>
                <button
                    type="button"
                    @click="setPreset(140000, 7.50, 20, 200)"
                    class="px-3.5 py-1.5 rounded-xl border border-base-300 bg-base-100 text-xs font-semibold hover:border-primary hover:bg-[#e2f6d5] transition-all"
                >
                    🩺 Medical / Law Professional ($140k @ 7.5%, 20y)
                </button>
            </div>
        </div>

        {{-- Core Interactive Inputs Grid --}}
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div class="bg-base-200/50 p-4 rounded-2xl border border-base-300">
                <label class="block text-xs font-bold uppercase tracking-wider mb-1.5 text-base-content/70">
                    Total Loan Balance ($)
                </label>
                <input aria-label="Total Loan Balance ($)"
                    type="number"
                    min="500"
                    max="500000"
                    step="500"
                    value="35000"
                    x-model.number="loanAmount"
                    class="input input-bordered w-full rounded-xl font-mono text-lg font-bold bg-base-100"
                />
                <span class="text-[11px] text-base-content/50 mt-1 block">Cumulative principal owed</span>
            </div>

            <div class="bg-base-200/50 p-4 rounded-2xl border border-base-300">
                <label class="block text-xs font-bold uppercase tracking-wider mb-1.5 text-base-content/70">
                    Interest Rate APR (%)
                </label>
                <input aria-label="Interest Rate APR (%)"
                    type="number"
                    min="0"
                    max="25"
                    step="0.05"
                    value="6.5"
                    x-model.number="interestRate"
                    class="input input-bordered w-full rounded-xl font-mono text-lg font-bold bg-base-100"
                />
                <span class="text-[11px] text-base-content/50 mt-1 block">Fixed or variable loan APR</span>
            </div>

            <div class="bg-base-200/50 p-4 rounded-2xl border border-base-300">
                <label class="block text-xs font-bold uppercase tracking-wider mb-1.5 text-base-content/70">
                    Repayment Term (Years)
                </label>
                <select aria-label="Repayment Term (Years)"
                    x-model.number="loanTermYears"
                    class="select select-bordered w-full rounded-xl font-mono text-base font-bold bg-base-100"
                >
                    <option value="5">5 Years (60 Months)</option>
                    <option value="7">7 Years (84 Months)</option>
                    <option value="10">10 Years (Standard Federal)</option>
                    <option value="15">15 Years (180 Months)</option>
                    <option value="20">20 Years (240 Months)</option>
                    <option value="25">25 Years (Extended Plan)</option>
                </select>
                <span class="text-[11px] text-base-content/50 mt-1 block">Standard federal term is 10y</span>
            </div>

            <div class="bg-base-200/50 p-4 rounded-2xl border border-base-300">
                <label class="block text-xs font-bold uppercase tracking-wider mb-1.5 text-base-content/70">
                    Extra Monthly Payment ($)
                </label>
                <input aria-label="Extra Monthly Payment ($)"
                    type="number"
                    min="0"
                    max="10000"
                    step="25"
                    value="0"
                    x-model.number="extraMonthly"
                    class="input input-bordered w-full rounded-xl font-mono text-lg font-bold bg-base-100"
                    placeholder="0"
                />
                <span class="text-[11px] text-[#2ead4b] font-semibold mt-1 block">Applies directly to principal</span>
            </div>
        </div>

        {{-- IDR Mode Configuration (Visible when planMode === 'idr') --}}
        <div x-show="planMode === 'idr'" x-transition class="p-5 rounded-2xl bg-base-200/70 border border-base-300 space-y-4">
            <div class="flex items-center gap-2">
                <span class="text-base">🏛️</span>
                <span class="text-xs font-bold uppercase tracking-wider font-mono text-base-content/80">
                    Federal SAVE / IDR Discretionary Income Parameters
                </span>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label class="block text-xs font-bold uppercase tracking-wider mb-1 text-base-content/70">
                        Adjusted Gross Income (AGI) ($/yr)
                    </label>
                    <input aria-label="Adjusted Gross Income (AGI) ($/yr)"
                        type="number"
                        min="0"
                        step="1000"
                        x-model.number="annualIncome"
                        class="input input-bordered w-full rounded-xl font-mono text-base font-bold bg-base-100"
                        placeholder="55000"
                    />
                    <span class="text-[11px] text-base-content/50 mt-1 block">Line 11 on IRS Form 1040</span>
                </div>
                <div>
                    <label class="block text-xs font-bold uppercase tracking-wider mb-1 text-base-content/70">
                        Family / Household Size
                    </label>
                    <select aria-label="Family / Household Size"
                        x-model.number="familySize"
                        class="select select-bordered w-full rounded-xl font-mono text-base font-bold bg-base-100"
                    >
                        <option value="1">1 Person (Single)</option>
                        <option value="2">2 People (Married / Dependent)</option>
                        <option value="3">3 People</option>
                        <option value="4">4 People</option>
                        <option value="5">5 People or More</option>
                    </select>
                    <span class="text-[11px] text-base-content/50 mt-1 block">Determines federal poverty baseline</span>
                </div>
            </div>
        </div>

        {{-- Subsidized vs Unsubsidized Grace Period Capitalization Toggle --}}
        <div class="flex items-center justify-between p-4 rounded-2xl bg-base-100 border border-base-300">
            <div class="pr-4">
                <span class="text-xs font-bold text-base-content block">Include Accrued In-School / Grace Period Interest?</span>
                <span class="text-xs text-base-content/60">Direct Unsubsidized loans capitalize unpaid interest at repayment onset</span>
            </div>
            <div class="flex items-center gap-3 shrink-0">
                <input aria-label="Accrued grace interest"
                    type="number"
                    min="0"
                    step="100"
                    x-model.number="accruedGraceInterest"
                    class="input input-bordered input-sm w-28 rounded-lg font-mono text-xs"
                    placeholder="$0"
                />
            </div>
        </div>

        {{-- Dynamic Result Banner (Wise Forest Green Display Card) --}}
        <div class="p-6 md:p-8 rounded-3xl bg-[#163300] text-white shadow-sm space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 border-b border-white/10 pb-6">
                <div>
                    <span class="text-xs uppercase tracking-widest text-[#9fe870] font-bold font-mono">
                        <template x-if="planMode === 'standard'">
                            <span>Standard Monthly Payment</span>
                        </template>
                        <template x-if="planMode === 'idr'">
                            <span>IDR / SAVE Monthly Estimate</span>
                        </template>
                    </span>
                    <p class="font-mono text-4xl sm:text-5xl font-black mt-1 text-[#9fe870]">
                        <template x-if="planMode === 'standard'">
                            <span x-text="'$' + Math.round(standardSummary.monthlyPayment).toLocaleString()">$397</span>
                        </template>
                        <template x-if="planMode === 'idr'">
                            <span x-text="'$' + Math.round(idrEstimate.monthlyPayment).toLocaleString()">$176</span>
                        </template>
                    </p>
                    <span class="text-xs text-white/60 block mt-1" x-text="planMode === 'standard' ? (totalMonths + ' scheduled installments') : '10% discretionary income cap'">120 scheduled installments</span>
                </div>

                <div>
                    <span class="text-xs uppercase tracking-widest text-white/70 font-bold font-mono">Total Interest Cost</span>
                    <p class="font-mono text-3xl sm:text-4xl font-bold mt-1 text-white">
                        <span x-text="'$' + Math.round(acceleratedSummary.totalInterest).toLocaleString()">$12,693</span>
                    </p>
                    <span class="text-xs text-white/60 block mt-1" x-text="'Principal: $' + Math.round(principal).toLocaleString()">Principal: $35,000</span>
                </div>

                <div>
                    <span class="text-xs uppercase tracking-widest text-white/70 font-bold font-mono">Total Lifetime Out-of-Pocket</span>
                    <p class="font-mono text-3xl sm:text-4xl font-bold mt-1 text-white">
                        <span x-text="'$' + Math.round(acceleratedSummary.totalPaid).toLocaleString()">$47,693</span>
                    </p>
                    <span class="text-xs text-white/60 block mt-1" x-text="'Payoff in ' + acceleratedSummary.years + ' years (' + acceleratedSummary.months + ' mo)'">Payoff in 10.0 years (120 mo)</span>
                </div>
            </div>

            {{-- Extra Payment Savings Callout (Vivid Green Highlight) --}}
            <template x-if="parseFloat(extraMonthly) > 0">
                <div class="p-4 rounded-2xl bg-[#9fe870]/15 border border-[#9fe870]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div class="flex items-center gap-2.5">
                        <span class="text-2xl">⚡</span>
                        <div>
                            <span class="text-xs uppercase tracking-wider font-bold text-[#9fe870] font-mono block">Extra Payment Acceleration Benefit</span>
                            <span class="text-sm text-white/90">
                                Adding <strong>$<span x-text="extraMonthly"></span>/mo</strong> saves 
                                <strong class="text-[#9fe870]">$<span x-text="Math.round(acceleratedSummary.interestSaved).toLocaleString()"></span></strong> in interest 
                                and eliminates your loan <strong class="text-[#9fe870]"><span x-text="acceleratedSummary.monthsSaved"></span> months earlier</strong>!
                            </span>
                        </div>
                    </div>
                    <span class="badge badge-sm border-none bg-[#9fe870] text-[#163300] font-bold text-xs uppercase px-3 py-2 rounded-lg shrink-0">
                        Debt-Free Faster
                    </span>
                </div>
            </template>
        </div>

        {{-- Interactive Amortization Schedule Section --}}
        <div class="pt-6 border-t border-base-300 space-y-4">
            <div class="flex items-center justify-between flex-wrap gap-3">
                <div>
                    <h3 class="font-bold text-base sm:text-lg text-base-content font-display">
                        Student Loan Amortization Schedule
                    </h3>
                    <p class="text-xs text-base-content/60">
                        Detailed breakdown of principal reduction, interest accumulation, and remaining balances
                    </p>
                </div>
                <div class="flex items-center gap-2">
                    <button
                        type="button"
                        @click="exportScheduleCsv()"
                        class="btn btn-sm btn-outline rounded-xl font-mono text-xs hover:bg-base-200"
                    >
                        📥 Export CSV
                    </button>
                    <div class="join bg-base-200 p-0.5 rounded-xl border border-base-300">
                        <button
                            type="button"
                            @click="scheduleView = 'annual'"
                            class="btn btn-xs rounded-lg join-item"
                            :class="scheduleView === 'annual' ? 'bg-[#163300] text-[#9fe870] font-bold' : 'btn-ghost'"
                        >
                            Annual
                        </button>
                        <button
                            type="button"
                            @click="scheduleView = 'monthly'"
                            class="btn btn-xs rounded-lg join-item"
                            :class="scheduleView === 'monthly' ? 'bg-[#163300] text-[#9fe870] font-bold' : 'btn-ghost'"
                        >
                            Monthly (First 3y)
                        </button>
                    </div>
                </div>
            </div>

            <div class="overflow-x-auto rounded-2xl border border-base-300">
                <table class="table table-sm w-full text-xs">
                    <thead class="bg-base-200/70 font-mono text-[11px] uppercase">
                        <tr>
                            <th x-text="scheduleView === 'annual' ? 'Year' : 'Month'"></th>
                            <th>Starting Balance</th>
                            <th>Principal Paid</th>
                            <th>Interest Paid</th>
                            <th>Total Installment</th>
                            <th>Ending Balance</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-base-200 font-mono">
                        {{-- Annual View --}}
                        <template x-if="scheduleView === 'annual'">
                            <template x-for="row in amortizationSchedule.years" :key="row.year">
                                <tr>
                                    <td class="font-bold" x-text="'Year ' + row.year"></td>
                                    <td x-text="'$' + Math.round(row.begBalance).toLocaleString()"></td>
                                    <td class="text-[#2ead4b] font-semibold" x-text="'$' + Math.round(row.principalPaid).toLocaleString()"></td>
                                    <td class="text-base-content/70" x-text="'$' + Math.round(row.interestPaid).toLocaleString()"></td>
                                    <td x-text="'$' + Math.round(row.totalPaid).toLocaleString()"></td>
                                    <td class="font-bold" x-text="'$' + Math.round(row.endBalance).toLocaleString()"></td>
                                </tr>
                            </template>
                        </template>

                        {{-- Monthly View --}}
                        <template x-if="scheduleView === 'monthly'">
                            <template x-for="row in amortizationSchedule.months" :key="row.month">
                                <tr>
                                    <td class="font-bold" x-text="'Month ' + row.month"></td>
                                    <td x-text="'$' + Math.round(row.begBalance).toLocaleString()"></td>
                                    <td class="text-[#2ead4b] font-semibold" x-text="'$' + Math.round(row.principalPaid).toLocaleString()"></td>
                                    <td class="text-base-content/70" x-text="'$' + Math.round(row.interestPaid).toLocaleString()"></td>
                                    <td x-text="'$' + Math.round(row.payment).toLocaleString()"></td>
                                    <td class="font-bold" x-text="'$' + Math.round(row.endBalance).toLocaleString()"></td>
                                </tr>
                            </template>
                        </template>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</x-card>

<x-card class="p-6 md:p-8" x-data="{
    n1: 1, d1: 2,
    op: '+',
    n2: 1, d2: 4,
    init() {
        const params = new URLSearchParams(window.location.search);
        if (params.has('n1')) this.n1 = parseInt(params.get('n1'), 10) || this.n1;
        if (params.has('d1')) this.d1 = parseInt(params.get('d1'), 10) || this.d1;
        if (params.has('op') && ['+', '-', '*', '/'].includes(params.get('op'))) this.op = params.get('op');
        if (params.has('n2')) this.n2 = parseInt(params.get('n2'), 10) || this.n2;
        if (params.has('d2')) this.d2 = parseInt(params.get('d2'), 10) || this.d2;
    },
    setPreset(n1, d1, op, n2, d2) {
        this.n1 = n1;
        this.d1 = d1;
        this.op = op;
        this.n2 = n2;
        this.d2 = d2;
    },
    gcd(a, b) {
        return b === 0 ? a : this.gcd(b, a % b);
    },
    get result() {
        const num1 = parseInt(this.n1) || 0;
        const den1 = parseInt(this.d1) || 1;
        const num2 = parseInt(this.n2) || 0;
        const den2 = parseInt(this.d2) || 1;
        
        let rn = 0;
        let rd = den1 * den2;

        if (this.op === '+') rn = (num1 * den2) + (num2 * den1);
        else if (this.op === '-') rn = (num1 * den2) - (num2 * den1);
        else if (this.op === '*') { rn = num1 * num2; rd = den1 * den2; }
        else if (this.op === '/') { rn = num1 * den2; rd = den1 * num2; }

        if (rd === 0) return { error: 'Division by zero' };
        const g = Math.abs(this.gcd(rn, rd));
        const simN = rn / g;
        const simD = rd / g;
        const dec = (rn / rd).toFixed(4);

        return { num: simN, den: simD, decimal: dec };
    }
}">
    <div class="space-y-6">
        {{-- Quick Fraction Presets --}}
        <div>
            <span class="text-xs font-bold uppercase tracking-wider text-base-content/60 font-mono block mb-2">Common Fraction Operations:</span>
            <div class="flex flex-wrap gap-2">
                <button type="button" @click="setPreset(1, 2, '+', 1, 4)" class="btn btn-xs rounded-full border border-base-300 bg-base-100 hover:bg-primary/20 font-mono">
                    1/2 + 1/4
                </button>
                <button type="button" @click="setPreset(3, 4, '-', 1, 3)" class="btn btn-xs rounded-full border border-base-300 bg-base-100 hover:bg-primary/20 font-mono">
                    3/4 − 1/3
                </button>
                <button type="button" @click="setPreset(2, 3, '*', 3, 5)" class="btn btn-xs rounded-full border border-base-300 bg-base-100 hover:bg-primary/20 font-mono">
                    2/3 × 3/5
                </button>
                <button type="button" @click="setPreset(5, 8, '/', 1, 2)" class="btn btn-xs rounded-full border border-base-300 bg-base-100 hover:bg-primary/20 font-mono">
                    5/8 ÷ 1/2
                </button>
            </div>
        </div>

        <div class="flex flex-wrap items-center justify-center gap-4 py-4">
            <!-- Fraction 1 -->
            <div class="flex flex-col items-center w-20">
                <input aria-label="First numerator" type="number" x-model="n1" class="input input-bordered w-full rounded-[10px] text-center font-bold text-lg" />
                <div class="w-full h-0.5 bg-base-content/40 my-1"></div>
                <input aria-label="First denominator" type="number" min="1" x-model="d1" class="input input-bordered w-full rounded-[10px] text-center font-bold text-lg" />
            </div>

            <!-- Operator -->
            <select aria-label="Fraction operator" x-model="op" class="select select-bordered rounded-[12px] font-mono text-xl font-bold">
                <option value="+">+</option>
                <option value="-">−</option>
                <option value="*">×</option>
                <option value="/">÷</option>
            </select>

            <!-- Fraction 2 -->
            <div class="flex flex-col items-center w-20">
                <input aria-label="Second numerator" type="number" x-model="n2" class="input input-bordered w-full rounded-[10px] text-center font-bold text-lg" />
                <div class="w-full h-0.5 bg-base-content/40 my-1"></div>
                <input aria-label="Second denominator" type="number" min="1" x-model="d2" class="input input-bordered w-full rounded-[10px] text-center font-bold text-lg" />
            </div>

            <span class="text-2xl font-bold px-2">=</span>

            <!-- Result -->
            <div class="p-6 rounded-[20px] bg-[#163300] text-white flex flex-col items-center min-w-[140px]">
                <template x-if="result.error">
                    <span class="text-error font-bold text-sm" x-text="result.error"></span>
                </template>
                <template x-if="!result.error">
                    <div>
                        <span class="font-mono text-3xl font-black text-[#9fe870]" x-text="result.num + ' / ' + result.den"></span>
                        <span class="block text-xs text-white/70 text-center font-mono mt-1" x-text="'≈ ' + result.decimal"></span>
                    </div>
                </template>
            </div>
        </div>

        {{-- Technical Comparison: Fraction Operations Rules Matrix --}}
        <div class="pt-4 border-t border-base-300">
            <h3 class="font-bold text-base sm:text-lg text-base-content font-display mb-4">
                Fraction Arithmetic Operations &amp; Mathematical Rules Matrix
            </h3>
            <div class="overflow-x-auto rounded-3xl border border-base-300">
                <table class="table table-zebra w-full text-xs sm:text-sm">
                    <thead class="bg-base-200 text-base-content/70 uppercase text-[11px] font-mono">
                        <tr>
                            <th>Operation</th>
                            <th>General Formula</th>
                            <th>Calculation Procedure</th>
                            <th>Concrete Example</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="font-bold font-mono text-[#163300] dark:text-[#9fe870]">Addition (+)</td>
                            <td class="font-mono text-[#163300] dark:text-[#9fe870]">(a/b) + (c/d)</td>
                            <td>Find LCD: ((a × d) + (b × c)) ÷ (b × d)</td>
                            <td>1/2 + 1/3 = (3 + 2)/6 = 5/6</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-[#163300] dark:text-[#9fe870]">Subtraction (−)</td>
                            <td class="font-mono text-[#163300] dark:text-[#9fe870]">(a/b) − (c/d)</td>
                            <td>Find LCD: ((a × d) − (b × c)) ÷ (b × d)</td>
                            <td>3/4 − 1/3 = (9 − 4)/12 = 5/12</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-[#163300] dark:text-[#9fe870]">Multiplication (×)</td>
                            <td class="font-mono text-[#163300] dark:text-[#9fe870]">(a/b) × (c/d)</td>
                            <td>Direct multiply: (a × c) ÷ (b × d)</td>
                            <td>2/3 × 3/5 = 6/15 = 2/5</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-[#163300] dark:text-[#9fe870]">Division (÷)</td>
                            <td class="font-mono text-[#163300] dark:text-[#9fe870]">(a/b) ÷ (c/d)</td>
                            <td>Multiply by reciprocal: (a × d) ÷ (b × c)</td>
                            <td>1/2 ÷ 3/4 = (1 × 4)/(2 × 3) = 2/3</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</x-card>

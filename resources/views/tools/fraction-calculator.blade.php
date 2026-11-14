<x-card class="p-6 md:p-8" x-data="{
    n1: 1, d1: 2,
    op: '+',
    n2: 1, d2: 4,
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
        <div class="flex flex-wrap items-center justify-center gap-4 py-4">
            <!-- Fraction 1 -->
            <div class="flex flex-col items-center w-20">
                <input type="number" x-model="n1" class="input input-bordered w-full rounded-[10px] text-center font-bold text-lg" />
                <div class="w-full h-0.5 bg-base-content/40 my-1"></div>
                <input type="number" min="1" x-model="d1" class="input input-bordered w-full rounded-[10px] text-center font-bold text-lg" />
            </div>

            <!-- Operator -->
            <select x-model="op" class="select select-bordered rounded-[12px] font-mono text-xl font-bold">
                <option value="+">+</option>
                <option value="-">−</option>
                <option value="*">×</option>
                <option value="/">÷</option>
            </select>

            <!-- Fraction 2 -->
            <div class="flex flex-col items-center w-20">
                <input type="number" x-model="n2" class="input input-bordered w-full rounded-[10px] text-center font-bold text-lg" />
                <div class="w-full h-0.5 bg-base-content/40 my-1"></div>
                <input type="number" min="1" x-model="d2" class="input input-bordered w-full rounded-[10px] text-center font-bold text-lg" />
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
    </div>
</x-card>

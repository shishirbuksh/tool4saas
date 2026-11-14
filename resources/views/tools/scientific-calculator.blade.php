<x-tool-paper x-data="{
    display: '0',
    equation: '',
    append(char) {
        if (this.display === '0' && !isNaN(char)) {
            this.display = char;
        } else {
            this.display += char;
        }
    },
    clear() {
        this.display = '0';
        this.equation = '';
    },
    backspace() {
        if (this.display.length > 1) {
            this.display = this.display.slice(0, -1);
        } else {
            this.display = '0';
        }
    },
    calculate() {
        try {
            this.equation = this.display;
            // Clean sanitize expression: numbers, + - * / ( ) . ^ %
            let expr = this.display
                .replace(/×/g, '*')
                .replace(/÷/g, '/')
                .replace(/π/g, 'Math.PI')
                .replace(/e/g, 'Math.E')
                .replace(/sin\(/g, 'Math.sin(')
                .replace(/cos\(/g, 'Math.cos(')
                .replace(/tan\(/g, 'Math.tan(')
                .replace(/sqrt\(/g, 'Math.sqrt(')
                .replace(/log\(/g, 'Math.log10(')
                .replace(/ln\(/g, 'Math.log(');

            if (!/^[0-9+\-*/().\s,MathPIEsincoztasqrlg]+$/.test(expr)) {
                this.display = 'Error';
                return;
            }
            const res = Function(`'use strict'; return (${expr})`)();
            this.display = (Math.round(res * 100000000) / 100000000).toString();
        } catch (e) {
            this.display = 'Error';
        }
    }
}">
    <div class="max-w-md mx-auto space-y-4">
        {{-- Calculator Screen (Wise Polarity-Flipped Dark Surface) --}}
        <div class="p-6 rounded-3xl bg-[#0e0f0c] text-white border border-[#242a20] shadow-sm text-right space-y-1">
            <div class="text-xs font-mono text-[#868685] min-h-[16px]" x-text="equation"></div>
            <div class="text-4xl sm:text-5xl font-black font-mono text-primary tracking-tight overflow-x-auto tabular-nums" x-text="display"></div>
        </div>

        {{-- Scientific Keypad Grid --}}
        <div class="grid grid-cols-4 gap-2.5">
            {{-- Row 1 --}}
            <button type="button" @click="append('sin(')" class="btn btn-sm btn-ghost rounded-xl font-mono text-xs font-bold bg-base-200">sin</button>
            <button type="button" @click="append('cos(')" class="btn btn-sm btn-ghost rounded-xl font-mono text-xs font-bold bg-base-200">cos</button>
            <button type="button" @click="append('tan(')" class="btn btn-sm btn-ghost rounded-xl font-mono text-xs font-bold bg-base-200">tan</button>
            <button type="button" @click="clear()" class="btn btn-sm btn-error rounded-xl font-mono text-xs font-bold">AC</button>

            {{-- Row 2 --}}
            <button type="button" @click="append('sqrt(')" class="btn btn-sm btn-ghost rounded-xl font-mono text-xs font-bold bg-base-200">√</button>
            <button type="button" @click="append('(')" class="btn btn-sm btn-ghost rounded-xl font-mono text-xs font-bold bg-base-200">(</button>
            <button type="button" @click="append(')')" class="btn btn-sm btn-ghost rounded-xl font-mono text-xs font-bold bg-base-200">)</button>
            <button type="button" @click="append('÷')" class="btn btn-sm btn-ghost rounded-xl font-mono text-sm font-black bg-base-300">÷</button>

            {{-- Row 3 --}}
            <button type="button" @click="append('7')" class="btn btn-sm btn-ghost rounded-xl font-mono text-base font-bold bg-base-100 border border-base-300">7</button>
            <button type="button" @click="append('8')" class="btn btn-sm btn-ghost rounded-xl font-mono text-base font-bold bg-base-100 border border-base-300">8</button>
            <button type="button" @click="append('9')" class="btn btn-sm btn-ghost rounded-xl font-mono text-base font-bold bg-base-100 border border-base-300">9</button>
            <button type="button" @click="append('×')" class="btn btn-sm btn-ghost rounded-xl font-mono text-sm font-black bg-base-300">×</button>

            {{-- Row 4 --}}
            <button type="button" @click="append('4')" class="btn btn-sm btn-ghost rounded-xl font-mono text-base font-bold bg-base-100 border border-base-300">4</button>
            <button type="button" @click="append('5')" class="btn btn-sm btn-ghost rounded-xl font-mono text-base font-bold bg-base-100 border border-base-300">5</button>
            <button type="button" @click="append('6')" class="btn btn-sm btn-ghost rounded-xl font-mono text-base font-bold bg-base-100 border border-base-300">6</button>
            <button type="button" @click="append('-')" class="btn btn-sm btn-ghost rounded-xl font-mono text-sm font-black bg-base-300">-</button>

            {{-- Row 5 --}}
            <button type="button" @click="append('1')" class="btn btn-sm btn-ghost rounded-xl font-mono text-base font-bold bg-base-100 border border-base-300">1</button>
            <button type="button" @click="append('2')" class="btn btn-sm btn-ghost rounded-xl font-mono text-base font-bold bg-base-100 border border-base-300">2</button>
            <button type="button" @click="append('3')" class="btn btn-sm btn-ghost rounded-xl font-mono text-base font-bold bg-base-100 border border-base-300">3</button>
            <button type="button" @click="append('+')" class="btn btn-sm btn-ghost rounded-xl font-mono text-sm font-black bg-base-300">+</button>

            {{-- Row 6 --}}
            <button type="button" @click="append('0')" class="btn btn-sm btn-ghost rounded-xl font-mono text-base font-bold bg-base-100 border border-base-300">0</button>
            <button type="button" @click="append('.')" class="btn btn-sm btn-ghost rounded-xl font-mono text-base font-bold bg-base-100 border border-base-300">.</button>
            <button type="button" @click="backspace()" class="btn btn-sm btn-ghost rounded-xl font-mono text-sm font-bold bg-base-200">⌫</button>
            <button type="button" @click="calculate()" class="btn btn-sm btn-primary rounded-xl font-mono text-base font-black shadow-xs">=</button>
        </div>
    </div>
</x-tool-paper>

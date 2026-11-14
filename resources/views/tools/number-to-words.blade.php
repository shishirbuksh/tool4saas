<x-tool-paper x-data="{
    numberInput: '1250000',
    mode: 'number',
    copied: false,
    toWords(n) {
        if (n === 0) return 'zero';
        if (n < 0) return 'negative ' + this.toWords(-n);
        const ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
        const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
        const scales = ['', 'thousand', 'million', 'billion', 'trillion'];

        function threeDigits(num) {
            const h = Math.floor(num / 100);
            const r = num % 100;
            let s = '';
            if (h) s += ones[h] + ' hundred';
            if (r) {
                if (s) s += ' ';
                if (r < 20) s += ones[r];
                else {
                    s += tens[Math.floor(r / 10)];
                    if (r % 10) s += '-' + ones[r % 10];
                }
            }
            return s;
        }

        const groups = [];
        let i = 0;
        let temp = Math.floor(n);
        while (temp > 0) {
            const g = temp % 1000;
            if (g) groups.unshift(threeDigits(g) + (scales[i] ? ' ' + scales[i] : ''));
            temp = Math.floor(temp / 1000);
            i++;
        }
        return groups.join(' ');
    },
    get convertedWords() {
        const val = parseFloat(this.numberInput);
        if (isNaN(val) || !isFinite(val)) return 'Please enter a valid number';
        if (Math.abs(val) > 1e14) return 'Number exceeds maximum calculation threshold';
        const words = this.toWords(Math.floor(val));
        if (this.mode === 'currency') {
            return words + ' dollars only';
        }
        return words;
    },
    copy() {
        if (!this.convertedWords) return;
        navigator.clipboard.writeText(this.convertedWords);
        this.copied = true;
        setTimeout(() => this.copied = false, 2000);
    }
}">
    <div class="space-y-6">
        <div class="flex items-center gap-2 p-1.5 rounded-full bg-base-200 border border-base-300 w-fit">
            <button
                type="button"
                @click="mode = 'number'"
                class="px-5 py-2 rounded-full text-xs font-bold transition-all"
                :class="mode === 'number' ? 'bg-primary text-primary-content shadow-xs' : 'text-base-content/70 hover:text-base-content'"
            >
                Standard Number
            </button>
            <button
                type="button"
                @click="mode = 'currency'"
                class="px-5 py-2 rounded-full text-xs font-bold transition-all"
                :class="mode === 'currency' ? 'bg-primary text-primary-content shadow-xs' : 'text-base-content/70 hover:text-base-content'"
            >
                Financial Currency
            </button>
        </div>

        <div>
            <label class="block text-xs font-bold uppercase tracking-wider text-base-content/60 font-mono mb-2">Numeric Value</label>
            <input
                type="number"
                x-model="numberInput"
                placeholder="e.g. 1250000"
                class="input input-bordered rounded-2xl w-full text-lg font-mono p-4 bg-base-100"
            />
        </div>

        {{-- Polarity-Flipped Dark Hero Display --}}
        <div class="p-6 sm:p-9 rounded-3xl bg-[#0e0f0c] text-white border border-[#242a20] shadow-sm space-y-4 text-center">
            <span class="text-xs font-bold uppercase tracking-wider text-[#868685] font-mono">English Words Translation</span>
            <div class="text-2xl sm:text-4xl font-black text-primary my-3 font-display capitalize leading-tight">
                <span x-text="convertedWords"></span>
            </div>
            <div class="pt-2">
                <button
                    type="button"
                    @click="copy()"
                    class="px-6 py-2 rounded-full bg-base-200 hover:bg-primary hover:text-primary-content text-xs font-bold transition-all"
                >
                    <span x-text="copied ? 'Copied to Clipboard!' : 'Copy Words'"></span>
                </button>
            </div>
        </div>
    </div>
</x-tool-paper>

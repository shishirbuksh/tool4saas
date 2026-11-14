<x-tool-paper x-data="{
    password: '',
    length: 16,
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
    strength: 'Strong',
    generate() {
        let chars = '';
        if (this.uppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (this.lowercase) chars += 'abcdefghijklmnopqrstuvwxyz';
        if (this.numbers) chars += '0123456789';
        if (this.symbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';

        if (!chars) {
            this.password = '';
            this.strength = 'None';
            return;
        }

        const array = new Uint32Array(this.length);
        window.crypto.getRandomValues(array);

        let res = '';
        for (let i = 0; i < this.length; i++) {
            res += chars[array[i] % chars.length];
        }

        this.password = res;
        this.evaluateStrength();
    },
    evaluateStrength() {
        if (this.length < 8) this.strength = 'Weak';
        else if (this.length < 12) this.strength = 'Fair';
        else if (this.length < 16) this.strength = 'Good';
        else this.strength = 'Very Strong';
    },
    init() {
        this.generate();
    }
}">
    {{-- Password Output Box (Wise Polarity-Flipped Dark Surface) --}}
    <div class="p-6 sm:p-8 rounded-3xl bg-[#0e0f0c] text-white border border-[#242a20] flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 shadow-sm" x-data="clipboard">
        <div class="font-mono text-xl sm:text-2xl font-bold tracking-wider text-primary break-all select-all text-center sm:text-left" x-text="password"></div>
        <div class="flex items-center gap-2.5 shrink-0">
            <button
                type="button"
                @click="generate()"
                class="px-4 py-2 rounded-full border border-[#343d2e] bg-[#161a14] hover:bg-[#242a20] text-xs font-bold text-white transition-all flex items-center gap-1.5"
            >
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span>New</span>
            </button>
            <button
                type="button"
                @click="copy(password)"
                class="px-5 py-2 rounded-full bg-primary text-primary-content hover:bg-[#cdffad] text-xs font-bold transition-all shadow-xs"
            >
                <span x-text="copied ? 'Copied!' : 'Copy'"></span>
            </button>
        </div>
    </div>

    {{-- Strength Indicator --}}
    <div class="mb-8 p-5 rounded-2xl bg-base-200/60 border border-base-300">
        <div class="flex justify-between items-center text-xs font-bold uppercase tracking-wider mb-2 font-mono">
            <span class="text-base-content/60">Estimated Entropy Strength</span>
            <span :class="{
                'text-[#d03238]': strength === 'Weak',
                'text-[#b86700]': strength === 'Fair',
                'text-[#38c8ff]': strength === 'Good',
                'text-[#2ead4b]': strength === 'Very Strong'
            }" x-text="strength"></span>
        </div>
        <div class="w-full bg-base-300 h-2.5 rounded-full overflow-hidden">
            <div
                class="h-full transition-all duration-300"
                :class="{
                    'w-1/4 bg-[#d03238]': strength === 'Weak',
                    'w-2/4 bg-[#ffd11a]': strength === 'Fair',
                    'w-3/4 bg-[#38c8ff]': strength === 'Good',
                    'w-full bg-[#2ead4b]': strength === 'Very Strong'
                }"
            ></div>
        </div>
    </div>

    {{-- Controls --}}
    <div class="space-y-6">
        <div>
            <div class="flex items-center justify-between mb-2">
                <span class="text-sm font-bold text-base-content font-display">Character Length</span>
                <span class="font-mono font-black text-xl text-base-content" x-text="length"></span>
            </div>
            <input type="range" min="6" max="64" x-model.number="length" @input="generate()" class="range range-primary range-sm w-full" />
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <label class="label cursor-pointer justify-start gap-2.5 p-3.5 rounded-2xl bg-base-200/60 border border-base-300 hover:border-primary transition-colors">
                <input type="checkbox" x-model="uppercase" @change="generate()" class="checkbox checkbox-primary checkbox-sm" />
                <span class="label-text font-semibold text-xs text-base-content">Uppercase (A-Z)</span>
            </label>
            <label class="label cursor-pointer justify-start gap-2.5 p-3.5 rounded-2xl bg-base-200/60 border border-base-300 hover:border-primary transition-colors">
                <input type="checkbox" x-model="lowercase" @change="generate()" class="checkbox checkbox-primary checkbox-sm" />
                <span class="label-text font-semibold text-xs text-base-content">Lowercase (a-z)</span>
            </label>
            <label class="label cursor-pointer justify-start gap-2.5 p-3.5 rounded-2xl bg-base-200/60 border border-base-300 hover:border-primary transition-colors">
                <input type="checkbox" x-model="numbers" @change="generate()" class="checkbox checkbox-primary checkbox-sm" />
                <span class="label-text font-semibold text-xs text-base-content">Numbers (0-9)</span>
            </label>
            <label class="label cursor-pointer justify-start gap-2.5 p-3.5 rounded-2xl bg-base-200/60 border border-base-300 hover:border-primary transition-colors">
                <input type="checkbox" x-model="symbols" @change="generate()" class="checkbox checkbox-primary checkbox-sm" />
                <span class="label-text font-semibold text-xs text-base-content">Symbols (!@#$)</span>
            </label>
        </div>
    </div>
</x-tool-paper>

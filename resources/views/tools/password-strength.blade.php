<x-tool-paper x-data="{
    password: '',
    showPassword: true,
    get lengthCheck() { return this.password.length >= 12; },
    get lowerCheck() { return /[a-z]/.test(this.password); },
    get upperCheck() { return /[A-Z]/.test(this.password); },
    get numberCheck() { return /[0-9]/.test(this.password); },
    get symbolCheck() { return /[^a-zA-Z0-9]/.test(this.password); },
    get score() {
        if (!this.password) return 0;
        let s = 0;
        if (this.password.length >= 8) s++;
        if (this.password.length >= 12) s++;
        if (this.lowerCheck && this.upperCheck) s++;
        if (this.numberCheck) s++;
        if (this.symbolCheck) s++;
        return s;
    },
    get entropyBits() {
        if (!this.password) return 0;
        let pool = 0;
        if (/[a-z]/.test(this.password)) pool += 26;
        if (/[A-Z]/.test(this.password)) pool += 26;
        if (/[0-9]/.test(this.password)) pool += 10;
        if (/[^a-zA-Z0-9]/.test(this.password)) pool += 33;
        if (pool === 0) return 0;
        return Math.round(this.password.length * (Math.log2(pool)));
    },
    get strengthLabel() {
        if (this.score <= 1) return 'Very Weak';
        if (this.score === 2) return 'Weak';
        if (this.score === 3) return 'Moderate';
        if (this.score === 4) return 'Strong';
        return 'Very Strong';
    },
    get crackTime() {
        const bits = this.entropyBits;
        if (bits <= 28) return 'Instant';
        if (bits <= 36) return 'Few seconds';
        if (bits <= 50) return 'Several hours';
        if (bits <= 65) return 'Several months';
        if (bits <= 80) return 'Centuries';
        return 'Millions of years';
    }
}">
    <div class="space-y-6">
        {{-- Password Input --}}
        <div>
            <div class="flex items-center justify-between mb-2">
                <label class="block text-xs font-bold uppercase tracking-wider text-base-content/60 font-mono">Test Password Strength</label>
                <button
                    type="button"
                    @click="showPassword = !showPassword"
                    class="text-xs font-bold text-primary hover:underline font-mono"
                >
                    <span x-text="showPassword ? 'Hide Text' : 'Show Text'"></span>
                </button>
            </div>
            <input
                :type="showPassword ? 'text' : 'password'"
                x-model="password"
                placeholder="Enter password to test entropy..."
                class="input input-bordered rounded-2xl w-full text-base font-mono p-4 bg-base-100"
            />
        </div>

        {{-- Polarity-Flipped Dark Hero Display --}}
        <div class="p-6 sm:p-9 rounded-3xl bg-[#0e0f0c] text-white border border-[#242a20] shadow-sm text-center">
            <span class="text-xs font-bold uppercase tracking-wider text-[#868685] font-mono">Estimated Password Strength</span>
            <div class="text-4xl sm:text-6xl font-black my-2 font-display" :class="score <= 2 ? 'text-error' : (score <= 3 ? 'text-warning' : 'text-primary')">
                <span x-text="password ? strengthLabel : 'Enter Password'"></span>
            </div>
            <p class="text-xs sm:text-sm text-[#868685]">
                <span x-text="entropyBits"></span> bits of entropy · Estimated crack time: <span class="text-white font-bold" x-text="password ? crackTime : '—'"></span>
            </p>
        </div>

        {{-- Requirements Checklist --}}
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <div class="p-3.5 rounded-2xl border flex items-center gap-3 transition-colors" :class="lengthCheck ? 'bg-primary/10 border-primary text-primary-content' : 'bg-base-200/50 border-base-300 text-base-content/60'">
                <span class="text-base" x-text="lengthCheck ? '✓' : '○'"></span>
                <span class="text-xs font-bold font-mono">At least 12 characters</span>
            </div>
            <div class="p-3.5 rounded-2xl border flex items-center gap-3 transition-colors" :class="lowerCheck ? 'bg-primary/10 border-primary text-primary-content' : 'bg-base-200/50 border-base-300 text-base-content/60'">
                <span class="text-base" x-text="lowerCheck ? '✓' : '○'"></span>
                <span class="text-xs font-bold font-mono">Lowercase letter (a-z)</span>
            </div>
            <div class="p-3.5 rounded-2xl border flex items-center gap-3 transition-colors" :class="upperCheck ? 'bg-primary/10 border-primary text-primary-content' : 'bg-base-200/50 border-base-300 text-base-content/60'">
                <span class="text-base" x-text="upperCheck ? '✓' : '○'"></span>
                <span class="text-xs font-bold font-mono">Uppercase letter (A-Z)</span>
            </div>
            <div class="p-3.5 rounded-2xl border flex items-center gap-3 transition-colors" :class="numberCheck ? 'bg-primary/10 border-primary text-primary-content' : 'bg-base-200/50 border-base-300 text-base-content/60'">
                <span class="text-base" x-text="numberCheck ? '✓' : '○'"></span>
                <span class="text-xs font-bold font-mono">Numbers (0-9)</span>
            </div>
            <div class="p-3.5 rounded-2xl border flex items-center gap-3 transition-colors" :class="symbolCheck ? 'bg-primary/10 border-primary text-primary-content' : 'bg-base-200/50 border-base-300 text-base-content/60'">
                <span class="text-base" x-text="symbolCheck ? '✓' : '○'"></span>
                <span class="text-xs font-bold font-mono">Special symbols (!@#$%^&*)</span>
            </div>
        </div>

        <div class="p-4 rounded-2xl bg-base-100 border border-base-300 text-xs text-base-content/70 flex items-center gap-3 font-mono">
            <span class="text-primary font-bold">🔒 Zero Egress:</span>
            <span>Passwords are evaluated strictly in client-side memory. No keystroke is ever sent across the network.</span>
        </div>
    </div>
</x-tool-paper>

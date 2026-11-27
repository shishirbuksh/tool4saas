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
                    class="text-xs font-bold text-[#163300] dark:text-[#9fe870] hover:underline font-mono"
                >
                    <span x-text="showPassword ? 'Hide Text' : 'Show Text'"></span>
                </button>
            </div>
            <input aria-label="Enter password to test entropy"
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
            <span class="text-[#163300] dark:text-[#9fe870] font-bold">🔒 Zero Egress:</span>
            <span>Passwords are evaluated strictly in client-side memory. No keystroke is ever sent across the network.</span>
        </div>

        {{-- Technical Comparison: Password Entropy & Brute Force Attack Time Matrix --}}
        <div class="mt-8 pt-6 border-t border-base-300">
            <h3 class="font-bold text-base sm:text-lg text-base-content font-display mb-4">
                Password Entropy Bits vs. GPU Cluster Brute-Force Crack Time Matrix (NIST SP 800-63B)
            </h3>
            <div class="overflow-x-auto rounded-3xl border border-base-300">
                <table class="table table-zebra w-full text-xs sm:text-sm">
                    <thead class="bg-base-200 text-base-content/70 uppercase text-[11px] font-mono">
                        <tr>
                            <th>Entropy Strength Tier</th>
                            <th>Information Bits</th>
                            <th>Character Composition Example</th>
                            <th>Offline GPU Hashcat Speed (100 GH/s)</th>
                            <th>NIST Security Compliance Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="font-bold font-mono text-error">Very Weak</td>
                            <td class="font-mono text-error">&lt; 28 bits</td>
                            <td class="font-mono">6 lowercase letters (&ldquo;secret&rdquo;)</td>
                            <td class="font-bold text-error font-mono">Instant (&lt; 0.001 seconds)</td>
                            <td class="text-error font-semibold">Non-compliant (Known dictionary word)</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-warning">Weak</td>
                            <td class="font-mono">28 – 35 bits</td>
                            <td class="font-mono">8 characters (lower + numbers)</td>
                            <td class="text-warning font-mono">Few seconds to 10 minutes</td>
                            <td class="text-warning font-semibold">Vulnerable to rainbow tables</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-[#163300] dark:text-[#9fe870]">Moderate</td>
                            <td class="font-mono">36 – 59 bits</td>
                            <td class="font-mono">10–12 mixed-case alphanumeric</td>
                            <td class="font-mono">Several hours to 3 weeks</td>
                            <td>Acceptable for low-risk casual logins</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-[#163300] dark:text-[#9fe870]">Strong</td>
                            <td class="font-mono">60 – 79 bits</td>
                            <td class="font-mono">14+ mixed-case with symbols</td>
                            <td class="font-mono text-success">Several decades to 500 years</td>
                            <td class="text-success font-semibold">Enterprise standard (Passphrase recommended)</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-success">Military / Quantum-Resistant</td>
                            <td class="font-mono font-bold text-success">80+ bits</td>
                            <td class="font-mono">16+ random characters or 5+ Diceware words</td>
                            <td class="font-bold text-success font-mono">Millions of years (Trillions of centuries)</td>
                            <td class="text-success font-bold">NIST SP 800-63B High Assurance Benchmark</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</x-tool-paper>

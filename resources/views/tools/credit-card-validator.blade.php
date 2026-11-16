<x-tool-paper x-data="{
    input: '',
    get digits() {
        return this.input.replace(/\D/g, '');
    },
    get brand() {
        const n = this.digits;
        if (/^4/.test(n)) return 'Visa';
        if (/^(5[1-5]|2[2-7])/.test(n)) return 'Mastercard';
        if (/^3[47]/.test(n)) return 'American Express';
        if (/^(6011|65|64[4-9])/.test(n)) return 'Discover';
        if (/^36/.test(n)) return 'Diners Club';
        if (/^62/.test(n)) return 'UnionPay';
        return n ? 'Generic Card' : '—';
    },
    get isValidLuhn() {
        const d = this.digits;
        if (d.length < 12) return false;
        let sum = 0;
        let alt = false;
        for (let i = d.length - 1; i >= 0; i--) {
            let n = parseInt(d[i], 10);
            if (alt) {
                n *= 2;
                if (n > 9) n -= 9;
            }
            sum += n;
            alt = !alt;
        }
        return sum % 10 === 0;
    },
    formatInput(val) {
        const d = val.replace(/\D/g, '').slice(0, 19);
        this.input = d.replace(/(.{4})/g, '$1 ').trim();
    }
}">
    <div class="space-y-6">
        <div>
            <label class="block text-xs font-bold uppercase tracking-wider text-base-content/60 font-mono mb-2">Card Number</label>
            <input
                type="text"
                x-model="input"
                @input="formatInput($event.target.value)"
                placeholder="4532 0150 0000 0000"
                maxlength="23"
                class="input input-bordered rounded-2xl w-full text-lg font-mono p-4 bg-base-100 tracking-wider"
            />
        </div>

        {{-- Polarity-Flipped Dark Hero Display --}}
        <div class="p-6 sm:p-9 rounded-3xl bg-[#0e0f0c] text-white border border-[#242a20] shadow-sm text-center">
            <span class="text-xs font-bold uppercase tracking-wider text-[#868685] font-mono">Validation Result (MOD 10 Luhn)</span>
            <div class="text-4xl sm:text-6xl font-black my-2 font-display" :class="!digits ? 'text-[#868685]' : (isValidLuhn ? 'text-primary' : 'text-error')">
                <span x-text="!digits ? 'Awaiting Digits' : (isValidLuhn ? 'Valid Luhn Checksum' : 'Invalid Card Number')"></span>
            </div>
            <p class="text-xs sm:text-sm text-[#868685]">
                Detected Brand: <span class="text-white font-bold" x-text="brand"></span> · Length: <span class="text-white font-bold" x-text="digits.length"></span> digits
            </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div class="p-5 rounded-2xl bg-base-200/70 border border-base-300">
                <span class="text-[11px] font-bold text-base-content/60 uppercase tracking-wider font-mono">Card Network</span>
                <div class="text-xl font-black text-base-content mt-1 font-display" x-text="brand"></div>
            </div>
            <div class="p-5 rounded-2xl bg-base-200/70 border border-base-300">
                <span class="text-[11px] font-bold text-base-content/60 uppercase tracking-wider font-mono">Luhn Algorithm</span>
                <div class="text-xl font-black mt-1 font-display" :class="isValidLuhn ? 'text-[#2ead4b]' : 'text-error'" x-text="isValidLuhn ? 'Passed (MOD 10)' : 'Failed / Incomplete'"></div>
            </div>
            <div class="p-5 rounded-2xl bg-base-200/70 border border-base-300">
                <span class="text-[11px] font-bold text-base-content/60 uppercase tracking-wider font-mono">Total Digits</span>
                <div class="text-xl font-black text-base-content mt-1 font-display tabular-nums" x-text="digits.length"></div>
            </div>
        </div>

        <div class="p-4 rounded-2xl bg-base-100 border border-base-300 text-xs text-base-content/70 flex items-center gap-3 font-mono">
            <span class="text-primary font-bold">🔒 Secure Local Check:</span>
            <span>Card numbers are validated mathematically using the standard ISO/IEC 7812 checksum in your browser. No cardholder data is stored or transmitted.</span>
        </div>

        {{-- Technical Comparison: Card Network Specifications --}}
        <div class="mt-8 pt-6 border-t border-base-300">
            <h3 class="font-bold text-base sm:text-lg text-base-content font-display mb-4">
                Major Payment Card Networks &amp; IIN / BIN Specifications Matrix
            </h3>
            <div class="overflow-x-auto rounded-3xl border border-base-300">
                <table class="table table-zebra w-full text-xs sm:text-sm">
                    <thead class="bg-base-200 text-base-content/70 uppercase text-[11px] font-mono">
                        <tr>
                            <th>Card Network</th>
                            <th>IIN / BIN Prefix</th>
                            <th>Digit Length</th>
                            <th>Security Code</th>
                            <th>Luhn Mod 10 Check</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="font-bold font-mono text-primary">Visa</td>
                            <td class="font-mono">4</td>
                            <td class="font-mono">16 Digits</td>
                            <td>3 Digits (CVV2)</td>
                            <td class="text-[#2ead4b]">Required</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-primary">Mastercard</td>
                            <td class="font-mono">51–55, 2221–2720</td>
                            <td class="font-mono">16 Digits</td>
                            <td>3 Digits (CVC2)</td>
                            <td class="text-[#2ead4b]">Required</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-primary">American Express</td>
                            <td class="font-mono">34, 37</td>
                            <td class="font-mono">15 Digits</td>
                            <td>4 Digits (CID front)</td>
                            <td class="text-[#2ead4b]">Required</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-primary">Discover</td>
                            <td class="font-mono">6011, 65, 644–649</td>
                            <td class="font-mono">16 Digits</td>
                            <td>3 Digits (CID)</td>
                            <td class="text-[#2ead4b]">Required</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</x-tool-paper>

<x-card class="p-6 md:p-8" x-data="{
    length: 6,
    code: '',
    copied: false,
    generate() {
        const arr = new Uint32Array(1);
        crypto.getRandomValues(arr);
        const max = Math.pow(10, parseInt(this.length) || 6);
        const num = arr[0] % max;
        this.code = num.toString().padStart(parseInt(this.length) || 6, '0');
    },
    copy() {
        if (!this.code) return;
        window.copyTextSafe(this.code);
        this.copied = true;
        setTimeout(() => this.copied = false, 2000);
    },
    init() {
        this.generate();
    }
}">
    <div class="space-y-6">
        <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
                <span class="text-xs font-bold uppercase tracking-wider text-base-content/70">Passcode Digits</span>
                <div class="join">
                    <button type="button" @click="length = 4; generate()" class="btn btn-sm join-item" :class="length === 4 ? 'btn-primary' : 'btn-outline'">4 Digits</button>
                    <button type="button" @click="length = 6; generate()" class="btn btn-sm join-item" :class="length === 6 ? 'btn-primary' : 'btn-outline'">6 Digits</button>
                    <button type="button" @click="length = 8; generate()" class="btn btn-sm join-item" :class="length === 8 ? 'btn-primary' : 'btn-outline'">8 Digits</button>
                </div>
            </div>

            <button type="button" @click="generate()" class="btn btn-outline btn-sm rounded-[10px]">
                ⟳ Refresh Code
            </button>
        </div>

        <div class="p-8 rounded-[24px] bg-[#163300] text-white flex flex-col items-center justify-center">
            <span class="text-xs uppercase tracking-widest text-[#9fe870] font-bold font-mono">Cryptographically Secure OTP</span>
            <p class="font-mono text-5xl sm:text-6xl font-black mt-3 text-[#9fe870] tracking-[0.25em]" x-text="code"></p>
            <p class="text-xs text-white/60 mt-3">Generated using Web Crypto CSPRNG</p>
        </div>

        <div class="flex justify-center">
            <button type="button" @click="copy()" class="btn btn-primary rounded-[12px] font-bold px-8">
                <span x-show="!copied">Copy One-Time Code</span>
                <span x-show="copied" x-cloak>✓ Copied to Clipboard!</span>
            </button>
        </div>

        {{-- Technical Comparison: OTP Protocols & Multi-Factor Auth Architectures Matrix --}}
        <div class="mt-8 pt-6 border-t border-base-300">
            <h3 class="font-bold text-base sm:text-lg text-base-content font-display mb-4">
                OTP Multi-Factor Protocols: TOTP vs. HOTP vs. SMS vs. FIDO2 WebAuthn Matrix
            </h3>
            <div class="overflow-x-auto rounded-3xl border border-base-300">
                <table class="table table-zebra w-full text-xs sm:text-sm">
                    <thead class="bg-base-200 text-base-content/70 uppercase text-[11px] font-mono">
                        <tr>
                            <th>Authentication Mechanism</th>
                            <th>Underlying RFC Standard</th>
                            <th>Time Window / Validity</th>
                            <th>Phishing Resistance</th>
                            <th>Leading Client Application</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="font-bold font-mono text-[#163300] dark:text-[#9fe870]">TOTP (Time-Based OTP)</td>
                            <td class="font-mono font-bold">RFC 6238 (HMAC-SHA1/256)</td>
                            <td class="font-mono">30 – 60 seconds</td>
                            <td class="text-warning font-semibold">Moderate (Vulnerable to reverse proxies)</td>
                            <td>Google Authenticator, Authy, 1Password, Bitwarden</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-[#163300] dark:text-[#9fe870]">HOTP (Counter-Based OTP)</td>
                            <td class="font-mono">RFC 4226 (HMAC-SHA1)</td>
                            <td class="font-mono">Event counter increment</td>
                            <td class="text-warning font-semibold">Moderate (Subject to desync)</td>
                            <td>Hardware tokens (YubiKey OATH-HOTP, RSA SecurID)</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-error">SMS / Voice OTP</td>
                            <td class="font-mono">Telecom SS7 / SMPP</td>
                            <td class="font-mono">3 to 10 minutes</td>
                            <td class="text-error font-semibold">Low (SIM swapping, SS7 interception)</td>
                            <td>Legacy consumer banking, SMS text delivery</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-success">FIDO2 / WebAuthn Passkeys</td>
                            <td class="font-mono font-bold text-success">W3C WebAuthn / FIDO2</td>
                            <td class="font-mono">Per-challenge cryptographic signature</td>
                            <td class="font-bold text-success font-mono">100% Phishing Proof (Origin bound)</td>
                            <td>Apple TouchID, Windows Hello, YubiKey FIDO2 hardware keys</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</x-card>

<x-tool-paper x-data="{
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkphbmUgRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMiwiZXhwIjoxODMxNjIzOTAyfQ.dummy_signature_hash',
    headerStr: '',
    payloadStr: '',
    error: '',
    init() {
        const params = new URLSearchParams(window.location.search);
        if (params.has('token')) {
            this.token = params.get('token');
        }
        this.decodeJwt();
    },
    loadSample(type) {
        if (type === 'active') {
            this.token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkphbmUgRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMiwiZXhwIjoxODMxNjIzOTAyfQ.dummy_signature_hash';
        } else if (type === 'expired') {
            this.token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5ODc2NTQzMjEiLCJuYW1lIjoiQWxleCBWYW5kZXIiLCJyb2xlIjoidXNlciIsImlhdCI6MTYwMDAwMDAwMCwiZXhwIjoxNjAwMDAzNjAwfQ.dummy_signature_expired';
        } else if (type === 'clear') {
            this.token = '';
        }
        this.decodeJwt();
    },
    get expStatus() {
        if (!this.payloadStr) return null;
        try {
            const p = JSON.parse(this.payloadStr);
            if (!p.exp) return { text: 'No expiration claim (exp) defined', color: 'text-base-content/60', badge: 'bg-base-200' };
            const expMs = p.exp * 1000;
            const diffMs = expMs - Date.now();
            const dateStr = new Date(expMs).toUTCString();
            if (diffMs > 0) {
                const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
                const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                return {
                    text: `Active · Expires in ${days > 0 ? days + 'd ' : ''}${hours}h (${dateStr})`,
                    color: 'text-[#054d28]',
                    badge: 'bg-[#e2f6d5]'
                };
            } else {
                const pastDays = Math.floor(-diffMs / (1000 * 60 * 60 * 24));
                return {
                    text: `Expired ${pastDays > 0 ? pastDays + 'd ago' : 'recently'} (${dateStr})`,
                    color: 'text-error',
                    badge: 'bg-error/15'
                };
            }
        } catch (e) {
            return null;
        }
    },
    decodeJwt() {
        this.error = '';
        this.headerStr = '';
        this.payloadStr = '';
        const trimmed = this.token.trim();
        if (!trimmed) return;

        const parts = trimmed.split('.');
        if (parts.length < 2) {
            this.error = 'Invalid JWT: A standard JWT token contains three dot-separated base64url segments.';
            return;
        }

        const b64Decode = (str) => {
            let s = str.replace(/-/g, '+').replace(/_/g, '/');
            while (s.length % 4 !== 0) s += '=';
            const bin = atob(s);
            const bytes = Uint8Array.from(bin, c => c.charCodeAt(0));
            return new TextDecoder().decode(bytes);
        };

        try {
            const h = JSON.parse(b64Decode(parts[0]));
            this.headerStr = JSON.stringify(h, null, 2);
        } catch (e) {
            this.error = 'Failed to decode JWT Header: malformed base64url or JSON.';
            return;
        }

        try {
            const p = JSON.parse(b64Decode(parts[1]));
            this.payloadStr = JSON.stringify(p, null, 2);
        } catch (e) {
            this.error = 'Failed to decode JWT Payload: malformed base64url or JSON.';
            return;
        }
    }
}">
    <div class="space-y-6">
        <div>
            <div class="flex items-center justify-between mb-2">
                <label class="block text-xs font-bold uppercase tracking-wider text-base-content/60 font-mono">Encoded JWT Token</label>
                <div class="flex items-center gap-2">
                    <button type="button" @click="loadSample('active')" class="px-3 py-1 rounded-full bg-base-200 border border-base-300 text-[11px] font-semibold hover:border-primary hover:bg-[#e2f6d5] transition-all">Sample Active</button>
                    <button type="button" @click="loadSample('expired')" class="px-3 py-1 rounded-full bg-base-200 border border-base-300 text-[11px] font-semibold hover:border-primary hover:bg-[#e2f6d5] transition-all">Sample Expired</button>
                    <button type="button" @click="loadSample('clear')" class="px-3 py-1 rounded-full bg-base-200 border border-base-300 text-[11px] font-semibold hover:text-error transition-all">Clear</button>
                </div>
            </div>
            <textarea aria-label="Paste JWT token (e.g. eyJhbGciOiJIUzI1Ni...)"
                x-model="token"
                @input="decodeJwt()"
                rows="4"
                placeholder="Paste JWT token (e.g. eyJhbGciOiJIUzI1Ni...)"
                class="textarea textarea-bordered rounded-2xl w-full font-mono text-xs p-4 bg-base-100 break-all leading-relaxed"
            ></textarea>
        </div>

        {{-- Expiry Status Badge --}}
        <template x-if="expStatus">
            <div class="p-3.5 rounded-2xl border border-base-300 flex items-center justify-between text-xs" :class="expStatus.badge">
                <span class="font-bold font-mono">JWT Expiration Status:</span>
                <span class="font-bold font-mono" :class="expStatus.color" x-text="expStatus.text"></span>
            </div>
        </template>
            ></textarea>
        </div>

        {{-- Error Banner --}}
        <div x-show="error" style="display: none;" class="alert alert-error text-xs rounded-2xl py-3 px-4">
            <span class="font-bold">Decoding Error:</span> <span x-text="error"></span>
        </div>

        {{-- Decoded Header & Payload Grid --}}
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            {{-- Header --}}
            <div class="p-6 rounded-3xl bg-base-100 border border-base-300 shadow-xs">
                <span class="text-xs font-bold uppercase tracking-wider text-[#163300] dark:text-[#9fe870] font-mono block mb-2">Header (Algorithm &amp; Token Type)</span>
                <pre class="bg-base-200/60 p-4 rounded-2xl font-mono text-xs text-base-content overflow-x-auto min-h-[160px]"><code x-text="headerStr || 'Header will appear here...'"></code></pre>
            </div>

            {{-- Payload / Claims --}}
            <div class="p-6 rounded-3xl bg-base-100 border border-base-300 shadow-xs">
                <span class="text-xs font-bold uppercase tracking-wider text-base-content/60 font-mono block mb-2">Payload (Claims &amp; Expiry)</span>
                <pre class="bg-base-200/60 p-4 rounded-2xl font-mono text-xs text-base-content overflow-x-auto min-h-[160px]"><code x-text="payloadStr || 'Payload claims will appear here...'"></code></pre>
            </div>
        </div>

        {{-- Technical Comparison: JWT Signing Algorithms --}}
        <div class="mt-8 pt-6 border-t border-base-300">
            <h3 class="font-bold text-base sm:text-lg text-base-content font-display mb-4">
                JSON Web Token (JWT) Signature Algorithms Comparison (HS256 vs. RS256 vs. ES256)
            </h3>
            <div class="overflow-x-auto rounded-3xl border border-base-300">
                <table class="table table-zebra w-full text-xs sm:text-sm">
                    <thead class="bg-base-200 text-base-content/70 uppercase text-[11px] font-mono">
                        <tr>
                            <th>Algorithm</th>
                            <th>Key Cryptography</th>
                            <th>Secret Exposure Risk</th>
                            <th>Verification Efficiency</th>
                            <th>Identity Protocol Standard</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="font-bold font-mono text-[#163300] dark:text-[#9fe870]">HS256</td>
                            <td>Symmetric (Shared Secret)</td>
                            <td class="text-warning">High (Client holds secret)</td>
                            <td class="text-[#2ead4b]">Ultra-Fast (HMAC)</td>
                            <td>Internal backend microservices</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-[#163300] dark:text-[#9fe870]">RS256</td>
                            <td>Asymmetric (Private / Public)</td>
                            <td class="text-[#2ead4b]">Zero (JWKS Public Key)</td>
                            <td>Moderate (RSA math)</td>
                            <td>OAuth 2.0, Auth0, Google Identity, Okta</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-[#163300] dark:text-[#9fe870]">ES256</td>
                            <td>Asymmetric (Elliptic Curve)</td>
                            <td class="text-[#2ead4b]">Zero (JWKS Public Key)</td>
                            <td class="text-[#2ead4b]">High (Shorter Keys)</td>
                            <td>Apple Sign-In, WebAuthn, FIDO2 tokens</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</x-tool-paper>

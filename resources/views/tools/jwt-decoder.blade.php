<x-tool-paper x-data="{
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkphbmUgRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMiwiZXhwIjoxODMxNjIzOTAyfQ.dummy_signature_hash',
    headerStr: '',
    payloadStr: '',
    error: '',
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
    },
    init() {
        this.decodeJwt();
    }
}">
    <div class="space-y-6">
        <div>
            <div class="flex items-center justify-between mb-2">
                <label class="block text-xs font-bold uppercase tracking-wider text-base-content/60 font-mono">Encoded JWT Token</label>
                <span class="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#e2f6d5] text-[#054d28] font-bold text-[11px]">
                    100% Client-Side Decoded
                </span>
            </div>
            <textarea
                x-model="token"
                @input="decodeJwt()"
                rows="4"
                placeholder="Paste JWT token (e.g. eyJhbGciOiJIUzI1Ni...)"
                class="textarea textarea-bordered rounded-2xl w-full font-mono text-xs p-4 bg-base-100 break-all leading-relaxed"
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
                <span class="text-xs font-bold uppercase tracking-wider text-primary font-mono block mb-2">Header (Algorithm &amp; Token Type)</span>
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
                            <td class="font-bold font-mono text-primary">HS256</td>
                            <td>Symmetric (Shared Secret)</td>
                            <td class="text-warning">High (Client holds secret)</td>
                            <td class="text-[#2ead4b]">Ultra-Fast (HMAC)</td>
                            <td>Internal backend microservices</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-primary">RS256</td>
                            <td>Asymmetric (Private / Public)</td>
                            <td class="text-[#2ead4b]">Zero (JWKS Public Key)</td>
                            <td>Moderate (RSA math)</td>
                            <td>OAuth 2.0, Auth0, Google Identity, Okta</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-primary">ES256</td>
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

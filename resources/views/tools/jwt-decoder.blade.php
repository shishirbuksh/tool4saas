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
    </div>
</x-tool-paper>

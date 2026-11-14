<x-card class="p-6 md:p-8" x-data="{
    mode: 'encrypt',
    text: '',
    password: '',
    output: '',
    copied: false,
    async process() {
        if (!this.text || !this.password) return alert('Please enter both text and a secret password.');
        const enc = new TextEncoder();
        const pwKey = await crypto.subtle.importKey('raw', enc.encode(this.password), { name: 'PBKDF2' }, false, ['deriveKey']);
        const salt = enc.encode('tool4saas-salt-constant');
        const key = await crypto.subtle.deriveKey(
            { name: 'PBKDF2', salt, iterations: 100000, hash: 'SHA-256' },
            pwKey,
            { name: 'AES-GCM', length: 256 },
            false,
            ['encrypt', 'decrypt']
        );

        if (this.mode === 'encrypt') {
            const iv = crypto.getRandomValues(new Uint8Array(12));
            const cipher = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, enc.encode(this.text));
            const combined = new Uint8Array(iv.length + cipher.byteLength);
            combined.set(iv);
            combined.set(new Uint8Array(cipher), iv.length);
            this.output = btoa(String.fromCharCode.apply(null, combined));
        } else {
            try {
                const combined = Uint8Array.from(atob(this.text), c => c.charCodeAt(0));
                const iv = combined.slice(0, 12);
                const cipher = combined.slice(12);
                const dec = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, cipher);
                this.output = new TextDecoder().decode(dec);
            } catch(e) {
                alert('Decryption failed! Incorrect password or corrupted payload.');
            }
        }
    },
    copy() {
        navigator.clipboard.writeText(this.output);
        this.copied = true;
        setTimeout(() => this.copied = false, 2000);
    }
}">
    <div class="space-y-6">
        <div class="flex items-center justify-between">
            <div class="join">
                <button type="button" @click="mode = 'encrypt'" class="btn btn-sm join-item" :class="mode === 'encrypt' ? 'btn-primary' : 'btn-outline'">AES-256-GCM Encrypt</button>
                <button type="button" @click="mode = 'decrypt'" class="btn btn-sm join-item" :class="mode === 'decrypt' ? 'btn-primary' : 'btn-outline'">Decrypt Payload</button>
            </div>
            <span class="text-xs font-mono text-success font-bold">100% Web Crypto API</span>
        </div>

        <div>
            <label class="block text-xs font-bold uppercase tracking-wider mb-2 text-base-content/70" x-text="mode === 'encrypt' ? 'Plaintext Message' : 'Encrypted Base64 String'"></label>
            <textarea x-model="text" rows="4" class="textarea textarea-bordered w-full rounded-[16px] text-sm font-mono"></textarea>
        </div>

        <div>
            <label class="block text-xs font-bold uppercase tracking-wider mb-2 text-base-content/70">Secret Encryption Passphrase</label>
            <input type="password" x-model="password" placeholder="Enter high-entropy secret key..." class="input input-bordered w-full rounded-[12px] text-sm font-mono" />
        </div>

        <button type="button" @click="process()" class="btn btn-primary rounded-[12px] font-bold">
            <span x-text="mode === 'encrypt' ? '🔒 Encrypt with AES-GCM' : '🔓 Decrypt Message'"></span>
        </button>

        <template x-if="output">
            <div class="p-4 bg-base-200/50 rounded-[16px] border border-base-300 space-y-2">
                <div class="flex justify-between items-center">
                    <span class="text-xs font-bold uppercase tracking-wider text-base-content/70">Processed Result</span>
                    <button type="button" @click="copy()" class="btn btn-xs btn-primary rounded-[8px]">
                        <span x-show="!copied">Copy</span>
                        <span x-show="copied" x-cloak>✓ Copied</span>
                    </button>
                </div>
                <div class="font-mono text-sm break-all bg-base-100 p-3 rounded-[10px]" x-text="output"></div>
            </div>
        </template>
    </div>
</x-card>

<x-tool-paper>
    <div x-data="{
        input: '',
        sha256: '',
        sha512: '',
        sha1: '',
        copied: '',
        async computeHashes() {
            if (!this.input) {
                this.sha256 = '';
                this.sha512 = '';
                this.sha1 = '';
                return;
            }
            const encoder = new TextEncoder();
            const data = encoder.encode(this.input);

            // SHA-256
            const hash256 = await crypto.subtle.digest('SHA-256', data);
            this.sha256 = Array.from(new Uint8Array(hash256)).map(b => b.toString(16).padStart(2, '0')).join('');

            // SHA-512
            const hash512 = await crypto.subtle.digest('SHA-512', data);
            this.sha512 = Array.from(new Uint8Array(hash512)).map(b => b.toString(16).padStart(2, '0')).join('');

            // SHA-1
            const hash1 = await crypto.subtle.digest('SHA-1', data);
            this.sha1 = Array.from(new Uint8Array(hash1)).map(b => b.toString(16).padStart(2, '0')).join('');
        },
        copy(type, val) {
            if (!val) return;
            navigator.clipboard.writeText(val);
            this.copied = type;
            setTimeout(() => this.copied = '', 2000);
        }
    }">
        <div class="mb-6">
            <label class="block text-sm font-bold text-base-content font-display mb-2">Input String to Hash</label>
            <textarea
                x-model="input"
                @input="computeHashes()"
                rows="4"
                placeholder="Enter string to generate cryptographic hashes..."
                class="textarea textarea-bordered rounded-2xl w-full font-mono text-sm p-4 bg-base-100"
            ></textarea>
        </div>

        <div class="space-y-4">
            {{-- SHA-256 --}}
            <div class="p-5 rounded-2xl border border-base-300 bg-base-100 shadow-xs">
                <div class="flex items-center justify-between mb-2">
                    <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e2f6d5] text-[#054d28] font-bold text-xs uppercase tracking-wider font-mono">
                        SHA-256 (NIST Secure)
                    </span>
                    <button
                        type="button"
                        @click="copy('sha256', sha256)"
                        :disabled="!sha256"
                        class="px-3.5 py-1 rounded-full bg-base-200 hover:bg-primary hover:text-primary-content text-xs font-bold transition-all disabled:opacity-50"
                    >
                        <span x-text="copied === 'sha256' ? 'Copied!' : 'Copy Hash'"></span>
                    </button>
                </div>
                <div class="font-mono text-xs break-all bg-base-200/60 p-3 rounded-xl select-all text-base-content" x-text="sha256 || 'Hash will appear here as you type...'"></div>
            </div>

            {{-- SHA-512 --}}
            <div class="p-5 rounded-2xl border border-base-300 bg-base-100 shadow-xs">
                <div class="flex items-center justify-between mb-2">
                    <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-base-200 text-base-content font-bold text-xs uppercase tracking-wider font-mono">
                        SHA-512 (High Entropy)
                    </span>
                    <button
                        type="button"
                        @click="copy('sha512', sha512)"
                        :disabled="!sha512"
                        class="px-3.5 py-1 rounded-full bg-base-200 hover:bg-primary hover:text-primary-content text-xs font-bold transition-all disabled:opacity-50"
                    >
                        <span x-text="copied === 'sha512' ? 'Copied!' : 'Copy Hash'"></span>
                    </button>
                </div>
                <div class="font-mono text-xs break-all bg-base-200/60 p-3 rounded-xl select-all text-base-content" x-text="sha512 || 'Hash will appear here as you type...'"></div>
            </div>

            {{-- SHA-1 --}}
            <div class="p-5 rounded-2xl border border-base-300 bg-base-100 shadow-xs">
                <div class="flex items-center justify-between mb-2">
                    <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-base-200 text-base-content/60 font-bold text-xs uppercase tracking-wider font-mono">
                        SHA-1 (Legacy / Git Compatibility)
                    </span>
                    <button
                        type="button"
                        @click="copy('sha1', sha1)"
                        :disabled="!sha1"
                        class="px-3.5 py-1 rounded-full bg-base-200 hover:bg-primary hover:text-primary-content text-xs font-bold transition-all disabled:opacity-50"
                    >
                        <span x-text="copied === 'sha1' ? 'Copied!' : 'Copy Hash'"></span>
                    </button>
                </div>
                <div class="font-mono text-xs break-all bg-base-200/60 p-3 rounded-xl select-all text-base-content/70" x-text="sha1 || 'Hash will appear here as you type...'"></div>
            </div>
        </div>
    </div>
</x-tool-paper>

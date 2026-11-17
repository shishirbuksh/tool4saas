<x-tool-paper>
    <div x-data="{
        mode: 'encode',
        urlSafe: false,
        noPadding: false,
        input: '',
        output: '',
        copied: false,
        init() {
            const params = new URLSearchParams(window.location.search);
            if (params.has('mode') && ['encode', 'decode'].includes(params.get('mode'))) {
                this.mode = params.get('mode');
            }
            if (params.has('urlsafe') || params.has('urlSafe')) {
                this.urlSafe = true;
            }
            if (params.has('nopadding') || params.has('noPadding')) {
                this.noPadding = true;
            }
            if (params.has('input')) {
                this.input = params.get('input');
                this.transform();
            }
        },
        transform() {
            if (!this.input) {
                this.output = '';
                return;
            }
            try {
                if (this.mode === 'encode') {
                    const bytes = new TextEncoder().encode(this.input);
                    let binary = '';
                    for (let i = 0; i < bytes.byteLength; i++) {
                        binary += String.fromCharCode(bytes[i]);
                    }
                    let res = btoa(binary);
                    if (this.urlSafe) {
                        res = res.replace(/\+/g, '-').replace(/\//g, '_');
                    }
                    if (this.noPadding) {
                        res = res.replace(/=+$/, '');
                    }
                    this.output = res;
                } else {
                    let cleaned = this.input.trim().replace(/\s+/g, '');
                    if (this.urlSafe) {
                        cleaned = cleaned.replace(/-/g, '+').replace(/_/g, '/');
                    }
                    while (cleaned.length % 4 !== 0) {
                        cleaned += '=';
                    }
                    const binary = atob(cleaned);
                    const bytes = new Uint8Array(binary.length);
                    for (let i = 0; i < binary.length; i++) {
                        bytes[i] = binary.charCodeAt(i);
                    }
                    this.output = new TextDecoder().decode(bytes);
                }
            } catch (e) {
                this.output = 'Error: Invalid input for Base64 ' + this.mode + ' operation.';
            }
        },
        copy() {
            if (!this.output) return;
            navigator.clipboard.writeText(this.output);
            this.copied = true;
            setTimeout(() => this.copied = false, 2000);
        }
    }">
        <div class="flex flex-wrap items-center justify-between gap-4 mb-6">
            {{-- Wise Pill Mode Switcher Tabs --}}
            <div class="flex gap-1.5 p-1.5 rounded-full bg-base-200 border border-base-300 inline-flex">
                <button
                    type="button"
                    class="px-5 py-2 rounded-full font-bold text-xs sm:text-sm transition-all"
                    :class="mode === 'encode' ? 'bg-primary text-primary-content shadow-xs' : 'text-base-content/70 hover:text-base-content hover:bg-base-100'"
                    @click="mode = 'encode'; transform()"
                >
                    Encode Base64
                </button>
                <button
                    type="button"
                    class="px-5 py-2 rounded-full font-bold text-xs sm:text-sm transition-all"
                    :class="mode === 'decode' ? 'bg-primary text-primary-content shadow-xs' : 'text-base-content/70 hover:text-base-content hover:bg-base-100'"
                    @click="mode = 'decode'; transform()"
                >
                    Decode Base64
                </button>
            </div>

            {{-- URL Safe and No Padding Toggles --}}
            <div class="flex items-center gap-3">
                <label class="label cursor-pointer gap-2 bg-base-200/80 px-3.5 py-1.5 rounded-full border border-base-300">
                    <input type="checkbox" x-model="urlSafe" @change="transform()" class="checkbox checkbox-primary checkbox-xs rounded-md" />
                    <span class="label-text text-xs font-semibold">URL-Safe (<span class="font-mono">-</span>, <span class="font-mono">_</span>)</span>
                </label>
                <label class="label cursor-pointer gap-2 bg-base-200/80 px-3.5 py-1.5 rounded-full border border-base-300">
                    <input type="checkbox" x-model="noPadding" @change="transform()" class="checkbox checkbox-primary checkbox-xs rounded-md" />
                    <span class="label-text text-xs font-semibold">Strip Padding (<span class="font-mono">=</span>)</span>
                </label>
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            {{-- Input Area --}}
            <div>
                <label class="block text-sm font-semibold mb-2" x-text="mode === 'encode' ? 'Plain Text Input' : 'Base64 Encoded Text'"></label>
                <textarea
                    x-model="input"
                    @input="transform()"
                    rows="9"
                    placeholder="Enter text to convert..."
                    class="textarea textarea-bordered rounded-2xl w-full font-mono text-xs sm:text-sm leading-relaxed p-4 bg-base-100"
                ></textarea>
            </div>

            {{-- Output Area --}}
            <div>
                <div class="flex items-center justify-between mb-2">
                    <label class="block text-sm font-semibold" x-text="mode === 'encode' ? 'Base64 Output' : 'Decoded Text'"></label>
                    <button
                        type="button"
                        @click="copy()"
                        :disabled="!output"
                        class="px-3.5 py-1 rounded-full bg-base-200 hover:bg-primary hover:text-primary-content font-bold text-xs transition-all disabled:opacity-50"
                    >
                        <span x-text="copied ? 'Copied!' : 'Copy Result'"></span>
                    </button>
                </div>
                <textarea
                    x-model="output"
                    readonly
                    rows="9"
                    placeholder="Result will appear here..."
                    class="textarea textarea-bordered rounded-2xl bg-base-200/50 w-full font-mono text-xs sm:text-sm leading-relaxed p-4"
                ></textarea>
            </div>
        </div>

        {{-- Technical Comparison: Base64 Overhead Matrix --}}
        <div class="mt-8 pt-6 border-t border-base-300">
            <h3 class="font-bold text-base sm:text-lg text-base-content font-display mb-4">
                Binary Data vs. Base64 Encoding Overhead Matrix (RFC 4648)
            </h3>
            <div class="overflow-x-auto rounded-3xl border border-base-300">
                <table class="table table-zebra w-full text-xs sm:text-sm">
                    <thead class="bg-base-200 text-base-content/70 uppercase text-[11px] font-mono">
                        <tr>
                            <th>Raw Binary Size</th>
                            <th>Base64 Encoded Size</th>
                            <th>Size Overhead</th>
                            <th>Architectural Recommendation</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="font-bold font-mono">1 KB (1,024 B)</td>
                            <td class="font-mono">~1.37 KB</td>
                            <td class="font-mono text-warning">+33.3%</td>
                            <td>Zero latency impact; ideal for inline SVGs and favicon Data URIs</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">10 KB (10,240 B)</td>
                            <td class="font-mono">~13.65 KB</td>
                            <td class="font-mono text-warning">+33.3%</td>
                            <td>Suitable for JWT authorization tokens and small cryptographic keys</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">100 KB (102,400 B)</td>
                            <td class="font-mono">~136.5 KB</td>
                            <td class="font-mono text-warning">+33.3%</td>
                            <td>Threshold limit; beyond this, static asset CDN caching is preferred</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">1 MB (1,048,576 B)</td>
                            <td class="font-mono">~1.33 MB</td>
                            <td class="font-mono text-warning">+33.3%</td>
                            <td>Increases mobile parse time; prefer multipart/form-data for transfer</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">10 MB (10,485,760 B)</td>
                            <td class="font-mono">~13.33 MB</td>
                            <td class="font-mono text-warning">+33.3%</td>
                            <td>Heavy browser memory footprint; stream via Blob / Object URLs instead</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</x-tool-paper>

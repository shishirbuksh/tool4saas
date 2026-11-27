<x-tool-paper>
    <div class="space-y-6" x-data="{
        input: 'function calculateTotal(price, taxRate) {\n  // calculate sales tax and total\n  const tax = price * (taxRate / 100);\n  const total = price + tax;\n  return {\n    subtotal: price,\n    tax: tax,\n    grandTotal: total\n  };\n}',
        output: '',
        mode: 'minify',
        lang: 'js',
        copied: false,
        process() {
            if (!this.input.trim()) {
                this.output = '';
                return;
            }
            if (this.mode === 'minify') {
                let code = this.input.replace(/\/\*[\s\S]*?\*\/|([^:]|^)\/\/.*$/gm, '$1');
                code = code.replace(/\s+/g, ' ');
                code = code.replace(/\s*([{};:(),[\]=+\-*\/<>])\s*/g, '$1');
                this.output = code.trim();
            } else {
                let indent = 0;
                const lines = this.input.replace(/\r\n/g, '\n').replace(/\s*{\s*/g, ' {\n').replace(/\s*}\s*/g, '\n}\n').replace(/\s*;\s*/g, ';\n').trim().split('\n');
                const res = [];
                for (let raw of lines) {
                    let l = raw.trim();
                    if (!l) continue;
                    if (l.startsWith('}')) indent = Math.max(0, indent - 1);
                    res.push('  '.repeat(indent) + l);
                    if (l.endsWith('{')) indent++;
                }
                this.output = res.join('\n');
            }
        },
        init() {
            this.process();
        },
        get savings() {
            if (!this.input.length || !this.output.length) return 0;
            return Math.max(0, Math.round((1 - (this.output.length / this.input.length)) * 100));
        },
        copy() {
            if (!this.output) return;
            navigator.clipboard.writeText(this.output);
            this.copied = true;
            setTimeout(() => this.copied = false, 2000);
        },
        download() {
            if (!this.output) return;
            const blob = new Blob([this.output], { type: 'text/plain;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'minified.txt';
            a.click();
            setTimeout(() => URL.revokeObjectURL(url), 1000);
        }
    }">
        <div class="flex items-center gap-2 p-1.5 rounded-full bg-base-200 border border-base-300 w-fit">
            <button
                type="button"
                @click="mode = 'minify'; process()"
                class="px-5 py-2 rounded-full text-xs font-bold transition-all"
                :class="mode === 'minify' ? 'bg-primary text-primary-content shadow-xs' : 'text-base-content/70 hover:text-base-content'"
            >
                Minify Code
            </button>
            <button
                type="button"
                @click="mode = 'format'; process()"
                class="px-5 py-2 rounded-full text-xs font-bold transition-all"
                :class="mode === 'format' ? 'bg-primary text-primary-content shadow-xs' : 'text-base-content/70 hover:text-base-content'"
            >
                Format / Beautify
            </button>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
                <div class="flex items-center justify-between mb-2">
                    <label class="block text-xs font-bold uppercase tracking-wider text-base-content/60 font-mono">Source Code (JS / CSS / HTML)</label>
                    <span class="text-xs text-base-content/50 font-mono"><span x-text="input.length"></span> chars</span>
                </div>
                <textarea
                    x-model="input"
                    @input="process()"
                    rows="13"
                    class="textarea textarea-bordered rounded-3xl w-full text-xs font-mono p-5 bg-base-100"
                ></textarea>
            </div>

            <div>
                <div class="flex items-center justify-between mb-2">
                    <div class="flex items-center gap-2">
                        <label class="block text-xs font-bold uppercase tracking-wider text-base-content/60 font-mono">Result</label>
                        <template x-if="mode === 'minify' && savings > 0">
                            <span class="badge badge-success badge-sm font-bold font-mono">−<span x-text="savings"></span>% smaller</span>
                        </template>
                    </div>
                    <div class="flex items-center gap-2">
                        <button
                            type="button"
                            @click="copy()"
                            :disabled="!output"
                            class="px-4 py-1 rounded-full bg-base-200 hover:bg-primary hover:text-primary-content text-xs font-bold transition-all disabled:opacity-40"
                        >
                            <span x-text="copied ? 'Copied!' : 'Copy'"></span>
                        </button>
                        <button
                            type="button"
                            @click="download()"
                            :disabled="!output"
                            class="px-4 py-1 rounded-full bg-primary text-primary-content hover:bg-primary/90 text-xs font-bold transition-all disabled:opacity-40"
                        >
                            Download
                        </button>
                    </div>
                </div>
                <textarea
                    x-model="output"
                    readonly
                    rows="13"
                    class="textarea textarea-bordered rounded-3xl w-full text-xs font-mono p-5 bg-base-200/50 select-all"
                ></textarea>
            </div>
        </div>

        {{-- Technical Comparison: Code Minification & Compression Benchmark Matrix --}}
        <div class="mt-8 pt-6 border-t border-base-300">
            <h3 class="font-bold text-base sm:text-lg text-base-content font-display mb-4">
                Code Minification vs. Network Compression (Gzip / Brotli) Efficiency Matrix
            </h3>
            <div class="overflow-x-auto rounded-3xl border border-base-300">
                <table class="table table-zebra w-full text-xs sm:text-sm">
                    <thead class="bg-base-200 text-base-content/70 uppercase text-[11px] font-mono">
                        <tr>
                            <th>Asset Type</th>
                            <th>Unminified Size</th>
                            <th>Minified (Whitespace + Comments)</th>
                            <th>Minified + Gzip (Level 6)</th>
                            <th>Minified + Brotli (Level 11)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="font-bold font-mono text-primary">JavaScript (ES6+ Bundle)</td>
                            <td class="font-mono">100 KB (100%)</td>
                            <td class="font-mono font-bold">~45 KB (−55%)</td>
                            <td class="font-mono">~14 KB (−86%)</td>
                            <td class="font-mono text-success font-bold">~11 KB (−89%)</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-primary">CSS Stylesheet (Tailwind)</td>
                            <td class="font-mono">100 KB (100%)</td>
                            <td class="font-mono font-bold">~52 KB (−48%)</td>
                            <td class="font-mono">~12 KB (−88%)</td>
                            <td class="font-mono text-success font-bold">~9 KB (−91%)</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">HTML Document Structure</td>
                            <td class="font-mono">100 KB (100%)</td>
                            <td class="font-mono font-bold">~68 KB (−32%)</td>
                            <td class="font-mono">~18 KB (−82%)</td>
                            <td class="font-mono text-success font-bold">~15 KB (−85%)</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">JSON Data Payload</td>
                            <td class="font-mono">100 KB (100%)</td>
                            <td class="font-mono font-bold">~60 KB (−40%)</td>
                            <td class="font-mono">~15 KB (−85%)</td>
                            <td class="font-mono text-success font-bold">~12 KB (−88%)</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</x-tool-paper>

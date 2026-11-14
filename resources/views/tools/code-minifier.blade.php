<x-tool-paper x-data="codeMinifier()">
    <div class="space-y-6">
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
    </div>
</x-tool-paper>

<script>
document.addEventListener('alpine:init', () => {
    Alpine.data('codeMinifier', () => ({
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
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = 'minified.txt';
            a.click();
        }
    }));
});
</script>

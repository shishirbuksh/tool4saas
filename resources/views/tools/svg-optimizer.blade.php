<x-card class="p-6 md:p-8" x-data="{
    svgInput: '',
    optimizedSvg: '',
    copied: false,
    sanitizeSvg(raw) {
        try {
            const doc = new DOMParser().parseFromString(raw, 'image/svg+xml');
            if (doc.querySelector('parsererror')) return '';
            doc.querySelectorAll('script, foreignObject, iframe, object, embed').forEach(el => el.remove());
            doc.querySelectorAll('*').forEach(el => {
                Array.from(el.attributes).forEach(attr => {
                    const name = attr.name.toLowerCase();
                    const val = attr.value.trim().toLowerCase();
                    if (name.startsWith('on') || val.startsWith('javascript:') || val.startsWith('data:text/html')) {
                        el.removeAttribute(attr.name);
                    }
                });
            });
            return doc.documentElement && doc.documentElement.tagName.toLowerCase() === 'svg'
                ? doc.documentElement.outerHTML
                : '';
        } catch (e) {
            return '';
        }
    },
    get safePreviewSvg() {
        return this.sanitizeSvg(this.optimizedSvg);
    },
    optimize() {
        if (!this.svgInput) {
            this.optimizedSvg = '';
            return;
        }
        let s = this.svgInput;
        // strip comments
        s = s.replace(/<!--[\s\S]*?-->/g, '');
        // strip xml prolog & doctype
        s = s.replace(/<\?xml[\s\S]*?\?>/i, '');
        s = s.replace(/<!DOCTYPE[\s\S]*?>/i, '');
        // strip metadata
        s = s.replace(/<metadata[\s\S]*?<\/metadata>/gi, '');
        // strip extra spaces between tags
        s = s.replace(/>\s+</g, '><');
        // collapse spaces inside tags
        s = s.replace(/\s{2,}/g, ' ');
        this.optimizedSvg = s.trim();
    },
    get savings() {
        if (!this.svgInput || !this.optimizedSvg) return 0;
        const orig = this.svgInput.length;
        const opt = this.optimizedSvg.length;
        if (orig <= opt) return 0;
        return Math.round(((orig - opt) / orig) * 100);
    },
    copy() {
        if (!this.optimizedSvg) return;
        navigator.clipboard.writeText(this.optimizedSvg);
        this.copied = true;
        setTimeout(() => this.copied = false, 2000);
    },
    download() {
        if (!this.optimizedSvg) return;
        const blob = new Blob([this.optimizedSvg], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'optimized.svg';
        a.click();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
    }
}">
    <div class="space-y-6">
        <div>
            <label class="block text-xs font-bold uppercase tracking-wider mb-2 text-base-content/70">Raw SVG Code</label>
            <textarea
                x-model="svgInput"
                @input="optimize()"
                rows="6"
                placeholder="Paste <svg ...> code here..."
                class="textarea textarea-bordered w-full rounded-[16px] text-xs font-mono bg-base-100 dark:bg-base-200"
            ></textarea>
        </div>

        <template x-if="optimizedSvg">
            <div class="space-y-4">
                <div class="flex items-center justify-between p-4 rounded-[14px] bg-[#163300] text-white">
                    <div>
                        <span class="text-xs uppercase tracking-wider text-[#9fe870] font-bold">Optimization Summary</span>
                        <p class="font-mono text-sm mt-1">
                            <span x-text="svgInput.length + ' chars'"></span> → <strong class="text-[#9fe870]" x-text="optimizedSvg.length + ' chars'"></strong>
                        </p>
                    </div>
                    <div class="badge badge-primary font-mono font-bold text-sm" x-text="'-' + savings + '% Size Savings'"></div>
                </div>

                <div class="flex gap-2">
                    <button type="button" @click="copy()" class="btn btn-sm btn-primary rounded-[10px]">
                        <span x-show="!copied">Copy Optimized SVG</span>
                        <span x-show="copied" x-cloak>✓ Copied!</span>
                    </button>
                    <button type="button" @click="download()" class="btn btn-sm btn-outline rounded-[10px]">Download .SVG File</button>
                </div>

                <div class="p-6 bg-white rounded-[16px] border border-base-300 flex justify-center items-center min-h-[140px] overflow-hidden" x-html="safePreviewSvg"></div>
            </div>
        </template>

        {{-- Technical Comparison: SVG Optimization Passes & SVGO Techniques Matrix --}}
        <div class="mt-8 pt-6 border-t border-base-300">
            <h3 class="font-bold text-base sm:text-lg text-base-content font-display mb-4">
                SVG Optimization Passes, Path Precision &amp; Byte Reduction Matrix (SVGO Standards)
            </h3>
            <div class="overflow-x-auto rounded-3xl border border-base-300">
                <table class="table table-zebra w-full text-xs sm:text-sm">
                    <thead class="bg-base-200 text-base-content/70 uppercase text-[11px] font-mono">
                        <tr>
                            <th>Optimization Pass</th>
                            <th>Target XML Nodes / Attributes</th>
                            <th>Typical Size Savings</th>
                            <th>Visual Quality Impact</th>
                            <th>Safety &amp; Rendering Reliability</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="font-bold font-mono text-primary">Metadata &amp; Comment Stripping</td>
                            <td class="font-mono">&lt;!-- --&gt;, &lt;metadata&gt;, &lt;desc&gt;, &lt;title&gt;</td>
                            <td class="font-bold text-success font-mono">10% – 25% savings</td>
                            <td class="text-success font-bold">100% Zero visual change</td>
                            <td class="text-success font-bold">Completely safe (Removes Illustrator/Figma junk)</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-primary">Coordinate Precision Rounding</td>
                            <td class="font-mono">d="M10.123456 20.987654..." → d="M10.1 21..."</td>
                            <td class="font-bold text-success font-mono">20% – 40% savings</td>
                            <td>Imperceptible at 2 decimal places</td>
                            <td>Safe for UI icons; keep 3 decimals for detailed maps</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-primary">Whitespace &amp; Linebreak Collapse</td>
                            <td class="font-mono">CRLF, tabs, multi-spaces between tags</td>
                            <td class="font-mono">10% – 15% savings</td>
                            <td class="text-success font-bold">Zero visual change</td>
                            <td class="text-success font-bold">100% safe for inline DOM embedding</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">Path Merging &amp; Convert to Relative</td>
                            <td class="font-mono">Multiple &lt;path&gt; into single compound &lt;path&gt;</td>
                            <td class="font-mono">15% – 30% savings</td>
                            <td>Preserved (Unless individual fill colors differed)</td>
                            <td>Requires verifying identical CSS styling classes</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</x-card>

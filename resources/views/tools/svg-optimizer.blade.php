<x-card class="p-6 md:p-8" x-data="{
    svgInput: '',
    optimizedSvg: '',
    copied: false,
    optimize() {
        if (!this.svgInput) return;
        let s = this.svgInput;
        // strip comments
        s = s.replace(/<!--[\s\S]*?-->/g, '');
        // strip xml prolog & doctype
        s = s.replace(/<\?xml[\s\S]*?\?>/i, '');
        s = s.replace(/<!DOCTYPE[\s\S]*?>/i, '');
        // strip metadata & title & desc
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

                <div class="p-6 bg-white rounded-[16px] border border-base-300 flex justify-center items-center min-h-[140px] overflow-hidden" x-html="optimizedSvg"></div>
            </div>
        </template>
    </div>
</x-card>

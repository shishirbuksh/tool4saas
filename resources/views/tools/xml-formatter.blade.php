<x-card class="p-6 md:p-8" x-data="{
    input: '',
    copied: false,
    formatXml() {
        if (!this.input) return;
        let formatted = '';
        let pad = 0;
        const reg = /(>)(<)(\/*)/g;
        let xml = this.input.replace(reg, '$1\r\n$2$3');
        const lines = xml.split('\r\n');
        for (let i = 0; i < lines.length; i++) {
            let node = lines[i];
            let indent = 0;
            if (node.match(/.+<\/\w[^>]*>$/)) {
                indent = 0;
            } else if (node.match(/^<\/\w/)) {
                if (pad !== 0) pad -= 1;
            } else if (node.match(/^<\w[^>]*[^\/]>.*$/)) {
                indent = 1;
            } else {
                indent = 0;
            }
            let padding = '';
            for (let j = 0; j < pad; j++) padding += '  ';
            formatted += padding + node + '\r\n';
            pad += indent;
        }
        this.input = formatted.trim();
    },
    minifyXml() {
        if (!this.input) return;
        this.input = this.input.replace(/>\s+</g, '><').trim();
    },
    copy() {
        if (!this.input) return;
        navigator.clipboard.writeText(this.input);
        this.copied = true;
        setTimeout(() => this.copied = false, 2000);
    }
}">
    <div class="space-y-6">
        <div class="flex flex-wrap items-center justify-between gap-3">
            <div class="flex gap-2">
                <button type="button" @click="formatXml()" class="btn btn-sm btn-primary rounded-[10px] font-bold">Prettify & Indent XML</button>
                <button type="button" @click="minifyXml()" class="btn btn-sm btn-outline rounded-[10px]">Minify XML</button>
            </div>
            <div class="flex gap-2">
                <button type="button" @click="copy()" :disabled="!input" class="btn btn-sm btn-ghost rounded-[10px]">
                    <span x-show="!copied">Copy</span>
                    <span x-show="copied" x-cloak>✓ Copied</span>
                </button>
                <button type="button" @click="input = ''" class="btn btn-sm btn-ghost rounded-[10px]">Clear</button>
            </div>
        </div>

        <div>
            <textarea
                x-model="input"
                rows="12"
                placeholder="Paste XML or SVG code here (e.g. <root><item id='1'>Data</item></root>)..."
                class="textarea textarea-bordered w-full rounded-[16px] text-sm font-mono leading-relaxed bg-base-100 dark:bg-base-200 border-[#242a20]/20 focus:border-primary"
            ></textarea>
        </div>
    </div>
</x-card>

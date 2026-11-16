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

        {{-- Technical Comparison: XML 1.0 vs. HTML5 vs. XHTML Specification Matrix --}}
        <div class="mt-8 pt-6 border-t border-base-300">
            <h3 class="font-bold text-base sm:text-lg text-base-content font-display mb-4">
                Markup Syntax Standards: XML 1.0 vs. HTML5 vs. XHTML vs. JSON Matrix (W3C Standards)
            </h3>
            <div class="overflow-x-auto rounded-3xl border border-base-300">
                <table class="table table-zebra w-full text-xs sm:text-sm">
                    <thead class="bg-base-200 text-base-content/70 uppercase text-[11px] font-mono">
                        <tr>
                            <th>Markup Standard</th>
                            <th>Tag Closing Strictness</th>
                            <th>Attribute Quote Requirements</th>
                            <th>CDATA / Escaping Mechanics</th>
                            <th>Primary Production Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="font-bold font-mono text-primary">XML 1.0 (Fifth Edition)</td>
                            <td class="font-mono font-bold text-error">Strict (Must self-close or end tag)</td>
                            <td class="font-mono font-bold">Mandatory (Double or single quotes)</td>
                            <td class="font-mono">&lt;![CDATA[ raw text ]]&gt; or &amp;lt; &amp;gt; &amp;amp;</td>
                            <td>SOAP APIs, RSS/Atom feeds, Android manifests, SVG vectors</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-primary">HTML5 (WHATWG Living)</td>
                            <td class="font-mono text-success">Forgiving (Void tags &lt;img&gt;, &lt;br&gt; optional close)</td>
                            <td class="font-mono">Optional for unspaced values</td>
                            <td class="font-mono">HTML entity names (&amp;copy;, &amp;nbsp;, &amp;mdash;)</td>
                            <td>Modern World Wide Web pages, single-page web applications</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">XHTML 1.0 / 1.1</td>
                            <td class="font-mono text-error">Strict (Enforces XML parser rules)</td>
                            <td class="font-mono">Mandatory quotes; strictly lowercase tags</td>
                            <td class="font-mono">Requires XML entity syntax or CDATA</td>
                            <td>EPUB 3 digital books, strictly validated XML web systems</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">JSON (ECMA-404)</td>
                            <td class="font-mono font-bold">Strict key-value object syntax</td>
                            <td class="font-mono font-bold text-success">Strict double quotes on keys &amp; strings</td>
                            <td class="font-mono">Backslash escape: \&quot;, \\, \/, \n, \t</td>
                            <td>REST APIs, microservices, config files, NoSQL databases</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</x-card>

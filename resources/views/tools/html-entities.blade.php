<x-tool-paper x-data="{
    input: &quot;<div class='card'>\n  <h1>Welcome &amp; Enjoy Tools</h1>\n</div>&quot;,
    output: '',
    mode: 'encode',
    copied: false,
    process() {
        if (!this.input) {
            this.output = '';
            return;
        }
        if (this.mode === 'encode') {
            const ta = document.createElement('textarea');
            ta.textContent = this.input;
            this.output = ta.innerHTML;
        } else {
            const ta = document.createElement('textarea');
            ta.innerHTML = this.input;
            this.output = ta.value;
        }
    },
    init() {
        this.process();
    },
    copy() {
        if (!this.output) return;
        navigator.clipboard.writeText(this.output);
        this.copied = true;
        setTimeout(() => this.copied = false, 2000);
    }
}">
    <div class="space-y-6">
        <div class="flex items-center gap-2 p-1.5 rounded-full bg-base-200 border border-base-300 w-fit">
            <button
                type="button"
                @click="mode = 'encode'; process()"
                class="px-5 py-2 rounded-full text-xs font-bold transition-all"
                :class="mode === 'encode' ? 'bg-primary text-primary-content shadow-xs' : 'text-base-content/70 hover:text-base-content'"
            >
                Encode (Text → HTML Entities)
            </button>
            <button
                type="button"
                @click="mode = 'decode'; process()"
                class="px-5 py-2 rounded-full text-xs font-bold transition-all"
                :class="mode === 'decode' ? 'bg-primary text-primary-content shadow-xs' : 'text-base-content/70 hover:text-base-content'"
            >
                Decode (HTML Entities → Text)
            </button>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-base-content/60 font-mono mb-2" x-text="mode === 'encode' ? 'Plain HTML / Text Input' : 'HTML Entities Input'"></label>
                <textarea
                    x-model="input"
                    @input="process()"
                    rows="10"
                    placeholder="Enter characters to process..."
                    class="textarea textarea-bordered rounded-3xl w-full text-sm font-mono p-5 bg-base-100"
                ></textarea>
            </div>

            <div>
                <div class="flex items-center justify-between mb-2">
                    <label class="block text-xs font-bold uppercase tracking-wider text-base-content/60 font-mono" x-text="mode === 'encode' ? 'Encoded Output (&amp;lt; &amp;gt; &amp;amp;)' : 'Decoded Plain Text Output'"></label>
                    <button
                        type="button"
                        @click="copy()"
                        :disabled="!output"
                        class="px-4 py-1 rounded-full bg-base-200 hover:bg-primary hover:text-primary-content text-xs font-bold transition-all disabled:opacity-40"
                    >
                        <span x-text="copied ? 'Copied!' : 'Copy Result'"></span>
                    </button>
                </div>
                <textarea
                    x-model="output"
                    readonly
                    rows="10"
                    placeholder="Converted result will appear here..."
                    class="textarea textarea-bordered rounded-3xl w-full text-sm font-mono p-5 bg-base-200/50"
                ></textarea>
            </div>
        </div>

        {{-- Technical Comparison: HTML Character Entities Reference --}}
        <div class="mt-8 pt-6 border-t border-base-300">
            <h3 class="font-bold text-base sm:text-lg text-base-content font-display mb-4">
                Core HTML Character Entities &amp; Escape Codes Reference Matrix
            </h3>
            <div class="overflow-x-auto rounded-3xl border border-base-300">
                <table class="table table-zebra w-full text-xs sm:text-sm">
                    <thead class="bg-base-200 text-base-content/70 uppercase text-[11px] font-mono">
                        <tr>
                            <th>Character</th>
                            <th>Description</th>
                            <th>Named Entity</th>
                            <th>Decimal Entity</th>
                            <th>Hex Entity</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="font-bold font-mono text-primary text-base">&amp;</td>
                            <td>Ampersand Symbol</td>
                            <td class="font-mono text-[#2ead4b] font-bold">&amp;amp;</td>
                            <td class="font-mono">&amp;#38;</td>
                            <td class="font-mono">&amp;#x26;</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-primary text-base">&lt;</td>
                            <td>Less-Than (Tag Open)</td>
                            <td class="font-mono text-[#2ead4b] font-bold">&amp;lt;</td>
                            <td class="font-mono">&amp;#60;</td>
                            <td class="font-mono">&amp;#x3C;</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-primary text-base">&gt;</td>
                            <td>Greater-Than (Tag Close)</td>
                            <td class="font-mono text-[#2ead4b] font-bold">&amp;gt;</td>
                            <td class="font-mono">&amp;#62;</td>
                            <td class="font-mono">&amp;#x3E;</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-primary text-base">&quot;</td>
                            <td>Double Quotation Mark</td>
                            <td class="font-mono text-[#2ead4b] font-bold">&amp;quot;</td>
                            <td class="font-mono">&amp;#34;</td>
                            <td class="font-mono">&amp;#x22;</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-primary text-base">&#39;</td>
                            <td>Single Quote / Apostrophe</td>
                            <td class="font-mono text-[#2ead4b] font-bold">&amp;apos;</td>
                            <td class="font-mono">&amp;#39;</td>
                            <td class="font-mono">&amp;#x27;</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-primary text-base">␣</td>
                            <td>Non-Breaking Space</td>
                            <td class="font-mono text-[#2ead4b] font-bold">&amp;nbsp;</td>
                            <td class="font-mono">&amp;#160;</td>
                            <td class="font-mono">&amp;#xA0;</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</x-tool-paper>

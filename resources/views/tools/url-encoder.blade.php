<x-tool-paper>
    <div x-data="{
        mode: 'encode',
        input: '',
        output: '',
        copied: false,
        transform() {
            if (!this.input) {
                this.output = '';
                return;
            }
            try {
                if (this.mode === 'encode') {
                    this.output = encodeURIComponent(this.input);
                } else {
                    this.output = decodeURIComponent(this.input);
                }
            } catch (e) {
                this.output = 'Error: Invalid URL component to decode.';
            }
        },
        copy() {
            if (!this.output) return;
            window.copyTextSafe(this.output);
            this.copied = true;
            setTimeout(() => this.copied = false, 2000);
        }
    }">
        {{-- Wise Pill Mode Switcher Tabs --}}
        <div class="flex gap-1.5 p-1.5 rounded-full bg-base-200 border border-base-300 mb-6 inline-flex">
            <button
                type="button"
                class="px-5 py-2 rounded-full font-bold text-xs sm:text-sm transition-all"
                :class="mode === 'encode' ? 'bg-primary text-primary-content shadow-xs' : 'text-base-content/70 hover:text-base-content hover:bg-base-100'"
                @click="mode = 'encode'; transform()"
            >
                URL Encode
            </button>
            <button
                type="button"
                class="px-5 py-2 rounded-full font-bold text-xs sm:text-sm transition-all"
                :class="mode === 'decode' ? 'bg-primary text-primary-content shadow-xs' : 'text-base-content/70 hover:text-base-content hover:bg-base-100'"
                @click="mode = 'decode'; transform()"
            >
                URL Decode
            </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label class="block text-sm font-semibold mb-2" x-text="mode === 'encode' ? 'Raw URL or Query String Input' : 'Encoded URL Input'"></label>
                <textarea aria-label="URL or text to encode or decode"
                    x-model="input"
                    @input="transform()"
                    rows="9"
                    placeholder="https://example.com/search?q=hello world &amp; special chars"
                    class="textarea textarea-bordered rounded-2xl w-full font-mono text-xs sm:text-sm leading-relaxed p-4 bg-base-100"
                ></textarea>
            </div>

            <div>
                <div class="flex items-center justify-between mb-2">
                    <label class="block text-sm font-semibold" x-text="mode === 'encode' ? 'Encoded Result' : 'Decoded URL'"></label>
                    <button
                        type="button"
                        @click="copy()"
                        :disabled="!output"
                        class="px-3.5 py-1 rounded-full bg-base-200 hover:bg-primary hover:text-primary-content font-bold text-xs transition-all disabled:opacity-50"
                    >
                        <span x-text="copied ? 'Copied!' : 'Copy Result'"></span>
                    </button>
                </div>
                <textarea aria-label="Result will appear here"
                    x-model="output"
                    readonly
                    rows="9"
                    placeholder="Result will appear here..."
                    class="textarea textarea-bordered rounded-2xl bg-base-200/50 w-full font-mono text-xs sm:text-sm leading-relaxed p-4"
                ></textarea>
            </div>
        </div>

        {{-- Technical Comparison: RFC 3986 URL Encoding Matrix --}}
        <div class="mt-8 pt-6 border-t border-base-300">
            <h3 class="font-bold text-base sm:text-lg text-base-content font-display mb-4">
                URL Percent-Encoding Character Matrix (RFC 3986 Reserved vs. Unreserved)
            </h3>
            <div class="overflow-x-auto rounded-3xl border border-base-300">
                <table class="table table-zebra w-full text-xs sm:text-sm">
                    <thead class="bg-base-200 text-base-content/70 uppercase text-[11px] font-mono">
                        <tr>
                            <th>Character Class</th>
                            <th>Characters Included</th>
                            <th>Percent Hex Encoded</th>
                            <th>RFC 3986 Rule</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="font-bold font-mono text-[#2ead4b]">Unreserved (Safe)</td>
                            <td class="font-mono">A-Z, a-z, 0-9, -, _, ., ~</td>
                            <td class="font-mono text-[#2ead4b]">Never Encoded</td>
                            <td>Transmitted verbatim in URI paths and parameters</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-warning">Space Character</td>
                            <td class="font-mono">Space (" ")</td>
                            <td class="font-mono text-[#163300] dark:text-[#9fe870] font-bold">%20 (or + in queries)</td>
                            <td>Must always be encoded in valid web URLs</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-[#163300] dark:text-[#9fe870]">Query Sub-Delimiters</td>
                            <td class="font-mono">&amp;, =, +, $, ,</td>
                            <td class="font-mono text-[#163300] dark:text-[#9fe870]">%26, %3D, %2B, %24, %2C</td>
                            <td>Must be encoded when part of parameter values</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-[#163300] dark:text-[#9fe870]">Path Generic Delimiters</td>
                            <td class="font-mono">/, ?, #, :, @</td>
                            <td class="font-mono text-[#163300] dark:text-[#9fe870]">%2F, %3F, %23, %3A, %40</td>
                            <td>Must be encoded to avoid parsing as path separators</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</x-tool-paper>

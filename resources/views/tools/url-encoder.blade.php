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
            navigator.clipboard.writeText(this.output);
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
                <textarea
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
                <textarea
                    x-model="output"
                    readonly
                    rows="9"
                    placeholder="Result will appear here..."
                    class="textarea textarea-bordered rounded-2xl bg-base-200/50 w-full font-mono text-xs sm:text-sm leading-relaxed p-4"
                ></textarea>
            </div>
        </div>
    </div>
</x-tool-paper>

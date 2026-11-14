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
    </div>
</x-tool-paper>

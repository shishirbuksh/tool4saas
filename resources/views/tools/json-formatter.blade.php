<x-tool-paper>
    <div x-data="{
        input: '{\n  &quot;name&quot;: &quot;Tool4SaaS&quot;,\n  &quot;type&quot;: &quot;Productivity Toolkit&quot;,\n  &quot;toolsCount&quot;: 127,\n  &quot;privacy&quot;: &quot;100% Client-Side&quot;\n}',
        output: '',
        error: '',
        indent: 2,
        beautify() {
            this.error = '';
            try {
                if (!this.input.trim()) {
                    this.output = '';
                    return;
                }
                const parsed = JSON.parse(this.input);
                this.output = JSON.stringify(parsed, null, Number(this.indent));
            } catch (e) {
                this.error = e.message;
            }
        },
        minify() {
            this.error = '';
            try {
                if (!this.input.trim()) {
                    this.output = '';
                    return;
                }
                const parsed = JSON.parse(this.input);
                this.output = JSON.stringify(parsed);
            } catch (e) {
                this.error = e.message;
            }
        },
        clear() {
            this.input = '';
            this.output = '';
            this.error = '';
        },
        init() {
            this.beautify();
        }
    }">
        {{-- Wise Pill Action Toolbar --}}
        <div class="flex flex-wrap items-center justify-between gap-3 mb-6 p-2 rounded-2xl sm:rounded-full bg-base-200 border border-base-300">
            <div class="flex flex-wrap items-center gap-2">
                <button
                    type="button"
                    @click="beautify()"
                    class="px-5 py-2 rounded-full bg-primary text-primary-content hover:bg-[#cdffad] font-bold text-xs sm:text-sm transition-all shadow-xs"
                >
                    Beautify JSON
                </button>
                <button
                    type="button"
                    @click="minify()"
                    class="px-5 py-2 rounded-full bg-base-100 border border-base-300 hover:border-primary text-base-content font-bold text-xs sm:text-sm transition-all"
                >
                    Minify
                </button>
                <select
                    x-model="indent"
                    @change="beautify()"
                    class="select select-sm rounded-full bg-base-100 border-base-300 text-xs font-semibold px-3 py-1"
                >
                    <option value="2">2 Spaces</option>
                    <option value="4">4 Spaces</option>
                    <option value="1">1 Tab</option>
                </select>
            </div>

            <div class="flex items-center gap-2 pr-2">
                <button
                    type="button"
                    @click="clear()"
                    class="px-3 py-1 rounded-full text-xs font-bold text-error hover:bg-error/10 transition-colors"
                >
                    Clear All
                </button>
            </div>
        </div>

        {{-- Error Banner --}}
        <div x-show="error" style="display: none;" class="alert alert-error text-xs rounded-2xl py-3 px-4 mb-4">
            <span class="font-bold">Invalid JSON Syntax:</span> <span x-text="error"></span>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
                <label class="label py-1"><span class="label-text font-bold text-xs uppercase tracking-wider text-base-content/60 font-mono">Raw Input Payload</span></label>
                <textarea
                    x-model="input"
                    rows="14"
                    placeholder="Paste raw JSON here..."
                    class="textarea textarea-bordered rounded-2xl w-full font-mono text-xs leading-relaxed p-4 bg-base-100"
                ></textarea>
            </div>

            <div x-data="clipboard">
                <div class="flex items-center justify-between py-1">
                    <span class="font-bold text-xs uppercase tracking-wider text-base-content/60 font-mono">Formatted Output</span>
                    <button
                        type="button"
                        @click="copy(output)"
                        class="px-3.5 py-1 rounded-full bg-base-200 hover:bg-primary hover:text-primary-content text-xs font-bold transition-all disabled:opacity-50"
                        :disabled="!output"
                    >
                        <span x-text="copied ? 'Copied!' : 'Copy Formatted'"></span>
                    </button>
                </div>
                <textarea
                    x-model="output"
                    rows="14"
                    readonly
                    placeholder="Formatted JSON will appear here..."
                    class="textarea textarea-bordered rounded-2xl w-full font-mono text-xs leading-relaxed bg-base-200/50 p-4"
                ></textarea>
            </div>
        </div>
    </div>
</x-tool-paper>

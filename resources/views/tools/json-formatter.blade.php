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

        {{-- Technical Comparison: JSON Formatting Standards --}}
        <div class="mt-8 pt-6 border-t border-base-300">
            <h3 class="font-bold text-base sm:text-lg text-base-content font-display mb-4">
                JSON Indentation Standards Comparison (2 Spaces vs. 4 Spaces vs. Tabs vs. Minified)
            </h3>
            <div class="overflow-x-auto rounded-3xl border border-base-300">
                <table class="table table-zebra w-full text-xs sm:text-sm">
                    <thead class="bg-base-200 text-base-content/70 uppercase text-[11px] font-mono">
                        <tr>
                            <th>Formatting Style</th>
                            <th>Payload Overhead</th>
                            <th>Visual Readability</th>
                            <th>Ecosystem Adoption</th>
                            <th>RFC 8259 Spec</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="font-bold font-mono">2 Spaces (Default)</td>
                            <td>+15% to +25% vs minified</td>
                            <td>Optimal balance for deep nesting</td>
                            <td>Google, Airbnb, NPM package.json, GitHub</td>
                            <td>Fully Conforming</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">4 Spaces</td>
                            <td>+30% to +50% vs minified</td>
                            <td>Highest visual distinction for shallow data</td>
                            <td>Python/Django, Java, Enterprise legacy APIs</td>
                            <td>Fully Conforming</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">Tab Character (\t)</td>
                            <td>+10% to +18% vs minified</td>
                            <td>Configurable width per engineer's IDE</td>
                            <td>Go tooling, Linux systems, terminal output</td>
                            <td>Fully Conforming</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">Minified (0 Spaces)</td>
                            <td class="font-mono text-[#2ead4b]">0% (Baseline wire size)</td>
                            <td>Unreadable wall of text (machine-only)</td>
                            <td>Production HTTP APIs, CDN edge delivery</td>
                            <td>Fully Conforming</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</x-tool-paper>

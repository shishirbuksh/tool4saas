<x-tool-paper x-data="{
    pattern: '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}',
    text: 'Contact our support team at support@tool4saas.com or reach billing at sales@company.org for invoices.',
    flags: { g: true, i: true, m: false },
    error: '',
    matches: [],
    testRegex() {
        this.error = '';
        this.matches = [];
        if (!this.pattern.trim()) return;

        try {
            let f = '';
            if (this.flags.g) f += 'g';
            if (this.flags.i) f += 'i';
            if (this.flags.m) f += 'm';

            const regex = new RegExp(this.pattern, f);
            const matchesFound = [];

            if (this.flags.g) {
                let match;
                let iterations = 0;
                while ((match = regex.exec(this.text)) !== null && iterations < 500) {
                    matchesFound.push({ val: match[0], index: match.index });
                    if (match.index === regex.lastIndex) regex.lastIndex++;
                    iterations++;
                }
            } else {
                const match = regex.exec(this.text);
                if (match) {
                    matchesFound.push({ val: match[0], index: match.index });
                }
            }

            this.matches = matchesFound;
        } catch (e) {
            this.error = e.message;
        }
    },
    init() {
        this.testRegex();
    }
}">
    <div class="space-y-6">
        {{-- Pattern & Flags Bar --}}
        <div class="space-y-3">
            <label class="block text-xs font-bold uppercase tracking-wider text-base-content/60 font-mono">Regular Expression Pattern</label>
            <div class="flex items-center gap-2">
                <span class="text-xl font-mono text-base-content/50 font-bold">/</span>
                <input
                    type="text"
                    x-model="pattern"
                    @input="testRegex()"
                    placeholder="Enter regex pattern..."
                    class="input input-bordered rounded-2xl flex-1 font-mono text-sm p-4 bg-base-100"
                />
                <span class="text-xl font-mono text-base-content/50 font-bold">/</span>
                <div class="flex items-center gap-1 p-1 rounded-xl bg-base-200 border border-base-300">
                    <button
                        type="button"
                        class="px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all"
                        :class="flags.g ? 'bg-primary text-primary-content' : 'text-base-content/50'"
                        @click="flags.g = !flags.g; testRegex()"
                    >
                        g
                    </button>
                    <button
                        type="button"
                        class="px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all"
                        :class="flags.i ? 'bg-primary text-primary-content' : 'text-base-content/50'"
                        @click="flags.i = !flags.i; testRegex()"
                    >
                        i
                    </button>
                    <button
                        type="button"
                        class="px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all"
                        :class="flags.m ? 'bg-primary text-primary-content' : 'text-base-content/50'"
                        @click="flags.m = !flags.m; testRegex()"
                    >
                        m
                    </button>
                </div>
            </div>
        </div>

        {{-- Error Banner --}}
        <div x-show="error" style="display: none;" class="alert alert-error text-xs rounded-2xl py-3 px-4">
            <span class="font-bold">Regex Syntax Error:</span> <span x-text="error"></span>
        </div>

        {{-- Test String Input --}}
        <div>
            <label class="block text-xs font-bold uppercase tracking-wider text-base-content/60 font-mono mb-2">Test String / Haystack</label>
            <textarea
                x-model="text"
                @input="testRegex()"
                rows="6"
                placeholder="Enter sample text to test your regular expression against..."
                class="textarea textarea-bordered rounded-3xl w-full font-mono text-sm p-4 bg-base-100 leading-relaxed"
            ></textarea>
        </div>

        {{-- Match Results --}}
        <div>
            <div class="flex items-center justify-between mb-3">
                <span class="text-xs font-bold uppercase tracking-wider text-base-content/60 font-mono">
                    Match Highlights (<span x-text="matches.length"></span> Found)
                </span>
                <span class="badge badge-sm bg-[#e2f6d5] text-[#054d28] font-bold border-none">
                    ECMAScript 2026 Engine
                </span>
            </div>

            <div class="p-6 rounded-3xl bg-base-200/50 border border-base-300 min-h-[100px]">
                <template x-if="matches.length > 0">
                    <div class="space-y-2">
                        <template x-for="(m, idx) in matches" :key="idx">
                            <div class="flex items-center justify-between p-3 rounded-xl bg-base-100 border border-base-300 font-mono text-xs">
                                <span class="font-bold text-base-content break-all" x-text="m.val"></span>
                                <span class="text-base-content/50 shrink-0 ml-2">Index: <span x-text="m.index" class="font-bold text-primary"></span></span>
                            </div>
                        </template>
                    </div>
                </template>
                <template x-if="matches.length === 0 && !error">
                    <div class="text-base-content/50 text-xs font-mono text-center py-6">
                        No matches found for current pattern and test string.
                    </div>
                </template>
            </div>
        </div>

        {{-- Technical Comparison: Regex Engine Flavors --}}
        <div class="mt-8 pt-6 border-t border-base-300">
            <h3 class="font-bold text-base sm:text-lg text-base-content font-display mb-4">
                Regular Expression Engine Flavors Comparison (PCRE2 vs. JavaScript vs. Python)
            </h3>
            <div class="overflow-x-auto rounded-3xl border border-base-300">
                <table class="table table-zebra w-full text-xs sm:text-sm">
                    <thead class="bg-base-200 text-base-content/70 uppercase text-[11px] font-mono">
                        <tr>
                            <th>Regex Flavor</th>
                            <th>Lookbehind Support</th>
                            <th>Named Groups</th>
                            <th>Possessive Quantifiers</th>
                            <th>Unicode Escapes (\p{L})</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="font-bold font-mono text-primary">JavaScript (ES2018+)</td>
                            <td>Full lookbehind in modern V8</td>
                            <td class="font-mono text-[#2ead4b]">(?&lt;name&gt;...)</td>
                            <td class="text-error">No</td>
                            <td>Supported (/u flag)</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-primary">PCRE2 (PHP / Nginx)</td>
                            <td>Full fixed &amp; variable length</td>
                            <td class="font-mono text-[#2ead4b]">(?P&lt;name&gt;...)</td>
                            <td class="text-[#2ead4b]">Supported (++ / *+)</td>
                            <td>Supported natively</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">Python (re Module)</td>
                            <td>Fixed-width lookbehind only</td>
                            <td class="font-mono text-[#2ead4b]">(?P&lt;name&gt;...)</td>
                            <td class="text-error">No (requires regex pkg)</td>
                            <td>Requires 3rd-party module</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">POSIX Extended (grep)</td>
                            <td class="text-error">No</td>
                            <td class="text-error">No</td>
                            <td class="text-error">No</td>
                            <td>Character classes [:alpha:]</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</x-tool-paper>

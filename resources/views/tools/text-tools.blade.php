<x-card class="p-6 md:p-8" x-data="{
    input: '',
    copied: false,
    findText: '',
    replaceText: '',
    applyAction(action) {
        if (!this.input) return;
        switch(action) {
            case 'trim':
                this.input = this.input.split('\n').map(l => l.trim().replace(/\s+/g, ' ')).join('\n').trim();
                break;
            case 'dedupe':
                const lines = this.input.split('\n');
                this.input = Array.from(new Set(lines)).join('\n');
                break;
            case 'sort_asc':
                this.input = this.input.split('\n').sort().join('\n');
                break;
            case 'sort_desc':
                this.input = this.input.split('\n').sort().reverse().join('\n');
                break;
            case 'strip_html':
                this.input = this.input.replace(/<[^>]*>/g, '');
                break;
            case 'reverse':
                this.input = this.input.split('').reverse().join('');
                break;
            case 'title_case':
                this.input = this.input.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
                break;
            case 'line_numbers':
                this.input = this.input.split('\n').map((l, i) => (i + 1) + '. ' + l).join('\n');
                break;
            case 'replace':
                if (this.findText) {
                    this.input = this.input.split(this.findText).join(this.replaceText);
                }
                break;
        }
    },
    copy() {
        if (!this.input) return;
        window.copyTextSafe(this.input);
        this.copied = true;
        setTimeout(() => this.copied = false, 2000);
    },
    get lineCount() {
        return this.input ? this.input.split('\n').length : 0;
    },
    get wordCount() {
        return this.input.trim() ? this.input.trim().split(/\s+/).length : 0;
    },
    get charCount() {
        return this.input.length;
    }
}">
    <div class="space-y-6">
        <div class="flex flex-wrap gap-2">
            <button type="button" @click="applyAction('trim')" class="btn btn-sm btn-outline rounded-[10px]">Remove Extra Spaces</button>
            <button type="button" @click="applyAction('dedupe')" class="btn btn-sm btn-outline rounded-[10px]">Remove Duplicate Lines</button>
            <button type="button" @click="applyAction('sort_asc')" class="btn btn-sm btn-outline rounded-[10px]">Sort Lines (A-Z)</button>
            <button type="button" @click="applyAction('sort_desc')" class="btn btn-sm btn-outline rounded-[10px]">Sort Lines (Z-A)</button>
            <button type="button" @click="applyAction('strip_html')" class="btn btn-sm btn-outline rounded-[10px]">Strip HTML Tags</button>
            <button type="button" @click="applyAction('title_case')" class="btn btn-sm btn-outline rounded-[10px]">Title Case</button>
            <button type="button" @click="applyAction('line_numbers')" class="btn btn-sm btn-outline rounded-[10px]">Add Line Numbers</button>
            <button type="button" @click="applyAction('reverse')" class="btn btn-sm btn-outline rounded-[10px]">Reverse Text</button>
        </div>

        <div class="flex flex-wrap items-center gap-3 p-3 bg-base-200/50 rounded-[12px] border border-base-300">
            <span class="text-xs font-bold uppercase tracking-wider text-base-content/70">Find & Replace:</span>
            <input aria-label="Find" type="text" x-model="findText" placeholder="Find..." class="input input-sm input-bordered rounded-[8px] w-36" />
            <input aria-label="Replace with" type="text" x-model="replaceText" placeholder="Replace with..." class="input input-sm input-bordered rounded-[8px] w-36" />
            <button type="button" @click="applyAction('replace')" class="btn btn-sm btn-primary rounded-[8px]">Replace All</button>
        </div>

        <div>
            <div class="flex justify-between items-center mb-2">
                <label class="text-sm font-bold uppercase tracking-wider text-[#163300] dark:text-[#9fe870]">
                    Editor Canvas
                </label>
                <div class="flex items-center gap-4 text-xs font-mono text-base-content/70">
                    <span>Lines: <strong x-text="lineCount"></strong></span>
                    <span>Words: <strong x-text="wordCount"></strong></span>
                    <span>Chars: <strong x-text="charCount"></strong></span>
                </div>
            </div>
            <textarea aria-label="Type or paste your text to clean, format, sort, or modify"
                x-model="input"
                rows="10"
                placeholder="Type or paste your text to clean, format, sort, or modify..."
                class="textarea textarea-bordered w-full rounded-[16px] text-base leading-relaxed bg-base-100 dark:bg-base-200 border-[#242a20]/20 focus:border-primary font-mono text-sm"
            ></textarea>
        </div>

        <div class="flex justify-between items-center">
            <div class="flex gap-2">
                <button
                    type="button"
                    @click="copy()"
                    :disabled="!input"
                    class="btn btn-primary rounded-[12px] font-bold"
                >
                    <span x-show="!copied">Copy Text</span>
                    <span x-show="copied" x-cloak>✓ Copied!</span>
                </button>
                <button
                    type="button"
                    @click="input = ''"
                    class="btn btn-ghost rounded-[12px]"
                >
                    Clear
                </button>
            </div>
        </div>

        {{-- Technical Comparison: Code & Text Case Formatting Conventions Matrix --}}
        <div class="mt-8 pt-6 border-t border-base-300">
            <h3 class="font-bold text-base sm:text-lg text-base-content font-display mb-4">
                Programming Case Conventions, Delimiters &amp; Language Standards Matrix
            </h3>
            <div class="overflow-x-auto rounded-3xl border border-base-300">
                <table class="table table-zebra w-full text-xs sm:text-sm">
                    <thead class="bg-base-200 text-base-content/70 uppercase text-[11px] font-mono">
                        <tr>
                            <th>Naming Convention</th>
                            <th>Formatting Pattern</th>
                            <th>Sample Transformation</th>
                            <th>Standard Language / Environment</th>
                            <th>Best Used For</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="font-bold font-mono text-[#163300] dark:text-[#9fe870]">camelCase</td>
                            <td class="font-mono">lowerUpper (No separator)</td>
                            <td class="font-mono font-bold text-success">toolForSaaS</td>
                            <td>JavaScript, TypeScript, Java, Dart, Swift</td>
                            <td>Variable identifiers, function &amp; method names</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-[#163300] dark:text-[#9fe870]">snake_case</td>
                            <td class="font-mono">lower_lower (Underscore delimited)</td>
                            <td class="font-mono font-bold text-success">tool_for_saas</td>
                            <td>Python, Rust, Ruby, PHP (Laravel DB columns)</td>
                            <td>Database table columns, function names, Python variables</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-[#163300] dark:text-[#9fe870]">kebab-case</td>
                            <td class="font-mono">lower-lower (Hyphen delimited)</td>
                            <td class="font-mono font-bold text-success">tool-for-saas</td>
                            <td>CSS class selectors, HTML attributes, URL slugs</td>
                            <td>RESTful URI paths, Tailwind utilities, package names</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">PascalCase (StudlyCaps)</td>
                            <td class="font-mono">UpperUpper (No separator)</td>
                            <td class="font-mono">ToolForSaaS</td>
                            <td>PHP (Classes/DTOs), C#, React Components, TypeScript</td>
                            <td>Object-oriented Class declarations, React components</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">SCREAMING_SNAKE_CASE</td>
                            <td class="font-mono">UPPER_UPPER (Underscore delimited)</td>
                            <td class="font-mono font-bold">TOOL_FOR_SAAS</td>
                            <td>C, C++, Java, PHP, Python, Docker .env</td>
                            <td>Global constants, environment variables, enum keys</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</x-card>

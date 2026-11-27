<x-card class="p-6 md:p-8" x-data="{
    input: 'hello world from tool4saas client side text utilities',
    output: '',
    currentCase: 'camel',
    copied: false,

    words() {
        if (!this.input.trim()) return [];
        return this.input
            .replace(/([a-z])([A-Z])/g, '$1 $2')
            .replace(/[_\-]+/g, ' ')
            .trim()
            .split(/\s+/);
    },

    convert(mode) {
        this.currentCase = mode;
        const w = this.words();
        if (!w.length) {
            this.output = '';
            return;
        }

        switch (mode) {
            case 'camel':
                this.output = w.map((word, i) => i === 0 ? word.toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join('');
                break;
            case 'pascal':
                this.output = w.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join('');
                break;
            case 'snake':
                this.output = w.map(word => word.toLowerCase()).join('_');
                break;
            case 'kebab':
                this.output = w.map(word => word.toLowerCase()).join('-');
                break;
            case 'constant':
                this.output = w.map(word => word.toUpperCase()).join('_');
                break;
            case 'title':
                this.output = w.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
                break;
            case 'sentence':
                const str = this.input.trim().toLowerCase();
                this.output = str.replace(/(^\s*\w|[.!?]\s*\w)/g, c => c.toUpperCase());
                break;
            case 'upper':
                this.output = this.input.toUpperCase();
                break;
            case 'lower':
                this.output = this.input.toLowerCase();
                break;
        }
    },

    copy() {
        if (!this.output) return;
        window.copyTextSafe(this.output);
        this.copied = true;
        setTimeout(() => this.copied = false, 2000);
    },

    clear() {
        this.input = '';
        this.output = '';
    },

    init() {
        this.convert('camel');
    }
}">
    <div class="space-y-6">
        {{-- Mode Selector Buttons Bar --}}
        <div class="flex flex-wrap items-center gap-2 p-3 rounded-2xl bg-base-200 border border-base-300">
            <button
                type="button"
                @click="convert('camel')"
                class="px-4 py-2 rounded-full text-xs font-bold transition-all"
                :class="currentCase === 'camel' ? 'bg-primary text-primary-content shadow-xs' : 'bg-base-100 border border-base-300 text-base-content hover:border-primary'"
            >
                camelCase
            </button>
            <button
                type="button"
                @click="convert('pascal')"
                class="px-4 py-2 rounded-full text-xs font-bold transition-all"
                :class="currentCase === 'pascal' ? 'bg-primary text-primary-content shadow-xs' : 'bg-base-100 border border-base-300 text-base-content hover:border-primary'"
            >
                PascalCase
            </button>
            <button
                type="button"
                @click="convert('snake')"
                class="px-4 py-2 rounded-full text-xs font-bold transition-all"
                :class="currentCase === 'snake' ? 'bg-primary text-primary-content shadow-xs' : 'bg-base-100 border border-base-300 text-base-content hover:border-primary'"
            >
                snake_case
            </button>
            <button
                type="button"
                @click="convert('kebab')"
                class="px-4 py-2 rounded-full text-xs font-bold transition-all"
                :class="currentCase === 'kebab' ? 'bg-primary text-primary-content shadow-xs' : 'bg-base-100 border border-base-300 text-base-content hover:border-primary'"
            >
                kebab-case
            </button>
            <button
                type="button"
                @click="convert('constant')"
                class="px-4 py-2 rounded-full text-xs font-bold transition-all"
                :class="currentCase === 'constant' ? 'bg-primary text-primary-content shadow-xs' : 'bg-base-100 border border-base-300 text-base-content hover:border-primary'"
            >
                CONSTANT_CASE
            </button>
            <button
                type="button"
                @click="convert('title')"
                class="px-4 py-2 rounded-full text-xs font-bold transition-all"
                :class="currentCase === 'title' ? 'bg-primary text-primary-content shadow-xs' : 'bg-base-100 border border-base-300 text-base-content hover:border-primary'"
            >
                Title Case
            </button>
            <button
                type="button"
                @click="convert('sentence')"
                class="px-4 py-2 rounded-full text-xs font-bold transition-all"
                :class="currentCase === 'sentence' ? 'bg-primary text-primary-content shadow-xs' : 'bg-base-100 border border-base-300 text-base-content hover:border-primary'"
            >
                Sentence case
            </button>
            <button
                type="button"
                @click="convert('upper')"
                class="px-4 py-2 rounded-full text-xs font-bold transition-all"
                :class="currentCase === 'upper' ? 'bg-primary text-primary-content shadow-xs' : 'bg-base-100 border border-base-300 text-base-content hover:border-primary'"
            >
                UPPERCASE
            </button>
            <button
                type="button"
                @click="convert('lower')"
                class="px-4 py-2 rounded-full text-xs font-bold transition-all"
                :class="currentCase === 'lower' ? 'bg-primary text-primary-content shadow-xs' : 'bg-base-100 border border-base-300 text-base-content hover:border-primary'"
            >
                lowercase
            </button>
        </div>

        {{-- Editors Grid --}}
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <div class="flex items-center justify-between mb-2">
                    <label for="case-source" class="block text-xs font-bold uppercase tracking-wider text-base-content/60 font-mono">Input Text</label>
                    <span class="text-xs text-base-content/50 font-mono" x-text="input.length + ' chars · ' + words().length + ' words'"></span>
                </div>
                <textarea
                    id="case-source"
                    x-model="input"
                    @input="convert(currentCase)"
                    rows="10"
                    placeholder="Enter or paste text to convert..."
                    class="textarea textarea-bordered rounded-3xl w-full text-sm leading-relaxed p-4 bg-base-100 font-mono"
                ></textarea>
            </div>

            <div>
                <div class="flex items-center justify-between mb-2">
                    <label for="case-output" class="block text-xs font-bold uppercase tracking-wider text-base-content/60 font-mono">Converted Output</label>
                    <button
                        type="button"
                        @click="copy()"
                        :disabled="!output"
                        class="px-4 py-1 rounded-full bg-base-200 hover:bg-primary hover:text-primary-content text-xs font-bold transition-all disabled:opacity-50"
                    >
                        <span x-text="copied ? '✓ Copied!' : 'Copy Text'"></span>
                    </button>
                </div>
                <textarea
                    id="case-output"
                    x-model="output"
                    readonly
                    rows="10"
                    placeholder="Converted text will appear here..."
                    class="textarea textarea-bordered rounded-3xl bg-base-200/50 w-full text-sm leading-relaxed p-4 font-mono"
                ></textarea>
            </div>
        </div>

        {{-- Trust Banner --}}
        <div class="p-4 rounded-2xl bg-[#0e0f0c] text-white border border-[#242a20] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
            <span class="text-primary font-bold">✓ 100% Client-Side Privacy Guaranteed</span>
            <span class="text-[#868685]">Transformations run locally inside your browser. No server logging.</span>
        </div>

        {{-- Technical Comparison: Code Variable Casing Conventions --}}
        <div class="pt-4 border-t border-base-300">
            <h3 class="font-bold text-base sm:text-lg text-base-content font-display mb-4">
                Programming Language Variable Casing Conventions
            </h3>
            <div class="overflow-x-auto rounded-3xl border border-base-300">
                <table class="table table-zebra w-full text-xs sm:text-sm">
                    <thead class="bg-base-200 text-base-content/70 uppercase text-[11px] font-mono">
                        <tr>
                            <th>Casing Format</th>
                            <th>Formatting Pattern</th>
                            <th>Primary Programming Language Standards</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="font-bold font-mono">camelCase</td>
                            <td><code>userProfileSettings</code></td>
                            <td>JavaScript, TypeScript, Java, Swift (variables, methods)</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">PascalCase</td>
                            <td><code>UserProfileSettings</code></td>
                            <td>C#, React/Vue components, Python classes, TypeScript types</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">snake_case</td>
                            <td><code>user_profile_settings</code></td>
                            <td>Python (PEP 8), Ruby, Rust, SQL column identifiers</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">kebab-case</td>
                            <td><code>user-profile-settings</code></td>
                            <td>URLs, HTML/CSS attributes, CSS classes, Lisp</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">CONSTANT_CASE</td>
                            <td><code>USER_PROFILE_SETTINGS</code></td>
                            <td>Environment variables, global configuration constants</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</x-card>

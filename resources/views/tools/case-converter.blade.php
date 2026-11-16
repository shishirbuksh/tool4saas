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
        navigator.clipboard.writeText(this.output);
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
    </div>
</x-card>

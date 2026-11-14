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
        navigator.clipboard.writeText(this.input);
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
            <input type="text" x-model="findText" placeholder="Find..." class="input input-sm input-bordered rounded-[8px] w-36" />
            <input type="text" x-model="replaceText" placeholder="Replace with..." class="input input-sm input-bordered rounded-[8px] w-36" />
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
            <textarea
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
    </div>
</x-card>

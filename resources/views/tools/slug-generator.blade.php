<x-tool-paper>
    <div x-data="{
        input: '',
        separator: '-',
        lowercase: true,
        output: '',
        copied: false,
        slugify() {
            if (!this.input) {
                this.output = '';
                return;
            }
            let s = this.input.trim();
            if (this.lowercase) {
                s = s.toLowerCase();
            }
            // Transliterate accented chars
            s = s.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
            // Replace non-alphanumeric with separator
            s = s.replace(/[^a-zA-Z0-9]+/g, this.separator);
            // Remove leading/trailing separator
            const sepEsc = this.separator === '-' ? '\\-' : this.separator;
            const reLeadTrail = new RegExp('^' + sepEsc + '+|' + sepEsc + '+$', 'g');
            s = s.replace(reLeadTrail, '');
            this.output = s;
        },
        copy() {
            if (!this.output) return;
            navigator.clipboard.writeText(this.output);
            this.copied = true;
            setTimeout(() => this.copied = false, 2000);
        }
    }">
        <div class="mb-6">
            <label class="block text-sm font-bold text-base-content font-display mb-2">Input Article Headline or String</label>
            <input
                type="text"
                x-model="input"
                @input="slugify()"
                placeholder="e.g. 10 Best Productivity Tools for 2026!"
                class="input input-bordered rounded-2xl w-full text-base p-4"
            />
        </div>

        <div class="flex flex-wrap items-center gap-6 mb-8 p-4 rounded-2xl bg-base-200/60 border border-base-300">
            <div>
                <label class="block text-xs font-bold text-base-content/60 uppercase tracking-wider mb-1 font-mono">Separator</label>
                <select x-model="separator" @change="slugify()" class="select select-bordered select-sm rounded-xl">
                    <option value="-">Hyphen (-)</option>
                    <option value="_">Underscore (_)</option>
                </select>
            </div>
            <div class="flex items-center gap-2 mt-4 sm:mt-5">
                <input type="checkbox" x-model="lowercase" @change="slugify()" class="checkbox checkbox-primary checkbox-sm" id="lowerCb" />
                <label for="lowerCb" class="text-xs font-bold cursor-pointer text-base-content">Force Lowercase</label>
            </div>
        </div>

        <div>
            <div class="flex items-center justify-between mb-2">
                <span class="text-xs font-bold uppercase tracking-wider text-base-content/60 font-mono">Clean URL Slug</span>
                <button
                    type="button"
                    @click="copy()"
                    :disabled="!output"
                    class="px-3.5 py-1 rounded-full bg-base-200 hover:bg-primary hover:text-primary-content text-xs font-bold transition-all disabled:opacity-50"
                >
                    <span x-text="copied ? 'Copied!' : 'Copy Slug'"></span>
                </button>
            </div>
            <div class="p-5 rounded-2xl border border-base-300 bg-base-100 font-mono text-base break-all flex items-center justify-between shadow-xs">
                <span x-text="output || 'generated-slug-will-appear-here'" class="text-base-content font-black"></span>
            </div>
        </div>
    </div>
</x-tool-paper>

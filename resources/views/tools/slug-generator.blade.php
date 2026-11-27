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
            window.copyTextSafe(this.output);
            this.copied = true;
            setTimeout(() => this.copied = false, 2000);
        }
    }">
        <div class="mb-6">
            <label class="block text-sm font-bold text-base-content font-display mb-2">Input Article Headline or String</label>
            <input aria-label="Input Article Headline or String"
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
                <select aria-label="Separator" x-model="separator" @change="slugify()" class="select select-bordered select-sm rounded-xl">
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

        {{-- Technical Comparison: URL Slug Architecture & SEO Best Practices Matrix --}}
        <div class="mt-8 pt-6 border-t border-base-300">
            <h3 class="font-bold text-base sm:text-lg text-base-content font-display mb-4">
                URL Permalink Architecture, Separator RFC Standards &amp; SEO Performance Matrix
            </h3>
            <div class="overflow-x-auto rounded-3xl border border-base-300">
                <table class="table table-zebra w-full text-xs sm:text-sm">
                    <thead class="bg-base-200 text-base-content/70 uppercase text-[11px] font-mono">
                        <tr>
                            <th>URL Component / Pattern</th>
                            <th>Recommended Standard</th>
                            <th>Google Search Interpretation</th>
                            <th>Primary Failure Mode / Pitfall</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="font-bold font-mono text-[#163300] dark:text-[#9fe870]">Word Separator</td>
                            <td class="font-mono font-bold text-success">Hyphen / Dash (-)</td>
                            <td class="text-success font-semibold">Treated strictly as a word delimiter</td>
                            <td>Underscores (<code class="font-mono">_</code>) join words into one compound token in legacy parsers</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-[#163300] dark:text-[#9fe870]">Character Case</td>
                            <td class="font-mono font-bold text-success">100% Lowercase (a-z)</td>
                            <td>Case-sensitive on Linux/Unix Nginx web servers</td>
                            <td>Uppercase characters cause duplicate content canonical splitting &amp; 404s</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-[#163300] dark:text-[#9fe870]">Slug Word Count Target</td>
                            <td class="font-mono font-bold text-success">3 to 5 words (≤ 60 chars)</td>
                            <td>Optimal keyword relevance extraction</td>
                            <td>Keyword stuffing diluted in long complex query parameters</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">Stop Words Filtering</td>
                            <td class="font-mono">Strip &ldquo;a&rdquo;, &ldquo;the&rdquo;, &ldquo;and&rdquo;, &ldquo;for&rdquo;</td>
                            <td>Ignored during query token matching</td>
                            <td>Over-stripping can alter semantic meaning (&ldquo;to-be-or-not-to-be&rdquo;)</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">Unicode / Accent Diacritics</td>
                            <td class="font-mono">Transliterate NFD (e.g. &eacute; → e)</td>
                            <td>Punycode or %20 hex escape encoding</td>
                            <td>Percent-encoded strings (<code class="font-mono">%C3%A9</code>) bloat URLs &amp; break copy-pasting</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</x-tool-paper>

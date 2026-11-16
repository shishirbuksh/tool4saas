<x-card class="p-6 md:p-8" x-data="grammarChecker()">
    <div class="space-y-6">
        <div>
            <div class="flex justify-between items-center mb-2">
                <label class="text-sm font-bold uppercase tracking-wider text-[#163300] dark:text-[#9fe870]">
                    Text Proofreading Canvas
                </label>
                <div class="flex gap-2">
                    <button type="button" @click="fixAll()" :disabled="!issues.length" class="btn btn-xs btn-primary rounded-[8px]">
                        Auto-Fix All Issues
                    </button>
                    <button type="button" @click="text = ''" class="btn btn-xs btn-ghost rounded-[8px]">Clear</button>
                </div>
            </div>
            <textarea
                x-model="text"
                rows="8"
                placeholder="Type or paste essays, emails, or articles to audit for double spaces, duplicate words, capitalization errors, and common typos..."
                class="textarea textarea-bordered w-full rounded-[16px] text-base leading-relaxed bg-base-100 dark:bg-base-200 border-[#242a20]/20 focus:border-primary"
            ></textarea>
        </div>

        <template x-if="text && issues.length === 0">
            <div class="alert alert-success rounded-[16px]">
                <span class="font-bold">✓ Clean text! No spacing, duplication, or capitalization issues found.</span>
            </div>
        </template>

        <template x-if="issues.length > 0">
            <div class="space-y-3">
                <h4 class="font-bold text-xs uppercase tracking-wider text-error" x-text="'Detected Issues (' + issues.length + ')'"></h4>
                <div class="space-y-2">
                    <template x-for="(iss, i) in issues" :key="i">
                        <div class="p-3 rounded-[12px] bg-error/10 border border-error/20 flex items-center justify-between text-sm">
                            <div>
                                <span class="badge badge-error badge-sm font-bold uppercase mr-2" x-text="iss.type"></span>
                                <span x-text="iss.message"></span>
                            </div>
                        </div>
                    </template>
                </div>
            </div>
        </template>

        {{-- Technical Comparison: Common English Grammatical Errors Matrix --}}
        <div class="mt-8 pt-6 border-t border-base-300">
            <h3 class="font-bold text-base sm:text-lg text-base-content font-display mb-4">
                Common English Grammar &amp; Syntax Errors Classification Matrix
            </h3>
            <div class="overflow-x-auto rounded-3xl border border-base-300">
                <table class="table table-zebra w-full text-xs sm:text-sm">
                    <thead class="bg-base-200 text-base-content/70 uppercase text-[11px] font-mono">
                        <tr>
                            <th>Grammar Error Category</th>
                            <th>Incorrect Example</th>
                            <th>Corrected Formulation</th>
                            <th>Governing Syntactic Rule</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="font-bold font-mono text-primary">Subject-Verb Agreement</td>
                            <td class="font-mono text-error">The list of items are long.</td>
                            <td class="font-mono text-success font-semibold">The list of items is long.</td>
                            <td>Verb must agree with singular head noun &ldquo;list&rdquo;, not prepositional object</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-primary">Comma Splice</td>
                            <td class="font-mono text-error">It rained, we stayed inside.</td>
                            <td class="font-mono text-success font-semibold">It rained; we stayed inside.</td>
                            <td>Independent clauses cannot be joined by a comma alone without a coordinating conjunction</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">Dangling Modifier</td>
                            <td class="font-mono text-error">Walking home, the rain started.</td>
                            <td class="font-mono text-success font-semibold">Walking home, we were caught in the rain.</td>
                            <td>Participial phrase must immediately precede the subject doing the walking</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">Homophone Confusion</td>
                            <td class="font-mono text-error">They're car is over their.</td>
                            <td class="font-mono text-success font-semibold">Their car is over there.</td>
                            <td>Possessive &ldquo;their&rdquo; vs locative adverb &ldquo;there&rdquo; vs contraction &ldquo;they're&rdquo;</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">Pronoun Case Error</td>
                            <td class="font-mono text-error">Between you and I.</td>
                            <td class="font-mono text-success font-semibold">Between you and me.</td>
                            <td>Prepositions take objective case pronouns (&ldquo;me&rdquo;, &ldquo;him&rdquo;, &ldquo;them&rdquo;)</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</x-card>

<script>
document.addEventListener('alpine:init', () => {
    Alpine.data('grammarChecker', () => ({
        text: '',
        get issues() {
            if (!this.text) return [];
            const list = [];
            const ds = this.text.match(/ {2,}/g);
            if (ds) list.push({ type: 'Spacing', message: 'Found ' + ds.length + ' instance(s) of double spaces.' });
            const rw = this.text.match(/\b(\w+)\s+\1\b/gi);
            if (rw) list.push({ type: 'Repeated Words', message: 'Repeated duplicate word(s) detected: ' + rw.join(', ') });
            const mc = this.text.match(/\.\s+[a-z]/g);
            if (mc) list.push({ type: 'Capitalization', message: 'Lowercase letter found immediately following a period.' });
            if (/\bteh\b/i.test(this.text)) list.push({ type: 'Typo', message: 'Typo detected: "teh" should be "the"' });
            if (/\brecieve\b/i.test(this.text)) list.push({ type: 'Typo', message: 'Typo detected: "recieve" should be "receive"' });
            return list;
        },
        fixAll() {
            let t = this.text;
            t = t.replace(/ {2,}/g, ' ');
            t = t.replace(/\b(\w+)\s+\1\b/gi, '$1');
            t = t.replace(/\.\s+([a-z])/g, (m, c) => '. ' + c.toUpperCase());
            t = t.replace(/\bteh\b/gi, 'the');
            t = t.replace(/\brecieve\b/gi, 'receive');
            this.text = t;
        }
    }));
});
</script>

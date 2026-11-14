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

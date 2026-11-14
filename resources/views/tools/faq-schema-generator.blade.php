<x-card class="p-6 md:p-8" x-data="faqSchemaGenerator()">
    <div class="space-y-6">
        <div class="space-y-4">
            <template x-for="(faq, idx) in faqs" :key="idx">
                <div class="p-4 rounded-[16px] bg-base-200/50 border border-base-300 space-y-3 relative">
                    <div class="flex justify-between items-center">
                        <span class="text-xs uppercase font-bold text-base-content/70" x-text="'Question #' + (idx + 1)"></span>
                        <button type="button" @click="removeFaq(idx)" class="btn btn-ghost btn-xs text-error" x-show="faqs.length > 1">Remove</button>
                    </div>
                    <input type="text" x-model="faq.q" placeholder="Enter Question..." class="input input-bordered input-sm w-full rounded-[8px]" />
                    <textarea x-model="faq.a" rows="2" placeholder="Enter Answer..." class="textarea textarea-bordered textarea-sm w-full rounded-[8px]"></textarea>
                </div>
            </template>

            <button type="button" @click="addFaq()" class="btn btn-outline btn-sm rounded-[10px]">
                + Add Another Question
            </button>
        </div>

        <div class="p-4 bg-base-200/50 rounded-[16px] border border-base-300 space-y-3">
            <div class="flex items-center justify-between">
                <span class="text-xs font-bold uppercase tracking-wider text-base-content/70">Generated Schema.org JSON-LD</span>
                <button type="button" @click="copy()" class="btn btn-xs btn-primary rounded-[8px]">
                    <span x-show="!copied">Copy Script Tag</span>
                    <span x-show="copied" x-cloak>✓ Copied!</span>
                </button>
            </div>
            <textarea readonly :value="jsonLd" rows="8" class="textarea textarea-bordered w-full font-mono text-xs bg-base-100"></textarea>
        </div>
    </div>
</x-card>

<script>
document.addEventListener('alpine:init', () => {
    Alpine.data('faqSchemaGenerator', () => ({
        faqs: [
            { q: 'Is Tool4SaaS free to use?', a: 'Yes, all 127 online tools on Tool4SaaS are completely free with zero sign-up required.' },
            { q: 'Is my data secure?', a: 'All computations run 100% locally in your web browser. Zero data or uploaded files leave your device.' }
        ],
        copied: false,
        addFaq() {
            this.faqs.push({ q: '', a: '' });
        },
        removeFaq(idx) {
            this.faqs.splice(idx, 1);
        },
        get jsonLd() {
            const schema = {
                ['@' + 'context']: 'https://schema.org',
                ['@' + 'type']: 'FAQPage',
                'mainEntity': this.faqs.filter(f => f.q.trim() && f.a.trim()).map(f => ({
                    ['@' + 'type']: 'Question',
                    'name': f.q.trim(),
                    'acceptedAnswer': {
                        ['@' + 'type']: 'Answer',
                        'text': f.a.trim()
                    }
                }))
            };
            return JSON.stringify(schema, null, 2);
        },
        copy() {
            navigator.clipboard.writeText('<script type="application/ld+json">\n' + this.jsonLd + '\n<\/script>');
            this.copied = true;
            setTimeout(() => this.copied = false, 2000);
        }
    }));
});
</script>

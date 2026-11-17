<x-card class="p-6 md:p-8">
    <div class="space-y-6" x-data="{
        faqs: [
            { q: 'Is Tool4SaaS free to use?', a: 'Yes, all online tools on Tool4SaaS are completely free with zero sign-up required.' },
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
            navigator.clipboard.writeText('<' + 'script type=\'application/ld+json\'>\n' + this.jsonLd + '\n<' + '/script>');
            this.copied = true;
            setTimeout(() => this.copied = false, 2000);
        }
    }">
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

        {{-- Technical Comparison: Schema.org Structured Data Types Matrix --}}
        <div class="mt-8 pt-6 border-t border-base-300">
            <h3 class="font-bold text-base sm:text-lg text-base-content font-display mb-4">
                Google Search Rich Result Schema Types &amp; SERP Presentation Matrix
            </h3>
            <div class="overflow-x-auto rounded-3xl border border-base-300">
                <table class="table table-zebra w-full text-xs sm:text-sm">
                    <thead class="bg-base-200 text-base-content/70 uppercase text-[11px] font-mono">
                        <tr>
                            <th>Schema.org @type</th>
                            <th>Required Top-Level Fields</th>
                            <th>SERP Rich Result Visual</th>
                            <th>Google Eligibility Guidelines</th>
                            <th>Best Used On</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="font-bold font-mono text-primary">FAQPage</td>
                            <td class="font-mono">mainEntity (Question + acceptedAnswer)</td>
                            <td>Collapsible accordion questions under snippet</td>
                            <td class="text-warning font-semibold">Limited to authoritative government &amp; healthcare sites since Aug 2023</td>
                            <td>Official support hubs, government agency guidelines</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-primary">QAPage</td>
                            <td class="font-mono">mainEntity (Question + suggestedAnswer list)</td>
                            <td>Highlighted accepted answer &amp; vote count badge</td>
                            <td class="text-success font-semibold">User-generated community forums only (StackOverflow style)</td>
                            <td>Community discussion boards, product forums</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-primary">WebApplication / SoftwareApplication</td>
                            <td class="font-mono">name, operatingSystem, applicationCategory</td>
                            <td>Star rating, software badge, price ($0 free)</td>
                            <td class="text-success font-bold">100% eligible for interactive web tools &amp; SaaS</td>
                            <td>Interactive calculators, converters, utility apps</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">HowTo</td>
                            <td class="font-mono">step (HowToStep with text &amp; url)</td>
                            <td>Numbered carousel steps with thumbnails</td>
                            <td class="text-warning font-semibold">Mobile SERPs only</td>
                            <td>Step-by-step DIY tutorials, technical guides</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">Article / BlogPosting</td>
                            <td class="font-mono">headline, image, datePublished, author</td>
                            <td>Top Stories carousel, author byline, date badge</td>
                            <td class="text-success font-bold">Universal for editorial content</td>
                            <td>Blog pillars, whitepapers, industry research</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</x-card>

<x-card class="p-6 md:p-8" x-data="{
    keyword: 'flow',
    industry: 'tech',
    copied: '',
    prefixes: ['Omni', 'Hyper', 'Nova', 'Pulse', 'Sync', 'Apex', 'Meta', 'Zen', 'Vivid', 'Nexus'],
    suffixes: ['ly', 'ify', 'hub', 'stack', 'lab', 'flow', 'base', 'craft', 'wave', 'forge'],
    get names() {
        if (!this.keyword.trim()) return [];
        const base = this.keyword.trim().toLowerCase();
        const capitalized = base.charAt(0).toUpperCase() + base.slice(1);
        const list = [];
        this.prefixes.forEach(p => list.push(p + capitalized));
        this.suffixes.forEach(s => list.push(capitalized + s));
        list.push(capitalized + ' AI', capitalized + ' Cloud', capitalized + ' Solutions', capitalized + ' Labs');
        return list;
    },
    copy(name) {
        navigator.clipboard.writeText(name);
        this.copied = name;
        setTimeout(() => this.copied = '', 2000);
    }
}">
    <div class="space-y-6">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-2 text-base-content/70">Seed Keyword</label>
                <input type="text" x-model="keyword" placeholder="e.g. cloud, pay, data, swift..." class="input input-bordered w-full rounded-[12px] font-bold text-sm" />
            </div>

            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-2 text-base-content/70">Industry Theme</label>
                <select x-model="industry" class="select select-bordered w-full rounded-[12px] text-sm">
                    <option value="tech">Tech & SaaS Software</option>
                    <option value="finance">Fintech & Banking</option>
                    <option value="commerce">E-Commerce & Retail</option>
                    <option value="creative">Design & Creative Studio</option>
                </select>
            </div>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            <template x-for="name in names" :key="name">
                <div class="p-4 rounded-[14px] bg-base-200/50 border border-base-300 flex items-center justify-between hover:border-primary transition-all">
                    <span class="font-bold text-sm text-[#163300] dark:text-[#9fe870]" x-text="name"></span>
                    <button type="button" @click="copy(name)" class="btn btn-ghost btn-xs rounded-[6px]">
                        <span x-show="copied !== name">Copy</span>
                        <span x-show="copied === name" x-cloak>✓</span>
                    </button>
                </div>
            </template>
        </div>

        {{-- Technical Comparison: Brand Name Trademark Distinctiveness Spectrum Matrix --}}
        <div class="mt-8 pt-6 border-t border-base-300">
            <h3 class="font-bold text-base sm:text-lg text-base-content font-display mb-4">
                Brand Name Trademark Distinctiveness Spectrum Matrix (Abercrombie Taxonomy &amp; USPTO Norms)
            </h3>
            <div class="overflow-x-auto rounded-3xl border border-base-300">
                <table class="table table-zebra w-full text-xs sm:text-sm">
                    <thead class="bg-base-200 text-base-content/70 uppercase text-[11px] font-mono">
                        <tr>
                            <th>Naming Category</th>
                            <th>Linguistic Definition</th>
                            <th>Famous Industry Examples</th>
                            <th>Trademark Protection Strength</th>
                            <th>Domain &amp; SEO Viability</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="font-bold font-mono text-primary">Fanciful / Neologisms</td>
                            <td>Coined, invented words with no prior dictionary meaning</td>
                            <td class="font-mono">Kodak, Xerox, Spotify, Rolex</td>
                            <td class="font-bold text-success font-mono">Strongest (Immediate registered mark)</td>
                            <td>Zero competition; requires educational ad spend</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-primary">Arbitrary</td>
                            <td>Real dictionary words applied out of contextual context</td>
                            <td class="font-mono">Apple (Computers), Amazon (Retail)</td>
                            <td class="font-bold text-success font-mono">Very High (Full legal presumption)</td>
                            <td>Memorable; easy brand recall and trademark defense</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-primary">Suggestive</td>
                            <td>Hints at attributes or benefits requiring consumer imagination</td>
                            <td class="font-mono">Netflix, Airbus, Ray-Ban, Slack</td>
                            <td class="text-success font-semibold">High (Protectable without secondary meaning)</td>
                            <td>Ideal for SaaS; instant product category comprehension</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">Descriptive</td>
                            <td>Directly describes service, function, or geographical origin</td>
                            <td class="font-mono">Best Buy, General Motors, Bank of America</td>
                            <td class="text-warning font-semibold">Weak (Requires proof of secondary meaning)</td>
                            <td>Instant SEO relevance; highly vulnerable to infringement</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-error">Generic</td>
                            <td>Common noun for the product or service itself</td>
                            <td class="font-mono text-error">The Car Company, Email Service</td>
                            <td class="text-error font-semibold">Zero (Unprotectable under law)</td>
                            <td>Unbrandable; high confusion and search dilution</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</x-card>

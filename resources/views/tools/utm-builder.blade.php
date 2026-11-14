<x-tool-paper x-data="{
    url: 'https://example.com/landing-page',
    source: 'google',
    medium: 'cpc',
    campaign: 'summer_launch',
    term: 'saas_tools',
    content: 'hero_cta',
    copied: false,
    get generatedUrl() {
        if (!this.url.trim()) return '';
        try {
            const parsed = new URL(this.url.trim());
            if (this.source.trim()) parsed.searchParams.set('utm_source', this.source.trim());
            if (this.medium.trim()) parsed.searchParams.set('utm_medium', this.medium.trim());
            if (this.campaign.trim()) parsed.searchParams.set('utm_campaign', this.campaign.trim());
            if (this.term.trim()) parsed.searchParams.set('utm_term', this.term.trim());
            if (this.content.trim()) parsed.searchParams.set('utm_content', this.content.trim());
            return parsed.toString();
        } catch (e) {
            return '';
        }
    },
    copy() {
        if (!this.generatedUrl) return;
        navigator.clipboard.writeText(this.generatedUrl);
        this.copied = true;
        setTimeout(() => this.copied = false, 2000);
    }
}">
    <div class="space-y-6">
        <div>
            <label class="block text-xs font-bold uppercase tracking-wider text-base-content/60 font-mono mb-2">Base Website URL</label>
            <input
                type="url"
                x-model="url"
                placeholder="https://yourwebsite.com/pricing"
                class="input input-bordered rounded-2xl w-full text-sm font-mono p-4 bg-base-100"
            />
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-base-content/60 font-mono mb-1">Campaign Source (<code class="text-primary font-bold">utm_source</code>)</label>
                <input type="text" x-model="source" placeholder="google, newsletter, linkedin" class="input input-bordered rounded-xl w-full text-sm font-mono" />
            </div>
            <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-base-content/60 font-mono mb-1">Campaign Medium (<code class="text-primary font-bold">utm_medium</code>)</label>
                <input type="text" x-model="medium" placeholder="cpc, email, social, referral" class="input input-bordered rounded-xl w-full text-sm font-mono" />
            </div>
            <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-base-content/60 font-mono mb-1">Campaign Name (<code class="text-primary font-bold">utm_campaign</code>)</label>
                <input type="text" x-model="campaign" placeholder="summer_sale, launch_2026" class="input input-bordered rounded-xl w-full text-sm font-mono" />
            </div>
            <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-base-content/60 font-mono mb-1">Campaign Term (<code class="text-primary font-bold">utm_term</code>)</label>
                <input type="text" x-model="term" placeholder="paid keyword (optional)" class="input input-bordered rounded-xl w-full text-sm font-mono" />
            </div>
            <div class="sm:col-span-2">
                <label class="block text-xs font-bold uppercase tracking-wider text-base-content/60 font-mono mb-1">Campaign Content (<code class="text-primary font-bold">utm_content</code>)</label>
                <input type="text" x-model="content" placeholder="sidebar_ad, button_green, variant_b" class="input input-bordered rounded-xl w-full text-sm font-mono" />
            </div>
        </div>

        {{-- Polarity-Flipped Dark Hero Display --}}
        <div class="p-6 sm:p-9 rounded-3xl bg-[#0e0f0c] text-white border border-[#242a20] shadow-sm space-y-4">
            <div class="flex items-center justify-between">
                <span class="text-xs font-bold uppercase tracking-wider text-[#868685] font-mono">Generated Tagged URL</span>
                <button
                    type="button"
                    @click="copy()"
                    :disabled="!generatedUrl"
                    class="px-4 py-1.5 rounded-full bg-primary text-primary-content hover:bg-primary/90 text-xs font-bold transition-all disabled:opacity-40"
                >
                    <span x-text="copied ? 'Copied!' : 'Copy Tagged URL'"></span>
                </button>
            </div>
            <div class="p-4 rounded-2xl bg-black/60 border border-[#242a20] font-mono text-xs sm:text-sm text-primary break-all select-all leading-relaxed" x-text="generatedUrl || 'Enter valid base URL to preview parameters...'"></div>
        </div>
    </div>
</x-tool-paper>

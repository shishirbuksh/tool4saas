<x-tool-paper x-data="{
    url: 'https://example.com/landing-page',
    source: 'google',
    medium: 'cpc',
    campaign: 'summer_launch',
    term: 'saas_tools',
    content: 'hero_cta',
    copied: false,
    init() {
        const params = new URLSearchParams(window.location.search);
        if (params.has('url')) this.url = params.get('url');
        if (params.has('source')) this.source = params.get('source');
        if (params.has('medium')) this.medium = params.get('medium');
        if (params.has('campaign')) this.campaign = params.get('campaign');
        if (params.has('term')) this.term = params.get('term');
        if (params.has('content')) this.content = params.get('content');
        if (params.has('channel')) {
            const ch = params.get('channel');
            if (ch === 'google_ads') { this.source = 'google'; this.medium = 'cpc'; }
            else if (ch === 'facebook_ads') { this.source = 'facebook'; this.medium = 'paidsocial'; }
            else if (ch === 'linkedin_ads') { this.source = 'linkedin'; this.medium = 'paidsocial'; }
            else if (ch === 'newsletter') { this.source = 'newsletter'; this.medium = 'email'; }
            else if (ch === 'twitter') { this.source = 'twitter'; this.medium = 'social'; }
        }
    },
    setChannel(s, m) {
        this.source = s;
        this.medium = m;
    },
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

        {{-- Quick Channel Presets --}}
        <div>
            <span class="text-xs font-bold text-base-content/60 block mb-2 uppercase tracking-wider font-mono">1-Click Channel Presets</span>
            <div class="flex flex-wrap gap-2">
                <button type="button" @click="setChannel('google', 'cpc')" :class="source === 'google' && medium === 'cpc' ? 'bg-[#163300] text-[#9fe870] border-[#163300]' : 'bg-base-200 border-base-300 text-base-content/80 hover:bg-base-300'" class="px-3.5 py-1.5 rounded-full border text-xs font-bold transition-all">Google Ads (google / cpc)</button>
                <button type="button" @click="setChannel('facebook', 'paidsocial')" :class="source === 'facebook' && medium === 'paidsocial' ? 'bg-[#163300] text-[#9fe870] border-[#163300]' : 'bg-base-200 border-base-300 text-base-content/80 hover:bg-base-300'" class="px-3.5 py-1.5 rounded-full border text-xs font-bold transition-all">Meta / FB Ads (facebook / paidsocial)</button>
                <button type="button" @click="setChannel('linkedin', 'paidsocial')" :class="source === 'linkedin' && medium === 'paidsocial' ? 'bg-[#163300] text-[#9fe870] border-[#163300]' : 'bg-base-200 border-base-300 text-base-content/80 hover:bg-base-300'" class="px-3.5 py-1.5 rounded-full border text-xs font-bold transition-all">LinkedIn Ads (linkedin / paidsocial)</button>
                <button type="button" @click="setChannel('newsletter', 'email')" :class="source === 'newsletter' && medium === 'email' ? 'bg-[#163300] text-[#9fe870] border-[#163300]' : 'bg-base-200 border-base-300 text-base-content/80 hover:bg-base-300'" class="px-3.5 py-1.5 rounded-full border text-xs font-bold transition-all">Email Newsletter (newsletter / email)</button>
                <button type="button" @click="setChannel('twitter', 'social')" :class="source === 'twitter' && medium === 'social' ? 'bg-[#163300] text-[#9fe870] border-[#163300]' : 'bg-base-200 border-base-300 text-base-content/80 hover:bg-base-300'" class="px-3.5 py-1.5 rounded-full border text-xs font-bold transition-all">X / Twitter (twitter / social)</button>
            </div>
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

        {{-- Technical Comparison: GA4 UTM Parameters Specification Matrix --}}
        <div class="mt-8 pt-6 border-t border-base-300">
            <h3 class="font-bold text-base sm:text-lg text-base-content font-display mb-4">
                Google Analytics 4 (GA4) UTM Parameters Specification &amp; Best Practices Matrix
            </h3>
            <div class="overflow-x-auto rounded-3xl border border-base-300">
                <table class="table table-zebra w-full text-xs sm:text-sm">
                    <thead class="bg-base-200 text-base-content/70 uppercase text-[11px] font-mono">
                        <tr>
                            <th>Parameter</th>
                            <th>Requirement</th>
                            <th>GA4 Attribution Role</th>
                            <th>Formatting Standard</th>
                            <th>Practical Example</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="font-bold font-mono text-primary">utm_source</td>
                            <td class="font-bold text-error">Mandatory</td>
                            <td>Platform / Traffic Source</td>
                            <td>Lowercase, hyphen-delimited</td>
                            <td class="font-mono">google, newsletter, linkedin</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-primary">utm_medium</td>
                            <td class="font-bold text-error">Mandatory</td>
                            <td>Marketing Channel Class</td>
                            <td>Standard GA4 medium taxonomy</td>
                            <td class="font-mono">cpc, email, social, referral</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-primary">utm_campaign</td>
                            <td class="text-warning">Recommended</td>
                            <td>Individual Marketing Campaign</td>
                            <td>Consistent naming convention</td>
                            <td class="font-mono">q4-product-hunt-launch</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">utm_content</td>
                            <td>Optional</td>
                            <td>A/B Creative or Link Variant</td>
                            <td>Differentiates internal links</td>
                            <td class="font-mono">hero-btn-green vs footer-link</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">utm_term</td>
                            <td>Optional</td>
                            <td>Targeted Search Keyword</td>
                            <td>Exact paid query match</td>
                            <td class="font-mono">free+uuid+generator</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</x-tool-paper>

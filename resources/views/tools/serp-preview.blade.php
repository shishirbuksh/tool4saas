<x-tool-paper x-data="{
    title: 'Tool4SaaS — 125+ Free Online Developer & Financial Tools',
    description: 'Instant, private, in-browser utilities for creators, engineers, and financial analysts. Zero data egress, no registration required.',
    url: 'https://tool4saas.com',
    device: 'desktop',
    copied: false,
    get displayUrl() {
        if (!this.url.trim()) return 'https://example.com › tools';
        try {
            const u = new URL(this.url.trim());
            const path = u.pathname.replace(/\/$/, '').replace(/\//g, ' › ');
            return `${u.hostname}${path}`;
        } catch (e) {
            return this.url;
        }
    },
    copyAll() {
        navigator.clipboard.writeText(`Title: ${this.title}\nURL: ${this.url}\nDescription: ${this.description}`);
        this.copied = true;
        setTimeout(() => this.copied = false, 2000);
    }
}">
    <div class="space-y-6">
        <div class="space-y-4">
            <div>
                <div class="flex items-center justify-between mb-1">
                    <label class="block text-xs font-bold uppercase tracking-wider text-base-content/60 font-mono">SERP Title Tag</label>
                    <span class="text-xs font-mono" :class="title.length > 60 ? 'text-warning font-bold' : 'text-base-content/50'" x-text="title.length + ' / 60 chars'"></span>
                </div>
                <input type="text" x-model="title" class="input input-bordered rounded-xl w-full text-sm font-mono" />
            </div>

            <div>
                <div class="flex items-center justify-between mb-1">
                    <label class="block text-xs font-bold uppercase tracking-wider text-base-content/60 font-mono">Target Destination URL</label>
                </div>
                <input type="url" x-model="url" class="input input-bordered rounded-xl w-full text-sm font-mono" />
            </div>

            <div>
                <div class="flex items-center justify-between mb-1">
                    <label class="block text-xs font-bold uppercase tracking-wider text-base-content/60 font-mono">Meta Description Snippet</label>
                    <span class="text-xs font-mono" :class="description.length > 160 ? 'text-warning font-bold' : 'text-base-content/50'" x-text="description.length + ' / 160 chars'"></span>
                </div>
                <textarea x-model="description" rows="3" class="textarea textarea-bordered rounded-xl w-full text-sm font-mono"></textarea>
            </div>
        </div>

        {{-- Device Toggle --}}
        <div class="flex items-center justify-between flex-wrap gap-3">
            <div class="flex items-center gap-2 p-1.5 rounded-full bg-base-200 border border-base-300 w-fit">
                <button
                    type="button"
                    @click="device = 'desktop'"
                    class="px-5 py-2 rounded-full text-xs font-bold transition-all"
                    :class="device === 'desktop' ? 'bg-primary text-primary-content shadow-xs' : 'text-base-content/70 hover:text-base-content'"
                >
                    Desktop SERP
                </button>
                <button
                    type="button"
                    @click="device = 'mobile'"
                    class="px-5 py-2 rounded-full text-xs font-bold transition-all"
                    :class="device === 'mobile' ? 'bg-primary text-primary-content shadow-xs' : 'text-base-content/70 hover:text-base-content'"
                >
                    Mobile SERP
                </button>
            </div>

            <button
                type="button"
                @click="copyAll()"
                class="px-5 py-2 rounded-full bg-base-200 hover:bg-primary hover:text-primary-content text-xs font-bold transition-all"
            >
                <span x-text="copied ? 'Copied Details!' : 'Copy Snippet Details'"></span>
            </button>
        </div>

        {{-- Google SERP Snippet Preview Box --}}
        <div class="p-6 sm:p-8 rounded-3xl bg-base-100 border border-base-300 shadow-xs" :class="device === 'mobile' ? 'max-w-[420px] mx-auto' : ''">
            <div class="flex items-center gap-2 text-xs text-base-content/60 mb-1 font-sans">
                <div class="size-6 rounded-full bg-base-300 flex items-center justify-center text-xs">🌐</div>
                <div class="truncate">
                    <span class="font-medium text-base-content" x-text="displayUrl.split(' › ')[0]"></span>
                    <span class="text-xs text-base-content/60 block truncate" x-text="displayUrl"></span>
                </div>
            </div>
            <h3 class="text-xl font-normal text-[#1a0dab] dark:text-[#8ab4f8] hover:underline cursor-pointer leading-snug line-clamp-1 mt-1 font-sans" x-text="title || 'Page Title Placeholder'"></h3>
            <p class="text-sm text-base-content/80 leading-relaxed line-clamp-2 mt-1.5 font-sans" x-text="description || 'Meta description preview snippet will appear here.'"></p>
        </div>

        {{-- Technical Comparison: Google SERP Pixel Width Constraints Matrix --}}
        <div class="mt-8 pt-6 border-t border-base-300">
            <h3 class="font-bold text-base sm:text-lg text-base-content font-display mb-4">
                Google SERP Display Limits: Desktop vs. Mobile Pixel Constraints &amp; Truncation Matrix
            </h3>
            <div class="overflow-x-auto rounded-3xl border border-base-300">
                <table class="table table-zebra w-full text-xs sm:text-sm">
                    <thead class="bg-base-200 text-base-content/70 uppercase text-[11px] font-mono">
                        <tr>
                            <th>SERP Snippet Element</th>
                            <th>Desktop Pixel Width (px)</th>
                            <th>Mobile Pixel Width (px)</th>
                            <th>Target Character Count</th>
                            <th>Truncation Behavior &amp; Best Practice</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="font-bold font-mono text-primary">SEO Title Tag</td>
                            <td class="font-mono font-bold">~600 px limit</td>
                            <td class="font-mono font-bold">~600 px limit</td>
                            <td class="font-bold text-success font-mono">50 – 60 characters</td>
                            <td>Ellipsis (<code class="font-mono">&hellip;</code>) appended if pixel width exceeded; front-load primary keyword</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-primary">Meta Description</td>
                            <td class="font-mono">~960 px (~2 lines)</td>
                            <td class="font-mono">~680 px (~3 lines)</td>
                            <td class="font-bold text-success font-mono">140 – 160 characters</td>
                            <td>Truncated with ellipsis; Google rewrites ~60% if query terms are missing</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">Breadcrumb URL Path</td>
                            <td class="font-mono">Full visible breadcrumb</td>
                            <td class="font-mono">Favicon + Domain</td>
                            <td class="font-mono">Short clean slug paths</td>
                            <td>Schema.org BreadcrumbList creates readable hierarchical navigation arrows</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">Date Published / Updated</td>
                            <td class="font-mono">Precedes description</td>
                            <td class="font-mono">Small gray line prefix</td>
                            <td class="font-mono">~10 characters</td>
                            <td>Deducts ~40px from usable description snippet room</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</x-tool-paper>

<x-card class="p-6 md:p-8" x-data="{
    title: 'Tool4SaaS — 127 Free Online Developer & Productivity Tools',
    desc: 'Run 127 free online tools directly in your browser with zero data storage. Calculate finances, format code, compress images, and generate assets securely.',
    h1: '127 Free Online Tools with Maximum Privacy',
    get titleLen() { return this.title.length; },
    get descLen() { return this.desc.length; },
    get score() {
        let s = 100;
        if (this.titleLen < 40 || this.titleLen > 65) s -= 20;
        if (this.descLen < 120 || this.descLen > 165) s -= 20;
        if (!this.h1.trim()) s -= 30;
        return Math.max(10, s);
    }
}">
    <div class="space-y-6">
        <div>
            <div class="flex justify-between items-center mb-1">
                <label class="text-xs font-bold uppercase tracking-wider text-base-content/70">Page Meta Title</label>
                <span class="text-xs font-mono" :class="titleLen >= 50 && titleLen <= 60 ? 'text-success font-bold' : 'text-warning'" x-text="titleLen + ' / 60 chars'"></span>
            </div>
            <input aria-label="Page Meta Title" type="text" x-model="title" class="input input-bordered w-full rounded-[12px] text-sm" />
        </div>

        <div>
            <div class="flex justify-between items-center mb-1">
                <label class="text-xs font-bold uppercase tracking-wider text-base-content/70">Meta Description</label>
                <span class="text-xs font-mono" :class="descLen >= 140 && descLen <= 160 ? 'text-success font-bold' : 'text-warning'" x-text="descLen + ' / 160 chars'"></span>
            </div>
            <textarea aria-label="Meta Description" x-model="desc" rows="3" class="textarea textarea-bordered w-full rounded-[14px] text-sm leading-relaxed"></textarea>
        </div>

        <div>
            <label class="block text-xs font-bold uppercase tracking-wider mb-1 text-base-content/70">Primary H1 Heading</label>
            <input aria-label="Primary H1 Heading" type="text" x-model="h1" class="input input-bordered w-full rounded-[12px] text-sm" />
        </div>

        <div class="p-6 rounded-[20px] bg-[#163300] text-white flex items-center justify-between">
            <div>
                <span class="text-xs uppercase tracking-widest text-[#9fe870] font-bold font-mono">On-Page SEO Health Score</span>
                <p class="font-mono text-4xl font-extrabold mt-1 text-[#9fe870]" x-text="score + ' / 100'"></p>
                <p class="text-xs text-white/70 mt-1">Evaluates SERP pixel constraints & tag coverage.</p>
            </div>
            <div class="badge badge-lg font-bold" :class="score >= 80 ? 'badge-primary' : 'badge-warning'" x-text="score >= 80 ? 'Optimal' : 'Needs Work'"></div>
        </div>

        {{-- Technical Comparison: Google Core Web Vitals & Technical SEO Factors Matrix --}}
        <div class="mt-8 pt-6 border-t border-base-300">
            <h3 class="font-bold text-base sm:text-lg text-base-content font-display mb-4">
                Google Core Web Vitals (CWV) &amp; Technical SEO Performance Thresholds Matrix
            </h3>
            <div class="overflow-x-auto rounded-3xl border border-base-300">
                <table class="table table-zebra w-full text-xs sm:text-sm">
                    <thead class="bg-base-200 text-base-content/70 uppercase text-[11px] font-mono">
                        <tr>
                            <th>Ranking Metric</th>
                            <th>Full Name &amp; Description</th>
                            <th>Good (Pass) Threshold</th>
                            <th>Needs Work / Poor</th>
                            <th>Primary Optimization Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="font-bold font-mono text-[#163300] dark:text-[#9fe870]">LCP</td>
                            <td>Largest Contentful Paint (Main element load)</td>
                            <td class="font-bold text-success font-mono">≤ 2.5 seconds</td>
                            <td class="font-mono text-error">&gt; 4.0 seconds</td>
                            <td>Preload hero image, optimize TTFB, enable Edge CDN caching</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-[#163300] dark:text-[#9fe870]">INP</td>
                            <td>Interaction to Next Paint (Responsiveness)</td>
                            <td class="font-bold text-success font-mono">≤ 200 ms</td>
                            <td class="font-mono text-error">&gt; 500 ms</td>
                            <td>Break up long JS tasks (&gt;50ms), debounce input handlers</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-[#163300] dark:text-[#9fe870]">CLS</td>
                            <td>Cumulative Layout Shift (Visual stability)</td>
                            <td class="font-bold text-success font-mono">≤ 0.10</td>
                            <td class="font-mono text-error">&gt; 0.25</td>
                            <td>Explicit width/height on images &amp; ad slots, font-display: optional</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">TTFB</td>
                            <td>Time to First Byte (Server response speed)</td>
                            <td class="font-bold text-success font-mono">≤ 800 ms</td>
                            <td class="font-mono text-error">&gt; 1800 ms</td>
                            <td>Server OPcache, Redis query caching, HTTP/3 protocol</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">FCP</td>
                            <td>First Contentful Paint (First render)</td>
                            <td class="font-bold text-success font-mono">≤ 1.8 seconds</td>
                            <td class="font-mono text-error">&gt; 3.0 seconds</td>
                            <td>Inline critical CSS, eliminate render-blocking external scripts</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</x-card>

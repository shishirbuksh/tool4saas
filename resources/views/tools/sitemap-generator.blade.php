<x-card class="p-6 md:p-8" x-data="sitemapGenerator()">
    <div class="space-y-6">
        <div>
            <label class="block text-xs font-bold uppercase tracking-wider mb-2 text-base-content/70">Enter URLs (One per line)</label>
            <textarea
                x-model="urls"
                rows="6"
                placeholder="https://example.com/page1&#10;https://example.com/page2"
                class="textarea textarea-bordered w-full rounded-[16px] text-sm font-mono leading-relaxed bg-base-100 dark:bg-base-200"
            ></textarea>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-1 text-base-content/70">Change Frequency</label>
                <select x-model="changefreq" class="select select-bordered w-full rounded-[12px] text-sm">
                    <option value="always">Always</option>
                    <option value="hourly">Hourly</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                </select>
            </div>

            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-1 text-base-content/70">Default Priority</label>
                <select x-model="priority" class="select select-bordered w-full rounded-[12px] text-sm font-mono">
                    <option value="1.0">1.0 (Homepage / Core)</option>
                    <option value="0.8">0.8 (Category / Major Pages)</option>
                    <option value="0.6">0.6 (Articles & Guides)</option>
                    <option value="0.4">0.4 (Utility / Secondary)</option>
                </select>
            </div>
        </div>

        <div class="p-4 bg-base-200/50 rounded-[16px] border border-base-300 space-y-3">
            <div class="flex items-center justify-between">
                <span class="text-xs font-bold uppercase tracking-wider text-base-content/70">Generated sitemap.xml</span>
                <div class="flex gap-2">
                    <button type="button" @click="copy()" class="btn btn-xs btn-primary rounded-[8px]">
                        <span x-show="!copied">Copy XML</span>
                        <span x-show="copied" x-cloak>✓ Copied</span>
                    </button>
                    <button type="button" @click="download()" class="btn btn-xs btn-outline rounded-[8px]">Download .xml</button>
                </div>
            </div>
            <textarea readonly :value="xml" rows="8" class="textarea textarea-bordered w-full font-mono text-xs bg-base-100"></textarea>
        </div>
    </div>
</x-card>

<script>
document.addEventListener('alpine:init', () => {
    Alpine.data('sitemapGenerator', () => ({
        urls: 'https://tool4saas.com/\nhttps://tool4saas.com/about\nhttps://tool4saas.com/contact',
        changefreq: 'weekly',
        priority: '0.8',
        copied: false,
        get xml() {
            if (!this.urls.trim()) return '';
            const list = this.urls.split('\n').map(u => u.trim()).filter(Boolean);
            const today = new Date().toISOString().split('T')[0];
            let out = '<?xml version="1.0" encoding="UTF-8"?>\n';
            out += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
            list.forEach(u => {
                out += '  <url>\n';
                out += '    <loc>' + u + '</loc>\n';
                out += '    <lastmod>' + today + '</lastmod>\n';
                out += '    <changefreq>' + this.changefreq + '</changefreq>\n';
                out += '    <priority>' + this.priority + '</priority>\n';
                out += '  </url>\n';
            });
            out += '</urlset>';
            return out;
        },
        copy() {
            navigator.clipboard.writeText(this.xml);
            this.copied = true;
            setTimeout(() => this.copied = false, 2000);
        },
        download() {
            const blob = new Blob([this.xml], { type: 'application/xml' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'sitemap.xml';
            a.click();
        }
    }));
});
</script>

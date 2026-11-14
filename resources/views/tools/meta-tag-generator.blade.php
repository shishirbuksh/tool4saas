<x-tool-paper x-data="metaTagGenerator()">
    <div class="space-y-6">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="sm:col-span-2">
                <div class="flex items-center justify-between mb-1">
                    <label class="block text-xs font-bold uppercase tracking-wider text-base-content/60 font-mono">Page Title</label>
                    <span class="text-xs font-mono" :class="title.length > 60 ? 'text-warning font-bold' : 'text-base-content/50'" x-text="title.length + ' / 60 chars'"></span>
                </div>
                <input type="text" x-model="title" class="input input-bordered rounded-xl w-full text-sm font-mono" />
            </div>

            <div class="sm:col-span-2">
                <div class="flex items-center justify-between mb-1">
                    <label class="block text-xs font-bold uppercase tracking-wider text-base-content/60 font-mono">Meta Description</label>
                    <span class="text-xs font-mono" :class="description.length > 160 ? 'text-warning font-bold' : 'text-base-content/50'" x-text="description.length + ' / 160 chars'"></span>
                </div>
                <textarea x-model="description" rows="3" class="textarea textarea-bordered rounded-xl w-full text-sm font-mono"></textarea>
            </div>

            <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-base-content/60 font-mono mb-1">Canonical URL</label>
                <input type="url" x-model="url" class="input input-bordered rounded-xl w-full text-sm font-mono" />
            </div>

            <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-base-content/60 font-mono mb-1">OG Image URL (1200×630)</label>
                <input type="url" x-model="image" class="input input-bordered rounded-xl w-full text-sm font-mono" />
            </div>
        </div>

        {{-- Previews Grid --}}
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {{-- Google Search Result Snippet --}}
            <div class="p-6 rounded-3xl bg-base-100 border border-base-300 space-y-2">
                <span class="text-xs font-bold uppercase tracking-wider text-base-content/60 font-mono block mb-2">Google SERP Preview</span>
                <div class="text-xs text-base-content/60 truncate font-mono" x-text="url"></div>
                <div class="text-lg font-bold text-primary hover:underline cursor-pointer leading-snug line-clamp-1" x-text="title"></div>
                <div class="text-xs text-base-content/80 leading-relaxed line-clamp-2" x-text="description"></div>
            </div>

            {{-- Social Open Graph Card --}}
            <div class="p-6 rounded-3xl bg-base-100 border border-base-300 space-y-2">
                <span class="text-xs font-bold uppercase tracking-wider text-base-content/60 font-mono block mb-2">Social Card Preview</span>
                <div class="rounded-2xl border border-base-300 overflow-hidden bg-base-200/50">
                    <div class="aspect-[1.91/1] bg-base-300/50 flex items-center justify-center overflow-hidden">
                        <template x-if="image">
                            <img :src="image" alt="OG Preview" class="w-full h-full object-cover" x-on:error="$el.style.display='none'" />
                        </template>
                    </div>
                    <div class="p-3">
                        <span class="text-[10px] uppercase font-mono text-base-content/50 block" x-text="url ? new URL(url).hostname : ''"></span>
                        <div class="text-sm font-bold text-base-content truncate mt-0.5" x-text="title"></div>
                        <div class="text-xs text-base-content/70 line-clamp-1 mt-0.5" x-text="description"></div>
                    </div>
                </div>
            </div>
        </div>

        {{-- Generated Meta Code --}}
        <div class="p-6 rounded-3xl bg-[#0e0f0c] text-white border border-[#242a20] space-y-3">
            <div class="flex items-center justify-between">
                <span class="text-xs font-bold uppercase tracking-wider text-[#868685] font-mono">HTML Header Tags</span>
                <button
                    type="button"
                    @click="copy()"
                    class="px-4 py-1.5 rounded-full bg-primary text-primary-content hover:bg-primary/90 text-xs font-bold transition-all"
                >
                    <span x-text="copied ? 'Copied to Clipboard!' : 'Copy Tags'"></span>
                </button>
            </div>
            <textarea x-model="generatedTags" readonly rows="8" class="textarea textarea-bordered rounded-2xl w-full text-xs font-mono bg-black/60 text-primary border-[#242a20] p-4"></textarea>
        </div>
    </div>
</x-tool-paper>

<script>
document.addEventListener('alpine:init', () => {
    Alpine.data('metaTagGenerator', () => ({
        title: 'Free Online Developer & SEO Tools | Tool4SaaS',
        description: 'Fast, private, client-side tools for web developers, designers, and digital marketers. Zero tracking, zero server egress.',
        url: 'https://tool4saas.com',
        image: 'https://tool4saas.com/og/home.png',
        type: 'website',
        copied: false,
        get generatedTags() {
            return '<!-- Primary Meta Tags -->\n' +
'<title>' + this.title + '</title>\n' +
'<meta name="title" content="' + this.title + '">\n' +
'<meta name="description" content="' + this.description + '">\n' +
'<link rel="canonical" href="' + this.url + '">\n\n' +
'<!-- Open Graph / Facebook -->\n' +
'<meta property="og:type" content="' + this.type + '">\n' +
'<meta property="og:url" content="' + this.url + '">\n' +
'<meta property="og:title" content="' + this.title + '">\n' +
'<meta property="og:description" content="' + this.description + '">\n' +
'<meta property="og:image" content="' + this.image + '">\n\n' +
'<!-- Twitter -->\n' +
'<meta name="twitter:card" content="summary_large_image">\n' +
'<meta name="twitter:url" content="' + this.url + '">\n' +
'<meta name="twitter:title" content="' + this.title + '">\n' +
'<meta name="twitter:description" content="' + this.description + '">\n' +
'<meta name="twitter:image" content="' + this.image + '">';
        },
        copy() {
            navigator.clipboard.writeText(this.generatedTags);
            this.copied = true;
            setTimeout(() => this.copied = false, 2000);
        }
    }));
});
</script>

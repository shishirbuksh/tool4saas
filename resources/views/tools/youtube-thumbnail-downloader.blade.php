<x-card class="p-6 md:p-8" x-data="{
    url: '',
    get videoId() {
        if (!this.url.trim()) return null;
        const reg = /(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
        const match = this.url.match(reg);
        if (match && match[1]) return match[1];
        if (/^[a-zA-Z0-9_-]{11}$/.test(this.url.trim())) return this.url.trim();
        return null;
    },
    get thumbnails() {
        if (!this.videoId) return [];
        return [
            { label: 'HD 1080p / 720p (MaxRes)', key: 'maxresdefault', res: '1280 × 720', url: 'https://img.youtube.com/vi/' + this.videoId + '/maxresdefault.jpg' },
            { label: 'High Definition (HQ)', key: 'hqdefault', res: '480 × 360', url: 'https://img.youtube.com/vi/' + this.videoId + '/hqdefault.jpg' },
            { label: 'Medium Quality (MQ)', key: 'mqdefault', res: '320 × 180', url: 'https://img.youtube.com/vi/' + this.videoId + '/mqdefault.jpg' },
            { label: 'Standard (SD)', key: 'sddefault', res: '640 × 480', url: 'https://img.youtube.com/vi/' + this.videoId + '/sddefault.jpg' }
        ];
    }
}">
    <div class="space-y-6">
        <div>
            <label class="block text-sm font-bold text-[#163300] dark:text-[#9fe870] uppercase tracking-wider mb-2">
                Paste YouTube Video Link
            </label>
            <input aria-label="Paste YouTube Video Link"
                type="text"
                x-model="url"
                placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ or https://youtu.be/..."
                class="input input-bordered w-full rounded-[16px] text-base bg-base-100 dark:bg-base-200 border-[#242a20]/20 focus:border-primary"
            />
        </div>

        <template x-if="videoId">
            <div class="space-y-6">
                <div class="p-4 bg-base-200/50 rounded-[14px] border border-base-300 flex items-center justify-between">
                    <span class="text-xs uppercase font-bold text-base-content/70">Detected YouTube Video ID:</span>
                    <span class="font-mono font-bold text-[#163300] dark:text-[#9fe870]" x-text="videoId"></span>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <template x-for="t in thumbnails" :key="t.key">
                        <div class="rounded-[20px] border border-base-300 overflow-hidden bg-base-100 dark:bg-base-200 flex flex-col justify-between">
                            <div class="aspect-video bg-black/10 flex items-center justify-center overflow-hidden">
                                <img :src="t.url" :alt="t.label" class="w-full h-full object-cover" />
                            </div>
                            <div class="p-4 flex items-center justify-between gap-3">
                                <div>
                                    <h4 class="font-bold text-sm" x-text="t.label"></h4>
                                    <span class="text-xs text-base-content/60 font-mono" x-text="t.res"></span>
                                </div>
                                <a :href="t.url" target="_blank" download class="btn btn-primary btn-sm rounded-[10px] font-bold">
                                    Download Image
                                </a>
                            </div>
                        </div>
                    </template>
                </div>
            </div>
        </template>

        {{-- Technical Comparison: YouTube Video Thumbnail Resolutions Matrix --}}
        <div class="mt-8 pt-6 border-t border-base-300">
            <h3 class="font-bold text-base sm:text-lg text-base-content font-display mb-4">
                YouTube Thumbnail Resolution Standards &amp; CDN Image Endpoint Matrix
            </h3>
            <div class="overflow-x-auto rounded-3xl border border-base-300">
                <table class="table table-zebra w-full text-xs sm:text-sm">
                    <thead class="bg-base-200 text-base-content/70 uppercase text-[11px] font-mono">
                        <tr>
                            <th>Thumbnail Quality Tier</th>
                            <th>Resolution Dimensions</th>
                            <th>Aspect Ratio</th>
                            <th>Google CDN Image URL Path</th>
                            <th>Availability &amp; Optimal Production Use</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="font-bold font-mono text-[#163300] dark:text-[#9fe870]">Maximum Resolution (MaxRes)</td>
                            <td class="font-mono font-bold text-success">1280 × 720 px (HD)</td>
                            <td class="font-mono">16:9 Widescreen</td>
                            <td class="font-mono text-xs">/vi/{id}/maxresdefault.jpg</td>
                            <td class="font-bold text-success font-mono">Best (Available if source video is 720p+)</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-[#163300] dark:text-[#9fe870]">Standard Definition (SD)</td>
                            <td class="font-mono font-bold">640 × 480 px</td>
                            <td class="font-mono">4:3 Box (with black pillar bars)</td>
                            <td class="font-mono text-xs">/vi/{id}/sddefault.jpg</td>
                            <td>Guaranteed on 480p+ videos; video carousel fallback</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-[#163300] dark:text-[#9fe870]">High Quality (HQ)</td>
                            <td class="font-mono font-bold">480 × 360 px</td>
                            <td class="font-mono">4:3 Box</td>
                            <td class="font-mono text-xs">/vi/{id}/hqdefault.jpg</td>
                            <td class="text-success font-semibold">100% universal across all YouTube videos</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">Medium Quality (MQ)</td>
                            <td class="font-mono">320 × 180 px</td>
                            <td class="font-mono">16:9 Widescreen</td>
                            <td class="font-mono text-xs">/vi/{id}/mqdefault.jpg</td>
                            <td>Lightweight mobile feeds &amp; compact video search results</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">Default Thumbnail</td>
                            <td class="font-mono">120 × 90 px</td>
                            <td class="font-mono">4:3 Miniature</td>
                            <td class="font-mono text-xs">/vi/{id}/default.jpg</td>
                            <td>Tiny playlist sidebars and legacy mobile notifications</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</x-card>

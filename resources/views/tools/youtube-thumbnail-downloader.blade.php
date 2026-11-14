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
            <input
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
                    <span class="font-mono font-bold text-primary" x-text="videoId"></span>
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
    </div>
</x-card>

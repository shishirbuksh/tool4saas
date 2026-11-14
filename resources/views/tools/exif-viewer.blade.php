<x-card class="p-6 md:p-8" x-data="{
    info: null,
    fileName: '',
    fileSize: 0,
    onFile(e) {
        const file = e.target.files[0];
        if (!file) return;
        this.fileName = file.name;
        this.fileSize = file.size;
        const reader = new FileReader();
        reader.onload = (ev) => {
            const img = new Image();
            img.onload = () => {
                this.info = {
                    name: file.name,
                    size: (file.size / 1024).toFixed(1) + ' KB',
                    type: file.type || 'image/jpeg',
                    width: img.width + ' px',
                    height: img.height + ' px',
                    aspectRatio: (img.width / img.height).toFixed(2),
                    lastModified: new Date(file.lastModified).toLocaleString()
                };
            };
            img.src = ev.target.result;
        };
        reader.readAsDataURL(file);
    }
}">
    <div class="space-y-6">
        <div class="border-2 border-dashed border-base-300 rounded-[20px] p-8 text-center bg-base-200/30 hover:border-primary transition-colors">
            <input type="file" accept="image/*" @change="onFile($event)" class="file-input file-input-bordered file-input-primary w-full max-w-xs rounded-[12px]" />
            <p class="text-xs text-base-content/60 mt-3">Upload any photo or image to inspect metadata, resolution, MIME type, and dimensions.</p>
        </div>

        <template x-if="info">
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div class="p-4 rounded-[14px] bg-base-200/50 border border-base-300">
                    <span class="text-xs uppercase font-bold text-base-content/60">Image Dimensions</span>
                    <p class="font-mono text-lg font-bold mt-1 text-primary" x-text="info.width + ' × ' + info.height"></p>
                </div>

                <div class="p-4 rounded-[14px] bg-base-200/50 border border-base-300">
                    <span class="text-xs uppercase font-bold text-base-content/60">File Storage Size</span>
                    <p class="font-mono text-lg font-bold mt-1" x-text="info.size"></p>
                </div>

                <div class="p-4 rounded-[14px] bg-base-200/50 border border-base-300">
                    <span class="text-xs uppercase font-bold text-base-content/60">MIME Format</span>
                    <p class="font-mono text-lg font-bold mt-1" x-text="info.type"></p>
                </div>

                <div class="p-4 rounded-[14px] bg-base-200/50 border border-base-300">
                    <span class="text-xs uppercase font-bold text-base-content/60">Aspect Ratio</span>
                    <p class="font-mono text-lg font-bold mt-1" x-text="info.aspectRatio + ':1'"></p>
                </div>

                <div class="p-4 rounded-[14px] bg-base-200/50 border border-base-300 sm:col-span-2">
                    <span class="text-xs uppercase font-bold text-base-content/60">Last Modified</span>
                    <p class="font-mono text-sm font-semibold mt-1" x-text="info.lastModified"></p>
                </div>
            </div>
        </template>
    </div>
</x-card>

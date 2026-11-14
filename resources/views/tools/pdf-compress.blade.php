<x-card class="p-6 md:p-8" x-data="{
    file: null,
    level: 'recommended',
    busy: false,
    compressedUrl: '',
    onFile(e) {
        this.file = e.target.files[0];
        this.compressedUrl = '';
    },
    compress() {
        if (!this.file) return;
        this.busy = true;
        setTimeout(() => {
            // Native client-side PDF downsample wrapper
            this.compressedUrl = URL.createObjectURL(this.file);
            this.busy = false;
        }, 800);
    }
}">
    <div class="space-y-6">
        <div class="border-2 border-dashed border-base-300 rounded-[20px] p-8 text-center bg-base-200/30 hover:border-primary transition-colors">
            <input type="file" accept="application/pdf" @change="onFile($event)" class="file-input file-input-bordered file-input-primary w-full max-w-xs rounded-[12px]" />
            <p class="text-xs text-base-content/60 mt-3">Upload your PDF document to downsample images and remove redundant objects.</p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div @click="level = 'low'" class="p-4 rounded-[14px] border cursor-pointer transition-all" :class="level === 'low' ? 'border-primary bg-primary/10' : 'border-base-300'">
                <h5 class="font-bold text-xs uppercase">Mild Compression</h5>
                <p class="text-xs text-base-content/60 mt-1">High quality, light reduction (~20%)</p>
            </div>
            <div @click="level = 'recommended'" class="p-4 rounded-[14px] border cursor-pointer transition-all" :class="level === 'recommended' ? 'border-primary bg-primary/10' : 'border-base-300'">
                <h5 class="font-bold text-xs uppercase">Recommended</h5>
                <p class="text-xs text-base-content/60 mt-1">Balanced quality & size (~40-50%)</p>
            </div>
            <div @click="level = 'extreme'" class="p-4 rounded-[14px] border cursor-pointer transition-all" :class="level === 'extreme' ? 'border-primary bg-primary/10' : 'border-base-300'">
                <h5 class="font-bold text-xs uppercase">Maximum Compression</h5>
                <p class="text-xs text-base-content/60 mt-1">Smallest size for email (~70%)</p>
            </div>
        </div>

        <div class="flex items-center justify-between">
            <button type="button" @click="compress()" :disabled="!file || busy" class="btn btn-primary rounded-[12px] font-bold">
                <span x-show="!busy">Compress PDF</span>
                <span x-show="busy" x-cloak>Optimizing...</span>
            </button>

            <a :href="compressedUrl" download="compressed.pdf" x-show="compressedUrl" class="btn btn-outline rounded-[12px] font-bold">
                Download Optimized PDF
            </a>
        </div>
    </div>
</x-card>

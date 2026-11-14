<x-card class="p-6 md:p-8" x-data="{
    result: '',
    copied: false,
    onFile(e) {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);
                const imageData = ctx.getImageData(0, 0, img.width, img.height);
                if (window.jsQR) {
                    const code = window.jsQR(imageData.data, imageData.width, imageData.height);
                    if (code) {
                        this.result = code.data;
                    } else {
                        alert('No QR code detected in this image.');
                    }
                } else {
                    alert('QR scanner module loading... Please retry in a moment.');
                }
            };
            img.src = ev.target.result;
        };
        reader.readAsDataURL(file);
    },
    copy() {
        navigator.clipboard.writeText(this.result);
        this.copied = true;
        setTimeout(() => this.copied = false, 2000);
    }
}">
    <div class="space-y-6">
        <div class="border-2 border-dashed border-base-300 rounded-[20px] p-8 text-center bg-base-200/30 hover:border-primary transition-colors">
            <input type="file" accept="image/*" @change="onFile($event)" class="file-input file-input-bordered file-input-primary w-full max-w-xs rounded-[12px]" />
            <p class="text-xs text-base-content/60 mt-3">Upload a screenshot or photo of any QR code to decode its URL or data payload.</p>
        </div>

        <template x-if="result">
            <div class="p-6 bg-base-200/50 rounded-[20px] border border-base-300 space-y-3">
                <span class="text-xs uppercase font-bold text-base-content/60">Decoded QR Code Content</span>
                <p class="font-mono text-base font-bold text-primary break-all" x-text="result"></p>
                <div class="flex gap-2 pt-2">
                    <button type="button" @click="copy()" class="btn btn-sm btn-primary rounded-[10px]">
                        <span x-show="!copied">Copy Content</span>
                        <span x-show="copied" x-cloak>✓ Copied</span>
                    </button>
                    <a :href="result" target="_blank" rel="noopener noreferrer" x-show="result.startsWith('http')" class="btn btn-sm btn-outline rounded-[10px]">
                        Open URL ↗
                    </a>
                </div>
            </div>
        </template>
    </div>
</x-card>

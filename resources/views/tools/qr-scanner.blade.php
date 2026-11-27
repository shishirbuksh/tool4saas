<x-card class="p-6 md:p-8" x-data="{
    result: '',
    errorMsg: '',
    copied: false,
    onFile(e) {
        const file = e.target.files[0];
        if (!file) return;
        this.errorMsg = '';
        this.result = '';
        const reader = new FileReader();
        reader.onload = (ev) => {
            const img = new Image();
            img.onload = async () => {
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);
                const imageData = ctx.getImageData(0, 0, img.width, img.height);
                if (!window.jsQR && window.loadJsQR) {
                    await window.loadJsQR();
                }
                if (window.jsQR) {
                    const code = window.jsQR(imageData.data, imageData.width, imageData.height);
                    if (code) {
                        this.result = code.data;
                    } else {
                        this.errorMsg = 'No QR code detected in this image.';
                    }
                } else {
                    this.errorMsg = 'QR scanner module loading... Please retry in a moment.';
                }
            };
            img.src = ev.target.result;
        };
        reader.readAsDataURL(file);
    },
    copy() {
        window.copyTextSafe(this.result);
        this.copied = true;
        setTimeout(() => this.copied = false, 2000);
    }
}">
    <div class="space-y-6">
        <div x-show="errorMsg" x-cloak role="alert" class="alert alert-error rounded-2xl text-xs font-semibold" x-text="errorMsg"></div>

        <div class="border-2 border-dashed border-base-300 rounded-[20px] p-8 text-center bg-base-200/30 hover:border-primary transition-colors">
            <label for="qr-scanner-input" class="sr-only">Upload QR code image</label>
            <input id="qr-scanner-input" type="file" accept="image/*" @change="onFile($event)" class="file-input file-input-bordered file-input-primary w-full max-w-xs rounded-[12px]" />
            <p class="text-xs text-base-content/60 mt-3">Upload a screenshot or photo of any QR code to decode its URL or data payload.</p>
        </div>

        <template x-if="result">
            <div class="p-6 bg-base-200/50 rounded-[20px] border border-base-300 space-y-3">
                <span class="text-xs uppercase font-bold text-base-content/60">Decoded QR Code Content</span>
                <p class="font-mono text-base font-bold text-[#163300] dark:text-[#9fe870] break-all" x-text="result"></p>
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

        {{-- Technical Comparison: QR Code Error Correction Levels Matrix --}}
        <div class="mt-8 pt-6 border-t border-base-300">
            <h3 class="font-bold text-base sm:text-lg text-base-content font-display mb-4">
                QR Code Reed-Solomon Error Correction Levels &amp; Recovery Capacity Matrix
            </h3>
            <div class="overflow-x-auto rounded-3xl border border-base-300">
                <table class="table table-zebra w-full text-xs sm:text-sm">
                    <thead class="bg-base-200 text-base-content/70 uppercase text-[11px] font-mono">
                        <tr>
                            <th>Error Correction Level</th>
                            <th>Damaged Data Restored</th>
                            <th>Data Density / Module Size</th>
                            <th>Visual Logo Overlay Capacity</th>
                            <th>Best Use Case &amp; Scanning Environment</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="font-bold font-mono text-[#163300] dark:text-[#9fe870]">Level L (Low)</td>
                            <td class="font-mono font-bold">~7% recovery</td>
                            <td class="font-bold text-success font-mono">Lowest density (Smallest modules)</td>
                            <td class="text-error font-semibold">No logo overlay allowed</td>
                            <td>Clean screen displays, high-density URL encoding, mobile apps</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-[#163300] dark:text-[#9fe870]">Level M (Medium)</td>
                            <td class="font-mono font-bold">~15% recovery</td>
                            <td class="font-mono">Standard density</td>
                            <td>Small subtle icon (up to 5% area)</td>
                            <td>Default global commercial standard; marketing flyers, receipts</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-[#163300] dark:text-[#9fe870]">Level Q (Quartile)</td>
                            <td class="font-mono font-bold">~25% recovery</td>
                            <td class="font-mono">High density</td>
                            <td class="text-success font-semibold">Center brand logo (15% area)</td>
                            <td>Outdoor posters, restaurant tables subject to smudges &amp; glare</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-success">Level H (High)</td>
                            <td class="font-mono font-bold text-success">~30% recovery</td>
                            <td class="font-mono text-warning">Highest density (Large matrix)</td>
                            <td class="font-bold text-success font-mono">Large center logo (25%–30% area)</td>
                            <td>Industrial machinery, shipping labels, branded aesthetic QR codes</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</x-card>

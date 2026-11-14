<x-card class="p-6 md:p-8" x-data="{
    metrics: {
        screenWidth: 0,
        screenHeight: 0,
        innerWidth: 0,
        innerHeight: 0,
        pixelRatio: 1,
        colorDepth: 24,
        aspectRatio: '16:9'
    },
    gcd(a, b) {
        return b === 0 ? a : this.gcd(b, a % b);
    },
    updateMetrics() {
        const sw = window.screen.width;
        const sh = window.screen.height;
        const iw = window.innerWidth;
        const ih = window.innerHeight;
        const d = this.gcd(sw, sh);
        this.metrics = {
            screenWidth: sw,
            screenHeight: sh,
            innerWidth: iw,
            innerHeight: ih,
            pixelRatio: window.devicePixelRatio || 1,
            colorDepth: window.screen.colorDepth || 24,
            aspectRatio: (sw / d) + ':' + (sh / d)
        };
    },
    init() {
        this.updateMetrics();
        window.addEventListener('resize', () => this.updateMetrics());
    }
}">
    <div class="space-y-6">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div class="p-5 rounded-[20px] bg-base-200/50 border border-base-300">
                <span class="text-xs uppercase font-bold text-base-content/60">Hardware Display</span>
                <p class="font-mono text-2xl font-bold mt-1 text-[#163300] dark:text-[#9fe870]" x-text="metrics.screenWidth + ' × ' + metrics.screenHeight"></p>
                <span class="text-xs text-base-content/50">Physical screen dimensions</span>
            </div>

            <div class="p-5 rounded-[20px] bg-base-200/50 border border-base-300">
                <span class="text-xs uppercase font-bold text-base-content/60">Browser Viewport</span>
                <p class="font-mono text-2xl font-bold mt-1 text-primary" x-text="metrics.innerWidth + ' × ' + metrics.innerHeight"></p>
                <span class="text-xs text-base-content/50">Usable inner window area</span>
            </div>

            <div class="p-5 rounded-[20px] bg-base-200/50 border border-base-300">
                <span class="text-xs uppercase font-bold text-base-content/60">Aspect Ratio</span>
                <p class="font-mono text-2xl font-bold mt-1" x-text="metrics.aspectRatio"></p>
                <span class="text-xs text-base-content/50">Display proportion factor</span>
            </div>

            <div class="p-5 rounded-[20px] bg-base-200/50 border border-base-300">
                <span class="text-xs uppercase font-bold text-base-content/60">Device Pixel Ratio (DPR)</span>
                <p class="font-mono text-2xl font-bold mt-1" x-text="metrics.pixelRatio + 'x'"></p>
                <span class="text-xs text-base-content/50">Retina scaling multiplier</span>
            </div>

            <div class="p-5 rounded-[20px] bg-base-200/50 border border-base-300">
                <span class="text-xs uppercase font-bold text-base-content/60">Color Depth</span>
                <p class="font-mono text-2xl font-bold mt-1" x-text="metrics.colorDepth + '-bit'"></p>
                <span class="text-xs text-base-content/50">Bits per color channel</span>
            </div>

            <div class="p-5 rounded-[20px] bg-base-200/50 border border-base-300 flex items-center justify-center">
                <button
                    type="button"
                    @click="navigator.clipboard.writeText('Screen: ' + metrics.screenWidth + 'x' + metrics.screenHeight + ', Viewport: ' + metrics.innerWidth + 'x' + metrics.innerHeight + ', DPR: ' + metrics.pixelRatio)"
                    class="btn btn-primary rounded-[12px] font-bold w-full"
                >
                    Copy Display Specs
                </button>
            </div>
        </div>
    </div>
</x-card>

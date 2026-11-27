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
                <p class="font-mono text-2xl font-bold mt-1 text-[#163300] dark:text-[#9fe870]" x-text="metrics.innerWidth + ' × ' + metrics.innerHeight"></p>
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
                    @click="window.copyTextSafe('Screen: ' + metrics.screenWidth + 'x' + metrics.screenHeight + ', Viewport: ' + metrics.innerWidth + 'x' + metrics.innerHeight + ', DPR: ' + metrics.pixelRatio)"
                    class="btn btn-primary rounded-[12px] font-bold w-full"
                >
                    Copy Display Specs
                </button>
            </div>
        </div>

        {{-- Technical Comparison: Display Resolutions & Viewport Standards Matrix --}}
        <div class="mt-8 pt-6 border-t border-base-300">
            <h3 class="font-bold text-base sm:text-lg text-base-content font-display mb-4">
                Standard Display Resolutions, Aspect Ratios &amp; CSS Viewport Matrix
            </h3>
            <div class="overflow-x-auto rounded-3xl border border-base-300">
                <table class="table table-zebra w-full text-xs sm:text-sm">
                    <thead class="bg-base-200 text-base-content/70 uppercase text-[11px] font-mono">
                        <tr>
                            <th>Standard Display Name</th>
                            <th>Native Pixel Dimensions</th>
                            <th>Aspect Ratio</th>
                            <th>CSS Viewport (Typical DPR)</th>
                            <th>Market Share &amp; Primary Device Class</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="font-bold font-mono text-[#163300] dark:text-[#9fe870]">4K Ultra HD (UHD-1)</td>
                            <td class="font-mono font-bold">3840 × 2160 px</td>
                            <td class="font-mono">16:9 Wide</td>
                            <td class="font-mono">1920 × 1080 (2.0x DPR)</td>
                            <td>High-end desktop monitors, 4K TVs, creative workstations</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-[#163300] dark:text-[#9fe870]">QHD / 1440p (2K)</td>
                            <td class="font-mono font-bold">2560 × 1440 px</td>
                            <td class="font-mono">16:9 Wide</td>
                            <td class="font-mono">2560 × 1440 (1.0x) or 1280 × 720 (2.0x)</td>
                            <td>Sweet spot for PC gaming monitors &amp; 27-inch iMacs</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-[#163300] dark:text-[#9fe870]">Full HD / 1080p (FHD)</td>
                            <td class="font-mono font-bold">1920 × 1080 px</td>
                            <td class="font-mono">16:9 Wide</td>
                            <td class="font-mono">1920 × 1080 (1.0x DPR)</td>
                            <td class="font-bold text-success font-mono">Most popular global desktop resolution (~22%)</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">MacBook Liquid Retina</td>
                            <td class="font-mono">3024 × 1964 px</td>
                            <td class="font-mono">16:10 Pro</td>
                            <td class="font-mono">1512 × 982 (2.0x DPR)</td>
                            <td>Apple MacBook Pro 14" M-series laptops</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">Modern Flagship Mobile</td>
                            <td class="font-mono">1179 × 2556 px</td>
                            <td class="font-mono">19.5:9 Tall</td>
                            <td class="font-mono font-bold text-success">393 × 852 (3.0x DPR)</td>
                            <td>Apple iPhone 15/16 Pro &amp; Samsung Galaxy S24 baseline</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</x-card>

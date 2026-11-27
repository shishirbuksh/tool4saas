<x-card class="p-6 md:p-8" x-data="{
    code: 'function calculateNetWorth(assets, debts) {\n  return assets.reduce((a, b) => a + b, 0) - debts;\n}',
    theme: 'gradient-dark',
    language: 'javascript',
    exporting: false,
    exportError: '',
    downloadPng() {
        this.exporting = true;
        this.exportError = '';
        try {
            const lines = (this.code || '').split('\n');
            const canvas = document.createElement('canvas');
            const scale = 2;
            const padding = 48;
            const boxPad = 24;
            const lineHeight = 22;
            const width = 760;
            const height = padding * 2 + 44 + Math.max(1, lines.length) * lineHeight + boxPad * 2;
            canvas.width = width * scale;
            canvas.height = height * scale;
            const ctx = canvas.getContext('2d');
            ctx.scale(scale, scale);

            const grad = ctx.createLinearGradient(0, 0, width, height);
            if (this.theme === 'gradient-dark') {
                grad.addColorStop(0, '#163300');
                grad.addColorStop(1, '#242a20');
            } else if (this.theme === 'gradient-purple') {
                grad.addColorStop(0, '#4f46e5');
                grad.addColorStop(1, '#7c3aed');
            } else {
                grad.addColorStop(0, '#0284c7');
                grad.addColorStop(1, '#0369a1');
            }
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, width, height);

            const bx = padding;
            const by = padding;
            const bw = width - padding * 2;
            const bh = height - padding * 2;
            ctx.fillStyle = '#0e0f0c';
            ctx.beginPath();
            ctx.roundRect(bx, by, bw, bh, 16);
            ctx.fill();

            ['#ef4444', '#f59e0b', '#10b981'].forEach((c, idx) => {
                ctx.fillStyle = c;
                ctx.beginPath();
                ctx.arc(bx + 22 + idx * 18, by + 22, 5.5, 0, Math.PI * 2);
                ctx.fill();
            });

            ctx.font = '14px monospace';
            ctx.fillStyle = '#9fe870';
            lines.forEach((line, idx) => {
                ctx.fillText(line.slice(0, 88), bx + boxPad, by + 56 + idx * lineHeight);
            });

            canvas.toBlob((blob) => {
                if (!blob) return;
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'code-snippet.png';
                a.click();
                setTimeout(() => URL.revokeObjectURL(url), 1000);
            }, 'image/png');
        } catch (err) {
            this.exportError = 'Could not render snippet image in this browser.';
        } finally {
            this.exporting = false;
        }
    },
    printPng() {
        window.print();
    }
}">
    <div class="space-y-6">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-2 text-base-content/70">Syntax Language</label>
                <select aria-label="Syntax Language" x-model="language" class="select select-bordered w-full rounded-[12px] text-sm">
                    <option value="javascript">JavaScript / TypeScript</option>
                    <option value="php">PHP / Blade</option>
                    <option value="python">Python</option>
                    <option value="html">HTML / CSS</option>
                </select>
            </div>

            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-2 text-base-content/70">Card Gradient Theme</label>
                <select aria-label="Card Gradient Theme" x-model="theme" class="select select-bordered w-full rounded-[12px] text-sm">
                    <option value="gradient-dark">Wise Deep Forest (#163300)</option>
                    <option value="gradient-purple">Synthwave Purple</option>
                    <option value="gradient-blue">Cyber Blue</option>
                </select>
            </div>
        </div>

        <div>
            <textarea aria-label="Code" x-model="code" rows="5" class="textarea textarea-bordered w-full rounded-[16px] font-mono text-xs bg-base-100 dark:bg-base-200"></textarea>
        </div>

        <!-- Rendered Code Frame -->
        <div id="code-print" class="p-8 rounded-[24px] shadow-lg flex items-center justify-center transition-all"
             :style="theme === 'gradient-dark' ? 'background: linear-gradient(135deg, #163300 0%, #242a20 100%)' : (theme === 'gradient-purple' ? 'background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)' : 'background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%)')">
            <div class="w-full max-w-xl rounded-[16px] bg-[#0f172a] text-white p-5 shadow-2xl border border-white/10 font-mono text-xs">
                <!-- Mac Dots -->
                <div class="flex items-center gap-1.5 mb-4">
                    <div class="w-3 h-3 rounded-full bg-[#ef4444]"></div>
                    <div class="w-3 h-3 rounded-full bg-[#f59e0b]"></div>
                    <div class="w-3 h-3 rounded-full bg-[#10b981]"></div>
                </div>
                <pre class="overflow-x-auto whitespace-pre leading-relaxed text-[#9fe870]" x-text="code"></pre>
            </div>
        </div>

        <div x-show="exportError" x-cloak class="alert alert-error rounded-2xl text-xs font-semibold" x-text="exportError"></div>

        <div class="flex flex-wrap gap-3">
            <button type="button" @click="downloadPng()" :disabled="exporting" class="btn btn-primary rounded-[12px] font-bold min-h-[44px]">
                Download PNG Image (2x Retina)
            </button>
            <button type="button" @click="printPng()" class="btn btn-outline rounded-[12px] font-bold min-h-[44px]">
                Print / Save PDF
            </button>
        </div>

        {{-- Technical Comparison: Code Snippet Social Export Resolutions Matrix --}}
        <div class="mt-8 pt-6 border-t border-base-300">
            <h3 class="font-bold text-base sm:text-lg text-base-content font-display mb-4">
                Code Snippet Social Export Resolutions, Aspect Ratios &amp; Retina Scaling Matrix
            </h3>
            <div class="overflow-x-auto rounded-3xl border border-base-300">
                <table class="table table-zebra w-full text-xs sm:text-sm">
                    <thead class="bg-base-200 text-base-content/70 uppercase text-[11px] font-mono">
                        <tr>
                            <th>Publishing Platform</th>
                            <th>Recommended Dimensions (1x)</th>
                            <th>Retina Export (2x DPR)</th>
                            <th>Aspect Ratio</th>
                            <th>Rendering &amp; Compression Standard</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="font-bold font-mono text-[#163300] dark:text-[#9fe870]">Twitter / X In-Feed</td>
                            <td class="font-mono">1200 × 675 px</td>
                            <td class="font-mono font-bold text-success">2400 × 1350 px</td>
                            <td class="font-mono">16:9 Landscape</td>
                            <td>PNG-24 or WebP (Avoids aggressive JPEG artifacts)</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-[#163300] dark:text-[#9fe870]">LinkedIn Post Banner</td>
                            <td class="font-mono">1200 × 627 px</td>
                            <td class="font-mono font-bold text-success">2400 × 1254 px</td>
                            <td class="font-mono">1.91:1 Landscape</td>
                            <td>High contrast font rendering for desktop feed</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-[#163300] dark:text-[#9fe870]">Blog Open Graph (og:image)</td>
                            <td class="font-mono">1200 × 630 px</td>
                            <td class="font-mono font-bold text-success">2400 × 1260 px</td>
                            <td class="font-mono">1.91:1 Universal</td>
                            <td>Cached by Facebook, Slack, iMessage &amp; Discord link crawlers</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">Instagram Feed / Carousel</td>
                            <td class="font-mono">1080 × 1080 px / 1350 px</td>
                            <td class="font-mono">2160 × 2700 px</td>
                            <td class="font-mono">1:1 Square / 4:5 Portrait</td>
                            <td>Mobile vertical viewport maximization</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">Technical Documentation / PDF</td>
                            <td class="font-mono">1600 × 900 px</td>
                            <td class="font-mono font-bold">3200 × 1800 px (300 DPI)</td>
                            <td class="font-mono">16:9 Desktop</td>
                            <td>Lossless PNG for crisp vector-like text print readability</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</x-card>

<x-tool-paper x-data="{
    mode: 'encode',
    dataUrl: '',
    base64Input: '',
    fileName: '',
    fileSize: '',
    copied: false,
    handleFile(e) {
        const file = e.target.files ? e.target.files[0] : (e.dataTransfer ? e.dataTransfer.files[0] : null);
        if (!file || !file.type.startsWith('image/')) return;
        this.fileName = file.name;
        this.fileSize = (file.size / 1024).toFixed(1) + ' KB';
        const reader = new FileReader();
        reader.onload = (ev) => {
            this.dataUrl = ev.target.result;
        };
        reader.readAsDataURL(file);
    },
    copy(text) {
        if (!text) return;
        navigator.clipboard.writeText(text);
        this.copied = true;
        setTimeout(() => this.copied = false, 2000);
    },
    copyImgTag() {
        this.copy('&lt;img src=&quot;' + this.dataUrl + '&quot; alt=&quot;' + this.fileName + '&quot;&gt;');
    },
    copyCss() {
        this.copy('background-image: url(&quot;' + this.dataUrl + '&quot;);');
    },
    downloadDecoded() {
        if (!this.base64Input) return;
        const a = document.createElement('a');
        a.href = this.base64Input;
        a.download = 'decoded-image.png';
        a.click();
    }
}">
    <div class="space-y-6">
        <div class="flex items-center gap-2 p-1.5 rounded-full bg-base-200 border border-base-300 w-fit">
            <button
                type="button"
                @click="mode = 'encode'"
                class="px-5 py-2 rounded-full text-xs font-bold transition-all"
                :class="mode === 'encode' ? 'bg-primary text-primary-content shadow-xs' : 'text-base-content/70 hover:text-base-content'"
            >
                Image to Base64
            </button>
            <button
                type="button"
                @click="mode = 'decode'"
                class="px-5 py-2 rounded-full text-xs font-bold transition-all"
                :class="mode === 'decode' ? 'bg-primary text-primary-content shadow-xs' : 'text-base-content/70 hover:text-base-content'"
            >
                Base64 to Image
            </button>
        </div>

        {{-- Mode: Encode --}}
        <template x-if="mode === 'encode'">
            <div class="space-y-6">
                {{-- Drop Zone --}}
                <div
                    @dragover.prevent
                    @drop.prevent="handleFile($event)"
                    class="border-2 border-dashed border-base-300 rounded-3xl p-8 sm:p-12 text-center hover:border-primary transition-colors bg-base-100 cursor-pointer"
                    @click="$refs.fileInput.click()"
                >
                    <input type="file" x-ref="fileInput" @change="handleFile($event)" accept="image/*" class="hidden" />
                    <div class="size-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                        📁
                    </div>
                    <h3 class="text-lg font-bold text-base-content font-display">Drag &amp; drop your image here</h3>
                    <p class="text-xs text-base-content/60 mt-1">PNG, JPG, SVG, WebP, GIF supported · 100% in-browser processing</p>
                    <span class="btn btn-sm btn-primary rounded-full mt-4 font-bold">Browse Local File</span>
                </div>

                {{-- Result Preview & Formats --}}
                <template x-if="dataUrl">
                    <div class="space-y-6">
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                            <div class="p-4 rounded-3xl bg-base-100 border border-base-300 flex items-center justify-center max-h-64 overflow-hidden">
                                <img :src="dataUrl" alt="Uploaded preview" class="max-h-56 max-w-full rounded-2xl object-contain" />
                            </div>
                            <div class="space-y-3">
                                <div class="p-4 rounded-2xl bg-base-200/50 border border-base-300 space-y-1">
                                    <span class="text-[10px] uppercase font-bold text-base-content/60 font-mono">File Details</span>
                                    <div class="text-sm font-bold text-base-content truncate" x-text="fileName"></div>
                                    <div class="text-xs text-base-content/70 font-mono" x-text="fileSize"></div>
                                </div>
                                <div class="flex flex-wrap gap-2">
                                    <button
                                        type="button"
                                        @click="copy(dataUrl)"
                                        class="px-4 py-2 rounded-full bg-primary text-primary-content hover:bg-primary/90 text-xs font-bold transition-all shadow-xs"
                                    >
                                        <span x-text="copied ? 'Copied Data URL!' : 'Copy Base64 Data URL'"></span>
                                    </button>
                                    <button
                                        type="button"
                                        @click="copyImgTag()"
                                        class="px-4 py-2 rounded-full bg-base-200 hover:bg-base-300 text-xs font-bold transition-all"
                                    >
                                        Copy &lt;img&gt; Tag
                                    </button>
                                    <button
                                        type="button"
                                        @click="copyCss()"
                                        class="px-4 py-2 rounded-full bg-base-200 hover:bg-base-300 text-xs font-bold transition-all"
                                    >
                                        Copy CSS
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label class="block text-xs font-bold uppercase tracking-wider text-base-content/60 font-mono mb-2">Full Base64 Encoded String</label>
                            <textarea x-model="dataUrl" readonly rows="5" class="textarea textarea-bordered rounded-2xl w-full text-xs font-mono p-4 bg-base-200/40 select-all"></textarea>
                        </div>
                    </div>
                </template>
            </div>
        </template>

        {{-- Mode: Decode --}}
        <template x-if="mode === 'decode'">
            <div class="space-y-6">
                <div>
                    <label class="block text-xs font-bold uppercase tracking-wider text-base-content/60 font-mono mb-2">Paste Base64 Data URL</label>
                    <textarea
                        x-model="base64Input"
                        rows="6"
                        placeholder="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."
                        class="textarea textarea-bordered rounded-3xl w-full text-xs font-mono p-4 bg-base-100"
                    ></textarea>
                </div>

                <template x-if="base64Input.trim().startsWith('data:image/')">
                    <div class="space-y-4">
                        <div class="flex items-center justify-between">
                            <span class="text-xs font-bold uppercase tracking-wider text-base-content/60 font-mono">Decoded Visual Output</span>
                            <button
                                type="button"
                                @click="downloadDecoded()"
                                class="px-5 py-2 rounded-full bg-primary text-primary-content hover:bg-primary/90 text-xs font-bold transition-all shadow-xs"
                            >
                                Download Image File
                            </button>
                        </div>
                        <div class="p-6 rounded-3xl bg-base-100 border border-base-300 flex items-center justify-center">
                            <img :src="base64Input" alt="Decoded preview" class="max-h-72 max-w-full rounded-2xl object-contain shadow-xs" />
                        </div>
                    </div>
                </template>
            </div>
        </template>

        {{-- Technical Comparison: Base64 Inlining vs. External HTTP Asset Loading Matrix --}}
        <div class="mt-8 pt-6 border-t border-base-300">
            <h3 class="font-bold text-base sm:text-lg text-base-content font-display mb-4">
                Base64 Data URI Inlining vs. External HTTP/2 &amp; HTTP/3 Asset Delivery Matrix
            </h3>
            <div class="overflow-x-auto rounded-3xl border border-base-300">
                <table class="table table-zebra w-full text-xs sm:text-sm">
                    <thead class="bg-base-200 text-base-content/70 uppercase text-[11px] font-mono">
                        <tr>
                            <th>Delivery Architecture</th>
                            <th>Payload Size Overhead</th>
                            <th>Browser Cacheability</th>
                            <th>HTML / CSS Parse Impact</th>
                            <th>Optimal Production Use Case</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="font-bold font-mono text-primary">Base64 Data URI Inlined</td>
                            <td class="font-mono text-error font-bold">+33.3% size penalty (4:3 byte ratio)</td>
                            <td class="text-error font-semibold">Tied to HTML/CSS cache (no separate asset cache)</td>
                            <td class="text-warning font-semibold">Blocks DOM/CSSOM parsing if &gt; 5 KB</td>
                            <td>Tiny SVG icons (&lt; 2 KB), email signature badges, single-file HTML apps</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-primary">External HTTP/2 &amp; 3 Asset</td>
                            <td class="font-mono font-bold text-success">Zero penalty (Binary transmission)</td>
                            <td class="text-success font-bold">Independent HTTP 304 / Cache-Control headers</td>
                            <td class="text-success font-bold">Non-blocking parallel streaming</td>
                            <td>Hero banners, user avatars, content images, photo galleries</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">CSS Sprite Sheet</td>
                            <td class="font-mono">Moderate (Single combined binary)</td>
                            <td class="text-success font-semibold">Cached across entire user session</td>
                            <td>Zero parse block; requires background-position CSS</td>
                            <td>Legacy multi-icon systems with HTTP/1.1 multiplex limits</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">WebP / AVIF with Preload</td>
                            <td class="font-mono text-success font-bold">50% smaller than JPEG baseline</td>
                            <td class="text-success font-bold">Edge CDN cached with stale-while-revalidate</td>
                            <td class="text-success font-bold">LCP optimized via &lt;link rel=&quot;preload&quot;&gt;</td>
                            <td>Core Web Vitals LCP element optimization</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</x-tool-paper>

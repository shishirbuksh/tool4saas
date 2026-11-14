<x-layouts.app>
    @push('seo')
        <x-seo
            :title="$metaTitle"
            :description="$metaDescription"
            :canonical="$canonical"
            :isNoindex="$isNoindex"
            :jsonLd="$jsonLd"
        />
    @endpush

    <x-tool-page-shell
        :tool="$tool"
        :category="$category"
        :seeAlso="$seeAlso"
        :relatedTools="$relatedTools"
        :relatedHeading="$relatedHeading"
        :ymylType="$ymylType"
    >
        @if(view()->exists("tools.{$tool->slug}"))
            @include("tools.{$tool->slug}")
        @else
            {{-- Universal Interactive Client-Side Workspace --}}
            <x-tool-paper x-data="{
                input: '',
                output: '',
                copied: false,
                action: 'clean',
                async run() {
                    const str = this.input;
                    if (this.action === 'clean') {
                        this.output = str.replace(/[ \t]+/g, ' ').replace(/^\s+|\s+$/gm, '').trim();
                    } else if (this.action === 'upper') {
                        this.output = str.toUpperCase();
                    } else if (this.action === 'lower') {
                        this.output = str.toLowerCase();
                    } else if (this.action === 'base64') {
                        try {
                            const bytes = new TextEncoder().encode(str);
                            let binary = '';
                            for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
                            this.output = btoa(binary);
                        } catch (e) {
                            this.output = 'Encoding error';
                        }
                    } else if (this.action === 'hash') {
                        const bytes = new TextEncoder().encode(str);
                        const hash = await crypto.subtle.digest('SHA-256', bytes);
                        this.output = Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
                    }
                },
                copy() {
                    if (!this.output) return;
                    navigator.clipboard.writeText(this.output);
                    this.copied = true;
                    setTimeout(() => this.copied = false, 2000);
                },
                download() {
                    if (!this.output) return;
                    const blob = new Blob([this.output], { type: 'text/plain;charset=utf-8' });
                    const a = document.createElement('a');
                    a.href = URL.createObjectURL(blob);
                    a.download = '{{ $tool->slug }}-output.txt';
                    a.click();
                },
                clear() {
                    this.input = '';
                    this.output = '';
                }
            }">
                <div class="space-y-6">
                    {{-- Utility Action Bar --}}
                    <div class="flex flex-wrap items-center justify-between gap-3 p-2 rounded-2xl sm:rounded-full bg-base-200 border border-base-300">
                        <div class="flex flex-wrap items-center gap-1.5">
                            <button
                                type="button"
                                @click="action = 'clean'; run()"
                                class="px-4 py-1.5 rounded-full text-xs font-bold transition-all"
                                :class="action === 'clean' ? 'bg-primary text-primary-content shadow-xs' : 'bg-base-100 border border-base-300 text-base-content hover:border-primary'"
                            >
                                Clean &amp; Format
                            </button>
                            <button
                                type="button"
                                @click="action = 'upper'; run()"
                                class="px-4 py-1.5 rounded-full text-xs font-bold transition-all"
                                :class="action === 'upper' ? 'bg-primary text-primary-content shadow-xs' : 'bg-base-100 border border-base-300 text-base-content hover:border-primary'"
                            >
                                UPPERCASE
                            </button>
                            <button
                                type="button"
                                @click="action = 'lower'; run()"
                                class="px-4 py-1.5 rounded-full text-xs font-bold transition-all"
                                :class="action === 'lower' ? 'bg-primary text-primary-content shadow-xs' : 'bg-base-100 border border-base-300 text-base-content hover:border-primary'"
                            >
                                lowercase
                            </button>
                            <button
                                type="button"
                                @click="action = 'base64'; run()"
                                class="px-4 py-1.5 rounded-full text-xs font-bold transition-all"
                                :class="action === 'base64' ? 'bg-primary text-primary-content shadow-xs' : 'bg-base-100 border border-base-300 text-base-content hover:border-primary'"
                            >
                                Base64
                            </button>
                            <button
                                type="button"
                                @click="action = 'hash'; run()"
                                class="px-4 py-1.5 rounded-full text-xs font-bold transition-all"
                                :class="action === 'hash' ? 'bg-primary text-primary-content shadow-xs' : 'bg-base-100 border border-base-300 text-base-content hover:border-primary'"
                            >
                                SHA-256
                            </button>
                        </div>
                        <div class="flex items-center gap-2 pr-2">
                            <button
                                type="button"
                                @click="clear()"
                                class="px-3 py-1 rounded-full text-xs font-bold text-error hover:bg-error/10 transition-colors"
                            >
                                Clear
                            </button>
                        </div>
                    </div>

                    {{-- Workspace Grid --}}
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <div class="flex items-center justify-between mb-2">
                                <label class="block text-xs font-bold uppercase tracking-wider text-base-content/60 font-mono">Source Input</label>
                                <span class="text-xs text-base-content/50 font-mono">
                                    <span x-text="input.length"></span> chars · <span x-text="input.trim() ? input.trim().split(/\s+/).length : 0"></span> words
                                </span>
                            </div>
                            <textarea
                                x-model="input"
                                @input="run()"
                                rows="9"
                                placeholder="Paste or type text, code, or payload to process with {{ $tool->title }}..."
                                class="textarea textarea-bordered rounded-3xl w-full text-sm leading-relaxed p-5 bg-base-100 font-mono"
                            ></textarea>
                        </div>

                        <div>
                            <div class="flex items-center justify-between mb-2">
                                <label class="block text-xs font-bold uppercase tracking-wider text-base-content/60 font-mono">Processed Output</label>
                                <div class="flex items-center gap-2">
                                    <button
                                        type="button"
                                        @click="copy()"
                                        :disabled="!output"
                                        class="px-3 py-1 rounded-full bg-base-200 hover:bg-primary hover:text-primary-content text-xs font-bold transition-all disabled:opacity-50"
                                    >
                                        <span x-text="copied ? 'Copied!' : 'Copy'"></span>
                                    </button>
                                    <button
                                        type="button"
                                        @click="download()"
                                        :disabled="!output"
                                        class="px-3 py-1 rounded-full bg-base-200 hover:bg-primary hover:text-primary-content text-xs font-bold transition-all disabled:opacity-50"
                                    >
                                        Download
                                    </button>
                                </div>
                            </div>
                            <textarea
                                x-model="output"
                                readonly
                                rows="9"
                                placeholder="Processed results will appear here in real time..."
                                class="textarea textarea-bordered rounded-3xl bg-base-200/50 w-full text-sm leading-relaxed p-5 font-mono"
                            ></textarea>
                        </div>
                    </div>

                    {{-- Trust Banner --}}
                    <div class="p-4 rounded-2xl bg-[#0e0f0c] text-white border border-[#242a20] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
                        <span class="text-primary font-bold">✓ 100% Client-Side Privacy Guaranteed</span>
                        <span class="text-[#868685]">All computation runs in your browser. Zero bytes transferred to external servers.</span>
                    </div>
                </div>
            </x-tool-paper>
        @endif
    </x-tool-page-shell>
</x-layouts.app>

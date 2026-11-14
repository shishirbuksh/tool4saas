<x-tool-paper>
    <div x-data="{
        mode: 'encode',
        input: '',
        output: '',
        copied: false,
        transform() {
            if (!this.input) {
                this.output = '';
                return;
            }
            try {
                if (this.mode === 'encode') {
                    const bytes = new TextEncoder().encode(this.input);
                    let binary = '';
                    for (let i = 0; i < bytes.byteLength; i++) {
                        binary += String.fromCharCode(bytes[i]);
                    }
                    this.output = btoa(binary);
                } else {
                    const binary = atob(this.input.trim().replace(/\s+/g, ''));
                    const bytes = new Uint8Array(binary.length);
                    for (let i = 0; i < binary.length; i++) {
                        bytes[i] = binary.charCodeAt(i);
                    }
                    this.output = new TextDecoder().decode(bytes);
                }
            } catch (e) {
                this.output = 'Error: Invalid input for Base64 ' + this.mode + ' operation.';
            }
        },
        copy() {
            if (!this.output) return;
            navigator.clipboard.writeText(this.output);
            this.copied = true;
            setTimeout(() => this.copied = false, 2000);
        }
    }">
        {{-- Wise Pill Mode Switcher Tabs --}}
        <div class="flex gap-1.5 p-1.5 rounded-full bg-base-200 border border-base-300 mb-6 inline-flex">
            <button
                type="button"
                class="px-5 py-2 rounded-full font-bold text-xs sm:text-sm transition-all"
                :class="mode === 'encode' ? 'bg-primary text-primary-content shadow-xs' : 'text-base-content/70 hover:text-base-content hover:bg-base-100'"
                @click="mode = 'encode'; transform()"
            >
                Encode Base64
            </button>
            <button
                type="button"
                class="px-5 py-2 rounded-full font-bold text-xs sm:text-sm transition-all"
                :class="mode === 'decode' ? 'bg-primary text-primary-content shadow-xs' : 'text-base-content/70 hover:text-base-content hover:bg-base-100'"
                @click="mode = 'decode'; transform()"
            >
                Decode Base64
            </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            {{-- Input Area --}}
            <div>
                <label class="block text-sm font-semibold mb-2" x-text="mode === 'encode' ? 'Plain Text Input' : 'Base64 Encoded Text'"></label>
                <textarea
                    x-model="input"
                    @input="transform()"
                    rows="9"
                    placeholder="Enter text to convert..."
                    class="textarea textarea-bordered rounded-2xl w-full font-mono text-xs sm:text-sm leading-relaxed p-4 bg-base-100"
                ></textarea>
            </div>

            {{-- Output Area --}}
            <div>
                <div class="flex items-center justify-between mb-2">
                    <label class="block text-sm font-semibold" x-text="mode === 'encode' ? 'Base64 Output' : 'Decoded Text'"></label>
                    <button
                        type="button"
                        @click="copy()"
                        :disabled="!output"
                        class="px-3.5 py-1 rounded-full bg-base-200 hover:bg-primary hover:text-primary-content font-bold text-xs transition-all disabled:opacity-50"
                    >
                        <span x-text="copied ? 'Copied!' : 'Copy Result'"></span>
                    </button>
                </div>
                <textarea
                    x-model="output"
                    readonly
                    rows="9"
                    placeholder="Result will appear here..."
                    class="textarea textarea-bordered rounded-2xl bg-base-200/50 w-full font-mono text-xs sm:text-sm leading-relaxed p-4"
                ></textarea>
            </div>
        </div>
    </div>
</x-tool-paper>

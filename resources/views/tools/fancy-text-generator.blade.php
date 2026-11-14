<x-card class="p-6 md:p-8" x-data="{
    input: 'Tool4SaaS',
    copied: '',
    bold(str) {
        return str.replace(/[a-zA-Z]/g, c => {
            const code = c.charCodeAt(0);
            return String.fromCodePoint(code >= 97 ? 0x1D41A + code - 97 : 0x1D400 + code - 65);
        });
    },
    italic(str) {
        return str.replace(/[a-zA-Z]/g, c => {
            const code = c.charCodeAt(0);
            return String.fromCodePoint(code >= 97 ? 0x1D44E + code - 97 : 0x1D434 + code - 65);
        });
    },
    monospace(str) {
        return str.replace(/[a-zA-Z0-9]/g, c => {
            const code = c.charCodeAt(0);
            if (code >= 48 && code <= 57) return String.fromCodePoint(0x1D7F6 + code - 48);
            return String.fromCodePoint(code >= 97 ? 0x1D68A + code - 97 : 0x1D670 + code - 65);
        });
    },
    bubble(str) {
        return str.replace(/[a-zA-Z0-9]/g, c => {
            const code = c.charCodeAt(0);
            if (code >= 48 && code <= 57) return String.fromCodePoint(0x24EA + (code === 48 ? 0 : code - 48));
            return String.fromCodePoint(code >= 97 ? 0x24D0 + code - 97 : 0x24B6 + code - 65);
        });
    },
    copy(val, key) {
        navigator.clipboard.writeText(val);
        this.copied = key;
        setTimeout(() => this.copied = '', 2000);
    }
}">
    <div class="space-y-6">
        <div>
            <label class="block text-xs font-bold uppercase tracking-wider mb-2 text-base-content/70">Enter Normal Text</label>
            <input type="text" x-model="input" class="input input-bordered w-full rounded-[14px] text-lg font-bold" />
        </div>

        <div class="space-y-3">
            <div class="p-4 rounded-[14px] bg-base-200/50 border border-base-300 flex items-center justify-between">
                <div>
                    <span class="text-xs uppercase font-bold text-base-content/60 block">Bold Mathematical Unicode</span>
                    <span class="text-lg font-bold" x-text="bold(input)"></span>
                </div>
                <button type="button" @click="copy(bold(input), 'bold')" class="btn btn-sm btn-primary rounded-[8px]">
                    <span x-show="copied !== 'bold'">Copy</span>
                    <span x-show="copied === 'bold'" x-cloak>✓</span>
                </button>
            </div>

            <div class="p-4 rounded-[14px] bg-base-200/50 border border-base-300 flex items-center justify-between">
                <div>
                    <span class="text-xs uppercase font-bold text-base-content/60 block">Italicized Unicode</span>
                    <span class="text-lg font-bold" x-text="italic(input)"></span>
                </div>
                <button type="button" @click="copy(italic(input), 'italic')" class="btn btn-sm btn-primary rounded-[8px]">
                    <span x-show="copied !== 'italic'">Copy</span>
                    <span x-show="copied === 'italic'" x-cloak>✓</span>
                </button>
            </div>

            <div class="p-4 rounded-[14px] bg-base-200/50 border border-base-300 flex items-center justify-between">
                <div>
                    <span class="text-xs uppercase font-bold text-base-content/60 block">Monospace Code Typography</span>
                    <span class="text-lg font-mono font-bold" x-text="monospace(input)"></span>
                </div>
                <button type="button" @click="copy(monospace(input), 'mono')" class="btn btn-sm btn-primary rounded-[8px]">
                    <span x-show="copied !== 'mono'">Copy</span>
                    <span x-show="copied === 'mono'" x-cloak>✓</span>
                </button>
            </div>

            <div class="p-4 rounded-[14px] bg-base-200/50 border border-base-300 flex items-center justify-between">
                <div>
                    <span class="text-xs uppercase font-bold text-base-content/60 block">Circled / Bubble Letters</span>
                    <span class="text-lg font-bold" x-text="bubble(input)"></span>
                </div>
                <button type="button" @click="copy(bubble(input), 'bubble')" class="btn btn-sm btn-primary rounded-[8px]">
                    <span x-show="copied !== 'bubble'">Copy</span>
                    <span x-show="copied === 'bubble'" x-cloak>✓</span>
                </button>
            </div>
        </div>
    </div>
</x-card>

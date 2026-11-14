<x-card class="p-6 md:p-8" x-data="{
    mode: 'encode',
    input: '',
    copied: false,
    morseMap: {
        'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
        'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
        'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
        'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
        'Y': '-.--', 'Z': '--..', '0': '-----', '1': '.----', '2': '..---',
        '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...',
        '8': '---..', '9': '----.', ' ': '/'
    },
    get output() {
        if (!this.input) return '';
        if (this.mode === 'encode') {
            return this.input.toUpperCase().split('').map(c => this.morseMap[c] || c).join(' ');
        } else {
            const rev = {};
            for (const [k, v] of Object.entries(this.morseMap)) { rev[v] = k; }
            return this.input.trim().split(/\s+/).map(c => rev[c] || (c === '/' ? ' ' : '')).join('');
        }
    },
    copy() {
        if (!this.output) return;
        navigator.clipboard.writeText(this.output);
        this.copied = true;
        setTimeout(() => this.copied = false, 2000);
    }
}">
    <div class="space-y-6">
        <div class="flex items-center justify-between">
            <div class="join">
                <button type="button" @click="mode = 'encode'" class="btn btn-sm join-item" :class="mode === 'encode' ? 'btn-primary' : 'btn-outline'">Text to Morse</button>
                <button type="button" @click="mode = 'decode'" class="btn btn-sm join-item" :class="mode === 'decode' ? 'btn-primary' : 'btn-outline'">Morse to Text</button>
            </div>
            <button type="button" @click="input = ''" class="btn btn-ghost btn-sm rounded-[10px]">Clear</button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-2 text-base-content/70" x-text="mode === 'encode' ? 'Standard English Input' : 'Morse Code Input (. and -)'"></label>
                <textarea
                    x-model="input"
                    rows="6"
                    :placeholder="mode === 'encode' ? 'Type English text here (e.g. SOS)...' : 'Type Morse code here (e.g. ... --- ...)...'"
                    class="textarea textarea-bordered w-full rounded-[16px] text-base font-mono bg-base-100 dark:bg-base-200"
                ></textarea>
            </div>

            <div>
                <div class="flex justify-between items-center mb-2">
                    <label class="text-xs font-bold uppercase tracking-wider text-base-content/70" x-text="mode === 'encode' ? 'Translated Morse Output' : 'Translated English Output'"></label>
                    <button type="button" @click="copy()" :disabled="!output" class="btn btn-xs btn-primary rounded-[8px]">
                        <span x-show="!copied">Copy Output</span>
                        <span x-show="copied" x-cloak>✓ Copied</span>
                    </button>
                </div>
                <div class="p-4 rounded-[16px] bg-base-200/50 border border-base-300 min-h-[148px] font-mono text-base break-all" x-text="output || 'Output will appear in real time...'"></div>
            </div>
        </div>
    </div>
</x-card>

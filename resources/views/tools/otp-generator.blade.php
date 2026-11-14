<x-card class="p-6 md:p-8" x-data="{
    length: 6,
    code: '',
    copied: false,
    generate() {
        const arr = new Uint32Array(1);
        crypto.getRandomValues(arr);
        const max = Math.pow(10, parseInt(this.length) || 6);
        const num = arr[0] % max;
        this.code = num.toString().padStart(parseInt(this.length) || 6, '0');
    },
    copy() {
        if (!this.code) return;
        navigator.clipboard.writeText(this.code);
        this.copied = true;
        setTimeout(() => this.copied = false, 2000);
    },
    init() {
        this.generate();
    }
}">
    <div class="space-y-6">
        <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
                <span class="text-xs font-bold uppercase tracking-wider text-base-content/70">Passcode Digits</span>
                <div class="join">
                    <button type="button" @click="length = 4; generate()" class="btn btn-sm join-item" :class="length === 4 ? 'btn-primary' : 'btn-outline'">4 Digits</button>
                    <button type="button" @click="length = 6; generate()" class="btn btn-sm join-item" :class="length === 6 ? 'btn-primary' : 'btn-outline'">6 Digits</button>
                    <button type="button" @click="length = 8; generate()" class="btn btn-sm join-item" :class="length === 8 ? 'btn-primary' : 'btn-outline'">8 Digits</button>
                </div>
            </div>

            <button type="button" @click="generate()" class="btn btn-outline btn-sm rounded-[10px]">
                ⟳ Refresh Code
            </button>
        </div>

        <div class="p-8 rounded-[24px] bg-[#163300] text-white flex flex-col items-center justify-center">
            <span class="text-xs uppercase tracking-widest text-[#9fe870] font-bold font-mono">Cryptographically Secure OTP</span>
            <p class="font-mono text-5xl sm:text-6xl font-black mt-3 text-[#9fe870] tracking-[0.25em]" x-text="code"></p>
            <p class="text-xs text-white/60 mt-3">Generated using Web Crypto CSPRNG</p>
        </div>

        <div class="flex justify-center">
            <button type="button" @click="copy()" class="btn btn-primary rounded-[12px] font-bold px-8">
                <span x-show="!copied">Copy One-Time Code</span>
                <span x-show="copied" x-cloak>✓ Copied to Clipboard!</span>
            </button>
        </div>
    </div>
</x-card>

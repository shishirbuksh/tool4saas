<x-card class="p-6 md:p-8" x-data="{
    c1: '#9fe870',
    c2: '#163300',
    angle: 135,
    type: 'linear',
    copied: false,
    get gradientCss() {
        return this.type === 'linear'
            ? 'linear-gradient(' + this.angle + 'deg, ' + this.c1 + ', ' + this.c2 + ')'
            : 'radial-gradient(circle, ' + this.c1 + ', ' + this.c2 + ')';
    },
    copyCss() {
        navigator.clipboard.writeText('background: ' + this.gradientCss + ';');
        this.copied = true;
        setTimeout(() => this.copied = false, 2000);
    }
}">
    <div class="space-y-6">
        <div class="h-44 rounded-[20px] shadow-inner border border-base-300 transition-all duration-300" :style="'background: ' + gradientCss"></div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-2 text-base-content/70">Color 1</label>
                <div class="flex items-center gap-2">
                    <input type="color" x-model="c1" class="w-10 h-10 rounded-[10px] cursor-pointer border-0 bg-transparent" />
                    <input type="text" x-model="c1" class="input input-sm input-bordered rounded-[8px] font-mono w-28 uppercase" />
                </div>
            </div>

            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-2 text-base-content/70">Color 2</label>
                <div class="flex items-center gap-2">
                    <input type="color" x-model="c2" class="w-10 h-10 rounded-[10px] cursor-pointer border-0 bg-transparent" />
                    <input type="text" x-model="c2" class="input input-sm input-bordered rounded-[8px] font-mono w-28 uppercase" />
                </div>
            </div>

            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-2 text-base-content/70">Type</label>
                <div class="join">
                    <button type="button" @click="type = 'linear'" class="btn btn-sm join-item" :class="type === 'linear' ? 'btn-primary' : 'btn-outline'">Linear</button>
                    <button type="button" @click="type = 'radial'" class="btn btn-sm join-item" :class="type === 'radial' ? 'btn-primary' : 'btn-outline'">Radial</button>
                </div>
            </div>

            <div x-show="type === 'linear'">
                <div class="flex justify-between items-center mb-1">
                    <label class="text-xs font-bold uppercase tracking-wider text-base-content/70">Angle</label>
                    <span class="text-xs font-mono font-bold" x-text="angle + '°'"></span>
                </div>
                <input type="range" min="0" max="360" step="5" x-model="angle" class="range range-primary range-sm" />
            </div>
        </div>

        <div class="p-4 bg-base-200/50 rounded-[16px] border border-base-300 space-y-2">
            <div class="flex justify-between items-center">
                <span class="text-xs font-bold uppercase tracking-wider text-base-content/70">CSS Snippet</span>
                <button type="button" @click="copyCss()" class="btn btn-sm btn-primary rounded-[10px]">
                    <span x-show="!copied">Copy CSS</span>
                    <span x-show="copied" x-cloak>✓ Copied!</span>
                </button>
            </div>
            <code class="block font-mono text-sm bg-base-100 p-3 rounded-[10px] text-primary break-all" x-text="'background: ' + gradientCss + ';'"></code>
        </div>
    </div>
</x-card>

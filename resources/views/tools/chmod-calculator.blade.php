<x-card class="p-6 md:p-8" x-data="{
    uR: true, uW: true, uX: true,
    gR: true, gW: false, gX: true,
    oR: true, oW: false, oX: true,
    get octal() {
        const u = (this.uR ? 4 : 0) + (this.uW ? 2 : 0) + (this.uX ? 1 : 0);
        const g = (this.gR ? 4 : 0) + (this.gW ? 2 : 0) + (this.gX ? 1 : 0);
        const o = (this.oR ? 4 : 0) + (this.oW ? 2 : 0) + (this.oX ? 1 : 0);
        return '' + u + g + o;
    },
    get symbolic() {
        return (this.uR ? 'r' : '-') + (this.uW ? 'w' : '-') + (this.uX ? 'x' : '-') +
               (this.gR ? 'r' : '-') + (this.gW ? 'w' : '-') + (this.gX ? 'x' : '-') +
               (this.oR ? 'r' : '-') + (this.oW ? 'w' : '-') + (this.oX ? 'x' : '-');
    }
}">
    <div class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- Owner -->
            <div class="p-5 rounded-[16px] bg-base-200/50 border border-base-300 space-y-3">
                <span class="text-xs uppercase font-bold text-base-content/70">Owner (User)</span>
                <label class="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" x-model="uR" class="checkbox checkbox-primary rounded-[6px]" />
                    <span class="text-sm font-semibold">Read (4)</span>
                </label>
                <label class="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" x-model="uW" class="checkbox checkbox-primary rounded-[6px]" />
                    <span class="text-sm font-semibold">Write (2)</span>
                </label>
                <label class="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" x-model="uX" class="checkbox checkbox-primary rounded-[6px]" />
                    <span class="text-sm font-semibold">Execute (1)</span>
                </label>
            </div>

            <!-- Group -->
            <div class="p-5 rounded-[16px] bg-base-200/50 border border-base-300 space-y-3">
                <span class="text-xs uppercase font-bold text-base-content/70">Group</span>
                <label class="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" x-model="gR" class="checkbox checkbox-primary rounded-[6px]" />
                    <span class="text-sm font-semibold">Read (4)</span>
                </label>
                <label class="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" x-model="gW" class="checkbox checkbox-primary rounded-[6px]" />
                    <span class="text-sm font-semibold">Write (2)</span>
                </label>
                <label class="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" x-model="gX" class="checkbox checkbox-primary rounded-[6px]" />
                    <span class="text-sm font-semibold">Execute (1)</span>
                </label>
            </div>

            <!-- Others -->
            <div class="p-5 rounded-[16px] bg-base-200/50 border border-base-300 space-y-3">
                <span class="text-xs uppercase font-bold text-base-content/70">Others (Public)</span>
                <label class="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" x-model="oR" class="checkbox checkbox-primary rounded-[6px]" />
                    <span class="text-sm font-semibold">Read (4)</span>
                </label>
                <label class="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" x-model="oW" class="checkbox checkbox-primary rounded-[6px]" />
                    <span class="text-sm font-semibold">Write (2)</span>
                </label>
                <label class="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" x-model="oX" class="checkbox checkbox-primary rounded-[6px]" />
                    <span class="text-sm font-semibold">Execute (1)</span>
                </label>
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div class="p-6 rounded-[20px] bg-[#163300] text-white">
                <span class="text-xs uppercase tracking-widest text-[#9fe870] font-bold font-mono">Linux Octal Notation</span>
                <p class="font-mono text-5xl font-black mt-2 text-[#9fe870]" x-text="octal"></p>
                <p class="text-xs text-white/70 mt-2 font-mono" x-text="'chmod ' + octal + ' filename'"></p>
            </div>

            <div class="p-6 rounded-[20px] bg-base-200/50 border border-base-300">
                <span class="text-xs uppercase tracking-widest text-base-content/60 font-bold font-mono">Symbolic String</span>
                <p class="font-mono text-3xl font-extrabold mt-3 text-primary" x-text="symbolic"></p>
                <p class="text-xs text-base-content/60 mt-3 font-mono">ls -l permission representation</p>
            </div>
        </div>
    </div>
</x-card>

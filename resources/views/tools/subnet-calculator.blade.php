<x-card class="p-6 md:p-8" x-data="{
    ip: '192.168.1.1',
    cidr: 24,
    get netmask() {
        const mask = [];
        for (let i = 0; i < 4; i++) {
            const n = Math.min(this.cidr - i * 8, 8);
            mask.push(n > 0 ? (256 - Math.pow(2, 8 - n)) : 0);
        }
        return mask.join('.');
    },
    get usableHosts() {
        const n = 32 - parseInt(this.cidr);
        if (n <= 1) return 0;
        return Math.pow(2, n) - 2;
    },
    get totalIps() {
        const n = 32 - parseInt(this.cidr);
        return Math.pow(2, n);
    }
}">
    <div class="space-y-6">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-2 text-base-content/70">IPv4 Address</label>
                <input type="text" x-model="ip" class="input input-bordered w-full rounded-[12px] font-mono text-sm" />
            </div>

            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-2 text-base-content/70">Subnet Mask CIDR (/n)</label>
                <select x-model="cidr" class="select select-bordered w-full rounded-[12px] font-mono text-sm">
                    <template x-for="c in [8, 16, 20, 24, 25, 26, 27, 28, 29, 30, 32]" :key="c">
                        <option :value="c" x-text="'/' + c + ' (' + (32 - c === 0 ? 'Single Host' : Math.pow(2, 32 - c) + ' Total IPs') + ')'"></option>
                    </template>
                </select>
            </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
            <div class="p-5 rounded-[16px] bg-base-200/50 border border-base-300">
                <span class="text-xs uppercase font-bold text-base-content/60">Subnet Netmask</span>
                <p class="font-mono text-xl font-bold mt-1 text-primary" x-text="netmask"></p>
            </div>

            <div class="p-5 rounded-[16px] bg-[#163300] text-white">
                <span class="text-xs uppercase tracking-widest text-[#9fe870] font-bold font-mono">Usable Host Capacity</span>
                <p class="font-mono text-2xl font-extrabold mt-1 text-[#9fe870]" x-text="usableHosts.toLocaleString()"></p>
                <span class="text-xs text-white/60">Assignables IPs</span>
            </div>

            <div class="p-5 rounded-[16px] bg-base-200/50 border border-base-300">
                <span class="text-xs uppercase font-bold text-base-content/60">Total Block Size</span>
                <p class="font-mono text-xl font-bold mt-1" x-text="totalIps.toLocaleString() + ' IPs'"></p>
            </div>
        </div>
    </div>
</x-card>

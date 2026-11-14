<x-card class="p-6 md:p-8" x-data="{
    keyword: 'flow',
    industry: 'tech',
    copied: '',
    prefixes: ['Omni', 'Hyper', 'Nova', 'Pulse', 'Sync', 'Apex', 'Meta', 'Zen', 'Vivid', 'Nexus'],
    suffixes: ['ly', 'ify', 'hub', 'stack', 'lab', 'flow', 'base', 'craft', 'wave', 'forge'],
    get names() {
        if (!this.keyword.trim()) return [];
        const base = this.keyword.trim().toLowerCase();
        const capitalized = base.charAt(0).toUpperCase() + base.slice(1);
        const list = [];
        this.prefixes.forEach(p => list.push(p + capitalized));
        this.suffixes.forEach(s => list.push(capitalized + s));
        list.push(capitalized + ' AI', capitalized + ' Cloud', capitalized + ' Solutions', capitalized + ' Labs');
        return list;
    },
    copy(name) {
        navigator.clipboard.writeText(name);
        this.copied = name;
        setTimeout(() => this.copied = '', 2000);
    }
}">
    <div class="space-y-6">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-2 text-base-content/70">Seed Keyword</label>
                <input type="text" x-model="keyword" placeholder="e.g. cloud, pay, data, swift..." class="input input-bordered w-full rounded-[12px] font-bold text-sm" />
            </div>

            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-2 text-base-content/70">Industry Theme</label>
                <select x-model="industry" class="select select-bordered w-full rounded-[12px] text-sm">
                    <option value="tech">Tech & SaaS Software</option>
                    <option value="finance">Fintech & Banking</option>
                    <option value="commerce">E-Commerce & Retail</option>
                    <option value="creative">Design & Creative Studio</option>
                </select>
            </div>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            <template x-for="name in names" :key="name">
                <div class="p-4 rounded-[14px] bg-base-200/50 border border-base-300 flex items-center justify-between hover:border-primary transition-all">
                    <span class="font-bold text-sm text-[#163300] dark:text-[#9fe870]" x-text="name"></span>
                    <button type="button" @click="copy(name)" class="btn btn-ghost btn-xs rounded-[6px]">
                        <span x-show="copied !== name">Copy</span>
                        <span x-show="copied === name" x-cloak>✓</span>
                    </button>
                </div>
            </template>
        </div>
    </div>
</x-card>

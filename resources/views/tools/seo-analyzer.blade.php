<x-card class="p-6 md:p-8" x-data="{
    title: 'Tool4SaaS — 127 Free Online Developer & Productivity Tools',
    desc: 'Run 127 free online tools directly in your browser with zero data storage. Calculate finances, format code, compress images, and generate assets securely.',
    h1: '127 Free Online Tools with Maximum Privacy',
    get titleLen() { return this.title.length; },
    get descLen() { return this.desc.length; },
    get score() {
        let s = 100;
        if (this.titleLen < 40 || this.titleLen > 65) s -= 20;
        if (this.descLen < 120 || this.descLen > 165) s -= 20;
        if (!this.h1.trim()) s -= 30;
        return Math.max(10, s);
    }
}">
    <div class="space-y-6">
        <div>
            <div class="flex justify-between items-center mb-1">
                <label class="text-xs font-bold uppercase tracking-wider text-base-content/70">Page Meta Title</label>
                <span class="text-xs font-mono" :class="titleLen >= 50 && titleLen <= 60 ? 'text-success font-bold' : 'text-warning'" x-text="titleLen + ' / 60 chars'"></span>
            </div>
            <input type="text" x-model="title" class="input input-bordered w-full rounded-[12px] text-sm" />
        </div>

        <div>
            <div class="flex justify-between items-center mb-1">
                <label class="text-xs font-bold uppercase tracking-wider text-base-content/70">Meta Description</label>
                <span class="text-xs font-mono" :class="descLen >= 140 && descLen <= 160 ? 'text-success font-bold' : 'text-warning'" x-text="descLen + ' / 160 chars'"></span>
            </div>
            <textarea x-model="desc" rows="3" class="textarea textarea-bordered w-full rounded-[14px] text-sm leading-relaxed"></textarea>
        </div>

        <div>
            <label class="block text-xs font-bold uppercase tracking-wider mb-1 text-base-content/70">Primary H1 Heading</label>
            <input type="text" x-model="h1" class="input input-bordered w-full rounded-[12px] text-sm" />
        </div>

        <div class="p-6 rounded-[20px] bg-[#163300] text-white flex items-center justify-between">
            <div>
                <span class="text-xs uppercase tracking-widest text-[#9fe870] font-bold font-mono">On-Page SEO Health Score</span>
                <p class="font-mono text-4xl font-extrabold mt-1 text-[#9fe870]" x-text="score + ' / 100'"></p>
                <p class="text-xs text-white/70 mt-1">Evaluates SERP pixel constraints & tag coverage.</p>
            </div>
            <div class="badge badge-lg font-bold" :class="score >= 80 ? 'badge-primary' : 'badge-warning'" x-text="score >= 80 ? 'Optimal' : 'Needs Work'"></div>
        </div>
    </div>
</x-card>

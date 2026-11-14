<x-card class="p-6 md:p-8" x-data="{
    code: 'function calculateNetWorth(assets, debts) {\n  return assets.reduce((a, b) => a + b, 0) - debts;\n}',
    theme: 'gradient-dark',
    language: 'javascript',
    printPng() {
        window.print();
    }
}">
    <div class="space-y-6">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-2 text-base-content/70">Syntax Language</label>
                <select x-model="language" class="select select-bordered w-full rounded-[12px] text-sm">
                    <option value="javascript">JavaScript / TypeScript</option>
                    <option value="php">PHP / Blade</option>
                    <option value="python">Python</option>
                    <option value="html">HTML / CSS</option>
                </select>
            </div>

            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-2 text-base-content/70">Card Gradient Theme</label>
                <select x-model="theme" class="select select-bordered w-full rounded-[12px] text-sm">
                    <option value="gradient-dark">Wise Deep Forest (#163300)</option>
                    <option value="gradient-purple">Synthwave Purple</option>
                    <option value="gradient-blue">Cyber Blue</option>
                </select>
            </div>
        </div>

        <div>
            <textarea x-model="code" rows="5" class="textarea textarea-bordered w-full rounded-[16px] font-mono text-xs bg-base-100 dark:bg-base-200"></textarea>
        </div>

        <!-- Rendered Code Frame -->
        <div class="p-8 rounded-[24px] shadow-lg flex items-center justify-center transition-all"
             :style="theme === 'gradient-dark' ? 'background: linear-gradient(135deg, #163300 0%, #242a20 100%)' : (theme === 'gradient-purple' ? 'background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)' : 'background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%)')">
            <div class="w-full max-w-xl rounded-[16px] bg-[#0f172a] text-white p-5 shadow-2xl border border-white/10 font-mono text-xs">
                <!-- Mac Dots -->
                <div class="flex items-center gap-1.5 mb-4">
                    <div class="w-3 h-3 rounded-full bg-[#ef4444]"></div>
                    <div class="w-3 h-3 rounded-full bg-[#f59e0b]"></div>
                    <div class="w-3 h-3 rounded-full bg-[#10b981]"></div>
                </div>
                <pre class="overflow-x-auto whitespace-pre leading-relaxed text-[#9fe870]" x-text="code"></pre>
            </div>
        </div>

        <button type="button" @click="printPng()" class="btn btn-primary rounded-[12px] font-bold">
            Export Snippet Image / Print
        </button>
    </div>
</x-card>

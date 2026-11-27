<x-card class="p-6 md:p-8">
    <div class="space-y-6" x-data="{
        name: 'Alex Morgan',
        role: 'Senior Software Engineer',
        company: 'Stripe',
        skills: 'Laravel, TypeScript, Cloud Architecture, Microservices',
        copied: false,
        get letter() {
            return 'Dear Hiring Team at ' + (this.company || 'your organization') + ',\n\n' +
                   'I am writing to express my strong interest in the ' + (this.role || 'open position') + ' role. With a proven track record of delivering high-impact software solutions, I am confident in my ability to immediately add value to your engineering team.\n\n' +
                   'Throughout my career, I have specialized in ' + (this.skills || 'modern software engineering principles') + '. I pride myself on writing clean, accessible, and high-performance code that prioritizes user experience and enterprise security.\n\n' +
                   'Thank you for your time and consideration. I welcome the opportunity to discuss how my skill set aligns with your team\'s goals.\n\n' +
                   'Sincerely,\n' + (this.name || 'Your Name');
        },
        copy() {
            window.copyTextSafe(this.letter);
            this.copied = true;
            setTimeout(() => this.copied = false, 2000);
        }
    }">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-1 text-base-content/70">Your Full Name</label>
                <input aria-label="Your Full Name" type="text" x-model="name" class="input input-bordered w-full rounded-[12px] text-sm" />
            </div>
            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-1 text-base-content/70">Target Role Title</label>
                <input aria-label="Target Role Title" type="text" x-model="role" class="input input-bordered w-full rounded-[12px] text-sm" />
            </div>
            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-1 text-base-content/70">Target Company Name</label>
                <input aria-label="Target Company Name" type="text" x-model="company" class="input input-bordered w-full rounded-[12px] text-sm" />
            </div>
            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-1 text-base-content/70">Core Skills & Specialties</label>
                <input aria-label="Core Skills &amp; Specialties" type="text" x-model="skills" class="input input-bordered w-full rounded-[12px] text-sm" />
            </div>
        </div>

        <div>
            <div class="flex justify-between items-center mb-2">
                <label class="text-xs font-bold uppercase tracking-wider text-base-content/70">Generated Cover Letter</label>
                <button type="button" @click="copy()" class="btn btn-xs btn-primary rounded-[8px]">
                    <span x-show="!copied">Copy Letter</span>
                    <span x-show="copied" x-cloak>✓ Copied!</span>
                </button>
            </div>
            <textarea aria-label="Generated Cover Letter" readonly :value="letter" rows="10" class="textarea textarea-bordered w-full rounded-[16px] text-sm leading-relaxed bg-base-100 dark:bg-base-200"></textarea>
        </div>

        {{-- Technical Comparison: Professional Cover Letter Structures Matrix --}}
        <div class="mt-8 pt-6 border-t border-base-300">
            <h3 class="font-bold text-base sm:text-lg text-base-content font-display mb-4">
                Professional Cover Letter Formats, Tone &amp; Industry Alignment Matrix
            </h3>
            <div class="overflow-x-auto rounded-3xl border border-base-300">
                <table class="table table-zebra w-full text-xs sm:text-sm">
                    <thead class="bg-base-200 text-base-content/70 uppercase text-[11px] font-mono">
                        <tr>
                            <th>Cover Letter Style</th>
                            <th>Tone &amp; Vocabulary</th>
                            <th>Word Count Target</th>
                            <th>Core Value Proposition Focus</th>
                            <th>Target Industry Sectors</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="font-bold font-mono text-[#163300] dark:text-[#9fe870]">Modern Tech / SaaS</td>
                            <td>Direct, energetic, metrics-driven</td>
                            <td class="font-mono font-bold">200 – 300 words</td>
                            <td>Shipped products, revenue impact, technical stack proficiency</td>
                            <td>Software engineering, product management, DevOps, startups</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-[#163300] dark:text-[#9fe870]">Traditional Corporate</td>
                            <td>Formal, respectful, structured</td>
                            <td class="font-mono">300 – 400 words</td>
                            <td>Institutional tenure, compliance, established pedigree</td>
                            <td>Investment banking, law firms, healthcare, government</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">Creative Portfolio</td>
                            <td>Narrative storytelling, unique voice</td>
                            <td class="font-mono">250 – 350 words</td>
                            <td>Design philosophy, brand aesthetic, creative campaign ROI</td>
                            <td>UI/UX design, marketing agencies, copywriting, media</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-[#163300] dark:text-[#9fe870]">Executive Leadership</td>
                            <td>Visionary, strategic, P&amp;L focused</td>
                            <td class="font-mono">300 – 450 words</td>
                            <td>EBITDA growth, cross-functional leadership, enterprise transformation</td>
                            <td>VP, Director, C-suite (CTO, CMO, COO) recruitment</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</x-card>

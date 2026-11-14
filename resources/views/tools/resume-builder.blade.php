<x-tool-paper x-data="{
    name: 'Jane Doe',
    title: 'Senior Product Designer',
    email: 'jane.doe@example.com',
    phone: '+1 (555) 234-5678',
    location: 'San Francisco, CA',
    summary: 'Results-driven product designer and full-stack frontend engineer with 8+ years experience architecting local-first web applications and scalable design systems.',
    skills: 'UI/UX Design, Figma, Tailwind CSS, Alpine.js, Laravel, TypeScript, WCAG 2.2 Accessibility, Design Tokens',
    experiences: [
        {
            role: 'Lead Product Designer',
            company: 'Fintech Innovations Ltd',
            period: '2022 — Present',
            desc: 'Spearheaded redesign of cross-border payment flows, improving transaction conversion by 28%. Built and maintained company-wide accessible design system.'
        },
        {
            role: 'Senior UI/UX Engineer',
            company: 'CloudScale SaaS',
            period: '2018 — 2022',
            desc: 'Designed and shipped developer analytics dashboards and client-side visualization tools with sub-second latency across all modern browsers.'
        }
    ],
    educations: [
        {
            school: 'University of California, Berkeley',
            degree: 'B.S. in Human-Computer Interaction & Computer Science',
            period: '2014 — 2018'
        }
    ],
    addExperience() {
        this.experiences.push({ role: '', company: '', period: '', desc: '' });
    },
    removeExperience(index) {
        if (this.experiences.length > 1) {
            this.experiences.splice(index, 1);
        }
    },
    addEducation() {
        this.educations.push({ school: '', degree: '', period: '' });
    },
    removeEducation(index) {
        if (this.educations.length > 1) {
            this.educations.splice(index, 1);
        }
    },
    printResume() {
        window.print();
    }
}">
    {{-- Resume Toolbar --}}
    <div class="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-base-300">
        <div>
            <h2 class="text-xl font-bold text-base-content font-display">Resume Builder &amp; ATS Styler</h2>
            <p class="text-xs text-base-content/60 mt-0.5">Edit live and click Print/Save to export clean ATS-friendly PDF with no watermark.</p>
        </div>
        <div class="flex items-center gap-3">
            <button
                type="button"
                @click="printResume()"
                class="px-6 py-2.5 rounded-full bg-primary text-primary-content hover:bg-[#cdffad] font-bold text-sm transition-all shadow-xs flex items-center gap-2"
            >
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                <span>Print / Save PDF</span>
            </button>
        </div>
    </div>

    {{-- Printable Resume Paper Surface --}}
    <div id="resume-print" class="bg-base-100 rounded-2xl border border-base-300 p-6 sm:p-10 shadow-sm space-y-8">
        {{-- Resume Header --}}
        <div class="border-b border-base-300 pb-6">
            <input type="text" x-model="name" placeholder="Your Full Name" class="text-3xl sm:text-4xl font-black font-display text-base-content bg-transparent border-b border-transparent hover:border-base-300 focus:border-primary focus:outline-none w-full" />
            <input type="text" x-model="title" placeholder="Professional Headline / Title" class="text-base sm:text-lg font-bold text-primary bg-transparent border-b border-transparent hover:border-base-300 focus:border-primary focus:outline-none w-full mt-1" />
            <div class="flex flex-wrap items-center gap-3 mt-3 text-xs text-base-content/70">
                <input type="email" x-model="email" placeholder="email@domain.com" class="bg-transparent border-b border-base-300 focus:outline-none" />
                <span>·</span>
                <input type="text" x-model="phone" placeholder="+1 (555) 000-0000" class="bg-transparent border-b border-base-300 focus:outline-none" />
                <span>·</span>
                <input type="text" x-model="location" placeholder="City, State" class="bg-transparent border-b border-base-300 focus:outline-none" />
            </div>
        </div>

        {{-- Professional Summary --}}
        <div>
            <h3 class="text-xs font-bold uppercase tracking-wider text-primary font-mono mb-2">Professional Summary</h3>
            <textarea x-model="summary" rows="3" class="textarea textarea-bordered rounded-xl w-full text-sm leading-relaxed"></textarea>
        </div>

        {{-- Core Skills --}}
        <div>
            <h3 class="text-xs font-bold uppercase tracking-wider text-primary font-mono mb-2">Core Competencies &amp; Skills</h3>
            <input type="text" x-model="skills" placeholder="Comma-separated skills (e.g. Figma, React, Laravel, Product Strategy)" class="input input-bordered rounded-xl w-full text-sm" />
        </div>

        {{-- Experience Section --}}
        <div class="space-y-4">
            <div class="flex items-center justify-between">
                <h3 class="text-xs font-bold uppercase tracking-wider text-primary font-mono">Work Experience</h3>
                <button
                    type="button"
                    @click="addExperience()"
                    class="px-3.5 py-1 rounded-full border border-base-300 hover:border-primary text-xs font-bold text-base-content transition-colors"
                >
                    + Add Experience
                </button>
            </div>

            <template x-for="(exp, index) in experiences" :key="index">
                <div class="p-5 rounded-2xl bg-base-200/50 border border-base-300 space-y-3">
                    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full">
                            <input type="text" x-model="exp.role" placeholder="Job Title" class="input input-sm input-bordered rounded-xl font-bold text-sm" />
                            <input type="text" x-model="exp.company" placeholder="Company Name" class="input input-sm input-bordered rounded-xl text-sm" />
                        </div>
                        <button
                            type="button"
                            @click="removeExperience(index)"
                            class="btn btn-ghost btn-xs text-error self-end sm:self-auto"
                            :disabled="experiences.length <= 1"
                        >
                            ✕
                        </button>
                    </div>
                    <input type="text" x-model="exp.period" placeholder="Duration (e.g. 2021 — Present)" class="input input-xs input-bordered rounded-lg w-48 text-xs" />
                    <textarea x-model="exp.desc" rows="2" placeholder="Key responsibilities and measurable achievements..." class="textarea textarea-bordered rounded-xl w-full text-xs leading-relaxed"></textarea>
                </div>
            </template>
        </div>

        {{-- Education Section --}}
        <div class="space-y-4">
            <div class="flex items-center justify-between">
                <h3 class="text-xs font-bold uppercase tracking-wider text-primary font-mono">Education</h3>
                <button
                    type="button"
                    @click="addEducation()"
                    class="px-3.5 py-1 rounded-full border border-base-300 hover:border-primary text-xs font-bold text-base-content transition-colors"
                >
                    + Add Education
                </button>
            </div>

            <template x-for="(edu, index) in educations" :key="index">
                <div class="p-5 rounded-2xl bg-base-200/50 border border-base-300 space-y-3">
                    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full">
                            <input type="text" x-model="edu.school" placeholder="University / School" class="input input-sm input-bordered rounded-xl font-bold text-sm" />
                            <input type="text" x-model="edu.degree" placeholder="Degree / Major" class="input input-sm input-bordered rounded-xl text-sm" />
                        </div>
                        <button
                            type="button"
                            @click="removeEducation(index)"
                            class="btn btn-ghost btn-xs text-error self-end sm:self-auto"
                            :disabled="educations.length <= 1"
                        >
                            ✕
                        </button>
                    </div>
                    <input type="text" x-model="edu.period" placeholder="Graduation Year (e.g. 2016 — 2020)" class="input input-xs input-bordered rounded-lg w-48 text-xs" />
                </div>
            </template>
        </div>
    </div>
</x-tool-paper>

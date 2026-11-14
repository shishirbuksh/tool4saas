<x-card class="p-6 md:p-8" x-data="coverLetterBuilder()">
    <div class="space-y-6">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-1 text-base-content/70">Your Full Name</label>
                <input type="text" x-model="name" class="input input-bordered w-full rounded-[12px] text-sm" />
            </div>
            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-1 text-base-content/70">Target Role Title</label>
                <input type="text" x-model="role" class="input input-bordered w-full rounded-[12px] text-sm" />
            </div>
            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-1 text-base-content/70">Target Company Name</label>
                <input type="text" x-model="company" class="input input-bordered w-full rounded-[12px] text-sm" />
            </div>
            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-1 text-base-content/70">Core Skills & Specialties</label>
                <input type="text" x-model="skills" class="input input-bordered w-full rounded-[12px] text-sm" />
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
            <textarea readonly :value="letter" rows="10" class="textarea textarea-bordered w-full rounded-[16px] text-sm leading-relaxed bg-base-100 dark:bg-base-200"></textarea>
        </div>
    </div>
</x-card>

<script>
document.addEventListener('alpine:init', () => {
    Alpine.data('coverLetterBuilder', () => ({
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
            navigator.clipboard.writeText(this.letter);
            this.copied = true;
            setTimeout(() => this.copied = false, 2000);
        }
    }));
});
</script>

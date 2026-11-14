<x-layouts.app>
    @push('seo')
        <x-seo
            title="Contact Tool4SaaS Support & Feedback"
            description="Have a question, tool suggestion, or bug report? Get in touch with the Tool4SaaS editorial and engineering team."
            canonical="{{ route('contact') }}"
        />
    @endpush

    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <nav aria-label="Breadcrumb" class="breadcrumbs text-xs text-base-content/60 mb-6">
            <ul>
                <li><a href="{{ route('home') }}" class="hover:text-primary">Home</a></li>
                <li class="text-base-content font-medium">Contact</li>
            </ul>
        </nav>

        <h1 class="text-3xl sm:text-4xl font-black text-base-content tracking-tight mb-4">
            Contact Us
        </h1>
        <p class="text-base text-base-content/75 mb-8">
            Have a question, feedback, or a tool suggestion? We typically respond within two business days.
        </p>

        <x-tool-paper class="p-6 sm:p-8">
            <form action="{{ route('contact') }}" method="POST" class="space-y-5">
                @csrf
                <div class="form-control w-full">
                    <label class="label"><span class="label-text font-semibold text-sm">Your Name</span></label>
                    <input type="text" name="name" required placeholder="Jane Doe" class="input input-bordered rounded-xl w-full" />
                </div>

                <div class="form-control w-full">
                    <label class="label"><span class="label-text font-semibold text-sm">Email Address</span></label>
                    <input type="email" name="email" required placeholder="jane@example.com" class="input input-bordered rounded-xl w-full" />
                </div>

                <div class="form-control w-full">
                    <label class="label"><span class="label-text font-semibold text-sm">Message</span></label>
                    <textarea name="message" rows="5" required placeholder="Tell us what you need help with or suggest a tool..." class="textarea textarea-bordered rounded-xl w-full text-base"></textarea>
                </div>

                <button type="submit" class="btn btn-primary rounded-xl w-full sm:w-auto px-8">
                    Send Message
                </button>
            </form>
        </x-tool-paper>
    </div>
</x-layouts.app>

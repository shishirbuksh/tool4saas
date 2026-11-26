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

        @if(session('success'))
            <div class="alert alert-success rounded-2xl mb-8 font-semibold shadow-xs flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
                </svg>
                <span>{{ session('success') }}</span>
            </div>
        @endif

        @if($errors->any())
            <div role="alert" class="alert alert-error rounded-2xl mb-8 font-semibold shadow-xs">
                <ul class="list-disc pl-5 text-sm space-y-1">
                    @foreach($errors->all() as $err)
                        <li>{{ $err }}</li>
                    @endforeach
                </ul>
            </div>
        @endif

        <x-tool-paper class="p-6 sm:p-8">
            <form action="{{ route('contact') }}" method="POST" class="space-y-5">
                @csrf
                <div class="hidden" aria-hidden="true">
                    <label for="contact-website">Leave blank</label>
                    <input id="contact-website" type="text" name="website" tabindex="-1" autocomplete="off" />
                </div>

                <div class="form-control w-full">
                    <label for="contact-name" class="label"><span class="label-text font-semibold text-sm">Your Name</span></label>
                    <input id="contact-name" type="text" name="name" value="{{ old('name') }}" required placeholder="Jane Doe" class="input input-bordered rounded-xl w-full @error('name') input-error @enderror" />
                    @error('name')
                        <span class="text-xs text-error mt-1 font-medium">{{ $message }}</span>
                    @enderror
                </div>

                <div class="form-control w-full">
                    <label for="contact-email" class="label"><span class="label-text font-semibold text-sm">Email Address</span></label>
                    <input id="contact-email" type="email" name="email" value="{{ old('email') }}" required placeholder="jane@example.com" class="input input-bordered rounded-xl w-full @error('email') input-error @enderror" />
                    @error('email')
                        <span class="text-xs text-error mt-1 font-medium">{{ $message }}</span>
                    @enderror
                </div>

                <div class="form-control w-full">
                    <label for="contact-message" class="label"><span class="label-text font-semibold text-sm">Message</span></label>
                    <textarea id="contact-message" name="message" rows="5" required placeholder="Tell us what you need help with or suggest a tool..." class="textarea textarea-bordered rounded-xl w-full text-base @error('message') textarea-error @enderror">{{ old('message') }}</textarea>
                    @error('message')
                        <span class="text-xs text-error mt-1 font-medium">{{ $message }}</span>
                    @enderror
                </div>

                <button type="submit" class="btn btn-primary rounded-xl w-full sm:w-auto px-8 min-h-[44px]">
                    Send Message
                </button>
            </form>
        </x-tool-paper>
    </div>
</x-layouts.app>

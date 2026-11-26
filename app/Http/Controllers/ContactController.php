<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use Illuminate\Contracts\View\View;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

final class ContactController extends Controller
{
    public function show(): View
    {
        return view('pages.contact');
    }

    public function submit(Request $request): RedirectResponse
    {
        // Honeypot spam trap: silently ignore bot submissions that populate hidden field
        if (filled($request->input('website'))) {
            return back()->with('success', 'Thank you! Your message has been sent successfully. Our editorial team will review it within 48 hours.');
        }

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:100'],
            'email' => ['required', 'email', 'max:150'],
            'message' => ['required', 'string', 'max:3000'],
        ]);

        // Persist message via a dedicated contact log channel so LOG_LEVEL=error never suppresses submissions
        Log::build([
            'driver' => 'daily',
            'path' => storage_path('logs/contact.log'),
            'level' => 'info',
            'days' => 30,
        ])->info('Contact submission received', [
            'name' => str_replace(["\r", "\n"], ' ', (string) $validated['name']),
            'email' => str_replace(["\r", "\n"], ' ', (string) $validated['email']),
            'message' => trim((string) $validated['message']),
            'ip' => $request->ip(),
        ]);

        return back()->with('success', 'Thank you! Your message has been sent successfully. Our editorial team will review it within 48 hours.');
    }
}

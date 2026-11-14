@props([
    'class' => '',
])

<div {{ $attributes->merge(['class' => "bg-base-100 border border-base-300 shadow-sm p-6 sm:p-8 rounded-3xl {$class}"]) }}>
    {{ $slot }}
</div>

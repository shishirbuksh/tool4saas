@props([
    'label',
    'id' => null,
    'model' => null,
    'placeholder' => '',
    'helper' => null,
    'prefix' => null,
    'suffix' => null,
    'min' => null,
    'max' => null,
    'step' => 'any',
])

@php
    $id = $id ?? 'field-' . md5($label . $model);
@endphp

<div class="form-control w-full">
    <label for="{{ $id }}" class="label py-1">
        <span class="label-text font-semibold text-sm">{{ $label }}</span>
    </label>

    <div class="relative flex items-center">
        @if($prefix)
            <span class="absolute left-3 text-sm text-base-content/50 pointer-events-none font-medium">{{ $prefix }}</span>
        @endif

        <input
            type="number"
            id="{{ $id }}"
            inputmode="decimal"
            step="{{ $step }}"
            @if($min !== null) min="{{ $min }}" @endif
            @if($max !== null) max="{{ $max }}" @endif
            placeholder="{{ $placeholder }}"
            @if($model) x-model.number="{{ $model }}" @endif
            {{ $attributes->merge(['class' => 'input input-bordered w-full rounded-xl ' . ($prefix ? 'pl-8 ' : '') . ($suffix ? 'pr-8 ' : '')]) }}
        />

        @if($suffix)
            <span class="absolute right-3 text-sm text-base-content/50 pointer-events-none font-medium">{{ $suffix }}</span>
        @endif
    </div>

    @if($helper)
        <label class="label py-0.5">
            <span class="label-text-alt text-base-content/60">{{ $helper }}</span>
        </label>
    @endif
</div>

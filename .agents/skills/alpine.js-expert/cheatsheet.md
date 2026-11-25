# Alpine.js - Cheatsheet Référence Rapide

## Installation (Laravel + Vite)

```bash
npm install alpinejs
```

```javascript
// resources/js/app.js
import Alpine from 'alpinejs'
window.Alpine = Alpine
Alpine.start()
```

## Directives Core

| Directive      | Description                             | Exemple                                             |
| -------------- | --------------------------------------- | --------------------------------------------------- |
| `x-data`       | Déclare composant avec état             | `<div x-data="{ open: false }">`                    |
| `x-show`       | Toggle `display: none`                  | `<div x-show="open">`                               |
| `x-if`         | Ajoute/Retire du DOM (sur `<template>`) | `<template x-if="isAdmin">`                         |
| `x-for`        | Boucle (sur `<template>`)               | `<template x-for="user in users" :key="user.id">`   |
| `@click`       | Écoute événement (alias `x-on:`)        | `<button @click="count++">`                         |
| `:disabled`    | Lie attribut (alias `x-bind:`)          | `<input :value="name">`                             |
| `x-model`      | Binding bidirectionnel                  | `<input x-model="username">`                        |
| `x-text`       | Injecte texte                           | `<span x-text="count"></span>`                      |
| `x-html`       | Injecte HTML                            | `<div x-html="content"></div>`                      |
| `x-init`       | Exécuté à l'initialisation              | `<div x-init="loadData()">`                         |
| `x-cloak`      | Masque avant init Alpine                | `<div x-cloak>` + CSS `[x-cloak] { display: none }` |
| `x-transition` | Ajoute transitions CSS                  | `<div x-show="open" x-transition>`                  |
| `x-ref`        | Référence élément                       | `<input x-ref="emailField">`                        |

## Modificateurs d'Événements

| Modificateur      | Description               | Exemple                      |
| ----------------- | ------------------------- | ---------------------------- |
| `.prevent`        | `event.preventDefault()`  | `@submit.prevent="save()"`   |
| `.stop`           | `event.stopPropagation()` | `@click.stop`                |
| `.outside`        | Détecte clic en dehors    | `@click.outside="close()"`   |
| `.window`         | Écoute sur `window`       | `@keydown.window.escape`     |
| `.document`       | Écoute sur `document`     | `@scroll.document`           |
| `.once`           | Exécute une seule fois    | `@click.once`                |
| `.debounce`       | Debounce (300ms défaut)   | `@input.debounce="search()"` |
| `.debounce.500ms` | Debounce personnalisé     | `@input.debounce.500ms`      |
| `.throttle`       | Throttle (250ms défaut)   | `@scroll.throttle`           |
| `.self`           | Si `event.target === el`  | `@click.self`                |

## Modificateurs de Touches

| Modificateur             | Touche    | Exemple                     |
| ------------------------ | --------- | --------------------------- |
| `.enter`                 | Enter     | `@keydown.enter="submit()"` |
| `.escape`                | Escape    | `@keydown.escape="close()"` |
| `.space`                 | Espace    | `@keydown.space`            |
| `.tab`                   | Tab       | `@keydown.tab`              |
| `.shift`                 | Shift     | `@keydown.shift`            |
| `.ctrl`                  | Ctrl      | `@keydown.ctrl.s="save()"`  |
| `.cmd`                   | Cmd (Mac) | `@keydown.cmd.k`            |
| `.up/.down/.left/.right` | Flèches   | `@keydown.up`               |

## Magic Properties

| Property    | Description             | Exemple                         |
| ----------- | ----------------------- | ------------------------------- |
| `$el`       | Élément DOM courant     | `$el.remove()`                  |
| `$refs`     | Accès aux `x-ref`       | `$refs.emailInput.focus()`      |
| `$watch`    | Observer changements    | `$watch('count', v => log(v))`  |
| `$dispatch` | Émettre événement       | `$dispatch('saved', { id: 1 })` |
| `$nextTick` | Attendre rendu          | `$nextTick(() => focus())`      |
| `$root`     | Élément racine `x-data` | `$root.querySelector('input')`  |
| `$data`     | Accès aux données       | `$data.username`                |
| `$store`    | Accès store global      | `$store.cart.items`             |

## Transitions

```html
<!-- Basique -->
<div x-show="open" x-transition>

<!-- Durée personnalisée -->
<div x-transition.duration.500ms>

<!-- Types prédéfinis -->
<div x-transition.opacity>
<div x-transition.scale>
<div x-transition.scale.50>

<!-- Personnalisées -->
<div
    x-transition:enter="transition ease-out duration-300"
    x-transition:enter-start="opacity-0 scale-90"
    x-transition:enter-end="opacity-100 scale-100"
    x-transition:leave="transition ease-in duration-300"
    x-transition:leave-start="opacity-100 scale-100"
    x-transition:leave-end="opacity-0 scale-90">
```

## Classes Dynamiques

```html
<!-- Conditionnelles -->
:class="{ 'active': isActive, 'disabled': !canEdit }"

<!-- Ternaire -->
:class="count > 5 ? 'text-red-500' : 'text-green-500'"

<!-- Styles inline -->
:style="{ color: isActive ? 'red' : 'blue' }"
```

## Composants Réutilisables (Laravel + Vite)

```javascript
// resources/js/alpine/components/dropdown.js
export default () => ({
    open: false,
    toggle() { this.open = !this.open }
})

// resources/js/app.js
import dropdown from './alpine/components/dropdown'
Alpine.data('dropdown', dropdown)
```

```blade
<!-- Utilisation -->
<div x-data="dropdown">
    <button @click="toggle()">Menu</button>
    <div x-show="open" @click.outside="close()">...</div>
</div>
```

## Store Global

```javascript
// resources/js/app.js
Alpine.store('cart', {
    items: [],
    total: 0,
    
    add(item) {
        this.items.push(item)
        this.total += item.price
    }
})
```

```blade
<!-- Utilisation -->
<div x-data>
    <span x-text="$store.cart.items.length"></span>
    <button @click="$store.cart.add({ id: 1, price: 10 })">Ajouter</button>
</div>
```

## Patterns One-Liner

```html
<!-- Computed Property -->
<div x-data="{ 
    firstName: 'John', 
    lastName: 'Doe',
    get fullName() { return `${this.firstName} ${this.lastName}` }
}">

<!-- Watcher -->
<div x-init="$watch('search', v => console.log(v))">

<!-- Fetch Init -->
<div x-init="items = await (await fetch('/api/items')).json()">

<!-- Debounced Search -->
<input x-model="query" @input.debounce.500ms="search()">

<!-- Click Outside -->
<div x-show="open" @click.outside="open = false">

<!-- Keyboard Shortcut -->
<div @keydown.window.ctrl.s.prevent="save()">
```

## Laravel Integration

```blade
<!-- CSRF Token -->
<meta name="csrf-token" content="{{ csrf_token() }}">

<!-- Passer Données PHP → Alpine -->
<div x-data="{ 
    articles: @json($articles),
    csrfToken: '{{ csrf_token() }}'
}">

<!-- Route Laravel -->
<div x-data="{ apiUrl: '{{ route('api.articles.index') }}' }">
```

```javascript
// Requête avec CSRF
async createArticle(data) {
    const response = await fetch('/api/articles', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
        },
        body: JSON.stringify(data)
    });
}
```

## Anti-Patterns

```html
<!-- ❌ MAUVAIS -->
<button onclick="document.querySelector('#menu').toggle()">
<li x-for="item in items">                    <!-- Oubli <template> -->

<!-- ✅ BON -->
<button @click="open = !open">
<template x-for="item in items" :key="item.id">
    <li x-text="item"></li>
</template>
```

## Organisation Code (Laravel)

```
resources/js/
├── app.js                    # Point d'entrée
└── alpine/
    ├── components/           # Composants réutilisables
    │   ├── articleManager.js
    │   ├── dropdown.js
    │   └── modal.js
    └── stores/              # Stores globaux
        └── cart.js
```

## Plugins Optionnels

```bash
npm install @alpinejs/focus @alpinejs/collapse @alpinejs/intersect
```

```javascript
import focus from '@alpinejs/focus'
import collapse from '@alpinejs/collapse'
import intersect from '@alpinejs/intersect'

Alpine.plugin(focus)
Alpine.plugin(collapse)
Alpine.plugin(intersect)
```

## Débogage

```html
<!-- Afficher état -->
<pre x-text="JSON.stringify($data, null, 2)"></pre>

<!-- Logger changements -->
<div x-init="$watch('count', v => console.log('Count:', v))">
```

## Ressources

- 📖 **SKILL.md** : Guide installation et bonnes pratiques Laravel
- 📝 **examples.md** : Exemples complets (CRUD, modales, tabs)
- 🌐 **Doc officielle** : [alpinejs.dev](https://alpinejs.dev)
- 🎮 **Playground** : [alpinejs.dev/playground](https://alpinejs.dev/playground)

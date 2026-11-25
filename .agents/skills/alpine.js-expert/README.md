# Skill Alpine.js Expert

## 📋 Description

Skill professionnel pour développer avec **Alpine.js dans un contexte Laravel + Vite**, en suivant les meilleures pratiques d'organisation et de séparation des responsabilités.

## 🎯 Objectifs

1. ✅ Maîtriser Alpine.js avec approche "Locality of Behavior"
2. ✅ Intégrer Alpine professionnellement avec Laravel + Vite
3. ✅ Organiser code et composants (séparation JS/Blade)
4. ✅ Appliquer patterns courants (dropdown, modale, etc.)

## 📁 Structure du Skill

```
.agent/skills/alpinejs/
├── SKILL.md           # Guide expert concis (Laravel + Vite)
├── cheatsheet.md      # Référence rapide (syntaxe, tableaux)
├── examples.md        # Exemples pratiques
└── README.md          # Ce fichier
```

### Rôle de Chaque Fichier

- **SKILL.md** : Guide principal concis avec installation Vite, organisation code, bonnes pratiques Laravel
- **cheatsheet.md** : Référence rapide (directives, modificateurs, tableaux de syntaxe)
- **examples.md** : Exemples pratiques complets (CRUD, modales, tabs, etc.)

## 🚀 Principes Clés

### Installation
- ❌ **CDN** : Uniquement pour tutoriels/prototypes
- ✅ **NPM + Vite** : Installation professionnelle Laravel

### Organisation Code
```
resources/js/alpine/
├── components/     # Composants Alpine réutilisables (.js)
└── stores/        # Stores globaux si nécessaire
```

### Séparation Responsabilités
- **Blade** : Template propre, minimal
- **JS** : Logique complexe dans fichiers séparés (`resources/js/alpine/components/`)

### Bibliothèque d'Icônes
- **Lucide Icons** : 1,300+ icônes SVG pour Laravel Blade
- Guide complet : Voir `lucide-icons.md`
- Installation : `composer require mallardduck/blade-lucide-icons`
- Usage : `<x-lucide-loader-2 class="animate-spin h-5 w-5" />`

## ✨ Différences avec Approches Classiques

### Alpine Classique (CDN)
```html
<script src="https://cdn.../alpinejs@3.js"></script>
<div x-data="{ /* logique inline */ }">
```

### Alpine Expert (Laravel + Vite)
```javascript
// resources/js/alpine/components/myComponent.js
export default () => ({ /* logique séparée */ })

// resources/js/app.js
Alpine.data('myComponent', myComponent);
```

```blade
<!-- Template propre -->
<div x-data="myComponent">
```

## 📚 Navigation

- **Démarrage** : Lire `SKILL.md` pour installation et organisation
- **Référence** : Consulter `cheatsheet.md` pour syntaxe rapide
- **Inspiration** : Voir `examples.md` pour patterns complets

## 🔧 Contexte Technique

Compatible avec :
- Laravel 10+ avec Vite
- Alpine.js v3
- Tailwind CSS (optionnel mais recommandé)

## 📖 Ressources Externes

- [alpinejs.dev](https://alpinejs.dev) - Documentation officielle
- [alpinejs.dev/playground](https://alpinejs.dev/playground) - Playground interactif

---

**Version** : 2.0.0 (Expert Laravel + Vite)  
**Dernière mise à jour** : 2026-01-30

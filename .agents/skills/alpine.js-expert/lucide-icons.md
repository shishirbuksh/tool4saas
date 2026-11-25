# Guide : Utilisation de Lucide Icons avec Alpine.js + Laravel

## 📦 Installation

### Étape 1 : Installer le Package Blade

```bash
composer require mallardduck/blade-lucide-icons
```

### Étape 2 : Publier la Configuration (Optionnel)

```bash
php artisan vendor:publish --tag=blade-lucide-icons
```

---

## 🎨 Utilisation dans Blade

### Syntaxe de Base

```blade
<!-- Format : x-lucide-{nom-icone} -->
<x-lucide-loader-2 class="w-5 h-5 text-indigo-600" />
<x-lucide-trash-2 class="w-5 h-5 text-red-600" />
<x-lucide-plus class="w-6 h-6" />
<x-lucide-search class="w-5 h-5" />
```

### Attributs Disponibles

```blade
<!-- Classes Tailwind -->
<x-lucide-heart class="w-8 h-8 text-red-500 hover:fill-red-500" />

<!-- Stroke width (épaisseur du trait) -->
<x-lucide-star :stroke-width="1.5" class="w-6 h-6" />

<!-- Couleur inline -->
<x-lucide-check color="green" class="w-5 h-5" />
```

---

## 🔄 Migration du Mini-Projet

### Avant (SVG Inline)

```blade
<!-- Spinner de chargement -->
<svg class="animate-spin h-12 w-12 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
</svg>
```

### Après (Lucide)

```blade
<!-- Spinner de chargement -->
<x-lucide-loader-2 class="animate-spin h-12 w-12 text-indigo-600" />
```

**Gain** : 4 lignes → 1 ligne ! 🎉

---

## 📋 Icônes pour le Mini-Projet CRUD

### Liste Complète

| Fonction            | Icône Lucide | Code Blade                                             |
| ------------------- | ------------ | ------------------------------------------------------ |
| **Spinner (grand)** | `loader-2`   | `<x-lucide-loader-2 class="animate-spin h-12 w-12" />` |
| **Spinner (petit)** | `loader-2`   | `<x-lucide-loader-2 class="animate-spin h-5 w-5" />`   |
| **Supprimer**       | `trash-2`    | `<x-lucide-trash-2 class="h-5 w-5" />`                 |
| **Ajouter**         | `plus`       | `<x-lucide-plus class="h-6 w-6" />`                    |
| **Recherche**       | `search`     | `<x-lucide-search class="h-5 w-5" />`                  |
| **Éditer**          | `pencil`     | `<x-lucide-pencil class="h-5 w-5" />`                  |
| **Fermer**          | `x`          | `<x-lucide-x class="h-6 w-6" />`                       |
| **Sauvegarder**     | `save`       | `<x-lucide-save class="h-5 w-5" />`                    |
| **Filtrer**         | `filter`     | `<x-lucide-filter class="h-5 w-5" />`                  |

---

## 🚀 Exemple Complet : Mise à Jour du Mini-Projet

### 1. Spinner Principal (Liste)

**Avant :**
```blade
<div x-show="loading" class="flex justify-center items-center py-12">
    <svg class="animate-spin h-12 w-12 text-indigo-600" ...>
        <!-- 4 lignes de SVG -->
    </svg>
</div>
```

**Après :**
```blade
<div x-show="loading" class="flex justify-center items-center py-12">
    <x-lucide-loader-2 class="animate-spin h-12 w-12 text-indigo-600" />
</div>
```

### 2. Mini Spinner (Recherche)

**Avant :**
```blade
<span x-show="loading" class="absolute right-3 top-3">
    <svg class="animate-spin h-5 w-5 text-indigo-600" ...>
        <!-- 4 lignes -->
    </svg>
</span>
```

**Après :**
```blade
<span x-show="loading" class="absolute right-3 top-3">
    <x-lucide-loader-2 class="animate-spin h-5 w-5 text-indigo-600" />
</span>
```

### 3. Bouton Supprimer

**Avant :**
```blade
<button @click="deleteArticle(article.id)" class="text-red-600 hover:text-red-900">
    Supprimer
</button>
```

**Après (avec icône)** :
```blade
<button @click="deleteArticle(article.id)" 
    class="flex items-center gap-1 text-red-600 hover:text-red-900">
    <x-lucide-trash-2 class="h-4 w-4" />
    <span>Supprimer</span>
</button>
```

Ou **icône seule** :
```blade
<button @click="deleteArticle(article.id)" 
    class="text-red-600 hover:text-red-900"
    title="Supprimer">
    <x-lucide-trash-2 class="h-5 w-5" />
</button>
```

### 4. Bouton "Nouvel Article"

**Avant :**
```blade
<button @click="openModal()" class="px-4 py-2 bg-indigo-600 text-white rounded">
    Nouvel Article
</button>
```

**Après :**
```blade
<button @click="openModal()" 
    class="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
    <x-lucide-plus class="h-5 w-5" />
    <span>Nouvel Article</span>
</button>
```

### 5. Fermer la Modale

**Ajouter un bouton × dans la modale :**
```blade
<div class="flex justify-between items-center mb-4">
    <h3 class="text-lg font-medium">Nouvel Article</h3>
    <button @click="showModal = false" class="text-gray-400 hover:text-gray-600">
        <x-lucide-x class="h-6 w-6" />
    </button>
</div>
```

---

## 🎨 Bonnes Pratiques

### 1. Tailles Cohérentes

```blade
<!-- Petit (dans texte) -->
<x-lucide-info class="h-4 w-4" />

<!-- Standard (boutons, inputs) -->
<x-lucide-search class="h-5 w-5" />

<!-- Moyen (headers, actions principales) -->
<x-lucide-plus class="h-6 w-6" />

<!-- Grand (spinners, états vides) -->
<x-lucide-loader-2 class="h-12 w-12" />
```

### 2. Couleurs Sémantiques

```blade
<!-- Succès -->
<x-lucide-check class="h-5 w-5 text-green-600" />

<!-- Erreur / Suppression -->
<x-lucide-trash-2 class="h-5 w-5 text-red-600" />

<!-- Warning -->
<x-lucide-alert-triangle class="h-5 w-5 text-yellow-600" />

<!-- Info -->
<x-lucide-info class="h-5 w-5 text-blue-600" />

<!-- Neutre / Primaire -->
<x-lucide-search class="h-5 w-5 text-gray-600" />
```

### 3. États Hover

```blade
<button class="group">
    <x-lucide-heart class="h-6 w-6 text-gray-400 group-hover:text-red-500 group-hover:fill-red-500 transition" />
</button>
```

---

## 📚 Ressources

- **Site Officiel** : [lucide.dev](https://lucide.dev)
- **Recherche d'Icônes** : [lucide.dev/icons](https://lucide.dev/icons)
- **Package Blade** : [GitHub - mallardduck/blade-lucide-icons](https://github.com/mallardduck/blade-lucide-icons)
- **Nombre Total** : 1,300+ icônes

---

## ✅ Checklist Migration

- [ ] Installer : `composer require mallardduck/blade-lucide-icons`
- [ ] Remplacer spinners SVG par `<x-lucide-loader-2>`
- [ ] Ajouter icônes aux boutons (trash, plus, search, etc.)
- [ ] Tester l'animation `animate-spin` fonctionne
- [ ] Vérifier cohérence des tailles (h-4, h-5, h-6)
- [ ] Vérifier couleurs cohérentes avec le design

---

**Lucide Icons est maintenant documenté dans votre skill Alpine.js !** 🎨

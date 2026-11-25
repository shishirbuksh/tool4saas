# Exemples Alpine.js - Patterns Pratiques

Exemples d'implémentation réels avec **organisation professionnelle Laravel + Vite**.

## Structure de Base

```
resources/
├── js/
│   ├── app.js
│   └── alpine/
│       └── components/
│           ├── articleManager.js
│           ├── dropdown.js
│           └── modal.js
└── views/
    └── articles/
        └── index.blade.php
```

---

## 1. Gestion Articles CRUD

### Composant JS (`resources/js/alpine/components/articleManager.js`)
```javascript
export default () => ({
    articles: [],
    searchQuery: '',
    statusFilter: 'all',
    isLoading: false,
    csrfToken: document.querySelector('meta[name="csrf-token"]')?.content,
    
    async init() {
        await this.loadArticles();
    },
    
    async loadArticles() {
        this.isLoading = true;
        try {
            const response = await fetch('/api/articles');
            this.articles = await response.json();
        } finally {
            this.isLoading = false;
        }
    },
    
    async searchArticles() {
        const params = new URLSearchParams({ 
            q: this.searchQuery,
            status: this.statusFilter 
        });
        const response = await fetch(`/api/articles?${params}`);
        this.articles = await response.json();
    },
    
    get filteredArticles() {
        if (this.statusFilter === 'all') return this.articles;
        return this.articles.filter(a => a.status === this.statusFilter);
    }
});
```

### Enregistrement (`resources/js/app.js`)
```javascript
import Alpine from 'alpinejs';
import articleManager from './alpine/components/articleManager';

Alpine.data('articleManager', articleManager);

window.Alpine = Alpine;
Alpine.start();
```

### Template Blade (`resources/views/articles/index.blade.php`)
```blade
@extends('layouts.app')

@section('content')
<div x-data="articleManager" x-init="init()">
    <!-- Recherche -->
    <input 
        type="text"
        x-model="searchQuery"
        @input.debounce.500ms="searchArticles()"
        placeholder="Rechercher...">
    
    <!-- Filtre Statut -->
    <select x-model="statusFilter" @change="searchArticles()">
        <option value="all">Tous</option>
        <option value="published">Publiés</option>
        <option value="draft">Brouillons</option>
    </select>
    
    <!-- Loader -->
    <div x-show="isLoading">Chargement...</div>
    
    <!-- Liste -->
    <ul x-show="!isLoading">
        <template x-for="article in filteredArticles" :key="article.id">
            <li>
                <span x-text="article.title"></span>
                <span :class="{ 
                    'text-green-600': article.status === 'published',
                    'text-gray-400': article.status === 'draft'
                }" x-text="article.status"></span>
            </li>
        </template>
    </ul>
</div>
@endsection
```

---

## 2. Dropdown Réutilisable

### Composant JS (`resources/js/alpine/components/dropdown.js`)
```javascript
export default () => ({
    open: false,
    
    toggle() {
        this.open = !this.open;
    },
    
    close() {
        this.open = false;
    }
});
```

### Template Blade
```blade
<div x-data="dropdown" class="relative">
    <button @click="toggle()">Options</button>
    
    <div 
        x-show="open"
        @click.outside="close()"
        x-transition
        class="absolute bg-white shadow-lg">
        <a href="#" @click="close()">Éditer</a>
        <a href="#" @click="close()">Supprimer</a>
    </div>
</div>
```

---

## 3. Modale avec Formulaire

### Composant JS (`resources/js/alpine/components/articleModal.js`)
```javascript
export default () => ({
    showModal: false,
    form: { title: '', content: '', status: 'draft' },
    errors: {},
    csrfToken: document.querySelector('meta[name="csrf-token"]')?.content,
    
    openModal() {
        this.showModal = true;
        this.resetForm();
    },
    
    closeModal() {
        this.showModal = false;
        this.resetForm();
    },
    
    resetForm() {
        this.form = { title: '', content: '', status: 'draft' };
        this.errors = {};
    },
    
    validate() {
        this.errors = {};
        if (!this.form.title) this.errors.title = 'Le titre est requis';
        if (!this.form.content) this.errors.content = 'Le contenu est requis';
        return Object.keys(this.errors).length === 0;
    },
    
    async createArticle() {
        if (!this.validate()) return;
        
        try {
            const response = await fetch('/api/articles', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': this.csrfToken
                },
                body: JSON.stringify(this.form)
            });
            
            if (response.ok) {
                this.closeModal();
                this.$dispatch('article-created');
            }
        } catch (error) {
            console.error('Erreur:', error);
        }
    }
});
```

### Template Blade
```blade
<div x-data="articleModal">
    <!-- Bouton -->
    <button @click="openModal()">+ Nouvel Article</button>
    
    <!-- Modale -->
    <div 
        x-show="showModal"
        x-transition.opacity
        class="fixed inset-0 bg-black/50 flex items-center justify-center">
        
        <div 
            @click.outside="closeModal()"
            @keydown.window.escape="closeModal()"
            x-transition.scale
            class="bg-white p-8 rounded-lg w-full max-w-2xl">
            
            <h2>Créer un Article</h2>
            
            <form @submit.prevent="createArticle()">
                <!-- Titre -->
                <div>
                    <input 
                        type="text"
                        x-model="form.title"
                        :class="{ 'border-red-500': errors.title }">
                    <p x-show="errors.title" x-text="errors.title" class="text-red-500"></p>
                </div>
                
                <!-- Contenu -->
                <div>
                    <textarea 
                        x-model="form.content"
                        :class="{ 'border-red-500': errors.content }"></textarea>
                    <p x-show="errors.content" x-text="errors.content" class="text-red-500"></p>
                </div>
                
                <!-- Statut -->
                <select x-model="form.status">
                    <option value="draft">Brouillon</option>
                    <option value="published">Publié</option>
                </select>
                
                <!-- Actions -->
                <button type="button" @click="closeModal()">Annuler</button>
                <button type="submit">Créer</button>
            </form>
        </div>
    </div>
</div>
```

---

## 4. Suppression avec Confirmation

### Composant JS (Ajout à `articleManager.js`)
```javascript
deleteId: null,
showDeleteConfirm: false,

confirmDelete(id) {
    this.deleteId = id;
    this.showDeleteConfirm = true;
},

async deleteArticle() {
    try {
        const response = await fetch(`/api/articles/${this.deleteId}`, {
            method: 'DELETE',
            headers: {
                'X-CSRF-TOKEN': this.csrfToken
            }
        });
        
        if (response.ok) {
            this.articles = this.articles.filter(a => a.id !== this.deleteId);
            this.showDeleteConfirm = false;
        }
    } catch (error) {
        console.error('Erreur:', error);
    }
}
```

### Template Blade
```blade
<!-- Bouton Supprimer -->
<button @click="confirmDelete(article.id)">🗑️</button>

<!-- Modale Confirmation -->
<div 
    x-show="showDeleteConfirm"
    x-transition.opacity
    class="fixed inset-0 bg-black/50 flex items-center justify-center">
    
    <div @click.outside="showDeleteConfirm = false" class="bg-white p-6 rounded">
        <h3>⚠️ Confirmation</h3>
        <p>Voulez-vous vraiment supprimer cet article ?</p>
        
        <button @click="showDeleteConfirm = false">Annuler</button>
        <button @click="deleteArticle()" class="bg-red-600 text-white">Supprimer</button>
    </div>
</div>
```

---

## 5. Tabs (Onglets)

### Composant JS (`resources/js/alpine/components/tabs.js`)
```javascript
export default () => ({
    activeTab: 'infos',
    
    switchTab(tab) {
        this.activeTab = tab;
    }
});
```

### Template Blade
```blade
<div x-data="tabs">
    <!-- Navigation -->
    <div class="flex border-b">
        <button 
            @click="switchTab('infos')"
            :class="{ 'border-blue-600': activeTab === 'infos' }">
            Informations
        </button>
        <button 
            @click="switchTab('settings')"
            :class="{ 'border-blue-600': activeTab === 'settings' }">
            Paramètres
        </button>
    </div>
    
    <!-- Contenu -->
    <div>
        <div x-show="activeTab === 'infos'" x-transition>
            Contenu Informations
        </div>
        <div x-show="activeTab === 'settings'" x-transition>
            Contenu Paramètres
        </div>
    </div>
</div>
```

---

## 6. Toast Notifications

### Composant JS (`resources/js/alpine/components/toaster.js`)
```javascript
export default () => ({
    notifications: [],
    
    notify(message, type = 'info') {
        const id = Date.now();
        this.notifications.push({ id, message, type });
        
        setTimeout(() => {
            this.notifications = this.notifications.filter(n => n.id !== id);
        }, 3000);
    }
});
```

### Template Blade (Layout principal)
```blade
<div x-data="toaster" @notify.window="notify($event.detail.message, $event.detail.type)">
    <!-- Container Toasts -->
    <div class="fixed top-4 right-4 z-50 space-y-2">
        <template x-for="notif in notifications" :key="notif.id">
            <div 
                x-transition.opacity
                :class="{
                    'bg-green-500': notif.type === 'success',
                    'bg-red-500': notif.type === 'error',
                    'bg-blue-500': notif.type === 'info'
                }"
                class="text-white px-6 py-3 rounded shadow-lg">
                <span x-text="notif.message"></span>
                <button @click="notifications = notifications.filter(n => n.id !== notif.id)">✕</button>
            </div>
        </template>
    </div>
    
    @yield('content')
</div>
```

### Utilisation depuis un autre composant
```javascript
// Dans articleModal.js après création
this.$dispatch('notify', { message: 'Article créé !', type: 'success' });
```

---

## Configuration CSRF Laravel

### Layout Principal (`resources/views/layouts/app.blade.php`)
```blade
<head>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
```

### Accès dans Composants Alpine
```javascript
csrfToken: document.querySelector('meta[name="csrf-token"]')?.content
```

---

## Navigation dans le Skill

- 📖 **SKILL.md** : Installation, organisation, bonnes pratiques
- 📝 **cheatsheet.md** : Référence rapide syntaxe
- 🌐 **Doc officielle** : [alpinejs.dev](https://alpinejs.dev)

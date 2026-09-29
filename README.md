# CULTIVA Landing Page

Une landing page moderne et professionnelle pour présenter le projet CULTIVA, une plateforme numérique destinée à aider les agriculteurs à gérer facilement leurs exploitations agricoles.

## 🎨 Design

Le design utilise une identité visuelle premium inspirée des sites SaaS modernes (Notion, Stripe, Linear, Framer, Vercel, Apple) avec :

- **Vert** (#1B8A3A) - Couleur principale
- **Vert foncé** (#0E5A2B) - Couleur secondaire
- **Blanc** - Fond principal
- **Jaune soleil** (#F5B400) - Accent

## 🛠 Technologies

- **Next.js 16.2.10** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion** (Animations)
- **Lucide React** (Icônes)
- **Responsive Design**
- **SEO optimisé**
- **Accessibilité (WCAG)**

## 📁 Structure du projet

```
cultura-landing/
├── src/
│   ├── app/
│   │   ├── layout.tsx           # Layout racine avec SEO
│   │   ├── page.tsx             # Landing page (accueil)
│   │   ├── globals.css          # Styles globaux
│   │   ├── (auth)/              # Authentification
│   │   │   ├── login/           # Connexion (email/téléphone + mot de passe)
│   │   │   ├── register/        # Inscription (nom, téléphone, email, localisation, rôle)
│   │   │   └── forgot-password/ # Récupération du mot de passe
│   │   └── (app)/               # Application (zone authentifiée)
│   │       ├── layout.tsx       # Layout protégé (sidebar + topbar + drawer)
│   │       ├── dashboard/       # Tableau de bord agriculteur
│   │       ├── farms/           # Exploitations (CRUD)
│   │       ├── fields/          # Parcelles (CRUD)
│   │       ├── crops/           # Cultures (CRUD)
│   │       ├── activities/      # Activités (CRUD)
│   │       ├── calendar/        # Calendrier agricole
│   │       ├── harvests/        # Récoltes (CRUD)
│   │       ├── finances/        # Finances + graphique
│   │       ├── weather/         # Météo
│   │       ├── notifications/   # Notifications
│   │       └── profile/         # Profil utilisateur
│   ├── components/
│   │   ├── navbar.tsx, hero.tsx, …  # Composants de la landing (sans team section)
│   │   ├── ui/                  # Primitives (Button, Card, Input, Badge, Spinner, ConfirmDialog)
│   │   └── app/                 # Shell applicatif + composants par module
│   ├── lib/                     # Utilitaires (cn, format, labels, id, client, db, api)
│   ├── services/                # Couche de services → appels API (mêmes signatures async)
│   ├── store/                   # Contexte d'authentification
│   ├── hooks/                   # Hooks (useAuth, useUnreadCount)
│   ├── data/                    # Données de démonstration (seed de la base au 1er lancement)
│   └── types/                   # Types du domaine CULTIVA
├── src/app/api/                 # Route handlers (API réelle, base SQLite)
│   ├── auth/                    # register, login, logout, me, forgot-password, profile
│   ├── farms/, fields/, crops/  # CRUD (collection + [id], suppressions en cascade)
│   ├── activities/, harvests/   # CRUD
│   ├── transactions/            # CRUD
│   └── notifications/           # Liste + marquage lu
├── .data/                       # Base SQLite locale (gitignorée, créée au 1er lancement)
├── eslint.config.mjs            # ESLint 9 (flat config)
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.ts
└── postcss.config.mjs
```

## 🚀 Installation

### Prérequis

- Node.js 18+ installé
- npm ou yarn

### Étapes d'installation

1. **Naviguer vers le dossier du projet**
   ```bash
   cd C:\Users\Moses\Desktop\CULTIVA
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Lancer le serveur de développement**
   ```bash
   npm run dev
   ```

4. **Ouvrir le navigateur**
   ```
   http://localhost:3000
   ```

## 📦 Scripts disponibles

- `npm run dev` - Lance le serveur de développement
- `npm run build` - Crée une version de production
- `npm run start` - Lance le serveur de production
- `npm run lint` - Exécute le linter ESLint (flat config, `eslint .`)

## 🎯 Fonctionnalités de la landing page

### 1. Navbar
- Logo CULTIVA avec icône
- Navigation responsive (desktop/mobile)
- Effet blur au scroll
- Menu hamburger pour mobile
- Liens: Accueil, Fonctionnalités, Application, FAQ, Contact

### 2. Hero Section
- Titre principal accrocheur
- Sous-titre descriptif
- Deux boutons CTA
- Mockup de smartphone animé
- Statistiques rapides

### 3. Aperçu de l'application
- Galerie de 5 cartes
- Mockups colorés
- Hover effects

### 4. Fonctionnalités
- Grille de 10 cartes modernes
- Icônes Lucide React
- Animations au hover
- Badge "Bientôt" pour fonctionnalités futures

### 5. Pourquoi CULTIVA ?
- Présentation des problèmes actuels
- Solutions proposées par CULTIVA
- Design comparatif visuel

### 6. Comment ça marche
- Timeline en 6 étapes
- Design visuel clair
- Animations d'apparition

### 7. Statistiques
- Compteurs animés
- 3 statistiques clés
- Design premium sur fond vert

### 8. Roadmap
- 5 versions futures
- Indicateur de disponibilité
- Tags de fonctionnalités

### 9. FAQ
- Accordéon interactif
- 5 questions fréquentes
- Animations fluides

### 10. Contact
- Formulaire complet
- Informations de contact
- Placeholder Google Maps
- Design responsive

### 11. CTA Section
- Section d'appel à l'action
- Design motivant
- Boutons d'inscription

### 12. Footer
- Logo et description
- Liens organisés par catégorie (Produit, Support)
- Réseaux sociaux (placeholders)
- Copyright dynamique

## 🔧 Personnalisation

### Couleurs

Les couleurs personnalisées sont définies dans `tailwind.config.ts` :

```typescript
cultiva: {
  green: "#1B8A3A",
  darkGreen: "#0E5A2B",
  yellow: "#F5B400",
}
```

### SEO

Les métadonnées SEO sont configurées dans `src/app/layout.tsx` :
- Title
- Description
- Keywords
- Open Graph
- Schema.org

### Images

Les images sont actuellement des placeholders. Pour les remplacer :
1. Ajoutez vos images dans `public/`
2. Mettez à jour les composants correspondants

## 📱 Responsive Design

Le site est optimisé pour :
- **Desktop** (> 1024px)
- **Tablette** (768px - 1024px)
- **Mobile** (< 768px)

## ♿ Accessibilité

- Structure sémantique HTML
- Contraste des couleurs respecté
- Navigation clavier
- ARIA labels où nécessaire

## 🚀 Déploiement

### Vercel (recommandé)

1. **Pousser le projet sur GitHub** puis importer le dépôt dans Vercel.
2. **Runtime Node.js** : le projet requiert **Node 24+** (module natif `node:sqlite`)
   — défini dans `package.json` (`engines`). Vercel le détecte automatiquement.
3. **Build** : aucune configuration nécessaire (`npm run build`, framework Next.js).

**Déploiement actuel:**
- 🌐 Production: https://cultivagestion.vercel.app
- 📦 GitHub: https://github.com/AGBOFIN/CULTIVA

```bash
npm install -g vercel
vercel
```

> ⚠️ **Persistance des données sur Vercel** : le filesystem des fonctions
> serverless est éphémère et en lecture seule hors `/tmp`. Sur Vercel
> (`VERCEL=1`), la base SQLite est créée dans `/tmp` : l'application
> fonctionne et se re-seede au démarrage, mais les données saisies ne
> persistent pas entre les cold starts. Les **sessions** y survivent
> grâce au cookie signé (`CULTIVA_SESSION_SECRET`, à définir dans les
> variables d'environnement Vercel). Pour une persistance réelle des
> données métier, remplacer `src/lib/db.ts` par une base managée
> (Postgres/MySQL) — les route handlers et les services n'ont pas à
> changer.

### Autres plateformes

1. **Build pour production**
   ```bash
   npm run build
   ```

2. **Le dossier `.next` contient le build**

## 📝 Notes de développement

- Le code utilise TypeScript pour la sécurité des types
- Les composants sont modulaires et réutilisables
- Les animations Framer Motion sont optimisées pour la performance
- Le code est commenté pour une maintenance facile
- **Dernières modifications** (Septembre 2026):
  - Suppression de la section équipe de la landing page
  - Mise à jour de la navigation et du footer
  - Optimisation de la structure du projet
  - Mise à jour vers Next.js 16.2.10

## 🚀 Application

L'application CULTIVA est construite progressivement sur la landing. Tous les modules du brief sont développés, avec un vrai backend (API Next.js + base SQLite) :

- **Authentification réelle** : inscription (nom, téléphone, email, mot de passe, localisation), connexion par email ou téléphone, récupération de mot de passe, profil éditable. Mots de passe hashés en **scrypt** (jamais en clair), session par **cookie httpOnly signé (HMAC)** quand `CULTIVA_SESSION_SECRET` est défini (recommandé en production — la session survit aux cold starts Vercel) ; fallback sur une table `sessions` en base en local.
- **Compte de démonstration** : `demo@cultiva.africa` / `demo1234` (seedé dans la base au premier lancement).
- **Tableau de bord** : exploitations, parcelles, cultures en cours, activités du jour/prochaines/en retard, finances (revenus/dépenses/bénéfice) et résumé des récoltes.
- **Exploitations** : CRUD (nom, localisation, superficie, type, description) — suppression en cascade des parcelles et de leurs cultures/activités.
- **Parcelles** : CRUD (nom, superficie, localisation, type de sol, culture actuelle, statut) lié aux exploitations ; type `GeoPoint` prêt pour une carte GPS.
- **Cultures** : CRUD (culture, variété, parcelle, dates de semis/récolte, superficie, semences, statuts Planifiée → Terminée).
- **Activités** : CRUD (semis, fertilisation, traitement, irrigation, désherbage, entretien, récolte, autre) avec date/heure, parcelle, coût et statut.
- **Calendrier** : vue mensuelle interactive (jours cliquables, points par statut) + sections À venir / En retard / Terminées.
- **Récoltes** : CRUD (quantité, unité, qualité, prix, revenu calculé automatiquement) lié aux cultures.
- **Finances** : CRUD des transactions (dépenses et revenus par catégorie), indicateurs, graphique d'évolution mensuelle sur 6 mois.
- **Météo** : conditions actuelles et prévisions 6 jours — **données réelles Open-Meteo** (gratuit, sans clé API) via la route `/api/weather` (proxy serveur), avec repli automatique sur les données de démonstration (`src/data/mock-weather.ts`, badge « Données de démonstration ») si le service est indisponible. Position par défaut Lomé, géolocalisation du navigateur si autorisée.
- **Notifications** : tâches, retards, météo, récoltes, rappels, infos — marquage lu individuel/global, badge de compteur dans la topbar et la navigation.
- **Profil** : nom, téléphone, email, photo, localisation et informations agricoles, éditable.

**Backend réel** : les services (`src/services/`) appellent une **API Next.js** (`src/app/api/`) soutenue par une base de données. En production (Vercel) et quand `DATABASE_URL` est défini, c'est **Postgres managé (Neon, provisionné via le Marketplace Vercel)** — les données persistent entre les cold starts. En local sans variable d'environnement, la couche retombe sur **SQLite** (`node:sqlite`, fichier `.data/cultiva.db` auto-créé et seedé). La couche `src/lib/db.ts` expose des helpers async (`all`/`get`/`run`) et convertit automatiquement les placeholders `?` en `$1…` pour Postgres ; les suppressions en cascade (exploitation → parcelles → cultures/activités → récoltes) sont gérées côté serveur.

**Données de démonstration** : les lignes initiales de la base sont issues des données fictives (`src/data/`) et marquées « Données de démonstration » dans l'interface. Les comptes créés par les utilisateurs et leurs données persistent dans Postgres.

## 🧪 Tests E2E (Playwright)

Les tests E2E couvrent : landing (sections + CTA + footer sans lien mort), authentification (inscription avec nettoyage du compte, connexion démo, mauvais mot de passe, déconnexion) et les 11 modules de l'application (chargement sans erreur).

```bash
# Serveur dev requis sur le port 3000 (reuseExistingServer)
npx playwright install chromium   # une seule fois
npm run test:e2e
```

## 🔮 Améliorations futures

- [ ] Intégration de vraies images
- [ ] Intégration Google Maps
- [ ] Notification push réelle
- [ ] Internationalisation (i18n)
- [ ] Mode sombre
- [ ] PWA (Progressive Web App)

## 📄 Licence

Ce projet est développé pour MOSES EMPIRE.

## 👥 Contact

Pour toute question ou suggestion concernant le projet CULTIVA, vous pouvez:
- Visiter le site: https://cultivagestion.vercel.app
- Contacter via le formulaire de contact sur la landing page
- Consulter le dépôt GitHub: https://github.com/AGBOFIN/CULTIVA

---

**Développé avec ❤️ pour les agriculteurs africains**

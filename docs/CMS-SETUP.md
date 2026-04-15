# Guide de configuration du CMS — emd-template

Ce document est un tuto pas-à-pas pour mettre en route le CMS sur un nouveau site issu du template. Il couvre : pré-requis, variables d'environnement, tokens GitHub, Vercel Blob, déploiement, premier login, gestion des rédacteurs, et troubleshooting.

**Durée estimée** : 30-45 minutes pour la première fois, 10 minutes pour les suivantes.

---

## Vue d'ensemble

Le CMS est intégré au site. Il tourne sur `/admin` et permet à des rédacteurs non-techniques de créer/éditer des articles, produits, auteurs et pages, sans toucher au code.

**Architecture résumée :**
- Pas de base de données. Le contenu est stocké sous forme de fichiers YAML/MDX dans ton repo GitHub.
- Chaque sauvegarde dans le CMS = un commit Git sur la branche principale.
- Les images uploadées sont stockées sur **Vercel Blob** (CDN), pas dans le repo.
- Authentification double : soit GitHub OAuth (admins), soit email + mot de passe (rédacteurs).
- Toutes les permissions sont gérées côté API, pas côté UI (l'interface est identique admin/rédacteur).

---

## 1. Pré-requis

Avant de commencer, tu dois avoir :

- [ ] Un compte **GitHub** avec le repo du site déjà créé et pushé
- [ ] Un compte **Vercel** connecté à ce repo, avec un premier déploiement réussi
- [ ] Le site public accessible sur son URL (ex: `https://monsite.vercel.app`)
- [ ] `openssl` disponible localement (macOS/Linux → déjà là, Windows → WSL ou Git Bash)

**Optionnel** (pour la génération d'images IA) :
- [ ] Un compte **Black Forest Labs** avec une clé API Flux

---

## 2. Les 3 variables d'environnement obligatoires

Le CMS a besoin de **3 variables** pour fonctionner. Tu vas les générer dans les étapes suivantes, puis les coller dans Vercel.

| Variable | À quoi ça sert | Comment l'obtenir |
|---|---|---|
| `CMS_SECRET` | Chiffre les cookies de session du CMS (AES-256-GCM) | Commande locale (étape 3) |
| `CMS_GITHUB_TOKEN` | Permet au CMS de lire/écrire dans ton repo GitHub | Personal Access Token (étape 4) |
| `BLOB_READ_WRITE_TOKEN` | Permet au CMS d'uploader des images sur Vercel Blob | Créé automatiquement (étape 5) |

Tu peux aussi ajouter plus tard (optionnel) : `GITHUB_CMS_CLIENT_ID`, `GITHUB_CMS_CLIENT_SECRET` (OAuth GitHub pour admins), `BFL_API_KEY` (génération d'images IA).

---

## 3. Générer `CMS_SECRET`

C'est une clé aléatoire de 32 bytes en hexadécimal. Ouvre un terminal et lance :

```bash
openssl rand -hex 32
```

Tu obtiens quelque chose comme :

```
a3f7c9e8b2d4f1a6c8e3b5d7f9a1c4e6b8d2f4a7c9e1b3d5f7a9c2e4b6d8f1a3
```

**Copie cette valeur, tu vas la coller dans Vercel à l'étape 6.**

Ne la partage jamais. Ne la commit jamais. Si quelqu'un l'obtient, il peut forger des cookies de session et accéder à ton `/admin`.

---

## 4. Créer le Personal Access Token GitHub (`CMS_GITHUB_TOKEN`)

C'est le token qui permet au CMS de lire et écrire des fichiers dans ton repo GitHub via l'API. Il faut **un fine-grained token**, pas un classique.

### Étape 4.1 — Aller dans les settings

1. Connecte-toi à GitHub
2. Clique sur ton avatar en haut à droite → **Settings**
3. Dans le menu de gauche, tout en bas → **Developer settings**
4. **Personal access tokens** → **Fine-grained tokens**
5. Clique sur **Generate new token**

### Étape 4.2 — Remplir le formulaire

Copie-colle exactement ces valeurs :

| Champ | Valeur |
|---|---|
| **Token name** | `cms-[nom-du-site]` (ex: `cms-10minutescbd`) |
| **Expiration** | 1 year (ou custom selon ta politique) |
| **Description** | CMS access for site editing |
| **Resource owner** | Toi-même ou l'organisation propriétaire du repo |
| **Repository access** | **Only select repositories** → choisir UNIQUEMENT le repo concerné |

### Étape 4.3 — Permissions

C'est **l'étape critique**. Cherche la section **Repository permissions** et configure :

| Permission | Niveau | Raison |
|---|---|---|
| **Contents** | **Read and write** | Lire et modifier les fichiers de contenu (articles, YAML, etc.) |
| **Metadata** | **Read-only** (auto-coché) | Lister les fichiers du repo |

**Ne coche rien d'autre.** Le CMS n'a pas besoin de plus. Principe du moindre privilège.

### Étape 4.4 — Générer et copier

1. Clique **Generate token** en bas
2. **Copie immédiatement la valeur** affichée (elle commence par `github_pat_`)
3. Tu ne pourras plus la voir ensuite — si tu la perds, tu devras en créer une nouvelle

**Colle-la dans un endroit temporaire sécurisé** (gestionnaire de mots de passe, note chiffrée). Tu vas la mettre dans Vercel à l'étape 6.

---

## Prochaine étape

Dans la suite de ce tuto (Partie 2) : création du Vercel Blob Store, installation des variables d'environnement dans Vercel, et premier déploiement avec le CMS actif.

Continuer → section 5 ci-dessous.

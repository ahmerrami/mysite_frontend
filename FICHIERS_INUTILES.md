# 🧹 Fichiers non nécessaires au fonctionnement du site web

## 📋 Analyse du projet mysite_frontend

### 🔴 Fichiers INUTILES - À supprimer

#### 📁 Documentation de déploiement (créés pour vous aider)
```
AWS_DEPLOYMENT_GUIDE.md          # Guide AWS
CONFIGURATION_DNS_OVH.md         # Guide DNS OVH
DEPLOYMENT_FILES.md              # Documentation déploiement
DEPLOYMENT_SUMMARY.md            # Résumé déploiement
DNS_PROBLEM_SOLVED.md           # Diagnostic DNS
GUIDE_REDIRECTION_OVH.md        # Guide redirection
SOLUTION_IMMEDIATE.md           # Solutions temporaires
URL_DIAGNOSTIC.md               # Diagnostic URLs
```

#### 🔧 Scripts de déploiement et configuration
```
check-dns.sh                    # Script vérification DNS
check-redirect.sh               # Script vérification redirection
configure-domain.sh             # Script configuration domaine
deploy-ec2.sh                   # Déploiement EC2 (non utilisé)
setup-aws.sh                    # Configuration initiale AWS
```

#### 📄 Fichiers de configuration alternatifs
```
amplify.yml                     # Configuration Amplify (non utilisé)
nginx.conf                      # Configuration nginx (non utilisé)
bucket-policy.json              # Politique S3 (déjà appliquée)
```

#### 📁 Pages supprimées/inutilisées
```
src/pages/Stage/                # Dossier complet - Fonctionnalité supprimée
├── Conditions.jsx              # Page conditions stages
├── Conditions.module.css       # Styles conditions
├── MultiStepForm.jsx           # Formulaire multi-étapes
├── Step1.jsx                   # Étape 1 formulaire
├── Step2.jsx                   # Étape 2 formulaire
└── Step3.jsx                   # Étape 3 formulaire

src/pages/PDFViewer/            # Dossier - Fonctionnalité non utilisée
├── PDFDownloader.jsx           # Téléchargeur PDF
└── PDFViewer.jsx              # Visualiseur PDF
```

#### 📂 Dossiers/fichiers GitHub Pages
```
docs/                           # Dossier GitHub Pages
├── CNAME                       # Domaine GitHub Pages
CNAME                          # CNAME racine (GitHub Pages)
index.html                     # HTML racine (duplicate de public)
```

#### 🌍 Variables d'environnement inutilisées
```
.env                           # Variables dev (si vides)
.env.production                # Variables production (si vides)
```

### 🟢 Fichiers NÉCESSAIRES - À garder

#### 📦 Configuration projet
```
package.json                   # Dépendances npm
package-lock.json              # Lock des versions
vite.config.js                 # Configuration Vite
.eslintrc.cjs                  # Configuration ESLint
.gitignore                     # Fichiers git ignorés
```

#### 🚀 Script de déploiement principal
```
deploy-s3.sh                   # Script déploiement AWS (GARDER)
```

#### 📁 Code source essentiel
```
src/                           # Code source React
├── App.jsx                    # Composant principal
├── App.css                    # Styles principaux
├── main.jsx                   # Point d'entrée
├── index.css                  # Styles globaux
├── assets/                    # Resources
└── pages/                     # Pages du site
    ├── About/                 # Page À propos
    ├── AO/                    # Appels d'offres
    ├── ContactList/           # Contacts
    ├── Icon/                  # Icônes
    ├── Omra/                  # Page Omra
    ├── Reference/             # Références
    └── Slider/                # Slider accueil
```

#### 📂 Ressources publiques
```
public/                        # Fichiers publics
├── CNAME                      # Configuration domaine
└── references/                # Images références
```

#### 🔄 Autres nécessaires
```
README.md                      # Documentation projet
dist/                          # Build généré (ignoré par git)
node_modules/                  # Modules npm (ignoré par git)
.git/                          # Historique Git
```

## 🗑️ Commandes de nettoyage

### Supprimer les fichiers de documentation
```bash
rm -f AWS_DEPLOYMENT_GUIDE.md CONFIGURATION_DNS_OVH.md DEPLOYMENT_FILES.md
rm -f DEPLOYMENT_SUMMARY.md DNS_PROBLEM_SOLVED.md GUIDE_REDIRECTION_OVH.md
rm -f SOLUTION_IMMEDIATE.md URL_DIAGNOSTIC.md
```

### Supprimer les scripts non essentiels
```bash
rm -f check-dns.sh check-redirect.sh configure-domain.sh
rm -f deploy-ec2.sh setup-aws.sh
```

### Supprimer les configurations alternatives
```bash
rm -f amplify.yml nginx.conf bucket-policy.json
```

### Supprimer les pages inutilisées
```bash
rm -rf src/pages/Stage/
rm -rf src/pages/PDFViewer/
```

### Supprimer les fichiers GitHub Pages
```bash
rm -rf docs/
rm -f CNAME index.html
```

## 📊 Résumé du nettoyage

**Fichiers à supprimer :** ~25 fichiers/dossiers
**Espace libéré :** ~500KB de code
**Fichiers gardés :** Code source + configuration essentielle + deploy-s3.sh

**Après nettoyage, le projet contiendra uniquement :**
- ✅ Code source React fonctionnel
- ✅ Configuration de build (Vite, npm)
- ✅ Script de déploiement AWS (`deploy-s3.sh`)
- ✅ Ressources publiques (images, etc.)

## ⚠️ Important
**Gardez `deploy-s3.sh`** - C'est votre script de déploiement principal !
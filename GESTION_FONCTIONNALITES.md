# 🎛️ Guide de gestion des fonctionnalités

## 📋 Vue d'ensemble

Votre site dispose maintenant d'un **système de configuration** pour activer/désactiver certaines fonctionnalités sans supprimer le code.

## 🔧 Fichier de configuration

**Fichier :** `src/config/features.js`

## 🎯 Fonctionnalités disponibles

### 📝 **STAGES** (Actuellement désactivé)
- **Menu** : Caché du menu de navigation  
- **Accès direct** : URLs /stage bloquées  
- **Code** : Conservé et prêt à réactiver  

### 📄 **PDF_VIEWER** (Actuellement activé)
- **Statut** : Fonctionnel dans les appels d'offres  
- **Usage** : Téléchargement des CPS  

## 🚀 Comment activer/désactiver les STAGES

### ✅ **Pour ACTIVER les stages :**

1. **Ouvrir** `src/config/features.js`
2. **Modifier** la section STAGES :
   ```javascript
   STAGES: {
     enabled: true,          // ← Changer à true
     showInMenu: true,       // ← Changer à true
     showInRoutes: true,     // ← Changer à true
     title: "Stages",
     path: "/stage"
   }
   ```
3. **Sauvegarder** le fichier
4. **Déployer** : `./deploy-s3.sh`

### ❌ **Pour DÉSACTIVER les stages :**

1. **Ouvrir** `src/config/features.js`
2. **Modifier** la section STAGES :
   ```javascript
   STAGES: {
     enabled: false,         // ← Changer à false
     showInMenu: false,      // ← Changer à false
     showInRoutes: false,    // ← Changer à false
     title: "Stages",
     path: "/stage"
   }
   ```
3. **Sauvegarder** le fichier
4. **Déployer** : `./deploy-s3.sh`

## 🎨 Options de configuration STAGES

| Option | Description | Valeurs |
|--------|-------------|---------|
| `enabled` | Active/désactive la fonctionnalité | `true` / `false` |
| `showInMenu` | Affiche le lien dans le menu | `true` / `false` |
| `showInRoutes` | Permet l'accès via URL directe | `true` / `false` |

## 💡 **Configurations recommandées**

### 🔴 **Stages complètement désactivés** (Actuellement)
```javascript
enabled: false,
showInMenu: false,
showInRoutes: false
```
- ✅ Menu caché
- ✅ URLs /stage inaccessibles
- ✅ Aucune trace visible

### 🟡 **Stages en maintenance** (Accès direct seulement)
```javascript
enabled: true,
showInMenu: false,
showInRoutes: true
```
- ❌ Menu caché
- ✅ URLs /stage accessibles
- 💡 Pour tests internes

### 🟢 **Stages complètement activés**
```javascript
enabled: true,
showInMenu: true,
showInRoutes: true
```
- ✅ Menu visible
- ✅ URLs /stage accessibles
- ✅ Fonctionnalité publique

## 🔄 **Workflow de déploiement**

1. **Modifier** `src/config/features.js`
2. **Tester localement** : `npm run dev`
3. **Builder** : `npm run build`
4. **Déployer** : `./deploy-s3.sh`
5. **Vérifier** : https://www.supratourstravel.com

## ⚡ **Avantages de cette approche**

- ✅ **Code conservé** : Pas de suppression/restauration
- ✅ **Déploiement rapide** : Changement d'une ligne
- ✅ **Flexibilité** : Activation partielle possible
- ✅ **Sécurité** : Désactivation complète possible
- ✅ **Maintenance** : Pas de risque de casser le code

## 🛠️ **Maintenance future**

Pour ajouter de nouvelles fonctionnalités configurables :
1. Ajouter dans `FEATURES` de `features.js`
2. Utiliser `isFeatureEnabled('NOUVELLE_FEATURE')` dans le code
3. Conditionner l'affichage avec des `&&`

**Votre code reste propre et modulaire !** 🎉
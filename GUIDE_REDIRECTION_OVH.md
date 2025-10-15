# 🔄 Redirection domaine racine vers www sur OVHcloud

## 🎯 Objectif
Rediriger `supratourstravel.com` → `www.supratourstravel.com`

## 📋 Étapes détaillées sur OVHcloud

### 1. 🔐 Connexion à l'espace client
1. **Aller sur** : https://www.ovh.com/manager/
2. **Se connecter** avec vos identifiants
3. **Sélectionner** "Web Cloud"

### 2. 🌍 Accéder à la gestion DNS
1. **Menu gauche** → "Noms de domaine"
2. **Cliquer** sur `supratourstravel.com`
3. **Onglet** "Zone DNS"

### 3. 🗑️ Supprimer les anciens enregistrements A
**Chercher et supprimer** tous les enregistrements A pour le domaine racine :
```
Type: A  | Nom: @  | Valeur: 185.199.109.153  → SUPPRIMER
Type: A  | Nom: @  | Valeur: 185.199.111.153  → SUPPRIMER
Type: A  | Nom: @  | Valeur: 185.199.108.153  → SUPPRIMER
Type: A  | Nom: @  | Valeur: 185.199.110.153  → SUPPRIMER
```

**Pour chaque enregistrement :**
1. **Cliquer** sur les "..." à droite
2. **Sélectionner** "Supprimer"
3. **Confirmer** la suppression

### 4. ➕ Ajouter la redirection web

#### Option A : Redirection Web (Recommandée)
1. **Cliquer** sur "Ajouter une entrée"
2. **Sélectionner** "Redirection web" dans la liste
3. **Configurer** :
   ```
   Sous-domaine : (laisser vide ou mettre @)
   Cible : https://www.supratourstravel.com
   Type de redirection : 301 - Redirection permanente
   Titre de la page : (optionnel)
   Mots-clés : (optionnel)
   Description : (optionnel)
   ```
4. **Cliquer** "Suivant" puis "Confirmer"

#### Option B : Si "Redirection Web" n'est pas disponible
1. **Cliquer** sur "Ajouter une entrée"
2. **Sélectionner** "CNAME"
3. **Configurer** :
   ```
   Sous-domaine : @ (ou laisser vide)
   TTL : 3600
   Cible : d3izgnl4i03wrb.cloudfront.net.
   ```
   ⚠️ **Important** : Le point final est obligatoire !

### 5. 💾 Valider les modifications
1. **Cliquer** sur "Appliquer la configuration"
2. **Confirmer** les changements
3. **Attendre** la propagation

## ⏰ Temps de propagation
- **OVH** : 15 minutes à 1 heure
- **Propagation mondiale** : 1 à 24 heures

## 🧪 Vérification après modification

### Test immédiat (après 15 minutes) :
```bash
# Vérifier la résolution DNS
dig supratourstravel.com +short

# Test avec le script
./check-dns.sh
```

### Test dans le navigateur :
1. **Taper** : `supratourstravel.com`
2. **Résultat attendu** : Redirection automatique vers `www.supratourstravel.com`

## 📸 Capture d'écran de la configuration attendue

Dans OVH Zone DNS, vous devriez avoir :
```
Type         Nom    TTL    Valeur
CNAME        www    3600   d3izgnl4i03wrb.cloudfront.net.
Redirection  @      -      https://www.supratourstravel.com (301)
```

## 🆘 En cas de problème

### Si "Redirection Web" n'existe pas :
Utilisez l'Option B (CNAME vers CloudFront)

### Si vous ne trouvez pas l'option :
1. **Chercher** "Redirection" ou "Redirect"
2. **Ou** utiliser "Sous-domaine" avec type "Redirection"

### Support OVH :
- **Documentation** : https://docs.ovh.com/fr/domains/
- **Assistance** : Via votre espace client

## ✅ Résultat final

Après configuration réussie :
- ✅ `supratourstravel.com` → redirige vers `www.supratourstravel.com`
- ✅ `www.supratourstravel.com` → affiche votre site AWS
- ✅ Menu "Stages" supprimé partout
- ✅ Déploiements futurs avec `./deploy-s3.sh`
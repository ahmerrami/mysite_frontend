# 🌐 Configuration DNS OVHcloud pour AWS CloudFront

## 🎯 Objectif
Faire pointer `supratourstravel.com` vers votre CloudFront AWS : `d3izgnl4i03wrb.cloudfront.net`

## 📋 Étapes détaillées sur OVHcloud

### 1. 🔐 Connexion à l'espace client OVHcloud
1. **Aller sur** : https://www.ovh.com/manager/
2. **Se connecter** avec vos identifiants OVHcloud
3. **Sélectionner** : "Web Cloud" dans le menu

### 2. 🌍 Accéder à la gestion DNS
1. **Cliquer** sur "Noms de domaine" dans le menu de gauche
2. **Sélectionner** votre domaine : `supratourstravel.com`
3. **Aller** dans l'onglet "Zone DNS"

### 3. ⚙️ Configuration des enregistrements DNS

#### A. Pour www.supratourstravel.com
1. **Chercher** l'enregistrement CNAME existant pour "www"
2. **Supprimer** ou **modifier** cet enregistrement
3. **Ajouter** un nouvel enregistrement :
   ```
   Type : CNAME
   Sous-domaine : www
   Cible : d3izgnl4i03wrb.cloudfront.net.
   TTL : 3600 (1 heure)
   ```

#### B. Pour supratourstravel.com (racine)
**Option 1 (Recommandée) - Redirection :**
1. **Ajouter** un enregistrement de redirection :
   ```
   Type : Redirection web
   Sous-domaine : (vide ou @)
   Cible : https://www.supratourstravel.com
   Type de redirection : 301 (Permanente)
   ```

**Option 2 - CNAME (si supporté) :**
1. **Ajouter** un enregistrement CNAME :
   ```
   Type : CNAME
   Sous-domaine : (vide ou @)
   Cible : d3izgnl4i03wrb.cloudfront.net.
   TTL : 3600
   ```

### 4. 💾 Sauvegarder et appliquer
1. **Cliquer** sur "Ajouter" pour chaque enregistrement
2. **Valider** les modifications
3. **Attendre** la propagation DNS (1-24h)

## 🔍 Vérification de la configuration

### Commandes de test (à exécuter après propagation) :
```bash
# Vérifier www
dig www.supratourstravel.com

# Vérifier le domaine racine
dig supratourstravel.com

# Test avec nslookup
nslookup www.supratourstravel.com
nslookup supratourstravel.com
```

## ⏰ Délais de propagation
- **OVH** : 15 minutes à 1 heure
- **Propagation mondiale** : 4-24 heures
- **Cache navigateur** : Peut nécessiter un vidage

## 🎯 Configuration finale attendue

Après propagation, ces commandes devraient montrer :
```bash
dig www.supratourstravel.com CNAME
# Réponse : www.supratourstravel.com CNAME d3izgnl4i03wrb.cloudfront.net
```

## 📞 Alternative : Support OVH
Si vous avez des difficultés :
- **Assistance OVH** : https://help.ovhcloud.com/
- **Téléphone** : Numéro support sur votre espace client
- **Documentation** : https://docs.ovh.com/fr/domains/

## ✅ Après configuration DNS réussie
Votre site sera accessible via :
- ✅ https://www.supratourstravel.com
- ✅ https://supratourstravel.com (redirection vers www)

Et vos déploiements continueront avec :
```bash
./deploy-s3.sh  # Met à jour automatiquement
```
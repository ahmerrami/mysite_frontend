# 🚀 Guide de déploiement AWS S3 + CloudFront

## 📋 Étapes à suivre

### 1. Configuration AWS CLI

```bash
# Configurer vos credentials AWS
aws configure
```

Vous devrez fournir :
- **AWS Access Key ID** : Obtenez-la depuis IAM dans la console AWS
- **AWS Secret Access Key** : Obtenez-la depuis IAM dans la console AWS  
- **Default region** : `eu-west-3` (Paris)
- **Default output format** : `json`

### 2. Création du bucket S3

```bash
# Créer le bucket
aws s3 mb s3://supratourstravel-frontend --region eu-west-3

# Configurer le bucket pour l'hébergement web
aws s3 website s3://supratourstravel-frontend \
  --index-document index.html \
  --error-document index.html

# Configurer la politique du bucket
aws s3api put-bucket-policy \
  --bucket supratourstravel-frontend \
  --policy file://bucket-policy.json
```

### 3. Configuration CloudFront

**Via la console AWS :**
1. Allez sur CloudFront dans la console AWS
2. Créez une nouvelle distribution
3. Configurez :
   - **Origin Domain** : supratourstravel-frontend.s3-website.eu-west-3.amazonaws.com
   - **Viewer Protocol Policy** : Redirect HTTP to HTTPS
   - **Allowed HTTP Methods** : GET, HEAD, OPTIONS, PUT, POST, PATCH, DELETE
   - **Custom Error Pages** :
     - Error Code: 403 → Response Page Path: /index.html → Response Code: 200
     - Error Code: 404 → Response Page Path: /index.html → Response Code: 200

4. Notez votre **Distribution ID** (format: E1CDGKUKVPVX55)

### 4. Configuration du domaine personnalisé

**Dans CloudFront :**
1. Allez dans votre distribution
2. Onglet "General" → "Edit"
3. **Alternate Domain Names (CNAMEs)** : ajoutez `www.supratourstravel.com`
4. **SSL Certificate** : Demandez un certificat gratuit via ACM (dans us-east-1)

**Dans Route 53 ou votre DNS :**
1. Créez un enregistrement CNAME ou ALIAS
2. Pointez `www.supratourstravel.com` vers votre domaine CloudFront

### 5. Déploiement

```bash
# Faire le build et déployer
./deploy-s3.sh
```

## 🔧 Fichiers de configuration

- `deploy-s3.sh` : Script de déploiement automatique
- `bucket-policy.json` : Politique de sécurité du bucket S3
- `cloudfront-config.json` : Configuration CloudFront (optionnel)

## 💰 Coûts estimés

- **S3** : ~0.05€/mois (pour un site de taille moyenne)
- **CloudFront** : ~1-3€/mois (selon le trafic)
- **Route 53** : ~0.50€/mois
- **Total** : ~2-4€/mois

## 🎯 Avantages de cette solution

✅ **Performance** : CDN global avec mise en cache  
✅ **Sécurité** : HTTPS automatique  
✅ **Économique** : Paiement à l'usage  
✅ **Scalabilité** : Gère automatiquement les pics de trafic  
✅ **Disponibilité** : 99.99% de disponibilité  

## 🔍 Dépannage

**Erreur 403/404 :** Vérifiez la politique du bucket et les pages d'erreur CloudFront  
**Cache non actualisé :** Lancez une invalidation CloudFront  
**Domaine personnalisé ne fonctionne pas :** Vérifiez les enregistrements DNS  

## 📞 Support

En cas de problème, vérifiez :
1. Les credentials AWS
2. Les permissions IAM
3. La configuration du bucket S3
4. Les paramètres CloudFront
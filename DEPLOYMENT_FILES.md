# 📁 Structure des fichiers de déploiement

## 🚀 Scripts de déploiement
- `setup-aws.sh` - Configuration initiale AWS S3
- `deploy-s3.sh` - Script de déploiement automatique
- `deploy-ec2.sh` - Script pour déploiement EC2 (alternatif)

## ⚙️ Configuration AWS
- `bucket-policy.json` - Politique de sécurité S3
- `amplify.yml` - Configuration AWS Amplify (alternatif)
- `nginx.conf` - Configuration nginx pour EC2 (alternatif)

## 📖 Documentation
- `AWS_DEPLOYMENT_GUIDE.md` - Guide complet de déploiement
- `DEPLOYMENT_SUMMARY.md` - Résumé rapide des étapes

## 🔒 Fichiers sensibles (ignorés par Git)
- `.aws/` - Credentials AWS CLI
- `aws/` - Fichiers d'installation AWS CLI
- `*.zip` - Archives temporaires
- `.env*` - Variables d'environnement
- `dist/` - Build de production (généré automatiquement)

## 📝 Usage

### Premier déploiement
```bash
./setup-aws.sh      # Configuration initiale
./deploy-s3.sh      # Déploiement
```

### Déploiements suivants
```bash
./deploy-s3.sh      # Redéploiement rapide
```
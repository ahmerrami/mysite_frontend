#!/bin/bash

# 🚀 Script de configuration initiale AWS pour Supratours Travel

set -e

BUCKET_NAME="supratourstravel-frontend"
REGION="eu-west-3"

echo "🔧 Configuration initiale de l'infrastructure AWS..."

# Vérifier les credentials AWS
echo "📋 Vérification des credentials AWS..."
if ! aws sts get-caller-identity > /dev/null 2>&1; then
    echo "❌ Erreur: AWS CLI n'est pas configuré."
    echo "Veuillez exécuter: aws configure"
    exit 1
fi

echo "✅ Credentials AWS validés"

# Créer le bucket S3
echo "🪣 Création du bucket S3: $BUCKET_NAME..."
if aws s3 ls "s3://$BUCKET_NAME" 2>&1 | grep -q 'NoSuchBucket'; then
    aws s3 mb "s3://$BUCKET_NAME" --region "$REGION"
    echo "✅ Bucket créé avec succès"
else
    echo "ℹ️  Bucket existe déjà"
fi

# Configurer l'hébergement web
echo "🌐 Configuration de l'hébergement web..."
aws s3 website "s3://$BUCKET_NAME" \
    --index-document index.html \
    --error-document index.html

# Appliquer la politique du bucket
echo "🔒 Application de la politique du bucket..."
aws s3api put-bucket-policy \
    --bucket "$BUCKET_NAME" \
    --policy file://bucket-policy.json

# Désactiver le blocage d'accès public (nécessaire pour un site web)
echo "🔓 Configuration des accès publics..."
aws s3api put-public-access-block \
    --bucket "$BUCKET_NAME" \
    --public-access-block-configuration "BlockPublicAcls=false,IgnorePublicAcls=false,BlockPublicPolicy=false,RestrictPublicBuckets=false"

echo ""
echo "🎉 Configuration S3 terminée !"
echo ""
echo "📋 Prochaines étapes :"
echo "1. Créez une distribution CloudFront dans la console AWS"
echo "2. Configurez l'origine : $BUCKET_NAME.s3-website.$REGION.amazonaws.com"
echo "3. Notez votre Distribution ID et mettez-le à jour dans deploy-s3.sh"
echo "4. Configurez votre domaine personnalisé et SSL"
echo "5. Exécutez ./deploy-s3.sh pour déployer"
echo ""
echo "📖 Consultez AWS_DEPLOYMENT_GUIDE.md pour plus de détails"
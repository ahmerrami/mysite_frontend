#!/bin/bash

# Script de déploiement AWS S3 + CloudFront
# Remplacez les variables ci-dessous par vos valeurs

BUCKET_NAME="supratourstravel-frontend"
DISTRIBUTION_ID="E1CDGKUKVPVX55"

REGION="eu-west-3"  # Paris

echo "🔨 Building the project..."
npm run build

echo "📦 Syncing files to S3..."
aws s3 sync dist/ s3://$BUCKET_NAME --delete --region $REGION

echo "🔄 Invalidating CloudFront cache..."
aws cloudfront create-invalidation --distribution-id $DISTRIBUTION_ID --paths "/*"

echo "✅ Deployment completed!"
echo "🌐 Your site should be available at your CloudFront domain"
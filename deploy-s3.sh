#!/bin/bash

# Script de déploiement AWS S3 + CloudFront
# Remplacez les variables ci-dessous par vos valeurs

BUCKET_NAME="supratourstravel-frontend"
DISTRIBUTION_ID="E1CDGKUKVPVX55"
REGION="eu-west-3"  # Paris

echo "🧹 Cleaning previous build..."
rm -rf dist/

echo "🔨 Building the project..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed!"
    exit 1
fi

echo "📦 Syncing files to S3..."
aws s3 sync dist/ s3://$BUCKET_NAME --delete --region $REGION

if [ $? -ne 0 ]; then
    echo "❌ S3 sync failed!"
    exit 1
fi

echo "🔄 Invalidating CloudFront cache..."
aws cloudfront create-invalidation --distribution-id $DISTRIBUTION_ID --paths "/*"

if [ $? -ne 0 ]; then
    echo "⚠️  CloudFront invalidation failed, but deployment was successful"
else
    echo "✅ CloudFront cache invalidated successfully"
fi

echo "✅ Deployment completed!"
echo "🌐 Your site will be updated in 1-2 minutes at your CloudFront domain"
echo "💡 If changes don't appear immediately, try:"
echo "   - Hard refresh (Ctrl+F5 or Cmd+Shift+R)"
echo "   - Clear browser cache"
echo "   - Wait 5 minutes for CloudFront propagation"
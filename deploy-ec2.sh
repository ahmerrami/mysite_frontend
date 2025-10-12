#!/bin/bash

# Script de déploiement EC2
# Exécutez ce script sur votre instance EC2

SERVER_PATH="/var/www/supratourstravel"
BACKUP_PATH="/var/www/backup/$(date +%Y%m%d_%H%M%S)"

echo "🔨 Building the project locally..."
npm run build

echo "📁 Creating backup of current deployment..."
sudo mkdir -p $BACKUP_PATH
sudo cp -r $SERVER_PATH/* $BACKUP_PATH/ 2>/dev/null || true

echo "📦 Deploying new build..."
sudo rm -rf $SERVER_PATH/*
sudo cp -r dist/* $SERVER_PATH/

echo "🔧 Setting proper permissions..."
sudo chown -R www-data:www-data $SERVER_PATH
sudo chmod -R 755 $SERVER_PATH

echo "🔄 Restarting nginx..."
sudo systemctl restart nginx

echo "✅ Deployment completed!"
echo "🌐 Your site should be available at http://www.supratourstravel.com"
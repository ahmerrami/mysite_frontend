#!/bin/bash

# 🧹 Script de nettoyage automatique du projet
# Supprime tous les fichiers non nécessaires au fonctionnement du site web

echo "🧹 Nettoyage du projet mysite_frontend"
echo "======================================"
echo ""

# Demander confirmation
read -p "⚠️  Voulez-vous vraiment supprimer les fichiers non nécessaires ? (y/N): " confirm
if [[ $confirm != [yY] ]]; then
    echo "❌ Nettoyage annulé"
    exit 0
fi

echo "🗑️  Suppression des fichiers inutiles..."

# Compter les fichiers avant
files_before=$(find . -type f | wc -l)

# 1. Supprimer la documentation de déploiement
echo "📋 Suppression de la documentation..."
rm -f AWS_DEPLOYMENT_GUIDE.md CONFIGURATION_DNS_OVH.md DEPLOYMENT_FILES.md
rm -f DEPLOYMENT_SUMMARY.md DNS_PROBLEM_SOLVED.md GUIDE_REDIRECTION_OVH.md
rm -f SOLUTION_IMMEDIATE.md URL_DIAGNOSTIC.md FICHIERS_INUTILES.md

# 2. Supprimer les scripts non essentiels (GARDER deploy-s3.sh)
echo "🔧 Suppression des scripts non essentiels..."
rm -f check-dns.sh check-redirect.sh configure-domain.sh
rm -f deploy-ec2.sh setup-aws.sh

# 3. Supprimer les configurations alternatives
echo "⚙️  Suppression des configurations alternatives..."
rm -f amplify.yml nginx.conf bucket-policy.json

# 5. Supprimer les fichiers GitHub Pages
echo "🌐 Suppression des fichiers GitHub Pages..."
rm -rf docs/
rm -f CNAME index.html

# 6. Supprimer les variables d'environnement si vides
echo "🌍 Vérification des variables d'environnement..."
if [ ! -s .env ]; then
    echo "   .env vide - suppression"
    rm -f .env
fi
if [ ! -s .env.production ]; then
    echo "   .env.production vide - suppression"
    rm -f .env.production
fi

# Compter les fichiers après
files_after=$(find . -type f | wc -l)
files_removed=$((files_before - files_after))

echo ""
echo "✅ Nettoyage terminé !"
echo "📊 Statistiques :"
echo "   Fichiers avant : $files_before"
echo "   Fichiers après : $files_after"
echo "   Fichiers supprimés : $files_removed"
echo ""
echo "🚀 Fichiers conservés pour le fonctionnement :"
echo "   ✅ Code source React (src/)"
echo "   ✅ Configuration build (package.json, vite.config.js)"
echo "   ✅ Script de déploiement (deploy-s3.sh)"
echo "   ✅ Ressources publiques (public/)"
echo ""
echo "🔥 Votre projet est maintenant optimisé !"
echo "   Pour déployer : ./deploy-s3.sh"
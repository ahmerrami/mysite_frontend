#!/bin/bash

# 🎛️ Script rapide pour activer/désactiver les stages

FEATURES_FILE="src/config/features.js"

echo "🎛️  Gestion des fonctionnalités - Stages"
echo "======================================"
echo ""

# Vérifier si le fichier existe
if [ ! -f "$FEATURES_FILE" ]; then
    echo "❌ Fichier de configuration non trouvé : $FEATURES_FILE"
    exit 1
fi

# Lire l'état actuel
if grep -q "enabled: true" $FEATURES_FILE | grep -A5 "STAGES:"; then
    CURRENT_STATE="activé"
else
    CURRENT_STATE="désactivé"
fi

echo "📊 État actuel des stages : $CURRENT_STATE"
echo ""
echo "Que voulez-vous faire ?"
echo "1) Activer les stages (menu + routes)"
echo "2) Désactiver les stages complètement"
echo "3) Mode maintenance (routes seulement, menu caché)"
echo "4) Afficher la configuration actuelle"
echo "5) Annuler"
echo ""

read -p "Votre choix (1-5) : " choice

case $choice in
    1)
        echo "🟢 Activation des stages..."
        sed -i '/STAGES: {/,/}/ {
            s/enabled: false/enabled: true/
            s/showInMenu: false/showInMenu: true/
            s/showInRoutes: false/showInRoutes: true/
        }' $FEATURES_FILE
        echo "✅ Stages activés (menu + routes)"
        ;;
    2)
        echo "🔴 Désactivation des stages..."
        sed -i '/STAGES: {/,/}/ {
            s/enabled: true/enabled: false/
            s/showInMenu: true/showInMenu: false/
            s/showInRoutes: true/showInRoutes: false/
        }' $FEATURES_FILE
        echo "✅ Stages désactivés complètement"
        ;;
    3)
        echo "🟡 Mode maintenance des stages..."
        sed -i '/STAGES: {/,/}/ {
            s/enabled: false/enabled: true/
            s/showInMenu: true/showInMenu: false/
            s/showInRoutes: false/showInRoutes: true/
        }' $FEATURES_FILE
        echo "✅ Stages en mode maintenance (pas de menu, routes actives)"
        ;;
    4)
        echo "📋 Configuration actuelle :"
        echo "========================="
        grep -A6 "STAGES:" $FEATURES_FILE
        exit 0
        ;;
    5)
        echo "❌ Annulé"
        exit 0
        ;;
    *)
        echo "❌ Choix invalide"
        exit 1
        ;;
esac

echo ""
echo "📋 Prochaines étapes :"
echo "1. Tester : npm run dev"
echo "2. Builder : npm run build"  
echo "3. Déployer : ./deploy-s3.sh"
echo ""
echo "🔍 Vérifier la configuration :"
echo "   ./toggle-stages.sh (option 4)"
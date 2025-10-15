#!/bin/bash

# 🎛️ Script de gestion globale des fonctionnalités

FEATURES_FILE="src/config/features.js"

echo "🎛️  Gestion des fonctionnalités du site"
echo "===================================="
echo ""

# Vérifier si le fichier existe
if [ ! -f "$FEATURES_FILE" ]; then
    echo "❌ Fichier de configuration non trouvé : $FEATURES_FILE"
    exit 1
fi

# Fonction pour lire l'état d'une fonctionnalité
get_feature_status() {
    local feature=$1
    if grep -A6 "${feature}:" $FEATURES_FILE | grep -q "enabled: true"; then
        echo "✅ activé"
    else
        echo "❌ désactivé"
    fi
}

# Afficher l'état actuel
echo "📊 État actuel des fonctionnalités :"
echo "=================================="
echo "🏠 Home         : ✅ toujours actif"
echo "ℹ️  About        : ✅ toujours actif"
echo "📋 Références   : ✅ toujours actif"
echo "🕌 Omra         : $(get_feature_status "OMRA")"
echo "📋 Appels offres: $(get_feature_status "APPELS_OFFRES")"
echo "🎓 Stages       : $(get_feature_status "STAGES")"
echo "📞 Contacts     : ✅ toujours actif"
echo ""

echo "Que voulez-vous faire ?"
echo "1) Activer OMRA (menu + routes)"
echo "2) Désactiver OMRA"
echo "3) Activer APPELS D'OFFRES (menu + routes)"
echo "4) Désactiver APPELS D'OFFRES"
echo "5) Activer STAGES (menu + routes)"
echo "6) Désactiver STAGES"
echo "7) ACTIVER TOUT (Omra + Appels d'offres + Stages)"
echo "8) DÉSACTIVER TOUT (Omra + Appels d'offres + Stages)"
echo "9) Configuration personnalisée"
echo "10) Afficher la configuration complète"
echo "11) Annuler"
echo ""

read -p "Votre choix (1-11) : " choice

case $choice in
    1)
        echo "🟢 Activation d'OMRA..."
        sed -i '/OMRA: {/,/}/ {
            s/enabled: false/enabled: true/
            s/showInMenu: false/showInMenu: true/
            s/showInRoutes: false/showInRoutes: true/
        }' $FEATURES_FILE
        echo "✅ OMRA activé"
        ;;
    2)
        echo "🔴 Désactivation d'OMRA..."
        sed -i '/OMRA: {/,/}/ {
            s/enabled: true/enabled: false/
            s/showInMenu: true/showInMenu: false/
            s/showInRoutes: true/showInRoutes: false/
        }' $FEATURES_FILE
        echo "✅ OMRA désactivé"
        ;;
    3)
        echo "🟢 Activation d'APPELS D'OFFRES..."
        sed -i '/APPELS_OFFRES: {/,/}/ {
            s/enabled: false/enabled: true/
            s/showInMenu: false/showInMenu: true/
            s/showInRoutes: false/showInRoutes: true/
        }' $FEATURES_FILE
        echo "✅ APPELS D'OFFRES activé"
        ;;
    4)
        echo "🔴 Désactivation d'APPELS D'OFFRES..."
        sed -i '/APPELS_OFFRES: {/,/}/ {
            s/enabled: true/enabled: false/
            s/showInMenu: true/showInMenu: false/
            s/showInRoutes: true/showInRoutes: false/
        }' $FEATURES_FILE
        echo "✅ APPELS D'OFFRES désactivé"
        ;;
    5)
        echo "🟢 Activation de STAGES..."
        sed -i '/STAGES: {/,/}/ {
            s/enabled: false/enabled: true/
            s/showInMenu: false/showInMenu: true/
            s/showInRoutes: false/showInRoutes: true/
        }' $FEATURES_FILE
        echo "✅ STAGES activé"
        ;;
    6)
        echo "🔴 Désactivation de STAGES..."
        sed -i '/STAGES: {/,/}/ {
            s/enabled: true/enabled: false/
            s/showInMenu: true/showInMenu: false/
            s/showInRoutes: true/showInRoutes: false/
        }' $FEATURES_FILE
        echo "✅ STAGES désactivé"
        ;;
    7)
        echo "🟢 ACTIVATION COMPLÈTE..."
        # Activer OMRA
        sed -i '/OMRA: {/,/}/ {
            s/enabled: false/enabled: true/
            s/showInMenu: false/showInMenu: true/
            s/showInRoutes: false/showInRoutes: true/
        }' $FEATURES_FILE
        # Activer APPELS_OFFRES
        sed -i '/APPELS_OFFRES: {/,/}/ {
            s/enabled: false/enabled: true/
            s/showInMenu: false/showInMenu: true/
            s/showInRoutes: false/showInRoutes: true/
        }' $FEATURES_FILE
        # Activer STAGES
        sed -i '/STAGES: {/,/}/ {
            s/enabled: false/enabled: true/
            s/showInMenu: false/showInMenu: true/
            s/showInRoutes: false/showInRoutes: true/
        }' $FEATURES_FILE
        echo "✅ Toutes les fonctionnalités activées !"
        ;;
    8)
        echo "🔴 DÉSACTIVATION COMPLÈTE..."
        # Désactiver OMRA
        sed -i '/OMRA: {/,/}/ {
            s/enabled: true/enabled: false/
            s/showInMenu: true/showInMenu: false/
            s/showInRoutes: true/showInRoutes: false/
        }' $FEATURES_FILE
        # Désactiver APPELS_OFFRES
        sed -i '/APPELS_OFFRES: {/,/}/ {
            s/enabled: true/enabled: false/
            s/showInMenu: true/showInMenu: false/
            s/showInRoutes: true/showInRoutes: false/
        }' $FEATURES_FILE
        # Désactiver STAGES
        sed -i '/STAGES: {/,/}/ {
            s/enabled: true/enabled: false/
            s/showInMenu: true/showInMenu: false/
            s/showInRoutes: true/showInRoutes: false/
        }' $FEATURES_FILE
        echo "✅ Toutes les fonctionnalités désactivées !"
        ;;
    9)
        echo "🔧 Configuration personnalisée..."
        echo "Fonctionnalités disponibles :"
        echo "- OMRA : Pèlerinage et voyages religieux"
        echo "- APPELS_OFFRES : Appels d'offres publics"
        echo "- STAGES : Formulaire de candidature de stages"
        echo ""
        echo "💡 Modifiez directement le fichier : $FEATURES_FILE"
        echo "📖 Consultez le guide : GESTION_FONCTIONNALITES.md"
        ;;
    10)
        echo "📋 Configuration complète :"
        echo "========================="
        grep -A8 "OMRA:\|APPELS_OFFRES:\|STAGES:" $FEATURES_FILE
        exit 0
        ;;
    11)
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
echo "   ./manage-features.sh (option 10)"
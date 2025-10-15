#!/bin/bash

# Script de vérification de la redirection domaine racine
# À exécuter APRÈS avoir configuré la redirection sur OVH

DOMAIN="supratourstravel.com"
WWW_DOMAIN="www.supratourstravel.com"

echo "🔍 Vérification de la redirection sur OVHcloud"
echo "=============================================="
echo ""

# Test 1: Vérifier la résolution DNS du domaine racine
echo "1. 🏠 Résolution DNS de $DOMAIN :"
echo "--------------------------------"
ROOT_DNS=$(dig +short $DOMAIN | head -1)
echo "Résultat DNS: $ROOT_DNS"

if [[ "$ROOT_DNS" == d3izgnl4i03wrb.cloudfront.net* ]] || [[ "$ROOT_DNS" == 99.86.* ]]; then
    echo "✅ DNS correctement configuré (pointe vers CloudFront)"
elif [[ "$ROOT_DNS" == 185.199.* ]]; then
    echo "❌ DNS pointe encore vers GitHub Pages"
    echo "   → Vérifiez la configuration sur OVH"
elif [[ -z "$ROOT_DNS" ]]; then
    echo "⏳ DNS en cours de propagation"
else
    echo "⚠️  DNS pointe vers: $ROOT_DNS"
fi

echo ""

# Test 2: Test de redirection HTTP
echo "2. 🔄 Test de redirection HTTP :"
echo "-------------------------------"
HTTP_RESPONSE=$(curl -s -o /dev/null -w "%{http_code} %{redirect_url}" "http://$DOMAIN/" 2>/dev/null)
HTTP_CODE=$(echo $HTTP_RESPONSE | cut -d' ' -f1)
REDIRECT_URL=$(echo $HTTP_RESPONSE | cut -d' ' -f2-)

echo "Code HTTP: $HTTP_CODE"
echo "Redirection vers: $REDIRECT_URL"

if [[ "$HTTP_CODE" == "301" || "$HTTP_CODE" == "302" ]]; then
    if [[ "$REDIRECT_URL" == *"www.supratourstravel.com"* ]]; then
        echo "✅ Redirection HTTP fonctionne correctement"
    else
        echo "⚠️  Redirection vers une URL inattendue"
    fi
elif [[ "$HTTP_CODE" == "200" ]]; then
    echo "ℹ️  Pas de redirection, contenu servi directement"
else
    echo "❌ Erreur HTTP: $HTTP_CODE"
fi

echo ""

# Test 3: Test de redirection HTTPS
echo "3. 🔒 Test de redirection HTTPS :"
echo "--------------------------------"
HTTPS_RESPONSE=$(curl -s -o /dev/null -w "%{http_code} %{redirect_url}" "https://$DOMAIN/" 2>/dev/null)
HTTPS_CODE=$(echo $HTTPS_RESPONSE | cut -d' ' -f1)
HTTPS_REDIRECT=$(echo $HTTPS_RESPONSE | cut -d' ' -f2-)

echo "Code HTTPS: $HTTPS_CODE"
echo "Redirection vers: $HTTPS_REDIRECT"

if [[ "$HTTPS_CODE" == "301" || "$HTTPS_CODE" == "302" ]]; then
    if [[ "$HTTPS_REDIRECT" == *"www.supratourstravel.com"* ]]; then
        echo "✅ Redirection HTTPS fonctionne correctement"
    else
        echo "⚠️  Redirection HTTPS vers une URL inattendue"
    fi
elif [[ "$HTTPS_CODE" == "200" ]]; then
    echo "ℹ️  Pas de redirection HTTPS, contenu servi directement"
else
    echo "❌ Erreur HTTPS: $HTTPS_CODE"
fi

echo ""

# Test 4: Vérifier que www fonctionne
echo "4. ✅ Test de www.supratourstravel.com :"
echo "--------------------------------------"
WWW_CODE=$(curl -s -o /dev/null -w "%{http_code}" "https://$WWW_DOMAIN/" 2>/dev/null)
echo "Code HTTPS www: $WWW_CODE"

if [[ "$WWW_CODE" == "200" ]]; then
    echo "✅ www.supratourstravel.com fonctionne parfaitement"
else
    echo "❌ Problème avec www.supratourstravel.com: $WWW_CODE"
fi

echo ""

# Résumé final
echo "📊 RÉSUMÉ :"
echo "==========="

if [[ "$HTTP_CODE" == "301" || "$HTTP_CODE" == "302" ]] && [[ "$WWW_CODE" == "200" ]]; then
    echo "🎉 Redirection configurée avec succès !"
    echo "   ✅ supratourstravel.com redirige vers www"
    echo "   ✅ www.supratourstravel.com fonctionne"
    echo ""
    echo "🌐 Votre site est accessible via :"
    echo "   • https://supratourstravel.com (redirige)"
    echo "   • https://www.supratourstravel.com (direct)"
elif [[ -z "$ROOT_DNS" ]] || [[ "$ROOT_DNS" == 185.199.* ]]; then
    echo "⏳ Configuration DNS en cours..."
    echo "   → Attendez 15 minutes à 24h pour la propagation"
    echo "   → Relancez ce script : ./check-redirect.sh"
else
    echo "🔧 Configuration à vérifier :"
    echo "   → Vérifiez la redirection sur OVH"
    echo "   → Consultez : GUIDE_REDIRECTION_OVH.md"
fi

echo ""
echo "🔄 Pour relancer ce test : ./check-redirect.sh"
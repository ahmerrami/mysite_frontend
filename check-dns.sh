#!/bin/bash

# Script de vérification DNS pour OVHcloud
# À exécuter APRÈS avoir configuré le DNS

DOMAIN="supratourstravel.com"
WWW_DOMAIN="www.supratourstravel.com"
CLOUDFRONT_DOMAIN="d3izgnl4i03wrb.cloudfront.net"

echo "🔍 Vérification DNS pour OVHcloud"
echo "=================================="
echo ""

# Test 1: Résolution du domaine www
echo "1. 🌐 Test de www.supratourstravel.com :"
echo "----------------------------------------"
dig +short $WWW_DOMAIN CNAME
WWW_RESULT=$(dig +short $WWW_DOMAIN CNAME)

if [ "$WWW_RESULT" = "$CLOUDFRONT_DOMAIN." ]; then
    echo "✅ www correctement configuré"
else
    echo "❌ www non configuré ou propagation en cours"
    echo "   Résultat actuel: $WWW_RESULT"
    echo "   Attendu: $CLOUDFRONT_DOMAIN."
fi

echo ""

# Test 2: Résolution du domaine racine
echo "2. 🏠 Test de supratourstravel.com :"
echo "-----------------------------------"
ROOT_RESULT=$(dig +short $DOMAIN)
echo "Résultat: $ROOT_RESULT"

if [ -n "$ROOT_RESULT" ]; then
    echo "✅ Domaine racine résolu"
else
    echo "❌ Domaine racine non résolu ou propagation en cours"
fi

echo ""

# Test 3: Test HTTP/HTTPS
echo "3. 🌍 Test de connectivité HTTP :"
echo "--------------------------------"

# Test www
echo "Test https://www.supratourstravel.com :"
HTTP_WWW=$(curl -s -o /dev/null -w "%{http_code}" https://www.supratourstravel.com/ 2>/dev/null || echo "000")
if [ "$HTTP_WWW" = "200" ]; then
    echo "✅ www accessible (HTTP $HTTP_WWW)"
else
    echo "❌ www non accessible (HTTP $HTTP_WWW)"
fi

# Test domaine racine
echo "Test https://supratourstravel.com :"
HTTP_ROOT=$(curl -s -o /dev/null -w "%{http_code}" https://supratourstravel.com/ 2>/dev/null || echo "000")
if [ "$HTTP_ROOT" = "200" ] || [ "$HTTP_ROOT" = "301" ] || [ "$HTTP_ROOT" = "302" ]; then
    echo "✅ Domaine racine accessible (HTTP $HTTP_ROOT)"
else
    echo "❌ Domaine racine non accessible (HTTP $HTTP_ROOT)"
fi

echo ""

# Résumé
echo "📊 RÉSUMÉ :"
echo "==========="
if [ "$WWW_RESULT" = "$CLOUDFRONT_DOMAIN." ] && [ "$HTTP_WWW" = "200" ]; then
    echo "🎉 Configuration DNS réussie !"
    echo "   Votre site est accessible sur https://www.supratourstravel.com"
elif [ "$WWW_RESULT" = "$CLOUDFRONT_DOMAIN." ]; then
    echo "⏳ DNS configuré, attendre propagation SSL (peut prendre 30 min)"
elif [ -z "$WWW_RESULT" ]; then
    echo "⏳ Configuration DNS en cours de propagation (attendre 1-24h)"
else
    echo "❌ Vérifier la configuration DNS sur OVHcloud"
    echo "   Guide : CONFIGURATION_DNS_OVH.md"
fi

echo ""
echo "🔄 Pour relancer ce test : ./check-dns.sh"
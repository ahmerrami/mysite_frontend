// 🎛️ Configuration des fonctionnalités du site
// Le menu Stages est activé automatiquement si des villes et périodes sont disponibles via l'API

// Utiliser la variable d'environnement ou l'URL par défaut
const API_URL = import.meta.env.VITE_API_URL || 'https://idara.supratourstravel.com/api/stages';

// Configuration statique des fonctionnalités (autres que Stages)
export const STATIC_FEATURES = {
  // 📝 Fonctionnalité Stages - sera déterminée dynamiquement
  STAGES: {
    enabled: false,         // Sera calculé dynamiquement
    showInMenu: false,      // Sera calculé dynamiquement
    showInRoutes: false,    // Sera calculé dynamiquement
    title: "Stages",
    path: "/stage"
  },

  // 📄 Fonctionnalité PDF Viewer
  PDF_VIEWER: {
    enabled: true,           // true = activer, false = désactiver
    title: "PDF Viewer"
  },

  // 🏠 Autres fonctionnalités principales (toujours actives)
  ABOUT: {
    enabled: true,
    title: "About",
    path: "/about"
  },

  REFERENCES: {
    enabled: true,
    title: "Références", 
    path: "/reference"
  },

  OMRA: {
    enabled: false,          // true = activer, false = désactiver
    showInMenu: false,       // Afficher dans le menu de navigation
    showInRoutes: false,     // Permettre l'accès via URL directe
    title: "Omra",
    path: "/omra"
  },

  APPELS_OFFRES: {
    enabled: false,          // true = activer, false = désactiver
    showInMenu: false,       // Afficher dans le menu de navigation
    showInRoutes: false,     // Permettre l'accès via URL directe
    title: "Appels d'offres",
    path: "/ao"
  },

  CONTACTS: {
    enabled: true,
    title: "Contacts",
    path: "/contact"
  }
};

// Cache pour les résultats API (éviter trop d'appels)
let stagesAvailabilityCache = null;
let cacheTimestamp = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes en millisecondes

// 🔍 Fonction pour vérifier la disponibilité des stages via API
export const checkStagesAvailability = async () => {
  const now = Date.now();
  
  // Utiliser le cache s'il est encore valide
  if (stagesAvailabilityCache !== null && cacheTimestamp && (now - cacheTimestamp) < CACHE_DURATION) {
    console.log('🔄 Utilisation du cache pour les stages:', stagesAvailabilityCache);
    return stagesAvailabilityCache;
  }

  console.log('🔍 Vérification de la disponibilité des stages...');
  
  try {
    // Vérifier les villes ET les périodes en parallèle avec timeout
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Timeout')), 5000)
    );

    const [villesResponse, periodesResponse] = await Promise.race([
      Promise.all([
        fetch(`${API_URL}/villes/`),
        fetch(`${API_URL}/periodes/`)
      ]),
      timeoutPromise
    ]);

    console.log('� Réponses API:', {
      villes: `${villesResponse.status} ${villesResponse.statusText}`,
      periodes: `${periodesResponse.status} ${periodesResponse.statusText}`
    });

    if (!villesResponse.ok || !periodesResponse.ok) {
      throw new Error(`API Error: villes(${villesResponse.status}), periodes(${periodesResponse.status})`);
    }

    const [villesData, periodesData] = await Promise.all([
      villesResponse.json(),
      periodesResponse.json()
    ]);

    console.log('📋 Données récupérées:', {
      villes: villesData?.length || 0,
      periodes: periodesData?.length || 0
    });

    // Les stages sont disponibles s'il y a au moins une ville ET une période
    const isAvailable = Array.isArray(villesData) && villesData.length > 0 && 
                       Array.isArray(periodesData) && periodesData.length > 0;

    console.log(`🎯 Stages ${isAvailable ? 'DISPONIBLES' : 'NON DISPONIBLES'}`);

    // Mettre en cache le résultat
    stagesAvailabilityCache = isAvailable;
    cacheTimestamp = now;

    return isAvailable;

  } catch (error) {
    console.warn('⚠️ Impossible de vérifier la disponibilité des stages:', error.message);
    // En cas d'erreur, ne pas activer les stages
    stagesAvailabilityCache = false;
    cacheTimestamp = now;
    return false;
  }
};

// 🎛️ Fonction pour obtenir les fonctionnalités avec vérification dynamique
export const getFeatures = async () => {
  const stagesAvailable = await checkStagesAvailability();
  
  return {
    ...STATIC_FEATURES,
    STAGES: {
      ...STATIC_FEATURES.STAGES,
      enabled: stagesAvailable,
      showInMenu: stagesAvailable,
      showInRoutes: stagesAvailable
    }
  };
};

// �🛠️ Fonction utilitaire pour vérifier si une fonctionnalité est active
export const isFeatureEnabled = async (feature) => {
  if (feature === 'STAGES') {
    return await checkStagesAvailability();
  }
  return STATIC_FEATURES[feature]?.enabled || false;
};

// Export pour compatibilité (version synchrone avec cache)
export const FEATURES = STATIC_FEATURES;
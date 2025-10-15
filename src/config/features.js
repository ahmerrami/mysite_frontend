// 🎛️ Configuration des fonctionnalités du site
// Modifiez ces valeurs pour activer/désactiver certaines sections

export const FEATURES = {
  // 📝 Fonctionnalité Stages
  STAGES: {
    enabled: true,          // true = activer, false = désactiver
    showInMenu: true,       // Afficher dans le menu de navigation
    showInRoutes: true,     // Permettre l'accès via URL directe
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

// 🛠️ Fonction utilitaire pour vérifier si une fonctionnalité est active
export const isFeatureEnabled = (feature) => {
  return FEATURES[feature]?.enabled || false;
};

// 📋 Instructions d'utilisation :
// 
// Pour ACTIVER les stages :
// 1. Changer STAGES.enabled à true
// 2. Changer STAGES.showInMenu à true (pour l'afficher dans le menu)
// 3. Changer STAGES.showInRoutes à true (pour permettre l'accès URL)
// 4. Redéployer avec ./deploy-s3.sh
//
// Pour DÉSACTIVER les stages :
// 1. Changer STAGES.enabled à false
// 2. Changer STAGES.showInMenu à false
// 3. Redéployer avec ./deploy-s3.sh
// ContactList.jsx (functional component)
import React from 'react';
import styles from './Reference.module.css';

const ReferenceList = ({ references }) => {
    return (
        <>
            <h2 className={styles.title}>Nos Références</h2>
            
            {/* Section introductive */}
            <div className={styles.introSection}>
                <div className={styles.introContent}>
                    <h3 className={styles.subtitle}>La confiance de nos partenaires, notre plus belle récompense</h3>
                    <p className={styles.description}>
                        Depuis notre création, <strong>Supratours Travel</strong> a eu l'honneur d'accompagner des institutions prestigieuses 
                        et des organisations de renom dans la réalisation de leurs projets de voyage et de transport.
                    </p>
                    <p className={styles.description}>
                        Nos partenaires nous font confiance pour leur expertise en matière de :
                    </p>
                    <div className={styles.expertiseGrid}>
                        <div className={styles.expertiseItem}>
                            <span className={styles.icon}>🚌</span>
                            <span>Transport de groupes</span>
                        </div>
                        <div className={styles.expertiseItem}>
                            <span className={styles.icon}>🏛️</span>
                            <span>Missions institutionnelles</span>
                        </div>
                        <div className={styles.expertiseItem}>
                            <span className={styles.icon}>🕌</span>
                            <span>Pèlerinages et Omra</span>
                        </div>
                        <div className={styles.expertiseItem}>
                            <span className={styles.icon}>✈️</span>
                            <span>Voyages d'affaires</span>
                        </div>
                    </div>
                    <p className={styles.highlight}>
                        <em>"Découvrez ci-dessous quelques-unes des organisations qui nous ont fait confiance pour leurs déplacements."</em>
                    </p>
                </div>
            </div>

            {/* Carousel circulaire des références */}
            <div className={styles.circularCarousel}>
                <div className={styles.circle}>
                {references.map((reference, index) => (
                    <div 
                        key={reference.id} 
                        className={styles.circleItem}
                        style={{
                            '--item-index': index,
                            '--total-items': references.length
                        }}
                    >
                        <img src={reference.imageUrl} alt={reference.name} />
                    </div>
                ))}
                </div>
            </div>
        </>
    );
};

const Reference = () => {
  const referenceList = [
    { id: 1, name: 'ONCF', imageUrl:'./references/01_ONCF.png'},
    { id: 2, name: 'Supratours', imageUrl:'./references/02_Supratours.png'},
    { id: 3, name: 'SMTR CARRE', imageUrl:'./references/03_SMTR_CARRE.png'},
    { id: 4, name: 'USCM', imageUrl:'./references/04_USCM.png'},
    { id: 5, name: 'Chambdre des representants', imageUrl:'./references/05_Chambre_representants.png'},
    { id: 6, name: 'Ministere de l\'interieur', imageUrl:'./references/06_Ministere_interieur.png'},
    { id: 7, name: 'Ministere reforme publique', imageUrl:'./references/07_Ministere_reforme_public.png'},
    { id: 8, name: 'Ministere jeunesse et sport', imageUrl:'./references/08_Ministère de jeunesse et sport.png'},
    { id: 9, name: 'Ministère de l\'énergie', imageUrl:'./references/09_Ministère d_énergie.png'},
    { id: 10, name: 'Ministère d\'habitat', imageUrl:'./references/10_Ministère d_habitat.png'},
    { id: 11, name: 'Fédération Hoki', imageUrl:'./references/11_Fédération Hoki.png'},
    { id: 12, name: '12_Ministère d_éducation national', imageUrl:'./references/12_Ministère d_éducation national.png'},
  ];

  return (
    <div>
      <ReferenceList references={referenceList} />
    </div>
  );
}

export default Reference
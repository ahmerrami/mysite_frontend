// ContactList.jsx (functional component)
import React from 'react';
import styles from './Reference.module.css';

const ReferenceList = ({ references }) => {
    return (
        <>
            <h2 className='title'>References</h2>
            <div className={styles.carouselContainer}>
                <div className={styles.slides}>
                {references.map((reference) => (
                    
                        <div key={reference.id} className={styles.slide}>
                            
                            <img src={reference.imageUrl} alt="" />
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
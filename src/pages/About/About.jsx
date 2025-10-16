import styles from './About.module.css';

function About(){

    return(
        <div className={styles.aboutContainer}>
            {/* Section Hero */}
            <div className={styles.heroSection}>
                <h1 className={styles.mainTitle}>Supratours Travel</h1>
                <p className={styles.heroSubtitle}>Votre partenaire de confiance pour tous vos déplacements</p>
                <div className={styles.heroHighlight}>
                    <span className={styles.yearBadge}>Depuis 2009</span>
                    <span className={styles.affiliationBadge}>Filiale ONCF</span>
                </div>
            </div>

            {/* Section Présentation */}
            <div className={styles.presentationSection}>
                <h2 className={styles.sectionTitle}>Qui sommes-nous ?</h2>
                <div className={styles.contentGrid}>
                    <div className={styles.textContent}>
                        <p className={styles.description}>
                            <strong>Supratours Travel</strong>, grande agence de voyages et filiale prestigieuse de l'<strong>Office National des Chemins de Fer</strong>, 
                            s'impose depuis sa création en <strong>2009</strong> comme un acteur incontournable du secteur du voyage et du transport au Maroc.
                        </p>
                        <p className={styles.description}>
                            Notre engagement constant envers l'<strong>innovation</strong>, le <strong>développement</strong> et la <strong>diversification</strong> 
                            nous permet d'offrir à notre clientèle distinguée des formules originales et personnalisées à des tarifs compétitifs.
                        </p>
                    </div>
                    <div className={styles.statsBox}>
                        <div className={styles.statItem}>
                            <span className={styles.statNumber}>15+</span>
                            <span className={styles.statLabel}>Années d'expérience</span>
                        </div>
                        <div className={styles.statItem}>
                            <span className={styles.statNumber}>1000+</span>
                            <span className={styles.statLabel}>Événements organisés</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Section Expertise */}
            <div className={styles.expertiseSection}>
                <h2 className={styles.sectionTitle}>Notre Excellence Reconnue</h2>
                <p className={styles.expertiseIntro}>
                    Reconnue pour son <strong>efficacité</strong> et sa <strong>rigueur</strong> dans la conception de prestations 
                    de haute qualité, Supratours Travel a bâti une solide réputation en orchestrant avec succès des manifestations d'envergure internationale.
                </p>
                
                <div className={styles.servicesGrid}>
                    <div className={styles.serviceCard}>
                        <div className={styles.serviceIcon}>🎯</div>
                        <h3>Services Touristiques</h3>
                        <ul>
                            <li>Billetterie complète</li>
                            <li>Hajj & Omra</li>
                            <li>Voyages organisés</li>
                        </ul>
                    </div>
                    <div className={styles.serviceCard}>
                        <div className={styles.serviceIcon}>🏢</div>
                        <h3>Événementiel MICE</h3>
                        <ul>
                            <li>Congrès internationaux</li>
                            <li>Hébergement premium</li>
                            <li>Logistique complète</li>
                        </ul>
                    </div>
                    <div className={styles.serviceCard}>
                        <div className={styles.serviceIcon}>🚄</div>
                        <h3>Services Ferroviaires</h3>
                        <ul>
                            <li>Commercialisation titres ONCF</li>
                            <li>Accueil voyageurs</li>
                            <li>Centre Relation Client</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Section Références Prestigieuses */}
            <div className={styles.achievementsSection}>
                <h2 className={styles.sectionTitle}>Nos Réalisations Prestigieuses</h2>
                <div className={styles.achievementsList}>
                    <div className={styles.achievementItem}>
                        <span className={styles.achievementIcon}>🌍</span>
                        <div>
                            <strong>4ème Session de la Conférence des États Parties</strong>
                            <p>Convention des Nations Unies Contre la Corruption</p>
                        </div>
                    </div>
                    <div className={styles.achievementItem}>
                        <span className={styles.achievementIcon}>👩‍💼</span>
                        <div>
                            <strong>Congrès du Ministère de l'Intérieur</strong>
                            <p>Femmes Élues d'Afrique à Tanger</p>
                        </div>
                    </div>
                    <div className={styles.achievementItem}>
                        <span className={styles.achievementIcon}>🏛️</span>
                        <div>
                            <strong>23ème Session du Comité du Patrimoine Mondial</strong>
                            <p>UNESCO</p>
                        </div>
                    </div>
                    <div className={styles.achievementItem}>
                        <span className={styles.achievementIcon}>🚄</span>
                        <div>
                            <strong>11ème Édition du Congrès UIC</strong>
                            <p>Grande Vitesse à Marrakech</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Section CTA */}
            <div className={styles.ctaSection}>
                <h2 className={styles.ctaTitle}>Faites confiance à notre expertise</h2>
                <p className={styles.ctaDescription}>
                    Que ce soit pour vos déplacements professionnels, vos événements d'entreprise ou vos voyages personnels, 
                    Supratours Travel met son savoir-faire et son réseau au service de vos projets.
                </p>
            </div>
        </div>
    );
}

export default About
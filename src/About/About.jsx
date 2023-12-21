import styles from './About.module.css';

function About(){

    return(
        <div className={styles.txt}>
            <h2>Qui somme nous ?</h2>
            <p>Grande agence de voyages, filiale de l’Office National des Chemins de Fer,
            Supratours Travel n’a cessé, depuis sa création en 2009, d’innover, de développer
            et de diversifier ses activités en offrant à sa clientèle de nombreuses formules
            originales à des prix attractifs.</p>
            <p>Connue pour son efficacité et sa rigueur dans la conception de ses prestations
            aussi bien touristiques (billetterie, Hajj/omra …) que évènementielles
            (MICE, hébergement …), Supratours Travel a acquis une solide notoriété en
            organisant avec succès de nombreuses manifestations d’envergure au Maroc:
            4ème Session de la Conférence des Etats Parties à la Convention des Nations Unies
            Contre la Corruption, Congrès du Ministère de l’Intérieur relatif aux Femmes Elues
            d’Afrique à Tanger, Conventions des cadres de l’ONCF, 23ème session du Comité du
            Patrimoine Mondial – UNESCO … et la 11ème édition du congrès UIC de la grande vitesse à Marrakech.</p>
            <p>En relation avec l’activité de voyage, Supratours Travel a développé ces
            dernières années des services associés au transport ferroviaire à savoir :</p>
            <ul>
                <li>Commercialisation des titres de voyage par train;</li>
                <li>Accueil des voyageurs ONCF ;</li>
                <li>Gestion du Centre Relation Client.</li>
            </ul>
            <hr/>
        </div>
    );
}

export default About
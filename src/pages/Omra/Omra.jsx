import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Omra.module.css';

function Omra() {
    const [images, setImages] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false); // Nouvel état pour contrôler le défilement

    // Récupération des images depuis l'API
    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.get('https://errami.pythonanywhere.com/api/omra/images/');
                setImages(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des images :', error);
            }
        };

        fetchImages();
    }, []);

    // Gestion du slideshow avec contrôle de pause
    useEffect(() => {
        if (images.length > 0 && !isPaused) {
            const interval = setInterval(() => {
                setCurrentImageIndex((prevIndex) =>
                    (prevIndex + 1) % images.length
                );
            }, 5000);

            return () => clearInterval(interval);
        }
    }, [images, isPaused]);

    // Gestion des événements de survol
    const handleMouseEnter = () => setIsPaused(true); // Arrête le défilement
    const handleMouseLeave = () => setIsPaused(false); // Relance le défilement

    return (
        <div
            className={styles.imgContainer}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {images.length > 0 ? (
                <>
                    <img
                        src={images[currentImageIndex].image}
                        alt={images[currentImageIndex].objet || 'Omra'}
                        className={styles.image}
                    />
                    <p className={styles.description}>
                        {images[currentImageIndex].description || 'Description non disponible'}
                    </p>
                </>
            ) : (
                <p>Chargement des images...</p>
            )}
        </div>
    );
}

export default Omra;

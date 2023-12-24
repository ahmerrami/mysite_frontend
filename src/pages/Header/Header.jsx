import styles from './Header.module.css';

function Header({setActiveContent}){
    const imageUrl = './logo.png';
    // Function to handle menu item clicks
    const handleMenuClick = (content) => {
        setActiveContent(content);
    };

    return(
        <header>
            <img src={imageUrl} alt="Logo" className={styles.logo}/>
            <button onClick={() => handleMenuClick('home')}>Home</button>
            <button onClick={() => handleMenuClick('about')}>About</button>
            <button onClick={() => handleMenuClick('reference')}>Référence</button>
            <button onClick={() => handleMenuClick('omra')}>Omra</button>
            <button onClick={() => handleMenuClick('contact')}>Contact</button>
        </header>
    );
}

export default Header
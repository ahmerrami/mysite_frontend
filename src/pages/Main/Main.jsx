import About from '../About/About.jsx';
import Reference from '../Reference/Reference.jsx';
import Contact from '../Contact/Contact.jsx';
import Omra from '../Omra/Omra.jsx';
import Slider from '../Slider/Slider.jsx';

function Main({activeContent}){

    return(
        /* Display content based on activeContent state */
        <main>
        {activeContent === 'home' && <Slider/>}
        {activeContent === 'about' && <About/>}
        {activeContent === 'reference' && <Reference/>}
        {activeContent === 'omra' && <Omra/>}
        {activeContent === 'contact' && <Contact/>}
        </main>
    );
}

export default Main
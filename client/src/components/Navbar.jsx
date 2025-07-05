import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { navLinks } from '../constants';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 0;
            setScrolled(isScrolled);
        };
        
        handleScroll();
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleSectionClick = (e, link) => {
        e.preventDefault();
        
        if (link.startsWith('#')) {
            const sectionId = link.substring(1);
            
            if (location.pathname !== '/') {
                // Navigate to home page first, then scroll to section
                navigate('/');
                setTimeout(() => {
                    const element = document.getElementById(sectionId);
                    if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                    }
                }, 100);
            } else {
                // Already on home page, just scroll
                const element = document.getElementById(sectionId);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }
        }
    };

    const handleContactClick = (e) => {
        handleSectionClick(e, '#contatti');
    };

    return (
        <header className={`navbar ${scrolled ? "scrolled" : "not-scrolled"}`}>
            <div className='inner'>
                <Link className='logo' to='/'>
                    <img src="/images/little_italy_logo2.png" width={100} height={20} alt="little italy uk" />
                </Link>
                <nav className='desktop'>
                   <ul>
                    {navLinks.map(({link, name}) => (
                        <li key={name} className='group'>
                            {/* Use Link for pages, custom handler for sections */}
                            {link.startsWith('/') ? (
                                <Link to={link}>
                                    <span>{name}</span>
                                    <span className='underline'></span>
                                </Link>
                            ) : (
                                <a 
                                    href={link}
                                    onClick={(e) => handleSectionClick(e, link)}
                                >
                                    <span>{name}</span>
                                    <span className='underline'></span>
                                </a>
                            )}
                        </li>
                    ))}
                    </ul> 
                </nav>
                <a 
                    href='#contatti' 
                    className='contact-btn group'
                    onClick={handleContactClick}
                >
                    <div className='inner'>
                        <span>Contatti</span>
                    </div>
                </a>
            </div>
        </header>
    )
}

export default Navbar;
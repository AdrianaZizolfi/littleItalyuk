import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { navLinks } from '../constants';
import LanguageSwitcher from '../components/LanguageSwitcher';

const Navbar = () => {
    const { t } = useTranslation();
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

    // Close mobile menu when route changes
    useEffect(() => {
        setMobileMenuOpen(false);
    }, [location.pathname]);

    const handleSectionClick = (e, link) => {
        e.preventDefault();
        
        // Close mobile menu when clicking a link
        setMobileMenuOpen(false);
        
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

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    return (
        <header className={`navbar ${scrolled ? "scrolled" : "not-scrolled"}`}>
            <div className='inner'>
                <Link className='logo' to='/'>
                    <img src="/images/little_italy_logo2.png" width={100} height={20} alt="little italy uk" />
                </Link>

                {/* Desktop Navigation */}
                <nav className='desktop'>
                   <ul>
                    {navLinks.map(({ link, name, children }) => (
                      <li key={name} className='group relative'>
                        {link.startsWith('/') ? (
                          <Link to={link}>
                            <span>{t(name)}</span>
                            <span className='underline'></span>
                          </Link>
                        ) : (
                          <a href={link} onClick={(e) => handleSectionClick(e, link)}>
                            <span>{t(name)}</span>
                            <span className='underline'></span>
                          </a>
                        )}

                        {/* Submenu */}
                        {children && (
                          <ul className='submenu absolute top-full left-0 bg-white shadow-lg rounded p-2 hidden group-hover:block z-50'>
                            {children.map(({ name: childName, link: childLink }) => (
                              <li key={childName}>
                                <Link to={childLink} className='block px-4 py-2 hover:bg-gray-100'>
                                  {t(childName)}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                    </ul> 
                </nav>

                {/* Language Switcher - Desktop */}
                <div className="hidden md:flex items-center mr-4">
                    <LanguageSwitcher />
                </div>

                {/* Desktop Contact Button */}
                <a 
                    href='contact' 
                    className='contact-btn group'
                    onClick={handleContactClick}
                >
                    <div className='inner'>
                        <span>{t("Contatti")}</span>
                    </div>
                </a>

                {/* Mobile Hamburger Button */}
                <button 
                    className='hamburger-btn md:hidden z-50 relative'
                    onClick={toggleMobileMenu}
                    aria-label="Toggle mobile menu"
                >
                    <div className={`hamburger-line ${mobileMenuOpen ? 'active' : ''}`}></div>
                    <div className={`hamburger-line ${mobileMenuOpen ? 'active' : ''}`}></div>
                    <div className={`hamburger-line ${mobileMenuOpen ? 'active' : ''}`}></div>
                </button>

                {/* Mobile Menu Overlay */}
                {mobileMenuOpen && (
                    <div 
                        className='mobile-menu-overlay fixed inset-0 bg-black/50 z-40 md:hidden'
                        onClick={() => setMobileMenuOpen(false)}
                    />
                )}

                {/* Mobile Navigation */}
                <nav className={`mobile-nav ${mobileMenuOpen ? 'open' : ''}`}>
                    <ul>
                        {navLinks.map(({link, name}) => (
                            <li key={name}>
                                {link.startsWith('/') ? (
                                    <Link 
                                        to={link}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className='mobile-nav-link'
                                    >
                                        {t(name)}
                                    </Link>
                                ) : (
                                    <a 
                                        href={link}
                                        onClick={(e) => handleSectionClick(e, link)}
                                        className='mobile-nav-link'
                                    >
                                        {t(name)}
                                    </a>
                                )}
                            </li>
                        ))}
                        <li>
                            <a 
                                href='#contatti' 
                                className='mobile-contact-btn'
                                onClick={handleContactClick}
                            >
                                {t("Contatti")}
                            </a>
                        </li>
                        {/* Language Switcher - Mobile */}
                        <li className="mt-4 flex justify-center">
                            <LanguageSwitcher />
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Navbar;
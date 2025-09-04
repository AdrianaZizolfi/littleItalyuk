import { socialImgs, navLinks } from "../constants";
import { useNavigate, useLocation } from 'react-router-dom';
import { useCallback } from "react";
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSectionClick = useCallback((e, link) => {
    e.preventDefault();

    if (link.startsWith('#')) {
      const sectionId = link.substring(1);

      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      } else {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  }, [navigate, location]);

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="flex flex-col justify-center">
          <ul>
            {navLinks.map(({ link, name }) => (
              <li key={name} className="group">
                {link.startsWith('/') ? (
                  <a href={link}>
                    <span>{t(name)}</span>
                    <span className="underline"></span>
                  </a>
                ) : (
                  <a href={link} onClick={(e) => handleSectionClick(e, link)}>
                    <span>{t(name)}</span>
                    <span className="underline"></span>
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="socials">
          {socialImgs.map((socialImg, index) => (
            <a
              key={index}
              href={socialImg.url}
              target="_blank"
              rel="noopener noreferrer"
              className="icon"
            >
              <img src={socialImg.imgPath} alt={socialImg.name} />
            </a>
          ))}
        </div>

        <div className="flex flex-col justify-center">
          <p className="text-center md:text-end">
            © {new Date().getFullYear()} Little Italy UK Ldn. All rights reserved.<br />
            Developed by{' '}
            <a 
              href="https://www.aethercreativeagency.co.uk" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-blue-600 hover:underline"
            >
              Aether Creative London
            </a>
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;

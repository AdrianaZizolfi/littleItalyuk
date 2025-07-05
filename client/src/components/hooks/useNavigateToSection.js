import { useNavigate, useLocation } from 'react-router-dom';

const useNavigateToSection = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const navigateToSection = (sectionId) => {
        if (location.pathname !== '/') {
            // Navigate to home page first, then scroll to section
            navigate('/');
            // Wait for navigation to complete, then scroll
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
    };

    return navigateToSection;
};

export default useNavigateToSection;
import { useNavigate } from 'react-router-dom';

/**
 * A reusable CTA button component.
 * Supports both scrolling to contact section and navigation to other pages.
 * 
 * @param {string} text - Button text
 * @param {string} className - Additional CSS classes
 * @param {string} href - URL/route to navigate to (for page navigation)
 */
const Button = ({ text, className, href }) => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();

    // If href is provided, navigate to another page
    if (href) {
      navigate(href);
      return;
    }

    // Otherwise, scroll to contact section (default behavior)
    const target = document.getElementById("contact");
    
    if (target) {
      const offset = window.innerHeight * 0.15;
      const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <a
      onClick={handleClick}
      className={`${className ?? ""} cta-wrapper cursor-pointer`}
    >
      <div className="cta-button group">
        <div className="bg-circle" />
        <p className="text">{text}</p>
        <div className="arrow-wrapper">
          <img src="/images/arrow-down.svg" alt="arrow" />
        </div>
      </div>
    </a>
  );
};

export default Button;
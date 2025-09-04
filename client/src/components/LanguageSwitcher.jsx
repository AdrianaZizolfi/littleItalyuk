import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("lang", lng);
  };

  return (
    <div className="flex items-center gap-1 bg-gray-100 rounded-full p-1">
      <button 
        onClick={() => changeLanguage("it")}
        className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
          currentLang === 'it' 
            ? 'bg-white text-gray-900 shadow-sm' 
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        🇮🇹 IT
      </button>
      <button 
        onClick={() => changeLanguage("en")}
        className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
          currentLang === 'en' 
            ? 'bg-white text-gray-900 shadow-sm' 
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        🇬🇧 EN
      </button>
    </div>
  );
};

export default LanguageSwitcher;
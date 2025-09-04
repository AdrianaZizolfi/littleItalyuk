import React from 'react';
import { useTranslation } from 'react-i18next';

const About = () => {
  const { t } = useTranslation();

  return (
    <div id='about' className="flex flex-col lg:flex-row items-center gap-8 p-8 max-w-6xl mx-auto">
      
      {/* Left column - image */}
      <div className="w-full lg:w-1/3 flex justify-center">
        <div className="relative">
          <div className="floating-container">
            <img 
              src="/images/little_italy_logo3.png"
              alt={t('chi_siamo')} 
              className="w-72 h-72 rounded-full object-cover shadow-lg transition-all duration-300 transform hover:scale-105"
            />
          </div>
          <style jsx>{`
            .floating-container {
              animation: float 5.5s ease-in-out infinite;
            }
            @keyframes float {
              0%, 100% { transform: translateY(0px) rotate(0deg); }
              25% { transform: translateY(-10px) rotate(1deg); }
              50% { transform: translateY(-5px) rotate(0deg); }
              75% { transform: translateY(-15px) rotate(-1deg); }
            }
          `}</style>
        </div>
      </div>

      {/* Right column - text */}
      <div className="w-full lg:w-2/3 space-y-6">
        <h1 className="text-3xl lg:text-4xl font-bold text-green-100 mb-4">
          {t('Chi Siamo')}
        </h1>
        
        <p className="text-lg text-gray-600 leading-relaxed">
          {t('chi_siamo_description1')}
        </p>
        
        <p className="text-lg text-gray-600 leading-relaxed">
          {t('chi_siamo_description2')}
        </p>
      </div>
    </div>
  );
};

export default About;

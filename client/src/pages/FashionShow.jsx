import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Contact from '../sections/Contacts';

const FashionShow = () => {
  const { t } = useTranslation();
  
  useEffect(() => {
    // Load fonts
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600&family=Marcellus&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    // Add custom body class for this page
    document.body.classList.add('fashion-show');

    return () => {
      // Cleanup fonts and body class on unmount
      document.head.removeChild(link);
      document.body.classList.remove('fashion-show');
    };
  }, []);

  return (
    <div
      className="h-full w-full text-[#fefefe]"
      style={{ 
        backgroundImage: "url('/images/18.png')",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-center px-6 pt-28 pb-16 text-center">
        <div className="max-w-3xl space-y-6">
          <h1
            className="text-4xl md:text-6xl font-semibold"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            {t("Italian Fashion Show")}
          </h1>
          <p className="text-md leading-relaxed">
            {t("fashion_main_description")}
          </p>
        </div>
      </div>

      {/* Bento Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-6 pb-7 max-w-6xl mx-auto">
        <div className="col col-span-1 md:col-span-2 relative">
          <img
            src="/images/fashion4.jpg"
            alt="Sfilata"
            className="w-full object-cover rounded-2xl"
          />
        </div>
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-2xl flex items-center shadow-md shadow-black/30">
          <p className="text-sm leading-relaxed">
            {t("fashion_bento_1")}
          </p>
        </div>
        
        <div className="col-span-1 md:col-span-3 flex flex-col md:flex-row gap-4">
          {/* Text Box */}
          <div className="flex-1 bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-2xl shadow-md shadow-black/30 flex items-center">
            <p className="text-sm leading-relaxed">
              {t("fashion_bento_2")}
            </p>
          </div>

          {/* Image Box */}
          <div className="flex-1 relative">
            <img
              src="/images/fashion6.jpg"
              alt="Backstage"
              className="w-full object-cover rounded-2xl"
              style={{ height: '100%' }}
            />
          </div>
        </div>

        <div className="col-span-1 md:col-span-2 relative">
          <img
            src="/images/fashion3.jpg"
            alt="Dettagli artigianali"
            className="w-full h-full object-cover rounded-2xl"
          />
        </div>
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-2xl flex items-center shadow-md shadow-black/30">
          <p className="text-sm leading-relaxed">
            {t("fashion_bento_3")}
          </p>
        </div>
        
        <div className="md:col-span-3 flex flex-col md:flex-row gap-4">
          {/* Text Box */}
          <div className="flex-1 bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-2xl shadow-md shadow-black/30 flex items-center">
            <p className="text-sm leading-relaxed">
              {t("fashion_bento_4")}
            </p>
          </div>

          {/* Image Box */}
          <div className="flex-1 relative">
            <img
              src="/images/fashion7.jpg"
              alt="Backstage"
              className="w-full object-cover rounded-2xl"
              style={{ height: '100%' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FashionShow;
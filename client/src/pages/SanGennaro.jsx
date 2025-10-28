import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ComingSoon from '../components/ComingSoon';
import Contact from '../sections/Contacts';
import Button from '../components/Button';
import LogoSection from '../sections/LogoSection';
import TicketBookingSystem from '../components/TicketBookingSystem';
import { vendorsName } from '../constants';

const SanGennaro = () => {
  const { t } = useTranslation();
  const [showBookingModal, setShowBookingModal] = useState(false);

  return (
    <div className="min-h-screen pt-20">
      <h1 className="text-4xl font-bold text-center mb-8">{t("Festa di San Gennaro")}</h1>
      
      {/* First Row - S. Gennaro 2025 */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-12 px-6">
        <div className="md:col-span-6">
          <img 
            src="/images/DSC07463.jpg" 
            alt="Luxury Event Experience"
            className="w-full h-full object-cover rounded-3xl"
          />
        </div>
        <div className="md:col-span-6 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-4">{t("Edizione 2025")}</h2>
          <p className="text-lg text-gray-600 mb-4">
            {t("2025_description")}
          </p>
          
          {/* <Button 
            text={t("Prenota il Ticket")}
            className="md:w-80 md:h-16 w-60 h-12"
            onClick={() => setShowBookingModal(true)}
          /> */}
        </div>
      </div>
      
      <div className="px-6 mb-12">
        <img src='/images/patrocinii_.png' alt="Patrocinii" />
      </div>

      {/* Vendors Section 2025 - Full Width */}
      <div className="px-6 mb-12">
        <h1 className="text-4xl font-bold text-center mb-8">{t("Sponsored by")}</h1>
        <LogoSection />
      </div>

      
        {/* Vendors Section 2025 - Full Width */}
        <div className="px-6 mb-12">
          <h1 className="text-4xl font-bold text-center mb-8">{t("Vendors")}</h1>
          <div className="overflow-x-auto pb-4 -mx-6 px-6">
            <div className="flex gap-6 min-w-max">
              {vendorsName.map((vendor, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow w-80 flex-shrink-0"
                >
                  <div className="h-48 bg-gray-300 relative">
                    <img 
                      src={vendor.imgPath} 
                      alt={vendor.title} 
                      className="block w-full h-full object-cover" 
                    />
                    <div className="absolute inset-0 bg-black/40 z-10" />
                    <div className="absolute inset-0 flex flex-col justify-end p-4 z-20">
                      <h3 className="text-xl font-semibold text-white mb-1">{vendor.title}</h3>
                      <p className="text-sm text-white">{t("Food")}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      <h1 className="text-4xl font-bold text-center mb-8">{t("Edizioni passate")}</h1>
      
      {/* Second Row - Festa di S. Gennaro 2024 */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-12 px-6">
        <div className="md:col-span-6 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-4">{t("Edizione 2024")}</h2>
          <p className="text-lg text-gray-600 mb-4">
            {t("2024_description")}
          </p>
        </div>
        <div className="col-span-6">
          <img 
            src="/images/DSC07438.jpg" 
            alt="San Gennaro Fest 2024"
            className="w-full h-full object-cover rounded-3xl"
          />
        </div>
      </div>

      {/* Vendors Section 2024 - Full Width */}
      <div className="px-6 mb-12">
        <h1 className="text-4xl font-bold text-center mb-8">{t("Sponsored by")}</h1>
        <img src='/images/banner24.png' alt="2024 Sponsors" />
      </div>
      
      <Contact />

      {/* Ticket Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 backdrop-blur-sm bg-white/30 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-md w-full">
            <button
              onClick={() => setShowBookingModal(false)}
              className="absolute -top-4 -right-4 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg z-10 hover:bg-gray-100 text-gray-600 font-bold text-xl border border-gray-200"
            >
              ×
            </button>
            <TicketBookingSystem onClose={() => setShowBookingModal(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default SanGennaro;
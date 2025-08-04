import React, { useState } from 'react';
import ComingSoon from '../components/ComingSoon';
import Contact from '../sections/Contacts';
import Button from '../components/Button';
import LogoSection from '../sections/LogoSection';
import TicketBookingSystem from '../components/TicketBookingSystem';

const SanGennaro = () => {
  const [showBookingModal, setShowBookingModal] = useState(false);

  return (
    <div className="min-h-screen pt-20">
      <h1 className="text-4xl font-bold text-center mb-8">Festa di San Gennaro</h1>
      
      {/* First Row - S. Gennaro 2025 */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-12 px-6">
        <div className="md:col-span-6">
          <img 
            src="/images/sgennaro.jpg" 
            alt="Luxury Event Experience"
            className="w-full h-96 object-cover rounded-3xl"
          />
        </div>
        <div className="md:col-span-6 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-4">S. Gennaro 2025</h2>
          <p className="text-lg text-gray-600 mb-4">
            Dopo l'incredibile successo dell'anno scorso il San Gennaro Fest sta per tornare anche quest'anno.
            L'evento gratuito dove buon cibo, musica ed artisti Italiani che si riuniscono per ricreare un'esperienza unica e farci sentire a casa.
            Prenota ora il tuo biglietto per non perdere quest'evento incredibile.
          </p>
          
          <Button 
            text="Prenota il Ticket"
            className="md:w-80 md:h-16 w-60 h-12"
            onClick={() => setShowBookingModal(true)}
          />
        </div>
      </div>

      {/* Vendors Section 2025 - Full Width */}
      <div className="px-6 mb-12">
        <h1 className="text-4xl font-bold text-center mb-8">Vendors</h1>
        <LogoSection />
      </div>

      {/* Artists Section 2024 - Full Width */}
      <div className="px-6 mb-12">
        <h1 className="text-4xl font-bold text-center mb-8">Artists</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="h-48 bg-gray-300"></div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Artist Name 1</h3>
              <p className="text-gray-600 mb-3">Musica Tradizionale Napoletana</p>
              <p className="text-sm text-gray-500">Performance ore 19:00</p>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="h-48 bg-gray-300"></div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Artist Name 2</h3>
              <p className="text-gray-600 mb-3">Spettacolo Folcloristico</p>
              <p className="text-sm text-gray-500">Performance ore 20:30</p>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="h-48 bg-gray-300"></div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Artist Name 3</h3>
              <p className="text-gray-600 mb-3">Orchestra Classica</p>
              <p className="text-sm text-gray-500">Performance ore 21:30</p>
            </div>
          </div>
        </div>
      </div>

      {/* Second Row - Festa di S. Gennaro 2024 */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-12 px-6">
        <div className="md:col-span-4 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-4">Festa di S. Gennaro 2024</h2>
          <p className="text-lg text-gray-600 mb-4">
            Connettiti con leader del settore e personalità di spicco 
            in un ambiente raffinato e stimolante.
          </p>
          <p className="text-lg text-gray-600">
            I nostri eventi sono progettati per favorire connessioni 
            significative e opportunità di business uniche.
          </p>
        </div>
        <div className="col-span-8">
          <img 
            src="/images/san gennaro fest.jpg" 
            alt="Fashion Show"
            className="w-full h-96 object-cover rounded-3xl"
          />
        </div>
      </div>

      {/* Vendors Section 2024 - Full Width */}
      <div className="px-6 mb-12">
        <h1 className="text-4xl font-bold text-center mb-8">Vendors</h1>
        <LogoSection />
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
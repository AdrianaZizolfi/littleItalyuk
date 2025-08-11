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
            src="/images/DSC07463.jpg" 
            alt="Luxury Event Experience"
            className="w-full h-full object-cover rounded-3xl"
          />
        </div>
        <div className="md:col-span-6 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-4">Edizione 2025</h2>
          <p className="text-lg text-gray-600 mb-4">
            Dopo il grande successo del 2024, il San Gennaro Fest torna a Londra l’11 e 12 ottobre 2025, sempre organizzato da Little Italy UK. 
            L’evento continuerà a celebrare la ricca tradizione napoletana e l’identita' italiana, 
            trasformando ancora una volta Londra in un angolo di Napoli.

            Questa nuova edizione promette un programma ancora piu' ricco, con cibo autentico, 
            artigianato, musica dal vivo e spettacoli che uniscono fede, cultura e divertimento, 
            creando uno spazio di condivisione e comunita' per italiani e non solo.

            Pensato per famiglie, giovani italiani all’estero, discendenti e appassionati di cultura mediterranea, 
            il festival vuole essere un momento di orgoglio e di incontro, valorizzando le radici italiane e il talento 
            dei tanti creativi che animano questo evento unico nel suo genere. 
            L’ingresso resta libero e aperto a tutti, per vivere insieme due giorni di festa, sapori e tradizione.
          </p>
          
          <Button 
            text="Prenota il Ticket"
            className="md:w-80 md:h-16 w-60 h-12"
            onClick={() => setShowBookingModal(true)}
          />
        </div>
      </div>
    <div className="px-6 mb-12">
        <img src='/images/patrocinii.jpg' />
        
      </div>
      {/* Vendors Section 2025 - Full Width */}
      <div className="px-6 mb-12">
        <h1 className="text-4xl font-bold text-center mb-8">Sponsored by</h1>
        <LogoSection />
      </div>

      {/* Artists Section 2024 - Full Width */}
      <div className="px-6 mb-12">
  <h1 className="text-4xl font-bold text-center mb-8">Vendors</h1>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {/* Card 1 */}
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      <div className="h-48 bg-gray-300 relative">
        <img src="/images/DSC06846.jpg" alt="Pellone" className="block w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40 z-10" /> {/* overlay */}
        <div className="absolute inset-0 flex flex-col justify-end p-4 z-20">
          <h3 className="text-xl font-semibold text-white mb-1">Pellone</h3>
          <p className="text-sm text-white">Pizza Napoletana</p>
        </div>
      </div>
    </div>

    {/* Card 2 */}
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      <div className="h-48 bg-gray-300 relative">
        <img src="/images/DSC06817.jpg" alt="Chalet Ciro" className="block w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40 z-10" /> {/* overlay */}
        <div className="absolute inset-0 flex flex-col justify-end p-4 z-20">
          <h3 className="text-xl font-semibold text-white mb-1">Chalet Ciro</h3>
          <p className="text-sm text-white">Graffa Napoletana</p>
        </div>
      </div>
    </div>

    {/* Card 3 (no overlay but same structure) */}
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      <div className="h-48 bg-gray-300 relative">
        <img src="/images/sgennaro.jpg" alt="Aurelio" className="block w-full h-full object-cover" />
        {/* no overlay here */}
        <div className="absolute inset-0 flex flex-col justify-end p-4 z-20">
          <h3 className="text-xl font-semibold text-white mb-1">Aurelio</h3>
          <p className="text-sm text-white">Limonata spread legs</p>
        </div>
      </div>
    </div>
  </div>
</div>

      <h1 className="text-4xl font-bold text-center mb-8">Edizioni passate</h1>
      {/* Second Row - Festa di S. Gennaro 2024 */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-12 px-6">
        
        <div className="md:col-span-6 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-4">Edizione 2024</h2>
          <p className="text-lg text-gray-600 mb-4">
            Dopo oltre 40 anni, Little Italy UK ha riportato in vita il San Gennaro Fest a Londra con la sua prima edizione nel 2024.
            L’evento ha trasformato Coal Drops Yard a King’s Cross in una piccola Napoli, celebrando la cultura napoletana e le radici italiane
            nel cuore della capitale britannica.
            La festa, gratuita e aperta a tutti, ha attirato circa 4.000 persone, 
            offrendo un weekend ricco di stand gastronomici, artigiani, spettacoli e performance artistiche. 
            San Gennaro Fest unisce la tradizione religiosa legata al patrono di Napoli con un grande evento culturale dove fede, 
            musica, cucina e arte si fondono per creare un forte senso di comunità.
            Nato per dare agli italiani all’estero, in particolare ai napoletani, un momento di orgoglio e riconoscimento, 
            il festival valorizza la cultura partenopea e il Made in Italy, coinvolgendo famiglie, giovani, italo-discendenti, 
            turisti e appassionati di cultura italiana in generale.
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
        <h1 className="text-4xl font-bold text-center mb-8">Sponsored by</h1>
        <img src='/images/banner24.png' />
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
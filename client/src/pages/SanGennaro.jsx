import React from 'react';
import ComingSoon from '../components/ComingSoon';
import Contact from '../sections/Contacts';
import Button from '../components/Button';

const SanGennaro = () => {
  return (
    <div className="min-h-screen pt-20">
      <h1 className="text-4xl font-bold text-center mb-8">Festa di San Gennaro</h1>
      
      {/* First Row - S. Gennaro 2025 */}
      <div className="grid grid-cols-12 gap-6 mb-12 px-6">
        <div className="col-span-8">
          <img 
            src="/images/sgennaro.jpg" 
            alt="Luxury Event Experience"
            className="w-full h-96 object-cover rounded-3xl"
          />
        </div>
        <div className="col-span-4 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-4">S. Gennaro 2025</h2>
          <p className="text-lg text-gray-600 mb-4">
            Immergiti in eventi di lusso che ridefiniscono l'eccellenza. 
            Ogni dettaglio è curato per offrire un'esperienza indimenticabile.
          </p>
          <p className="text-lg text-gray-600">
            Dalla location esclusiva ai servizi premium, creiamo momenti 
            che superano ogni aspettativa.
          </p>
          <Button 
            text="Prenota il tuo Ticket"
            className="md:w-80 md:h-16 w-60 h-12"
            href="#"
          />
        </div>
      </div>

      {/* Vendors Section 2025 - Full Width */}
      <div className="px-6 mb-12">
        <h1 className="text-4xl font-bold text-center mb-8">Vendors</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
            <div className="w-20 h-20 bg-gray-300 rounded-full mx-auto mb-4"></div>
            <h3 className="text-xl font-semibold mb-2">Vendor Name 1</h3>
            <p className="text-gray-600">Specialità Napoletane</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
            <div className="w-20 h-20 bg-gray-300 rounded-full mx-auto mb-4"></div>
            <h3 className="text-xl font-semibold mb-2">Vendor Name 2</h3>
            <p className="text-gray-600">Artigianato Locale</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
            <div className="w-20 h-20 bg-gray-300 rounded-full mx-auto mb-4"></div>
            <h3 className="text-xl font-semibold mb-2">Vendor Name 3</h3>
            <p className="text-gray-600">Prodotti Tipici</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
            <div className="w-20 h-20 bg-gray-300 rounded-full mx-auto mb-4"></div>
            <h3 className="text-xl font-semibold mb-2">Vendor Name 4</h3>
            <p className="text-gray-600">Dolci Tradizionali</p>
          </div>
        </div>
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
      <div className="grid grid-cols-12 gap-6 mb-12 px-6">
        <div className="col-span-4 flex flex-col justify-center">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
            <div className="w-20 h-20 bg-gray-300 rounded-full mx-auto mb-4"></div>
            <h3 className="text-xl font-semibold mb-2">Vendor 2024 - 1</h3>
            <p className="text-gray-600">Pizza Napoletana</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
            <div className="w-20 h-20 bg-gray-300 rounded-full mx-auto mb-4"></div>
            <h3 className="text-xl font-semibold mb-2">Vendor 2024 - 2</h3>
            <p className="text-gray-600">Sfogliatelle</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
            <div className="w-20 h-20 bg-gray-300 rounded-full mx-auto mb-4"></div>
            <h3 className="text-xl font-semibold mb-2">Vendor 2024 - 3</h3>
            <p className="text-gray-600">Gelato Artigianale</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
            <div className="w-20 h-20 bg-gray-300 rounded-full mx-auto mb-4"></div>
            <h3 className="text-xl font-semibold mb-2">Vendor 2024 - 4</h3>
            <p className="text-gray-600">Limoncello</p>
          </div>
        </div>
      </div>
      
      <Contact />
    </div>
  );
};

export default SanGennaro;
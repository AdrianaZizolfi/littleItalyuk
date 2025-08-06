import React, { useEffect } from 'react';
import Contact from '../sections/Contacts';

const FashionShow = () => {
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
      className="h-full w-full  text-[#FFD700]"
      style={{ fontFamily: "'Marcellus', serif",
            backgroundImage: "url('/images/18.png')",
            backgroundAttachment: "fixed",
            backgroundSize: "cover",
            backgroundPosition: "center"
      }}
    >
      {/* Intestazione */}
      <div className="flex items-center justify-center px-6 pt-28 pb-16 text-center">
        <div className="max-w-3xl space-y-6">
          <h1
            className="text-4xl md:text-6xl font-semibold"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            Italian Fashion Show
          </h1>
          <p className="text-lg leading-relaxed">
            L'Italian Fashion Show e' l'evento dedicato alla moda italiana contemporanea e artigianale organizzato da Little Italy UK, con l'obiettivo di dare visibilita' e voce a designer, artigiani e brand che rappresentano il meglio dell'estetica e della qualita' Made in Italy.

            Dopo il successo della sua prima edizione, l'Italian Fashion Show si conferma come uno dei due eventi di punta della nostra community, capace di fondere stile, cultura, tradizione e innovazione, portando l'essenza della moda italiana nel cuore della capitale britannica.
          </p>
        </div>
      </div>

      {/* Bento Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-6  max-w-6xl mx-auto">
        <div className="col-span-2 relative h-80">
          <img
            src="/images/sgennaro.jpg"
            alt="Sfilata"
            className="w-full h-full object-cover rounded-2xl"
          />
        </div>
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-2xl flex items-center shadow-md shadow-black/30">
          <p className="text-md leading-relaxed">
            È un fashion event esclusivo, unico nel suo genere a Londra, nato per celebrare la moda italiana autentica, valorizzando il lavoro di stilisti emergenti, artigiani, piccole maison indipendenti, brand sostenibili e creativi legati all’Italia.

          </p>
        </div>
        <div className="md:col-span-3 flex flex-col md:flex-row gap-4">
  {/* Text Box */}
  <div className="flex-1 bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-2xl shadow-md shadow-black/30 flex items-center">
    <p className="text-md leading-relaxed">
      Perché nasce questo progetto?
      L’Italian Fashion Show nasce da un’esigenza precisa: dare voce a quella parte della moda italiana che spesso non trova spazio nei grandi circuiti commerciali, ma che rappresenta l’anima vera del Made in Italy.

      In un mercato globale saturo, vogliamo riportare al centro la sartorialità, la ricerca, l’identità, l’eccellenza artigiana e la creatività dei giovani talenti. Questo evento è uno strumento concreto per:

      Promuovere il valore culturale ed economico della moda italiana all’estero

      Creare connessioni tra l’Italia e il Regno Unito nel settore moda

      Offrire opportunità a brand emergenti di presentarsi in una capitale mondiale della moda come Londra
    </p>
  </div>

  {/* Image Box */}
  <div className="flex-1 relative">
    <img
      src="/images/san_gennaro.jpg"
      alt="Backstage"
      className="w-full h-full object-cover rounded-2xl"
      style={{ height: '100%' }}
    />
  </div>
</div>

        <div className="col-span-2 relative h-80">
          <img
            src="/images/sgennaro.jpg"
            alt="Dettagli artigianali"
            className="w-full h-full object-cover rounded-2xl"
          />
        </div>
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-2xl flex items-center shadow-md shadow-black/30">
          <p className="text-md leading-relaxed">
            A chi si rivolge
            L’evento è pensato per:

            Designer e brand italiani emergenti

            Buyer, stampa e professionisti del settore moda in UK

            Italo-britannici e appassionati di moda e artigianato

            Influencer, creator, fotografi e media partner

            Investitori e aziende alla ricerca di talenti italiani

          </p>
        </div>
        <div className="md:col-span-3 flex flex-col md:flex-row gap-4">
  {/* Text Box */}
  <div className="flex-1 bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-2xl shadow-md shadow-black/30 flex items-center">
    <p className="text-md leading-relaxed">
      Un format accessibile e autentico
L’Italian Fashion Show è un evento curato ma inclusivo, pensato per ispirare, promuovere e connettere. Il nostro obiettivo è abbattere le barriere d’accesso alla visibilità internazionale e creare un ponte tra Londra e il nuovo volto della moda italiana.

Tutti i partecipanti – stilisti, sponsor, ospiti – vengono selezionati con cura per mantenere qualità, coerenza e autenticità, e per trasmettere il vero spirito italiano: elegante, umano, creativo e determinato.

Moda, cultura, identità: un evento che lascia il segno
Con l’Italian Fashion Show, Little Italy UK si posiziona come riferimento culturale e creativo nel Regno Unito, offrendo un palco a chi rappresenta l’eccellenza italiana con talento e visione.

Un evento da non perdere per chi ama la moda con anima, radici e futuro.
    </p>
  </div>

  {/* Image Box */}
  <div className="flex-1 relative">
    <img
      src="/images/san_gennaro.jpg"
      alt="Backstage"
      className="w-full h-full object-cover rounded-2xl"
      style={{ height: '100%' }}
    />
  </div>
</div>

      </div>
      <Contact />
    </div>
  );
};

export default FashionShow;

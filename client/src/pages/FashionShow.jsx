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
      // className="h-full w-full  text-[#FFD700]"
      className="h-full w-full  text-[#fefefe]"
      style={{ 
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
          <p className="text-md leading-relaxed">
            L'Italian Fashion Show e' l'evento dedicato alla moda italiana contemporanea e artigianale organizzato da Little Italy UK, con l'obiettivo di dare visibilita' e voce a designer, artigiani e brand che rappresentano il meglio dell'estetica e della qualita' Made in Italy.

            Dopo il successo della sua prima edizione, l'Italian Fashion Show si conferma come uno dei due eventi di punta della nostra community, capace di fondere stile, cultura, tradizione e innovazione, portando l'essenza della moda italiana nel cuore della capitale britannica.
          </p>
        </div>
      </div>

      {/* Bento Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-6 pb-7 max-w-6xl mx-auto">
        <div className="col col-span-1 md:col-span-2 relative">
          <img
            src="/images/fashion4.jpg"
            alt="Sfilata"
            className="w-full  object-cover rounded-2xl"
          />
        </div>
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-2xl flex items-center shadow-md shadow-black/30">
          <p className="text-sm leading-relaxed">
            È un fashion event esclusivo, unico nel suo genere a Londra, nato per celebrare la moda italiana autentica, valorizzando il lavoro di stilisti emergenti, artigiani, piccole maison indipendenti, brand sostenibili e creativi legati all’Italia.

              Durante l’evento – che si tiene ogni anno in occasione della London Fashion Week – il pubblico può assistere a:

              Sfilate di moda dal vivo, in location esclusive con passerella professionale e media coverage

              Presentazioni di collezioni ready-to-wear, sartoriali, artigianali e contemporanee

              Showroom e spazi espositivi per brand e designer

              Talks e momenti di networking tra creativi, buyer, stampa e appassionati di moda

              Collaborazioni artistiche, performance, fotografia e contenuti editoriali


          </p>
        </div>
        <div className="col-span-1 md:col-span-3 flex flex-col md:flex-row gap-4">
          {/* Text Box */}
          <div className="flex-1 bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-2xl shadow-md shadow-black/30 flex items-center">
            <p className="text-sm leading-relaxed">
              Perche' nasce questo progetto?
              L’Italian Fashion Show nasce da un’esigenza precisa: dare voce a quella parte della moda italiana che spesso non trova spazio nei grandi circuiti commerciali, ma che rappresenta l’anima vera del Made in Italy.

              In un mercato globale saturo, vogliamo riportare al centro la sartorialita', la ricerca, l’identita', l’eccellenza artigiana e la creativita' dei giovani talenti. 
              Questo evento e' uno strumento concreto per: <br/>

              Promuovere il valore culturale ed economico della moda italiana all’estero

              Creare connessioni tra l’Italia e il Regno Unito nel settore moda

              Offrire opportunita' a brand emergenti di presentarsi in una capitale mondiale della moda come Londra
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

        <div className="col-span-1 md:col-span-2 relative ">
          <img
            src="/images/fashion3.jpg"
            alt="Dettagli artigianali"
            className="w-full h-full object-cover rounded-2xl"
          />
        </div>
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-2xl flex items-center shadow-md shadow-black/30">
          <p className="text-sm leading-relaxed">
            A chi si rivolge
            L’evento è pensato per:

            Designer e brand italiani emergenti

            Buyer, stampa e professionisti del settore moda in UK

            Italo-britannici e appassionati di moda e artigianato

            Influencer, creator, fotografi e media partner

            Investitori e aziende alla ricerca di talenti italiani

            Un format accessibile e autentico
            L’Italian Fashion Show è un evento curato ma inclusivo, pensato per ispirare, promuovere e connettere. Il nostro obiettivo e' abbattere le barriere d’accesso alla visibilita' internazionale e creare un ponte tra Londra e il nuovo volto della moda italiana.


          </p>
        </div>
            <div className="md:col-span-3 flex flex-col md:flex-row gap-4">
                  {/* Text Box */}
                <div className="flex-1 bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-2xl shadow-md shadow-black/30 flex items-center">
                  <p className="text-sm leading-relaxed">

                    Tutti i partecipanti – stilisti, sponsor, ospiti – vengono selezionati con cura per mantenere qualita', coerenza e autenticita', e per trasmettere il vero spirito italiano: elegante, umano, creativo e determinato.

                    Moda, cultura, identita': un evento che lascia il segno
                    Con l’Italian Fashion Show, Little Italy UK si posiziona come riferimento culturale e creativo nel Regno Unito, offrendo un palco a chi rappresenta l’eccellenza italiana con talento e visione.

                    Un evento da non perdere per chi ama la moda con anima, radici e futuro.
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

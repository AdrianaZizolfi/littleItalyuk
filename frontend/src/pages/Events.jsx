import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Contact from '../sections/Contacts';
import Button from '../components/Button';

const Events = () => {
  // const [pageData, setPageData] = useState(null);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   axios.get('/api/pages/eventi/')  // Make sure this endpoint exists in Django
  //     .then(res => {
  //       setPageData(res.data);
  //       setLoading(false);
  //     })
  //     .catch(err => {
  //       console.error('Failed to load page data', err);
  //       setLoading(false);
  //     });
  // }, []);

  // if (loading) return <div className="pt-20 text-center">Loading...</div>;
  // if (!pageData) return <div className="pt-20 text-center">Page not found</div>;



  // const content = {};
  // (pageData.content ?? []).forEach(c => {
  //   content[c.content_key] = c.content_value;
  // });

  return (
    <div className="min-h-screen pt-20">
      <h1 className="text-4xl font-bold text-center mb-8">I Nostri Eventi</h1>

      {/* First row */}
      <div className="grid grid-cols-12 gap-6 mb-12 px-6">
        <div className="col-span-12 md:col-span-6">
          <img 
            src="/images/san_gennaro.jpg"
            alt="San Gennaro Fest"
            className="w-full h-128 object-cover rounded-3xl"
          />
        </div>
        <div className="col-span-12 md:col-span-6 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-4">Festa di San Gennaro</h2>
          <p className="text-lg text-gray-600 mb-4">
            Il San Gennaro Fest e' molto piu' di un semplice evento: e' una festa popolare Italiana gratuita che porta il cuore di Napoli a Londra, celebrando cultura, tradizione e comunita'. Organizzato dalla community Little Italy UK, il festival nasce con l’obiettivo di ridare vita, dopo oltre 40 anni, a una delle ricorrenze piu' sentite dai napoletani, rendendola accessibile anche a chi vive all’estero.

            La prima edizione, nel 2024, ha attirato oltre 4.000 persone e trasformato Coal Drops Yard, a King’s Cross, in una piccola Napoli, con stand gastronomici, artigiani, musica, spettacoli e performance artistiche. Al centro dell’evento c’e' la figura di San Gennaro, patrono di Napoli, celebrato ogni 19 settembre. Ma a Londra, la festa diventa anche un grande momento culturale e urbano, dove spiritualita', arte, cucina e tradizioni si incontrano.

            Il festival nasce dal desiderio di offrire agli italiani, e soprattutto ai napoletani, all’estero un’occasione di riconoscimento, identita' e orgoglio. Little Italy UK ha voluto colmare la mancanza di riferimenti culturali forti con un’iniziativa che unisce integrazione, scambio culturale e promozione del Made in Italy.

            Pensato per famiglie italiane e inglesi, giovani expat, italo-discendenti, turisti e professionisti legati alla cultura italiana, il San Gennaro Fest e' aperto a tutti. Un weekend ricco di buon cibo, incontri, musica ed emozioni autentiche, che unisce fede e festa in una delle citta' piu' cosmopolite del mondo.
          </p>
          <Button 
            text="Scopri di piu'"
            className="md:w-80 md:h-16 w-60 h-12"
            href="/sangennaro"
          />
        </div>
      </div>

      {/* Second row */}
      <div className="grid grid-cols-12 gap-6 mb-12 px-6">
        <div className="col-span-12 md:col-span-6 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-4">Fashion Show</h2>
          <p className="text-lg text-gray-600 mb-4">
            L'Italian Fashion Show e' l'evento che celebra la moda italiana autentica a Londra, organizzato da Little Italy UK con l'obiettivo di dare visibilita' a designer emergenti, artigiani e brand indipendenti che incarnano lo stile e la qualita' del Made in Italy. Dopo il successo della prima edizione, si e' affermato come uno dei principali appuntamenti culturali della community italiana nel Regno Unito.

            Ogni anno, durante la London Fashion Week, il pubblico puo' assistere a sfilate dal vivo, esposizioni di collezioni artigianali e sartoriali, momenti di networking, talk e collaborazioni artistiche. Il format punta a valorizzare una moda italiana piu' intima e vera, fatta di ricerca, identita', creativita' e radici culturali, spesso esclusa dai grandi circuiti commerciali.

            L'evento si rivolge a stilisti italiani, professionisti del settore moda, buyer, stampa, influencer e appassionati. E' pensato per creare connessioni tra Italia e UK, offrendo opportunita' concrete a chi vuole emergere in una capitale internazionale come Londra.

            Curato ma accessibile, l'Italian Fashion Show vuole abbattere le barriere d'ingresso alla visibilita' globale e raccontare la moda come espressione culturale, umana e innovativa. E' un'iniziativa che unisce stile, identita' e futuro, posizionando Little Italy UK come punto di riferimento creativo e culturale per l'eccellenza italiana all'estero.
          </p>
          <Button 
            text="Scopri di piu'"
            className="md:w-80 md:h-16 w-60 h-12"
            href="/fashion"
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <img 
            src="/images/sgennaro.jpg"
            alt="Fashion Show"
            className="w-full h-96 object-cover rounded-3xl"
          />
        </div>
      </div>

      <Contact />
    </div>
  );
};

export default Events;
import React, { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import axios from 'axios';
import Contact from '../sections/Contacts';
import Button from '../components/Button';

const Events = () => {
  const { t } = useTranslation();
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
      <h1 className="text-4xl font-bold text-center mb-8">{t("I Nostri Eventi")}</h1>

      {/* First row */}
      <div className="grid grid-cols-12 gap-6 mb-12 px-6">
        <div className="col-span-12 md:col-span-6">
          <img 
            src="/images/DSC07463.jpg"
            alt="San Gennaro Fest"
            className="w-full h-128 object-cover rounded-3xl"
          />
        </div>
        <div className="col-span-12 md:col-span-6 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-4">{t("Festa di San Gennaro")}</h2>
          <p className="text-lg text-gray-600 mb-4">{t("San Gennaro Fest e' la festa popolare italiana gratuita che porta il cuore di Napoli a Londra. Organizzato da Little Italy UK, celebra cultura, tradizione e comunita', riportando in vita una ricorrenza amata dai napoletani dopo oltre 40 anni.\n\nLa prima edizione, nel 2024, ha accolto oltre 4.000 persone a Coal Drops Yard, trasformandolo in una piccola Napoli con street food, artigiani, musica e spettacoli. Al centro c'e' San Gennaro, patrono di Napoli, ma a Londra la festa diventa anche un evento urbano e culturale dove si incontrano spiritualita', arte, cucina e tradizioni.\n\nAperto a tutti, il festival unisce italiani e inglesi, famiglie, giovani expat, turisti e professionisti, offrendo un weekend di buon cibo, incontri, musica ed emozioni autentiche nel cuore di una delle citta' piu' cosmopolite del mondo.")}</p>
          <Button text={t("Scopri di piu'")} className="md:w-80 md:h-16 w-60 h-12" href="/sangennaro" />
        </div>
      </div>

      {/* Second row */}
      <div className="grid grid-cols-12 gap-6 mb-12 px-6">
        <div className="col-span-12 md:col-span-6 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-4">{t("Fashion Show")}</h2>
          <p className="text-lg text-gray-600 mb-4">{t("Italian Fashion Show e' l'evento che porta la vera moda italiana a Londra. Creato da Little Italy UK, offre visibilita' a designer emergenti, artigiani e brand indipendenti che rappresentano lo stile e la qualita' del Made in Italy.\n\nOgni anno, durante la London Fashion Week, il pubblico vive sfilate dal vivo, esposizioni artigianali, networking, talk e collaborazioni artistiche. L'obiettivo e' valorizzare una moda autentica, creativa e legata alle radici culturali, lontana dai grandi circuiti commerciali.\n\nRivolto a stilisti, professionisti, buyer, stampa e appassionati, l'evento crea un ponte tra Italia e UK, offrendo opportunita' concrete in una delle capitali mondiali della moda. Con uno spirito curato ma accessibile, l'Italian Fashion Show racconta la moda come espressione culturale, umana e innovativa.")}</p>
          <Button text={t("Scopri di piu'")} className="md:w-80 md:h-16 w-60 h-12" href="/fashion" />
        </div>
        <div className="col-span-12 md:col-span-6">
          <img 
            src="/images/fashion3.jpg"
            alt="Fashion Show"
            className="w-full object-cover rounded-3xl"
          />
        </div>
      </div>

      <Contact />
    </div>
  );
};

export default Events;
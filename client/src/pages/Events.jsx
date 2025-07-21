import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Contact from '../sections/Contacts';
import Button from '../components/Button';

const Events = () => {
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/pages/eventi/')  // Make sure this endpoint exists in Django
      .then(res => {
        setPageData(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load page data', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="pt-20 text-center">Loading...</div>;
  if (!pageData) return <div className="pt-20 text-center">Page not found</div>;



  const content = {};
  (pageData.content ?? []).forEach(c => {
    content[c.content_key] = c.content_value;
  });

  return (
    <div className="min-h-screen pt-20">
      <h1 className="text-4xl font-bold text-center mb-8">{content.hero_title}</h1>

      {/* First row */}
      <div className="grid grid-cols-12 gap-6 mb-12 px-6">
        <div className="col-span-8">
          <img 
            src={content.image_1_url} 
            alt="Luxury Event Experience"
            className="w-full h-96 object-cover rounded-3xl"
          />
        </div>
        <div className="col-span-4 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-4">{content.section_1_title}</h2>
          <p className="text-lg text-gray-600 mb-4">{content.section_1_p1}</p>
          <p className="text-lg text-gray-600">{content.section_1_p2}</p>
          <Button 
            text={content.section_1_button_text || "Scopri di più"}
            className="md:w-80 md:h-16 w-60 h-12"
            href={content.section_1_button_link || "#"}
          />
        </div>
      </div>

      {/* Second row */}
      <div className="grid grid-cols-12 gap-6 mb-12 px-6">
        <div className="col-span-4 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-4">{content.section_2_title}</h2>
          <p className="text-lg text-gray-600 mb-4">{content.section_2_p1}</p>
          <p className="text-lg text-gray-600">{content.section_2_p2}</p>
          <Button 
            text={content.section_2_button_text || "Scopri di più"}
            className="md:w-80 md:h-16 w-60 h-12"
            href={content.section_2_button_link || "#"}
          />
        </div>
        <div className="col-span-8">
          <img 
            src={content.image_2_url} 
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

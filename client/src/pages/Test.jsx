import React, { useState, useEffect } from 'react';

const Test = () => {
  const [pageData, setPageData] = useState(null);

  useEffect(() => {
    fetch('/api/pages/events/')  // adjust URL to your API
      .then(res => res.json())
      .then(data => setPageData(data));
  }, []);

  if (!pageData) return <p>Loading...</p>;

  // Helper to get content by key
  const getContent = (key) => {
    const item = pageData.content.find(c => c.content_key === key);
    return item ? item.content_value : '';
  };

  return (
    <div className="min-h-screen pt-20">
      <h1 className="text-4xl font-bold text-center mb-8">{pageData.title}</h1>

      {/* Example for editable content */}
      <div className="grid grid-cols-12 gap-6 mb-12 px-6">
        <div className="col-span-8">
          <img 
            src={getContent('hero_image') || '/images/sgennaro.jpg'} 
            alt={getContent('hero_image_alt') || 'Event Image'}
            className="w-full h-96 object-cover rounded-3xl"
          />
        </div>
        <div className="col-span-4 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-4">{getContent('hero_title') || 'Festa di S. Gennaro'}</h2>
          <p className="text-lg text-gray-600 mb-4">{getContent('hero_description') || 'Immergiti in eventi...'}</p>
          <p className="text-lg text-gray-600">{getContent('hero_extra') || 'Dalla location esclusiva...'}</p>
          <Button 
            text={getContent('hero_button_text') || "Scopri di più"}
            className="md:w-80 md:h-16 w-60 h-12"
            href={getContent('hero_button_url') || '/sangennaro'}
          />
        </div>
      </div>

      {/* Render sections dynamically */}
      {pageData.sections.map(section => (
        section.is_active && (
          <SectionRenderer key={section.id} section={section} />
        )
      ))}

      <Contact />
    </div>
  );
};

// Example SectionRenderer component to render various section types dynamically
const SectionRenderer = ({ section }) => {
  switch (section.section_type) {
    case 'hero':
      return (
        <div className="hero-section">
          <h2>{section.title}</h2>
          {/* Render section.items as needed */}
        </div>
      );
    case 'text_image':
      return (
        <div className="text-image-section">
          <h2>{section.title}</h2>
          {/* More rendering */}
        </div>
      );
    // Add other section types...
    default:
      return null;
  }
};

export default Test;

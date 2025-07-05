import React from 'react';
import ComingSoon from '../components/ComingSoon';
import Contact from '../sections/Contacts';


const Events = () => {
  return (
    <div className="min-h-screen pt-20">
      <h1 className="text-4xl font-bold text-center mb-8">Luxury Experience</h1>
      <ComingSoon />
      <Contact />
    </div>
  );
};

export default Events;
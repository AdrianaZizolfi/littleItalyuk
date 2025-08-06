import React from 'react';
import Contact from '../sections/Contacts';
import ComingSoon from '../components/ComingSoon';

const Merchandising = () => {
  return (
    <div className="min-h-screen pt-20">
      <h1 className="text-4xl font-bold text-center mb-8">Merchandising</h1>
      <ComingSoon />
      <Contact />
    </div>
  );
};

export default Merchandising;
import React from 'react';
import { Link } from 'react-router-dom';

const SustainabilityCTA: React.FC = () => {
  return (
    <section className="py-24 bg-gradient-to-r from-[#4A6B47]/10 to-[#8BA888]/10">
      <div className="max-w-3xl mx-auto text-center px-4">
        <h3 className="text-3xl font-serif mb-6">
          Sustainable living starts here
        </h3>
        <Link
          to="/productscollection"
          className="group relative inline-block overflow-hidden"
          style={{
            boxShadow: '0 0 20px rgba(74, 107, 71, 1)',
          }}
        >
          <span className="px-8 py-3 bg-[#4A6B47] text-white rounded-lg transition-all duration-300 hover:bg-[#3A5A37] relative z-10 block transition-transform duration-300 group-hover:scale-105">
            Explore Our Collection
          </span>
          <div className="absolute inset-0 bg-[#3A5A37] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
        </Link>
      </div>
    </section>
  );
};

export default SustainabilityCTA;

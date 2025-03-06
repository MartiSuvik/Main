import { ArrowRight } from 'lucide-react';
import { HorizontalScroll } from '../ui/HorizontalScroll';

const showcaseItems = [
  {
    title: '2024 Collection',
    description: 'The latest in contemporary luxury design',
    image:
      'https://res.cloudinary.com/dnddesigncenter/image/upload/v1740571207/1_fpnhab.avif',
    bgColor: '#c4b9a8',
  },
  {
    title: '2023 Collection',
    description: 'Timeless elegance redefined',
    image:
      'https://res.cloudinary.com/dnddesigncenter/image/upload/v1740571204/2_j3vyvq.avif',
    bgColor: '#cdc9c6',
  },
  {
    title: '2022 Collection',
    description: 'Where tradition meets innovation',
    image:
      'https://res.cloudinary.com/dnddesigncenter/image/upload/v1740571202/3_iyxtvw.avif',
    bgColor: '#ccb2a5',
  },
  {
    title: '2021 Collection',
    description: 'The foundation of modern luxury',
    image:
      'https://res.cloudinary.com/dnddesigncenter/image/upload/v1740571205/4_zw7law.avif',
    bgColor: '#424f58',
  },
];

const VisionnaireShowcase = () => {
  return (
    <section className="bg-white py-16 md:py-24">
      {/* Header with wipe effect */}
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16 mb-8">
        <div className="relative bg-[#c5a267] py-6 md:py-8 px-4 overflow-hidden rounded-md">
          <h2 className="text-5xl md:text-6xl font-serif text-white text-center">
            Explore their Catalogues
          </h2>
        </div>
      </div>

      {/* Horizontal scroll section */}
      <div className="relative bg-white">
        <HorizontalScroll
          itemWidth="100vw"
          itemClassName="snap-center"
          className="py-8"
        >
          {showcaseItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center px-6 md:px-12 lg:px-16"
            >
              <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div
                  className="space-y-6 md:space-y-8 p-6 rounded-lg"
                  style={{
                    backgroundColor: item.bgColor || 'rgba(196, 185, 168, 1)',
                  }}
                >
                  <h3 className="text-3xl md:text-4xl font-serif text-white">
                    {item.title}
                  </h3>
                  <p className="text-white-600 text-base md:text-lg text-white">
                    {item.description}
                  </p>
                  <a
                    href="https://catalogue.visionnaire-home.com/catalogues"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center space-x-3 text-white"
                  >
                    <span>View Collection</span>
                    <ArrowRight className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300" />
                  </a>
                </div>
                <div className="relative aspect-[3/4] w-full md:w-full lg:w-full mx-auto rounded-lg overflow-hidden shadow-2xl">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
        </HorizontalScroll>
      </div>

      {/* See More button */}
      <div className="py-12 md:py-16 text-center bg-white">
        <a
          href="https://catalogue.visionnaire-home.com/catalogues"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-3 px-8 py-4 bg-[#c5a267] text-white text-lg font-medium tracking-wider hover:bg-[#c5a267] transition-all duration-300 group"
        >
          <span>See More Collections</span>
          <ArrowRight className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300" />
        </a>
      </div>
    </section>
  );
};

export default VisionnaireShowcase;

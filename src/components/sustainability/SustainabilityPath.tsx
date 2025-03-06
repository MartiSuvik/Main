import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import ParticleBackground from './ParticleBackground';

const SustainabilityPath: React.FC = () => {
  const approachRef = useRef<HTMLElement>(null);
  const approachTitleRef = useRef<HTMLHeadingElement>(null);
  const approachTextRef = useRef<HTMLParagraphElement>(null);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);

  useEffect(() => {
    if (
      approachRef.current &&
      approachTitleRef.current &&
      approachTextRef.current
    ) {
      gsap.to(approachRef.current, {
        backgroundColor: 'rgba(74, 107, 71, 0.05)',
        scrollTrigger: {
          trigger: approachRef.current,
          start: 'top center',
          end: 'bottom center',
          scrub: true,
        },
      });

      gsap.fromTo(
        approachTitleRef.current,
        {
          opacity: 0,
          scale: 0.9,
          textShadow: '0 0 0 rgba(74, 107, 71, 0)',
        },
        {
          opacity: 1,
          scale: 1,
          textShadow: '0 0 20px rgba(74, 107, 71, 0.3)',
          duration: 1,
          scrollTrigger: {
            trigger: approachTitleRef.current,
            start: 'top 80%',
          },
        }
      );

      gsap.to(approachTitleRef.current, {
        textShadow: '0 0 30px rgba(74, 107, 71, 0.5)',
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      });

      gsap.fromTo(
        approachTextRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.3,
          scrollTrigger: {
            trigger: approachTextRef.current,
            start: 'top 80%',
          },
        }
      );
    }
  }, []);

  const handleImageHover = (index: number) => {
    if (imageRefs.current[index]) {
      gsap.to(imageRefs.current[index], {
        scale: 1.05,
        rotationY: 5,
        rotationX: 3,
        boxShadow: '0 20px 40px rgba(74, 107, 71, 0.3)',
        duration: 0.3,
      });
    }
  };

  const handleImageLeave = (index: number) => {
    if (imageRefs.current[index]) {
      gsap.to(imageRefs.current[index], {
        scale: 1,
        rotationY: 0,
        rotationX: 0,
        boxShadow: '0 10px 20px rgba(74, 107, 71, 0.1)',
        duration: 0.3,
      });
    }
  };

  return (
    <section
      ref={approachRef}
      className="relative py-24 px-4 overflow-hidden transition-colors duration-1000"
    >
      <ParticleBackground
        containerId="approach-particles"
        className="opacity-70"
      />

      <div className="relative max-w-3xl mx-auto text-center z-10">
        <h2
          ref={approachTitleRef}
          className="text-4xl font-serif mb-8 text-[#4A6B47]"
        >
          The Path to Reduce the Environmental Footprint
        </h2>
        <p ref={approachTextRef} className="text-gray-600 leading-relaxed">
          Our commitment to sustainability goes beyond mere promises. We
          actively work to minimize our environmental impact through
          innovative design, responsible sourcing, and efficient manufacturing
          processes. Every decision we make is guided by our dedication to
          preserving our planet for future generations.
        </p>
      </div>

      <div className="max-w-6xl mx-auto mt-16 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            'https://images.unsplash.com/photo-1596237563267-84ffd99c80e1?q=80&w=2624&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://cdn.pixabay.com/photo/2016/11/19/17/25/furniture-1840463_1280.jpg',
          ].map((src, index) => (
            <div
              key={index}
              className="relative group perspective"
              onMouseEnter={() => handleImageHover(index)}
              onMouseLeave={() => handleImageLeave(index)}
            >
              <div className="absolute inset-0 bg-[#4A6B47]/10 rounded-lg filter blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <img
                ref={(el) => (imageRefs.current[index] = el)}
                src={src}
                alt={
                  index === 0
                    ? 'Sustainable Materials'
                    : 'Eco-friendly Furniture'
                }
                className="w-full h-[400px] object-cover rounded-lg transition-all duration-300"
                style={{
                  transformStyle: 'preserve-3d',
                  boxShadow: '0 10px 20px rgba(74, 107, 71, 0.1)',
                  border: '1px solid rgba(74, 107, 71, 0.1)',
                }}
              />
              <div className="absolute inset-0 rounded-lg ring-1 ring-[#4A6B47]/20 group-hover:ring-[#4A6B47]/40 transition-all duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SustainabilityPath;
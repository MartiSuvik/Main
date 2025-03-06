import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Leaf, Factory, Recycle } from 'lucide-react';
import ParticleBackground from './ParticleBackground';

gsap.registerPlugin(ScrollTrigger);

interface PillarCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  index: number;
  hoverImage: string;
}

const PillarCard: React.FC<PillarCardProps> = ({
  icon: Icon,
  title,
  description,
  index,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (!prefersReducedMotion && cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: index * 0.2,
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }
  }, [index]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (iconRef.current) {
      gsap.to(iconRef.current, {
        scale: 1.1,
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (iconRef.current) {
      gsap.to(iconRef.current, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  };

  useEffect(() => {
    if (imageRef.current) {
      gsap.to(imageRef.current, {
        x: mousePosition.x - 50,
        y: mousePosition.y - 50,
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  }, [mousePosition]);

  return (
    <div
      ref={cardRef}
      className="relative group"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="flex flex-col items-center text-center p-8 rounded-xl transition-all duration-300 hover:scale-105"
        style={{
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(12px)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        }}
      >
        <div
          ref={iconRef}
          className="mb-6 transition-all duration-300"
          style={{
            filter: isHovered
              ? 'drop-shadow(0 0 20px rgba(74, 107, 71, 0.5))'
              : 'none',
          }}
        >
          <Icon className="w-16 h-16 text-[#4A6B47]" />
        </div>
        <h3 className="text-xl font-serif mb-4 text-[#2C3E2B] transform transition-all duration-300 group-hover:translate-y-[-5px]">
          {title}
        </h3>
        <p className="text-gray-600 leading-relaxed transition-all duration-300 group-hover:text-gray-800">
          {description}
        </p>
      </div>
    </div>
  );
};

const SustainabilityHighlights: React.FC = () => {
  return (
    <section id="sustainability-highlights" className="relative py-24 px-4">
      <ParticleBackground containerId="pillars-particles" />
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
        <PillarCard
          index={0}
          icon={Leaf}
          title="Sustainable Sourcing"
          description="Responsibly sourced materials from certified suppliers, ensuring environmental preservation"
          hoverImage="https://images.unsplash.com/photo-1473116763249-2faaef81ccda?q=80&w=2096&auto=format&fit=crop"
        />
        <PillarCard
          index={1}
          icon={Factory}
          title="Zero Waste Manufacturing"
          description="Innovative production processes that minimize waste and maximize resource efficiency"
          hoverImage="https://images.unsplash.com/photo-1530587191325-3db1d0ed0d39?q=80&w=2096&auto=format&fit=crop"
        />
        <PillarCard
          index={2}
          icon={Recycle}
          title="Circular Design"
          description="Products designed for longevity, repair, and eventual recycling"
          hoverImage="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2013&auto=format&fit=crop"
        />
      </div>
    </section>
  );
};

export default SustainabilityHighlights;
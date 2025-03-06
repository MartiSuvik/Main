import React, { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';

interface StatisticCardProps {
  value: string;
  label: string;
  index: number;
}

const StatisticCard: React.FC<StatisticCardProps> = ({ value, label }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (
      !hasAnimated &&
      cardRef.current &&
      numberRef.current &&
      !prefersReducedMotion
    ) {
      const numericValue = parseInt(value.replace(/[^0-9]/g, ''));

      gsap.fromTo(
        cardRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 80%',
            onEnter: () => {
              setHasAnimated(true);
              gsap.to(numberRef.current, {
                duration: 2,
                textContent: numericValue,
                snap: { textContent: 1 },
                ease: 'power2.out',
              });
            },
            once: true,
          },
        }
      );

      gsap.to(cardRef.current, {
        y: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }
  }, [value, hasAnimated]);

  return (
    <div
      ref={cardRef}
      className="text-center transform hover:scale-105 transition-all duration-300 p-8 rounded-xl hover:shadow-lg relative z-10"
      style={{
        background: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
      }}
    >
      <div
        ref={numberRef}
        className="text-4xl md:text-5xl font-bold text-[#4A6B47] mb-2"
        style={{
          textShadow: '0 0 20px rgba(74, 107, 71, 0.2)',
        }}
      >
        0
      </div>
      <div className="text-sm text-gray-600 uppercase tracking-wider">
        {label}
      </div>
    </div>
  );
};

const AnimatedGraph = () => {
  const pathRef = useRef<SVGPathElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!hasAnimated && pathRef.current) {
      const path = pathRef.current;
      const length = path.getTotalLength();

      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
        opacity: 1,
      });

      gsap.to(path, {
        strokeDashoffset: 0,
        duration: 4,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: path,
          start: 'top 80%',
          onEnter: () => setHasAnimated(true),
          once: true,
        },
      });
    }
  }, [hasAnimated]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg
        className="w-full h-full"
        preserveAspectRatio="none"
        viewBox="0 0 1000 400"
      >
        <path
          ref={pathRef}
          d="M0,300 Q250,280 500,200 T1000,100"
          fill="none"
          stroke="#E8F5E9"
          strokeWidth="4"
        />
      </svg>
    </div>
  );
};

const SustainabilityStats: React.FC = () => {
  return (
    <section className="py-24 bg-gray-50 relative overflow-hidden">
      <AnimatedGraph />
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <StatisticCard value="47,893+" label="Trees Saved" index={0} />
          <StatisticCard value="75%" label="Waste Reduction" index={1} />
          <StatisticCard
            value="603,782"
            label="Liters of Water Conserved"
            index={2}
          />
        </div>
      </div>
    </section>
  );
};

export default SustainabilityStats;
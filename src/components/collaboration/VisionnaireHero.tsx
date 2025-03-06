'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ChevronDown } from 'lucide-react';

const VisionnaireHero: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Split the title into individual letters for staggered animation
    const titleLetters = titleRef.current?.querySelectorAll('span');
    gsap.set(titleLetters, {
      opacity: 0,
      rotateX: -90,
      transformOrigin: 'top center',
    });

    tl.fromTo(
      videoRef.current,
      { scale: 1.1, filter: 'brightness(0)' },
      { scale: 1, filter: 'brightness(1)', duration: 2.4, ease: 'power2.inOut' }
    )
      .fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.8 },
        '-=2'
      )
      .to(
        titleLetters,
        {
          opacity: 1,
          rotateX: 0,
          duration: 1.2,
          stagger: 0.15,
          ease: 'power4.out',
        },
        '-=1'
      )
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30, filter: 'blur(5px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.5 },
        '-=1.4'
      )
      .fromTo(
        arrowRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power2.inOut' },
        '-=0.5'
      );

    // Continuous arrow bounce animation
    gsap.to(arrowRef.current, {
      y: 10,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
    });

    return () => {
      tl.kill();
    };
  }, []);

  const scrollToNext = () => {
    const nextSection = document.getElementById('visionnaire-intro');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-screen overflow-hidden perspective-1000">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover scale-105"
      >
        <source
          src="https://res.cloudinary.com/dnddesigncenter/video/upload/v1740566639/qtc6byie8s2vb0jgzrna.mov"
          type="video/mp4"
        />
      </video>

      <div
        ref={overlayRef}
        className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70"
      />

      <div className="flex min-h-svh items-center justify-center">
        <div className="container text-center mx-auto relative z-10 px-4">
          <div className="grid grid-cols-1 items-start gap-12 py-16 md:items-end md:py-24 lg:gap-x-20 lg:py-28">
            <div className="mx-auto">
              <h1
                ref={titleRef}
                className="mb-5 text-8xl md:mb-6 md:text-9xl lg:text-10xl transform-gpu uppercase flex justify-center space-x-2 text-white/90"
                style={{ perspective: '800px' }}
              >
                {"VISIONNAIRE".split('').map((letter, index) => (
                  <span
                    key={index}
                    className="inline-block transform-gpu"
                    style={{
                      display: 'inline-block',
                      perspective: '800px',
                    }}
                  >
                    {letter}
                  </span>
                ))}
              </h1>
              <p
                ref={subtitleRef}
                className="text-white/90 text-xl md:text-2xl font-light"
                style={{ willChange: 'transform, opacity, filter' }}
              >
                A Collaboration in Pursuit of Perfection
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        ref={arrowRef}
        onClick={scrollToNext}
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 cursor-pointer"
      >
        <ChevronDown className="w-12 h-12 text-white hover:text-[#c5a267] transition-colors duration-300" />
      </div>

      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-gpu {
          transform: translateZ(0);
          backface-visibility: hidden;
          -webkit-font-smoothing: antialiased;
        }
      `}</style>
    </section>
  );
};

export default VisionnaireHero;

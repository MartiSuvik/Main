import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const VisionnaireThankYou = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const logosRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      // Text fade in animation
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Logos animation
      gsap.fromTo(
        logosRef.current,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          delay: 0.3,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-32 bg-white relative overflow-hidden"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-8 md:px-64 text-center">
        {/* Text Content with improved spacing */}
        <div ref={textRef} className="mb-16">
          <h2 className="text-4xl md:text-5xl font-serif mb-10">
            A Partnership Built to Last
          </h2>
          
          <p className="text-xl text-gray-700 leading-relaxed mb-8">
            We extend our deepest gratitude to Visionnaire for this extraordinary collaboration. 
            Together, we've created something truly special that transcends the boundaries of conventional design.
          </p>
          
          <p className="text-xl text-gray-700 leading-relaxed">
            This partnership represents more than a business relationship—it's a shared commitment to excellence that we believe will endure for generations, continuing to inspire and elevate the art of luxury living.
          </p>
        </div>

        {/* Logos with improved alignment and sizing */}
        <div ref={logosRef} className="flex items-center justify-center space-x-16">
          {/* D&D Logo */}
          <div className="relative flex items-center justify-center h-20">
            <img 
              src="https://res.cloudinary.com/dnddesigncenter/image/upload/D_D_h52kdi.svg" 
              alt="D&D Design Center" 
              className="h-20 object-contain"
            />
          </div>
          
          {/* Divider */}
          <div className="w-px h-24 bg-gray-300"></div>
          
          {/* Visionnaire Logo */}
          <div className="relative flex items-center justify-center h-20">
            <img 
              src="https://res.cloudinary.com/dnddesigncenter/image/upload/v1739957686/cf8dleiw01xgbjhmkcsk.svg" 
              alt="Visionnaire" 
              className="h-10 object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionnaireThankYou;

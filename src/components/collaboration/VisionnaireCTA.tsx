import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const VisionnaireCTA = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !headlineRef.current || !buttonRef.current) return;

    // Headline animation
    gsap.fromTo(
      headlineRef.current,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'top 20%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // Magnetic button effect
    const button = buttonRef.current;
    const bounds = button.getBoundingClientRect();
    const magnetStrength = 0.5;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const buttonX = bounds.left + bounds.width / 2;
      const buttonY = bounds.top + bounds.height / 2;
      const deltaX = clientX - buttonX;
      const deltaY = clientY - buttonY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const maxDistance = 100;

      if (distance < maxDistance) {
        const x = (deltaX * magnetStrength) / 2;
        const y = (deltaY * magnetStrength) / 2;
        gsap.to(button, {
          x,
          y,
          duration: 0.3,
          ease: 'power2.out',
        });
      } else {
        gsap.to(button, {
          x: 0,
          y: 0,
          duration: 0.3,
          ease: 'power2.out',
        });
      }
    };

    const handleMouseLeave = () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    document.addEventListener('mousemove', handleMouseMove);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      button.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section
    ref={sectionRef}
    className="py-32 bg-cover bg-center relative overflow-hidden"
    style={{
      backgroundImage: `url("https://www.visionnaire-home.com/sites/default/files/styles/big_image/public/paragraphs/image/_DSF9535_final%20(1)_0.jpg?itok=DeyHFIIC")`
    }}
  >
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#c5a267]/20 via-transparent to-transparent opacity-50" />
      
      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        <h2
          ref={headlineRef}
          className="text-5xl md:text-6xl lg:text-7xl font-serif text-white mb-12"
        >
          Experience the{' '}
          <span className="text-[#c5a267]">
            Future of Luxury
          </span>
        </h2>

                  {/* Updated Button with inline logo */}
          <div className="space-y-6 pt-4">
            <a
              ref={buttonRef}
              href="https://www.visionnaire-home.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-4 px-8 py-4 bg-[#c5a267] text-white text-lg font-medium tracking-wider hover:bg-[#c5a267] transition-all duration-300 group"
            >
              <img
                ref={logoRef}
                src="https://res.cloudinary.com/dnddesigncenter/image/upload/v1739957686/cf8dleiw01xgbjhmkcsk.svg"
                alt="Visionnaire"
                className="h-5 object-contain invert brightness-0"
              />
              <ArrowUpRight className="w-5 h-5 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
            </a>
          </div>
        </div>
    </section>
  );
};

export default VisionnaireCTA;
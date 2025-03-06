import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import ScrollArrow from "../ui/ScrollArrow";

interface HeroProps {
  scrollToTimeline: () => void;
}

const HowWeWorkHero: React.FC<HeroProps> = ({ }) => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    const titleLetters = titleRef.current?.querySelectorAll("span");

    if (titleLetters) {
      gsap.set(titleLetters, {
        opacity: 0,
        rotateX: -90,
        transformOrigin: "top center",
      });
    }

    tl.fromTo(
      bgRef.current,
      { scale: 1.1, filter: "brightness(0)" },
      { scale: 1, filter: "brightness(1)", duration: 2.4, ease: "power2.inOut" }
    )
      .fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.8 },
        "-=2"
      )
      .to(
        titleLetters || [],
        {
          opacity: 1,
          rotateX: 0,
          duration: 1.2,
          stagger: 0.15,
          ease: "power4.out",
        },
        "-=1"
      )
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30, filter: "blur(5px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.5 },
        "-=1.4"
      )
      .fromTo(
        arrowRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power2.inOut" },
        "-=0.5"
      );

    // Continuous arrow bounce animation
    gsap.to(arrowRef.current, {
      y: 10,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative h-screen flex items-center justify-center overflow-hidden perspective-1000"
    >
      <div className="absolute inset-0">
        <div
          ref={bgRef}
          className="absolute inset-0 bg-cover bg-center transform scale-[1.1] transition-transform duration-1000"
          style={{
            backgroundImage:
              "url('https://www.astra.it/img/showroom/living_1_composition.webp')",
          }}
        >
          <div ref={overlayRef} className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />
        </div>
      </div>
      <div className="relative z-10 text-center px-4 hero-content">
        <h1
          ref={titleRef}
          className="mb-5 text-8xl text-text-alternative md:mb-6 md:text-9xl lg:text-10xl transform-gpu uppercase flex justify-center space-x-2"
          style={{ perspective: "800px" }}
        >
          {"How We Work".split("").map((letter, index) => (
            <span
              key={index}
              className="inline-block transform-gpu text-white/90"
              style={{ perspective: "800px" }}
            >
              {letter === " " ? "\u00A0" : letter}
            </span>
          ))}
        </h1>
        <p
          ref={subtitleRef}
          className="text-white/90 text-xl md:text-2xl font-light"
          style={{
            willChange: "transform, opacity, filter",
          }}
        >
          Our process of transforming spaces through Italian craftsmanship.
        </p>
      </div>
      <div
        ref={arrowRef}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 cursor-pointer z-10 transition-transform duration-300 hover:scale-110"
      >
        <ScrollArrow
          targetId="how-we-work-stages"
          className="w-12 h-12 text-white hover:text-[#C5A267] transition-colors duration-300"
        />
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

export default HowWeWorkHero;
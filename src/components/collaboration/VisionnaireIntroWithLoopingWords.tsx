import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const VisionnaireIntroWithLoopingWords = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textContentRef = useRef<HTMLDivElement>(null);
  const wordListRef = useRef<HTMLUListElement>(null);
  const edgeRef = useRef<HTMLDivElement>(null);
  const cornerTopLeftRef = useRef<HTMLDivElement>(null);
  const cornerBottomRightRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLQuoteElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.set([cornerTopLeftRef.current, cornerBottomRightRef.current], {
        scale: 0,
        opacity: 0,
        rotate: 180,
      });
      
      gsap.set(textContentRef.current, {
        opacity: 0,
        clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)',
      });

      gsap.set([quoteRef.current, subtitleRef.current, paragraphRef.current, buttonRef.current, logoRef.current], {
        opacity: 0,
        y: 30,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'top 20%',
          toggleActions: 'play none none reverse',
        },
      });

      tl.to(textContentRef.current, {
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
        opacity: 1,
        duration: 0.4,
        ease: 'power3.inOut',
      })
      .to([cornerTopLeftRef.current, cornerBottomRightRef.current], {
        scale: 1,
        opacity: 1,
        duration: 0.4,
        stagger: 0.2,
        ease: 'back.out(1.7)',
      }, '-=0.8');

      const cornerRotation = gsap.to([cornerTopLeftRef.current, cornerBottomRightRef.current], {
        rotate: 360,
        duration: 0.7,
        ease: 'linear',
        paused: true,
        onComplete: () => {
          gsap.set([cornerTopLeftRef.current, cornerBottomRightRef.current], {
            rotate: 0,
          });

          gsap.to([quoteRef.current, subtitleRef.current, paragraphRef.current, buttonRef.current, logoRef.current], {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.2,
            ease: 'power3.out',
          });
        }
      });

      tl.add(() => cornerRotation.play(), '-=0.2');

      if (wordListRef.current) {
        const wordList = wordListRef.current;
        const words = Array.from(wordList.children);
        const totalWords = words.length;
        const wordHeight = 100 / totalWords;
        let currentIndex = 0;

        function updateEdgeWidth() {
          if (!edgeRef.current || !wordList) return;
          const centerIndex = (currentIndex + 1) % totalWords;
          const centerWord = words[centerIndex] as HTMLElement;
          const centerWordWidth = centerWord.getBoundingClientRect().width;
          const listWidth = wordList.getBoundingClientRect().width;
          const percentageWidth = (centerWordWidth / listWidth) * 100;
          
          gsap.to(edgeRef.current, {
            width: `${percentageWidth}%`,
            duration: 0.5,
            ease: 'expo.out',
          });
        }

        function moveWords() {
          currentIndex++;
          gsap.to(wordList, {
            yPercent: -wordHeight * currentIndex,
            duration: 1.2,
            ease: 'elastic.out(1, 0.85)',
            onStart: updateEdgeWidth,
            onComplete: () => {
              if (currentIndex >= totalWords - 3) {
                wordList.appendChild(wordList.children[0]);
                currentIndex--;
                gsap.set(wordList, { yPercent: -wordHeight * currentIndex });
                words.push(words.shift()!);
              }
            },
          });
        }

        updateEdgeWidth();
        const wordsTl = gsap.timeline({ repeat: -1, delay: 1 });
        wordsTl.call(moveWords).to({}, { duration: 2 }).repeat(-1);

        return () => {
          wordsTl.kill();
        };
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="visionnaire-intro"
      className="relative min-h-screen bg-white flex items-center py-24"
    >
      <div className="max-w-7xl mx-auto px-4 w-full grid md:grid-cols-2 gap-12 items-center">
        {/* Left Column - Text Content */}
        <div 
          ref={textContentRef} 
          className="relative space-y-8 p-8 rounded-xl"
          style={{          
            boxShadow: '0 8px 32px rgba(192, 169, 96, 0.1)',
            backdropFilter: 'blur(8px)',
            willChange: 'clip-path, transform',
          }}
        >
          <div 
            ref={cornerTopLeftRef}
            className="absolute top-0 left-0 w-24 h-24 border-t-2 border-l-2 border-[#c5a267] opacity-50"
            style={{ transformOrigin: 'top left' }}
          />
          <div 
            ref={cornerBottomRightRef}
            className="absolute bottom-0 right-0 w-24 h-24 border-b-2 border-r-2 border-[#c5a267] opacity-50"
            style={{ transformOrigin: 'bottom right' }}
          />
          
          <blockquote ref={quoteRef} className="text-5xl md:text-6xl font-serif leading-tight">
            Where <span className="text-[#c5a267] font-bold">Innovation</span> Meets{' '}
            <span className="text-[#c5a267] font-bold">Tradition</span>
          </blockquote>
          <p ref={subtitleRef} className="text-2xl text-gray-600 italic font-light tracking-wide">
            "A partnership that redefines luxury living"
          </p>
          <p ref={paragraphRef} className="text-lg text-gray-800 leading-relaxed font-light">
            Our collaboration with Visionnaire represents the pinnacle of Italian
            craftsmanship and contemporary design. Each piece is a testament to our
            shared commitment to excellence, combining traditional artisanal techniques
            with innovative design approaches.
          </p>
          
          {/* Updated Button with inline logo */}
          <div className="space-y-6 pt-4">
            <a
              ref={buttonRef}
              href="https://www.visionnaire-home.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-4 px-8 py-4 bg-[#c5a267] text-white text-lg font-medium tracking-wider hover:bg-[#c5a267] transition-all duration-200 group"
            >
              <img
                ref={logoRef}
                src="https://res.cloudinary.com/dnddesigncenter/image/upload/v1739957686/cf8dleiw01xgbjhmkcsk.svg"
                alt="Visionnaire"
                className="h-5 object-contain invert brightness-0"
              />
              <ArrowUpRight className="w-5 h-5 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-200" />
            </a>
          </div>
        </div>

        {/* Right Column - Looping Words */}
        <div className="flex justify-center items-center">
          <div className="h-[2.7em] px-[0.1em] text-[5vw] leading-[0.9] relative">
            <div className="w-full h-full relative overflow-hidden">
              <ul
                ref={wordListRef}
                className="text-center uppercase whitespace-nowrap flex flex-col items-center m-0 p-0 font-serif list-none relative text-[#c5a267]"
              >
                <li className="flex items-center justify-center h-[1em] relative">
                  <p className="m-0">LUXURY</p>
                </li>
                <li className="flex items-center justify-center h-[1em] relative">
                  <p className="m-0">DIFFERENT</p>
                </li>
                <li className="flex items-center justify-center h-[1em] relative">
                  <p className="m-0">NEW</p>
                </li>
                <li className="flex items-center justify-center h-[1em] relative">
                  <p className="m-0">UNIQUE</p>
                </li>
                <li className="flex items-center justify-center h-[1em] relative">
                  <p className="m-0">VISIONNAIRE</p>
                </li>
              </ul>
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white pointer-events-none" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div 
                ref={edgeRef} 
                className="h-[2px] transition-all duration-200"
                style={{
                  position: 'absolute',
                  bottom: '0.7em',
                  transform: 'translateY(100%)',
                  zIndex: 20
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionnaireIntroWithLoopingWords;
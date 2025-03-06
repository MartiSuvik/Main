import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const VisionnaireIntroWithLoopingWords = () => {
  // Refs for the left side text animations
  const sectionRef = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  // Refs for the looping words animation on the right
  const wordListRef = useRef<HTMLUListElement>(null);
  const edgeRef = useRef<HTMLDivElement>(null);

  // Left side text animations (VisionnaireIntro)
  useEffect(() => {
    if (sectionRef.current && quoteRef.current && textRef.current) {
      gsap.fromTo(
        quoteRef.current,
        {
          opacity: 0,
          y: 50,
          filter: 'blur(10px)',
        },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'top 20%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        textRef.current,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.3,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'top 20%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }
  }, []);

  // Right side looping words animation
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!wordListRef.current || !edgeRef.current) return;

    const wordList = wordListRef.current;
    let words = Array.from(wordList.children) as HTMLElement[];
    const totalWords = words.length;
    const wordHeight = 100 / totalWords; // Percentage offset per word
    let currentIndex = 0;

    function updateEdgeWidth() {
      const centerIndex = (currentIndex + 1) % totalWords;
      const centerWord = words[centerIndex];
      const centerWordWidth = centerWord.getBoundingClientRect().width;
      const listWidth = wordList.getBoundingClientRect().width;
      const percentageWidth = (centerWordWidth / listWidth) * 100;
      gsap.to(edgeRef.current, {
        width: `${percentageWidth}%`,
        duration: 0.5,
        ease: 'Expo.easeOut',
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
    const tl = gsap.timeline({ repeat: -1, delay: 1 });
    tl.call(moveWords).to({}, { duration: 2 }).repeat(-1);

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="visionnaire-intro"
      className="py-32 bg-white relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center">
        {/* Left Column: Visionnaire Text */}
        <div className="w-full md:w-1/2">
          <div ref={quoteRef} className="mb-16">
            <blockquote className="text-4xl md:text-5xl lg:text-6xl font-serif leading-tight mb-8 text-center md:text-left">
              "Where <span className="text-[#c5a267]">Innovation</span> Meets{' '}
              <span className="text-[#c5a267]">Tradition</span>"
            </blockquote>
            <p className="text-xl text-gray-600 italic text-center md:text-left">
              A partnership that redefines luxury living
            </p>
          </div>
          <div ref={textRef} className="max-w-3xl mx-auto text-center md:text-left">
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Our collaboration with Visionnaire represents the pinnacle of Italian
              craftsmanship and contemporary design. Each piece is a testament to our
              shared commitment to excellence, combining traditional artisanal techniques
              with innovative design approaches.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Together, we create more than furniture; we craft experiences that transform
              spaces into extraordinary environments, where luxury is not just seen but
              felt in every detail.
            </p>
          </div>
        </div>
        {/* Right Column: Looping Words Animation */}
        <div className="w-full md:w-1/2 flex justify-center items-center">
          <div className="looping-words">
            <div className="looping-words__containers">
              <ul
                ref={wordListRef}
                data-looping-words-list
                className="looping-words__list"
              >
                <li className="looping-words__list">
                  <p className="looping-words__p">LUXURY</p>
                </li>
                <li className="looping-words__list">
                  <p className="looping-words__p">DIFFERENT</p>
                </li>
                <li className="looping-words__list">
                  <p className="looping-words__p">NEW</p>
                </li>
                <li className="looping-words__list">
                  <p className="looping-words__p">UNIQUE</p>
                </li>
                <li className="looping-words__list">
                  <p className="looping-words__p">VISIONNAIRE</p>
                </li>
              </ul>
            </div>
            <div className="looping-words__fade"></div>
            <div data-looping-words-selector className="looping-words__selector">
              <div className="looping-words__edge"></div>
              <div className="looping-words__edge is--2"></div>
              <div className="looping-words__edge is--3"></div>
              <div className="looping-words__edge is--4"></div>
              <div ref={edgeRef} className="looping-words__edge" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionnaireIntroWithLoopingWords;

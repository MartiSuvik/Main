import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';

interface SlideContent {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  details?: string[];
  icon?: React.ReactNode;
}

interface CardSliderProps {
  slides: SlideContent[];
  autoPlayInterval?: number;
  className?: string;
}

export const ThreeDCardSlider: React.FC<CardSliderProps> = ({
  slides,
  autoPlayInterval = 5000,
  className,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  // Handle auto-play functionality
  useEffect(() => {
    if (isHovering) return;
    
    autoPlayRef.current = setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, autoPlayInterval);
    
    return () => {
      if (autoPlayRef.current) {
        clearTimeout(autoPlayRef.current);
      }
    };
  }, [activeIndex, autoPlayInterval, isHovering, slides.length]);

  // Handle next slide
  const handleNextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % slides.length);
    if (autoPlayRef.current) {
      clearTimeout(autoPlayRef.current);
    }
  };

  // Handle previous slide
  const handlePrevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
    if (autoPlayRef.current) {
      clearTimeout(autoPlayRef.current);
    }
  };

  // Format description with bold text
  const formatDescription = (description: string) => {
    return description.split(/(\*\*.*?\*\*)/g).map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index}>{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  return (
    <div 
      className={cn("relative w-full max-w-4xl mx-auto px-16", className)}
      ref={sliderRef}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Navigation Arrows - Positioned Outside */}
      <button
        onClick={handlePrevSlide}
        className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors duration-300 z-20"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-10 h-10 text-grey" />
      </button>
      
      <button
        onClick={handleNextSlide}
        className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors duration-300 z-20"
        aria-label="Next slide"
      >
        <ChevronRight className="w-10 h-10 text-grey" />
      </button>

      {/* Main Card Container */}
      <div className="relative w-full max-w-[700px] h-[500px] mx-auto overflow-hidden rounded-lg">
        <AnimatePresence initial={false} mode="wait">
          {slides.map((slide, index) => (
            index === activeIndex && (
              <motion.div
                key={slide.id}
                className="absolute inset-0 w-full h-full"
                initial={{ 
                  opacity: 0,
                  x: 100
                }}
                animate={{ 
                  opacity: 1,
                  x: 0
                }}
                exit={{ 
                  opacity: 0,
                  x: -100
                }}
                transition={{
                  type: "tween",
                  duration: 0.5,
                  ease: "easeInOut"
                }}
              >
                {/* Card Content */}
                <div className="relative w-full h-full overflow-hidden rounded-lg bg-gradient-to-br from-gray-900 to-gray-800 shadow-lg">
                  {/* Background Image */}
                  <div 
                    className="absolute inset-0 w-full h-full"
                    style={{
                      backgroundImage: `url(${slide.imageUrl})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      filter: 'brightness(0.7)',
                    }}
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  
                  {/* Content Container with Slide-up Animation */}
                  <div className="absolute inset-0 flex flex-col justify-end p-8 text-white z-10">
                    {/* Icon with Slide-up Animation */}
                    <motion.div 
                      className="mb-6 w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                    >
                      {slide.icon}
                    </motion.div>
                    
                    {/* Title with Slide-up Animation */}
                    <motion.h2 
                      className="text-3xl md:text-4xl font-bold mb-4 text-white"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.5 }}
                    >
                      {slide.title}
                    </motion.h2>
                    
                    {/* Description with Slide-up Animation */}
                    <motion.p 
                      className="text-base md:text-lg text-white/90 mb-6 max-w-xl"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                    >
                      {formatDescription(slide.description)}
                    </motion.p>
                    
                    {/* Details List with Slide-up Animation */}
                    {slide.details && (
                      <motion.div 
                        className="grid grid-cols-2 gap-4 mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.5 }}
                      >
                        {slide.details.map((detail, idx) => (
                          <div key={idx} className="flex items-center text-base text-white/80">
                            <div className="w-2 h-2 rounded-full bg-white/80 mr-3 flex-shrink-0" />
                            <span>{detail}</span>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          ))}
        </AnimatePresence>
      </div>
      
      {/* Pagination Dots */}
      <div className="flex justify-center mt-8 space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === activeIndex 
                ? 'bg-white scale-125' 
                : 'bg-white/30 hover:bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
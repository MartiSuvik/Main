// TestimonialsSection.tsx
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Star } from 'lucide-react'; // Use same import source

interface Testimonial {
  id: number;
  name: string;
  position: string;
  quote: string;
  rating: number;
}

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
  currentTestimonial: number;
  setCurrentTestimonial: (index: number) => void;
}

export default function TestimonialsSection({
  testimonials = [], // Default empty array to avoid errors
  currentTestimonial,
  setCurrentTestimonial,
}: TestimonialsSectionProps) {
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const testimonialRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (testimonialRef.current) {
      gsap.fromTo(
        testimonialRef.current,
        { opacity: 0, scale: 0.95 }, // Add slight scale effect
        { opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out' }
      );
    }
  }, [currentTestimonial]);

  return (
    <section ref={testimonialsRef} className="py-12 bg-white">
      <div className="max-w-6xl mx-auto px-4"> {/* Reduced max width */}
        <h2 className="text-3xl font-serif text-[#1A1A1A] text-center mb-3">
          Client Testimonials
        </h2>
        <div className="relative overflow-hidden">
          <div className="h-80 flex items-center justify-center"> {/* Reduced height */}
            {testimonials.map((testimonial, index) =>
              index === currentTestimonial ? (
                <div
                  key={testimonial.id}
                  ref={testimonialRef}
                  className="w-full flex-shrink-0 px-4"
                >
                  <div className="max-w-xl mx-auto text-center p-6 border border-[#C4A661]/30 rounded-lg shadow-lg"> 
                    <div className="flex justify-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 text-[#C4A661] fill-current"
                        />
                      ))}
                    </div>
                    <blockquote className="text-xl text-[#1A1A1A] mb-4 font-sans">
                      &ldquo;{testimonial.quote}&rdquo;
                    </blockquote>
                    <div className="text-[#C4A661] font-sans text-lg font-semibold">
                      {testimonial.name}
                    </div>
                    <div className="text-[#1A1A1A]/60 font-sans text-sm">
                      {testimonial.position}
                    </div>
                  </div>
                </div>
              ) : null
            )}
          </div>

          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                  currentTestimonial === index
                    ? 'bg-[#C4A661]'
                    : 'bg-[#1A1A1A]/20'
                }`}
                onClick={() => setCurrentTestimonial(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

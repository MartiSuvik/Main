import { useEffect, useRef, ReactNode } from 'react';
import { gsap } from 'gsap';
import { cn } from '../../lib/utils';

interface GridMotionProps {
  /**
   * Array of items to display in the grid
   */
  items?: (string | ReactNode)[];
  /**
   * Color for the radial gradient background
   */
  gradientColor?: string;
  /**
   * Additional CSS classes
   */
  className?: string;
}

export function GridMotion({ items = [], className }: GridMotionProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mouseXRef = useRef(window.innerWidth / 2);

  // Use 24 items (4 rows x 6 columns)
  const totalItems = 24;
  const defaultItems = Array.from(
    { length: totalItems },
    (_, index) => `Item ${index + 1}`
  );
  const combinedItems =
    items.length > 0 ? items.slice(0, totalItems) : defaultItems;

  useEffect(() => {
    gsap.ticker.lagSmoothing(0);

    const handleMouseMove = (e: MouseEvent) => {
      mouseXRef.current = e.clientX;
    };

    const updateMotion = () => {
      const maxMoveAmount = 300;
      const baseDuration = 0.8;
      const inertiaFactors = [0.6, 0.4, 0.3, 0.2];

      rowRefs.current.forEach((row, index) => {
        if (row) {
          const direction = index % 2 === 0 ? 1 : -1;
          const moveAmount =
            ((mouseXRef.current / window.innerWidth) * maxMoveAmount -
              maxMoveAmount / 2) *
            direction;

          gsap.to(row, {
            x: moveAmount,
            duration:
              baseDuration + inertiaFactors[index % inertiaFactors.length],
            ease: 'power3.out',
            overwrite: 'auto',
          });
        }
      });
    };

    const removeAnimationLoop = gsap.ticker.add(updateMotion);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      removeAnimationLoop();
    };
  }, []);

  return (
    <div
      className={cn('h-full w-full overflow-hidden', className)}
      ref={gridRef}
    >
      <section
        className="relative flex h-screen w-full items-center justify-center overflow-hidden"
        style={{
          background: `radial-gradient(circle, white 0%, transparent 100%)`,
        }}
      >
        <div className="relative z-2 flex-none grid h-[150vh] w-[150vw] gap-4 grid-rows-[repeat(4,1fr)] grid-cols-[100%] -rotate-15 origin-center">
          {[...Array(4)].map((_, rowIndex) => (
            <div
              key={rowIndex}
              className="grid gap-4 grid-cols-[repeat(6,1fr)] will-change-transform will-change-filter"
              ref={(el) => (rowRefs.current[rowIndex] = el)}
            >
              {[...Array(6)].map((_, itemIndex) => {
                const content = combinedItems[rowIndex * 6 + itemIndex];
                return (
                  <div key={itemIndex} className="relative">
                    <div className="relative h-full w-full overflow-hidden bg-muted flex items-center justify-center text-foreground text-xl group">
                      {typeof content === 'string' &&
                      content.startsWith('http') ? (
                        <>
                          <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{
                              backgroundImage: `url(${content})`,
                            }}
                          />
                          {/* Overlay with opacity */}
                          <div className="absolute inset-0 bg-white opacity-0 pointer-events-none" />
                          {/* Shine overlay */}
                          <div className="absolute inset-0 pointer-events-none shine" />
                        </>
                      ) : (
                        <>
                          <div className="absolute inset-0 bg-gradient-to-b from-white/80 to-transparent pointer-events-none" />
                          <div className="p-4 text-center relative z-10">
                            {content}
                          </div>
                          {/* Shine overlay */}
                          <div className="absolute inset-0 pointer-events-none shine" />
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        <div className="relative pointer-events-none h-full w-full inset-0">
          <div className="rounded-none" />
        </div>
      </section>
      <style>{`
        @keyframes shineAnimation {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .shine {
          background: linear-gradient(120deg, transparent, rgba(255, 255, 255, 0.15), transparent);
          opacity: 0.5;
          animation: shineAnimation 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface TooltipPosition {
  top: string;
  left: string;
}

const tooltipPositions: Record<string, TooltipPosition> = {
  chair: {
    top: '60%',
    left: '70%',
  },
  cabinet: {
    top: '40%',
    left: '30%',
  },
};

const SustainabilityShowcase: React.FC = () => {
  const midSectionImageRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (midSectionImageRef.current) {
      gsap.fromTo(
        midSectionImageRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: midSectionImageRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }
  }, []);

  return (
    <section className="py-16 px-4">
      <div
        ref={midSectionImageRef}
        className="max-w-6xl mx-auto overflow-hidden rounded-lg shadow-xl relative"
      >
        <div className="aspect-w-16 aspect-h-9 relative">
          <img
            src="https://res.cloudinary.com/dnddesigncenter/image/upload/dada_design-76g-UdCbEVU-unsplash_converted_g8oh74.avif"
            alt="Sustainable Design"
            className="w-full h-full object-cover"
          />

          <div
            className="item-hints absolute"
            style={{
              top: tooltipPositions.chair.top,
              left: tooltipPositions.chair.left,
            }}
          >
            <div className="hint" data-position="4">
              <span className="hint-radius"></span>
              <span className="hint-dot"></span>
              <div className="hint-content">
                <p>
                  Ergonomically designed chair crafted from sustainable
                  materials. Features recycled aluminum frame and responsibly
                  sourced wood, reducing environmental impact while
                  maintaining premium comfort.
                </p>
              </div>
            </div>
          </div>

          <div
            className="item-hints absolute"
            style={{
              top: tooltipPositions.cabinet.top,
              left: tooltipPositions.cabinet.left,
            }}
          >
            <div className="hint" data-position="1">
              <span className="hint-radius"></span>
              <span className="hint-dot"></span>
              <div className="hint-content">
                <p>
                  Modern storage solution using FSC-certified wood and
                  eco-friendly finishes. Modular design allows for easy
                  repairs and component replacements, extending product
                  lifecycle.
                </p>
              </div>
            </div>
          </div>
        </div>

        <style>{`
          .item-hints {
            height: 200px;
            width: 200px;
          }

          .item-hints .hint {
            width: 60px;
            height: 60px;
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .item-hints .hint::before {
            background-color: #fff;
            width: 8px;
            height: 8px;
            z-index: 2;
            clip-path: polygon(50% 0, 100% 50%, 50% 100%, 0 50%);
            content: "";
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }

          .item-hints .hint::after {
            content: "";
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            border-radius: 50%;
            width: 2px;
            height: 2px;
            z-index: 1;
            box-shadow: 0 0 50px 30px rgba(72, 170, 72, 0.3);
            animation: home_hero_item_hints_glow 2s cubic-bezier(0.25, 0.1, 0.2, 1) infinite;
            transition: opacity 0.5s ease;
          }

          @keyframes home_hero_item_hints_glow {
            0% {
              box-shadow: 0 0 30px 5px #48aa48;
            }
            70% {
              box-shadow: 0 0 70px 50px rgba(72, 170, 72, 0);
            }
            100% {
              box-shadow: 0 0 0 50px rgba(72, 170, 72, 0);
            }
          }

          .item-hints .hint-dot {
            z-index: 3;
            border: 1px solid #fff;
            border-radius: 50%;
            width: 60px;
            height: 60px;
            display: block;
            transform: translate(-0%, -0%) scale(0.95);
            animation: home_hero_item_hints_border 2s linear infinite;
            margin: auto;
          }

          @keyframes home_hero_item_hints_border {
            0%, 100% {
              border-color: rgba(255, 255, 255, 0.6);
              transform: translate(-0%, -0%) scale(0.95);
            }
            50% {
              border-color: rgba(255, 255, 255, 0.3);
              transform: translate(-0%, -0%) scale(1);
            }
          }

          .item-hints .hint-radius {
            background-color: rgba(255, 255, 255, 0.1);
            border-radius: 50%;
            width: 250px;
            height: 250px;
            position: absolute;
            top: 50%;
            left: 50%;
            margin: -125px 0 0 -125px;
            opacity: 0;
            visibility: hidden;
            transform: scale(0);
            transition: all 0.5s ease;
          }

          .item-hints .hint:hover .hint-radius {
            opacity: 1;
            visibility: visible;
            transform: scale(1);
          }

          .item-hints .hint[data-position="1"] .hint-content {
            top: 85px;
            left: 142%;
            transform: translateY(-176%);
            margin-left: 0;
          }

          .item-hints .hint[data-position="4"] .hint-content {
            bottom: 85px;
            right: 142%;
            margin-left: 0;
            text-align: right;
          }

          .item-hints .hint[data-position="4"] .hint-content::before {
            right: 0;
            left: auto;
          }

          .item-hints .hint[data-position="4"] .hint-content::after {
            transform-origin: -115% 0%;
            transform: rotate(0deg);
            top: 53%;
            left: 62%;
            width: 80px;
            content: "";
            background-color: #fff;
            height: 1px;
            position: absolute;
            opacity: 1;
            transition: opacity 0.5s ease;
            transform: translate(180%, -100%) rotate(47deg);
          }

          .item-hints .hint-content {
            color: #40b346;
            width: 300px;
            position: absolute;
            z-index: 5;
            padding: 12px 20px;
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.7s ease, visibility 0.7s ease;
            pointer-events: none;
            background-color: rgba(255, 255, 255, 0.6);
            border-radius: 8px;
          }

          .item-hints .hint:hover .hint-content {
            opacity: 1;
            visibility: visible !important;
          }

          .item-hints .hint-content::before {
            width: 0px;
            bottom: 0;
            left: 0;
            content: "";
            background-color: #fff;
            height: 1px;
            position: absolute;
            transition: width 0.4s;
          }

          .item-hints .hint:hover .hint-content::before {
            width: 180px;
            transition: width 0.4s;
          }

          .item-hints .hint-content::after {
            transform-origin: 0 50%;
            transform: rotate(-225deg);
            bottom: 0;
            left: 0;
            width: 80px;
            content: "";
            background-color: #fff;
            height: 1px;
            position: absolute;
            opacity: 1;
            transition: opacity 0.5s ease;
            transition-delay: 0s;
          }

          .item-hints .hint:hover .hint-content::after {
            opacity: 1;
            visibility: visible;
          }
        `}</style>
      </div>
    </section>
  );
};

export default SustainabilityShowcase;
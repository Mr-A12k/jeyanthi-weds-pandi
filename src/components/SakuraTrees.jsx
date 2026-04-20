import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import sakuraCanopy from '../assets/sakura_canopy.png';

gsap.registerPlugin(ScrollTrigger);

const SakuraTrees = () => {
  const containerRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animation
      gsap.from([leftRef.current, rightRef.current], {
        opacity: 0,
        y: -50,
        scale: 1.1,
        duration: 2,
        ease: 'power2.out',
      });

      // Parallax effect - recede as user scrolls
      gsap.to(leftRef.current, {
        y: -150,
        x: -100,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: 'body',
          start: 'top top',
          end: '800px top',
          scrub: true,
        },
      });

      gsap.to(rightRef.current, {
        y: -150,
        x: 100,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: 'body',
          start: 'top top',
          end: '800px top',
          scrub: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-[40] overflow-hidden">
      {/* Top Left Canopy */}
      <div 
        ref={leftRef}
        className="absolute -top-20 -left-20 w-[450px] md:w-[700px] lg:w-[900px] aspect-video"
      >
        <img
          src={sakuraCanopy}
          alt=""
          className="w-full h-full object-cover opacity-80"
          style={{ 
            clipPath: 'ellipse(80% 60% at 20% 20%)',
            filter: 'blur(1px) drop-shadow(0 0 20px rgba(0,0,0,0.1))'
          }}
        />
      </div>

      {/* Top Right Canopy */}
      <div 
        ref={rightRef}
        className="absolute -top-20 -right-20 w-[450px] md:w-[700px] lg:w-[900px] aspect-video"
      >
        <img
          src={sakuraCanopy}
          alt=""
          className="w-full h-full object-cover opacity-80"
          style={{ 
            transform: 'scaleX(-1)',
            clipPath: 'ellipse(80% 60% at 80% 20%)',
            filter: 'blur(1px) drop-shadow(0 0 20px rgba(0,0,0,0.1))'
          }}
        />
      </div>
    </div>
  );
};

export default SakuraTrees;

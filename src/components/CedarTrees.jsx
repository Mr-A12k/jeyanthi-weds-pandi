import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import cedarImg from '../assets/cedar_branch.png';

gsap.registerPlugin(ScrollTrigger);

const CedarTrees = () => {
  const containerRef = useRef(null);
  const leftTreeRef = useRef(null);
  const rightTreeRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Small reveal animation on load
      gsap.from([leftTreeRef.current, rightTreeRef.current], {
        opacity: 0,
        x: (i) => (i === 0 ? -100 : 100),
        duration: 1.5,
        ease: 'power3.out',
        delay: 0.5,
      });

      // Parallax Hide Effect
      gsap.to(leftTreeRef.current, {
        x: -200,
        y: -100,
        rotation: -10,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: 'body',
          start: 'top top',
          end: '500px top',
          scrub: true,
        },
      });

      gsap.to(rightTreeRef.current, {
        x: 200,
        y: -100,
        rotation: 10,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: 'body',
          start: 'top top',
          end: '500px top',
          scrub: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-[40] overflow-hidden">
      {/* Left Tree */}
      <img
        ref={leftTreeRef}
        src={cedarImg}
        alt=""
        className="absolute -top-10 -left-20 w-[400px] md:w-[600px] lg:w-[800px] opacity-90 mix-blend-multiply"
        style={{ 
          transform: 'rotate(-15deg)',
          filter: 'drop-shadow(10px 10px 20px rgba(0,0,0,0.05))'
        }}
      />
      
      {/* Right Tree */}
      <img
        ref={rightTreeRef}
        src={cedarImg}
        alt=""
        className="absolute -top-10 -right-20 w-[400px] md:w-[600px] lg:w-[800px] opacity-90 mix-blend-multiply"
        style={{ 
          transform: 'scaleX(-1) rotate(-15deg)',
          filter: 'drop-shadow(-10px 10px 20px rgba(0,0,0,0.05))'
        }}
      />
    </div>
  );
};

export default CedarTrees;

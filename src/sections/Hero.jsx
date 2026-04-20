import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import CountdownTimer from '../components/CountdownTimer';
import FloralDivider from '../components/FloralDivider';

const Hero = ({ data }) => {
  const { couple, wedding } = data;
  const containerRef = useRef(null);
  const bgRef = useRef(null);
  const titleRef = useRef(null);
  const subRef = useRef(null);
  const dateRef = useRef(null);
  const countdownRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!subRef.current || !titleRef.current) return;

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(subRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, delay: 0.3 })
        .fromTo(titleRef.current.children,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1.2, stagger: 0.2 },
          '-=0.5'
        )
        .fromTo(dateRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.4')
        .fromTo(countdownRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.4');

      // Parallax on scroll
      if (bgRef.current) {
        gsap.to(bgRef.current, {
          yPercent: 30,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-transparent"
    >
      {/* Background Gradient Layer */}
      <div 
        className="absolute inset-0 z-0"
        style={{ background: 'linear-gradient(160deg, #fff5f7 0%, #f5f0ff 40%, #fff0f5 70%, #fdfaf6 100%)' }}
      />
      {/* Decorative radial glow */}
      <div
        ref={bgRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 20% 30%, rgba(244,163,199,0.18) 0%, transparent 70%),
            radial-gradient(ellipse 60% 80% at 80% 70%, rgba(196,181,253,0.20) 0%, transparent 70%)
          `,
        }}
      />



      {/* Corner ornaments */}
      <svg className="absolute top-4 left-4 w-12 h-12 opacity-20 sm:top-6 sm:left-6 sm:w-16 sm:h-16 md:top-8 md:left-8 md:w-20 md:h-20" viewBox="0 0 80 80" fill="none">
        <path d="M0 0 Q40 0 40 40 Q0 40 0 0Z" fill="#c4b5fd"/>
        <path d="M0 0 Q20 0 20 20 Q0 20 0 0Z" fill="#f9d5e5"/>
      </svg>
      <svg className="absolute top-4 right-4 w-12 h-12 opacity-20 sm:top-6 sm:right-6 sm:w-16 sm:h-16 md:top-8 md:right-8 md:w-20 md:h-20" viewBox="0 0 80 80" fill="none" style={{ transform: 'scaleX(-1)' }}>
        <path d="M0 0 Q40 0 40 40 Q0 40 0 0Z" fill="#c4b5fd"/>
        <path d="M0 0 Q20 0 20 20 Q0 20 0 0Z" fill="#f9d5e5"/>
      </svg>
      <svg className="absolute bottom-4 left-4 w-12 h-12 opacity-20 sm:bottom-6 sm:left-6 sm:w-16 sm:h-16 md:bottom-8 md:left-8 md:w-20 md:h-20" viewBox="0 0 80 80" fill="none" style={{ transform: 'scaleY(-1)' }}>
        <path d="M0 0 Q40 0 40 40 Q0 40 0 0Z" fill="#c4b5fd"/>
        <path d="M0 0 Q20 0 20 20 Q0 20 0 0Z" fill="#f9d5e5"/>
      </svg>
      <svg className="absolute bottom-4 right-4 w-12 h-12 opacity-20 sm:bottom-6 sm:right-6 sm:w-16 sm:h-16 md:bottom-8 md:right-8 md:w-20 md:h-20" viewBox="0 0 80 80" fill="none" style={{ transform: 'scale(-1,-1)' }}>
        <path d="M0 0 Q40 0 40 40 Q0 40 0 0Z" fill="#c4b5fd"/>
        <path d="M0 0 Q20 0 20 20 Q0 20 0 0Z" fill="#f9d5e5"/>
      </svg>

      {/* Main content */}
      <div className="relative z-10 text-center px-6 mx-auto flex flex-col items-center pt-24 pb-12 lg:pt-32">
        <p
          ref={subRef}
          className="font-sans text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-6 opacity-0"
          style={{ color: '#a389b8' }}
        >
          Together with their families
        </p>

        <div ref={titleRef} className="mb-6 space-y-2">
          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl italic opacity-0" style={{ color: '#5c3d7a', lineHeight: 1.1 }}>
            {couple.bride.firstName}
          </h1>
          
          <div className="flex items-center justify-center gap-3 sm:gap-6 my-4 opacity-0">
            <div className="h-px w-8 sm:w-16 md:w-24 opacity-50" style={{ background: 'linear-gradient(to right, transparent, #d4a0b5)' }} />
            <span className="font-serif text-2xl sm:text-3xl md:text-4xl italic" style={{ color: '#d4a0b5' }}>&amp;</span>
            <div className="h-px w-8 sm:w-16 md:w-24 opacity-50" style={{ background: 'linear-gradient(to left, transparent, #d4a0b5)' }} />
          </div>

          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl italic opacity-0" style={{ color: '#5c3d7a', lineHeight: 1.1 }}>
            {couple.groom.firstName}
          </h1>
        </div>

        <FloralDivider color="#c4b5fd" className="my-8 scale-75 sm:scale-100" />

        <div ref={dateRef} className="opacity-0 mb-8 sm:mb-12">
          <p className="font-serif text-xl sm:text-2xl md:text-3xl" style={{ color: '#7c5fa0' }}>
            {wedding.day}, {wedding.date}
          </p>
          <p className="font-sans text-[10px] sm:text-xs tracking-[0.15em] sm:tracking-[0.25em] uppercase mt-2" style={{ color: '#b89ec8' }}>
            Kovilpatti, Tamil Nadu
          </p>
        </div>

        <div ref={countdownRef} className="opacity-0 w-full max-w-lg mx-auto">
          <p className="font-sans text-[10px] sm:text-xs tracking-[0.2em] uppercase mb-6" style={{ color: '#a389b8' }}>
            Counting Down To Forever
          </p>
          <CountdownTimer targetDate={wedding.countdownTarget} />
        </div>

        <a
          href="#story"
          className="inline-block mt-12 sm:mt-16 font-sans text-xs sm:text-sm tracking-widest uppercase px-10 py-4 rounded-full transition-all duration-300 border hover:shadow-lg hover:shadow-purple-100/50"
          style={{
            color: '#7c5fa0',
            borderColor: '#c4b5fd',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = '#7c5fa0';
            e.currentTarget.style.color = '#fff';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = '#7c5fa0';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          Our Story
        </a>

        {/* Scroll indicator */}
        <div className="mt-16 sm:mt-20 flex flex-col items-center gap-2 animate-bounce opacity-50">
          <div className="w-px h-12" style={{ background: 'linear-gradient(to bottom, #c4b5fd, transparent)' }} />
        </div>
      </div>
    </section>
  );
};

export default Hero;

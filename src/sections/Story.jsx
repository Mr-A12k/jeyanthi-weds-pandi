import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FloralDivider from '../components/FloralDivider';

gsap.registerPlugin(ScrollTrigger);

const Story = ({ data }) => {
  const { couple } = data;
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const bgRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax bg
      gsap.to(bgRef.current, {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Text reveal
      gsap.fromTo(
        textRef.current.querySelectorAll('.reveal-item'),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 80%',
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="story"
      ref={sectionRef}
      className="relative py-20 md:py-36 overflow-hidden bg-transparent"
    >
      <div 
        className="absolute inset-0 z-0"
        style={{ background: 'linear-gradient(180deg, #fdfaf6 0%, #f5f0ff 50%, #fff5f7 100%)' }}
      />
      {/* Parallax background decoration */}
      <div
        ref={bgRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 70% 50% at 85% 20%, rgba(244,163,199,0.12) 0%, transparent 70%),
            radial-gradient(ellipse 50% 70% at 10% 80%, rgba(196,181,253,0.15) 0%, transparent 70%)
          `,
        }}
      />

      {/* Large decorative letters */}
      <div
        className="absolute -left-12 sm:-left-8 top-1/2 -translate-y-1/2 font-display text-[12rem] sm:text-[16rem] md:text-[20rem] font-bold pointer-events-none select-none opacity-40 sm:opacity-100"
        style={{ color: 'rgba(196,181,253,0.06)', lineHeight: 1 }}
      >
        S
      </div>
      <div
        className="absolute -right-12 sm:-right-8 top-1/2 -translate-y-1/2 font-display text-[12rem] sm:text-[16rem] md:text-[20rem] font-bold pointer-events-none select-none opacity-40 sm:opacity-100"
        style={{ color: 'rgba(244,163,199,0.06)', lineHeight: 1 }}
      >
        P
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center" ref={textRef}>
        <p className="reveal-item font-sans text-xs tracking-widest uppercase mb-4" style={{ color: '#a389b8', letterSpacing: '0.25em' }}>
          A Love Story
        </p>
        <h2 className="reveal-item font-display text-3xl sm:text-4xl md:text-6xl italic mb-4" style={{ color: '#5c3d7a' }}>
          How It All Began
        </h2>

        <FloralDivider color="#d4a0b5" className="reveal-item my-6" />

        <div className="reveal-item space-y-6 mb-10">
          <p className="font-serif text-lg md:text-xl leading-relaxed" style={{ color: '#6b5b7b' }}>
            Every great love story begins with a single moment — a glance, a smile, a word that somehow
            carries the weight of destiny. For{' '}
            <span className="italic font-medium" style={{ color: '#8b6fa6' }}>
              {couple.bride.firstName}
            </span>{' '}
            and{' '}
            <span className="italic font-medium" style={{ color: '#8b6fa6' }}>
              {couple.groom.firstName}
            </span>
            , that moment arrived quietly and changed everything.
          </p>
          <p className="font-serif text-lg leading-relaxed" style={{ color: '#7d6b8a' }}>
            What started as a gentle friendship blossomed into a love that felt both inevitable and extraordinary —
            the kind that fills a room with warmth, and a lifetime with meaning.
          </p>
          <p className="font-serif text-lg leading-relaxed" style={{ color: '#7d6b8a' }}>
            Through each season, through laughter and silence, through ordinary days made beautiful by
            each other's presence — they knew. This was it. This was home.
          </p>
        </div>

        <div className="reveal-item">
          <blockquote
            className="font-display text-2xl md:text-3xl italic px-8 py-6 relative"
            style={{ color: '#8b6fa6' }}
          >
            <span className="absolute top-0 left-4 text-6xl leading-none" style={{ color: '#e8d5f5' }}>"</span>
            To love and be loved is to feel the sun from both sides.
            <span className="absolute bottom-0 right-4 text-6xl leading-none" style={{ color: '#e8d5f5' }}>"</span>
          </blockquote>
        </div>

        {/* Couple monogram */}
        <div className="reveal-item mt-10 flex items-center justify-center gap-3">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center text-white font-display text-2xl italic"
            style={{ background: 'linear-gradient(135deg, #c4b5fd, #a67cff)' }}
          >
            {couple.bride.initial}
          </div>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 2C12 2 18 8 12 12C6 8 12 2 12 2Z" fill="#f9a8d4" opacity="0.8"/>
            <path d="M12 22C12 22 18 16 12 12C6 16 12 22 12 22Z" fill="#f9a8d4" opacity="0.8"/>
          </svg>
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center text-white font-display text-2xl italic"
            style={{ background: 'linear-gradient(135deg, #f9a8d4, #f43f72)' }}
          >
            {couple.groom.initial}
          </div>
        </div>

        <p className="reveal-item font-sans text-xs tracking-widest uppercase mt-4" style={{ color: '#a389b8', letterSpacing: '0.2em' }}>
          {couple.hashtag}
        </p>
      </div>
    </section>
  );
};

export default Story;

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FloralDivider from '../components/FloralDivider';

gsap.registerPlugin(ScrollTrigger);

const Timeline = ({ data }) => {
  const { story } = data;
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the center line drawing
      gsap.fromTo(
        '.timeline-line',
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.5,
          ease: 'power2.inOut',
          transformOrigin: 'top center',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            once: true,
          },
        }
      );

      // Animate each card
      document.querySelectorAll('.timeline-card').forEach((card, i) => {
        const isLeft = i % 2 === 0;
        gsap.fromTo(
          card,
          { opacity: 0, x: isLeft ? -50 : 50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              once: true,
            },
          }
        );
      });

      // Animate dots
      document.querySelectorAll('.timeline-dot').forEach((dot) => {
        gsap.fromTo(
          dot,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: 'back.out(2)',
            scrollTrigger: {
              trigger: dot,
              start: 'top 85%',
              once: true,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="timeline"
      ref={sectionRef}
      className="relative py-24 md:py-36 overflow-hidden bg-transparent"
    >
      <div 
        className="absolute inset-0 z-0"
        style={{ background: 'linear-gradient(180deg, #fff5f7 0%, #fdfaf6 100%)' }}
      />
      {/* Background pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #e8d5f5 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="font-sans text-xs tracking-widest uppercase mb-4" style={{ color: '#a389b8', letterSpacing: '0.25em' }}>
            Our Journey
          </p>
          <h2 className="font-display text-4xl md:text-6xl italic" style={{ color: '#5c3d7a' }}>
            The Story So Far
          </h2>
          <FloralDivider color="#c4b5fd" className="mt-6" />
        </div>

        <div className="relative">
          <div
            className="timeline-line absolute left-1/2 -translate-x-px top-0 bottom-0 w-0.5 hidden md:block"
            style={{ background: 'linear-gradient(to bottom, #ddd6f3, #f9d5e5, #ddd6f3)' }}
          />

          <div className="space-y-12 md:space-y-0">
            {story.map((item, i) => (
              <div key={item.year} className="relative md:grid md:grid-cols-2 md:gap-12 md:mb-16">
                {i % 2 === 0 ? (
                  <>
                    <div className="timeline-card md:text-right">
                      <div
                        className="inline-block p-6 rounded-2xl shadow-sm mb-2 md:mb-0"
                        style={{
                          background: 'rgba(255,255,255,0.85)',
                          border: '1px solid rgba(196,181,253,0.3)',
                          backdropFilter: 'blur(10px)',
                        }}
                      >
                        <span className="text-3xl mb-3 block">{item.icon}</span>
                        <h3 className="font-display text-2xl italic mb-2" style={{ color: '#5c3d7a' }}>
                          {item.title}
                        </h3>
                        <p className="font-serif text-base leading-relaxed" style={{ color: '#7d6b8a' }}>
                          {item.description}
                        </p>
                      </div>
                    </div>
                    <div className="hidden md:flex absolute left-1/2 top-6 -translate-x-1/2 items-center justify-center">
                      <div
                        className="timeline-dot w-12 h-12 rounded-full flex items-center justify-center text-white font-display text-sm font-bold shadow-md z-10"
                        style={{ background: 'linear-gradient(135deg, #c4b5fd, #8b5cf6)' }}
                      >
                        {item.year.slice(-2)}
                      </div>
                    </div>
                    <div className="hidden md:block" />
                  </>
                ) : (
                  <>
                    <div className="hidden md:block" />
                    <div className="hidden md:flex absolute left-1/2 top-6 -translate-x-1/2 items-center justify-center">
                      <div
                        className="timeline-dot w-12 h-12 rounded-full flex items-center justify-center text-white font-display text-sm font-bold shadow-md z-10"
                        style={{ background: 'linear-gradient(135deg, #f9a8d4, #f43f72)' }}
                      >
                        {item.year.slice(-2)}
                      </div>
                    </div>
                    <div className="timeline-card">
                      <div
                        className="inline-block p-6 rounded-2xl shadow-sm"
                        style={{
                          background: 'rgba(255,255,255,0.85)',
                          border: '1px solid rgba(249,165,208,0.3)',
                          backdropFilter: 'blur(10px)',
                        }}
                      >
                        <span className="text-3xl mb-3 block">{item.icon}</span>
                        <h3 className="font-display text-2xl italic mb-2" style={{ color: '#5c3d7a' }}>
                          {item.title}
                        </h3>
                        <p className="font-serif text-base leading-relaxed" style={{ color: '#7d6b8a' }}>
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </>
                )}

                {/* Mobile year badge */}
                <div className="md:hidden flex items-center gap-3 mb-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-sans text-xs font-medium"
                    style={{ background: i % 2 === 0 ? 'linear-gradient(135deg, #c4b5fd, #8b5cf6)' : 'linear-gradient(135deg, #f9a8d4, #f43f72)' }}
                  >
                    {item.year.slice(-2)}
                  </div>
                  <span className="font-sans text-xs tracking-widest uppercase" style={{ color: '#a389b8' }}>
                    {item.year}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;

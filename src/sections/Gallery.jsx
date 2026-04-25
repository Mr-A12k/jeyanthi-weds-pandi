import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FloralDivider from '../components/FloralDivider';

gsap.registerPlugin(ScrollTrigger);

const PLACEHOLDER_COLORS = [
  ['#f5f0ff', '#ede5ff'],
  ['#fff0f5', '#ffd6e8'],
  ['#fdfaf6', '#f5ece0'],
  ['#f0f5ff', '#dde8ff'],
  ['#f5fff0', '#e0f5d6'],
  ['#fff5f0', '#ffe5d6'],
];

const GalleryItem = ({ item, index }) => {
  const [bg1, bg2] = PLACEHOLDER_COLORS[index % PLACEHOLDER_COLORS.length];

  const heights = [320, 320, 320, 200, 200, 200];

  const gridClasses = [
    'md:col-span-1',
    'md:col-span-1',
    'md:col-span-1',
    'md:col-span-1',
    'md:col-span-1',
    'md:col-span-1',
  ];

  return (
    <div
      className={`relative overflow-hidden rounded-2xl group cursor-pointer ${gridClasses[index]}`}
      style={{
        background: `linear-gradient(135deg, ${bg1}, ${bg2})`,
        border: '1px solid rgba(196,181,253,0.2)',
        height: `${heights[index]}px`,
      }}
    >
      {item.src ? (
        <img
          src={item.src}
          alt={item.alt}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            transition: 'transform 0.7s ease',
          }}
          loading="eager"
          onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
          onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
        />
      ) : (
        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
          <div style={{ fontSize: '2.5rem', opacity: 0.4 }}>
            {['🌸', '💕', '✨', '🌿', '🪷', '💍'][index]}
          </div>
          <p style={{ color: '#c4a8d4', fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.8 }}>
            Photo Coming Soon
          </p>
        </div>
      )}
      {/* Hover label overlay */}
      <div
        className="absolute inset-0 flex items-end p-4"
        style={{
          background: 'linear-gradient(to top, rgba(92,61,122,0) 0%, transparent 60%)',
          transition: 'background 0.3s ease',
        }}
        onMouseEnter={e => (e.currentTarget.style.background = 'linear-gradient(to top, rgba(92,61,122,0.6) 0%, transparent 60%)')}
        onMouseLeave={e => (e.currentTarget.style.background = 'linear-gradient(to top, rgba(92,61,122,0) 0%, transparent 60%)')}
      >
        <p className="text-white font-serif text-sm italic" style={{ opacity: 0, transition: 'opacity 0.3s' }}
          ref={el => {
            if (!el) return;
            el.closest('.group') || el.parentElement;
          }}
        >
          {item.label}
        </p>
      </div>
    </div>
  );
};

const Gallery = ({ data }) => {
  const { gallery, couple } = data;
  const sectionRef = useRef(null);
  const bgRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(bgRef.current, {
        yPercent: 15,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        @keyframes galleryFadeIn {
          from { opacity: 0; transform: translateY(24px) scale(0.95); }
          to   { opacity: 1; transform: translateY(0)    scale(1); }
        }
        .gallery-item:hover .gallery-label { opacity: 1 !important; }
      `}</style>
      <section id="gallery" ref={sectionRef} className="relative py-24 md:py-36 overflow-hidden bg-transparent">
        <div
          className="absolute inset-0 z-0"
          style={{ background: 'linear-gradient(180deg, #fff5f7 0%, #fdfaf6 50%, #f5f0ff 100%)' }}
        />
        <div ref={bgRef} className="absolute inset-0 pointer-events-none" style={{
          background: `
            radial-gradient(ellipse 60% 50% at 15% 50%, rgba(244,163,199,0.12) 0%, transparent 70%),
            radial-gradient(ellipse 50% 60% at 85% 50%, rgba(196,181,253,0.15) 0%, transparent 70%)
          `,
        }} />
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="font-sans text-xs tracking-widest uppercase mb-4" style={{ color: '#a389b8', letterSpacing: '0.25em' }}>Memories</p>
            <h2 className="font-display text-4xl md:text-6xl italic" style={{ color: '#5c3d7a' }}>A Glimpse of Us</h2>
            <FloralDivider color="#d4a0b5" className="mt-6" />
            <p className="font-serif text-lg mt-4" style={{ color: '#7d6b8a' }}>
              Moments that tell the story of {couple.bride.firstName} and {couple.groom.firstName}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {gallery.map((item, index) => (
              <GalleryItem key={item.id} item={item} index={index} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Gallery;

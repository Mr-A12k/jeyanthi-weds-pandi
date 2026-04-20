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
  const ref = useRef(null);
  const [bg1, bg2] = PLACEHOLDER_COLORS[index % PLACEHOLDER_COLORS.length];

  useEffect(() => {
    gsap.fromTo(ref.current,
      { opacity: 0, scale: 0.9 },
      {
        opacity: 1, scale: 1, duration: 0.7, ease: 'power2.out', delay: (index % 3) * 0.1,
        scrollTrigger: { trigger: ref.current, start: 'top 88%', once: true },
      }
    );
  }, [index]);

  const sizes = [
    'md:col-span-1 md:row-span-2',
    'md:col-span-1 md:row-span-1',
    'md:col-span-1 md:row-span-1',
    'md:col-span-2 md:row-span-1',
    'md:col-span-1 md:row-span-1',
    'md:col-span-1 md:row-span-1',
  ];

  const heights = ['min-h-80', 'min-h-40', 'min-h-40', 'min-h-48', 'min-h-40', 'min-h-40'];

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden rounded-2xl group cursor-pointer ${sizes[index]} ${heights[index]}`}
      style={{
        background: `linear-gradient(135deg, ${bg1}, ${bg2})`,
        border: '1px solid rgba(196,181,253,0.2)',
      }}
    >
      {item.src ? (
        <img
          src={item.src}
          alt={item.alt}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center gap-3">
          <div className="text-4xl opacity-40">
            {['🌸', '💕', '✨', '🌿', '🪷', '💍'][index]}
          </div>
          <p className="font-sans text-xs tracking-widest uppercase" style={{ color: '#c4a8d4', letterSpacing: '0.2em', opacity: 0.8 }}>
            Photo
          </p>
        </div>
      )}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4"
        style={{ background: 'linear-gradient(to top, rgba(92,61,122,0.6) 0%, transparent 60%)' }}
      >
        <p className="text-white font-serif text-sm italic">{item.label}</p>
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-auto">
          {gallery.map((item, index) => (
            <GalleryItem key={item.id} item={item} index={index} />
          ))}
        </div>
        <p className="text-center mt-8 font-sans text-xs tracking-widest uppercase" style={{ color: '#c4a8d4', letterSpacing: '0.2em' }}>
          Replace placeholder images with your actual photos in weddingData.js
        </p>
      </div>
    </section>
  );
};

export default Gallery;

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FloralDivider from '../components/FloralDivider';

gsap.registerPlugin(ScrollTrigger);

const MapIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);

const CalIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);

const ClockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);

const EventCard = ({ event, index }) => {
  const cardRef = useRef(null);
  const isMain = event.isMain;

  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: index * 0.1,
        scrollTrigger: { trigger: cardRef.current, start: 'top 85%', once: true },
      }
    );
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="relative rounded-3xl overflow-hidden transition-transform duration-300 hover:-translate-y-1"
      style={{
        background: isMain
          ? 'linear-gradient(135deg, rgba(139,95,246,0.08) 0%, rgba(196,181,253,0.15) 50%, rgba(249,165,208,0.08) 100%)'
          : 'rgba(255,255,255,0.8)',
        border: isMain ? '1.5px solid rgba(196,181,253,0.5)' : '1px solid rgba(228,204,240,0.5)',
        backdropFilter: 'blur(12px)',
        boxShadow: isMain ? '0 8px 32px rgba(139,95,246,0.1)' : '0 4px 16px rgba(0,0,0,0.04)',
      }}
    >
      {isMain && (
        <div
          className="absolute top-4 right-4 font-sans text-xs tracking-widest uppercase px-3 py-1 rounded-full"
          style={{ background: 'linear-gradient(135deg, #c4b5fd, #8b5cf6)', color: '#fff', letterSpacing: '0.15em' }}
        >
          Main Event
        </div>
      )}
      <div className="p-7 md:p-8">
        <div className="flex items-start gap-4 mb-5">
          <div
            className="text-3xl w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{ background: isMain ? 'linear-gradient(135deg, #ede5ff, #ddd6f3)' : 'rgba(237,229,255,0.6)' }}
          >
            {event.icon}
          </div>
          <div>
            <h3 className="font-display text-xl md:text-2xl italic" style={{ color: '#5c3d7a' }}>{event.name}</h3>
            <p className="font-sans text-xs tracking-widest uppercase mt-1" style={{ color: '#a389b8', letterSpacing: '0.15em' }}>{event.day}</p>
          </div>
        </div>
        <p className="font-serif text-sm leading-relaxed mb-5" style={{ color: '#7d6b8a' }}>{event.description}</p>
        <div className="space-y-2.5">
          <div className="flex items-center gap-2.5" style={{ color: '#8b6fa6' }}>
            <CalIcon /><span className="font-sans text-sm">{event.date}</span>
          </div>
          <div className="flex items-center gap-2.5" style={{ color: '#8b6fa6' }}>
            <ClockIcon /><span className="font-sans text-sm">{event.time}</span>
          </div>
          <div className="flex items-start gap-2.5" style={{ color: '#8b6fa6' }}>
            <MapIcon />
            <div>
              <p className="font-sans text-sm font-medium">{event.venue}</p>
              <p className="font-sans text-xs" style={{ color: '#b89ec8' }}>{event.address}</p>
            </div>
          </div>
        </div>
        {event.dresscode && (
          <div className="mt-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-sans"
            style={{ background: 'rgba(249,213,229,0.4)', color: '#9b6fa6', border: '1px solid rgba(249,165,208,0.3)' }}>
            <span>Dresscode: {event.dresscode}</span>
          </div>
        )}
        <a href={event.mapLink} target="_blank" rel="noopener noreferrer"
          className="mt-5 flex items-center gap-2 font-sans text-xs tracking-widest uppercase transition-colors duration-200"
          style={{ color: '#a389b8', letterSpacing: '0.15em' }}
          onMouseEnter={e => e.currentTarget.style.color = '#7c5fa0'}
          onMouseLeave={e => e.currentTarget.style.color = '#a389b8'}>
          <MapIcon /><span>View on Map</span>
        </a>
      </div>
    </div>
  );
};

const Events = ({ data }) => {
  const { events } = data;
  return (
    <section id="events" className="relative py-24 md:py-36 overflow-hidden bg-transparent">
      <div 
        className="absolute inset-0 z-0"
        style={{ background: 'linear-gradient(180deg, #fdfaf6 0%, #f5f0ff 50%, #fff5f7 100%)' }}
      />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 40% at 50% 0%, rgba(196,181,253,0.1) 0%, transparent 70%)' }} />
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="font-sans text-xs tracking-widest uppercase mb-4" style={{ color: '#a389b8', letterSpacing: '0.25em' }}>Celebrations</p>
          <h2 className="font-display text-4xl md:text-6xl italic" style={{ color: '#5c3d7a' }}>Wedding Events</h2>
          <FloralDivider color="#c4b5fd" className="mt-6" />
          <p className="font-serif text-lg mt-4" style={{ color: '#7d6b8a' }}>Join us for a series of celebrations marking this joyous union</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {events.map((event, index) => (
            <EventCard key={event.id} event={event} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Events;

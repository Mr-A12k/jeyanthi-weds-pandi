import FloralDivider from '../components/FloralDivider';

const Footer = ({ data }) => {
  const { couple, wedding } = data;
  return (
    <footer className="relative py-16 text-center overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #fdfaf6 0%, #f5f0ff 100%)' }}>
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 60% 80% at 50% 100%, rgba(196,181,253,0.15) 0%, transparent 70%)',
      }} />
      <div className="relative z-10 max-w-xl mx-auto px-6">
        <div className="font-display text-5xl md:text-6xl italic mb-2" style={{ color: '#8b6fa6' }}>
          {couple.bride.initial}
          <span className="font-serif text-3xl mx-3" style={{ color: '#d4a0b5' }}>&amp;</span>
          {couple.groom.initial}
        </div>
        <p className="font-serif text-base italic mb-1" style={{ color: '#a389b8' }}>{couple.tagline}</p>
        <FloralDivider color="#c4b5fd" className="my-5" />
        <p className="font-sans text-xs tracking-widest uppercase mb-1" style={{ color: '#b89ec8', letterSpacing: '0.2em' }}>
          {wedding.day}, {wedding.date}
        </p>
        <p className="font-sans text-xs" style={{ color: '#c4a8d4' }}>Kovilpatti, Tamil Nadu</p>
        <p className="font-sans text-xs mt-6" style={{ color: '#d4bce0', letterSpacing: '0.1em' }}>
          Made with love for {couple.bride.firstName} &amp; {couple.groom.firstName}
        </p>
        <div className="mt-4 pt-4 border-t border-purple-100/30">
          <p className="font-sans text-[10px] tracking-widest uppercase" style={{ color: '#b89ec8', opacity: 0.8 }}>
            Copyrights reserved by Kabix
          </p>
          <span className="font-sans text-[10px] mr-2 tracking-widest uppercase" style={{ color: '#b89ec8', opacity: 0.8 }}>Visit</span>
          <a
            href="https://kabix.fun"
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-[10px] tracking-widest uppercase mt-1 inline-block transition-colors duration-200"
            style={{ color: '#8b6fa6' }}
            onMouseEnter={e => e.currentTarget.style.color = '#d4a0b5'}
            onMouseLeave={e => e.currentTarget.style.color = '#8b6fa6'}
          >
            kabix.fun
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

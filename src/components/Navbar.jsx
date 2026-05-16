import { useState, useEffect } from 'react';

const navLinks = [
  // { label: 'Our Story', href: '#story' },
  // { label: 'Timeline', href: '#timeline' },
  { label: 'Events', href: '#events' },
  { label: 'Gallery', href: '#gallery' },
  // { label: 'RSVP', href: '#rsvp' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <a
          href="#hero"
          className="font-display text-xl italic"
          style={{ color: '#8b6fa6' }}
          onClick={() => setMenuOpen(false)}
        >
          S <span style={{ color: '#d4a0b5' }}>& </span>P
        </a>

        {/* Desktop */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                className="font-sans text-sm tracking-widest uppercase transition-colors duration-200"
                style={{ color: '#6b5b7b', letterSpacing: '0.12em' }}
                onMouseEnter={(e) => (e.target.style.color = '#b892c5')}
                onMouseLeave={(e) => (e.target.style.color = '#6b5b7b')}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-0.5 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} style={{ background: '#8b6fa6' }} />
          <span className={`block w-5 h-0.5 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} style={{ background: '#8b6fa6' }} />
          <span className={`block w-5 h-0.5 transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} style={{ background: '#8b6fa6' }} />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          menuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        }`}
        style={{ background: 'rgba(255,255,255,0.96)' }}
      >
        <ul className="flex flex-col items-center gap-5 py-6">
          {navLinks.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                className="font-sans text-sm tracking-widest uppercase"
                style={{ color: '#6b5b7b' }}
                onClick={() => setMenuOpen(false)}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

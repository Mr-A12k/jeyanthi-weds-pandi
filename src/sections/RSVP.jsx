import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FloralDivider from '../components/FloralDivider';

gsap.registerPlugin(ScrollTrigger);

const RSVP = ({ data }) => {
  const { rsvp, contact, couple, wedding } = data;
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const [form, setForm] = useState({ name: '', email: '', attendance: '', guests: '1', message: '' });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.rsvp-reveal',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputClass = "w-full font-sans text-sm px-4 py-3 rounded-xl border outline-none transition-all duration-200 bg-white/70";
  const inputStyle = { borderColor: 'rgba(196,181,253,0.4)', color: '#5c3d7a' };
  const labelClass = "block font-sans text-xs tracking-widest uppercase mb-2";
  const labelStyle = { color: '#a389b8', letterSpacing: '0.15em' };

  return (
    <section id="rsvp" ref={sectionRef} className="relative py-24 md:py-36 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #f5f0ff 0%, #fff5f7 50%, #fdfaf6 100%)' }}>
      <div className="absolute inset-0 pointer-events-none" style={{
        background: `radial-gradient(ellipse 70% 50% at 50% 50%, rgba(196,181,253,0.12) 0%, transparent 70%)`,
      }} />

      <div className="relative z-10 max-w-2xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="rsvp-reveal font-sans text-xs tracking-widest uppercase mb-4" style={{ color: '#a389b8', letterSpacing: '0.25em' }}>Kindly Respond</p>
          <h2 className="rsvp-reveal font-display text-4xl md:text-6xl italic" style={{ color: '#5c3d7a' }}>Will You Join Us?</h2>
          <FloralDivider color="#c4b5fd" className="rsvp-reveal mt-6" />
          <p className="rsvp-reveal font-serif text-base mt-4" style={{ color: '#7d6b8a' }}>{rsvp.message}</p>
        </div>

        {submitted ? (
          <div className="rsvp-reveal text-center p-12 rounded-3xl" style={{
            background: 'rgba(255,255,255,0.85)',
            border: '1px solid rgba(196,181,253,0.4)',
            backdropFilter: 'blur(12px)',
          }}>
            <div className="text-5xl mb-4">💌</div>
            <h3 className="font-display text-3xl italic mb-3" style={{ color: '#5c3d7a' }}>Thank You, {form.name}!</h3>
            <p className="font-serif text-base" style={{ color: '#7d6b8a' }}>
              We have received your response and cannot wait to celebrate with you on {wedding.date}.
            </p>
            <FloralDivider color="#d4a0b5" className="mt-6" />
          </div>
        ) : (
          <form ref={formRef} onSubmit={handleSubmit} className="rsvp-reveal rounded-3xl p-8 md:p-10 space-y-6"
            style={{
              background: 'rgba(255,255,255,0.85)',
              border: '1px solid rgba(196,181,253,0.3)',
              backdropFilter: 'blur(12px)',
              boxShadow: '0 8px 32px rgba(139,95,246,0.08)',
            }}>
            <div>
              <label className={labelClass} style={labelStyle}>Your Full Name *</label>
              <input name="name" required value={form.name} onChange={handleChange} placeholder="Enter your name"
                className={inputClass} style={inputStyle}
                onFocus={e => e.target.style.borderColor = '#c4b5fd'}
                onBlur={e => e.target.style.borderColor = 'rgba(196,181,253,0.4)'}
              />
            </div>
            <div>
              <label className={labelClass} style={labelStyle}>Email Address</label>
              <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="your@email.com"
                className={inputClass} style={inputStyle}
                onFocus={e => e.target.style.borderColor = '#c4b5fd'}
                onBlur={e => e.target.style.borderColor = 'rgba(196,181,253,0.4)'}
              />
            </div>
            <div>
              <label className={labelClass} style={labelStyle}>Will You Attend? *</label>
              <div className="grid grid-cols-2 gap-3">
                {['Joyfully Attending', 'Unable to Attend'].map(opt => (
                  <label key={opt}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-200"
                    style={{
                      border: form.attendance === opt ? '1.5px solid #c4b5fd' : '1px solid rgba(196,181,253,0.3)',
                      background: form.attendance === opt ? 'rgba(196,181,253,0.15)' : 'rgba(255,255,255,0.5)',
                    }}>
                    <input type="radio" name="attendance" value={opt} checked={form.attendance === opt}
                      onChange={handleChange} className="hidden" />
                    <span className="text-lg">{opt === 'Joyfully Attending' ? '🥂' : '💌'}</span>
                    <span className="font-sans text-sm" style={{ color: '#6b5b7b' }}>{opt}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className={labelClass} style={labelStyle}>Number of Guests</label>
              <select name="guests" value={form.guests} onChange={handleChange}
                className={inputClass} style={inputStyle}
                onFocus={e => e.target.style.borderColor = '#c4b5fd'}
                onBlur={e => e.target.style.borderColor = 'rgba(196,181,253,0.4)'}>
                {[1,2,3,4,5].map(n => <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>)}
              </select>
            </div>
            <div>
              <label className={labelClass} style={labelStyle}>A Message for the Couple</label>
              <textarea name="message" rows="3" value={form.message} onChange={handleChange}
                placeholder="Share your wishes..."
                className={inputClass} style={{ ...inputStyle, resize: 'none' }}
                onFocus={e => e.target.style.borderColor = '#c4b5fd'}
                onBlur={e => e.target.style.borderColor = 'rgba(196,181,253,0.4)'}
              />
            </div>
            <button type="submit"
              className="w-full py-4 rounded-2xl font-sans text-sm tracking-widest uppercase text-white transition-all duration-300"
              style={{ background: 'linear-gradient(135deg, #8b6fa6, #c4b5fd)', letterSpacing: '0.2em', boxShadow: '0 4px 20px rgba(139,95,246,0.3)' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-1px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
              Send RSVP
            </button>
          </form>
        )}

        {/* Contact section */}
        <div className="rsvp-reveal mt-12 text-center">
          <FloralDivider color="#d4a0b5" />
          <p className="font-sans text-xs tracking-widest uppercase mt-6 mb-4" style={{ color: '#a389b8', letterSpacing: '0.2em' }}>Need Help? Contact Us</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="text-center">
              <p className="font-serif text-sm italic mb-1" style={{ color: '#7d6b8a' }}>{contact.bride.name}</p>
              <div className="flex gap-3 justify-center">
                <a href={`tel:${contact.bride.phone}`}
                  className="flex items-center gap-1.5 font-sans text-xs px-3 py-2 rounded-full transition-all duration-200"
                  style={{ background: 'rgba(196,181,253,0.2)', color: '#7c5fa0', border: '1px solid rgba(196,181,253,0.3)' }}>
                  <span>📞</span><span>{contact.bride.phone}</span>
                </a>
                <a href={`https://wa.me/${contact.bride.whatsapp}`} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 font-sans text-xs px-3 py-2 rounded-full transition-all duration-200"
                  style={{ background: 'rgba(187,247,208,0.3)', color: '#166534', border: '1px solid rgba(134,239,172,0.4)' }}>
                  <span>💬</span><span>WhatsApp</span>
                </a>
              </div>
            </div>
            <div className="hidden sm:block w-px h-10" style={{ background: 'rgba(196,181,253,0.3)' }} />
            <div className="text-center">
              <p className="font-serif text-sm italic mb-1" style={{ color: '#7d6b8a' }}>{contact.groom.name}</p>
              <div className="flex gap-3 justify-center">
                <a href={`tel:${contact.groom.phone}`}
                  className="flex items-center gap-1.5 font-sans text-xs px-3 py-2 rounded-full transition-all duration-200"
                  style={{ background: 'rgba(196,181,253,0.2)', color: '#7c5fa0', border: '1px solid rgba(196,181,253,0.3)' }}>
                  <span>📞</span><span>{contact.groom.phone}</span>
                </a>
                <a href={`https://wa.me/${contact.groom.whatsapp}`} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 font-sans text-xs px-3 py-2 rounded-full transition-all duration-200"
                  style={{ background: 'rgba(187,247,208,0.3)', color: '#166534', border: '1px solid rgba(134,239,172,0.4)' }}>
                  <span>💬</span><span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RSVP;

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from './components/Navbar';
import SakuraBackground from './components/SakuraBackground';
// import SakuraTrees from './components/SakuraTrees';  
import Fireworks from './components/Fireworks';
import Hero from './sections/Hero';
// import Story from './sections/Story';
// import Timeline from './sections/Timeline';
import Events from './sections/Events';
import Gallery from './sections/Gallery';
// import RSVP from './sections/RSVP';
import Footer from './sections/Footer';

import weddingData from './data/weddingData';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Smooth scroll behaviour
    document.documentElement.style.scrollBehavior = 'smooth';

    // Refresh ScrollTrigger on resize
    const handleResize = () => ScrollTrigger.refresh();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const weddingDate = new Date('2026-05-25');
  const isEventDayOrAfter = new Date() >= weddingDate;
  // Fireworks automatic mode: will show from May 25, 2026 onwards.
  const showFireworks = isEventDayOrAfter;

  return (
    <div className="min-h-screen" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", position: 'relative', zIndex: 1 }}>
      <SakuraBackground />
      {/* <SakuraTrees /> */}
      {showFireworks && <Fireworks />}
      <Navbar />
      <main style={{ position: 'relative' }}>
        <Hero data={weddingData} />
        {/* <Story data={weddingData} /> */}
        {/* <Timeline data={weddingData} /> */}
        <Events data={weddingData} />
        <Gallery data={weddingData} />
        {/* <RSVP data={weddingData} /> */}
      </main>
      <Footer data={weddingData} />
    </div>
  );
}

export default App;

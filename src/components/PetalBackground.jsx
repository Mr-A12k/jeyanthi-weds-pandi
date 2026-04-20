import { useEffect, useRef } from 'react';

const PETAL_COUNT = 12;

const PetalBackground = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const petals = Array.from({ length: PETAL_COUNT }, (_, i) => {
      const el = document.createElement('div');
      el.style.cssText = `
        position: absolute;
        width: ${8 + Math.random() * 14}px;
        height: ${8 + Math.random() * 14}px;
        border-radius: 50% 0 50% 0;
        opacity: ${0.15 + Math.random() * 0.25};
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: petalDrift ${6 + Math.random() * 8}s ease-in-out infinite;
        animation-delay: ${-Math.random() * 8}s;
        transform-origin: center;
        pointer-events: none;
      `;
      const colors = ['#f9d5e5', '#ede5ff', '#ffc2d1', '#ddd6f3', '#fde8f0'];
      el.style.background = colors[Math.floor(Math.random() * colors.length)];
      return el;
    });

    petals.forEach(p => container.appendChild(p));

    return () => petals.forEach(p => p.remove());
  }, []);

  return (
    <>
      <style>{`
        @keyframes petalDrift {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-15px) rotate(60deg); }
          66% { transform: translateY(8px) rotate(-30deg); }
        }
      `}</style>
      <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none" />
    </>
  );
};

export default PetalBackground;

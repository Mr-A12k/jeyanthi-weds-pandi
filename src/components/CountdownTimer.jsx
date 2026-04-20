import { useState, useEffect } from 'react';

const CountdownTimer = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState(calcTime(targetDate));

  function calcTime(date) {
    const diff = new Date(date) - new Date();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / 1000 / 60) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  }

  useEffect(() => {
    const t = setInterval(() => setTimeLeft(calcTime(targetDate)), 1000);
    return () => clearInterval(t);
  }, [targetDate]);

  const units = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hrs', value: timeLeft.hours },
    { label: 'Mins', value: timeLeft.minutes },
    { label: 'Secs', value: timeLeft.seconds },
  ];

  return (
    <div className="flex items-center justify-center gap-4 md:gap-8">
      {units.map(({ label, value }, i) => (
        <div key={label} className="flex items-center gap-4 md:gap-8">
          <div className="text-center">
            <div
              className="font-display text-4xl md:text-3xl sm:text-l font-bold tabular-nums"
              style={{ color: '#7c5fa0', minWidth: '2.5ch' }}
            >
              {String(value).padStart(2, '0')}
            </div>
            <div
              className="font-sans text-xs tracking-widest uppercase mt-1"
              style={{ color: '#a389b8', letterSpacing: '0.15em' }}
            >
              {label}
            </div>
          </div>
          {i < units.length - 1 && (
            <div className="font-display text-2xl" style={{ color: '#d4a0b5', marginBottom: '1rem' }}>
              :
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CountdownTimer;

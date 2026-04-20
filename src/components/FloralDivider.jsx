const FloralDivider = ({ className = '', color = '#c4b5fd' }) => (
  <div className={`flex items-center justify-center gap-3 my-4 ${className}`}>
    <div className="h-px flex-1 max-w-24" style={{ background: `linear-gradient(to right, transparent, ${color})` }} />
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 2C16 2 18 8 16 12C14 8 16 2 16 2Z" fill={color} opacity="0.7"/>
      <path d="M16 30C16 30 18 24 16 20C14 24 16 30 16 30Z" fill={color} opacity="0.7"/>
      <path d="M2 16C2 16 8 18 12 16C8 14 2 16 2 16Z" fill={color} opacity="0.7"/>
      <path d="M30 16C30 16 24 18 20 16C24 14 30 16 30 16Z" fill={color} opacity="0.7"/>
      <path d="M5.37 5.37C5.37 5.37 9.66 9.66 9.17 13.24C6.07 11.34 5.37 5.37 5.37 5.37Z" fill={color} opacity="0.5"/>
      <path d="M26.63 26.63C26.63 26.63 22.34 22.34 22.83 18.76C25.93 20.66 26.63 26.63 26.63 26.63Z" fill={color} opacity="0.5"/>
      <path d="M26.63 5.37C26.63 5.37 22.34 9.66 22.83 13.24C25.93 11.34 26.63 5.37 26.63 5.37Z" fill={color} opacity="0.5"/>
      <path d="M5.37 26.63C5.37 26.63 9.66 22.34 9.17 18.76C6.07 20.66 5.37 26.63 5.37 26.63Z" fill={color} opacity="0.5"/>
      <circle cx="16" cy="16" r="3" fill={color} opacity="0.8"/>
    </svg>
    <div className="h-px flex-1 max-w-24" style={{ background: `linear-gradient(to left, transparent, ${color})` }} />
  </div>
);

export default FloralDivider;

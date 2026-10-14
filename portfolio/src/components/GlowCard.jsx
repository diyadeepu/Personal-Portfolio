import { useRef, useState } from 'react';

export default function GlowCard({ children, darkMode, className = '', onMouseEnter, onMouseLeave, ...props }) {
  const divRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleMouseEnter = (e) => {
    setOpacity(1);
    if (onMouseEnter) onMouseEnter(e);
  };

  const handleMouseLeave = (e) => {
    setOpacity(0);
    if (onMouseLeave) onMouseLeave(e);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden rounded-xl border transition-colors duration-500 ${
        darkMode 
          ? 'bg-[#0a0a0a] border-neutral-800 hover:border-emerald-500/50' 
          : 'bg-white border-neutral-200 hover:border-emerald-400/60' // Slightly stronger border for light mode
      } ${className}`}
      {...props}
    >
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity,
          // Boosted light mode glow opacity from 0.05 to 0.15 so it doesn't wash out on white
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${
            darkMode ? 'rgba(16, 185, 129, 0.12)' : 'rgba(16, 185, 129, 0.15)'
          }, transparent 40%)`,
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
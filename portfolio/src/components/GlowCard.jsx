import { useRef, useState } from 'react';

export default function GlowCard({ children, darkMode, className = '', onMouseEnter, onMouseLeave, ...props }) {
  const divRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  // NEW: State to hold the 3D rotation
  const [transform, setTransform] = useState('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');

  const handleMouseMove = (e) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();

    // Original glow position math
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setPosition({ x, y });

    // NEW: 3D Tilt calculation
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8; // Max 8 degrees up/down
    const rotateY = ((x - centerX) / centerX) * 8;  // Max 8 degrees left/right

    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`);
  };

  const handleMouseEnter = (e) => {
    setOpacity(1);
    if (onMouseEnter) onMouseEnter(e);
  };

  const handleMouseLeave = (e) => {
    setOpacity(0);
    // NEW: Snap back to flat state when mouse leaves
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    if (onMouseLeave) onMouseLeave(e);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ transform }}
      className={`relative overflow-hidden rounded-xl border transition-all duration-200 ease-out will-change-transform ${
        darkMode 
          ? 'bg-[#0a0a0a] border-neutral-800 hover:border-emerald-500/50' 
          : 'bg-white border-neutral-200 hover:border-emerald-400/60' // Slightly stronger border for light mode
      } ${className}`}
      {...props}
    >
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-0"
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
import { useEffect, useState } from 'react';

export default function CustomCursor({ darkMode }) {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trail, setTrail] = useState([]);

  useEffect(() => {
    let idCounter = 0;

    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });

      // Throttle particle creation slightly so it doesn't overwhelm the DOM
      if (Math.random() > 0.2) {
        const newParticle = {
          id: idCounter++,
          x: e.clientX,
          y: e.clientY,
          char: Math.random() > 0.5 ? '1' : '0',
        };

        setTrail((prev) => [...prev, newParticle]);

        // Remove the binary character exactly when its CSS fade animation finishes
        setTimeout(() => {
          setTrail((prev) => prev.filter((p) => p.id !== newParticle.id));
        }, 600);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Only render on non-touch devices (hides cursor logic on mobile)
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]">
      {/* CSS for the falling Matrix fade effect */}
      <style>{`
        @keyframes matrixDropFade {
          0% {
            opacity: 0.8;
            transform: translateY(0) scale(1);
          }
          100% {
            opacity: 0;
            transform: translateY(15px) scale(0.8);
          }
        }
        .anim-binary-trail {
          animation: matrixDropFade 0.6s cubic-bezier(0.2, 1, 0.3, 1) forwards;
        }
        /* Hide the default OS cursor everywhere */
        body {
          cursor: none !important;
        }
        a, button, input {
          cursor: none !important;
        }
      `}</style>

      {/* The Binary Trail Particles */}
      {trail.map((p) => (
        <span
          key={p.id}
          className={`anim-binary-trail absolute font-mono text-[10px] font-bold ${
            darkMode ? 'text-emerald-500/80' : 'text-emerald-600/80'
          }`}
          style={{
            left: p.x - 4, // Center character horizontally
            top: p.y - 10, // Center character vertically
          }}
        >
          {p.char}
        </span>
      ))}

      {/* The Main Emerald Dot */}
      <div
        className={`absolute w-2 h-2 rounded-full shadow-[0_0_10px_#10b981] transition-transform duration-75 ${
          darkMode ? 'bg-emerald-400' : 'bg-emerald-500'
        }`}
        style={{
          left: position.x - 4, // Offset by half width to pinpoint center
          top: position.y - 4,  // Offset by half height to pinpoint center
        }}
      />
    </div>
  );
}
import { useEffect, useRef, useState } from 'react';

export default function CustomCursor({ darkMode }) {
  const cursorRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // 1. Aggressively nuke the default system cursor on ALL elements
    const style = document.createElement('style');
    style.innerHTML = `* { cursor: none !important; }`;
    document.head.appendChild(style);

    // 2. Direct DOM manipulation for zero-lag tracking (bypasses React state)
    const updatePosition = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    const handleMouseOver = (e) => {
      // Check if hovering over a link, button, or input
      if (
        ['A', 'BUTTON', 'INPUT', 'TEXTAREA'].includes(e.target.tagName) ||
        e.target.closest('button') ||
        e.target.closest('a')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    // passive: true makes the event listener highly optimized for performance
    window.addEventListener('mousemove', updatePosition, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mouseover', handleMouseOver);
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      // Outer div handles the instant, lag-free X/Y positioning
      className="fixed top-0 left-0 pointer-events-none z-[999999]"
      style={{ willChange: 'transform' }} // Forces hardware acceleration
    >
      <div
        // Inner div handles the smooth animations for hover states and color
        className={`w-3 h-3 rounded-full -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ease-out ${
          darkMode 
            ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' 
            : 'bg-emerald-600 shadow-[0_0_10px_rgba(5,150,105,0.5)]'
        } ${isHovering ? 'scale-[2.5] opacity-40' : 'scale-100 opacity-100'}`}
      />
    </div>
  );
}
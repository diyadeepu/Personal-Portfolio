import { useEffect, useState } from 'react';

export default function CustomCursor({ darkMode }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updatePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    // Optional: Detect if hovering over clickable elements to make the cursor pulse or change
    const handleMouseOver = (e) => {
      if (['A', 'BUTTON'].includes(e.target.tagName) || e.target.closest('button') || e.target.closest('a')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <div
      // z-[999999] guarantees it stays above every modal and popup!
      className={`fixed top-0 left-0 w-3 h-3 rounded-full pointer-events-none z-[999999] transition-transform duration-100 ease-out ${
        darkMode ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'bg-emerald-600 shadow-[0_0_10px_rgba(5,150,105,0.5)]'
      } ${isHovering ? 'scale-150 opacity-50' : 'scale-100 opacity-100'}`}
      style={{
        transform: `translate3d(${position.x - 6}px, ${position.y - 6}px, 0)`,
      }}
    />
  );
}
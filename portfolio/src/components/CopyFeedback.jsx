import { useEffect, useState, useRef } from 'react';

export default function CopyFeedback({ darkMode }) {
  const [feedback, setFeedback] = useState({ show: false, x: 0, y: 0 });
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // 1. Continuously track the mouse position silently
    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    // 2. Listen for Cmd+C or Right-Click -> Copy
    const handleCopy = () => {
      const selection = window.getSelection();

      // Only show the tooltip if they actually highlighted text
      if (selection && selection.toString().trim().length > 0) {
        setFeedback({
          show: true,
          x: mousePos.current.x,
          y: mousePos.current.y,
        });

        // Hide the tooltip after 1.5 seconds
        setTimeout(() => {
          setFeedback((prev) => ({ ...prev, show: false }));
        }, 1500);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('copy', handleCopy);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('copy', handleCopy);
    };
  }, []);

  if (!feedback.show) return null;

  return (
    <div
      className={`fixed z-[100000] pointer-events-none px-2 py-1 text-[10px] font-mono font-bold rounded animate-in fade-in slide-in-from-bottom-2 duration-200 ${
        darkMode
          ? 'bg-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.4)]'
          : 'bg-emerald-600 text-white shadow-[0_0_15px_rgba(5,150,105,0.4)]'
      }`}
      style={{
        left: feedback.x + 15, // Offset slightly to the bottom-right of the cursor
        top: feedback.y + 15,
      }}
    >
      {'>'} copied to clipboard
    </div>
  );
}
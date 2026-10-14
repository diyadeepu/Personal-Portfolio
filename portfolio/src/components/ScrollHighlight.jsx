import { useEffect, useRef, useState } from 'react';

export default function ScrollHighlight({ children, darkMode }) {
  const [isHighlighted, setIsHighlighted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Highlights the element when any part of it enters the middle 60% of the viewport
        setIsHighlighted(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: '-20% 0px -20% 0px',
        threshold: 0,
      }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out rounded-2xl p-2 sm:p-4 ${
        isHighlighted
          ? darkMode
            ? 'opacity-100 border border-emerald-500/40 bg-emerald-950/20 shadow-[0_0_30px_rgba(16,185,129,0.1)] scale-[1.01]'
            : 'opacity-100 border border-emerald-400 bg-emerald-50/50 shadow-xl scale-[1.01]'
          : 'opacity-50 border border-transparent bg-transparent scale-100 blur-[1px]'
      }`}
    >
      {children}
    </div>
  );
}
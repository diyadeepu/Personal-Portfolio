import { useState, useEffect } from 'react';

export default function ScrollProgress({ darkMode }) {
  const [scrollWidth, setScrollWidth] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate how far the user has scrolled
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const percentage = (window.scrollY / totalHeight) * 100;
        setScrollWidth(percentage);
      }
    };

    // Use passive listener for smooth performance
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Initial check in case of refresh or anchors
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-[4px] w-full z-[100001] bg-transparent pointer-events-none">
      <div
        className={`h-full transition-all duration-75 ease-out rounded-r-md ${
          darkMode 
            ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' 
            : 'bg-emerald-600 shadow-[0_0_8px_rgba(5,150,105,0.4)]'
        }`}
        style={{
          width: `${scrollWidth}%`,
          willChange: 'width' // Hardware acceleration
        }}
      />
    </div>
  );
}
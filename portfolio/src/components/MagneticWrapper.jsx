import { useEffect, useRef, useState } from 'react';

export default function MagneticWrapper({ children, className = '' }) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;

      // Calculate absolute distance from cursor to the center of the button
      const distance = Math.sqrt(distX * distX + distY * distY);

      // Activation magnetic radius (Button size + 50px threshold)
      const magneticRadius = Math.max(rect.width, rect.height) / 2 + 50;

      if (distance < magneticRadius) {
        // Pull the button 25% of the distance towards the cursor
        setPosition({ x: distX * 0.25, y: distY * 0.25 });
        setIsActive(true);
      } else {
        // Drop the button if cursor leaves the radius
        setPosition({ x: 0, y: 0 });
        setIsActive(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={ref}
      className={`inline-block ${className}`}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        // Smooth follow when active, bouncy spring snap-back when released
        transition: isActive
          ? 'transform 0.1s ease-out'
          : 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      }}
    >
      {children}
    </div>
  );
}
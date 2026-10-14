import { useEffect, useRef, useState } from 'react';

// Characters from darkest (empty space) to brightest (dense character)
const ASCII_CHARS = ' .:-=+*#%@';

// Added className and onError to the props so your original code passes through seamlessly
export default function AsciiImage({ src, alt, className = '', onError }) {
  const [asciiArt, setAsciiArt] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.crossOrigin = 'Anonymous';

    img.onload = () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });

      const charsAcross = 50;
      const charsDown = Math.floor((img.height / img.width) * charsAcross * 0.55);

      canvas.width = charsAcross;
      canvas.height = charsDown;

      ctx.drawImage(img, 0, 0, charsAcross, charsDown);
      const imageData = ctx.getImageData(0, 0, charsAcross, charsDown);
      const data = imageData.data;

      let asciiStr = '';
      for (let y = 0; y < charsDown; y++) {
        for (let x = 0; x < charsAcross; x++) {
          const offset = (y * charsAcross + x) * 4;
          const r = data[offset];
          const g = data[offset + 1];
          const b = data[offset + 2];

          const brightness = (0.299 * r + 0.587 * g + 0.114 * b);
          const charIndex = Math.floor((brightness / 255) * (ASCII_CHARS.length - 1));

          asciiStr += ASCII_CHARS[charIndex];
        }
        asciiStr += '\n';
      }
      setAsciiArt(asciiStr);
    };
  }, [src]);

  return (
    <div
      className="relative w-full h-full rounded-2xl overflow-hidden cursor-crosshair group bg-[#050505]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <canvas ref={canvasRef} className="hidden" />

      {/* The Normal Image - perfectly applying your original className and onError */}
      <img
        src={src}
        alt={alt}
        className={`${className} transition-all duration-500 ${
          isHovered ? 'opacity-0 scale-105 blur-sm' : 'opacity-100 scale-100 blur-0'
        }`}
        onError={onError}
      />

      {/* The Hacker ASCII Overlay */}
      <div
        className={`absolute inset-0 bg-black flex items-center justify-center transition-all duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <pre className="text-emerald-500 font-mono text-[6px] sm:text-[8px] md:text-[9px] leading-[6px] sm:leading-[8px] md:leading-[9px] tracking-widest text-center select-none">
          {asciiArt}
        </pre>
      </div>
    </div>
  );
}
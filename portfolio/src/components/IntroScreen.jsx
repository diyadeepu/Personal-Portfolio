import { useEffect, useState } from 'react';

export default function IntroScreen({ onProceed }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Dynamic path resolution for Vite / GitHub Pages subpaths
  const imgSrc = `${import.meta.env.BASE_URL}ddchat.png`;

  // Gentle 3D tilt effect on the image to keep the portfolio feeling interactive
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth) * 2 - 1;
      const y = (e.clientY / innerHeight) * 2 - 1;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const imageTransform = {
    transform: `perspective(1000px) rotateY(${mousePos.x * 12}deg) rotateX(${-mousePos.y * 12}deg) translate3d(${mousePos.x * 8}px, ${mousePos.y * 8}px, 0)`,
    transition: 'transform 0.1s ease-out',
  };

  return (
    <section className="min-h-screen w-full flex items-center justify-center px-6 md:px-16 font-mono relative overflow-hidden bg-[#050505] text-white">
      <div className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-between gap-12 z-10 py-12">

        {/* Left Side: Welcome Text and Action Button */}
        <div className="flex flex-col items-start space-y-6 max-w-lg text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 text-xs rounded-full border border-emerald-500/40 bg-emerald-500/10 text-emerald-400 font-bold">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            Interactive Portfolio
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight">
            Hi, I'm <span className="text-emerald-400">Diya Deepu!</span>
          </h1>

          <p className="text-sm sm:text-base leading-relaxed text-neutral-400">
            Welcome to my interactive workspace. Move your cursor around to interact with the screen.
          </p>

          <button
            onClick={onProceed}
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-xl text-sm font-bold bg-emerald-500 hover:bg-emerald-400 text-black shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 transition-all duration-300 cursor-pointer hover:scale-[1.03] active:scale-[0.98]"
          >
            <span>click here to learn more about me</span>
            <span className="text-base transition-transform duration-300 group-hover:translate-y-1">
              ↓
            </span>
          </button>
        </div>

        {/* Right Side: Static Image with mild 3D cursor tilt */}
        <div className="relative w-full max-w-md aspect-square flex items-center justify-center">
          {/* Ambient Glow */}
          <div className="absolute inset-0 rounded-full bg-emerald-500/10 blur-3xl -z-10" />

          <div className="w-full h-full rounded-3xl border border-neutral-800 bg-[#050505] overflow-hidden shadow-2xl flex items-center justify-center relative p-4">
            <img
              src={imgSrc}
              alt="Diya Deepu"
              style={imageTransform}
              className="w-full h-full object-cover rounded-2xl"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement.innerHTML = '<span class="text-neutral-500 text-xs animate-pulse">[ Image Not Found: Check public/ddchat.png ]</span>';
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
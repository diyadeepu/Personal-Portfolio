import { useState, useEffect } from 'react';

export default function IntroScreen({ onProceed, darkMode }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Track mouse coordinates normalized from -1 to 1 (0,0 is center)
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

  // 3D CSS rotation vector following cursor movement
  const headTransform = {
    transform: `perspective(1000px) rotateY(${mousePos.x * 22}deg) rotateX(${-mousePos.y * 18}deg) translate3d(${mousePos.x * 14}px, ${mousePos.y * 14}px, 30px)`,
    transition: 'transform 0.08s ease-out',
  };

  return (
    <section className="min-h-screen w-full flex flex-col justify-center items-center px-6 md:px-16 font-mono relative overflow-hidden">
      <div className="w-full max-w-6xl flex flex-col-reverse md:flex-row items-center justify-between gap-12 my-auto z-10">

        {/* Left Side: Welcome Text & Action Button */}
        <div className="flex flex-col items-start space-y-6 max-w-lg text-left">
          <div className="inline-block px-3 py-1 text-xs rounded-full border border-emerald-500/40 bg-emerald-500/10 text-emerald-400 font-bold">
            ⚡ Interactive Terminal Portfolio
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight">
            Hi, I'm <span className="text-emerald-400">Diya Deepu!</span>
          </h1>

          <p className={`text-sm sm:text-base leading-relaxed ${darkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
            Welcome to my interactive macOS-inspired workspace. Explore my software projects, undergraduate research, coursework, and credentials.
          </p>

          <button
            onClick={onProceed}
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-xl text-sm font-bold bg-emerald-500 hover:bg-emerald-400 text-black shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 transition-all duration-300 cursor-pointer hover:scale-[1.03] active:scale-[0.98]"
          >
            <span>click here to learn more about me</span>
            <span className="text-base transition-transform duration-300 group-hover:translate-y-1">↓</span>
          </button>
        </div>

        {/* Right Side: Cursor Tracking Interactive Avatar */}
        <div className="relative w-full max-w-md aspect-square flex items-center justify-center">
          {/* Subtle Ambient Green Glow Behind Avatar */}
          <div className="absolute inset-0 rounded-full bg-emerald-500/10 blur-3xl -z-10" />

          <div
            className={`w-full h-full rounded-3xl border overflow-hidden shadow-2xl flex items-center justify-center relative transition-colors duration-500 ${
              darkMode ? 'bg-black border-neutral-800' : 'bg-neutral-950 border-neutral-800'
            }`}
          >
            {/* Interactive Portrait Container */}
            <div
              style={headTransform}
              className="relative w-full h-full flex items-center justify-center p-4 select-none"
            >
              {/* Optional Video Asset (If you have an mp4 video file placed in /public/videos/avatar.mp4) */}
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover rounded-2xl pointer-events-none"
                src="/videos/avatar.mp4"
                onError={(e) => {
                  // Fallback vector graphic portrait if video file is not present
                  e.currentTarget.style.display = 'none';
                }}
              />

              {/* Fallback Avatar Graphics */}
              <div id="avatar-fallback" className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="w-40 h-40 rounded-full border-2 border-emerald-400/80 p-2 relative flex items-center justify-center bg-neutral-900 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                  <div className="w-full h-full rounded-full bg-emerald-500/20 flex items-center justify-center text-4xl">
                    👩‍💻
                  </div>
                  {/* Dynamic Pupil / Eye Direction Dots */}
                  <div
                    className="absolute w-3 h-3 rounded-full bg-emerald-400 shadow-sm"
                    style={{
                      transform: `translate(${mousePos.x * 12}px, ${mousePos.y * 12}px)`,
                    }}
                  />
                </div>
                <span className="text-xs font-mono text-emerald-400 font-bold">
                  [ Cursor Tracking Active ]
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
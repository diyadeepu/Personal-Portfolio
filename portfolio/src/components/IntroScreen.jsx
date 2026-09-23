import { useEffect, useRef, useState } from 'react';

export default function IntroScreen({ onProceed, darkMode }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const targetTimeRef = useRef(0);
  const animationFrameRef = useRef(null);

  // Dynamic path resolution for Vite / GitHub Pages subpaths
  const videoSrc = `${import.meta.env.BASE_URL}videos/character.mp4`;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Smooth animation loop for scrubbing frames & chroma keying red to black
    const renderLoop = () => {
      if (video && video.readyState >= 2) {
        // Smoothly interpolate current time towards target cursor time
        const diff = targetTimeRef.current - video.currentTime;
        if (Math.abs(diff) > 0.005) {
          video.currentTime += diff * 0.12; // Smooth spring motion
        }

        const canvas = canvasRef.current;
        if (canvas) {
          const ctx = canvas.getContext('2d', { willReadFrequently: true });
          if (ctx && video.videoWidth > 0) {
            if (canvas.width !== video.videoWidth) {
              canvas.width = video.videoWidth;
              canvas.height = video.videoHeight;
            }

            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            const frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = frame.data;

            // Remove red background (#FF0000) into pure black / transparent
            for (let i = 0; i < data.length; i += 4) {
              const r = data[i];
              const g = data[i + 1];
              const b = data[i + 2];

              if (r > 100 && r > g * 1.3 && r > b * 1.3) {
                data[i + 3] = 0; // Alpha = 0 (transparent)
              }
            }
            ctx.putImageData(frame, 0, 0);
          }
        }
      }
      animationFrameRef.current = requestAnimationFrame(renderLoop);
    };

    animationFrameRef.current = requestAnimationFrame(renderLoop);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Mouse move tracking listener mapped across screen width
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth } = window;
      const video = videoRef.current;

      if (video && video.duration) {
        const progress = Math.max(0, Math.min(1, e.clientX / innerWidth));
        targetTimeRef.current = progress * video.duration;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="min-h-screen w-full flex items-center justify-center px-6 md:px-16 font-mono relative overflow-hidden bg-[#050505] text-white">
      {/* Hidden Video Source */}
      <video
        ref={videoRef}
        src={videoSrc}
        preload="auto"
        muted
        playsInline
        onLoadedData={() => setVideoLoaded(true)}
        onCanPlay={() => setVideoLoaded(true)}
        className="hidden"
      />

      <div className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-between gap-12 z-10 py-12">
        {/* Left Side: Welcome Text & Action Button */}
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

        {/* Right Side: Cursor-Tracking Avatar */}
        <div className="relative w-full max-w-md aspect-square flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-emerald-500/10 blur-3xl -z-10" />

          <div className="w-full h-full rounded-3xl border border-neutral-800 bg-black overflow-hidden shadow-2xl flex items-center justify-center relative">
            <canvas
              ref={canvasRef}
              className="w-full h-full object-cover pointer-events-none"
            />

            {!videoLoaded && (
              <div className="text-xs font-mono text-neutral-500 animate-pulse absolute">
                [ loading character animation... ]
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
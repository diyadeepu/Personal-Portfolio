import { useEffect, useRef, useState } from 'react';

export default function IntroScreen({ onProceed, darkMode }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isReady, setIsReady] = useState(false);
  const targetTimeRef = useRef(0);
  const animationFrameRef = useRef(null);

  // Dynamic base path for Vite / GitHub Pages deployment
  const videoSrc = `${import.meta.env.BASE_URL}videos/character.mp4`;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Warm up the browser video decoder immediately
    const initializeDecoder = async () => {
      try {
        await video.play();
        video.pause();
        setIsReady(true);
      } catch (err) {
        // Fallback if browser autoplay policy delays playback
        setIsReady(true);
      }
    };

    initializeDecoder();

    // Frame scrubbing & red background chroma key loop
    const renderLoop = () => {
      const canvas = canvasRef.current;

      if (video && video.readyState >= 1 && video.duration) {
        // Smooth interpolation towards cursor target time
        const diff = targetTimeRef.current - video.currentTime;
        if (Math.abs(diff) > 0.001) {
          video.currentTime += diff * 0.18;
        }

        // Draw frame to canvas and strip red background
        if (canvas && video.videoWidth > 0 && video.videoHeight > 0) {
          const ctx = canvas.getContext('2d', { willReadFrequently: true });
          if (ctx) {
            if (canvas.width !== video.videoWidth) {
              canvas.width = video.videoWidth;
              canvas.height = video.videoHeight;
            }

            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

            try {
              const frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
              const data = frame.data;

              // Filter out bright red screen background
              for (let i = 0; i < data.length; i += 4) {
                const r = data[i];
                const g = data[i + 1];
                const b = data[i + 2];

                if (r > 100 && r > g * 1.35 && r > b * 1.35) {
                  data[i + 3] = 0; // Set pixel alpha to transparent
                }
              }
              ctx.putImageData(frame, 0, 0);
            } catch (e) {
              // Fail-safe protection
            }
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

  // Mouse movement tracking listener
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
      <div className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-between gap-12 z-10 py-12">
        {/* Left Side: Intro Text & Action Button */}
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

        {/* Right Side: Interactive Character Box */}
        <div className="relative w-full max-w-md aspect-square flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-emerald-500/10 blur-3xl -z-10" />

          <div className="w-full h-full rounded-3xl border border-neutral-800 bg-[#050505] overflow-hidden shadow-2xl flex items-center justify-center relative">
            {/* Primary Video Element (guarantees visible avatar rendering) */}
            <video
              ref={videoRef}
              src={videoSrc}
              preload="auto"
              muted
              playsInline
              onLoadedData={() => setIsReady(true)}
              onCanPlay={() => setIsReady(true)}
              className="w-full h-full object-cover pointer-events-none"
            />

            {/* Overlay Canvas (strips red background dynamically) */}
            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full object-cover pointer-events-none z-10"
            />

            {!isReady && (
              <div className="text-xs font-mono text-neutral-500 animate-pulse absolute z-20">
                [ initializing character video... ]
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
import { useEffect, useRef, useState } from 'react';

export default function IntroScreen({ onProceed, darkMode }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  // Real-time Chroma Key Algorithm to strip red background to black/transparent
  const processChromaKey = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    if (video.videoWidth && video.videoHeight) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = frame.data;

      // Filter out bright red background pixels
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        // Red screen detection threshold
        if (r > 110 && r > g * 1.35 && r > b * 1.35) {
          data[i + 3] = 0; // Set alpha to 0 (transparent)
        }
      }
      ctx.putImageData(frame, 0, 0);
    }
  };

  // Cursor tracking: scrub video currentTime based on cursor X/Y coordinates
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth } = window;
      const video = videoRef.current;

      if (video && video.duration) {
        // Calculate normalized cursor position (0 to 1 across screen width)
        const progress = Math.max(0, Math.min(1, e.clientX / innerWidth));

        // Map cursor position to video playback time
        const targetTime = progress * video.duration;
        if (!isNaN(targetTime)) {
          video.currentTime = targetTime;
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="min-h-screen w-full flex items-center justify-center px-6 md:px-16 font-mono relative overflow-hidden bg-[#050505] text-white">
      {/* Hidden Video Source Element for Frame Scrubbing */}
      <video
        ref={videoRef}
        src="/videos/character.mp4"
        preload="auto"
        muted
        playsInline
        onLoadedData={() => {
          setVideoLoaded(true);
          processChromaKey();
        }}
        onSeeked={processChromaKey}
        className="hidden"
      />

      <div className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-between gap-12 z-10 py-12">
        {/* Left Side: Text and Action Button */}
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

        {/* Right Side: Cursor-Tracking Avatar with Black Background */}
        <div className="relative w-full max-w-md aspect-square flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-emerald-500/10 blur-3xl -z-10" />

          <div className="w-full h-full rounded-3xl border border-neutral-800 bg-black overflow-hidden shadow-2xl flex items-center justify-center relative">
            {/* Chroma Keyed Video Canvas */}
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
import { useEffect, useRef, useState } from 'react';

// --- Tunables -------------------------------------------------------------
const TARGET_FPS = 24;        // frames extracted per second of video
const MAX_FRAMES = 80;        // memory cap (~1.2 MB per frame at 560px wide)
const MAX_FRAME_WIDTH = 560;  // px; raise for sharper output, lower for less memory
const KEY_HARD = 24;          // chroma distance below this -> fully transparent
const KEY_SOFT = 38;          // between HARD and SOFT -> feathered edge
const SMOOTHING = 0.16;       // 0..1 per 60fps tick; higher = snappier scrubbing
const CORNER = 10;            // px block sampled in the top corners for the key color
// --------------------------------------------------------------------------

// Strip the red screen from one frame. Compares chroma (Cb/Cr) against the
// key color sampled from the top-left and top-right corners of the frame.
function keyFrame(img) {
  const { data, width, height } = img;

  let sr = 0, sg = 0, sb = 0, n = 0;
  const sample = (x0) => {
    for (let y = 0; y < CORNER; y++) {
      for (let x = x0; x < x0 + CORNER; x++) {
        const i = (y * width + x) * 4;
        sr += data[i]; sg += data[i + 1]; sb += data[i + 2]; n++;
      }
    }
  };
  sample(0);
  sample(width - CORNER);
  sr /= n; sg /= n; sb /= n;

  const keyCb = -0.169 * sr - 0.331 * sg + 0.5 * sb;
  const keyCr = 0.5 * sr - 0.419 * sg - 0.081 * sb;
  const hard2 = KEY_HARD * KEY_HARD;
  const soft2 = KEY_SOFT * KEY_SOFT;

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    const cb = -0.169 * r - 0.331 * g + 0.5 * b;
    const cr = 0.5 * r - 0.419 * g - 0.081 * b;
    const dist2 = (cb - keyCb) * (cb - keyCb) + (cr - keyCr) * (cr - keyCr);

    if (dist2 <= hard2) {
      data[i + 3] = 0; // Set pixel alpha to transparent
    } else if (dist2 < soft2) {
      const t = (Math.sqrt(dist2) - KEY_HARD) / (KEY_SOFT - KEY_HARD);
      data[i + 3] = 255 * t; // feathered edge
      data[i] = Math.min(r, Math.max(g, b) * 1.1); // remove red spill
    }
  }
}

export default function IntroScreen({ onProceed, darkMode }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isReady, setIsReady] = useState(false);
  const [hasError, setHasError] = useState(false);
  const targetTimeRef = useRef(0.5); // cursor position across the screen, 0..1
  const animationFrameRef = useRef(null);

  // Dynamic base path for Vite / GitHub Pages deployment
  const videoSrc = `${import.meta.env.BASE_URL}videos/character.mp4`;

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const ctx = canvas.getContext('2d');
    const work = document.createElement('canvas');
    const workCtx = work.getContext('2d', { willReadFrequently: true });

    let cancelled = false;
    const frames = []; // ImageBitmaps with the red background already removed
    let total = 0;
    let pos = 0;
    let started = false;
    let lastShown = -1;
    let lastTime = performance.now();

    const waitFor = (event) =>
      new Promise((resolve, reject) => {
        const cleanup = () => {
          video.removeEventListener(event, onOk);
          video.removeEventListener('error', onFail);
        };
        const onOk = () => { cleanup(); resolve(); };
        const onFail = () => { cleanup(); reject(new Error('video error')); };
        video.addEventListener(event, onOk);
        video.addEventListener('error', onFail);
      });

    const seekTo = (time) =>
      new Promise((resolve) => {
        const finish = () => {
          clearTimeout(timer);
          video.removeEventListener('seeked', finish);
          resolve();
        };
        const timer = setTimeout(finish, 1500); // safety net if 'seeked' never fires
        video.addEventListener('seeked', finish);
        video.currentTime = time;
      });

    // Decode the video once: seek through it, key out the red, cache every frame
    const initializeDecoder = async () => {
      try {
        if (video.readyState < 1) await waitFor('loadedmetadata');
        if (cancelled) return;

        const duration = video.duration;
        if (!Number.isFinite(duration) || duration <= 0) throw new Error('bad duration');

        total = Math.max(2, Math.min(MAX_FRAMES, Math.round(duration * TARGET_FPS)));

        const scale = Math.min(1, MAX_FRAME_WIDTH / video.videoWidth);
        const w = Math.round(video.videoWidth * scale);
        const h = Math.round(video.videoHeight * scale);
        work.width = canvas.width = w;
        work.height = canvas.height = h;

        for (let i = 0; i < total; i++) {
          await seekTo(0.001 + (i / (total - 1)) * Math.max(0, duration - 0.05));
          if (cancelled) return;

          workCtx.drawImage(video, 0, 0, w, h);
          const frame = workCtx.getImageData(0, 0, w, h);
          keyFrame(frame);
          workCtx.putImageData(frame, 0, 0);

          const bitmap = await createImageBitmap(work);
          if (cancelled) { bitmap.close(); return; }
          frames.push(bitmap);

          if (frames.length === 1) setIsReady(true);
        }
      } catch (err) {
        console.error('IntroScreen video error:', err);
        if (!cancelled) setHasError(true);
      }
    };

    // Frame scrubbing loop: picks a cached frame, so it never waits on the decoder
    const renderLoop = (now) => {
      animationFrameRef.current = requestAnimationFrame(renderLoop);
      if (!frames.length) return;

      const dt = Math.min(64, now - lastTime);
      lastTime = now;

      // Smooth interpolation towards cursor target (frame-rate independent)
      const target = targetTimeRef.current * (total - 1);
      if (!started) {
        pos = target;
        started = true;
      }
      pos += (target - pos) * (1 - Math.pow(1 - SMOOTHING, dt / 16.67));

      const index = Math.min(frames.length - 1, Math.max(0, Math.round(pos)));
      if (index !== lastShown) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(frames[index], 0, 0);
        lastShown = index;
      }
    };

    initializeDecoder();
    animationFrameRef.current = requestAnimationFrame(renderLoop);

    return () => {
      cancelled = true;
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      frames.forEach((f) => f.close());
    };
  }, []);

  // Mouse movement tracking listener
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth } = window;
      targetTimeRef.current = Math.max(0, Math.min(1, e.clientX / innerWidth));
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
            {/* Frame source only: 1px and invisible (never display:none, which
                makes browsers suspend decoding). Visible output is the canvas. */}
            <video
              ref={videoRef}
              src={videoSrc}
              preload="auto"
              muted
              playsInline
              disablePictureInPicture
              aria-hidden="true"
              className="absolute left-0 top-0 h-px w-px opacity-0 pointer-events-none"
            />

            {/* Visible Canvas (red background already removed from each frame) */}
            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full object-cover pointer-events-none z-10"
            />

            {!isReady && !hasError && (
              <div className="text-xs font-mono text-neutral-500 animate-pulse absolute z-20">
                [ initializing character video... ]
              </div>
            )}

            {hasError && (
              <div className="text-xs font-mono text-red-400 absolute z-20 px-6 text-center">
                [ couldn't load {videoSrc} - check the file path ]
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
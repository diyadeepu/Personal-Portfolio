import { useEffect, useRef, useState } from 'react';

// --- Tunables -------------------------------------------------------------
// Frame cache
const TARGET_FPS = 30;         // frames extracted per second of video
const MAX_FRAMES = 90;         // memory cap
const MAX_FRAME_WIDTH = 480;   // px; raise for sharper output, lower for less memory

// Chroma key
const KEY_HARD = 26;           // chroma distance below this -> fully transparent
const KEY_SOFT = 52;           // between HARD and SOFT -> feathered
const ERODE = 2;               // px the cutout is shrunk (kills the red outline)
const DESPILL_RADIUS = 5;      // px band next to the background where red is removed
const DESPILL_KEEP = 0.15;     // 0..1 how much red survives in that band
const CORNER = 10;             // px block sampled in the top corners for the key color

// Cursor response
const FLIP_X = false;          // set true if she turns AWAY from the cursor left/right
const REACH = 1.25;            // >1 reaches the extreme poses before the window edge
const SMOOTH_CURSOR = 0.14;    // seconds, first spring (higher = floatier)
const SMOOTH_FRAME = 0.14;     // seconds, second spring on the frame position
const SMOOTH_TILT = 0.22;      // seconds, spring on the tilt / shift

// Up/down + extra body movement (applied on top of the video)
const TILT_Y_DEG = 7;          // left/right head-turn feel
const TILT_X_DEG = 8;          // up/down look
const SHIFT_X_PX = 10;
const SHIFT_Y_PX = 8;
const ZOOM = 1.08;             // slight zoom so tilting never exposes the edges
// --------------------------------------------------------------------------

const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

// Critically damped spring (frame-rate independent, no overshoot)
function smoothDamp(state, target, smoothTime, dt) {
  const omega = 2 / smoothTime;
  const x = omega * dt;
  const e = 1 / (1 + x + 0.48 * x * x + 0.235 * x * x * x);
  const change = state.x - target;
  const temp = (state.v + omega * change) * dt;
  state.v = (state.v - omega * temp) * e;
  state.x = target + (change + temp) * e;
  return state.x;
}

// Separable min filter (erosion) over a w*h Uint8 buffer
function minFilter(src, dst, tmp, w, h, r) {
  for (let y = 0; y < h; y++) {
    const row = y * w;
    for (let x = 0; x < w; x++) {
      const x0 = Math.max(0, x - r);
      const x1 = Math.min(w - 1, x + r);
      let m = 255;
      for (let k = x0; k <= x1; k++) {
        const v = src[row + k];
        if (v < m) m = v;
      }
      tmp[row + x] = m;
    }
  }
  for (let y = 0; y < h; y++) {
    const y0 = Math.max(0, y - r);
    const y1 = Math.min(h - 1, y + r);
    for (let x = 0; x < w; x++) {
      let m = 255;
      for (let k = y0; k <= y1; k++) {
        const v = tmp[k * w + x];
        if (v < m) m = v;
      }
      dst[y * w + x] = m;
    }
  }
}

// Separable 3x3 box blur (softens the matte edge)
function blur3(src, dst, tmp, w, h) {
  for (let y = 0; y < h; y++) {
    const row = y * w;
    for (let x = 0; x < w; x++) {
      const a = src[row + Math.max(0, x - 1)];
      const b = src[row + x];
      const c = src[row + Math.min(w - 1, x + 1)];
      tmp[row + x] = (a + b + c) / 3;
    }
  }
  for (let y = 0; y < h; y++) {
    const ym = Math.max(0, y - 1) * w;
    const y0 = y * w;
    const yp = Math.min(h - 1, y + 1) * w;
    for (let x = 0; x < w; x++) {
      dst[y0 + x] = (tmp[ym + x] + tmp[y0 + x] + tmp[yp + x]) / 3;
    }
  }
}

// Strip the red screen from one frame:
// 1) chroma-distance matte against the color sampled from the top corners
// 2) erode + soften the matte so no red fringe survives
// 3) neutralise leftover red on pixels next to the removed background
function keyFrame(img, b) {
  const { data: d, width: w, height: h } = img;
  const n = w * h;

  let sr = 0, sg = 0, sb = 0, count = 0;
  const sample = (x0) => {
    for (let y = 0; y < CORNER; y++) {
      for (let x = x0; x < x0 + CORNER; x++) {
        const i = (y * w + x) * 4;
        sr += d[i]; sg += d[i + 1]; sb += d[i + 2]; count++;
      }
    }
  };
  sample(0);
  sample(w - CORNER);
  sr /= count; sg /= count; sb /= count;

  const keyCb = -0.169 * sr - 0.331 * sg + 0.5 * sb;
  const keyCr = 0.5 * sr - 0.419 * sg - 0.081 * sb;
  const hard2 = KEY_HARD * KEY_HARD;
  const soft2 = KEY_SOFT * KEY_SOFT;
  const range = KEY_SOFT - KEY_HARD;

  // 1) raw matte
  for (let p = 0, i = 0; p < n; p++, i += 4) {
    const r = d[i], g = d[i + 1], bl = d[i + 2];
    const cb = -0.169 * r - 0.331 * g + 0.5 * bl;
    const cr = 0.5 * r - 0.419 * g - 0.081 * bl;
    const dist2 = (cb - keyCb) * (cb - keyCb) + (cr - keyCr) * (cr - keyCr);

    if (dist2 <= hard2) b.raw[p] = 0;
    else if (dist2 >= soft2) b.raw[p] = 255;
    else b.raw[p] = (255 * (Math.sqrt(dist2) - KEY_HARD)) / range;
  }

  // 2) shrink + soften the matte
  minFilter(b.raw, b.eroded, b.tmp, w, h, ERODE);
  blur3(b.eroded, b.matte, b.tmp, w, h);

  // 3) band of pixels close to the removed background
  minFilter(b.raw, b.near, b.tmp, w, h, DESPILL_RADIUS);

  for (let p = 0, i = 0; p < n; p++, i += 4) {
    if (b.near[p] < 255) {
      const m = Math.max(d[i + 1], d[i + 2]);
      if (d[i] > m) d[i] = m + (d[i] - m) * DESPILL_KEEP;
    }
    d[i + 3] = b.matte[p];
  }
}

export default function IntroScreen({ onProceed, darkMode }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const boxRef = useRef(null);
  const [isReady, setIsReady] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [loaded, setLoaded] = useState({ done: 0, total: 0 });
  const cursorRef = useRef(null); // last raw pointer position in the window
  const animationFrameRef = useRef(null);

  // Dynamic base path for Vite / GitHub Pages deployment
  const videoSrc = `${import.meta.env.BASE_URL}videos/character.mp4`;

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const box = boxRef.current;
    if (!video || !canvas || !box) return;

    const ctx = canvas.getContext('2d');
    const work = document.createElement('canvas');
    const workCtx = work.getContext('2d', { willReadFrequently: true });

    let cancelled = false;
    let complete = false;
    const frames = []; // ImageBitmaps with the red background already removed
    let total = 0;

    // spring states
    const cursorX = { x: 0, v: 0 };
    const cursorY = { x: 0, v: 0 };
    const framePos = { x: 0, v: 0 };
    const tiltX = { x: 0, v: 0 };
    const tiltY = { x: 0, v: 0 };
    let initialised = false;
    let lastI0 = -1;
    let lastT = -1;
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
        setLoaded({ done: 0, total });

        const scale = Math.min(1, MAX_FRAME_WIDTH / video.videoWidth);
        const w = Math.round(video.videoWidth * scale);
        const h = Math.round(video.videoHeight * scale);
        work.width = canvas.width = w;
        work.height = canvas.height = h;

        const n = w * h;
        const bufs = {
          raw: new Uint8ClampedArray(n),
          eroded: new Uint8ClampedArray(n),
          matte: new Uint8ClampedArray(n),
          near: new Uint8ClampedArray(n),
          tmp: new Uint8ClampedArray(n),
        };

        for (let i = 0; i < total; i++) {
          await seekTo(0.001 + (i / (total - 1)) * Math.max(0, duration - 0.05));
          if (cancelled) return;

          workCtx.drawImage(video, 0, 0, w, h);
          const frame = workCtx.getImageData(0, 0, w, h);
          keyFrame(frame, bufs);
          workCtx.putImageData(frame, 0, 0);

          const bitmap = await createImageBitmap(work);
          if (cancelled) { bitmap.close(); return; }
          frames.push(bitmap);

          if (i % 4 === 3 || i === total - 1) setLoaded({ done: i + 1, total });
        }

        complete = true;
        setIsReady(true);
      } catch (err) {
        console.error('IntroScreen video error:', err);
        if (!cancelled) setHasError(true);
      }
    };

    // Render loop: cursor position relative to the character box drives everything
    const renderLoop = (now) => {
      animationFrameRef.current = requestAnimationFrame(renderLoop);
      if (!complete) return;

      const dt = Math.min(0.05, (now - lastTime) / 1000);
      lastTime = now;

      // Cursor offset from the centre of the box, -1..1 on each axis.
      // Scaled by the room available on that side, so the far left / far right
      // of the window (and top / bottom) reach the extreme poses.
      let nx = 0;
      let ny = 0;
      const cursor = cursorRef.current;
      if (cursor) {
        const rect = box.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = cursor.x - cx;
        const dy = cursor.y - cy;
        const roomX = dx < 0 ? cx : window.innerWidth - cx;
        const roomY = dy < 0 ? cy : window.innerHeight - cy;
        nx = clamp((dx / Math.max(roomX, 1)) * REACH, -1, 1);
        ny = clamp((dy / Math.max(roomY, 1)) * REACH, -1, 1);
      }

      if (!initialised) {
        initialised = true;
        framePos.x = (total - 1) / 2;
      }

      // Two chained springs = very smooth, no jitter
      const sx = smoothDamp(cursorX, nx, SMOOTH_CURSOR, dt);
      const sy = smoothDamp(cursorY, ny, SMOOTH_CURSOR, dt);
      const dir = FLIP_X ? -1 : 1;
      const target = (0.5 + 0.5 * sx * dir) * (total - 1);
      const p = clamp(smoothDamp(framePos, target, SMOOTH_FRAME, dt), 0, total - 1);

      // Cross-fade between the two nearest cached frames (sub-frame smoothness)
      const i0 = Math.floor(p);
      const i1 = Math.min(total - 1, i0 + 1);
      const t = p - i0;

      if (i0 !== lastI0 || Math.abs(t - lastT) > 0.004) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = 1;
        ctx.drawImage(frames[i0], 0, 0);
        if (t > 0.004 && i1 !== i0) {
          ctx.globalAlpha = t;
          ctx.drawImage(frames[i1], 0, 0);
          ctx.globalAlpha = 1;
        }
        lastI0 = i0;
        lastT = t;
      }

      // Body / head tilt toward the cursor (this is what gives up/down looks)
      const tx = smoothDamp(tiltX, sx, SMOOTH_TILT, dt);
      const ty = smoothDamp(tiltY, sy, SMOOTH_TILT, dt);
      canvas.style.transform =
        `perspective(900px) translate3d(${(tx * SHIFT_X_PX).toFixed(2)}px, ${(ty * SHIFT_Y_PX).toFixed(2)}px, 0) ` +
        `rotateY(${(tx * TILT_Y_DEG).toFixed(2)}deg) rotateX(${(-ty * TILT_X_DEG).toFixed(2)}deg) ` +
        `scale(${ZOOM})`;
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

  // Mouse movement tracking listener (stores the raw position; the render loop
  // measures it against the box, so scrolling and resizing stay correct)
  useEffect(() => {
    const handleMouseMove = (e) => {
      cursorRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('pointermove', handleMouseMove);
    return () => window.removeEventListener('pointermove', handleMouseMove);
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
        <div
          ref={boxRef}
          className="relative w-full max-w-md aspect-square flex items-center justify-center"
        >
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

            {/* Visible Canvas (red removed from every cached frame) */}
            <canvas
              ref={canvasRef}
              style={{ transformOrigin: '50% 65%', willChange: 'transform' }}
              className="absolute inset-0 w-full h-full object-cover pointer-events-none z-10"
            />

            {!isReady && !hasError && (
              <div className="text-xs font-mono text-neutral-500 animate-pulse absolute z-20">
                [ preparing character
                {loaded.total > 0 ? ` ${loaded.done}/${loaded.total}` : '...'} ]
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
import { useEffect, useRef } from 'react';

export default function InteractiveAvatar({ darkMode, videoSrc = '/videos/head_tracking.mp4' }) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const targetTime = useRef(0);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    let animationFrame;

    // Pause the video. We don't want it to play; we want to scrub through its frames manually.
    video.pause();

    const handleMouseMove = (e) => {
      if (!video.duration) return;

      // Get the center point of the avatar on the screen
      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Calculate distance from cursor to the center of the avatar
      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const maxDistance = Math.min(window.innerWidth, window.innerHeight) / 2;

      // 1. Center / Forward Look State
      // If the cursor is close to the avatar, snap to the end of the video where you look forward (~9.0 seconds)
      if (distance < maxDistance * 0.15) {
        targetTime.current = 9.0;
        return;
      }

      // 2. Peripheral Tracking State
      // Calculate the angle of the mouse relative to the avatar (-PI to PI)
      let angle = Math.atan2(dy, dx);

      // Normalize the angle to a 0.0 -> 1.0 scale
      let normalized = (angle + Math.PI) / (2 * Math.PI);

      // Map that 0-1 scale to the first 8.5 seconds of the video (the circular tracking motion)
      targetTime.current = normalized * 8.5;
    };

    const renderLoop = () => {
      if (video.duration) {
        // LERP (Linear Interpolation)
        // This is the secret to making it smooth. Instead of snapping instantly to the target frame,
        // it glides 8% of the distance toward the target frame every animation cycle.
        video.currentTime += (targetTime.current - video.currentTime) * 0.08;
      }
      animationFrame = requestAnimationFrame(renderLoop);
    };

    // Attach listeners
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Start the animation loop only after the video metadata (duration) is loaded
    video.addEventListener('loadedmetadata', renderLoop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      video.removeEventListener('loadedmetadata', renderLoop);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-48 h-48 md:w-64 md:h-64 overflow-hidden rounded-full border-2 shadow-2xl transition-colors duration-500 flex-shrink-0 ${
        darkMode 
          ? 'border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.15)]' 
          : 'border-emerald-600/30 shadow-[0_0_30px_rgba(5,150,105,0.15)]'
      }`}
    >
      <video
        ref={videoRef}
        src={videoSrc}
        muted
        playsInline
        className="w-full h-full object-cover"
      />
    </div>
  );
}
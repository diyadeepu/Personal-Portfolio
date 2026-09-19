import React from 'react';

export default function LoadingScreen({ darkMode }) {
  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center font-mono transition-colors duration-500 ${
        darkMode ? 'bg-[#050505] text-white' : 'bg-slate-100 text-neutral-900'
      }`}
    >
      {/* Keyframe animation for alternating green fade on dots */}
      <style>{`
        @keyframes dotGreenFade {
          0%, 100% {
            opacity: 0.25;
            color: currentColor;
            transform: scale(0.9);
          }
          50% {
            opacity: 1;
            color: #10b981; /* emerald green */
            transform: scale(1.3);
          }
        }
        .dot-1 { animation: dotGreenFade 1.2s infinite ease-in-out 0s; }
        .dot-2 { animation: dotGreenFade 1.2s infinite ease-in-out 0.3s; }
        .dot-3 { animation: dotGreenFade 1.2s infinite ease-in-out 0.6s; }
      `}</style>

      <div className="flex items-center text-2xl sm:text-3xl font-bold tracking-wider">
        <span className="dot-1 inline-block px-0.5">.</span>
        <span className="dot-2 inline-block px-0.5">.</span>
        <span className="dot-3 inline-block px-0.5">.</span>
        <span className="ml-2">Loading</span>
      </div>

      <div className="mt-4 text-xs font-mono text-emerald-500/70 tracking-widest uppercase">
        [ initializing terminal context... ]
      </div>
    </div>
  );
}
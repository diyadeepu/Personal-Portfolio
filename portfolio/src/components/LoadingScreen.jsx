import React from 'react';

export default function LoadingScreen({ darkMode }) {
  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center font-mono overflow-hidden transition-colors duration-500 ${
        darkMode ? 'bg-[#050505] text-white' : 'bg-slate-100 text-neutral-900'
      }`}
    >
      {/* Keyframe Animations */}
      <style>{`
        /* Alternating Green Dots */
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

        /* 1. Top line: Left to Right */
        @keyframes lineTopMove {
          0% { transform: translateX(-100%); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 0.8; }
          100% { transform: translateX(100%); opacity: 0; }
        }

        /* 2. Right line: Bottom to Up */
        @keyframes lineRightMove {
          0% { transform: translateY(100%); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 0.8; }
          100% { transform: translateY(-100%); opacity: 0; }
        }

        /* 3. Bottom line: Left to Right */
        @keyframes lineBottomMove {
          0% { transform: translateX(-100%); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 0.8; }
          100% { transform: translateX(100%); opacity: 0; }
        }

        /* 4. Left line: Top to Down */
        @keyframes lineLeftMove {
          0% { transform: translateY(-100%); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 0.8; }
          100% { transform: translateY(100%); opacity: 0; }
        }

        .anim-line-top {
          animation: lineTopMove 2.2s infinite ease-in-out 0s;
        }
        .anim-line-right {
          animation: lineRightMove 2.2s infinite ease-in-out 0.45s;
        }
        .anim-line-bottom {
          animation: lineBottomMove 2.2s infinite ease-in-out 0.9s;
        }
        .anim-line-left {
          animation: lineLeftMove 2.2s infinite ease-in-out 1.35s;
        }
      `}</style>

      {/* Disappearing Cybernetic Box Frame Lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Line 1: Top 1/4 (top-left moving right) */}
        <div className="absolute top-[25%] left-[15%] right-[15%] h-[2px] overflow-hidden">
          <div className="w-full h-full bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_12px_#10b981] anim-line-top" />
        </div>

        {/* Line 2: Bottom-right 1/4 (moving up) */}
        <div className="absolute right-[15%] top-[25%] bottom-[25%] w-[2px] overflow-hidden">
          <div className="w-full h-full bg-gradient-to-b from-transparent via-emerald-400 to-transparent shadow-[0_0_12px_#10b981] anim-line-right" />
        </div>

        {/* Line 3: Bottom-left 1/4 (moving right) */}
        <div className="absolute bottom-[25%] left-[15%] right-[15%] h-[2px] overflow-hidden">
          <div className="w-full h-full bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_12px_#10b981] anim-line-bottom" />
        </div>

        {/* Line 4: Top-left 1/4 (moving down) */}
        <div className="absolute left-[15%] top-[25%] bottom-[25%] w-[2px] overflow-hidden">
          <div className="w-full h-full bg-gradient-to-b from-transparent via-emerald-400 to-transparent shadow-[0_0_12px_#10b981] anim-line-left" />
        </div>
      </div>

      {/* Loading Indicator */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="flex items-center text-2xl sm:text-3xl font-bold tracking-wider">
          <span className="dot-1 inline-block px-0.5">.</span>
          <span className="dot-2 inline-block px-0.5">.</span>
          <span className="dot-3 inline-block px-0.5">.</span>
          <span className="ml-2">Loading</span>
        </div>

        <div className="mt-4 text-xs font-mono text-emerald-500/80 tracking-widest uppercase">
          [ initializing terminal context... ]
        </div>
      </div>
    </div>
  );
}
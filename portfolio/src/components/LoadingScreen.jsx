import { useState, useEffect } from 'react';

export default function LoadingScreen({ darkMode }) {
  const [progress, setProgress] = useState(0);

  // Drives the 100% progress bar over ~2.8 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(timer);
          return 100;
        }
        return p + 1;
      });
    }, 28); // 100 steps * 28ms = 2800ms
    return () => clearInterval(timer);
  }, []);

  // Calculate the terminal progress bar visualization
  const totalBlocks = 30;
  const filled = Math.floor((progress / 100) * totalBlocks);
  const bar = '█'.repeat(filled) + '░'.repeat(totalBlocks - filled);

  // Dynamic terminal messages based on progress percentage
  const statusMessages = [
    { time: 0, text: "resolving dependencies..." },
    { time: 15, text: "checkout -b feature/ai-syllabus-checker" },
    { time: 35, text: "compiling React components..." },
    { time: 55, text: "running test suite: beaverhacks_fec..." },
    { time: 75, text: "merge feature/ai -> dev -> main" },
    { time: 95, text: "build successful. deploying..." }
  ];
  const currentStatus = statusMessages.slice().reverse().find(m => progress >= m.time)?.text || "";

  // The exact coordinates and calculated timing for the commit nodes to pop in
  const commits = [
    { cx: 40, cy: 40, delay: "0.15s", label: "init portfolio" },
    { cx: 90, cy: 90, delay: "0.7s", label: "branch: dev" },
    { cx: 140, cy: 130, delay: "1.25s", label: "feat: ai-syllabus-checker", active: true },
    { cx: 140, cy: 160, delay: "1.5s", label: "testing: beaverhacks FEC API", active: true },
    { cx: 90, cy: 210, delay: "2.05s", label: "merge: feature/ai -> dev" },
    { cx: 40, cy: 260, delay: "2.65s", label: "deploy: main pipeline", active: true }
  ];

  return (
    <div
      className={`fixed inset-0 z-[100000] flex flex-col items-center justify-center p-6 sm:p-12 font-mono overflow-hidden cursor-none ${
        darkMode ? 'bg-[#050505]' : 'bg-slate-100'
      }`}
    >
      {/* Injecting a custom keyframe for the perfect pop-in animation without relying on external plugins */}
      <style>{`
        @keyframes popIn {
          0% { opacity: 0; transform: scale(0.5); }
          100% { opacity: 1; transform: scale(1); }
        }
      `}</style>

      {/* 1. THE VISUAL GIT PIPELINE */}
      <div className="w-full max-w-2xl aspect-[4/3] sm:aspect-video relative">
        <svg viewBox="0 0 400 300" className="w-full h-full overflow-visible">

          {/* Static Background Branch Lines */}
          <g fill="none" strokeWidth="2" className={darkMode ? 'stroke-neutral-800' : 'stroke-neutral-300'}>
            {/* main branch */}
            <line x1="40" y1="20" x2="40" y2="280" />
            {/* dev branch */}
            <path d="M 40 60 L 90 80 L 90 220 L 40 240" />
            {/* feature/ai branch */}
            <path d="M 90 100 L 140 120 L 140 180 L 90 200" />
          </g>

          {/* Branch Labels */}
          <g fontSize="10" className={darkMode ? 'fill-neutral-600' : 'fill-neutral-400'} textAnchor="middle">
            <text x="40" y="10">main</text>
            <text x="90" y="65">dev</text>
            <text x="140" y="105">feature/ai</text>
          </g>

          {/* Commit Nodes & Text (Fade in exactly as the glowing node passes them) */}
          {commits.map((commit, i) => (
            <g
              key={i}
              style={{
                animation: `popIn 0.3s ease-out ${commit.delay} forwards`,
                opacity: 0,
                transformOrigin: `${commit.cx}px ${commit.cy}px`
              }}
            >
              <circle
                cx={commit.cx}
                cy={commit.cy}
                r="4"
                className={commit.active
                  ? (darkMode ? "fill-emerald-400" : "fill-emerald-600")
                  : (darkMode ? "fill-neutral-700" : "fill-neutral-400")
                }
              />
              <text
                x={commit.cx + 15}
                y={commit.cy + 3}
                fontSize="11"
                className={commit.active
                  ? (darkMode ? "fill-emerald-400 font-bold" : "fill-emerald-700 font-bold")
                  : (darkMode ? "fill-neutral-500" : "fill-neutral-500")
                }
              >
                {commit.label}
              </text>
            </g>
          ))}

          {/* The Traveling Glowing Commit Node */}
          <circle
            r="6"
            className={darkMode
              ? "fill-emerald-400 drop-shadow-[0_0_12px_rgba(52,211,153,1)]"
              : "fill-emerald-500 drop-shadow-[0_0_12px_rgba(16,185,129,0.8)]"
            }
          >
            <animateMotion
              dur="2.8s"
              repeatCount="1"
              // Matches the exact geometric path of branching out and merging back
              path="M 40 20 L 40 60 L 90 80 L 90 100 L 140 120 L 140 180 L 90 200 L 90 220 L 40 240 L 40 280"
              fill="freeze"
              calcMode="linear"
            />
          </circle>
        </svg>
      </div>

      {/* 2. THE TERMINAL PROGRESS BAR */}
      <div className="w-full max-w-2xl mt-8 text-xs sm:text-sm">
        <div className={`mb-2 transition-colors duration-200 ${darkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
          > {currentStatus}
        </div>

        <div className="flex justify-between items-center gap-4">
          <div className="flex-1 flex items-center gap-4">
            <span className={`font-bold ${darkMode ? 'text-emerald-500' : 'text-emerald-700'}`}>
              YARN BUILD
            </span>
            <div className={`flex-1 whitespace-nowrap overflow-hidden ${darkMode ? 'text-emerald-500/80' : 'text-emerald-600/80'}`}>
              [{bar}]
            </div>
          </div>
          <span className={`font-bold w-12 text-right ${darkMode ? 'text-emerald-400' : 'text-emerald-700'}`}>
            {progress}%
          </span>
        </div>
      </div>
    </div>
  );
}
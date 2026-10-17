import MagneticWrapper from './MagneticWrapper';

export default function IntroScreen({ onProceed, darkMode }) {
  // Path for GitHub Pages deployment
  const imgSrc = `${import.meta.env.BASE_URL}ddchat.png`;

  // Extracted from your Tech Stack screenshot
  const techStack = [
    'Python', 'Java', 'JavaScript', 'C++', 'SQL', 'HTML', 'CSS', 'Bash', 'TypeScript',
    'React', 'Node.js', 'Express', 'Tailwind CSS',
    'MySQL', 'Git', 'GitHub', 'Linux', 'Vim', 'PyCharm', 'Visual Studio Code', 'Canvas REST API', 'Google AI Studio'
  ];

  return (
    <section className="min-h-screen w-full flex flex-col items-center justify-center px-6 md:px-16 font-mono relative overflow-hidden bg-[#050505] text-white pb-24">

      {/* Embedded Styles for Sacramento Script and Marquee Animation */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sacramento&display=swap');
        
        .font-signature {
          font-family: 'Sacramento', cursive;
          font-weight: 400;
        }

        @keyframes infiniteScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .anim-scroll {
          display: flex;
          width: max-content;
          animation: infiniteScroll 45s linear infinite;
        }
        .anim-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Main Content Area */}
      <div className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-between gap-12 z-10 py-12 mt-8">

        {/* Left Side: Welcome Text and Action Button */}
        <div className="flex flex-col items-center md:items-start space-y-8 max-w-lg text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 text-xs rounded-full border border-emerald-500/40 bg-emerald-500/10 text-emerald-400 font-bold">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            Interactive Portfolio
          </div>

          <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight leading-tight">
            Hi, I'm <br />
            {/* Swapped to Sacramento, removed font-bold, and slightly increased size */}
            <span className="text-emerald-400 font-signature text-7xl sm:text-8xl tracking-normal inline-block pt-2 pr-4">
              Diya Deepu
            </span>
          </h1>

          <MagneticWrapper>
            <button
              onClick={onProceed}
              className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-xl text-sm font-bold bg-emerald-500 hover:bg-emerald-400 text-black shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 transition-all duration-300 cursor-pointer hover:scale-[1.03] active:scale-[0.98]"
            >
              <span>click here to learn more about me</span>
              <span className="text-base transition-transform duration-300 group-hover:translate-y-1">
                ↓
              </span>
            </button>
          </MagneticWrapper>
        </div>

        {/* Right Side: Static Image */}
        <div className="relative w-full max-w-md aspect-square flex items-center justify-center mt-8 md:mt-0">
          <div className="absolute inset-0 rounded-full bg-emerald-500/10 blur-3xl -z-10" />

          <div className="w-full h-full rounded-3xl border border-neutral-800 bg-[#050505] overflow-hidden shadow-2xl flex items-center justify-center p-4">
            <img
              src={imgSrc}
              alt="Diya Deepu"
              className="w-full h-full object-cover rounded-2xl"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
        </div>
      </div>

      {/* Infinite Tech Stack Marquee Footer */}
      <div className="absolute bottom-0 left-0 w-full border-t border-neutral-900 bg-[#050505] py-5 z-20">

        {/* Gradient edge mask to fade the items out smoothly */}
        <div
          className="w-full overflow-hidden"
          style={{
            maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)'
          }}
        >
          <div className="anim-scroll flex gap-4 px-4 cursor-default">
            {/* We map the array twice to create a seamless infinite loop */}
            {[...techStack, ...techStack].map((tech, index) => (
              <span
                key={index}
                className="px-4 py-2 rounded-lg border border-neutral-800 bg-[#0a0a0a] hover:border-emerald-500/50 hover:text-emerald-300 transition-colors text-emerald-500 text-xs sm:text-sm font-mono whitespace-nowrap shadow-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}